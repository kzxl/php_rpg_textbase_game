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

        // ========================================
        // SECRET REALM DISCOVERY (Kỳ Ngộ Bí Cảnh)
        // Rate: 6% (60/1000)
        // 2 Types:
        //   1. Timed: Countdown timer, expires and disappears
        //   2. Permanent: Extreme difficulty, monsters x2.0 - x3.5
        // ========================================
        if ($selectedEvent !== null) {
            $realmRoll = mt_rand(1, 1000);
            if ($realmRoll <= 60) {
                $disc = \App\Core\SecretRealmRegistry::generateDiscovery($player, $player->currentArea);
                if ($disc) {
                    $pdo = \App\Core\Database::pdo();
                    $stmt = $pdo->prepare("
                        INSERT INTO player_discovered_dungeons 
                        (player_id, dungeon_key, realm_type, name, description, tier, required_realm, difficulty_mult, waves, area_id, discovered_at, expires_at, is_cleared, status, monster_pool, boss_data, rewards_data)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 'available', ?, ?, ?)
                    ");
                    $stmt->execute([
                        $disc['player_id'],
                        $disc['dungeon_key'],
                        $disc['realm_type'],
                        $disc['name'],
                        $disc['description'],
                        $disc['tier'],
                        $disc['required_realm'],
                        $disc['difficulty_mult'],
                        $disc['waves'],
                        $disc['area_id'],
                        $disc['discovered_at'],
                        $disc['expires_at'],
                        $disc['monster_pool'],
                        $disc['boss_data'],
                        $disc['rewards_data'],
                    ]);
                    $discId = (int)$pdo->lastInsertId();

                    $isTimed = ($disc['realm_type'] === 'timed');
                    $expiresTimestamp = $disc['expires_at'] ? strtotime($disc['expires_at']) : null;
                    $remainingMinutes = $expiresTimestamp ? max(1, (int)round(($expiresTimestamp - time()) / 60)) : null;

                    if ($isTimed) {
                        $msg = "🌀 [KỲ NGỘ BÍ CẢNH] Không gian chấn động dữ dội! Bạn vô tình phát hiện [{$disc['name']}] đang hé mở lối vào! Linh khí đang tiêu tán nhanh chóng, bí cảnh sẽ biến mất sau {$remainingMinutes} phút! Hãy vào tab Bí Cảnh để khám phá ngay!";
                    } else {
                        $msg = "🌋 [CẤM ĐỊA THƯỢNG CỔ] Động trời địa biến! Bạn đã đào phá phong ấn cổ xưa, khai mở vĩnh viễn [{$disc['name']}]! Nơi đây tử khí ngập tràn, quái thú cực kỳ hung hãn (Sức mạnh x{$disc['difficulty_mult']}), xin hãy chuẩn bị kỹ lưỡng!";
                    }

                    $eventResult = [
                        'type' => 'dungeon_discovery',
                        'discoveredId' => $discId,
                        'realmType' => $disc['realm_type'],
                        'dungeonKey' => $disc['dungeon_key'],
                        'name' => $disc['name'],
                        'description' => $disc['description'],
                        'tier' => $disc['tier'],
                        'difficultyMult' => $disc['difficulty_mult'],
                        'waves' => $disc['waves'],
                        'expiresAt' => $disc['expires_at'],
                        'remainingMinutes' => $remainingMinutes,
                        'message' => $msg,
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

            } elseif (($type === 'herb' || $type === 'mineral' || $type === 'material') && !empty($selectedEvent['pools'])) {
                $specialties = $areaData['specialties'] ?? [];
                
                // Helper to roll from weighted or unweighted pool while factoring in specialties
                $rollFromPool = function(array $pool, array $specialties): array {
                    $items = [];
                    $totalWeight = 0;
                    foreach ($pool as $entry) {
                        if (is_array($entry)) {
                            $id = $entry['id'];
                            $weight = (int)($entry['weight'] ?? 10);
                            $isSpec = !empty($entry['isSpecialty']) || in_array($id, $specialties);
                        } else {
                            $id = (string)$entry;
                            $isSpec = in_array($id, $specialties);
                            $weight = $isSpec ? 30 : 50;
                        }
                        $items[] = ['id' => $id, 'weight' => $weight, 'isSpecialty' => $isSpec];
                        $totalWeight += $weight;
                    }
                    $roll = mt_rand(1, max(1, $totalWeight));
                    $cum = 0;
                    foreach ($items as $item) {
                        $cum += $item['weight'];
                        if ($roll <= $cum) {
                            return $item;
                        }
                    }
                    return $items[0] ?? ['id' => (is_array($pool[0]) ? $pool[0]['id'] : $pool[0]), 'isSpecialty' => false];
                };

                $picked = $rollFromPool($selectedEvent['pools'], $specialties);
                $matId = $picked['id'];
                $isSpecialty = $picked['isSpecialty'];

                $matData = GameDataRepository::getMaterialById($matId);
                $matName = $matData ? $matData['name'] : $matId;
                $matCategory = $matData ? ($matData['category'] ?? 'basic') : 'basic';
                $tier = (int)($matData['tier'] ?? 1);

                // Determine effective handler type
                $effectiveType = $type;
                if ($type === 'material') {
                    $isHerb = ($matCategory === 'herb') || str_contains($matId, 'thao') || str_contains($matId, 'chi') || str_contains($matId, 'hoa') || str_contains($matId, 'diep');
                    $isMineral = ($matCategory === 'elemental' || $matCategory === 'spirit' || str_contains($matId, 'thach') || str_contains($matId, 'tinh') || str_contains($matId, 'kim_loai') || str_contains($matId, 'loi_dia') || str_contains($matId, 'khoang'));
                    if ($isHerb) $effectiveType = 'herb';
                    elseif ($isMineral) $effectiveType = 'mineral';
                }

                if ($effectiveType === 'herb') {
                    $skillLevel = $player->getSkillLevel('hai_duoc');
                    if ($skillLevel <= 0) $skillLevel = 1;

                    // Base yield + specialty bonus
                    $baseQty = 1 + intdiv(max(0, $skillLevel - 1), 3);
                    $critChance = min(50, 10 + $skillLevel * 3);
                    $isCritical = mt_rand(1, 100) <= $critChance;
                    $quantity = $isCritical ? ($baseQty * 2) : $baseQty;

                    // Bonus spirit stones on crit / specialty
                    $bonusGold = $isCritical ? mt_rand(10, 30) * max(1, $tier) : 0;
                    if ($isSpecialty) $bonusGold += mt_rand(15, 30);
                    if ($bonusGold > 0) $player->gold += $bonusGold;

                    $player->materials[$matId] = ($player->materials[$matId] ?? 0) + $quantity;

                    // XP Gain based on Tier + crit + specialty
                    $xpGained = ($tier * 15) + ($isCritical ? 10 : 0) + ($isSpecialty ? 15 : 0);
                    $levelUp = $player->gainSkillXp('hai_duoc', $xpGained);

                    \App\Core\PlayerRepository::saveSkills($id, $player);

                    $npcsData = GameDataRepository::getNpcs();
                    $questNotifs = $player->updateQuestProgress('collect', $matId, $quantity, $npcsData);

                    $msg = $isSpecialty
                        ? ($isCritical
                            ? "🌟 [BỘI THU ĐẶC SẢN VÙNG MIỀN] Nhờ Hái Dược thuật tinh thấu (Cấp {$skillLevel}), bạn thu hoạch trọn vẹn {$quantity}x {$matName} (Đặc sản {$areaData['name']})!"
                            : "🌟 [ĐẶC THÙ BẢN ĐỒ] Tìm thấy linh thảo đặc trưng của {$areaData['name']}! Thu hái được {$quantity}x {$matName}.")
                        : ($isCritical
                            ? "🌟 [BỘI THU DƯỢC LIỆU] Nhờ Hái Dược thuật tinh thấu (Cấp {$skillLevel}), bạn thu hoạch trọn vẹn {$quantity}x {$matName}!"
                            : "🌿 Phát hiện linh thảo sinh trưởng! Thu hái được {$quantity}x {$matName}.");

                    $eventResult = [
                        'type' => 'herb',
                        'title' => $isSpecialty ? "🌟 Dược Thảo Đặc Thù ({$areaData['name']})" : '🌿 Dược Thảo Thiên Nhiên',
                        'message' => $msg,
                        'itemId' => $matId,
                        'itemName' => $matName,
                        'quantity' => $quantity,
                        'isCritical' => $isCritical,
                        'isSpecialty' => $isSpecialty,
                        'areaName' => $areaData['name'],
                        'skillId' => 'hai_duoc',
                        'skillName' => 'Hái Dược',
                        'skillLevel' => $skillLevel,
                        'skillXpGained' => $xpGained,
                        'levelUp' => $levelUp,
                        'bonusGold' => $bonusGold,
                        'questNotifications' => $questNotifs
                    ];

                } elseif ($effectiveType === 'mineral') {
                    $skillLevel = $player->getSkillLevel('khai_khoang');
                    if ($skillLevel <= 0) $skillLevel = 1;

                    $baseQty = 1 + intdiv(max(0, $skillLevel - 1), 3);
                    $critChance = min(50, 10 + $skillLevel * 3);
                    $isCritical = mt_rand(1, 100) <= $critChance;
                    $quantity = $isCritical ? ($baseQty * 2) : $baseQty;

                    $bonusGold = $isCritical ? mt_rand(15, 40) * max(1, $tier) : 0;
                    if ($isSpecialty) $bonusGold += mt_rand(20, 45);
                    if ($bonusGold > 0) $player->gold += $bonusGold;

                    $player->materials[$matId] = ($player->materials[$matId] ?? 0) + $quantity;

                    $xpGained = ($tier * 15) + ($isCritical ? 10 : 0) + ($isSpecialty ? 15 : 0);
                    $levelUp = $player->gainSkillXp('khai_khoang', $xpGained);

                    \App\Core\PlayerRepository::saveSkills($id, $player);

                    $npcsData = GameDataRepository::getNpcs();
                    $questNotifs = $player->updateQuestProgress('collect', $matId, $quantity, $npcsData);

                    $msg = $isSpecialty
                        ? ($isCritical
                            ? "💎 [ĐẠI MẠCH KHOÁNG BẢN ĐỊA] Đục thủng cổ thạch (Khai Khoáng Cấp {$skillLevel}), bạn đào được {$quantity}x {$matName} (Đặc sản {$areaData['name']})!"
                            : "💎 [KHOÁNG MẠCH BẢN ĐỊA] Phát hiện khoáng thạch đặc thù của {$areaData['name']}! Khai thác được {$quantity}x {$matName}.")
                        : ($isCritical
                            ? "💎 [MẠCH KHOÁNG ĐẠI PHÁT] Đục thủng cổ thạch (Khai Khoáng Cấp {$skillLevel}), bạn khai thác được {$quantity}x {$matName} thượng phẩm!"
                            : "⛏️ Phát hiện quặng tinh thạch thiên địa! Khai thác được {$quantity}x {$matName}.");

                    $eventResult = [
                        'type' => 'mineral',
                        'title' => $isSpecialty ? "💎 Mạch Khoáng Đặc Thù ({$areaData['name']})" : '⛏️ Mạch Khoáng Thiên Địa',
                        'message' => $msg,
                        'itemId' => $matId,
                        'itemName' => $matName,
                        'quantity' => $quantity,
                        'isCritical' => $isCritical,
                        'isSpecialty' => $isSpecialty,
                        'areaName' => $areaData['name'],
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
                        'message' => $isSpecialty
                            ? "🌟 [VẬT LIỆU BẢN ĐỊA] Nhặt được {$quantity}x {$matName} (Đặc sản {$areaData['name']}) từ tàn tích hoang dã."
                            : "📦 Nhặt được {$quantity}x {$matName} từ tàn tích hoang dã.",
                        'itemId' => $matId,
                        'itemName' => $matName,
                        'quantity' => $quantity,
                        'isSpecialty' => $isSpecialty,
                        'areaName' => $areaData['name'],
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
