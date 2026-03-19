<?php

/**
 * Exploration Feature — Khám Phá Area
 */

use Slim\Psr7\Request;
use Slim\Psr7\Response;

return function ($app) {
    // Phase 5: Get Area Monsters. Auto-spawns up to 5 monsters based on time elapsed.
    $app->get('/api/player/{id}/area-monsters', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $now = time();
        $interval = 600; // 10 minutes = 1 spawn
        $maxMonsters = 5;

        $tracked = $player->trackedMonsters; // loaded via PlayerRepository
        $currentCount = count($tracked);

        // Check if we need to spawn more
        if ($currentCount < $maxMonsters && ($now - $player->lastMonsterSpawn) >= $interval) {
            $missedIntervals = floor(($now - $player->lastMonsterSpawn) / $interval);
            $spawnCount = min($maxMonsters - $currentCount, (int) $missedIntervals);

            if ($spawnCount > 0) {
                // Find monsters for this area
                $monstersFile = __DIR__ . '/../../../data/monsters.json';
                $allMonsters = file_exists($monstersFile) ? json_decode(file_get_contents($monstersFile), true) : [];
                $areaMonsters = array_filter($allMonsters, fn($m) => ($m['areaId'] ?? 'thanh_lam_tran') === $player->currentArea);
                if (empty($areaMonsters)) {
                    $areaMonsters = $allMonsters; // Fallback if no specific area set
                }
                $areaMonsters = array_values($areaMonsters);

                for ($i = 0; $i < $spawnCount; $i++) {
                    $randomMonster = $areaMonsters[array_rand($areaMonsters)];
                    // Push to tracked list
                    $tracked[] = [
                        'area_id' => $player->currentArea,
                        'monster_id' => $randomMonster['id'],
                        'current_hp' => $randomMonster['stats']['hp'],
                        'spawned_at' => $now
                    ];
                }

                $player->trackedMonsters = $tracked;
                // Compute new lastSpawn roughly based on intervals consumed
                $player->lastMonsterSpawn += $spawnCount * $interval;
                if ($player->lastMonsterSpawn > $now) $player->lastMonsterSpawn = $now;

                savePlayer($id, $player);
            }
        } elseif ($player->lastMonsterSpawn == 0) {
            $player->lastMonsterSpawn = $now;
            savePlayer($id, $player);
        }

        // Return full details of tracked monsters mapped from JSON
        $monstersFile = __DIR__ . '/../../../data/monsters.json';
        $allMonsters = file_exists($monstersFile) ? json_decode(file_get_contents($monstersFile), true) : [];
        $monstersMap = [];
        foreach ($allMonsters as $m) $monstersMap[$m['id']] = $m;

        $enrichedMonsters = array_map(function($tm) use ($monstersMap) {
            $base = $monstersMap[$tm['monster_id']] ?? null;
            if (!$base) return null;
            $base['instance_id'] = $tm['instance_id'] ?? null;
            $base['stats']['hp'] = (int) $tm['current_hp']; // Overwrite max hp with current hp conceptually, but frontend expects currentHp
            $base['currentHp'] = (int) $tm['current_hp'];
            return $base;
        }, $tracked);

        $enrichedMonsters = array_filter($enrichedMonsters); // remove nulls

        return jsonResponse($response, ['monsters' => array_values($enrichedMonsters)]);
    });

    // Phase 5: Track explicit found monster from Explore ("Để Lưu Lại")
    $app->post('/api/player/{id}/track-monster', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $body = json_decode($request->getBody()->getContents(), true);
        $monsterId = $body['monsterId'] ?? null;
        if (!$monsterId) return jsonResponse($response, ['error' => 'No monsterId provided'], 400);

        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        if (count($player->trackedMonsters) >= 5) {
            return jsonResponse($response, ['error' => 'Danh sách truy vết đã đầy (Tối đa 5 con)!'], 400);
        }

        $monstersFile = __DIR__ . '/../../../data/monsters.json';
        $allMonsters = file_exists($monstersFile) ? json_decode(file_get_contents($monstersFile), true) : [];
        $monstersMap = [];
        foreach ($allMonsters as $m) $monstersMap[$m['id']] = $m;

        $base = $monstersMap[$monsterId] ?? null;
        if (!$base) return jsonResponse($response, ['error' => 'Invalid monster'], 400);

        $player->trackedMonsters[] = [
            'area_id' => $player->currentArea,
            'monster_id' => $monsterId,
            'current_hp' => $base['stats']['hp'],
            'spawned_at' => time()
        ];
        
        savePlayer($id, $player);
        return jsonResponse($response, ['success' => true, 'message' => 'Lưu dấu vết thành công!']);
    });

    // API to explore the current area
    $app->post('/api/player/{id}/explore', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        if ($player->hospitalRemaining() > 0) {
            return jsonResponse($response, ['error' => 'Đang trọng thương, không thể khám phá!'], 400);
        }
        if ($player->jailUntil > time()) {
            return jsonResponse($response, ['error' => 'Đang ngồi tù...'], 400);
        }
        if ($player->isTraveling()) {
            return jsonResponse($response, ['error' => 'Đang di chuyển, không thể khám phá.'], 400);
        }

        $areaId = $player->currentArea;
        $explorationFile = __DIR__ . '/../../../data/exploration.json';
        $rates = file_exists($explorationFile) ? json_decode(file_get_contents($explorationFile), true) : [];
        $areaData = $rates[$areaId] ?? null;

        if (!$areaData) {
            return jsonResponse($response, ['error' => 'Khu vực này hiện tĩnh mịch, không thể khám phá.'], 400);
        }

        $cost = $areaData['staminaCost'] ?? 10;
        if (!$player->spendStamina($cost)) {
            return jsonResponse($response, ['error' => 'Không đủ thể lực.'], 400);
        }

        // RNG Roll based on weights
        $rollRates = $areaData['rates'];
        // Compute total weight
        $totalWeight = array_reduce($rollRates, fn($acc, $r) => $acc + $r['weight'], 0);
        $randomVal = mt_rand(1, $totalWeight);
        
        $cumulative = 0;
        $selectedEvent = null;
        foreach ($rollRates as $r) {
            $cumulative += $r['weight'];
            if ($randomVal <= $cumulative) {
                $selectedEvent = $r;
                break;
            }
        }

        $eventResult = ['type' => 'nothing', 'message' => 'Bạn dạo quanh một vòng nhưng chỉ thấy gió lùa.'];
        
        if ($selectedEvent) {
            $type = $selectedEvent['type'];
            if ($type === 'monster') {
                // Return exactly which monster was found so Frontend can Track or Fight
                $monstersFile = __DIR__ . '/../../../data/monsters.json';
                $allMonsters = file_exists($monstersFile) ? json_decode(file_get_contents($monstersFile), true)['monsters'] ?? [] : [];
                $areaMonsters = array_filter($allMonsters, fn($m) => (($m['areaId'] ?? 'thanh_lam_tran') === $player->currentArea) && empty($m['isWorldBoss']));
                if (empty($areaMonsters)) $areaMonsters = array_filter($allMonsters, fn($m) => empty($m['isWorldBoss']));
                $areaMonsters = array_values($areaMonsters);
                $foundMonster = $areaMonsters[array_rand($areaMonsters)];

                $eventResult = [
                    'type' => 'monster', 
                    'message' => 'Bạn phát hiện dã thú! (' . $foundMonster['name'] . ')',
                    'monsterId' => $foundMonster['id']
                ];
            } elseif ($type === 'worldBoss') {
                // Phase 9: World Boss encounter
                $monstersFile = __DIR__ . '/../../../data/monsters.json';
                $allMonsters = file_exists($monstersFile) ? json_decode(file_get_contents($monstersFile), true)['monsters'] ?? [] : [];
                $areaBosses = array_filter($allMonsters, fn($m) => !empty($m['isWorldBoss']) && ($m['areaId'] ?? '') === $player->currentArea);
                if (!empty($areaBosses)) {
                    $areaBosses = array_values($areaBosses);
                    $boss = $areaBosses[array_rand($areaBosses)];
                    $eventResult = [
                        'type' => 'worldBoss',
                        'message' => '🔥 CẢNH BÁO! Bạn phát hiện dấu tích của ' . $boss['name'] . '! Lãnh Chúa vùng đất này!',
                        'monsterId' => $boss['id'],
                        'monsterName' => $boss['name'],
                        'isWorldBoss' => true
                    ];
                } else {
                    $eventResult = ['type' => 'nothing', 'message' => 'Không khí nặng nề bao trùm... nhưng chẳng thấy gì.'];
                }
            } elseif ($type === 'material' && !empty($selectedEvent['pools'])) {
                $pool = $selectedEvent['pools'];
                $matId = $pool[array_rand($pool)];
                
                $player->materials[$matId] = ($player->materials[$matId] ?? 0) + 1;
                
                $materialsFile = __DIR__ . '/../../../data/materials.json';
                $allMaterials = file_exists($materialsFile) ? json_decode(file_get_contents($materialsFile), true)['materials'] ?? [] : [];
                $matName = $matId;
                $matCategory = 'basic';
                foreach ($allMaterials as $mat) {
                    if ($mat['id'] === $matId) {
                        $matName = $mat['name'];
                        $matCategory = $mat['category'] ?? 'basic';
                        break;
                    }
                }
                
                // Award gathering XP based on category
                if ($matCategory === 'herb') {
                    $player->gainSkillXp('hai_duoc', 10);
                } elseif ($matCategory === 'elemental' || $matCategory === 'spirit') {
                    $player->gainSkillXp('khai_khoang', 10);
                }

                // Phase 9: Update quest progress for collect-type quests
                $npcsFile = __DIR__ . '/../../../data/npcs.json';
                $npcsData = file_exists($npcsFile) ? json_decode(file_get_contents($npcsFile), true)['npcs'] ?? [] : [];
                $questNotifs = $player->updateQuestProgress('collect', $matId, 1, $npcsData);

                $eventResult = ['type' => 'material', 'message' => 'Bạn thu thập được ' . $matName . '.', 'itemId' => $matId, 'questNotifications' => $questNotifs];
            } elseif ($type === 'item' && !empty($selectedEvent['rarities'])) {
                $eventResult = ['type' => 'item', 'message' => 'Khám phá bí địa thấy một pháp bảo lấp lánh!'];
            } elseif ($type === 'npc' && !empty($selectedEvent['events'])) {
                // Phase 9: NPC Encounter — pick a real NPC matching this area
                $npcsFile = __DIR__ . '/../../../data/npcs.json';
                $npcsData = file_exists($npcsFile) ? json_decode(file_get_contents($npcsFile), true)['npcs'] ?? [] : [];
                $areaNpcs = array_filter($npcsData, fn($n) => in_array($player->currentArea, $n['areaIds'] ?? []));
                
                if (!empty($areaNpcs)) {
                    $areaNpcs = array_values($areaNpcs);
                    $npc = $areaNpcs[array_rand($areaNpcs)];
                    $eventResult = [
                        'type' => 'npc',
                        'message' => '🧓 Kỳ Ngộ! Bạn gặp ' . $npc['name'] . '!',
                        'npcId' => $npc['id'],
                        'npcName' => $npc['name'],
                        'npcIcon' => $npc['icon'] ?? '🧓',
                        'greeting' => $npc['greeting'] ?? 'Xin chào, hữu nhân.',
                        'hasQuests' => !empty($npc['quests'])
                    ];
                } else {
                    // Fallback: old hardcoded events
                    $events = $selectedEvent['events'];
                    $npcEvent = $events[array_rand($events)];
                    if ($npcEvent === 'old_man_buff' || $npcEvent === 'ghost_encounter') {
                        $player->currentHp = $player->maxHp;
                        $eventResult = ['type' => 'npc', 'message' => 'Gặp một tiền bối chỉ điểm, khí huyết hồi phục toàn bộ!'];
                    } elseif ($npcEvent === 'found_gold') {
                        $gold = mt_rand(5, 50);
                        $player->gold += $gold;
                        $eventResult = ['type' => 'npc', 'message' => "Tìm thấy $gold linh thạch rơi trên đường!"];
                    } else {
                        $eventResult = ['type' => 'npc', 'message' => 'Ngộ ra một đạo lý mới giữa thiên nhiên.'];
                    }
                }
            }
        }

        // Phase 9: Save quest progress if changed
        if (!empty($player->activeQuests)) {
            \App\Core\PlayerRepository::saveQuests($id, $player->activeQuests);
        }

        savePlayer($id, $player);

        return jsonResponse($response, [
            'player' => $player->toArray(),
            'event' => $eventResult,
            'cost' => $cost
        ]);
    });
};
