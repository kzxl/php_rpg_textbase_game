<?php
/**
 * Migration 031: Safety — ensure housing tables + world_bosses discoverer columns
 */
require __DIR__ . '/../vendor/autoload.php';
use App\Core\Database;
$pdo = Database::pdo();

echo "=== Migration 031: Housing + World Boss safety ===\n";

// Ensure player_housing exists (from run_023)
$pdo->exec("CREATE TABLE IF NOT EXISTS player_housing (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_id VARCHAR(50) NOT NULL UNIQUE,
    tier INT DEFAULT 1,
    garden_slots JSON DEFAULT NULL,
    daily_cost INT DEFAULT 0,
    last_maintenance DATE DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_player (player_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
echo "✅ player_housing ensured\n";

// Ensure housing_formations exists (from run_025)
$pdo->exec("CREATE TABLE IF NOT EXISTS housing_formations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_id VARCHAR(50) NOT NULL,
    formation_id VARCHAR(100) NOT NULL,
    level INT DEFAULT 1,
    active TINYINT(1) DEFAULT 1,
    UNIQUE KEY uk_player_formation (player_id, formation_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
echo "✅ housing_formations ensured\n";

// Ensure housing_rentals exists
$pdo->exec("CREATE TABLE IF NOT EXISTS housing_rentals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    owner_id VARCHAR(50) NOT NULL,
    tenant_id VARCHAR(50) DEFAULT NULL,
    price_per_day INT DEFAULT 50,
    active TINYINT(1) DEFAULT 1,
    rented_at TIMESTAMP NULL,
    INDEX idx_owner (owner_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
echo "✅ housing_rentals ensured\n";

// World boss discoverer columns
try {
    $pdo->exec("ALTER TABLE world_bosses ADD COLUMN discoverer_id VARCHAR(50) DEFAULT NULL AFTER rewards");
    echo "✅ world_bosses.discoverer_id added\n";
} catch (Exception $e) { echo "⏭️ discoverer_id exists\n"; }

try {
    $pdo->exec("ALTER TABLE world_bosses ADD COLUMN discoverer_name VARCHAR(100) DEFAULT NULL AFTER discoverer_id");
    echo "✅ world_bosses.discoverer_name added\n";
} catch (Exception $e) { echo "⏭️ discoverer_name exists\n"; }

try {
    $pdo->exec("ALTER TABLE world_bosses ADD COLUMN area VARCHAR(100) DEFAULT NULL AFTER discoverer_name");
    echo "✅ world_bosses.area added\n";
} catch (Exception $e) { echo "⏭️ area exists\n"; }

echo "\n=== Migration 031 complete ===\n";
