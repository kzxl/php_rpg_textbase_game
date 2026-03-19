<?php
/**
 * Tiên Cảnh — Endgame Map System (PoE Atlas Style)
 *
 * Flow:
 * 1. Player collects Tiên Đồ (map items) from high-tier drops / world boss
 * 2. Player can apply modifiers (cost gold) to increase difficulty + rewards
 * 3. Player opens map → instanced waves + boss
 * 4. Completing map → drops higher-tier maps + atlas progress
 */
use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Core\Database;
use App\Core\CombatEngine;
use App\Core\GameDataRepository;

return function ($app) {

    // Load Tiên Cảnh data
    $getTCData = function () {
        static $data = null;
        if (!$data) {
            $data = json_decode(file_get_contents(__DIR__ . '/../../../data/tien_canh_maps.json'), true);
        }
        return $data;
    };

    // Helper: find map by ID
    $findMap = function (string $mapId) use ($getTCData) {
        foreach ($getTCData()['maps'] as $m) {
            if ($m['id'] === $mapId) return $m;
        }
        return null;
    };

    // Helper: find tier info
    $findTier = function (int $tier) use ($getTCData) {
        foreach ($getTCData()['tiers'] as $t) {
            if ($t['tier'] === $tier) return $t;
        }
        return null;
    };

    // Helper: calculate atlas bonus
    $calcAtlasBonus = function (array $atlasProgress): int {
        $distinct = count(array_filter($atlasProgress, fn($v) => $v > 0));
        if ($distinct >= 75) return 30;
        if ($distinct >= 50) return 20;
        if ($distinct >= 25) return 10;
        if ($distinct >= 10) return 5;
        return 0;
    };

    // Helper: generate random map drop
    $generateMapDrop = function (int $currentTier, int $iiqBonus) use ($getTCData) {
        $data = $getTCData();
        $tierInfo = null;
        foreach ($data['tiers'] as $t) {
            if ($t['tier'] === $currentTier) { $tierInfo = $t; break; }
        }
        if (!$tierInfo) return null;

        $dropChance = $tierInfo['mapDropChance'] + $iiqBonus;
        if (mt_rand(1, 100) > $dropChance) return null;

        // Determine dropped map tier
        $roll = mt_rand(1, 100);
        if ($roll <= 10 && $currentTier < 8) $dropTier = min(8, $currentTier + 2);
        elseif ($roll <= 40 && $currentTier < 8) $dropTier = min(8, $currentTier + 1);
        else $dropTier = $currentTier;

        // Pick random map from that tier
        $tierMaps = array_filter($data['maps'], fn($m) => $m['tier'] === $dropTier);
        $tierMaps = array_values($tierMaps);
        if (empty($tierMaps)) return null;

        $chosenMap = $tierMaps[array_rand($tierMaps)];
        return [
            'mapId' => $chosenMap['id'],
            'mapName' => $chosenMap['name'],
            'tier' => $dropTier,
            'modifiers' => [], // Drops without modifiers, player adds later
        ];
    };

    // === GET ATLAS STATUS ===
    $app->get('/api/player/{id}/atlas-maps', function (Request $request, Response $response, array $args) use ($getTCData, $calcAtlasBonus) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $data = $getTCData();
        $atlasBonus = $calcAtlasBonus($player->atlasProgress);
        $player->atlasBonus = $atlasBonus;

        // Check active run
        $pdo = Database::pdo();
        $stmt = $pdo->prepare("SELECT * FROM atlas_map_runs WHERE player_id = ? AND status = 'active' ORDER BY id DESC LIMIT 1");
        $stmt->execute([$id]);
        $activeRun = $stmt->fetch(\PDO::FETCH_ASSOC);

        // Completion stats
        $totalMaps = count($data['maps']);
        $completedDistinct = count(array_filter($player->atlasProgress, fn($v) => $v > 0));

        return jsonResponse($response, [
            'maps' => $player->tienCanhMaps,
            'atlas' => [
                'progress' => $player->atlasProgress,
                'bonus' => $atlasBonus,
                'completed' => $completedDistinct,
                'total' => $totalMaps,
                'pct' => $totalMaps > 0 ? round($completedDistinct / $totalMaps * 100) : 0,
            ],
            'activeRun' => $activeRun ? [
                'id' => (int)$activeRun['id'],
                'mapId' => $activeRun['map_id'],
                'mapName' => $activeRun['map_name'],
                'tier' => (int)$activeRun['tier'],
                'currentWave' => (int)$activeRun['current_wave'],
                'totalWaves' => (int)$activeRun['total_waves'],
                'modifiers' => json_decode($activeRun['modifiers'] ?? '[]', true),
                'bossDefeated' => (bool)$activeRun['boss_defeated'],
            ] : null,
            'tiers' => $data['tiers'],
            'allMaps' => $data['maps'],
            'modifiers' => $data['modifiers'],
        ]);
    });

    // === ADD MODIFIER TO MAP (cost gold) ===
    $app->post('/api/player/{id}/atlas-maps/modify', function (Request $request, Response $response, array $args) use ($getTCData) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $body = json_decode($request->getBody()->getContents(), true);
        $mapIndex = (int)($body['mapIndex'] ?? -1);
        $modifierId = $body['modifierId'] ?? '';

        if ($mapIndex < 0 || $mapIndex >= count($player->tienCanhMaps)) {
            return jsonResponse($response, ['error' => 'Tiên Đồ không hợp lệ!'], 400);
        }

        $map = &$player->tienCanhMaps[$mapIndex];
        if (count($map['modifiers'] ?? []) >= 3) {
            return jsonResponse($response, ['error' => 'Tối đa 3 modifier/map!'], 400);
        }

        // Find modifier
        $modifier = null;
        foreach ($getTCData()['modifiers'] as $mod) {
            if ($mod['id'] === $modifierId) { $modifier = $mod; break; }
        }
        if (!$modifier) return jsonResponse($response, ['error' => 'Modifier không tồn tại!'], 400);

        // Check duplicate
        foreach ($map['modifiers'] ?? [] as $existing) {
            if ($existing['id'] === $modifierId) {
                return jsonResponse($response, ['error' => 'Modifier này đã được gắn!'], 400);
            }
        }

        // Cost: 100 × tier × (1 + modifier count) gold
        $cost = 100 * ($map['tier'] ?? 1) * (1 + count($map['modifiers'] ?? []));
        if ($player->gold < $cost) {
            return jsonResponse($response, ['error' => "Cần {$cost} 💎 để gắn modifier!"], 400);
        }

        $player->gold -= $cost;
        $map['modifiers'][] = ['id' => $modifier['id'], 'name' => $modifier['name'], 'iiqBonus' => $modifier['iiqBonus']];

        savePlayer($id, $player);
        return jsonResponse($response, [
            'message' => "Đã gắn {$modifier['name']}! IIQ +{$modifier['iiqBonus']}%",
            'map' => $map,
            'cost' => $cost,
            'player' => $player->toArray(),
        ]);
    });

    // === OPEN MAP (Enter Tiên Cảnh) ===
    $app->post('/api/player/{id}/atlas-maps/open', function (Request $request, Response $response, array $args) use ($getTCData, $findMap, $findTier) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $body = json_decode($request->getBody()->getContents(), true);
        $mapIndex = (int)($body['mapIndex'] ?? -1);

        if ($mapIndex < 0 || $mapIndex >= count($player->tienCanhMaps)) {
            return jsonResponse($response, ['error' => 'Tiên Đồ không hợp lệ!'], 400);
        }

        // Check no active run
        $pdo = Database::pdo();
        $stmt = $pdo->prepare("SELECT id FROM atlas_map_runs WHERE player_id = ? AND status = 'active'");
        $stmt->execute([$id]);
        if ($stmt->fetch()) {
            return jsonResponse($response, ['error' => 'Đang trong Tiên Cảnh khác!'], 400);
        }

        $mapData = $player->tienCanhMaps[$mapIndex];
        $baseMap = $findMap($mapData['mapId']);
        $tierInfo = $findTier($mapData['tier']);
        if (!$baseMap || !$tierInfo) return jsonResponse($response, ['error' => 'Dữ liệu map lỗi!'], 500);

        // Check realm
        if ($player->realmTier < $tierInfo['requiredRealm']) {
            return jsonResponse($response, ['error' => "Cần cảnh giới tầng {$tierInfo['requiredRealm']}!"], 400);
        }

        if ($player->isHospitalized()) return jsonResponse($response, ['error' => 'Đang tịnh dưỡng!'], 400);
        if ($player->isJailed()) return jsonResponse($response, ['error' => 'Đang ngồi tù!'], 400);

        // Calculate total waves (base + modifier bonus)
        $totalWaves = $tierInfo['waves'] + 1; // +1 for boss
        $modifiers = $mapData['modifiers'] ?? [];
        foreach ($modifiers as $mod) {
            $modData = null;
            foreach ($getTCData()['modifiers'] as $m) { if ($m['id'] === $mod['id']) { $modData = $m; break; } }
            if ($modData && !empty($modData['effect']['extraWaves'])) {
                $totalWaves += $modData['effect']['extraWaves'];
            }
        }

        // Consume map
        array_splice($player->tienCanhMaps, $mapIndex, 1);
        savePlayer($id, $player);

        // Create run
        $stmt = $pdo->prepare("INSERT INTO atlas_map_runs (player_id, map_id, map_name, tier, current_wave, total_waves, modifiers) VALUES (?, ?, ?, ?, 1, ?, ?)");
        $stmt->execute([$id, $baseMap['id'], $baseMap['name'], $mapData['tier'], $totalWaves, json_encode($modifiers)]);
        $runId = $pdo->lastInsertId();

        return jsonResponse($response, [
            'message' => "🌀 Tiên Đồ rung chuyển! {$baseMap['name']} (T{$mapData['tier']}) đã mở!",
            'run' => [
                'id' => (int)$runId,
                'mapId' => $baseMap['id'],
                'mapName' => $baseMap['name'],
                'tier' => $mapData['tier'],
                'currentWave' => 1,
                'totalWaves' => $totalWaves,
                'modifiers' => $modifiers,
                'bossDefeated' => false,
            ],
            'player' => $player->toArray(),
        ]);
    });

    // === FIGHT CURRENT WAVE ===
    $app->post('/api/player/{id}/atlas-maps/fight', function (Request $request, Response $response, array $args) use ($getTCData, $findMap, $findTier, $generateMapDrop, $calcAtlasBonus) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $pdo = Database::pdo();
        $stmt = $pdo->prepare("SELECT * FROM atlas_map_runs WHERE player_id = ? AND status = 'active' ORDER BY id DESC LIMIT 1");
        $stmt->execute([$id]);
        $run = $stmt->fetch(\PDO::FETCH_ASSOC);
        if (!$run) return jsonResponse($response, ['error' => 'Không có Tiên Cảnh hoạt động!'], 400);

        if ($player->isHospitalized()) return jsonResponse($response, ['error' => 'Đang tịnh dưỡng!'], 400);

        $baseMap = $findMap($run['map_id']);
        $tierInfo = $findTier((int)$run['tier']);
        if (!$baseMap || !$tierInfo) return jsonResponse($response, ['error' => 'Dữ liệu lỗi!'], 500);

        $currentWave = (int)$run['current_wave'];
        $totalWaves = (int)$run['total_waves'];
        $isBoss = ($currentWave === $totalWaves);
        $modifiers = json_decode($run['modifiers'] ?? '[]', true);

        // Build monster
        if ($isBoss) {
            $monsterData = $baseMap['boss'];
        } else {
            $pool = $baseMap['monsterPool'];
            $monsterId = $pool[array_rand($pool)];
            $monsterData = GameDataRepository::getMonsterById($monsterId);
            if (!$monsterData) {
                $monsterData = ['id' => 'tc_mob', 'name' => 'Tiên Cảnh Yêu Thú', 'stats' => ['hp' => 50, 'strength' => 10, 'speed' => 8, 'dexterity' => 8, 'defense' => 5], 'xpReward' => 50, 'goldReward' => [10, 20], 'drops' => []];
            }
        }

        // Scale by tier
        $scale = $tierInfo['scale'];
        foreach (['hp', 'strength', 'speed', 'dexterity', 'defense'] as $s) {
            $monsterData['stats'][$s] = (int)round(($monsterData['stats'][$s] ?? 10) * $scale * (1 + ($currentWave - 1) * 0.08));
        }

        // Apply modifiers to monster
        foreach ($modifiers as $mod) {
            $modDef = null;
            foreach ($getTCData()['modifiers'] as $m) { if ($m['id'] === $mod['id']) { $modDef = $m; break; } }
            if (!$modDef) continue;
            $eff = $modDef['effect'] ?? [];
            if (!empty($eff['monsterHpBonus'])) $monsterData['stats']['hp'] = (int)round($monsterData['stats']['hp'] * (1 + $eff['monsterHpBonus']));
            if (!empty($eff['monsterAtkBonus'])) $monsterData['stats']['strength'] = (int)round($monsterData['stats']['strength'] * (1 + $eff['monsterAtkBonus']));
            if (!empty($eff['monsterDefBonus'])) $monsterData['stats']['defense'] = (int)round($monsterData['stats']['defense'] * (1 + $eff['monsterDefBonus']));
            if ($isBoss && !empty($eff['bossStatBonus'])) {
                foreach (['hp', 'strength', 'speed', 'dexterity', 'defense'] as $s) {
                    $monsterData['stats'][$s] = (int)round($monsterData['stats'][$s] * (1 + $eff['bossStatBonus']));
                }
            }
            if (!empty($eff['randomElement'])) {
                $elements = ['fire', 'water', 'wood', 'earth', 'metal'];
                $monsterData['element'] = $elements[array_rand($elements)];
            }
        }

        $monster = \App\Models\Monster::fromData($monsterData);
        $engine = new CombatEngine();
        $result = $engine->fullCombat($player, $monster);
        $waveLoot = [];

        // Calculate IIQ from modifiers + atlas
        $iiqBonus = $player->atlasBonus;
        foreach ($modifiers as $mod) { $iiqBonus += $mod['iiqBonus'] ?? 0; }

        if ($result['result'] === 'win') {
            // Rewards
            $xpGain = (int)round(($monsterData['xpReward'] ?? 50) * (1 + $iiqBonus / 100));
            $goldMin = $monsterData['goldReward'][0] ?? 20;
            $goldMax = $monsterData['goldReward'][1] ?? 50;
            $goldGain = (int)round(mt_rand($goldMin, $goldMax) * (1 + $iiqBonus / 100));
            $player->gainXp($xpGain);
            $player->gold += $goldGain;
            $waveLoot[] = "💎 {$goldGain} · ⭐ {$xpGain} XP";

            // Process drops
            foreach ($monsterData['drops'] ?? [] as $drop) {
                $dropChance = ($drop['chance'] ?? 0) * (1 + $iiqBonus / 100);
                if (mt_rand(1, 100) <= $dropChance) {
                    $qty = mt_rand($drop['qty'][0] ?? 1, $drop['qty'][1] ?? 1);
                    if ($drop['itemId'] === 'tien_do_drop') {
                        // Map drop!
                        $newMap = $generateMapDrop((int)$run['tier'], $iiqBonus);
                        if ($newMap) {
                            $player->tienCanhMaps[] = $newMap;
                            $waveLoot[] = "🗺️ Tiên Đồ mới: {$newMap['mapName']} (T{$newMap['tier']})!";
                        }
                    } else {
                        $player->materials[$drop['itemId']] = ($player->materials[$drop['itemId']] ?? 0) + $qty;
                        $waveLoot[] = "📦 {$drop['itemId']} x{$qty}";
                    }
                }
            }

            // Wave map drop (5% per wave)
            if (!$isBoss && mt_rand(1, 100) <= 5 + $iiqBonus / 5) {
                $bonusMap = $generateMapDrop((int)$run['tier'], $iiqBonus);
                if ($bonusMap) {
                    $player->tienCanhMaps[] = $bonusMap;
                    $waveLoot[] = "🗺️ Bonus: {$bonusMap['mapName']} (T{$bonusMap['tier']})!";
                }
            }

            if ($isBoss) {
                // Guaranteed map drop from boss
                $bossMapDrop = $generateMapDrop((int)$run['tier'], $iiqBonus + 20);
                if ($bossMapDrop) {
                    $player->tienCanhMaps[] = $bossMapDrop;
                    $waveLoot[] = "🗺️ Boss drop: {$bossMapDrop['mapName']} (T{$bossMapDrop['tier']})!";
                }

                // Atlas progress
                $player->atlasProgress[$run['map_id']] = ($player->atlasProgress[$run['map_id']] ?? 0) + 1;
                $player->atlasBonus = $calcAtlasBonus($player->atlasProgress);

                $pdo->prepare("UPDATE atlas_map_runs SET status = 'completed', boss_defeated = 1, completed_at = NOW(), loot_log = ? WHERE id = ?")
                    ->execute([json_encode($waveLoot), $run['id']]);
                savePlayer($id, $player);

                return jsonResponse($response, [
                    'result' => 'map_complete',
                    'message' => "🏆 Tiên Cảnh [{$baseMap['name']}] T{$run['tier']} hoàn thành!",
                    'wave' => $currentWave, 'totalWaves' => $totalWaves, 'isBoss' => true,
                    'combatLog' => $result['log'], 'loot' => $waveLoot,
                    'atlasProgress' => $player->atlasProgress, 'atlasBonus' => $player->atlasBonus,
                    'player' => $player->toArray(),
                ]);
            } else {
                $nextWave = $currentWave + 1;
                $pdo->prepare("UPDATE atlas_map_runs SET current_wave = ? WHERE id = ?")->execute([$nextWave, $run['id']]);
                savePlayer($id, $player);

                return jsonResponse($response, [
                    'result' => 'wave_cleared',
                    'message' => "⚔️ Tầng {$currentWave}/{$totalWaves} — Đã hạ {$monsterData['name']}!",
                    'wave' => $currentWave, 'totalWaves' => $totalWaves, 'nextWave' => $nextWave,
                    'isBoss' => false, 'combatLog' => $result['log'], 'loot' => $waveLoot,
                    'player' => $player->toArray(),
                ]);
            }
        } else {
            $pdo->prepare("UPDATE atlas_map_runs SET status = 'failed', completed_at = NOW() WHERE id = ?")->execute([$run['id']]);
            savePlayer($id, $player);

            return jsonResponse($response, [
                'result' => 'map_failed',
                'message' => "💀 Thất bại ở tầng {$currentWave}! Tiên Cảnh sụp đổ!",
                'wave' => $currentWave, 'totalWaves' => $totalWaves,
                'combatLog' => $result['log'], 'player' => $player->toArray(),
            ]);
        }
    });

    // === ABANDON ===
    $app->post('/api/player/{id}/atlas-maps/abandon', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $pdo = Database::pdo();
        $pdo->prepare("UPDATE atlas_map_runs SET status = 'abandoned', completed_at = NOW() WHERE player_id = ? AND status = 'active'")->execute([$id]);
        return jsonResponse($response, ['message' => '🚪 Đã rời Tiên Cảnh.']);
    });
};
