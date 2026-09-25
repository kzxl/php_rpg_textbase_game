<?php

namespace App\Systems;

/**
 * RealmSystem — Hệ Thống Cảnh Giới Tu Tiên Vô Hạn (Unlimited Xianxia Progression)
 *
 * 19 Cảnh giới chuẩn Tiên Hiệp cổ điển + Hệ thống Vô Thượng Thiên Đạo vô tận cấp độ.
 * Mỗi cảnh giới có 3 phân tầng (Sơ Kỳ, Trung Kỳ, Hậu Kỳ).
 * Hỗ trợ tăng cấp độ và cảnh giới vô hạn không giới hạn trần (No Level Cap).
 */
class RealmSystem
{
    /**
     * Predefined canonical realms (1 to 19).
     */
    public const REALMS = [
        1 => [
            'id' => 'luyen_khi',
            'name' => 'Luyện Khí',
            'icon' => '🌱',
            'color' => '#8fbc8f',
            'levelMin' => 1,
            'levelMax' => 10,
            'bonuses' => ['maxHp' => 50, 'strength' => 5, 'speed' => 5, 'defense' => 3, 'dexterity' => 3],
            'unlocks' => ['Chiến đấu cơ bản', 'Gym', 'Skill'],
            'breakthroughCost' => null,
            'trialMonster' => null,
            'failChance' => 0,
            'failHospitalSeconds' => 0,
        ],
        2 => [
            'id' => 'truc_co',
            'name' => 'Trúc Cơ',
            'icon' => '⚡',
            'color' => '#4fc3f7',
            'levelMin' => 11,
            'levelMax' => 20,
            'bonuses' => ['maxHp' => 150, 'strength' => 15, 'speed' => 12, 'defense' => 10, 'dexterity' => 10, 'maxEnergy' => 20],
            'unlocks' => ['Luyện Đan', 'Mở rộng Skill Slots (+1)', 'Exploration nâng cao'],
            'breakthroughCost' => ['energy' => 30, 'gold' => 100],
            'trialMonster' => null,
            'failChance' => 5,
            'failHospitalSeconds' => 60,
        ],
        3 => [
            'id' => 'kim_dan',
            'name' => 'Kim Đan',
            'icon' => '💫',
            'color' => '#ffd54f',
            'levelMin' => 21,
            'levelMax' => 30,
            'bonuses' => ['maxHp' => 400, 'strength' => 35, 'speed' => 30, 'defense' => 25, 'dexterity' => 25, 'maxEnergy' => 50],
            'unlocks' => ['Vùng Thiết Huyết Sơn', 'Recipe Tier 2', 'Cường hóa trang bị'],
            'breakthroughCost' => ['energy' => 50, 'gold' => 500],
            'trialMonster' => 'golem',
            'failChance' => 15,
            'failHospitalSeconds' => 180,
        ],
        4 => [
            'id' => 'nguyen_anh',
            'name' => 'Nguyên Anh',
            'icon' => '🔥',
            'color' => '#ff7043',
            'levelMin' => 31,
            'levelMax' => 40,
            'bonuses' => ['maxHp' => 800, 'strength' => 70, 'speed' => 60, 'defense' => 50, 'dexterity' => 50, 'maxEnergy' => 100],
            'unlocks' => ['Vùng Thiên Kiếp Uyên', 'Recipe Tier 3', 'PvP Arena'],
            'breakthroughCost' => ['energy' => 50, 'gold' => 1500],
            'trialMonster' => 'demon',
            'failChance' => 25,
            'failHospitalSeconds' => 300,
        ],
        5 => [
            'id' => 'hoa_than',
            'name' => 'Hóa Thần',
            'icon' => '✨',
            'color' => '#ce93d8',
            'levelMin' => 41,
            'levelMax' => 50,
            'bonuses' => ['maxHp' => 1500, 'strength' => 140, 'speed' => 120, 'defense' => 100, 'dexterity' => 100, 'maxEnergy' => 200],
            'unlocks' => ['Thiên Kiếp events', 'Skill fusion', 'Vùng mới'],
            'breakthroughCost' => ['energy' => 50, 'gold' => 5000],
            'trialMonster' => 'dragon',
            'failChance' => 35,
            'failHospitalSeconds' => 600,
        ],
        6 => [
            'id' => 'luyen_hu',
            'name' => 'Luyện Hư',
            'icon' => '🌪️',
            'color' => '#80cbc4',
            'levelMin' => 51,
            'levelMax' => 65,
            'bonuses' => ['maxHp' => 2500, 'strength' => 250, 'speed' => 200, 'defense' => 180, 'dexterity' => 180, 'maxEnergy' => 350],
            'unlocks' => ['Thấu triệt Hư Không', 'Bí cảnh Luyện Hư', 'Pháp bảo thượng phẩm'],
            'breakthroughCost' => ['energy' => 50, 'gold' => 10000],
            'trialMonster' => 'demon',
            'failChance' => 40,
            'failHospitalSeconds' => 750,
        ],
        7 => [
            'id' => 'hop_the',
            'name' => 'Hợp Thể',
            'icon' => '🌟',
            'color' => '#4dd0e1',
            'levelMin' => 66,
            'levelMax' => 80,
            'bonuses' => ['maxHp' => 4000, 'strength' => 400, 'speed' => 320, 'defense' => 300, 'dexterity' => 300, 'maxEnergy' => 550],
            'unlocks' => ['Dual wielding', 'Realm-exclusive recipes', 'Tông Môn Chưởng Giáo'],
            'breakthroughCost' => ['energy' => 50, 'gold' => 25000],
            'trialMonster' => 'boss_demon',
            'failChance' => 45,
            'failHospitalSeconds' => 900,
        ],
        8 => [
            'id' => 'dai_thua',
            'name' => 'Đại Thừa',
            'icon' => '👑',
            'color' => '#ffd700',
            'levelMin' => 81,
            'levelMax' => 100,
            'bonuses' => ['maxHp' => 7000, 'strength' => 650, 'speed' => 520, 'defense' => 480, 'dexterity' => 480, 'maxEnergy' => 850],
            'unlocks' => ['World Boss solo', 'Master crafting', 'Thiên Đạo quy nạp'],
            'breakthroughCost' => ['energy' => 50, 'gold' => 60000],
            'trialMonster' => 'boss_demon',
            'failChance' => 50,
            'failHospitalSeconds' => 1200,
        ],
        9 => [
            'id' => 'do_kiep',
            'name' => 'Độ Kiếp',
            'icon' => '⚡👑',
            'color' => '#e040fb',
            'levelMin' => 101,
            'levelMax' => 130,
            'bonuses' => ['maxHp' => 12000, 'strength' => 1100, 'speed' => 900, 'defense' => 800, 'dexterity' => 800, 'maxEnergy' => 1300],
            'unlocks' => ['Thiên Lôi Thối Thể', 'Ascension trials', 'Huyền thoại chế tác'],
            'breakthroughCost' => ['energy' => 50, 'gold' => 120000],
            'trialMonster' => 'boss_demon',
            'failChance' => 55,
            'failHospitalSeconds' => 1800,
        ],
        10 => [
            'id' => 'chan_tien',
            'name' => 'Chân Tiên',
            'icon' => '🪐',
            'color' => '#00e676',
            'levelMin' => 131,
            'levelMax' => 180,
            'bonuses' => ['maxHp' => 20000, 'strength' => 1800, 'speed' => 1500, 'defense' => 1300, 'dexterity' => 1300, 'maxEnergy' => 2000],
            'unlocks' => ['Tiên Khí Hộ Thể', 'Thoát Phàm Nhập Thánh', 'Bát Hoang Cấm Địa'],
            'breakthroughCost' => ['energy' => 50, 'gold' => 250000],
            'trialMonster' => 'boss_demon',
            'failChance' => 50,
            'failHospitalSeconds' => 1800,
        ],
        11 => [
            'id' => 'kim_tien',
            'name' => 'Kim Tiên',
            'icon' => '☀️',
            'color' => '#ffeb3b',
            'levelMin' => 181,
            'levelMax' => 250,
            'bonuses' => ['maxHp' => 35000, 'strength' => 3000, 'speed' => 2500, 'defense' => 2200, 'dexterity' => 2200, 'maxEnergy' => 3200],
            'unlocks' => ['Bất Hủ Kim Thân', 'Vạn Pháp Quy Tông'],
            'breakthroughCost' => ['energy' => 50, 'gold' => 450000],
            'trialMonster' => 'boss_demon',
            'failChance' => 50,
            'failHospitalSeconds' => 1800,
        ],
        12 => [
            'id' => 'thai_at',
            'name' => 'Thái Ất Kim Tiên',
            'icon' => '🌌',
            'color' => '#00bcd4',
            'levelMin' => 251,
            'levelMax' => 350,
            'bonuses' => ['maxHp' => 60000, 'strength' => 5000, 'speed' => 4200, 'defense' => 3800, 'dexterity' => 3800, 'maxEnergy' => 5000],
            'unlocks' => ['Thời Không Nhập Đạo', 'Thái Ất Đạo Quả'],
            'breakthroughCost' => ['energy' => 50, 'gold' => 800000],
            'trialMonster' => 'boss_demon',
            'failChance' => 50,
            'failHospitalSeconds' => 1800,
        ],
        13 => [
            'id' => 'dai_la',
            'name' => 'Đại La Kim Tiên',
            'icon' => '💠',
            'color' => '#3f51b5',
            'levelMin' => 351,
            'levelMax' => 500,
            'bonuses' => ['maxHp' => 100000, 'strength' => 8500, 'speed' => 7000, 'defense' => 6500, 'dexterity' => 6500, 'maxEnergy' => 8000],
            'unlocks' => ['Đại La Đạo Thể', 'Siêu Thoát Tam Giới'],
            'breakthroughCost' => ['energy' => 50, 'gold' => 1400000],
            'trialMonster' => 'boss_demon',
            'failChance' => 50,
            'failHospitalSeconds' => 1800,
        ],
        14 => [
            'id' => 'tien_ton',
            'name' => 'Tiên Tôn',
            'icon' => '🔱',
            'color' => '#9c27b0',
            'levelMin' => 501,
            'levelMax' => 700,
            'bonuses' => ['maxHp' => 180000, 'strength' => 15000, 'speed' => 12500, 'defense' => 11500, 'dexterity' => 11500, 'maxEnergy' => 13000],
            'unlocks' => ['Tiên Tôn Lãnh Địa', 'Chưởng Quản Tinh Hà'],
            'breakthroughCost' => ['energy' => 50, 'gold' => 2200000],
            'trialMonster' => 'boss_demon',
            'failChance' => 50,
            'failHospitalSeconds' => 1800,
        ],
        15 => [
            'id' => 'tien_de',
            'name' => 'Tiên Đế',
            'icon' => '💠👑',
            'color' => '#ff1744',
            'levelMin' => 701,
            'levelMax' => 1000,
            'bonuses' => ['maxHp' => 300000, 'strength' => 25000, 'speed' => 21000, 'defense' => 19000, 'dexterity' => 19000, 'maxEnergy' => 22000],
            'unlocks' => ['Đế Uy Trấn Thế', 'Chí Cao Đế Khí'],
            'breakthroughCost' => ['energy' => 50, 'gold' => 3500000],
            'trialMonster' => 'boss_demon',
            'failChance' => 50,
            'failHospitalSeconds' => 1800,
        ],
        16 => [
            'id' => 'chuan_thanh',
            'name' => 'Chuẩn Thánh',
            'icon' => '☸️',
            'color' => '#ff9100',
            'levelMin' => 1001,
            'levelMax' => 1500,
            'bonuses' => ['maxHp' => 500000, 'strength' => 42000, 'speed' => 35000, 'defense' => 32000, 'dexterity' => 32000, 'maxEnergy' => 35000],
            'unlocks' => ['Trảm Tam Thi', 'Bán Bộ Hỗn Nguyên'],
            'breakthroughCost' => ['energy' => 50, 'gold' => 5000000],
            'trialMonster' => 'boss_demon',
            'failChance' => 50,
            'failHospitalSeconds' => 1800,
        ],
        17 => [
            'id' => 'thanh_nhan',
            'name' => 'Hỗn Nguyên Thánh Nhân',
            'icon' => '⚜️',
            'color' => '#ffd700',
            'levelMin' => 1501,
            'levelMax' => 2200,
            'bonuses' => ['maxHp' => 850000, 'strength' => 70000, 'speed' => 58000, 'defense' => 54000, 'dexterity' => 54000, 'maxEnergy' => 58000],
            'unlocks' => ['Bất Tử Bất Diệt', 'Hóa Thân Thiên Địa'],
            'breakthroughCost' => ['energy' => 50, 'gold' => 7500000],
            'trialMonster' => 'boss_demon',
            'failChance' => 50,
            'failHospitalSeconds' => 1800,
        ],
        18 => [
            'id' => 'hon_don_dao_to',
            'name' => 'Hỗn Độn Đạo Tổ',
            'icon' => '☯️',
            'color' => '#651fff',
            'levelMin' => 2201,
            'levelMax' => 3200,
            'bonuses' => ['maxHp' => 1400000, 'strength' => 115000, 'speed' => 96000, 'defense' => 90000, 'dexterity' => 90000, 'maxEnergy' => 95000],
            'unlocks' => ['Khai Thiên Tích Địa', 'Đạo Sinh Vạn Vật'],
            'breakthroughCost' => ['energy' => 50, 'gold' => 10000000],
            'trialMonster' => 'boss_demon',
            'failChance' => 50,
            'failHospitalSeconds' => 1800,
        ],
        19 => [
            'id' => 'hong_mong_chi_ton',
            'name' => 'Hồng Mông Chí Tôn',
            'icon' => '🌌✨',
            'color' => '#f50057',
            'levelMin' => 3201,
            'levelMax' => 5000,
            'bonuses' => ['maxHp' => 2500000, 'strength' => 200000, 'speed' => 165000, 'defense' => 155000, 'dexterity' => 155000, 'maxEnergy' => 160000],
            'unlocks' => ['Chưởng Quản Hồng Mông', 'Sáng Tạo Thế Giới'],
            'breakthroughCost' => ['energy' => 50, 'gold' => 15000000],
            'trialMonster' => 'boss_demon',
            'failChance' => 50,
            'failHospitalSeconds' => 1800,
        ],
    ];

