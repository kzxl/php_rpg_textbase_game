/**
 * Skills & Cultivation Hub Constants & Formulas
 */
export const TIER_CHANCES = { 1: 55, 2: 45, 3: 40, 4: 35, 5: 30, 6: 25, 7: 20 }

export function getMaxSkillSlots(realmTier = 1) {
  switch (realmTier) {
    case 1: return 2 // Luyện Khí
    case 2: return 3 // Trúc Cơ
    case 3: return 4 // Kim Đan
    case 4: return 5 // Nguyên Anh
    default: return 6 // Hoá Thần+
  }
}

export const AURA_CONFIGS = {
  ho_the_kim_chung: {
    id: 'ho_the_kim_chung',
    name: 'Hộ Thể Kim Chung',
    icon: '🛡️',
    reservationPct: 20,
    desc: 'Khóa 20% Linh Lực tối đa. Tăng +25 Giáp & +100 Máu, giảm 20% sát thương lôi kiếp khi độ kiếp.',
    statBonuses: { defense: 25, maxHp: 100 }
  },
  than_hanh_bo: {
    id: 'than_hanh_bo',
    name: 'Thần Hành Hào Quang',
    icon: '💨',
    reservationPct: 15,
    desc: 'Khóa 15% Linh Lực tối đa. Tăng +20 Tốc độ & +15 Thân pháp né tránh.',
    statBonuses: { speed: 20, dexterity: 15 }
  },
  hoa_diem_chan_khi: {
    id: 'hoa_diem_chan_khi',
    name: 'Hỏa Diễm Chân Khí',
    icon: '🔥',
    reservationPct: 25,
    desc: 'Khóa 25% Linh Lực tối đa. Tăng +25 Lực đạo & +10% Tỷ lệ Bạo Kích.',
    statBonuses: { strength: 25, critChance: 10 }
  },
  toa_thien: {
    id: 'toa_thien',
    name: 'Toạ Thiền Tụ Khí',
    icon: '🧘',
    reservationPct: 10,
    desc: 'Khóa 10% Linh Lực tối đa. Gia tăng tốc độ hồi phục Khí Huyết & Thể Lực (+5 HP & +2 TL / 10s).',
    statBonuses: { hpRegen: 5, staminaRegen: 2 }
  }
}

export function calcTriggerChance(s, player = {}, isLearned = true) {
  const baseChance = s.triggerChance || TIER_CHANCES[s.tier || 1] || 40
  const dexBonus = Math.floor((player.stats?.dexterity || 10) / 10)
  const levelBonus = Math.max(0, (s.level || 1) - 1)
  const stanceBonus = (player.activeStance === 'breaker') ? 5 : 0
  return isLearned ? Math.min(85, Math.max(15, baseChance + levelBonus + dexBonus + stanceBonus)) : baseChance
}
