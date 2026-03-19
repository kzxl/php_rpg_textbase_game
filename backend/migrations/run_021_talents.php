<?php
/**
 * Migration 021: Talent System — Căn Cốt (Player Aptitude)
 */

require __DIR__ . '/../vendor/autoload.php';

use App\Core\Database;

$pdo = Database::pdo();

echo "=== Migration 021: Talent System ===\n";

// Add talents JSON column to players
try {
    $pdo->exec("ALTER TABLE players ADD COLUMN talents JSON DEFAULT NULL AFTER realm_tier");
    echo "✅ Added talents column\n";
} catch (\Exception $e) {
    echo "⚠ talents column may already exist: " . $e->getMessage() . "\n";
}

echo "=== Migration 021 Complete ===\n";
