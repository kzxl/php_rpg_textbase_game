<?php

/**
 * Skill Feature — Thần Thông (learn skills).
 */

use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Systems\SkillSystem;

return function ($app) {
    $app->post('/api/player/{id}/learn-skill', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $body = $request->getParsedBody();
        $skillId = $body['skillId'] ?? '';

        $skillSystem = new SkillSystem();
        $skill = $skillSystem->getById($skillId);
        if (!$skill) return jsonResponse($response, ['error' => 'Skill not found'], 404);

        $player->learnSkill($skill);
        savePlayer($id, $player);

        return jsonResponse($response, [
            'message' => "Đã học {$skill['name']}",
            'player' => $player->toArray(),
        ]);
    });

    $app->get('/api/data/skills', function (Request $request, Response $response) {
        return jsonResponse($response, ['skills' => (new SkillSystem())->getAll()]);
    });
};
