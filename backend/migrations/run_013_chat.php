<?php
/**
 * Migration 013: Chat System
 */

require __DIR__ . '/../vendor/autoload.php';

use App\Core\Database;

$pdo = Database::pdo();

echo "=== Migration 013: Chat System ===\n";

$pdo->exec("
CREATE TABLE IF NOT EXISTS chat_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id VARCHAR(32) NOT NULL,
    sender_name VARCHAR(50) NOT NULL,
    channel ENUM('global','private') DEFAULT 'global',
    receiver_id VARCHAR(32) DEFAULT NULL,
    message VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_global (channel, created_at),
    INDEX idx_private (receiver_id, created_at),
    INDEX idx_sender (sender_id, created_at),
    FOREIGN KEY (sender_id) REFERENCES players(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
");
echo "✅ Created chat_messages table\n";

echo "=== Migration 013 Complete ===\n";
