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
 * FactionService — Production Tông Môn, Chaining & Territory Warfare Subsystem.
 *
 * Implements Pillar 3 of docs/MULTIPLAYER_ARCHITECTURE_SPEC.md:
 * - Section 4.1: Chuỗi Liên Trảm (Chaining) dynamic decay countdown, FFM, and scaling multipliers.
 * - Section 4.2: Linh Mạch Tranh Đoạt (Territory Wars) siege mechanics and passive yield harvesting.
 * - Section 4.3: Hierarchical RBAC, Multi-Signature Treasury proposals, and tamper-evident audit ledger.
 * - Concurrency Safety: Multi-Table Resource Locking DAG (Tier 1 factions -> Tier 2 proposals/chains -> Tier 3 wallets -> Tier 5 ledger).
 */
class FactionService
{
    public const CREATION_COST = 100000; // 100,000 Linh Thạch to establish a Sect
    public const MULTISIG_THRESHOLD = 100000; // Withdrawals >= 100k require 2 officer signatures

    private PDO $pdo;
    private PlayerStateService $stateService;

    public function __construct(?PDO $pdo = null, ?PlayerStateService $stateService = null)
    {
        $this->pdo = $pdo ?? Database::pdo();
        $this->stateService = $stateService ?? new PlayerStateService($this->pdo);
        $this->seedTerritoriesIfEmpty();
    }

    // =========================================================================
    // SECTION 1: FACTION CREATION, MEMBERSHIP & HIERARCHICAL RBAC
    // =========================================================================

