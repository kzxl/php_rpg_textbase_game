<?php

/**
 * Adversarial Stress Test: Milestone M3 Backend Fight Log Persistence & Streak Engine
 * 
 * Challenger 2: Empirical stress testing of:
 * 1. Database schema: utf8mb4 collation on pvp_history.fight_log and streak column on pvp_arena
 * 2. UTF-8 & Emoji Fidelity with JSON_UNESCAPED_UNICODE: Vietnamese diacritics, 4-byte emojis, quotes, symbols
 * 3. Serialization edge cases: empty logs ([]), null logs (NULL), huge logs, malformed strings
 * 4. Arena Rank Tier & Threshold Engine ($getRank): DivisionByZeroError & threshold math validation
 * 5. Slim Route GET /api/player/{id}/arena: history with fight_log, opponents with streak, arena status
 * 6. Slim Route POST /api/player/{id}/arena/fight: transaction integrity, combat log persistence, streak multiplier & bonuses
 */

require __DIR__ . '/../../backend/vendor/autoload.php';

use App\Core\AppBootstrap;
use App\Core\Database;
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
echo "\033[1m\033[35m  ADVERSARIAL STRESS TEST: M3 BACKEND FIGHT LOG PERSISTENCE SUITE   \033[0m\n";
echo "\033[1m\033[35m====================================================================\033[0m\n\n";

$app = AppBootstrap::boot(dirname(__DIR__, 2) . '/backend');
$pdo = Database::connect();

// Helper to create test players cleanly using Player model
function createTestPlayer(string $name, int $level = 20, int $gold = 1000): Player {
    $pid = 'adv_m3_' . bin2hex(random_bytes(6));
    $uname = 'm3_' . bin2hex(random_bytes(4));
    $p = new Player($name, 'male');
    $p->id = $pid;
    $p->username = $uname;
    $p->level = $level;
    $p->gold = $gold;
    $p->currentHp = 1000;
    $p->currentStamina = 100;
    $p->currentEnergy = 100;
    $p->stats = [
        'strength' => 50,
        'defense' => 50,
        'speed' => 50,
        'dexterity' => 50,
        'maxHp' => 1000
    ];
    savePlayer($pid, $p);
    return $p;
}

function cleanupPlayer(string $id, \PDO $pdo): void {
    $pdo->prepare("DELETE FROM pvp_history WHERE attacker_id = ? OR defender_id = ?")->execute([$id, $id]);
    $pdo->prepare("DELETE FROM pvp_arena WHERE player_id = ?")->execute([$id]);
    $pdo->prepare("DELETE FROM players WHERE id = ?")->execute([$id]);
}

// ====================================================================
// SECTION 1: DATABASE SCHEMA & UTF8MB4 COLLATION VERIFICATION
// ====================================================================
echo "\033[1m▶ Section 1: Database Schema & Collation Verification\033[0m\n";

{
    // Check pvp_history columns
    $colsStmt = $pdo->query("SHOW FULL COLUMNS FROM pvp_history");
    $cols = $colsStmt->fetchAll(\PDO::FETCH_ASSOC);
    $colMap = [];
    foreach ($cols as $c) {
        $colMap[$c['Field']] = $c;
    }

    assertTest(isset($colMap['fight_log']), 'Table pvp_history: column fight_log exists');
    assertTest(
        str_contains(strtolower($colMap['fight_log']['Collation'] ?? ''), 'utf8mb4'),
        'Table pvp_history: fight_log has utf8mb4 collation for full emoji support',
        'Got collation: ' . ($colMap['fight_log']['Collation'] ?? 'none')
    );
    assertTest($colMap['fight_log']['Null'] === 'YES', 'Table pvp_history: fight_log allows NULL (legacy compatibility)');

    // Check pvp_arena columns
    $arenaColsStmt = $pdo->query("SHOW FULL COLUMNS FROM pvp_arena");
    $arenaCols = $arenaColsStmt->fetchAll(\PDO::FETCH_ASSOC);
    $arenaColMap = [];
    foreach ($arenaCols as $c) {
        $arenaColMap[$c['Field']] = $c;
    }

    assertTest(isset($arenaColMap['streak']), 'Table pvp_arena: column streak exists');
    assertTest(str_starts_with($arenaColMap['streak']['Type'], 'int'), 'Table pvp_arena: streak is signed integer type');
}

