<?php

/**
 * NPC Shop Feature — Hệ Thống Thương Nhân NPC
 *
 * Mechanics:
 * - NPC bán giới hạn số lượng mỗi ngày (stock replenish daily)
 * - Người chơi bị giới hạn tổng mua/ngày (daily purchase cap)
 * - Giao dịch P2P không giới hạn nhưng chịu thuế biến động
 * - Thuế được set hàng ngày bởi admin hoặc auto-calculated
 */

use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Core\Database;

return function ($app) {

    // NPC inventory definitions (replenishes daily)
    $NPC_SHOPS = [
        'thuong_nhan_lam_tran' => [
            'name' => 'Trần Lão Bá',
            'area' => 'thanh_lam_tran',
            'icon' => '🧓',
            'dailyItems' => [
                ['id' => 'hoi_luc_dan',       'type' => 'medicine', 'name' => 'Hồi Lực Đan',        'price' => 20,   'dailyStock' => 10],
                ['id' => 'tang_luc_dan',       'type' => 'medicine', 'name' => 'Tăng Lực Đan',        'price' => 50,   'dailyStock' => 5],
                ['id' => 'linh_thao',          'type' => 'material', 'name' => 'Linh Thảo',           'price' => 15,   'dailyStock' => 20],
                ['id' => 'huyet_thao',         'type' => 'material', 'name' => 'Huyết Thảo',          'price' => 15,   'dailyStock' => 20],
                ['id' => 'mat_go_linh',        'type' => 'material', 'name' => 'Gỗ Linh',             'price' => 25,   'dailyStock' => 10],
            ],
        ],
        'thuong_nhan_hac_phong' => [
            'name' => 'Lý Thương Nhân',
            'area' => 'hac_phong_lam',
            'icon' => '🧔',
            'dailyItems' => [
                ['id' => 'linh_hoa_dan',       'type' => 'medicine', 'name' => 'Linh Hóa Đan',        'price' => 100,  'dailyStock' => 5],
                ['id' => 'thanh_linh_thao',    'type' => 'material', 'name' => 'Thanh Linh Thảo',     'price' => 40,   'dailyStock' => 10],
                ['id' => 'kim_linh_thao',      'type' => 'material', 'name' => 'Kim Linh Thảo',       'price' => 80,   'dailyStock' => 5],
                ['id' => 'mat_tinh_thach',     'type' => 'material', 'name' => 'Tinh Thạch',          'price' => 60,   'dailyStock' => 8],
            ],
        ],
        'thuong_nhan_bac_suong' => [
            'name' => 'Linh Lão Quái',
            'area' => 'bac_suong_canh',
            'icon' => '👴',
            'dailyItems' => [
                ['id' => 'bang_tam_dan',       'type' => 'medicine', 'name' => 'Băng Tâm Đan',        'price' => 300,  'dailyStock' => 3],
                ['id' => 'thien_linh_thao',    'type' => 'material', 'name' => 'Thiên Linh Thảo',     'price' => 200,  'dailyStock' => 3],
                ['id' => 'mat_thien_thach',    'type' => 'material', 'name' => 'Thiên Thạch',         'price' => 500,  'dailyStock' => 2],
                ['id' => 'ngoc_gian_t1',       'type' => 'material', 'name' => 'Ngọc Giản Hạ Phẩm',  'price' => 1000, 'dailyStock' => 1],
            ],
        ],
    ];

    $DAILY_BUY_LIMIT = 50; // Player can buy max 50 items total per day from NPC

    // Helper: Get today's date
    $today = function () { return date('Y-m-d'); };

    // Helper: Ensure daily stock is generated
    $ensureDailyStock = function (string $shopId) use ($NPC_SHOPS, $today) {
        $shop = $NPC_SHOPS[$shopId] ?? null;
        if (!$shop) return;

        $pdo = Database::pdo();
        $date = $today();

        foreach ($shop['dailyItems'] as $item) {
            $stmt = $pdo->prepare("SELECT id FROM npc_shop_stock WHERE shop_date = ? AND item_id = ?");
            $stmt->execute([$date, $item['id']]);
            if (!$stmt->fetch()) {
                $pdo->prepare("INSERT INTO npc_shop_stock (shop_date, item_id, item_type, total_stock, remaining_stock, price) VALUES (?, ?, ?, ?, ?, ?)")
                    ->execute([$date, $item['id'], $item['type'], $item['dailyStock'], $item['dailyStock'], $item['price']]);
            }
        }
    };

    // === GET NPC SHOPS ===
    $app->get('/api/shops', function (Request $request, Response $response) use ($NPC_SHOPS, $ensureDailyStock, $today) {
        $pdo = Database::pdo();
        $date = $today();

        $result = [];
        foreach ($NPC_SHOPS as $shopId => $shop) {
            $ensureDailyStock($shopId);

            $items = [];
            foreach ($shop['dailyItems'] as $item) {
                $stmt = $pdo->prepare("SELECT remaining_stock, price FROM npc_shop_stock WHERE shop_date = ? AND item_id = ?");
                $stmt->execute([$date, $item['id']]);
                $stock = $stmt->fetch(\PDO::FETCH_ASSOC);

                $items[] = array_merge($item, [
                    'remainingStock' => (int)($stock['remaining_stock'] ?? 0),
                    'currentPrice' => (int)($stock['price'] ?? $item['price']),
                ]);
            }

            $result[] = [
                'id' => $shopId,
                'name' => $shop['name'],
                'area' => $shop['area'],
                'icon' => $shop['icon'],
                'items' => $items,
            ];
        }

        // Get current tax rate
        $taxStmt = $pdo->prepare("SELECT tax_rate, reason FROM market_tax_config WHERE tax_date = ?");
        $taxStmt->execute([$date]);
        $tax = $taxStmt->fetch(\PDO::FETCH_ASSOC);
        $taxRate = $tax ? (float)$tax['tax_rate'] : 5.0;
        $taxReason = $tax ? $tax['reason'] : 'Thuế tiêu chuẩn';

        return jsonResponse($response, [
            'shops' => $result,
            'dailyBuyLimit' => 50,
            'currentTax' => ['rate' => $taxRate, 'reason' => $taxReason],
        ]);
    });

    // === BUY FROM NPC ===
    $app->post('/api/player/{id}/shop/buy', function (Request $request, Response $response, array $args) use ($NPC_SHOPS, $ensureDailyStock, $today, $DAILY_BUY_LIMIT) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $body = $request->getParsedBody();
        $shopId = $body['shopId'] ?? '';
        $itemId = $body['itemId'] ?? '';
        $qty = max(1, (int)($body['quantity'] ?? 1));

        if (!isset($NPC_SHOPS[$shopId])) {
            return jsonResponse($response, ['error' => 'Thương nhân không tồn tại!'], 400);
        }

        $shop = $NPC_SHOPS[$shopId];
        $ensureDailyStock($shopId);

        // Check player is in the right area
        if ($player->currentArea !== $shop['area']) {
            return jsonResponse($response, ['error' => "Phải ở {$shop['name']} để mua hàng!"], 400);
        }

        // Find item in shop
        $shopItem = null;
        foreach ($shop['dailyItems'] as $si) {
            if ($si['id'] === $itemId) { $shopItem = $si; break; }
        }
        if (!$shopItem) return jsonResponse($response, ['error' => 'Vật phẩm không có trong shop!'], 400);

        // Check remaining stock
        $pdo = Database::pdo();
        $date = $today();
        $stmt = $pdo->prepare("SELECT remaining_stock, price FROM npc_shop_stock WHERE shop_date = ? AND item_id = ?");
        $stmt->execute([$date, $itemId]);
        $stock = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!$stock || (int)$stock['remaining_stock'] < $qty) {
            return jsonResponse($response, ['error' => 'Hết hàng! Ngày mai quay lại.'], 400);
        }

        // Check player daily purchase limit
        $purchaseStmt = $pdo->prepare("SELECT items_bought FROM player_shop_purchases WHERE player_id = ? AND purchase_date = ?");
        $purchaseStmt->execute([$id, $date]);
        $purchases = $purchaseStmt->fetch(\PDO::FETCH_ASSOC);
        $alreadyBought = $purchases ? (int)$purchases['items_bought'] : 0;

        if ($alreadyBought + $qty > $DAILY_BUY_LIMIT) {
            $remaining = $DAILY_BUY_LIMIT - $alreadyBought;
            return jsonResponse($response, ['error' => "Đã đạt giới hạn mua hàng ngày! Còn có thể mua {$remaining} vật phẩm."], 400);
        }

        // Check gold
        $totalCost = (int)$stock['price'] * $qty;
        if ($player->gold < $totalCost) {
            return jsonResponse($response, ['error' => "Không đủ Linh thạch! Cần {$totalCost} 💎"], 400);
        }

        // Execute purchase
        $player->gold -= $totalCost;
        if ($shopItem['type'] === 'medicine') {
            $player->medicines[$itemId] = ($player->medicines[$itemId] ?? 0) + $qty;
        } else {
            $player->materials[$itemId] = ($player->materials[$itemId] ?? 0) + $qty;
        }

        // Update stock
        $pdo->prepare("UPDATE npc_shop_stock SET remaining_stock = remaining_stock - ? WHERE shop_date = ? AND item_id = ?")
            ->execute([$qty, $date, $itemId]);

        // Update purchase tracker
        if ($purchases) {
            $pdo->prepare("UPDATE player_shop_purchases SET items_bought = items_bought + ?, total_spent = total_spent + ? WHERE player_id = ? AND purchase_date = ?")
                ->execute([$qty, $totalCost, $id, $date]);
        } else {
            $pdo->prepare("INSERT INTO player_shop_purchases (player_id, purchase_date, total_spent, items_bought) VALUES (?, ?, ?, ?)")
                ->execute([$id, $date, $totalCost, $qty]);
        }

        savePlayer($id, $player);

        return jsonResponse($response, [
            'message' => "🛒 Đã mua {$shopItem['name']} x{$qty} từ {$shop['name']}! (-{$totalCost} 💎)",
            'player' => $player->toArray(),
        ]);
    });

    // === GET CURRENT P2P TAX RATE ===
    $app->get('/api/market/tax', function (Request $request, Response $response) use ($today) {
        $pdo = Database::pdo();
        $stmt = $pdo->prepare("SELECT tax_rate, reason FROM market_tax_config WHERE tax_date = ?");
        $stmt->execute([$today()]);
        $tax = $stmt->fetch(\PDO::FETCH_ASSOC);

        return jsonResponse($response, [
            'rate' => $tax ? (float)$tax['tax_rate'] : 5.0,
            'reason' => $tax ? $tax['reason'] : 'Thuế tiêu chuẩn',
        ]);
    });

    // === ADMIN: SET TAX RATE ===
    $app->post('/api/admin/market/tax', function (Request $request, Response $response) use ($today) {
        $body = $request->getParsedBody();
        $rate = (float)($body['rate'] ?? 5.0);
        $reason = $body['reason'] ?? 'Thuế điều chỉnh';
        $date = $today();

        $pdo = Database::pdo();
        $pdo->prepare("REPLACE INTO market_tax_config (tax_date, tax_rate, reason) VALUES (?, ?, ?)")
            ->execute([$date, $rate, $reason]);

        return jsonResponse($response, [
            'message' => "Đã đặt thuế {$rate}% cho hôm nay: {$reason}",
        ]);
    });
};