    /**
     * Sub-stages within each realm.
     */
    public const SUB_STAGES = [
        1 => 'Sơ Kỳ',
        2 => 'Trung Kỳ',
        3 => 'Hậu Kỳ',
    ];

    /**
     * Get realm definition by tier (procedural for tier >= 20).
     */
    public static function getRealmDefinition(int $tier): array
    {
        if (isset(self::REALMS[$tier])) {
            return self::REALMS[$tier];
        }

        // Tier >= 20: Vô Thượng Thiên Đạo (Procedural Infinite Realm)
        $extraTiers = max(1, $tier - 19);
        $levelMin = 5001 + ($extraTiers - 1) * 1500;
        $levelMax = $levelMin + 1499;
        $multiplier = $extraTiers;

        return [
            'id' => 'vo_thuong_' . $tier,
            'name' => 'Vô Thượng Thiên Đạo Tầng ' . $extraTiers,
            'icon' => '🌌👑',
            'color' => '#ff007f',
            'levelMin' => $levelMin,
            'levelMax' => $levelMax,
            'bonuses' => [
                'maxHp' => 3500000 + (1000000 * $multiplier),
                'strength' => 280000 + (80000 * $multiplier),
                'speed' => 230000 + (65000 * $multiplier),
                'defense' => 215000 + (60000 * $multiplier),
                'dexterity' => 215000 + (60000 * $multiplier),
                'maxEnergy' => 220000 + (60000 * $multiplier),
            ],
            'unlocks' => ['Quy Luật Vô Thượng', 'Đồng Hóa Thiên Đạo', 'Vô Cực Bất Diệt'],
            'breakthroughCost' => ['energy' => 50, 'gold' => min(50000000, 20000000 + (5000000 * $multiplier))],
            'trialMonster' => 'boss_demon',
            'failChance' => 50,
            'failHospitalSeconds' => 1800,
        ];
    }

