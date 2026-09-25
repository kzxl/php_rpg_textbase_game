<?php

namespace App\Systems;

use App\Core\Database;

/**
 * Monster Mastery System (Thông Thạo Quái Vật)
 * Replaces legacy passive education with action-driven bestiary lore and combat progression.
 *
 * Tier Progression:
 * 0★ Vô Tri (0 kills): Sương mù, ẩn chỉ số thực.
 * 1★ Chớm Ngộ (5 kills): Hiển thị chi tiết HP, công, thủ, kháng tính.
 * 2★ Thuần Thục (20 kills): +10% Sát thương lên loài này.
 * 3★ Đại Thành (50 kills): -10% Sát thương nhận vào, +15% Tỷ lệ rớt đồ.
 * 4★ Khắc Chế (100 kills): +20% Sát thương, x2 Tỷ lệ xuất hiện Vết Nứt Thiên Đạo.
 * 5★ Tuyệt Diệt (250 kills): +25% Sát thương, +30% Drop, 10% Trảm Sát (Execute khi HP <= 15%).
 */
class MonsterMasterySystem
{
    public const TIERS = [
        0 => [
            'tier' => 0,
            'name' => 'Vô Tri',
            'stars' => '☆☆☆☆☆',
            'starCount' => 0,
            'minKills' => 0,
            'damageBonus' => 0,
            'damageReduction' => 0,
            'dropBonus' => 0,
            'weakpointBonus' => 1.0,
            'canExecute' => false,
            'revealStats' => false,
            'desc' => 'Chưa rõ tập tính. Thông tin quái vật bị sương mù che phủ.',
            'badgeColor' => '#6b7280'
        ],
        1 => [
            'tier' => 1,
            'name' => 'Chớm Ngộ',
            'stars' => '★☆☆☆☆',
            'starCount' => 1,
            'minKills' => 5,
            'damageBonus' => 0,
            'damageReduction' => 0,
            'dropBonus' => 0,
            'weakpointBonus' => 1.0,
            'canExecute' => false,
            'revealStats' => true,
            'desc' => 'Hiển thị toàn bộ chỉ số thực: Khí huyết, công thủ và kháng tính ngũ hành.',
            'badgeColor' => '#3b82f6'
        ],
        2 => [
            'tier' => 2,
            'name' => 'Thuần Thục',
            'stars' => '★★☆☆☆',
            'starCount' => 2,
            'minKills' => 20,
            'damageBonus' => 10,
            'damageReduction' => 0,
            'dropBonus' => 0,
            'weakpointBonus' => 1.0,
            'canExecute' => false,
            'revealStats' => true,
            'desc' => '+10% Sát thương gây ra khi giao đấu với loài quái này.',
            'badgeColor' => '#10b981'
        ],
        3 => [
            'tier' => 3,
            'name' => 'Đại Thành',
            'stars' => '★★★☆☆',
            'starCount' => 3,
            'minKills' => 50,
            'damageBonus' => 10,
            'damageReduction' => 10,
            'dropBonus' => 15,
            'weakpointBonus' => 1.0,
            'canExecute' => false,
            'revealStats' => true,
            'desc' => '-10% Sát thương nhận vào, +15% Tỷ lệ rớt vật phẩm quý hiếm.',
            'badgeColor' => '#8b5cf6'
        ],
        4 => [
            'tier' => 4,
            'name' => 'Khắc Chế',
            'stars' => '★★★★☆',
            'starCount' => 4,
            'minKills' => 100,
            'damageBonus' => 20,
            'damageReduction' => 10,
            'dropBonus' => 15,
            'weakpointBonus' => 2.0,
            'canExecute' => false,
            'revealStats' => true,
            'desc' => '+20% Sát thương, gấp đôi tỷ lệ xuất hiện Vết Nứt Thiên Đạo (Weakpoint).',
            'badgeColor' => '#f59e0b'
        ],
        5 => [
            'tier' => 5,
            'name' => 'Tuyệt Diệt',
            'stars' => '★★★★★',
            'starCount' => 5,
            'minKills' => 250,
            'damageBonus' => 25,
            'damageReduction' => 10,
            'dropBonus' => 30,
            'weakpointBonus' => 2.0,
            'canExecute' => true,
            'revealStats' => true,
            'desc' => '+25% Sát thương, +30% Drop, 10% cơ hội Trảm Sát lập tức khi quái vật dưới 15% HP.',
            'badgeColor' => '#ef4444'
        ]
    ];

    /**
     * Calculate tier based on kill count.
     */
    public static function calculateTier(int $kills): int
    {
        if ($kills >= 250) return 5;
        if ($kills >= 100) return 4;
        if ($kills >= 50) return 3;
        if ($kills >= 20) return 2;
        if ($kills >= 5) return 1;
        return 0;
    }

