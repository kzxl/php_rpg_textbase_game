<?php

/**
 * Adversarial Stress Test: M1 Unequip Logic & HTTP Endpoint
 * 
 * Verifies:
 * - backend/src/Models/Player.php: Player::unequipItem($slot)
 * - backend/src/Features/Inventory/routes.php: POST /api/player/{id}/unequip
 * 
 * Tests:
 * 1. Unequip with free inventory capacity (all standard slots)
 * 2. Unequip when inventory is full (boundary reject & state preservation)
 * 3. Unequip already empty slots & invalid slot names
 * 4. Storage ring capacity overload protection (boundary values & overflow rejection)
 * 5. Full HTTP endpoint stress testing via Slim request handling
 */

require __DIR__ . '/../../backend/vendor/autoload.php';

use App\Core\AppBootstrap;
use App\Core\Database;
use App\Models\Player;
use App\Models\Item;
use Slim\Psr7\Factory\ServerRequestFactory;

$passed = 0;
$failed = 0;
$results = [];

function assertTest(bool $condition, string $testName, string $details = ''): void {
    global $passed, $failed, $results;
    if ($condition) {
        $passed++;
        $results[] = ['status' => 'PASS', 'name' => $testName];
        echo "  \033[32m✔\033[0m {$testName}\n";
    } else {
        $failed++;
        $results[] = ['status' => 'FAIL', 'name' => $testName, 'details' => $details];
        echo "  \033[31m✘\033[0m {$testName}: {$details}\n";
    }
}

echo "\n\033[1m\033[35m====================================================================\033[0m\n";
echo "\033[1m\033[35m  ADVERSARIAL STRESS TEST: UNEQUIP LOGIC & HTTP ENDPOINT            \033[0m\n";
echo "\033[1m\033[35m====================================================================\033[0m\n\n";

$app = AppBootstrap::boot(dirname(__DIR__, 2) . '/backend');
$pdo = Database::connect();

// Helper to create test items
function createTestItem(string $id, string $slot, string $name = 'Test Item', array $affixes = []): Item {
    return new Item(
        id: $id,
        name: $name,
        baseType: $slot === 'ring1' || $slot === 'ring2' ? 'tru_vat_gioi_chi' : ($slot === 'weapon' ? 'kiem' : 'giap'),
        slot: $slot,
        rarity: 'rare',
        affixes: $affixes,
        itemLevel: 5,
        enhanceLevel: 0
    );
}

// ====================================================================
// SECTION 1: DIRECT MODEL LEVEL: Player::unequipItem()
// ====================================================================
echo "\033[1m▶ Section 1: Player::unequipItem Model Stress\033[0m\n";

// 1.1: Free capacity unequip (standard slots)
{
    $player = new Player('Daoist Tester', 'male');
    $player->id = 'unit_tester';
    $player->inventory = [];
    
    $weapon = createTestItem('wpn_01', 'weapon', 'Thanh Long Kiếm', [
        ['stat' => 'strength', 'type' => 'flat', 'value' => 30]
    ]);
    $body = createTestItem('armor_01', 'body', 'Huyền Giáp', [
        ['stat' => 'defense', 'type' => 'flat', 'value' => 25]
    ]);
    $feet = createTestItem('boots_01', 'feet', 'Thần Hành Hài', [
        ['stat' => 'speed', 'type' => 'flat', 'value' => 15]
    ]);

    $player->equipment['weapon'] = $weapon;
    $player->equipment['body'] = $body;
    $player->equipment['feet'] = $feet;
    $player->recalcDerived();

    $statsBefore = $player->getFinalStats();
    assertTest(isset($player->equipment['weapon']), 'Weapon is initially equipped');
    
    // Unequip weapon
    $unequipped = $player->unequipItem('weapon');
    $statsAfter = $player->getFinalStats();

    assertTest($unequipped !== null && $unequipped->id === 'wpn_01', 'unequipItem returns the unequipped weapon');
    assertTest(!isset($player->equipment['weapon']), 'Weapon slot is removed from equipment array');
    assertTest(count($player->inventory) === 1, 'Inventory contains exactly 1 item after unequip');
    assertTest($player->inventory[0]->id === 'wpn_01', 'First inventory item matches unequipped weapon');
    assertTest($statsAfter['strength'] < $statsBefore['strength'], 'Player STR decreases after unequipping weapon');

    // Unequip body
    $unequippedBody = $player->unequipItem('body');
    assertTest($unequippedBody !== null && $unequippedBody->id === 'armor_01', 'unequipItem returns unequipped body armor');
    assertTest(!isset($player->equipment['body']), 'Body slot is removed from equipment array');
    assertTest(count($player->inventory) === 2, 'Inventory contains 2 items');

    // Unequip feet
    $unequippedFeet = $player->unequipItem('feet');
    assertTest($unequippedFeet !== null && $unequippedFeet->id === 'boots_01', 'unequipItem returns unequipped boots');
    assertTest(!isset($player->equipment['feet']), 'Feet slot is removed from equipment array');
    assertTest(count($player->inventory) === 3, 'Inventory contains 3 items');
}

