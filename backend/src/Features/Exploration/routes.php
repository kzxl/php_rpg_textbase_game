<?php

/**
 * Exploration Feature — Khám Phá Area
 * Uses GameDataRepository (DB) instead of JSON files.
 */

use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Core\GameDataRepository;

return function ($app) {
    // Get all exploration areas config
    $app->get('/api/data/exploration', function (Request $request, Response $response) {
        $areas = GameDataRepository::getAreas();
        return jsonResponse($response, $areas);
    });

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

        // Không giới hạn khi thêm thủ công từ khám phá
        // maxMonsters = 5 chỉ áp dụng cho auto-spawn theo thời gian

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
        if ($player->isTraveling()) {
            return jsonResponse($response, ['error' => 'Đang di chuyển, không thể khám phá.'], 400);
        }

        $areaId = $player->currentArea;
        $areaData = GameDataRepository::getAreaById($areaId);

        if (!$areaData) {
            return jsonResponse($response, ['error' => 'Khu vực này hiện tĩnh mịch, không thể khám phá.'], 400);
        }

        $cost = (int)($areaData['staminaCost'] ?? $areaData['stamina_cost'] ?? 10);
        if (!$player->spendStamina($cost)) {
            return jsonResponse($response, [
                'error' => "Không đủ thể lực! Dò thám [{$areaData['name']}] cần {$cost} Thể Lực (Hiện có: {$player->currentStamina}/{$player->maxStamina}).",
                'requiredStamina' => $cost,
                'currentStamina' => $player->currentStamina,
            ], 400);
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
        
        // ========================================
        // GLOBAL SKILL DISCOVERY (Cơ duyên Thần Thông)
        // Rate: 0.5% (Trung bình khó - game lâu dài)
        // ========================================
        $skillRoll = mt_rand(1, 1000);
        if ($skillRoll <= 5) {
            $allSkills = GameDataRepository::getSkills();
            if (!empty($allSkills)) {
                $foundSkill = $allSkills[array_rand($allSkills)];
                // Ktra xem đã học chưa
                $learnedIds = array_map(fn($s) => is_array($s) ? $s['id'] : $s, $player->skills);
                if (!in_array($foundSkill['id'], $learnedIds)) {
                    $player->learnSkill($foundSkill);
                    $eventResult = [
                        'type' => 'skill',
                        'message' => '✨ Cơ duyên tề thiên! Bạn vô tình nhặt được tàn quyển [' . $foundSkill['name'] . '] và giác ngộ thần thông!',
                        'skillId' => $foundSkill['id']
                    ];
                    // Skip regular area event
                    $selectedEvent = null; 
                }
            }
        }

        // ========================================
        // PLAYER ENCOUNTER (Đụng độ Người chơi)
        // Rate: 15%
        // ========================================
        if ($selectedEvent !== null) { // Chỉ lọt vào đây nếu chưa trúng Skill
            $playerRoll = mt_rand(1, 100);
            if ($playerRoll <= 15) {
                $pdo = \App\Core\Database::pdo();
                $stmt = $pdo->prepare("SELECT id, name, gender, level, current_hp, max_hp FROM players WHERE current_area = ? AND id != ? AND current_hp > 0 ORDER BY RAND() LIMIT 1");
                $stmt->execute([$player->currentArea, $player->id]);
                $otherPlayer = $stmt->fetch(\PDO::FETCH_ASSOC);
                if ($otherPlayer) {
                    $eventResult = [
                        'type' => 'player_encounter',
                        'message' => 'Ngọa hổ tàng long! Bạn giật mình nhận ra Đạo hữu [' . $otherPlayer['name'] . '] (Lv. ' . $otherPlayer['level'] . ') cũng đang ở đây.',
                        'player' => $otherPlayer
                    ];
                    $selectedEvent = null; // Skip regular area event
                }
            }
        }
        
        if ($selectedEvent) {
            $type = $selectedEvent['type'];

            if ($type === 'monster') {
                $areaMonsters = GameDataRepository::getMonstersByArea($player->currentArea);
                if (empty($areaMonsters)) $areaMonsters = GameDataRepository::getAllMonsters();
                $foundMonster = $areaMonsters[array_rand($areaMonsters)];

                // 30% chance monster ambushes the player
                $ambushRoll = mt_rand(1, 100);
                if ($ambushRoll <= 30) {
                    // Forced combat — monster attacks first!
                    $monster = new \App\Models\Monster(
                        $foundMonster['id'],
                        $foundMonster['name'],
                        $foundMonster['stats'],
                        $foundMonster['xpReward'] ?? 20
                    );
                    $monster->level = $foundMonster['tier'] ?? 1;
                    $combat = new \App\Core\CombatEngine();
                    $result = $combat->fullCombat($player, $monster);

                    savePlayer($id, $player);

                    $eventResult = [
                        'type' => 'monster_ambush',
                        'message' => '⚠️ ' . $foundMonster['name'] . ' bất ngờ tập kích bạn!',
                        'monsterId' => $foundMonster['id'],
                        'monsterName' => $foundMonster['name'],
                        'combatResult' => $result,
                    ];
                } else {
                    $eventResult = [
                        'type' => 'monster', 
                        'message' => 'Bạn phát hiện dã thú! (' . $foundMonster['name'] . ')',
                        'monsterId' => $foundMonster['id']
                    ];
                }

            } elseif ($type === 'worldBoss') {
                $areaBosses = GameDataRepository::getWorldBossesByArea($player->currentArea);
                if (!empty($areaBosses)) {
                    $boss = $areaBosses[array_rand($areaBosses)];
                    $eventResult = [
                        'type' => 'worldBoss',
                        'message' => '🔥 CẢNH BÁO! Bạn phát hiện dấu tích của ' . $boss['name'] . '! Lãnh Chúa vùng đất này!',
                        'monsterId' => $boss['id'],
                        'monsterName' => $boss['name'],
                        'bossStats' => $boss['stats'] ?? [],
                        'isWorldBoss' => true,
                        'actions' => [
                            ['id' => 'solo', 'name' => '⚔️ Tự Tấn Công', 'desc' => 'Đơn thân tử chiến với Boss'],
                            ['id' => 'rally', 'name' => '📢 Phát Động', 'desc' => 'Thông báo cho mọi người cùng đánh']
                        ]
                    ];
                } else {
                    $eventResult = ['type' => 'nothing', 'message' => 'Không khí nặng nề bao trùm... nhưng chẳng thấy gì.'];
                }

            } elseif ($type === 'herb' && !empty($selectedEvent['pools'])) {
                $pool = $selectedEvent['pools'];
                $matId = $pool[array_rand($pool)];
                $matData = GameDataRepository::getMaterialById($matId);
                $matName = $matData ? $matData['name'] : $matId;
                $tier = (int)($matData['tier'] ?? 1);

                $skillLevel = $player->getSkillLevel('hai_duoc');
                if ($skillLevel <= 0) $skillLevel = 1;

                // Yield: 1 + floor((skillLevel - 1) / 3) => Lv1-3: 1, Lv4-6: 2, Lv7-9: 3, Lv10+: 4
                $baseQty = 1 + intdiv(max(0, $skillLevel - 1), 3);

                // Critical Harvest proc: base 10% + 3% per level (capped at 50%)
                $critChance = min(50, 10 + $skillLevel * 3);
                $isCritical = mt_rand(1, 100) <= $critChance;
                $quantity = $isCritical ? ($baseQty * 2) : $baseQty;

                // Bonus Spirit Stones if critical
                $bonusGold = $isCritical ? mt_rand(10, 30) * max(1, $tier) : 0;
                if ($bonusGold > 0) {
                    $player->gold += $bonusGold;
                }

                $player->materials[$matId] = ($player->materials[$matId] ?? 0) + $quantity;

                // XP Gain based on Tier: Tier * 15 + (critical ? 10 : 0)
                $xpGained = ($tier * 15) + ($isCritical ? 10 : 0);
                $levelUp = $player->gainSkillXp('hai_duoc', $xpGained);

                \App\Core\PlayerRepository::saveSkills($id, $player);

                // Quest progress for collect-type quests
                $npcsData = GameDataRepository::getNpcs();
                $questNotifs = $player->updateQuestProgress('collect', $matId, $quantity, $npcsData);

                $eventResult = [
                    'type' => 'herb',
                    'title' => '🌿 Dược Thảo Thiên Nhiên',
                    'message' => $isCritical
                        ? "🌟 [BỘI THU DƯỢC LIỆU] Nhờ Hái Dược thuật tinh thấu (Cấp {$skillLevel}), bạn thu hoạch trọn vẹn {$quantity}x {$matName}!"
                        : "🌿 Phát hiện linh thảo sinh trưởng! Thu hái được {$quantity}x {$matName}.",
                    'itemId' => $matId,
                    'itemName' => $matName,
                    'quantity' => $quantity,
                    'isCritical' => $isCritical,
                    'skillId' => 'hai_duoc',
                    'skillName' => 'Hái Dược',
                    'skillLevel' => $skillLevel,
                    'skillXpGained' => $xpGained,
                    'levelUp' => $levelUp,
                    'bonusGold' => $bonusGold,
                    'questNotifications' => $questNotifs
                ];

            } elseif ($type === 'mineral' && !empty($selectedEvent['pools'])) {
                $pool = $selectedEvent['pools'];
                $matId = $pool[array_rand($pool)];
                $matData = GameDataRepository::getMaterialById($matId);
                $matName = $matData ? $matData['name'] : $matId;
                $tier = (int)($matData['tier'] ?? 1);

                $skillLevel = $player->getSkillLevel('khai_khoang');
                if ($skillLevel <= 0) $skillLevel = 1;

                // Yield: 1 + floor((skillLevel - 1) / 3) => Lv1-3: 1, Lv4-6: 2, Lv7-9: 3, Lv10+: 4
                $baseQty = 1 + intdiv(max(0, $skillLevel - 1), 3);

                // Deep Vein Critical proc: base 10% + 3% per level (capped at 50%)
                $critChance = min(50, 10 + $skillLevel * 3);
                $isCritical = mt_rand(1, 100) <= $critChance;
                $quantity = $isCritical ? ($baseQty * 2) : $baseQty;

                // Bonus Spirit Stones if critical
                $bonusGold = $isCritical ? mt_rand(15, 40) * max(1, $tier) : 0;
                if ($bonusGold > 0) {
                    $player->gold += $bonusGold;
                }

                $player->materials[$matId] = ($player->materials[$matId] ?? 0) + $quantity;

                // XP Gain based on Tier: Tier * 15 + (critical ? 10 : 0)
                $xpGained = ($tier * 15) + ($isCritical ? 10 : 0);
                $levelUp = $player->gainSkillXp('khai_khoang', $xpGained);

                \App\Core\PlayerRepository::saveSkills($id, $player);

                // Quest progress for collect-type quests
                $npcsData = GameDataRepository::getNpcs();
                $questNotifs = $player->updateQuestProgress('collect', $matId, $quantity, $npcsData);

                $eventResult = [
                    'type' => 'mineral',
                    'title' => '⛏️ Mạch Khoáng Thiên Địa',
                    'message' => $isCritical
                        ? "💎 [MẠCH KHOÁNG ĐẠI PHÁT] Đục thủng cổ thạch (Khai Khoáng Cấp {$skillLevel}), bạn khai thác được {$quantity}x {$matName} thượng phẩm!"
                        : "⛏️ Phát hiện quặng tinh thạch thiên địa! Khai thác được {$quantity}x {$matName}.",
                    'itemId' => $matId,
                    'itemName' => $matName,
                    'quantity' => $quantity,
                    'isCritical' => $isCritical,
                    'skillId' => 'khai_khoang',
                    'skillName' => 'Khai Khoáng',
                    'skillLevel' => $skillLevel,
                    'skillXpGained' => $xpGained,
                    'levelUp' => $levelUp,
                    'bonusGold' => $bonusGold,
                    'questNotifications' => $questNotifs
                ];

            } elseif ($type === 'material' && !empty($selectedEvent['pools'])) {
                $pool = $selectedEvent['pools'];
                $matId = $pool[array_rand($pool)];
                $matData = GameDataRepository::getMaterialById($matId);
                $matName = $matData ? $matData['name'] : $matId;
                $matCategory = $matData ? ($matData['category'] ?? 'basic') : 'basic';
                $tier = (int)($matData['tier'] ?? 1);

                $isHerb = ($matCategory === 'herb') || str_contains($matId, 'thao') || str_contains($matId, 'chi') || str_contains($matId, 'hoa');
                $isMineral = ($matCategory === 'elemental' || $matCategory === 'spirit' || str_contains($matId, 'thach') || str_contains($matId, 'tinh') || str_contains($matId, 'kim_loai') || str_contains($matId, 'loi_dia'));

                if ($isHerb) {
                    $skillLevel = $player->getSkillLevel('hai_duoc');
                    if ($skillLevel <= 0) $skillLevel = 1;
                    $baseQty = 1 + intdiv(max(0, $skillLevel - 1), 3);
                    $critChance = min(50, 10 + $skillLevel * 3);
                    $isCritical = mt_rand(1, 100) <= $critChance;
                    $quantity = $isCritical ? ($baseQty * 2) : $baseQty;
                    $bonusGold = $isCritical ? mt_rand(10, 30) * max(1, $tier) : 0;
                    if ($bonusGold > 0) $player->gold += $bonusGold;
                    $player->materials[$matId] = ($player->materials[$matId] ?? 0) + $quantity;
                    $xpGained = ($tier * 15) + ($isCritical ? 10 : 0);
                    $levelUp = $player->gainSkillXp('hai_duoc', $xpGained);
                    \App\Core\PlayerRepository::saveSkills($id, $player);
                    $npcsData = GameDataRepository::getNpcs();
                    $questNotifs = $player->updateQuestProgress('collect', $matId, $quantity, $npcsData);
                    $eventResult = [
                        'type' => 'herb',
                        'title' => '🌿 Dược Thảo Thiên Nhiên',
                        'message' => $isCritical
                            ? "🌟 [BỘI THU DƯỢC LIỆU] Nhờ Hái Dược thuật tinh thấu (Cấp {$skillLevel}), bạn thu hoạch trọn vẹn {$quantity}x {$matName}!"
                            : "🌿 Phát hiện linh thảo sinh trưởng! Thu hái được {$quantity}x {$matName}.",
                        'itemId' => $matId,
                        'itemName' => $matName,
                        'quantity' => $quantity,
                        'isCritical' => $isCritical,
                        'skillId' => 'hai_duoc',
                        'skillName' => 'Hái Dược',
                        'skillLevel' => $skillLevel,
                        'skillXpGained' => $xpGained,
                        'levelUp' => $levelUp,
                        'bonusGold' => $bonusGold,
                        'questNotifications' => $questNotifs
                    ];
                } elseif ($isMineral) {
                    $skillLevel = $player->getSkillLevel('khai_khoang');
                    if ($skillLevel <= 0) $skillLevel = 1;
                    $baseQty = 1 + intdiv(max(0, $skillLevel - 1), 3);
                    $critChance = min(50, 10 + $skillLevel * 3);
                    $isCritical = mt_rand(1, 100) <= $critChance;
                    $quantity = $isCritical ? ($baseQty * 2) : $baseQty;
                    $bonusGold = $isCritical ? mt_rand(15, 40) * max(1, $tier) : 0;
                    if ($bonusGold > 0) $player->gold += $bonusGold;
                    $player->materials[$matId] = ($player->materials[$matId] ?? 0) + $quantity;
                    $xpGained = ($tier * 15) + ($isCritical ? 10 : 0);
                    $levelUp = $player->gainSkillXp('khai_khoang', $xpGained);
                    \App\Core\PlayerRepository::saveSkills($id, $player);
                    $npcsData = GameDataRepository::getNpcs();
                    $questNotifs = $player->updateQuestProgress('collect', $matId, $quantity, $npcsData);
                    $eventResult = [
                        'type' => 'mineral',
                        'title' => '⛏️ Mạch Khoáng Thiên Địa',
                        'message' => $isCritical
                            ? "💎 [MẠCH KHOÁNG ĐẠI PHÁT] Đục thủng cổ thạch (Khai Khoáng Cấp {$skillLevel}), bạn khai thác được {$quantity}x {$matName} thượng phẩm!"
                            : "⛏️ Phát hiện quặng tinh thạch thiên địa! Khai thác được {$quantity}x {$matName}.",
                        'itemId' => $matId,
                        'itemName' => $matName,
                        'quantity' => $quantity,
                        'isCritical' => $isCritical,
                        'skillId' => 'khai_khoang',
                        'skillName' => 'Khai Khoáng',
                        'skillLevel' => $skillLevel,
                        'skillXpGained' => $xpGained,
                        'levelUp' => $levelUp,
                        'bonusGold' => $bonusGold,
                        'questNotifications' => $questNotifs
                    ];
                } else {
                    $quantity = mt_rand(1, 2);
                    $player->materials[$matId] = ($player->materials[$matId] ?? 0) + $quantity;
                    $npcsData = GameDataRepository::getNpcs();
                    $questNotifs = $player->updateQuestProgress('collect', $matId, $quantity, $npcsData);
                    $eventResult = [
                        'type' => 'material',
                        'message' => "📦 Nhặt được {$quantity}x {$matName} từ tàn tích hoang dã.",
                        'itemId' => $matId,
                        'itemName' => $matName,
                        'quantity' => $quantity,
                        'questNotifications' => $questNotifs
                    ];
                }

            } elseif ($type === 'item' && !empty($selectedEvent['rarities'])) {
                $rarities = $selectedEvent['rarities'];
                $rarity = $rarities[array_rand($rarities)];
                $itemSys = new \App\Systems\ItemSystem();
                $item = null;
                $isManual = mt_rand(1, 100) <= 30; // 30% bí tịch

                if ($isManual) {
                    $manuals = array_filter($itemSys->getAll(), fn($i) => ($i['category'] ?? '') === 'manual' && ($i['rarity'] ?? 'common') === $rarity);
                    if (!empty($manuals)) {
                        $chosen = $manuals[array_rand($manuals)];
                        $item = $itemSys->createItem($chosen['id']);
                        $player->inventory[] = $item;
                        $eventResult = ['type' => 'item', 'message' => "Tuyệt vời! Tìm được một cuốn yếu quyết phủ bụi: {$item->name} ({$rarity}). Vui lòng xem ở Túi Đồ.", 'itemId' => $item->id];
                    }
                }

                if (!$item) {
                    $item = $itemSys->generateRandomItem($rarity);
                    $player->inventory[] = $item;
                    $eventResult = ['type' => 'item', 'message' => "Khám phá bí địa thấy một pháp bảo lấp lánh: {$item->name} ({$rarity}).", 'itemId' => $item->id];
                }

            } elseif ($type === 'npc') {
                $areaNpcs = GameDataRepository::getNpcsByArea($player->currentArea);
                
                if (!empty($areaNpcs)) {
                    $npc = $areaNpcs[array_rand($areaNpcs)];

                    // ========================================
                    // NPC KỲ NGỘ → STUDY EFFECTS
                    // ========================================
                    $studyEffect = null;
                    if (!empty($player->studyingNode) && $player->studyEndsAt > time()) {
                        $kyNgoRoll = mt_rand(1, 1000); // Base 1000 for finer control
                        $remaining = $player->studyEndsAt - time();

                        // Điều chỉnh xuống mức cực khó (Game lâu dài)
                        if ($kyNgoRoll <= 20) { // 2%
                            // 🧓 Cao nhân chỉ điểm — giảm 20% study time
                            $reduce = (int)($remaining * 0.2);
                            $player->studyEndsAt -= $reduce;
                            $studyEffect = [
                                'type' => 'master_guidance',
                                'message' => '🧓 Cao nhân chỉ điểm! Tu luyện nhanh hơn 20%!',
                                'timeReduced' => $reduce
                            ];
                        } elseif ($kyNgoRoll <= 25) { // 0.5%
                            // 📜 Nhặt được bí tịch — hoàn thành ngay
                            $player->studyEndsAt = time();
                            $studyEffect = [
                                'type' => 'ancient_scroll',
                                'message' => '📜 Nhặt được bí tịch! Tu luyện hoàn thành ngay lập tức!',
                                'instantComplete' => true
                            ];
                        } elseif ($kyNgoRoll <= 50) { // 2.5%
                            // 🧠 Đột phá ngộ đạo — giảm 30%
                            $reduce = (int)($remaining * 0.3);
                            $player->studyEndsAt -= $reduce;
                            $studyEffect = [
                                'type' => 'enlightenment',
                                'message' => '🧠 Đột phá ngộ đạo! Tốc độ tu luyện tiến triển 30%!',
                                'timeReduced' => $reduce
                            ];
                        } elseif ($kyNgoRoll <= 100) { // 5%
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

                    // ========================================
                    // NPC QUEST OFFERING (with duplicate prevention)
                    // ========================================
                    $questOffer = null;
                    $questReminder = null;
                    if (!empty($npc['quests'])) {
                        $activeQuestIds = array_map(fn($q) => $q['id'] ?? '', $player->activeQuests ?? []);
                        $availableQuests = array_filter($npc['quests'], fn($qId) => !in_array($qId, $activeQuestIds));
                        
                        if (!empty($availableQuests)) {
                            // Offer first available quest
                            $questId = reset($availableQuests);
                            $questOffer = [
                                'questId' => $questId,
                                'npcId' => $npc['id'],
                                'npcName' => $npc['name'],
                                'message' => ($npc['icon'] ?? '🧓') . ' ' . $npc['name'] . ': "Ta có một nhiệm vụ cho ngươi..."'
                            ];
                        } else {
                            // All quests already accepted
                            $questReminder = [
                                'message' => ($npc['icon'] ?? '🧓') . ' ' . $npc['name'] . ': "Ngươi chưa hoàn thành nhiệm vụ ta giao sao? Đi đi, xong rồi hãy quay lại!"'
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
                        'questOffer' => $questOffer,
                        'questReminder' => $questReminder,
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
