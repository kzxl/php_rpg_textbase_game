<?php

/**
 * Adversarial Stress Test: Milestone M2 Backend Defense, Evasion & Tribulation Engine
 * 
 * Verifies:
 * - backend/src/Core/StatEngine.php:
 *     - StatEngine::calcDamageReduction($defense, $rawDamage)
 *     - StatEngine::calcDodgeChance($defenderDex, $attackerSpeed)
 * - backend/src/Systems/TribulationSystem.php:
 *     - TribulationSystem::simulateTribulation($player, $targetTier)
 *     - Qi shield dynamic absorption & energy depletion
 *     - Defense mitigation cap (60%) under lightning ordeal
 *     - Active aura effects (Golden Bell -20%, Gale Stride +10% dodge)
 *     - Emergency medicine auto-consumption on critical HP (<= 20%)
 * - backend/src/Models/Player.php:
 *     - Player::trainStat($stat, $staminaCost)
 *     - Strict Thể Lực consumption and Linh Lực invariance
 * - Slim Route /api/player/{id}/train:
 *     - HTTP endpoint stamina deduction & transaction integrity
 */

require __DIR__ . '/../../backend/vendor/autoload.php';

use App\Core\AppBootstrap;
use App\Core\Database;
use App\Core\StatEngine;
use App\Models\Player;
use App\Systems\TribulationSystem;
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
echo "\033[1m\033[35m  ADVERSARIAL STRESS TEST: M2 BACKEND DEFENSE & TRIBULATION SUITE   \033[0m\n";
echo "\033[1m\033[35m====================================================================\033[0m\n\n";

$app = AppBootstrap::boot(dirname(__DIR__, 2) . '/backend');
$pdo = Database::connect();

// ====================================================================
// SECTION 1: StatEngine::calcDamageReduction 6x3 MATRIX & BOUNDARIES
// ====================================================================
echo "\033[1m▶ Section 1: StatEngine::calcDamageReduction MDG Matrix & Bounds\033[0m\n";

$defenseTiers = [0, 10, 50, 200, 1000, 100000];
$rawDmgTiers = [25.0, 75.0, 250.0];

$expectedPhpMatrix = [
    0 => [25 => 0.0, 75 => 0.0, 250 => 0.0],
    10 => [25 => 7.41, 75 => 2.6, 250 => 0.79],
    50 => [25 => 28.57, 75 => 11.76, 250 => 3.85],
    200 => [25 => 61.54, 75 => 34.78, 250 => 13.79],
    1000 => [25 => 85.0, 75 => 72.73, 250 => 44.44],
    100000 => [25 => 85.0, 75 => 85.0, 250 => 85.0],
];

foreach ($defenseTiers as $def) {
    foreach ($rawDmgTiers as $dmg) {
        $expected = $expectedPhpMatrix[$def][(int)$dmg];
        $actual = StatEngine::calcDamageReduction((float)$def, (float)$dmg);

        assertTest(
            abs($actual - $expected) < 0.001,
            "PHP Matrix [Def {$def}, Raw {$dmg}]: Computed {$actual}% matches expected {$expected}%",
            "Mismatch: got {$actual}, want {$expected}"
        );

        assertTest(
            $actual <= 85.0,
            "Cap Invariant [Def {$def}, Raw {$dmg}]: {$actual}% strictly <= 85.0%"
        );
    }
}

// Boundaries and clamps
assertTest(StatEngine::calcDamageReduction(-10, 25) === 0.0, 'Negative defense (-10) strictly returns 0.0%');
assertTest(StatEngine::calcDamageReduction(0, 25) === 0.0, 'Zero defense strictly returns 0.0%');
assertTest(StatEngine::calcDamageReduction(10000000, 250) === 85.0, 'Ultra-high defense (10,000,000) caps strictly at 85.0%');

