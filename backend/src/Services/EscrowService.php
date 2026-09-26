<?php

declare(strict_types=1);

namespace App\Services;

use App\Core\Database;
use PDO;
use RuntimeException;

/**
 * EscrowService: Implements Merchant Escrow Mailbox (Hộp Thư Thương Hội)
 * and 90-second Divine Protection Ward (Khiên Càn Khôn Bảo Hộ).
 * Conforms strictly to docs/MULTIPLAYER_ARCHITECTURE_SPEC.md Case Study 1 & Section 3.2.
 */
class EscrowService
{
    private PDO $pdo;

    public function __construct(?PDO $pdo = null)
    {
        $this->pdo = $pdo ?? Database::connect();
    }

    /**
     * Credit funds to player's pending escrow mailbox with tax deduction and audit trail.
     */
    public function addEscrow(
        string $sellerId,
        int $grossAmount,
        float $taxRate = 5.0,
        string $refType = 'bazaar_sale',
        string $refId = ''
    ): array {
        if ($grossAmount <= 0) {
            throw new RuntimeException("Số lượng Linh Thạch giao dịch phải lớn hơn 0!");
        }

        $taxAmount = (int)ceil($grossAmount * ($taxRate / 100.0));
        $netAmount = max(0, $grossAmount - $taxAmount);

        $this->pdo->beginTransaction();
        try {
            // Update seller's pending escrow in player_states
            $stmt = $this->pdo->prepare("
                UPDATE player_states 
                SET pending_escrow = pending_escrow + ?,
                    version = version + 1
                WHERE player_id = ?
            ");
            $stmt->execute([$netAmount, $sellerId]);

            // Append double-entry record to wallet audit ledger
            $audit = $this->pdo->prepare("
                INSERT INTO wallet_audit_ledger (source_id, dest_id, gross_amount, tax_amount, net_amount, reference_type, reference_id, metadata)
                VALUES ('market_escrow', ?, ?, ?, ?, ?, ?, ?)
            ");
            $meta = json_encode(['tax_rate' => $taxRate, 'burned_tax' => $taxAmount]);
            $audit->execute([$sellerId, $grossAmount, $taxAmount, $netAmount, $refType, $refId, $meta]);

            $this->pdo->commit();
        } catch (\Throwable $e) {
            $this->pdo->rollBack();
            throw $e;
        }

        return [
            'seller_id' => $sellerId,
            'gross_amount' => $grossAmount,
            'tax_amount' => $taxAmount,
            'net_credited' => $netAmount,
        ];
    }

    /**
     * Claim pending escrow funds into player's active wallet.
     * Enforces strict ACID locking and activates the 90s Divine Protection Ward.
     */
    public function claimEscrow(string $playerId): array
    {
        $this->pdo->beginTransaction();
        try {
            // Lock state row to prevent concurrent double-claim
            $stmt = $this->pdo->prepare("
                SELECT pending_escrow, divine_ward_until 
                FROM player_states 
                WHERE player_id = ? 
                FOR UPDATE
            ");
            $stmt->execute([$playerId]);
            $state = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$state || (int)$state['pending_escrow'] <= 0) {
                throw new RuntimeException("Hộp Thư Thương Hội không có Linh Thạch tồn đọng để nhận!");
            }

            $claimAmount = (int)$state['pending_escrow'];
            $now = time();
            $newWardUntil = max((int)$state['divine_ward_until'], $now + 90);

            // Credit active player wallet
            $cred = $this->pdo->prepare("UPDATE players SET gold = gold + ? WHERE id = ?");
            $cred->execute([$claimAmount, $playerId]);

            // Reset pending escrow and activate 90s Càn Khôn Shield
            $up = $this->pdo->prepare("
                UPDATE player_states 
                SET pending_escrow = 0,
                    divine_ward_until = ?,
                    version = version + 1
                WHERE player_id = ?
            ");
            $up->execute([$newWardUntil, $playerId]);

            // Record in audit ledger
            $audit = $this->pdo->prepare("
                INSERT INTO wallet_audit_ledger (source_id, dest_id, gross_amount, tax_amount, net_amount, reference_type, reference_id, metadata)
                VALUES ('escrow_vault', ?, ?, 0, ?, 'escrow_claim', ?, ?)
            ");
            $meta = json_encode(['divine_ward_until' => $newWardUntil, 'ward_seconds' => 90]);
            $audit->execute([$playerId, $claimAmount, $claimAmount, "claim_{$playerId}_{$now}", $meta]);

            // Get updated gold
            $goldStmt = $this->pdo->prepare("SELECT gold FROM players WHERE id = ?");
            $goldStmt->execute([$playerId]);
            $currentGold = (int)$goldStmt->fetchColumn();

            $this->pdo->commit();

            return [
                'success' => true,
                'claimed_amount' => $claimAmount,
                'current_gold' => $currentGold,
                'divine_ward_until' => $newWardUntil,
                'divine_ward_seconds' => max(0, $newWardUntil - $now),
                'message' => "Đã nhận {$claimAmount} Linh Thạch từ Hộp Thư Thương Hội! Khiên Càn Khôn Bảo Hộ được kích hoạt trong 90s.",
            ];
        } catch (\Throwable $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }
}
