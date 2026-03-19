<?php

/**
 * Market Feature — Giao Dịch Đài (Player Marketplace)
 * Players can list items/materials/medicines for sale.
 * Other players can browse and buy.
 * 5% transaction fee, max 10 listings per player.
 *
 * Lưu ý: NPC chỉ bán đồ bình thường, items chất lượng cao phải do player craft → bán ở đây.
 */

use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Core\Database;

return function ($app) {

    // === BROWSE MARKET ===
    $app->get('/api/market', function (Request $request, Response $response) {
        $params = $request->getQueryParams();
        $type = $params['type'] ?? null;
        $sort = $params['sort'] ?? 'newest'; // newest, price_asc, price_desc

        $pdo = Database::pdo();
        $where = '';
        $binds = [];
        if ($type && in_array($type, ['item', 'material', 'medicine'])) {
            $where = 'WHERE item_type = :type';
            $binds['type'] = $type;
        }

        $orderBy = 'ORDER BY created_at DESC';
        if ($sort === 'price_asc') $orderBy = 'ORDER BY price ASC';
        if ($sort === 'price_desc') $orderBy = 'ORDER BY price DESC';

        $stmt = $pdo->prepare("
            SELECT id, seller_id, seller_name, item_type, item_id, item_name, item_data, quantity, price, created_at
            FROM market_listings
            {$where}
            {$orderBy}
            LIMIT 100
        ");
        $stmt->execute($binds);
        $listings = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        // Parse item_data JSON
        foreach ($listings as &$l) {
            $l['item_data'] = json_decode($l['item_data'] ?? 'null', true);
            $l['price'] = (int)$l['price'];
            $l['quantity'] = (int)$l['quantity'];
        }

        return jsonResponse($response, ['listings' => $listings]);
    });

    // === MY LISTINGS ===
    $app->get('/api/market/my/{id}', function (Request $request, Response $response, array $args) {
        $pdo = Database::pdo();
        $stmt = $pdo->prepare("SELECT * FROM market_listings WHERE seller_id = ? ORDER BY created_at DESC");
        $stmt->execute([$args['id']]);
        $listings = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        foreach ($listings as &$l) {
            $l['item_data'] = json_decode($l['item_data'] ?? 'null', true);
            $l['price'] = (int)$l['price'];
            $l['quantity'] = (int)$l['quantity'];
        }

        return jsonResponse($response, ['listings' => $listings]);
    });

    // === LIST ITEM FOR SALE ===
    $app->post('/api/market/list', function (Request $request, Response $response) {
        $body = $request->getParsedBody();
        $sellerId = $body['sellerId'] ?? '';
        $itemType = $body['itemType'] ?? '';
        $itemId = $body['itemId'] ?? '';
        $quantity = (int)($body['quantity'] ?? 1);
        $price = (int)($body['price'] ?? 0);

        if (!$sellerId || !$itemType || !$itemId || $price <= 0 || $quantity <= 0) {
            return jsonResponse($response, ['error' => 'Thiếu thông tin đăng bán'], 400);
        }

        $pdo = Database::pdo();

        // Check max 10 listings
        $countStmt = $pdo->prepare("SELECT COUNT(*) FROM market_listings WHERE seller_id = ?");
        $countStmt->execute([$sellerId]);
        if ((int)$countStmt->fetchColumn() >= 10) {
            return jsonResponse($response, ['error' => 'Tối đa 10 sạp hàng!'], 400);
        }

        $player = loadPlayer($sellerId);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $itemName = $itemId;
        $itemData = null;

        if ($itemType === 'material') {
            $playerHas = $player->materials[$itemId] ?? 0;
            if ($playerHas < $quantity) {
                return jsonResponse($response, ['error' => "Không đủ nguyên liệu! Có: {$playerHas}"], 400);
            }
            $player->materials[$itemId] -= $quantity;
            if ($player->materials[$itemId] <= 0) unset($player->materials[$itemId]);
            // Try to get display name from GameData
            $matDef = \App\Core\GameDataRepository::getMaterialById($itemId);
            $itemName = $matDef['name'] ?? $itemId;
        } elseif ($itemType === 'medicine') {
            $playerHas = $player->medicines[$itemId] ?? 0;
            if ($playerHas < $quantity) {
                return jsonResponse($response, ['error' => "Không đủ đan dược! Có: {$playerHas}"], 400);
            }
            $player->medicines[$itemId] -= $quantity;
            if ($player->medicines[$itemId] <= 0) unset($player->medicines[$itemId]);
            $medDef = \App\Core\GameDataRepository::getMedicineById($itemId);
            $itemName = $medDef['name'] ?? $itemId;
        } elseif ($itemType === 'item') {
            // Find the item in inventory by its uid
            $found = false;
            foreach ($player->inventory as $k => $invItem) {
                if ($invItem->id === $itemId) {
                    $itemName = $invItem->name;
                    $itemData = $invItem->toArray();
                    array_splice($player->inventory, $k, 1);
                    $found = true;
                    $quantity = 1; // Equipment is always 1
                    break;
                }
            }
            if (!$found) {
                return jsonResponse($response, ['error' => 'Không tìm thấy vật phẩm trong hành trang!'], 400);
            }
        } else {
            return jsonResponse($response, ['error' => 'Loại không hợp lệ'], 400);
        }

        // Save player changes
        savePlayer($sellerId, $player);

        // Insert listing
        $stmt = $pdo->prepare("
            INSERT INTO market_listings (seller_id, seller_name, item_type, item_id, item_name, item_data, quantity, price)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([$sellerId, $player->name, $itemType, $itemId, $itemName, json_encode($itemData), $quantity, $price]);

        return jsonResponse($response, [
            'success' => true,
            'message' => "🏪 Đã đăng bán {$itemName} x{$quantity} với giá {$price} 💎/cái",
            'player' => $player->toArray(),
        ]);
    });

    // === BUY FROM MARKET ===
    $app->post('/api/market/buy', function (Request $request, Response $response) {
        $body = $request->getParsedBody();
        $buyerId = $body['buyerId'] ?? '';
        $listingId = (int)($body['listingId'] ?? 0);
        $buyQty = (int)($body['quantity'] ?? 1);

        if (!$buyerId || !$listingId || $buyQty <= 0) {
            return jsonResponse($response, ['error' => 'Thiếu thông tin mua hàng'], 400);
        }

        $pdo = Database::pdo();

        // Get listing
        $lstStmt = $pdo->prepare("SELECT * FROM market_listings WHERE id = ?");
        $lstStmt->execute([$listingId]);
        $listing = $lstStmt->fetch(\PDO::FETCH_ASSOC);
        if (!$listing) return jsonResponse($response, ['error' => 'Không tìm thấy sạp hàng'], 404);

        if ($listing['seller_id'] === $buyerId) {
            return jsonResponse($response, ['error' => 'Không thể mua hàng của chính mình!'], 400);
        }

        $availQty = (int)$listing['quantity'];
        if ($buyQty > $availQty) {
            return jsonResponse($response, ['error' => "Chỉ còn {$availQty} đơn vị!"], 400);
        }

        $totalCost = (int)$listing['price'] * $buyQty;

        // Load buyer
        $buyer = loadPlayer($buyerId);
        if (!$buyer) return jsonResponse($response, ['error' => 'Người mua không tồn tại'], 404);

        if ($buyer->gold < $totalCost) {
            return jsonResponse($response, ['error' => "Không đủ Linh Thạch! Cần {$totalCost}, có {$buyer->gold}"], 400);
        }

        // Transaction
        $buyer->gold -= $totalCost;

        // Give item to buyer
        $itemType = $listing['item_type'];
        $itemId = $listing['item_id'];
        if ($itemType === 'material') {
            $buyer->materials[$itemId] = ($buyer->materials[$itemId] ?? 0) + $buyQty;
        } elseif ($itemType === 'medicine') {
            $buyer->medicines[$itemId] = ($buyer->medicines[$itemId] ?? 0) + $buyQty;
        } elseif ($itemType === 'item') {
            $itemArr = json_decode($listing['item_data'] ?? '{}', true);
            if ($itemArr && isset($itemArr['id'])) {
                $buyer->inventory[] = \App\Models\Item::fromArray($itemArr);
            }
        }

        savePlayer($buyerId, $buyer);

        // Pay seller (5% fee)
        $sellerReceives = (int)floor($totalCost * 0.95);
        $pdo->prepare("UPDATE players SET gold = gold + ? WHERE id = ?")->execute([$sellerReceives, $listing['seller_id']]);

        // Update or remove listing
        $newQty = $availQty - $buyQty;
        if ($newQty <= 0) {
            $pdo->prepare("DELETE FROM market_listings WHERE id = ?")->execute([$listingId]);
        } else {
            $pdo->prepare("UPDATE market_listings SET quantity = ? WHERE id = ?")->execute([$newQty, $listingId]);
        }

        $fee = $totalCost - $sellerReceives;
        return jsonResponse($response, [
            'success' => true,
            'message' => "🛒 Mua thành công {$listing['item_name']} x{$buyQty}! −{$totalCost} 💎 (phí giao dịch: {$fee} 💎)",
            'player' => $buyer->toArray(),
        ]);
    });

    // === CANCEL LISTING ===
    $app->post('/api/market/cancel', function (Request $request, Response $response) {
        $body = $request->getParsedBody();
        $sellerId = $body['sellerId'] ?? '';
        $listingId = (int)($body['listingId'] ?? 0);

        if (!$sellerId || !$listingId) {
            return jsonResponse($response, ['error' => 'Thiếu thông tin'], 400);
        }

        $pdo = Database::pdo();

        // Get listing
        $lstStmt = $pdo->prepare("SELECT * FROM market_listings WHERE id = ? AND seller_id = ?");
        $lstStmt->execute([$listingId, $sellerId]);
        $listing = $lstStmt->fetch(\PDO::FETCH_ASSOC);
        if (!$listing) return jsonResponse($response, ['error' => 'Không tìm thấy sạp hàng hoặc không phải của bạn'], 404);

        $player = loadPlayer($sellerId);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        // Return items to player
        $itemType = $listing['item_type'];
        $itemId = $listing['item_id'];
        $qty = (int)$listing['quantity'];

        if ($itemType === 'material') {
            $player->materials[$itemId] = ($player->materials[$itemId] ?? 0) + $qty;
        } elseif ($itemType === 'medicine') {
            $player->medicines[$itemId] = ($player->medicines[$itemId] ?? 0) + $qty;
        } elseif ($itemType === 'item') {
            $itemArr = json_decode($listing['item_data'] ?? '{}', true);
            if ($itemArr && isset($itemArr['id'])) {
                $player->inventory[] = \App\Models\Item::fromArray($itemArr);
            }
        }

        savePlayer($sellerId, $player);
        $pdo->prepare("DELETE FROM market_listings WHERE id = ?")->execute([$listingId]);

        return jsonResponse($response, [
            'success' => true,
            'message' => "📦 Đã thu hồi {$listing['item_name']} từ sạp!",
            'player' => $player->toArray(),
        ]);
    });
};
