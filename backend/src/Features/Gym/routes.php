<?php

/**
 * Gym Feature — Lực Thể (stat training).
 */

use Slim\Psr7\Request;
use Slim\Psr7\Response;

return function ($app) {
    $app->post('/api/player/{id}/train', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $body = $request->getParsedBody();
        $stat = $body['stat'] ?? '';
        $energyCost = 5;

        $error = $player->trainStat($stat, $energyCost);
        if ($error) return jsonResponse($response, ['error' => $error], 400);

        savePlayer($id, $player);

        $statNames = ['strength' => 'Sức mạnh', 'speed' => 'Tốc độ', 'dexterity' => 'Khéo léo', 'defense' => 'Phòng thủ'];
        $statLabel = $statNames[$stat] ?? $stat;
        return jsonResponse($response, [
            'message' => "Rèn luyện +1 {$statLabel} (-{$energyCost} linh lực)",
            'player' => $player->toArray(),
        ]);
    });
};
