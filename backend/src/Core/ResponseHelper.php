<?php

declare(strict_types=1);

namespace App\Core;

use LiteApi\Http\ApiResponse;
use Psr\Http\Message\ResponseInterface as Response;

/**
 * Standardized Response Helper bridging Slim 4 and LiteApi.
 */
class ResponseHelper
{
    public static function json(Response $response, mixed $data, int $status = 200): Response
    {
        return ApiResponse::json($response, $data, $status);
    }
}
