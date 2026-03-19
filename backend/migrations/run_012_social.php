<?php
/**
 * Migration 012: Social System – Player Relationships (Đạo Hữu / Kẻ Thù)
 */

require __DIR__ . '/../vendor/autoload.php';

use App\Core\Database;

$pdo = Database::pdo();

echo "=== Migration 012: Social System ===\n";

// player_relationships: friend requests, friendships, enemies
$pdo->exec("
CREATE TABLE IF NOT EXISTS player_relationships (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_id VARCHAR(32) NOT NULL,
    target_id VARCHAR(32) NOT NULL,
    type ENUM('friend_pending','friend','enemy') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_relation (player_id, target_id),
    INDEX idx_target (target_id),
    INDEX idx_type (player_id, type),
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE,
    FOREIGN KEY (target_id) REFERENCES players(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
");
echo "✅ Created player_relationships table\n";

echo "=== Migration 012 Complete ===\n";
