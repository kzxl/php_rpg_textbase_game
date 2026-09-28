/**
 * Cultivation & Stats System Constants & Analytical Helpers
 * Conforms to Anti-AI-Slop & High-Density Torn UI Standards.
 */

export const STAT_CONFIG = [
  { key: 'strength', name: 'Sức Mạnh', abbr: 'STR', desc: 'Tăng sát thương vật lý và uy lực đòn đánh.' },
  { key: 'speed', name: 'Tốc Độ', abbr: 'SPD', desc: 'Tăng tỷ lệ đánh trúng và cản trở đối thủ đào tẩu.' },
  { key: 'dexterity', name: 'Khéo Léo', abbr: 'DEX', desc: 'Tăng xác suất thân pháp né tránh và xuất chiêu hiểm hóc.' },
  { key: 'defense', name: 'Phòng Ngự', abbr: 'DEF', desc: 'Giảm sát thương nhận vào theo đường cong phòng thủ MDG.' },
]

export const TALENT_TIERS = [
  { name: 'Phàm Cốt', multiplier: '1.0x', color: '#94a3b8', badgeClass: 'tier-pham' },
  { name: 'Linh Cốt', multiplier: '1.1x', color: '#38bdf8', badgeClass: 'tier-linh' },
  { name: 'Huyền Cốt', multiplier: '1.25x', color: '#a855f7', badgeClass: 'tier-huyen' },
  { name: 'Đạo Cốt', multiplier: '1.5x', color: '#facc15', badgeClass: 'tier-dao' },
  { name: 'Tiên Cốt', multiplier: '2.0x', color: '#f59e0b', badgeClass: 'tier-tien' },
]

/**
 * Calculate physical damage mitigation % based on MDG Armor curve
 */
export function calcMitigation(defVal = 0, rawDmg = 25) {
  if (defVal <= 0) return 0.0
  const effDmg = Math.max(8.0, rawDmg)
  const pct = (defVal / (defVal + 5.0 * effDmg)) * 100
  return Math.min(85.0, Math.round(pct * 100) / 100)
}

/**
 * Calculate dodge probability % based on Dexterity and Opponent Speed
 */
export function calcDodge(dexVal = 0, enemySpeed = 10) {
  if (dexVal <= 0) return 0.0
  const effSpd = Math.max(1.0, enemySpeed)
  const pct = (dexVal / (dexVal + 2.5 * effSpd)) * 100
  return Math.min(35.0, Math.round(pct * 100) / 100)
}

/**
 * Format numbers with dot/comma separators
 */
export function formatNumber(val = 0) {
  return Number(val || 0).toLocaleString('vi-VN')
}
