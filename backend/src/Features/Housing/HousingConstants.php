<?php

declare(strict_types=1);

namespace App\Features\Housing;

/**
 * Housing system constants: Tiers, Herbs, Formations and Economic Balance.
 */
class HousingConstants
{
    /**
     * Tiers definition for Player Cave Abodes (Động Phủ)
     */
    public const TIERS = [
        1 => [
            'name' => 'Thảo Lư',
            'cost' => 500,
            'hpRegen' => 2,            // +2 HP per 10s tick
            'gardenSlots' => 1,
            'breakthroughBonus' => 2,  // +2% breakthrough chance
            'description' => 'Căn nhà tranh đơn sơ bên suối linh tuyền, linh khí ban sơ.',
        ],
        2 => [
            'name' => 'Mộc Ốc',
            'cost' => 2500,
            'hpRegen' => 5,            // +5 HP per 10s tick
            'gardenSlots' => 2,
            'breakthroughBonus' => 4,  // +4% breakthrough chance
            'description' => 'Nhà gỗ linh sam kiên cố, có khoảnh linh điền màu mỡ.',
        ],
        3 => [
            'name' => 'Thạch Các',
            'cost' => 10000,
            'hpRegen' => 10,           // +10 HP per 10s tick
            'gardenSlots' => 3,
            'breakthroughBonus' => 6,  // +6% breakthrough chance
            'description' => 'Tòa thạch các ngự trên sườn thanh sơn, thông thấu địa mạch.',
        ],
        4 => [
            'name' => 'Linh Phủ',
            'cost' => 40000,
            'hpRegen' => 20,           // +20 HP per 10s tick
            'gardenSlots' => 4,
            'breakthroughBonus' => 8,  // +8% breakthrough chance
            'description' => 'Phủ đệ linh sơn hùng vĩ, mây mù lượn lờ, tụ tập linh vận thiên địa.',
        ],
        5 => [
            'name' => 'Thiên Cung',
            'cost' => 150000,
            'hpRegen' => 40,           // +40 HP per 10s tick
            'gardenSlots' => 5,
            'breakthroughBonus' => 10, // +10% breakthrough chance
            'description' => 'Cung điện bồng bềnh trong mây, phong cảnh tuyệt thế vô song.',
        ],
    ];

    /**
     * Dược Viên: Cultivatable medicinal herbs and their growth cycle
     */
    public const GARDEN_HERBS = [
        'linh_thao' => [
            'id' => 'linh_thao',
            'name' => 'Linh Thảo',
            'tier' => 1,
            'growthTime' => 180, // 3 minutes for quick test & gameplay pacing
            'qty' => [2, 4],
            'description' => 'Cỏ linh khí nhạt, nền tảng của Luyện Đan sơ cấp.',
        ],
        'huyet_thao' => [
            'id' => 'huyet_thao',
            'name' => 'Huyết Thảo',
            'tier' => 2,
            'growthTime' => 360, // 6 minutes
            'qty' => [2, 3],
            'description' => 'Cỏ đỏ như máu, chứa sinh khí dương dồi dào bồi bổ khí huyết.',
        ],
        'thanh_linh_thao' => [
            'id' => 'thanh_linh_thao',
            'name' => 'Thanh Linh Thảo',
            'tier' => 2,
            'growthTime' => 600, // 10 minutes
            'qty' => [2, 3],
            'description' => 'Linh thảo thanh sạch, nâng cao dược lực khi luyện đan.',
        ],
        'kim_linh_thao' => [
            'id' => 'kim_linh_thao',
            'name' => 'Kim Linh Thảo',
            'tier' => 3,
            'growthTime' => 1200, // 20 minutes
            'qty' => [1, 2],
            'description' => 'Linh thảo hấp thụ tinh quang nhật nguyệt, cực kỳ quý hiếm.',
        ],
        'thien_linh_thao' => [
            'id' => 'thien_linh_thao',
            'name' => 'Thiên Linh Thảo',
            'tier' => 4,
            'growthTime' => 2400, // 40 minutes
            'qty' => [1, 2],
            'description' => 'Tuyệt phẩm thảo mộc, tụ tập tinh hoa đại đạo vũ trụ.',
        ],
    ];

    /**
     * Hộ Phủ Trận Pháp (Cave Abode Defensive & Auxiliary Formations)
     */
    public const FORMATIONS = [
        'tu_linh_tran' => [
            'id' => 'tu_linh_tran',
            'name' => 'Tụ Linh Trận',
            'description' => 'Trận pháp tụ tập thiên địa linh khí, tăng tốc hồi phục Linh Lực mỗi chu kỳ.',
            'requiredTier' => 2,
            'maxLevel' => 5,
            'upgradeCosts' => [3000, 7500, 15000, 30000, 60000],
            'dailyCosts'   => [30, 75, 150, 300, 600],
            'bonusPerLevel' => ['energyRegenBonus' => 2], // +2 Energy per tick per level
        ],
        'ho_the_tran' => [
            'id' => 'ho_the_tran',
            'name' => 'Hộ Thể Trận',
            'description' => 'Trận pháp hộ thể dưỡng sinh, tăng tốc hồi phục Khí Huyết mỗi chu kỳ.',
            'requiredTier' => 2,
            'maxLevel' => 5,
            'upgradeCosts' => [4000, 10000, 22000, 45000, 90000],
            'dailyCosts'   => [40, 100, 220, 450, 900],
            'bonusPerLevel' => ['hpRegenBonus' => 5], // +5 HP per tick per level
        ],
        'linh_dien_tran' => [
            'id' => 'linh_dien_tran',
            'name' => 'Linh Điền Trận',
            'description' => 'Trận pháp gia tốc Dược Viên, rút ngắn thời gian sinh trưởng dược thảo.',
            'requiredTier' => 3,
            'maxLevel' => 3,
            'upgradeCosts' => [5000, 15000, 35000],
            'dailyCosts'   => [50, 150, 350],
            'bonusPerLevel' => ['gardenSpeedBonus' => 0.15], // -15% growth time per level (up to 45%)
        ],
        'thu_linh_tran' => [
            'id' => 'thu_linh_tran',
            'name' => 'Thủ Linh Trận',
            'description' => 'Trận pháp củng cố đan điền, gia tăng giới hạn Thể Lực tối đa của đạo hữu.',
            'requiredTier' => 3,
            'maxLevel' => 3,
            'upgradeCosts' => [6000, 18000, 40000],
            'dailyCosts'   => [60, 180, 400],
            'bonusPerLevel' => ['staminaMaxBonus' => 15], // +15 Max Stamina per level (up to +45)
        ],
    ];
}
