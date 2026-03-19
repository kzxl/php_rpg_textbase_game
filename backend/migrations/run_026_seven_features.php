<?php
/**
 * Migration 026: PvP Arena, Auction, Daily Quests, World Boss, Gacha, Leaderboard, Events
 */
require __DIR__ . '/../vendor/autoload.php';
use App\Core\Database;
$pdo = Database::pdo();

echo "=== Migration 026: 7 New Features ===\n";

// 1. PvP Arena
$pdo->exec("
CREATE TABLE IF NOT EXISTS pvp_arena (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_id VARCHAR(32) NOT NULL,
    rating INT DEFAULT 1000,
    wins INT UNSIGNED DEFAULT 0,
    losses INT UNSIGNED DEFAULT 0,
    streak INT DEFAULT 0,
    season INT UNSIGNED DEFAULT 1,
    last_fight TIMESTAMP NULL DEFAULT NULL,
    INDEX idx_player (player_id),
    INDEX idx_rating (rating DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
");
$pdo->exec("
CREATE TABLE IF NOT EXISTS pvp_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    attacker_id VARCHAR(32) NOT NULL,
    defender_id VARCHAR(32) NOT NULL,
    winner_id VARCHAR(32) NOT NULL,
    rating_change INT DEFAULT 0,
    gold_reward INT UNSIGNED DEFAULT 0,
    fight_log TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_attacker (attacker_id),
    INDEX idx_defender (defender_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
");
echo "✅ PvP Arena tables\n";

// 2. Auction House
$pdo->exec("
CREATE TABLE IF NOT EXISTS auction_listings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    seller_id VARCHAR(32) NOT NULL,
    item_data JSON NOT NULL,
    buyout_price INT UNSIGNED NOT NULL,
    current_bid INT UNSIGNED DEFAULT 0,
    bidder_id VARCHAR(32) DEFAULT NULL,
    listing_fee INT UNSIGNED DEFAULT 0,
    expires_at TIMESTAMP NOT NULL,
    status ENUM('active','sold','expired','cancelled') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_seller (seller_id),
    INDEX idx_status (status),
    INDEX idx_expires (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
");
echo "✅ Auction House table\n";

// 3. Daily Quests
$pdo->exec("
CREATE TABLE IF NOT EXISTS player_daily_quests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_id VARCHAR(32) NOT NULL,
    quest_id VARCHAR(50) NOT NULL,
    quest_data JSON NOT NULL,
    progress INT UNSIGNED DEFAULT 0,
    target INT UNSIGNED DEFAULT 1,
    completed TINYINT(1) DEFAULT 0,
    claimed TINYINT(1) DEFAULT 0,
    quest_date DATE NOT NULL,
    UNIQUE KEY uk_player_quest_date (player_id, quest_id, quest_date),
    INDEX idx_player_date (player_id, quest_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
");
echo "✅ Daily Quests table\n";

// 4. World Boss
$pdo->exec("
CREATE TABLE IF NOT EXISTS world_bosses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    boss_id VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    max_hp INT UNSIGNED NOT NULL,
    current_hp INT NOT NULL,
    level INT UNSIGNED DEFAULT 50,
    rewards JSON DEFAULT NULL,
    spawned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    defeated_at TIMESTAMP NULL DEFAULT NULL,
    status ENUM('active','defeated','expired') DEFAULT 'active',
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
");
$pdo->exec("
CREATE TABLE IF NOT EXISTS world_boss_damage (
    id INT AUTO_INCREMENT PRIMARY KEY,
    boss_instance_id INT NOT NULL,
    player_id VARCHAR(32) NOT NULL,
    total_damage INT UNSIGNED DEFAULT 0,
    hits INT UNSIGNED DEFAULT 0,
    last_hit TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uk_boss_player (boss_instance_id, player_id),
    INDEX idx_boss (boss_instance_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
");
echo "✅ World Boss tables\n";

// 5. Gacha
$pdo->exec("
CREATE TABLE IF NOT EXISTS gacha_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_id VARCHAR(32) NOT NULL,
    pool_id VARCHAR(50) NOT NULL,
    item_data JSON NOT NULL,
    rarity VARCHAR(20) DEFAULT 'common',
    cost INT UNSIGNED DEFAULT 0,
    pity_count INT UNSIGNED DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_player (player_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
");
$pdo->exec("
CREATE TABLE IF NOT EXISTS gacha_pity (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_id VARCHAR(32) NOT NULL,
    pool_id VARCHAR(50) NOT NULL,
    pulls_since_rare INT UNSIGNED DEFAULT 0,
    pulls_since_legendary INT UNSIGNED DEFAULT 0,
    UNIQUE KEY uk_player_pool (player_id, pool_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
");
echo "✅ Gacha tables\n";

// 6. Game Events
$pdo->exec("
CREATE TABLE IF NOT EXISTS game_events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    event_type ENUM('xp_boost','gold_boost','drop_boost','boss_spawn','pvp_season','special') DEFAULT 'xp_boost',
    multiplier DECIMAL(3,1) DEFAULT 2.0,
    start_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    active TINYINT(1) DEFAULT 1,
    rewards JSON DEFAULT NULL,
    INDEX idx_active (active),
    INDEX idx_time (start_time, end_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
");
echo "✅ Game Events table\n";

echo "=== Migration 026 Complete ===\n";
