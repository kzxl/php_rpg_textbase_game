<?php

/**
 * White-Box Adversarial Backend Suite for M5 (R1 & R2)
 * Verifies Player model, StatEngine, Item, and EnhancementService edge cases.
 */

require_once __DIR__ . '/../../backend/vendor/autoload.php';

use App\Core\AppBootstrap;
use App\Core\Database;
use App\Core\StatEngine;
use App\Models\Player;
use App\Models\Item;
use App\Models\Modifier;
use App\Services\EnhancementService;

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

$app = AppBootstrap::boot(dirname(__DIR__, 2) . '/backend');

echo "\n\033[1m\033[34m====================================================================\033[0m\n";
echo "\033[1m\033[34m  M5 TIER 5 WHITE-BOX ADVERSARIAL BACKEND SUITE (R1 & R2)           \033[0m\n";
echo "\033[1m\033[34m====================================================================\033[0m\n\n";

// --------------------------------------------------------------------
// SECTION B1: Enhancement Level Backend Arithmetic & Overflow Guards
// --------------------------------------------------------------------
echo "\033[1m▶ Section B1: Enhancement Arithmetic & Overflow Guards (Backend)\033[0m\n";

$wpn = new Item(
    id: 'test_wpn_1',
    name: 'Thanh Phong Kiếm',
    baseType: 'kiem',
    slot: 'weapon',
    rarity: 'rare',
    affixes: [['stat' => 'strength', 'type' => 'flat', 'value' => 20]],
    itemLevel: 6,
    enhanceLevel: 0
);

assertTest($wpn->getEnhanceLevel() === 0, 'B1.1: New item starts at enhance level 0');

$wpn->setEnhanceLevel(1);
assertTest($wpn->getEnhanceLevel() === 1, 'B1.2: setEnhanceLevel(1) sets level to 1');

// Test stat scaling at level 1: ilvlScale = floor(6/3) = 2. str = max(4*1, round(1*4*2)) = 8
$mods1 = $wpn->getModifiers();
$enhanceStrMod = null;
foreach ($mods1 as $m) {
    if (str_starts_with($m->source, 'enhance:')) {
        $enhanceStrMod = $m;
        break;
    }
}
assertTest($enhanceStrMod !== null && (int)$enhanceStrMod->value === 8, 'B1.3: Weapon +1 stat bonus equals 8 STR for ilvl 6');

// Boundary transitions in EnhancementService
$cfg0 = EnhancementService::getEnhanceConfig($wpn); // current 1 -> next 2
assertTest($cfg0['canEnhance'] === true && $cfg0['nextLevel'] === 2 && $cfg0['risk'] === 'safe' && $cfg0['stonesRequired'] === 1, 'B1.4: Target +2 is safe risk with 1 stone');

$wpn->setEnhanceLevel(3);
$cfg3 = EnhancementService::getEnhanceConfig($wpn); // next 4
assertTest($cfg3['nextLevel'] === 4 && $cfg3['risk'] === 'safe_fail' && $cfg3['stonesRequired'] === 2 && $cfg3['successRate'] === 80, 'B1.5: Target +4 transitions to safe_fail with 2 stones and 80% rate');

$wpn->setEnhanceLevel(6);
$cfg6 = EnhancementService::getEnhanceConfig($wpn); // next 7
assertTest($cfg6['nextLevel'] === 7 && $cfg6['risk'] === 'downgrade' && $cfg6['stonesRequired'] === 3 && $cfg6['successRate'] === 45, 'B1.6: Target +7 transitions to downgrade risk with 3 stones and 45% rate');

$wpn->setEnhanceLevel(9);
$cfg9 = EnhancementService::getEnhanceConfig($wpn); // next 10
assertTest($cfg9['nextLevel'] === 10 && $cfg9['risk'] === 'downgrade' && $cfg9['stonesRequired'] === 4 && $cfg9['successRate'] === 20, 'B1.7: Target +10 transitions to 4 stones and 20% rate');

