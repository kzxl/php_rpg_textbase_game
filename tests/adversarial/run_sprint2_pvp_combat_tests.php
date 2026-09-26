<?php

declare(strict_types=1);

/**
 * Sprint 2 Empirical Adversarial Test Suite — PvP Combat FSM, Mutex Lockout & Anti-Grief Mugging.
 *
 * Validates:
 * 1. Concurrent Combat Mutex Lockout (Algorithm 2)
 * 2. Post-Combat Action Resolution Trifecta (Algorithm 2b: Chỉ Điểm, Trọng Thương, Đoạt Bảo)
 * 3. Logarithmic Plunder Model with Anti-Grief Recency Decay (D_grief, P_base)
 * 4. Divine Protection Ward Immunity from Plunder
 * 5. Dynamic Hospital Duration Clamping Model
 * 6. Double-entry Audit Ledger Integrity
 */

require_once __DIR__ . '/../../backend/vendor/autoload.php';

use App\Core\AppBootstrap;
use App\Core\Database;
use App\Models\Player;
use App\Services\PlayerStateService;
use App\Services\PvPCombatService;
use App\Services\EscrowService;

$app = AppBootstrap::boot(dirname(__DIR__, 2) . '/backend');
$pdo = Database::pdo();

echo "====================================================================\n";
echo " SPRINT 2: PVP COMBAT FSM & ANTI-GRIEF MUGGING ADVERSARIAL SUITE    \n";
echo "====================================================================\n\n";

$passed = 0;
$failed = 0;

function assertCheck(bool $condition, string $desc, ?string $detail = null): void
{
    global $passed, $failed;
    if ($condition) {
        $passed++;
        echo "  [PASS] {$desc}\n";
    } else {
        $failed++;
        echo "  [FAIL] {$desc}" . ($detail ? " — Details: {$detail}" : "") . "\n";
    }
}

// Setup dedicated test players
$testAttackerId = 'sprint2_attacker_' . substr(bin2hex(random_bytes(4)), 0, 8);
$testDefenderId = 'sprint2_defender_' . substr(bin2hex(random_bytes(4)), 0, 8);
$testThirdPartyId = 'sprint2_interloper_' . substr(bin2hex(random_bytes(4)), 0, 8);

