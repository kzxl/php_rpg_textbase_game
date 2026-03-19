<?php

/**
 * Combat Feature — Encounter monsters, fight.
 */

use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Core\CombatEngine;
use App\Systems\MonsterSystem;

return function ($app) {
    $app->post('/api/combat/full', function (Request $request, Response $response) {
        $body = $request->getParsedBody();
        $playerId = $body['playerId'] ?? '';
        $monsterId = $body['monsterId'] ?? null;

        $player = loadPlayer($playerId);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        // Block combat while hospitalized
        if ($player->isHospitalized()) {
            $remain = $player->hospitalRemaining();
            return jsonResponse($response, [
                'error' => "Đang tịnh dưỡng! Còn {$remain}s.",
                'player' => $player->toArray(),
            ], 400);
        }

        $monsterSystem = new MonsterSystem();
        $monster = $monsterId
            ? $monsterSystem->spawn($monsterId, $player->level)
            : $monsterSystem->spawnRandom($player->level);

        if (!$monster) return jsonResponse($response, ['error' => 'Monster not found'], 404);

        $combat = new CombatEngine();
        $result = $combat->fullCombat($player, $monster);

        savePlayer($playerId, $player);
        return jsonResponse($response, $result);
    });

    $app->get('/api/data/monsters', function (Request $request, Response $response) {
        return jsonResponse($response, ['monsters' => (new MonsterSystem())->getAll()]);
    });
};
