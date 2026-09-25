<?php

namespace App\Core;

/**
 * SecretRealmRegistry
 * Manages templates and generation for Secret Realms (Bí Cảnh Khám Phá):
 * 1. Timed Secret Realms (Huyễn Cảnh): has countdown, disappears when expired
 * 2. Permanent Secret Realms (Thượng Cổ Cấm Địa): no expiration, extremely strong monsters (x2.0 - x3.5)
 */
class SecretRealmRegistry
{
    /**
     * Templates for Timed Secret Realms (Huyễn Cảnh Có Thời Hạn)
     */
    public static function getTimedTemplates(): array
    {
        return [
            [
                'key' => 'huyen_canh_linh_duoc',
                'name' => 'Huyễn Cảnh: Dược Thần Cổ Cốc',
                'description' => 'Ảo cảnh sương mù bao phủ, tràn ngập linh thảo hiếm. Linh khí dao động mãnh liệt, sắp sửa tiêu tán vào hư không.',
                'tier' => 1,
                'requiredRealm' => 1,
                'durationMinutes' => 45,
                'waves' => 3,
                'difficultyMult' => 1.10,
                'monsterPool' => ['tho_lang', 'thanh_xa', 'moc_nhan'],
                'boss' => [
                    'id' => 'boss_huyen_linh_moc_thu',
                    'name' => 'Huyễn Linh Mộc Thú',
                    'description' => 'Linh thú do cây cỏ vạn năm biến ảo thành, trấn giữ Dược Thần Cổ Cốc.',
                    'stats' => ['hp' => 320, 'strength' => 20, 'speed' => 14, 'dexterity' => 14, 'defense' => 12],
                    'effects' => [['type' => 'poison', 'chance' => 40, 'damage' => 8, 'duration' => 3]],
                    'xpReward' => 250,
                    'goldReward' => [80, 150],
                    'drops' => [
                        ['itemId' => 'mat_huyet_tinh', 'chance' => 90, 'qty' => [3, 5]],
                        ['itemId' => 'mat_noi_dan_trung', 'chance' => 50, 'qty' => [1, 2]],
                        ['itemId' => 'tay_tuy_dan', 'chance' => 15, 'qty' => [1, 1], 'type' => 'medicine'],
                    ],
                ],
                'rewards' => ['xpBonus' => 1.5, 'goldBonus' => 1.8],
            ],
            [
                'key' => 'huyen_canh_tinh_thach',
                'name' => 'Huyễn Cảnh: Huyễn Tinh Ma Động',
                'description' => 'Động đá phát quang tinh khiết với vô số tinh thạch lơ lửng. Cửa vào đang khép lại từng khắc.',
                'tier' => 2,
                'requiredRealm' => 2,
                'durationMinutes' => 60,
                'waves' => 3,
                'difficultyMult' => 1.20,
                'monsterPool' => ['anh_hon', 'thiet_giap_trung', 'u_linh'],
                'boss' => [
                    'id' => 'boss_co_nham_thach_tinh',
                    'name' => 'Cổ Nham Thạch Tinh',
                    'description' => 'Khối cự thạch ngàn năm tích tụ tinh khí thiên địa biến thành ma vật.',
                    'stats' => ['hp' => 650, 'strength' => 32, 'speed' => 12, 'dexterity' => 16, 'defense' => 28],
                    'effects' => [['type' => 'stun', 'chance' => 25, 'duration' => 1]],
                    'xpReward' => 500,
                    'goldReward' => [150, 300],
                    'drops' => [
                        ['itemId' => 'mat_kim_loai_linh', 'chance' => 90, 'qty' => [3, 6]],
                        ['itemId' => 'mat_noi_dan_lon', 'chance' => 60, 'qty' => [1, 2]],
                        ['itemId' => 'tay_tuy_dan', 'chance' => 25, 'qty' => [1, 1], 'type' => 'medicine'],
                    ],
                ],
                'rewards' => ['xpBonus' => 1.8, 'goldBonus' => 2.2],
            ],
            [
                'key' => 'huyen_canh_tinh_ha',
                'name' => 'Huyễn Cảnh: Tinh Hà Lạc Cảnh',
                'description' => 'Một mảnh không gian lưu ly trôi dạt từ thượng giới. Tinh huy chiếu rọi nhưng sắp sửa tan vỡ.',
                'tier' => 3,
                'requiredRealm' => 3,
                'durationMinutes' => 75,
                'waves' => 4,
                'difficultyMult' => 1.30,
                'monsterPool' => ['hoa_ho', 'loi_dieu', 'huyet_lang_vuong'],
                'boss' => [
                    'id' => 'boss_tinh_ha_huyen_thu',
                    'name' => 'Tinh Hà Huyễn Thú',
                    'description' => 'Dị thú sinh ra từ tinh trần thượng giới, thân mang vạn trượng hào quang.',
                    'stats' => ['hp' => 1300, 'strength' => 48, 'speed' => 24, 'dexterity' => 28, 'defense' => 35],
                    'effects' => [
                        ['type' => 'burn', 'chance' => 40, 'damage' => 15, 'duration' => 3],
                        ['type' => 'curse', 'chance' => 30, 'stat' => 'defense', 'value' => -10, 'duration' => 3],
                    ],
                    'xpReward' => 1000,
                    'goldReward' => [300, 600],
                    'drops' => [
                        ['itemId' => 'mat_tinh_hoa', 'chance' => 90, 'qty' => [5, 10]],
                        ['itemId' => 'mat_noi_dan_cuc', 'chance' => 60, 'qty' => [1, 3]],
                        ['itemId' => 'hoan_cot_dan', 'chance' => 15, 'qty' => [1, 1], 'type' => 'medicine'],
                    ],
                ],
                'rewards' => ['xpBonus' => 2.2, 'goldBonus' => 2.5],
            ],
            [
                'key' => 'huyen_canh_huyet_nguyet',
                'name' => 'Huyễn Cảnh: Huyết Nguyệt Tàn Giới',
                'description' => 'Vùng hư không nhuộm đỏ ánh trăng máu. Vô số tàn linh hung tợn đang gào thét trước khi màn đêm kết thúc.',
                'tier' => 4,
                'requiredRealm' => 4,
                'durationMinutes' => 90,
                'waves' => 4,
                'difficultyMult' => 1.40,
                'monsterPool' => ['ma_nhan', 'co_thi', 'thien_thach_thu'],
                'boss' => [
                    'id' => 'boss_huyet_nguyet_yeu_de',
                    'name' => 'Huyết Nguyệt Yêu Đế Tàn Ảnh',
                    'description' => 'Ý niệm tàn dư của Yêu Đế thượng cổ tụ hội dưới trăng máu.',
                    'stats' => ['hp' => 2400, 'strength' => 75, 'speed' => 30, 'dexterity' => 35, 'defense' => 50],
                    'effects' => [
                        ['type' => 'curse', 'chance' => 50, 'stat' => 'strength', 'value' => -15, 'duration' => 3],
                        ['type' => 'burn', 'chance' => 45, 'damage' => 25, 'duration' => 3],
                        ['type' => 'stun', 'chance' => 25, 'duration' => 1],
                    ],
                    'xpReward' => 2200,
                    'goldReward' => [600, 1200],
                    'drops' => [
                        ['itemId' => 'mat_thien_thach', 'chance' => 95, 'qty' => [6, 12]],
                        ['itemId' => 'mat_noi_dan_cuc', 'chance' => 80, 'qty' => [2, 4]],
                        ['itemId' => 'hoan_cot_dan', 'chance' => 30, 'qty' => [1, 1], 'type' => 'medicine'],
                        ['itemId' => 'tay_tuy_dan', 'chance' => 50, 'qty' => [1, 2], 'type' => 'medicine'],
                    ],
                ],
                'rewards' => ['xpBonus' => 3.0, 'goldBonus' => 3.5],
            ],
        ];
    }

