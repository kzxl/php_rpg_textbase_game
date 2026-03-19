<?php

/**
 * Migration 016: Add 'role' column to players table
 */

require __DIR__ . '/../vendor/autoload.php';

use App\Core\Database;

echo "=== Migration 016: Add Role Column ===\n";

try {
    $pdo = Database::pdo();
} catch (\Exception $e) {
    die("Database connection failed: " . $e->getMessage() . "\n");
}

try {
    $pdo->exec("ALTER TABLE players ADD COLUMN role VARCHAR(20) DEFAULT 'player'");
    echo "✅ Added role column\n";
} catch (\Exception $e) {
    if (str_contains($e->getMessage(), 'Duplicate column')) {
        echo "ℹ️ role column already exists\n";
    } else {
        echo "❌ Error adding role column: " . $e->getMessage() . "\n";
    }
}

echo "=== Migration 016 Complete ===\n";
