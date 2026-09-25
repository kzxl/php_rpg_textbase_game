<?php

declare(strict_types=1);

namespace App\Providers;

use App\Core\ResponseHelper;
use App\Core\ServiceProviderInterface;
use App\Models\Player;
use App\Services\PlayerService;
use DI\Container;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;

/**
 * Service provider for HTTP API middleware, CORS, error handling, and helpers.
 */
class ApiProvider implements ServiceProviderInterface
{
    public function register(Container $container, array $config): void
    {
        $container->set(PlayerService::class, new PlayerService());
    }

    public function boot(App $app, Container $container): void
    {
        // 1. Core Slim Middlewares
        $app->addBodyParsingMiddleware();
        $app->addRoutingMiddleware();

        // 2. CORS Middleware
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

        // 3. Error Handling Middleware
        $app->addErrorMiddleware(true, true, true);

        // 4. Pre-flight OPTIONS route
        $app->options('/{routes:.+}', function (Request $request, Response $response) {
            return $response;
        });

        // 5. Global compatibility functions for existing feature closures
        require_once __DIR__ . '/../Core/helpers.php';
    }
}
