<?php

/**
 * Adversarial Stress Test Suite: Milestone M2 - Stamina Alignment & Gym Training
 * 
 * Verifies:
 * - backend/src/Models/Player.php:
 *     - Player::trainStat(string $stat, int $staminaCost = 5)
 *     - Player::isHospitalized()
 *     - Player::hospitalRemaining()
 *     - Stamina deduction: exactly 5 currentStamina per session
 *     - Absolute Energy preservation (currentEnergy untouched)
 *     - Boundary conditions (stamina 0, 1, 4, 5, 6, maxStamina)
 *     - Hospitalization lock (hospitalRemaining > 0 vs 0)
 *     - Invalid stat protection
 *     - Talent aptitude multipliers & derived stats recalculation
 * - backend/src/Features/Gym/routes.php:
 *     - POST /api/player/{id}/train endpoint via Slim PSR-7
 *     - Single & batch training session counts
 *     - Max trainable stamina calculation & automatic capping
 *     - HTTP 400 rejection on insufficient stamina (0, 4)
 *     - HTTP 400 rejection during hospitalization (hospitalRemaining > 0)
 *     - Energy invariance across all HTTP responses & DB persistence
 */

require __DIR__ . '/../../backend/vendor/autoload.php';

use App\Core\AppBootstrap;
use App\Core\Database;
use App\Core\StatEngine;
use App\Models\Player;
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
echo "\033[1m\033[35m  ADVERSARIAL STRESS TEST: M2 STAMINA ALIGNMENT & GYM TRAINING      \033[0m\n";
echo "\033[1m\033[35m====================================================================\033[0m\n\n";

$app = AppBootstrap::boot(dirname(__DIR__, 2) . '/backend');
$pdo = Database::connect();

// ====================================================================
// SECTION 1: DIRECT MODEL LEVEL: EXACT STAMINA DEDUCTION & ENERGY INTACT
// ====================================================================
echo "\033[1m▶ Section 1: Exact Stamina Deduction (-5) & Energy Invariance\033[0m\n";

{
    // 1.1: Verify each of the 4 battle stats consumes strictly 5 stamina and leaves energy 100% intact
    $statsToTest = ['strength', 'speed', 'dexterity', 'defense'];
    foreach ($statsToTest as $stat) {
        $player = new Player("Tester_{$stat}", 'male');
        $player->lastHpRegen = time();
        $player->currentStamina = 100;
        $player->maxStamina = 100;
        $player->currentEnergy = 40;
        $player->hospitalUntil = 0;
        $player->allocatedStats[$stat] = 10;
        $player->recalcDerived();

        $initialStamina = $player->currentStamina;
        $initialEnergy = $player->currentEnergy;
        $initialStatVal = $player->allocatedStats[$stat];

        $err = $player->trainStat($stat, 5);

        assertTest($err === null, "trainStat('{$stat}') succeeds without error");
        assertTest($player->currentStamina === $initialStamina - 5, "Stamina is reduced by EXACTLY 5 for {$stat} (from {$initialStamina} to {$player->currentStamina})");
        assertTest($player->currentEnergy === $initialEnergy, "Energy remains 100% INTACT for {$stat} (still {$player->currentEnergy})");
        assertTest($player->allocatedStats[$stat] > $initialStatVal, "Stat {$stat} increased after training");
    }

    // 1.2: Energy preservation under varied energy levels (0, 1, 25, 53)
    $energyLevels = [0, 1, 15, 30, 45, 53];
    foreach ($energyLevels as $eng) {
        $p = new Player("Tester_Energy_{$eng}", 'male');
        $p->lastHpRegen = time();
        $p->currentStamina = 50;
        $p->currentEnergy = $eng;
        $p->hospitalUntil = 0;

        $p->trainStat('strength', 5);
        assertTest($p->currentEnergy === $eng, "Energy strictly preserved at {$eng} after training session (actual: {$p->currentEnergy})");
        assertTest($p->currentStamina === 45, "Stamina strictly reduced from 50 to 45 when energy is {$eng}");
    }

    // 1.3: Energy preservation under high-tier character with large energy pool (250, 500)
    foreach ([250, 500] as $highEnergy) {
        $pHigh = new Player("HighEnergy_{$highEnergy}", 'male');
        $pHigh->lastHpRegen = time();
        // Give character enough dexterity to support this energy pool: maxEnergy = 50 + floor(dex / 3)
        $pHigh->allocatedStats['dexterity'] = ($highEnergy - 50) * 3;
        $pHigh->recalcDerived();
        $pHigh->currentEnergy = $highEnergy;
        $pHigh->currentStamina = 50;
        $pHigh->hospitalUntil = 0;

        $pHigh->trainStat('defense', 5);
        assertTest($pHigh->currentEnergy === $highEnergy, "High energy pool {$highEnergy} strictly preserved after training");
        assertTest($pHigh->currentStamina === 45, "Stamina reduced by 5 for high energy character");
    }

    // 1.4: Sequential 10-session stress loop: stamina drops by 5 per step down to 0, energy locked
    $loopPlayer = new Player('Daoist Loop', 'female');
    $loopPlayer->lastHpRegen = time();
    $loopPlayer->currentStamina = 50;
    $loopPlayer->maxStamina = 50;
    $loopPlayer->currentEnergy = 33;
    $loopPlayer->hospitalUntil = 0;

    $loopOk = true;
    for ($step = 1; $step <= 10; $step++) {
        $expectedStamina = 50 - ($step * 5);
        $res = $loopPlayer->trainStat('defense', 5);
        if ($res !== null || $loopPlayer->currentStamina !== $expectedStamina || $loopPlayer->currentEnergy !== 33) {
            $loopOk = false;
            break;
        }
    }
    assertTest($loopOk, "10 sequential training sessions deduct exactly 5 stamina each step down to 0, energy stays locked at 33");
    assertTest($loopPlayer->currentStamina === 0, "Final stamina after 10 sessions is exactly 0");
    assertTest($loopPlayer->currentEnergy === 33, "Final energy after 10 sessions is still exactly 33");
}

