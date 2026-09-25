<?php

namespace App\Systems;

use App\Models\Modifier;
use App\Models\Player;

/**
 * GlitchSystem — Hệ Thống Khai Thác Lỗi Thiên Đạo (Behavior Imprint & Heavenly Glitches)
 * 
 * Bám sát cốt truyện story.md:
 * Hành vi lặp lại tạo "dấu ấn" -> mở khóa danh hiệu, nội tại, và lách luật quy chuẩn tu tiên.
 */
class GlitchSystem
{
    /**
     * Danh mục Dấu Ấn & Lỗi Thiên Đạo
     */
    public const IMPRINTS = [
        'flee_master' => [
            'id' => 'flee_master',
            'name' => 'Lăng Ba Hư Bộ',
            'title' => 'Kẻ Trốn Chạy',
            'icon' => '🏃',
            'color' => '#38bdf8',
            'category' => 'movement',
            'lore' => 'Bạn phát hiện quy luật không gian có kẽ hở khi bỏ chạy thục mạng. Thân pháp nhẹ đi như gió thoảng.',
            'action' => 'flee_count',
            'threshold' => 20,
            'description' => '+15 Thân Pháp (Speed), +5% Tỷ lệ Né Tránh (Dodge).',
            'modifiers' => [
                ['type' => 'flat', 'stat' => 'speed', 'value' => 15, 'source' => 'glitch:flee_master'],
                ['type' => 'increase', 'stat' => 'speed', 'value' => 5, 'source' => 'glitch:flee_master'],
            ],
            'special' => ['dodgeBonus' => 5],
        ],
        'undying_flesh' => [
            'id' => 'undying_flesh',
            'name' => 'Kim Thân Bất Diệt',
            'title' => 'Bất Tử Phế Nhân',
            'icon' => '🛡️',
            'color' => '#fbbf24',
            'category' => 'defense',
            'lore' => 'Sau nhiều lần bị đánh gãy kinh mạch và tịnh dưỡng, cơ thể bạn xuất hiện hiện tượng chai sạn quy luật.',
            'action' => 'hospital_count',
            'threshold' => 10,
            'description' => '+20 Phòng Ngự (Defense), khi HP dưới 20% giảm 30% sát thương nhận vào.',
            'modifiers' => [
                ['type' => 'flat', 'stat' => 'defense', 'value' => 20, 'source' => 'glitch:undying_flesh'],
                ['type' => 'increase', 'stat' => 'defense', 'value' => 5, 'source' => 'glitch:undying_flesh'],
            ],
            'special' => ['lowHpDamageReduction' => 30],
        ],
        'blind_blade' => [
            'id' => 'blind_blade',
            'name' => 'Mù Kiếm Khách',
            'title' => 'Kiếm Ý Vô Hình',
            'icon' => '👁️',
            'color' => '#c084fc',
            'category' => 'combat',
            'lore' => 'Chém hụt liên miên giúp bạn nhận ra vị trí không gian kiếm quét qua luôn để lại dư ảnh lệch lạc.',
            'action' => 'miss_attack_count',
            'threshold' => 25,
            'description' => 'Mỗi đòn đánh chém hụt sẽ tăng +30% Tỷ lệ trúng cho đòn đánh kế tiếp.',
            'modifiers' => [
                ['type' => 'increase', 'stat' => 'dexterity', 'value' => 10, 'source' => 'glitch:blind_blade'],
            ],
            'special' => ['hitRecovery' => 30],
        ],
        'meditate_stone' => [
            'id' => 'meditate_stone',
            'name' => 'Thiên Nhân Hợp Nhất',
            'title' => 'Cục Đá Tu Tiên',
            'icon' => '🧘',
            'color' => '#34d399',
            'category' => 'cultivation',
            'lore' => 'Ngồi bất động quá lâu khiến Thiên Đạo lầm tưởng bạn là một tảng đá vô tri, ngừng trừ thọ nguyên và gia tăng hấp thu linh khí.',
            'action' => 'meditate_ticks',
            'threshold' => 50,
            'description' => 'Hồi phục HP và Linh lực tăng vĩnh viễn +35%.',
            'modifiers' => [
                ['type' => 'increase', 'stat' => 'energyRegen', 'value' => 35, 'source' => 'glitch:meditate_stone'],
            ],
            'special' => ['regenBonus' => 35],
        ],
        'death_gambit' => [
            'id' => 'death_gambit',
            'name' => 'Tử Địa Hậu Sinh',
            'title' => 'Kẻ Cược Mạng',
            'icon' => '💀',
            'color' => '#f87171',
            'category' => 'combat',
            'lore' => 'Trong ranh giới sinh tử, bản năng sống sót ép cơ thể phát ra tần số vượt ngưỡng giới hạn của cảnh giới.',
            'action' => 'near_death_attacks',
            'threshold' => 15,
            'description' => 'Khi HP dưới 25%: +25% Tỷ lệ Bạo Kích và nhận 15% Hấp Huyết (Hồi phục theo sát thương gây ra).',
            'modifiers' => [
                ['type' => 'flat', 'stat' => 'strength', 'value' => 15, 'source' => 'glitch:death_gambit'],
            ],
            'special' => ['lowHpCritBonus' => 25, 'lowHpLifesteal' => 0.15],
        ],
        'pauper_resolve' => [
            'id' => 'pauper_resolve',
            'name' => 'Bạch Thủ Khởi Gia',
            'title' => 'Nghèo Mà Giỏi',
            'icon' => '🪙',
            'color' => '#facc15',
            'category' => 'training',
            'lore' => 'Không một đồng dính túi vẫn miệt mài rèn luyện, Thiên Đạo phát sinh lỗi tính toán kinh tế.',
            'action' => 'zero_gold_train',
            'threshold' => 20,
            'description' => 'Mỗi buổi rèn luyện tại Diễn Võ Trường tăng thêm 15% chỉ số cơ bản.',
            'modifiers' => [
                ['type' => 'increase', 'stat' => 'strength', 'value' => 5, 'source' => 'glitch:pauper_resolve'],
                ['type' => 'increase', 'stat' => 'defense', 'value' => 5, 'source' => 'glitch:pauper_resolve'],
            ],
            'special' => ['gymBonus' => 15],
        ],
        'monster_insight' => [
            'id' => 'monster_insight',
            'name' => 'Vạn Vật Chi Lý',
            'title' => 'Bách Hiểu Sinh',
            'icon' => '📜',
            'color' => '#a78bfa',
            'category' => 'exploration',
            'lore' => 'Quan sát và tiêu diệt nhiều yêu thú giúp nhận diện được lỗ hổng cấu tạo kinh mạch của dã thú.',
            'action' => 'monster_kills',
            'threshold' => 40,
            'description' => 'Mọi đòn đánh bỏ qua 15% Giáp Phòng Ngự của quái vật.',
            'modifiers' => [
                ['type' => 'increase', 'stat' => 'dexterity', 'value' => 10, 'source' => 'glitch:monster_insight'],
            ],
            'special' => ['armorPenetration' => 15],
        ],
        'weakpoint_striker' => [
            'id' => 'weakpoint_striker',
            'name' => 'Thiên Cơ Liệt Nhãn',
            'title' => 'Kẻ Bẻ Gãy Quy Luật',
            'icon' => '🌌',
            'color' => '#ec4899',
            'category' => 'glitch',
            'lore' => 'Đã quen với việc tìm vết nứt Thiên Đạo. Mỗi đòn tấn công vào vết nứt tạo ra phản ứng dây chuyền bộc phá.',
            'action' => 'weakpoint_hits',
            'threshold' => 20,
            'description' => 'Tăng thêm 50% sát thương khi đánh trúng Vết Nứt Thiên Đạo và nhận gấp đôi điểm Thấu Triệt.',
            'modifiers' => [
                ['type' => 'more', 'stat' => 'strength', 'value' => 10, 'source' => 'glitch:weakpoint_striker'],
            ],
            'special' => ['weakpointDamageBonus' => 50],
        ],
    ];