// 1.2: Full inventory unequip rejection (Boundary & State Invariance)
echo "\n\033[1m▶ Section 2: Full Inventory Rejection & State Invariance\033[0m\n";

{
    $player = new Player('Daoist Full', 'male');
    $player->id = 'full_tester';
    $player->inventory = [];

    $weapon = createTestItem('wpn_keep', 'weapon', 'Thần Phong Kiếm');
    $player->equipment['weapon'] = $weapon;
    $player->recalcDerived();

    $maxCap = $player->getMaxInventorySize(); // 20
    assertTest($maxCap === 20, 'Default baseline inventory capacity is 20');

    // Fill inventory to exactly max capacity (20 items)
    for ($i = 0; $i < $maxCap; $i++) {
        $player->inventory[] = createTestItem("dummy_item_{$i}", 'weapon', "Rác {$i}");
    }
    assertTest(count($player->inventory) === 20, 'Inventory is at full capacity (20/20)');

    // Attempt to unequip weapon when inventory is 100% full
    $caughtException = false;
    $exceptionMsg = '';
    try {
        $player->unequipItem('weapon');
    } catch (\Exception $e) {
        $caughtException = true;
        $exceptionMsg = $e->getMessage();
    }

    assertTest($caughtException, 'Throws exception when unequipping with full inventory');
    assertTest($exceptionMsg === 'Túi đồ đã đầy, không thể tháo thêm!', 'Exception message matches exact expected string');
    assertTest(isset($player->equipment['weapon']), 'Weapon is STILL equipped after failed unequip');
    assertTest($player->equipment['weapon']->id === 'wpn_keep', 'Equipped weapon is unchanged');
    assertTest(count($player->inventory) === 20, 'Inventory count did NOT increase (still exactly 20)');

    // Overfill scenario: 22 items in inventory
    $player->inventory[] = createTestItem('overflow_1', 'weapon', 'Rác 21');
    $player->inventory[] = createTestItem('overflow_2', 'weapon', 'Rác 22');
    assertTest(count($player->inventory) === 22, 'Inventory is overfilled (22/20)');

    $caughtOverfill = false;
    try {
        $player->unequipItem('weapon');
    } catch (\Exception $e) {
        $caughtOverfill = true;
    }
    assertTest($caughtOverfill, 'Unequipping with overfilled inventory strictly throws exception');
    assertTest(isset($player->equipment['weapon']), 'Weapon remains safely equipped');
}

// 1.3: Unequipping already empty slots & invalid slot names
echo "\n\033[1m▶ Section 3: Empty Slot & Invalid Slot Unequip\033[0m\n";

{
    $player = new Player('Daoist Empty', 'female');
    $player->id = 'empty_tester';
    $player->inventory = [];
    $player->equipment = []; // All slots empty

    // Unequip empty weapon slot
    $result = $player->unequipItem('weapon');
    assertTest($result === null, 'Unequipping empty weapon slot returns null');
    assertTest(count($player->inventory) === 0, 'Inventory remains empty');

    // Unequip empty body slot
    $resultBody = $player->unequipItem('body');
    assertTest($resultBody === null, 'Unequipping empty body slot returns null');

    // Unequip completely invalid slot name
    $resultInvalid = $player->unequipItem('spaceship');
    assertTest($resultInvalid === null, 'Unequipping non-existent slot name returns null without crashing');

    // Unequip empty string slot
    $resultBlank = $player->unequipItem('');
    assertTest($resultBlank === null, 'Unequipping empty string slot returns null');
}

