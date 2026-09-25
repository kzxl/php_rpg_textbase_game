<?php

declare(strict_types=1);

use App\Core\AppBootstrap;
use App\Core\ResponseHelper;
use App\Models\Player;
use App\Services\PlayerService;
use Psr\Http\Message\ResponseInterface as Response;

if (!function_exists('jsonResponse')) {
    function jsonResponse(Response $response, mixed $data, int $status = 200): Response
    {
        return ResponseHelper::json($response, $data, $status);
    }
}

if (!function_exists('loadPlayer')) {
    function loadPlayer(string $id): ?Player
    {
        /** @var PlayerService $service */
        $service = AppBootstrap::getContainer()?->get(PlayerService::class) ?? new PlayerService();
        return $service->load($id);
    }
}

if (!function_exists('savePlayer')) {
    function savePlayer(string $id, Player $player): void
    {
        /** @var PlayerService $service */
        $service = AppBootstrap::getContainer()?->get(PlayerService::class) ?? new PlayerService();
        $service->save($id, $player);
    }
}
