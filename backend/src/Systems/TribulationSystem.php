<?php

namespace App\Systems;

use App\Models\Player;
use App\Core\StatEngine;
use App\Core\GameDataRepository;

/**
 * TribulationSystem — Hệ Thống Đột Phá Lôi Kiếp (Heavenly Tribulation Survival)
 * Thiết kế chuẩn MDG: Hardcore Xianxia Ascension & Survival Ordeal.
 *
 * Người chơi phải vượt qua từng đợt Lôi Kiếp giáng xuống bằng chính
 * chỉ số Phòng ngự, Giáp, Kháng tính, Thân pháp, và Hộ Thể Hào Quang (Mana Reservation).
 */
class TribulationSystem
{
    public const TRIBULATION_CONFIGS = [
        2 => [
            'name' => 'Tam Trọng Địa Sát Lôi Kiếp',
            'waves' => 3,
            'titles' => [
                1 => 'Phong Lôi Khởi Động',
                2 => 'Cửu U Địa Hỏa Lôi',
                3 => 'Trúc Cơ Thần Lôi'
            ],
            'basePct' => [1 => 0.28, 2 => 0.38, 3 => 0.52],
            'desc' => 'Thiên Lôi 3 đợt thử thách rèn đúc kinh mạch phàm nhân hóa Trúc Cơ.'
        ],
        3 => [
            'name' => 'Lục Trọng Tử Tiêu Thần Lôi',
            'waves' => 6,
            'titles' => [
                1 => 'Tử Lôi Giáng Thế',
                2 => 'Thanh Lôi Phá Thể',
                3 => 'Xích Hỏa Lôi Đình',
                4 => 'Bạch Hổ Canh Kim Lôi',
                5 => 'Huyền Vũ Chích Thủy Lôi',
                6 => 'Tử Tiêu Cực Hạn Lôi'
            ],
            'basePct' => [1 => 0.22, 2 => 0.28, 3 => 0.35, 4 => 0.42, 5 => 0.48, 6 => 0.58],
            'desc' => '6 đợt Tử Tiêu Lôi cô đọng đan điền thành Kim Đan bất hoại.'
        ],
        4 => [
            'name' => 'Cửu Cửu Hỗn Độn Kiếp (I)',
            'waves' => 9,
            'titles' => [
                1 => 'Sơ Khởi Hỗn Độn',
                2 => 'Âm Dương Nghịch Chuyển',
                3 => 'Tam Hoa Tụ Đỉnh Lôi',
                4 => 'Ngũ Khí Triều Nguyên Lôi',
                5 => 'Lục Phủ Thần Lôi',
                6 => 'Thất Sát Lôi Kiếp',
                7 => 'Bát Quái Phong Lôi',
                8 => 'Cửu Cực Diệt Thế',
                9 => 'Nguyên Anh Hóa Thần Kiếp'
            ],
            'basePct' => [1 => 0.20, 2 => 0.25, 3 => 0.30, 4 => 0.36, 5 => 0.42, 6 => 0.48, 7 => 0.55, 8 => 0.62, 9 => 0.72],
            'desc' => '9 đợt Hỗn Độn Lôi phá toái Kim Đan, đản sinh Nguyên Anh chân thân.'
        ],
        5 => [
            'name' => 'Cửu Cửu Hỗn Độn Kiếp (II)',
            'waves' => 9,
            'titles' => [
                1 => 'Vấn Đạo Lôi',
                2 => 'Trảm Nghiệp Lôi',
                3 => 'Diệt Tình Lôi',
                4 => 'Thái Ất Thần Lôi',
                5 => 'Bích Hải Triều Sinh Lôi',
                6 => 'Hư Không Liệt Chấn Lôi',
                7 => 'Đô Thiên Thần Lôi',
                8 => 'Chấn Càn Khôn Kiếp',
                9 => 'Hóa Thần Vô Thượng Lôi'
            ],
            'basePct' => [1 => 0.25, 2 => 0.30, 3 => 0.36, 4 => 0.42, 5 => 0.48, 6 => 0.55, 7 => 0.62, 8 => 0.70, 9 => 0.82],
            'desc' => '9 đợt thiên lôi tôi luyện thần thức, câu thông thiên địa nhập Hóa Thần.'
        ]
    ];

    /**
     * Get preview config for a target realm tier.
     */
    public static function getTribulationConfig(int $targetTier): array
    {
        if (isset(self::TRIBULATION_CONFIGS[$targetTier])) {
            return self::TRIBULATION_CONFIGS[$targetTier];
        }

        // Procedural High Realms (Tier 6+)
        $waves = 9;
        $titles = [];
        $basePct = [];
        for ($w = 1; $w <= $waves; $w++) {
            $titles[$w] = "Đạo Kiếp Đệ {$w} Trọng — Quy Luật Thần Lôi";
            $basePct[$w] = 0.25 + ($w * 0.06);
        }

        return [
            'name' => "Cửu Trọng Diệt Thế Thiên Kiếp (Tầng {$targetTier})",
            'waves' => $waves,
            'titles' => $titles,
            'basePct' => $basePct,
            'desc' => "Thiên Kiếp Quy Luật thượng cổ thử thách cảnh giới Đỉnh Phong Tầng {$targetTier}."
        ];
    }

