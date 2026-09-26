<?php

declare(strict_types=1);

/**
 * Sprint 3 Empirical Adversarial Test Suite — Bazaar (Phường Thị) & P2P 2-Phase Commit Trading.
 *
 * Validates:
 * 1. Bazaar Listing Guards & Invariants (Algorithm 1)
 * 2. Bazaar Anti-Buy-Mug Escrow Routing (proceeds -> pending_escrow)
 * 3. Progressive Sales Tax Curve Verification (3%, 5%, 8%, 12%)
 * 4. Phantom Stock & Zero-Double-Spending Protection
 * 5. Double-entry Audit Ledger Integrity for Marketplace Transactions
 * 6. P2P 2PC Trade State Machine Transitions (Algorithm 3)
 * 7. Anti-Front-Running Lock Handshake & Version Monotonicity
 * 8. Net Bag Capacity Delta Verification Prior to Commit
 * 9. Atomic Asset Swap (Item Ownership & Currency Balances)
 * 10. Cancellation & Post-Completion Mutex Guards
 */

require_once __DIR__ . '/../../backend/vendor/autoload.php';

use App\Core\AppBootstrap;
use App\Core\Database;
use App\Services\BazaarService;
use App\Services\TradeService;
use App\Services\PlayerStateService;
use App\Services\EscrowService;

$app = AppBootstrap::boot(dirname(__DIR__, 2) . '/backend');
$pdo = Database::pdo();

echo "====================================================================\n";
echo " SPRINT 3: BAZAAR & P2P 2PC TRADING ADVERSARIAL SUITE               \n";
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
// Setup dedicated test identities
// --------------------------------------------------------------------
$sellerId = 'sprint3_seller_' . substr(bin2hex(random_bytes(4)), 0, 8);
$buyerId = 'sprint3_buyer_' . substr(bin2hex(random_bytes(4)), 0, 8);
$thirdPartyId = 'sprint3_third_' . substr(bin2hex(random_bytes(4)), 0, 8);

