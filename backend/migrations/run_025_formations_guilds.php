<?php
/**
 * Migration 025: Housing Formations (separate table) & Guild System
 */

require __DIR__ . '/../vendor/autoload.php';
use App\Core\Database;
$pdo = Database::pdo();

echo "=== Migration 025: Housing Formations & Guild System ===\n";

// === Housing Formations (separate table, not JSON) ===
$pdo->exec("
CREATE TABLE IF NOT EXISTS housing_formations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_id VARCHAR(32) NOT NULL,
    formation_id VARCHAR(50) NOT NULL,
    level INT UNSIGNED DEFAULT 1,
    active TINYINT(1) DEFAULT 1,
    built_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uk_player_formation (player_id, formation_id),
    INDEX idx_player (player_id),
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
");
echo "✅ Created housing_formations table\n";

// Add daily_cost + last_maintenance to player_housing
$pdo->exec("ALTER TABLE player_housing
    ADD COLUMN IF NOT EXISTS daily_cost INT UNSIGNED DEFAULT 0,
    ADD COLUMN IF NOT EXISTS last_maintenance DATE DEFAULT NULL
");
echo "✅ Added daily_cost, last_maintenance to player_housing\n";

// === Guild / Tông Môn ===
$pdo->exec("
CREATE TABLE IF NOT EXISTS guilds (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    tag VARCHAR(5) NOT NULL,
    description TEXT DEFAULT NULL,
    leader_id VARCHAR(32) NOT NULL,
    level INT UNSIGNED DEFAULT 1,
    treasury INT UNSIGNED DEFAULT 0,
    daily_upkeep INT UNSIGNED DEFAULT 100,
    max_members INT UNSIGNED DEFAULT 10,
    buffs JSON DEFAULT NULL,
    last_upkeep_date DATE DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_leader (leader_id),
    FOREIGN KEY (leader_id) REFERENCES players(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
");
echo "✅ Created guilds table\n";

$pdo->exec("
CREATE TABLE IF NOT EXISTS guild_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    guild_id INT NOT NULL,
    player_id VARCHAR(32) NOT NULL,
    role ENUM('leader','elder','member') DEFAULT 'member',
    contributed INT UNSIGNED DEFAULT 0,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uk_player (player_id),
    INDEX idx_guild (guild_id),
    FOREIGN KEY (guild_id) REFERENCES guilds(id) ON DELETE CASCADE,
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
");
echo "✅ Created guild_members table\n";

$pdo->exec("
CREATE TABLE IF NOT EXISTS guild_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    guild_id INT NOT NULL,
    player_id VARCHAR(32) DEFAULT NULL,
    action VARCHAR(50) NOT NULL,
    detail VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_guild (guild_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
");
echo "✅ Created guild_log table\n";

// === Housing Rentals ===
$pdo->exec("
CREATE TABLE IF NOT EXISTS housing_rentals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    owner_id VARCHAR(32) NOT NULL,
    tenant_id VARCHAR(32) DEFAULT NULL,
    price_per_day INT UNSIGNED DEFAULT 50,
    active TINYINT(1) DEFAULT 1,
    rented_at TIMESTAMP NULL DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_owner (owner_id),
    INDEX idx_tenant (tenant_id),
    FOREIGN KEY (owner_id) REFERENCES players(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
");
echo "✅ Created housing_rentals table\n";

echo "=== Migration 025 Complete ===\n";
