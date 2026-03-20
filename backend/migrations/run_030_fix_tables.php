<?php
/**
 * Migration 030: Fix missing tables + tower_runs player_name + gold tax
 */
require __DIR__ . '/../vendor/autoload.php';
use App\Core\Database;
$pdo = Database::pdo();

echo "=== Migration 030: Fix missing tables + economy balance ===\n";

// Fix tower_runs: add player_name if missing
try {
    $pdo->exec("ALTER TABLE tower_runs ADD COLUMN player_name VARCHAR(100) DEFAULT NULL AFTER player_id");
    echo "✅ tower_runs.player_name added\n";
} catch (Exception $e) {
    echo "⏭️ tower_runs.player_name already exists\n";
}

// NPC Shop stock table
$pdo->exec("CREATE TABLE IF NOT EXISTS npc_shop_stock (
    id INT AUTO_INCREMENT PRIMARY KEY,
    shop_date DATE NOT NULL,
    item_id VARCHAR(100) NOT NULL,
    item_type VARCHAR(50) DEFAULT 'material',
    total_stock INT DEFAULT 10,
    remaining_stock INT DEFAULT 10,
    price INT DEFAULT 0,
    UNIQUE KEY uk_date_item (shop_date, item_id),
    INDEX idx_date (shop_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
echo "✅ npc_shop_stock table created\n";

// Player shop purchases tracker
$pdo->exec("CREATE TABLE IF NOT EXISTS player_shop_purchases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_id VARCHAR(50) NOT NULL,
    purchase_date DATE NOT NULL,
    total_spent INT DEFAULT 0,
    items_bought INT DEFAULT 0,
    UNIQUE KEY uk_player_date (player_id, purchase_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
echo "✅ player_shop_purchases table created\n";

// Market tax config
$pdo->exec("CREATE TABLE IF NOT EXISTS market_tax_config (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tax_date DATE NOT NULL UNIQUE,
    tax_rate DECIMAL(5,2) DEFAULT 5.00,
    reason VARCHAR(200) DEFAULT 'Thuế tiêu chuẩn'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
echo "✅ market_tax_config table created\n";

// Dungeon runs table
$pdo->exec("CREATE TABLE IF NOT EXISTS dungeon_runs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_id VARCHAR(50) NOT NULL,
    dungeon_id VARCHAR(100) NOT NULL,
    map_item_id VARCHAR(100) NOT NULL,
    current_wave INT DEFAULT 1,
    total_waves INT DEFAULT 5,
    boss_defeated TINYINT(1) DEFAULT 0,
    status ENUM('active','completed','failed','abandoned') DEFAULT 'active',
    loot_log JSON DEFAULT NULL,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    INDEX idx_player (player_id),
    INDEX idx_player_status (player_id, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
echo "✅ dungeon_runs table created\n";

echo "\n=== Migration 030 complete ===\n";