    /**
     * Get single monster mastery for player.
     */
    public static function getMastery(string $playerId, string $monsterId): array
    {
        $pdo = Database::pdo();
        $stmt = $pdo->prepare("SELECT * FROM player_monster_mastery WHERE player_id = ? AND monster_id = ?");
        $stmt->execute([$playerId, $monsterId]);
        $row = $stmt->fetch();

        $kills = $row ? (int)$row['kills'] : 0;
        $tier = self::calculateTier($kills);
        $tierInfo = self::TIERS[$tier];

        $nextTier = min(5, $tier + 1);
        $nextTierReq = self::TIERS[$nextTier]['minKills'];
        $prevTierReq = self::TIERS[$tier]['minKills'];

        $tierSpan = max(1, $nextTierReq - $prevTierReq);
        $tierProgress = $tier >= 5 ? 100 : min(100, round((($kills - $prevTierReq) / $tierSpan) * 100));

        return [
            'playerId' => $playerId,
            'monsterId' => $monsterId,
            'kills' => $kills,
            'tier' => $tier,
            'tierName' => $tierInfo['name'],
            'stars' => $tierInfo['stars'],
            'starCount' => $tierInfo['starCount'],
            'desc' => $tierInfo['desc'],
            'badgeColor' => $tierInfo['badgeColor'],
            'tierInfo' => $tierInfo,
            'nextTier' => $nextTier,
            'nextTierReq' => $nextTierReq,
            'tierProgress' => $tierProgress,
            'isMaxTier' => ($tier >= 5),
            'firstKilledAt' => $row ? (int)$row['first_killed_at'] : 0,
            'lastKilledAt' => $row ? (int)$row['last_killed_at'] : 0,
        ];
    }

    /**
     * Get combat bonuses for a player vs monster.
     */
    public static function getCombatBonuses(string $playerId, string $monsterId): array
    {
        $mastery = self::getMastery($playerId, $monsterId);
        $info = $mastery['tierInfo'];

        return [
            'tier' => $mastery['tier'],
            'kills' => $mastery['kills'],
            'damageBonusPct' => $info['damageBonus'],
            'damageReductionPct' => $info['damageReduction'],
            'dropBonusPct' => $info['dropBonus'],
            'weakpointMul' => $info['weakpointBonus'],
            'canExecute' => $info['canExecute'],
            'revealStats' => $info['revealStats'],
            'tierName' => $info['name'],
            'stars' => $info['stars']
        ];
    }

    /**
     * Record a kill for a player vs monster.
     * Updates DB and returns tier progression status.
     */
    public static function recordKill(string $playerId, string $monsterId): array
    {
        $pdo = Database::pdo();
        $now = time();

        // Check previous mastery
        $prevMastery = self::getMastery($playerId, $monsterId);
        $oldTier = $prevMastery['tier'];

        $sql = "
            INSERT INTO player_monster_mastery (player_id, monster_id, kills, mastery_tier, first_killed_at, last_killed_at, created_at, updated_at)
            VALUES (?, ?, 1, 0, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                kills = kills + 1,
                last_killed_at = VALUES(last_killed_at),
                updated_at = VALUES(updated_at)
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$playerId, $monsterId, $now, $now, $now, $now]);

        // Calculate new tier
        $newMastery = self::getMastery($playerId, $monsterId);
        $newTier = $newMastery['tier'];

        // Update mastery_tier column if changed
        if ($newTier !== $oldTier) {
            $pdo->prepare("UPDATE player_monster_mastery SET mastery_tier = ? WHERE player_id = ? AND monster_id = ?")
                ->execute([$newTier, $playerId, $monsterId]);
        }

        return [
            'tierUp' => ($newTier > $oldTier),
            'oldTier' => $oldTier,
            'newTier' => $newTier,
            'mastery' => $newMastery
        ];
    }

    /**
     * Get all masteries for a player.
     * Returns an associative array [monster_id => mastery_data].
     */
    public static function getAllPlayerMastery(string $playerId): array
    {
        $pdo = Database::pdo();
        $stmt = $pdo->prepare("SELECT * FROM player_monster_mastery WHERE player_id = ?");
        $stmt->execute([$playerId]);
        $rows = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        $results = [];
        foreach ($rows as $row) {
            $mId = $row['monster_id'];
            $kills = (int)$row['kills'];
            $tier = self::calculateTier($kills);
            $tierInfo = self::TIERS[$tier];

            $nextTier = min(5, $tier + 1);
            $nextTierReq = self::TIERS[$nextTier]['minKills'];
            $prevTierReq = self::TIERS[$tier]['minKills'];
            $tierSpan = max(1, $nextTierReq - $prevTierReq);
            $tierProgress = $tier >= 5 ? 100 : min(100, round((($kills - $prevTierReq) / $tierSpan) * 100));

            $results[$mId] = [
                'playerId' => $playerId,
                'monsterId' => $mId,
                'kills' => $kills,
                'tier' => $tier,
                'tierName' => $tierInfo['name'],
                'stars' => $tierInfo['stars'],
                'starCount' => $tierInfo['starCount'],
                'desc' => $tierInfo['desc'],
                'badgeColor' => $tierInfo['badgeColor'],
                'tierInfo' => $tierInfo,
                'nextTier' => $nextTier,
                'nextTierReq' => $nextTierReq,
                'tierProgress' => $tierProgress,
                'isMaxTier' => ($tier >= 5),
                'firstKilledAt' => (int)$row['first_killed_at'],
                'lastKilledAt' => (int)$row['last_killed_at'],
            ];
        }

        return $results;
    }
}
