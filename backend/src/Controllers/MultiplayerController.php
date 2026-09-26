<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Core\Database;
use App\Core\ResponseHelper;
use App\Services\BazaarService;
use App\Services\EscrowService;
use App\Services\PlayerStateService;
use App\Services\PvPCombatService;
use App\Services\TradeService;
use PDO;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Throwable;

/**
 * MultiplayerController: Endpoints for persistent player FSM, healing, bail, escrow, PvP combat, Bazaar, and P2P Trading.
 */
class MultiplayerController
{
    private PlayerStateService $stateService;
    private EscrowService $escrowService;
    private PvPCombatService $pvpService;
    private BazaarService $bazaarService;
    private TradeService $tradeService;

    public function __construct(
        ?PlayerStateService $stateService = null,
        ?EscrowService $escrowService = null,
        ?PvPCombatService $pvpService = null,
        ?BazaarService $bazaarService = null,
        ?TradeService $tradeService = null
    ) {
        $this->stateService = $stateService ?? new PlayerStateService();
        $this->escrowService = $escrowService ?? new EscrowService();
        $this->pvpService = $pvpService ?? new PvPCombatService();
        $this->bazaarService = $bazaarService ?? new BazaarService();
        $this->tradeService = $tradeService ?? new TradeService();
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

    // ==========================================
    // BAZAAR (PHƯỜNG THỊ) ENDPOINTS
    // ==========================================

    public function bazaarBrowse(Request $request, Response $response): Response
    {
        try {
            $params = $request->getQueryParams();
            $result = $this->bazaarService->browse($params);
            return ResponseHelper::json($response, $result);
        } catch (Throwable $e) {
            return ResponseHelper::json($response, ['error' => $e->getMessage()], 400);
        }
    }

    public function bazaarList(Request $request, Response $response, array $args): Response
    {
        $sellerId = $args['id'] ?? '';
        $body = (array)$request->getParsedBody();
        $itemUid = (string)($body['item_uid'] ?? '');
        $unitPrice = (int)($body['unit_price'] ?? 0);
        $quantity = (int)($body['quantity'] ?? 1);

        try {
            $result = $this->bazaarService->list($sellerId, $itemUid, $unitPrice, $quantity);
            return ResponseHelper::json($response, $result);
        } catch (Throwable $e) {
            return ResponseHelper::json($response, ['error' => $e->getMessage()], 400);
        }
    }

    public function bazaarBuy(Request $request, Response $response, array $args): Response
    {
        $buyerId = $args['id'] ?? '';
        $body = (array)$request->getParsedBody();
        $listingId = (int)($body['listing_id'] ?? 0);
        $quantity = (int)($body['quantity'] ?? 1);
        $expectedUnitPrice = isset($body['expected_unit_price']) ? (int)$body['expected_unit_price'] : null;

        try {
            $result = $this->bazaarService->buy($buyerId, $listingId, $quantity, $expectedUnitPrice);
            return ResponseHelper::json($response, $result);
        } catch (Throwable $e) {
            return ResponseHelper::json($response, ['error' => $e->getMessage()], 400);
        }
    }

    public function bazaarCancel(Request $request, Response $response, array $args): Response
    {
        $sellerId = $args['id'] ?? '';
        $body = (array)$request->getParsedBody();
        $listingId = (int)($body['listing_id'] ?? 0);

        try {
            $result = $this->bazaarService->cancel($sellerId, $listingId);
            return ResponseHelper::json($response, $result);
        } catch (Throwable $e) {
            return ResponseHelper::json($response, ['error' => $e->getMessage()], 400);
        }
    }

    public function bazaarMyListings(Request $request, Response $response, array $args): Response
    {
        $sellerId = $args['id'] ?? '';
        try {
            $result = $this->bazaarService->getMyListings($sellerId);
            return ResponseHelper::json($response, $result);
        } catch (Throwable $e) {
            return ResponseHelper::json($response, ['error' => $e->getMessage()], 400);
        }
    }

    // ==========================================
    // P2P TWO-PHASE COMMIT TRADE ENDPOINTS
    // ==========================================

    public function tradeCreate(Request $request, Response $response, array $args): Response
    {
        $initiatorId = $args['id'] ?? '';
        $body = (array)$request->getParsedBody();
        $receiverId = (string)($body['receiver_id'] ?? $body['target_id'] ?? '');

        try {
            $result = $this->tradeService->createTrade($initiatorId, $receiverId);
            return ResponseHelper::json($response, $result);
        } catch (Throwable $e) {
            return ResponseHelper::json($response, ['error' => $e->getMessage()], 400);
        }
    }

    public function tradeUpdate(Request $request, Response $response, array $args): Response
    {
        $playerId = $args['id'] ?? '';
        $tradeId = $args['tradeId'] ?? '';
        $body = (array)$request->getParsedBody();
        $itemUids = (array)($body['item_uids'] ?? []);
        $gold = (int)($body['gold'] ?? 0);

        try {
            $result = $this->tradeService->updateOffer($tradeId, $playerId, $itemUids, $gold);
            return ResponseHelper::json($response, ['success' => true, 'trade' => $result]);
        } catch (Throwable $e) {
            return ResponseHelper::json($response, ['error' => $e->getMessage()], 400);
        }
    }

    public function tradeLock(Request $request, Response $response, array $args): Response
    {
        $playerId = $args['id'] ?? '';
        $tradeId = $args['tradeId'] ?? '';

        try {
            $result = $this->tradeService->lockOffer($tradeId, $playerId);
            return ResponseHelper::json($response, ['success' => true, 'trade' => $result]);
        } catch (Throwable $e) {
            return ResponseHelper::json($response, ['error' => $e->getMessage()], 400);
        }
    }

    public function tradeConfirm(Request $request, Response $response, array $args): Response
    {
        $playerId = $args['id'] ?? '';
        $tradeId = $args['tradeId'] ?? '';
        $body = (array)$request->getParsedBody();
        $expectedVersion = isset($body['expected_version']) ? (int)$body['expected_version'] : null;

        try {
            $result = $this->tradeService->confirmTrade($tradeId, $playerId, $expectedVersion);
            return ResponseHelper::json($response, $result);
        } catch (Throwable $e) {
            return ResponseHelper::json($response, ['error' => $e->getMessage()], 400);
        }
    }

    public function tradeCancel(Request $request, Response $response, array $args): Response
    {
        $playerId = $args['id'] ?? '';
        $tradeId = $args['tradeId'] ?? '';

        try {
            $result = $this->tradeService->cancelTrade($tradeId, $playerId);
            return ResponseHelper::json($response, $result);
        } catch (Throwable $e) {
            return ResponseHelper::json($response, ['error' => $e->getMessage()], 400);
        }
    }

    public function tradeGet(Request $request, Response $response, array $args): Response
    {
        $tradeId = $args['tradeId'] ?? '';
        try {
            $result = $this->tradeService->getTrade($tradeId);
            return ResponseHelper::json($response, ['success' => true, 'trade' => $result]);
        } catch (Throwable $e) {
            return ResponseHelper::json($response, ['error' => $e->getMessage()], 404);
        }
    }
}
