<?php

/**
 * Travel Feature — Ngao Du (area exploration).
 */

use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Core\Database;

return function ($app) {
    // List all areas
    $app->get('/api/data/areas', function (Request $request, Response $response) {
        $pdo = Database::pdo();
        $areas = $pdo->query("SELECT * FROM areas ORDER BY sort_order")->fetchAll();
        return jsonResponse($response, ['areas' => $areas]);
    });

    // Get current area + available monsters
    $app->get('/api/player/{id}/area', function (Request $request, Response $response, array $args) {
        $player = loadPlayer($args['id']);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $pdo = Database::pdo();

        // Current area info
        $areaStmt = $pdo->prepare("SELECT * FROM areas WHERE id = :id");
        $areaStmt->execute(['id' => $player->currentArea]);
        $area = $areaStmt->fetch();

        // Monsters in this area
        $monsterStmt = $pdo->prepare(
            "SELECT am.*, md.item_id, md.drop_chance
             FROM area_monsters am
             LEFT JOIN monster_drops md ON md.monster_id = am.monster_id
             WHERE am.area_id = :areaId
             ORDER BY am.spawn_weight DESC"
        );
        $monsterStmt->execute(['areaId' => $player->currentArea]);
        $monsters = $monsterStmt->fetchAll();

        return jsonResponse($response, [
            'area' => $area,
            'monsters' => $monsters,
            'player' => $player->toArray(),
        ]);
    });

    // Travel to a new area
    $app->post('/api/player/{id}/travel', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $body = $request->getParsedBody();
        $targetAreaId = $body['areaId'] ?? '';

        $pdo = Database::pdo();
        $areaStmt = $pdo->prepare("SELECT * FROM areas WHERE id = :id");
        $areaStmt->execute(['id' => $targetAreaId]);
        $area = $areaStmt->fetch();

        if (!$area) return jsonResponse($response, ['error' => 'Khu vực không tồn tại'], 404);

        if ($player->currentArea === $targetAreaId) {
            return jsonResponse($response, ['error' => 'Đã ở khu vực này'], 400);
        }

        // Level check
        if ($player->level < (int) $area['min_level']) {
            return jsonResponse($response, [
                'error' => "Cần tối thiểu Lv.{$area['min_level']} để đến {$area['name']}",
            ], 400);
        }

        $player->currentArea = $targetAreaId;
        savePlayer($id, $player);

        return jsonResponse($response, [
            'message' => "Đã di chuyển đến {$area['name']}",
            'player' => $player->toArray(),
        ]);
    });
};
