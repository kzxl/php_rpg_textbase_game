/**
 * Combat Constants, Stances & Log Formatter
 */
export const OUTCOME_MAP = {
  win: { icon: '🏆', text: 'Chiến Thắng', cls: 'win', color: 'var(--green, #4ade80)' },
  loss: { icon: '💀', text: 'Trọng Thương Bại Trận', cls: 'lose', color: 'var(--red, #f87171)' },
  stalemate: { icon: '⏰', text: 'Bất Phân Thắng Bại', cls: 'draw', color: 'var(--orange, #fb923c)' },
  flee: { icon: '🏃', text: 'Thoát Thân Thành Công', cls: 'flee', color: 'var(--blue, #60a5fa)' },
}

export const STANCE_INFO = {
  breaker: { name: 'Thế Phá Quy', color: '#ef4444', icon: '⚡' },
  flow: { name: 'Thế Du Đạo', color: '#06b6d4', icon: '🌀' },
  glitch: { name: 'Thế Nghịch Hành', color: '#a855f7', icon: '🌌' },
}

export function getStance(stanceKey = 'breaker') {
  return STANCE_INFO[stanceKey] || { name: 'Bình Thường', color: '#888', icon: '⚔️' }
}

export function spawnFloatingDamage(parentEl, text, type = 'normal') {
  if (!parentEl) return
  const floatEl = document.createElement('div')
  floatEl.className = `floating-damage damage-${type}`
  floatEl.textContent = text
  parentEl.appendChild(floatEl)
  setTimeout(() => floatEl.remove(), 1100)
}

export function renderCombatLogLines(log = []) {
  return (log || []).map(l => {
    if (l.startsWith('---')) return `<div class="turn" style="font-weight:bold;color:var(--text-bright);margin:6px 0 2px 0;">${l}</div>`
    if (l.includes('PHÁT HIỆN LỖI THIÊN ĐẠO') || l.includes('🌌 [PHÁT HIỆN')) return `<div class="glitch-unlock" style="background:rgba(168,85,247,0.2);border:1px solid #c084fc;padding:6px 10px;border-radius:6px;margin:4px 0;color:#f0abfc;font-weight:bold;text-shadow:0 0 10px rgba(192,132,252,0.5)">${l}</div>`
    if (l.includes('VẾT NỨT THIÊN ĐẠO') || l.includes('Khai thác Lỗi')) return `<div class="glitch-burst" style="color:#d8b4fe;font-weight:bold;text-shadow:0 0 8px rgba(192,132,252,0.4)">${l}</div>`
    if (l.includes('Thế Du Đạo') || l.includes('nương theo kẽ hở')) return `<div class="flow-dodge" style="color:#67e8f9;font-weight:600">${l}</div>`
    if (l.includes('Kim Thân Bất Diệt')) return `<div class="undying-proc" style="color:#fde047;font-weight:600">${l}</div>`
    if (l.includes('Kích Hoạt') || l.includes('Xuất chiêu')) return `<div class="skill-proc" style="color:#38bdf8;font-weight:700;background:rgba(56,189,248,0.12);padding:3px 8px;border-radius:4px;margin:2px 0;border-left:3px solid #38bdf8;">${l}</div>`
    if (l.includes('thường công')) return `<div class="normal-attack" style="color:var(--text-dim);font-style:italic;margin:2px 0;">${l}</div>`
    if (l.includes('linh lực') && l.includes('+')) return `<div class="energy" style="color:var(--cyan, #06b6d4)">${l}</div>`
    if (l.includes('linh lực')) return `<div class="energy-cost" style="color:var(--blue, #3b82f6)">${l}</div>`
    if (l.includes('hụt')) return `<div class="miss" style="color:var(--text-dim)">${l}</div>`
    if (l.includes('né được')) return `<div class="dodge" style="color:var(--blue, #3b82f6)">${l}</div>`
    if (l.includes('CHÍNH MẠNG') || l.includes('💥')) return `<div class="crit" style="color:var(--gold, #facc15);font-weight:bold">${l}</div>`
    if (l.includes('ngã xuống') || l.includes('💀')) return `<div class="death" style="color:var(--red, #ef4444);font-weight:bold">${l}</div>`
    if (l.includes('Chiến thắng') || l.includes('🏆')) return `<div class="victory" style="color:var(--green, #22c55e);font-weight:bold">${l}</div>`
    if (l.includes('Đột phá') || l.includes('🎉')) return `<div class="levelup" style="color:var(--gold, #facc15);font-weight:bold">${l}</div>`
    if (l.includes('bỏ chạy') || l.includes('🏃')) return `<div class="flee" style="color:var(--orange, #f97316)">${l}</div>`
    if (l.includes('Hết') || l.includes('⏰')) return `<div class="stalemate" style="color:var(--orange, #f97316)">${l}</div>`
    if (l.includes('Linh Thạch') || l.includes('💰')) return `<div class="gold-reward" style="color:var(--gold, #facc15)">${l}</div>`
    if (l.includes('Tịnh dưỡng') || l.includes('🏥')) return `<div class="hospital" style="color:var(--red, #ef4444)">${l}</div>`
    if (l.includes('🧪')) return `<div class="status-effect text-purple">${l}</div>`
    if (l.includes('✨')) return `<div class="regen text-green">${l}</div>`
    return `<div class="hit">${l}</div>`
  }).join('')
}