    /**
     * Get realm tier for any level (1 to infinity).
     */
    public static function getRealmTier(int $level): int
    {
        $tier = 1;
        foreach (self::REALMS as $t => $r) {
            if ($level >= $r['levelMin']) {
                $tier = $t;
            }
        }

        if ($level > 5000) {
            $tier = 20 + (int)floor(($level - 5001) / 1500);
        }

        return $tier;
    }

    /**
     * Get sub-stage (1-3) within a realm safely.
     */
    public static function getSubStage(int $level, int $tier): int
    {
        $realm = self::getRealmDefinition($tier);
        $range = max(1, $realm['levelMax'] - $realm['levelMin'] + 1);
        $progress = max(0, $level - $realm['levelMin']);
        $third = max(1, ceil($range / 3));

        if ($progress >= $third * 2) return 3;
        if ($progress >= $third) return 2;
        return 1;
    }

    /**
     * Get full realm info for a player level + breakthrough status.
     * Always provides nextRealm (unlimited progression).
     */
    public static function getRealmInfo(int $level, int $currentRealmTier): array
    {
        $naturalTier = self::getRealmTier($level);
        $effectiveTier = min($naturalTier, $currentRealmTier);
        $subStage = self::getSubStage($level, $effectiveTier);

        $realm = self::getRealmDefinition($effectiveTier);
        $nextRealm = self::getRealmDefinition($effectiveTier + 1);

        $canBreakthrough = ($naturalTier > $currentRealmTier);

        return [
            'tier' => $effectiveTier,
            'naturalTier' => $naturalTier,
            'name' => $realm['name'],
            'fullName' => $realm['name'] . ' ' . (self::SUB_STAGES[$subStage] ?? ''),
            'icon' => $realm['icon'],
            'color' => $realm['color'],
            'subStage' => $subStage,
            'subStageName' => self::SUB_STAGES[$subStage] ?? '',
            'bonuses' => $realm['bonuses'],
            'unlocks' => $realm['unlocks'],
            'canBreakthrough' => $canBreakthrough,
            'nextRealm' => [
                'name' => $nextRealm['name'],
                'icon' => $nextRealm['icon'],
                'levelMin' => $nextRealm['levelMin'],
                'cost' => $nextRealm['breakthroughCost'],
                'trialMonster' => $nextRealm['trialMonster'],
                'failChance' => $nextRealm['failChance'] ?? 0,
                'bonuses' => $nextRealm['bonuses'],
                'unlocks' => $nextRealm['unlocks'],
            ],
        ];
    }

