<?php

declare(strict_types=1);

namespace App\Services;

use App\Core\Database;
use App\Models\Player;
use InvalidArgumentException;
use PDO;
use RuntimeException;
use Throwable;

/**
 * TradeService — Concurrency-Safe P2P Two-Phase Commit (2PC) Trading Subsystem.
 *
 * Implements Algorithm 3 from docs/MULTIPLAYER_ARCHITECTURE_SPEC.md:
 * - Deterministic Global DAG (Tier 2 trade_offers -> Tier 3 wallets -> Tier 4 items -> Tier 5 ledger).
 * - State machine: 'negotiating' -> 'initiator_locked' / 'receiver_locked' -> 'both_locked' -> 'completed'.
 * - 2-Phase atomic commit with anti-front-running item verification and net bag delta capacity checks.
 * - Zero inventory duplication or double-spending guarantees.
 */
class TradeService
{
    private PDO $pdo;
    private PlayerStateService $stateService;

    public function __construct(?PDO $pdo = null, ?PlayerStateService $stateService = null)
    {
        $this->pdo = $pdo ?? Database::pdo();
        $this->stateService = $stateService ?? new PlayerStateService($this->pdo);
    }

    public static function generateUuid(): string
    {
        $data = random_bytes(16);
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80);
        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
    }

    /**
     * Create a new P2P trade session between two cultivators.
     */
    public function createTrade(string $initiatorId, string $receiverId): array
    {
        if ($initiatorId === $receiverId) {
            throw new InvalidArgumentException("Không thể tự giao dịch với chính mình!");
        }

        // Validate neither party is locked in hospital, jail, or traveling
        $this->stateService->assertCanAct($initiatorId, 'giao dịch');
        $this->stateService->assertCanAct($receiverId, 'giao dịch');

        $tradeId = self::generateUuid();
        $expiresAt = time() + 600; // 10-minute lease

        $stmt = $this->pdo->prepare("
            INSERT INTO trade_offers (
                trade_id, initiator_id, receiver_id, status, initiator_items, receiver_items,
                initiator_gold, receiver_gold, initiator_confirmed, receiver_confirmed, version, expires_at
            ) VALUES (?, ?, ?, 'negotiating', '[]', '[]', 0, 0, 0, 0, 1, ?)
        ");
        $stmt->execute([$tradeId, $initiatorId, $receiverId, $expiresAt]);

        if (function_exists('addPlayerEvent')) {
            $init = loadPlayer($initiatorId);
            addPlayerEvent(
                $this->pdo,
                $receiverId,
                'trade_request',
                "🤝 {$init->name} đã gửi lời mời giao dịch P2P tới bạn! (Phiên: {$tradeId})"
            );
        }

        return [
            'success' => true,
            'trade_id' => $tradeId,
            'status' => 'negotiating',
            'initiator_id' => $initiatorId,
            'receiver_id' => $receiverId,
            'expires_at' => $expiresAt,
            'message' => "Đã khởi tạo phiên giao dịch trực tiếp. Hãy đặt lễ vật thương lượng.",
        ];
    }

    /**
     * Update offered items and currency for a party.
     * Automatically invalidates locks and confirmations back to 'negotiating'.
     */
    public function updateOffer(string $tradeId, string $callingPlayerId, array $itemUids, int $gold): array
    {
        if ($gold < 0) {
            throw new InvalidArgumentException("Số lượng Linh Thạch đề xuất không hợp lệ!");
        }

        $this->pdo->beginTransaction();
        try {
            $stmt = $this->pdo->prepare("SELECT * FROM trade_offers WHERE trade_id = ? FOR UPDATE");
            $stmt->execute([$tradeId]);
            $trade = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$trade) {
                throw new RuntimeException("Phiên giao dịch không tồn tại!");
            }
            if (in_array($trade['status'], ['completed', 'cancelled', 'expired'], true)) {
                throw new RuntimeException("Phiên giao dịch đã kết thúc hoặc bị hủy!");
            }

            $isInitiator = ($callingPlayerId === $trade['initiator_id']);
            $isReceiver = ($callingPlayerId === $trade['receiver_id']);
            if (!$isInitiator && !$isReceiver) {
                throw new RuntimeException("Bạn không tham gia vào phiên giao dịch này!");
            }

            // Verify calling player has sufficient gold
            $goldStmt = $this->pdo->prepare("SELECT gold FROM players WHERE id = ? FOR UPDATE");
            $goldStmt->execute([$callingPlayerId]);
            $currentGold = (int)$goldStmt->fetchColumn();
            if ($currentGold < $gold) {
                throw new RuntimeException("Số Linh Thạch trong túi không đủ ({$currentGold} < {$gold})!");
            }

            // Verify item ownership and availability
            if (!empty($itemUids)) {
                $placeholders = implode(',', array_fill(0, count($itemUids), '?'));
                $itemStmt = $this->pdo->prepare("
                    SELECT id, item_uid, equipped FROM player_items 
                    WHERE player_id = ? AND item_uid IN ({$placeholders})
                    FOR UPDATE
                ");
                $itemStmt->execute(array_merge([$callingPlayerId], $itemUids));
                $ownedItems = $itemStmt->fetchAll(PDO::FETCH_ASSOC);

                if (count($ownedItems) !== count($itemUids)) {
                    throw new RuntimeException("Một số vật phẩm đề xuất không còn trong hành trang!");
                }
                foreach ($ownedItems as $oi) {
                    if ((int)$oi['equipped'] === 1) {
                        throw new RuntimeException("Không thể giao dịch trang bị đang mặc trên người!");
                    }
                }
            }

            // Reset locks and confirmations on offer change
            if ($isInitiator) {
                $up = $this->pdo->prepare("
                    UPDATE trade_offers 
                    SET initiator_items = ?,
                        initiator_gold = ?,
                        status = 'negotiating',
                        initiator_confirmed = 0,
                        receiver_confirmed = 0,
                        version = version + 1
                    WHERE trade_id = ?
                ");
                $up->execute([json_encode($itemUids), $gold, $tradeId]);
            } else {
                $up = $this->pdo->prepare("
                    UPDATE trade_offers 
                    SET receiver_items = ?,
                        receiver_gold = ?,
                        status = 'negotiating',
                        initiator_confirmed = 0,
                        receiver_confirmed = 0,
                        version = version + 1
                    WHERE trade_id = ?
                ");
                $up->execute([json_encode($itemUids), $gold, $tradeId]);
            }

            $this->pdo->commit();

            return $this->getTrade($tradeId);
        } catch (Throwable $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }

    /**
     * Lock offer for one party. Transition to 'both_locked' when mutual lock is achieved.
     */
    public function lockOffer(string $tradeId, string $callingPlayerId): array
    {
        $this->pdo->beginTransaction();
        try {
            $stmt = $this->pdo->prepare("SELECT * FROM trade_offers WHERE trade_id = ? FOR UPDATE");
            $stmt->execute([$tradeId]);
            $trade = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$trade || in_array($trade['status'], ['completed', 'cancelled', 'expired'], true)) {
                throw new RuntimeException("Phiên giao dịch không thể khóa!");
            }

            $isInitiator = ($callingPlayerId === $trade['initiator_id']);
            $isReceiver = ($callingPlayerId === $trade['receiver_id']);
            if (!$isInitiator && !$isReceiver) {
                throw new RuntimeException("Không có quyền khóa phiên giao dịch này!");
            }

            $currentStatus = $trade['status'];
            $newStatus = $currentStatus;

            if ($isInitiator) {
                if ($currentStatus === 'receiver_locked') {
                    $newStatus = 'both_locked';
                } elseif ($currentStatus === 'negotiating') {
                    $newStatus = 'initiator_locked';
                }
            } else {
                if ($currentStatus === 'initiator_locked') {
                    $newStatus = 'both_locked';
                } elseif ($currentStatus === 'negotiating') {
                    $newStatus = 'receiver_locked';
                }
            }

            $up = $this->pdo->prepare("UPDATE trade_offers SET status = ?, version = version + 1 WHERE trade_id = ?");
            $up->execute([$newStatus, $tradeId]);

            $this->pdo->commit();

            return $this->getTrade($tradeId);
        } catch (Throwable $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }

    /**
     * Two-Phase Commit Handshake Execution (Algorithm 3).
     */
    public function confirmTrade(string $tradeId, string $callingPlayerId, ?int $expectedVersion = null): array
    {
        $this->pdo->beginTransaction();
        try {
            // 1. Lock Trade Offer Row by Primary Key (Tier 2 in Global DAG)
            $stmt = $this->pdo->prepare("SELECT * FROM trade_offers WHERE trade_id = ? FOR UPDATE");
            $stmt->execute([$tradeId]);
            $trade = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$trade || $trade['status'] !== 'both_locked') {
                throw new RuntimeException("Giao dịch phải được cả hai bên khóa lễ vật trước khi xác nhận!");
            }

            if ($expectedVersion !== null && (int)$trade['version'] !== $expectedVersion) {
                throw new RuntimeException("Lễ vật giao dịch đã bị thay đổi! Vui lòng kiểm tra lại.");
            }

            $isInitiator = ($callingPlayerId === $trade['initiator_id']);
            $isReceiver = ($callingPlayerId === $trade['receiver_id']);
            if (!$isInitiator && !$isReceiver) {
                throw new RuntimeException("Không có quyền xác nhận giao dịch!");
            }

            $initConfirmed = (int)$trade['initiator_confirmed'];
            $recvConfirmed = (int)$trade['receiver_confirmed'];

            if ($isInitiator) {
                $initConfirmed = 1;
            } else {
                $recvConfirmed = 1;
            }

            // 2. If only one party confirmed, persist and await partner
            if ($initConfirmed !== 1 || $recvConfirmed !== 1) {
                $up = $this->pdo->prepare("
                    UPDATE trade_offers 
                    SET initiator_confirmed = ?, receiver_confirmed = ?, version = version + 1
                    WHERE trade_id = ?
                ");
                $up->execute([$initConfirmed, $recvConfirmed, $tradeId]);
                $this->pdo->commit();

                return [
                    'success' => true,
                    'status' => 'pending_partner_confirmation',
                    'message' => "Bạn đã xác nhận giao dịch. Đang chờ đối phương xác nhận...",
                ];
            }

            // 3. BOTH CONFIRMED: Lock Wallets in Deterministic Lexicographical Order (Tier 3 in Global DAG)
            $initId = $trade['initiator_id'];
            $recvId = $trade['receiver_id'];

            $sortedIds = [$initId, $recvId];
            sort($sortedIds, SORT_STRING);

            $stmtWallets = $this->pdo->prepare("
                SELECT id, gold FROM players WHERE id IN (?, ?) ORDER BY id ASC FOR UPDATE
            ");
            $stmtWallets->execute($sortedIds);
            $wallets = [];
            while ($w = $stmtWallets->fetch(PDO::FETCH_ASSOC)) {
                $wallets[$w['id']] = (int)$w['gold'];
            }

            $initGold = (int)$trade['initiator_gold'];
            $recvGold = (int)$trade['receiver_gold'];

            if ($wallets[$initId] < $initGold) {
                throw new RuntimeException("Người khởi tạo không đủ Linh Thạch để hoàn tất!");
            }
            if ($wallets[$recvId] < $recvGold) {
                throw new RuntimeException("Đối phương không đủ Linh Thạch để hoàn tất!");
            }

            // 4. Lock Traded Item Instances in Deterministic UID Order (Tier 4 in Global DAG)
            $initItems = json_decode($trade['initiator_items'] ?? '[]', true) ?: [];
            $recvItems = json_decode($trade['receiver_items'] ?? '[]', true) ?: [];
            $allUids = array_unique(array_merge($initItems, $recvItems));
            sort($allUids, SORT_STRING);

            if (!empty($allUids)) {
                $placeholders = implode(',', array_fill(0, count($allUids), '?'));
                $stmtItems = $this->pdo->prepare("
                    SELECT id, player_id, item_uid, equipped FROM player_items 
                    WHERE item_uid IN ({$placeholders})
                    ORDER BY item_uid ASC
                    FOR UPDATE
                ");
                $stmtItems->execute($allUids);
                $lockedItems = $stmtItems->fetchAll(PDO::FETCH_ASSOC);

                $itemsByUid = [];
                foreach ($lockedItems as $li) {
                    $itemsByUid[$li['item_uid']] = $li;
                }

                // Verify exact ownership and unequipped condition
                foreach ($initItems as $uid) {
                    if (!isset($itemsByUid[$uid]) || $itemsByUid[$uid]['player_id'] !== $initId || (int)$itemsByUid[$uid]['equipped'] === 1) {
                        throw new RuntimeException("Vật phẩm của người khởi tạo không hợp lệ hoặc đã bị di chuyển!");
                    }
                }
                foreach ($recvItems as $uid) {
                    if (!isset($itemsByUid[$uid]) || $itemsByUid[$uid]['player_id'] !== $recvId || (int)$itemsByUid[$uid]['equipped'] === 1) {
                        throw new RuntimeException("Vật phẩm của đối phương không hợp lệ hoặc đã bị di chuyển!");
                    }
                }
            }

            // 5. Verify Net Bag Capacity Deltas
            $initDelta = count($recvItems) - count($initItems);
            $recvDelta = count($initItems) - count($recvItems);

            if ($initDelta > 0) {
                $c1 = (int)$this->pdo->query("SELECT COUNT(*) FROM player_items WHERE player_id = '{$initId}' AND equipped = 0")->fetchColumn();
                if ($c1 + $initDelta > 100) {
                    throw new RuntimeException("Hành trang của người khởi tạo không đủ chỗ chứa!");
                }
            }
            if ($recvDelta > 0) {
                $c2 = (int)$this->pdo->query("SELECT COUNT(*) FROM player_items WHERE player_id = '{$recvId}' AND equipped = 0")->fetchColumn();
                if ($c2 + $recvDelta > 100) {
                    throw new RuntimeException("Hành trang của đối phương không đủ chỗ chứa!");
                }
            }

            // 6. Execute Currency Swaps & Double-Entry Ledger (Tier 5)
            if ($initGold > 0) {
                $this->pdo->prepare("UPDATE players SET gold = gold - ? WHERE id = ?")->execute([$initGold, $initId]);
                $this->pdo->prepare("UPDATE players SET gold = gold + ? WHERE id = ?")->execute([$initGold, $recvId]);

                $audit = $this->pdo->prepare("
                    INSERT INTO wallet_audit_ledger (source_id, dest_id, gross_amount, tax_amount, net_amount, reference_type, reference_id)
                    VALUES (?, ?, ?, 0, ?, 'trade_p2p', ?)
                ");
                $audit->execute([$initId, $recvId, $initGold, $initGold, $tradeId]);
            }
            if ($recvGold > 0) {
                $this->pdo->prepare("UPDATE players SET gold = gold - ? WHERE id = ?")->execute([$recvGold, $recvId]);
                $this->pdo->prepare("UPDATE players SET gold = gold + ? WHERE id = ?")->execute([$recvGold, $initId]);

                $audit = $this->pdo->prepare("
                    INSERT INTO wallet_audit_ledger (source_id, dest_id, gross_amount, tax_amount, net_amount, reference_type, reference_id)
                    VALUES (?, ?, ?, 0, ?, 'trade_p2p', ?)
                ");
                $audit->execute([$recvId, $initId, $recvGold, $recvGold, $tradeId]);
            }

            // 7. Execute Item Ownership Swaps (Tier 4 in Global DAG)
            if (!empty($initItems)) {
                $ph = implode(',', array_fill(0, count($initItems), '?'));
                $this->pdo->prepare("UPDATE player_items SET player_id = ? WHERE item_uid IN ({$ph})")
                    ->execute(array_merge([$recvId], $initItems));
            }
            if (!empty($recvItems)) {
                $ph = implode(',', array_fill(0, count($recvItems), '?'));
                $this->pdo->prepare("UPDATE player_items SET player_id = ? WHERE item_uid IN ({$ph})")
                    ->execute(array_merge([$initId], $recvItems));
            }

            // 8. Finalize Trade Offer
            $this->pdo->prepare("
                UPDATE trade_offers 
                SET status = 'completed', initiator_confirmed = 1, receiver_confirmed = 1, version = version + 1
                WHERE trade_id = ?
            ")->execute([$tradeId]);

            $this->pdo->commit();

            return [
                'success' => true,
                'status' => 'completed',
                'message' => "Giao dịch P2P hoàn tất thành công! Vật phẩm và Linh Thạch đã được trao đổi an toàn.",
            ];
        } catch (Throwable $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }

    /**
     * Cancel an active trade.
     */
    public function cancelTrade(string $tradeId, string $callingPlayerId): array
    {
        $this->pdo->beginTransaction();
        try {
            $stmt = $this->pdo->prepare("SELECT * FROM trade_offers WHERE trade_id = ? FOR UPDATE");
            $stmt->execute([$tradeId]);
            $trade = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$trade || in_array($trade['status'], ['completed', 'cancelled', 'expired'], true)) {
                throw new RuntimeException("Phiên giao dịch không thể hủy!");
            }

            if ($callingPlayerId !== $trade['initiator_id'] && $callingPlayerId !== $trade['receiver_id']) {
                throw new RuntimeException("Không có quyền hủy phiên giao dịch này!");
            }

            $this->pdo->prepare("UPDATE trade_offers SET status = 'cancelled', version = version + 1 WHERE trade_id = ?")
                ->execute([$tradeId]);

            $this->pdo->commit();

            return [
                'success' => true,
                'status' => 'cancelled',
                'message' => "Đã hủy phiên giao dịch.",
            ];
        } catch (Throwable $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }

    /**
     * Get detailed trade state including full item descriptors.
     */
    public function getTrade(string $tradeId): array
    {
        $stmt = $this->pdo->prepare("
            SELECT t.*, p1.name as initiator_name, p2.name as receiver_name
            FROM trade_offers t
            JOIN players p1 ON p1.id = t.initiator_id
            JOIN players p2 ON p2.id = t.receiver_id
            WHERE t.trade_id = ?
        ");
        $stmt->execute([$tradeId]);
        $trade = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$trade) {
            throw new RuntimeException("Phiên giao dịch không tồn tại!");
        }

        $initItems = json_decode($trade['initiator_items'] ?? '[]', true) ?: [];
        $recvItems = json_decode($trade['receiver_items'] ?? '[]', true) ?: [];

        $allUids = array_unique(array_merge($initItems, $recvItems));
        $itemCards = [];

        if (!empty($allUids)) {
            $ph = implode(',', array_fill(0, count($allUids), '?'));
            $itemStmt = $this->pdo->prepare("SELECT * FROM player_items WHERE item_uid IN ({$ph})");
            $itemStmt->execute($allUids);
            while ($row = $itemStmt->fetch(PDO::FETCH_ASSOC)) {
                $itemCards[$row['item_uid']] = [
                    'id' => $row['item_uid'],
                    'name' => $row['name'],
                    'base_type' => $row['base_type'],
                    'rarity' => $row['rarity'],
                    'slot' => $row['slot'],
                    'quantity' => (int)$row['quantity'],
                    'affixes' => json_decode($row['affixes'] ?? '[]', true) ?: [],
                ];
            }
        }

        return [
            'trade_id' => $trade['trade_id'],
            'initiator_id' => $trade['initiator_id'],
            'initiator_name' => $trade['initiator_name'],
            'receiver_id' => $trade['receiver_id'],
            'receiver_name' => $trade['receiver_name'],
            'status' => $trade['status'],
            'initiator_gold' => (int)$trade['initiator_gold'],
            'receiver_gold' => (int)$trade['receiver_gold'],
            'initiator_items' => array_values(array_filter(array_map(fn($uid) => $itemCards[$uid] ?? null, $initItems))),
            'receiver_items' => array_values(array_filter(array_map(fn($uid) => $itemCards[$uid] ?? null, $recvItems))),
            'initiator_confirmed' => (bool)$trade['initiator_confirmed'],
            'receiver_confirmed' => (bool)$trade['receiver_confirmed'],
            'version' => (int)$trade['version'],
            'expires_at' => (int)$trade['expires_at'],
        ];
    }
}
