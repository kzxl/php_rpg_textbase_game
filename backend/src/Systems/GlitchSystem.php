<?php

namespace App\Systems;

use App\Models\Modifier;
use App\Models\Player;

/**
 * GlitchSystem — Hệ Thống Khai Thác Lỗi Thiên Đạo (Behavior Imprint & Heavenly Glitches)
 * 
 * Bám sát cốt truyện story.md & Hệ thống Sương Mù Tính Năng (Feature Fog of War):
 * - Tính năng bị phong ấn màn sương khi còn là phàm nhân cấp thấp.
 * - Chỉ mở khóa khi đạt Trúc Cơ hoặc kích hoạt biến cố thập tử nhất sinh.
 * - Dấu ấn có 3 cấp độ sương mù (Deep Fog, Partial Fog, Revealed) với các lời sấm truyền bí ẩn.
 * - Thế chiến đấu mở dần theo Cảnh Giới & Điểm Thấu Triệt.
 */
class GlitchSystem
{
    /**
     * Danh mục 10 Dấu Ấn Dị Biến & Lỗi Thiên Đạo
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
            'threshold' => 30,
            'riddle' => 'Khi đối mặt đại họa, có kẻ xem việc tháo chạy là nhục nhã, nhưng có kẻ lại thấy kẽ hở giữa thời gian và không gian...',
            'hint' => 'Tiếp tục nương theo bước chạy trốn để cảm ứng kẽ hở không gian (Bỏ chạy trong combat)...',
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
            'lore' => 'Sau vô số lần bị đánh gãy kinh mạch và tịnh dưỡng, cơ thể bạn xuất hiện hiện tượng chai sạn quy luật.',
            'action' => 'hospital_count',
            'threshold' => 15,
            'riddle' => 'Thịt nát xương tan, vô số lần bò dậy từ tay Diêm Vương... sinh tử luân hồi ắt có sơ hở.',
            'hint' => 'Kinh mạch vỡ nát nhiều lần tạo nên lớp giáp vô hình (Vào tịnh dưỡng hồi sức)...',
            'description' => '+25 Phòng Ngự (Defense), khi HP dưới 20% giảm 30% sát thương nhận vào.',
            'modifiers' => [
                ['type' => 'flat', 'stat' => 'defense', 'value' => 25, 'source' => 'glitch:undying_flesh'],
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
            'threshold' => 35,
            'riddle' => 'Người mù cầm kiếm, chém vào hư vô trăm lần... kiếm khí lại tự tìm đến chân lý.',
            'hint' => 'Chém hụt liên tục để lại dư ảnh thời không dẫn đường cho đòn đánh kế (Chém hụt trong combat)...',
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
            'lore' => 'Ngồi bất động quá lâu khiến Thiên Đạo lầm tưởng bạn là một tảng đá vô tri, gia tăng hấp thu linh khí thiên địa.',
            'action' => 'meditate_ticks',
            'threshold' => 80,
            'riddle' => 'Bất động như sơn, ngưng trệ hơi thở đến mức Thiên Đạo ngỡ là một tảng đá rêu phong...',
            'hint' => 'Tĩnh tâm tĩnh tọa rèn luyện gân cốt (Tọa thiền hoặc rèn luyện liên tục)...',
            'description' => 'Tốc độ hồi phục HP và Thể Lực tăng vĩnh viễn +35%.',
            'modifiers' => [
                ['type' => 'increase', 'stat' => 'staminaRegen', 'value' => 35, 'source' => 'glitch:meditate_stone'],
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
            'lore' => 'Trong ranh giới sinh tử, bản năng sống sót ép cơ thể phát ra tần số vượt ngưỡng giới hạn cảnh giới.',
            'action' => 'near_death_attacks',
            'threshold' => 25,
            'riddle' => 'Sinh mệnh leo lắt như ngọn đèn trước gió, nhưng lưỡi đao vẫn rực cháy cuồng bạo...',
            'hint' => 'Vung kiếm xuất chiêu khi lượng Khí Huyết tụt xuống dưới 25%...',
            'description' => 'Khi HP dưới 25%: +25% Tỷ lệ Bạo Kích và nhận 15% Hấp Huyết (Hồi máu theo sát thương gây ra).',
            'modifiers' => [
                ['type' => 'flat', 'stat' => 'strength', 'value' => 20, 'source' => 'glitch:death_gambit'],
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
            'threshold' => 30,
            'riddle' => 'Không một viên linh thạch trong túi, áo rách cơm thiu nhưng ý chí rèn luyện lay động càn khôn...',
            'hint' => 'Rèn luyện chỉ số khi túi không còn lấy 1 viên Linh Thạch...',
            'description' => 'Mỗi buổi rèn luyện tại Diễn Võ Trường tăng thêm 20% chỉ số cơ bản.',
            'modifiers' => [
                ['type' => 'increase', 'stat' => 'strength', 'value' => 8, 'source' => 'glitch:pauper_resolve'],
                ['type' => 'increase', 'stat' => 'defense', 'value' => 8, 'source' => 'glitch:pauper_resolve'],
            ],
            'special' => ['gymBonus' => 20],
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
            'threshold' => 60,
            'riddle' => 'Trảm yêu trừ ma hàng trăm dặm, máu thú nhuộm đỏ lưỡi kiếm, kinh mạch sinh linh đều hiển lộ...',
            'hint' => 'Tận diệt số lượng lớn yêu ma quỷ quái để nhìn thấu cấu trúc phòng ngự...',
            'description' => 'Mọi đòn đánh bỏ qua 20% Giáp Phòng Ngự của quái vật.',
            'modifiers' => [
                ['type' => 'increase', 'stat' => 'dexterity', 'value' => 15, 'source' => 'glitch:monster_insight'],
            ],
            'special' => ['armorPenetration' => 20],
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
            'threshold' => 30,
            'riddle' => 'Quy luật thế giới có kẽ nứt, kẻ nhìn thấu và chém nát nó sẽ bẻ gãy thiên cơ...',
            'hint' => 'Tập trung nhắm chuẩn và kích phá các Vết Nứt Thiên Đạo xuất hiện trên thân quái vật...',
            'description' => 'Tăng thêm 60% sát thương khi đánh trúng Vết Nứt Thiên Đạo và nhận gấp đôi điểm Thấu Triệt.',
            'modifiers' => [
                ['type' => 'more', 'stat' => 'strength', 'value' => 15, 'source' => 'glitch:weakpoint_striker'],
            ],
            'special' => ['weakpointDamageBonus' => 60],
        ],
        'clutch_master' => [
            'id' => 'clutch_master',
            'name' => 'Nghịch Cảnh Đoạt Mệnh',
            'title' => 'Tuyệt Cảnh Bá Vương',
            'icon' => '🩸',
            'color' => '#e11d48',
            'category' => 'combat',
            'lore' => 'Đứng trước cửa ngục Diêm La nhưng vẫn vung đòn đoạt mạng đối thủ, nghịch chuyển số mệnh.',
            'action' => 'clutch_kills',
            'threshold' => 10,
            'riddle' => 'Khí huyết khô cạn, sinh cơ sắp dập tắt nhưng vẫn đoạt mạng đại yêu...',
            'hint' => 'Chiến thắng và tiêu diệt yêu thú khi lượng Khí Huyết của bản thân dưới 10%...',
            'description' => '+30 Sức mạnh, tăng 15% sát thương tổng và 10% kháng sát thương.',
            'modifiers' => [
                ['type' => 'flat', 'stat' => 'strength', 'value' => 30, 'source' => 'glitch:clutch_master'],
                ['type' => 'increase', 'stat' => 'defense', 'value' => 10, 'source' => 'glitch:clutch_master'],
            ],
            'special' => ['clutchDamageBonus' => 15],
        ],
        'flawless_ascension' => [
            'id' => 'flawless_ascension',
            'name' => 'Đạo Tâm Bất Động',
            'title' => 'Thiên Đạo Vô Khuyết',
            'icon' => '✨👑',
            'color' => '#fbbf24',
            'category' => 'cultivation',
            'lore' => 'Liên tục vượt qua đại kiếp nạn mà đạo tâm không loạn, nhục thân không suy suyển, đạt trạng thái viên mãn.',
            'action' => 'breakthrough_streak',
            'threshold' => 3,
            'riddle' => 'Liên tục độ kiếp phá cảnh mà đạo tâm không loạn, nhục thân không suy suyển...',
            'hint' => 'Đột phá cảnh giới thành công liên tiếp 3 lần...',
            'description' => '+10% Toàn bộ thuộc tính chiến đấu (Sức mạnh, Phòng ngự, Tốc độ, Khéo léo).',
            'modifiers' => [
                ['type' => 'increase', 'stat' => 'strength', 'value' => 10, 'source' => 'glitch:flawless_ascension'],
                ['type' => 'increase', 'stat' => 'defense', 'value' => 10, 'source' => 'glitch:flawless_ascension'],
                ['type' => 'increase', 'stat' => 'speed', 'value' => 10, 'source' => 'glitch:flawless_ascension'],
                ['type' => 'increase', 'stat' => 'dexterity', 'value' => 10, 'source' => 'glitch:flawless_ascension'],
            ],
            'special' => ['allStatsBonus' => 10],
        ],
    ];

    /**
     * 3 Thế Chiến Đấu Cổ Điển — Có điều kiện cảnh giới & Thấu Triệt để khai mở
     */
    public const STANCES = [
        'breaker' => [
            'id' => 'breaker',
            'name' => 'Thế Phá Quy',
            'icon' => '⚡',
            'color' => '#ef4444',
            'requiredTier' => 1,
            'requiredInsight' => 0,
            'description' => 'Tập trung nhắm vào Vết Nứt Thiên Đạo. Tăng 60% tỷ lệ xuất hiện Vết Nứt và +20% sát thương bạo phá.',
            'weakpointBonus' => 1.6,
        ],
        'flow' => [
            'id' => 'flow',
            'name' => 'Thế Du Đạo',
            'icon' => '🌀',
            'color' => '#06b6d4',
            'requiredTier' => 3, // Kim Đan
            'requiredInsight' => 20,
            'unlockRequirement' => 'Cần Cảnh Giới Kim Đan (Tier 3) và 20 Điểm Thấu Triệt',
            'description' => 'Nương theo dòng chảy quy luật. +15% Né tránh, mỗi lần né thành công hồi 6 Thể Lực và phản chấn 25% sát thương.',
            'dodgeBonus' => 15,
        ],
        'glitch' => [
            'id' => 'glitch',
            'name' => 'Thế Nghịch Hành',
            'icon' => '🌌',
            'color' => '#a855f7',
            'requiredTier' => 4, // Nguyên Anh
            'requiredInsight' => 50,
            'unlockRequirement' => 'Cần Cảnh Giới Nguyên Anh (Tier 4) và 50 Điểm Thấu Triệt',
            'description' => 'Càng cận kề cái chết, quy luật nghịch biến càng bộc phát: Tăng 0.8% sát thương cho mỗi 1% Máu bị mất.',
            'lowHpScaling' => 0.8,
        ],
    ];

