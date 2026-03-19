<?php
// Migration 006: Dấu Vết Quái (Active Monsters Tracking)
$pdo = new PDO('mysql:host=127.0.0.1;port=3306;dbname=rpg_engine;charset=utf8mb4', 'root', '', [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

try {
    $pdo->exec("ALTER TABLE players ADD COLUMN tracked_monsters JSON NULL AFTER tree_progress");
    echo "[OK] Added tracked_monsters\n";
} catch (PDOException $e) {
    echo "[SKIP] tracked_monsters: " . $e->getMessage() . "\n";
}

try {
    $pdo->exec("ALTER TABLE players ADD COLUMN last_monster_spawn INT NOT NULL DEFAULT 0 AFTER tracked_monsters");
    echo "[OK] Added last_monster_spawn\n";
} catch (PDOException $e) {
    echo "[SKIP] last_monster_spawn: " . $e->getMessage() . "\n";
}

// Chạy khởi tạo giá trị default cho mảng JSON nếu rỗng
try {
    $pdo->exec("UPDATE players SET tracked_monsters = '[]' WHERE tracked_monsters IS NULL");
    echo "[OK] Initialize tracked_monsters default []\n";
} catch (PDOException $e) {}

// Verify
$cols = $pdo->query("DESCRIBE players")->fetchAll(PDO::FETCH_COLUMN);
echo "\nPlayers columns: " . implode(', ', $cols) . "\n";
