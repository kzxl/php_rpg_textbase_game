<?php

/**
 * Auth Feature — Register, Login, Player management.
 */

use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Models\Player;
use App\Systems\ItemSystem;
use App\Systems\SkillSystem;
use App\Core\PlayerRepository;

return function ($app) {
    // === REGISTER ===
    $app->post('/api/auth/register', function (Request $request, Response $response) {
        $body = $request->getParsedBody();
        $username = trim($body['username'] ?? '');
        $password = $body['password'] ?? '';
        $name = trim($body['name'] ?? 'Vô Danh');
        $gender = $body['gender'] ?? 'male';

        if (strlen($username) < 3) {
            return jsonResponse($response, ['error' => 'Tên đăng nhập cần ít nhất 3 ký tự'], 400);
        }
        if (strlen($password) < 4) {
            return jsonResponse($response, ['error' => 'Mật khẩu cần ít nhất 4 ký tự'], 400);
        }
        if (!in_array($gender, ['male', 'female'])) {
            return jsonResponse($response, ['error' => 'Gender must be male or female'], 400);
        }

        $result = PlayerRepository::register($username, $password, $name, $gender);
        if (isset($result['error'])) {
            return jsonResponse($response, ['error' => $result['error']], 409);
        }

        $id = $result['id'];
        $player = $result['player'];

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

        // Save items + skills to mapping tables
        savePlayer($id, $player);
        PlayerRepository::saveSkills($id, $player);

        return jsonResponse($response, [
            'id' => $id,
            'message' => "Chào mừng {$name} đến với Nghịch Thiên Ký.",
            'player' => $player->toArray(),
        ], 201);
    });

    // === LOGIN ===
    $app->post('/api/auth/login', function (Request $request, Response $response) {
        $body = $request->getParsedBody();
        $username = trim($body['username'] ?? '');
        $password = $body['password'] ?? '';

        if (empty($username) || empty($password)) {
            return jsonResponse($response, ['error' => 'Vui lòng nhập tên đăng nhập và mật khẩu'], 400);
        }

        $result = PlayerRepository::login($username, $password);
        if (isset($result['error'])) {
            return jsonResponse($response, ['error' => $result['error']], 401);
        }

        return jsonResponse($response, [
            'id' => $result['id'],
            'message' => "Chào mừng trở lại, {$result['player']->name}!",
            'player' => $result['player']->toArray(),
        ]);
    });

    // === LEGACY: Quick create (no auth) ===
    $app->post('/api/player/create', function (Request $request, Response $response) {
        $body = $request->getParsedBody();
        $name = $body['name'] ?? 'Vô Danh';
        $gender = $body['gender'] ?? 'male';

        if (!in_array($gender, ['male', 'female'])) {
            return jsonResponse($response, ['error' => 'Gender must be male or female'], 400);
        }

        $player = new Player($name, $gender);

        $itemSystem = new ItemSystem();
        $w = $itemSystem->createItem('rusty_sword');
        $a = $itemSystem->createItem('leather_armor');
        if ($w) $player->equipItem($w);
        if ($a) $player->equipItem($a);

        $skillSystem = new SkillSystem();
        $sk = $skillSystem->getById('heavy_strike');
        if ($sk) $player->learnSkill($sk);

        $id = bin2hex(random_bytes(8));
        savePlayer($id, $player);
        PlayerRepository::saveSkills($id, $player);

        return jsonResponse($response, [
            'id' => $id,
            'message' => "Chào mừng {$name} đến với Nghịch Thiên Ký.",
            'player' => $player->toArray(),
        ], 201);
    });

    // === GET PLAYER ===
    $app->get('/api/player/{id}', function (Request $request, Response $response, array $args) {
        $player = loadPlayer($args['id']);
        if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

        return jsonResponse($response, [
            'player' => $player->toArray(),
            'breakdown' => $player->getStatBreakdown(),
        ]);
    });

    // === ALLOCATE STAT POINTS ===
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