$wpn->setEnhanceLevel(12);
$cfg12 = EnhancementService::getEnhanceConfig($wpn); // at max
assertTest($cfg12['canEnhance'] === false && $cfg12['isMaxLevel'] === true && $cfg12['nextLevel'] === 12 && $cfg12['stonesRequired'] === 0, 'B1.8: Target +12 is flagged as max level, cannot enhance further');

// Overflow guard: level 13 and above
$wpn->setEnhanceLevel(13);
assertTest($wpn->getEnhanceLevel() === 12, 'B1.9: Overflow guard clamps setEnhanceLevel(13) strictly to 12');

$wpn->setEnhanceLevel(999);
assertTest($wpn->getEnhanceLevel() === 12, 'B1.10: Extreme overflow setEnhanceLevel(999) clamped strictly to 12');

// Negative level guard
$wpn->setEnhanceLevel(-1);
assertTest($wpn->getEnhanceLevel() === 0, 'B1.11: Negative level setEnhanceLevel(-1) clamped strictly to 0');

$wpn->setEnhanceLevel(-100);
assertTest($wpn->getEnhanceLevel() === 0, 'B1.12: Negative level setEnhanceLevel(-100) clamped strictly to 0');

// Constructor guard
$overflowItem = new Item(
    id: 'ovf_1',
    name: 'Overflow Sword',
    baseType: 'kiem',
    slot: 'weapon',
    rarity: 'epic',
    affixes: [],
    itemLevel: 10,
    enhanceLevel: 15
);
assertTest($overflowItem->getEnhanceLevel() === 12, 'B1.13: Item constructor clamps enhanceLevel 15 to 12');

$negItem = new Item(
    id: 'neg_1',
    name: 'Negative Sword',
    baseType: 'kiem',
    slot: 'weapon',
    rarity: 'epic',
    affixes: [],
    itemLevel: 10,
    enhanceLevel: -5
);
assertTest($negItem->getEnhanceLevel() === 0, 'B1.14: Item constructor clamps enhanceLevel -5 to 0');


// --------------------------------------------------------------------
// SECTION B2: Unequip Slot Validation & Capacity Guards (Backend)
// --------------------------------------------------------------------
echo "\n\033[1m▶ Section B2: Unequip Slot Validation & Capacity Guards (Backend)\033[0m\n";

$player = new Player('Đạo Hữu Test', 'male');
$player->id = 'test_p_unequip';
$player->equipment = [];
$player->inventory = [];

// Empty equipment unequip
$unqEmpty = $player->unequipItem('weapon');
assertTest($unqEmpty === null, 'B2.1: Unequip weapon on empty equipment dictionary returns null without error');

$unqEmptyRing = $player->unequipItem('ring1');
assertTest($unqEmptyRing === null, 'B2.2: Unequip ring1 on empty equipment returns null');

// Unknown / invalid slots
$unqInvalid = $player->unequipItem('invalid_slot_xyz');
assertTest($unqInvalid === null, 'B2.3: Unequip on non-existent slot name returns null');

$unqBlank = $player->unequipItem('');
assertTest($unqBlank === null, 'B2.4: Unequip on empty string slot returns null');

// Equip valid weapon and unequip
$testWpn = new Item(id: 'wpn_test_1', name: 'Test Blade', baseType: 'kiem', slot: 'weapon');
$player->equipment['weapon'] = $testWpn;
$unqWpn = $player->unequipItem('weapon');
assertTest($unqWpn instanceof Item && $unqWpn->getId() === 'wpn_test_1', 'B2.5: Unequipping equipped weapon returns Item object');
assertTest(!isset($player->equipment['weapon']), 'B2.6: Unequipped weapon is removed from equipment dictionary');
assertTest(count($player->inventory) === 1 && $player->inventory[0]->getId() === 'wpn_test_1', 'B2.7: Unequipped weapon is added to inventory');