    /**
     * Templates for Permanent Secret Realms (Thượng Cổ Cấm Địa - Vô Thời Hạn, Quái RẤT MẠNH)
     */
    public static function getPermanentTemplates(): array
    {
        return [
            [
                'key' => 'cam_dia_man_hoang',
                'name' => 'Cấm Địa: Man Hoang Cổ Trạch',
                'description' => 'Vực sâu đầm lầy phong ấn từ thời Hồng Hoang. Cấm địa vĩnh viễn không biến mất. Yêu thú man rợ sở hữu sức mạnh kinh thiên động địa!',
                'tier' => 2,
                'requiredRealm' => 2,
                'durationMinutes' => null, // Permanent
                'waves' => 4,
                'difficultyMult' => 2.20, // Stats scaled 2.2x
                'monsterPool' => ['thanh_xa', 'tho_lang', 'thiet_giap_trung'],
                'boss' => [
                    'id' => 'boss_thon_thien_cu_mang',
                    'name' => 'Thượng Cổ Thôn Thiên Mãng',
                    'description' => 'Cự mãng vạn trượng thời viễn cổ nuốt chửng nhật nguyệt. Thân mình cứng như huyền thiết, nọc độc ăn mòn kim thạch.',
                    'stats' => ['hp' => 1800, 'strength' => 65, 'speed' => 28, 'dexterity' => 32, 'defense' => 38],
                    'effects' => [
                        ['type' => 'poison', 'chance' => 60, 'damage' => 20, 'duration' => 4],
                        ['type' => 'curse', 'chance' => 40, 'stat' => 'defense', 'value' => -12, 'duration' => 3],
                    ],
                    'xpReward' => 1800,
                    'goldReward' => [500, 1000],
                    'drops' => [
                        ['itemId' => 'mat_noi_dan_lon', 'chance' => 100, 'qty' => [2, 4]],
                        ['itemId' => 'mat_noi_dan_cuc', 'chance' => 40, 'qty' => [1, 2]],
                        ['itemId' => 'tay_tuy_dan', 'chance' => 50, 'qty' => [1, 2], 'type' => 'medicine'],
                        ['itemId' => 'hoan_cot_dan', 'chance' => 20, 'qty' => [1, 1], 'type' => 'medicine'],
                    ],
                ],
                'rewards' => ['xpBonus' => 3.0, 'goldBonus' => 3.0],
            ],
            [
                'key' => 'cam_dia_u_minh_vuc',
                'name' => 'Cấm Địa: U Minh Vạn Quỷ Vực',
                'description' => 'Vực sâu ngàn trượng hấp thu cửu u âm khí. Lối vào vĩnh hằng nhưng tử khí dày đặc, quái vật cuồng bạo x2.6 lần bình thường!',
                'tier' => 3,
                'requiredRealm' => 3,
                'durationMinutes' => null,
                'waves' => 5,
                'difficultyMult' => 2.60, // Stats scaled 2.6x
                'monsterPool' => ['u_linh', 'anh_hon', 'co_thi'],
                'boss' => [
                    'id' => 'boss_minh_vuong_tan_hon',
                    'name' => 'Minh Vương Tàn Hồn',
                    'description' => 'Tàn hồn bất diệt của Ma Tôn cửu u, điều khiển vạn quỷ cắn xé linh hồn kẻ xâm phạm.',
                    'stats' => ['hp' => 3200, 'strength' => 88, 'speed' => 34, 'dexterity' => 42, 'defense' => 55],
                    'effects' => [
                        ['type' => 'curse', 'chance' => 60, 'stat' => 'strength', 'value' => -18, 'duration' => 4],
                        ['type' => 'poison', 'chance' => 50, 'damage' => 25, 'duration' => 3],
                        ['type' => 'stun', 'chance' => 30, 'duration' => 1],
                    ],
                    'xpReward' => 3500,
                    'goldReward' => [1200, 2500],
                    'drops' => [
                        ['itemId' => 'mat_noi_dan_cuc', 'chance' => 100, 'qty' => [2, 3]],
                        ['itemId' => 'hoan_cot_dan', 'chance' => 40, 'qty' => [1, 2], 'type' => 'medicine'],
                        ['itemId' => 'tay_tuy_dan', 'chance' => 70, 'qty' => [2, 3], 'type' => 'medicine'],
                    ],
                ],
                'rewards' => ['xpBonus' => 4.0, 'goldBonus' => 4.0],
            ],
            [
                'key' => 'cam_dia_loi_dinh_coc',
                'name' => 'Cấm Địa: Vạn Kiếp Lôi Đình Cốc',
                'description' => 'Hẻm núi thiên kiếp sấm sét oanh tạc quanh năm. Quái vật lôi đình cực đoan với sức mạnh x3.0 lần, trúng đòn là tê liệt!',
                'tier' => 4,
                'requiredRealm' => 4,
                'durationMinutes' => null,
                'waves' => 5,
                'difficultyMult' => 3.00, // Stats scaled 3.0x
                'monsterPool' => ['loi_dieu', 'hoa_ho', 'ma_nhan'],
                'boss' => [
                    'id' => 'boss_cuu_thien_loi_kiem_than',
                    'name' => 'Cửu Thiên Lôi Kiếp Cự Thần',
                    'description' => 'Cổ thần sinh ra từ trung tâm Lôi Hải, chưởng quản thiên lôi sát phạt tuyệt diệt.',
                    'stats' => ['hp' => 5500, 'strength' => 125, 'speed' => 46, 'dexterity' => 52, 'defense' => 75],
                    'effects' => [
                        ['type' => 'stun', 'chance' => 40, 'duration' => 1],
                        ['type' => 'burn', 'chance' => 50, 'damage' => 35, 'duration' => 3],
                        ['type' => 'curse', 'chance' => 40, 'stat' => 'defense', 'value' => -20, 'duration' => 3],
                    ],
                    'xpReward' => 6000,
                    'goldReward' => [2500, 5000],
                    'drops' => [
                        ['itemId' => 'mat_noi_dan_cuc', 'chance' => 100, 'qty' => [3, 5]],
                        ['itemId' => 'mat_thien_thach', 'chance' => 100, 'qty' => [8, 15]],
                        ['itemId' => 'hoan_cot_dan', 'chance' => 60, 'qty' => [1, 2], 'type' => 'medicine'],
                    ],
                ],
                'rewards' => ['xpBonus' => 5.0, 'goldBonus' => 5.0],
            ],
            [
                'key' => 'cam_dia_hon_don_vuc',
                'name' => 'Cấm Địa: Hỗn Độn Hư Không Vực',
                'description' => 'Vết rách cấm kỵ nơi biên giới vũ trụ. Sức mạnh quái vật x3.5 lần, chỉ những đấng tối cao mới dám bước chân vào!',
                'tier' => 5,
                'requiredRealm' => 5,
                'durationMinutes' => null,
                'waves' => 6,
                'difficultyMult' => 3.50, // Stats scaled 3.5x
                'monsterPool' => ['thien_thach_thu', 'ma_nhan', 'co_thi'],
                'boss' => [
                    'id' => 'boss_hon_don_ma_to',
                    'name' => 'Hỗn Độn Ma Tổ Tàn Thân',
                    'description' => 'Thực thể hỗn độn cổ xưa nhất từ trước khi khai thiên lập địa.',
                    'stats' => ['hp' => 9500, 'strength' => 165, 'speed' => 55, 'dexterity' => 65, 'defense' => 100],
                    'effects' => [
                        ['type' => 'curse', 'chance' => 60, 'stat' => 'strength', 'value' => -25, 'duration' => 4],
                        ['type' => 'burn', 'chance' => 50, 'damage' => 50, 'duration' => 3],
                        ['type' => 'stun', 'chance' => 35, 'duration' => 1],
                    ],
                    'xpReward' => 12000,
                    'goldReward' => [5000, 10000],
                    'drops' => [
                        ['itemId' => 'mat_noi_dan_cuc', 'chance' => 100, 'qty' => [5, 8]],
                        ['itemId' => 'hoan_cot_dan', 'chance' => 100, 'qty' => [2, 3], 'type' => 'medicine'],
                        ['itemId' => 'tay_tuy_dan', 'chance' => 100, 'qty' => [3, 5], 'type' => 'medicine'],
                    ],
                ],
                'rewards' => ['xpBonus' => 6.0, 'goldBonus' => 6.0],
            ],
        ];
    }

