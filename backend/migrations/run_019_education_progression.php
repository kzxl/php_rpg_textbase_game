<?php

require_once __DIR__ . '/../src/Core/Database.php';

use App\Core\Database;

$pdo = Database::pdo();

echo "Bổ sung cột skill_progress và discovered_nodes vào players table...\n";

try {
    $pdo->exec("ALTER TABLE players ADD COLUMN skill_progress JSON DEFAULT NULL");
    echo "Đã thêm cột skill_progress.\n";
} catch (\PDOException $e) {
    if (strpos($e->getMessage(), 'Duplicate column name') !== false) {
        echo "Cột skill_progress đã tồn tại, bỏ qua.\n";
    } else {
        throw $e;
    }
}

try {
    $pdo->exec("ALTER TABLE players ADD COLUMN discovered_nodes JSON DEFAULT NULL");
    echo "Đã thêm cột discovered_nodes.\n";
} catch (\PDOException $e) {
    if (strpos($e->getMessage(), 'Duplicate column name') !== false) {
        echo "Cột discovered_nodes đã tồn tại, bỏ qua.\n";
    } else {
        throw $e;
    }
}

echo "Hoàn tất Migration 019.\n";