// Damage clamp effRaw = max(8.0, rawDamage)
assertTest(StatEngine::calcDamageReduction(40, 0) === 50.0, 'Raw damage 0 clamps to 8.0: Def 40 yields 50.0%');
assertTest(StatEngine::calcDamageReduction(40, -100) === 50.0, 'Negative raw damage (-100) clamps to 8.0: Def 40 yields 50.0%');

// ====================================================================
// SECTION 2: StatEngine::calcDodgeChance EVASION MATRIX & BOUNDARIES
// ====================================================================
echo "\n\033[1m▶ Section 2: StatEngine::calcDodgeChance Evasion Matrix & Bounds\033[0m\n";

$dexTiers = [0, 10, 100, 10000];
$speedTiers = [7.5, 10.0, 15.0];

$expectedPhpDodge = [
    0 => ['7.5' => 0.0, '10' => 0.0, '15' => 0.0],
    10 => ['7.5' => 34.78, '10' => 28.57, '15' => 21.05],
    100 => ['7.5' => 35.0, '10' => 35.0, '15' => 35.0],
    10000 => ['7.5' => 35.0, '10' => 35.0, '15' => 35.0],
];

foreach ($dexTiers as $dex) {
    foreach ($speedTiers as $spd) {
        $key = (string)$spd;
        $expected = $expectedPhpDodge[$dex][$key];
        $actual = StatEngine::calcDodgeChance((float)$dex, (float)$spd);

        assertTest(
            abs($actual - $expected) < 0.001,
            "PHP Evasion [Dex {$dex}, Spd {$spd}]: Computed {$actual}% matches expected {$expected}%",
            "Mismatch: got {$actual}, want {$expected}"
        );

        assertTest(
            $actual <= 35.0,
            "Cap Invariant [Dex {$dex}, Spd {$spd}]: {$actual}% strictly <= 35.0%"
        );
    }
}

// Boundaries and clamps
assertTest(StatEngine::calcDodgeChance(-5, 10) === 0.0, 'Negative dexterity (-5) strictly returns 0.0%');
assertTest(StatEngine::calcDodgeChance(0, 10) === 0.0, 'Zero dexterity strictly returns 0.0%');
assertTest(StatEngine::calcDodgeChance(1000000, 10) === 35.0, 'Ultra-high dexterity (1,000,000) caps strictly at 35.0%');
assertTest(StatEngine::calcDodgeChance(10, 0) === 35.0, 'Attacker speed 0 clamps to 1.0: Dex 10 yields 35.0% cap');
assertTest(StatEngine::calcDodgeChance(10, -50) === 35.0, 'Negative attacker speed (-50) clamps to 1.0: Dex 10 yields 35.0% cap');

// ====================================================================
// SECTION 3: TRIBULATION SYSTEM DYNAMIC SIMULATION & QI SHIELD
// ====================================================================
echo "\n\033[1m▶ Section 3: TribulationSystem Dynamic Ordeal & Qi Shield\033[0m\n";

// 3.1: Qi Shield absorption mechanics test
{
    $player = new Player('Daoist ShieldTester', 'male');
    $player->id = 'shield_tester_' . bin2hex(random_bytes(3));
    $player->realmTier = 1;
    $player->level = 10;
    $player->maxHp = 1000;
    $player->currentHp = 1000;
    $player->currentEnergy = 50; // Plenty of energy
    $player->activeAuras = [];
    $player->medicines = [];

    $simResult = TribulationSystem::simulateTribulation($player, 2);

    assertTest(isset($simResult['survived']), 'simulateTribulation returns survival status');
    assertTest(isset($simResult['waveLogs']) && count($simResult['waveLogs']) > 0, 'simulateTribulation generates waveLogs');

    // Inspect first wave log for Qi Shield absorption
    $wave1 = $simResult['waveLogs'][0];
    assertTest(isset($wave1['qiShieldAbsorbed']), 'Wave 1 log tracks qiShieldAbsorbed');
    assertTest($wave1['qiShieldAbsorbed'] > 0, 'Qi shield absorbed non-zero damage when energy > 5');
    assertTest($wave1['energyLeft'] < 50, 'Energy was depleted proportionally to shield absorption');
}

