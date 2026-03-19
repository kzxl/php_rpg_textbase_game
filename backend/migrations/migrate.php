<?php
/**
 * Run database migrations via PDO.
 * Usage: php migrations/migrate.php
 */

echo "=== RPG Engine Migration ===\n";

try {
    // Connect without database first to create it
    $pdo = new PDO(
        'mysql:host=127.0.0.1;port=3306;charset=utf8mb4',
        'root', '',
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
    
    echo "[OK] Connected to MySQL\n";
    
    // Read and execute migration SQL
    $sql = file_get_contents(__DIR__ . '/001_init.sql');
    
    // Split by semicolons but handle multi-statement
    $pdo->exec("CREATE DATABASE IF NOT EXISTS rpg_engine CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    echo "[OK] Database created/exists\n";
    
    $pdo->exec("USE rpg_engine");
    
    // Split SQL into individual statements
    $statements = array_filter(
        array_map('trim', explode(';', $sql)),
        fn($s) => !empty($s) && !str_starts_with($s, '--') && !str_starts_with($s, 'CREATE DATABASE') && !str_starts_with($s, 'USE ')
    );
    
    $count = 0;
    foreach ($statements as $stmt) {
        $stmt = trim($stmt);
        if (empty($stmt) || $stmt === '' || str_starts_with($stmt, '--')) continue;
        
        try {
            $pdo->exec($stmt);
            $count++;
            
            // Show what we created
            if (str_contains($stmt, 'CREATE TABLE')) {
                preg_match('/CREATE TABLE.*?(\w+)\s*\(/i', $stmt, $m);
                echo "[OK] Table: " . ($m[1] ?? '?') . "\n";
            } elseif (str_contains($stmt, 'INSERT INTO')) {
                preg_match('/INSERT INTO\s+(\w+)/i', $stmt, $m);
                echo "[OK] Seed: " . ($m[1] ?? '?') . "\n";
            }
        } catch (PDOException $e) {
            // Skip duplicate errors for idempotent migration
            if ($e->getCode() == '42S01' || str_contains($e->getMessage(), 'already exists')) {
                echo "[SKIP] Already exists\n";
            } elseif ($e->getCode() == '23000' || str_contains($e->getMessage(), 'Duplicate entry')) {
                echo "[SKIP] Duplicate seed data\n";
            } else {
                echo "[ERR] " . $e->getMessage() . "\n";
                echo "  SQL: " . substr($stmt, 0, 100) . "...\n";
            }
        }
    }
    
    echo "\n=== Migration complete ($count statements) ===\n";
    
    // Verify tables
    $tables = $pdo->query("SHOW TABLES FROM rpg_engine")->fetchAll(PDO::FETCH_COLUMN);
    echo "Tables: " . implode(', ', $tables) . "\n";
    
} catch (PDOException $e) {
    echo "[FATAL] " . $e->getMessage() . "\n";
    exit(1);
}
