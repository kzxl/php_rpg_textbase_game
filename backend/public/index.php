<?php

declare(strict_types=1);

/**
 * RPG Engine – LitePlatform Sovereign Application Entry Point.
 * High-performance, zero-bloat modular architecture powered by Kernel & PHP-DI.
 */

require __DIR__ . '/../vendor/autoload.php';

use App\Core\AppBootstrap;

$app = AppBootstrap::boot(dirname(__DIR__));
$app->run();