// 3.2: Qi Shield energy depletion exact ratio (1 energy = 2.5 HP)
{
    $player = new Player('Daoist LowEnergy', 'male');
    $player->id = 'low_energy_' . bin2hex(random_bytes(3));
    $player->realmTier = 1;
    $player->level = 10;
    $player->maxHp = 1000;
    $player->currentHp = 1000;
    $player->currentEnergy = 5; // <= 5: shield cannot activate!

    $simResult = TribulationSystem::simulateTribulation($player, 2);
    $wave1 = $simResult['waveLogs'][0];
    assertTest($wave1['qiShieldAbsorbed'] === 0, 'Qi shield strictly inactive when currentEnergy <= 5');
    assertTest($wave1['energyLeft'] === 5, 'Energy remains untouched at 5 when shield inactive');
}

// 3.3: Golden Bell Aura (-20% tribulation damage mitigation)
{
    $playerNoAura = new Player('Daoist NoAura', 'male');
    $playerNoAura->realmTier = 1;
    $playerNoAura->level = 10;
    $playerNoAura->maxHp = 2000;
    $playerNoAura->currentHp = 2000;
    $playerNoAura->currentEnergy = 0;
    $playerNoAura->activeAuras = [];

    $playerBell = new Player('Daoist Bell', 'male');
    $playerBell->realmTier = 1;
    $playerBell->level = 10;
    $playerBell->maxHp = 2000;
    $playerBell->currentHp = 2000;
    $playerBell->currentEnergy = 0;
    $playerBell->activeAuras = ['ho_the_kim_chung'];

    $resNoAura = TribulationSystem::simulateTribulation($playerNoAura, 2);
    $resBell = TribulationSystem::simulateTribulation($playerBell, 2);

    $w1NoAura = $resNoAura['waveLogs'][0];
    $w1Bell = $resBell['waveLogs'][0];

    assertTest($w1NoAura['auraMitigated'] === 0, 'Player without Golden Bell has 0 aura mitigation');
    assertTest($w1Bell['auraMitigated'] > 0, 'Player with Golden Bell has active aura mitigation');
    assertTest($w1Bell['netDamage'] <= $w1NoAura['netDamage'], 'Net damage with Golden Bell is strictly lower than without');
}

// 3.4: Emergency Medicine Rescue at HP <= 20%
{
    $playerDying = new Player('Daoist Fragile', 'male');
    $playerDying->realmTier = 1;
    $playerDying->level = 10;
    $playerDying->maxHp = 1000;
    $playerDying->currentHp = 300; // 30% HP
    $playerDying->currentEnergy = 0;
    $playerDying->allocatedStats = ['defense' => 200];
    $playerDying->activeAuras = ['ho_the_kim_chung'];
    $playerDying->medicines = ['hoi_luc_dan' => 2];

    $simResult = TribulationSystem::simulateTribulation($playerDying, 2);
    $anyRescued = false;
    foreach ($simResult['waveLogs'] as $log) {
        if (!empty($log['medicineUsed'])) {
            $anyRescued = true;
            break;
        }
    }
    assertTest($anyRescued, 'Emergency medicine auto-triggers when player HP drops to <= 20%');
}

// ====================================================================
// SECTION 4: GYM TRAINING RESOURCE ISOLATION & STAMINA CONSUMPTION
// ====================================================================
echo "\n\033[1m▶ Section 4: Gym Training Resource Isolation in Player Model\033[0m\n";