// 1.4: Storage Ring Capacity Overload & Boundary Protection
echo "\n\033[1m▶ Section 4: Storage Ring Capacity & Overload Protection\033[0m\n";

{
    $player = new Player('Daoist RingMaster', 'male');
    $player->id = 'ring_tester';
    $player->inventory = [];

    // Storage ring providing +10 capacity
    $ring = createTestItem('ring_truvat_01', 'ring1', 'Càn Khôn Giới', [
        ['stat' => 'capacity', 'type' => 'flat', 'value' => 10]
    ]);
    $player->equipment['ring1'] = $ring;
    $player->recalcDerived();

    $capWithRing = $player->getMaxInventorySize();
    assertTest($capWithRing === 30, "Equipping storage ring expands capacity from 20 to 30 (got: {$capWithRing})");

    // Case 1.4.1: Safe unequip with low inventory (15 items)
    for ($i = 0; $i < 15; $i++) {
        $player->inventory[] = createTestItem("dummy_{$i}", 'weapon', "Vật Phẩm {$i}");
    }
    assertTest(count($player->inventory) === 15, 'Inventory has 15 items');

    // Safe unequip: 15 items in bag + 1 ring = 16 <= 20
    $unequippedRing = $player->unequipItem('ring1');
    assertTest($unequippedRing !== null && $unequippedRing->id === 'ring_truvat_01', 'Storage ring successfully unequipped when safe');
    assertTest(!isset($player->equipment['ring1']), 'Ring slot is now empty');
    assertTest(count($player->inventory) === 16, 'Inventory now has 16 items');
    assertTest($player->getMaxInventorySize() === 20, 'Max capacity restored to baseline 20');

    // Case 1.4.2: Boundary check - Exact limit (19 items in bag)
    // Re-equip ring
    $player->equipment['ring1'] = $ring;
    // Set inventory to exactly 19 items
    $player->inventory = [];
    for ($i = 0; $i < 19; $i++) {
        $player->inventory[] = createTestItem("dummy_b19_{$i}", 'weapon');
    }
    assertTest(count($player->inventory) === 19, 'Inventory prepared with exactly 19 items');
    // 19 + 1 = 20 <= 20. Must SUCCEED!
    $boundarySuccess = false;
    try {
        $player->unequipItem('ring1');
        $boundarySuccess = true;
    } catch (\Exception $e) {
        $boundarySuccess = false;
    }
    assertTest($boundarySuccess, 'Unequipping storage ring with exactly 19 items succeeds (19 + 1 = 20 capacity)');
    assertTest(count($player->inventory) === 20, 'Inventory is now exactly at capacity (20/20)');

    // Case 1.4.3: Boundary check - Overload limit (20 items in bag)
    // Re-equip ring
    $player->equipment['ring1'] = $ring;
    // 20 items in bag. If ring unequipped, 20 + 1 = 21 > 20 -> MUST THROW!
    $boundaryThrow = false;
    $boundaryMsg = '';
    try {
        $player->unequipItem('ring1');
    } catch (\Exception $e) {
        $boundaryThrow = true;
        $boundaryMsg = $e->getMessage();
    }
    assertTest($boundaryThrow, 'Unequipping storage ring with 20 items throws overload exception (20 + 1 = 21 > 20)');
    assertTest($boundaryMsg === 'Túi đồ sẽ quá tải nếu tháo giới chỉ này!', 'Overload exception message matches exact string');
    assertTest(isset($player->equipment['ring1']), 'Ring remains safely equipped');

    // Case 1.4.4: Overload with high inventory (25 items in bag)
    for ($i = count($player->inventory); $i < 25; $i++) {
        $player->inventory[] = createTestItem("dummy_high_{$i}", 'weapon');
    }
    assertTest(count($player->inventory) === 25, 'Inventory has 25 items');

    $highOverload = false;
    try {
        $player->unequipItem('ring1');
    } catch (\Exception $e) {
        $highOverload = true;
    }
    assertTest($highOverload, 'Unequipping storage ring with 25 items strictly throws overload exception');
    assertTest(isset($player->equipment['ring1']), 'Ring remains equipped');
}