    /**
     * Get cumulative realm bonuses for StatEngine integration.
     * Returns all bonuses from realm 1 up to current tier.
     */
    public static function getCumulativeBonuses(int $tier): array
    {
        $cumulative = [];
        for ($t = 1; $t <= $tier; $t++) {
            $def = self::getRealmDefinition($t);
            foreach ($def['bonuses'] as $stat => $val) {
                $cumulative[$stat] = ($cumulative[$stat] ?? 0) + $val;
            }
        }
        return $cumulative;
    }

    /**
     * Attempt breakthrough. Returns ['success' => bool, 'message' => string, 'newTier' => int]
     * Never blocked by max realm limit.
     */
    public static function attemptBreakthrough(int $level, int $currentTier, int $playerGold, int $playerEnergy): array
    {
        $naturalTier = self::getRealmTier($level);
        $nextTier = $currentTier + 1;

        if ($currentTier >= $naturalTier) {
            return ['success' => false, 'message' => 'Cảnh giới hiện tại phù hợp với tu vi. Hãy tu luyện tích lũy thêm tu vi!'];
        }

        $nextRealm = self::getRealmDefinition($nextTier);
        $cost = $nextRealm['breakthroughCost'];

        if ($cost) {
            if ($playerGold < ($cost['gold'] ?? 0)) {
                $goldFormatted = number_format($cost['gold'] ?? 0);
                return ['success' => false, 'message' => "Thiếu Linh Thạch! Cần {$goldFormatted} 💎"];
            }
            if ($playerEnergy < ($cost['energy'] ?? 0)) {
                return ['success' => false, 'message' => "Thiếu Linh Lực! Cần {$cost['energy']} 🔮"];
            }
        }

        // Trial monster check
        if ($nextRealm['trialMonster']) {
            return [
                'success' => false,
                'needsTrial' => true,
                'trialMonster' => $nextRealm['trialMonster'],
                'failChance' => $nextRealm['failChance'] ?? 0,
                'failHospitalSeconds' => $nextRealm['failHospitalSeconds'] ?? 0,
                'message' => "Phải vượt qua Thiên Kiếp Thử Luyện trước khi đột phá lên {$nextRealm['name']}!",
            ];
        }

        // Failure chance roll
        $failChance = $nextRealm['failChance'] ?? 0;
        if ($failChance > 0 && mt_rand(1, 100) <= $failChance) {
            return [
                'success' => false,
                'failed' => true,
                'failHospitalSeconds' => $nextRealm['failHospitalSeconds'] ?? 0,
                'message' => "⚡ Đột phá thất bại! Cơ thể không chịu nổi linh lực cảnh giới mới, bị trọng thương!",
            ];
        }

        return [
            'success' => true,
            'newTier' => $nextTier,
            'cost' => $cost,
            'message' => "🌟 ĐỘT PHÁ THÀNH CÔNG! Chúc mừng đạo hữu bước vào cảnh giới {$nextRealm['name']}!",
        ];
    }

    /**
     * Get all realms for display in realm map.
     */
    public static function getAllRealms(?int $playerTier = null): array
    {
        $result = [];
        $maxTier = max(19, ($playerTier ?? 1) + 1);
        for ($t = 1; $t <= $maxTier; $t++) {
            $r = self::getRealmDefinition($t);
            $result[] = array_merge($r, ['tier' => $t]);
        }
        return $result;
    }
}
