<?php

/**
 * Auth Feature — Player creation, loading, stat allocation.
 */

use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Models\Player;
use App\Systems\ItemSystem;
use App\Systems\SkillSystem;

return function ($app) {
    $app->post('/api/player/create', function (Request $request, Response $response) {
        $body = $request->getParsedBody();
        $name = $body['name'] ?? 'Vô Danh';
        $gender = $body['gender'] ?? 'male';

        if (!in_array($gender, ['male', 'female'])) {
            return jsonResponse($response, ['error' => 'Gender must be male or female'], 400);
        }

        $player = new Player($name, $gender);

        // Starter items
        $itemSystem = new ItemSystem();
        $w = $itemSystem->createItem('rusty_sword');
        $a = $itemSystem->createItem('leather_armor');
        if ($w) $player->equipItem($w);
        if ($a) $player->equipItem($a);

        // Starter skill
        $skillSystem = new SkillSystem();
        $sk = $skillSystem->getById('heavy_strike');
        if ($sk) $player->learnSkill($sk);

        $id = bin2hex(random_bytes(8));
        savePlayer($id, $player);

        return jsonResponse($response, [
            'id' => $id,
            'message' => "Chào mừng {$name} đến với Nghịch Thiên Ký.",
            'player' => $player->toArray(),
        ], 201);
    });

    $app->get('/api/player/{id}', function (Request $request, Response $response, array $args) {
        $player = loadPlayer($args['id']);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        return jsonResponse($response, [
            'player' => $player->toArray(),
            'breakdown' => $player->getStatBreakdown(),
        ]);
    });

    $app->post('/api/player/{id}/allocate', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $player = loadPlayer($id);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        $body = $request->getParsedBody();
        $stat = $body['stat'] ?? '';
        $points = (int) ($body['points'] ?? 1);

        if (!$player->allocateStat($stat, $points)) {
            return jsonResponse($response, ['error' => 'Cannot allocate stat'], 400);
        }

        savePlayer($id, $player);
        return jsonResponse($response, [
            'message' => "Đã phân bổ {$points} điểm vào {$stat}",
            'player' => $player->toArray(),
        ]);
    });
};