    /**
     * Kiểm tra tính năng Thiên Đạo Dị Biến đã thoát khỏi sương mù chưa
     */
    public static function isFeatureUnlocked(Player $player): array
    {
        $hasRealm = ($player->realmTier ?? 1) >= 2; // Trúc Cơ
        $hasInsight = ($player->glitchInsight ?? 0) >= 20;
        $hasAnyImprint = !empty($player->unlockedImprints);

        $unlocked = $hasRealm || $hasInsight || $hasAnyImprint;

        $realmDef = RealmSystem::getRealmDefinition($player->realmTier ?? 1);
        $realmName = $realmDef['name'] ?? 'Luyện Khí';

        return [
            'unlocked' => $unlocked,
            'requirements' => [
                [
                    'label' => 'Đột phá Cảnh Giới Trúc Cơ (Lv.11+)',
                    'met' => $hasRealm,
                    'current' => $realmName,
                ],
                [
                    'label' => 'Tích lũy 20 Điểm Thấu Triệt',
                    'met' => $hasInsight,
                    'current' => ($player->glitchInsight ?? 0) . '/20',
                ],
                [
                    'label' => 'Hoặc kích hoạt 1 Dấu Ấn Dị Biến trong giao chiến',
                    'met' => $hasAnyImprint,
                    'current' => count($player->unlockedImprints ?? []) . '/1',
                ],
            ],
            'hint' => 'Thiên Cơ Hỗn Loạn: Cần đạt cảnh giới Trúc Cơ hoặc kích hoạt biến cố nghịch thiên để cảm ứng kẽ hở quy luật.',
        ];
    }

