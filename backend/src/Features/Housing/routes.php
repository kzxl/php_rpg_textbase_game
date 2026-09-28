<?php

declare(strict_types=1);

/**
 * Housing Feature Routes (Động Phủ & Dược Viên)
 * Slim 4 Sovereign Routing connecting to HousingService.
 */

use App\Core\ResponseHelper;
use App\Features\Housing\HousingService;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

return function ($app) {
    $service = new HousingService();

    // 1. GET HOUSING DETAILS
    $app->get('/api/player/{id}/housing', function (Request $request, Response $response, array $args) use ($service) {
        $id = $args['id'];
        try {
            $data = $service->getHousingDetails($id);
            return ResponseHelper::json($response, $data);
        } catch (Throwable $e) {
            return ResponseHelper::json($response, ['error' => $e->getMessage()], 400);
        }
    });

    $parseBody = function (Request $request): array {
        $parsed = $request->getParsedBody();
        if (is_array($parsed) && !empty($parsed)) {
            return $parsed;
        }
        $raw = (string)$request->getBody();
        if (!empty($raw)) {
            $json = json_decode($raw, true);
            if (is_array($json)) {
                return $json;
            }
        }
        return (array)$parsed;
    };

    // 2. BUY OR UPGRADE HOUSING
    $app->post('/api/player/{id}/housing/buy', function (Request $request, Response $response, array $args) use ($service) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) {
            return ResponseHelper::json($response, ['error' => 'Không tìm thấy người chơi!'], 404);
        }

        try {
            $result = $service->buyOrUpgradeHousing($id, $player);
            savePlayer($id, $player);
            return ResponseHelper::json($response, $result);
        } catch (Throwable $e) {
            return ResponseHelper::json($response, ['error' => $e->getMessage()], 400);
        }
    });

    // 3. PLANT HERB IN GARDEN
    $app->post('/api/player/{id}/housing/plant', function (Request $request, Response $response, array $args) use ($service, $parseBody) {
        $id = $args['id'];
        $body = $parseBody($request);
        $herbId = (string)($body['herbId'] ?? '');
        $slotIndex = (int)($body['slotIndex'] ?? 0);

        try {
            $result = $service->plantHerb($id, $herbId, $slotIndex);
            return ResponseHelper::json($response, $result);
        } catch (Throwable $e) {
            return ResponseHelper::json($response, ['error' => $e->getMessage()], 400);
        }
    });

    // 4. HARVEST GARDEN
    $app->post('/api/player/{id}/housing/harvest', function (Request $request, Response $response, array $args) use ($service, $parseBody) {
        $id = $args['id'];
        $body = $parseBody($request);
        $slotIndex = isset($body['slotIndex']) ? (int)$body['slotIndex'] : null;

        $player = loadPlayer($id);
        if (!$player) {
            return ResponseHelper::json($response, ['error' => 'Không tìm thấy người chơi!'], 404);
        }

        try {
            $result = $service->harvestGarden($id, $player, $slotIndex);
            savePlayer($id, $player);
            return ResponseHelper::json($response, $result);
        } catch (Throwable $e) {
            return ResponseHelper::json($response, ['error' => $e->getMessage()], 400);
        }
    });

    // 5. UPGRADE FORMATION
    $app->post('/api/player/{id}/housing/formation', function (Request $request, Response $response, array $args) use ($service, $parseBody) {
        $id = $args['id'];
        $body = $parseBody($request);
        $formationId = (string)($body['formationId'] ?? '');

        $player = loadPlayer($id);
        if (!$player) {
            return ResponseHelper::json($response, ['error' => 'Không tìm thấy người chơi!'], 404);
        }

        try {
            $result = $service->upgradeFormation($id, $player, $formationId);
            savePlayer($id, $player);
            return ResponseHelper::json($response, $result);
        } catch (Throwable $e) {
            return ResponseHelper::json($response, ['error' => $e->getMessage()], 400);
        }
    });

    // 6. PAY MAINTENANCE
    $app->post('/api/player/{id}/housing/maintenance', function (Request $request, Response $response, array $args) use ($service) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) {
            return ResponseHelper::json($response, ['error' => 'Không tìm thấy người chơi!'], 404);
        }

        try {
            $result = $service->payMaintenance($id, $player);
            savePlayer($id, $player);
            return ResponseHelper::json($response, $result);
        } catch (Throwable $e) {
            return ResponseHelper::json($response, ['error' => $e->getMessage()], 400);
        }
    });

    // 7. GET RENTALS
    $app->get('/api/housing/rentals', function (Request $request, Response $response) use ($service) {
        try {
            $rentals = $service->getAvailableRentals();
            return ResponseHelper::json($response, ['rentals' => $rentals]);
        } catch (Throwable $e) {
            return ResponseHelper::json($response, ['error' => $e->getMessage()], 400);
        }
    });

    // 8. LIST RENTAL
    $app->post('/api/player/{id}/housing/rent/list', function (Request $request, Response $response, array $args) use ($service, $parseBody) {
        $id = $args['id'];
        $body = $parseBody($request);
        $dailyFee = (int)($body['pricePerDay'] ?? $body['dailyFee'] ?? 100);

        try {
            $result = $service->listRental($id, $dailyFee);
            return ResponseHelper::json($response, $result);
        } catch (Throwable $e) {
            return ResponseHelper::json($response, ['error' => $e->getMessage()], 400);
        }
    });

    // 9. RENT HOUSE
    $app->post('/api/player/{id}/housing/rent/take', function (Request $request, Response $response, array $args) use ($service, $parseBody) {
        $id = $args['id'];
        $body = $parseBody($request);
        $rentalId = (int)($body['rentalId'] ?? 0);

        $player = loadPlayer($id);
        if (!$player) {
            return ResponseHelper::json($response, ['error' => 'Không tìm thấy người chơi!'], 404);
        }

        try {
            $result = $service->rentHouse($id, $player, $rentalId);
            savePlayer($id, $player);
            return ResponseHelper::json($response, $result);
        } catch (Throwable $e) {
            return ResponseHelper::json($response, ['error' => $e->getMessage()], 400);
        }
    });

    // 10. CANCEL RENTAL
    $app->post('/api/player/{id}/housing/rent/cancel', function (Request $request, Response $response, array $args) use ($service, $parseBody) {
        $id = $args['id'];
        $body = $parseBody($request);
        $rentalId = (int)($body['rentalId'] ?? 0);

        try {
            $result = $service->cancelRental($id, $rentalId);
            return ResponseHelper::json($response, $result);
        } catch (Throwable $e) {
            return ResponseHelper::json($response, ['error' => $e->getMessage()], 400);
        }
    });
};