    /**
     * 3 Thế Chiến Đấu Cổ Điển (Combat Stances)
     */
    public const STANCES = [
        'breaker' => [
            'id' => 'breaker',
            'name' => 'Thế Phá Quy',
            'icon' => '⚡',
            'color' => '#ef4444',
            'description' => 'Tập trung nhắm vào Vết Nứt Thiên Đạo. Tăng 60% tỷ lệ xuất hiện Vết Nứt và +20% sát thương đòn đánh bạo phá.',
            'weakpointBonus' => 1.6,
        ],
        'flow' => [
            'id' => 'flow',
            'name' => 'Thế Du Đạo',
            'icon' => '🌀',
            'color' => '#06b6d4',
            'description' => 'Nương theo dòng chảy quy luật. +15% Né tránh, mỗi lần né thành công hồi 6 Linh Lực và phản chấn 25% sát thương.',
            'dodgeBonus' => 15,
        ],
        'glitch' => [
            'id' => 'glitch',
            'name' => 'Thế Nghịch Hành',
            'icon' => '🌌',
            'color' => '#a855f7',
            'description' => 'Càng cận kề cái chết, quy luật nghịch biến càng bộc phát: Tăng 0.8% sát thương cho mỗi 1% Máu bị mất.',
            'lowHpScaling' => 0.8,
        ],
    ];