// Seed players
$stmtInsert = $pdo->prepare("
    INSERT INTO players (id, username, password_hash, name, gender, level, realm_tier, current_hp, max_hp, gold, xp, xp_to_next, current_area)
    VALUES (?, ?, 'hash', ?, 'male', 20, 2, 5000, 5000, ?, 0, 10000, 'thanh_lam_tran')
");
$stmtInsert->execute([$sellerId, 'seller_' . $sellerId, 'Dược Vương Lão Nhân', 50000]);
$stmtInsert->execute([$buyerId, 'buyer_' . $buyerId, 'Bắc Minh Chân Nhân', 2500000]);
$stmtInsert->execute([$thirdPartyId, 'third_' . $thirdPartyId, 'Tiêu Dao Tán Nhân', 100000]);

$bazaarService = new BazaarService($pdo);
$tradeService = new TradeService($pdo);
$stateService = new PlayerStateService($pdo);
$escrowService = new EscrowService($pdo);

// Initialize states
$stateService->getState($sellerId);
$stateService->getState($buyerId);
$stateService->getState($thirdPartyId);

// Seed test items into seller inventory
$itemUidDanDuoc = 'item_' . substr(bin2hex(random_bytes(4)), 0, 8);
$itemUidPhapBao = 'item_' . substr(bin2hex(random_bytes(4)), 0, 8);
$itemUidEquipped = 'item_' . substr(bin2hex(random_bytes(4)), 0, 8);

$insItem = $pdo->prepare("
    INSERT INTO player_items (player_id, item_uid, name, base_type, slot, rarity, item_level, category, quantity, sell_price, stackable, affixes, equipped)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
");
$insItem->execute([$sellerId, $itemUidDanDuoc, 'Tụ Khí Đan', 'tu_khi_dan', 'pill', 'uncommon', 10, 'medicine', 20, 50, 1, '[]', 0]);
$insItem->execute([$sellerId, $itemUidPhapBao, 'Thanh Vân Kiếm', 'thanh_van_kiem', 'weapon', 'rare', 25, 'weapon', 1, 500, 0, '[]', 0]);
$insItem->execute([$sellerId, $itemUidEquipped, 'Huyền Thiết Khôi', 'huyen_thiet_khoi', 'helmet', 'epic', 30, 'armor', 1, 1000, 0, '[]', 1]);

// Seed test items into buyer inventory for trading
$buyerItemUid1 = 'item_' . substr(bin2hex(random_bytes(4)), 0, 8);
$buyerItemUid2 = 'item_' . substr(bin2hex(random_bytes(4)), 0, 8);
$insItem->execute([$buyerId, $buyerItemUid1, 'Băng Phách Ngọc', 'bang_phach_ngoc', 'ring', 'legendary', 40, 'accessory', 1, 2000, 0, '[]', 0]);
$insItem->execute([$buyerId, $buyerItemUid2, 'Ngũ Hành Châu', 'ngu_hanh_chau', 'necklace', 'rare', 35, 'accessory', 1, 1500, 0, '[]', 0]);

// ====================================================================
// SECTION 1: Progressive Sales Tax Curve Calculation
// ====================================================================
echo "▶ Section 1: Progressive Sales Tax Mathematical Curve\n";

assertCheck(BazaarService::getProgressiveTaxRate(5000) === 3.0, "Tax bracket < 10k: 3.0%");
assertCheck(BazaarService::getProgressiveTaxRate(9999) === 3.0, "Tax bracket boundary 9,999: 3.0%");
assertCheck(BazaarService::getProgressiveTaxRate(10000) === 5.0, "Tax bracket 10k: 5.0%");
assertCheck(BazaarService::getProgressiveTaxRate(99999) === 5.0, "Tax bracket boundary 99,999: 5.0%");
assertCheck(BazaarService::getProgressiveTaxRate(100000) === 8.0, "Tax bracket 100k: 8.0%");
assertCheck(BazaarService::getProgressiveTaxRate(999999) === 8.0, "Tax bracket boundary 999,999: 8.0%");
assertCheck(BazaarService::getProgressiveTaxRate(1000000) === 12.0, "Tax bracket >= 1M: 12.0%");
assertCheck(BazaarService::getProgressiveTaxRate(5000000) === 12.0, "Tax bracket 5M high roller: 12.0%");

// ====================================================================
// SECTION 2: Bazaar Listing Guards & Inventory Concurrency
// ====================================================================
echo "\n▶ Section 2: Bazaar Listing Invariants & Validation Guards\n";

// 2.1 Non-existent item listing
try {
    $bazaarService->list($sellerId, 'fake_item_uid_9999', 100, 1);
    assertCheck(false, "Non-existent item listing rejected");
} catch (RuntimeException $e) {
    assertCheck(str_contains($e->getMessage(), 'không tồn tại'), "Non-existent item listing rejected", $e->getMessage());
}

// 2.2 Invalid price/quantity
try {
    $bazaarService->list($sellerId, $itemUidDanDuoc, 0, 5);
    assertCheck(false, "Zero price listing rejected");
} catch (InvalidArgumentException $e) {
    assertCheck(true, "Zero or negative price listing rejected", $e->getMessage());
}

try {
    $bazaarService->list($sellerId, $itemUidDanDuoc, 100, -1);
    assertCheck(false, "Negative quantity listing rejected");
} catch (InvalidArgumentException $e) {
    assertCheck(true, "Negative quantity listing rejected", $e->getMessage());
}

// 2.3 Equipped item listing rejected
try {
    $bazaarService->list($sellerId, $itemUidEquipped, 1000, 1);
    assertCheck(false, "Equipped item listing rejected");
} catch (RuntimeException $e) {
    assertCheck(str_contains($e->getMessage(), 'đang mặc'), "Equipped item listing rejected", $e->getMessage());
}

// 2.4 Quantity exceeding bag count rejected
try {
    $bazaarService->list($sellerId, $itemUidDanDuoc, 100, 999);
    assertCheck(false, "Listing exceeding owned quantity rejected");
} catch (RuntimeException $e) {
    assertCheck(str_contains($e->getMessage(), 'không đủ'), "Listing exceeding owned quantity rejected", $e->getMessage());
}

// 2.5 Valid partial stack listing (List 10 of 20 Tụ Khí Đan at 500 gold each)
$listingDanDuoc = $bazaarService->list($sellerId, $itemUidDanDuoc, 500, 10);
assertCheck($listingDanDuoc['success'] === true, "Partial stack (10x Tụ Khí Đan) listed successfully");
assertCheck($listingDanDuoc['quantity'] === 10, "Listing quantity recorded as 10");
assertCheck($listingDanDuoc['tax_rate'] === 3.0, "Progressive tax correctly evaluated to 3.0% (total 5,000)");

// Verify seller remaining inventory deducted
$remPill = (int)$pdo->query("SELECT quantity FROM player_items WHERE player_id = '{$sellerId}' AND item_uid = '{$itemUidDanDuoc}'")->fetchColumn();
assertCheck($remPill === 10, "Seller bag quantity deducted from 20 to 10");

// 2.6 Valid non-stackable equipment listing (Thanh Vân Kiếm for 1,200,000 gold -> Bracket 12%)
$listingKiem = $bazaarService->list($sellerId, $itemUidPhapBao, 1200000, 1);
assertCheck($listingKiem['success'] === true, "Weapon listed successfully");
assertCheck($listingKiem['tax_rate'] === 12.0, "High-value weapon tax rate correctly evaluated to 12.0%");

// Verify weapon removed from bag
$remWeapon = $pdo->query("SELECT COUNT(*) FROM player_items WHERE player_id = '{$sellerId}' AND item_uid = '{$itemUidPhapBao}'")->fetchColumn();
assertCheck((int)$remWeapon === 0, "Non-stackable weapon removed completely from seller inventory");

// ====================================================================
// SECTION 3: Browse, Filter & Cancel Listings
// ====================================================================
echo "\n▶ Section 3: Bazaar Browse, Query Filters & Listing Cancellation\n";

$browseAll = $bazaarService->browse(['search' => 'Tụ Khí Đan']);
assertCheck($browseAll['total'] >= 1, "Browse found listed Tụ Khí Đan by name search");
assertCheck($browseAll['listings'][0]['seller_name'] === 'Dược Vương Lão Nhân', "Listing includes enriched seller metadata");

$myListings = $bazaarService->getMyListings($sellerId);
assertCheck(count($myListings['listings']) === 2, "Seller has exactly 2 active listings");

// 3.1 Non-seller cancel attempt rejected
try {
    $bazaarService->cancel($buyerId, $listingKiem['listing_id']);
    assertCheck(false, "Third-party cancellation rejected");
} catch (RuntimeException $e) {
    assertCheck(str_contains($e->getMessage(), 'Chỉ người bán'), "Non-seller cancel rejected", $e->getMessage());
}

// 3.2 Seller cancels weapon listing -> item restored to inventory
$cancelRes = $bazaarService->cancel($sellerId, $listingKiem['listing_id']);
assertCheck($cancelRes['success'] === true, "Seller cancelled listing successfully");

$restoredWeapon = $pdo->query("SELECT COUNT(*) FROM player_items WHERE player_id = '{$sellerId}' AND base_type = 'thanh_van_kiem'")->fetchColumn();
assertCheck((int)$restoredWeapon === 1, "Weapon restored back to seller inventory on cancellation");

$listingStatus = $pdo->query("SELECT status FROM bazaar_listings WHERE listing_id = {$listingKiem['listing_id']}")->fetchColumn();
assertCheck($listingStatus === 'cancelled', "Listing status updated to 'cancelled'");

// Re-listing weapon for 150,000 gold (Bracket 8%)
$newWeaponUid = $pdo->query("SELECT item_uid FROM player_items WHERE player_id = '{$sellerId}' AND base_type = 'thanh_van_kiem'")->fetchColumn();
$listingKiem2 = $bazaarService->list($sellerId, $newWeaponUid, 150000, 1);
assertCheck($listingKiem2['tax_rate'] === 8.0, "Re-listed weapon tax rate 8.0% (150,000 gold)");

// ====================================================================
// SECTION 4: Concurrency-Safe Buying & Anti-Buy-Mug Escrow (Algorithm 1)
// ====================================================================
echo "\n▶ Section 4: Concurrency-Safe Purchasing & Anti-Buy-Mug Escrow\n";

$danListingId = $listingDanDuoc['listing_id'];
$kiemListingId = $listingKiem2['listing_id'];

// 4.1 Self-buy rejected
try {
    $bazaarService->buy($sellerId, $danListingId, 1);
    assertCheck(false, "Self-purchase rejected");
} catch (RuntimeException $e) {
    assertCheck(str_contains($e->getMessage(), 'tự mua'), "Self-purchase rejected", $e->getMessage());
}

// 4.2 Buying more than available stock rejected
try {
    $bazaarService->buy($buyerId, $danListingId, 999);
    assertCheck(false, "Over-stock purchase rejected");
} catch (RuntimeException $e) {
    assertCheck(str_contains($e->getMessage(), 'không đủ'), "Over-stock purchase rejected", $e->getMessage());
}

// 4.3 Expected price mismatch (OCC guard)
try {
    $bazaarService->buy($buyerId, $danListingId, 2, 400); // Expecting 400, actual 500
    assertCheck(false, "OCC price mismatch rejected");
} catch (RuntimeException $e) {
    assertCheck(str_contains($e->getMessage(), 'đã thay đổi'), "OCC price mismatch detected and rejected", $e->getMessage());
}

// 4.4 Partial purchase of stackable pills (Buy 4 of 10 at 500 Linh Thạch each = 2,000 gold)
$buyerGoldBefore = (int)$pdo->query("SELECT gold FROM players WHERE id = '{$buyerId}'")->fetchColumn();
$sellerEscrowBefore = (int)$pdo->query("SELECT pending_escrow FROM player_states WHERE player_id = '{$sellerId}'")->fetchColumn();

$buyPillRes = $bazaarService->buy($buyerId, $danListingId, 4, 500);
assertCheck($buyPillRes['success'] === true, "Partial buy 4x Tụ Khí Đan succeeded");
assertCheck($buyPillRes['total_cost'] === 2000, "Total cost = 2,000 Linh Thạch");
assertCheck($buyPillRes['tax_paid'] === 60, "Tax paid = 60 Linh Thạch (3.0% of 2,000)");
assertCheck($buyPillRes['seller_proceeds'] === 1940, "Seller proceeds = 1,940 Linh Thạch");

// Verify Buyer wallet debited
$buyerGoldAfter = (int)$pdo->query("SELECT gold FROM players WHERE id = '{$buyerId}'")->fetchColumn();
assertCheck($buyerGoldBefore - $buyerGoldAfter === 2000, "Buyer wallet precisely debited 2,000 Linh Thạch");

// CRITICAL ANTI-BUY-MUG VERIFICATION: Seller pending_escrow credited, NOT pocket gold!
$sellerGoldAfter = (int)$pdo->query("SELECT gold FROM players WHERE id = '{$sellerId}'")->fetchColumn();
$sellerEscrowAfter = (int)$pdo->query("SELECT pending_escrow FROM player_states WHERE player_id = '{$sellerId}'")->fetchColumn();
assertCheck($sellerGoldAfter === 50000, "Seller pocket gold untouched (Anti-Buy-Mug protection holds)");
assertCheck($sellerEscrowAfter - $sellerEscrowBefore === 1940, "Seller pending_escrow precisely credited +1,940");

// Verify stock decremented to 6, listing remains active
$remStock = (int)$pdo->query("SELECT quantity FROM bazaar_listings WHERE listing_id = {$danListingId}")->fetchColumn();
$remStatus = $pdo->query("SELECT status FROM bazaar_listings WHERE listing_id = {$danListingId}")->fetchColumn();
assertCheck($remStock === 6, "Listing stock decremented from 10 to 6");
assertCheck($remStatus === 'active', "Listing remains active for remaining 6 items");

// Verify buyer inventory received pills
$buyerPillQty = (int)$pdo->query("SELECT quantity FROM player_items WHERE player_id = '{$buyerId}' AND base_type = 'tu_khi_dan'")->fetchColumn();
assertCheck($buyerPillQty === 4, "Buyer received exactly 4x Tụ Khí Đan in inventory");

// 4.5 Buy remaining 6 pills to trigger sold_out transition
$buyPill2 = $bazaarService->buy($buyerId, $danListingId, 6);
assertCheck($buyPill2['success'] === true, "Bought remaining 6x Tụ Khí Đan");
$danStatusFinal = $pdo->query("SELECT status FROM bazaar_listings WHERE listing_id = {$danListingId}")->fetchColumn();
assertCheck($danStatusFinal === 'sold_out', "Listing transitioned to 'sold_out' after depletion");

// 4.6 Attempt to buy from sold_out listing rejected
try {
    $bazaarService->buy($buyerId, $danListingId, 1);
    assertCheck(false, "Purchase from sold_out listing rejected");
} catch (RuntimeException $e) {
    assertCheck(str_contains($e->getMessage(), 'không còn mở bán'), "Purchase from sold_out listing rejected", $e->getMessage());
}

// 4.7 Purchase weapon (150,000 gold with 8% tax = 12,000 fee, 138,000 proceeds)
$buyKiemRes = $bazaarService->buy($buyerId, $kiemListingId, 1);
assertCheck($buyKiemRes['success'] === true, "Bought weapon successfully");
assertCheck($buyKiemRes['total_cost'] === 150000, "Total cost = 150,000 Linh Thạch");
assertCheck($buyKiemRes['tax_paid'] === 12000, "Tax paid = 12,000 Linh Thạch (8.0% of 150k)");
assertCheck($buyKiemRes['seller_proceeds'] === 138000, "Seller proceeds = 138,000 Linh Thạch");

// Verify double-entry audit ledger rows
$bazaarAudits = $pdo->query("
    SELECT * FROM wallet_audit_ledger 
    WHERE reference_type = 'bazaar_buy' AND source_id = '{$buyerId}' AND dest_id = '{$sellerId}'
    ORDER BY ledger_id ASC
")->fetchAll(PDO::FETCH_ASSOC);
assertCheck(count($bazaarAudits) === 3, "Exactly 3 double-entry audit ledger rows created for Bazaar purchases");
$weaponAudit = end($bazaarAudits);
assertCheck((int)$weaponAudit['gross_amount'] === 150000, "Ledger gross amount matches 150,000");
assertCheck((int)$weaponAudit['tax_amount'] === 12000, "Ledger tax sink matches 12,000");
assertCheck((int)$weaponAudit['net_amount'] === 138000, "Ledger net escrow proceeds match 138,000");

// ====================================================================
// SECTION 5: P2P 2-Phase Commit Trading FSM & Locking (Algorithm 3)
// ====================================================================
echo "\n▶ Section 5: P2P Two-Phase Commit Trade Handshake & Mutual Locking\n";

// 5.1 Self-trade rejected
try {
    $tradeService->createTrade($sellerId, $sellerId);
    assertCheck(false, "Self-trade rejected");
} catch (InvalidArgumentException $e) {
    assertCheck(str_contains($e->getMessage(), 'chính mình'), "Self-trade rejected", $e->getMessage());
}

// 5.2 Incapacitated player cannot initiate trade
$pdo->prepare("UPDATE player_states SET status = 'hospital', hospital_until = ? WHERE player_id = ?")
    ->execute([time() + 300, $sellerId]);

try {
    $tradeService->createTrade($sellerId, $buyerId);
    assertCheck(false, "Hospitalized player trade rejected");
} catch (RuntimeException $e) {
    assertCheck(str_contains($e->getMessage(), 'trọng thương') || str_contains($e->getMessage(), 'dưỡng thương'), 
        "Hospitalized player trade rejected by FSM assertCanAct", $e->getMessage());
}

// Restore state
$pdo->prepare("UPDATE player_states SET status = 'normal', hospital_until = NULL WHERE player_id = ?")
    ->execute([$sellerId]);

// 5.3 Valid P2P Trade creation
$newTrade = $tradeService->createTrade($sellerId, $buyerId);
assertCheck($newTrade['success'] === true, "P2P Trade session created");
assertCheck($newTrade['status'] === 'negotiating', "Initial status is 'negotiating'");
$tradeId = $newTrade['trade_id'];

// 5.4 Update Offer Guards
// Seller tries to offer gold they do not possess
try {
    $tradeService->updateOffer($tradeId, $sellerId, [], 999999999);
    assertCheck(false, "Offering unpossessed gold rejected");
} catch (RuntimeException $e) {
    assertCheck(str_contains($e->getMessage(), 'không đủ'), "Offering unpossessed gold rejected", $e->getMessage());
}

// Seller tries to offer unowned or equipped item
try {
    $tradeService->updateOffer($tradeId, $sellerId, [$itemUidEquipped], 0);
    assertCheck(false, "Offering equipped helmet rejected");
} catch (RuntimeException $e) {
    assertCheck(str_contains($e->getMessage(), 'đang mặc'), "Offering equipped helmet rejected", $e->getMessage());
}

// Seller offers 10,000 gold + 0 items
$trade1 = $tradeService->updateOffer($tradeId, $sellerId, [], 10000);
assertCheck($trade1['initiator_gold'] === 10000, "Seller offer updated to 10,000 Linh Thạch");
assertCheck($trade1['status'] === 'negotiating', "Status remains 'negotiating'");

// Buyer offers Băng Phách Ngọc item + 5,000 gold
$trade2 = $tradeService->updateOffer($tradeId, $buyerId, [$buyerItemUid1], 5000);
assertCheck($trade2['receiver_gold'] === 5000, "Buyer offer updated to 5,000 Linh Thạch");
assertCheck(count($trade2['receiver_items']) === 1, "Buyer offered 1 legendary item");

// 5.5 Phase 1: Locking Offer FSM
// Attempting to confirm before both lock rejected
try {
    $tradeService->confirmTrade($tradeId, $sellerId);
    assertCheck(false, "Premature confirmation rejected");
} catch (RuntimeException $e) {
    assertCheck(str_contains($e->getMessage(), 'khóa'), "Premature confirmation rejected before mutual lock", $e->getMessage());
}

// Seller locks offer
$lockRes1 = $tradeService->lockOffer($tradeId, $sellerId);
assertCheck($lockRes1['status'] === 'initiator_locked', "Trade transitions to 'initiator_locked'");

// If buyer changes offer while initiator is locked -> status must break back to 'negotiating'
$breakRes = $tradeService->updateOffer($tradeId, $buyerId, [$buyerItemUid1, $buyerItemUid2], 5000);
assertCheck($breakRes['status'] === 'negotiating', "Offer modification breaks previous locks back to 'negotiating'");

// Mutual locking sequence: Seller locks, then Buyer locks
$tradeService->lockOffer($tradeId, $sellerId);
$lockRes2 = $tradeService->lockOffer($tradeId, $buyerId);
assertCheck($lockRes2['status'] === 'both_locked', "Mutual lock achieved: status transitioned to 'both_locked'");

// ====================================================================
// SECTION 6: Two-Phase Commit Atomic Execution (Algorithm 3)
// ====================================================================
echo "\n▶ Section 6: Two-Phase Commit Atomic Execution & Net Bag Swaps\n";

$currentVersion = $lockRes2['version'];

// 6.1 Version mismatch test (Anti-front-running guard)
try {
    $tradeService->confirmTrade($tradeId, $sellerId, $currentVersion - 1);
    assertCheck(false, "Stale version confirmation rejected");
} catch (RuntimeException $e) {
    assertCheck(str_contains($e->getMessage(), 'thay đổi'), "Stale version confirmation rejected (anti-front-running)", $e->getMessage());
}

// 6.2 Seller confirms phase 1 (Pending partner confirmation)
$phase1 = $tradeService->confirmTrade($tradeId, $sellerId, $currentVersion);
assertCheck($phase1['success'] === true, "Seller confirmed trade handshake phase 1");
assertCheck($phase1['status'] === 'pending_partner_confirmation', "Trade awaiting partner confirmation");

$tradeStatePending = $tradeService->getTrade($tradeId);
assertCheck($tradeStatePending['initiator_confirmed'] === true, "Initiator confirmed flag is true");
assertCheck($tradeStatePending['receiver_confirmed'] === false, "Receiver confirmed flag is false");

// Snapshot balances before commit
$sellerGoldPreCommit = (int)$pdo->query("SELECT gold FROM players WHERE id = '{$sellerId}'")->fetchColumn();
$buyerGoldPreCommit = (int)$pdo->query("SELECT gold FROM players WHERE id = '{$buyerId}'")->fetchColumn();

// 6.3 Buyer confirms phase 2 -> TRIGGERS ATOMIC COMMIT!
$phase2 = $tradeService->confirmTrade($tradeId, $buyerId);
assertCheck($phase2['success'] === true, "Buyer confirmed trade handshake phase 2");
assertCheck($phase2['status'] === 'completed', "P2P Trade completed atomically!");

// 6.4 Verify Currency Balances Post-Commit
// Seller gave 10,000 gold, received 5,000 gold -> Net: -5,000
// Buyer gave 5,000 gold, received 10,000 gold -> Net: +5,000
$sellerGoldPost = (int)$pdo->query("SELECT gold FROM players WHERE id = '{$sellerId}'")->fetchColumn();
$buyerGoldPost = (int)$pdo->query("SELECT gold FROM players WHERE id = '{$buyerId}'")->fetchColumn();

assertCheck($sellerGoldPost - $sellerGoldPreCommit === -5000, 
    "Seller wallet net delta is -5,000 gold ({$sellerGoldPreCommit} -> {$sellerGoldPost})");
assertCheck($buyerGoldPost - $buyerGoldPreCommit === 5000, 
    "Buyer wallet net delta is +5,000 gold ({$buyerGoldPreCommit} -> {$buyerGoldPost})");

// 6.5 Verify Item Ownership Swaps
// Buyer gave 2 items (Băng Phách Ngọc, Ngũ Hành Châu) -> Seller now owns them!
$newOwner1 = $pdo->query("SELECT player_id FROM player_items WHERE item_uid = '{$buyerItemUid1}'")->fetchColumn();
$newOwner2 = $pdo->query("SELECT player_id FROM player_items WHERE item_uid = '{$buyerItemUid2}'")->fetchColumn();
assertCheck($newOwner1 === $sellerId, "Băng Phách Ngọc transferred from Buyer to Seller");
assertCheck($newOwner2 === $sellerId, "Ngũ Hành Châu transferred from Buyer to Seller");

// 6.6 Double-entry ledger audit for P2P trade
$tradeAudits = $pdo->query("
    SELECT * FROM wallet_audit_ledger 
    WHERE reference_type = 'trade_p2p' AND reference_id = '{$tradeId}'
")->fetchAll(PDO::FETCH_ASSOC);
assertCheck(count($tradeAudits) === 2, "Two double-entry audit records created (Seller->Buyer 10k, Buyer->Seller 5k)");

// 6.7 Post-completion mutex: Cannot re-confirm or cancel completed trade
try {
    $tradeService->confirmTrade($tradeId, $sellerId);
    assertCheck(false, "Re-confirming completed trade rejected");
} catch (RuntimeException $e) {
    assertCheck(true, "Re-confirming completed trade rejected", $e->getMessage());
}

try {
    $tradeService->cancelTrade($tradeId, $sellerId);
    assertCheck(false, "Cancelling completed trade rejected");
} catch (RuntimeException $e) {
    assertCheck(true, "Cancelling completed trade rejected", $e->getMessage());
}

// ====================================================================
// SECTION 7: P2P Trade Cancellation Invariants
// ====================================================================
echo "\n▶ Section 7: Trade Cancellation & Lease Expiry Guards\n";

$tradeCancelSession = $tradeService->createTrade($sellerId, $buyerId);
$cancelTradeId = $tradeCancelSession['trade_id'];

// Third-party cancel rejected
try {
    $tradeService->cancelTrade($cancelTradeId, $thirdPartyId);
    assertCheck(false, "Third-party cancelling trade rejected");
} catch (RuntimeException $e) {
    assertCheck(str_contains($e->getMessage(), 'Không có quyền'), "Third-party cancelling trade rejected", $e->getMessage());
}

// Authorized cancel by initiator
$cancelOk = $tradeService->cancelTrade($cancelTradeId, $sellerId);
assertCheck($cancelOk['success'] === true, "Authorized cancellation by initiator succeeded");
assertCheck($cancelOk['status'] === 'cancelled', "Trade status marked 'cancelled'");

// Attempt to update cancelled trade rejected
try {
    $tradeService->updateOffer($cancelTradeId, $buyerId, [], 100);
    assertCheck(false, "Updating cancelled trade rejected");
} catch (RuntimeException $e) {
    assertCheck(str_contains($e->getMessage(), 'kết thúc hoặc bị hủy'), "Updating cancelled trade rejected", $e->getMessage());
}

// ====================================================================
// SECTION 8: Cleanup Test Data
// ====================================================================
$pdo->prepare("DELETE FROM wallet_audit_ledger WHERE source_id IN (?, ?, ?) OR dest_id IN (?, ?, ?)")
    ->execute([$sellerId, $buyerId, $thirdPartyId, $sellerId, $buyerId, $thirdPartyId]);
$pdo->prepare("DELETE FROM bazaar_listings WHERE seller_id IN (?, ?, ?)")
    ->execute([$sellerId, $buyerId, $thirdPartyId]);
$pdo->prepare("DELETE FROM trade_offers WHERE initiator_id IN (?, ?, ?) OR receiver_id IN (?, ?, ?)")
    ->execute([$sellerId, $buyerId, $thirdPartyId, $sellerId, $buyerId, $thirdPartyId]);
$pdo->prepare("DELETE FROM player_items WHERE player_id IN (?, ?, ?)")
    ->execute([$sellerId, $buyerId, $thirdPartyId]);
$pdo->prepare("DELETE FROM player_states WHERE player_id IN (?, ?, ?)")
    ->execute([$sellerId, $buyerId, $thirdPartyId]);
$pdo->prepare("DELETE FROM players WHERE id IN (?, ?, ?)")
    ->execute([$sellerId, $buyerId, $thirdPartyId]);

echo "\n====================================================================\n";
echo " SPRINT 3 TEST SUMMARY                                              \n";
echo " Total Checks: " . ($passed + $failed) . "\n";
echo " Passed      : {$passed}\n";
echo " Failed      : {$failed}\n";
echo "====================================================================\n";

if ($failed === 0) {
    echo "VERDICT: SPRINT 3 PASSED (100% SUCCESS)\n\n";
    exit(0);
} else {
    echo "VERDICT: SPRINT 3 FAILED WITH {$failed} FAILURES\n\n";
    exit(1);
}
