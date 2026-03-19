<?php

/**
 * Migration 017: Add 'level' and 'current_xp' to player_skills
 */

require __DIR__ . '/../vendor/autoload.php';

use App\Core\Database;

echo "=== Migration 017: Add Skill Progression Columns ===\n";

try {
    $pdo = Database::pdo();
} catch (\Exception $e) {
    die("Database connection failed: " . $e->getMessage() . "\n");
}

try {
    $pdo->exec("ALTER TABLE player_skills ADD COLUMN level INT DEFAULT 1");
    echo "✅ Added level column\n";
} catch (\Exception $e) {
    echo "ℹ️ level column already exists or error: " . $e->getMessage() . "\n";
}

try {
    $pdo->exec("ALTER TABLE player_skills ADD COLUMN current_xp INT DEFAULT 0");
    echo "✅ Added current_xp column\n";
} catch (\Exception $e) {
    echo "ℹ️ current_xp column already exists or error: " . $e->getMessage() . "\n";
}

echo "=== Migration 017 Complete ===\n";
