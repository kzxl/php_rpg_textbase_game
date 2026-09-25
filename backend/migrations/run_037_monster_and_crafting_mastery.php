<?php

/**
 * Migration 037: Monster Mastery & Crafting Mastery System
 * - Creates player_monster_mastery table for kill tracking, tier unlocking, and combat buffs
 * - Adds crafting_level and crafting_xp columns to players table
 */

require_once __DIR__ . '/../src/Core/Database.php';

use App\Core\Database;

try {
    $pdo = Database::connect();
    echo "Running migration 037: Monster Mastery & Crafting Mastery...\n";

    // 1. Add crafting columns to players table if not present
    $columns = [
        "crafting_level" => "INT UNSIGNED NOT NULL DEFAULT 1 COMMENT 'Crafting Mastery Level (1-100+)'",
        "crafting_xp" => "INT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Crafting Mastery XP'",
    ];

    foreach ($columns as $col => $definition) {
        $check = $pdo->prepare("SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'players' AND COLUMN_NAME = ?");
        $check->execute([$col]);
        if ($check->rowCount() === 0) {
            $pdo->exec("ALTER TABLE players ADD COLUMN {$col} {$definition}");
            echo " - Added column '{$col}' to 'players'.\n";
        } else {
            echo " - Column '{$col}' already exists in 'players'.\n";
        }
    }

    // 2. Create player_monster_mastery table
    $sqlMonsterMastery = "
    CREATE TABLE IF NOT EXISTS player_monster_mastery (
        id INT AUTO_INCREMENT PRIMARY KEY,
        player_id VARCHAR(36) NOT NULL,
        monster_id VARCHAR(50) NOT NULL,
        kills INT UNSIGNED NOT NULL DEFAULT 0,
        mastery_tier TINYINT UNSIGNED NOT NULL DEFAULT 0,
        first_killed_at INT UNSIGNED NOT NULL DEFAULT 0,
        last_killed_at INT UNSIGNED NOT NULL DEFAULT 0,
        created_at INT UNSIGNED NOT NULL DEFAULT 0,
        updated_at INT UNSIGNED NOT NULL DEFAULT 0,
        UNIQUE KEY uq_player_monster (player_id, monster_id),
        INDEX idx_player (player_id),
        INDEX idx_monster (monster_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ";

    $pdo->exec($sqlMonsterMastery);
    echo " - Table 'player_monster_mastery' is ready.\n";

    echo "Migration 037 completed successfully!\n";
} catch (\Exception $e) {
    echo "Migration 037 failed: " . $e->getMessage() . "\n";
    exit(1);
}
