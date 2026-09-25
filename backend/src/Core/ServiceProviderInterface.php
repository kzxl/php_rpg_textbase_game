<?php

declare(strict_types=1);

namespace App\Core;

use DI\Container;
use Slim\App;

/**
 * Interface for application service providers.
 */
interface ServiceProviderInterface
{
    /**
     * Register services, bindings, or parameters into the DI container.
     */
    public function register(Container $container, array $config): void;

    /**
     * Bootstrap HTTP pipeline, routes, or event listeners on the Slim app.
     */
    public function boot(App $app, Container $container): void;
}
