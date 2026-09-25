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

        // Check discovered dungeons and active run
        $pdo = Database::pdo();

        // 1. Auto-expire outdated timed dungeons
        $pdo->exec("UPDATE player_discovered_dungeons SET status = 'expired' WHERE realm_type = 'timed' AND status = 'available' AND expires_at <= NOW()");

        // 2. Fetch discovered dungeons
        $stmt = $pdo->prepare("
            SELECT id, dungeon_key, realm_type, name, description, tier, required_realm, difficulty_mult, waves, area_id, discovered_at, expires_at, is_cleared, clear_count, status, boss_data, rewards_data
            FROM player_discovered_dungeons 
            WHERE player_id = ? AND status != 'expired' 
            ORDER BY realm_type ASC, id DESC
        ");
        $stmt->execute([$id]);
        $discoveredList = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        $timedDungeons = [];
        $permanentDungeons = [];
        $now = time();

        foreach ($discoveredList as $item) {
            $bossInfo = json_decode($item['boss_data'] ?? '{}', true) ?: [];
            $entry = [
                'id' => (int)$item['id'],
                'dungeonKey' => $item['dungeon_key'],
                'realmType' => $item['realm_type'],
                'name' => $item['name'],
                'description' => $item['description'],
                'tier' => (int)$item['tier'],
                'requiredRealm' => (int)$item['required_realm'],
                'difficultyMult' => (float)$item['difficulty_mult'],
                'waves' => (int)$item['waves'],
                'totalWaves' => (int)$item['waves'] + 1,
                'isCleared' => (bool)$item['is_cleared'],
                'clearCount' => (int)$item['clear_count'],
                'bossName' => $bossInfo['name'] ?? 'Thủ Vệ Bí Cảnh',
                'discoveredAt' => $item['discovered_at'],
                'expiresAt' => $item['expires_at'],
            ];

            if ($item['realm_type'] === 'timed') {
                $expTime = $item['expires_at'] ? strtotime($item['expires_at']) : 0;
                $remSec = max(0, $expTime - $now);
                $entry['remainingSeconds'] = $remSec;
                if ($remSec > 0 && $item['status'] === 'available') {
                    $timedDungeons[] = $entry;
                }
            } else {
                $permanentDungeons[] = $entry;
            }
        }

        // 3. Check for active run
        $stmt = $pdo->prepare("SELECT * FROM dungeon_runs WHERE player_id = ? AND status = 'active' ORDER BY started_at DESC LIMIT 1");
        $stmt->execute([$id]);
        $activeRun = $stmt->fetch(\PDO::FETCH_ASSOC);

        $activeRunData = null;
        if ($activeRun) {
            $dungeonName = $activeRun['dungeon_id'];
            if (!empty($activeRun['discovered_id'])) {
                $dStmt = $pdo->prepare("SELECT name FROM player_discovered_dungeons WHERE id = ?");
                $dStmt->execute([$activeRun['discovered_id']]);
                $foundName = $dStmt->fetchColumn();
                if ($foundName) $dungeonName = $foundName;
            } else {
                foreach ($dungeonData['dungeons'] as $d) {
                    if ($d['id'] === $activeRun['dungeon_id']) { $dungeonName = $d['name']; break; }
                }
            }

            $activeRunData = [
                'id' => (int)$activeRun['id'],
                'dungeonId' => $activeRun['dungeon_id'],
                'dungeonName' => $dungeonName,
                'discoveredId' => $activeRun['discovered_id'] ? (int)$activeRun['discovered_id'] : null,
                'difficultyMult' => (float)($activeRun['difficulty_mult'] ?? 1.0),
                'currentWave' => (int)$activeRun['current_wave'],
                'totalWaves' => (int)$activeRun['total_waves'],
                'bossDefeated' => (bool)$activeRun['boss_defeated'],
                'startedAt' => $activeRun['started_at'],
            ];
        }

        return jsonResponse($response, [
            'mapItems' => $playerMaps,
            'timedDungeons' => $timedDungeons,
            'permanentDungeons' => $permanentDungeons,
            'activeRun' => $activeRunData,
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

        // Check hospital/travel
        if ($player->isHospitalized()) return jsonResponse($response, ['error' => 'Đang tịnh dưỡng!'], 400);
        if ($player->isTraveling()) return jsonResponse($response, ['error' => 'Đang di chuyển!'], 400);

        // Consume Ngọc Giản
        $player->materials[$mapItemId] = ($player->materials[$mapItemId] ?? 0) - 1;
        if ($player->materials[$mapItemId] <= 0) unset($player->materials[$mapItemId]);
        savePlayer($id, $player);

        // Create dungeon run
        $totalWaves = $dungeon['waves'] + 1; // +1 for boss wave
        $stmt = $pdo->prepare("INSERT INTO dungeon_runs (player_id, dungeon_id, map_item_id, current_wave, total_waves, difficulty_mult) VALUES (?, ?, ?, 1, ?, 1.0)");
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

    // === ENTER DISCOVERED DUNGEON (Timed or Permanent) ===
    $app->post('/api/player/{id}/dungeon/enter-discovered', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $body = $request->getParsedBody();
        $discoveredId = (int)($body['discoveredId'] ?? 0);
        if (!$discoveredId) return jsonResponse($response, ['error' => 'Thiếu mã Bí Cảnh khám phá!'], 400);

        $pdo = Database::pdo();

        // Check no active run
        $stmt = $pdo->prepare("SELECT id FROM dungeon_runs WHERE player_id = ? AND status = 'active'");
        $stmt->execute([$id]);
        if ($stmt->fetch()) {
            return jsonResponse($response, ['error' => 'Đang trong Bí Cảnh khác! Hãy hoàn thành hoặc bỏ cuộc trước.'], 400);
        }

        // Fetch discovered dungeon
        $stmt = $pdo->prepare("SELECT * FROM player_discovered_dungeons WHERE id = ? AND player_id = ?");
        $stmt->execute([$discoveredId, $id]);
        $disc = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!$disc) {
            return jsonResponse($response, ['error' => 'Bí Cảnh không tồn tại hoặc không thuộc về bạn!'], 404);
        }

        // Check timed expiration
        if ($disc['realm_type'] === 'timed') {
            if ($disc['status'] !== 'available' || (strtotime($disc['expires_at']) <= time())) {
                $pdo->prepare("UPDATE player_discovered_dungeons SET status = 'expired' WHERE id = ?")->execute([$disc['id']]);
                return jsonResponse($response, ['error' => '⚡ Bí Cảnh này đã hết hạn và tiêu tán vào hư không!'], 400);
            }
        }

        // Check realm requirement
        if ($player->getRealm() < (int)$disc['required_realm']) {
            return jsonResponse($response, ['error' => "Cảnh giới chưa đủ để vào Bí Cảnh này! Yêu cầu Cảnh Giới: Cấp {$disc['required_realm']}"], 400);
        }

        // Check hospital / travel
        if ($player->isHospitalized()) return jsonResponse($response, ['error' => 'Đang tịnh dưỡng!'], 400);
        if ($player->isTraveling()) return jsonResponse($response, ['error' => 'Đang di chuyển!'], 400);

        // Create dungeon run
        $totalWaves = (int)$disc['waves'] + 1; // +1 for boss wave
        $diffMult = (float)$disc['difficulty_mult'];

        $stmt = $pdo->prepare("
            INSERT INTO dungeon_runs (player_id, dungeon_id, map_item_id, discovered_id, current_wave, total_waves, difficulty_mult)
            VALUES (?, ?, '', ?, 1, ?, ?)
        ");
        $stmt->execute([$id, $disc['dungeon_key'], $disc['id'], $totalWaves, $diffMult]);
        $runId = $pdo->lastInsertId();

        $prefix = ($disc['realm_type'] === 'timed') ? '⏳' : '🔱';
        $warning = ($diffMult >= 2.0) ? " (⚠️ Quái vật cuồng bạo x{$diffMult} sức mạnh!)" : "";

        return jsonResponse($response, [
            'message' => "{$prefix} Lối vào mở ra! Đã tiến vào [{$disc['name']}]{$warning}!",
            'run' => [
                'id' => (int)$runId,
                'dungeonId' => $disc['dungeon_key'],
                'dungeonName' => $disc['name'],
                'discoveredId' => (int)$disc['id'],
                'realmType' => $disc['realm_type'],
                'difficultyMult' => $diffMult,
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

        $currentWave = (int)$run['current_wave'];
        $totalWaves = (int)$run['total_waves'];
        $isBossWave = ($currentWave === $totalWaves);

        // Check if this run is from a discovered dungeon
        $disc = null;
        if (!empty($run['discovered_id'])) {
            $discStmt = $pdo->prepare("SELECT * FROM player_discovered_dungeons WHERE id = ?");
            $discStmt->execute([$run['discovered_id']]);
            $disc = $discStmt->fetch(\PDO::FETCH_ASSOC);
        }

        $dungeonName = $run['dungeon_id'];
        $tier = 1;
        $xpBonus = 1.0;
        $goldBonus = 1.0;

        if ($disc) {
            $dungeonName = $disc['name'];
            $tier = (int)$disc['tier'];
            $diffMult = (float)($run['difficulty_mult'] ?? $disc['difficulty_mult'] ?? 1.0);
            $rewards = json_decode($disc['rewards_data'] ?? '{}', true) ?: [];
            $xpBonus = (float)($rewards['xpBonus'] ?? 1.5);
            $goldBonus = (float)($rewards['goldBonus'] ?? 1.5);

            if ($isBossWave) {
                $monsterData = json_decode($disc['boss_data'], true);
                if (!$monsterData) {
                    $monsterData = ['id' => 'disc_boss', 'name' => 'Bí Cảnh Trùm', 'stats' => ['hp' => 500, 'strength' => 30, 'defense' => 15, 'speed' => 15, 'dexterity' => 15], 'xpReward' => 300, 'goldReward' => [100, 200]];
                }
                // For permanent / extreme dungeons, multiply boss stats
                if ($diffMult > 1.0) {
                    $monsterData['stats']['hp'] = (int)round(($monsterData['stats']['hp'] ?? 500) * $diffMult);
                    $monsterData['stats']['strength'] = (int)round(($monsterData['stats']['strength'] ?? 30) * $diffMult);
                    $monsterData['stats']['speed'] = (int)round(($monsterData['stats']['speed'] ?? 15) * max(1.0, 1 + ($diffMult - 1) * 0.35));
                    $monsterData['stats']['dexterity'] = (int)round(($monsterData['stats']['dexterity'] ?? 15) * max(1.0, 1 + ($diffMult - 1) * 0.35));
                    $monsterData['stats']['defense'] = (int)round(($monsterData['stats']['defense'] ?? 15) * max(1.0, 1 + ($diffMult - 1) * 0.45));
                }
            } else {
                $pool = json_decode($disc['monster_pool'] ?? '[]', true) ?: ['tho_lang'];
                $monsterId = $pool[array_rand($pool)];
                $monsterData = GameDataRepository::getMonsterById($monsterId);
                if (!$monsterData) {
                    $monsterData = [
                        'id' => 'disc_mob', 'name' => 'Bí Cảnh Yêu Thú',
                        'stats' => ['hp' => 50, 'strength' => 10, 'speed' => 8, 'dexterity' => 8, 'defense' => 5],
                        'xpReward' => 50, 'goldReward' => [10, 20], 'effects' => [], 'drops' => [],
                    ];
                }
                // Scale normal monster stats by wave and extreme difficulty multiplier
                $scaleFactor = (1 + ($currentWave - 1) * 0.15 + ($tier - 1) * 0.2) * $diffMult;
                foreach (['hp', 'strength', 'speed', 'dexterity', 'defense'] as $s) {
                    $monsterData['stats'][$s] = (int)round(($monsterData['stats'][$s] ?? 10) * $scaleFactor);
                }
                if ($diffMult >= 2.0) {
                    $monsterData['name'] = "🔥 [Cuồng Bạo] " . $monsterData['name'];
                }
            }
        } else {
            // Standard map item dungeon
            $dungeonData = $getDungeons();
            $dungeon = null;
            foreach ($dungeonData['dungeons'] as $d) {
                if ($d['id'] === $run['dungeon_id']) { $dungeon = $d; break; }
            }
            if (!$dungeon) return jsonResponse($response, ['error' => 'Dữ liệu Bí Cảnh lỗi!'], 500);

            $dungeonName = $dungeon['name'];
            $tier = (int)$dungeon['tier'];
            $xpBonus = $dungeon['rewards']['xpBonus'] ?? 1.0;
            $goldBonus = $dungeon['rewards']['goldBonus'] ?? 1.0;

            if ($isBossWave) {
                $monsterData = $dungeon['boss'];
            } else {
                $pool = $dungeon['monsterPool'];
                $monsterId = $pool[array_rand($pool)];
                $monsterData = GameDataRepository::getMonsterById($monsterId);
                if (!$monsterData) {
                    $monsterData = [
                        'id' => 'dungeon_mob', 'name' => 'Bí Cảnh Yêu Thú',
                        'stats' => ['hp' => 50, 'strength' => 10, 'speed' => 8, 'dexterity' => 8, 'defense' => 5],
                        'xpReward' => 50, 'goldReward' => [10, 20], 'effects' => [], 'drops' => [],
                    ];
                }
                $scaleFactor = 1 + ($currentWave - 1) * 0.15 + ($tier - 1) * 0.2;
                foreach (['hp', 'strength', 'speed', 'dexterity', 'defense'] as $s) {
                    $monsterData['stats'][$s] = (int)round(($monsterData['stats'][$s] ?? 10) * $scaleFactor);
                }
            }
        }

        // Build Monster object using factory method
        $monster = \App\Models\Monster::fromData($monsterData);

        // Run combat
        $engine = new CombatEngine();
        $result = $engine->fullCombat($player, $monster);

        $waveLoot = [];

        if ($result['result'] === 'win') {
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

                // Update discovered dungeon record
                if ($disc) {
                    if ($disc['realm_type'] === 'timed') {
                        $pdo->prepare("UPDATE player_discovered_dungeons SET status = 'cleared', is_cleared = 1, cleared_at = NOW() WHERE id = ?")
                            ->execute([$disc['id']]);
                    } else {
                        $pdo->prepare("UPDATE player_discovered_dungeons SET is_cleared = 1, clear_count = clear_count + 1, cleared_at = NOW() WHERE id = ?")
                            ->execute([$disc['id']]);
                    }
                }

                savePlayer($id, $player);

                $completeMsg = $disc 
                    ? ($disc['realm_type'] === 'permanent' 
                        ? "🔱 Thần uy cái thế! Bạn đã vượt qua tất cả thử thách hung hiểm, bình định [{$dungeonName}]! Trảm sát {$monsterData['name']}!" 
                        : "🏆 Hoàn thành Bí Cảnh [{$dungeonName}]! Đã đánh bại {$monsterData['name']} trước khi linh khí tiêu tán!")
                    : "🏆 Bí Cảnh [{$dungeonName}] hoàn thành! Đã đánh bại {$monsterData['name']}!";

                return jsonResponse($response, [
                    'result' => 'dungeon_complete',
                    'message' => $completeMsg,
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
                'message' => "💀 Thất bại ở tầng {$currentWave}! Bí Cảnh cuồng bạo đánh trọng thương!",
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
            if (!empty($run['discovered_id'])) {
                $dStmt = $pdo->prepare("SELECT name FROM player_discovered_dungeons WHERE id = ?");
                $dStmt->execute([$run['discovered_id']]);
                $found = $dStmt->fetchColumn();
                if ($found) $dname = $found;
            } else {
                foreach ($dungeonData['dungeons'] as $d) {
                    if ($d['id'] === $run['dungeon_id']) { $dname = $d['name']; break; }
                }
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
