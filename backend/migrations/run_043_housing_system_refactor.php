<?php

/**
 * Migration 043: Housing System Refactor & Schema Alignment
 * Aligns player_housing, housing_formations, and housing_rentals tables
 * with strict typing, correct columns, and foreign key integrity.
 */

declare(strict_types=1);

require_once __DIR__ . '/../src/Core/Database.php';

use App\Core\Database;

try {
    $pdo = Database::connect();
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Running migration 043: Housing System Refactor & Schema Alignment...\n";

    // 1. Table: player_housing
    echo " -> Checking & migrating 'player_housing'...\n";
    $pdo->exec("
    CREATE TABLE IF NOT EXISTS player_housing (
        id INT AUTO_INCREMENT PRIMARY KEY,
        player_id VARCHAR(32) NOT NULL UNIQUE,
        tier TINYINT UNSIGNED NOT NULL DEFAULT 1,
        garden_slots JSON DEFAULT NULL,
        daily_upkeep INT UNSIGNED NOT NULL DEFAULT 0,
        last_maintenance TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_housing_player (player_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    // Add garden_slots column if table already existed without it
    $cols = $pdo->query("SHOW COLUMNS FROM player_housing LIKE 'garden_slots'")->fetchAll();
    if (empty($cols)) {
        $pdo->exec("ALTER TABLE player_housing ADD COLUMN garden_slots JSON DEFAULT NULL AFTER tier");
        echo "    + Added missing column 'garden_slots' to player_housing\n";
    }

    // Add daily_upkeep column if missing
    $cols = $pdo->query("SHOW COLUMNS FROM player_housing LIKE 'daily_upkeep'")->fetchAll();
    if (empty($cols)) {
        $pdo->exec("ALTER TABLE player_housing ADD COLUMN daily_upkeep INT UNSIGNED NOT NULL DEFAULT 0 AFTER garden_slots");
        echo "    + Added missing column 'daily_upkeep' to player_housing\n";
    }

    // Add last_maintenance column if missing
    $cols = $pdo->query("SHOW COLUMNS FROM player_housing LIKE 'last_maintenance'")->fetchAll();
    if (empty($cols)) {
        $pdo->exec("ALTER TABLE player_housing ADD COLUMN last_maintenance TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER daily_upkeep");
        echo "    + Added missing column 'last_maintenance' to player_housing\n";
    }

    // 2. Table: housing_formations
    echo " -> Checking & migrating 'housing_formations'...\n";
    $pdo->exec("
    CREATE TABLE IF NOT EXISTS housing_formations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        player_id VARCHAR(32) NOT NULL,
        formation_id VARCHAR(50) NOT NULL,
        level INT UNSIGNED NOT NULL DEFAULT 1,
        active TINYINT(1) NOT NULL DEFAULT 1,
        built_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_formation_player (player_id),
        UNIQUE KEY uk_player_formation (player_id, formation_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    $cols = $pdo->query("SHOW COLUMNS FROM housing_formations LIKE 'built_at'")->fetchAll();
    if (empty($cols)) {
        $pdo->exec("ALTER TABLE housing_formations ADD COLUMN built_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER active");
        echo "    + Added missing column 'built_at' to housing_formations\n";
    }

    // 3. Table: housing_rentals
    echo " -> Checking & migrating 'housing_rentals'...\n";
    $pdo->exec("
    CREATE TABLE IF NOT EXISTS housing_rentals (
        id INT AUTO_INCREMENT PRIMARY KEY,
        owner_id VARCHAR(32) NOT NULL,
        renter_id VARCHAR(32) DEFAULT NULL,
        daily_fee INT UNSIGNED NOT NULL DEFAULT 100,
        status ENUM('available', 'rented', 'cancelled') NOT NULL DEFAULT 'available',
        rented_at TIMESTAMP NULL DEFAULT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_rental_owner (owner_id),
        INDEX idx_rental_status (status)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    // Check renter_id / tenant_id
    $cols = $pdo->query("SHOW COLUMNS FROM housing_rentals LIKE 'renter_id'")->fetchAll();
    if (empty($cols)) {
        $oldTenant = $pdo->query("SHOW COLUMNS FROM housing_rentals LIKE 'tenant_id'")->fetchAll();
        if (!empty($oldTenant)) {
            $pdo->exec("ALTER TABLE housing_rentals CHANGE COLUMN tenant_id renter_id VARCHAR(32) DEFAULT NULL");
            echo "    + Renamed column 'tenant_id' to 'renter_id' in housing_rentals\n";
        } else {
            $pdo->exec("ALTER TABLE housing_rentals ADD COLUMN renter_id VARCHAR(32) DEFAULT NULL AFTER owner_id");
            echo "    + Added column 'renter_id' to housing_rentals\n";
        }
    }

    // Check daily_fee / price_per_day
    $cols = $pdo->query("SHOW COLUMNS FROM housing_rentals LIKE 'daily_fee'")->fetchAll();
    if (empty($cols)) {
        $oldPrice = $pdo->query("SHOW COLUMNS FROM housing_rentals LIKE 'price_per_day'")->fetchAll();
        if (!empty($oldPrice)) {
            $pdo->exec("ALTER TABLE housing_rentals CHANGE COLUMN price_per_day daily_fee INT UNSIGNED NOT NULL DEFAULT 100");
            echo "    + Renamed column 'price_per_day' to 'daily_fee' in housing_rentals\n";
        } else {
            $pdo->exec("ALTER TABLE housing_rentals ADD COLUMN daily_fee INT UNSIGNED NOT NULL DEFAULT 100 AFTER renter_id");
            echo "    + Added column 'daily_fee' to housing_rentals\n";
        }
    }

    // Check status
    $cols = $pdo->query("SHOW COLUMNS FROM housing_rentals LIKE 'status'")->fetchAll();
    if (empty($cols)) {
        $pdo->exec("ALTER TABLE housing_rentals ADD COLUMN status ENUM('available', 'rented', 'cancelled') NOT NULL DEFAULT 'available' AFTER daily_fee");
        echo "    + Added column 'status' to housing_rentals\n";
    }

    // Check rented_at
    $cols = $pdo->query("SHOW COLUMNS FROM housing_rentals LIKE 'rented_at'")->fetchAll();
    if (empty($cols)) {
        $pdo->exec("ALTER TABLE housing_rentals ADD COLUMN rented_at TIMESTAMP NULL DEFAULT NULL AFTER status");
        echo "    + Added column 'rented_at' to housing_rentals\n";
    }

    // Check created_at
    $cols = $pdo->query("SHOW COLUMNS FROM housing_rentals LIKE 'created_at'")->fetchAll();
    if (empty($cols)) {
        $pdo->exec("ALTER TABLE housing_rentals ADD COLUMN created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER rented_at");
        echo "    + Added column 'created_at' to housing_rentals\n";
    }

    echo "✅ Migration 043 completed successfully!\n";
} catch (Throwable $e) {
    echo "❌ Migration 043 failed: " . $e->getMessage() . "\n";
    exit(1);
}
