<?php
/**
 * Migration 014: Market System – Player Marketplace (Giao Dịch Đài)
 */

require __DIR__ . '/../vendor/autoload.php';

use App\Core\Database;

$pdo = Database::pdo();

echo "=== Migration 014: Market System ===\n";

$pdo->exec("
CREATE TABLE IF NOT EXISTS market_listings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    seller_id VARCHAR(32) NOT NULL,
    seller_name VARCHAR(50) NOT NULL,
    item_type ENUM('item','material','medicine') NOT NULL,
    item_id VARCHAR(50) NOT NULL,
    item_name VARCHAR(100) NOT NULL,
    item_data JSON DEFAULT NULL COMMENT 'Full item data for equipment',
    quantity INT UNSIGNED DEFAULT 1,
    price INT UNSIGNED NOT NULL COMMENT 'Price per unit in Linh Thạch',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_seller (seller_id),
    INDEX idx_type (item_type),
    INDEX idx_price (item_type, price),
    FOREIGN KEY (seller_id) REFERENCES players(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
");
echo "✅ Created market_listings table\n";

echo "=== Migration 014 Complete ===\n";