// Backpack full boundary rejection
$maxInv = $player->getMaxInventorySize();
$player->inventory = [];
for ($i = 0; $i < $maxInv; $i++) {
    $player->inventory[] = new Item(id: "dummy_{$i}", name: "Dummy {$i}", baseType: 'rac', slot: 'misc');
}
$player->equipment['weapon'] = $testWpn;

$threwFull = false;
try {
    $player->unequipItem('weapon');
} catch (\Exception $e) {
    $threwFull = true;
    assertTest(str_contains($e->getMessage(), 'Túi đồ đã đầy'), 'B2.8: Unequip with full backpack throws capacity exception');
}
assertTest($threwFull, 'B2.9: Capacity check prevents unequipping when backpack is full');
assertTest(isset($player->equipment['weapon']), 'B2.10: Weapon remains safely equipped after capacity exception');

// Storage Ring Overload Boundary
$player->inventory = [];
$ring = new Item(
    id: 'ring_cap_10',
    name: 'Trữ Vật Giới Chỉ (+10)',
    baseType: 'tru_vat_gioi_chi',
    slot: 'ring1',
    affixes: [['stat' => 'capacity', 'type' => 'flat', 'value' => 10]]
);
$player->equipment['ring1'] = $ring;
$player->recalcDerived();
$maxInvWithRing = $player->getMaxInventorySize(); // base + 10

// Fill inventory to (maxInvWithRing - 1)
for ($i = 0; $i < $maxInvWithRing - 1; $i++) {
    $player->inventory[] = new Item(id: "inv_item_{$i}", name: "Item {$i}", baseType: 'rac', slot: 'misc');
}

// Removing ring will lose 10 capacity! count (max - 1) + 1 = max, but new max is max - 10!
$threwRing = false;
try {
    $player->unequipItem('ring1');
} catch (\Exception $e) {
    $threwRing = true;
    assertTest(str_contains($e->getMessage(), 'quá tải'), 'B2.11: Unequip storage ring throws when removing it causes overload');
}
assertTest($threwRing, 'B2.12: Storage ring unequip overload prevented');
assertTest(isset($player->equipment['ring1']), 'B2.13: Ring remains equipped after overload prevention');


// --------------------------------------------------------------------
// SECTION B3: Physical Gym Stamina vs Energy Integrity (Backend)
// --------------------------------------------------------------------
echo "\n\033[1m▶ Section B3: Physical Gym Stamina vs Energy Integrity (Backend)\033[0m\n";

$pGym = new Player('Võ Giả Test', 'male');
$pGym->id = 'p_gym_test';
$pGym->currentStamina = 50;
$initialEnergy = $pGym->currentEnergy; // Natural initial energy <= maxEnergy

// Train strength with stamina = 50
$err = $pGym->trainStat('strength', 5);
assertTest($err === null, 'B3.1: trainStat succeeds with 50 stamina');
assertTest($pGym->currentStamina === 45, 'B3.2: currentStamina deducted by exactly 5 (45 remaining)');
assertTest($pGym->currentEnergy === $initialEnergy, 'B3.3: currentEnergy remains 100% untouched after gym training');

// Stamina boundary: exactly 5
$pGym->currentStamina = 5;
$err5 = $pGym->trainStat('defense', 5);
assertTest($err5 === null, 'B3.4: trainStat succeeds when stamina is exactly 5');
assertTest($pGym->currentStamina === 0, 'B3.5: currentStamina drops to exactly 0');
assertTest($pGym->currentEnergy === $initialEnergy, 'B3.6: currentEnergy preserved across training session');

