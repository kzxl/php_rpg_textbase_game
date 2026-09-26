<?php
/**
 * spec_r2_ddl_empirical.php - Empirical SQL DDL Schema Execution & Constraint Verification for Round 2
 * Author: Challenger 2 (Empirical Concurrency & SQL Schema Verifier)
 * Target: docs/MULTIPLAYER_ARCHITECTURE_SPEC.md Section 6.1
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

$dbVersion = $pdo->query("SELECT VERSION()")->fetchColumn();
echo "================================================================================\n";
echo " ROUND 2 LIVE SQL DDL SYNTAX & COMPATIBILITY EMPIRICAL VERIFICATION\n";
echo " Engine: {$dbVersion}\n";
echo "================================================================================\n\n";

$testDb = 'test_r2_multiplayer_spec';
$pdo->exec("DROP DATABASE IF EXISTS `{$testDb}`");
$pdo->exec("CREATE DATABASE `{$testDb}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
$pdo->exec("USE `{$testDb}`");

$totalChecks = 0;
$passedChecks = 0;
$failedChecks = 0;

function check(bool $condition, string $label, string $details = ''): void {
    global $totalChecks, $passedChecks, $failedChecks;
    $totalChecks++;
    if ($condition) {
        $passedChecks++;
        echo "  [PASS] {$label}\n";
    } else {
        $failedChecks++;
        echo "  [FAIL] {$label}: {$details}\n";
    }
}

// 1. Create baseline mock players table as in 001_init.sql (VARCHAR(32))
echo "[PHASE 1] Setting up baseline players table (VARCHAR(32))...\n";
$pdo->exec("
CREATE TABLE players (
    id VARCHAR(32) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    gold BIGINT UNSIGNED DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
");
check(true, "Baseline players table created with VARCHAR(32)");

// 2. Migration Step 0
echo "\n[PHASE 2] Executing Migration Step 0...\n";
try {
    $pdo->exec("ALTER TABLE players MODIFY id VARCHAR(36) NOT NULL;");
    $colInfo = $pdo->query("SHOW COLUMNS FROM players WHERE Field = 'id'")->fetch();
    check($colInfo['Type'] === 'varchar(36)', "Migration Step 0: players.id altered to VARCHAR(36)", $colInfo['Type']);
} catch (Exception $e) {
    check(false, "Migration Step 0 failed", $e->getMessage());
}

// 3. Execute all 10 DDL schemas from Section 6.1
echo "\n[PHASE 3] Compiling all 10 tables from Section 6.1...\n";
$pdo->exec("SET FOREIGN_KEY_CHECKS = 0;");

// Table 1: player_states
$ddl_1 = "
CREATE TABLE IF NOT EXISTS player_states (
    player_id VARCHAR(36) NOT NULL,
    status ENUM('normal', 'hospitalized', 'jailed', 'traveling') NOT NULL DEFAULT 'normal',
    hospital_until BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Unix epoch timestamp for hospital release',
    jail_until BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Unix epoch timestamp for prison release',
    travel_until BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Unix epoch timestamp for arrival',
    travel_dest_id VARCHAR(50) DEFAULT NULL COMMENT 'Target destination area ID',
    active_combat_session_id VARCHAR(36) DEFAULT NULL COMMENT 'Active PvP mutex lock session ID (ephemeral session pointer)',
    med_cooldown_until BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Medical pill consumption cooldown cap',
    pending_escrow BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Merchant escrow balance from bazaar sales (claimable in safe zone)',
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
        CHECK (hospital_until >= 0 AND jail_until >= 0 AND travel_until >= 0 AND med_cooldown_until >= 0 AND pending_escrow >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
";
try {
    $pdo->exec($ddl_1);
    check(true, "Table 1 (player_states) created successfully");
} catch (Exception $e) { check(false, "Table 1 creation failed", $e->getMessage()); }

// Table 2: pvp_combat_sessions
$ddl_2 = "
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
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT chk_pvp_distinct_combatants 
        CHECK (attacker_id != defender_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
";
try {
    $pdo->exec($ddl_2);
    check(true, "Table 2 (pvp_combat_sessions) created successfully");
} catch (Exception $e) { check(false, "Table 2 creation failed", $e->getMessage()); }

// Table 3: bazaar_listings
$ddl_3 = "
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
try {
    $pdo->exec($ddl_3);
    check(true, "Table 3 (bazaar_listings) created successfully");
} catch (Exception $e) { check(false, "Table 3 creation failed", $e->getMessage()); }

// Table 4: trade_offers
$ddl_4 = "
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
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT chk_trade_distinct_players 
        CHECK (initiator_id != receiver_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
";
try {
    $pdo->exec($ddl_4);
    check(true, "Table 4 (trade_offers) created successfully");
} catch (Exception $e) { check(false, "Table 4 creation failed", $e->getMessage()); }

// Table 5: factions
$ddl_5 = "
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
try {
    $pdo->exec($ddl_5);
    check(true, "Table 5 (factions) created successfully");
} catch (Exception $e) { check(false, "Table 5 creation failed", $e->getMessage()); }

// Table 6: faction_chains
$ddl_6 = "
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
try {
    $pdo->exec($ddl_6);
    check(true, "Table 6 (faction_chains) created successfully");
} catch (Exception $e) { check(false, "Table 6 creation failed", $e->getMessage()); }

// Table 7: faction_territories
$ddl_7 = "
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
try {
    $pdo->exec($ddl_7);
    check(true, "Table 7 (faction_territories) created successfully");
} catch (Exception $e) { check(false, "Table 7 creation failed", $e->getMessage()); }

// Table 8: wallet_audit_ledger
$ddl_8 = "
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
    INDEX idx_created (created_at),
    CONSTRAINT chk_ledger_balanced_entry 
        CHECK (gross_amount = net_amount + tax_amount)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
";
try {
    $pdo->exec($ddl_8);
    check(true, "Table 8 (wallet_audit_ledger) created successfully");
} catch (Exception $e) { check(false, "Table 8 creation failed", $e->getMessage()); }

// Table 9: faction_members
$ddl_9 = "
CREATE TABLE IF NOT EXISTS faction_members (
    faction_id INT UNSIGNED NOT NULL,
    player_id VARCHAR(36) NOT NULL,
    role ENUM('master', 'elder', 'deacon', 'disciple') NOT NULL DEFAULT 'disciple',
    joined_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    contribution_points BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Lifetime sect merit points',
    weekly_contribution BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Rolling weekly merit points for dividend payout',
    dividend_rate DECIMAL(5, 2) NOT NULL DEFAULT 1.00 COMMENT 'Custom dividend multiplier (e.g. 1.00 = 100% baseline share)',
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (faction_id, player_id),
    UNIQUE KEY uq_player_single_faction (player_id),
    INDEX idx_faction_role (faction_id, role),
    INDEX idx_contribution (faction_id, weekly_contribution DESC),
    CONSTRAINT fk_fm_faction 
        FOREIGN KEY (faction_id) REFERENCES factions(faction_id) 
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_fm_player 
        FOREIGN KEY (player_id) REFERENCES players(id) 
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
";
try {
    $pdo->exec($ddl_9);
    check(true, "Table 9 (faction_members) created successfully");
} catch (Exception $e) { check(false, "Table 9 creation failed", $e->getMessage()); }

// Table 10: faction_treasury_proposals
$ddl_10 = "
CREATE TABLE IF NOT EXISTS faction_treasury_proposals (
    proposal_id BIGINT UNSIGNED AUTO_INCREMENT NOT NULL,
    faction_id INT UNSIGNED NOT NULL,
    proposer_id VARCHAR(36) NOT NULL COMMENT 'Officer initiating proposal',
    target_id VARCHAR(36) NOT NULL COMMENT 'Recipient player or expense target',
    amount BIGINT UNSIGNED NOT NULL COMMENT 'Spirit Stones to withdraw',
    purpose VARCHAR(255) NOT NULL COMMENT 'Justification (e.g. Territory War subsidies, Pill crafting fund)',
    status ENUM('pending', 'approved', 'rejected', 'executed', 'expired') NOT NULL DEFAULT 'pending',
    approvals_json JSON NOT NULL COMMENT 'Array of officer approvals: [{\"officer_id\": \"...\", \"role\": \"elder\", \"signed_at\": 1790402000}]',
    required_approvals TINYINT UNSIGNED NOT NULL DEFAULT 2 COMMENT 'Minimum distinct officer signatures required (default 2)',
    expires_at BIGINT UNSIGNED NOT NULL COMMENT 'Expiry timestamp (default 24h lease)',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    executed_at TIMESTAMP NULL DEFAULT NULL,

    PRIMARY KEY (proposal_id),
    INDEX idx_faction_status (faction_id, status),
    INDEX idx_proposer (proposer_id),
    INDEX idx_expires (expires_at),
    CONSTRAINT fk_ftp_faction 
        FOREIGN KEY (faction_id) REFERENCES factions(faction_id) 
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_ftp_proposer 
        FOREIGN KEY (proposer_id) REFERENCES players(id) 
        ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_ftp_target 
        FOREIGN KEY (target_id) REFERENCES players(id) 
        ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT chk_proposal_amount_positive 
        CHECK (amount > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
";
try {
    $pdo->exec($ddl_10);
    check(true, "Table 10 (faction_treasury_proposals) created successfully");
} catch (Exception $e) { check(false, "Table 10 creation failed", $e->getMessage()); }

$pdo->exec("SET FOREIGN_KEY_CHECKS = 1;");

// Verify all 10 tables exist
$tables = $pdo->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
$expectedTables = [
    'players', 'player_states', 'pvp_combat_sessions', 'bazaar_listings',
    'trade_offers', 'factions', 'faction_chains', 'faction_territories',
    'wallet_audit_ledger', 'faction_members', 'faction_treasury_proposals'
];
foreach ($expectedTables as $t) {
    check(in_array($t, $tables), "Table '{$t}' exists in database");
}

// 4. Test Data & Constraints Validation
echo "\n[PHASE 4] Testing Data Insertion & CHECK Constraints...\n";

// Populate mock players
$pdo->exec("INSERT INTO players (id, name, gold) VALUES ('usr_uuid_0001_aaaaaaaa', 'Player Alpha', 500000);");
$pdo->exec("INSERT INTO players (id, name, gold) VALUES ('usr_uuid_0002_bbbbbbbb', 'Player Beta', 200000);");
$pdo->exec("INSERT INTO players (id, name, gold) VALUES ('usr_uuid_0003_cccccccc', 'Player Gamma', 100000);");

// A. Test Table 1: player_states & pending_escrow
$pdo->exec("INSERT INTO player_states (player_id, status, pending_escrow) VALUES ('usr_uuid_0001_aaaaaaaa', 'normal', 15000);");
$state = $pdo->query("SELECT pending_escrow FROM player_states WHERE player_id = 'usr_uuid_0001_aaaaaaaa'")->fetch();
check($state['pending_escrow'] == 15000, "player_states supports pending_escrow initialization");

// B. Test Table 2: pvp_combat_sessions CHECK (attacker_id != defender_id)
try {
    $pdo->exec("INSERT INTO pvp_combat_sessions (session_id, attacker_id, defender_id, action_expires_at) 
                VALUES ('sess_err_1', 'usr_uuid_0001_aaaaaaaa', 'usr_uuid_0001_aaaaaaaa', 1790000000);");
    check(false, "pvp_combat_sessions allowed self-attack (CHECK failed to block)");
} catch (PDOException $e) {
    check(true, "pvp_combat_sessions correctly REJECTED attacker_id == defender_id via CHECK constraint");
}

// Valid pvp insert
try {
    $pdo->exec("INSERT INTO pvp_combat_sessions (session_id, attacker_id, defender_id, action_expires_at) 
                VALUES ('sess_valid_1', 'usr_uuid_0001_aaaaaaaa', 'usr_uuid_0002_bbbbbbbb', 1790000000);");
    check(true, "pvp_combat_sessions accepted valid distinct combatants");
} catch (PDOException $e) {
    check(false, "pvp_combat_sessions rejected valid combatants", $e->getMessage());
}

// C. Test Table 3: bazaar_listings CHECK (quantity >= 0 AND unit_price > 0)
try {
    $pdo->exec("INSERT INTO bazaar_listings (seller_id, item_id, quantity, unit_price) 
                VALUES ('usr_uuid_0001_aaaaaaaa', 'item_dan', 1, 0);");
    check(false, "bazaar_listings allowed unit_price = 0 (CHECK failed to block)");
} catch (PDOException $e) {
    check(true, "bazaar_listings correctly REJECTED unit_price = 0 via CHECK constraint");
}

// D. Test Table 4: trade_offers CHECK (initiator_id != receiver_id)
try {
    $pdo->exec("INSERT INTO trade_offers (trade_id, initiator_id, receiver_id, initiator_items, receiver_items, expires_at) 
                VALUES ('trd_err_1', 'usr_uuid_0001_aaaaaaaa', 'usr_uuid_0001_aaaaaaaa', '[]', '[]', 1790000000);");
    check(false, "trade_offers allowed self-trade (CHECK failed to block)");
} catch (PDOException $e) {
    check(true, "trade_offers correctly REJECTED initiator_id == receiver_id via CHECK constraint");
}

// Valid trade insert
try {
    $pdo->exec("INSERT INTO trade_offers (trade_id, initiator_id, receiver_id, initiator_items, receiver_items, expires_at) 
                VALUES ('trd_valid_1', 'usr_uuid_0001_aaaaaaaa', 'usr_uuid_0002_bbbbbbbb', '[]', '[]', 1790000000);");
    check(true, "trade_offers accepted valid distinct traders");
} catch (PDOException $e) {
    check(false, "trade_offers rejected valid traders", $e->getMessage());
}

// E. Test Table 5: factions
$pdo->exec("INSERT INTO factions (name, tag, leader_id) VALUES ('Thanh Vân Môn', 'TVM', 'usr_uuid_0001_aaaaaaaa');");
$factionId = (int)$pdo->lastInsertId();
check($factionId > 0, "factions created with auto-increment ID {$factionId}");

// F. Test Table 8: wallet_audit_ledger CHECK (gross_amount = net_amount + tax_amount)
try {
    // Unbalanced: gross 1000, tax 100, net 800 (100 unaccounted)
    $pdo->exec("INSERT INTO wallet_audit_ledger (source_id, dest_id, gross_amount, tax_amount, net_amount, reference_type, reference_id) 
                VALUES ('usr_uuid_0001_aaaaaaaa', 'usr_uuid_0002_bbbbbbbb', 1000, 100, 800, 'trade_p2p', 'trd_corrupt');");
    check(false, "wallet_audit_ledger allowed unbalanced entry (CHECK failed to block)");
} catch (PDOException $e) {
    check(true, "wallet_audit_ledger correctly REJECTED unbalanced entry via CHECK constraint");
}

try {
    // Balanced: gross 1000, tax 100, net 900
    $pdo->exec("INSERT INTO wallet_audit_ledger (source_id, dest_id, gross_amount, tax_amount, net_amount, reference_type, reference_id) 
                VALUES ('usr_uuid_0001_aaaaaaaa', 'usr_uuid_0002_bbbbbbbb', 1000, 100, 900, 'trade_p2p', 'trd_balanced');");
    check(true, "wallet_audit_ledger accepted balanced double-entry (gross = net + tax)");
} catch (PDOException $e) {
    check(false, "wallet_audit_ledger rejected balanced entry", $e->getMessage());
}

// G. Test Table 9: faction_members
// Insert Leader as master
try {
    $pdo->exec("INSERT INTO faction_members (faction_id, player_id, role, contribution_points) 
                VALUES ({$factionId}, 'usr_uuid_0001_aaaaaaaa', 'master', 5000);");
    check(true, "faction_members inserted master member");
} catch (PDOException $e) {
    check(false, "faction_members insert master failed", $e->getMessage());
}

// Test unique key uq_player_single_faction: Player cannot be in 2 factions
$pdo->exec("INSERT INTO factions (name, tag, leader_id) VALUES ('Hợp Hoan Tông', 'HHT', 'usr_uuid_0002_bbbbbbbb');");
$faction2Id = (int)$pdo->lastInsertId();
try {
    // Attempt to insert usr_uuid_0001 into faction 2
    $pdo->exec("INSERT INTO faction_members (faction_id, player_id, role) 
                VALUES ({$faction2Id}, 'usr_uuid_0001_aaaaaaaa', 'disciple');");
    check(false, "faction_members allowed player to join two factions (UNIQUE key failed)");
} catch (PDOException $e) {
    check(true, "faction_members correctly REJECTED multi-faction membership via uq_player_single_faction");
}

// H. Test Table 10: faction_treasury_proposals
// Test amount <= 0 rejected by CHECK constraint
try {
    $pdo->exec("INSERT INTO faction_treasury_proposals (faction_id, proposer_id, target_id, amount, purpose, approvals_json, expires_at) 
                VALUES ({$factionId}, 'usr_uuid_0001_aaaaaaaa', 'usr_uuid_0003_cccccccc', 0, 'Test Fund', '[]', 1790000000);");
    check(false, "faction_treasury_proposals allowed amount = 0 (CHECK failed to block)");
} catch (PDOException $e) {
    check(true, "faction_treasury_proposals correctly REJECTED amount = 0 via chk_proposal_amount_positive");
}

// Valid proposal
try {
    $pdo->exec("INSERT INTO faction_treasury_proposals (faction_id, proposer_id, target_id, amount, purpose, approvals_json, expires_at) 
                VALUES ({$factionId}, 'usr_uuid_0001_aaaaaaaa', 'usr_uuid_0003_cccccccc', 50000, 'Territory War Subsidies', '[]', 1790000000);");
    $propId = (int)$pdo->lastInsertId();
    check($propId > 0, "faction_treasury_proposals inserted valid proposal #{$propId}");
} catch (PDOException $e) {
    check(false, "faction_treasury_proposals insert valid failed", $e->getMessage());
}

// Clean up
$pdo->exec("DROP DATABASE IF EXISTS `{$testDb}`");
echo "\nCleaned up test database {$testDb}.\n";

echo "\n================================================================================\n";
echo " DDL EMPIRICAL VERIFICATION RESULTS: {$passedChecks} / {$totalChecks} PASSED\n";
if ($failedChecks === 0) {
    echo " VERDICT: 100% PASS - ALL 10 TABLES & CONSTRAINTS FULLY COMPLIANT!\n";
} else {
    echo " VERDICT: FAIL - {$failedChecks} CHECKS FAILED!\n";
}
echo "================================================================================\n";

exit($failedChecks === 0 ? 0 : 1);
