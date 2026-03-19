<?php
// Migration 005: Thể Lực (Stamina)
$pdo = new PDO('mysql:host=127.0.0.1;port=3306;dbname=rpg_engine;charset=utf8mb4', 'root', '', [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

try {
    $pdo->exec("ALTER TABLE players ADD COLUMN current_stamina INT NOT NULL DEFAULT 100 AFTER max_energy");
    echo "[OK] Added current_stamina\n";
} catch (PDOException $e) {
    echo "[SKIP] current_stamina: " . $e->getMessage() . "\n";
}

try {
    $pdo->exec("ALTER TABLE players ADD COLUMN max_stamina INT NOT NULL DEFAULT 100 AFTER current_stamina");
    echo "[OK] Added max_stamina\n";
} catch (PDOException $e) {
    echo "[SKIP] max_stamina: " . $e->getMessage() . "\n";
}

// Verify
$cols = $pdo->query("DESCRIBE players")->fetchAll(PDO::FETCH_COLUMN);
echo "\nPlayers columns: " . implode(', ', $cols) . "\n";
