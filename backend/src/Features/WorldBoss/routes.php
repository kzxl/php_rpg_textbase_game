<?php
/**
 * World Boss — Boss Thế Giới (multi-player damage, full combat, no hospital)
 */
use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Core\CombatEngine;
use App\Core\Database;
use App\Models\Monster;

return function ($app) {

    $BOSS_TEMPLATES = [
        ['id' => 'thien_ma_vuong', 'name' => '👹 Thiên Ma Vương', 'hp' => 100000, 'level' => 50, 'rewards' => ['gold' => 5000, 'xp' => 2000]],
        ['id' => 'cuu_u_long',    'name' => '🐉 Cửu U Long',    'hp' => 250000, 'level' => 80, 'rewards' => ['gold' => 15000, 'xp' => 5000]],
        ['id' => 'hon_thien_de',  'name' => '💀 Hỗn Thiên Đế',  'hp' => 500000, 'level' => 100,'rewards' => ['gold' => 30000, 'xp' => 10000]],
    ];

    // === GET CURRENT WORLD BOSS ===
    $app->get('/api/world-boss', function (Request $request, Response $response) use ($BOSS_TEMPLATES) {
        $pdo = Database::pdo();
        $stmt = $pdo->query("SELECT * FROM world_bosses WHERE status = 'active' ORDER BY spawned_at DESC LIMIT 1");
        $boss = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!$boss) {
            $template = $BOSS_TEMPLATES[array_rand($BOSS_TEMPLATES)];
            $pdo->prepare("INSERT INTO world_bosses (boss_id, name, max_hp, current_hp, level, rewards) VALUES (?, ?, ?, ?, ?, ?)")
                ->execute([$template['id'], $template['name'], $template['hp'], $template['hp'], $template['level'], json_encode($template['rewards'])]);
            $bossId = $pdo->lastInsertId();
            $boss = $pdo->prepare("SELECT * FROM world_bosses WHERE id = ?");
            $boss->execute([$bossId]);
            $boss = $boss->fetch(\PDO::FETCH_ASSOC);
        }

        $topStmt = $pdo->prepare("
            SELECT d.total_damage, d.hits, p.name
            FROM world_boss_damage d
            JOIN players p ON p.id = d.player_id
            WHERE d.boss_instance_id = ?
            ORDER BY d.total_damage DESC LIMIT 10
        ");
        $topStmt->execute([$boss['id']]);
        $top = $topStmt->fetchAll(\PDO::FETCH_ASSOC);

        $hpPct = $boss['max_hp'] > 0 ? round(($boss['current_hp'] / $boss['max_hp']) * 100, 1) : 0;

        return jsonResponse($response, [
            'boss' => $boss,
            'hpPercent' => $hpPct,
            'topContributors' => $top,
            'rewards' => json_decode($boss['rewards'] ?? '{}', true),
        ]);
    });

    // === ATTACK WORLD BOSS — Full Combat, No Hospital ===
    $app->post('/api/player/{id}/world-boss/attack', function (Request $request, Response $response, array $args) use ($BOSS_TEMPLATES) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        // World boss: NO hospital check — can fight even while "hospitalized"
        // But need HP > 0
        if ($player->currentHp <= 0) {
            return jsonResponse($response, ['error' => 'Đã kiệt sức! HP = 0.'], 400);
        }

        $staminaCost = 5;
        if (($player->currentStamina ?? 0) < $staminaCost) {
            return jsonResponse($response, ['error' => "Cần {$staminaCost} thể lực!"], 400);
        }

        $pdo = Database::pdo();
        $stmt = $pdo->query("SELECT * FROM world_bosses WHERE status = 'active' LIMIT 1");
        $boss = $stmt->fetch(\PDO::FETCH_ASSOC);
        if (!$boss) return jsonResponse($response, ['error' => 'Không có Boss!'], 400);
        if ((int)$boss['current_hp'] <= 0) return jsonResponse($response, ['error' => 'Boss đã bị đánh bại!'], 400);

        $player->currentStamina -= $staminaCost;

        // Build a temporary monster object for CombatEngine
        // Boss stats scaled from its DB data
        $bossLevel = (int)$boss['level'];
        $bossStats = [
            'hp' => min((int)$boss['current_hp'], 99999), // Use remaining HP as combat HP
            'strength' => 10 + $bossLevel * 2,
            'speed' => 5 + $bossLevel,
            'dexterity' => 5 + $bossLevel,
            'defense' => 10 + $bossLevel * 2,
        ];
        $tempMonster = new Monster($boss['boss_id'], $boss['name'], $bossStats, 0);
        $tempMonster->level = $bossLevel;

        // Remember hospital state before combat
        $hospitalBefore = $player->hospitalUntil;

        // Run full combat
        $combat = new CombatEngine();
        $result = $combat->fullCombat($player, $tempMonster);

        // === KEY: CLEAR HOSPITAL PENALTY for world boss ===
        $player->hospitalUntil = $hospitalBefore; // Restore pre-combat state

        // Calculate damage dealt to boss
        $damageToBoss = 0;
        if ($result['outcome'] === 'win' || $result['outcome'] === 'stalemate') {
            // Boss HP change = monster starting HP - remaining HP
            $monsterEndHp = $result['monster']['currentHp'] ?? 0;
            $damageToBoss = max(0, $bossStats['hp'] - $monsterEndHp);
        } elseif ($result['outcome'] === 'loss') {
            // Player lost but still did damage
            $monsterEndHp = $result['monster']['currentHp'] ?? 0;
            $damageToBoss = max(0, $bossStats['hp'] - $monsterEndHp);
        } elseif ($result['outcome'] === 'flee') {
            $monsterEndHp = $result['monster']['currentHp'] ?? 0;
            $damageToBoss = max(0, $bossStats['hp'] - $monsterEndHp);
        }

        // Apply damage to world boss DB
        $newBossHp = max(0, (int)$boss['current_hp'] - $damageToBoss);
        $pdo->prepare("UPDATE world_bosses SET current_hp = ? WHERE id = ?")->execute([$newBossHp, $boss['id']]);

        // Track contribution
        if ($damageToBoss > 0) {
            $pdo->prepare("
                INSERT INTO world_boss_damage (boss_instance_id, player_id, total_damage, hits)
                VALUES (?, ?, ?, 1)
                ON DUPLICATE KEY UPDATE total_damage = total_damage + ?, hits = hits + 1, last_hit = NOW()
            ")->execute([$boss['id'], $id, $damageToBoss, $damageToBoss]);
        }

        $message = "⚔️ Gây {$damageToBoss} sát thương cho {$boss['name']}!";
        $defeated = false;

        // Check if boss defeated
        if ($newBossHp <= 0) {
            $pdo->prepare("UPDATE world_bosses SET status = 'defeated', defeated_at = NOW() WHERE id = ?")->execute([$boss['id']]);
            $rewards = json_decode($boss['rewards'] ?? '{}', true);

            $contribs = $pdo->prepare("SELECT * FROM world_boss_damage WHERE boss_instance_id = ? ORDER BY total_damage DESC");
            $contribs->execute([$boss['id']]);
            $allContribs = $contribs->fetchAll(\PDO::FETCH_ASSOC);
            $totalDmg = array_sum(array_column($allContribs, 'total_damage'));

            foreach ($allContribs as $i => $c) {
                $share = $totalDmg > 0 ? $c['total_damage'] / $totalDmg : 0;
                $goldShare = (int)($rewards['gold'] * $share * ($i < 3 ? 1.5 : 1));
                $xpShare = (int)($rewards['xp'] * $share);
                $cp = loadPlayer($c['player_id']);
                if ($cp) {
                    $cp->gold += $goldShare;
                    $cp->xp += $xpShare;
                    savePlayer($c['player_id'], $cp);
                }
            }
            $message .= " 🎉 BOSS BỊ ĐÁNH BẠI! Phần thưởng đã phát!";
            $defeated = true;
            $player = loadPlayer($id); // Reload for rewards
        }

        savePlayer($id, $player);

        return jsonResponse($response, [
            'message' => $message,
            'damage' => $damageToBoss,
            'bossHp' => $newBossHp,
            'bossMaxHp' => (int)$boss['max_hp'],
            'defeated' => $defeated,
            'player' => $player->toArray(),
            // Combat log for frontend display
            'outcome' => $result['outcome'],
            'log' => $result['log'] ?? [],
            'turns' => $result['turns'] ?? 0,
            'maxTurns' => $result['maxTurns'] ?? 25,
            'monster' => $result['monster'] ?? ['name' => $boss['name'], 'currentHp' => $newBossHp, 'maxHp' => (int)$boss['max_hp']],
        ]);
    });
};
