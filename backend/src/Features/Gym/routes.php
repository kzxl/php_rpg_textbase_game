<?php

/**
 * Gym Feature — Rèn Luyện (stat training with batch support).
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
        $count = min(max((int)($body['count'] ?? 1), 1), 100); // 1-100 lần
        $energyCost = 5;
        $totalCost = $energyCost * $count;

        // Check max trainable
        $maxTrainable = (int)floor($player->currentEnergy / $energyCost);
        if ($maxTrainable <= 0) {
            return jsonResponse($response, ['error' => 'Không đủ linh lực để rèn luyện!'], 400);
        }
        $actualCount = min($count, $maxTrainable);

        $errors = [];
        $totalGain = 0;
        for ($i = 0; $i < $actualCount; $i++) {
            $error = $player->trainStat($stat, $energyCost);
            if ($error) {
                $errors[] = $error;
                break;
            }
            $totalGain++;
        }

        if ($totalGain === 0) {
            return jsonResponse($response, ['error' => $errors[0] ?? 'Không thể rèn luyện.'], 400);
        }

        savePlayer($id, $player);

        $statNames = ['strength' => 'Sức mạnh', 'speed' => 'Tốc độ', 'dexterity' => 'Khéo léo', 'defense' => 'Phòng thủ'];
        $statLabel = $statNames[$stat] ?? $stat;
        $usedEnergy = $totalGain * $energyCost;
        return jsonResponse($response, [
            'message' => "Rèn luyện +{$totalGain} {$statLabel} (-{$usedEnergy} linh lực)",
            'player' => $player->toArray(),
            'trained' => $totalGain,
        ]);
    });
};
