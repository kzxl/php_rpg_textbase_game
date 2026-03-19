<?php

/**
 * Exploration Feature — Khám Phá Area
 * Uses GameDataRepository (DB) instead of JSON files.
 */

use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Core\GameDataRepository;

return function ($app) {
    // Phase 5: Get Area Monsters. Auto-spawns up to 5 monsters based on time elapsed.
    $app->get('/api/player/{id}/area-monsters', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $now = time();
        $interval = 600; // 10 minutes = 1 spawn
        $maxMonsters = 5;

        $tracked = $player->trackedMonsters;
        $currentCount = count($tracked);

        if ($currentCount < $maxMonsters && ($now - $player->lastMonsterSpawn) >= $interval) {
            $missedIntervals = floor(($now - $player->lastMonsterSpawn) / $interval);
            $spawnCount = min($maxMonsters - $currentCount, (int) $missedIntervals);

            if ($spawnCount > 0) {
                $areaMonsters = GameDataRepository::getMonstersByArea($player->currentArea);
                if (empty($areaMonsters)) $areaMonsters = GameDataRepository::getAllMonsters();

                for ($i = 0; $i < $spawnCount; $i++) {
                    $randomMonster = $areaMonsters[array_rand($areaMonsters)];
                    $tracked[] = [
                        'area_id' => $player->currentArea,
                        'monster_id' => $randomMonster['id'],
                        'current_hp' => $randomMonster['stats']['hp'],
                        'spawned_at' => $now
                    ];
                }

                $player->trackedMonsters = $tracked;
                $player->lastMonsterSpawn = $now;
                savePlayer($id, $player);
            }
        }

        // Enrich tracked monsters with full details
        $enrichedMonsters = [];
        foreach ($tracked as $tm) {
            $base = GameDataRepository::getMonsterById($tm['monster_id']);
            if (!$base) continue;
            $base['instance_id'] = $tm['instance_id'] ?? null;
            $base['currentHp'] = (int) $tm['current_hp'];
            $enrichedMonsters[] = $base;
        }

        return jsonResponse($response, ['monsters' => $enrichedMonsters]);
    });

    // Phase 5: Track explicit found monster from Explore
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

        $base = GameDataRepository::getMonsterById($monsterId);
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
        $areaData = GameDataRepository::getAreaById($areaId);

        if (!$areaData) {
            return jsonResponse($response, ['error' => 'Khu vực này hiện tĩnh mịch, không thể khám phá.'], 400);
        }

        $cost = $areaData['staminaCost'] ?? 10;
        if (!$player->spendStamina($cost)) {
            return jsonResponse($response, ['error' => 'Không đủ thể lực.'], 400);
        }

        // RNG Roll based on weights
        $rollRates = $areaData['rates'];
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
                $areaMonsters = GameDataRepository::getMonstersByArea($player->currentArea);
                if (empty($areaMonsters)) $areaMonsters = GameDataRepository::getAllMonsters();
                $foundMonster = $areaMonsters[array_rand($areaMonsters)];
                $eventResult = [
                    'type' => 'monster', 
                    'message' => 'Bạn phát hiện dã thú! (' . $foundMonster['name'] . ')',
                    'monsterId' => $foundMonster['id']
                ];

            } elseif ($type === 'worldBoss') {
                $areaBosses = GameDataRepository::getWorldBossesByArea($player->currentArea);
                if (!empty($areaBosses)) {
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
                
                $matData = GameDataRepository::getMaterialById($matId);
                $matName = $matData ? $matData['name'] : $matId;
                $matCategory = $matData ? ($matData['category'] ?? 'basic') : 'basic';
                
                if ($matCategory === 'herb') {
                    $player->gainSkillXp('hai_duoc', 10);
                } elseif ($matCategory === 'elemental' || $matCategory === 'spirit') {
                    $player->gainSkillXp('khai_khoang', 10);
                }

                // Quest progress for collect-type quests
                $npcsData = GameDataRepository::getNpcs();
                $questNotifs = $player->updateQuestProgress('collect', $matId, 1, $npcsData);
                $eventResult = ['type' => 'material', 'message' => 'Bạn thu thập được ' . $matName . '.', 'itemId' => $matId, 'questNotifications' => $questNotifs];

            } elseif ($type === 'item' && !empty($selectedEvent['rarities'])) {
                $eventResult = ['type' => 'item', 'message' => 'Khám phá bí địa thấy một pháp bảo lấp lánh!'];

            } elseif ($type === 'npc' && !empty($selectedEvent['events'])) {
                // Phase 9+: NPC Encounter — pick a real NPC matching this area
                $areaNpcs = GameDataRepository::getNpcsByArea($player->currentArea);
                
                if (!empty($areaNpcs)) {
                    $npc = $areaNpcs[array_rand($areaNpcs)];

                    // ========================================
                    // NPC KỲ NGỘ → STUDY EFFECTS
                    // ========================================
                    $studyEffect = null;
                    if (!empty($player->studyingNode) && $player->studyEndsAt > time()) {
                        $kyNgoRoll = mt_rand(1, 100);
                        $remaining = $player->studyEndsAt - time();

                        if ($kyNgoRoll <= 8) {
                            // 🧓 Cao nhân chỉ điểm — giảm 30% study time
                            $reduce = (int)($remaining * 0.3);
                            $player->studyEndsAt -= $reduce;
                            $studyEffect = [
                                'type' => 'master_guidance',
                                'message' => '🧓 Cao nhân chỉ điểm! Tu luyện nhanh hơn 30%!',
                                'timeReduced' => $reduce
                            ];
                        } elseif ($kyNgoRoll <= 12) {
                            // 📜 Nhặt được bí tịch — hoàn thành ngay
                            $player->studyEndsAt = time();
                            $studyEffect = [
                                'type' => 'ancient_scroll',
                                'message' => '📜 Nhặt được bí tịch! Tu luyện hoàn thành ngay lập tức!',
                                'instantComplete' => true
                            ];
                        } elseif ($kyNgoRoll <= 20) {
                            // 🧠 Đột phá ngộ đạo — gấp đôi tốc (giảm 50%)
                            $reduce = (int)($remaining * 0.5);
                            $player->studyEndsAt -= $reduce;
                            $studyEffect = [
                                'type' => 'enlightenment',
                                'message' => '🧠 Đột phá ngộ đạo! Tốc độ tu luyện x2!',
                                'timeReduced' => $reduce
                            ];
                        } elseif ($kyNgoRoll <= 28) {
                            // ⚠️ Tẩu hỏa nhập ma — +50% time
                            $penalty = (int)($remaining * 0.5);
                            $player->studyEndsAt += $penalty;
                            $studyEffect = [
                                'type' => 'qi_deviation',
                                'message' => '⚠️ Tẩu hỏa nhập ma! Thời gian tu luyện tăng 50%!',
                                'timeAdded' => $penalty,
                                'isDebuff' => true
                            ];
                        }
                    }

                    $eventResult = [
                        'type' => 'npc',
                        'message' => '🧓 Kỳ Ngộ! Bạn gặp ' . $npc['name'] . '!',
                        'npcId' => $npc['id'],
                        'npcName' => $npc['name'],
                        'npcIcon' => $npc['icon'] ?? '🧓',
                        'greeting' => $npc['greeting'] ?? 'Xin chào, hữu nhân.',
                        'hasQuests' => !empty($npc['quests']),
                        'studyEffect' => $studyEffect
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

        // Save quest progress if changed
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
