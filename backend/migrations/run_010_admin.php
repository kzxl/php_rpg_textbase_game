<?php

require_once __DIR__ . '/../src/Core/Database.php';
use App\Core\Database;

try {
    $pdo = Database::pdo();
    $stmt = $pdo->query("SHOW COLUMNS FROM players LIKE 'role'");
    $exists = $stmt->fetch();

    if (!$exists) {
        echo "Adding 'role' column to players...\n";
        $pdo->exec("ALTER TABLE players ADD COLUMN role VARCHAR(20) DEFAULT 'player'");
    } else {
        echo "Column 'role' already exists in players.\n";
    }

    echo "✅ Migration 010: admin role column ready.\n";
} catch (Exception $e) {
    echo "❌ Migration 010 failed: " . $e->getMessage() . "\n";
}
