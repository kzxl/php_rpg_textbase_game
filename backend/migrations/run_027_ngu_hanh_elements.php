<?php
/**
 * Migration: Assign Ngũ Hành (Five Elements) to all monsters
 * Elements: fire, water, wood, earth, metal
 */

require __DIR__ . '/../vendor/autoload.php';

use App\Core\Database;

$pdo = Database::pdo();

// Element assignments based on monster theme/tags
$assignments = [
    'hoa_ho'               => 'fire',    // Hỏa Hồ — fire fox
    'hoa_diem_vuong'       => 'fire',    // Hỏa Diệm Vương — fire demon
    'thanh_xa'             => 'wood',    // Thanh Xà — green snake (wood/poison)
    'moc_nhan'             => 'wood',    // Mộc Nhân — wood puppet
    'moc_yeu_hoang'        => 'wood',    // Mộc Yêu Hoàng — wood demon king
    'tho_lang'             => 'earth',   // Thổ Lang — earth wolf
    'thiet_giap_trung'     => 'earth',   // Thiết Giáp Trùng — armored bug (earth/metal)
    'thien_thach_thu'      => 'earth',   // Thiên Thạch Thú — meteor beast
    'u_linh'               => 'water',   // U Linh — ghost (yin/water)
    'anh_hon'              => 'water',   // Ảnh Hồn — spirit shadow (yin/water)
    'huyet_bat_yeu_vuong'  => 'water',   // Huyết Bát — blood (water)
    'huyet_lang_vuong'     => 'metal',   // Huyết Lang Vương — wolf king (metal/claw)
    'co_thi'               => 'wood',    // Cổ Thi — ancient corpse (wood/poison)
    'loi_dieu'             => 'metal',   // Lôi Điểu — thunder bird (metal/lightning)
    'loi_de_than_ung'      => 'metal',   // Lôi Đế Thần Ưng — thunder hawk (metal)
    'huyet_ma_dai_tuong'   => 'fire',    // Huyết Ma Đại Tướng — blood demon general
    'ma_nhan'              => 'fire',    // Ma Nhãn — demon eye (fire/dark)
];

$updated = 0;
foreach ($assignments as $monsterId => $element) {
    // Get current data
    $stmt = $pdo->prepare("SELECT data FROM game_monsters WHERE id = ?");
    $stmt->execute([$monsterId]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$row) {
        echo "  SKIP: $monsterId not found\n";
        continue;
    }

    $data = json_decode($row['data'], true);
    $data['element'] = $element;
    $newData = json_encode($data, JSON_UNESCAPED_UNICODE);

    $update = $pdo->prepare("UPDATE game_monsters SET data = ? WHERE id = ?");
    $update->execute([$newData, $monsterId]);
    $updated++;
    echo "  ✅ $monsterId → $element\n";
}

echo "\n🎉 Updated $updated monsters with Ngũ Hành elements.\n";
