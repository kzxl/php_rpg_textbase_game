<?php

require_once __DIR__ . '/../src/Core/Database.php';
use App\Core\Database;

try {
    $pdo = Database::pdo();

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS player_quests (
            id INT AUTO_INCREMENT PRIMARY KEY,
            player_id VARCHAR(36) NOT NULL,
            npc_id VARCHAR(50) NOT NULL,
            quest_id VARCHAR(50) NOT NULL,
            status ENUM('active','completed') DEFAULT 'active',
            progress INT DEFAULT 0,
            accepted_at INT NOT NULL,
            completed_at INT DEFAULT NULL,
            UNIQUE KEY uq_player_quest (player_id, quest_id),
            INDEX idx_player_active (player_id, status)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");

    echo "✅ Migration 009: player_quests table created.\n";
} catch (Exception $e) {
    echo "❌ Migration 009 failed: " . $e->getMessage() . "\n";
}
