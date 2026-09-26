<?php

/**
 * Sprint 1 Empirical Adversarial Test Suite
 * Tests PlayerStateService, EscrowService, FSM transitions, and Database Invariants.
 */

declare(strict_types=1);

require_once __DIR__ . '/../../backend/src/Core/Database.php';
require_once __DIR__ . '/../../backend/src/Services/PlayerStateService.php';
require_once __DIR__ . '/../../backend/src/Services/EscrowService.php';

use App\Core\Database;
use App\Services\PlayerStateService;
use App\Services\EscrowService;

$pdo = Database::connect();
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$totalChecks = 0;
$passedChecks = 0;
$failedChecks = 0;

function assertCheck(bool $condition, string $label, string $details = ''): void {
    global $totalChecks, $passedChecks, $failedChecks;
    $totalChecks++;
    if ($condition) {
        $passedChecks++;
        echo "  [PASS] {$label}\n";
    } else {
        $failedChecks++;
        echo "  [FAIL] {$label}: {$details}\n";
    }
}

echo "====================================================================\n";
echo " SPRINT 1: MULTIPLAYER FSM & ESCROW EMPIRICAL ADVERSARIAL SUITE     \n";
echo "====================================================================\n\n";

$testPlayerId = 'test_multi_sprint1_fsm';

// Clean prior test data
$pdo->exec("DELETE FROM wallet_audit_ledger WHERE source_id = '{$testPlayerId}' OR dest_id = '{$testPlayerId}'");
$pdo->exec("DELETE FROM player_items WHERE player_id = '{$testPlayerId}'");
$pdo->exec("DELETE FROM player_states WHERE player_id = '{$testPlayerId}'");
$pdo->exec("DELETE FROM players WHERE id = '{$testPlayerId}'");

