<?php
/**
 * Migration 020: Mugging System — Cướp Đoạt Linh Thạch (Torn-style)
 * Tracks mugging cooldowns and attack logs.
 */

require __DIR__ . '/../vendor/autoload.php';

use App\Core\Database;

$pdo = Database::pdo();

echo "=== Migration 020: Mugging System ===\n";

$pdo->exec("
CREATE TABLE IF NOT EXISTS mugging_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    attacker_id VARCHAR(32) NOT NULL,
    attacker_name VARCHAR(50) NOT NULL,
    victim_id VARCHAR(32) NOT NULL,
    victim_name VARCHAR(50) NOT NULL,
    gold_stolen INT UNSIGNED DEFAULT 0,
    outcome ENUM('success','fail','flee') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_attacker (attacker_id),
    INDEX idx_victim (victim_id),
    FOREIGN KEY (attacker_id) REFERENCES players(id) ON DELETE CASCADE,
    FOREIGN KEY (victim_id) REFERENCES players(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
");
echo "✅ Created mugging_log table\n";

// Add mugging cooldown column to players
try {
    $pdo->exec("ALTER TABLE players ADD COLUMN mug_cooldown_until INT UNSIGNED DEFAULT 0 AFTER med_cooldown_until");
    echo "✅ Added mug_cooldown_until column\n";
} catch (\Exception $e) {
    echo "⚠ mug_cooldown_until column may already exist: " . $e->getMessage() . "\n";
}

echo "=== Migration 020 Complete ===\n";
