<?php
/**
 * Migration 041: Secret Realms Discovery System (Bí Cảnh Khám Phá & Cấm Địa Thượng Cổ)
 *
 * Implements 2 types of discoverable dungeons:
 * 1. Timed Secret Realm (Huyễn Cảnh): has expiration countdown timer, disappears when expired.
 * 2. Permanent Secret Realm (Thượng Cổ Cấm Địa): no expiration, extremely strong monsters (x2.0 - x3.5 stats).
 */

require __DIR__ . '/../vendor/autoload.php';
use App\Core\Database;

$pdo = Database::pdo();

echo "=== Migration 041: Secret Realms Discovery System ===\n";

// 1. Create player_discovered_dungeons table
$pdo->exec("
CREATE TABLE IF NOT EXISTS player_discovered_dungeons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_id VARCHAR(32) NOT NULL,
    dungeon_key VARCHAR(64) NOT NULL,
    realm_type ENUM('timed', 'permanent') NOT NULL DEFAULT 'timed',
    name VARCHAR(120) NOT NULL,
    description TEXT NULL,
    tier INT UNSIGNED DEFAULT 1,
    required_realm INT UNSIGNED DEFAULT 1,
    difficulty_mult DECIMAL(4,2) DEFAULT 1.00,
    waves INT UNSIGNED DEFAULT 3,
    area_id VARCHAR(50) NULL,
    discovered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL DEFAULT NULL,
    is_cleared TINYINT(1) DEFAULT 0,
    cleared_at TIMESTAMP NULL DEFAULT NULL,
    clear_count INT UNSIGNED DEFAULT 0,
    status ENUM('available', 'cleared', 'expired') DEFAULT 'available',
    monster_pool JSON DEFAULT NULL,
    boss_data JSON DEFAULT NULL,
    rewards_data JSON DEFAULT NULL,
    INDEX idx_player_status (player_id, status),
    INDEX idx_expires (expires_at),
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
");
echo "✅ Created player_discovered_dungeons table\n";

// 2. Modify dungeon_runs table to support discovered dungeons
try {
    $pdo->exec("ALTER TABLE dungeon_runs MODIFY COLUMN map_item_id VARCHAR(50) NULL DEFAULT ''");
    echo "✅ Modified dungeon_runs.map_item_id to be nullable\n";
} catch (\PDOException $e) {
    echo "ℹ️ Note on map_item_id modification: " . $e->getMessage() . "\n";
}

// Add discovered_id column if not exists
$checkDiscovered = $pdo->query("SHOW COLUMNS FROM dungeon_runs LIKE 'discovered_id'")->fetch();
if (!$checkDiscovered) {
    $pdo->exec("ALTER TABLE dungeon_runs ADD COLUMN discovered_id INT NULL DEFAULT NULL AFTER map_item_id");
    echo "✅ Added discovered_id to dungeon_runs\n";
}

// Add difficulty_mult column if not exists
$checkMult = $pdo->query("SHOW COLUMNS FROM dungeon_runs LIKE 'difficulty_mult'")->fetch();
if (!$checkMult) {
    $pdo->exec("ALTER TABLE dungeon_runs ADD COLUMN difficulty_mult DECIMAL(4,2) DEFAULT 1.00 AFTER total_waves");
    echo "✅ Added difficulty_mult to dungeon_runs\n";
}

echo "=== Migration 041 Complete ===\n";
