<?php

/**
 * Migration 038: Mana Reservation & Heavenly Tribulation Progression
 * Adds active_auras and tribulation_records columns to players table.
 */

require_once __DIR__ . '/../src/Core/Database.php';

use App\Core\Database;

try {
    $pdo = Database::connect();
    echo "Running migration 038: Mana Reservation & Heavenly Tribulation...\n";

    $columns = [
        "active_auras" => "JSON DEFAULT NULL COMMENT 'Active toggled passives/auras reserving mana'",
        "tribulation_records" => "JSON DEFAULT NULL COMMENT 'History of survived heavenly tribulations'",
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

    echo "Migration 038 completed successfully!\n";
} catch (\Exception $e) {
    echo "Migration 038 failed: " . $e->getMessage() . "\n";
    exit(1);
}