    /**
     * Ghi nhận 1 hành vi của người chơi và kiểm tra mở khóa Dấu Ấn Thiên Đạo
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
                    $player->glitchInsight = ($player->glitchInsight ?? 0) + 30; // Thưởng 30 điểm Thấu Triệt
                    
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
     * Lấy thông tin tổng hợp kèm hệ thống sương mù tính năng cho Frontend HUD
     */
    public static function getPlayerGlitchStatus(Player $player): array
    {
        $featureStatus = self::isFeatureUnlocked($player);
        $unlocked = $player->unlockedImprints ?? [];
        $counters = $player->behaviorCounters ?? [];
        $stance = $player->activeStance ?? 'breaker';

        // Stances with unlock validation
        $stancesList = [];
        foreach (self::STANCES as $sId => $sDef) {
            $reqTier = $sDef['requiredTier'] ?? 1;
            $reqInsight = $sDef['requiredInsight'] ?? 0;
            $isStanceUnlocked = ($player->realmTier ?? 1) >= $reqTier && ($player->glitchInsight ?? 0) >= $reqInsight;

            $stancesList[$sId] = array_merge($sDef, [
                'isUnlocked' => $isStanceUnlocked,
            ]);
        }

        // Imprints with 3-tier Fog of War
        $imprintsList = [];
        foreach (self::IMPRINTS as $id => $imprint) {
            $isUnlocked = in_array($id, $unlocked, true);
            $action = $imprint['action'];
            $current = $counters[$action] ?? 0;
            $threshold = $imprint['threshold'];
            $pct = min(100, (int)round(($current / max(1, $threshold)) * 100));

            if ($isUnlocked) {
                // Tier 3: Đại Triệt Đại Ngộ (Revealed)
                $fogLevel = 'revealed';
                $name = $imprint['name'];
                $title = $imprint['title'];
                $icon = $imprint['icon'];
                $color = $imprint['color'];
                $lore = $imprint['lore'];
                $desc = $imprint['description'];
                $displayCurrent = $current;
                $displayThreshold = $threshold;
            } elseif ($pct >= 30) {
                // Tier 2: Chớm Ngộ (Partial Fog - 30% to 99%)
                $fogLevel = 'partial';
                $name = $imprint['name'] . ' (Chớm Ngộ)';
                $title = 'Đang cảm ứng...';
                $icon = $imprint['icon'];
                $color = '#9ca3af';
                $lore = $imprint['hint'];
                $desc = 'Kẽ hở đang hé mở. Hãy tiếp tục lặp lại hành vi để lĩnh ngộ hoàn toàn.';
                $displayCurrent = $current;
                $displayThreshold = $threshold;
            } else {
                // Tier 1: Sương Mù Bí Ẩn (Deep Fog - <30%)
                $fogLevel = 'fog';
                $name = '??? (Kẽ Hở Quy Luật)';
                $title = 'Vô Danh Ẩn Tích';
                $icon = '❓';
                $color = '#4b5563';
                $lore = $imprint['riddle'];
                $desc = 'Phong ấn trong màn sương hỗn độn. Hãy suy đoán qua lời sấm truyền và thử nghiệm hành vi.';
                $displayCurrent = '???';
                $displayThreshold = '???';
            }

            $imprintsList[] = [
                'id' => $id,
                'fogLevel' => $fogLevel,
                'name' => $name,
                'title' => $title,
                'icon' => $icon,
                'color' => $color,
                'lore' => $lore,
                'description' => $desc,
                'category' => $imprint['category'],
                'isUnlocked' => $isUnlocked,
                'progress' => [
                    'current' => $displayCurrent,
                    'threshold' => $displayThreshold,
                    'percent' => $pct,
                ],
            ];
        }

        return [
            'featureUnlocked' => $featureStatus['unlocked'],
            'featureDetails' => $featureStatus,
            'glitchInsight' => $player->glitchInsight ?? 0,
            'activeStance' => $stance,
            'stances' => $stancesList,
            'imprints' => $imprintsList,
            'unlockedCount' => count($unlocked),
            'totalCount' => count(self::IMPRINTS),
        ];
    }
}