// Stamina boundary: 4 (1 below cost)
$pGym->currentStamina = 4;
$err4 = $pGym->trainStat('speed', 5);
assertTest($err4 !== null && str_contains($err4, 'Không đủ Thể Lực'), 'B3.7: trainStat rejected when stamina is 4 (need 5)');
assertTest($pGym->currentStamina === 4, 'B3.8: currentStamina stays 4 after rejection');
assertTest($pGym->currentEnergy === $initialEnergy, 'B3.9: currentEnergy untouched after rejection');

// Stamina boundary: 0
$pGym->currentStamina = 0;
$err0 = $pGym->trainStat('dexterity', 5);
assertTest($err0 !== null && str_contains($err0, 'Không đủ Thể Lực'), 'B3.10: trainStat rejected when stamina is 0');
assertTest($pGym->currentStamina === 0, 'B3.11: currentStamina stays 0');

// Invalid battle stat rejection
$pGym->currentStamina = 20;
$errInvalid = $pGym->trainStat('magic_power', 5);
assertTest($errInvalid !== null && str_contains($errInvalid, 'không hợp lệ'), 'B3.12: trainStat rejects non-battle stat');
assertTest($pGym->currentStamina === 20, 'B3.13: currentStamina not deducted for invalid stat');

// Hospitalized state rejection
$pHosp = new Player('Thương Binh Test', 'male');
$pHosp->id = 'p_hosp_test';
$pHosp->currentStamina = 50;
$pHosp->hospitalUntil = time() + 120;
$errHosp = $pHosp->trainStat('strength', 5);
assertTest($errHosp !== null && str_contains($errHosp, 'tịnh dưỡng'), 'B3.14: trainStat rejected while player is hospitalized');
assertTest($pHosp->currentStamina === 50, 'B3.15: Stamina untouched during hospitalization rejection');


// --------------------------------------------------------------------
// SECTION B4: MDG Armor Mitigation Formula & Asymptote Cap (Backend)
// --------------------------------------------------------------------
echo "\n\033[1m▶ Section B4: MDG Armor Mitigation Formula & Asymptote Cap (Backend)\033[0m\n";

// Extreme defense (1,000,000)
$mitExt25 = StatEngine::calcDamageReduction(1000000.0, 25.0);
assertTest($mitExt25 === 85.0, 'B4.1: Extreme defense (1,000,000) vs raw 25 strictly capped at 85.0%');

$mitExt75 = StatEngine::calcDamageReduction(1000000.0, 75.0);
assertTest($mitExt75 === 85.0, 'B4.2: Extreme defense (1,000,000) vs raw 75 strictly capped at 85.0%');

$mitExt250 = StatEngine::calcDamageReduction(1000000.0, 250.0);
assertTest($mitExt250 === 85.0, 'B4.3: Extreme defense (1,000,000) vs raw 250 strictly capped at 85.0%');

// Extreme defense (100,000,000)
$mitSuperExt = StatEngine::calcDamageReduction(100000000.0, 250.0);
assertTest($mitSuperExt === 85.0, 'B4.4: Super extreme defense (100,000,000) strictly capped at 85.0%');

// Raw damage 0 (effDmg = max(8.0, 0) = 8.0)
$mitRaw0 = StatEngine::calcDamageReduction(100.0, 0.0);
// 100 / (100 + 5 * 8) = 100 / 140 = 0.714285... -> 71.43%
assertTest($mitRaw0 === 71.43, 'B4.5: Raw damage 0 clamps to 8.0 effDmg without division by zero (71.43%)');

$mitRaw0ExtremeDef = StatEngine::calcDamageReduction(1000000.0, 0.0);
assertTest($mitRaw0ExtremeDef === 85.0, 'B4.6: Raw damage 0 with extreme defense capped at 85.0%');

// Raw damage negative
$mitRawNeg = StatEngine::calcDamageReduction(100.0, -50.0);
assertTest($mitRawNeg === 71.43, 'B4.7: Negative raw damage -50 clamps to 8.0 effDmg (71.43%)');

