/**
 * Housing System Constants & Helper Utilities
 * Conforms to Anti-AI-Slop & High-Density Torn UI Standards.
 * Extended with 10 Tiers, Supreme Herbs, and Advanced Formations.
 */

export const HOUSING_TIERS = {
  1: {
    tier: 1,
    name: 'Thảo Lư',
    cost: 500,
    hpRegen: 2,
    gardenSlots: 1,
    breakthroughBonus: 2,
    description: 'Căn nhà tranh đơn sơ bên suối linh tuyền, linh khí ban sơ.',
    badgeClass: 'badge--slate',
  },
  2: {
    tier: 2,
    name: 'Mộc Ốc',
    cost: 2500,
    hpRegen: 5,
    gardenSlots: 2,
    breakthroughBonus: 4,
    description: 'Nhà gỗ linh sam kiên cố, có khoảnh linh điền màu mỡ.',
    badgeClass: 'badge--blue',
  },
  3: {
    tier: 3,
    name: 'Thạch Các',
    cost: 10000,
    hpRegen: 10,
    gardenSlots: 3,
    breakthroughBonus: 6,
    description: 'Tòa thạch các ngự trên sườn thanh sơn, thông thấu địa mạch.',
    badgeClass: 'badge--purple',
  },
  4: {
    tier: 4,
    name: 'Linh Phủ',
    cost: 40000,
    hpRegen: 20,
    gardenSlots: 4,
    breakthroughBonus: 8,
    description: 'Phủ đệ linh sơn hùng vĩ, mây mù lượn lờ, tụ tập linh vận thiên địa.',
    badgeClass: 'badge--gold',
  },
  5: {
    tier: 5,
    name: 'Thiên Cung',
    cost: 150000,
    hpRegen: 40,
    gardenSlots: 5,
    breakthroughBonus: 10,
    description: 'Cung điện bồng bềnh trong mây, phong cảnh tuyệt thế vô song.',
    badgeClass: 'badge--legendary',
  },
  6: {
    tier: 6,
    name: 'Tử Tiêu Điện',
    cost: 500000,
    hpRegen: 75,
    gardenSlots: 6,
    breakthroughBonus: 13,
    description: 'Điện ngọc đúc từ Tử Tiêu Linh Thạch, tử khí ngút ngàn, đạo vận tường hòa.',
    badgeClass: 'badge--purple',
  },
  7: {
    tier: 7,
    name: 'Huyền Đô Tiên Đảo',
    cost: 1800000,
    hpRegen: 120,
    gardenSlots: 7,
    breakthroughBonus: 16,
    description: 'Phù không tiên đảo ngự chín tầng mây, thông thấu thiên địa, linh vụ lượn lờ.',
    badgeClass: 'badge--cyan',
  },
  8: {
    tier: 8,
    name: 'Thần Tiêu Động Thiên',
    cost: 6000000,
    hpRegen: 200,
    gardenSlots: 8,
    breakthroughBonus: 20,
    description: 'Độc lập tiểu thế giới nội hàm càn khôn, linh khí nồng đặc kết tinh thành hà lưu.',
    badgeClass: 'badge--blue',
  },
  9: {
    tier: 9,
    name: 'Thái Hư Tiên Phủ',
    cost: 20000000,
    hpRegen: 350,
    gardenSlots: 9,
    breakthroughBonus: 25,
    description: 'Tiên phủ ngự tại khe nứt Thái Hư cổ xưa, hấp thu hỗn độn nguyên khí bất tận.',
    badgeClass: 'badge--gold',
  },
  10: {
    tier: 10,
    name: 'Hỗn Độn Tiên Cung',
    cost: 60000000,
    hpRegen: 600,
    gardenSlots: 10,
    breakthroughBonus: 30,
    description: 'Vô thượng thánh địa ngưng tụ từ Hỗn Độn Sơ Khí, siêu thoát ngũ hành luân hồi, duy ngã độc tôn.',
    badgeClass: 'badge--legendary',
  },
}

