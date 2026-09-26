<?php

declare(strict_types=1);

namespace App\Services;

use App\Core\CombatEngine;
use App\Core\Database;
use App\Models\Player;
use InvalidArgumentException;
use PDO;
use RuntimeException;
use Throwable;

/**
 * PvPCombatService — Production Concurrency-Safe PvP Combat FSM & Post-Combat Trifecta.
 *
 * Implements Algorithm 2 & 2b from docs/MULTIPLAYER_ARCHITECTURE_SPEC.md:
 * - Ephemeral Mutex & Pessimistic Row Locking in Lexicographical Order.
 * - Stateful 2-Phase Combat FSM ('in_progress' -> 'pending_action' -> 'resolved').
 * - Outcome Trifecta:
 *   1. Chỉ Điểm (Spar / Leave): 100% XP, +1 Tâm Cảnh, 0 Plunder, Minimal 30-60s hospital.
 *   2. Trọng Thương (Hospitalize): 40% XP, 0 Plunder, Severe 10-60m hospital.
 *   3. Đoạt Bảo (Mug / Plunder): 20% XP, Logarithmic anti-grief plunder, Moderate 2-5m hospital.
 * - Dynamic Hospital Duration Formula: T_hosp = clamp(T_min, T_max, T_base * M_realm * M_overkill * M_delta).
 * - Anti-Grief Plunder Formula: P_base(W) * F_skill * D_grief * Var with 4h rolling decay.
 * - Double-entry audit ledger entries in wallet_audit_ledger.
 */
class PvPCombatService
{
    private PDO $pdo;
    private PlayerStateService $stateService;

    public function __construct(?PDO $pdo = null, ?PlayerStateService $stateService = null)
    {
        $this->pdo = $pdo ?? Database::pdo();
        $this->stateService = $stateService ?? new PlayerStateService($this->pdo);
    }