// Zero & negative defense
$mitDef0 = StatEngine::calcDamageReduction(0.0, 25.0);
assertTest($mitDef0 === 0.0, 'B4.8: Defense 0 returns 0.0% mitigation');

$mitDefNeg = StatEngine::calcDamageReduction(-100.0, 25.0);
assertTest($mitDefNeg === 0.0, 'B4.9: Negative defense -100 returns 0.0% mitigation');


// --------------------------------------------------------------------
// SECTION B5: Evasion Dexterity Formula & Asymptote Cap (Backend)
// --------------------------------------------------------------------
echo "\n\033[1m▶ Section B5: Evasion Dexterity Formula & Asymptote Cap (Backend)\033[0m\n";

// Extreme dexterity (1,000,000)
$dodgeExt10 = StatEngine::calcDodgeChance(1000000.0, 10.0);
assertTest($dodgeExt10 === 35.0, 'B5.1: Extreme dexterity (1,000,000) vs speed 10 strictly capped at 35.0%');

$dodgeExt1000 = StatEngine::calcDodgeChance(1000000.0, 1000.0);
assertTest($dodgeExt1000 === 35.0, 'B5.2: Extreme dexterity (1,000,000) vs speed 1000 strictly capped at 35.0%');

// Extreme dexterity with enemy speed 0 (effSpd = max(1.0, 0) = 1.0)
$dodgeExtSpd0 = StatEngine::calcDodgeChance(1000000.0, 0.0);
assertTest($dodgeExtSpd0 === 35.0, 'B5.3: Extreme dexterity vs enemy speed 0 strictly capped at 35.0%');

// Low dexterity with enemy speed 0
// 10 / (10 + 2.5 * 1.0) = 10 / 12.5 = 80.0% -> capped at 35.0%
$dodgeLowSpd0 = StatEngine::calcDodgeChance(10.0, 0.0);
assertTest($dodgeLowSpd0 === 35.0, 'B5.4: Dexterity 10 vs speed 0 clamps effSpd to 1.0, capped at 35.0%');

// Enemy speed negative
$dodgeSpdNeg = StatEngine::calcDodgeChance(10.0, -20.0);
assertTest($dodgeSpdNeg === 35.0, 'B5.5: Negative enemy speed clamps effSpd to 1.0, capped at 35.0%');

// Zero & negative dexterity
$dodgeDex0 = StatEngine::calcDodgeChance(0.0, 10.0);
assertTest($dodgeDex0 === 0.0, 'B5.6: Dexterity 0 returns 0.0% evasion');

$dodgeDexNeg = StatEngine::calcDodgeChance(-50.0, 10.0);
assertTest($dodgeDexNeg === 0.0, 'B5.7: Negative dexterity -50 returns 0.0% evasion');


// --------------------------------------------------------------------
// SUMMARY
// --------------------------------------------------------------------
echo "\n\033[1m\033[34m====================================================================\033[0m\n";
echo "\033[1m\033[34m               BACKEND ADVERSARIAL SUITE SUMMARY                    \033[0m\n";
echo "\033[1m\033[34m====================================================================\033[0m\n";
echo "  Total Tests Executed : " . ($passed + $failed) . "\n";
echo "  Passed Tests         : \033[32m{$passed}\033[0m\n";
echo "  Failed Tests         : " . ($failed > 0 ? "\033[31m{$failed}\033[0m" : "\033[32m0\033[0m") . "\n";
echo "--------------------------------------------------------------------\n";

if ($failed === 0) {
    echo "  \033[32m\033[1mRESULT: ALL BACKEND WHITE-BOX ADVERSARIAL TESTS PASSED!\033[0m\n";
    echo "\033[1m\033[34m====================================================================\033[0m\n\n";
    exit(0);
} else {
    echo "  \033[31m\033[1mRESULT: BACKEND ADVERSARIAL FAILURES DETECTED!\033[0m\n";
    echo "\033[1m\033[34m====================================================================\033[0m\n\n";
    exit(1);
}
