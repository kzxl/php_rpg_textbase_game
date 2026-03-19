nagw
<?php
/**
 * Migration 015: Realm System – Add realm_tier column to players table
 */

require __DIR__ . '/../vendor/autoload.php';

use App\Core\Database;

$pdo = Database::pdo();

echo "=== Migration 015: Realm System ===\n";

// Add realm_tier column (default 1 = Luyện Khí)
try {
    $pdo->exec("ALTER TABLE players ADD COLUMN realm_tier TINYINT UNSIGNED DEFAULT 1");
    echo "✅ Added realm_tier column\n";
} catch (\Exception $e) {
    if (str_contains($e->getMessage(), 'Duplicate column')) {
        echo "⚠️  realm_tier column already exists\n";
    } else {
        throw $e;
    }
}

// Auto-set realm_tier for existing players based on their level
$pdo->exec("UPDATE players SET realm_tier = CASE
    WHEN level >= 40 THEN 8
    WHEN level >= 30 THEN 7
    WHEN level >= 25 THEN 6
    WHEN level >= 20 THEN 5
    WHEN level >= 15 THEN 4
    WHEN level >= 10 THEN 3
    WHEN level >= 5 THEN 2
    ELSE 1
END WHERE realm_tier = 1 AND level > 4");
echo "✅ Updated existing players' realm_tier\n";

echo "=== Migration 015 Complete ===\n";
