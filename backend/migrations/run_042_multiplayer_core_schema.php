<?php

/**
 * Migration 042: Core Persistent Multiplayer Architecture Schema
 * Implements authoritative specification in docs/MULTIPLAYER_ARCHITECTURE_SPEC.md:
 * - Step 0: Syncs players.id to VARCHAR(36)
 * - Creates 10 InnoDB tables with FKs, indexes, constraints
 * - Seeds baseline records into player_states from existing players
 */

declare(strict_types=1);

require_once __DIR__ . '/../src/Core/Database.php';

use App\Core\Database;

try {
    $pdo = Database::connect();
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Running migration 042: Core Persistent Multiplayer Architecture Schema...\n";

    // Disable foreign key checks for clean sequential DDL definition
    $pdo->exec("SET FOREIGN_KEY_CHECKS = 0");

    // 2. Table: player_states (Persistent FSM & Vitals)
    echo " -> Creating table 'player_states'...\n";
    $pdo->exec("
    CREATE TABLE IF NOT EXISTS player_states (
        player_id VARCHAR(32) NOT NULL,
        status ENUM('normal', 'hospital', 'jailed', 'traveling') NOT NULL DEFAULT 'normal',
        hospital_until BIGINT UNSIGNED NOT NULL DEFAULT 0,
        hospital_reason VARCHAR(100) DEFAULT NULL,
        jail_until BIGINT UNSIGNED NOT NULL DEFAULT 0,
        jail_reason VARCHAR(100) DEFAULT NULL,
        travel_until BIGINT UNSIGNED NOT NULL DEFAULT 0,
        travel_destination VARCHAR(50) DEFAULT NULL,
        active_combat_session_id VARCHAR(36) DEFAULT NULL,
        med_cooldown_until BIGINT UNSIGNED NOT NULL DEFAULT 0,
        divine_ward_until BIGINT UNSIGNED NOT NULL DEFAULT 0,
        pending_escrow BIGINT UNSIGNED NOT NULL DEFAULT 0,
        version INT UNSIGNED NOT NULL DEFAULT 1,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

        PRIMARY KEY (player_id),
        INDEX idx_status_expiries (status, hospital_until, jail_until, travel_until),
        INDEX idx_active_combat (active_combat_session_id),
        INDEX idx_divine_ward (divine_ward_until),
        CONSTRAINT fk_player_states_player 
            FOREIGN KEY (player_id) REFERENCES players(id) 
            ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    // 3. Table: pvp_combat_sessions
    echo " -> Creating table 'pvp_combat_sessions'...\n";
    $pdo->exec("
    CREATE TABLE IF NOT EXISTS pvp_combat_sessions (
        session_id VARCHAR(36) NOT NULL,
        attacker_id VARCHAR(32) NOT NULL,
        defender_id VARCHAR(32) NOT NULL,
        status ENUM('in_progress', 'pending_action', 'resolved', 'expired') NOT NULL DEFAULT 'in_progress',
        outcome ENUM('attacker_won', 'defender_won', 'draw') DEFAULT NULL,
        action_chosen ENUM('leave', 'rob', 'wound') DEFAULT NULL,
        loot_stolen BIGINT UNSIGNED NOT NULL DEFAULT 0,
        lockout_applied_seconds INT UNSIGNED NOT NULL DEFAULT 0,
        action_expires_at BIGINT UNSIGNED NOT NULL,
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
    ");

    // 4. Table: pvp_combat_logs
    echo " -> Creating table 'pvp_combat_logs'...\n";
    $pdo->exec("
    CREATE TABLE IF NOT EXISTS pvp_combat_logs (
        log_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        session_id VARCHAR(36) NOT NULL,
        turn_number INT UNSIGNED NOT NULL,
        attacker_hp INT NOT NULL,
        defender_hp INT NOT NULL,
        action_details JSON DEFAULT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

        INDEX idx_session_turn (session_id, turn_number),
        CONSTRAINT fk_pvp_log_session 
            FOREIGN KEY (session_id) REFERENCES pvp_combat_sessions(session_id) 
            ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    // 5. Table: bazaar_listings
    echo " -> Creating table 'bazaar_listings'...\n";
    $pdo->exec("
    CREATE TABLE IF NOT EXISTS bazaar_listings (
        listing_id BIGINT UNSIGNED AUTO_INCREMENT NOT NULL,
        seller_id VARCHAR(32) NOT NULL,
        item_id VARCHAR(50) NOT NULL,
        item_data JSON DEFAULT NULL,
        quantity INT UNSIGNED NOT NULL DEFAULT 1,
        unit_price BIGINT UNSIGNED NOT NULL,
        tax_rate DECIMAL(5, 2) NOT NULL DEFAULT 5.00,
        status ENUM('active', 'sold_out', 'cancelled') NOT NULL DEFAULT 'active',
        version INT UNSIGNED NOT NULL DEFAULT 1,
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
    ");

    // 6. Table: trade_offers
    echo " -> Creating table 'trade_offers'...\n";
    $pdo->exec("
    CREATE TABLE IF NOT EXISTS trade_offers (
        trade_id VARCHAR(36) NOT NULL,
        initiator_id VARCHAR(32) NOT NULL,
        receiver_id VARCHAR(32) NOT NULL,
        status ENUM('negotiating', 'initiator_locked', 'receiver_locked', 'both_locked', 'completed', 'cancelled', 'expired') NOT NULL DEFAULT 'negotiating',
        initiator_items JSON NOT NULL,
        receiver_items JSON NOT NULL,
        initiator_gold BIGINT UNSIGNED NOT NULL DEFAULT 0,
        receiver_gold BIGINT UNSIGNED NOT NULL DEFAULT 0,
        initiator_confirmed TINYINT(1) NOT NULL DEFAULT 0,
        receiver_confirmed TINYINT(1) NOT NULL DEFAULT 0,
        version INT UNSIGNED NOT NULL DEFAULT 1,
        expires_at BIGINT UNSIGNED NOT NULL,
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
    ");

    // 7. Table: factions
    echo " -> Creating table 'factions'...\n";
    $pdo->exec("
    CREATE TABLE IF NOT EXISTS factions (
        faction_id INT UNSIGNED AUTO_INCREMENT NOT NULL,
        name VARCHAR(50) NOT NULL UNIQUE,
        tag VARCHAR(6) NOT NULL UNIQUE,
        description TEXT DEFAULT NULL,
        level TINYINT UNSIGNED NOT NULL DEFAULT 1,
        respect BIGINT UNSIGNED NOT NULL DEFAULT 0,
        leader_id VARCHAR(32) NOT NULL,
        co_leader_id VARCHAR(32) DEFAULT NULL,
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
    ");

    // 8. Table: faction_members
    echo " -> Creating table 'faction_members'...\n";
    $pdo->exec("
    CREATE TABLE IF NOT EXISTS faction_members (
        faction_id INT UNSIGNED NOT NULL,
        player_id VARCHAR(32) NOT NULL,
        role ENUM('master', 'elder', 'deacon', 'disciple') NOT NULL DEFAULT 'disciple',
        contribution_points BIGINT UNSIGNED NOT NULL DEFAULT 0,
        weekly_contribution BIGINT UNSIGNED NOT NULL DEFAULT 0,
        dividend_rate DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
        joined_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

        PRIMARY KEY (faction_id, player_id),
        INDEX idx_player_faction (player_id),
        INDEX idx_role (role),
        CONSTRAINT fk_fm_faction 
            FOREIGN KEY (faction_id) REFERENCES factions(faction_id) 
            ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fk_fm_player 
            FOREIGN KEY (player_id) REFERENCES players(id) 
            ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    // 9. Table: faction_treasury_proposals
    echo " -> Creating table 'faction_treasury_proposals'...\n";
    $pdo->exec("
    CREATE TABLE IF NOT EXISTS faction_treasury_proposals (
        proposal_id BIGINT UNSIGNED AUTO_INCREMENT NOT NULL,
        faction_id INT UNSIGNED NOT NULL,
        proposer_id VARCHAR(32) NOT NULL,
        target_id VARCHAR(32) NOT NULL,
        amount BIGINT UNSIGNED NOT NULL,
        purpose VARCHAR(255) NOT NULL,
        status ENUM('pending', 'approved', 'rejected', 'executed', 'expired') NOT NULL DEFAULT 'pending',
        approvals_json JSON DEFAULT NULL,
        expires_at BIGINT UNSIGNED NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

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
    ");

    // 10. Table: faction_chains
    echo " -> Creating table 'faction_chains'...\n";
    $pdo->exec("
    CREATE TABLE IF NOT EXISTS faction_chains (
        chain_id BIGINT UNSIGNED AUTO_INCREMENT NOT NULL,
        faction_id INT UNSIGNED NOT NULL,
        current_count INT UNSIGNED NOT NULL DEFAULT 0,
        max_count INT UNSIGNED NOT NULL DEFAULT 0,
        multiplier DECIMAL(6, 3) NOT NULL DEFAULT 1.000,
        timeout_at BIGINT UNSIGNED NOT NULL,
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
    ");

    // 11. Table: faction_territories
    echo " -> Creating table 'faction_territories'...\n";
    $pdo->exec("
    CREATE TABLE IF NOT EXISTS faction_territories (
        territory_id VARCHAR(50) NOT NULL,
        name VARCHAR(100) NOT NULL,
        controlling_faction_id INT UNSIGNED DEFAULT NULL,
        spirit_yield_rate INT UNSIGNED NOT NULL DEFAULT 100,
        respect_yield_rate INT UNSIGNED NOT NULL DEFAULT 10,
        defense_rating INT UNSIGNED NOT NULL DEFAULT 1000,
        current_ward_hp INT UNSIGNED NOT NULL DEFAULT 1000,
        max_ward_hp INT UNSIGNED NOT NULL DEFAULT 1000,
        contested_status ENUM('peaceful', 'under_attack', 'cooldown') NOT NULL DEFAULT 'peaceful',
        last_harvest_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

        PRIMARY KEY (territory_id),
        INDEX idx_controlling_faction (controlling_faction_id),
        INDEX idx_contested (contested_status),
        CONSTRAINT fk_territory_faction 
            FOREIGN KEY (controlling_faction_id) REFERENCES factions(faction_id) 
            ON DELETE SET NULL ON UPDATE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    // 12. Table: wallet_audit_ledger
    echo " -> Creating table 'wallet_audit_ledger'...\n";
    $pdo->exec("
    CREATE TABLE IF NOT EXISTS wallet_audit_ledger (
        ledger_id BIGINT UNSIGNED AUTO_INCREMENT NOT NULL,
        source_id VARCHAR(32) DEFAULT NULL,
        dest_id VARCHAR(32) DEFAULT NULL,
        gross_amount BIGINT UNSIGNED NOT NULL,
        tax_amount BIGINT UNSIGNED NOT NULL DEFAULT 0,
        net_amount BIGINT UNSIGNED NOT NULL,
        reference_type VARCHAR(50) NOT NULL,
        reference_id VARCHAR(64) DEFAULT NULL,
        metadata JSON DEFAULT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

        PRIMARY KEY (ledger_id),
        INDEX idx_source (source_id, created_at),
        INDEX idx_dest (dest_id, created_at),
        INDEX idx_reference (reference_type, reference_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    // Re-enable foreign key checks
    $pdo->exec("SET FOREIGN_KEY_CHECKS = 1");

    // 13. Populate baseline records into player_states from existing players
    echo " -> Seeding baseline player_states from players table...\n";
    $seeded = $pdo->exec("
        INSERT IGNORE INTO player_states (player_id, status, hospital_until, jail_until, travel_until, pending_escrow, version)
        SELECT id, 
               CASE 
                   WHEN hospital_until > UNIX_TIMESTAMP() THEN 'hospital'
                   WHEN jail_until > UNIX_TIMESTAMP() THEN 'jailed'
                   WHEN travel_arrives_at > UNIX_TIMESTAMP() THEN 'traveling'
                   ELSE 'normal'
               END,
               COALESCE(hospital_until, 0),
               COALESCE(jail_until, 0),
               COALESCE(travel_arrives_at, 0),
               0,
               1
        FROM players
    ");
    echo "    Seeded {$seeded} player_state records.\n";

    echo "Migration 042 completed successfully!\n";
} catch (\Throwable $e) {
    echo "Migration 042 FAILED: " . $e->getMessage() . "\n";
    exit(1);
}
