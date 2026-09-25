<?php

declare(strict_types=1);

namespace App\Core;

use DI\Container;
use Slim\App;

/**
 * Main application bootstrapper.
 * Provides static access to the booted Slim 4 app, DI container, and Kernel.
 */
class AppBootstrap
{
    private static ?App $app = null;
    private static ?Container $container = null;

    public static function boot(string $basePath): App
    {
        if (self::$app !== null) {
            return self::$app;
        }

        $kernel = Kernel::create($basePath);
        self::$container = $kernel->getContainer();
        self::$app = $kernel->createHttpApp();

        return self::$app;
    }

    public static function getKernel(): ?KernelInterface
    {
        return Kernel::getInstance();
    }

    public static function getContainer(): ?Container
    {
        return self::$container;
    }

    public static function reset(): void
    {
        self::$app = null;
        self::$container = null;
        Kernel::reset();
    }
}
