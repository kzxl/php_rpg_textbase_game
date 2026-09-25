<?php

declare(strict_types=1);

namespace App\Core;

use DI\Bridge\Slim\Bridge as SlimBridge;
use DI\Container;
use DI\ContainerBuilder;
use Slim\App;
use Slim\Factory\AppFactory;

/**
 * Sovereign Application Kernel.
 * Manages Dependency Injection Container, Configuration, and Service Providers.
 */
class Kernel implements KernelInterface
{
    private static ?self $instance = null;

    private readonly Container $container;
    private array $config = [];
    /** @var list<ServiceProviderInterface> */
    private array $providers = [];
    private bool $isBooted = false;

    public function __construct(
        private readonly string $basePath
    ) {
        // 1. Load environment variables
        self::loadEnv($this->basePath . '/.env');

        // 2. Load configurations
        $appConfig = file_exists($this->basePath . '/config/app.php') ? require $this->basePath . '/config/app.php' : [];
        $dbConfig = file_exists($this->basePath . '/config/database.php') ? require $this->basePath . '/config/database.php' : [];
        $this->config = array_merge($appConfig, [
            'database' => $dbConfig,
            'base_path' => $this->basePath,
        ]);

        // 3. Initialize PHP-DI Container
        $builder = new ContainerBuilder();
        $this->container = $builder->build();

        $this->container->set('config', $this->config);
        $this->container->set(KernelInterface::class, $this);
        $this->container->set(self::class, $this);

        self::$instance = $this;
    }

    public static function create(string $basePath): self
    {
        if (self::$instance !== null && self::$instance->getBasePath() === $basePath) {
            return self::$instance;
        }

        return new self($basePath);
    }

    public static function getInstance(): ?self
    {
        return self::$instance;
    }

    public static function reset(): void
    {
        self::$instance = null;
    }

    public function getBasePath(): string
    {
        return $this->basePath;
    }

    public function getConfig(): array
    {
        return $this->config;
    }

    public function getContainer(): Container
    {
        return $this->container;
    }

    public function isBooted(): bool
    {
        return $this->isBooted;
    }

    public function boot(): self
    {
        if ($this->isBooted) {
            return $this;
        }

        // 1. Register configured Service Providers into Container
        foreach ($this->config['providers'] ?? [] as $providerClass) {
            if (class_exists($providerClass) && is_subclass_of($providerClass, ServiceProviderInterface::class)) {
                /** @var ServiceProviderInterface $provider */
                $provider = new $providerClass();
                $provider->register($this->container, $this->config);
                $this->providers[] = $provider;
            }
        }

        $this->isBooted = true;
        return $this;
    }

    public function createHttpApp(): App
    {
        $this->boot();

        // Create Slim App with PHP-DI container bridge
        AppFactory::setContainer($this->container);
        $app = AppFactory::create();
        $this->container->set(App::class, $app);

        // Boot providers on the Slim App
        foreach ($this->providers as $provider) {
            $provider->boot($app, $this->container);
        }

        return $app;
    }

    private static function loadEnv(string $path): void
    {
        if (!file_exists($path)) {
            return;
        }

        $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            $line = trim($line);
            if ($line === '' || str_starts_with($line, '#')) {
                continue;
            }
            if (str_contains($line, '=')) {
                [$key, $value] = explode('=', $line, 2);
                $key = trim($key);
                $value = trim($value);
                $_ENV[$key] = $value;
                putenv("{$key}={$value}");
            }
        }
    }
}