    /**
     * Simulate and resolve Heavenly Tribulation survival.
     */
    public static function simulateTribulation(Player $player, int $targetTier): array
    {
        $config = self::getTribulationConfig($targetTier);
        $waves = $config['waves'];
        $titles = $config['titles'];
        $basePct = $config['basePct'];

        $stats = $player->getFinalStats();
        $maxHp = max(1, $player->maxHp);
        $currentHp = $player->currentHp > 0 ? $player->currentHp : $maxHp;
        $currentEnergy = $player->currentEnergy;

        $defense = $stats['defense'] ?? 10;
        $speed = $stats['speed'] ?? 10;
        $dexterity = $stats['dexterity'] ?? 10;

        // Base defense reduction (max 60% mitigation against raw lightning force)
        $defRedPct = min(60, (int)round(StatEngine::calcDamageReduction($defense) * 0.75));

        // Active Auras check
        $hasGoldenBell = in_array('ho_the_kim_chung', $player->activeAuras ?? [], true);
        $hasGaleStride = in_array('than_hanh_bo', $player->activeAuras ?? [], true);

        // Medicine emergency auto-consumption (max 1 during trial)
        $medicineUsed = null;
        $medicineStock = $player->medicines;

        $waveLogs = [];
        $survived = true;
        $wavesSurvived = 0;

        for ($w = 1; $w <= $waves; $w++) {
            $waveName = $titles[$w] ?? "Đạo Sét Thứ {$w}";
            $pct = $basePct[$w] ?? (0.25 + ($w * 0.05));

            // Escalating raw damage based on Player Max HP and Target Tier
            $rawDmg = (int)round($maxHp * $pct * (1 + ($targetTier * 0.05)));

            // 1. Defense mitigation
            $defMitigated = (int)round($rawDmg * ($defRedPct / 100));
            $dmgAfterDef = max(1, $rawDmg - $defMitigated);

            // 2. Thân pháp / Né tránh hóa giải (Dodge)
            $dodgeChance = min(40, (int)round(StatEngine::calcDodgeChance($dexterity, $speed) * 0.5));
            if ($hasGaleStride) $dodgeChance += 10;
            $dodged = (mt_rand(1, 100) <= $dodgeChance);
            $dodgeMitigated = 0;
            if ($dodged) {
                $dodgeMitigated = (int)round($dmgAfterDef * 0.40); // Thân pháp lướt né giảm 40% lực xung kích
                $dmgAfterDef = max(1, $dmgAfterDef - $dodgeMitigated);
            }

            // 3. Tâm pháp Hộ Thể Kim Chung (Golden Bell Aura)
            $auraMitigated = 0;
            if ($hasGoldenBell) {
                $auraMitigated = (int)round($dmgAfterDef * 0.20); // Kim Chung hấp thu 20%
                $dmgAfterDef = max(1, $dmgAfterDef - $auraMitigated);
            }

            // 4. Đan Điền Linh Lực Hộ Thể (Qi Shield)
            $qiShieldAbsorbed = 0;
            if ($currentEnergy > 5) {
                // Tiêu hao tối đa 15 Linh Lực mỗi đợt, mỗi LL chặn 2.5 HP
                $usableSpend = min(15, (int)floor($currentEnergy * 0.3));
                $absorbedPotential = (int)round($usableSpend * 2.5);
                $qiShieldAbsorbed = min($absorbedPotential, (int)round($dmgAfterDef * 0.45));
                $energyCost = (int)ceil($qiShieldAbsorbed / 2.5);
                $currentEnergy = max(0, $currentEnergy - $energyCost);
                $dmgAfterDef = max(1, $dmgAfterDef - $qiShieldAbsorbed);
            }

            $netDamage = $dmgAfterDef;
            $hpBefore = $currentHp;
            $currentHp -= $netDamage;

            // 5. Cấp cứu đan dược nếu còn sống nhưng HP < 20%
            $medLog = null;
            if ($currentHp > 0 && ($currentHp / $maxHp) <= 0.20 && !$medicineUsed) {
                // Check if has healing medicine in stock
                foreach (['hoi_luc_dan', 'kim_dan', 'giai_doc_dan'] as $mKey) {
                    if (($player->medicines[$mKey] ?? 0) > 0) {
                        $player->medicines[$mKey]--;
                        $medicineUsed = $mKey;
                        $healAmount = (int)round($maxHp * 0.30);
                        $currentHp = min($maxHp, $currentHp + $healAmount);
                        $medLog = "💊 Kịp thời cắn vỡ 1 viên [{$mKey}], kinh mạch ngưng kết: +{$healAmount} HP!";
                        break;
                    }
                }
            }

            $waveLogItem = [
                'waveNumber' => $w,
                'waveName' => $waveName,
                'rawDamage' => $rawDmg,
                'defMitigated' => $defMitigated,
                'dodged' => $dodged,
                'dodgeMitigated' => $dodgeMitigated,
                'auraMitigated' => $auraMitigated,
                'qiShieldAbsorbed' => $qiShieldAbsorbed,
                'netDamage' => $netDamage,
                'hpBefore' => $hpBefore,
                'hpAfter' => max(0, $currentHp),
                'energyLeft' => $currentEnergy,
                'medicineUsed' => $medLog,
                'survived' => ($currentHp > 0)
            ];

            $waveLogs[] = $waveLogItem;

            if ($currentHp <= 0) {
                $survived = false;
                $currentHp = 0;
                break;
            }

            $wavesSurvived++;
        }

        return [
            'survived' => $survived,
            'tribulationName' => $config['name'],
            'desc' => $config['desc'],
            'totalWaves' => $waves,
            'wavesSurvived' => $wavesSurvived,
            'waveLogs' => $waveLogs,
            'finalHp' => max(0, $currentHp),
            'finalEnergy' => $currentEnergy,
            'maxHp' => $maxHp,
            'targetTier' => $targetTier,
            'defenseReductionPct' => $defRedPct,
            'hasGoldenBell' => $hasGoldenBell,
            'hasGaleStride' => $hasGaleStride,
            'medicineConsumed' => $medicineUsed
        ];
    }
}
