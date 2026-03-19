<?php

// RPG Engine – Slim 4 Entry Point (Feature-Based Architecture)
// Run: php -S localhost:8080 -t public
// Routes are auto-loaded from src/Features/[Feature]/routes.php

require __DIR__ . '/../vendor/autoload.php';

use Slim\Factory\AppFactory;
use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Models\Player;
use App\Core\PlayerRepository;

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

// MySQL-based player storage

function savePlayer(string $id, Player $player): void
{
    PlayerRepository::save($id, $player);
    PlayerRepository::saveItems($id, $player);
}

function loadPlayer(string $id): ?Player
{
    $player = PlayerRepository::load($id);
    if (!$player) return null;
    // Auto-apply meditation HP regen
    $healed = $player->applyMeditation();
    if ($healed > 0) {
        savePlayer($id, $player);
    }
    return $player;
}

// ===== FEATURE REGISTRY =====
// Auto-discover and register all feature routes
// Each feature folder has a routes.php that returns a closure accepting $app

$app->get('/', function (Request $request, Response $response) {
    return jsonResponse($response, [
        'name' => 'Thiên Đạo Bị Lỗi – RPG Engine',
        'version' => '2.0.0',
        'architecture' => 'feature-based',
    ]);
});

$featureDir = __DIR__ . '/../src/Features';
foreach (glob("{$featureDir}/*/routes.php") as $routeFile) {
    $registerRoutes = require $routeFile;
    if (is_callable($registerRoutes)) {
        $registerRoutes($app);
    }
}

$app->run();
