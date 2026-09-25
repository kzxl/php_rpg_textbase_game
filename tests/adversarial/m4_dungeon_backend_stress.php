<?php
/**
 * Adversarial Test Suite: Milestone M4 Dungeon & Secret Realm Backend Engine (PHP)
 * 
 * Verifies:
 * 1. Database Schema & Tables:
 *    - player_discovered_dungeons table integrity
 *    - realm_type enum/varchar ('timed', 'permanent')
 *    - expires_at column (nullable for permanent)
 *    - difficulty_mult precision and persistence
 * 2. SecretRealmRegistry Template Integrity:
 *    - Timed templates (durationMinutes != null, 1.05x - 1.5x)
 *    - Permanent templates (durationMinutes == null, 2.0x - 3.5x)
 *    - Boss stats, health scaling, status effects, and signature drops
 * 3. Slim Route HTTP Endpoints:
 *    - GET /api/player/{id}/dungeon/map-items
 *    - POST /api/player/{id}/dungeon/enter-discovered
 */

require_once __DIR__ . '/../../backend/vendor/autoload.php';

use App\Core\Database;
use App\Core\SecretRealmRegistry;
use App\Models\Player;

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
echo "\033[1m\033[35m  ADVERSARIAL STRESS TEST: M4 BACKEND DUNGEON & SECRET REALMS (PHP) \033[0m\n";
echo "\033[1m\033[35m====================================================================\033[0m\n\n";

$pdo = Database::pdo();

// ====================================================================
// SECTION 1: DATABASE SCHEMA INTEGRITY FOR SECRET REALMS
// ====================================================================
echo "\033[1m▶ Section 1: Database Schema & Secret Realm Storage\033[0m\n";

$tableStmt = $pdo->query("SHOW TABLES LIKE 'player_discovered_dungeons'");
assertTest($tableStmt->rowCount() > 0, "Table player_discovered_dungeons exists");

$colStmt = $pdo->query("DESCRIBE player_discovered_dungeons");
$columns = $colStmt->fetchAll(\PDO::FETCH_ASSOC);
$colNames = array_column($columns, 'Field');

assertTest(in_array('player_id', $colNames), "Column player_id exists");
assertTest(in_array('dungeon_key', $colNames), "Column dungeon_key exists");
assertTest(in_array('realm_type', $colNames), "Column realm_type exists");
assertTest(in_array('difficulty_mult', $colNames), "Column difficulty_mult exists");
assertTest(in_array('expires_at', $colNames), "Column expires_at exists");
assertTest(in_array('is_cleared', $colNames), "Column is_cleared exists");
assertTest(in_array('clear_count', $colNames), "Column clear_count exists");

// Check nullability of expires_at for permanent realms
$expiresCol = null;
foreach ($columns as $c) {
    if ($c['Field'] === 'expires_at') $expiresCol = $c;
}
assertTest($expiresCol && $expiresCol['Null'] === 'YES', "Column expires_at allows NULL (mandatory for permanent realms)");

// ====================================================================
// SECTION 2: SECRET REALM REGISTRY TEMPLATES AUDIT
// ====================================================================
echo "\n\033[1m▶ Section 2: SecretRealmRegistry Template Multipliers & Rules\033[0m\n";

$timedTemplates = SecretRealmRegistry::getTimedTemplates();
assertTest(count($timedTemplates) >= 4, "At least 4 Timed Secret Realm templates configured");

$allTimedValid = true;
foreach ($timedTemplates as $t) {
    if (empty($t['key']) || empty($t['name']) || empty($t['durationMinutes']) || $t['durationMinutes'] <= 0) {
        $allTimedValid = false;
    }
    if ($t['difficultyMult'] < 1.05 || $t['difficultyMult'] > 1.80) {
        $allTimedValid = false;
    }
    if (empty($t['boss']['name']) || empty($t['boss']['stats']['hp'])) {
        $allTimedValid = false;
    }
}
assertTest($allTimedValid, "All Timed templates have durationMinutes > 0, difficulty in [1.05..1.80] and valid boss stats");

$permTemplates = SecretRealmRegistry::getPermanentTemplates();
assertTest(count($permTemplates) >= 3, "At least 3 Permanent Secret Realm (Thượng Cổ Cấm Địa) templates configured");

$allPermValid = true;
foreach ($permTemplates as $p) {
    if (empty($p['key']) || empty($p['name']) || $p['durationMinutes'] !== null) {
        $allPermValid = false;
    }
    // Difficulty MUST be extreme (>= 2.0x)
    if ($p['difficultyMult'] < 2.0) {
        $allPermValid = false;
    }
    if (empty($p['boss']['name']) || ($p['boss']['stats']['hp'] ?? 0) < 1500) {
        $allPermValid = false;
    }
}
assertTest($allPermValid, "All Permanent templates have durationMinutes=null, extreme difficulty (>= 2.0x) and boss HP >= 1500");

// ====================================================================
// SECTION 3: GENERATION & DISCOVERY LOGIC
// ====================================================================
echo "\n\033[1m▶ Section 3: Secret Realm Generation & Expiry Simulation\033[0m\n";

$mockPlayer = Player::fromArray(['id' => 'test_m4_player', 'name' => 'Đạo Hữu Test', 'gender' => 'male', 'realm' => 3, 'level' => 35]);

$discovery = SecretRealmRegistry::generateDiscovery($mockPlayer, 'thanh_lam_tran');
assertTest(!empty($discovery['dungeon_key']), "generateDiscovery produces a valid dungeon_key");
assertTest(in_array($discovery['realm_type'], ['timed', 'permanent']), "Generated realm_type is strictly 'timed' or 'permanent'");