// ====================================================================
// SECTION 2: BOUNDARY TESTS FOR CURRENT STAMINA (0, 1, 4, 5, 6, maxStamina)
// ====================================================================
echo "\n\033[1m▶ Section 2: Boundary Tests for currentStamina (0, 1, 4, 5, 6, maxStamina)\033[0m\n";

{
    // 2.1: currentStamina = 0
    $p0 = new Player('Daoist Zero', 'male');
    $p0->lastHpRegen = time();
    $p0->currentStamina = 0;
    $p0->currentEnergy = 50;
    $p0->hospitalUntil = 0;
    $statBefore0 = $p0->allocatedStats['strength'] ?? 0;

    $res0 = $p0->trainStat('strength', 5);
    assertTest($res0 !== null, "trainStat with currentStamina = 0 is rejected");
    assertTest(str_contains($res0 ?? '', 'Không đủ Thể Lực! Cần 5.'), "Exact threshold message 'Cần 5' returned (got: '{$res0}')");
    assertTest($p0->currentStamina === 0, "currentStamina remains 0 after rejection");
    assertTest($p0->currentEnergy === 50, "currentEnergy remains 50 after rejection");
    assertTest(($p0->allocatedStats['strength'] ?? 0) === $statBefore0, "Stat remains unchanged after rejection");

    // 2.2: currentStamina = 1
    $p1 = new Player('Daoist One', 'female');
    $p1->lastHpRegen = time();
    $p1->currentStamina = 1;
    $p1->currentEnergy = 40;
    $p1->hospitalUntil = 0;

    $res1 = $p1->trainStat('strength', 5);
    assertTest($res1 !== null && str_contains($res1, 'Không đủ Thể Lực'), "trainStat with currentStamina = 1 is strictly rejected");
    assertTest($p1->currentStamina === 1, "currentStamina remains 1");
    assertTest($p1->currentEnergy === 40, "currentEnergy remains 40");

    // 2.3: currentStamina = 4 (Boundary just below cost 5)
    $p4 = new Player('Daoist Four', 'male');
    $p4->lastHpRegen = time();
    $p4->currentStamina = 4;
    $p4->currentEnergy = 45;
    $p4->hospitalUntil = 0;
    $statBefore4 = $p4->allocatedStats['speed'] ?? 0;

    $res4 = $p4->trainStat('speed', 5);
    assertTest($res4 !== null, "trainStat with currentStamina = 4 is rejected");
    assertTest(str_contains($res4 ?? '', 'Không đủ Thể Lực! Cần 5.'), "Exact threshold message 'Cần 5' returned (got: '{$res4}')");
    assertTest($p4->currentStamina === 4, "currentStamina remains 4");
    assertTest($p4->currentEnergy === 45, "currentEnergy remains 45");
    assertTest(($p4->allocatedStats['speed'] ?? 0) === $statBefore4, "Speed stat remains unchanged");

    // 2.4: currentStamina = 5 (Exact threshold match)
    $p5 = new Player('Daoist Five', 'female');
    $p5->lastHpRegen = time();
    $p5->currentStamina = 5;
    $p5->currentEnergy = 50;
    $p5->hospitalUntil = 0;
    $statBefore5 = $p5->allocatedStats['dexterity'] ?? 0;

    $res5 = $p5->trainStat('dexterity', 5);
    assertTest($res5 === null, "trainStat with currentStamina = 5 succeeds cleanly");
    assertTest($p5->currentStamina === 0, "currentStamina drops exactly from 5 to 0");
    assertTest($p5->currentEnergy === 50, "currentEnergy remains intact at 50");
    assertTest(($p5->allocatedStats['dexterity'] ?? 0) > $statBefore5, "Dexterity stat increased");

    // Immediate repeat at 0 must now fail
    $res5Repeat = $p5->trainStat('dexterity', 5);
    assertTest($res5Repeat !== null, "Immediate repeat trainStat at 0 stamina fails");
    assertTest($p5->currentStamina === 0, "Stamina stays at 0");

    // 2.5: currentStamina = 6 (Threshold + 1)
    $p6 = new Player('Daoist Six', 'male');
    $p6->lastHpRegen = time();
    $p6->currentStamina = 6;
    $p6->currentEnergy = 50;
    $p6->hospitalUntil = 0;
    $statBefore6 = $p6->allocatedStats['defense'] ?? 0;

    $res6 = $p6->trainStat('defense', 5);
    assertTest($res6 === null, "trainStat with currentStamina = 6 succeeds cleanly");
    assertTest($p6->currentStamina === 1, "currentStamina drops exactly from 6 to 1 (6 - 5 = 1)");
    assertTest($p6->currentEnergy === 50, "currentEnergy remains intact at 50");
    assertTest(($p6->allocatedStats['defense'] ?? 0) > $statBefore6, "Defense stat increased");

    // Subsequent attempt with 1 stamina remaining fails
    $res6Sub = $p6->trainStat('defense', 5);
    assertTest($res6Sub !== null && str_contains($res6Sub, 'Không đủ Thể Lực'), "Subsequent attempt with remaining stamina = 1 fails");
    assertTest($p6->currentStamina === 1, "currentStamina stays at 1");

    // 2.6: currentStamina = maxStamina (100)
    $pMax = new Player('Daoist Max', 'male');
    $pMax->lastHpRegen = time();
    $pMax->maxStamina = 100;
    $pMax->currentStamina = 100;
    $pMax->currentEnergy = 50;
    $pMax->hospitalUntil = 0;

    $resMax = $pMax->trainStat('strength', 5);
    assertTest($resMax === null, "trainStat with currentStamina = maxStamina (100) succeeds");
    assertTest($pMax->currentStamina === 95, "currentStamina drops from 100 to 95");
    assertTest($pMax->currentEnergy === 50, "currentEnergy intact at 50");

    // Expanded maxStamina (200 stamina)
    $pMax200 = new Player('Daoist Apex', 'female');
    $pMax200->lastHpRegen = time();
    $pMax200->maxStamina = 200;
    $pMax200->currentStamina = 200;
    $pMax200->currentEnergy = 50;
    $pMax200->hospitalUntil = 0;

    $resMax200 = $pMax200->trainStat('strength', 5);
    assertTest($resMax200 === null, "trainStat with currentStamina = maxStamina (200) succeeds");
    assertTest($pMax200->currentStamina === 195, "currentStamina drops from 200 to 195");
    assertTest($pMax200->currentEnergy === 50, "currentEnergy intact at 50");

    // 2.7: Negative stamina edge case
    $pNeg = new Player('Daoist Negative', 'male');
    $pNeg->lastHpRegen = time();
    $pNeg->currentStamina = -5;
    $pNeg->currentEnergy = 50;
    $resNeg = $pNeg->trainStat('strength', 5);
    assertTest($resNeg !== null, "Negative stamina is strictly rejected");
    assertTest($pNeg->currentStamina === -5, "Negative stamina value is not mutated");
}

