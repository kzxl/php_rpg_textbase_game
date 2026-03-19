<?php
// Migration 007: Normalized Monster Tracking System
$pdo = new PDO('mysql:host=127.0.0.1;port=3306;dbname=rpg_engine;charset=utf8mb4', 'root', '', [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

// Xóa 2 cột nháp từ migration 006 nếu có
try {
    $pdo->exec("ALTER TABLE players DROP COLUMN tracked_monsters");
    echo "[OK] Dropped tracked_monsters from players\n";
} catch (PDOException $e) {}

try {
    $pdo->exec("ALTER TABLE players DROP COLUMN last_monster_spawn");
    echo "[OK] Dropped last_monster_spawn from players\n";
} catch (PDOException $e) {}

// Tạo bảng player_exploration
$sqlExploration = "
CREATE TABLE IF NOT EXISTS player_exploration (
    player_id VARCHAR(36) PRIMARY KEY,
    last_monster_spawn INT NOT NULL DEFAULT 0,
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
";
try {
    $pdo->exec($sqlExploration);
    echo "[OK] Created player_exploration table\n";
} catch (PDOException $e) {
    echo "[ERROR] player_exploration: " . $e->getMessage() . "\n";
}

// Tạo bảng player_tracked_monsters
$sqlMonsters = "
CREATE TABLE IF NOT EXISTS player_tracked_monsters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_id VARCHAR(36) NOT NULL,
    area_id VARCHAR(50) NOT NULL,
    monster_id VARCHAR(50) NOT NULL,
    current_hp INT NOT NULL,
    spawned_at INT NOT NULL,
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE,
    INDEX (player_id, area_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
";
try {
    $pdo->exec($sqlMonsters);
    echo "[OK] Created player_tracked_monsters table\n";
} catch (PDOException $e) {
    echo "[ERROR] player_tracked_monsters: " . $e->getMessage() . "\n";
}