    /**
     * Helper to generate standard RFC 4122 compliant UUID v4 without external deps.
     */
    public static function generateUuid(): string
    {
        $data = random_bytes(16);
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80);
        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
    }

    /**
     * Phase 1: Initiate PvP Combat Duel between Attacker and Defender.
     *
     * @param string $attackerId
     * @param string $defenderId
     * @return array Combat initiation and simulation result
     */
    public function initiateCombat(string $attackerId, string $defenderId): array
    {
        if ($attackerId === $defenderId) {
            throw new InvalidArgumentException("Không thể tự tấn công chính mình!");
        }

        $now = time();
        $this->pdo->beginTransaction();

        try {
            // 1. Lexicographical lock ordering on player_states to prevent deadlocks (DAG Tier 3)
            $sortedIds = [$attackerId, $defenderId];
            sort($sortedIds, SORT_STRING);

            $stmtStates = $this->pdo->prepare("
                SELECT player_id, status, hospital_until, jail_until, travel_until, active_combat_session_id, divine_ward_until, version
                FROM player_states
                WHERE player_id IN (?, ?)
                ORDER BY player_id ASC
                FOR UPDATE
            ");
            $stmtStates->execute($sortedIds);
            $states = [];
            while ($row = $stmtStates->fetch(PDO::FETCH_ASSOC)) {
                $states[$row['player_id']] = $row;
            }

            // Guarantee baseline existence
            foreach ([$attackerId, $defenderId] as $pid) {
                if (!isset($states[$pid])) {
                    $this->stateService->getState($pid);
                    $stmtSingle = $this->pdo->prepare("SELECT * FROM player_states WHERE player_id = ? FOR UPDATE");
                    $stmtSingle->execute([$pid]);
                    $states[$pid] = $stmtSingle->fetch(PDO::FETCH_ASSOC);
                }
            }

            $attState = $states[$attackerId];
            $defState = $states[$defenderId];

            // 2. Validate Attacker State
            if ($attState['status'] === 'hospital' && (int)$attState['hospital_until'] > $now) {
                throw new RuntimeException("Bạn đang bị trọng thương tịnh dưỡng, không thể xuất chiến!");
            }
            if ($attState['status'] === 'jailed' && (int)$attState['jail_until'] > $now) {
                throw new RuntimeException("Bạn đang bị giam cầm trong Huyết Lao!");
            }
            if ($attState['status'] === 'traveling' && (int)$attState['travel_until'] > $now) {
                throw new RuntimeException("Bạn đang trên đường di chuyển!");
            }

            // 3. Validate Defender State
            if ($defState['status'] === 'hospital' && (int)$defState['hospital_until'] > $now) {
                throw new RuntimeException("Đối thủ đang trọng thương tịnh dưỡng, không thể tấn công!");
            }
            if ($defState['status'] === 'jailed' && (int)$defState['jail_until'] > $now) {
                throw new RuntimeException("Đối thủ đang bị giam cầm trong Huyết Lao!");
            }
            if ($defState['status'] === 'traveling' && (int)$defState['travel_until'] > $now) {
                throw new RuntimeException("Đối thủ đang ngao du viễn phương!");
            }

            // 4. Reap or Validate Existing Active Combat Sessions
            foreach ([$attackerId => $attState, $defenderId => $defState] as $pid => $st) {
                if (!empty($st['active_combat_session_id'])) {
                    $sessCheck = $this->pdo->prepare("SELECT session_id, status, action_expires_at FROM pvp_combat_sessions WHERE session_id = ? FOR UPDATE");
                    $sessCheck->execute([$st['active_combat_session_id']]);
                    $activeSess = $sessCheck->fetch(PDO::FETCH_ASSOC);

                    if ($activeSess) {
                        if ($activeSess['status'] === 'resolved' || (int)$activeSess['action_expires_at'] < $now) {
                            // Expired or resolved session -> auto-release
                            $this->pdo->prepare("UPDATE player_states SET active_combat_session_id = NULL WHERE player_id = ?")->execute([$pid]);
                            if ($activeSess['status'] === 'pending_action') {
                                $this->pdo->prepare("UPDATE pvp_combat_sessions SET status = 'expired', action_chosen = 'leave', resolved_at = NOW() WHERE session_id = ?")->execute([$activeSess['session_id']]);
                            }
                        } else {
                            if ($pid === $defenderId) {
                                throw new RuntimeException("Mục tiêu đang trong trận huyết chiến với đạo hữu khác!");
                            }
                            throw new RuntimeException("Bạn đang trong một trận chiến khác chưa giải quyết xong!");
                        }
                    } else {
                        // Orphan session id -> clean up
                        $this->pdo->prepare("UPDATE player_states SET active_combat_session_id = NULL WHERE player_id = ?")->execute([$pid]);
                    }
                }
            }

            // 5. Load Domain Models for Combat Simulation
            $attacker = loadPlayer($attackerId);
            $defender = loadPlayer($defenderId);
            if (!$attacker || !$defender) {
                throw new RuntimeException("Không tìm thấy thông tin một trong hai đấu thủ!");
            }

            if ($attacker->currentArea !== $defender->currentArea) {
                throw new RuntimeException("Hai đấu thủ không ở cùng một khu vực!");
            }

            // 6. Simulate PvP Combat via CombatEngine
            $engine = new CombatEngine();
            $simResult = $engine->simulatePvP($attacker, $defender);
            $winner = $simResult['winner'] ?? 'defender'; // 'attacker' or 'defender'
            $combatLog = $simResult['log'] ?? [];

            $sessionId = self::generateUuid();
            $actionExpiresAt = $now + 60; // 60s decision lease

            if ($winner === 'attacker') {
                // Attacker won -> Enter Phase 2 ('pending_action')
                $sessionStmt = $this->pdo->prepare("
                    INSERT INTO pvp_combat_sessions (
                        session_id, attacker_id, defender_id, status, outcome, action_expires_at, started_at
                    ) VALUES (?, ?, ?, 'pending_action', 'attacker_won', ?, NOW())
                ");
                $sessionStmt->execute([$sessionId, $attackerId, $defenderId, $actionExpiresAt]);

                // Mutex Lockout: both players locked in session until action resolved or 60s lease expires
                $upState = $this->pdo->prepare("UPDATE player_states SET active_combat_session_id = ?, version = version + 1 WHERE player_id = ?");
                $upState->execute([$sessionId, $attackerId]);
                $upState->execute([$sessionId, $defenderId]);

                $outcomeStatus = 'pending_action';
                $hospSeconds = 0;
            } else {
                // Attacker loss (knocked out by defender's counter-attack)
                $hospSeconds = $this->calculateHospitalDuration('loss', $attacker, $defender, 0);

                $sessionStmt = $this->pdo->prepare("
                    INSERT INTO pvp_combat_sessions (
                        session_id, attacker_id, defender_id, status, outcome, action_chosen, lockout_applied_seconds, action_expires_at, started_at, resolved_at
                    ) VALUES (?, ?, ?, 'resolved', 'defender_won', 'leave', ?, ?, NOW(), NOW())
                ");
                $sessionStmt->execute([$sessionId, $attackerId, $defenderId, $hospSeconds, $now]);

                // Hospitalize attacker immediately
                $upAttState = $this->pdo->prepare("
                    UPDATE player_states
                    SET status = 'hospital',
                        hospital_until = ?,
                        hospital_reason = ?,
                        active_combat_session_id = NULL,
                        version = version + 1
                    WHERE player_id = ?
                ");
                $upAttState->execute([$now + $hospSeconds, "Bị {$defender->name} phản đòn trọng thương", $attackerId]);

                // Also update legacy players table hospital_until
                $this->pdo->prepare("UPDATE players SET hospital_until = ? WHERE id = ?")->execute([$now + $hospSeconds, $attackerId]);

                $outcomeStatus = 'resolved';
            }

            // 7. Insert Combat Turn Logs
            $turnStmt = $this->pdo->prepare("
                INSERT INTO pvp_combat_logs (session_id, turn_number, attacker_hp, defender_hp, action_details)
                VALUES (?, ?, ?, ?, ?)
            ");
            foreach ($combatLog as $turnIdx => $logLine) {
                $turnStmt->execute([
                    $sessionId,
                    $turnIdx + 1,
                    $attacker->currentHp,
                    $defender->currentHp,
                    json_encode(['text' => $logLine], JSON_UNESCAPED_UNICODE)
                ]);
            }

            // 8. Event notification
            if (function_exists('addPlayerEvent')) {
                if ($winner === 'attacker') {
                    addPlayerEvent($this->pdo, $defenderId, 'attacked', "⚔️ {$attacker->name} (Lv.{$attacker->level}) đã tấn công và áp đảo bạn!");
                    addPlayerEvent($this->pdo, $attackerId, 'combat_win', "🏆 Bạn đã chiến thắng {$defender->name} (Lv.{$defender->level})! Hãy chọn kết cục.");
                } else {
                    addPlayerEvent($this->pdo, $defenderId, 'mug_defend', "🛡️ {$attacker->name} (Lv.{$attacker->level}) tấn công bạn nhưng bị bạn phản đòn trọng thương!");
                    addPlayerEvent($this->pdo, $attackerId, 'mug_fail', "💀 Tấn công {$defender->name} thất bại! Bị phản sát trọng thương {$hospSeconds}s.");
                }
            }

            $this->pdo->commit();

            return [
                'success' => true,
                'session_id' => $sessionId,
                'winner' => $winner,
                'outcome' => $outcomeStatus,
                'action_expires_at' => $actionExpiresAt,
                'action_expires_in' => max(0, $actionExpiresAt - $now),
                'combat_log' => $combatLog,
                'defender_id' => $defenderId,
                'defender_name' => $defender->name,
                'defender_gold' => $defender->gold,
                'lockout_applied_seconds' => $hospSeconds,
                'actions' => $winner === 'attacker' ? [
                    [
                        'id' => 'leave',
                        'name' => '🚶 Chỉ Điểm (Spar / Leave)',
                        'desc' => 'Thu kiếm vào bao. Nhận 100% Tu Vi XP & +1 Tâm Cảnh. Đối thủ tịnh dưỡng 30-60s.',
                    ],
                    [
                        'id' => 'wound',
                        'name' => '🩸 Trọng Thương (Hospitalize)',
                        'desc' => 'Đoạn tuyệt kinh mạch. Nhận 40% Tu Vi XP & Điểm Chiến Tích Tông Môn. Đối thủ tịnh dưỡng 10-60 phút.',
                    ],
                    [
                        'id' => 'rob',
                        'name' => '💰 Đoạt Bảo (Mug / Plunder)',
                        'desc' => 'Tịch thu linh thạch unbanked (4% - 18% giảm dần chống cày cuốc). Nhận 20% Tu Vi XP. Đối thủ tịnh dưỡng 2-5 phút.',
                    ],
                ] : null,
            ];
        } catch (Throwable $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }

    /**
     * Phase 2: Resolve Post-Combat Action (Chỉ Điểm, Trọng Thương, Đoạt Bảo).
     *
     * @param string $sessionId
     * @param string $victorId
     * @param string $actionChosen 'leave' | 'wound' | 'rob'
     * @return array Resolution details
     */
    public function resolveAction(string $sessionId, string $victorId, string $actionChosen): array
    {
        if (!in_array($actionChosen, ['leave', 'wound', 'rob'], true)) {
            throw new InvalidArgumentException("Hành động kết thúc chiến đấu không hợp lệ!");
        }

        $now = time();
        $this->pdo->beginTransaction();

        try {
            // 1. Lock Combat Session Row (DAG Tier 2)
            $sessStmt = $this->pdo->prepare("
                SELECT session_id, attacker_id, defender_id, status, outcome, action_expires_at
                FROM pvp_combat_sessions
                WHERE session_id = ?
                FOR UPDATE
            ");
            $sessStmt->execute([$sessionId]);
            $session = $sessStmt->fetch(PDO::FETCH_ASSOC);

            if (!$session) {
                throw new RuntimeException("Không tìm thấy phiên giao chiến [{$sessionId}]!");
            }

            if ($session['status'] !== 'pending_action') {
                throw new RuntimeException("Phiên giao chiến đã được quyết định hoặc đã kết thúc!");
            }

            if ($session['attacker_id'] !== $victorId) {
                throw new RuntimeException("Chỉ người chiến thắng mới có quyền chọn hành vi kết thúc!");
            }

            // Auto-resolve to 'leave' if decision lease expired
            if ((int)$session['action_expires_at'] < $now) {
                $actionChosen = 'leave';
            }

            $attackerId = $session['attacker_id'];
            $defenderId = $session['defender_id'];

            // 2. Lock Both Combatant Wallets and States in Lexicographical Order (DAG Tier 3)
            $sortedIds = [$attackerId, $defenderId];
            sort($sortedIds, SORT_STRING);

            $stmtWallets = $this->pdo->prepare("
                SELECT id, name, level, gold, xp, realm_tier
                FROM players
                WHERE id IN (?, ?)
                ORDER BY id ASC
                FOR UPDATE
            ");
            $stmtWallets->execute($sortedIds);
            $players = [];
            while ($p = $stmtWallets->fetch(PDO::FETCH_ASSOC)) {
                $players[$p['id']] = $p;
            }

            $stmtStates = $this->pdo->prepare("
                SELECT player_id, status, hospital_until, active_combat_session_id, divine_ward_until, version
                FROM player_states
                WHERE player_id IN (?, ?)
                ORDER BY player_id ASC
                FOR UPDATE
            ");
            $stmtStates->execute($sortedIds);
            $states = [];
            while ($s = $stmtStates->fetch(PDO::FETCH_ASSOC)) {
                $states[$s['player_id']] = $s;
            }

            $attPlayer = $players[$attackerId];
            $defPlayer = $players[$defenderId];
            $attState = $states[$attackerId];
            $defState = $states[$defenderId];

            $lootStolen = 0;
            $hospDuration = 0;
            $xpGain = 0;
            $message = '';

            // 3. Execute Post-Combat Choice Logic
            switch ($actionChosen) {
                case 'leave': // Chỉ Điểm (Spar / Leave)
                    $hospDuration = mt_rand(30, 60);
                    $xpGain = 100 * max(1, (int)$defPlayer['level']);
                    $message = "🚶 Đã chỉ điểm cho {$defPlayer['name']}. Nhận +{$xpGain} Tu Vi XP & Đạo Tâm an định. Đối thủ tịnh dưỡng {$hospDuration}s.";
                    break;

                case 'wound': // Trọng Thương (Hospitalize)
                    $attObj = loadPlayer($attackerId);
                    $defObj = loadPlayer($defenderId);
                    $hospDuration = $this->calculateHospitalDuration('wound', $attObj, $defObj, 0);
                    $xpGain = 40 * max(1, (int)$defPlayer['level']);
                    $message = "🩸 Đánh trọng thương {$defPlayer['name']}! Phế đi kinh mạch, khiến đối thủ tịnh dưỡng {$hospDuration}s. Nhận +{$xpGain} Tu Vi XP.";
                    break;

                case 'rob': // Đoạt Bảo (Mug / Plunder)
                    $attObj = loadPlayer($attackerId);
                    $defObj = loadPlayer($defenderId);
                    $hospDuration = $this->calculateHospitalDuration('rob', $attObj, $defObj, 0);
                    $xpGain = 20 * max(1, (int)$defPlayer['level']);

                    // Check Divine Protection Ward on defender
                    $isProtectedByWard = ((int)$defState['divine_ward_until'] > $now);

                    if ($isProtectedByWard) {
                        $lootStolen = 0;
                        $message = "🛡️ {$defPlayer['name']} đang được bảo hộ bởi Khiên Càn Khôn! Không thể đoạt bảo. Đối thủ tịnh dưỡng {$hospDuration}s.";
                    } else {
                        // Compute algorithmic plunder with logarithmic anti-grief decay
                        $loserGold = max(0, (int)$defPlayer['gold']);
                        $lootStolen = $this->calculateMugPlunder($loserGold, $attackerId, $defenderId, (int)$defPlayer['realm_tier']);

                        if ($lootStolen > 0) {
                            // Update wallets atomically
                            $this->pdo->prepare("UPDATE players SET gold = gold - ? WHERE id = ?")->execute([$lootStolen, $defenderId]);
                            $this->pdo->prepare("UPDATE players SET gold = gold + ? WHERE id = ?")->execute([$lootStolen, $attackerId]);

                            // Record in wallet_audit_ledger (DAG Tier 5)
                            $audit = $this->pdo->prepare("
                                INSERT INTO wallet_audit_ledger (
                                    source_id, dest_id, gross_amount, tax_amount, net_amount, reference_type, reference_id, metadata
                                ) VALUES (?, ?, ?, 0, ?, 'pvp_mug', ?, ?)
                            ");
                            $meta = json_encode([
                                'victim_gold_before' => $loserGold,
                                'loot_stolen' => $lootStolen,
                                'session_id' => $sessionId,
                            ], JSON_UNESCAPED_UNICODE);
                            $audit->execute([$defenderId, $attackerId, $lootStolen, $lootStolen, $sessionId, $meta]);

                            $message = "💰 Đoạt bảo thành công! Tịch thu +{$lootStolen} Linh Thạch từ {$defPlayer['name']}! Đối thủ tịnh dưỡng {$hospDuration}s.";
                        } else {
                            $message = "💰 {$defPlayer['name']} túi không một đồng, không thu được linh thạch! Đối thủ tịnh dưỡng {$hospDuration}s.";
                        }
                    }
                    break;
            }

            // 4. Apply Hospitalization to Defeated Defender
            $hospReason = match ($actionChosen) {
                'leave' => "Bị {$attPlayer['name']} chỉ điểm (tịnh dưỡng ngắn)",
                'wound' => "Bị {$attPlayer['name']} đánh trọng thương",
                'rob' => "Bị {$attPlayer['name']} đoạt bảo chấn thương",
            };

            $this->pdo->prepare("
                UPDATE player_states
                SET status = 'hospital',
                    hospital_until = ?,
                    hospital_reason = ?,
                    version = version + 1
                WHERE player_id = ?
            ")->execute([$now + $hospDuration, $hospReason, $defenderId]);

            // Update legacy players table
            $this->pdo->prepare("UPDATE players SET hospital_until = ? WHERE id = ?")->execute([$now + $hospDuration, $defenderId]);

            // 5. Award Victor Cultivation XP
            if ($xpGain > 0) {
                $this->pdo->prepare("UPDATE players SET xp = xp + ? WHERE id = ?")->execute([$xpGain, $attackerId]);
            }

            // 6. Release Mutual Combat Session Mutex on both combatants
            $this->pdo->prepare("
                UPDATE player_states
                SET active_combat_session_id = NULL,
                    version = version + 1
                WHERE player_id IN (?, ?)
            ")->execute([$attackerId, $defenderId]);

            // 7. Finalize Combat Session Status
            $this->pdo->prepare("
                UPDATE pvp_combat_sessions
                SET status = 'resolved',
                    action_chosen = ?,
                    loot_stolen = ?,
                    lockout_applied_seconds = ?,
                    resolved_at = NOW()
                WHERE session_id = ?
            ")->execute([$actionChosen, $lootStolen, $hospDuration, $sessionId]);

            // 8. Event Notifications
            if (function_exists('addPlayerEvent')) {
                if ($actionChosen === 'rob') {
                    addPlayerEvent($this->pdo, $defenderId, 'mugged', "💀 {$attPlayer['name']} cướp {$lootStolen} Linh Thạch của bạn!");
                } elseif ($actionChosen === 'wound') {
                    addPlayerEvent($this->pdo, $defenderId, 'wounded', "🩸 {$attPlayer['name']} đánh trọng thương bạn! Tịnh dưỡng {$hospDuration}s!");
                } else {
                    addPlayerEvent($this->pdo, $defenderId, 'attacked', "⚔️ {$attPlayer['name']} luận kiếm chỉ điểm xong thu binh rời đi.");
                }
            }

            $this->pdo->commit();

            // Reload fresh victor player data
            $updatedAttacker = loadPlayer($attackerId);

            return [
                'success' => true,
                'session_id' => $sessionId,
                'action_chosen' => $actionChosen,
                'loot_stolen' => $lootStolen,
                'hospital_seconds' => $hospDuration,
                'xp_gain' => $xpGain,
                'message' => $message,
                'player' => $updatedAttacker ? $updatedAttacker->toArray() : null,
            ];
        } catch (Throwable $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }

    /**
     * Compute Logarithmic Plunder Amount with Anti-Grief Recency Decay.
     * Formula from Section 2.5 of Specification.
     */
    public function calculateMugPlunder(int $liquidGold, string $attackerId, string $victimId, int $victimRealmTier): int
    {
        if ($liquidGold <= 0) {
            return 0;
        }

        // 1. Base Plunder Rate P_base(W): 18% down to 4% as liquid wealth increases
        $ratio = max(1.0, $liquidGold / 10000.0);
        $pBase = 0.18 - (0.035 * log10($ratio));
        $pBase = min(0.18, max(0.04, $pBase));

        // 2. Attacker Larceny Skill Modifier F_skill
        $skillTier = 1;
        $stmtSkill = $this->pdo->prepare("SELECT level FROM player_skills WHERE player_id = ? AND skill_id = 'cuop_boc'");
        $stmtSkill->execute([$attackerId]);
        if ($val = $stmtSkill->fetchColumn()) {
            $skillTier = max(1, min(10, (int)$val));
        }
        $fSkill = 1.0 + (0.05 * ($skillTier - 1));

        // 3. Victim Anti-Grief Recency Decay Multiplier D_grief across rolling 4-hour window
        $stmtHistory = $this->pdo->prepare("
            SELECT COUNT(*) as mug_count, MAX(UNIX_TIMESTAMP(created_at)) as last_mug_time
            FROM wallet_audit_ledger
            WHERE source_id = ?
              AND reference_type = 'pvp_mug'
              AND created_at >= NOW() - INTERVAL 4 HOUR
        ");
        $stmtHistory->execute([$victimId]);
        $hist = $stmtHistory->fetch(PDO::FETCH_ASSOC);

        $nMug = (int)($hist['mug_count'] ?? 0);
        $lastMugTime = (int)($hist['last_mug_time'] ?? 0);
        $tLast = ($lastMugTime > 0) ? max(0, time() - $lastMugTime) : 0;

        if ($nMug === 0) {
            $dGrief = 1.0;
        } else {
            $decayCeiling = 1.0 / (1.0 + (0.85 * $nMug));
            $timeRecovery = 1.0 - exp(-$tLast / 1800.0);
            $dGrief = $decayCeiling * $timeRecovery;
        }

        // 4. Uniform Random variance (0.9 to 1.1)
        $variance = mt_rand(900, 1100) / 1000.0;

        // 5. Hard Cap M_cap = 500,000 * Realm_Tier
        $mCap = 500000 * max(1, $victimRealmTier);

        $plunder = (int)floor($liquidGold * $pBase * $fSkill * $dGrief * $variance);
        $plunder = min($mCap, $plunder);
        $plunder = max(0, min($liquidGold, $plunder));

        return $plunder;
    }

    /**
     * Compute Dynamic Hospital Lockout Duration.
     * Formula from Section 2.6 of Specification:
     * T_hosp = clamp(T_min, T_max, T_base * M_realm * M_overkill * M_delta).
     */
    public function calculateHospitalDuration(string $outcome, Player $attacker, Player $victim, int $excessDamage = 0): int
    {
        // 1. T_base and Clamping Bounds per Outcome
        [$tBase, $tMin, $tMax] = match ($outcome) {
            'leave' => [45, 30, 60],
            'wound' => [1800, 600, 3600],
            'rob' => [180, 120, 300],
            'loss' => [300, 150, 600],
            default => [180, 60, 300],
        };

        // 2. Realm Tier Multiplier M_realm = 1.0 + 0.15 * (RealmTier - 1)
        $victimTier = max(1, (int)$victim->realmTier);
        $mRealm = 1.0 + (0.15 * ($victimTier - 1));

        // 3. Excess Trauma Multiplier M_overkill = clamp(1.0, 1.5, 1.0 + excess / maxHp)
        $mOverkill = 1.0;
        if ($excessDamage > 0 && $victim->maxHp > 0) {
            $mOverkill = min(1.5, max(1.0, 1.0 + ($excessDamage / $victim->maxHp)));
        }

        // 4. Level Disparity Modifier M_delta
        $deltaLevel = $attacker->level - $victim->level;
        if ($deltaLevel > 0) {
            // High level bully attacking lower level: duration reduced to protect victim
            $mDelta = max(0.5, 1.0 - (0.03 * $deltaLevel));
        } elseif ($deltaLevel < 0) {
            // Underdog defeating high-level giant: increased lockout
            $mDelta = min(1.75, 1.0 + (0.05 * abs($deltaLevel)));
        } else {
            $mDelta = 1.0;
        }

        // 5. Final clamped duration
        $duration = (int)round($tBase * $mRealm * $mOverkill * $mDelta);
        return min($tMax, max($tMin, $duration));
    }
}
