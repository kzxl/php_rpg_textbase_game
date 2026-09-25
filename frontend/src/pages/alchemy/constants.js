/**
 * Alchemy, Forging & Enhancement Constants
 */
export const RARITY_COLORS = {
  legendary: '#f59e0b',
  epic: '#a855f7',
  rare: '#facc15',
  uncommon: '#38bdf8',
  common: '#94a3b8'
}

export const SLOT_ICONS = {
  weapon: '⚔️',
  body: '🛡️',
  shield: '🛡️',
  feet: '👢',
  ring: '💍'
}

export const TALISMAN_RECIPES = [
  { id: 'tay_tuy_phu', name: 'Tẩy Tủy Phù', icon: '🔄', desc: 'Xóa toàn bộ affix và roll lại ngẫu nhiên', cost: 200 },
  { id: 'hon_chu_phu', name: 'Hỗn Chú Phù', icon: '➕', desc: 'Thêm 1 dòng affix ngẫu nhiên (tối đa 4)', cost: 500 },
  { id: 'thien_menh_phu', name: 'Thiên Mệnh Phù', icon: '🔒', desc: 'Khóa 1 dòng affix, xóa và roll lại phần còn lại', cost: 1000 },
  { id: 'thang_cap_phu', name: 'Thăng Cấp Phù', icon: '⬆️', desc: 'Tăng item level +1 (tối đa +5)', cost: 1500 },
]

export function formatId(id = '') {
  return id
    .replace(/^mat_/, '')
    .split('_')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export function calculateEnhanceConfig(nextLvl, ilvl = 1) {
  let successRate = 100
  let stonesReq = 1
  let goldCost = 50 * nextLvl
  let riskType = 'safe'

  if (nextLvl <= 3) {
    successRate = 100
    stonesReq = 1
    goldCost = 50 * nextLvl
    riskType = 'safe'
  } else if (nextLvl <= 6) {
    const rates = { 4: 80, 5: 70, 6: 60 }
    successRate = rates[nextLvl] || 60
    stonesReq = 2
    goldCost = 100 * nextLvl
    riskType = 'safe_fail'
  } else if (nextLvl <= 9) {
    const rates = { 7: 45, 8: 35, 9: 25 }
    successRate = rates[nextLvl] || 25
    stonesReq = 3
    goldCost = 250 * nextLvl
    riskType = 'downgrade'
  } else {
    const rates = { 10: 20, 11: 15, 12: 10 }
    successRate = rates[nextLvl] || 10
    stonesReq = 4
    goldCost = 600 * nextLvl
    riskType = 'downgrade'
  }

  goldCost = Math.round(goldCost * (1.0 + (ilvl - 1) * 0.05))
  return { successRate, stonesReq, goldCost, riskType }
}
