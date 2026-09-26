<?php
/**
 * spec_sql_ddl_empirical.php - Empirical SQL DDL Schema Execution & Constraint Verification
 * Author: Challenger 2 (Empirical Concurrency & SQL Schema Verifier)
 */

declare(strict_types=1);

$host = '127.0.0.1';
$port = 3306;
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host={$host};port={$port};charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
} catch (PDOException $e) {
    echo "FAILED TO CONNECT: " . $e->getMessage() . "\n";
    exit(1);
}

echo "================================================================================\n";
echo " LIVE SQL DDL SYNTAX & COMPATIBILITY EMPIRICAL VERIFICATION\n";
echo " Engine: " . $pdo->query("SELECT VERSION()")->fetchColumn() . "\n";
echo "================================================================================\n\n";

// Create isolated test database
$testDb = 'test_rpg_multiplayer_spec';
$pdo->exec("DROP DATABASE IF EXISTS `{$testDb}`");
$pdo->exec("CREATE DATABASE `{$testDb}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
$pdo->exec("USE `{$testDb}`");

echo "[TEST 1] Creating mock parent 'players' table...\n";
// Scenario A: Mock players with VARCHAR(32) (matching current production database schema in 001_init.sql)
$pdo->exec("
CREATE TABLE players (
    id VARCHAR(32) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    gold BIGINT UNSIGNED DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
");
echo "  -> Created players table with id VARCHAR(32)\n";

// Scenario B: Attempt to create player_states with VARCHAR(36) referencing VARCHAR(32)
echo "\n[TEST 2] Testing Foreign Key Data Type Compatibility (VARCHAR(36) -> VARCHAR(32))...\n";
$playerStatesDdl = "
CREATE TABLE IF NOT EXISTS player_states (
    player_id VARCHAR(36) NOT NULL,
    status ENUM('normal', 'hospitalized', 'jailed', 'traveling') NOT NULL DEFAULT 'normal',
    hospital_until BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Unix epoch timestamp for hospital release',
    jail_until BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Unix epoch timestamp for prison release',
    travel_until BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Unix epoch timestamp for arrival',
    travel_dest_id VARCHAR(50) DEFAULT NULL COMMENT 'Target destination area ID',
    active_combat_session_id VARCHAR(36) DEFAULT NULL COMMENT 'Active PvP mutex lock session ID',
    med_cooldown_until BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Medical pill consumption cooldown cap',
    version INT UNSIGNED NOT NULL DEFAULT 1 COMMENT 'Optimistic concurrency control version',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (player_id),
    INDEX idx_status (status),
    INDEX idx_hospital_until (hospital_until),
    INDEX idx_jail_until (jail_until),
    INDEX idx_travel_until (travel_until),
    INDEX idx_active_session (active_combat_session_id),
    CONSTRAINT fk_player_states_player 
        FOREIGN KEY (player_id) REFERENCES players(id) 
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT chk_timestamps_positive 
        CHECK (hospital_until >= 0 AND jail_until >= 0 AND travel_until >= 0 AND med_cooldown_until >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
";

try {
    $pdo->exec($playerStatesDdl);
    echo "  -> SUCCESS: Foreign Key created without error.\n";
} catch (PDOException $e) {
    echo "  -> EMPIRICAL FAILURE CONFIRMED!\n";
    echo "     Error Code: " . $e->getCode() . "\n";
    echo "     Error Message: " . $e->getMessage() . "\n";
    echo "     Diagnosis: InnoDB rejects foreign keys when child column length (VARCHAR(36)) differs from parent (VARCHAR(32))!\n";
}

// Scenario B: In Test 2, player_states was created.
// Note on MySQL vs MariaDB:
// In MySQL 8.0+, VARCHAR(36) referencing VARCHAR(32) throws ERROR 3780.
// In MariaDB, it creates the table but locks the parent column from modification (Error 1833).
// If we want to alter players(id) to VARCHAR(36), we must either do it BEFORE creating child tables,
// or execute SET FOREIGN_KEY_CHECKS = 0.
echo "\n[TEST 3] Dropping player_states and altering players.id to VARCHAR(36)...\n";
$pdo->exec("DROP TABLE IF EXISTS player_states;");
$pdo->exec("ALTER TABLE players MODIFY id VARCHAR(36) NOT NULL;");
echo "  -> Altered players.id to VARCHAR(36) successfully.\n";
$pdo->exec($playerStatesDdl);
echo "  -> Re-created player_states with exact VARCHAR(36) -> VARCHAR(36) definition.\n";



// Now test all remaining 7 tables in exact order from Section 6.1
echo "\n[TEST 4] Validating Table 2: pvp_combat_sessions...\n";
$pvpDdl = "
CREATE TABLE IF NOT EXISTS pvp_combat_sessions (
    session_id VARCHAR(36) NOT NULL,
    attacker_id VARCHAR(36) NOT NULL,
    defender_id VARCHAR(36) NOT NULL,
    status ENUM('in_progress', 'pending_action', 'resolved', 'expired') NOT NULL DEFAULT 'in_progress',
    outcome ENUM('attacker_won', 'defender_won', 'draw', 'fled', 'abandoned') DEFAULT NULL,
    action_chosen ENUM('leave', 'rob', 'wound') DEFAULT NULL COMMENT 'Phase 2 choice by victor (Chỉ Điểm, Đoạt Bảo, Trọng Thương)',
    loot_stolen BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Linh Thạch stolen if rob chosen',
    combat_log JSON DEFAULT NULL COMMENT 'Round-by-round combat telemetry and damage rolls',
    action_expires_at BIGINT UNSIGNED NOT NULL COMMENT 'Expiry timestamp for victor action phase (60s)',
    started_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP NULL DEFAULT NULL,

    PRIMARY KEY (session_id),
    INDEX idx_attacker_status (attacker_id, status),
    INDEX idx_defender_status (defender_id, status),
    INDEX idx_action_expires (action_expires_at),
    CONSTRAINT fk_pvp_attacker 
        FOREIGN KEY (attacker_id) REFERENCES players(id) 
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_pvp_defender 
        FOREIGN KEY (defender_id) REFERENCES players(id) 
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
";
$pdo->exec($pvpDdl);
echo "  -> Table 'pvp_combat_sessions' created successfully.\n";

echo "\n[TEST 5] Validating Table 3: bazaar_listings...\n";
$bazaarDdl = "
CREATE TABLE IF NOT EXISTS bazaar_listings (
    listing_id BIGINT UNSIGNED AUTO_INCREMENT NOT NULL,
    seller_id VARCHAR(36) NOT NULL,
    item_id VARCHAR(50) NOT NULL COMMENT 'Base item or material identifier',
    item_data JSON DEFAULT NULL COMMENT 'Affixes, enhancement +N, serials if equipment',
    quantity INT UNSIGNED NOT NULL DEFAULT 1,
    unit_price BIGINT UNSIGNED NOT NULL COMMENT 'Price per single unit in Linh Thạch',
    tax_rate DECIMAL(5, 2) NOT NULL DEFAULT 5.00 COMMENT 'Transaction tax percentage',
    status ENUM('active', 'sold_out', 'cancelled') NOT NULL DEFAULT 'active',
    version INT UNSIGNED NOT NULL DEFAULT 1 COMMENT 'OCC monotonic version for safe listing edits',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (listing_id),
    INDEX idx_market_lookup (status, item_id, unit_price),
    INDEX idx_seller_status (seller_id, status),
    INDEX idx_created_at (created_at),
    CONSTRAINT fk_bazaar_seller 
        FOREIGN KEY (seller_id) REFERENCES players(id) 
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT chk_positive_pricing 
        CHECK (quantity >= 0 AND unit_price > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
";
$pdo->exec($bazaarDdl);
echo "  -> Table 'bazaar_listings' created successfully.\n";

echo "\n[TEST 6] Validating Table 4: trade_offers...\n";
$tradeDdl = "
CREATE TABLE IF NOT EXISTS trade_offers (
    trade_id VARCHAR(36) NOT NULL,
    initiator_id VARCHAR(36) NOT NULL,
    receiver_id VARCHAR(36) NOT NULL,
    status ENUM('negotiating', 'initiator_locked', 'receiver_locked', 'both_locked', 'completed', 'cancelled', 'expired') NOT NULL DEFAULT 'negotiating',
    initiator_items JSON NOT NULL COMMENT 'Array of item UUIDs and quantities offered by initiator',
    receiver_items JSON NOT NULL COMMENT 'Array of item UUIDs and quantities offered by receiver',
    initiator_gold BIGINT UNSIGNED NOT NULL DEFAULT 0,
    receiver_gold BIGINT UNSIGNED NOT NULL DEFAULT 0,
    initiator_confirmed TINYINT(1) NOT NULL DEFAULT 0,
    receiver_confirmed TINYINT(1) NOT NULL DEFAULT 0,
    version INT UNSIGNED NOT NULL DEFAULT 1 COMMENT 'Strict monotonic OCC version',
    expires_at BIGINT UNSIGNED NOT NULL COMMENT 'Auto-cancellation epoch timestamp',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (trade_id),
    INDEX idx_initiator_status (initiator_id, status),
    INDEX idx_receiver_status (receiver_id, status),
    INDEX idx_expires (expires_at),
    CONSTRAINT fk_trade_initiator 
        FOREIGN KEY (initiator_id) REFERENCES players(id) 
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_trade_receiver 
        FOREIGN KEY (receiver_id) REFERENCES players(id) 
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
";
$pdo->exec($tradeDdl);
echo "  -> Table 'trade_offers' created successfully.\n";

echo "\n[TEST 7] Validating Table 5: factions...\n";
$factionsDdl = "
CREATE TABLE IF NOT EXISTS factions (
    faction_id INT UNSIGNED AUTO_INCREMENT NOT NULL,
    name VARCHAR(50) NOT NULL UNIQUE,
    tag VARCHAR(6) NOT NULL UNIQUE,
    description TEXT DEFAULT NULL,
    level TINYINT UNSIGNED NOT NULL DEFAULT 1,
    respect BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Faction Respect currency for tree upgrades',
    leader_id VARCHAR(36) NOT NULL,
    co_leader_id VARCHAR(36) DEFAULT NULL,
    treasury_balance BIGINT UNSIGNED NOT NULL DEFAULT 0,
    daily_upkeep INT UNSIGNED NOT NULL DEFAULT 100,
    max_members TINYINT UNSIGNED NOT NULL DEFAULT 10,
    version INT UNSIGNED NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (faction_id),
    INDEX idx_leader (leader_id),
    INDEX idx_respect (respect DESC),
    CONSTRAINT fk_faction_leader 
        FOREIGN KEY (leader_id) REFERENCES players(id) 
        ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_faction_co_leader 
        FOREIGN KEY (co_leader_id) REFERENCES players(id) 
        ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT chk_treasury_positive 
        CHECK (treasury_balance >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
";
$pdo->exec($factionsDdl);
echo "  -> Table 'factions' created successfully.\n";

echo "\n[TEST 8] Validating Table 6: faction_chains...\n";
$chainsDdl = "
CREATE TABLE IF NOT EXISTS faction_chains (
    chain_id BIGINT UNSIGNED AUTO_INCREMENT NOT NULL,
    faction_id INT UNSIGNED NOT NULL,
    current_count INT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Current chain hits completed',
    max_count INT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Milestone cap (10, 25, 50, 100, etc.)',
    multiplier DECIMAL(6, 3) NOT NULL DEFAULT 1.000 COMMENT 'Respect & stat bonus multiplier',
    timeout_at BIGINT UNSIGNED NOT NULL COMMENT 'Timestamp when chain will drop if no hit landed',
    status ENUM('active', 'cooldown', 'completed', 'broken') NOT NULL DEFAULT 'active',
    started_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (chain_id),
    INDEX idx_faction_chain_status (faction_id, status),
    INDEX idx_timeout (timeout_at),
    CONSTRAINT fk_chain_faction 
        FOREIGN KEY (faction_id) REFERENCES factions(faction_id) 
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
";
$pdo->exec($chainsDdl);
echo "  -> Table 'faction_chains' created successfully.\n";

echo "\n[TEST 9] Validating Table 7: faction_territories...\n";
$territoriesDdl = "
CREATE TABLE IF NOT EXISTS faction_territories (
    territory_id VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    controlling_faction_id INT UNSIGNED DEFAULT NULL,
    spirit_yield_rate INT UNSIGNED NOT NULL DEFAULT 100 COMMENT 'Spirit Stones generated per hour',
    respect_yield_rate INT UNSIGNED NOT NULL DEFAULT 10 COMMENT 'Faction Respect generated per hour',
    garrison_slots TINYINT UNSIGNED NOT NULL DEFAULT 5,
    defense_rating INT UNSIGNED NOT NULL DEFAULT 1000,
    contested_status ENUM('peaceful', 'under_attack', 'cooldown') NOT NULL DEFAULT 'peaceful',
    last_captured_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (territory_id),
    INDEX idx_controlling_faction (controlling_faction_id),
    INDEX idx_contested (contested_status),
    CONSTRAINT fk_territory_faction 
        FOREIGN KEY (controlling_faction_id) REFERENCES factions(faction_id) 
        ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
";
$pdo->exec($territoriesDdl);
echo "  -> Table 'faction_territories' created successfully.\n";

echo "\n[TEST 10] Validating Table 8: wallet_audit_ledger...\n";
$ledgerDdl = "
CREATE TABLE IF NOT EXISTS wallet_audit_ledger (
    ledger_id BIGINT UNSIGNED AUTO_INCREMENT NOT NULL,
    source_id VARCHAR(36) NOT NULL COMMENT 'Debited player ID or SYSTEM',
    dest_id VARCHAR(36) NOT NULL COMMENT 'Credited player ID or SINK',
    gross_amount BIGINT UNSIGNED NOT NULL,
    tax_amount BIGINT UNSIGNED NOT NULL DEFAULT 0,
    net_amount BIGINT UNSIGNED NOT NULL,
    reference_type ENUM('bazaar_buy', 'pvp_mug', 'trade_p2p', 'faction_upkeep', 'faction_deposit', 'forge_sink', 'tribulation_sink') NOT NULL,
    reference_id VARCHAR(64) NOT NULL COMMENT 'Transaction UUID or listing ID',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (ledger_id),
    INDEX idx_source (source_id),
    INDEX idx_dest (dest_id),
    INDEX idx_ref (reference_type, reference_id),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
";
$pdo->exec($ledgerDdl);
echo "  -> Table 'wallet_audit_ledger' created successfully.\n";

// ==============================================================================
// CONSTRAINT BEHAVIOR TESTS
// ==============================================================================
echo "\n================================================================================\n";
echo " EMPIRICAL CONSTRAINT & DATA INTEGRITY TESTS\n";
echo "================================================================================\n";

// Insert test player
$pdo->exec("INSERT INTO players (id, name, gold) VALUES ('usr_001', 'Test Cultivator 1', 100000);");
$pdo->exec("INSERT INTO players (id, name, gold) VALUES ('usr_002', 'Test Cultivator 2', 50000);");

// Test 11: CHECK (quantity >= 0 AND unit_price > 0) in bazaar_listings
echo "\n[TEST 11] Probing bazaar_listings CHECK Constraint on zero or negative price...\n";
try {
    $pdo->exec("INSERT INTO bazaar_listings (seller_id, item_id, quantity, unit_price) VALUES ('usr_001', 'item_sword', 1, 0);");
    echo "  -> VULNERABILITY: Insert of unit_price = 0 SUCCEEDED! (Check constraint bypassed)\n";
} catch (PDOException $e) {
    echo "  -> SUCCESS: unit_price = 0 was correctly REJECTED by CHECK constraint.\n";
    echo "     Error message: " . $e->getMessage() . "\n";
}

// Test 12: Missing CHECK (attacker_id != defender_id) in pvp_combat_sessions
echo "\n[TEST 12] Probing pvp_combat_sessions Self-Duel (attacker_id == defender_id)...\n";
try {
    $pdo->exec("INSERT INTO pvp_combat_sessions (session_id, attacker_id, defender_id, action_expires_at) VALUES ('sess_self', 'usr_001', 'usr_001', 1790400000);");
    echo "  -> VULNERABILITY CONFIRMED: Table allows attacker_id == defender_id! Database has no CHECK constraint!\n";
} catch (PDOException $e) {
    echo "  -> Rejected: " . $e->getMessage() . "\n";
}

// Test 13: Missing CHECK (initiator_id != receiver_id) in trade_offers
echo "\n[TEST 13] Probing trade_offers Self-Trade (initiator_id == receiver_id)...\n";
try {
    $pdo->exec("INSERT INTO trade_offers (trade_id, initiator_id, receiver_id, initiator_items, receiver_items, expires_at) VALUES ('trade_self', 'usr_001', 'usr_001', '[]', '[]', 1790400000);");
    echo "  -> VULNERABILITY CONFIRMED: Table allows initiator_id == receiver_id! Database has no CHECK constraint!\n";
} catch (PDOException $e) {
    echo "  -> Rejected: " . $e->getMessage() . "\n";
}

// Test 14: Missing CHECK (gross_amount = net_amount + tax_amount) in wallet_audit_ledger
echo "\n[TEST 14] Probing wallet_audit_ledger Double-Entry Invariant (gross != net + tax)...\n";
try {
    // gross 100,000, tax 10,000, net 50,000 -> 40,000 unaccounted/vanished
    $pdo->exec("INSERT INTO wallet_audit_ledger (source_id, dest_id, gross_amount, tax_amount, net_amount, reference_type, reference_id) VALUES ('usr_001', 'usr_002', 100000, 10000, 50000, 'trade_p2p', 'ref_corrupt');");
    echo "  -> VULNERABILITY CONFIRMED: Ledger accepts unbalanced entries (gross 100k != net 50k + tax 10k)! Missing CHECK constraint!\n";
} catch (PDOException $e) {
    echo "  -> Rejected: " . $e->getMessage() . "\n";
}

// Cleanup test db
$pdo->exec("DROP DATABASE IF EXISTS `{$testDb}`");
echo "\nCleaned up test database.\n";
echo "EMPIRICAL SQL TESTS COMPLETE.\n";
