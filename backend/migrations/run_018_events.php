<?php

/**
 * Migration 018: Create player_events table
 */

require_once __DIR__ . '/../vendor/autoload.php';

use App\Core\Database;

try {
    $pdo = Database::pdo();
    
    // Create player_events table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS player_events (
            id INT AUTO_INCREMENT PRIMARY KEY,
            player_id VARCHAR(36) NOT NULL,
            type VARCHAR(50) NOT NULL,
            message TEXT NOT NULL,
            is_read TINYINT(1) DEFAULT 0,
            created_at INT NOT NULL,
            
            INDEX idx_player_read (player_id, is_read),
            INDEX idx_player_time (player_id, created_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    echo "Migration 018: player_events table created successfully.\n";

} catch (Exception $e) {
    die("Migration failed: " . $e->getMessage() . "\n");
}
