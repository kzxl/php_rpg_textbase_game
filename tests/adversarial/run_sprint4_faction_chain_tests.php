<?php

declare(strict_types=1);

/**
 * Sprint 4 Empirical Adversarial Test Suite — Factions (Tông Môn), Chaining & Territory Wars.
 *
 * Validates:
 * 1. Faction Creation & Invariant Guards (Section 4.1 & 4.3)
 * 2. Hierarchical RBAC & Role Management (Master, Elder, Deacon, Disciple)
 * 3. Treasury Deposits & Multi-Signature Proposal Dual Confirmation (Section 4.3)
 * 4. Chuỗi Liên Trảm (Chaining) Dynamic Decay, FFM, and Multipliers (Section 4.1)
 * 5. Anti-Dummy Hit Extension Formula (FFM < 0.25 stall protection)
 * 6. Linh Mạch Tranh Đoạt (Territory Warfare) Siege & Occupation (Section 4.2)
 * 7. Passive Vein Yield Harvesting & Double-Entry Ledger Integrity
 */

require_once __DIR__ . '/../../backend/vendor/autoload.php';

use App\Core\AppBootstrap;
use App\Core\Database;
use App\Services\FactionService;
use App\Services\PlayerStateService;

$app = AppBootstrap::boot(dirname(__DIR__, 2) . '/backend');
$pdo = Database::pdo();

echo "====================================================================\n";
echo " SPRINT 4: FACTIONS, CHAINING & TERRITORY WARS ADVERSARIAL SUITE   \n";
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

// --------------------------------------------------------------------
// Setup dedicated test cultivators
// --------------------------------------------------------------------
$leaderId = 'sprint4_leader_' . substr(bin2hex(random_bytes(4)), 0, 8);
$elderId = 'sprint4_elder_' . substr(bin2hex(random_bytes(4)), 0, 8);
$discipleId = 'sprint4_disciple_' . substr(bin2hex(random_bytes(4)), 0, 8);
$rivalId = 'sprint4_rival_' . substr(bin2hex(random_bytes(4)), 0, 8);
$dummyAltId = 'sprint4_dummy_' . substr(bin2hex(random_bytes(4)), 0, 8);

