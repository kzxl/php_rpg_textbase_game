<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Core\ResponseHelper;
use App\Services\PlayerStateService;
use App\Services\EscrowService;
use App\Services\PvPCombatService;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Throwable;

/**
 * MultiplayerController: Endpoints for persistent player FSM, healing, bail, escrow, and PvP combat.
 */
class MultiplayerController
{
    private PlayerStateService $stateService;
    private EscrowService $escrowService;
    private PvPCombatService $pvpService;

    public function __construct(
        ?PlayerStateService $stateService = null,
        ?EscrowService $escrowService = null,
        ?PvPCombatService $pvpService = null
    ) {
        $this->stateService = $stateService ?? new PlayerStateService();
        $this->escrowService = $escrowService ?? new EscrowService();
        $this->pvpService = $pvpService ?? new PvPCombatService();
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

    public function attack(Request $request, Response $response, array $args): Response
    {
        $id = $args['id'] ?? '';
        $body = (array)$request->getParsedBody();
        $targetId = (string)($body['target_id'] ?? $body['victimId'] ?? '');

        if (!$targetId) {
            return ResponseHelper::json($response, ['error' => 'Vui lòng chọn mục tiêu tấn công!'], 400);
        }

        try {
            $result = $this->pvpService->initiateCombat($id, $targetId);
            return ResponseHelper::json($response, $result);
        } catch (Throwable $e) {
            return ResponseHelper::json($response, ['error' => $e->getMessage()], 400);
        }
    }

    public function resolveAction(Request $request, Response $response, array $args): Response
    {
        $id = $args['id'] ?? '';
        $body = (array)$request->getParsedBody();
        $sessionId = (string)($body['session_id'] ?? '');
        $action = (string)($body['action'] ?? '');

        if (!$sessionId || !$action) {
            return ResponseHelper::json($response, ['error' => 'Thiếu session_id hoặc action!'], 400);
        }

        try {
            $result = $this->pvpService->resolveAction($sessionId, $id, $action);
            return ResponseHelper::json($response, $result);
        } catch (Throwable $e) {
            return ResponseHelper::json($response, ['error' => $e->getMessage()], 400);
        }
    }

    public function getSession(Request $request, Response $response, array $args): Response
    {
        $sessionId = $args['sessionId'] ?? '';
        $pdo = Database::pdo();

        $stmt = $pdo->prepare("SELECT * FROM pvp_combat_sessions WHERE session_id = ?");
        $stmt->execute([$sessionId]);
        $session = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$session) {
            return ResponseHelper::json($response, ['error' => 'Không tìm thấy phiên chiến đấu!'], 404);
        }

        $logStmt = $pdo->prepare("SELECT turn_number, attacker_hp, defender_hp, action_details FROM pvp_combat_logs WHERE session_id = ? ORDER BY turn_number ASC");
        $logStmt->execute([$sessionId]);
        $logs = $logStmt->fetchAll(PDO::FETCH_ASSOC);

        return ResponseHelper::json($response, [
            'success' => true,
            'session' => $session,
            'logs' => array_map(function ($l) {
                $details = json_decode($l['action_details'] ?? '{}', true) ?: [];
                return [
                    'turn' => (int)$l['turn_number'],
                    'attacker_hp' => (int)$l['attacker_hp'],
                    'defender_hp' => (int)$l['defender_hp'],
                    'text' => $details['text'] ?? '',
                ];
            }, $logs),
        ]);
    }
}