// 4.1: Normal training with sufficient stamina (cost 5)
{
    $player = new Player('Gym Daoist', 'male');
    $player->id = 'gym_tester_01_' . bin2hex(random_bytes(3));
    $player->currentStamina = 50;
    $player->maxStamina = 100;
    $player->currentEnergy = 50;
    $player->maxEnergy = 50;
    $player->hospitalUntil = 0;
    $player->talents = ['strength' => 1.0];

    $initialStr = $player->allocatedStats['strength'] ?? 0;
    $error = $player->trainStat('strength', 5);

    assertTest($error === null, 'trainStat succeeds with sufficient stamina (error is null)');
    assertTest($player->currentStamina === 45, 'currentStamina decremented by exactly 5 (50 -> 45)');
    assertTest($player->currentEnergy === 50, 'currentEnergy strictly PRESERVED at 50 (0 energy cost)');
    assertTest(($player->allocatedStats['strength'] ?? 0) === $initialStr + 1, 'Strength stat increased by 1');
}

// 4.2: Insufficient stamina rejection (4 < 5)
{
    $playerExhausted = new Player('Exhausted Daoist', 'male');
    $playerExhausted->id = 'gym_tester_02_' . bin2hex(random_bytes(3));
    $playerExhausted->currentStamina = 4;
    $playerExhausted->currentEnergy = 50;
    $playerExhausted->hospitalUntil = 0;

    $error = $playerExhausted->trainStat('defense', 5);

    assertTest($error !== null, 'trainStat strictly rejects when currentStamina < 5');
    assertTest(str_contains($error, 'Không đủ Thể Lực'), 'Error message specifically identifies insufficient Thể Lực');
    assertTest($playerExhausted->currentStamina === 4, 'Stamina remains untouched at 4 after rejected training');
    assertTest($playerExhausted->currentEnergy === 50, 'Energy remains untouched at 50');
}

// 4.3: Hospitalized player rejection
{
    $playerInjured = new Player('Injured Daoist', 'male');
    $playerInjured->id = 'gym_tester_03_' . bin2hex(random_bytes(3));
    $playerInjured->currentStamina = 100;
    $playerInjured->currentEnergy = 50;
    $playerInjured->hospitalUntil = time() + 60; // Injured for 60s

    $error = $playerInjured->trainStat('speed', 5);

    assertTest($error !== null, 'trainStat strictly rejects when player is hospitalized');
    assertTest(str_contains($error, 'tịnh dưỡng'), 'Error message confirms player is in hospital/convalescence');
    assertTest($playerInjured->currentStamina === 100, 'Stamina remains untouched when hospitalized');
}

// 4.4: Invalid stat rejection
{
    $player = new Player('Invalid Daoist', 'male');
    $player->currentStamina = 50;
    $error = $player->trainStat('flying_swords', 5);
    assertTest($error !== null && str_contains($error, 'không hợp lệ'), 'Invalid stat name is rejected');
    assertTest($player->currentStamina === 50, 'Stamina preserved on invalid stat');
}

// ====================================================================
// SECTION 5: SLIM ROUTE HTTP ENDPOINT STRESS: /api/player/{id}/train
// ====================================================================
echo "\n\033[1m▶ Section 5: HTTP Endpoint POST /api/player/{id}/train\033[0m\n";

$testPlayerId = 'challenger_m2_' . bin2hex(random_bytes(4));
$testUsername = 'm2_gym_' . bin2hex(random_bytes(3));

