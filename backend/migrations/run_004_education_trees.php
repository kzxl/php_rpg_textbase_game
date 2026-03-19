<?php
// Migration 004: Update players table for new Education Tree system
$pdo = new PDO('mysql:host=127.0.0.1;port=3306;dbname=rpg_engine;charset=utf8mb4', 'root', '', [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

try {
    $pdo->exec("ALTER TABLE players CHANGE current_course studying_node VARCHAR(50) DEFAULT ''");
    echo "[OK] Changed current_course to studying_node\n";
} catch (PDOException $e) {
    echo "[SKIP] studying_node: " . $e->getMessage() . "\n";
}

try {
    $pdo->exec("ALTER TABLE players CHANGE course_ends_at study_ends_at INT UNSIGNED DEFAULT 0");
    echo "[OK] Changed course_ends_at to study_ends_at\n";
} catch (PDOException $e) {
    echo "[SKIP] study_ends_at: " . $e->getMessage() . "\n";
}

try {
    $pdo->exec("ALTER TABLE players CHANGE completed_courses unlocked_nodes JSON DEFAULT NULL");
    echo "[OK] Changed completed_courses to unlocked_nodes\n";
} catch (PDOException $e) {
    echo "[SKIP] unlocked_nodes: " . $e->getMessage() . "\n";
}

try {
    $pdo->exec("ALTER TABLE players ADD COLUMN tree_progress JSON DEFAULT NULL AFTER unlocked_nodes");
    echo "[OK] Added tree_progress\n";
} catch (PDOException $e) {
    echo "[SKIP] tree_progress: " . $e->getMessage() . "\n";
}

// Verify
$cols = $pdo->query("DESCRIBE players")->fetchAll(PDO::FETCH_COLUMN);
echo "\nPlayers columns: " . implode(', ', $cols) . "\n";