    /**
     * Create a new Faction (Tông Môn).
     */
    public function createFaction(string $leaderId, string $name, string $tag, ?string $description = null): array
    {
        $name = trim($name);
        $tag = strtoupper(trim($tag));

        if (mb_strlen($name) < 3 || mb_strlen($name) > 50) {
            throw new InvalidArgumentException("Tên Tông Môn phải từ 3 đến 50 ký tự!");
        }
        if (mb_strlen($tag) < 2 || mb_strlen($tag) > 6) {
            throw new InvalidArgumentException("Huy hiệu Tông Môn (Tag) phải từ 2 đến 6 ký tự!");
        }

        $this->stateService->assertCanAct($leaderId, 'sáng lập Tông Môn');

        $this->pdo->beginTransaction();
        try {
            // Check if leader already belongs to a faction
            $stmtCheck = $this->pdo->prepare("SELECT faction_id FROM faction_members WHERE player_id = ?");
            $stmtCheck->execute([$leaderId]);
            if ($stmtCheck->fetch()) {
                throw new RuntimeException("Bạn đã gia nhập một Tông Môn khác, không thể sáng lập Tông Môn mới!");
            }

            // Check name / tag uniqueness
            $dupStmt = $this->pdo->prepare("SELECT faction_id FROM factions WHERE name = ? OR tag = ?");
            $dupStmt->execute([$name, $tag]);
            if ($dupStmt->fetch()) {
                throw new RuntimeException("Tên hoặc Huy hiệu Tông Môn đã tồn tại!");
            }

            // Lock leader wallet at Tier 3
            $stmtWallet = $this->pdo->prepare("SELECT gold FROM players WHERE id = ? FOR UPDATE");
            $stmtWallet->execute([$leaderId]);
            $currentGold = (int)$stmtWallet->fetchColumn();

            if ($currentGold < self::CREATION_COST) {
                throw new RuntimeException("Không đủ Linh Thạch sáng lập Tông Môn! Cần " . number_format(self::CREATION_COST) . " 💎, hiện có " . number_format($currentGold) . " 💎.");
            }

            // Deduct creation cost
            $this->pdo->prepare("UPDATE players SET gold = gold - ? WHERE id = ?")
                ->execute([self::CREATION_COST, $leaderId]);

            // Insert into factions (Tier 1)
            $stmtIns = $this->pdo->prepare("
                INSERT INTO factions (name, tag, description, level, respect, leader_id, treasury_balance, daily_upkeep, max_members, version)
                VALUES (?, ?, ?, 1, 0, ?, 0, 100, 20, 1)
            ");
            $stmtIns->execute([$name, $tag, $description, $leaderId]);
            $factionId = (int)$this->pdo->lastInsertId();

            // Insert leader into faction_members with role 'master'
            $stmtMem = $this->pdo->prepare("
                INSERT INTO faction_members (faction_id, player_id, role, contribution_points, weekly_contribution, dividend_rate)
                VALUES (?, ?, 'master', 1000, 1000, 0.00)
            ");
            $stmtMem->execute([$factionId, $leaderId]);

            // Audit ledger record (Tier 5)
            $audit = $this->pdo->prepare("
                INSERT INTO wallet_audit_ledger (source_id, dest_id, gross_amount, tax_amount, net_amount, reference_type, reference_id, metadata)
                VALUES (?, NULL, ?, ?, 0, 'faction_creation', ?, ?)
            ");
            $audit->execute([
                $leaderId,
                self::CREATION_COST,
                self::CREATION_COST,
                (string)$factionId,
                json_encode(['name' => $name, 'tag' => $tag], JSON_UNESCAPED_UNICODE)
            ]);

            $this->pdo->commit();

            return [
                'success' => true,
                'faction_id' => $factionId,
                'name' => $name,
                'tag' => $tag,
                'message' => "Chúc mừng! Tông Môn [{$tag}] {$name} đã chính thức khai sơn lập phái!",
            ];
        } catch (Throwable $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }

    /**
     * Join an existing Faction.
     */
    public function joinFaction(string $playerId, int $factionId): array
    {
        $this->stateService->assertCanAct($playerId, 'gia nhập Tông Môn');

        $this->pdo->beginTransaction();
        try {
            // Lock faction row at Tier 1
            $stmtF = $this->pdo->prepare("SELECT * FROM factions WHERE faction_id = ? FOR UPDATE");
            $stmtF->execute([$factionId]);
            $faction = $stmtF->fetch(PDO::FETCH_ASSOC);

            if (!$faction) {
                throw new RuntimeException("Tông Môn không tồn tại!");
            }

            // Check player membership
            $stmtCheck = $this->pdo->prepare("SELECT faction_id FROM faction_members WHERE player_id = ?");
            $stmtCheck->execute([$playerId]);
            if ($stmtCheck->fetch()) {
                throw new RuntimeException("Bạn đã là thành viên của một Tông Môn!");
            }

            // Check capacity limit
            $countStmt = $this->pdo->prepare("SELECT COUNT(*) FROM faction_members WHERE faction_id = ?");
            $countStmt->execute([$factionId]);
            $memberCount = (int)$countStmt->fetchColumn();

            if ($memberCount >= (int)$faction['max_members']) {
                throw new RuntimeException("Tông Môn đã đạt giới hạn thành viên tối đa ({$faction['max_members']})!");
            }

            // Add member with role 'disciple'
            $insStmt = $this->pdo->prepare("
                INSERT INTO faction_members (faction_id, player_id, role, contribution_points, weekly_contribution, dividend_rate)
                VALUES (?, ?, 'disciple', 0, 0, 0.00)
            ");
            $insStmt->execute([$factionId, $playerId]);

            $this->pdo->commit();

            return [
                'success' => true,
                'faction_id' => $factionId,
                'faction_name' => $faction['name'],
                'role' => 'disciple',
                'message' => "Bạn đã chính thức bái nhập Tông Môn [{$faction['tag']}] {$faction['name']}!",
            ];
        } catch (Throwable $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }

    /**
     * Leave Faction (Sect Master cannot leave without delegating leadership).
     */
    public function leaveFaction(string $playerId): array
    {
        $this->pdo->beginTransaction();
        try {
            $stmt = $this->pdo->prepare("SELECT * FROM faction_members WHERE player_id = ? FOR UPDATE");
            $stmt->execute([$playerId]);
            $member = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$member) {
                throw new RuntimeException("Bạn không thuộc Tông Môn nào!");
            }

            if ($member['role'] === 'master') {
                throw new RuntimeException("Tông Chủ không thể rời Tông Môn! Hãy truyền ngôi vị trước.");
            }

            $del = $this->pdo->prepare("DELETE FROM faction_members WHERE player_id = ?");
            $del->execute([$playerId]);

            $this->pdo->commit();

            return [
                'success' => true,
                'message' => "Bạn đã rút khỏi Tông Môn, trở lại thân phận tán tu tự do.",
            ];
        } catch (Throwable $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }

    /**
     * Hierarchical Kick: Master can kick anyone; Elder can only kick Disciples.
     */
    public function kickMember(string $actorId, string $targetId): array
    {
        if ($actorId === $targetId) {
            throw new InvalidArgumentException("Không thể tự trục xuất chính mình!");
        }

        $this->pdo->beginTransaction();
        try {
            $stmtActor = $this->pdo->prepare("SELECT * FROM faction_members WHERE player_id = ?");
            $stmtActor->execute([$actorId]);
            $actor = $stmtActor->fetch(PDO::FETCH_ASSOC);

            $stmtTarget = $this->pdo->prepare("SELECT * FROM faction_members WHERE player_id = ?");
            $stmtTarget->execute([$targetId]);
            $target = $stmtTarget->fetch(PDO::FETCH_ASSOC);

            if (!$actor || !$target || (int)$actor['faction_id'] !== (int)$target['faction_id']) {
                throw new RuntimeException("Cả hai bên phải cùng thuộc một Tông Môn!");
            }

            $actorRole = $actor['role'];
            $targetRole = $target['role'];

            $canKick = false;
            if ($actorRole === 'master') {
                $canKick = true;
            } elseif ($actorRole === 'elder' && in_array($targetRole, ['disciple'], true)) {
                $canKick = true;
            }

            if (!$canKick) {
                throw new RuntimeException("Bạn không đủ quyền hạn để trục xuất thành viên này!");
            }

            $this->pdo->prepare("DELETE FROM faction_members WHERE player_id = ?")->execute([$targetId]);
            $this->pdo->commit();

            return [
                'success' => true,
                'message' => "Đã trục xuất thành viên khỏi Tông Môn.",
            ];
        } catch (Throwable $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }

    /**
     * Change Member Role within Faction (RBAC).
     */
    public function setMemberRole(string $actorId, string $targetId, string $newRole): array
    {
        if (!in_array($newRole, ['master', 'elder', 'deacon', 'disciple'], true)) {
            throw new InvalidArgumentException("Cấp bậc không hợp lệ!");
        }

        $this->pdo->beginTransaction();
        try {
            $stmtActor = $this->pdo->prepare("SELECT * FROM faction_members WHERE player_id = ?");
            $stmtActor->execute([$actorId]);
            $actor = $stmtActor->fetch(PDO::FETCH_ASSOC);

            $stmtTarget = $this->pdo->prepare("SELECT * FROM faction_members WHERE player_id = ?");
            $stmtTarget->execute([$targetId]);
            $target = $stmtTarget->fetch(PDO::FETCH_ASSOC);

            if (!$actor || !$target || (int)$actor['faction_id'] !== (int)$target['faction_id']) {
                throw new RuntimeException("Không cùng Tông Môn!");
            }

            if ($actor['role'] !== 'master') {
                throw new RuntimeException("Chỉ Tông Chủ mới có quyền sắc phong hoặc chuyển giao ngôi vị!");
            }

            $factionId = (int)$actor['faction_id'];

            if ($newRole === 'master') {
                // Transfer Sect Leadership
                $this->pdo->prepare("UPDATE faction_members SET role = 'elder' WHERE player_id = ?")->execute([$actorId]);
                $this->pdo->prepare("UPDATE faction_members SET role = 'master' WHERE player_id = ?")->execute([$targetId]);
                $this->pdo->prepare("UPDATE factions SET leader_id = ? WHERE faction_id = ?")->execute([$targetId, $factionId]);
                $msg = "Đã truyền thụ ngôi vị Tông Chủ thành công.";
            } else {
                $this->pdo->prepare("UPDATE faction_members SET role = ? WHERE player_id = ?")->execute([$newRole, $targetId]);
                $msg = "Đã bổ nhiệm thành viên chức vị: {$newRole}.";
            }

            $this->pdo->commit();

            return [
                'success' => true,
                'message' => $msg,
            ];
        } catch (Throwable $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }

    /**
     * Get detailed Faction view.
     */
    public function getFaction(int $factionId): array
    {
        $stmt = $this->pdo->prepare("SELECT * FROM factions WHERE faction_id = ?");
        $stmt->execute([$factionId]);
        $faction = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$faction) {
            throw new RuntimeException("Tông Môn không tồn tại!");
        }

        $memStmt = $this->pdo->prepare("
            SELECT fm.*, p.name, p.level, p.realm_tier, ps.status as current_status
            FROM faction_members fm
            JOIN players p ON p.id = fm.player_id
            LEFT JOIN player_states ps ON ps.player_id = fm.player_id
            WHERE fm.faction_id = ?
            ORDER BY 
                CASE fm.role 
                    WHEN 'master' THEN 1 
                    WHEN 'elder' THEN 2 
                    WHEN 'deacon' THEN 3 
                    ELSE 4 
                END ASC,
                fm.contribution_points DESC
        ");
        $memStmt->execute([$factionId]);
        $members = $memStmt->fetchAll(PDO::FETCH_ASSOC);

        return [
            'faction_id' => (int)$faction['faction_id'],
            'name' => $faction['name'],
            'tag' => $faction['tag'],
            'description' => $faction['description'],
            'level' => (int)$faction['level'],
            'respect' => (int)$faction['respect'],
            'leader_id' => $faction['leader_id'],
            'treasury_balance' => (int)$faction['treasury_balance'],
            'daily_upkeep' => (int)$faction['daily_upkeep'],
            'max_members' => (int)$faction['max_members'],
            'members' => array_map(function ($m) {
                return [
                    'player_id' => $m['player_id'],
                    'name' => $m['name'],
                    'role' => $m['role'],
                    'level' => (int)$m['level'],
                    'realm_tier' => (int)$m['realm_tier'],
                    'contribution_points' => (int)$m['contribution_points'],
                    'weekly_contribution' => (int)$m['weekly_contribution'],
                    'status' => $m['current_status'] ?? 'normal',
                ];
            }, $members),
        ];
    }

    /**
     * List all Factions ordered by Respect (Uy Danh).
     */
    public function listFactions(int $limit = 50): array
    {
        $stmt = $this->pdo->prepare("
            SELECT f.*, p.name as leader_name, COUNT(fm.player_id) as member_count
            FROM factions f
            JOIN players p ON p.id = f.leader_id
            LEFT JOIN faction_members fm ON fm.faction_id = f.faction_id
            GROUP BY f.faction_id
            ORDER BY f.respect DESC, f.level DESC, f.faction_id ASC
            LIMIT ?
        ");
        $stmt->bindValue(1, $limit, PDO::PARAM_INT);
        $stmt->execute();
        $factions = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return [
            'success' => true,
            'factions' => array_map(function ($f) {
                return [
                    'faction_id' => (int)$f['faction_id'],
                    'name' => $f['name'],
                    'tag' => $f['tag'],
                    'level' => (int)$f['level'],
                    'respect' => (int)$f['respect'],
                    'leader_id' => $f['leader_id'],
                    'leader_name' => $f['leader_name'],
                    'member_count' => (int)$f['member_count'],
                    'max_members' => (int)$f['max_members'],
                    'treasury_balance' => (int)$f['treasury_balance'],
                ];
            }, $factions),
        ];
    }

    // =========================================================================
    // SECTION 2: TREASURY DEPOSITS & MULTI-SIGNATURE PROPOSALS
    // =========================================================================

    /**
     * Deposit Linh Thạch into Faction Treasury.
     */
    public function depositTreasury(string $playerId, int $amount): array
    {
        if ($amount <= 0) {
            throw new InvalidArgumentException("Số Linh Thạch quyên góp phải lớn hơn 0!");
        }

        $this->pdo->beginTransaction();
        try {
            $stmtMem = $this->pdo->prepare("SELECT * FROM faction_members WHERE player_id = ?");
            $stmtMem->execute([$playerId]);
            $member = $stmtMem->fetch(PDO::FETCH_ASSOC);

            if (!$member) {
                throw new RuntimeException("Bạn chưa gia nhập Tông Môn nào!");
            }
            $factionId = (int)$member['faction_id'];

            // Lock Faction Row at Tier 1
            $stmtF = $this->pdo->prepare("SELECT * FROM factions WHERE faction_id = ? FOR UPDATE");
            $stmtF->execute([$factionId]);
            $faction = $stmtF->fetch(PDO::FETCH_ASSOC);

            // Lock Player Wallet at Tier 3
            $stmtP = $this->pdo->prepare("SELECT gold FROM players WHERE id = ? FOR UPDATE");
            $stmtP->execute([$playerId]);
            $currentGold = (int)$stmtP->fetchColumn();

            if ($currentGold < $amount) {
                throw new RuntimeException("Số Linh Thạch trong người không đủ để quyên góp!");
            }

            // Deduct Player Wallet & Credit Faction Treasury
            $this->pdo->prepare("UPDATE players SET gold = gold - ? WHERE id = ?")->execute([$amount, $playerId]);
            $this->pdo->prepare("UPDATE factions SET treasury_balance = treasury_balance + ?, version = version + 1 WHERE faction_id = ?")
                ->execute([$amount, $factionId]);

            // Update Member Contribution (1 Linh Thạch = 1 Cống Hiến)
            $this->pdo->prepare("
                UPDATE faction_members 
                SET contribution_points = contribution_points + ?, weekly_contribution = weekly_contribution + ? 
                WHERE player_id = ?
            ")->execute([$amount, $amount, $playerId]);

            // Tier 5: Audit Ledger Record
            $audit = $this->pdo->prepare("
                INSERT INTO wallet_audit_ledger (source_id, dest_id, gross_amount, tax_amount, net_amount, reference_type, reference_id)
                VALUES (?, NULL, ?, 0, ?, 'faction_deposit', ?)
            ");
            $audit->execute([$playerId, $amount, $amount, (string)$factionId]);

            $this->pdo->commit();

            return [
                'success' => true,
                'deposited' => $amount,
                'new_treasury_balance' => (int)$faction['treasury_balance'] + $amount,
                'message' => "Đã quyên góp thành công " . number_format($amount) . " 💎 vào Tàng Bảo Các Tông Môn.",
            ];
        } catch (Throwable $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }

    /**
     * Create Treasury Withdrawal Proposal.
     * Low-value (< 100,000) executed immediately by Master/Elder.
     * High-value (>= 100,000) requires Multi-Signature approvals.
     */
    public function createWithdrawProposal(string $proposerId, string $targetId, int $amount, string $purpose): array
    {
        if ($amount <= 0) {
            throw new InvalidArgumentException("Số Linh Thạch rút phải lớn hơn 0!");
        }

        $this->pdo->beginTransaction();
        try {
            $stmtMem = $this->pdo->prepare("SELECT * FROM faction_members WHERE player_id = ?");
            $stmtMem->execute([$proposerId]);
            $proposer = $stmtMem->fetch(PDO::FETCH_ASSOC);

            if (!$proposer || !in_array($proposer['role'], ['master', 'elder'], true)) {
                throw new RuntimeException("Chỉ Tông Chủ hoặc Trưởng Lão mới có quyền đề xuất trích quỹ!");
            }
            $factionId = (int)$proposer['faction_id'];

            // Verify Target is in same faction
            $stmtTarget = $this->pdo->prepare("SELECT * FROM faction_members WHERE player_id = ? AND faction_id = ?");
            $stmtTarget->execute([$targetId, $factionId]);
            if (!$stmtTarget->fetch()) {
                throw new RuntimeException("Người nhận phải là thành viên trong Tông Môn!");
            }

            // Lock Faction Row at Tier 1
            $stmtF = $this->pdo->prepare("SELECT * FROM factions WHERE faction_id = ? FOR UPDATE");
            $stmtF->execute([$factionId]);
            $faction = $stmtF->fetch(PDO::FETCH_ASSOC);

            if ((int)$faction['treasury_balance'] < $amount) {
                throw new RuntimeException("Tàng Bảo Các không đủ Linh Thạch! (Hiện có: " . number_format((int)$faction['treasury_balance']) . " 💎).");
            }

            // If low value (< 100k): Execute immediately!
            if ($amount < self::MULTISIG_THRESHOLD) {
                $this->pdo->prepare("UPDATE factions SET treasury_balance = treasury_balance - ?, version = version + 1 WHERE faction_id = ?")
                    ->execute([$amount, $factionId]);
                $this->pdo->prepare("UPDATE players SET gold = gold + ? WHERE id = ?")->execute([$amount, $targetId]);

                // Record in proposals as executed
                $insP = $this->pdo->prepare("
                    INSERT INTO faction_treasury_proposals (faction_id, proposer_id, target_id, amount, purpose, status, approvals_json, expires_at)
                    VALUES (?, ?, ?, ?, ?, 'executed', ?, ?)
                ");
                $approvals = [$proposerId];
                $insP->execute([$factionId, $proposerId, $targetId, $amount, $purpose, json_encode($approvals), time() + 86400]);
                $propId = (int)$this->pdo->lastInsertId();

                // Audit ledger (Tier 5)
                $audit = $this->pdo->prepare("
                    INSERT INTO wallet_audit_ledger (source_id, dest_id, gross_amount, tax_amount, net_amount, reference_type, reference_id)
                    VALUES (NULL, ?, ?, 0, ?, 'faction_withdraw', ?)
                ");
                $audit->execute([$targetId, $amount, $amount, (string)$propId]);

                $this->pdo->commit();

                return [
                    'success' => true,
                    'status' => 'executed',
                    'proposal_id' => $propId,
                    'amount' => $amount,
                    'message' => "Đã trích xuất " . number_format($amount) . " 💎 từ Tàng Bảo Các thành công.",
                ];
            }

            // High-value (>= 100k): Create Multi-Sig Proposal
            $expiresAt = time() + 86400; // 24-hour time lock
            $approvals = [$proposerId]; // Proposer signs automatically

            $insP = $this->pdo->prepare("
                INSERT INTO faction_treasury_proposals (faction_id, proposer_id, target_id, amount, purpose, status, approvals_json, expires_at)
                VALUES (?, ?, ?, ?, ?, 'pending', ?, ?)
            ");
            $insP->execute([$factionId, $proposerId, $targetId, $amount, $purpose, json_encode($approvals), $expiresAt]);
            $propId = (int)$this->pdo->lastInsertId();

            $this->pdo->commit();

            return [
                'success' => true,
                'status' => 'pending',
                'proposal_id' => $propId,
                'amount' => $amount,
                'message' => "Đề xuất trích quỹ lớn (" . number_format($amount) . " 💎) đã được tạo. Cần thêm 1 chữ ký đồng thuận từ Trưởng Lão/Tông Chủ khác.",
            ];
        } catch (Throwable $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }

    /**
     * Approve Multi-Signature Proposal (Algorithm 4.3).
     */
    public function approveWithdrawProposal(string $approverId, int $proposalId): array
    {
        $this->pdo->beginTransaction();
        try {
            // Lock Proposal Row at Tier 2
            $stmtProp = $this->pdo->prepare("SELECT * FROM faction_treasury_proposals WHERE proposal_id = ? FOR UPDATE");
            $stmtProp->execute([$proposalId]);
            $proposal = $stmtProp->fetch(PDO::FETCH_ASSOC);

            if (!$proposal || $proposal['status'] !== 'pending') {
                throw new RuntimeException("Đề xuất không tồn tại hoặc không ở trạng thái chờ duyệt!");
            }

            if (time() > (int)$proposal['expires_at']) {
                $this->pdo->prepare("UPDATE faction_treasury_proposals SET status = 'expired' WHERE proposal_id = ?")->execute([$proposalId]);
                throw new RuntimeException("Đề xuất đã quá hạn 24 giờ!");
            }

            $factionId = (int)$proposal['faction_id'];

            // Verify Approver Role (Must be Master or Elder)
            $stmtMem = $this->pdo->prepare("SELECT * FROM faction_members WHERE player_id = ? AND faction_id = ?");
            $stmtMem->execute([$approverId, $factionId]);
            $approver = $stmtMem->fetch(PDO::FETCH_ASSOC);

            if (!$approver || !in_array($approver['role'], ['master', 'elder'], true)) {
                throw new RuntimeException("Chỉ Tông Chủ hoặc Trưởng Lão mới có quyền ký duyệt đề xuất trích quỹ!");
            }

            $approvals = json_decode($proposal['approvals_json'] ?? '[]', true) ?: [];
            if (in_array($approverId, $approvals, true)) {
                throw new RuntimeException("Bạn đã ký duyệt đề xuất này rồi!");
            }

            $approvals[] = $approverId;

            // Check if Dual Confirmation is reached (>= 2 distinct officer signatures)
            if (count($approvals) >= 2) {
                // Lock Faction Row at Tier 1
                $stmtF = $this->pdo->prepare("SELECT treasury_balance FROM factions WHERE faction_id = ? FOR UPDATE");
                $stmtF->execute([$factionId]);
                $treasury = (int)$stmtF->fetchColumn();

                $amount = (int)$proposal['amount'];
                if ($treasury < $amount) {
                    throw new RuntimeException("Số dư Tàng Bảo Các hiện không đủ để thực thi đề xuất!");
                }

                // Debit Treasury and Credit Target Player Wallet (Tier 3)
                $this->pdo->prepare("UPDATE factions SET treasury_balance = treasury_balance - ?, version = version + 1 WHERE faction_id = ?")
                    ->execute([$amount, $factionId]);
                $this->pdo->prepare("UPDATE players SET gold = gold + ? WHERE id = ?")->execute([$amount, $proposal['target_id']]);

                // Mark Proposal Executed
                $this->pdo->prepare("
                    UPDATE faction_treasury_proposals 
                    SET status = 'executed', approvals_json = ? 
                    WHERE proposal_id = ?
                ")->execute([json_encode($approvals), $proposalId]);

                // Tier 5: Audit Ledger
                $audit = $this->pdo->prepare("
                    INSERT INTO wallet_audit_ledger (source_id, dest_id, gross_amount, tax_amount, net_amount, reference_type, reference_id)
                    VALUES (NULL, ?, ?, 0, ?, 'faction_withdraw', ?)
                ");
                $audit->execute([$proposal['target_id'], $amount, $amount, (string)$proposalId]);

                $this->pdo->commit();

                return [
                    'success' => true,
                    'status' => 'executed',
                    'proposal_id' => $proposalId,
                    'message' => "Đề xuất đã nhận đủ 2 chữ ký đồng thuận và thực thi thành công! Đã giải ngân " . number_format($amount) . " 💎.",
                ];
            }

            // Still awaiting more signatures
            $this->pdo->prepare("UPDATE faction_treasury_proposals SET approvals_json = ? WHERE proposal_id = ?")
                ->execute([json_encode($approvals), $proposalId]);

            $this->pdo->commit();

            return [
                'success' => true,
                'status' => 'pending',
                'proposal_id' => $proposalId,
                'approvals_count' => count($approvals),
                'message' => "Chữ ký của bạn đã được ghi nhận. Đang chờ thêm đồng thuận.",
            ];
        } catch (Throwable $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }

    // =========================================================================
    // SECTION 3: FACTION CHAINING (CHUỖI LIÊN TRẢM) (Section 4.1)
    // =========================================================================

    /**
     * Compute Dynamic Countdown Timeout Window according to Section 4.1:
     * - Hits 1 to 10: 300s (5m)
     * - Hits 11 to 50: 240s (4m)
     * - Hits 51 to 100: 180s (3m)
     * - Hits 101 to 250: 150s (2m 30s)
     * - Hits 251 to 500: 120s (2m)
     * - Hits 501 to 1,000: 90s (1m 30s)
     * - Hits 1,001+: 60s (1m)
     */
    public static function getChainTimeoutWindow(int $hitCount): int
    {
        if ($hitCount <= 10) return 300;
        if ($hitCount <= 50) return 240;
        if ($hitCount <= 100) return 180;
        if ($hitCount <= 250) return 150;
        if ($hitCount <= 500) return 120;
        if ($hitCount <= 1000) return 90;
        return 60;
    }

    /**
     * Compute Scaling Chain Multiplier according to Section 4.1:
     * - Hits 10: 2.0x (Intermediate: 1.25x)
     * - Hits 25: 3.5x (Intermediate: 1.50x)
     * - Hits 50: 5.0x (Intermediate: 1.75x)
     * - Hits 100: 7.5x (Intermediate: 2.00x)
     * - Hits 250: 10.0x (Intermediate: 2.50x)
     * - Hits 500: 15.0x (Intermediate: 3.00x)
     * - Hits 1,000: 25.0x (Intermediate: 3.75x)
     * - Hits 2,500+: 50.0x (Intermediate: 4.50x)
     */
    public static function getChainMultiplier(int $hitCount): float
    {
        if ($hitCount >= 2500) return 50.00;
        if ($hitCount == 1000) return 25.00;
        if ($hitCount > 1000) return 3.75;
        if ($hitCount == 500) return 15.00;
        if ($hitCount > 500) return 3.00;
        if ($hitCount == 250) return 10.00;
        if ($hitCount > 250) return 2.50;
        if ($hitCount == 100) return 7.50;
        if ($hitCount > 100) return 2.00;
        if ($hitCount == 50) return 5.00;
        if ($hitCount > 50) return 1.75;
        if ($hitCount == 25) return 3.50;
        if ($hitCount > 25) return 1.50;
        if ($hitCount == 10) return 2.00;
        if ($hitCount > 10) return 1.25;
        return 1.00;
    }

    /**
     * Fair Fight Multiplier (FFM):
     * FFM = clamp(0.1, 3.0, 1.0 + (Stats_defender - Stats_attacker) / max(1, Stats_attacker))
     */
    public static function calculateFFM(float $attackerStats, float $defenderStats): float
    {
        $baseAttacker = max(1.0, $attackerStats);
        $rawFfm = 1.0 + (($defenderStats - $attackerStats) / $baseAttacker);
        return (float)max(0.1, min(3.0, round($rawFfm, 2)));
    }

    /**
     * Register a Qualifying PvP Victory Hit into the Faction's Active Chain.
     */
    public function registerChainHit(int $factionId, string $attackerId, string $defenderId, float $attackerStats, float $defenderStats): array
    {
        $now = time();

        $this->pdo->beginTransaction();
        try {
            // Lock active chain for faction (Tier 2)
            $stmtC = $this->pdo->prepare("
                SELECT * FROM faction_chains 
                WHERE faction_id = ? AND status = 'active'
                FOR UPDATE
            ");
            $stmtC->execute([$factionId]);
            $chain = $stmtC->fetch(PDO::FETCH_ASSOC);

            // If chain exists and is expired, mark broken
            if ($chain && (int)$chain['timeout_at'] < $now) {
                $this->pdo->prepare("UPDATE faction_chains SET status = 'broken' WHERE chain_id = ?")
                    ->execute([$chain['chain_id']]);
                $chain = null;
            }

            // Calculate FFM and Anti-Dummy Extension
            $ffm = self::calculateFFM($attackerStats, $defenderStats);

            if (!$chain) {
                // Initialize new chain
                $hitCount = 1;
                $multiplier = self::getChainMultiplier($hitCount);
                $timeoutWindow = self::getChainTimeoutWindow($hitCount);
                $timeoutAt = $now + $timeoutWindow;

                $insC = $this->pdo->prepare("
                    INSERT INTO faction_chains (faction_id, current_count, max_count, multiplier, timeout_at, status)
                    VALUES (?, 1, 1, ?, ?, 'active')
                ");
                $insC->execute([$factionId, $multiplier, $timeoutAt]);
                $chainId = (int)$this->pdo->lastInsertId();
            } else {
                $chainId = (int)$chain['chain_id'];
                $hitCount = (int)$chain['current_count'] + 1;
                $maxCount = max((int)$chain['max_count'], $hitCount);
                $multiplier = self::getChainMultiplier($hitCount);
                $timeoutWindow = self::getChainTimeoutWindow($hitCount);

                // Anti-dummy timer extension rule:
                // If FFM >= 0.25: resets window to full timeout window.
                // If FFM < 0.25: adds only 5 seconds (emergency stall).
                if ($ffm >= 0.25) {
                    $timeoutAt = $now + $timeoutWindow;
                } else {
                    $timeoutAt = min($now + $timeoutWindow, (int)$chain['timeout_at'] + 5);
                }

                $upC = $this->pdo->prepare("
                    UPDATE faction_chains 
                    SET current_count = ?, max_count = ?, multiplier = ?, timeout_at = ? 
                    WHERE chain_id = ?
                ");
                $upC->execute([$hitCount, $maxCount, $multiplier, $timeoutAt, $chainId]);
            }

            // Base Respect is 10. Award = round(10 * FFM * Multiplier)
            $respectAwarded = (int)max(1, round(10.0 * $ffm * $multiplier));

            // Credit Respect to Faction (Tier 1)
            $this->pdo->prepare("UPDATE factions SET respect = respect + ?, version = version + 1 WHERE faction_id = ?")
                ->execute([$respectAwarded, $factionId]);

            // Credit Attacker Member Contribution Points
            $this->pdo->prepare("
                UPDATE faction_members 
                SET contribution_points = contribution_points + ?, weekly_contribution = weekly_contribution + ? 
                WHERE player_id = ? AND faction_id = ?
            ")->execute([$respectAwarded, $respectAwarded, $attackerId, $factionId]);

            $this->pdo->commit();

            return [
                'success' => true,
                'chain_id' => $chainId,
                'hit_count' => $hitCount,
                'multiplier' => $multiplier,
                'ffm' => $ffm,
                'respect_awarded' => $respectAwarded,
                'timeout_at' => $timeoutAt,
                'remaining_seconds' => max(0, $timeoutAt - $now),
                'message' => "⚡ Liên Trảm [#{$hitCount}]! Tông Môn nhận +{$respectAwarded} Uy Danh (Hệ số: {$multiplier}x, FFM: {$ffm}x).",
            ];
        } catch (Throwable $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }

    /**
     * Get active chain for a faction.
     */
    public function getActiveChain(int $factionId): ?array
    {
        $stmt = $this->pdo->prepare("
            SELECT * FROM faction_chains 
            WHERE faction_id = ? AND status = 'active'
        ");
        $stmt->execute([$factionId]);
        $chain = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$chain) return null;

        $now = time();
        $timeoutAt = (int)$chain['timeout_at'];
        if ($timeoutAt < $now) {
            // Lazy reap expired chain
            $this->pdo->prepare("UPDATE faction_chains SET status = 'broken' WHERE chain_id = ?")
                ->execute([$chain['chain_id']]);
            return null;
        }

        return [
            'chain_id' => (int)$chain['chain_id'],
            'faction_id' => (int)$chain['faction_id'],
            'current_count' => (int)$chain['current_count'],
            'max_count' => (int)$chain['max_count'],
            'multiplier' => (float)$chain['multiplier'],
            'timeout_at' => $timeoutAt,
            'remaining_seconds' => max(0, $timeoutAt - $now),
            'status' => 'active',
        ];
    }

    // =========================================================================
    // SECTION 4: TERRITORY WARFARE & LINH MẠCH (Section 4.2)
    // =========================================================================

    /**
     * Ensure baseline canonical spiritual vein territories exist.
     */
    public function seedTerritoriesIfEmpty(): void
    {
        $count = (int)$this->pdo->query("SELECT COUNT(*) FROM faction_territories")->fetchColumn();
        if ($count > 0) return;

        $territories = [
            [
                'territory_id' => 'ha_pham_linh_mach',
                'name' => 'Hạ Phẩm Linh Mạch',
                'spirit_yield' => 2000, // 2,000 gold/hour
                'respect_yield' => 5,
                'ward_hp' => 50000,
            ],
            [
                'territory_id' => 'trung_pham_linh_mach',
                'name' => 'Trung Phẩm Linh Mạch',
                'spirit_yield' => 6000, // 6,000 gold/hour
                'respect_yield' => 15,
                'ward_hp' => 150000,
            ],
            [
                'territory_id' => 'thuong_pham_linh_mach',
                'name' => 'Thượng Phẩm Linh Mạch',
                'spirit_yield' => 20000, // 20,000 gold/hour
                'respect_yield' => 50,
                'ward_hp' => 500000,
            ],
            [
                'territory_id' => 'cuc_pham_tien_tuyen',
                'name' => 'Cực Phẩm Tiên Tuyền',
                'spirit_yield' => 60000, // 60,000 gold/hour
                'respect_yield' => 150,
                'ward_hp' => 1500000,
            ],
        ];

        $ins = $this->pdo->prepare("
            INSERT IGNORE INTO faction_territories (
                territory_id, name, spirit_yield_rate, respect_yield_rate, defense_rating, current_ward_hp, max_ward_hp, contested_status
            ) VALUES (?, ?, ?, ?, 1000, ?, ?, 'peaceful')
        ");
        foreach ($territories as $t) {
            $ins->execute([
                $t['territory_id'],
                $t['name'],
                $t['spirit_yield'],
                $t['respect_yield'],
                $t['ward_hp'],
                $t['ward_hp'],
            ]);
        }
    }

    /**
     * Declare Territory War on a spiritual vein node.
     */
    public function declareTerritoryWar(string $actorId, string $territoryId): array
    {
        $this->pdo->beginTransaction();
        try {
            $stmtMem = $this->pdo->prepare("SELECT * FROM faction_members WHERE player_id = ?");
            $stmtMem->execute([$actorId]);
            $member = $stmtMem->fetch(PDO::FETCH_ASSOC);

            if (!$member || !in_array($member['role'], ['master', 'elder'], true)) {
                throw new RuntimeException("Chỉ Tông Chủ hoặc Trưởng Lão mới có quyền tuyên chiến chiếm đóng Linh Mạch!");
            }
            $factionId = (int)$member['faction_id'];

            // Lock Territory row
            $stmtT = $this->pdo->prepare("SELECT * FROM faction_territories WHERE territory_id = ? FOR UPDATE");
            $stmtT->execute([$territoryId]);
            $territory = $stmtT->fetch(PDO::FETCH_ASSOC);

            if (!$territory) {
                throw new RuntimeException("Linh Mạch không tồn tại!");
            }

            if ($territory['controlling_faction_id'] !== null && (int)$territory['controlling_faction_id'] === $factionId) {
                throw new RuntimeException("Tông Môn của bạn đã và đang chiếm giữ Linh Mạch này!");
            }

            if ($territory['contested_status'] === 'cooldown') {
                throw new RuntimeException("Linh Mạch đang trong thời gian bảo hộ hòa bình, chưa thể tuyên chiến!");
            }

            $this->pdo->prepare("UPDATE faction_territories SET contested_status = 'under_attack' WHERE territory_id = ?")
                ->execute([$territoryId]);

            $this->pdo->commit();

            return [
                'success' => true,
                'territory_id' => $territoryId,
                'status' => 'under_attack',
                'message' => "Chiến lệnh đã ban! Toàn thể môn nhân lập tức vây công phá vỡ Hộ Sơn Trận Pháp của [{$territory['name']}]!",
            ];
        } catch (Throwable $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }

    /**
     * Assault Territory Ward Barrier HP (Phá Trận Kỳ).
     */
    public function attackTerritoryWard(string $actorId, string $territoryId, int $siegeDamage): array
    {
        if ($siegeDamage <= 0) {
            throw new InvalidArgumentException("Sát thương công trận phải lớn hơn 0!");
        }

        $this->pdo->beginTransaction();
        try {
            $stmtMem = $this->pdo->prepare("SELECT * FROM faction_members WHERE player_id = ?");
            $stmtMem->execute([$actorId]);
            $member = $stmtMem->fetch(PDO::FETCH_ASSOC);

            if (!$member) {
                throw new RuntimeException("Chỉ thành viên Tông Môn mới có thể công kích Linh Mạch!");
            }
            $attackerFactionId = (int)$member['faction_id'];

            $stmtT = $this->pdo->prepare("SELECT * FROM faction_territories WHERE territory_id = ? FOR UPDATE");
            $stmtT->execute([$territoryId]);
            $t = $stmtT->fetch(PDO::FETCH_ASSOC);

            if (!$t || $t['contested_status'] !== 'under_attack') {
                throw new RuntimeException("Linh Mạch hiện không ở trạng thái bị tấn công!");
            }

            $currentHp = (int)$t['current_ward_hp'];
            $newHp = max(0, $currentHp - $siegeDamage);

            if ($newHp <= 0) {
                // OCCUPIED / CAPTURED!
                $maxHp = (int)$t['max_ward_hp'];
                $this->pdo->prepare("
                    UPDATE faction_territories 
                    SET controlling_faction_id = ?, current_ward_hp = ?, contested_status = 'cooldown', last_harvest_at = NOW()
                    WHERE territory_id = ?
                ")->execute([$attackerFactionId, $maxHp, $territoryId]);

                // Award conquer respect bonus to faction
                $this->pdo->prepare("UPDATE factions SET respect = respect + 500 WHERE faction_id = ?")
                    ->execute([$attackerFactionId]);

                $this->pdo->commit();

                return [
                    'success' => true,
                    'status' => 'conquered',
                    'damage_dealt' => $siegeDamage,
                    'ward_hp_remaining' => 0,
                    'controlling_faction_id' => $attackerFactionId,
                    'message' => "Hộ Sơn Trận Pháp đã bị công phá! Tông Môn của bạn đã thành công chiếm đóng [{$t['name']}]! (+500 Uy Danh).",
                ];
            }

            // Normal Ward Damage
            $this->pdo->prepare("UPDATE faction_territories SET current_ward_hp = ? WHERE territory_id = ?")
                ->execute([$newHp, $territoryId]);

            $this->pdo->commit();

            return [
                'success' => true,
                'status' => 'damaged',
                'damage_dealt' => $siegeDamage,
                'ward_hp_remaining' => $newHp,
                'max_ward_hp' => (int)$t['max_ward_hp'],
                'message' => "Đã oanh kích trận pháp, tiêu hao {$siegeDamage} HP hộ trận (Còn lại: {$newHp} / {$t['max_ward_hp']}).",
            ];
        } catch (Throwable $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }

    /**
     * Harvest Passive Vein Yields into Faction Treasury.
     */
    public function harvestTerritories(int $factionId): array
    {
        $this->pdo->beginTransaction();
        try {
            $stmt = $this->pdo->prepare("
                SELECT * FROM faction_territories 
                WHERE controlling_faction_id = ?
                FOR UPDATE
            ");
            $stmt->execute([$factionId]);
            $territories = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if (empty($territories)) {
                $this->pdo->commit();
                return [
                    'success' => true,
                    'total_gold' => 0,
                    'total_respect' => 0,
                    'message' => "Tông Môn chưa chiếm giữ Linh Mạch nào.",
                ];
            }

            $totalGold = 0;
            $totalRespect = 0;
            $now = time();

            foreach ($territories as $t) {
                $lastHarvest = strtotime($t['last_harvest_at']);
                $hoursElapsed = max(0, ($now - $lastHarvest) / 3600.0);

                if ($hoursElapsed >= 0.01) { // Min 36 seconds elapsed to harvest pro-rata
                    $goldYield = (int)floor($hoursElapsed * (int)$t['spirit_yield_rate']);
                    $respectYield = (int)floor($hoursElapsed * (int)$t['respect_yield_rate']);

                    $totalGold += $goldYield;
                    $totalRespect += $respectYield;

                    $this->pdo->prepare("UPDATE faction_territories SET last_harvest_at = NOW() WHERE territory_id = ?")
                        ->execute([$t['territory_id']]);
                }
            }

            if ($totalGold > 0 || $totalRespect > 0) {
                // Deposit into treasury and respect
                $this->pdo->prepare("UPDATE factions SET treasury_balance = treasury_balance + ?, respect = respect + ?, version = version + 1 WHERE faction_id = ?")
                    ->execute([$totalGold, $totalRespect, $factionId]);

                // Audit ledger
                if ($totalGold > 0) {
                    $audit = $this->pdo->prepare("
                        INSERT INTO wallet_audit_ledger (source_id, dest_id, gross_amount, tax_amount, net_amount, reference_type, reference_id)
                        VALUES (NULL, NULL, ?, 0, ?, 'territory_harvest', ?)
                    ");
                    $audit->execute([$totalGold, $totalGold, (string)$factionId]);
                }
            }

            $this->pdo->commit();

            return [
                'success' => true,
                'total_gold' => $totalGold,
                'total_respect' => $totalRespect,
                'message' => "Đã thu hoạch sản lượng Linh Mạch: +" . number_format($totalGold) . " 💎 Linh Thạch, +{$totalRespect} Uy Danh.",
            ];
        } catch (Throwable $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }

    /**
     * Get All Territories with controlling faction information.
     */
    public function getTerritories(): array
    {
        $stmt = $this->pdo->query("
            SELECT t.*, f.name as faction_name, f.tag as faction_tag
            FROM faction_territories t
            LEFT JOIN factions f ON f.faction_id = t.controlling_faction_id
            ORDER BY t.spirit_yield_rate ASC
        ");
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return [
            'success' => true,
            'territories' => array_map(function ($t) {
                return [
                    'territory_id' => $t['territory_id'],
                    'name' => $t['name'],
                    'controlling_faction_id' => $t['controlling_faction_id'] !== null ? (int)$t['controlling_faction_id'] : null,
                    'controlling_faction_name' => $t['faction_name'],
                    'controlling_faction_tag' => $t['faction_tag'],
                    'spirit_yield_rate' => (int)$t['spirit_yield_rate'],
                    'respect_yield_rate' => (int)$t['respect_yield_rate'],
                    'current_ward_hp' => (int)$t['current_ward_hp'],
                    'max_ward_hp' => (int)$t['max_ward_hp'],
                    'contested_status' => $t['contested_status'],
                ];
            }, $rows),
        ];
    }
}
