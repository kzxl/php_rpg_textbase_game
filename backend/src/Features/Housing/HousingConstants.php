<?php

declare(strict_types=1);

namespace App\Features\Housing;

/**
 * Housing system constants: 10 Tiers, Garden Herbs, Formations and Economic Balance.
 * Extended for unlimited Xianxia & Torn City-style progression.
 */
class HousingConstants
{
    /**
     * 10 Tiers definition for Player Cave Abodes (Động Phủ)
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
        6 => [
            'name' => 'Tử Tiêu Điện',
            'cost' => 500000,
            'hpRegen' => 75,           // +75 HP per 10s tick
            'gardenSlots' => 6,
            'breakthroughBonus' => 13, // +13% breakthrough chance
            'description' => 'Điện ngọc đúc từ Tử Tiêu Linh Thạch, tử khí ngút ngàn, đạo vận tường hòa.',
        ],
        7 => [
            'name' => 'Huyền Đô Tiên Đảo',
            'cost' => 1800000,
            'hpRegen' => 120,          // +120 HP per 10s tick
            'gardenSlots' => 7,
            'breakthroughBonus' => 16, // +16% breakthrough chance
            'description' => 'Phù không tiên đảo ngự chín tầng mây, thông thấu thiên địa, linh vụ lượn lờ.',
        ],
        8 => [
            'name' => 'Thần Tiêu Động Thiên',
            'cost' => 6000000,
            'hpRegen' => 200,          // +200 HP per 10s tick
            'gardenSlots' => 8,
            'breakthroughBonus' => 20, // +20% breakthrough chance
            'description' => 'Độc lập tiểu thế giới nội hàm càn khôn, linh khí nồng đặc kết tinh thành hà lưu.',
        ],
        9 => [
            'name' => 'Thái Hư Tiên Phủ',
            'cost' => 20000000,
            'hpRegen' => 350,          // +350 HP per 10s tick
            'gardenSlots' => 9,
            'breakthroughBonus' => 25, // +25% breakthrough chance
            'description' => 'Tiên phủ ngự tại khe nứt Thái Hư cổ xưa, hấp thu hỗn độn nguyên khí bất tận.',
        ],
        10 => [
            'name' => 'Hỗn Độn Tiên Cung',
            'cost' => 60000000,
            'hpRegen' => 600,          // +600 HP per 10s tick
            'gardenSlots' => 10,
            'breakthroughBonus' => 30, // +30% breakthrough chance
            'description' => 'Vô thượng thánh địa ngưng tụ từ Hỗn Độn Sơ Khí, siêu thoát ngũ hành luân hồi, duy ngã độc tôn.',
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
        'ngo_dao_tra' => [
            'id' => 'ngo_dao_tra',
            'name' => 'Ngộ Đạo Trà',
            'tier' => 5,
            'growthTime' => 3600, // 60 minutes
            'qty' => [1, 2],
            'description' => 'Lá trà hái từ Ngộ Đạo Cổ Thụ, ngưng thần tĩnh khí, gia tăng tốc độ lĩnh ngộ.',
        ],
        'hon_don_linh_chi' => [
            'id' => 'hon_don_linh_chi',
            'name' => 'Hỗn Độn Linh Chi',
            'tier' => 6,
            'growthTime' => 7200, // 120 minutes
            'qty' => [1, 1],
            'description' => 'Thần chi hấp thụ Hỗn Độn Sơ Khí từ thuở khai thiên, bảo vật nghịch thiên cải mệnh.',
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
            'maxLevel' => 10,
            'upgradeCosts' => [3000, 7500, 15000, 30000, 60000, 150000, 350000, 800000, 1800000, 4000000],
            'dailyCosts'   => [30, 75, 150, 300, 600, 1200, 2500, 5000, 10000, 20000],
            'bonusPerLevel' => ['energyRegenBonus' => 2], // +2 Energy per tick per level
        ],
        'ho_the_tran' => [
            'id' => 'ho_the_tran',
            'name' => 'Hộ Thể Trận',
            'description' => 'Trận pháp hộ thể dưỡng sinh, tăng tốc hồi phục Khí Huyết mỗi chu kỳ.',
            'requiredTier' => 2,
            'maxLevel' => 10,
            'upgradeCosts' => [4000, 10000, 22000, 45000, 90000, 200000, 450000, 1000000, 2200000, 5000000],
            'dailyCosts'   => [40, 100, 220, 450, 900, 1800, 3600, 7500, 15000, 30000],
            'bonusPerLevel' => ['hpRegenBonus' => 5], // +5 HP per tick per level
        ],
        'linh_dien_tran' => [
            'id' => 'linh_dien_tran',
            'name' => 'Linh Điền Trận',
            'description' => 'Trận pháp gia tốc Dược Viên, rút ngắn thời gian sinh trưởng dược thảo.',
            'requiredTier' => 3,
            'maxLevel' => 5,
            'upgradeCosts' => [5000, 15000, 35000, 100000, 300000],
            'dailyCosts'   => [50, 150, 350, 800, 2000],
            'bonusPerLevel' => ['gardenSpeedBonus' => 0.10], // -10% growth time per level (up to 50%)
        ],
        'thu_linh_tran' => [
            'id' => 'thu_linh_tran',
            'name' => 'Thủ Linh Trận',
            'description' => 'Trận pháp củng cố đan điền, gia tăng giới hạn Thể Lực tối đa của đạo hữu.',
            'requiredTier' => 3,
            'maxLevel' => 5,
            'upgradeCosts' => [6000, 18000, 40000, 120000, 350000],
            'dailyCosts'   => [60, 180, 400, 1000, 2500],
            'bonusPerLevel' => ['staminaMaxBonus' => 15], // +15 Max Stamina per level (up to +75)
        ],
        'quy_nguyen_tran' => [
            'id' => 'quy_nguyen_tran',
            'name' => 'Quy Nguyên Trận',
            'description' => 'Trận pháp ngưng tụ hỗn nguyên bản khí, gia tăng tốc độ tích lũy tu vi đại đạo.',
            'requiredTier' => 6,
            'maxLevel' => 5,
            'upgradeCosts' => [200000, 500000, 1200000, 3000000, 8000000],
            'dailyCosts'   => [1000, 2500, 6000, 15000, 40000],
            'bonusPerLevel' => ['cultivationBonus' => 5], // +5% tu vi bonus per level
        ],
    ];
}
