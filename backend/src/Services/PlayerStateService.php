<?php

declare(strict_types=1);

namespace App\Services;

use App\Core\Database;
use PDO;
use RuntimeException;

/**
 * PlayerStateService: High-concurrency FSM managing persistent cultivator states
 * (Normal, Hospitalized / Dưỡng Thương, Imprisoned / Huyết Lao, Traveling / Ngao Du).
 * Conforms strictly to docs/MULTIPLAYER_ARCHITECTURE_SPEC.md Pillar 1 & 2.
 */
class PlayerStateService
{
    private PDO $pdo;

    public function __construct(?PDO $pdo = null)
    {
        $this->pdo = $pdo ?? Database::connect();
    }

    /**
     * Get or initialize player state with automatic lazy timeout resolution.
     */
    public function getState(string $playerId): array
    {
        $stmt = $this->pdo->prepare("SELECT * FROM player_states WHERE player_id = ?");
        $stmt->execute([$playerId]);
        $state = $stmt->fetch(PDO::FETCH_ASSOC);

        $now = time();

        if (!$state) {
            // Lazy initialization for accounts created before or without state
            $insert = $this->pdo->prepare("
                INSERT INTO player_states (player_id, status, hospital_until, jail_until, travel_until, pending_escrow, version)
                VALUES (?, 'normal', 0, 0, 0, 0, 1)
                ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP
            ");
            $insert->execute([$playerId]);

            $stmt->execute([$playerId]);
            $state = $stmt->fetch(PDO::FETCH_ASSOC);
        }

        // Lazy Timeout Resolution: Auto-transition expired statuses back to normal
        $needsUpdate = false;
        $updates = [];
        $params = [];

        if ($state['status'] === 'hospital' && (int)$state['hospital_until'] <= $now) {
            $state['status'] = 'normal';
            $state['hospital_until'] = 0;
            $state['hospital_reason'] = null;
            $updates[] = "status = 'normal', hospital_until = 0, hospital_reason = NULL";
            $needsUpdate = true;
        }

        if ($state['status'] === 'jailed' && (int)$state['jail_until'] <= $now) {
            $state['status'] = 'normal';
            $state['jail_until'] = 0;
            $state['jail_reason'] = null;
            $updates[] = "status = 'normal', jail_until = 0, jail_reason = NULL";
            $needsUpdate = true;
        }

        if ($state['status'] === 'traveling' && (int)$state['travel_until'] <= $now) {
            $state['status'] = 'normal';
            $state['travel_until'] = 0;
            $state['travel_destination'] = null;
            $updates[] = "status = 'normal', travel_until = 0, travel_destination = NULL";
            $needsUpdate = true;
        }

        if ($needsUpdate) {
            $sql = "UPDATE player_states SET " . implode(', ', $updates) . ", version = version + 1 WHERE player_id = ?";
            $upStmt = $this->pdo->prepare($sql);
            $upStmt->execute([$playerId]);
        }

        // Compute real-time remaining countdowns and permission flags
        $hospRemaining = max(0, (int)$state['hospital_until'] - $now);
        $jailRemaining = max(0, (int)$state['jail_until'] - $now);
        $travelRemaining = max(0, (int)$state['travel_until'] - $now);
        $wardRemaining = max(0, (int)$state['divine_ward_until'] - $now);
        $medCdRemaining = max(0, (int)$state['med_cooldown_until'] - $now);

        $isLocked = ($state['status'] !== 'normal');

        return array_merge($state, [
            'is_locked' => $isLocked,
            'can_combat' => ($state['status'] === 'normal'),
            'can_travel' => ($state['status'] === 'normal'),
            'can_trade' => ($state['status'] === 'normal'),
            'has_divine_ward' => ($wardRemaining > 0),
            'remaining_hospital_seconds' => $hospRemaining,
            'remaining_jail_seconds' => $jailRemaining,
            'remaining_travel_seconds' => $travelRemaining,
            'remaining_ward_seconds' => $wardRemaining,
            'remaining_med_cd_seconds' => $medCdRemaining,
        ]);
    }

    /**
     * Guard invariant: Assert that player can perform an action, or throw exception.
     */
    public function assertCanAct(string $playerId, string $actionType = 'action'): void
    {
        $state = $this->getState($playerId);

        if ($state['status'] === 'hospital') {
            $rem = $state['remaining_hospital_seconds'];
            throw new RuntimeException("Tu sĩ đang trọng thương bế quan ({$rem}s). Không thể {$actionType}!");
        }

        if ($state['status'] === 'jailed') {
            $rem = $state['remaining_jail_seconds'];
            throw new RuntimeException("Tu sĩ đang bị giam phạt diện bích ({$rem}s). Không thể {$actionType}!");
        }

        if ($state['status'] === 'traveling') {
            $rem = $state['remaining_travel_seconds'];
            throw new RuntimeException("Tu sĩ đang ngự kiếm phi hành ({$rem}s). Không thể {$actionType}!");
        }
    }

    /**
     * Hospitalize a player (Trọng thương / Bế quan dưỡng thương).
     */
    public function hospitalize(string $playerId, int $durationSeconds, string $reason = 'Trọng thương trong chiến đấu'): array
    {
        $now = time();
        $until = $now + max(10, $durationSeconds);

        $stmt = $this->pdo->prepare("
            UPDATE player_states 
            SET status = 'hospital',
                hospital_until = GREATEST(hospital_until, ?),
                hospital_reason = ?,
                active_combat_session_id = NULL,
                version = version + 1
            WHERE player_id = ?
        ");
        $stmt->execute([$until, $reason, $playerId]);

        // Also sync legacy player table column for backwards compatibility
        $sync = $this->pdo->prepare("UPDATE players SET hospital_until = ? WHERE id = ?");
        $sync->execute([$until, $playerId]);

        return $this->getState($playerId);
    }

    /**
     * Imprison a player (Phạt diện bích / Huyết Lao).
     */
    public function imprison(string $playerId, int $durationSeconds, string $reason = 'Phạt diện bích do vi phạm môn quy'): array
    {
        $now = time();
        $until = $now + max(10, $durationSeconds);

        $stmt = $this->pdo->prepare("
            UPDATE player_states 
            SET status = 'jailed',
                jail_until = GREATEST(jail_until, ?),
                jail_reason = ?,
                active_combat_session_id = NULL,
                version = version + 1
            WHERE player_id = ?
        ");
        $stmt->execute([$until, $reason, $playerId]);

        $sync = $this->pdo->prepare("UPDATE players SET jail_until = ? WHERE id = ?");
        $sync->execute([$until, $playerId]);

        return $this->getState($playerId);
    }

    /**
     * Consume medicinal pill to reduce hospital recovery time.
     * Enforces strict 1800s medical cooldown cap.
     */
    public function heal(string $playerId, string $pillId): array
    {
        $state = $this->getState($playerId);
        if ($state['status'] !== 'hospital' || $state['remaining_hospital_seconds'] <= 0) {
            throw new RuntimeException("Tu sĩ đang hoàn toàn khỏe mạnh, không cần dùng đan dược chữa thương!");
        }

        $now = time();
        $currentMedCd = max(0, (int)$state['med_cooldown_until'] - $now);
        if ($currentMedCd >= 1800) {
            throw new RuntimeException("Kinh mạch quá tải đan độc ({$currentMedCd}s). Cần nghỉ ngơi trước khi dùng thêm đan dược!");
        }

        // Pill efficacy matrix
        $pillEffects = [
            'tieu_hoan_dan' => ['reduction' => 300,  'cooldown' => 120, 'name' => 'Tiểu Hoàn Đan'],
            'dai_hoan_dan'  => ['reduction' => 900,  'cooldown' => 300, 'name' => 'Đại Hoàn Đan'],
            'hoan_hon_dan'  => ['reduction' => 1800, 'cooldown' => 600, 'name' => 'Hoàn Hồn Đan'],
            'sinh_menh_dan' => ['reduction' => 600,  'cooldown' => 180, 'name' => 'Sinh Mệnh Đan'],
        ];

        $effect = $pillEffects[$pillId] ?? ['reduction' => 300, 'cooldown' => 150, 'name' => 'Đan Dược Dưỡng Thương'];

        // Deduct inventory item if exists
        $checkItem = $this->pdo->prepare("SELECT id FROM player_items WHERE player_id = ? AND (base_type = ? OR item_uid = ?) AND equipped = 0 LIMIT 1");
        $checkItem->execute([$playerId, $pillId, $pillId]);
        $itemRow = $checkItem->fetch(PDO::FETCH_ASSOC);

        if (!$itemRow) {
            throw new RuntimeException("Trong Càn Khôn Túi không có [{$effect['name']}]!");
        }

        $this->pdo->beginTransaction();
        try {
            // Delete 1 item
            $del = $this->pdo->prepare("DELETE FROM player_items WHERE id = ?");
            $del->execute([$itemRow['id']]);

            // Calculate new recovery time and med cd
            $newHospUntil = max($now, (int)$state['hospital_until'] - $effect['reduction']);
            $newStatus = ($newHospUntil <= $now) ? 'normal' : 'hospital';
            $newMedCdUntil = max($now, (int)$state['med_cooldown_until']) + $effect['cooldown'];

            $up = $this->pdo->prepare("
                UPDATE player_states 
                SET status = ?,
                    hospital_until = ?,
                    hospital_reason = IF(? = 'normal', NULL, hospital_reason),
                    med_cooldown_until = ?,
                    version = version + 1
                WHERE player_id = ?
            ");
            $up->execute([$newStatus, $newHospUntil, $newStatus, $newMedCdUntil, $playerId]);

            $sync = $this->pdo->prepare("UPDATE players SET hospital_until = ?, med_cooldown_until = ? WHERE id = ?");
            $sync->execute([$newHospUntil, $newMedCdUntil, $playerId]);

            $this->pdo->commit();
        } catch (\Throwable $e) {
            $this->pdo->rollBack();
            throw $e;
        }

        return [
            'success' => true,
            'message' => "Đã dùng {$effect['name']}, giảm {$effect['reduction']}s dưỡng thương!",
            'state' => $this->getState($playerId),
        ];
    }

    /**
     * Pay fine / bail to exit disciplinary jail immediately.
     */
    public function bail(string $playerId): array
    {
        $state = $this->getState($playerId);
        if ($state['status'] !== 'jailed' || $state['remaining_jail_seconds'] <= 0) {
            throw new RuntimeException("Tu sĩ hiện không bị giam giữ phạt diện bích!");
        }

        $remMinutes = (int)ceil($state['remaining_jail_seconds'] / 60);
        $costPerMinute = 100;
        $totalCost = max(100, $remMinutes * $costPerMinute);

        $this->pdo->beginTransaction();
        try {
            // Check player balance
            $pStmt = $this->pdo->prepare("SELECT gold FROM players WHERE id = ? FOR UPDATE");
            $pStmt->execute([$playerId]);
            $player = $pStmt->fetch(PDO::FETCH_ASSOC);

            if (!$player || (int)$player['gold'] < $totalCost) {
                throw new RuntimeException("Không đủ Linh Thạch nộp phạt bảo lãnh! Cần {$totalCost} Linh Thạch.");
            }

            // Deduct gold
            $dec = $this->pdo->prepare("UPDATE players SET gold = gold - ?, jail_until = 0 WHERE id = ?");
            $dec->execute([$totalCost, $playerId]);

            // Release from jail
            $up = $this->pdo->prepare("
                UPDATE player_states 
                SET status = 'normal',
                    jail_until = 0,
                    jail_reason = NULL,
                    version = version + 1
                WHERE player_id = ?
            ");
            $up->execute([$playerId]);

            // Record in audit ledger
            $audit = $this->pdo->prepare("
                INSERT INTO wallet_audit_ledger (source_id, dest_id, gross_amount, tax_amount, net_amount, reference_type, reference_id, metadata)
                VALUES (?, 'system_bail_pool', ?, 0, ?, 'jail_bail', ?, ?)
            ");
            $meta = json_encode(['rem_seconds' => $state['remaining_jail_seconds'], 'cost' => $totalCost]);
            $audit->execute([$playerId, $totalCost, $totalCost, "bail_{$playerId}_" . time(), $meta]);

            $this->pdo->commit();
        } catch (\Throwable $e) {
            $this->pdo->rollBack();
            throw $e;
        }

        return [
            'success' => true,
            'message' => "Đã nộp {$totalCost} Linh Thạch bảo lãnh, giải trừ phạt diện bích thành công!",
            'cost' => $totalCost,
            'state' => $this->getState($playerId),
        ];
    }
}
