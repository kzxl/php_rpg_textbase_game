<?php
/**
 * Auction House — Đấu Giá (list/bid/buyout with fees)
 */
use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Core\Database;

return function ($app) {
    $LISTING_FEE_PCT = 5;   // 5% of buyout price
    $SALE_TAX_PCT = 10;     // 10% tax on sale

    // === GET ACTIVE LISTINGS ===
    $app->get('/api/auction', function (Request $request, Response $response) {
        $pdo = Database::pdo();
        $params = $request->getQueryParams();
        $search = trim($params['q'] ?? '');

        $sql = "SELECT a.*, p.name as seller_name FROM auction_listings a
                JOIN players p ON p.id = a.seller_id
                WHERE a.status = 'active' AND a.expires_at > NOW()";
        $binds = [];
        if ($search) {
            $sql .= " AND JSON_UNQUOTE(JSON_EXTRACT(a.item_data, '$.name')) LIKE ?";
            $binds[] = "%{$search}%";
        }
        $sql .= " ORDER BY a.created_at DESC LIMIT 50";

        $stmt = $pdo->prepare($sql);
        $stmt->execute($binds);
        return jsonResponse($response, ['listings' => $stmt->fetchAll(\PDO::FETCH_ASSOC)]);
    });

    // === MY LISTINGS ===
    $app->get('/api/player/{id}/auction/mine', function (Request $request, Response $response, array $args) {
        $pdo = Database::pdo();
        $stmt = $pdo->prepare("SELECT * FROM auction_listings WHERE seller_id = ? ORDER BY created_at DESC LIMIT 20");
        $stmt->execute([$args['id']]);
        return jsonResponse($response, ['listings' => $stmt->fetchAll(\PDO::FETCH_ASSOC)]);
    });

    // === LIST ITEM FOR AUCTION ===
    $app->post('/api/player/{id}/auction/list', function (Request $request, Response $response, array $args) use ($LISTING_FEE_PCT) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $body = $request->getParsedBody();
        $itemId = $body['itemId'] ?? '';
        $buyoutPrice = max(10, (int)($body['buyoutPrice'] ?? 100));
        $duration = min(72, max(1, (int)($body['durationHours'] ?? 24)));

        // Find item in inventory
        $targetIdx = null;
        foreach ($player->inventory as $i => $item) {
            if ($item->getId() === $itemId) { $targetIdx = $i; break; }
        }
        if ($targetIdx === null) return jsonResponse($response, ['error' => 'Vật phẩm không tìm thấy trong túi!'], 400);

        $listingFee = (int)ceil($buyoutPrice * $LISTING_FEE_PCT / 100);
        if ($player->gold < $listingFee) {
            return jsonResponse($response, ['error' => "Phí đăng: {$listingFee} 💎!"], 400);
        }

        $item = $player->inventory[$targetIdx];
        $itemData = $item->toArray();

        $player->gold -= $listingFee;
        array_splice($player->inventory, $targetIdx, 1);
        savePlayer($id, $player);

        $pdo = Database::pdo();
        $expiresAt = date('Y-m-d H:i:s', time() + $duration * 3600);
        $pdo->prepare("INSERT INTO auction_listings (seller_id, item_data, buyout_price, listing_fee, expires_at) VALUES (?, ?, ?, ?, ?)")
            ->execute([$id, json_encode($itemData, JSON_UNESCAPED_UNICODE), $buyoutPrice, $listingFee, $expiresAt]);

        return jsonResponse($response, [
            'message' => "🏪 Đã đăng đấu giá! Phí: {$listingFee} 💎, hết hạn: {$duration}h",
            'player' => $player->toArray(),
        ]);
    });

    // === BUYOUT ===
    $app->post('/api/player/{id}/auction/buy', function (Request $request, Response $response, array $args) use ($SALE_TAX_PCT) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $body = $request->getParsedBody();
        $listingId = (int)($body['listingId'] ?? 0);

        $pdo = Database::pdo();
        $stmt = $pdo->prepare("SELECT * FROM auction_listings WHERE id = ? AND status = 'active' AND expires_at > NOW()");
        $stmt->execute([$listingId]);
        $listing = $stmt->fetch(\PDO::FETCH_ASSOC);
        if (!$listing) return jsonResponse($response, ['error' => 'Đấu giá không tồn tại hoặc đã hết hạn!'], 400);
        if ($listing['seller_id'] === $id) return jsonResponse($response, ['error' => 'Không thể mua vật phẩm mình!'], 400);

        $price = (int)$listing['buyout_price'];
        if ($player->gold < $price) return jsonResponse($response, ['error' => "Cần {$price} 💎!"], 400);

        $player->gold -= $price;
        $itemData = json_decode($listing['item_data'], true);
        $item = \App\Models\Item::fromArray($itemData);
        $player->inventory[] = $item;
        savePlayer($id, $player);

        // Pay seller (minus tax)
        $sellerGold = (int)($price * (100 - $SALE_TAX_PCT) / 100);
        $seller = loadPlayer($listing['seller_id']);
        if ($seller) {
            $seller->gold += $sellerGold;
            savePlayer($listing['seller_id'], $seller);
        }

        $pdo->prepare("UPDATE auction_listings SET status = 'sold', bidder_id = ? WHERE id = ?")->execute([$id, $listingId]);

        return jsonResponse($response, [
            'message' => "🏪 Đã mua [{$itemData['name']}]! (-{$price} 💎, thuế {$SALE_TAX_PCT}%)",
            'player' => $player->toArray(),
        ]);
    });

    // === CANCEL LISTING ===
    $app->post('/api/player/{id}/auction/cancel', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $body = $request->getParsedBody();
        $listingId = (int)($body['listingId'] ?? 0);

        $pdo = Database::pdo();
        $stmt = $pdo->prepare("SELECT * FROM auction_listings WHERE id = ? AND seller_id = ? AND status = 'active'");
        $stmt->execute([$listingId, $id]);
        $listing = $stmt->fetch(\PDO::FETCH_ASSOC);
        if (!$listing) return jsonResponse($response, ['error' => 'Không tìm thấy!'], 400);

        $player = loadPlayer($id);
        $itemData = json_decode($listing['item_data'], true);
        $item = \App\Models\Item::fromArray($itemData);
        $player->inventory[] = $item;
        savePlayer($id, $player);

        $pdo->prepare("UPDATE auction_listings SET status = 'cancelled' WHERE id = ?")->execute([$listingId]);

        return jsonResponse($response, [
            'message' => "Đã hủy đấu giá, vật phẩm trả về túi.",
            'player' => $player->toArray(),
        ]);
    });
};
