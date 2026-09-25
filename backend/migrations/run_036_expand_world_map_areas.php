<?php
/**
 * Migration 036: Expand World Map (Thiên Địa Giới Đồ)
 * Adds stamina_cost to areas table, migrates legacy diacritic rows,
 * and synchronizes all 18 realms into both `areas` and `game_areas` tables.
 */
require_once __DIR__ . '/../vendor/autoload.php';

use App\Core\Database;

try {
    $pdo = Database::connect();

    // 1. Add stamina_cost column to `areas` if not exists
    $cols = $pdo->query("SHOW COLUMNS FROM areas LIKE 'stamina_cost'")->fetchAll();
    if (empty($cols)) {
        $pdo->exec("ALTER TABLE areas ADD COLUMN stamina_cost INT UNSIGNED DEFAULT 10 AFTER travel_time;");
        echo "✅ Added stamina_cost column to `areas` table.\n";
    }

    // 2. Add tier column to `areas` if not exists
    $colsTier = $pdo->query("SHOW COLUMNS FROM areas LIKE 'tier'")->fetchAll();
    if (empty($colsTier)) {
        $pdo->exec("ALTER TABLE areas ADD COLUMN tier VARCHAR(64) DEFAULT 'Phàm Trần (Lv.1 - 20)' AFTER sort_order;");
        echo "✅ Added tier column to `areas` table.\n";
    }

    // 3. Clean legacy diacritic rows in `areas` & fix area_monsters foreign keys
    $pdo->exec("UPDATE area_monsters SET area_id = 'thiet_huyet_son' WHERE area_id = 'thiết_huyết_sơn'");
    $pdo->exec("UPDATE area_monsters SET area_id = 'thien_kiep_uyen' WHERE area_id = 'thiên_kiếp_uyên'");
    $pdo->exec("DELETE FROM areas WHERE id IN ('thiết_huyết_sơn', 'thiên_kiếp_uyên')");

    // 4. Master 18 Areas Dataset
    $areas = [
        'thanh_lam_tran' => [
            'name' => 'Thanh Lam Trấn',
            'description' => 'Thị trấn nhỏ yên bình nơi khởi đầu của người tu đạo, bốn mùa cây cỏ xanh tươi.',
            'min_level' => 1,
            'travel_time' => 0,
            'stamina_cost' => 10,
            'sort_order' => 1,
            'mapX' => 50, 'mapY' => 88,
            'tier' => 'Phàm Trần Linh Vực (Lv.1 - 20)',
            'rates' => [
                ['type' => 'monster', 'weight' => 40],
                ['type' => 'material', 'weight' => 25, 'pools' => ['mat_thit_tho', 'mat_da_tho', 'linh_thao', 'huyet_thao', 'doc_thao']],
                ['type' => 'item', 'weight' => 10, 'rarities' => ['common']],
                ['type' => 'npc', 'weight' => 5, 'events' => ['old_man_buff', 'merchant', 'found_gold']],
                ['type' => 'worldBoss', 'weight' => 1],
                ['type' => 'nothing', 'weight' => 19],
            ]
        ],
        'hac_phong_lam' => [
            'name' => 'Hắc Phong Lâm',
            'description' => 'Khu rừng rậm tối tăm chập chùng, gió độc rít từng hồi qua kẽ lá cổ thụ.',
            'min_level' => 8,
            'travel_time' => 15,
            'stamina_cost' => 12,
            'sort_order' => 2,
            'mapX' => 35, 'mapY' => 78,
            'tier' => 'Phàm Trần Linh Vực (Lv.1 - 20)',
            'rates' => [
                ['type' => 'monster', 'weight' => 50],
                ['type' => 'material', 'weight' => 20, 'pools' => ['mat_go_linh', 'mat_nhua_cay', 'mat_da_ran', 'thanh_linh_thao', 'hoa_linh_chi', 'bang_linh_thao']],
                ['type' => 'item', 'weight' => 10, 'rarities' => ['common', 'uncommon']],
                ['type' => 'npc', 'weight' => 5, 'events' => ['trap_damage', 'hidden_chest']],
                ['type' => 'worldBoss', 'weight' => 1],
                ['type' => 'nothing', 'weight' => 14],
            ]
        ],
        'vong_linh_coc' => [
            'name' => 'Vong Linh Cốc',
            'description' => 'Thung lũng tử khí bao trùm, ban đêm ngập tràn oan hồn và quỷ đốm lảng vảng.',
            'min_level' => 18,
            'travel_time' => 25,
            'stamina_cost' => 15,
            'sort_order' => 3,
            'mapX' => 65, 'mapY' => 74,
            'tier' => 'Phàm Trần Linh Vực (Lv.1 - 20)',
            'rates' => [
                ['type' => 'monster', 'weight' => 55],
                ['type' => 'material', 'weight' => 15, 'pools' => ['mat_hon_tan', 'mat_manh_ky_uc', 'mat_xuong_vun', 'kim_linh_thao', 'mat_noi_dan_nho']],
                ['type' => 'item', 'weight' => 15, 'rarities' => ['uncommon', 'rare']],
                ['type' => 'npc', 'weight' => 5, 'events' => ['ghost_encounter', 'ancient_shrine']],
                ['type' => 'nothing', 'weight' => 10],
            ]
        ],
        'bac_suong_canh' => [
            'name' => 'Bắc Sương Cảnh',
            'description' => 'Vùng hàn băng ngập tràn tuyết trắng vĩnh cửu, giá lạnh thấu tận cốt tủy.',
            'min_level' => 30,
            'travel_time' => 35,
            'stamina_cost' => 18,
            'sort_order' => 4,
            'mapX' => 15, 'mapY' => 55,
            'tier' => 'Thượng Cổ Man Hoang (Lv.21 - 80)',
            'rates' => [
                ['type' => 'monster', 'weight' => 55],
                ['type' => 'material', 'weight' => 20, 'pools' => ['bang_linh_thao', 'mat_huyen_bang_hoa', 'mat_xuong_vun', 'mat_noi_dan_trung']],
                ['type' => 'item', 'weight' => 10, 'rarities' => ['common', 'uncommon', 'rare']],
                ['type' => 'npc', 'weight' => 5, 'events' => ['freeze_slow', 'lost_traveler']],
                ['type' => 'nothing', 'weight' => 10],
            ]
        ],
        'co_moc_linh_vien' => [
            'name' => 'Cổ Mộc Linh Viên',
            'description' => 'Khu vườn mộc linh ngàn năm, dây leo khổng lồ che khuất mặt trời, linh khí mộc nồng đậm.',
            'min_level' => 45,
            'travel_time' => 45,
            'stamina_cost' => 22,
            'sort_order' => 5,
            'mapX' => 45, 'mapY' => 58,
            'tier' => 'Thượng Cổ Man Hoang (Lv.21 - 80)',
            'rates' => [
                ['type' => 'monster', 'weight' => 50],
                ['type' => 'material', 'weight' => 25, 'pools' => ['mat_go_linh', 'mat_nhua_cay', 'thanh_linh_thao', 'mat_huyen_thien_hoa']],
                ['type' => 'item', 'weight' => 12, 'rarities' => ['uncommon', 'rare']],
                ['type' => 'npc', 'weight' => 8, 'events' => ['forest_spirit_buff', 'ancient_tree']],
                ['type' => 'nothing', 'weight' => 5],
            ]
        ],
        'am_sat_hoang' => [
            'name' => 'Ám Sát Hoang',
            'description' => 'Vùng sa mạc quỷ dị đầy cát lún và hố sụt, nơi sát thủ ma môn thường ẩn nấp phục kích.',
            'min_level' => 65,
            'travel_time' => 60,
            'stamina_cost' => 26,
            'sort_order' => 6,
            'mapX' => 30, 'mapY' => 45,
            'tier' => 'Thượng Cổ Man Hoang (Lv.21 - 80)',
            'rates' => [
                ['type' => 'monster', 'weight' => 60],
                ['type' => 'material', 'weight' => 15, 'pools' => ['doc_thao', 'mat_am_hon_thao', 'mat_huyet_tinh', 'mat_noi_dan_trung']],
                ['type' => 'item', 'weight' => 15, 'rarities' => ['uncommon', 'rare']],
                ['type' => 'npc', 'weight' => 5, 'events' => ['assassin_attack', 'hidden_poison_cache']],
                ['type' => 'nothing', 'weight' => 5],
            ]
        ],
        'thiet_huyet_son' => [
            'name' => 'Thiết Huyết Sơn',
            'description' => 'Dãy núi nham thạch rực lửa, quặng sắt đỏ quạch tôi luyện trong địa hỏa ngàn năm.',
            'min_level' => 90,
            'travel_time' => 75,
            'stamina_cost' => 30,
            'sort_order' => 7,
            'mapX' => 80, 'mapY' => 60,
            'tier' => 'Tông Ma Tiên Vực (Lv.81 - 250)',
            'rates' => [
                ['type' => 'monster', 'weight' => 60],
                ['type' => 'material', 'weight' => 15, 'pools' => ['mat_tinh_thach', 'mat_tinh_hoa', 'mat_loi_tinh', 'kim_linh_thao', 'mat_huyet_tinh']],
                ['type' => 'item', 'weight' => 15, 'rarities' => ['rare', 'epic']],
                ['type' => 'npc', 'weight' => 5, 'events' => ['lava_burn', 'volcano_eruption_loot']],
                ['type' => 'worldBoss', 'weight' => 2],
                ['type' => 'nothing', 'weight' => 3],
            ]
        ],
        'thien_kiep_uyen' => [
            'name' => 'Thiên Kiếp Uyên',
            'description' => 'Vực thẳm sâu vạn trượng, sấm sét tím lượn lờ không dứt, dấu vết lôi kiếp xé rách đại địa.',
            'min_level' => 120,
            'travel_time' => 90,
            'stamina_cost' => 35,
            'sort_order' => 8,
            'mapX' => 85, 'mapY' => 38,
            'tier' => 'Tông Ma Tiên Vực (Lv.81 - 250)',
            'rates' => [
                ['type' => 'monster', 'weight' => 65],
                ['type' => 'material', 'weight' => 15, 'pools' => ['mat_ma_nhan', 'mat_hac_tinh', 'mat_thien_thach', 'thien_linh_thao', 'mat_linh_hon_di_bien']],
                ['type' => 'item', 'weight' => 12, 'rarities' => ['rare', 'epic']],
                ['type' => 'npc', 'weight' => 5, 'events' => ['lightning_strike', 'demonic_whisper']],
                ['type' => 'worldBoss', 'weight' => 2],
                ['type' => 'nothing', 'weight' => 1],
            ]
        ],
        'huyet_ma_chien_truong' => [
            'name' => 'Huyết Ma Chiến Trường',
            'description' => 'Cổ chiến trường vùi xác vạn tu sĩ thời viễn cổ, huyết khí ngút trời không tan.',
            'min_level' => 160,
            'travel_time' => 110,
            'stamina_cost' => 42,
            'sort_order' => 9,
            'mapX' => 70, 'mapY' => 30,
            'tier' => 'Tông Ma Tiên Vực (Lv.81 - 250)',
            'rates' => [
                ['type' => 'monster', 'weight' => 65],
                ['type' => 'material', 'weight' => 15, 'pools' => ['mat_huyet_tinh', 'mat_am_khi', 'mat_loi_tinh', 'mat_noi_dan_lon']],
                ['type' => 'item', 'weight' => 15, 'rarities' => ['rare', 'epic']],
                ['type' => 'npc', 'weight' => 3, 'events' => ['blood_rage', 'fallen_general_loot']],
                ['type' => 'worldBoss', 'weight' => 2],
                ['type' => 'nothing', 'weight' => 0],
            ]
        ],
        'thien_hoa_linh_dia' => [
            'name' => 'Thiên Hỏa Linh Địa',
            'description' => 'Vùng biển lửa thiên giới giáng xuống phàm trần, nơi phượng hoàng niết bàn tàn tích.',
            'min_level' => 220,
            'travel_time' => 130,
            'stamina_cost' => 50,
            'sort_order' => 10,
            'mapX' => 85, 'mapY' => 18,
            'tier' => 'Tông Ma Tiên Vực (Lv.81 - 250)',
            'rates' => [
                ['type' => 'monster', 'weight' => 65],
                ['type' => 'material', 'weight' => 18, 'pools' => ['hoa_linh_chi', 'mat_tinh_hoa', 'mat_huyen_thien_hoa', 'mat_loi_tinh']],
                ['type' => 'item', 'weight' => 15, 'rarities' => ['rare', 'epic']],
                ['type' => 'npc', 'weight' => 2, 'events' => ['fire_burn_zone', 'phoenix_remnant']],
                ['type' => 'nothing', 'weight' => 0],
            ]
        ],
        'u_minh_quy_vuc' => [
            'name' => 'U Minh Quỷ Vực',
            'description' => 'Cửa ngõ tiến vào Hoàng Tuyền Lạc Giới, u hồn ma vương ngự trị bóng tối bất tận.',
            'min_level' => 300,
            'travel_time' => 150,
            'stamina_cost' => 60,
            'sort_order' => 11,
            'mapX' => 25, 'mapY' => 20,
            'tier' => 'Thái Cổ & Hư Không (Lv.251 - 800)',
            'rates' => [
                ['type' => 'monster', 'weight' => 70],
                ['type' => 'material', 'weight' => 15, 'pools' => ['mat_ma_nhan', 'mat_linh_hon_di_bien', 'mat_tan_phach', 'mat_noi_dan_cuc']],
                ['type' => 'item', 'weight' => 12, 'rarities' => ['rare', 'epic']],
                ['type' => 'npc', 'weight' => 3, 'events' => ['ghost_possession', 'soul_exchange']],
                ['type' => 'nothing', 'weight' => 0],
            ]
        ],
        'thien_dao_tan_tich' => [
            'name' => 'Thiên Đạo Tàn Tích',
            'description' => 'Mảnh vỡ thiên đạo rơi rụng sau đại kiếp, quy luật hỗn loạn, vô số bảo vật thất truyền.',
            'min_level' => 400,
            'travel_time' => 180,
            'stamina_cost' => 72,
            'sort_order' => 12,
            'mapX' => 50, 'mapY' => 25,
            'tier' => 'Thái Cổ & Hư Không (Lv.251 - 800)',
            'rates' => [
                ['type' => 'monster', 'weight' => 70],
                ['type' => 'material', 'weight' => 15, 'pools' => ['thien_linh_thao', 'ban_nguyen_tinh', 'mat_hac_tinh', 'mat_thien_thach']],
                ['type' => 'item', 'weight' => 13, 'rarities' => ['epic', 'legendary']],
                ['type' => 'npc', 'weight' => 2, 'events' => ['law_distortion', 'hidden_trial']],
                ['type' => 'nothing', 'weight' => 0],
            ]
        ],
        'vo_tan_hu_khong' => [
            'name' => 'Vô Tận Hư Không',
            'description' => 'Vùng không gian nứt vỡ ngoài tam giới, hư không loạn lưu xé nát vạn vật phàm trần.',
            'min_level' => 550,
            'travel_time' => 210,
            'stamina_cost' => 85,
            'sort_order' => 13,
            'mapX' => 50, 'mapY' => 10,
            'tier' => 'Thái Cổ & Hư Không (Lv.251 - 800)',
            'rates' => [
                ['type' => 'monster', 'weight' => 75],
                ['type' => 'material', 'weight' => 12, 'pools' => ['mat_hu_khong', 'ban_nguyen_tinh', 'mat_linh_hon_di_bien']],
                ['type' => 'item', 'weight' => 12, 'rarities' => ['epic', 'legendary']],
                ['type' => 'npc', 'weight' => 1, 'events' => ['void_collapse', 'ancient_entity']],
                ['type' => 'nothing', 'weight' => 0],
            ]
        ],
        'cuu_u_than_uyen' => [
            'name' => 'Cửu U Thần Uyên',
            'description' => 'Tầng đáy sâu nhất của Cửu U Minh Giới, nơi phong ấn cổ ma thần từ thuở sơ khai.',
            'min_level' => 750,
            'travel_time' => 250,
            'stamina_cost' => 100,
            'sort_order' => 14,
            'mapX' => 18, 'mapY' => 8,
            'tier' => 'Thái Cổ & Hư Không (Lv.251 - 800)',
            'rates' => [
                ['type' => 'monster', 'weight' => 75],
                ['type' => 'material', 'weight' => 12, 'pools' => ['mat_tan_phach', 'mat_noi_dan_cuc', 'mat_hu_khong', 'ban_nguyen_tinh']],
                ['type' => 'item', 'weight' => 12, 'rarities' => ['epic', 'legendary']],
                ['type' => 'npc', 'weight' => 1, 'events' => ['demon_god_whisper', 'abyssal_blessing']],
                ['type' => 'nothing', 'weight' => 0],
            ]
        ],
        'thai_co_hong_hoang' => [
            'name' => 'Thái Cổ Hồng Hoang',
            'description' => 'Mảnh đất nguyên thủy sơ khai của trời đất, linh khí hồng hoang đậm đặc đến hóa dịch.',
            'min_level' => 1000,
            'travel_time' => 300,
            'stamina_cost' => 120,
            'sort_order' => 15,
            'mapX' => 78, 'mapY' => 8,
            'tier' => 'Vô Thượng Thần Vực (Lv.801+)',
            'rates' => [
                ['type' => 'monster', 'weight' => 75],
                ['type' => 'material', 'weight' => 12, 'pools' => ['mat_ba_vuong_nanh', 'mat_moc_hoang_tinh', 'ban_nguyen_tinh', 'mat_thien_thach']],
                ['type' => 'item', 'weight' => 12, 'rarities' => ['epic', 'legendary']],
                ['type' => 'npc', 'weight' => 1, 'events' => ['primordial_aura', 'ancient_relic_found']],
                ['type' => 'nothing', 'weight' => 0],
            ]
        ],
        'chu_thien_tinh_hai' => [
            'name' => 'Chư Thiên Tinh Hải',
            'description' => 'Biển sao lấp lánh giữa dải ngân hà huyền ảo, tinh tú xoay chuyển tạo thành tinh đồ bảo trận.',
            'min_level' => 1500,
            'travel_time' => 360,
            'stamina_cost' => 140,
            'sort_order' => 16,
            'mapX' => 62, 'mapY' => 3,
            'tier' => 'Vô Thượng Thần Vực (Lv.801+)',
            'rates' => [
                ['type' => 'monster', 'weight' => 75],
                ['type' => 'material', 'weight' => 12, 'pools' => ['mat_loi_de_vu', 'mat_tinh_hoa', 'mat_thien_thach', 'ban_nguyen_tinh']],
                ['type' => 'item', 'weight' => 12, 'rarities' => ['epic', 'legendary']],
                ['type' => 'npc', 'weight' => 1, 'events' => ['starlight_infusion', 'cosmic_resonance']],
                ['type' => 'nothing', 'weight' => 0],
            ]
        ],
        'hon_don_tien_vuc' => [
            'name' => 'Hỗn Độn Tiên Vực',
            'description' => 'Tiên vực bao bọc bởi tiên khí hỗn độn, nơi pháp tắc vũ trụ đan xen tạo hóa sinh diệt.',
            'min_level' => 2500,
            'travel_time' => 420,
            'stamina_cost' => 165,
            'sort_order' => 17,
            'mapX' => 38, 'mapY' => 3,
            'tier' => 'Vô Thượng Thần Vực (Lv.801+)',
            'rates' => [
                ['type' => 'monster', 'weight' => 75],
                ['type' => 'material', 'weight' => 12, 'pools' => ['mat_huyet_ma_ban_giap', 'ban_nguyen_tinh', 'mat_hu_khong']],
                ['type' => 'item', 'weight' => 12, 'rarities' => ['legendary']],
                ['type' => 'npc', 'weight' => 1, 'events' => ['chaos_breakthrough', 'immortal_enlightenment']],
                ['type' => 'nothing', 'weight' => 0],
            ]
        ],
        'hon_nguyen_dao_canh' => [
            'name' => 'Hỗn Nguyên Đạo Cảnh',
            'description' => 'Cực hạn cảnh giới chí cao vô thượng, thoát khỏi luân hồi thiên đạo, vạn kiếp bất diệt.',
            'min_level' => 4000,
            'travel_time' => 500,
            'stamina_cost' => 200,
            'sort_order' => 18,
            'mapX' => 50, 'mapY' => 1,
            'tier' => 'Vô Thượng Thần Vực (Lv.801+)',
            'rates' => [
                ['type' => 'monster', 'weight' => 75],
                ['type' => 'material', 'weight' => 12, 'pools' => ['ban_nguyen_tinh', 'mat_hu_khong', 'mat_thien_thach', 'thien_linh_thao']],
                ['type' => 'item', 'weight' => 12, 'rarities' => ['legendary']],
                ['type' => 'npc', 'weight' => 1, 'events' => ['dao_sovereign_vision', 'reality_transcendence']],
                ['type' => 'nothing', 'weight' => 0],
            ]
        ],
    ];

    // 5. Upsert into `areas` table
    $stmtArea = $pdo->prepare("
        INSERT INTO areas (id, name, description, min_level, travel_time, stamina_cost, sort_order, tier)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            name = VALUES(name),
            description = VALUES(description),
            min_level = VALUES(min_level),
            travel_time = VALUES(travel_time),
            stamina_cost = VALUES(stamina_cost),
            sort_order = VALUES(sort_order),
            tier = VALUES(tier);
    ");

    // 6. Upsert into `game_areas` table
    $stmtGameArea = $pdo->prepare("
        INSERT INTO game_areas (id, name, stamina_cost, rates, data)
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            name = VALUES(name),
            stamina_cost = VALUES(stamina_cost),
            rates = VALUES(rates),
            data = VALUES(data);
    ");

    $exportExploration = [];

    foreach ($areas as $id => $data) {
        $stmtArea->execute([
            $id,
            $data['name'],
            $data['description'],
            $data['min_level'],
            $data['travel_time'],
            $data['stamina_cost'],
            $data['sort_order'],
            $data['tier'],
        ]);

        $fullAreaObj = array_merge($data, [
            'id' => $id,
            'staminaCost' => $data['stamina_cost'],
            'minLevel' => $data['min_level'],
            'travelTime' => $data['travel_time'],
        ]);

        $stmtGameArea->execute([
            $id,
            $data['name'],
            $data['stamina_cost'],
            json_encode($data['rates']),
            json_encode($fullAreaObj),
        ]);

        $exportExploration[$id] = $fullAreaObj;
    }

    // 7. Update backend/data/exploration.json
    $jsonFile = __DIR__ . '/../data/exploration.json';
    file_put_contents($jsonFile, json_encode($exportExploration, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

    echo "✅ Migration 036 executed successfully: All 18 grand realms synchronized across DB and JSON.\n";
} catch (Exception $e) {
    echo "❌ Migration failed: " . $e->getMessage() . "\n";
}
