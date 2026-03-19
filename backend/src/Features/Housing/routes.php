<?php

/**
 * Housing Feature — Động Phủ (Player Housing)
 *
 * Mechanics:
 * - Buy a home (gold sink!) → passive HP regen bonus + material garden
 * - Upgrade home tiers → better bonuses
 * - Dược Viên (Herb Garden): passive material income over time
 */

use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Core\Database;

return function ($app) {

    // Housing tier definitions
    $TIERS = [
        1 => ['name' => 'Thảo Lư',     'cost' => 500,   'hpRegen' => 1, 'gardenSlots' => 1, 'description' => 'Căn nhà tranh đơn sơ bên suối.'],
        2 => ['name' => 'Mộc Ốc',      'cost' => 2000,  'hpRegen' => 2, 'gardenSlots' => 2, 'description' => 'Nhà gỗ vững chắc, có vườn nhỏ.'],
        3 => ['name' => 'Thạch Các',    'cost' => 8000,  'hpRegen' => 3, 'gardenSlots' => 3, 'description' => 'Tòa đá kiên cố trên sườn núi.'],
        4 => ['name' => 'Linh Phủ',     'cost' => 25000, 'hpRegen' => 5, 'gardenSlots' => 4, 'description' => 'Phủ đệ linh khí dồi dào.'],
        5 => ['name' => 'Thiên Cung',   'cost' => 80000, 'hpRegen' => 8, 'gardenSlots' => 5, 'description' => 'Cung điện trên mây, đỉnh cao tu sĩ.'],
    ];

    // Garden herb yields
    $GARDEN_HERBS = [
        'linh_thao'       => ['name' => 'Linh Thảo',      'yieldTime' => 3600, 'qty' => [1, 2]],
        'huyet_thao'      => ['name' => 'Huyết Thảo',     'yieldTime' => 3600, 'qty' => [1, 2]],
        'thanh_linh_thao' => ['name' => 'Thanh Linh Thảo', 'yieldTime' => 5400, 'qty' => [1, 2]],
        'kim_linh_thao'   => ['name' => 'Kim Linh Thảo',  'yieldTime' => 7200, 'qty' => [1, 1]],
        'thien_linh_thao' => ['name' => 'Thiên Linh Thảo','yieldTime' => 10800,'qty' => [1, 1]],
    ];

    // Formation (Trận Pháp) upgrades — large gold sink + daily maintenance
    $FORMATIONS = [
        'tu_linh_tran' => [
            'name' => 'Tụ Linh Trận', 'icon' => '🔮',
            'description' => 'Trận pháp tụ linh khí, tăng tốc hồi Linh Lực.',
            'buildCost' => 5000, 'dailyCost' => 50,
            'effect' => ['energyRegenBonus' => 2],
            'requiredTier' => 2, 'maxLevel' => 5,
            'upgradeCosts' => [5000, 12000, 25000, 50000, 100000],
            'dailyCosts'   => [50, 120, 250, 500, 1000],
            'bonusPerLevel' => ['energyRegenBonus' => 2],
        ],
        'ho_the_tran' => [
            'name' => 'Hộ Thể Trận', 'icon' => '💚',
            'description' => 'Trận pháp hồi phục, tăng tốc hồi Sinh Lực (HP).',
            'buildCost' => 8000, 'dailyCost' => 80,
            'effect' => ['hpRegenBonus' => 3],
            'requiredTier' => 3, 'maxLevel' => 5,
            'upgradeCosts' => [8000, 20000, 40000, 80000, 150000],
            'dailyCosts'   => [80, 180, 350, 700, 1500],
            'bonusPerLevel' => ['hpRegenBonus' => 3],
        ],
        'linh_dien_tran' => [
            'name' => 'Linh Điền Trận', 'icon' => '🌿',
            'description' => 'Trận pháp gia tốc Dược Viên, giảm thời gian thu hoạch.',
            'buildCost' => 3000, 'dailyCost' => 30,
            'effect' => ['gardenSpeedBonus' => 0.2],
            'requiredTier' => 2, 'maxLevel' => 3,
            'upgradeCosts' => [3000, 8000, 20000],
            'dailyCosts'   => [30, 80, 200],
            'bonusPerLevel' => ['gardenSpeedBonus' => 0.2],
        ],
        'thu_linh_tran' => [
            'name' => 'Thủ Linh Trận', 'icon' => '🛡️',
            'description' => 'Trận pháp bảo vệ, tăng Thể Lực tối đa.',
            'buildCost' => 6000, 'dailyCost' => 60,
            'effect' => ['staminaMaxBonus' => 10],
            'requiredTier' => 3, 'maxLevel' => 3,
            'upgradeCosts' => [6000, 15000, 35000],
            'dailyCosts'   => [60, 150, 350],
            'bonusPerLevel' => ['staminaMaxBonus' => 10],
        ],
    ];

    // === GET HOUSING INFO ===
    $app->get('/api/player/{id}/housing', function (Request $request, Response $response, array $args) use ($TIERS, $GARDEN_HERBS, $FORMATIONS) {
        $id = $args['id'];
        $pdo = Database::pdo();

        $stmt = $pdo->prepare("SELECT * FROM player_housing WHERE player_id = ?");
        $stmt->execute([$id]);
        $housing = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!$housing) {
            return jsonResponse($response, [
                'owned' => false,
                'tiers' => $TIERS,
                'gardenHerbs' => array_keys($GARDEN_HERBS),
            ]);
        }

        // Check garden harvests
        $gardenSlots = json_decode($housing['garden_slots'] ?? '[]', true) ?: [];
        $now = time();
        $harvestReady = [];
        foreach ($gardenSlots as $i => $slot) {
            if (!empty($slot['herb']) && !empty($slot['planted_at'])) {
                $herb = $GARDEN_HERBS[$slot['herb']] ?? null;
                if ($herb) {
                    $elapsed = $now - $slot['planted_at'];
                    $ready = $elapsed >= $herb['yieldTime'];
                    $remaining = max(0, $herb['yieldTime'] - $elapsed);
                    $gardenSlots[$i]['ready'] = $ready;
                    $gardenSlots[$i]['remaining'] = $remaining;
                    $gardenSlots[$i]['herbName'] = $herb['name'];
                }
            }
        }

        $tier = (int)$housing['tier'];
        $tierInfo = $TIERS[$tier] ?? $TIERS[1];

        // Formations from separate table
        $fStmt = $pdo->prepare("SELECT formation_id, level, active FROM housing_formations WHERE player_id = ?");
        $fStmt->execute([$id]);
        $playerFormations = [];
        $dailyCost = 0;
        while ($row = $fStmt->fetch(\PDO::FETCH_ASSOC)) {
            $playerFormations[$row['formation_id']] = (int)$row['level'];
            if ($row['active']) {
                $fDef = $FORMATIONS[$row['formation_id']] ?? null;
                if ($fDef) {
                    $lvl = (int)$row['level'];
                    $dailyCost += $fDef['dailyCosts'][$lvl - 1] ?? 0;
                }
            }
        }
        $formationsDisplay = [];
        foreach ($FORMATIONS as $fId => $fDef) {
            $level = $playerFormations[$fId] ?? 0;
            $formationsDisplay[$fId] = array_merge($fDef, [
                'currentLevel' => $level,
                'nextCost' => ($level < $fDef['maxLevel']) ? ($fDef['upgradeCosts'][$level] ?? 0) : null,
                'nextDailyCost' => ($level < $fDef['maxLevel']) ? ($fDef['dailyCosts'][$level] ?? 0) : null,
                'canBuild' => $tier >= $fDef['requiredTier'],
            ]);
        }

        // Check maintenance
        $lastMaint = $housing['last_maintenance'] ?? null;
        $today = date('Y-m-d');
        $maintenanceDue = ($lastMaint !== $today && $dailyCost > 0);

        return jsonResponse($response, [
            'owned' => true,
            'tier' => $tier,
            'tierInfo' => $tierInfo,
            'gardenSlots' => $gardenSlots,
            'maxSlots' => $tierInfo['gardenSlots'],
            'nextTier' => isset($TIERS[$tier + 1]) ? array_merge($TIERS[$tier + 1], ['tier' => $tier + 1]) : null,
            'tiers' => $TIERS,
            'gardenHerbs' => $GARDEN_HERBS,
            'formations' => $formationsDisplay,
            'dailyCost' => $dailyCost,
            'maintenanceDue' => $maintenanceDue,
            'lastMaintenance' => $lastMaint,
        ]);
    });

    // === BUY / UPGRADE HOUSING ===
    $app->post('/api/player/{id}/housing/buy', function (Request $request, Response $response, array $args) use ($TIERS) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $pdo = Database::pdo();
        $stmt = $pdo->prepare("SELECT tier FROM player_housing WHERE player_id = ?");
        $stmt->execute([$id]);
        $existing = $stmt->fetch(\PDO::FETCH_ASSOC);

        $targetTier = $existing ? (int)$existing['tier'] + 1 : 1;
        if (!isset($TIERS[$targetTier])) {
            return jsonResponse($response, ['error' => 'Động Phủ đã đạt cấp tối đa!'], 400);
        }

        $cost = $TIERS[$targetTier]['cost'];
        if ($player->gold < $cost) {
            return jsonResponse($response, ['error' => "Không đủ Linh thạch! Cần {$cost} 💎"], 400);
        }

        $player->gold -= $cost;
        savePlayer($id, $player);

        if ($existing) {
            $pdo->prepare("UPDATE player_housing SET tier = ? WHERE player_id = ?")->execute([$targetTier, $id]);
        } else {
            $pdo->prepare("INSERT INTO player_housing (player_id, tier, garden_slots) VALUES (?, ?, '[]')")->execute([$id, $targetTier]);
        }

        $info = $TIERS[$targetTier];
        $action = $existing ? 'nâng cấp' : 'mua';
        return jsonResponse($response, [
            'message' => "🏠 Đã {$action} [{$info['name']}]! Hồi HP +{$info['hpRegen']}/phút, {$info['gardenSlots']} ô vườn.",
            'player' => $player->toArray(),
        ]);
    });

    // === PLANT HERB IN GARDEN ===
    $app->post('/api/player/{id}/housing/plant', function (Request $request, Response $response, array $args) use ($TIERS, $GARDEN_HERBS) {
        $id = $args['id'];
        $body = $request->getParsedBody();
        $herbId = $body['herbId'] ?? '';
        $slotIndex = (int)($body['slotIndex'] ?? 0);

        if (!isset($GARDEN_HERBS[$herbId])) {
            return jsonResponse($response, ['error' => 'Loại thảo dược không hợp lệ!'], 400);
        }

        $pdo = Database::pdo();
        $stmt = $pdo->prepare("SELECT * FROM player_housing WHERE player_id = ?");
        $stmt->execute([$id]);
        $housing = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!$housing) return jsonResponse($response, ['error' => 'Chưa có Động Phủ!'], 400);

        $maxSlots = $TIERS[(int)$housing['tier']]['gardenSlots'] ?? 1;
        if ($slotIndex < 0 || $slotIndex >= $maxSlots) {
            return jsonResponse($response, ['error' => 'Ô vườn không hợp lệ!'], 400);
        }

        $garden = json_decode($housing['garden_slots'] ?? '[]', true) ?: [];
        // Check slot is empty or ready to harvest
        if (isset($garden[$slotIndex]) && !empty($garden[$slotIndex]['herb']) && empty($garden[$slotIndex]['ready'])) {
            return jsonResponse($response, ['error' => 'Ô này đang trồng!'], 400);
        }

        $garden[$slotIndex] = ['herb' => $herbId, 'planted_at' => time()];
        $pdo->prepare("UPDATE player_housing SET garden_slots = ? WHERE player_id = ?")->execute([json_encode($garden), $id]);

        return jsonResponse($response, [
            'message' => "🌿 Đã gieo {$GARDEN_HERBS[$herbId]['name']} vào ô {$slotIndex}!",
        ]);
    });

    // === HARVEST GARDEN ===
    $app->post('/api/player/{id}/housing/harvest', function (Request $request, Response $response, array $args) use ($TIERS, $GARDEN_HERBS) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $pdo = Database::pdo();
        $stmt = $pdo->prepare("SELECT * FROM player_housing WHERE player_id = ?");
        $stmt->execute([$id]);
        $housing = $stmt->fetch(\PDO::FETCH_ASSOC);
        if (!$housing) return jsonResponse($response, ['error' => 'Chưa có Động Phủ!'], 400);

        $garden = json_decode($housing['garden_slots'] ?? '[]', true) ?: [];
        $now = time();
        $harvested = [];

        foreach ($garden as $i => $slot) {
            if (empty($slot['herb']) || empty($slot['planted_at'])) continue;
            $herb = $GARDEN_HERBS[$slot['herb']] ?? null;
            if (!$herb) continue;

            $elapsed = $now - $slot['planted_at'];
            if ($elapsed >= $herb['yieldTime']) {
                $qty = mt_rand($herb['qty'][0], $herb['qty'][1]);
                $player->materials[$slot['herb']] = ($player->materials[$slot['herb']] ?? 0) + $qty;
                $harvested[] = "{$herb['name']} x{$qty}";
                $garden[$i] = []; // Clear slot
            }
        }

        if (empty($harvested)) {
            return jsonResponse($response, ['error' => 'Chưa có gì để thu hoạch!'], 400);
        }

        $pdo->prepare("UPDATE player_housing SET garden_slots = ? WHERE player_id = ?")->execute([json_encode($garden), $id]);
        savePlayer($id, $player);

        return jsonResponse($response, [
            'message' => '🌾 Thu hoạch: ' . implode(', ', $harvested),
            'player' => $player->toArray(),
        ]);
    });

    // === UPGRADE FORMATION (Trận Pháp) ===
    $app->post('/api/player/{id}/housing/formation', function (Request $request, Response $response, array $args) use ($TIERS, $FORMATIONS) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $body = $request->getParsedBody();
        $formationId = $body['formationId'] ?? '';

        if (!isset($FORMATIONS[$formationId])) {
            return jsonResponse($response, ['error' => 'Trận pháp không hợp lệ!'], 400);
        }

        $fDef = $FORMATIONS[$formationId];
        $pdo = Database::pdo();

        // Check housing exists and tier
        $stmt = $pdo->prepare("SELECT tier FROM player_housing WHERE player_id = ?");
        $stmt->execute([$id]);
        $housing = $stmt->fetch(\PDO::FETCH_ASSOC);
        if (!$housing) return jsonResponse($response, ['error' => 'Chưa có Động Phủ!'], 400);

        $tier = (int)$housing['tier'];
        if ($tier < $fDef['requiredTier']) {
            return jsonResponse($response, ['error' => "Cần Động Phủ T{$fDef['requiredTier']} trở lên!"], 400);
        }

        // Check current level
        $fStmt = $pdo->prepare("SELECT level FROM housing_formations WHERE player_id = ? AND formation_id = ?");
        $fStmt->execute([$id, $formationId]);
        $existing = $fStmt->fetch(\PDO::FETCH_ASSOC);
        $currentLevel = $existing ? (int)$existing['level'] : 0;

        if ($currentLevel >= $fDef['maxLevel']) {
            return jsonResponse($response, ['error' => 'Trận pháp đã đạt cấp tối đa!'], 400);
        }

        $cost = $fDef['upgradeCosts'][$currentLevel] ?? 0;
        if ($player->gold < $cost) {
            return jsonResponse($response, ['error' => "Cần {$cost} 💎 Linh thạch!"], 400);
        }

        $player->gold -= $cost;
        savePlayer($id, $player);

        $newLevel = $currentLevel + 1;
        if ($existing) {
            $pdo->prepare("UPDATE housing_formations SET level = ? WHERE player_id = ? AND formation_id = ?")
                ->execute([$newLevel, $id, $formationId]);
        } else {
            $pdo->prepare("INSERT INTO housing_formations (player_id, formation_id, level) VALUES (?, ?, ?)")
                ->execute([$id, $formationId, $newLevel]);
        }

        // Update daily cost in housing table
        $totalDaily = 0;
        $allF = $pdo->prepare("SELECT formation_id, level FROM housing_formations WHERE player_id = ? AND active = 1");
        $allF->execute([$id]);
        while ($r = $allF->fetch(\PDO::FETCH_ASSOC)) {
            $fd = $FORMATIONS[$r['formation_id']] ?? null;
            if ($fd) $totalDaily += $fd['dailyCosts'][(int)$r['level'] - 1] ?? 0;
        }
        $pdo->prepare("UPDATE player_housing SET daily_cost = ? WHERE player_id = ?")->execute([$totalDaily, $id]);

        $dailyAdd = $fDef['dailyCosts'][$newLevel - 1] ?? 0;
        return jsonResponse($response, [
            'message' => "{$fDef['icon']} {$fDef['name']} Lv{$newLevel}! (-{$cost} 💎, hao phí +{$dailyAdd}/ngày)",
            'player' => $player->toArray(),
        ]);
    });

    // === PAY DAILY MAINTENANCE ===
    $app->post('/api/player/{id}/housing/maintenance', function (Request $request, Response $response, array $args) use ($FORMATIONS) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $pdo = Database::pdo();
        $stmt = $pdo->prepare("SELECT * FROM player_housing WHERE player_id = ?");
        $stmt->execute([$id]);
        $housing = $stmt->fetch(\PDO::FETCH_ASSOC);
        if (!$housing) return jsonResponse($response, ['error' => 'Chưa có Động Phủ!'], 400);

        $today = date('Y-m-d');
        if (($housing['last_maintenance'] ?? '') === $today) {
            return jsonResponse($response, ['error' => 'Đã nộp phí hôm nay rồi!'], 400);
        }

        // Calculate daily cost from formations
        $totalDaily = 0;
        $allF = $pdo->prepare("SELECT formation_id, level FROM housing_formations WHERE player_id = ? AND active = 1");
        $allF->execute([$id]);
        while ($r = $allF->fetch(\PDO::FETCH_ASSOC)) {
            $fd = $FORMATIONS[$r['formation_id']] ?? null;
            if ($fd) $totalDaily += $fd['dailyCosts'][(int)$r['level'] - 1] ?? 0;
        }

        if ($totalDaily <= 0) {
            $pdo->prepare("UPDATE player_housing SET last_maintenance = ? WHERE player_id = ?")->execute([$today, $id]);
            return jsonResponse($response, ['message' => 'Không có trận pháp, không cần nộp phí.']);
        }

        if ($player->gold < $totalDaily) {
            // Can't afford — deactivate all formations
            $pdo->prepare("UPDATE housing_formations SET active = 0 WHERE player_id = ?")->execute([$id]);
            $pdo->prepare("UPDATE player_housing SET daily_cost = 0, last_maintenance = ? WHERE player_id = ?")->execute([$today, $id]);
            savePlayer($id, $player);
            return jsonResponse($response, [
                'message' => "⚠️ Không đủ Linh thạch ({$totalDaily} 💎)! Tất cả trận pháp bị tắt.",
                'player' => $player->toArray(),
            ]);
        }

        $player->gold -= $totalDaily;
        $pdo->prepare("UPDATE player_housing SET last_maintenance = ? WHERE player_id = ?")->execute([$today, $id]);
        savePlayer($id, $player);

        return jsonResponse($response, [
            'message' => "💰 Đã nộp phí duy trì trận pháp: {$totalDaily} 💎",
            'player' => $player->toArray(),
        ]);
    });

    // === LIST ROOM FOR RENT (owner) ===
    $app->post('/api/player/{id}/housing/rent/list', function (Request $request, Response $response, array $args) use ($TIERS) {
        $id = $args['id'];
        $pdo = Database::pdo();

        $stmt = $pdo->prepare("SELECT tier FROM player_housing WHERE player_id = ?");
        $stmt->execute([$id]);
        $housing = $stmt->fetch(\PDO::FETCH_ASSOC);
        if (!$housing) return jsonResponse($response, ['error' => 'Chưa có Động Phủ!'], 400);

        $tier = (int)$housing['tier'];
        // Can rent from T3+, max rooms = tier - 2
        $maxRentable = max(0, $tier - 2);
        if ($maxRentable <= 0) {
            return jsonResponse($response, ['error' => 'Cần Động Phủ T3+ để cho thuê!'], 400);
        }

        $body = $request->getParsedBody();
        $pricePerDay = max(10, (int)($body['pricePerDay'] ?? 50));

        // Check how many already listed
        $listed = $pdo->prepare("SELECT COUNT(*) FROM housing_rentals WHERE owner_id = ? AND active = 1");
        $listed->execute([$id]);
        $currentListed = (int)$listed->fetchColumn();

        if ($currentListed >= $maxRentable) {
            return jsonResponse($response, ['error' => "Đã cho thuê tối đa {$maxRentable} phòng!"], 400);
        }

        $pdo->prepare("INSERT INTO housing_rentals (owner_id, price_per_day, tenant_id, active) VALUES (?, ?, NULL, 1)")
            ->execute([$id, $pricePerDay]);

        return jsonResponse($response, [
            'message' => "🏘️ Đã đăng cho thuê phòng: {$pricePerDay} 💎/ngày",
        ]);
    });

    // === BROWSE RENTALS ===
    $app->get('/api/housing/rentals', function (Request $request, Response $response) {
        $pdo = Database::pdo();
        $stmt = $pdo->query("
            SELECT r.id, r.price_per_day, r.owner_id, p.name as owner_name,
                   ph.tier, r.tenant_id
            FROM housing_rentals r
            JOIN players p ON p.id = r.owner_id
            JOIN player_housing ph ON ph.player_id = r.owner_id
            WHERE r.active = 1 AND r.tenant_id IS NULL
            ORDER BY r.price_per_day ASC
        ");
        return jsonResponse($response, ['rentals' => $stmt->fetchAll(\PDO::FETCH_ASSOC)]);
    });

    // === RENT A ROOM ===
    $app->post('/api/player/{id}/housing/rent/take', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $body = $request->getParsedBody();
        $rentalId = (int)($body['rentalId'] ?? 0);

        $pdo = Database::pdo();
        $stmt = $pdo->prepare("SELECT * FROM housing_rentals WHERE id = ? AND active = 1 AND tenant_id IS NULL");
        $stmt->execute([$rentalId]);
        $rental = $stmt->fetch(\PDO::FETCH_ASSOC);
        if (!$rental) return jsonResponse($response, ['error' => 'Phòng không khả dụng!'], 400);
        if ($rental['owner_id'] === $id) return jsonResponse($response, ['error' => 'Không thể thuê phòng mình!'], 400);

        // Check player doesn't already have housing or rental
        $hasOwn = $pdo->prepare("SELECT id FROM player_housing WHERE player_id = ?");
        $hasOwn->execute([$id]);

        $hasRent = $pdo->prepare("SELECT id FROM housing_rentals WHERE tenant_id = ? AND active = 1");
        $hasRent->execute([$id]);
        if ($hasRent->fetch()) return jsonResponse($response, ['error' => 'Đã thuê phòng rồi!'], 400);

        $price = (int)$rental['price_per_day'];
        if ($player->gold < $price) {
            return jsonResponse($response, ['error' => "Cần {$price} 💎 tiền thuê ngày đầu!"], 400);
        }

        // Pay first day's rent
        $player->gold -= $price;
        savePlayer($id, $player);

        // Pay owner
        $owner = loadPlayer($rental['owner_id']);
        if ($owner) {
            $ownerCut = (int)($price * 0.9); // 10% tax
            $owner->gold += $ownerCut;
            savePlayer($rental['owner_id'], $owner);
        }

        $pdo->prepare("UPDATE housing_rentals SET tenant_id = ?, rented_at = NOW() WHERE id = ?")
            ->execute([$id, $rentalId]);

        return jsonResponse($response, [
            'message' => "🏘️ Đã thuê phòng! (-{$price} 💎, HP regen bonus áp dụng)",
            'player' => $player->toArray(),
        ]);
    });
};