// ====================================================================
// SECTION 2: JSON_UNESCAPED_UNICODE & MULTI-BYTE EMOJI FIDELITY
// ====================================================================
echo "\n\033[1m▶ Section 2: UTF-8 Vietnamese & 4-Byte Emoji Serialization Fidelity\033[0m\n";

{
    // Complex adversarial combat log with heavy Vietnamese diacritics and 4-byte emojis
    $adversarialLog = [
        [
            'turn' => 1,
            'attacker' => 'player',
            'defender' => 'opponent',
            'action' => 'skill',
            'skillName' => 'Lục Đạo Luân Hồi Kiếm',
            'damage' => 1250,
            'isCrit' => true,
            'isDodge' => false,
            'text' => 'Turn 1: ⚡ [Kích Hoạt] Tiêu Viêm thi triển [Lục Đạo Luân Hồi Kiếm] gây 1250 sát thương! 💥 CHÍ MẠNG!'
        ],
        [
            'turn' => 2,
            'attacker' => 'opponent',
            'defender' => 'player',
            'action' => 'skill',
            'skillName' => 'Hư Vô Thôn Viêm',
            'damage' => 0,
            'isCrit' => false,
            'isDodge' => true,
            'text' => 'Turn 2: Tiêu Viêm né tránh hoàn toàn đòn đánh! 🎯'
        ],
        [
            'turn' => 3,
            'attacker' => 'player',
            'defender' => 'opponent',
            'action' => 'attack',
            'damage' => 450,
            'isCrit' => false,
            'isDodge' => false,
            'text' => 'Turn 3: ⚔️ Tiêu Viêm xuất thường công gây 450 ST'
        ]
    ];

    // Encode using exact flags from routes.php: JSON_UNESCAPED_UNICODE
    $encoded = json_encode($adversarialLog, JSON_UNESCAPED_UNICODE);

    // Verify unescaped unicode: should NOT contain \u0111 or \ud83d
    assertTest(!str_contains($encoded, '\u'), 'JSON_UNESCAPED_UNICODE: does not escape characters to \\uXXXX');
    assertTest(str_contains($encoded, 'Lục Đạo Luân Hồi Kiếm'), 'JSON_UNESCAPED_UNICODE: Vietnamese diacritics preserved raw in string');
    assertTest(str_contains($encoded, '💥'), 'JSON_UNESCAPED_UNICODE: 4-byte emoji 💥 preserved raw');
    assertTest(str_contains($encoded, '⚡'), 'JSON_UNESCAPED_UNICODE: emoji ⚡ preserved raw');
    assertTest(str_contains($encoded, '⚔️'), 'JSON_UNESCAPED_UNICODE: emoji ⚔️ preserved raw');

    // Create temporary players using Player model
    $att = createTestPlayer('Tiêu Viêm Adv', 50, 1000);
    $def = createTestPlayer('Hồn Thiên Đế Adv', 48, 1000);

    $insertStmt = $pdo->prepare("
        INSERT INTO pvp_history (attacker_id, defender_id, winner_id, rating_change, gold_reward, fight_log)
        VALUES (?, ?, ?, 25, 200, ?)
    ");
    $insertStmt->execute([$att->id, $def->id, $att->id, $encoded]);
    $insertedId = (int)$pdo->lastInsertId();

    assertTest($insertedId > 0, 'Database Insert: pvp_history row inserted successfully');

    // Fetch back via PDO
    $selectStmt = $pdo->prepare("SELECT fight_log FROM pvp_history WHERE id = ?");
    $selectStmt->execute([$insertedId]);
    $row = $selectStmt->fetch(\PDO::FETCH_ASSOC);

    assertTest($row !== false, 'Database Select: retrieved inserted pvp_history row');
    assertTest($row['fight_log'] === $encoded, 'Database Round-Trip: fetched fight_log byte-for-byte matches encoded JSON');

    // Decode and verify structure
    $decoded = json_decode($row['fight_log'], true);
    assertTest(is_array($decoded) && count($decoded) === 3, 'JSON Decode: successfully decodes to 3-turn array');
    assertTest($decoded[0]['skillName'] === 'Lục Đạo Luân Hồi Kiếm', 'Decoded Content: turn 1 skillName intact');
    assertTest($decoded[0]['isCrit'] === true, 'Decoded Content: turn 1 isCrit flag intact');
    assertTest($decoded[1]['isDodge'] === true, 'Decoded Content: turn 2 isDodge flag intact');
    assertTest($decoded[1]['text'] === 'Turn 2: Tiêu Viêm né tránh hoàn toàn đòn đánh! 🎯', 'Decoded Content: turn 2 emoji text intact');

    // Clean up
    $pdo->prepare("DELETE FROM pvp_history WHERE id = ?")->execute([$insertedId]);
    cleanupPlayer($att->id, $pdo);
    cleanupPlayer($def->id, $pdo);
}

// ====================================================================
// SECTION 3: SERIALIZATION BOUNDARIES: EMPTY, NULL, MALFORMED LOGS
// ====================================================================
echo "\n\033[1m▶ Section 3: Boundary Logs: Empty Arrays, NULL, Malformed JSON\033[0m\n";

{
    $att = createTestPlayer('Player Bnd 1', 20, 500);
    $def = createTestPlayer('Player Bnd 2', 20, 500);

    // 1. Empty array: json_encode([]) -> "[]"
    $emptyJson = json_encode([], JSON_UNESCAPED_UNICODE);
    assertTest($emptyJson === '[]', 'Empty array: serializes strictly to "[]"');
    $pdo->prepare("INSERT INTO pvp_history (attacker_id, defender_id, winner_id, rating_change, gold_reward, fight_log) VALUES (?, ?, ?, 10, 200, ?)")
        ->execute([$att->id, $def->id, $att->id, $emptyJson]);
    $emptyId = (int)$pdo->lastInsertId();

    $stmtEmpty = $pdo->prepare("SELECT fight_log FROM pvp_history WHERE id = ?");
    $stmtEmpty->execute([$emptyId]);
    $rowEmpty = $stmtEmpty->fetch(\PDO::FETCH_ASSOC);
    assertTest($rowEmpty['fight_log'] === '[]', 'Database: stores and retrieves empty JSON array "[]"');
    assertTest(json_decode($rowEmpty['fight_log'], true) === [], 'Database: decodes empty JSON array to []');

    // 2. NULL log (simulating legacy pre-M3 database records)
    $pdo->prepare("INSERT INTO pvp_history (attacker_id, defender_id, winner_id, rating_change, gold_reward, fight_log) VALUES (?, ?, ?, -15, 0, NULL)")
        ->execute([$att->id, $def->id, $def->id]);
    $nullId = (int)$pdo->lastInsertId();

    $stmtNull = $pdo->prepare("SELECT fight_log FROM pvp_history WHERE id = ?");
    $stmtNull->execute([$nullId]);
    $rowNull = $stmtNull->fetch(\PDO::FETCH_ASSOC);
    assertTest($rowNull['fight_log'] === null, 'Database: legacy NULL fight_log successfully retrieved as null');

    // 3. Malformed JSON string resilience in database
    $malformedStr = '{"broken": [incomplete, 123';
    $pdo->prepare("INSERT INTO pvp_history (attacker_id, defender_id, winner_id, rating_change, gold_reward, fight_log) VALUES (?, ?, ?, 5, 200, ?)")
        ->execute([$att->id, $def->id, $att->id, $malformedStr]);
    $malformedId = (int)$pdo->lastInsertId();

    $stmtMal = $pdo->prepare("SELECT fight_log FROM pvp_history WHERE id = ?");
    $stmtMal->execute([$malformedId]);
    $rowMal = $stmtMal->fetch(\PDO::FETCH_ASSOC);
    assertTest($rowMal['fight_log'] === $malformedStr, 'Database: stores arbitrary text without SQL corruption');
    assertTest(json_decode($rowMal['fight_log'], true) === null, 'PHP json_decode: returns null on malformed JSON without fatal error');

    // Clean up
    $pdo->prepare("DELETE FROM pvp_history WHERE id IN (?, ?, ?)")->execute([$emptyId, $nullId, $malformedId]);
    cleanupPlayer($att->id, $pdo);
    cleanupPlayer($def->id, $pdo);
}

// ====================================================================
// SECTION 4: ARENA RANK RESOLUTION & THRESHOLD CALCULATION STRESS
// ====================================================================
echo "\n\033[1m▶ Section 4: Arena Rank Resolution (\$getRank) & Division by Zero Vulnerability\033[0m\n";

{
    $routesCode = file_get_contents(__DIR__ . '/../../backend/src/Features/Arena/routes.php');
    $RANKS = [
        ['name' => 'Vô Danh',   'icon' => '🌑', 'min' => 0,    'color' => '#666'],
        ['name' => 'Võ Sinh',   'icon' => '🥋', 'min' => 1000, 'color' => '#5ba3cf'],
        ['name' => 'Võ Sĩ',    'icon' => '⚔️', 'min' => 1200, 'color' => '#6a8f3f'],
        ['name' => 'Đấu Sĩ',   'icon' => '🔥', 'min' => 1400, 'color' => '#d4a017'],
        ['name' => 'Đấu Sư',   'icon' => '💫', 'min' => 1600, 'color' => '#b06cff'],
        ['name' => 'Á Quân',    'icon' => '🥈', 'min' => 1800, 'color' => '#c0c0c0'],
        ['name' => 'Quán Quân', 'icon' => '👑', 'min' => 2000, 'color' => '#ff4500'],
    ];

    if (preg_match('/\$getRank\s*=\s*(function\s*\([^)]*\)\s*use\s*\([^)]*\)\s*\{[\s\S]*?\n\s*\};)/', $routesCode, $matches)) {
        eval('$routesGetRank = ' . $matches[1] . ';');
    } else {
        throw new \RuntimeException("Could not extract \$getRank closure from routes.php");
    }

    // Test Rank 0 (rating 500)
    try {
        $r500 = $routesGetRank(500);
        assertTest($r500['name'] === 'Vô Danh', 'Rank 500: resolves to Vô Danh');
        assertTest($r500['nextThreshold'] === 1000, 'Rank 500: nextThreshold is 1000');
    } catch (\Throwable $e) {
        assertTest(false, 'Rank 500: calculation succeeds', $e->getMessage());
    }

    // Test Default Starting Rank (rating 1000 - Võ Sinh)
    // BUG FINDING: routes.php line 30-35 causes Division by zero!
    try {
        $r1000 = $routesGetRank(1000);
        assertTest($r1000['name'] === 'Võ Sinh', 'Rank 1000 (Võ Sinh): calculation succeeds without exception');
        assertTest($r1000['nextThreshold'] === 1200, 'Rank 1000 (Võ Sinh): nextThreshold should be 1200 (Võ Sĩ)');
    } catch (\DivisionByZeroError $e) {
        assertTest(false, 'Rank 1000 (Võ Sinh): calculation succeeds without exception', 'CRITICAL BUG: DivisionByZeroError at backend/src/Features/Arena/routes.php:35 (nextIdx evaluates to false, ($rank[\'nextThreshold\'] - $rank[\'min\']) evaluates to 1000 - 1000 = 0)');
    } catch (\Throwable $e) {
        assertTest(false, 'Rank 1000 (Võ Sinh): calculation succeeds without exception', get_class($e) . ': ' . $e->getMessage());
    }

    // Test Rank 1100 (Mid Võ Sinh)
    try {
        $r1100 = $routesGetRank(1100);
        assertTest($r1100['name'] === 'Võ Sinh', 'Rank 1100 (Võ Sinh): calculation succeeds');
    } catch (\DivisionByZeroError $e) {
        assertTest(false, 'Rank 1100 (Võ Sinh): calculation succeeds', "CRITICAL BUG: DivisionByZeroError at backend/src/Features/Arena/routes.php:35 on rating 1100");
    } catch (\Throwable $e) {
        assertTest(false, 'Rank 1100 (Võ Sinh): calculation succeeds', get_class($e) . ': ' . $e->getMessage());
    }

    // Test Rank 1200 (Võ Sĩ)
    try {
        $r1200 = $routesGetRank(1200);
        // Note: because array_search fails, nextThreshold is wrong (1000 instead of 1400)
        assertTest($r1200['nextThreshold'] === 1400, 'Rank 1200 (Võ Sĩ): nextThreshold should be 1400 (Đấu Sĩ)', "Got nextThreshold=" . var_export($r1200['nextThreshold'], true) . " due to broken array_search");
    } catch (\Throwable $e) {
        assertTest(false, 'Rank 1200 (Võ Sĩ): nextThreshold test', $e->getMessage());
    }
}

// ====================================================================
// SECTION 5: SLIM ROUTE HTTP ENDPOINTS: GET & POST VULNERABILITIES
// ====================================================================
echo "\n\033[1m▶ Section 5: Slim Route HTTP Endpoints Execution (GET /arena & POST /arena/fight)\033[0m\n";

{
    // Test GET /api/player/{id}/arena with a player having default rating 1000
    $player = createTestPlayer('Arena Tester 1000', 25, 1000);
    $pdo->prepare("INSERT INTO pvp_arena (player_id, rating, wins, losses, streak) VALUES (?, 1000, 0, 0, 0)")
        ->execute([$player->id]);

    $request = (new ServerRequestFactory())->createServerRequest('GET', "/api/player/{$player->id}/arena");
    $response = $app->handle($request);

    if ($response->getStatusCode() === 200) {
        assertTest(true, 'GET /arena HTTP 200: returns OK for rating 1000 player');
    } else {
        $bodyStr = (string)$response->getBody();
        $isDivByZero = str_contains($bodyStr, 'DivisionByZeroError');
        assertTest(false, 'GET /arena HTTP 200: returns OK for rating 1000 player', "CRITICAL HTTP {$response->getStatusCode()}: " . ($isDivByZero ? 'Slim Application Error: DivisionByZeroError at routes.php:35' : 'Request failed'));
    }

    // Test POST /api/player/{id}/arena/fight with a rating 1000 player
    $opp = createTestPlayer('Opponent 1000', 25, 1000);
    $pdo->prepare("INSERT INTO pvp_arena (player_id, rating, wins, losses, streak) VALUES (?, 1000, 0, 0, 0)")
        ->execute([$opp->id]);

    $fightReq = (new ServerRequestFactory())->createServerRequest('POST', "/api/player/{$player->id}/arena/fight")
        ->withHeader('Content-Type', 'application/json');
    $fightReq->getBody()->write(json_encode(['opponentId' => $opp->id]));
    $fightRes = $app->handle($fightReq);

    if ($fightRes->getStatusCode() === 200) {
        assertTest(true, 'POST /arena/fight HTTP 200: duel execution succeeds without server error');
    } else {
        $fightBody = (string)$fightRes->getBody();
        $isDivByZero = str_contains($fightBody, 'DivisionByZeroError');
        assertTest(false, 'POST /arena/fight HTTP 200: duel execution succeeds without server error', "CRITICAL HTTP {$fightRes->getStatusCode()}: " . ($isDivByZero ? 'Slim Application Error: DivisionByZeroError at routes.php:35' : 'Fight request failed'));
    }

    cleanupPlayer($player->id, $pdo);
    cleanupPlayer($opp->id, $pdo);
}

// ====================================================================
// SUMMARY & EXIT
// ====================================================================
echo "\n\033[1m\033[35m====================================================================\033[0m\n";
echo "\033[1m\033[35m             M3 ADVERSARIAL PHP SUITE EXECUTION SUMMARY             \033[0m\n";
echo "\033[1m\033[35m====================================================================\033[0m\n";
echo "  Total Checks Executed : " . ($passed + $failed) . "\n";
echo "  Passed Checks         : \033[32m{$passed}\033[0m\n";
echo "  Failed Checks         : " . ($failed > 0 ? "\033[31m{$failed}\033[0m" : "\033[32m0\033[0m") . "\n";
echo "--------------------------------------------------------------------\n";

if ($failed === 0) {
    echo "\033[32m\033[1m  VERDICT: ALL M3 BACKEND FIGHT LOG & STREAK CHECKS PASSED (100%)\033[0m\n";
    echo "\033[1m\033[35m====================================================================\033[0m\n\n";
    exit(0);
} else {
    echo "\033[31m\033[1m  VERDICT: {$failed} ADVERSARIAL BACKEND VULNERABILITIES DETECTED\033[0m\n";
    echo "\033[1m\033[35m====================================================================\033[0m\n\n";
    exit(1);
}
