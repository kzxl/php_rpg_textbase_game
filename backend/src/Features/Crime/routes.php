<?php

/**
 * Crime Feature — Nghịch Thiên (crimes), Thiên Lao (jail).
 * Uses GameDataRepository (DB) instead of JSON files.
 */

use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Core\GameDataRepository;

return function ($app) {
    $app->post('/api/player/{id}/commit-crime', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $body = $request->getParsedBody();
        $crimeId = $body['crimeId'] ?? '';

        $crime = GameDataRepository::getCrimeById($crimeId);
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

    // Mua Chuộc — bribe guard to reduce jail time by 50%
    $app->post('/api/player/{id}/bribe-guard', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        if (!$player->isJailed()) {
            return jsonResponse($response, ['error' => 'Bạn không bị giam!'], 400);
        }

        $remainingSeconds = max(0, $player->jailUntil - time());
        $bribeCost = max(50, (int)($remainingSeconds * 0.5)); // 0.5 gold per remaining second, min 50

        if ($player->gold < $bribeCost) {
            return jsonResponse($response, ['error' => "Cần {$bribeCost} 💎 để mua chuộc lính canh!"], 400);
        }

        $player->gold -= $bribeCost;
        $newRemaining = (int)($remainingSeconds * 0.5); // 50% reduction
        $player->jailUntil = time() + $newRemaining;

        savePlayer($id, $player);
        $minLeft = (int)ceil($newRemaining / 60);
        return jsonResponse($response, [
            'success' => true,
            'message' => "💰 Mua chuộc thành công! Giảm hình phạt 50%. Còn {$minLeft} phút.",
            'cost' => $bribeCost,
            'player' => $player->toArray(),
        ]);
    });

    $app->get('/api/data/crimes', function (Request $request, Response $response) {
        $crimes = GameDataRepository::getCrimes();
        return jsonResponse($response, ['crimes' => $crimes]);
    });
};
