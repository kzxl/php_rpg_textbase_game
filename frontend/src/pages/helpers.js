/**
 * Shared helpers for page modules
 */
function getIconForSlot(slot, category) {
  if (category === 'manual') return '📜';
  if (slot === 'weapon') return '⚔️';
  if (slot === 'body') return '🥋';
  if (slot === 'shield') return '🛡️';
  if (slot === 'feet') return '👢';
  if (slot === 'ring') return '💍';
  return '📦';
}

export function itemRow(item, showEquip) {
  let mainStat = ''
  let subStat = ''
  if (item.slot === 'weapon') {
    let totalDmg = 0; let totalAcc = 0;
    (item.affixes || []).forEach(a => {
        if (a.stat === 'strength' && a.type === 'flat') totalDmg += a.value;
        if (a.stat === 'dexterity' && a.type === 'flat') totalAcc += a.value;
    });
    // Giả lập base dmg nếu không có dòng flat
    if (totalDmg === 0) totalDmg = item.itemLevel * 2 + 5;
    if (totalAcc === 0) totalAcc = item.itemLevel + 10;
    mainStat = `⚔️ ${totalDmg}`;
    subStat = `🎯 ${totalAcc}`;
  } else if (item.slot === 'body' || item.slot === 'shield' || item.slot === 'feet') {
    let totalDef = 0;
    (item.affixes || []).forEach(a => {
        if (a.stat === 'defense' && a.type === 'flat') totalDef += a.value;
    });
    if (totalDef === 0) totalDef = item.itemLevel * 3;
    mainStat = `🛡️ ${totalDef}`;
  } else if (item.slot === 'ring') {
    let cap = 0;
    (item.affixes || []).forEach(a => {
        if (a.stat === 'capacity') cap += a.value;
    });
    mainStat = cap > 0 ? `🎒 +${cap}` : '';
  }

  const affixStr = (item.affixes || []).map(a => fmtAffix(a)).map(a => `<span class="badge badge-dim">${a}</span>`).join(' ')
  const desc = item.description || `Một vật phẩm loại ${item.slot} cấp ${item.itemLevel} thuộc phẩm chất ${item.rarity}. Khí tức tỏa ra không tồi.`;
  const crafted = item.craftedBy ? `<div class="text-gold mt-xs" style="font-size:12px">⚒️ Đúc bởi: <strong>${item.craftedBy}</strong></div>` : '';

  const btnHtml = showEquip 
    ? (item.category === 'manual' 
        ? `<button class="btn btn--sm btn--gold" data-use="${item.id}">Sử Dụng</button>` 
        : `<button class="btn btn--sm btn--blue" data-eid="${item.id}">Trang Bị</button>`)
    : '';

  return `
    <div class="list-item" style="flex-direction:column; align-items:stretch; padding:10px">
      <!-- Header Row -->
      <div class="w-100 flex items-center justify-between pointer" style="gap:10px" onclick="const b = this.nextElementSibling; b.style.display = b.style.display === 'none' ? 'flex' : 'none'">
        <div class="flex items-center gap-2" style="flex:1">
          <span class="rarity-dot ${item.rarity}"></span>
          <span class="item-name rarity-${item.rarity}" style="font-size:14px">${item.name}</span>
        </div>
        <div class="text-sm text-dim flex gap-3 items-center">
          ${mainStat ? `<span style="color:var(--text-light)">${mainStat}</span>` : ''}
          ${subStat ? `<span style="color:var(--text-light)">${subStat}</span>` : ''}
          <span style="font-size:10px; opacity:0.5; margin-left:8px">▼</span>
        </div>
      </div>
      
      <!-- Expanded Body -->
      <div class="item-body mt-3 pt-3 flex gap-3" style="display:none; border-top:1px solid rgba(255,255,255,0.05)">
        <div class="item-icon-box flex-center" style="width:70px;height:70px;background:var(--bg-glass);border-radius:6px;font-size:32px; border:1px solid var(--border-glass)">
          ${getIconForSlot(item.slot, item.category)}
        </div>
        <div class="item-details" style="flex:1">
          <div class="text-sm mb-2" style="color:var(--text-light); line-height:1.4"><strong>${item.name}</strong> là loại ${item.baseType}. ${desc}</div>
          <div class="text-xs text-dim flex gap-4 mb-2" style="opacity:0.8">
            <div><strong>Cấp độ:</strong> Lv.${item.itemLevel}</div>
            <div><strong>Thuộc tính:</strong> ${item.rarity.toUpperCase()}</div>
          </div>
          <div class="text-xs mb-2">
            ${affixStr || '<span class="text-dim">Không có dòng mài mòn nào.</span>'}
          </div>
          ${crafted}
          <div class="mt-2 flex justify-end">
            ${btnHtml}
          </div>
        </div>
      </div>
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
