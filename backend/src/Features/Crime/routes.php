<?php

/**
 * Crime Feature — Nghịch Thiên (crimes), Thiên Lao (jail).
 */

use Slim\Psr7\Request;
use Slim\Psr7\Response;

return function ($app) {
    $app->post('/api/player/{id}/commit-crime', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $body = $request->getParsedBody();
        $crimeId = $body['crimeId'] ?? '';

        $crimesFile = __DIR__ . '/../../../data/crimes.json';
        $crimes = json_decode(file_get_contents($crimesFile), true);
        $crime = null;
        foreach ($crimes as $c) {
            if ($c['id'] === $crimeId) { $crime = $c; break; }
        }
        if (!$crime) return jsonResponse($response, ['error' => 'Crime not found'], 404);

        $result = $player->commitCrime($crime);
        savePlayer($id, $player);

        return jsonResponse($response, array_merge($result, ['player' => $player->toArray()]));
    });

    $app->post('/api/player/{id}/escape-jail', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $result = $player->escapeJail();
        savePlayer($id, $player);
        return jsonResponse($response, array_merge($result, ['player' => $player->toArray()]));
    });

    $app->post('/api/player/{id}/bail', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $result = $player->bailOut();
        savePlayer($id, $player);
        return jsonResponse($response, array_merge($result, ['player' => $player->toArray()]));
    });

    $app->get('/api/data/crimes', function (Request $request, Response $response) {
        $file = __DIR__ . '/../../../data/crimes.json';
        $crimes = json_decode(file_get_contents($file), true);
        return jsonResponse($response, ['crimes' => $crimes]);
    });
};
