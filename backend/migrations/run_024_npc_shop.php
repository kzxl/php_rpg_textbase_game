<?php
/**
 * Migration 024: NPC Shop System
 */

require __DIR__ . '/../vendor/autoload.php';
use App\Core\Database;
$pdo = Database::pdo();

echo "=== Migration 024: NPC Shop System ===\n";

// NPC daily stock tracker
$pdo->exec("
CREATE TABLE IF NOT EXISTS npc_shop_stock (
    id INT AUTO_INCREMENT PRIMARY KEY,
    shop_date DATE NOT NULL,
    item_id VARCHAR(50) NOT NULL,
    item_type ENUM('medicine','material','item') DEFAULT 'material',
    total_stock INT UNSIGNED NOT NULL,
    remaining_stock INT UNSIGNED NOT NULL,
    price INT UNSIGNED NOT NULL,
    UNIQUE KEY uk_date_item (shop_date, item_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
");
echo "✅ Created npc_shop_stock table\n";

// Player daily purchase tracker
$pdo->exec("
CREATE TABLE IF NOT EXISTS player_shop_purchases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_id VARCHAR(32) NOT NULL,
    purchase_date DATE NOT NULL,
    total_spent INT UNSIGNED DEFAULT 0,
    items_bought INT UNSIGNED DEFAULT 0,
    INDEX idx_player_date (player_id, purchase_date),
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
");
echo "✅ Created player_shop_purchases table\n";

// Dynamic tax config
$pdo->exec("
CREATE TABLE IF NOT EXISTS market_tax_config (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tax_date DATE NOT NULL,
    tax_rate DECIMAL(5,2) DEFAULT 5.00,
    reason VARCHAR(255) DEFAULT 'Thuế chuẩn',
    UNIQUE KEY uk_date (tax_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
");
echo "✅ Created market_tax_config table\n";

echo "=== Migration 024 Complete ===\n";
