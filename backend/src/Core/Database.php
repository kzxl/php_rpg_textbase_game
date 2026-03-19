<?php

namespace App\Core;

/**
 * PDO Database singleton.
 * Reads config from .env file in backend root.
 */
class Database
{
    private static ?\PDO $instance = null;

    public static function connect(): \PDO
    {
        if (self::$instance !== null) {
            return self::$instance;
        }

        $envFile = __DIR__ . '/../../.env';
        $config = self::loadEnv($envFile);

        $dsn = sprintf(
            'mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4',
            $config['DB_HOST'] ?? '127.0.0.1',
            $config['DB_PORT'] ?? '3306',
            $config['DB_NAME'] ?? 'rpg_engine'
        );

        self::$instance = new \PDO($dsn, $config['DB_USER'] ?? 'root', $config['DB_PASS'] ?? '', [
            \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
            \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
            \PDO::ATTR_EMULATE_PREPARES => false,
        ]);

        return self::$instance;
    }

    /**
     * Simple .env parser.
     */
    private static function loadEnv(string $path): array
    {
        if (!file_exists($path)) return [];
        $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        $config = [];
        foreach ($lines as $line) {
            $line = trim($line);
            if ($line === '' || $line[0] === '#') continue;
            if (str_contains($line, '=')) {
                [$key, $value] = explode('=', $line, 2);
                $config[trim($key)] = trim($value);
            }
        }
        return $config;
    }

    /**
     * Shorthand: get PDO instance.
     */
    public static function pdo(): \PDO
    {
        return self::connect();
    }
}
