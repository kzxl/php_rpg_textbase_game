<?php

declare(strict_types=1);

return [
    'name' => 'Nghịch Thiên Ký – RPG Engine',
    'version' => '2.0.0',
    'env' => $_ENV['APP_ENV'] ?? 'development',
    'debug' => (bool)($_ENV['APP_DEBUG'] ?? true),
    'providers' => [
        \App\Providers\DatabaseProvider::class,
        \App\Providers\ApiProvider::class,
        \App\Providers\FeatureProvider::class,
    ],
];
