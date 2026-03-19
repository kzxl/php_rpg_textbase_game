<?php
// Fix: create player_skills without FK + index on player_id
$pdo = new PDO('mysql:host=127.0.0.1;port=3306;dbname=rpg_engine;charset=utf8mb4', 'root', '', [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

// Show players table structure
echo "=== Players columns ===\n";
$cols = $pdo->query("DESCRIBE players")->fetchAll(PDO::FETCH_ASSOC);
foreach ($cols as $c) echo "  {$c['Field']} ({$c['Type']}) {$c['Key']}\n";

// Create player_skills (without FK, just index)
echo "\n=== Creating player_skills ===\n";
try {
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS player_skills (
            id INT AUTO_INCREMENT PRIMARY KEY,
            player_id VARCHAR(32) NOT NULL,
            skill_id VARCHAR(64) NOT NULL,
            learned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE KEY unique_player_skill (player_id, skill_id),
            INDEX idx_player (player_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    ");
    echo "[OK] player_skills table created\n";
} catch (PDOException $e) {
    echo "[ERR] " . $e->getMessage() . "\n";
}

// Verify
echo "\n=== Final tables ===\n";
$tables = $pdo->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
echo implode(', ', $tables) . "\n";

echo "\n=== player_skills columns ===\n";
$cols = $pdo->query("DESCRIBE player_skills")->fetchAll(PDO::FETCH_ASSOC);
foreach ($cols as $c) echo "  {$c['Field']} ({$c['Type']}) {$c['Key']}\n";
