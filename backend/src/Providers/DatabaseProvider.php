<?php

declare(strict_types=1);

namespace App\Providers;

use App\Core\Database;
use App\Core\ServiceProviderInterface;
use DI\Container;
use LiteORM\EntityManager;
use PDO;
use Slim\App;

/**
 * Service provider for Database connection (PDO) and LiteORM EntityManager.
 */
class DatabaseProvider implements ServiceProviderInterface
{
    public function register(Container $container, array $config): void
    {
        $dbConfig = $config['database'] ?? [];
        $driver = $dbConfig['default'] ?? 'mysql';
        $connection = $dbConfig['connections'][$driver] ?? [];

        $host = $connection['host'] ?? '127.0.0.1';
        $port = $connection['port'] ?? '3306';
        $database = $connection['database'] ?? 'rpg_engine';
        $username = $connection['username'] ?? 'root';
        $password = $connection['password'] ?? '';
        $charset = $connection['charset'] ?? 'utf8mb4';

        $dsn = "mysql:host={$host};port={$port};dbname={$database};charset={$charset}";
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];

        $pdo = new PDO($dsn, $username, $password, $options);

        // Register in DI Container
        $container->set(PDO::class, $pdo);
        $container->set('pdo', $pdo);

        // Initialize LiteORM if available
        if (class_exists(EntityManager::class)) {
            $em = new EntityManager($dsn, $username, $password, $options);
            $container->set(EntityManager::class, $em);
            $container->set('em', $em);
        }

        // Bridge to static Database accessor for backward compatibility
        if (class_exists(Database::class)) {
            Database::setInstance($pdo);
        }
    }

    public function boot(App $app, Container $container): void
    {
        // No-op for database on HTTP boot
    }
}