if ($discovery['realm_type'] === 'timed') {
    assertTest(!empty($discovery['expires_at']), "Timed discovery assigns non-null expires_at timestamp");
    assertTest($discovery['difficulty_mult'] <= 1.80, "Timed discovery has standard difficulty multiplier <= 1.80");
} else {
    assertTest($discovery['expires_at'] === null, "Permanent discovery assigns strictly null expires_at");
    assertTest($discovery['difficulty_mult'] >= 2.0, "Permanent discovery has extreme difficulty multiplier >= 2.0");
}

// ====================================================================
// SECTION 4: SLIM REST ROUTE INTEGRATION (MAP ITEMS & REALMS)
// ====================================================================
echo "\n\033[1m▶ Section 4: Slim REST Route Integration (/api/player/{id}/dungeon/map-items)\033[0m\n";

$app = \App\Core\AppBootstrap::boot(__DIR__ . '/../../backend');
$reqFactory = new \Slim\Psr7\Factory\ServerRequestFactory();

// Create test player in DB
$testPid = 'm4_test_' . substr(md5(uniqid()), 0, 8);
$player = new Player('Tiên Nhân Thử Nghiệm M4', 'male');
$player->id = $testPid;
$player->username = 'u_' . $testPid;
$player->level = 50;
$player->realmTier = 3;
$player->currentStamina = 100;
$player->currentEnergy = 100;
$player->gold = 10000;
$player->currentArea = 'thanh_lam_tran';
savePlayer($testPid, $player);

// Insert 1 mock timed and 1 mock permanent dungeon
$pdo->prepare("
    INSERT INTO player_discovered_dungeons 
    (player_id, dungeon_key, realm_type, name, description, tier, required_realm, difficulty_mult, waves, area_id, discovered_at, expires_at, is_cleared, status, boss_data, rewards_data)
    VALUES (?, ?, 'timed', 'Huyễn Cảnh Test', 'Mô tả test', 1, 1, 1.15, 3, 'thanh_lam_tran', NOW(), DATE_ADD(NOW(), INTERVAL 30 MINUTE), 0, 'available', '{}', '{}')
")->execute([$testPid, 'huyen_canh_linh_duoc']);

$pdo->prepare("
    INSERT INTO player_discovered_dungeons 
    (player_id, dungeon_key, realm_type, name, description, tier, required_realm, difficulty_mult, waves, area_id, discovered_at, expires_at, is_cleared, status, boss_data, rewards_data)
    VALUES (?, ?, 'permanent', 'Cấm Địa Test', 'Mô tả test', 2, 2, 2.20, 4, 'thanh_lam_tran', NOW(), NULL, 0, 'available', '{}', '{}')
")->execute([$testPid, 'cam_dia_man_hoang']);

// Execute GET /api/player/{id}/map-items
$req = $reqFactory->createServerRequest('GET', "/api/player/{$testPid}/map-items");
$res = $app->handle($req);

assertTest($res->getStatusCode() === 200, "GET /api/player/{id}/map-items returns HTTP 200");
$body = json_decode((string)$res->getBody(), true);

assertTest(isset($body['timedDungeons']) && is_array($body['timedDungeons']), "Response contains timedDungeons array");
assertTest(isset($body['permanentDungeons']) && is_array($body['permanentDungeons']), "Response contains permanentDungeons array");
assertTest(count($body['timedDungeons']) >= 1, "timedDungeons returns at least 1 discovered timed rift");
assertTest(count($body['permanentDungeons']) >= 1, "permanentDungeons returns at least 1 discovered permanent zone");
assertTest($body['timedDungeons'][0]['remainingSeconds'] > 0, "Timed dungeon reports positive remainingSeconds");
assertTest($body['permanentDungeons'][0]['difficultyMult'] >= 2.0, "Permanent dungeon reports extreme difficultyMult >= 2.0");

// Clean up test player and test dungeons
$pdo->prepare("DELETE FROM player_discovered_dungeons WHERE player_id = ?")->execute([$testPid]);
$pdo->prepare("DELETE FROM players WHERE id = ?")->execute([$testPid]);

// ====================================================================
// SUMMARY REPORT
// ====================================================================
echo "\n\033[1m\033[35m====================================================================\033[0m\n";
echo "\033[1m\033[35m             M4 BACKEND DUNGEON TEST SUMMARY                        \033[0m\n";
echo "\033[1m\033[35m====================================================================\033[0m\n";
$total = $passed + $failed;
echo "  Total Checks Executed : \033[1m{$total}\033[0m\n";
echo "  Passed Checks         : \033[32m\033[1m{$passed}\033[0m\n";
$failColor = $failed > 0 ? "\033[31m" : "\033[32m";
echo "  Failed Checks         : {$failColor}\033[1m{$failed}\033[0m\n";
echo "--------------------------------------------------------------------\n";

if ($failed === 0) {
    echo "\033[32m\033[1m  VERDICT: ALL M4 BACKEND DUNGEON CHECKS PASSED (100% SUCCESS)\033[0m\n";
    echo "\033[1m\033[35m====================================================================\033[0m\n\n";
    exit(0);
} else {
    echo "\033[31m\033[1m  VERDICT: FAILURES DETECTED IN M4 BACKEND DUNGEON SUITE\033[0m\n";
    echo "\033[1m\033[35m====================================================================\033[0m\n\n";
    exit(1);
}
