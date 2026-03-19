<?php

/**
 * Dungeon Feature — Bí Cảnh (Instanced Map System)
 *
 * Flow:
 * 1. Player gets Ngọc Giản (map item) from monster drops
 * 2. Player activates Ngọc Giản → creates a dungeon run
 * 3. Player fights through waves of monsters
 * 4. Final wave is a Boss fight
 * 5. Completing dungeon gives enhanced rewards
 */

use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Core\Database;
use App\Core\CombatEngine;
use App\Core\GameDataRepository;

return function ($app) {

    // Helper: Load dungeon data
    $getDungeons = function () {
        static $data = null;
        if (!$data) {
            $data = json_decode(file_get_contents(__DIR__ . '/../../../data/dungeons.json'), true);
        }
        return $data;
    };

    // === GET PLAYER'S MAP ITEMS (Ngọc Giản) ===
    $app->get('/api/player/{id}/map-items', function (Request $request, Response $response, array $args) use ($getDungeons) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $dungeonData = $getDungeons();
        $mapItems = $dungeonData['mapItems'] ?? [];
        $playerMaps = [];

        foreach ($mapItems as $mi) {
            $qty = $player->materials[$mi['id']] ?? 0;
            if ($qty > 0) {
                // Find dungeon info
                $dungeon = null;
                foreach ($dungeonData['dungeons'] as $d) {
                    if ($d['id'] === $mi['dungeonId']) { $dungeon = $d; break; }
                }
                $playerMaps[] = [
                    'item' => $mi,
                    'quantity' => $qty,
                    'dungeon' => $dungeon ? [
                        'id' => $dungeon['id'],
                        'name' => $dungeon['name'],
                        'description' => $dungeon['description'],
                        'tier' => $dungeon['tier'],
                        'waves' => $dungeon['waves'],
                        'requiredRealm' => $dungeon['requiredRealm'],
                        'bossName' => $dungeon['boss']['name'],
                    ] : null,
                ];
            }
        }

        // Also check for active run
        $pdo = Database::pdo();
        $stmt = $pdo->prepare("SELECT * FROM dungeon_runs WHERE player_id = ? AND status = 'active' ORDER BY started_at DESC LIMIT 1");
        $stmt->execute([$id]);
        $activeRun = $stmt->fetch(\PDO::FETCH_ASSOC);

        return jsonResponse($response, [
            'mapItems' => $playerMaps,
            'activeRun' => $activeRun ? [
                'id' => (int)$activeRun['id'],
                'dungeonId' => $activeRun['dungeon_id'],
                'currentWave' => (int)$activeRun['current_wave'],
                'totalWaves' => (int)$activeRun['total_waves'],
                'bossDefeated' => (bool)$activeRun['boss_defeated'],
                'startedAt' => $activeRun['started_at'],
            ] : null,
        ]);
    });

    // === ENTER DUNGEON (Activate Ngọc Giản) ===
    $app->post('/api/player/{id}/dungeon/enter', function (Request $request, Response $response, array $args) use ($getDungeons) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $body = $request->getParsedBody();
        $mapItemId = $body['mapItemId'] ?? '';

        $dungeonData = $getDungeons();
        $mapItem = null;
        foreach ($dungeonData['mapItems'] as $mi) {
            if ($mi['id'] === $mapItemId) { $mapItem = $mi; break; }
        }
        if (!$mapItem) return jsonResponse($response, ['error' => 'Ngọc Giản không hợp lệ!'], 400);

        // Check player has the map item
        if (($player->materials[$mapItemId] ?? 0) <= 0) {
            return jsonResponse($response, ['error' => 'Bạn không sở hữu Ngọc Giản này!'], 400);
        }

        // Check no active run
        $pdo = Database::pdo();
        $stmt = $pdo->prepare("SELECT id FROM dungeon_runs WHERE player_id = ? AND status = 'active'");
        $stmt->execute([$id]);
        if ($stmt->fetch()) {
            return jsonResponse($response, ['error' => 'Đang trong Bí Cảnh khác! Hãy hoàn thành hoặc bỏ cuộc trước.'], 400);
        }

        // Find dungeon
        $dungeon = null;
        foreach ($dungeonData['dungeons'] as $d) {
            if ($d['id'] === $mapItem['dungeonId']) { $dungeon = $d; break; }
        }
        if (!$dungeon) return jsonResponse($response, ['error' => 'Bí Cảnh không tồn tại!'], 400);

        // Check realm requirement
        if ($player->getRealm() < ($dungeon['requiredRealm'] ?? 1)) {
            return jsonResponse($response, ['error' => 'Cảnh giới chưa đủ để vào Bí Cảnh này!'], 400);
        }

        // Check hospital/jail/travel
        if ($player->isHospitalized()) return jsonResponse($response, ['error' => 'Đang tịnh dưỡng!'], 400);
        if ($player->isJailed()) return jsonResponse($response, ['error' => 'Đang ngồi tù!'], 400);
        if ($player->isTraveling()) return jsonResponse($response, ['error' => 'Đang di chuyển!'], 400);

        // Consume Ngọc Giản
        $player->materials[$mapItemId] = ($player->materials[$mapItemId] ?? 0) - 1;
        if ($player->materials[$mapItemId] <= 0) unset($player->materials[$mapItemId]);
        savePlayer($id, $player);

        // Create dungeon run
        $totalWaves = $dungeon['waves'] + 1; // +1 for boss wave
        $stmt = $pdo->prepare("INSERT INTO dungeon_runs (player_id, dungeon_id, map_item_id, current_wave, total_waves) VALUES (?, ?, ?, 1, ?)");
        $stmt->execute([$id, $dungeon['id'], $mapItemId, $totalWaves]);
        $runId = $pdo->lastInsertId();

        return jsonResponse($response, [
            'message' => "⚡ Ngọc Giản sáng rực! Bí Cảnh [{$dungeon['name']}] đã mở!",
            'run' => [
                'id' => (int)$runId,
                'dungeonId' => $dungeon['id'],
                'dungeonName' => $dungeon['name'],
                'currentWave' => 1,
                'totalWaves' => $totalWaves,
                'bossDefeated' => false,
            ],
            'player' => $player->toArray(),
        ]);
    });

    // === FIGHT CURRENT WAVE ===
    $app->post('/api/player/{id}/dungeon/fight', function (Request $request, Response $response, array $args) use ($getDungeons) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $pdo = Database::pdo();
        $stmt = $pdo->prepare("SELECT * FROM dungeon_runs WHERE player_id = ? AND status = 'active' ORDER BY id DESC LIMIT 1");
        $stmt->execute([$id]);
        $run = $stmt->fetch(\PDO::FETCH_ASSOC);
        if (!$run) return jsonResponse($response, ['error' => 'Không có Bí Cảnh đang hoạt động!'], 400);

        if ($player->isHospitalized()) return jsonResponse($response, ['error' => 'Đang tịnh dưỡng!'], 400);

        $dungeonData = $getDungeons();
        $dungeon = null;
        foreach ($dungeonData['dungeons'] as $d) {
            if ($d['id'] === $run['dungeon_id']) { $dungeon = $d; break; }
        }
        if (!$dungeon) return jsonResponse($response, ['error' => 'Dữ liệu Bí Cảnh lỗi!'], 500);

        $currentWave = (int)$run['current_wave'];
        $totalWaves = (int)$run['total_waves'];
        $isBossWave = ($currentWave === $totalWaves);

        // Create monster for this wave
        if ($isBossWave) {
            $monsterData = $dungeon['boss'];
        } else {
            $pool = $dungeon['monsterPool'];
            $monsterId = $pool[array_rand($pool)];
            $monsterData = GameDataRepository::getMonsterById($monsterId);
            if (!$monsterData) {
                // Fallback
                $monsterData = [
                    'id' => 'dungeon_mob', 'name' => 'Bí Cảnh Yêu Thú',
                    'stats' => ['hp' => 50, 'strength' => 10, 'speed' => 8, 'dexterity' => 8, 'defense' => 5],
                    'xpReward' => 50, 'goldReward' => [10, 20], 'effects' => [], 'drops' => [],
                ];
            }
            // Scale monster stats by wave number and dungeon tier
            $scaleFactor = 1 + ($currentWave - 1) * 0.15 + ($dungeon['tier'] - 1) * 0.2;
            foreach (['hp', 'strength', 'speed', 'dexterity', 'defense'] as $s) {
                $monsterData['stats'][$s] = (int)round(($monsterData['stats'][$s] ?? 10) * $scaleFactor);
            }
        }

        // Build Monster object using factory method
        $monster = \App\Models\Monster::fromData($monsterData);

        // Run combat
        $engine = new CombatEngine();
        $result = $engine->fullCombat($player, $monster);

        $waveLoot = [];

        if ($result['result'] === 'win') {
            // Apply xp/gold bonuses
            $xpBonus = $dungeon['rewards']['xpBonus'] ?? 1.0;
            $goldBonus = $dungeon['rewards']['goldBonus'] ?? 1.0;
            $xpGain = (int)round(($monsterData['xpReward'] ?? 50) * $xpBonus);
            $goldGain = (int)round(mt_rand($monsterData['goldReward'][0] ?? 10, $monsterData['goldReward'][1] ?? 30) * $goldBonus);

            $player->gainXp($xpGain);
            $player->gold += $goldGain;
            $waveLoot[] = "💎 {$goldGain} Linh thạch · ⭐ {$xpGain} XP";

            // Process drops
            foreach ($monsterData['drops'] ?? [] as $drop) {
                if (mt_rand(1, 100) <= ($drop['chance'] ?? 0)) {
                    $qty = mt_rand($drop['qty'][0] ?? 1, $drop['qty'][1] ?? 1);
                    $dropType = $drop['type'] ?? 'material';
                    if ($dropType === 'medicine') {
                        $player->medicines[$drop['itemId']] = ($player->medicines[$drop['itemId']] ?? 0) + $qty;
                    } else {
                        $player->materials[$drop['itemId']] = ($player->materials[$drop['itemId']] ?? 0) + $qty;
                    }
                    $waveLoot[] = "📦 {$drop['itemId']} x{$qty}";
                }
            }

            if ($isBossWave) {
                // Dungeon completed!
                $pdo->prepare("UPDATE dungeon_runs SET status = 'completed', boss_defeated = 1, completed_at = NOW(), loot_log = ? WHERE id = ?")
                    ->execute([json_encode($waveLoot), $run['id']]);

                savePlayer($id, $player);

                return jsonResponse($response, [
                    'result' => 'dungeon_complete',
                    'message' => "🏆 Bí Cảnh [{$dungeon['name']}] hoàn thành! Đã đánh bại {$monsterData['name']}!",
                    'wave' => $currentWave,
                    'totalWaves' => $totalWaves,
                    'isBoss' => true,
                    'combatLog' => $result['log'],
                    'loot' => $waveLoot,
                    'player' => $player->toArray(),
                ]);
            } else {
                // Advance to next wave
                $nextWave = $currentWave + 1;
                $pdo->prepare("UPDATE dungeon_runs SET current_wave = ? WHERE id = ?")->execute([$nextWave, $run['id']]);

                savePlayer($id, $player);

                return jsonResponse($response, [
                    'result' => 'wave_cleared',
                    'message' => "⚔️ Tầng {$currentWave}/{$totalWaves} — Đã hạ {$monsterData['name']}!",
                    'wave' => $currentWave,
                    'totalWaves' => $totalWaves,
                    'nextWave' => $nextWave,
                    'isBoss' => false,
                    'combatLog' => $result['log'],
                    'loot' => $waveLoot,
                    'player' => $player->toArray(),
                ]);
            }
        } else {
            // Player lost or fled — dungeon failed
            $pdo->prepare("UPDATE dungeon_runs SET status = 'failed', completed_at = NOW() WHERE id = ?")->execute([$run['id']]);
            savePlayer($id, $player);

            return jsonResponse($response, [
                'result' => 'dungeon_failed',
                'message' => "💀 Thất bại ở tầng {$currentWave}! Bí Cảnh sụp đổ!",
                'wave' => $currentWave,
                'totalWaves' => $totalWaves,
                'isBoss' => $isBossWave,
                'combatLog' => $result['log'],
                'player' => $player->toArray(),
            ]);
        }
    });

    // === ABANDON DUNGEON ===
    $app->post('/api/player/{id}/dungeon/abandon', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $pdo = Database::pdo();
        $stmt = $pdo->prepare("UPDATE dungeon_runs SET status = 'abandoned', completed_at = NOW() WHERE player_id = ? AND status = 'active'");
        $stmt->execute([$id]);

        return jsonResponse($response, ['message' => '🚪 Đã rời khỏi Bí Cảnh.']);
    });

    // === DUNGEON HISTORY ===
    $app->get('/api/player/{id}/dungeon/history', function (Request $request, Response $response, array $args) use ($getDungeons) {
        $id = $args['id'];
        $pdo = Database::pdo();
        $stmt = $pdo->prepare("SELECT * FROM dungeon_runs WHERE player_id = ? ORDER BY started_at DESC LIMIT 10");
        $stmt->execute([$id]);
        $runs = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        $dungeonData = $getDungeons();
        $result = [];
        foreach ($runs as $run) {
            $dname = $run['dungeon_id'];
            foreach ($dungeonData['dungeons'] as $d) {
                if ($d['id'] === $run['dungeon_id']) { $dname = $d['name']; break; }
            }
            $result[] = [
                'id' => (int)$run['id'],
                'dungeonName' => $dname,
                'status' => $run['status'],
                'wave' => (int)$run['current_wave'],
                'totalWaves' => (int)$run['total_waves'],
                'bossDefeated' => (bool)$run['boss_defeated'],
                'startedAt' => $run['started_at'],
                'completedAt' => $run['completed_at'],
            ];
        }

        return jsonResponse($response, ['history' => $result]);
    });
};