    /**
     * Ghi nhận 1 hành vi của người chơi và kiểm tra mở khóa Dấu Ấn Thiên Đạo
     * 
     * @return array Danh sách các Dấu Ấn mới mở khóa trong lần gọi này
     */
    public static function trackBehavior(Player $player, string $action, int $amount = 1): array
    {
        if (!isset($player->behaviorCounters) || !is_array($player->behaviorCounters)) {
            $player->behaviorCounters = [];
        }
        if (!isset($player->unlockedImprints) || !is_array($player->unlockedImprints)) {
            $player->unlockedImprints = [];
        }

        $player->behaviorCounters[$action] = ($player->behaviorCounters[$action] ?? 0) + $amount;
        $currentCount = $player->behaviorCounters[$action];

        $newlyUnlocked = [];

        foreach (self::IMPRINTS as $id => $imprint) {
            if ($imprint['action'] === $action && !in_array($id, $player->unlockedImprints, true)) {
                if ($currentCount >= $imprint['threshold']) {
                    $player->unlockedImprints[] = $id;
                    $player->glitchInsight = ($player->glitchInsight ?? 0) + 25; // Thưởng 25 điểm Thấu Triệt
                    
                    // Nếu chưa có danh hiệu kích hoạt, tự động gán danh hiệu này
                    if (empty($player->activeTitle)) {
                        $player->activeTitle = $imprint['title'];
                    }

                    $newlyUnlocked[] = $imprint;
                }
            }
        }

        return $newlyUnlocked;
    }

    /**
     * Chuyển đổi các Dấu Ấn đã mở khóa thành danh sách Modifier cho StatEngine
     * 
     * @param array $unlockedImprintIds Danh sách ID dấu ấn ['flee_master', ...]
     * @return Modifier[]
     */
    public static function getImprintModifiers(array $unlockedImprintIds): array
    {
        $modifiers = [];
        foreach ($unlockedImprintIds as $id) {
            if (!isset(self::IMPRINTS[$id])) continue;
            $imprint = self::IMPRINTS[$id];
            foreach ($imprint['modifiers'] as $modData) {
                $modifiers[] = Modifier::fromArray($modData);
            }
        }
        return $modifiers;
    }

    /**
     * Lấy các Modifier bổ sung từ Thế Chiến Đấu (Stance)
     * 
     * @return Modifier[]
     */
    public static function getStanceModifiers(string $stance): array
    {
        $modifiers = [];
        if ($stance === 'flow') {
            $modifiers[] = Modifier::fromArray([
                'type' => 'increase',
                'stat' => 'speed',
                'value' => 10,
                'source' => 'stance:flow'
            ]);
        } elseif ($stance === 'breaker') {
            $modifiers[] = Modifier::fromArray([
                'type' => 'increase',
                'stat' => 'strength',
                'value' => 8,
                'source' => 'stance:breaker'
            ]);
        }
        return $modifiers;
    }

    /**
     * Lấy thông tin tổng hợp cho Frontend HUD và Profile
     */
    public static function getPlayerGlitchStatus(Player $player): array
    {
        $unlocked = $player->unlockedImprints ?? [];
        $counters = $player->behaviorCounters ?? [];
        $stance = $player->activeStance ?? 'breaker';

        $imprintsList = [];
        foreach (self::IMPRINTS as $id => $imprint) {
            $isUnlocked = in_array($id, $unlocked, true);
            $action = $imprint['action'];
            $current = $counters[$action] ?? 0;
            $threshold = $imprint['threshold'];
            $pct = min(100, (int)round(($current / max(1, $threshold)) * 100));

            $imprintsList[] = [
                'id' => $id,
                'name' => $imprint['name'],
                'title' => $imprint['title'],
                'icon' => $imprint['icon'],
                'color' => $imprint['color'],
                'lore' => $imprint['lore'],
                'description' => $imprint['description'],
                'category' => $imprint['category'],
                'isUnlocked' => $isUnlocked,
                'progress' => [
                    'current' => $current,
                    'threshold' => $threshold,
                    'percent' => $pct,
                ],
            ];
        }

        return [
            'glitchInsight' => $player->glitchInsight ?? 0,
            'activeStance' => $stance,
            'stances' => self::STANCES,
            'imprints' => $imprintsList,
            'unlockedCount' => count($unlocked),
            'totalCount' => count(self::IMPRINTS),
        ];
    }
}
