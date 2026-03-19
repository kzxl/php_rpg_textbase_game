<?php

/**
 * Travel Feature — Torn-style area travel with countdown timer.
 * - List areas with travel time
 * - Start travel (countdown) → block actions during travel
 * - Check/complete travel when countdown ends
 */

use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Core\Database;

return function ($app) {
    // List all areas with travel times
    $app->get('/api/data/areas', function (Request $request, Response $response) {
        $pdo = Database::pdo();
        $areas = $pdo->query("SELECT * FROM areas ORDER BY sort_order")->fetchAll();
        return jsonResponse($response, ['areas' => $areas]);
    });

    // Get current area + travel status
    $app->get('/api/player/{id}/area', function (Request $request, Response $response, array $args) {
        $player = loadPlayer($args['id']);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        // Auto-complete travel if arrived
        $travelCompleted = null;
        if ($player->isTraveling() && $player->travelRemaining() <= 0) {
            $travelCompleted = $player->completeTravelIfReady();
            savePlayer($args['id'], $player);
        }

        $pdo = Database::pdo();
        $areaStmt = $pdo->prepare("SELECT * FROM areas WHERE id = :id");
        $areaStmt->execute(['id' => $player->currentArea]);
        $area = $areaStmt->fetch();

        $result = [
            'area' => $area,
            'player' => $player->toArray(),
        ];

        if ($travelCompleted) {
            $result['message'] = "Đã đến {$travelCompleted}!";
        }

        if ($player->isTraveling()) {
            $result['traveling'] = true;
            $result['travelingTo'] = $player->travelingTo;
            $result['travelRemaining'] = $player->travelRemaining();

            $destStmt = $pdo->prepare("SELECT name FROM areas WHERE id = :id");
            $destStmt->execute(['id' => $player->travelingTo]);
            $dest = $destStmt->fetch();
            $result['travelDestination'] = $dest ? $dest['name'] : $player->travelingTo;
        }

        return jsonResponse($response, $result);
    });

    // Start travel to area (with countdown)
    $app->post('/api/player/{id}/travel', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        // Block if already traveling
        if ($player->isTraveling()) {
            $remaining = $player->travelRemaining();
            return jsonResponse($response, [
                'error' => "Đang di chuyển! Còn {$remaining}s nữa.",
                'travelRemaining' => $remaining,
            ], 400);
        }

        // Block if jailed or hospitalized
        if ($player->isJailed()) return jsonResponse($response, ['error' => 'Đang bị giam!'], 400);
        if ($player->hospitalRemaining() > 0) return jsonResponse($response, ['error' => 'Đang tịnh dưỡng!'], 400);

        $body = $request->getParsedBody();
        $targetAreaId = $body['areaId'] ?? '';

        if ($player->currentArea === $targetAreaId) {
            return jsonResponse($response, ['error' => 'Đã ở khu vực này'], 400);
        }

        $pdo = Database::pdo();
        $areaStmt = $pdo->prepare("SELECT * FROM areas WHERE id = :id");
        $areaStmt->execute(['id' => $targetAreaId]);
        $area = $areaStmt->fetch();

        if (!$area) return jsonResponse($response, ['error' => 'Khu vực không tồn tại'], 404);

        // Level check
        if ($player->level < (int) $area['min_level']) {
            return jsonResponse($response, [
                'error' => "Cần tối thiểu Lv.{$area['min_level']} để đến {$area['name']}",
            ], 400);
        }

        // Calculate travel time (base from area + distance factor)
        $travelTime = (int) $area['travel_time'];

        if ($travelTime <= 0) {
            // Instant travel (starting area)
            $player->currentArea = $targetAreaId;
            savePlayer($id, $player);
            return jsonResponse($response, [
                'message' => "Đã đến {$area['name']}",
                'player' => $player->toArray(),
                'instant' => true,
            ]);
        }

        // Start travel with countdown
        $player->travelingTo = $targetAreaId;
        $player->travelArrivesAt = time() + $travelTime;
        savePlayer($id, $player);

        return jsonResponse($response, [
            'message' => "Bắt đầu di chuyển đến {$area['name']}. Thời gian: {$travelTime}s",
            'player' => $player->toArray(),
            'travelTime' => $travelTime,
            'travelRemaining' => $travelTime,
        ]);
    });

    // Check/complete travel (called by frontend polling)
    $app->post('/api/player/{id}/travel-check', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        if (!$player->isTraveling()) {
            return jsonResponse($response, [
                'traveling' => false,
                'player' => $player->toArray(),
            ]);
        }

        $remaining = $player->travelRemaining();
        if ($remaining <= 0) {
            $areaName = $player->completeTravelIfReady();
            savePlayer($id, $player);
            return jsonResponse($response, [
                'traveling' => false,
                'arrived' => true,
                'message' => "Đã đến {$areaName}!",
                'player' => $player->toArray(),
            ]);
        }

        return jsonResponse($response, [
            'traveling' => true,
            'travelRemaining' => $remaining,
            'travelingTo' => $player->travelingTo,
            'player' => $player->toArray(),
        ]);
    });
};
