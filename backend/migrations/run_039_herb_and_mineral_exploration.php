<?php
/**
 * Migration 039: Differentiated Herb and Mineral Exploration System
 * Upgrades all 18 world realms with distinct rates and pools for:
 * - 🌿 Thảo Dược (herb)
 * - ⛏️ Mạch Khoáng (mineral)
 * - 📦 Dã Ngoại (material)
 */
require_once __DIR__ . '/../vendor/autoload.php';

use App\Core\Database;

try {
    $pdo = Database::connect();

    $areasPath = __DIR__ . '/../data/exploration.json';
    $areas = json_decode(file_get_contents($areasPath), true);

    $areaConfigs = [
        'thanh_lam_tran' => [
            'herb_rate' => 25, 'herb_pool' => ['linh_thao', 'huyet_thao', 'doc_thao'],
            'min_rate' => 10, 'min_pool' => ['mat_khong_gian_manh', 'mat_kim_loai_linh', 'mat_tinh_thach'],
            'mat_rate' => 10, 'mat_pool' => ['mat_thit_tho', 'mat_da_tho', 'mat_xuong_vun'],
        ],
        'hac_phong_lam' => [
            'herb_rate' => 25, 'herb_pool' => ['thanh_linh_thao', 'hoa_linh_chi', 'bang_linh_thao'],
            'min_rate' => 10, 'min_pool' => ['mat_kim_loai_linh', 'mat_tinh_thach'],
            'mat_rate' => 10, 'mat_pool' => ['mat_go_linh', 'mat_nhua_cay', 'mat_da_ran', 'mat_noc_xa'],
        ],
        'vong_linh_coc' => [
            'herb_rate' => 15, 'herb_pool' => ['doc_thao', 'kim_linh_thao', 'mat_am_hon_thao'],
            'min_rate' => 20, 'min_pool' => ['mat_tinh_thach', 'mat_kim_loai_linh', 'mat_khong_gian_thach'],
            'mat_rate' => 10, 'mat_pool' => ['mat_hon_tan', 'mat_manh_ky_uc', 'mat_xuong_vun', 'mat_noi_dan_nho'],
        ],
        'bac_suong_canh' => [
            'herb_rate' => 25, 'herb_pool' => ['bang_linh_thao', 'mat_huyen_bang_hoa', 'thanh_linh_thao'],
            'min_rate' => 12, 'min_pool' => ['mat_tinh_thach', 'mat_kim_loai_linh'],
            'mat_rate' => 8, 'mat_pool' => ['mat_noi_dan_nho', 'mat_xuong_vun'],
        ],
        'co_moc_linh_vien' => [
            'herb_rate' => 35, 'herb_pool' => ['linh_thao', 'thanh_linh_thao', 'hoa_linh_chi', 'mat_huyen_thien_hoa', 'kim_linh_thao'],
            'min_rate' => 10, 'min_pool' => ['mat_tinh_thach', 'mat_khong_gian_thach'],
            'mat_rate' => 10, 'mat_pool' => ['mat_go_linh', 'mat_nhua_cay', 'mat_hat_moc'],
        ],
        'am_sat_hoang' => [
            'herb_rate' => 10, 'herb_pool' => ['doc_thao', 'mat_am_hon_thao'],
            'min_rate' => 25, 'min_pool' => ['mat_tinh_thach', 'mat_kim_loai_linh', 'mat_huyet_tinh'],
            'mat_rate' => 10, 'mat_pool' => ['mat_noi_dan_trung', 'mat_vo_cung'],
        ],
        'thiet_huyet_son' => [
            'herb_rate' => 10, 'herb_pool' => ['kim_linh_thao'],
            'min_rate' => 30, 'min_pool' => ['mat_kim_loai_linh', 'mat_tinh_thach', 'mat_tinh_hoa', 'mat_loi_tinh'],
            'mat_rate' => 10, 'mat_pool' => ['mat_huyet_tinh', 'mat_vo_cung'],
        ],
        'thien_kiep_uyen' => [
            'herb_rate' => 10, 'herb_pool' => ['thien_linh_thao', 'kim_linh_thao'],
            'min_rate' => 30, 'min_pool' => ['mat_loi_tinh', 'mat_hac_tinh', 'mat_thien_thach', 'mat_loi_dia'],
            'mat_rate' => 10, 'mat_pool' => ['mat_ma_nhan', 'mat_linh_hon_di_bien'],
        ],
        'huyet_ma_chien_truong' => [
            'herb_rate' => 10, 'herb_pool' => ['kim_linh_thao', 'mat_am_hon_thao'],
            'min_rate' => 25, 'min_pool' => ['mat_huyet_tinh', 'mat_loi_tinh', 'mat_tinh_thach'],
            'mat_rate' => 10, 'mat_pool' => ['mat_am_khi', 'mat_noi_dan_trung', 'mat_noi_dan_lon'],
        ],
        'thien_hoa_linh_dia' => [
            'herb_rate' => 20, 'herb_pool' => ['hoa_linh_chi', 'mat_huyen_thien_hoa', 'kim_linh_thao'],
            'min_rate' => 25, 'min_pool' => ['mat_tinh_hoa', 'mat_loi_tinh', 'mat_tinh_thach'],
            'mat_rate' => 5, 'mat_pool' => ['mat_long_hoa', 'mat_noi_dan_trung'],
        ],
        'u_minh_quy_vuc' => [
            'herb_rate' => 10, 'herb_pool' => ['doc_thao', 'mat_am_hon_thao'],
            'min_rate' => 25, 'min_pool' => ['mat_hac_tinh', 'mat_loi_dia', 'mat_hu_khong_tinh'],
            'mat_rate' => 10, 'mat_pool' => ['mat_ma_nhan', 'mat_linh_hon_di_bien', 'mat_tan_phach'],
        ],
        'thien_dao_tan_tich' => [
            'herb_rate' => 15, 'herb_pool' => ['thien_linh_thao', 'kim_linh_thao'],
            'min_rate' => 25, 'min_pool' => ['mat_thien_thach', 'mat_hac_tinh', 'mat_tinh_thach_lon', 'ban_nguyen_tinh'],
            'mat_rate' => 10, 'mat_pool' => ['mat_tan_hon', 'mat_linh_hon_di_bien'],
        ],
        'vo_tan_hu_khong' => [
            'herb_rate' => 5, 'herb_pool' => ['thien_linh_thao'],
            'min_rate' => 35, 'min_pool' => ['mat_khong_gian_thach', 'mat_hu_khong_tinh', 'mat_hu_khong', 'mat_gioi_tu_thach', 'mat_tinh_thach_lon'],
            'mat_rate' => 10, 'mat_pool' => ['mat_linh_hon_di_bien', 'mat_tan_phach'],
        ],
        'cuu_u_than_uyen' => [
            'herb_rate' => 5, 'herb_pool' => ['thien_linh_thao', 'mat_am_hon_thao'],
            'min_rate' => 30, 'min_pool' => ['mat_loi_dia', 'mat_hac_tinh', 'mat_hu_khong', 'ban_nguyen_tinh'],
            'mat_rate' => 10, 'mat_pool' => ['mat_tan_phach', 'mat_noi_dan_lon', 'mat_noi_dan_cuc'],
        ],
        'thai_co_hong_hoang' => [
            'herb_rate' => 15, 'herb_pool' => ['thien_linh_thao', 'kim_linh_thao', 'mat_huyen_thien_hoa'],
            'min_rate' => 25, 'min_pool' => ['mat_thien_thach', 'mat_moc_hoang_tinh', 'mat_loi_dia', 'ban_nguyen_tinh'],
            'mat_rate' => 5, 'mat_pool' => ['mat_ba_vuong_nanh', 'mat_noi_dan_lon'],
        ],
        'chu_thien_tinh_hai' => [
            'herb_rate' => 10, 'herb_pool' => ['thien_linh_thao'],
            'min_rate' => 30, 'min_pool' => ['mat_thien_thach', 'mat_gioi_tu_thach', 'mat_tinh_hoa', 'mat_hu_khong_tinh', 'ban_nguyen_tinh'],
            'mat_rate' => 10, 'mat_pool' => ['mat_loi_de_vu', 'mat_linh_hon_di_bien'],
        ],
        'hon_don_tien_vuc' => [
            'herb_rate' => 15, 'herb_pool' => ['thien_linh_thao', 'kim_linh_thao'],
            'min_rate' => 25, 'min_pool' => ['mat_gioi_tu_thach', 'mat_hu_khong_tinh', 'mat_tinh_thach_lon', 'ban_nguyen_tinh'],
            'mat_rate' => 10, 'mat_pool' => ['mat_huyet_ma_ban_giap', 'mat_noi_dan_cuc'],
        ],
        'hon_nguyen_dao_canh' => [
            'herb_rate' => 15, 'herb_pool' => ['thien_linh_thao'],
            'min_rate' => 25, 'min_pool' => ['ban_nguyen_tinh', 'mat_hu_khong', 'mat_thien_thach', 'mat_loi_dia', 'mat_gioi_tu_thach'],
            'mat_rate' => 10, 'mat_pool' => ['mat_huyet_ma_ban_giap', 'mat_noi_dan_cuc'],
        ],
    ];

    $stmtGameArea = $pdo->prepare("INSERT INTO game_areas (id, name, data) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name), data = VALUES(data)");

    foreach ($areas as $areaId => &$areaData) {
        $cfg = $areaConfigs[$areaId] ?? null;
        if (!$cfg) continue;

        $otherRates = [];
        $monsterWeight = 35;
        if (in_array($areaId, ['thiet_huyet_son', 'thien_kiep_uyen', 'thien_hoa_linh_dia', 'thien_dao_tan_tich', 'vo_tan_hu_khong', 'chu_thien_tinh_hai', 'hon_don_tien_vuc', 'hon_nguyen_dao_canh'])) {
            $monsterWeight = 30;
        } elseif ($areaId === 'co_moc_linh_vien') {
            $monsterWeight = 25;
        }

        $newRates = [
            ['type' => 'monster', 'weight' => $monsterWeight],
            ['type' => 'herb', 'weight' => $cfg['herb_rate'], 'pools' => $cfg['herb_pool']],
            ['type' => 'mineral', 'weight' => $cfg['min_rate'], 'pools' => $cfg['min_pool']],
            ['type' => 'material', 'weight' => $cfg['mat_rate'], 'pools' => $cfg['mat_pool']],
            ['type' => 'item', 'weight' => 5, 'rarities' => $areaData['rates'][2]['rarities'] ?? ['common']],
            ['type' => 'npc', 'weight' => 5, 'events' => ['old_man_buff', 'merchant', 'found_gold']],
            ['type' => 'worldBoss', 'weight' => 1],
            ['type' => 'nothing', 'weight' => 9],
        ];

        $areaData['rates'] = $newRates;

        // Upsert into game_areas
        $stmtGameArea->execute([$areaId, $areaData['name'], json_encode($areaData, JSON_UNESCAPED_UNICODE)]);
    }
    unset($areaData);

    // Save updated exploration.json
    file_put_contents($areasPath, json_encode($areas, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    echo "✅ Successfully updated exploration.json and synchronized 18 realms into `game_areas`.\n";

} catch (\Exception $e) {
    echo "❌ Migration failed: " . $e->getMessage() . "\n";
    exit(1);
}
