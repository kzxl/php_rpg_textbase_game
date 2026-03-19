/**
 * Shared helpers for page modules
 */
export function itemRow(item, showEquip) {
  const affixStr = (item.affixes || []).map(a => fmtAffix(a)).join(' · ')
  return `
    <div class="list-item">
      <div class="item-info">
        <span class="rarity-dot ${item.rarity}"></span>
        <span class="item-name rarity-${item.rarity}">${item.name}</span>
        <div class="item-meta">${item.slot} · ${item.rarity}${affixStr ? ' · ' + affixStr : ''}</div>
      </div>
      ${showEquip ? `<button class="btn btn--sm btn--blue" data-eid="${item.id}">Equip</button>` : ''}
    </div>`
}

export function fmtAffix(a) {
  const names = { strength:'STR', speed:'SPD', dexterity:'DEX', defense:'DEF', critMultiplier:'CRIT MUL' }
  const n = names[a.stat] || a.stat
  const s = a.value >= 0 ? '+' : ''
  if (a.type === 'flat') return `${s}${a.value} ${n}`
  if (a.type === 'increase') return `${s}${a.value}% ${n}`
  if (a.type === 'more') return `×${s}${a.value}% ${n}`
  return `${s}${a.value} ${n}`
}