// ====================================================================
// SECTION 3: HOSPITALIZATION LOCK (hospitalRemaining > 0 vs 0)
// ====================================================================
echo "\n\033[1m▶ Section 3: Hospitalization Lock Stress (hospitalRemaining > 0 vs 0)\033[0m\n";

{
    // 3.1: Active hospitalization (60s remaining)
    $pHosp = new Player('Daoist Injured', 'male');
    $pHosp->lastHpRegen = time();
    $pHosp->currentStamina = 100;
    $pHosp->currentEnergy = 50;
    $pHosp->hospitalize(60);

    assertTest($pHosp->isHospitalized() === true, "isHospitalized() returns true when hospitalUntil > time()");
    assertTest($pHosp->hospitalRemaining() > 0, "hospitalRemaining() > 0 (got: {$pHosp->hospitalRemaining()}s)");

    $statBeforeHosp = $pHosp->allocatedStats['strength'] ?? 0;
    $resHosp = $pHosp->trainStat('strength', 5);

    assertTest($resHosp !== null, "trainStat is strictly rejected when hospitalized");
    assertTest(str_contains($resHosp ?? '', 'Đang tịnh dưỡng'), "Error message explicitly cites hospital rest: '{$resHosp}'");
    assertTest($pHosp->currentStamina === 100, "Stamina is NOT deducted during hospitalization (still 100)");
    assertTest($pHosp->currentEnergy === 50, "Energy is NOT deducted during hospitalization (still 50)");
    assertTest(($pHosp->allocatedStats['strength'] ?? 0) === $statBeforeHosp, "Stat points NOT modified during hospitalization");

    // 3.2: Verify lock applies to all 4 battle stats
    $allStatsLocked = true;
    foreach (['strength', 'speed', 'dexterity', 'defense'] as $st) {
        $err = $pHosp->trainStat($st, 5);
        if ($err !== 'Đang tịnh dưỡng, không thể rèn luyện!') {
            $allStatsLocked = false;
        }
    }
    assertTest($allStatsLocked, "All 4 battle stats are uniformly locked under hospitalization");

    // 3.3: Boundary: hospitalRemaining = 1s (barely still active)
    $pHosp1s = new Player('Daoist 1s', 'female');
    $pHosp1s->lastHpRegen = time();
    $pHosp1s->currentStamina = 100;
    $pHosp1s->hospitalUntil = time() + 1; // 1s in future
    assertTest($pHosp1s->isHospitalized() === true, "Hospitalized is true at 1s remaining boundary");
    $res1s = $pHosp1s->trainStat('strength', 5);
    assertTest($res1s === 'Đang tịnh dưỡng, không thể rèn luyện!', "trainStat rejected at 1s remaining boundary");
    assertTest($pHosp1s->currentStamina === 100, "Stamina preserved at 1s remaining");

    // 3.4: Boundary: hospitalRemaining = 0 (hospitalization expired)
    $pRecovered = new Player('Daoist Recovered', 'male');
    $pRecovered->lastHpRegen = time();
    $pRecovered->currentStamina = 100;
    $pRecovered->currentEnergy = 50;
    $pRecovered->hospitalUntil = time() - 1; // expired 1s ago

    assertTest($pRecovered->isHospitalized() === false, "isHospitalized() returns false after time expired");
    assertTest($pRecovered->hospitalRemaining() === 0, "hospitalRemaining() returns 0 after time expired");

    $resRec = $pRecovered->trainStat('strength', 5);
    assertTest($resRec === null, "trainStat succeeds immediately once hospital timer reaches 0");
    assertTest($pRecovered->currentStamina === 95, "Stamina decremented to 95 upon recovery");
    assertTest($pRecovered->currentEnergy === 50, "Energy preserved at 50 upon recovery");
}

