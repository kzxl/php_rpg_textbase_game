<?php
/**
 * Migration 023: Housing System — Động Phủ
 */

require __DIR__ . '/../vendor/autoload.php';
use App\Core\Database;
$pdo = Database::pdo();

echo "=== Migration 023: Housing System ===\n";

$pdo->exec("
CREATE TABLE IF NOT EXISTS player_housing (
    player_id VARCHAR(32) PRIMARY KEY,
    tier INT UNSIGNED DEFAULT 1,
    garden_slots JSON DEFAULT NULL,
    purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
");
echo "✅ Created player_housing table\n";

echo "=== Migration 023 Complete ===\n";
