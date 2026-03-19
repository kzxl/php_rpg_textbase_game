<?php

require_once __DIR__ . '/../src/Core/Database.php';
use App\Core\Database;

try {
    $pdo = Database::pdo();
    $stmt = $pdo->query("SHOW COLUMNS FROM player_skills LIKE 'is_equipped'");
    $exists = $stmt->fetch();
    
    if (!$exists) {
        echo "Adding is_equipped column to player_skills...\n";
        $pdo->exec("ALTER TABLE player_skills ADD COLUMN is_equipped TINYINT(1) DEFAULT 0");
    } else {
        echo "Column is_equipped already exists in player_skills.\n";
    }
    
    echo "Migration 008 complete.\n";
} catch (Exception $e) {
    echo "Migration failed: " . $e->getMessage() . "\n";
}