// ====================================================================
// SECTION 5: FULL HTTP ENDPOINT STRESS: POST /api/player/{id}/unequip
// ====================================================================
echo "\n\033[1m▶ Section 5: HTTP Endpoint Stress Testing\033[0m\n";

$testPlayerId = 'challenger_test_' . bin2hex(random_bytes(4));

try {
    // Setup clean player in DB
    $httpPlayer = new Player('HTTP Challenger', 'male');
    $httpPlayer->id = $testPlayerId;
    $httpPlayer->username = 'http_tester_' . bin2hex(random_bytes(2));
    $httpPlayer->inventory = [];

    $testWeapon = createTestItem('http_wpn', 'weapon', 'Lôi Quang Kiếm');
    $testArmor = createTestItem('http_armor', 'body', 'Bích Thạch Giáp');
    $httpPlayer->equipment['weapon'] = $testWeapon;
    $httpPlayer->equipment['body'] = $testArmor;
    $httpPlayer->recalcDerived();

    savePlayer($testPlayerId, $httpPlayer);

    // Helper to send HTTP requests to Slim app
    $sendUnequipRequest = function(string $playerId, array $body) use ($app) {
        $req = (new ServerRequestFactory())->createServerRequest('POST', "/api/player/{$playerId}/unequip");
        $req->getBody()->write(json_encode($body));
        $req = $req->withHeader('Content-Type', 'application/json');
        $res = $app->handle($req);
        $bodyStr = (string)$res->getBody();
        return [
            'status' => $res->getStatusCode(),
            'json' => json_decode($bodyStr, true) ?? [],
            'raw' => $bodyStr
        ];
    };

    // 5.1: HTTP 200 - Successful unequip with free capacity
    $resp1 = $sendUnequipRequest($testPlayerId, ['slot' => 'weapon']);
    assertTest($resp1['status'] === 200, "HTTP 200 returned for valid unequip (status: {$resp1['status']})");
    assertTest(($resp1['json']['success'] ?? false) === true, 'JSON response has success: true');
    assertTest(str_contains($resp1['json']['message'] ?? '', 'Đã tháo Lôi Quang Kiếm'), 'Response message confirms weapon unequipped');
    assertTest(!isset($resp1['json']['player']['equipment']['weapon']), 'Returned player equipment.weapon is unset');
    
    // Verify persistence in DB
    $reloaded = loadPlayer($testPlayerId);
    assertTest(!isset($reloaded->equipment['weapon']), 'Database reflects weapon unequipped');
    assertTest(count($reloaded->inventory) === 1, 'Database reflects weapon in inventory');

    // 5.2: HTTP 200 - Unequip already empty slot
    $resp2 = $sendUnequipRequest($testPlayerId, ['slot' => 'weapon']);
    assertTest($resp2['status'] === 200, "HTTP 200 returned for empty slot unequip (status: {$resp2['status']})");
    assertTest(($resp2['json']['success'] ?? false) === true, 'JSON response has success: true');
    assertTest(($resp2['json']['message'] ?? '') === 'Ô trang bị trống', 'Message indicates empty slot');

    // 5.3: HTTP 400 - Unequip when inventory is full
    // Fill inventory in DB to 20 items
    $reloaded->inventory = [];
    for ($i = 0; $i < 20; $i++) {
        $reloaded->inventory[] = createTestItem("db_full_{$i}", 'weapon');
    }
    savePlayer($testPlayerId, $reloaded);

    // Attempt to unequip body armor
    $resp3 = $sendUnequipRequest($testPlayerId, ['slot' => 'body']);
    assertTest($resp3['status'] === 400, "HTTP 400 returned when inventory is full (status: {$resp3['status']})");
    assertTest(($resp3['json']['error'] ?? '') === 'Túi đồ đã đầy, không thể tháo thêm!', 'Error message matches full inventory notice');

    // Verify DB integrity: armor MUST still be equipped
    $reloadedAfterFull = loadPlayer($testPlayerId);
    assertTest(isset($reloadedAfterFull->equipment['body']), 'Body armor is STILL equipped in database');
    assertTest(count($reloadedAfterFull->inventory) === 20, 'Inventory in database remained exactly at 20');

    // 5.4: HTTP 400 - Storage ring capacity overload via HTTP
    $ring = createTestItem('http_ring', 'ring1', 'Tu Di Giới Chỉ', [
        ['stat' => 'capacity', 'type' => 'flat', 'value' => 10]
    ]);
    $reloadedAfterFull->equipment['ring1'] = $ring;
    // Add 4 more items -> total 24 items in bag
    for ($i = 0; $i < 4; $i++) {
        $reloadedAfterFull->inventory[] = createTestItem("db_extra_{$i}", 'weapon');
    }
    savePlayer($testPlayerId, $reloadedAfterFull);

    $resp4 = $sendUnequipRequest($testPlayerId, ['slot' => 'ring1']);
    assertTest($resp4['status'] === 400, "HTTP 400 returned when unequipping ring would overload bag (status: {$resp4['status']})");
    assertTest(($resp4['json']['error'] ?? '') === 'Túi đồ sẽ quá tải nếu tháo giới chỉ này!', 'Overload error message in HTTP response');

    // 5.5: HTTP 404 - Non-existent player ID
    $resp5 = $sendUnequipRequest('non_existent_player_xyz999', ['slot' => 'weapon']);
    assertTest($resp5['status'] === 404, "HTTP 404 returned for unknown player (status: {$resp5['status']})");
    assertTest(($resp5['json']['error'] ?? '') === 'Player not found', 'Error indicates Player not found');

    // 5.6: HTTP 200 - Empty slot payload
    $resp6 = $sendUnequipRequest($testPlayerId, []);
    assertTest($resp6['status'] === 200, "HTTP 200 returned for missing slot parameter (status: {$resp6['status']})");
    assertTest(($resp6['json']['message'] ?? '') === 'Ô trang bị trống', 'Message indicates empty slot for blank parameter');

} finally {
    // Teardown: Clean up test player from database
    try {
        $pdo->exec("DELETE FROM player_items WHERE player_id = '{$testPlayerId}'");
        $pdo->exec("DELETE FROM player_skills WHERE player_id = '{$testPlayerId}'");
        $pdo->exec("DELETE FROM players WHERE id = '{$testPlayerId}'");
    } catch (\Throwable $t) {
        // Ignored in cleanup
    }
}

// ====================================================================
// SUMMARY REPORT
// ====================================================================
echo "\n\033[1m\033[35m====================================================================\033[0m\n";
echo "\033[1m\033[35m               UNEQUIP TEST EXECUTION SUMMARY                       \033[0m\n";
echo "\033[1m\033[35m====================================================================\033[0m\n";
echo "  Total Checks Executed : \033[1m" . ($passed + $failed) . "\033[0m\n";
echo "  Passed Checks         : \033[32m\033[1m{$passed}\033[0m\n";
echo "  Failed Checks         : " . ($failed > 0 ? "\033[31m\033[1m{$failed}\033[0m" : "\033[32m0\033[0m") . "\n";
echo "--------------------------------------------------------------------\n";

if ($failed === 0) {
    echo "\033[32m\033[1m  VERDICT: ALL UNEQUIP STRESS TESTS PASSED (100% SUCCESS)\033[0m\n";
    echo "\033[1m\033[35m====================================================================\033[0m\n\n";
    exit(0);
} else {
    echo "\033[31m\033[1m  VERDICT: FAILURES DETECTED IN UNEQUIP ENGINE\033[0m\n";
    echo "\033[1m\033[35m====================================================================\033[0m\n\n";
    exit(1);
}
