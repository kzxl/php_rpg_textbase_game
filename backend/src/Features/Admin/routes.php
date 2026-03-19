<?php

/**
 * Admin Feature — Thiên Đạo Đài (Admin Control Panel)
 * Uses GameDataRepository (DB) for all CRUD operations.
 */

use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Core\GameDataRepository;

return function ($app) {
    // Middleware: only 'admin' role
    $adminCheck = function (Request $request, $handler) {
        $body = $request->getParsedBody() ?? json_decode($request->getBody()->getContents(), true) ?? [];
        $playerId = $body['adminId'] ?? $request->getQueryParams()['adminId'] ?? '';
        if (!$playerId) return (new \Slim\Psr7\Response())->withStatus(403);
        $player = loadPlayer($playerId);
        if (!$player || $player->role !== 'admin') {
            $resp = new \Slim\Psr7\Response();
            $resp->getBody()->write(json_encode(['error' => 'Không có quyền truy cập']));
            return $resp->withStatus(403)->withHeader('Content-Type', 'application/json');
        }
        return $handler->handle($request);
    };

    // Data summary
    $app->get('/api/admin/data-summary', function (Request $request, Response $response) {
        return jsonResponse($response, GameDataRepository::getDataSummary());
    })->add($adminCheck);

    // Generic: Get all records for a tab
    $app->get('/api/admin/{tab}', function (Request $request, Response $response, array $args) {
        $tab = $args['tab'];
        $table = GameDataRepository::getTableForTab($tab);
        if (!$table) return jsonResponse($response, ['error' => 'Invalid tab'], 400);
        $data = GameDataRepository::getAllFromTable($table);
        return jsonResponse($response, [$tab => $data]);
    })->add($adminCheck);

    // Generic: Update a record
    $app->put('/api/admin/{tab}/{itemId}', function (Request $request, Response $response, array $args) {
        $tab = $args['tab'];
        $itemId = $args['itemId'];
        $table = GameDataRepository::getTableForTab($tab);
        if (!$table) return jsonResponse($response, ['error' => 'Invalid tab'], 400);

        $body = json_decode($request->getBody()->getContents(), true);
        $newData = $body['data'] ?? null;
        if (!$newData) return jsonResponse($response, ['error' => 'No data provided'], 400);

        GameDataRepository::updateRecord($table, $itemId, $newData);
        return jsonResponse($response, ['success' => true, 'message' => "Cập nhật $itemId thành công."]);
    })->add($adminCheck);

    // Generic: Create a record
    $app->post('/api/admin/{tab}', function (Request $request, Response $response, array $args) {
        $tab = $args['tab'];
        $table = GameDataRepository::getTableForTab($tab);
        if (!$table) return jsonResponse($response, ['error' => 'Invalid tab'], 400);

        $body = json_decode($request->getBody()->getContents(), true);
        $newData = $body['data'] ?? null;
        $newId = $newData['id'] ?? null;
        if (!$newData || !$newId) return jsonResponse($response, ['error' => 'Missing id or data'], 400);

        GameDataRepository::insertRecord($table, $newId, $newData);
        return jsonResponse($response, ['success' => true, 'message' => "Thêm mới $newId thành công."]);
    })->add($adminCheck);

    // Generic: Delete a record
    $app->delete('/api/admin/{tab}/{itemId}', function (Request $request, Response $response, array $args) {
        $tab = $args['tab'];
        $itemId = $args['itemId'];
        $table = GameDataRepository::getTableForTab($tab);
        if (!$table) return jsonResponse($response, ['error' => 'Invalid tab'], 400);

        GameDataRepository::deleteRecord($table, $itemId);
        return jsonResponse($response, ['success' => true, 'message' => "Xóa $itemId thành công."]);
    })->add($adminCheck);
};
