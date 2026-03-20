<?php
/**
 * Migration 029: Thiên Phần Tháp (Infinite Tower) tables
 */
require __DIR__ . '/../vendor/autoload.php';
use App\Core\Database;
$pdo = Database::pdo();

echo "=== Migration 029: Thiên Phần Tháp ===\n";

// Current tower runs (one per player per season)
$pdo->exec("CREATE TABLE IF NOT EXISTS tower_runs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_id VARCHAR(50) NOT NULL,
    season VARCHAR(7) NOT NULL COMMENT 'YYYY-MM format',
    current_floor INT DEFAULT 1,
    highest_floor INT DEFAULT 0,
    total_kills INT DEFAULT 0,
    status ENUM('active','dead','completed') DEFAULT 'active',
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_player_season (player_id, season),
    INDEX idx_season_floor (season, highest_floor DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

// Monthly leaderboard snapshots
$pdo->exec("CREATE TABLE IF NOT EXISTS tower_leaderboard (
    id INT AUTO_INCREMENT PRIMARY KEY,
    season VARCHAR(7) NOT NULL,
    player_id VARCHAR(50) NOT NULL,
    player_name VARCHAR(100),
    highest_floor INT DEFAULT 0,
    total_kills INT DEFAULT 0,
    rank_position INT DEFAULT 0,
    rewards_claimed TINYINT(1) DEFAULT 0,
    UNIQUE KEY uk_season_player (season, player_id),
    INDEX idx_season_rank (season, rank_position)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

echo "✅ tower_runs + tower_leaderboard tables created\n";
