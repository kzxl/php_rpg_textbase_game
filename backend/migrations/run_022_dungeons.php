<?php
/**
 * Migration 022: Dungeon System — Bí Cảnh (Map/Instance System)
 */

require __DIR__ . '/../vendor/autoload.php';
use App\Core\Database;
$pdo = Database::pdo();

echo "=== Migration 022: Dungeon System ===\n";

$pdo->exec("
CREATE TABLE IF NOT EXISTS dungeon_runs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_id VARCHAR(32) NOT NULL,
    dungeon_id VARCHAR(50) NOT NULL,
    map_item_id VARCHAR(50) NOT NULL,
    status ENUM('active','completed','failed','abandoned') DEFAULT 'active',
    current_wave INT UNSIGNED DEFAULT 1,
    total_waves INT UNSIGNED DEFAULT 3,
    boss_defeated TINYINT(1) DEFAULT 0,
    loot_log JSON DEFAULT NULL,
    combat_log JSON DEFAULT NULL,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL DEFAULT NULL,
    INDEX idx_player (player_id),
    INDEX idx_status (status),
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
");
echo "✅ Created dungeon_runs table\n";

echo "=== Migration 022 Complete ===\n";