// ====================================================================
// SECTION 4: INVALID STAT INPUTS & TALENT MULTIPLIERS
// ====================================================================
echo "\n\033[1m▶ Section 4: Invalid Stats Protection & Talent Multipliers\033[0m\n";

{
    // 4.1: Reject non-battle stats
    $pInv = new Player('Daoist Invalid', 'male');
    $pInv->lastHpRegen = time();
    $pInv->currentStamina = 100;
    $pInv->currentEnergy = 50;

    $invalidStats = ['mana', 'energy', 'currentEnergy', 'hp', 'intelligence', 'spirit', 'luck', 'charisma', '', 'defense; DROP TABLE'];
    $allInvalidRejected = true;
    foreach ($invalidStats as $inv) {
        $err = $pInv->trainStat($inv, 5);
        if ($err !== 'Chỉ số không hợp lệ.') {
            $allInvalidRejected = false;
        }
    }
    assertTest($allInvalidRejected, "All 10 invalid/arbitrary stat names are strictly rejected with 'Chỉ số không hợp lệ.'");
    assertTest($pInv->currentStamina === 100, "Stamina unchanged after invalid stat attempts");
    assertTest($pInv->currentEnergy === 50, "Energy unchanged after invalid stat attempts");

    // 4.2: Talent multiplier stat gains
    $talentsToTest = [
        'strength' => ['mult' => 1.0, 'expectedGain' => 1],
        'speed'    => ['mult' => 1.1, 'expectedGain' => 1], // round(1 * 1.1) = 1
        'dexterity'=> ['mult' => 1.5, 'expectedGain' => 2], // round(1 * 1.5) = 2
        'defense'  => ['mult' => 2.0, 'expectedGain' => 2], // round(1 * 2.0) = 2
    ];

    foreach ($talentsToTest as $st => $cfg) {
        $pTal = new Player("Talent_{$st}", 'male');
        $pTal->lastHpRegen = time();
        $pTal->currentStamina = 50;
        $pTal->talents[$st] = $cfg['mult'];
        $pTal->allocatedStats[$st] = 0;

        $pTal->trainStat($st, 5);
        $gain = $pTal->allocatedStats[$st];
        assertTest($gain === $cfg['expectedGain'], "Talent {$st} multiplier {$cfg['mult']}x yields exactly +{$cfg['expectedGain']} allocated stat (got: {$gain})");
    }
}