$stmtInsert = $pdo->prepare("
    INSERT INTO players (id, username, password_hash, name, gender, level, realm_tier, current_hp, max_hp, gold, xp, xp_to_next, current_area)
    VALUES (?, ?, 'hash', ?, 'male', ?, ?, 5000, 5000, ?, 0, 10000, 'thanh_lam_tran')
");
$stmtInsert->execute([$leaderId, 'lead_' . $leaderId, 'Tiêu Dao Tử', 30, 3, 500000]);
$stmtInsert->execute([$elderId, 'eld_' . $elderId, 'Vô Nhai Tử', 28, 3, 200000]);
$stmtInsert->execute([$discipleId, 'disc_' . $discipleId, 'Hư Trúc', 15, 2, 50000]);
$stmtInsert->execute([$rivalId, 'riv_' . $rivalId, 'Đinh Xuân Thu', 32, 3, 300000]);
$stmtInsert->execute([$dummyAltId, 'dum_' . $dummyAltId, 'Tiểu Tốt Vô Danh', 1, 1, 100]);

$stateService = new PlayerStateService($pdo);
$factionService = new FactionService($pdo, $stateService);

$stateService->getState($leaderId);
$stateService->getState($elderId);
$stateService->getState($discipleId);
$stateService->getState($rivalId);
$stateService->getState($dummyAltId);

// ====================================================================
// SECTION 1: Faction Creation Guards & Establishment
// ====================================================================
echo "▶ Section 1: Faction Creation Invariants & Treasury Lockout\n";

// 1.1 Invalid Name or Tag
try {
    $factionService->createFaction($leaderId, 'AB', 'T');
    assertCheck(false, "Short name/tag rejected");
} catch (InvalidArgumentException $e) {
    assertCheck(true, "Short name/tag rejected by input validator", $e->getMessage());
}

// 1.2 Insufficient Gold
$poorPlayerId = 'sprint4_poor_' . substr(bin2hex(random_bytes(4)), 0, 8);
$stmtInsert->execute([$poorPlayerId, 'poor_' . $poorPlayerId, 'Hàn Sĩ', 10, 1, 5000]);
try {
    $factionService->createFaction($poorPlayerId, 'Hàn Môn Tông', 'HMT');
    assertCheck(false, "Insufficient creation gold rejected");
} catch (RuntimeException $e) {
    assertCheck(str_contains($e->getMessage(), 'Không đủ Linh Thạch'), "Insufficient gold (needs 100k) rejected", $e->getMessage());
}

// 1.3 Successful Faction Creation by Leader
$factionName = "Tiêu Dao Phái " . substr(bin2hex(random_bytes(3)), 0, 6);
$factionTag = "TD" . substr(bin2hex(random_bytes(2)), 0, 4);

$goldBefore = (int)$pdo->query("SELECT gold FROM players WHERE id = '{$leaderId}'")->fetchColumn();
$createRes = $factionService->createFaction($leaderId, $factionName, $factionTag, "Bắc Minh Thần Công, Tiêu Dao Bát Hoang");
assertCheck($createRes['success'] === true, "Faction successfully founded");
$factionId = $createRes['faction_id'];

// Verify 100k gold deducted from leader wallet
$goldAfter = (int)$pdo->query("SELECT gold FROM players WHERE id = '{$leaderId}'")->fetchColumn();
assertCheck($goldBefore - $goldAfter === 100000, "Creation fee (100,000 Linh Thạch) debited from leader");

// Verify leader role set to 'master'
$leaderRole = $pdo->query("SELECT role FROM faction_members WHERE player_id = '{$leaderId}'")->fetchColumn();
assertCheck($leaderRole === 'master', "Founder automatically granted 'master' (Tông Chủ) role");

// Verify audit ledger record for faction creation
$creationAudit = $pdo->query("SELECT * FROM wallet_audit_ledger WHERE reference_type = 'faction_creation' AND source_id = '{$leaderId}'")->fetch(PDO::FETCH_ASSOC);
assertCheck($creationAudit !== false, "Double-entry audit record logged for faction creation");
assertCheck((int)$creationAudit['gross_amount'] === 100000, "Audit gross amount matches 100,000");

// 1.4 Duplicate name or tag rejected
try {
    $factionService->createFaction($rivalId, $factionName, "RIV");
    assertCheck(false, "Duplicate faction name rejected");
} catch (RuntimeException $e) {
    assertCheck(str_contains($e->getMessage(), 'đã tồn tại'), "Duplicate faction name rejected", $e->getMessage());
}

// 1.5 Founder cannot create another faction
try {
    $factionService->createFaction($leaderId, "Vạn Tiên Tông", "VTT");
    assertCheck(false, "Already-in-faction creation rejected");
} catch (RuntimeException $e) {
    assertCheck(str_contains($e->getMessage(), 'đã gia nhập'), "Already-in-faction player creation rejected", $e->getMessage());
}

// ====================================================================
// SECTION 2: Hierarchical RBAC, Membership & Role Delegation
// ====================================================================
echo "\n▶ Section 2: Membership Management & Hierarchical RBAC\n";

// 2.1 Members join faction
$joinRes1 = $factionService->joinFaction($elderId, $factionId);
$joinRes2 = $factionService->joinFaction($discipleId, $factionId);
assertCheck($joinRes1['success'] === true, "Elder joined faction as initial disciple");
assertCheck($joinRes2['success'] === true, "Disciple joined faction");

// Cannot re-join
try {
    $factionService->joinFaction($elderId, $factionId);
    assertCheck(false, "Re-joining faction rejected");
} catch (RuntimeException $e) {
    assertCheck(str_contains($e->getMessage(), 'đã là thành viên'), "Re-joining faction rejected", $e->getMessage());
}

// 2.2 Role promotion: Master promotes $elderId to 'elder'
$roleRes = $factionService->setMemberRole($leaderId, $elderId, 'elder');
assertCheck($roleRes['success'] === true, "Master promoted member to 'elder'");
$roleElder = $pdo->query("SELECT role FROM faction_members WHERE player_id = '{$elderId}'")->fetchColumn();
assertCheck($roleElder === 'elder', "Member role persisted as 'elder'");

// Non-master cannot change roles
try {
    $factionService->setMemberRole($elderId, $discipleId, 'elder');
    assertCheck(false, "Elder promoting others rejected");
} catch (RuntimeException $e) {
    assertCheck(str_contains($e->getMessage(), 'Chỉ Tông Chủ'), "Elder promoting others rejected (Master only)", $e->getMessage());
}

// 2.3 Hierarchical Kick Permissions:
// Disciple cannot kick anyone
try {
    $factionService->kickMember($discipleId, $elderId);
    assertCheck(false, "Disciple kick attempt rejected");
} catch (RuntimeException $e) {
    assertCheck(str_contains($e->getMessage(), 'không đủ quyền'), "Disciple kick attempt rejected", $e->getMessage());
}

// Elder cannot kick Master or another Elder
try {
    $factionService->kickMember($elderId, $leaderId);
    assertCheck(false, "Elder kicking Master rejected");
} catch (RuntimeException $e) {
    assertCheck(str_contains($e->getMessage(), 'không đủ quyền'), "Elder kicking Master rejected", $e->getMessage());
}

// Elder CAN kick a Disciple
$dummyDisciple = 'sprint4_dumdisc_' . substr(bin2hex(random_bytes(4)), 0, 8);
$stmtInsert->execute([$dummyDisciple, 'dd_' . $dummyDisciple, 'Đệ Tử Phản Nghịch', 5, 1, 1000]);
$factionService->joinFaction($dummyDisciple, $factionId);
$elderKickRes = $factionService->kickMember($elderId, $dummyDisciple);
assertCheck($elderKickRes['success'] === true, "Elder successfully kicked Disciple");

// Master cannot leave without delegating leadership
try {
    $factionService->leaveFaction($leaderId);
    assertCheck(false, "Master leaving without delegating rejected");
} catch (RuntimeException $e) {
    assertCheck(str_contains($e->getMessage(), 'Tông Chủ không thể rời'), "Master leaving without delegating rejected", $e->getMessage());
}

// ====================================================================
// SECTION 3: Treasury Deposits & Multi-Signature Governance
// ====================================================================
echo "\n▶ Section 3: Treasury Deposits & Multi-Signature Governance (Algorithm 4.3)\n";

// 3.1 Member deposits into Treasury
$depositRes = $factionService->depositTreasury($leaderId, 250000); // 250k into treasury
assertCheck($depositRes['success'] === true, "Leader deposited 250,000 Linh Thạch into Treasury");
assertCheck($depositRes['new_treasury_balance'] === 250000, "Treasury balance reflects +250,000");

// Contribution points awarded
$leadContrib = (int)$pdo->query("SELECT contribution_points FROM faction_members WHERE player_id = '{$leaderId}'")->fetchColumn();
assertCheck($leadContrib >= 251000, "Leader contribution points credited (+250,000)");

// Audit ledger for deposit
$depositAudit = $pdo->query("SELECT * FROM wallet_audit_ledger WHERE reference_type = 'faction_deposit' AND source_id = '{$leaderId}'")->fetch(PDO::FETCH_ASSOC);
assertCheck((int)$depositAudit['gross_amount'] === 250000, "Deposit recorded in wallet_audit_ledger");

// 3.2 Low-Value Withdrawal (< 100k): Executed immediately by Elder
$discipleGoldBefore = (int)$pdo->query("SELECT gold FROM players WHERE id = '{$discipleId}'")->fetchColumn();
$lowProp = $factionService->createWithdrawProposal($elderId, $discipleId, 50000, "Phần thưởng lịch luyện");
assertCheck($lowProp['success'] === true, "Low-value proposal created");
assertCheck($lowProp['status'] === 'executed', "Low-value proposal (<100k) executed immediately without multi-sig");

$discipleGoldAfter = (int)$pdo->query("SELECT gold FROM players WHERE id = '{$discipleId}'")->fetchColumn();
assertCheck($discipleGoldAfter - $discipleGoldBefore === 50000, "Disciple received exactly 50,000 Linh Thạch");

$treasuryAfterLow = (int)$pdo->query("SELECT treasury_balance FROM factions WHERE faction_id = {$factionId}")->fetchColumn();
assertCheck($treasuryAfterLow === 200000, "Treasury balance debited to 200,000 (250k - 50k)");

// 3.3 High-Value Withdrawal (>= 100k): Requires Multi-Signature Dual Confirmation
$highProp = $factionService->createWithdrawProposal($elderId, $discipleId, 150000, "Trang bị Hộ Tông Đại Trận");
assertCheck($highProp['success'] === true, "High-value proposal created");
assertCheck($highProp['status'] === 'pending', "High-value proposal (150k >= 100k) placed in 'pending' status");
$propId = $highProp['proposal_id'];

// Proposer cannot approve their own proposal twice
try {
    $factionService->approveWithdrawProposal($elderId, $propId);
    assertCheck(false, "Proposer approving again rejected");
} catch (RuntimeException $e) {
    assertCheck(str_contains($e->getMessage(), 'ký duyệt'), "Proposer approving again rejected", $e->getMessage());
}

// Disciple cannot approve proposal (RBAC check)
try {
    $factionService->approveWithdrawProposal($discipleId, $propId);
    assertCheck(false, "Disciple approving multi-sig rejected");
} catch (RuntimeException $e) {
    assertCheck(str_contains($e->getMessage(), 'Chỉ Tông Chủ hoặc Trưởng Lão'), "Disciple approval rejected (Master/Elder only)", $e->getMessage());
}

// Master signs as 2nd officer -> TRIGGERS DUAL CONFIRMATION EXECUTION!
$discGoldPreHigh = (int)$pdo->query("SELECT gold FROM players WHERE id = '{$discipleId}'")->fetchColumn();
$approveRes = $factionService->approveWithdrawProposal($leaderId, $propId);
assertCheck($approveRes['success'] === true, "Master signed proposal as second officer");
assertCheck($approveRes['status'] === 'executed', "Dual confirmation reached: Proposal automatically executed!");

$discGoldPostHigh = (int)$pdo->query("SELECT gold FROM players WHERE id = '{$discipleId}'")->fetchColumn();
assertCheck($discGoldPostHigh - $discGoldPreHigh === 150000, "Target received 150,000 Linh Thạch upon dual signature");

$treasuryFinal = (int)$pdo->query("SELECT treasury_balance FROM factions WHERE faction_id = {$factionId}")->fetchColumn();
assertCheck($treasuryFinal === 50000, "Treasury balance correctly debited to 50,000 (200k - 150k)");

// Audit ledger row created for multi-sig withdrawal
$multiSigAudit = $pdo->query("SELECT * FROM wallet_audit_ledger WHERE reference_type = 'faction_withdraw' AND reference_id = '{$propId}'")->fetch(PDO::FETCH_ASSOC);
assertCheck((int)$multiSigAudit['gross_amount'] === 150000, "Multi-sig withdrawal recorded in audit ledger");

// ====================================================================
// SECTION 4: Chuỗi Liên Trảm (Chaining) Dynamic Decay & Multipliers
// ====================================================================
echo "\n▶ Section 4: Chuỗi Liên Trảm (Chaining) Mathematical Curves & FFM\n";

// 4.1 Countdown Window Decay Table Verification
assertCheck(FactionService::getChainTimeoutWindow(1) === 300, "Hit 1 window = 300s (5m)");
assertCheck(FactionService::getChainTimeoutWindow(10) === 300, "Hit 10 window = 300s (5m)");
assertCheck(FactionService::getChainTimeoutWindow(11) === 240, "Hit 11 window = 240s (4m)");
assertCheck(FactionService::getChainTimeoutWindow(50) === 240, "Hit 50 window = 240s (4m)");
assertCheck(FactionService::getChainTimeoutWindow(51) === 180, "Hit 51 window = 180s (3m)");
assertCheck(FactionService::getChainTimeoutWindow(100) === 180, "Hit 100 window = 180s (3m)");
assertCheck(FactionService::getChainTimeoutWindow(101) === 150, "Hit 101 window = 150s (2.5m)");
assertCheck(FactionService::getChainTimeoutWindow(250) === 150, "Hit 250 window = 150s (2.5m)");
assertCheck(FactionService::getChainTimeoutWindow(251) === 120, "Hit 251 window = 120s (2m)");
assertCheck(FactionService::getChainTimeoutWindow(500) === 120, "Hit 500 window = 120s (2m)");
assertCheck(FactionService::getChainTimeoutWindow(501) === 90, "Hit 501 window = 90s (1.5m)");
assertCheck(FactionService::getChainTimeoutWindow(1000) === 90, "Hit 1000 window = 90s (1.5m)");
assertCheck(FactionService::getChainTimeoutWindow(1001) === 60, "Hit 1001+ window = 60s (1m)");

// 4.2 Multiplier Milestones Verification
assertCheck(FactionService::getChainMultiplier(1) === 1.00, "Hit 1 multiplier = 1.00x");
assertCheck(FactionService::getChainMultiplier(10) === 2.00, "Milestone Hit 10 = 2.00x");
assertCheck(FactionService::getChainMultiplier(15) === 1.25, "Intermediate Hit 15 = 1.25x");
assertCheck(FactionService::getChainMultiplier(25) === 3.50, "Milestone Hit 25 = 3.50x");
assertCheck(FactionService::getChainMultiplier(50) === 5.00, "Milestone Hit 50 = 5.00x");
assertCheck(FactionService::getChainMultiplier(100) === 7.50, "Milestone Hit 100 = 7.50x");
assertCheck(FactionService::getChainMultiplier(250) === 10.00, "Milestone Hit 250 = 10.00x");
assertCheck(FactionService::getChainMultiplier(500) === 15.00, "Milestone Hit 500 = 15.00x");
assertCheck(FactionService::getChainMultiplier(1000) === 25.00, "Milestone Hit 1000 = 25.00x");
assertCheck(FactionService::getChainMultiplier(2500) === 50.00, "Milestone Hit 2500+ = 50.00x");

// 4.3 Fair Fight Multiplier (FFM) Bounds [0.1, 3.0]
assertCheck(FactionService::calculateFFM(1000, 1000) === 1.0, "Equal stats FFM = 1.00");
assertCheck(FactionService::calculateFFM(1000, 2000) === 2.0, "Stronger defender FFM = 2.00");
assertCheck(FactionService::calculateFFM(1000, 5000) === 3.0, "Over-powered defender FFM clamped to 3.00");
assertCheck(FactionService::calculateFFM(5000, 50) === 0.1, "Under-powered dummy defender FFM clamped to 0.10");

// 4.4 Live Chaining Hit Progression
$hit1 = $factionService->registerChainHit($factionId, $leaderId, $rivalId, 1000, 1000);
assertCheck($hit1['success'] === true, "Chain hit 1 registered");
assertCheck($hit1['hit_count'] === 1, "Hit count is 1");
assertCheck($hit1['multiplier'] === 1.0, "Initial multiplier 1.0x");
assertCheck($hit1['ffm'] === 1.0, "FFM is 1.0x");
assertCheck($hit1['respect_awarded'] === 10, "Base Respect awarded = 10 (10 * 1.0 * 1.0)");

$chainState = $factionService->getActiveChain($factionId);
assertCheck($chainState !== null, "Active chain retrieved");
assertCheck($chainState['current_count'] === 1, "Active chain count is 1");

// Hit 2: Qualifying combat against rival
$hit2 = $factionService->registerChainHit($factionId, $elderId, $rivalId, 1000, 1500);
assertCheck($hit2['hit_count'] === 2, "Hit count incremented to 2");
assertCheck($hit2['ffm'] === 1.5, "FFM for stronger rival is 1.5x");
assertCheck($hit2['respect_awarded'] === 15, "Respect scaled with FFM: 15 (10 * 1.5 * 1.0)");

// 4.5 Anti-Dummy Hit Extension Formula Test (FFM < 0.25 stall protection)
// Hitting level 1 dummy alt ($dummyAltId) with 5000 stats vs 50 stats (FFM = 0.1)
$timeoutBeforeDummy = $hit2['timeout_at'];
$hitDummy = $factionService->registerChainHit($factionId, $leaderId, $dummyAltId, 5000, 50);
assertCheck($hitDummy['ffm'] === 0.1, "Dummy hit FFM correctly crushed to 0.10x");
assertCheck($hitDummy['timeout_at'] <= $timeoutBeforeDummy + 5, 
    "Anti-dummy stall protection: timer extended by at most 5s ({$timeoutBeforeDummy} -> {$hitDummy['timeout_at']})");

// ====================================================================
// SECTION 5: Linh Mạch Tranh Đoạt (Territory Warfare)
// ====================================================================
echo "\n▶ Section 5: Linh Mạch Tranh Đoạt (Territory Wars & Passive Harvesting)\n";

$territories = $factionService->getTerritories();
assertCheck(count($territories['territories']) === 4, "Canonical 4 Spiritual Vein territories exist");

// 5.1 Declare War on Hạ Phẩm Linh Mạch
$haPhamId = 'ha_pham_linh_mach';
$warRes = $factionService->declareTerritoryWar($leaderId, $haPhamId);
assertCheck($warRes['success'] === true, "War declared on Hạ Phẩm Linh Mạch");
assertCheck($warRes['status'] === 'under_attack', "Territory status transitioned to 'under_attack'");

// 5.2 Siege assault on Defensive Ward HP
$wardBefore = (int)$pdo->query("SELECT current_ward_hp FROM faction_territories WHERE territory_id = '{$haPhamId}'")->fetchColumn();
$attackWardRes = $factionService->attackTerritoryWard($leaderId, $haPhamId, 10000);
assertCheck($attackWardRes['success'] === true, "Siege attack damaged barrier");
assertCheck($attackWardRes['ward_hp_remaining'] === $wardBefore - 10000, "Ward HP reduced by 10,000");

// 5.3 Lethal Siege Attack: Captures Territory
$respectBeforeConquer = (int)$pdo->query("SELECT respect FROM factions WHERE faction_id = {$factionId}")->fetchColumn();
$conquerRes = $factionService->attackTerritoryWard($leaderId, $haPhamId, 100000); // Massive overkill damage
assertCheck($conquerRes['success'] === true, "Lethal siege strike executed");
assertCheck($conquerRes['status'] === 'conquered', "Territory conquered!");
assertCheck($conquerRes['controlling_faction_id'] === $factionId, "Territory now controlled by Faction");

// Ward HP restored to max and placed on cooldown
$conqueredTerritory = $pdo->query("SELECT * FROM faction_territories WHERE territory_id = '{$haPhamId}'")->fetch(PDO::FETCH_ASSOC);
assertCheck((int)$conqueredTerritory['current_ward_hp'] === (int)$conqueredTerritory['max_ward_hp'], "Ward HP fully restored to max upon capture");
assertCheck($conqueredTerritory['contested_status'] === 'cooldown', "Territory transitioned to 'cooldown' status");

// Bonus Respect awarded to faction
$respectAfterConquer = (int)$pdo->query("SELECT respect FROM factions WHERE faction_id = {$factionId}")->fetchColumn();
assertCheck($respectAfterConquer - $respectBeforeConquer === 500, "Faction awarded +500 Respect for conquering Linh Mạch");

// 5.4 Harvest Passive Vein Yields
// Simulate 2 hours elapsed since last harvest
$pdo->prepare("UPDATE faction_territories SET last_harvest_at = ? WHERE territory_id = '{$haPhamId}'")
    ->execute([date('Y-m-d H:i:s', time() - 7200)]);

$harvestRes = $factionService->harvestTerritories($factionId);
assertCheck($harvestRes['success'] === true, "Territory yields harvested");
assertCheck($harvestRes['total_gold'] >= 4000, "Passive Linh Thạch harvested (~4,000 for 2h at 2,000/hr, got {$harvestRes['total_gold']})");
assertCheck($harvestRes['total_respect'] >= 10, "Passive Respect harvested (~10 for 2h at 5/hr, got {$harvestRes['total_respect']})");

// Audit ledger for territory harvest
$harvestAudit = $pdo->query("SELECT * FROM wallet_audit_ledger WHERE reference_type = 'territory_harvest' AND reference_id = '{$factionId}'")->fetch(PDO::FETCH_ASSOC);
assertCheck($harvestAudit !== false, "Territory harvest logged in wallet_audit_ledger");

// ====================================================================
// SECTION 6: Cleanup Test Data
// ====================================================================
$pdo->prepare("DELETE FROM wallet_audit_ledger WHERE source_id IN (?, ?, ?, ?, ?) OR dest_id IN (?, ?, ?, ?, ?) OR reference_id = ?")
    ->execute([$leaderId, $elderId, $discipleId, $rivalId, $dummyAltId, $leaderId, $elderId, $discipleId, $rivalId, $dummyAltId, (string)$factionId]);
$pdo->prepare("UPDATE faction_territories SET controlling_faction_id = NULL, contested_status = 'peaceful' WHERE territory_id = '{$haPhamId}'")->execute();
$pdo->prepare("DELETE FROM faction_chains WHERE faction_id = ?")->execute([$factionId]);
$pdo->prepare("DELETE FROM faction_treasury_proposals WHERE faction_id = ?")->execute([$factionId]);
$pdo->prepare("DELETE FROM faction_members WHERE faction_id = ?")->execute([$factionId]);
$pdo->prepare("DELETE FROM factions WHERE faction_id = ?")->execute([$factionId]);
$pdo->prepare("DELETE FROM player_states WHERE player_id IN (?, ?, ?, ?, ?, ?)")
    ->execute([$leaderId, $elderId, $discipleId, $rivalId, $dummyAltId, $poorPlayerId]);
$pdo->prepare("DELETE FROM players WHERE id IN (?, ?, ?, ?, ?, ?)")
    ->execute([$leaderId, $elderId, $discipleId, $rivalId, $dummyAltId, $poorPlayerId]);

echo "\n====================================================================\n";
echo " SPRINT 4 TEST SUMMARY                                              \n";
echo " Total Checks: " . ($passed + $failed) . "\n";
echo " Passed      : {$passed}\n";
echo " Failed      : {$failed}\n";
echo "====================================================================\n";

if ($failed === 0) {
    echo "VERDICT: SPRINT 4 PASSED (100% SUCCESS)\n\n";
    exit(0);
} else {
    echo "VERDICT: SPRINT 4 FAILED WITH {$failed} FAILURES\n\n";
    exit(1);
}
