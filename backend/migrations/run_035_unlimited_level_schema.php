<?php
/**
 * Migration 035: Unlimited Level Schema Migration
 * Alter xp, xp_to_next, gold, current_hp, max_hp to BIGINT UNSIGNED
 * and realm_tier to INT UNSIGNED to support infinite level and stat scaling.
 */
require_once __DIR__ . '/../vendor/autoload.php';

$config = require __DIR__ . '/../src/Config/database.php';
$db = $config['connections']['mysql'];
$dsn = "mysql:host={$db['host']};port={$db['port']};dbname={$db['database']};charset={$db['charset']}";

try {
    $pdo = new PDO($dsn, $db['username'], $db['password'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]);

    $pdo->exec("
        ALTER TABLE players 
        MODIFY COLUMN xp BIGINT UNSIGNED DEFAULT 0,
        MODIFY COLUMN xp_to_next BIGINT UNSIGNED DEFAULT 100,
        MODIFY COLUMN gold BIGINT UNSIGNED DEFAULT 0,
        MODIFY COLUMN current_hp BIGINT UNSIGNED DEFAULT 100,
        MODIFY COLUMN max_hp BIGINT UNSIGNED DEFAULT 100,
        MODIFY COLUMN realm_tier INT UNSIGNED DEFAULT 1;
    ");

    echo "✅ Migration 035 executed: Expanded players table columns for unlimited level scaling.\n";
} catch (PDOException $e) {
    echo "❌ Migration failed: " . $e->getMessage() . "\n";
}