// Seed players table
$stmtInsert = $pdo->prepare("
    INSERT INTO players (id, username, password_hash, name, gender, level, realm_tier, current_hp, max_hp, gold, xp, xp_to_next, current_area)
    VALUES (?, ?, 'hash', ?, 'male', ?, ?, 5000, 5000, ?, 0, 10000, 'thanh_lam_tran')
    ON DUPLICATE KEY UPDATE current_hp = 5000, gold = VALUES(gold)
");
$stmtInsert->execute([$testAttackerId, 'att_' . $testAttackerId, 'Lý Tiêu Dao', 20, 2, 50000]);
$stmtInsert->execute([$testDefenderId, 'def_' . $testDefenderId, 'Triệu Linh Nhi', 18, 2, 200000]);
$stmtInsert->execute([$testThirdPartyId, 'third_' . $testThirdPartyId, 'Độc Cô Kiếm', 25, 3, 100000]);

$pvpService = new PvPCombatService($pdo);
$stateService = new PlayerStateService($pdo);
$escrowService = new EscrowService($pdo);

// Initialize states
$stateService->getState($testAttackerId);
$stateService->getState($testDefenderId);
$stateService->getState($testThirdPartyId);

// ====================================================================
// SECTION 1: Self-Attack and Invalid State Action Guards
// ====================================================================
echo "▶ Section 1: Pre-Combat Guards & Status Locks\n";

// 1.1 Self-combat guard
try {
    $pvpService->initiateCombat($testAttackerId, $testAttackerId);
    assertCheck(false, "Self-combat rejected");
} catch (\Throwable $e) {
    assertCheck(str_contains($e->getMessage(), 'chính mình'), "Self-combat rejected", $e->getMessage());
}

// 1.2 Hospitalized defender guard
$stateService->hospitalize($testDefenderId, 300, "Testing lock");
try {
    $pvpService->initiateCombat($testAttackerId, $testDefenderId);
    assertCheck(false, "Attacking hospitalized defender blocked");
} catch (\Throwable $e) {
    assertCheck(str_contains($e->getMessage(), 'trọng thương'), "Attacking hospitalized defender blocked", $e->getMessage());
}

// Recover defender for next tests
$pdo->prepare("UPDATE player_states SET status = 'normal', hospital_until = 0 WHERE player_id = ?")->execute([$testDefenderId]);
$pdo->prepare("UPDATE players SET hospital_until = 0 WHERE id = ?")->execute([$testDefenderId]);

// 1.3 Jailed attacker guard
$stateService->imprison($testAttackerId, 300, "Crime test");
try {
    $pvpService->initiateCombat($testAttackerId, $testDefenderId);
    assertCheck(false, "Jailed attacker blocked from initiating combat");
} catch (\Throwable $e) {
    assertCheck(str_contains($e->getMessage(), 'Huyết Lao'), "Jailed attacker blocked from initiating combat", $e->getMessage());
}

// Recover attacker
$pdo->prepare("UPDATE player_states SET status = 'normal', jail_until = 0 WHERE player_id = ?")->execute([$testAttackerId]);

// ====================================================================
// SECTION 2: Combat Mutex Lockout & Concurrency Safety
// ====================================================================
echo "\n▶ Section 2: Combat Mutex Lockout & Concurrency Safety\n";

// Ensure Attacker wins Duel 1 deterministically for mutex and leave tests
$pdo->prepare("UPDATE players SET current_hp = 10000, level = 30 WHERE id = ?")->execute([$testAttackerId]);
$pdo->prepare("UPDATE players SET current_hp = 500, level = 10 WHERE id = ?")->execute([$testDefenderId]);

// Initiate battle between Attacker and Defender
$duel1 = $pvpService->initiateCombat($testAttackerId, $testDefenderId);
assertCheck($duel1['success'] === true, "Duel initiated successfully");
assertCheck(!empty($duel1['session_id']), "Combat session ID created ({$duel1['session_id']})");

// If attacker won, session enters 'pending_action'
if ($duel1['winner'] === 'attacker') {
    assertCheck($duel1['outcome'] === 'pending_action', "Winner enters pending_action phase");
    assertCheck(count($duel1['actions']) === 3, "Trifecta actions returned (3 options)");

    // Verify both player states are locked with active_combat_session_id
    $stA = $stateService->getState($testAttackerId);
    $stD = $stateService->getState($testDefenderId);
    assertCheck($stA['active_combat_session_id'] === $duel1['session_id'], "Attacker state locked with active_combat_session_id");
    assertCheck($stD['active_combat_session_id'] === $duel1['session_id'], "Defender state locked with active_combat_session_id");

    // 2.1 Concurrency Hazard: Third party attempts to attack Defender simultaneously
    try {
        $pvpService->initiateCombat($testThirdPartyId, $testDefenderId);
        assertCheck(false, "Third party concurrent attack on defender rejected");
    } catch (\Throwable $e) {
        assertCheck(str_contains($e->getMessage(), 'huyết chiến') || str_contains($e->getMessage(), 'khác'), 
            "Third party concurrent attack on defender rejected with Mutex Lockout", $e->getMessage());
    }

    // 2.2 Concurrency Hazard: Attacker attempts to initiate another battle before resolving
    try {
        $pvpService->initiateCombat($testAttackerId, $testThirdPartyId);
        assertCheck(false, "Attacker prevented from starting new duel before resolving active one");
    } catch (\Throwable $e) {
        assertCheck(str_contains($e->getMessage(), 'trận chiến khác'), 
            "Attacker prevented from starting new duel before resolving active one", $e->getMessage());
    }

    // ====================================================================
    // SECTION 3: Outcome 1 — Chỉ Điểm (Spar / Leave)
    // ====================================================================
    echo "\n▶ Section 3: Post-Combat Outcome 1 — Chỉ Điểm (Leave / Spar)\n";

    $xpBefore = (int)$pdo->query("SELECT xp FROM players WHERE id = '{$testAttackerId}'")->fetchColumn();

    $resLeave = $pvpService->resolveAction($duel1['session_id'], $testAttackerId, 'leave');
    assertCheck($resLeave['success'] === true, "Chỉ Điểm action resolved successfully");
    assertCheck($resLeave['action_chosen'] === 'leave', "Action recorded as 'leave'");
    assertCheck($resLeave['loot_stolen'] === 0, "Chỉ Điểm yields 0 stolen loot");
    assertCheck($resLeave['hospital_seconds'] >= 30 && $resLeave['hospital_seconds'] <= 60, "Defender hospital is minimal (30-60s, got {$resLeave['hospital_seconds']}s)");

    // Verify Mutex released on both players
    $stA2 = $stateService->getState($testAttackerId);
    $stD2 = $stateService->getState($testDefenderId);
    assertCheck($stA2['active_combat_session_id'] === null, "Attacker combat mutex released");
    assertCheck($stD2['active_combat_session_id'] === null, "Defender combat mutex released");

    // Verify XP and Tâm Cảnh gains
    $xpAfter = (int)$pdo->query("SELECT xp FROM players WHERE id = '{$testAttackerId}'")->fetchColumn();
    assertCheck($xpAfter > $xpBefore, "Victor awarded 100% Cultivation XP (+{$resLeave['xp_gain']} XP)");
} else {
    echo "  [INFO] Defender won initial duel, testing counter-hospital...\n";
    $stA = $stateService->getState($testAttackerId);
    assertCheck($stA['status'] === 'hospital', "Defeated attacker automatically hospitalized on counter-loss");
}

// Reset defender to normal
$pdo->prepare("UPDATE player_states SET status = 'normal', hospital_until = 0, active_combat_session_id = NULL WHERE player_id = ?")->execute([$testDefenderId]);
$pdo->prepare("UPDATE player_states SET status = 'normal', hospital_until = 0, active_combat_session_id = NULL WHERE player_id = ?")->execute([$testAttackerId]);

// ====================================================================
// SECTION 4: Outcome 2 — Trọng Thương (Hospitalize)
// ====================================================================
echo "\n▶ Section 4: Post-Combat Outcome 2 — Trọng Thương (Hospitalize)\n";

// Force attacker high stats to ensure win for testing wound
$pdo->prepare("UPDATE players SET current_hp = 10000, level = 30 WHERE id = ?")->execute([$testAttackerId]);
$pdo->prepare("UPDATE players SET current_hp = 500, level = 10 WHERE id = ?")->execute([$testDefenderId]);

$duel2 = $pvpService->initiateCombat($testAttackerId, $testDefenderId);
assertCheck($duel2['winner'] === 'attacker', "Attacker won configured duel");

$resWound = $pvpService->resolveAction($duel2['session_id'], $testAttackerId, 'wound');
assertCheck($resWound['success'] === true, "Trọng Thương action resolved successfully");
assertCheck($resWound['action_chosen'] === 'wound', "Action recorded as 'wound'");
assertCheck($resWound['loot_stolen'] === 0, "Trọng Thương yields 0 stolen loot");
assertCheck($resWound['hospital_seconds'] >= 600 && $resWound['hospital_seconds'] <= 3600, 
    "Defender hospital duration is severe (600-3600s, got {$resWound['hospital_seconds']}s)");

$defStateWound = $stateService->getState($testDefenderId);
assertCheck($defStateWound['status'] === 'hospital', "Defender transitioned to hospital status");
assertCheck($defStateWound['remaining_hospital_seconds'] >= 590, "Defender hospital countdown is active");

// ====================================================================
// SECTION 5: Outcome 3 — Đoạt Bảo (Mug) & Logarithmic Anti-Grief Model
// ====================================================================
echo "\n▶ Section 5: Post-Combat Outcome 3 — Đoạt Bảo (Logarithmic Anti-Grief Mug)\n";

// Clear hospital for defender
$pdo->prepare("UPDATE player_states SET status = 'normal', hospital_until = 0, active_combat_session_id = NULL WHERE player_id = ?")->execute([$testDefenderId]);
$pdo->prepare("UPDATE players SET gold = 100000 WHERE id = ?")->execute([$testDefenderId]); // 100,000 Linh Thạch
$pdo->prepare("UPDATE players SET gold = 1000 WHERE id = ?")->execute([$testAttackerId]);

$defGoldBefore = (int)$pdo->query("SELECT gold FROM players WHERE id = '{$testDefenderId}'")->fetchColumn();
$attGoldBefore = (int)$pdo->query("SELECT gold FROM players WHERE id = '{$testAttackerId}'")->fetchColumn();

$duel3 = $pvpService->initiateCombat($testAttackerId, $testDefenderId);
$resRob = $pvpService->resolveAction($duel3['session_id'], $testAttackerId, 'rob');

assertCheck($resRob['success'] === true, "Đoạt Bảo action resolved successfully");
assertCheck($resRob['action_chosen'] === 'rob', "Action recorded as 'rob'");
assertCheck($resRob['loot_stolen'] > 0, "Linh Thạch stolen > 0 (stole {$resRob['loot_stolen']} 💎)");

// Mathematical verification: W = 100,000 -> P_base ~ 14.5% -> Expected ~13,000 to ~16,000
assertCheck($resRob['loot_stolen'] >= 10000 && $resRob['loot_stolen'] <= 25000, 
    "Plunder amount aligns with logarithmic curve [10k, 25k] on 100k liquid wealth (got {$resRob['loot_stolen']})");

// Verify audit ledger
$auditStmt = $pdo->prepare("SELECT * FROM wallet_audit_ledger WHERE reference_id = ? AND reference_type = 'pvp_mug'");
$auditStmt->execute([$duel3['session_id']]);
$ledgerRow = $auditStmt->fetch(PDO::FETCH_ASSOC);
assertCheck(!empty($ledgerRow), "Double-entry record logged in wallet_audit_ledger");
assertCheck((int)$ledgerRow['net_amount'] === $resRob['loot_stolen'], "Ledger net amount matches stolen plunder");
assertCheck($ledgerRow['source_id'] === $testDefenderId && $ledgerRow['dest_id'] === $testAttackerId, "Ledger accounts correctly mapped");

// Check wallet balances conservation: Attacker gained exactly what Defender lost
$defGoldAfter = (int)$pdo->query("SELECT gold FROM players WHERE id = '{$testDefenderId}'")->fetchColumn();
$attGoldAfter = (int)$pdo->query("SELECT gold FROM players WHERE id = '{$testAttackerId}'")->fetchColumn();
assertCheck($defGoldBefore - $defGoldAfter === $resRob['loot_stolen'], "Defender wallet deducted exactly loot_stolen");
assertCheck($attGoldAfter - $attGoldBefore === $resRob['loot_stolen'], "Attacker wallet credited exactly loot_stolen");

// ====================================================================
// SECTION 6: Anti-Grief Recency Decay Multiplier (D_grief)
// ====================================================================
echo "\n▶ Section 6: Anti-Grief Recency Decay Multiplier (D_grief)\n";

// Clear hospital on defender to simulate rapid follow-up attack
$pdo->prepare("UPDATE player_states SET status = 'normal', hospital_until = 0, active_combat_session_id = NULL WHERE player_id = ?")->execute([$testDefenderId]);

$duel4 = $pvpService->initiateCombat($testAttackerId, $testDefenderId);
$resRob2 = $pvpService->resolveAction($duel4['session_id'], $testAttackerId, 'rob');

// Secondary mug within seconds should yield drastically reduced plunder due to D_grief
assertCheck($resRob2['loot_stolen'] < ($resRob['loot_stolen'] * 0.3), 
    "Immediate follow-up mug crushed by D_grief recency decay (1st: {$resRob['loot_stolen']}, 2nd: {$resRob2['loot_stolen']})");

// ====================================================================
// SECTION 7: Divine Protection Ward Immunity from Plunder
// ====================================================================
echo "\n▶ Section 7: Divine Protection Ward (90s Shield) Plunder Immunity\n";

// Clear hospital on defender and grant 90s Divine Ward
$now = time();
$pdo->prepare("UPDATE player_states SET status = 'normal', hospital_until = 0, active_combat_session_id = NULL, divine_ward_until = ? WHERE player_id = ?")
    ->execute([$now + 90, $testDefenderId]);

$defGoldPreWard = (int)$pdo->query("SELECT gold FROM players WHERE id = '{$testDefenderId}'")->fetchColumn();

$duel5 = $pvpService->initiateCombat($testAttackerId, $testDefenderId);
$resRobWard = $pvpService->resolveAction($duel5['session_id'], $testAttackerId, 'rob');

assertCheck($resRobWard['loot_stolen'] === 0, "Divine Ward blocks 100% of plunder (stolen = 0)");
assertCheck(str_contains($resRobWard['message'], 'Khiên Càn Khôn'), "Message indicates Càn Khôn Shield protection");

$defGoldPostWard = (int)$pdo->query("SELECT gold FROM players WHERE id = '{$testDefenderId}'")->fetchColumn();
assertCheck($defGoldPreWard === $defGoldPostWard, "Defender gold unchanged when protected by Divine Ward");

// ====================================================================
// SECTION 8: Attacker Counter-Defeat (Loss Model)
// ====================================================================
echo "\n▶ Section 8: Attacker Counter-Defeat (Loss Model)\n";

// Reset both players to normal, but give Defender overwhelming stats
$pdo->prepare("UPDATE player_states SET status = 'normal', hospital_until = 0, active_combat_session_id = NULL, divine_ward_until = 0 WHERE player_id = ?")->execute([$testDefenderId]);
$pdo->prepare("UPDATE player_states SET status = 'normal', hospital_until = 0, active_combat_session_id = NULL, divine_ward_until = 0 WHERE player_id = ?")->execute([$testAttackerId]);

$pdo->prepare("UPDATE players SET current_hp = 100, level = 5 WHERE id = ?")->execute([$testAttackerId]);
$pdo->prepare("UPDATE players SET current_hp = 50000, level = 50 WHERE id = ?")->execute([$testDefenderId]);

$duel6 = $pvpService->initiateCombat($testAttackerId, $testDefenderId);
assertCheck($duel6['success'] === true, "Counter-duel initiated");
assertCheck($duel6['winner'] === 'defender', "Defender counter-attacks and wins duel");
assertCheck($duel6['outcome'] === 'resolved', "Session immediately resolved on counter-defeat");
assertCheck($duel6['lockout_applied_seconds'] >= 150 && $duel6['lockout_applied_seconds'] <= 600, 
    "Attacker lockout duration within loss bounds [150s, 600s] (got {$duel6['lockout_applied_seconds']}s)");

$stALoss = $stateService->getState($testAttackerId);
assertCheck($stALoss['status'] === 'hospital', "Attacker transitioned to hospital status on loss");
assertCheck($stALoss['active_combat_session_id'] === null, "Attacker active combat session released");

// Clean up test data
$pdo->prepare("DELETE FROM wallet_audit_ledger WHERE source_id IN (?, ?) OR dest_id IN (?, ?)")
    ->execute([$testAttackerId, $testDefenderId, $testAttackerId, $testDefenderId]);
$pdo->prepare("DELETE FROM pvp_combat_logs WHERE session_id IN (?, ?, ?, ?, ?, ?)")
    ->execute([$duel1['session_id'], $duel2['session_id'], $duel3['session_id'], $duel4['session_id'], $duel5['session_id'], $duel6['session_id']]);
$pdo->prepare("DELETE FROM pvp_combat_sessions WHERE attacker_id IN (?, ?) OR defender_id IN (?, ?)")
    ->execute([$testAttackerId, $testDefenderId, $testAttackerId, $testDefenderId]);
$pdo->prepare("DELETE FROM player_states WHERE player_id IN (?, ?, ?)")
    ->execute([$testAttackerId, $testDefenderId, $testThirdPartyId]);
$pdo->prepare("DELETE FROM players WHERE id IN (?, ?, ?)")
    ->execute([$testAttackerId, $testDefenderId, $testThirdPartyId]);

echo "\n====================================================================\n";
echo " SPRINT 2 TEST SUMMARY                                              \n";
echo " Total Checks: " . ($passed + $failed) . "\n";
echo " Passed      : {$passed}\n";
echo " Failed      : {$failed}\n";
echo "====================================================================\n";

if ($failed === 0) {
    echo "VERDICT: SPRINT 2 PASSED (100% SUCCESS)\n\n";
    exit(0);
} else {
    echo "VERDICT: SPRINT 2 FAILED WITH {$failed} FAILURES\n\n";
    exit(1);
}
