<?php
/**
 * Migration 040: Map-Specific Characteristic Materials (Nguyên Liệu Đặc Thù Bản Đồ)
 * Configures distinct signature materials, specialties, and weighted encounter pools for all 18 realms.
 */
require_once __DIR__ . '/../vendor/autoload.php';

use App\Core\Database;

try {
    $pdo = Database::connect();

    $areasPath = __DIR__ . '/../data/exploration.json';
    $areas = json_decode(file_get_contents($areasPath), true);

    $mapConfigs = [
        'thanh_lam_tran' => [
            'specialties' => ['mat_thao_moc_thanh_lam', 'mat_thiet_khoang_tho'],
            'specialtyNames' => ['Thanh Lam Diệp', 'Thiết Khoáng Thô'],
            'herb_rate' => 25,
            'herb_pool' => [
                ['id' => 'linh_thao', 'weight' => 45],
                ['id' => 'huyet_thao', 'weight' => 35],
                ['id' => 'mat_thao_moc_thanh_lam', 'weight' => 20, 'isSpecialty' => true]
            ],
            'min_rate' => 10,
            'min_pool' => [
                ['id' => 'mat_khong_gian_manh', 'weight' => 35],
                ['id' => 'mat_kim_loai_linh', 'weight' => 35],
                ['id' => 'mat_thiet_khoang_tho', 'weight' => 30, 'isSpecialty' => true]
            ],
            'mat_rate' => 10,
            'mat_pool' => [
                ['id' => 'mat_thit_tho', 'weight' => 45],
                ['id' => 'mat_da_tho', 'weight' => 40],
                ['id' => 'mat_xuong_vun', 'weight' => 15]
            ]
        ],
        'hac_phong_lam' => [
            'specialties' => ['mat_nhua_hac_phong', 'mat_hac_thach'],
            'specialtyNames' => ['Nhựa Hắc Phong Mộc', 'Hắc Phong Thạch'],
            'herb_rate' => 25,
            'herb_pool' => [
                ['id' => 'thanh_linh_thao', 'weight' => 40],
                ['id' => 'hoa_linh_chi', 'weight' => 35],
                ['id' => 'bang_linh_thao', 'weight' => 25]
            ],
            'min_rate' => 10,
            'min_pool' => [
                ['id' => 'mat_kim_loai_linh', 'weight' => 40],
                ['id' => 'mat_tinh_thach', 'weight' => 35],
                ['id' => 'mat_hac_thach', 'weight' => 25, 'isSpecialty' => true]
            ],
            'mat_rate' => 10,
            'mat_pool' => [
                ['id' => 'mat_go_linh', 'weight' => 35],
                ['id' => 'mat_nhua_hac_phong', 'weight' => 35, 'isSpecialty' => true],
                ['id' => 'mat_da_ran', 'weight' => 30]
            ]
        ],
        'vong_linh_coc' => [
            'specialties' => ['mat_am_hon_thao', 'mat_u_hon_thach'],
            'specialtyNames' => ['Ám Hồn Thảo', 'U Hồn Thạch'],
            'herb_rate' => 15,
            'herb_pool' => [
                ['id' => 'doc_thao', 'weight' => 45],
                ['id' => 'kim_linh_thao', 'weight' => 25],
                ['id' => 'mat_am_hon_thao', 'weight' => 30, 'isSpecialty' => true]
            ],
            'min_rate' => 20,
            'min_pool' => [
                ['id' => 'mat_tinh_thach', 'weight' => 40],
                ['id' => 'mat_khong_gian_thach', 'weight' => 30],
                ['id' => 'mat_u_hon_thach', 'weight' => 30, 'isSpecialty' => true]
            ],
            'mat_rate' => 10,
            'mat_pool' => [
                ['id' => 'mat_hon_tan', 'weight' => 40],
                ['id' => 'mat_manh_ky_uc', 'weight' => 35],
                ['id' => 'mat_noi_dan_nho', 'weight' => 25]
            ]
        ],
        'bac_suong_canh' => [
            'specialties' => ['mat_huyen_bang_hoa', 'mat_bang_phach_thach'],
            'specialtyNames' => ['Huyền Băng Hoa', 'Băng Phách Thạch'],
            'herb_rate' => 25,
            'herb_pool' => [
                ['id' => 'bang_linh_thao', 'weight' => 45],
                ['id' => 'thanh_linh_thao', 'weight' => 25],
                ['id' => 'mat_huyen_bang_hoa', 'weight' => 30, 'isSpecialty' => true]
            ],
            'min_rate' => 12,
            'min_pool' => [
                ['id' => 'mat_tinh_thach', 'weight' => 40],
                ['id' => 'mat_kim_loai_linh', 'weight' => 30],
                ['id' => 'mat_bang_phach_thach', 'weight' => 30, 'isSpecialty' => true]
            ],
            'mat_rate' => 8,
            'mat_pool' => [
                ['id' => 'mat_noi_dan_nho', 'weight' => 50],
                ['id' => 'mat_xuong_vun', 'weight' => 50]
            ]
        ],
        'co_moc_linh_vien' => [
            'specialties' => ['mat_huyen_thien_hoa', 'mat_co_moc_tam'],
            'specialtyNames' => ['Huyền Thiên Hoa', 'Cổ Mộc Tinh Tâm'],
            'herb_rate' => 35,
            'herb_pool' => [
                ['id' => 'linh_thao', 'weight' => 30],
                ['id' => 'thanh_linh_thao', 'weight' => 25],
                ['id' => 'hoa_linh_chi', 'weight' => 20],
                ['id' => 'mat_huyen_thien_hoa', 'weight' => 25, 'isSpecialty' => true]
            ],
            'min_rate' => 10,
            'min_pool' => [
                ['id' => 'mat_tinh_thach', 'weight' => 60],
                ['id' => 'mat_khong_gian_thach', 'weight' => 40]
            ],
            'mat_rate' => 10,
            'mat_pool' => [
                ['id' => 'mat_go_linh', 'weight' => 40],
                ['id' => 'mat_co_moc_tam', 'weight' => 35, 'isSpecialty' => true],
                ['id' => 'mat_hat_moc', 'weight' => 25]
            ]
        ],
        'am_sat_hoang' => [
            'specialties' => ['mat_sa_tinh_thao', 'mat_hac_sa_tinh'],
            'specialtyNames' => ['Sa Tinh Thảo', 'Hắc Sa Tinh'],
            'herb_rate' => 10,
            'herb_pool' => [
                ['id' => 'doc_thao', 'weight' => 50],
                ['id' => 'mat_sa_tinh_thao', 'weight' => 50, 'isSpecialty' => true]
            ],
            'min_rate' => 25,
            'min_pool' => [
                ['id' => 'mat_tinh_thach', 'weight' => 35],
                ['id' => 'mat_kim_loai_linh', 'weight' => 35],
                ['id' => 'mat_hac_sa_tinh', 'weight' => 30, 'isSpecialty' => true]
            ],
            'mat_rate' => 10,
            'mat_pool' => [
                ['id' => 'mat_noi_dan_trung', 'weight' => 50],
                ['id' => 'mat_vo_cung', 'weight' => 50]
            ]
        ],
        'thiet_huyet_son' => [
            'specialties' => ['mat_thiet_huyet_khoang', 'mat_tinh_hoa'],
            'specialtyNames' => ['Thiết Huyết Quặng', 'Tinh Hỏa'],
            'herb_rate' => 10,
            'herb_pool' => [
                ['id' => 'kim_linh_thao', 'weight' => 100]
            ],
            'min_rate' => 30,
            'min_pool' => [
                ['id' => 'mat_kim_loai_linh', 'weight' => 30],
                ['id' => 'mat_tinh_thach', 'weight' => 25],
                ['id' => 'mat_tinh_hoa', 'weight' => 25, 'isSpecialty' => true],
                ['id' => 'mat_thiet_huyet_khoang', 'weight' => 20, 'isSpecialty' => true]
            ],
            'mat_rate' => 10,
            'mat_pool' => [
                ['id' => 'mat_huyet_tinh', 'weight' => 60],
                ['id' => 'mat_vo_cung', 'weight' => 40]
            ]
        ],
        'thien_kiep_uyen' => [
            'specialties' => ['mat_hach_sam', 'mat_loi_tinh_thach'],
            'specialtyNames' => ['Hạch Sấm', 'Lôi Kiếp Thạch'],
            'herb_rate' => 10,
            'herb_pool' => [
                ['id' => 'thien_linh_thao', 'weight' => 40],
                ['id' => 'kim_linh_thao', 'weight' => 60]
            ],
            'min_rate' => 30,
            'min_pool' => [
                ['id' => 'mat_loi_tinh', 'weight' => 35],
                ['id' => 'mat_hac_tinh', 'weight' => 25],
                ['id' => 'mat_thien_thach', 'weight' => 20],
                ['id' => 'mat_loi_tinh_thach', 'weight' => 20, 'isSpecialty' => true]
            ],
            'mat_rate' => 10,
            'mat_pool' => [
                ['id' => 'mat_hach_sam', 'weight' => 40, 'isSpecialty' => true],
                ['id' => 'mat_ma_nhan', 'weight' => 35],
                ['id' => 'mat_linh_hon_di_bien', 'weight' => 25]
            ]
        ],
        'huyet_ma_chien_truong' => [
            'specialties' => ['mat_huyet_tinh_thach', 'mat_xac_khi'],
            'specialtyNames' => ['Huyết Ma Cốt Tinh', 'Xác Khí Cổ'],
            'herb_rate' => 10,
            'herb_pool' => [
                ['id' => 'kim_linh_thao', 'weight' => 60],
                ['id' => 'mat_am_hon_thao', 'weight' => 40]
            ],
            'min_rate' => 25,
            'min_pool' => [
                ['id' => 'mat_huyet_tinh', 'weight' => 40],
                ['id' => 'mat_loi_tinh', 'weight' => 30],
                ['id' => 'mat_huyet_tinh_thach', 'weight' => 30, 'isSpecialty' => true]
            ],
            'mat_rate' => 10,
            'mat_pool' => [
                ['id' => 'mat_xac_khi', 'weight' => 40, 'isSpecialty' => true],
                ['id' => 'mat_am_khi', 'weight' => 35],
                ['id' => 'mat_noi_dan_trung', 'weight' => 25]
            ]
        ],
        'thien_hoa_linh_dia' => [
            'specialties' => ['hoa_linh_chi', 'mat_dia_hoa_tinh'],
            'specialtyNames' => ['Hỏa Linh Chi Thượng Phẩm', 'Địa Hỏa Tinh Thạch'],
            'herb_rate' => 20,
            'herb_pool' => [
                ['id' => 'hoa_linh_chi', 'weight' => 50, 'isSpecialty' => true],
                ['id' => 'mat_huyen_thien_hoa', 'weight' => 30],
                ['id' => 'kim_linh_thao', 'weight' => 20]
            ],
            'min_rate' => 25,
            'min_pool' => [
                ['id' => 'mat_tinh_hoa', 'weight' => 40],
                ['id' => 'mat_dia_hoa_tinh', 'weight' => 35, 'isSpecialty' => true],
                ['id' => 'mat_loi_tinh', 'weight' => 25]
            ],
            'mat_rate' => 5,
            'mat_pool' => [
                ['id' => 'mat_long_hoa', 'weight' => 60],
                ['id' => 'mat_noi_dan_trung', 'weight' => 40]
            ]
        ],
        'u_minh_quy_vuc' => [
            'specialties' => ['mat_u_minh_thao', 'mat_ma_nhan'],
            'specialtyNames' => ['U Minh Quỷ Thảo', 'Ma Nhãn U Minh'],
            'herb_rate' => 10,
            'herb_pool' => [
                ['id' => 'doc_thao', 'weight' => 40],
                ['id' => 'mat_u_minh_thao', 'weight' => 60, 'isSpecialty' => true]
            ],
            'min_rate' => 25,
            'min_pool' => [
                ['id' => 'mat_hac_tinh', 'weight' => 40],
                ['id' => 'mat_loi_dia', 'weight' => 35],
                ['id' => 'mat_hu_khong_tinh', 'weight' => 25]
            ],
            'mat_rate' => 10,
            'mat_pool' => [
                ['id' => 'mat_ma_nhan', 'weight' => 40, 'isSpecialty' => true],
                ['id' => 'mat_tan_phach', 'weight' => 35],
                ['id' => 'mat_linh_hon_di_bien', 'weight' => 25]
            ]
        ],
        'thien_dao_tan_tich' => [
            'specialties' => ['mat_tran_phap_tan_phien', 'mat_thien_thach'],
            'specialtyNames' => ['Tàn Phiến Trận Đồ', 'Thiên Thạch Thượng Cổ'],
            'herb_rate' => 15,
            'herb_pool' => [
                ['id' => 'thien_linh_thao', 'weight' => 60],
                ['id' => 'kim_linh_thao', 'weight' => 40]
            ],
            'min_rate' => 25,
            'min_pool' => [
                ['id' => 'mat_thien_thach', 'weight' => 40, 'isSpecialty' => true],
                ['id' => 'mat_hac_tinh', 'weight' => 35],
                ['id' => 'mat_tinh_thach_lon', 'weight' => 25]
            ],
            'mat_rate' => 10,
            'mat_pool' => [
                ['id' => 'mat_tran_phap_tan_phien', 'weight' => 40, 'isSpecialty' => true],
                ['id' => 'mat_tan_hon', 'weight' => 35],
                ['id' => 'mat_linh_hon_di_bien', 'weight' => 25]
            ]
        ],
        'vo_tan_hu_khong' => [
            'specialties' => ['mat_hu_khong_tinh', 'mat_khong_gian_thach'],
            'specialtyNames' => ['Hư Không Tinh', 'Không Gian Thạch'],
            'herb_rate' => 5,
            'herb_pool' => [
                ['id' => 'thien_linh_thao', 'weight' => 100]
            ],
            'min_rate' => 35,
            'min_pool' => [
                ['id' => 'mat_khong_gian_thach', 'weight' => 35, 'isSpecialty' => true],
                ['id' => 'mat_hu_khong_tinh', 'weight' => 30, 'isSpecialty' => true],
                ['id' => 'mat_hu_khong', 'weight' => 20],
                ['id' => 'mat_gioi_tu_thach', 'weight' => 15]
            ],
            'mat_rate' => 10,
            'mat_pool' => [
                ['id' => 'mat_linh_hon_di_bien', 'weight' => 55],
                ['id' => 'mat_tan_phach', 'weight' => 45]
            ]
        ],
        'cuu_u_than_uyen' => [
            'specialties' => ['mat_cuu_u_hac_thuy', 'mat_loi_dia'],
            'specialtyNames' => ['Cửu U Hắc Thủy', 'Lõi Địa'],
            'herb_rate' => 5,
            'herb_pool' => [
                ['id' => 'thien_linh_thao', 'weight' => 60],
                ['id' => 'mat_am_hon_thao', 'weight' => 40]
            ],
            'min_rate' => 30,
            'min_pool' => [
                ['id' => 'mat_loi_dia', 'weight' => 45, 'isSpecialty' => true],
                ['id' => 'mat_hac_tinh', 'weight' => 35],
                ['id' => 'mat_hu_khong', 'weight' => 20]
            ],
            'mat_rate' => 10,
            'mat_pool' => [
                ['id' => 'mat_cuu_u_hac_thuy', 'weight' => 40, 'isSpecialty' => true],
                ['id' => 'mat_tan_phach', 'weight' => 35],
                ['id' => 'mat_noi_dan_lon', 'weight' => 25]
            ]
        ],
        'thai_co_hong_hoang' => [
            'specialties' => ['mat_moc_hoang_tinh', 'mat_ba_vuong_nanh'],
            'specialtyNames' => ['Mộc Hoang Tinh', 'Nanh Bá Vương Thượng Cổ'],
            'herb_rate' => 15,
            'herb_pool' => [
                ['id' => 'thien_linh_thao', 'weight' => 50],
                ['id' => 'kim_linh_thao', 'weight' => 30],
                ['id' => 'mat_huyen_thien_hoa', 'weight' => 20]
            ],
            'min_rate' => 25,
            'min_pool' => [
                ['id' => 'mat_moc_hoang_tinh', 'weight' => 45, 'isSpecialty' => true],
                ['id' => 'mat_thien_thach', 'weight' => 35],
                ['id' => 'mat_loi_dia', 'weight' => 20]
            ],
            'mat_rate' => 5,
            'mat_pool' => [
                ['id' => 'mat_ba_vuong_nanh', 'weight' => 60, 'isSpecialty' => true],
                ['id' => 'mat_noi_dan_lon', 'weight' => 40]
            ]
        ],
        'chu_thien_tinh_hai' => [
            'specialties' => ['mat_tinh_tieu_thach', 'mat_loi_de_vu'],
            'specialtyNames' => ['Tinh Tiêu Thạch', 'Lôi Đế Vũ'],
            'herb_rate' => 10,
            'herb_pool' => [
                ['id' => 'thien_linh_thao', 'weight' => 100]
            ],
            'min_rate' => 30,
            'min_pool' => [
                ['id' => 'mat_tinh_tieu_thach', 'weight' => 40, 'isSpecialty' => true],
                ['id' => 'mat_thien_thach', 'weight' => 30],
                ['id' => 'mat_gioi_tu_thach', 'weight' => 20],
                ['id' => 'mat_hu_khong_tinh', 'weight' => 10]
            ],
            'mat_rate' => 10,
            'mat_pool' => [
                ['id' => 'mat_loi_de_vu', 'weight' => 50, 'isSpecialty' => true],
                ['id' => 'mat_linh_hon_di_bien', 'weight' => 50]
            ]
        ],
        'hon_don_tien_vuc' => [
            'specialties' => ['mat_hon_don_khi', 'mat_gioi_tu_thach'],
            'specialtyNames' => ['Hỗn Độn Khí Tinh', 'Giới Tử Thạch'],
            'herb_rate' => 15,
            'herb_pool' => [
                ['id' => 'thien_linh_thao', 'weight' => 60],
                ['id' => 'kim_linh_thao', 'weight' => 40]
            ],
            'min_rate' => 25,
            'min_pool' => [
                ['id' => 'mat_gioi_tu_thach', 'weight' => 40, 'isSpecialty' => true],
                ['id' => 'mat_hu_khong_tinh', 'weight' => 35],
                ['id' => 'mat_tinh_thach_lon', 'weight' => 25]
            ],
            'mat_rate' => 10,
            'mat_pool' => [
                ['id' => 'mat_hon_don_khi', 'weight' => 45, 'isSpecialty' => true],
                ['id' => 'mat_huyet_ma_ban_giap', 'weight' => 35],
                ['id' => 'mat_noi_dan_cuc', 'weight' => 20]
            ]
        ],
        'hon_nguyen_dao_canh' => [
            'specialties' => ['mat_hon_nguyen_chau', 'ban_nguyen_tinh'],
            'specialtyNames' => ['Hỗn Nguyên Đạo Châu', 'Bản Nguyên Tinh'],
            'herb_rate' => 15,
            'herb_pool' => [
                ['id' => 'thien_linh_thao', 'weight' => 100]
            ],
            'min_rate' => 25,
            'min_pool' => [
                ['id' => 'ban_nguyen_tinh', 'weight' => 40, 'isSpecialty' => true],
                ['id' => 'mat_hu_khong', 'weight' => 30],
                ['id' => 'mat_thien_thach', 'weight' => 20],
                ['id' => 'mat_loi_dia', 'weight' => 10]
            ],
            'mat_rate' => 10,
            'mat_pool' => [
                ['id' => 'mat_hon_nguyen_chau', 'weight' => 40, 'isSpecialty' => true],
                ['id' => 'mat_huyet_ma_ban_giap', 'weight' => 35],
                ['id' => 'mat_noi_dan_cuc', 'weight' => 25]
            ]
        ],
    ];

    $stmtGameArea = $pdo->prepare("INSERT INTO game_areas (id, name, data) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name), data = VALUES(data)");

    foreach ($areas as $areaId => &$areaData) {
        $cfg = $mapConfigs[$areaId] ?? null;
        if (!$cfg) continue;

        $monsterWeight = 35;
        if (in_array($areaId, ['thiet_huyet_son', 'thien_kiep_uyen', 'thien_hoa_linh_dia', 'thien_dao_tan_tich', 'vo_tan_hu_khong', 'chu_thien_tinh_hai', 'hon_don_tien_vuc', 'hon_nguyen_dao_canh'])) {
            $monsterWeight = 30;
        } elseif ($areaId === 'co_moc_linh_vien') {
            $monsterWeight = 25;
        }

        $areaData['specialties'] = $cfg['specialties'];
        $areaData['specialtyNames'] = $cfg['specialtyNames'];

        $newRates = [
            ['type' => 'monster', 'weight' => $monsterWeight],
            ['type' => 'herb', 'weight' => $cfg['herb_rate'], 'pools' => $cfg['herb_pool']],
            ['type' => 'mineral', 'weight' => $cfg['min_rate'], 'pools' => $cfg['min_pool']],
            ['type' => 'material', 'weight' => $cfg['mat_rate'], 'pools' => $cfg['mat_pool']],
            ['type' => 'item', 'weight' => 5, 'rarities' => $areaData['rates'][4]['rarities'] ?? ['common']],
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
    echo "✅ Successfully updated 18 realms with map-specific specialties and weighted pools.\n";

} catch (\Exception $e) {
    echo "❌ Migration failed: " . $e->getMessage() . "\n";
    exit(1);
}
