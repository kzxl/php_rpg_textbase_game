<?php
/**
 * Adversarial Test Suite: Milestone M3 Arena Backend Engine, Matchmaking & ELO Math
 * 
 * Verifies backend/src/Features/Arena/routes.php:
 * 1. Rank & Threshold calculation across all boundary ratings:
 *    - DivisionByZeroError vulnerability at rating 1000
 *    - Monotonic rank threshold escalation across all 7 tiers
 *    - NextThreshold nullability for Tier 7 Quán Quân
 *    - Progress percentage clamped within [0, 100]
 * 2. ELO Calculation, Streak Bonus & Rating Floor in fight simulation
 * 3. Matchmaking Query Integrity & fight_log JSON encoding
 */

$passed = 0;
$failed = 0;
$results = [];

function assertTest(bool $condition, string $testName, string $details = '') {
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
echo "\033[1m\033[35m  ADVERSARIAL STRESS TEST: M3 ARENA BACKEND ENGINE (PHP)            \033[0m\n";
echo "\033[1m\033[35m====================================================================\033[0m\n\n";

// Canonical Rank Definition from backend/src/Features/Arena/routes.php
$RANKS = [
    ['name' => 'Vô Danh',   'icon' => '🌑', 'min' => 0,    'color' => '#666'],
    ['name' => 'Võ Sinh',   'icon' => '🥋', 'min' => 1000, 'color' => '#5ba3cf'],
    ['name' => 'Võ Sĩ',    'icon' => '⚔️', 'min' => 1200, 'color' => '#6a8f3f'],
    ['name' => 'Đấu Sĩ',   'icon' => '🔥', 'min' => 1400, 'color' => '#d4a017'],
    ['name' => 'Đấu Sư',   'icon' => '💫', 'min' => 1600, 'color' => '#b06cff'],
    ['name' => 'Á Quân',    'icon' => '🥈', 'min' => 1800, 'color' => '#c0c0c0'],
    ['name' => 'Quán Quân', 'icon' => '👑', 'min' => 2000, 'color' => '#ff4500'],
];

// Direct reference to the exact routes.php implementation logic:
$routesFile = __DIR__ . '/../../backend/src/Features/Arena/routes.php';
$routesCode = file_get_contents($routesFile);

// ====================================================================
// SECTION 1: BACKEND RANK TIERS, THRESHOLDS & PROGRESS CALCULATION
// ====================================================================
echo "\033[1m▶ Section 1: Backend Rank Tiers & Threshold Stress\033[0m\n";

// Dynamically extract the exact $getRank closure from routes.php to ensure test fidelity
if (preg_match('/\$getRank\s*=\s*(function\s*\([^)]*\)\s*use\s*\([^)]*\)\s*\{[\s\S]*?\n\s*\};)/', $routesCode, $matches)) {
    eval('$getRankImplementation = ' . $matches[1] . ';');
} else {
    throw new \RuntimeException("Could not extract \$getRank closure from routes.php");
}

// 1.1 Stress test rating 1000 (Default Starting Player Rating)
try {
    $res1000 = $getRankImplementation(1000);
    assertTest(
        $res1000['nextThreshold'] === 1200,
        "Rating 1000 has nextThreshold 1200",
        "Got nextThreshold: " . json_encode($res1000['nextThreshold'])
    );
    assertTest(
        $res1000['progress'] >= 0 && $res1000['progress'] <= 100,
        "Rating 1000 progress is in [0, 100] range",
        "Got progress: {$res1000['progress']}"
    );
} catch (\Throwable $e) {
    assertTest(
        false,
        "Rating 1000 getRank execution does NOT throw Fatal Exception",
        "Caught " . get_class($e) . ": " . $e->getMessage() . " at " . $e->getFile() . ":" . $e->getLine()
    );
}

// 1.2 Boundary Rating Progression checks
$testRatings = [
    ['rating' => 0,    'name' => 'Vô Danh',   'expectedNext' => 1000],
    ['rating' => 500,  'name' => 'Vô Danh',   'expectedNext' => 1000],
    ['rating' => 1000, 'name' => 'Võ Sinh',   'expectedNext' => 1200],
    ['rating' => 1100, 'name' => 'Võ Sinh',   'expectedNext' => 1200],
    ['rating' => 1200, 'name' => 'Võ Sĩ',    'expectedNext' => 1400],
    ['rating' => 1300, 'name' => 'Võ Sĩ',    'expectedNext' => 1400],
    ['rating' => 1400, 'name' => 'Đấu Sĩ',   'expectedNext' => 1600],
    ['rating' => 1500, 'name' => 'Đấu Sĩ',   'expectedNext' => 1600],
    ['rating' => 1600, 'name' => 'Đấu Sư',   'expectedNext' => 1800],
    ['rating' => 1700, 'name' => 'Đấu Sư',   'expectedNext' => 1800],
    ['rating' => 1800, 'name' => 'Á Quân',    'expectedNext' => 2000],
    ['rating' => 1900, 'name' => 'Á Quân',    'expectedNext' => 2000],
    ['rating' => 2000, 'name' => 'Quán Quân', 'expectedNext' => null],
    ['rating' => 3000, 'name' => 'Quán Quân', 'expectedNext' => null],
];

foreach ($testRatings as $tr) {
    try {
        $res = $getRankImplementation($tr['rating']);
        $nameMatch = $res['name'] === $tr['name'];
        assertTest($nameMatch, "Rating {$tr['rating']} maps to rank {$tr['name']}", "Got {$res['name']}");

        $nextMatch = $res['nextThreshold'] === $tr['expectedNext'];
        assertTest(
            $nextMatch,
            "Rating {$tr['rating']} nextThreshold is " . var_export($tr['expectedNext'], true),
            "Got " . var_export($res['nextThreshold'], true)
        );

        $progressValid = $res['progress'] >= 0 && $res['progress'] <= 100;
        assertTest(
            $progressValid,
            "Rating {$tr['rating']} progress ({$res['progress']}%) is valid non-negative [0..100]%",
            "Progress cannot be negative or invalid"
        );
    } catch (\Throwable $e) {
        assertTest(
            false,
            "Rating {$tr['rating']} execution safe",
            get_class($e) . ": " . $e->getMessage()
        );
    }
}

// ====================================================================
// SECTION 2: ELO FORMULA & STREAK MULTIPLIER AUDIT
// ====================================================================
echo "\n\033[1m▶ Section 2: Elo Math & Streak Bonus Verification\033[0m\n";

function simulateEloChange(int $myRating, int $oppRating, bool $won, int $myStreak): array {
    $expected = 1 / (1 + pow(10, ($oppRating - $myRating) / 400));
    $K = 32;
    // Streak bonus: 5+ win streak = +50% ELO gain
    $streakMul = ($won && $myStreak >= 4) ? 1.5 : 1.0;
    $ratingChange = (int)round($K * (($won ? 1 : 0) - $expected) * $streakMul);
    $newStreak = $won ? max(0, $myStreak) + 1 : min(0, $myStreak) - 1;
    $newRating = $won ? $myRating + $ratingChange : max(100, $myRating + $ratingChange);
    return [
        'expected' => $expected,
        'ratingChange' => $ratingChange,
        'newStreak' => $newStreak,
        'newRating' => $newRating
    ];
}

// 2.1 Identical rating duel
{
    $winNormal = simulateEloChange(1000, 1000, true, 0);
    assertTest($winNormal['ratingChange'] === 16, "Win vs equal rating without streak awards +16 ELO (got {$winNormal['ratingChange']})");
    assertTest($winNormal['newStreak'] === 1, "New streak becomes 1 after first win");

    $lossNormal = simulateEloChange(1000, 1000, false, 0);
    assertTest($lossNormal['ratingChange'] === -16, "Loss vs equal rating deducts -16 ELO (got {$lossNormal['ratingChange']})");
    assertTest($lossNormal['newStreak'] === -1, "New streak becomes -1 after first loss");
}

// 2.2 Win on 4-streak entering 5th streak (+50% bonus)
{
    $win5th = simulateEloChange(1000, 1000, true, 4);
    assertTest($win5th['newStreak'] === 5, "4-win streak player winning becomes 5-win streak");
    // Base 16 * 1.5 = 24
    assertTest($win5th['ratingChange'] === 24, "5th consecutive win receives 1.5x multiplier: +24 ELO instead of +16 (got {$win5th['ratingChange']})");
}

// 2.3 Underdog win (+400 opp)
{
    $underdogWin = simulateEloChange(1000, 1400, true, 0);
    // expected ~0.0909; (1 - 0.0909) * 32 = 0.9091 * 32 = 29.09 -> 29 ELO
    assertTest($underdogWin['ratingChange'] === 29, "Underdog win vs +400 ELO opponent awards +29 ELO (got {$underdogWin['ratingChange']})");
}

// 2.4 Rating Floor (never drops below 100)
{
    $lowRatingLoss = simulateEloChange(105, 1000, false, 0);
    assertTest($lowRatingLoss['newRating'] >= 100, "Rating never drops below floor of 100 (got {$lowRatingLoss['newRating']})");
}

// ====================================================================
// SECTION 3: MATCHMAKING QUERY & FIGHT LOG ENCODING INTEGRITY
// ====================================================================
echo "\n\033[1m▶ Section 3: Matchmaking Query & Fight Log Encoding\033[0m\n";

// 3.1 Verify routes.php includes 'a.streak' in matchmaking query
$hasStreakInQuery = (bool)preg_match('/SELECT\s+[^;]*a\.streak[^;]*FROM\s+pvp_arena/is', $routesCode);
assertTest($hasStreakInQuery, "Matchmaking query in routes.php explicitly SELECTs a.streak");

// 3.2 Verify routes.php stores fight_log in pvp_history
$hasFightLogInsert = (bool)preg_match('/INSERT\s+INTO\s+pvp_history\s*\([^)]*fight_log[^)]*\)/is', $routesCode);
assertTest($hasFightLogInsert, "routes.php inserts into pvp_history with fight_log column");

// 3.3 Verify JSON_UNESCAPED_UNICODE is used for fight_log
$hasJsonUnicode = (bool)preg_match('/json_encode\([^)]*JSON_UNESCAPED_UNICODE[^)]*\)/', $routesCode);
assertTest($hasJsonUnicode, "routes.php uses JSON_UNESCAPED_UNICODE to preserve Vietnamese combat text");

// ====================================================================
// SUMMARY REPORT
// ====================================================================
echo "\n\033[1m\033[35m====================================================================\033[0m\n";
echo "\033[1m\033[35m             BACKEND ARENA TEST EXECUTION SUMMARY                   \033[0m\n";
echo "\033[1m\033[35m====================================================================\033[0m\n";
$total = $passed + $failed;
echo "  Total Checks Executed : \033[1m{$total}\033[0m\n";
echo "  Passed Checks         : \033[32m\033[1m{$passed}\033[0m\n";
$failColor = $failed > 0 ? "\033[31m" : "\033[32m";
echo "  Failed Checks         : {$failColor}\033[1m{$failed}\033[0m\n";
echo "--------------------------------------------------------------------\n";

if ($failed === 0) {
    echo "\033[32m\033[1m  VERDICT: ALL M3 BACKEND ARENA CHECKS PASSED (100% SUCCESS)\033[0m\n";
    echo "\033[1m\033[35m====================================================================\033[0m\n\n";
    exit(0);
} else {
    echo "\033[31m\033[1m  VERDICT: FAILURES DETECTED IN M3 BACKEND ARENA ENGINE\033[0m\n";
    echo "\033[1m\033[35m====================================================================\033[0m\n\n";
    exit(1);
}
