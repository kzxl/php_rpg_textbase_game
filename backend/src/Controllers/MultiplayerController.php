<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Core\ResponseHelper;
use App\Services\PlayerStateService;
use App\Services\EscrowService;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Throwable;

/**
 * MultiplayerController: Endpoints for persistent player FSM, healing, bail, and escrow.
 */
class MultiplayerController
{
    private PlayerStateService $stateService;
    private EscrowService $escrowService;

    public function __construct(
        ?PlayerStateService $stateService = null,
        ?EscrowService $escrowService = null
    ) {
        $this->stateService = $stateService ?? new PlayerStateService();
        $this->escrowService = $escrowService ?? new EscrowService();
    }

    public function getState(Request $request, Response $response, array $args): Response
    {
        $id = $args['id'] ?? '';
        try {
            $state = $this->stateService->getState($id);
            return ResponseHelper::json($response, ['success' => true, 'state' => $state]);
        } catch (Throwable $e) {
            return ResponseHelper::json($response, ['error' => $e->getMessage()], 400);
        }
    }

    public function claimEscrow(Request $request, Response $response, array $args): Response
    {
        $id = $args['id'] ?? '';
        try {
            $result = $this->escrowService->claimEscrow($id);
            return ResponseHelper::json($response, $result);
        } catch (Throwable $e) {
            return ResponseHelper::json($response, ['error' => $e->getMessage()], 400);
        }
    }

    public function heal(Request $request, Response $response, array $args): Response
    {
        $id = $args['id'] ?? '';
        $body = (array)$request->getParsedBody();
        $pillId = (string)($body['pill_id'] ?? 'tieu_hoan_dan');

        try {
            $result = $this->stateService->heal($id, $pillId);
            return ResponseHelper::json($response, $result);
        } catch (Throwable $e) {
            return ResponseHelper::json($response, ['error' => $e->getMessage()], 400);
        }
    }

    public function bail(Request $request, Response $response, array $args): Response
    {
        $id = $args['id'] ?? '';
        try {
            $result = $this->stateService->bail($id);
            return ResponseHelper::json($response, $result);
        } catch (Throwable $e) {
            return ResponseHelper::json($response, ['error' => $e->getMessage()], 400);
        }
    }
}