// Create test player
$pdo->exec("
    INSERT INTO players (id, username, password_hash, name, level, current_hp, max_hp, gold, current_stamina, max_stamina)
    VALUES ('{$testPlayerId}', 'test_s1_user', 'hash', 'Kiểm Thử S1', 50, 5000, 5000, 100000, 100, 100)
");

$stateService = new PlayerStateService($pdo);
$escrowService = new EscrowService($pdo);

// -----------------------------------------------------------------------------
// SECTION 1: INITIAL STATE & FSM PERMISSIONS
// -----------------------------------------------------------------------------
echo "▶ Section 1: Initial FSM Baseline & Action Guards\n";
$initialState = $stateService->getState($testPlayerId);

assertCheck($initialState['status'] === 'normal', "Initial status is 'normal'");
assertCheck($initialState['is_locked'] === false, "Initial is_locked is false");
assertCheck($initialState['can_combat'] === true, "Initial can_combat is true");
assertCheck($initialState['can_travel'] === true, "Initial can_travel is true");
assertCheck($initialState['can_trade'] === true, "Initial can_trade is true");
assertCheck($initialState['pending_escrow'] === 0, "Initial pending_escrow is 0");

$canAct = true;
try {
    $stateService->assertCanAct($testPlayerId, 'combat');
} catch (\Throwable $e) {
    $canAct = false;
}
assertCheck($canAct === true, "assertCanAct passes when status is normal");

// -----------------------------------------------------------------------------
// SECTION 2: HOSPITALIZATION & MEDICAL HEALING
// -----------------------------------------------------------------------------
echo "\n▶ Section 2: Hospitalization Lockout & Pill Healing\n";
$stateService->hospitalize($testPlayerId, 600, 'Trọng thương lôi kiếp');
$hospState = $stateService->getState($testPlayerId);

assertCheck($hospState['status'] === 'hospital', "Status transitioned to 'hospital'");
assertCheck($hospState['is_locked'] === true, "is_locked is true while hospitalized");
assertCheck($hospState['can_combat'] === false, "can_combat is blocked while hospitalized");
assertCheck($hospState['can_travel'] === false, "can_travel is blocked while hospitalized");
assertCheck($hospState['remaining_hospital_seconds'] >= 590, "Remaining hospital duration >= 590s");

$actionBlocked = false;
try {
    $stateService->assertCanAct($testPlayerId, 'khiêu chiến');
} catch (\RuntimeException $e) {
    $actionBlocked = true;
}
assertCheck($actionBlocked === true, "assertCanAct throws exception when hospitalized");

// Give test player a healing pill
$pillUid = 'pill_item_' . bin2hex(random_bytes(6));
$pdo->exec("
    INSERT INTO player_items (id, player_id, item_uid, name, base_type, equipped, quantity)
    VALUES ('{$pillUid}', '{$testPlayerId}', 'dai_hoan_dan', 'Đại Hoàn Đan', 'dai_hoan_dan', 0, 1)
");

// Heal using Đại Hoàn Đan (-900s reduction, +300s med cd)
$healResult = $stateService->heal($testPlayerId, 'dai_hoan_dan');
assertCheck($healResult['success'] === true, "Healing pill consumed successfully");
assertCheck($healResult['state']['status'] === 'normal', "Player recovered back to normal status (duration reduced past 0)");
assertCheck($healResult['state']['remaining_med_cd_seconds'] >= 295, "Med cooldown applied (+300s)");

// Verify item was deleted from inventory
$checkPill = $pdo->query("SELECT COUNT(*) FROM player_items WHERE id = '{$pillUid}'")->fetchColumn();
assertCheck((int)$checkPill === 0, "Healing pill deleted from player_items");

// -----------------------------------------------------------------------------
// SECTION 3: IMPRISONMENT & BAIL PROTOCOL
// -----------------------------------------------------------------------------
echo "\n▶ Section 3: Disciplinary Jail & Bail Out Protocol\n";
$stateService->imprison($testPlayerId, 300, 'Vi phạm môn quy');
$jailState = $stateService->getState($testPlayerId);

assertCheck($jailState['status'] === 'jailed', "Status transitioned to 'jailed'");
assertCheck($jailState['is_locked'] === true, "is_locked is true while jailed");
assertCheck($jailState['can_combat'] === false, "can_combat is blocked while jailed");
assertCheck($jailState['can_trade'] === false, "can_trade is blocked while jailed");

$bailResult = $stateService->bail($testPlayerId);
assertCheck($bailResult['success'] === true, "Bail paid successfully");
assertCheck($bailResult['state']['status'] === 'normal', "Status transitioned back to normal after bail");
assertCheck($bailResult['cost'] > 0, "Bail cost calculated based on remaining time ({$bailResult['cost']} Linh Thạch)");

// Verify audit ledger row
$bailAudit = $pdo->query("
    SELECT * FROM wallet_audit_ledger 
    WHERE source_id = '{$testPlayerId}' AND reference_type = 'jail_bail'
    ORDER BY ledger_id DESC LIMIT 1
")->fetch(PDO::FETCH_ASSOC);
assertCheck($bailAudit !== false, "Bail payment logged in wallet_audit_ledger");
assertCheck((int)$bailAudit['gross_amount'] === $bailResult['cost'], "Audit ledger gross amount matches bail cost");

// -----------------------------------------------------------------------------
// SECTION 4: ESCROW MAILBOX & 90s DIVINE PROTECTION WARD
// -----------------------------------------------------------------------------
echo "\n▶ Section 4: Merchant Escrow Mailbox & 90s Divine Protection Ward\n";
// Seller receives 50,000 Linh Thạch from a bazaar sale with 5% tax
$escrowAdd = $escrowService->addEscrow($testPlayerId, 50000, 5.0, 'bazaar_sale', 'listing_test_99');

assertCheck($escrowAdd['gross_amount'] === 50000, "Gross amount is 50,000");
assertCheck($escrowAdd['tax_amount'] === 2500, "5% tax correctly calculated as 2,500");
assertCheck($escrowAdd['net_credited'] === 47500, "Net credited to escrow is 47,500");

$midState = $stateService->getState($testPlayerId);
assertCheck((int)$midState['pending_escrow'] === 47500, "player_states pending_escrow reflects 47,500");

// Claim escrow
$claimRes = $escrowService->claimEscrow($testPlayerId);
assertCheck($claimRes['success'] === true, "claimEscrow succeeds");
assertCheck($claimRes['claimed_amount'] === 47500, "Claimed amount matches pending escrow (47,500)");
assertCheck($claimRes['divine_ward_seconds'] >= 85, "Divine Protection Ward activated for >= 85s");

// Verify double claim prevention
$doubleClaimFailed = false;
try {
    $escrowService->claimEscrow($testPlayerId);
} catch (\RuntimeException $e) {
    $doubleClaimFailed = true;
}
assertCheck($doubleClaimFailed === true, "Secondary claim attempt blocked (0 double-spending)");

$postState = $stateService->getState($testPlayerId);
assertCheck((int)$postState['pending_escrow'] === 0, "pending_escrow reset to 0 after claim");
assertCheck($postState['has_divine_ward'] === true, "has_divine_ward is active");

// Verify audit ledger for claim
$claimAudit = $pdo->query("
    SELECT * FROM wallet_audit_ledger 
    WHERE dest_id = '{$testPlayerId}' AND reference_type = 'escrow_claim'
    ORDER BY ledger_id DESC LIMIT 1
")->fetch(PDO::FETCH_ASSOC);
assertCheck($claimAudit !== false, "Escrow claim recorded in wallet_audit_ledger");
assertCheck((int)$claimAudit['net_amount'] === 47500, "Audit ledger net amount matches claimed amount");

// Clean test player
$pdo->exec("DELETE FROM wallet_audit_ledger WHERE source_id = '{$testPlayerId}' OR dest_id = '{$testPlayerId}'");
$pdo->exec("DELETE FROM player_states WHERE player_id = '{$testPlayerId}'");
$pdo->exec("DELETE FROM players WHERE id = '{$testPlayerId}'");

echo "\n====================================================================\n";
echo " SPRINT 1 TEST SUMMARY                                              \n";
echo " Total Checks: {$totalChecks}\n";
echo " Passed      : {$passedChecks}\n";
echo " Failed      : {$failedChecks}\n";
echo "====================================================================\n";

if ($failedChecks > 0) {
    exit(1);
}
echo "VERDICT: SPRINT 1 PASSED (100% SUCCESS)\n\n";
