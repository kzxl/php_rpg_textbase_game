<?php

declare(strict_types=1);

namespace App\Providers;

use App\Core\ResponseHelper;
use App\Core\ServiceProviderInterface;
use DI\Container;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;

/**
 * Service provider auto-discovering and mounting all modular feature routes.
 */
class FeatureProvider implements ServiceProviderInterface
{
    public function register(Container $container, array $config): void
    {
        // Feature registrations if needed
    }

    public function boot(App $app, Container $container): void
    {
        // Root health check endpoint
        $app->get('/', function (Request $request, Response $response) {
            return ResponseHelper::json($response, [
                'name' => 'Nghịch Thiên Ký – RPG Engine',
                'version' => '2.0.0',
                'architecture' => 'LitePlatform Sovereign Architecture',
                'status' => 'healthy',
            ]);
        });

        // Auto-discover and register all feature routes
        $featureDir = __DIR__ . '/../Features';
        foreach (glob("{$featureDir}/*/routes.php") as $routeFile) {
            $registerRoutes = require $routeFile;
            if (is_callable($registerRoutes)) {
                $registerRoutes($app, $container);
            }
        }
    }
}
