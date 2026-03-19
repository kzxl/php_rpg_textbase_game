<?php
/**
 * Migration 028: Atlas Map Runs table for Tiên Cảnh endgame system
 */
require __DIR__ . '/../vendor/autoload.php';
use App\Core\Database;
$pdo = Database::pdo();

echo "=== Migration 028: Atlas Map Runs ===\n";

$pdo->exec("CREATE TABLE IF NOT EXISTS atlas_map_runs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_id VARCHAR(50) NOT NULL,
    map_id VARCHAR(100) NOT NULL,
    map_name VARCHAR(200) NOT NULL,
    tier INT DEFAULT 1,
    current_wave INT DEFAULT 1,
    total_waves INT DEFAULT 5,
    modifiers JSON DEFAULT NULL,
    boss_defeated TINYINT(1) DEFAULT 0,
    status ENUM('active','completed','failed','abandoned') DEFAULT 'active',
    loot_log JSON DEFAULT NULL,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    INDEX idx_player (player_id),
    INDEX idx_status (player_id, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

echo "✅ atlas_map_runs table created\n";
