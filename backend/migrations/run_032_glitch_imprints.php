<?php

/**
 * Migration 032: Glitch Imprints & Heavenly Glitch System
 * Adds glitch_insight, behavior_counters, unlocked_imprints, active_stance to players table.
 */

require_once __DIR__ . '/../src/Core/Database.php';

use App\Core\Database;

try {
    $pdo = Database::connect();
    echo "Running migration 032: Glitch Imprints & Behavior Tracking...\n";

    // 1. Add columns to players table if they do not exist
    $columns = [
        "glitch_insight" => "INT UNSIGNED DEFAULT 0 COMMENT 'Heavenly Glitch Insight Points'",
        "behavior_counters" => "JSON DEFAULT NULL COMMENT 'Tracked player actions count'",
        "unlocked_imprints" => "JSON DEFAULT NULL COMMENT 'Array of unlocked glitch imprint IDs'",
        "active_stance" => "VARCHAR(20) DEFAULT 'breaker' COMMENT 'Combat stance: breaker, flow, glitch'",
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

    echo "Migration 032 completed successfully!\n";
} catch (\Exception $e) {
    echo "Migration 032 failed: " . $e->getMessage() . "\n";
    exit(1);
}
