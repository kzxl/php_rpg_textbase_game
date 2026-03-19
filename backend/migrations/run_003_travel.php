<?php
// Migration: Add travel columns to players
$pdo = new PDO('mysql:host=127.0.0.1;port=3306;dbname=rpg_engine;charset=utf8mb4', 'root', '', [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

try {
    $pdo->exec("ALTER TABLE players ADD COLUMN traveling_to VARCHAR(50) DEFAULT NULL AFTER current_area");
    echo "[OK] Added traveling_to\n";
} catch (PDOException $e) {
    echo "[SKIP] traveling_to: " . $e->getMessage() . "\n";
}

try {
    $pdo->exec("ALTER TABLE players ADD COLUMN travel_arrives_at INT UNSIGNED DEFAULT 0 AFTER traveling_to");
    echo "[OK] Added travel_arrives_at\n";
} catch (PDOException $e) {
    echo "[SKIP] travel_arrives_at: " . $e->getMessage() . "\n";
}

// Verify
$cols = $pdo->query("DESCRIBE players")->fetchAll(PDO::FETCH_COLUMN);
echo "\nPlayers columns: " . implode(', ', $cols) . "\n";
