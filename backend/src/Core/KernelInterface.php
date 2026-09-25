<?php

declare(strict_types=1);

namespace App\Core;

use DI\Container;
use Slim\App;

/**
 * Interface for Application Kernel.
 */
interface KernelInterface
{
    public function getBasePath(): string;
    public function getConfig(): array;
    public function getContainer(): Container;
    public function boot(): self;
    public function createHttpApp(): App;
}
