<?php

namespace App\Systems;

/**
 * RealmSystem — Hệ Thống Cảnh Giới Tu Tiên
 *
 * 8 Cảnh giới chính, mỗi cảnh giới có 3 tầng (Sơ/Trung/Hậu Kỳ).
 * Tổng 24 sub-levels.
 *
 * Lên cảnh giới = quá trình tự nhiên khi đạt đủ level.
 * Breakthrough (Đột phá) = cần hoàn thành điều kiện đặc biệt tại các ngưỡng chính.
 */
class RealmSystem
{
    /**
     * Full realm definitions.
     * levelMin: level tối thiểu để vào cảnh giới
     * bonuses: stat modifiers khi đạt cảnh giới
     * unlocks: gameplay features mở khóa
     * breakthroughCost: energy + gold cần để đột phá vào cảnh giới này
     * trialMonster: quái phải đánh bại để đột phá (null = tự động)
     */
    public const REALMS = [
        1 => [
            'id' => 'luyen_khi',
            'name' => 'Luyện Khí',
            'icon' => '🌱',
            'color' => '#8fbc8f',
            'levelMin' => 1,
            'levelMax' => 10,
            'bonuses' => ['maxHp' => 10, 'strength' => 2, 'speed' => 2],
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
            'bonuses' => ['maxHp' => 100, 'strength' => 10, 'speed' => 8, 'defense' => 5, 'dexterity' => 5, 'maxEnergy' => 20],
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
            'bonuses' => ['maxHp' => 300, 'strength' => 25, 'speed' => 20, 'defense' => 15, 'dexterity' => 15, 'maxEnergy' => 50],
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
            'bonuses' => ['maxHp' => 500, 'strength' => 50, 'speed' => 40, 'defense' => 30, 'dexterity' => 30, 'maxEnergy' => 100],
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
            'bonuses' => ['maxHp' => 1000, 'strength' => 100, 'speed' => 80, 'defense' => 60, 'dexterity' => 60, 'maxEnergy' => 200],
            'unlocks' => ['Thiên Kiếp events', 'Skill fusion', 'Vùng mới'],
            'breakthroughCost' => ['energy' => 50, 'gold' => 5000],
            'trialMonster' => 'dragon',
            'failChance' => 35,
            'failHospitalSeconds' => 600,
        ],
        6 => [
            'id' => 'hop_the',
            'name' => 'Hợp Thể',
            'icon' => '🌟',
            'color' => '#4dd0e1',
            'levelMin' => 51,
            'levelMax' => 60,
            'bonuses' => ['maxHp' => 2000, 'strength' => 200, 'speed' => 150, 'defense' => 120, 'dexterity' => 120, 'maxEnergy' => 400],
            'unlocks' => ['Dual wielding', 'Realm-exclusive recipes', 'Phái advancement'],
            'breakthroughCost' => ['energy' => 50, 'gold' => 15000],
            'trialMonster' => 'boss_demon',
            'failChance' => 45,
            'failHospitalSeconds' => 900,
        ],
        7 => [
            'id' => 'dai_thua',
            'name' => 'Đại Thừa',
            'icon' => '👑',
            'color' => '#ffd700',
            'levelMin' => 61,
            'levelMax' => 80,
            'bonuses' => ['maxHp' => 5000, 'strength' => 400, 'speed' => 300, 'defense' => 250, 'dexterity' => 250, 'maxEnergy' => 800],
            'unlocks' => ['World Boss solo', 'Master crafting', 'Thiên Đạo interference'],
            'breakthroughCost' => ['energy' => 50, 'gold' => 50000],
            'trialMonster' => 'boss_demon',
            'failChance' => 55,
            'failHospitalSeconds' => 1800,
        ],
        8 => [
            'id' => 'do_kiep',
            'name' => 'Độ Kiếp',
            'icon' => '⚡👑',
            'color' => '#e040fb',
            'levelMin' => 81,
            'levelMax' => 999,
            'bonuses' => ['maxHp' => 10000, 'strength' => 1000, 'speed' => 800, 'defense' => 600, 'dexterity' => 600, 'maxEnergy' => 1500],
            'unlocks' => ['Ascension quests', 'Thiên Đạo final chapter', 'Legendary crafting'],
            'breakthroughCost' => ['energy' => 50, 'gold' => 200000],
            'trialMonster' => 'boss_demon',
            'failChance' => 65,
            'failHospitalSeconds' => 3600,
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
     * Get realm tier (1-8) for a given level.
     */
    public static function getRealmTier(int $level): int
    {
        $tier = 1;
        foreach (self::REALMS as $t => $r) {
            if ($level >= $r['levelMin']) $tier = $t;
        }
        return $tier;
    }

    /**
     * Get sub-stage (1-3) within a realm.
     */
    public static function getSubStage(int $level, int $tier): int
    {
        $realm = self::REALMS[$tier];
        $range = $realm['levelMax'] - $realm['levelMin'] + 1;
        $progress = $level - $realm['levelMin'];
        $third = max(1, ceil($range / 3));
        if ($progress >= $third * 2) return 3;
        if ($progress >= $third) return 2;
        return 1;
    }

    /**
     * Get full realm info for a player level + breakthrough status.
     */
    public static function getRealmInfo(int $level, int $currentRealmTier): array
    {
        $naturalTier = self::getRealmTier($level);
        $effectiveTier = min($naturalTier, $currentRealmTier);
        $subStage = self::getSubStage($level, $effectiveTier);

        $realm = self::REALMS[$effectiveTier];
        $nextRealm = self::REALMS[$effectiveTier + 1] ?? null;

        // Can breakthrough?
        $canBreakthrough = false;
        $breakthroughBlocked = false;
        if ($naturalTier > $currentRealmTier && $nextRealm) {
            $canBreakthrough = true;
        }
        if ($naturalTier > $currentRealmTier && !$nextRealm) {
            // Max realm reached
            $canBreakthrough = false;
        }

        return [
            'tier' => $effectiveTier,
            'name' => $realm['name'],
            'fullName' => $realm['name'] . ' ' . (self::SUB_STAGES[$subStage] ?? ''),
            'icon' => $realm['icon'],
            'color' => $realm['color'],
            'subStage' => $subStage,
            'subStageName' => self::SUB_STAGES[$subStage] ?? '',
            'bonuses' => $realm['bonuses'],
            'unlocks' => $realm['unlocks'],
            'canBreakthrough' => $canBreakthrough,
            'nextRealm' => $nextRealm ? [
                'name' => $nextRealm['name'],
                'icon' => $nextRealm['icon'],
                'levelMin' => $nextRealm['levelMin'],
                'cost' => $nextRealm['breakthroughCost'],
                'trialMonster' => $nextRealm['trialMonster'],
                'failChance' => $nextRealm['failChance'] ?? 0,
                'bonuses' => $nextRealm['bonuses'],
                'unlocks' => $nextRealm['unlocks'],
            ] : null,
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
            foreach (self::REALMS[$t]['bonuses'] as $stat => $val) {
                $cumulative[$stat] = ($cumulative[$stat] ?? 0) + $val;
            }
        }
        return $cumulative;
    }

    /**
     * Attempt breakthrough. Returns ['success' => bool, 'message' => string, 'newTier' => int]
     */
    public static function attemptBreakthrough(int $level, int $currentTier, int $playerGold, int $playerEnergy): array
    {
        $naturalTier = self::getRealmTier($level);
        $nextTier = $currentTier + 1;

        if ($currentTier >= $naturalTier) {
            return ['success' => false, 'message' => 'Cảnh giới hiện tại phù hợp với tu vi. Hãy tu luyện thêm!'];
        }

        if (!isset(self::REALMS[$nextTier])) {
            return ['success' => false, 'message' => 'Đã đạt cảnh giới tối cao!'];
        }

        $nextRealm = self::REALMS[$nextTier];
        $cost = $nextRealm['breakthroughCost'];

        if ($cost) {
            if ($playerGold < ($cost['gold'] ?? 0)) {
                return ['success' => false, 'message' => "Thiếu Linh Thạch! Cần {$cost['gold']} 💎"];
            }
            if ($playerEnergy < ($cost['energy'] ?? 0)) {
                return ['success' => false, 'message' => "Thiếu Linh Lực! Cần {$cost['energy']} 🔮"];
            }
        }

        // Trial monster check is handled by the route (combat first, then breakthrough)
        if ($nextRealm['trialMonster']) {
            return [
                'success' => false,
                'needsTrial' => true,
                'trialMonster' => $nextRealm['trialMonster'],
                'failChance' => $nextRealm['failChance'] ?? 0,
                'failHospitalSeconds' => $nextRealm['failHospitalSeconds'] ?? 0,
                'message' => "Phải chiến thắng Thiên Kiếp Thử Luyện trước khi đột phá lên {$nextRealm['name']}!",
            ];
        }

        // Failure chance roll (no trial monster realms)
        $failChance = $nextRealm['failChance'] ?? 0;
        if ($failChance > 0 && mt_rand(1, 100) <= $failChance) {
            return [
                'success' => false,
                'failed' => true,
                'failHospitalSeconds' => $nextRealm['failHospitalSeconds'] ?? 0,
                'message' => "⚡ Đột phá thất bại! Cơ thể không chịu nổi lực lượng cảnh giới mới, bị trọng thương!",
            ];
        }

        return [
            'success' => true,
            'newTier' => $nextTier,
            'cost' => $cost,
            'message' => "🌟 ĐỘT PHÁ THÀNH CÔNG! Chào mừng đến cảnh giới {$nextRealm['name']}!",
        ];
    }

    /**
     * Get all realms for display.
     */
    public static function getAllRealms(): array
    {
        $result = [];
        foreach (self::REALMS as $tier => $r) {
            $result[] = array_merge($r, ['tier' => $tier]);
        }
        return $result;
    }
}
