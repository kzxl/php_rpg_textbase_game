<?php
require __DIR__ . '/vendor/autoload.php';

use App\Core\PlayerRepository;

echo "=== Kiểm tra / Khởi tạo Admin ===\n";

$username = 'admin';
$password = 'admin';

// Dùng try-catch để register, nếu đã có rồi thì sửa logic update
$result = \App\Core\PlayerRepository::register($username, $password, 'Game Master', 'male');

// Dù thất bại (đã tồn tại) hay thành công, ta đều load nó ra và update
$pdo = \App\Core\Database::pdo();
$stmt = $pdo->prepare("SELECT id FROM players WHERE username = ?");
$stmt->execute([$username]);
$id = $stmt->fetchColumn();

if (!$id) {
    if (isset($result['error'])) {
        echo "Lỗi: " . $result['error'] . "\n";
        exit(1);
    }
    $id = $result['id'];
}

$player = \App\Core\PlayerRepository::load($id);
if ($player) {
    $player->role = 'admin';
    $player->level = 100;
    $player->realmTier = 8;
    $player->gold = 9999999;
    $player->statPoints = 1000;
    $player->fullHeal();
    \App\Core\PlayerRepository::save($id, $player);
    echo "✅ Tạo/Cập nhật Admin thành công! Đăng nhập bằng: admin / admin\n";
} else {
    echo "❌ Không thể tìm thấy player admin để update!\n";
}
