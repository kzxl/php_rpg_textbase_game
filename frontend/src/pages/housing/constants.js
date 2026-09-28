/**
 * Housing System Constants & Helper Utilities
 * Conforms to Anti-AI-Slop & High-Density Torn UI Standards.
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
}

export const FORMATION_DEFS = {
  tu_linh_tran: {
    id: 'tu_linh_tran',
    name: 'Tụ Linh Trận',
    description: 'Trận pháp tụ tập thiên địa linh khí, tăng tốc hồi phục Linh Lực mỗi chu kỳ.',
    statLabel: 'Hồi Linh Lực',
    unit: '/ 10s',
    requiredTier: 2,
    maxLevel: 5,
  },
  ho_the_tran: {
    id: 'ho_the_tran',
    name: 'Hộ Thể Trận',
    description: 'Trận pháp hộ thể dưỡng sinh, tăng tốc hồi phục Khí Huyết mỗi chu kỳ.',
    statLabel: 'Hồi Khí Huyết',
    unit: '/ 10s',
    requiredTier: 2,
    maxLevel: 5,
  },
  linh_dien_tran: {
    id: 'linh_dien_tran',
    name: 'Linh Điền Trận',
    description: 'Trận pháp gia tốc Dược Viên, rút ngắn thời gian sinh trưởng dược thảo.',
    statLabel: 'Gia Tốc Vườn',
    unit: '%',
    requiredTier: 3,
    maxLevel: 3,
  },
  thu_linh_tran: {
    id: 'thu_linh_tran',
    name: 'Thủ Linh Trận',
    description: 'Trận pháp củng cố đan điền, gia tăng giới hạn Thể Lực tối đa của đạo hữu.',
    statLabel: 'Thể Lực Tối Đa',
    unit: 'điểm',
    requiredTier: 3,
    maxLevel: 3,
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
