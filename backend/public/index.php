<?php

/**
 * RPG Engine – Slim 4 Entry Point
 * Run: php -S localhost:8080 -t public
 *
 * Uses file-based storage for player persistence (PHP dev server is per-request)
 */

require __DIR__ . '/../vendor/autoload.php';

use Slim\Factory\AppFactory;
use Slim\Psr7\Request;
use Slim\Psr7\Response;

use App\Models\Player;
use App\Models\Item;
use App\Core\CombatEngine;
use App\Systems\SkillSystem;
use App\Systems\ItemSystem;
use App\Systems\MonsterSystem;

$app = AppFactory::create();

// Middleware (order matters: last added = first executed)
$app->addBodyParsingMiddleware();
$app->addRoutingMiddleware();

// CORS middleware
$app->add(function (Request $request, $handler) {
    if ($request->getMethod() === 'OPTIONS') {
        $response = new \Slim\Psr7\Response();
    } else {
        $response = $handler->handle($request);
    }
    return $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

$app->addErrorMiddleware(true, true, true);

$app->options('/{routes:.+}', function (Request $request, Response $response) {
    return $response;
});

// ===== Helpers =====
function jsonResponse(Response $response, mixed $data, int $status = 200): Response
{
    $response->getBody()->write(json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
    return $response
        ->withHeader('Content-Type', 'application/json; charset=utf-8')
        ->withStatus($status);
}

// File-based player storage
function savePath(): string
{
    $dir = __DIR__ . '/../storage/players';
    if (!is_dir($dir)) mkdir($dir, 0777, true);
    return $dir;
}

function savePlayer(string $id, Player $player): void
{
    file_put_contents(savePath() . "/{$id}.json", json_encode($player->toArray(), JSON_UNESCAPED_UNICODE));
}

function loadPlayer(string $id): ?Player
{
    $file = savePath() . "/{$id}.json";
    if (!file_exists($file)) return null;
    $data = json_decode(file_get_contents($file), true);
    if (!$data) return null;
    $player = Player::fromArray($data);
    // Auto-apply meditation HP regen
    $healed = $player->applyMeditation();
    if ($healed > 0) {
        savePlayer($id, $player);
    }
    return $player;
}

// ===== ROUTES =====

$app->get('/', function (Request $request, Response $response) {
    return jsonResponse($response, [
        'name' => 'Thiên Đạo Bị Lỗi – RPG Engine',
        'version' => '1.0.0',
    ]);
});

// --- Player ---
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
        'message' => "Chào mừng {$name} đến với thế giới Thiên Đạo.",
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

$app->post('/api/player/{id}/equip', function (Request $request, Response $response, array $args) {
    $id = $args['id'];
    $player = loadPlayer($id);
    if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

    $body = $request->getParsedBody();
    $itemId = $body['itemId'] ?? '';

    $itemSystem = new ItemSystem();
    $item = $itemSystem->createItem($itemId);
    if (!$item) return jsonResponse($response, ['error' => 'Item not found'], 404);

    $player->equipItem($item);
    savePlayer($id, $player);

    return jsonResponse($response, [
        'message' => "Đã trang bị {$item->name}",
        'player' => $player->toArray(),
    ]);
});

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

// --- Medicine (đan dược) - Torn-style stacking cooldown ---
$app->post('/api/player/{id}/use-medicine', function (Request $request, Response $response, array $args) {
    $id = $args['id'];
    $player = loadPlayer($id);
    if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

    $body = $request->getParsedBody();
    $medId = $body['medicineId'] ?? '';

    $medsFile = __DIR__ . '/../data/medicines.json';
    $medicines = json_decode(file_get_contents($medsFile), true);
    $medicine = null;
    foreach ($medicines as $m) {
        if ($m['id'] === $medId) { $medicine = $m; break; }
    }
    if (!$medicine) return jsonResponse($response, ['error' => 'Đan dược không tồn tại'], 404);

    $error = $player->useMedicine($medicine);
    if ($error) return jsonResponse($response, ['error' => $error], 400);

    savePlayer($id, $player);
    return jsonResponse($response, [
        'message' => "+{$medicine['healPercent']}% HP · Đan độc +{$medicine['cooldownAdd']}s",
        'player' => $player->toArray(),
    ]);
});

// --- Gym (rèn luyện) ---
$app->post('/api/player/{id}/train', function (Request $request, Response $response, array $args) {
    $id = $args['id'];
    $player = loadPlayer($id);
    if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

    $body = $request->getParsedBody();
    $stat = $body['stat'] ?? '';
    $energyCost = 5; // 5 energy per training session

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

// --- Crimes (Phạm tội) ---
$app->post('/api/player/{id}/commit-crime', function (Request $request, Response $response, array $args) {
    $id = $args['id'];
    $player = loadPlayer($id);
    if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

    $body = $request->getParsedBody();
    $crimeId = $body['crimeId'] ?? '';

    $crimesFile = __DIR__ . '/../data/crimes.json';
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

// --- Jail ---
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

// --- Education (Tu luyện) ---
$app->post('/api/player/{id}/enroll', function (Request $request, Response $response, array $args) {
    $id = $args['id'];
    $player = loadPlayer($id);
    if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

    // Auto-complete any finished course first
    $completed = $player->checkEducation();

    $body = $request->getParsedBody();
    $courseId = $body['courseId'] ?? '';

    $coursesFile = __DIR__ . '/../data/education.json';
    $courses = json_decode(file_get_contents($coursesFile), true);
    $course = null;
    foreach ($courses as $c) {
        if ($c['id'] === $courseId) { $course = $c; break; }
    }
    if (!$course) return jsonResponse($response, ['error' => 'Course not found'], 404);

    $error = $player->enrollCourse($course);
    if ($error) return jsonResponse($response, ['error' => $error], 400);

    savePlayer($id, $player);
    return jsonResponse($response, [
        'message' => "Bắt đầu học: {$course['name']} ({$course['duration']}s)",
        'player' => $player->toArray(),
    ]);
});

$app->post('/api/player/{id}/check-education', function (Request $request, Response $response, array $args) {
    $id = $args['id'];
    $player = loadPlayer($id);
    if (!$player) return jsonResponse($response, ['error' => 'Player not found'], 404);

    $completed = $player->checkEducation();
    savePlayer($id, $player);

    return jsonResponse($response, [
        'completed' => $completed,
        'message' => $completed ? "Hoàn thành: {$completed}!" : 'Chưa hoàn thành.',
        'player' => $player->toArray(),
    ]);
});

// --- Combat ---
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

    // Save player state after combat
    savePlayer($playerId, $player);

    return jsonResponse($response, $result);
});

// --- Data ---
$app->get('/api/data/monsters', function (Request $request, Response $response) {
    return jsonResponse($response, ['monsters' => (new MonsterSystem())->getAll()]);
});

$app->get('/api/data/skills', function (Request $request, Response $response) {
    return jsonResponse($response, ['skills' => (new SkillSystem())->getAll()]);
});

$app->get('/api/data/items', function (Request $request, Response $response) {
    return jsonResponse($response, ['items' => (new ItemSystem())->getAll()]);
});

$app->get('/api/data/medicines', function (Request $request, Response $response) {
    $file = __DIR__ . '/../data/medicines.json';
    $medicines = json_decode(file_get_contents($file), true);
    return jsonResponse($response, ['medicines' => $medicines]);
});

$app->get('/api/data/crimes', function (Request $request, Response $response) {
    $file = __DIR__ . '/../data/crimes.json';
    $crimes = json_decode(file_get_contents($file), true);
    return jsonResponse($response, ['crimes' => $crimes]);
});

$app->get('/api/data/education', function (Request $request, Response $response) {
    $file = __DIR__ . '/../data/education.json';
    $courses = json_decode(file_get_contents($file), true);
    return jsonResponse($response, ['courses' => $courses]);
});

$app->post('/api/items/generate', function (Request $request, Response $response) {
    $body = $request->getParsedBody();
    $rarity = $body['rarity'] ?? 'common';
    $slot = $body['slot'] ?? null;
    $item = (new ItemSystem())->generateRandomItem($rarity, $slot);
    return jsonResponse($response, ['item' => $item->toArray()]);
});

$app->run();