    /**
     * Pick or generate a Secret Realm discovery for a player
     * @param \App\Models\Player $player
     * @param string $areaId
     * @param string|null $forcedType ('timed' | 'permanent')
     * @return array|null Secret realm record ready for insertion
     */
    public static function generateDiscovery($player, string $areaId, ?string $forcedType = null): ?array
    {
        $playerRealm = $player->getRealm();

        // Roll type if not forced (65% Timed, 35% Permanent)
        $type = $forcedType ?? ((mt_rand(1, 100) <= 65) ? 'timed' : 'permanent');

        $pdo = Database::pdo();

        if ($type === 'permanent') {
            $templates = self::getPermanentTemplates();
            // Filter by existing unlocked permanent realms for this player so we don't duplicate
            $stmt = $pdo->prepare("SELECT dungeon_key FROM player_discovered_dungeons WHERE player_id = ? AND realm_type = 'permanent'");
            $stmt->execute([$player->id]);
            $existingKeys = $stmt->fetchAll(\PDO::FETCH_COLUMN);

            $available = array_filter($templates, function ($t) use ($playerRealm, $existingKeys) {
                // Allow realms within reach (up to playerRealm + 1 for challenge)
                return !in_array($t['key'], $existingKeys) && ($t['requiredRealm'] <= ($playerRealm + 1));
            });

            // If player already unlocked all matching permanent realms, fallback to timed
            if (empty($available)) {
                $type = 'timed';
            } else {
                $template = $available[array_rand($available)];
            }
        }

        if ($type === 'timed') {
            $templates = self::getTimedTemplates();
            // Match template with player realm or slightly above
            $matched = array_filter($templates, function ($t) use ($playerRealm) {
                return $t['requiredRealm'] <= max(1, $playerRealm);
            });
            if (empty($matched)) $matched = $templates;
            $template = $matched[array_rand($matched)];
        }

        if (empty($template)) return null;

        // Calculate expires_at for timed
        $now = time();
        $expiresAt = null;
        if ($type === 'timed') {
            $durationSec = ($template['durationMinutes'] ?? 60) * 60;
            // Add a little randomness (+- 10m)
            $jitter = mt_rand(-300, 600);
            $expiresAt = date('Y-m-d H:i:s', $now + max(1200, $durationSec + $jitter));
        }

        return [
            'player_id' => $player->id,
            'dungeon_key' => $template['key'],
            'realm_type' => $type,
            'name' => $template['name'],
            'description' => $template['description'],
            'tier' => (int)$template['tier'],
            'required_realm' => (int)$template['requiredRealm'],
            'difficulty_mult' => (float)$template['difficultyMult'],
            'waves' => (int)$template['waves'],
            'area_id' => $areaId,
            'discovered_at' => date('Y-m-d H:i:s', $now),
            'expires_at' => $expiresAt,
            'is_cleared' => 0,
            'status' => 'available',
            'monster_pool' => json_encode($template['monsterPool']),
            'boss_data' => json_encode($template['boss']),
            'rewards_data' => json_encode($template['rewards']),
            'raw_template' => $template,
        ];
    }
}