// ====================================================================
// SECTION 5: HTTP ENDPOINT STRESS: POST /api/player/{id}/train
// ====================================================================
echo "\n\033[1m▶ Section 5: HTTP Slim Endpoint Stress Testing\033[0m\n";

$testPlayerId = 'challenger_m2_' . bin2hex(random_bytes(4));

try {
    // Setup clean test player in DB
    $httpPlayer = new Player('HTTP Challenger M2', 'male');
    $httpPlayer->id = $testPlayerId;
    $httpPlayer->username = 'http_m2_' . bin2hex(random_bytes(4));
    $httpPlayer->lastHpRegen = time();
    $httpPlayer->currentStamina = 100;
    $httpPlayer->maxStamina = 100;
    $httpPlayer->currentEnergy = 25; // Distinct energy level
    $httpPlayer->hospitalUntil = 0;
    $httpPlayer->allocatedStats = ['strength' => 10, 'speed' => 10, 'dexterity' => 10, 'defense' => 10];
    $httpPlayer->recalcDerived();
    $targetEnergy = $httpPlayer->currentEnergy; // 25

    savePlayer($testPlayerId, $httpPlayer);

    // Helper to send HTTP requests to Slim app
    $sendTrainRequest = function(string $playerId, array $body) use ($app) {
        $req = (new ServerRequestFactory())->createServerRequest('POST', "/api/player/{$playerId}/train");
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

    // 5.1: HTTP 200 - Successful single session (count = 1)
    $resp1 = $sendTrainRequest($testPlayerId, ['stat' => 'strength', 'count' => 1]);
    assertTest($resp1['status'] === 200, "HTTP 200 returned for valid single training (status: {$resp1['status']})");
    assertTest(str_contains($resp1['json']['message'] ?? '', 'Rèn luyện'), "Message contains 'Rèn luyện'");
    assertTest(str_contains($resp1['json']['message'] ?? '', '(-5 thể lực)'), "Message confirms (-5 thể lực) deducted");
    assertTest($resp1['json']['trained'] === 1, "Trained count is 1");
    assertTest($resp1['json']['player']['currentStamina'] === 95, "Returned player currentStamina is 95 (-5)");
    assertTest($resp1['json']['player']['currentEnergy'] === $targetEnergy, "Returned player currentEnergy is STRICTLY intact at {$targetEnergy}");

    // Verify DB persistence
    $savedP1 = loadPlayer($testPlayerId);
    assertTest($savedP1 !== null && $savedP1->currentStamina === 95, "DB persistence confirms currentStamina = 95");
    assertTest($savedP1 !== null && $savedP1->currentEnergy === $targetEnergy, "DB persistence confirms currentEnergy = {$targetEnergy} untouched");
    assertTest($savedP1 !== null && $savedP1->allocatedStats['strength'] === 11, "DB persistence confirms strength incremented");

    // 5.2: HTTP 200 - Batch multi-session training (count = 3)
    $resp2 = $sendTrainRequest($testPlayerId, ['stat' => 'defense', 'count' => 3]);
    assertTest($resp2['status'] === 200, "HTTP 200 returned for batch training count = 3");
    assertTest(str_contains($resp2['json']['message'] ?? '', '(-15 thể lực)'), "Message confirms (-15 thể lực) consumed (3 * 5)");
    assertTest($resp2['json']['trained'] === 3, "Trained count is 3");
    assertTest($resp2['json']['player']['currentStamina'] === 80, "currentStamina is 80 (95 - 15)");
    assertTest($resp2['json']['player']['currentEnergy'] === $targetEnergy, "currentEnergy is STILL intact at {$targetEnergy}");

    // 5.3: HTTP Boundary: currentStamina = 5 (exact match for 1 session)
    $savedP1 = loadPlayer($testPlayerId);
    $savedP1->lastHpRegen = time();
    $savedP1->currentStamina = 5;
    savePlayer($testPlayerId, $savedP1);

    $resp3 = $sendTrainRequest($testPlayerId, ['stat' => 'speed', 'count' => 1]);
    assertTest($resp3['status'] === 200, "HTTP 200 when currentStamina is exactly 5");
    assertTest($resp3['json']['player']['currentStamina'] === 0, "currentStamina reaches exactly 0 (5 - 5 = 0)");
    assertTest($resp3['json']['player']['currentEnergy'] === $targetEnergy, "currentEnergy is still intact at {$targetEnergy}");

    // 5.4: HTTP Boundary: currentStamina = 0 rejected with HTTP 400
    $resp4 = $sendTrainRequest($testPlayerId, ['stat' => 'speed', 'count' => 1]);
    assertTest($resp4['status'] === 400, "HTTP 400 when currentStamina = 0 (status: {$resp4['status']})");
    assertTest(str_contains($resp4['json']['error'] ?? '', 'Không đủ thể lực'), "Error message states lack of thể lực: '{$resp4['json']['error']}'");

    // Verify DB state did not change
    $savedPAfter0 = loadPlayer($testPlayerId);
    assertTest($savedPAfter0->currentStamina === 0, "DB stamina remains 0");
    assertTest($savedPAfter0->currentEnergy === $targetEnergy, "DB energy remains {$targetEnergy}");

    // 5.5: HTTP Boundary: currentStamina = 4 rejected with HTTP 400
    $savedPAfter0->lastHpRegen = time();
    $savedPAfter0->currentStamina = 4;
    savePlayer($testPlayerId, $savedPAfter0);

    $resp5 = $sendTrainRequest($testPlayerId, ['stat' => 'speed', 'count' => 1]);
    assertTest($resp5['status'] === 400, "HTTP 400 when currentStamina = 4 (status: {$resp5['status']})");
    assertTest(str_contains($resp5['json']['error'] ?? '', 'Không đủ thể lực'), "Error confirms lack of stamina for 4");

    // 5.6: HTTP Boundary: currentStamina = 6 capped to 1 session even if count = 3 requested
    $savedPAfter0->lastHpRegen = time();
    $savedPAfter0->currentStamina = 6;
    savePlayer($testPlayerId, $savedPAfter0);

    $resp6 = $sendTrainRequest($testPlayerId, ['stat' => 'dexterity', 'count' => 3]);
    assertTest($resp6['status'] === 200, "HTTP 200 when requesting count=3 with 6 stamina");
    assertTest($resp6['json']['trained'] === 1, "Session count automatically capped to 1 session based on available stamina (floor(6/5) = 1)");
    assertTest($resp6['json']['player']['currentStamina'] === 1, "Remaining stamina is exactly 1 (6 - 5 = 1)");
    assertTest($resp6['json']['player']['currentEnergy'] === $targetEnergy, "Energy intact at {$targetEnergy}");

    // 5.7: HTTP Hospitalization Lock (hospitalRemaining > 0)
    $hospPlayer = loadPlayer($testPlayerId);
    $hospPlayer->lastHpRegen = time();
    $hospPlayer->currentStamina = 100;
    $hospPlayer->hospitalUntil = time() + 300; // 5 mins in hospital
    savePlayer($testPlayerId, $hospPlayer);

    $respHosp = $sendTrainRequest($testPlayerId, ['stat' => 'strength', 'count' => 1]);
    assertTest($respHosp['status'] === 400, "HTTP 400 when player is hospitalized (status: {$respHosp['status']})");
    assertTest(str_contains($respHosp['json']['error'] ?? '', 'Đang tịnh dưỡng'), "Error confirms hospitalization lock: '{$respHosp['json']['error']}'");

    // Verify DB stamina and energy were NOT deducted
    $postHospCheck = loadPlayer($testPlayerId);
    assertTest($postHospCheck->currentStamina === 100, "Stamina preserved at 100 after hospitalized request");
    assertTest($postHospCheck->currentEnergy === $targetEnergy, "Energy preserved at {$targetEnergy} after hospitalized request");

    // 5.8: Hospital timer expired at HTTP level
    $postHospCheck->lastHpRegen = time();
    $postHospCheck->hospitalUntil = time() - 5; // expired
    savePlayer($testPlayerId, $postHospCheck);

    $respUnHosp = $sendTrainRequest($testPlayerId, ['stat' => 'strength', 'count' => 1]);
    assertTest($respUnHosp['status'] === 200, "HTTP 200 once hospitalization timer has expired");
    assertTest($respUnHosp['json']['player']['currentStamina'] === 95, "Stamina properly decremented from 100 to 95 after hospital expired");
    assertTest($respUnHosp['json']['player']['currentEnergy'] === $targetEnergy, "Energy intact at {$targetEnergy}");

    // 5.9: HTTP Invalid stat rejection
    $respInv = $sendTrainRequest($testPlayerId, ['stat' => 'magic_power', 'count' => 1]);
    assertTest($respInv['status'] === 400, "HTTP 400 for invalid stat name (status: {$respInv['status']})");
    assertTest(str_contains($respInv['json']['error'] ?? '', 'Chỉ số không hợp lệ'), "Error specifies invalid stat: '{$respInv['json']['error']}'");

} finally {
    // Teardown: Clean up test player from database
    try {
        $pdo->exec("DELETE FROM player_items WHERE player_id = '{$testPlayerId}'");
        $pdo->exec("DELETE FROM player_skills WHERE player_id = '{$testPlayerId}'");
        $pdo->exec("DELETE FROM players WHERE id = '{$testPlayerId}'");
        $pdo->exec("DELETE FROM player_exploration WHERE player_id = '{$testPlayerId}'");
        $pdo->exec("DELETE FROM player_tracked_monsters WHERE player_id = '{$testPlayerId}'");
    } catch (\Throwable $t) {
        // Ignored in cleanup
    }
}

// ====================================================================
// SUMMARY REPORT
// ====================================================================
echo "\n\033[1m\033[35m====================================================================\033[0m\n";
echo "\033[1m\033[35m          M2 STAMINA & GYM TEST EXECUTION SUMMARY                   \033[0m\n";
echo "\033[1m\033[35m====================================================================\033[0m\n";
echo "  Total Checks Executed : \033[1m" . ($passed + $failed) . "\033[0m\n";
echo "  Passed Checks         : \033[32m\033[1m{$passed}\033[0m\n";
echo "  Failed Checks         : " . ($failed > 0 ? "\033[31m\033[1m{$failed}\033[0m" : "\033[32m0\033[0m") . "\n";
echo "--------------------------------------------------------------------\n";

if ($failed === 0) {
    echo "\033[32m\033[1m  VERDICT: ALL M2 STAMINA & GYM STRESS TESTS PASSED (100% SUCCESS)\033[0m\n";
    echo "\033[1m\033[35m====================================================================\033[0m\n\n";
    exit(0);
} else {
    echo "\033[31m\033[1m  VERDICT: FAILURES DETECTED IN M2 STAMINA OR GYM ENGINE\033[0m\n";
    echo "\033[1m\033[35m====================================================================\033[0m\n\n";
    exit(1);
}