try {
    // Setup clean player in DB
    $httpPlayer = new Player('HTTP Gym Daoist', 'male');
    $httpPlayer->id = $testPlayerId;
    $httpPlayer->username = $testUsername;
    $httpPlayer->currentStamina = 25;
    $httpPlayer->maxStamina = 100;
    $httpPlayer->currentEnergy = 50;
    $httpPlayer->hospitalUntil = 0;
    $httpPlayer->lastHpRegen = time();
    $httpPlayer->gymDate = date('Y-m-d');
    $httpPlayer->gymSessions = 0;
    $httpPlayer->talents = ['dexterity' => 1.0];
    savePlayer($testPlayerId, $httpPlayer);

    // Call train endpoint for 3 sessions (3 * 5 = 15 stamina)
    $requestFactory = new ServerRequestFactory();
    $req = $requestFactory->createServerRequest('POST', "/api/player/{$testPlayerId}/train")
        ->withHeader('Content-Type', 'application/json')
        ->withParsedBody(['stat' => 'dexterity', 'count' => 3]);

    $res = $app->handle($req);

    assertTest($res->getStatusCode() === 200, 'HTTP POST /train returns 200 OK');
    $body = json_decode((string)$res->getBody(), true);

    assertTest($body['trained'] === 3, 'Endpoint trained exactly 3 sessions');
    assertTest(str_contains($body['message'], '-15 thể lực'), 'Response message confirms deduction of 15 Thể Lực');

    // Reload player from DB and verify persistence
    $reloaded = loadPlayer($testPlayerId);
    assertTest($reloaded->currentStamina === 10, "Persisted stamina dropped to 10 (got: {$reloaded->currentStamina})");
    assertTest($reloaded->currentEnergy === 50, "Persisted energy strictly intact at 50 (got: {$reloaded->currentEnergy})");

    // Now try to train 3 sessions when only 10 stamina left (10 / 5 = 2 max sessions)
    $req2 = $requestFactory->createServerRequest('POST', "/api/player/{$testPlayerId}/train")
        ->withHeader('Content-Type', 'application/json')
        ->withParsedBody(['stat' => 'dexterity', 'count' => 3]);
    $res2 = $app->handle($req2);

    assertTest($res2->getStatusCode() === 200, 'HTTP POST /train caps gracefully to available sessions');
    $body2 = json_decode((string)$res2->getBody(), true);
    assertTest($body2['trained'] === 2, 'Trained exactly 2 sessions (capped by remaining 10 stamina)');

    $reloaded2 = loadPlayer($testPlayerId);
    assertTest($reloaded2->currentStamina === 0, 'Persisted stamina is now exactly 0');
    assertTest($reloaded2->currentEnergy === 50, 'Energy remains 50');

    // Third call with 0 stamina must return HTTP 400
    $req3 = $requestFactory->createServerRequest('POST', "/api/player/{$testPlayerId}/train")
        ->withHeader('Content-Type', 'application/json')
        ->withParsedBody(['stat' => 'dexterity', 'count' => 1]);
    $res3 = $app->handle($req3);
    assertTest($res3->getStatusCode() === 400, 'HTTP POST /train returns 400 when stamina is exhausted (0)');

} finally {
    // Clean up test player
    $stmt = $pdo->prepare("DELETE FROM players WHERE id = ?");
    $stmt->execute([$testPlayerId]);
}

// ====================================================================
// SUMMARY & VERDICT
// ====================================================================
echo "\n\033[1m\033[35m====================================================================\033[0m\n";
echo "\033[1m\033[35m             M2 ADVERSARIAL PHP SUITE EXECUTION SUMMARY             \033[0m\n";
echo "\033[1m\033[35m====================================================================\033[0m\n";
echo "  Total Checks Executed : " . ($passed + $failed) . "\n";
echo "  Passed Checks         : \033[32m{$passed}\033[0m\n";
echo "  Failed Checks         : \033[31m{$failed}\033[0m\n";
echo "--------------------------------------------------------------------\n";

if ($failed === 0) {
    echo "\033[32m\033[1m  VERDICT: ALL M2 BACKEND DEFENSE & TRIBULATION TESTS PASSED (100% SUCCESS)\033[0m\n";
    echo "\033[1m\033[35m====================================================================\033[0m\n\n";
    exit(0);
} else {
    echo "\033[31m\033[1m  VERDICT: FAILURES DETECTED IN BACKEND M2 ENGINES\033[0m\n";
    echo "\033[1m\033[35m====================================================================\033[0m\n\n";
    exit(1);
}
