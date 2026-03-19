<?php

/**
 * Education Feature — Tu Luyện (Progression Trees).
 * Uses GameDataRepository (DB) instead of JSON files.
 */

use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Core\GameDataRepository;

return function ($app) {
    $app->post('/api/player/{id}/enroll', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $completed = $player->checkEducation();

        $body = $request->getParsedBody();
        $nodeId = $body['nodeId'] ?? '';
        $treeId = $body['treeId'] ?? '';

        if (!$nodeId || !$treeId) {
            return jsonResponse($response, ['error' => 'Thiếu thông tin Node/Tree'], 400);
        }

        $trees = GameDataRepository::getEducationTrees();
        
        $targetNode = null;
        foreach ($trees as $t) {
            if ($t['id'] === $treeId) {
                foreach ($t['nodes'] as $n) {
                    if ($n['id'] === $nodeId) {
                        $targetNode = $n;
                        break 2;
                    }
                }
            }
        }

        if (!$targetNode) return jsonResponse($response, ['error' => 'Node không tồn tại'], 404);

        $error = $player->enrollNode($targetNode, $treeId);
        if ($error) return jsonResponse($response, ['error' => $error], 400);

        savePlayer($id, $player);
        return jsonResponse($response, [
            'message' => "Bắt đầu tu luyện: {$targetNode['name']} ({$targetNode['duration']}s)",
            'player' => $player->toArray(),
        ]);
    });

    $app->post('/api/player/{id}/check-education', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $completedNodeId = $player->checkEducation();
        if ($completedNodeId) {
            savePlayer($id, $player);
        }

        return jsonResponse($response, [
            'completed' => $completedNodeId !== null,
            'completedNodeId' => $completedNodeId,
            'message' => $completedNodeId ? "Trần kiến tăng tiến!" : 'Chưa thu hoạch được gì.',
            'player' => $player->toArray(),
        ]);
    });

    $app->get('/api/data/education', function (Request $request, Response $response) {
        $trees = GameDataRepository::getEducationTrees();
        return jsonResponse($response, ['trees' => $trees]);
    });
};