export const HERB_DEFS = {
  linh_thao: {
    id: 'linh_thao',
    name: 'Linh Thảo',
    tier: 1,
    growthTime: 180,
    qty: [2, 4],
    description: 'Cỏ linh khí nhạt, nền tảng của Luyện Đan sơ cấp.',
  },
  huyet_thao: {
    id: 'huyet_thao',
    name: 'Huyết Thảo',
    tier: 2,
    growthTime: 360,
    qty: [2, 3],
    description: 'Cỏ đỏ như máu, chứa sinh khí dương dồi dào bồi bổ khí huyết.',
  },
  thanh_linh_thao: {
    id: 'thanh_linh_thao',
    name: 'Thanh Linh Thảo',
    tier: 2,
    growthTime: 600,
    qty: [2, 3],
    description: 'Linh thảo thanh sạch, nâng cao dược lực khi luyện đan.',
  },
  kim_linh_thao: {
    id: 'kim_linh_thao',
    name: 'Kim Linh Thảo',
    tier: 3,
    growthTime: 1200,
    qty: [1, 2],
    description: 'Linh thảo hấp thụ tinh quang nhật nguyệt, cực kỳ quý hiếm.',
  },
  thien_linh_thao: {
    id: 'thien_linh_thao',
    name: 'Thiên Linh Thảo',
    tier: 4,
    growthTime: 2400,
    qty: [1, 2],
    description: 'Tuyệt phẩm thảo mộc, tụ tập tinh hoa đại đạo vũ trụ.',
  },
  ngo_dao_tra: {
    id: 'ngo_dao_tra',
    name: 'Ngộ Đạo Trà',
    tier: 5,
    growthTime: 3600,
    qty: [1, 2],
    description: 'Lá trà hái từ Ngộ Đạo Cổ Thụ, ngưng thần tĩnh khí, trợ giúp đột phá.',
  },
  hon_don_linh_chi: {
    id: 'hon_don_linh_chi',
    name: 'Hỗn Độn Linh Chi',
    tier: 6,
    growthTime: 7200,
    qty: [1, 1],
    description: 'Thần chi hấp thụ Hỗn Độn Sơ Khí từ thuở khai thiên, bảo vật nghịch thiên cải mệnh.',
  },
}

export const FORMATION_DEFS = {
  tu_linh_tran: {
    id: 'tu_linh_tran',
    name: 'Tụ Linh Trận',
    description: 'Trận pháp tụ tập thiên địa linh khí, tăng tốc hồi phục Linh Lực mỗi chu kỳ.',
    statLabel: 'Hồi Linh Lực',
    unit: '/ 10s',
    requiredTier: 2,
    maxLevel: 10,
  },
  ho_the_tran: {
    id: 'ho_the_tran',
    name: 'Hộ Thể Trận',
    description: 'Trận pháp hộ thể dưỡng sinh, tăng tốc hồi phục Khí Huyết mỗi chu kỳ.',
    statLabel: 'Hồi Khí Huyết',
    unit: '/ 10s',
    requiredTier: 2,
    maxLevel: 10,
  },
  linh_dien_tran: {
    id: 'linh_dien_tran',
    name: 'Linh Điền Trận',
    description: 'Trận pháp gia tốc Dược Viên, rút ngắn thời gian sinh trưởng dược thảo.',
    statLabel: 'Gia Tốc Vườn',
    unit: '%',
    requiredTier: 3,
    maxLevel: 5,
  },
  thu_linh_tran: {
    id: 'thu_linh_tran',
    name: 'Thủ Linh Trận',
    description: 'Trận pháp củng cố đan điền, gia tăng giới hạn Thể Lực tối đa của đạo hữu.',
    statLabel: 'Thể Lực Tối Đa',
    unit: 'điểm',
    requiredTier: 3,
    maxLevel: 5,
  },
  quy_nguyen_tran: {
    id: 'quy_nguyen_tran',
    name: 'Quy Nguyên Trận',
    description: 'Trận pháp ngưng tụ hỗn nguyên bản khí, gia tăng tốc độ tích lũy tu vi đại đạo.',
    statLabel: 'Tăng Tu Vi',
    unit: '%',
    requiredTier: 6,
    maxLevel: 5,
  },
}

/**
 * Format duration in seconds to mm:ss or hh:mm:ss
 */
export function formatDuration(sec) {
  const s = Math.max(0, Math.floor(sec || 0))
  const hrs = Math.floor(s / 3600)
  const mins = Math.floor((s % 3600) / 60)
  const remSec = s % 60

  if (hrs > 0) {
    return `${hrs}h ${String(mins).padStart(2, '0')}m`
  }
  return `${String(mins).padStart(2, '0')}:${String(remSec).padStart(2, '0')}`
}

/**
 * Format currency with dot/comma separators
 */
export function formatNumber(val) {
  return Number(val || 0).toLocaleString('vi-VN')
}
