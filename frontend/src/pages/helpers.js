/**
 * Shared helpers for page modules
 */
function getIconForSlot(slot, category) {
  if (category === 'manual') return '📜';
  if (slot === 'weapon') return '⚔️';
  if (slot === 'body') return '🥋';
  if (slot === 'shield') return '🛡️';
  if (slot === 'feet') return '👢';
  if (slot === 'ring' || slot === 'ring1' || slot === 'ring2') return '💍';
  return '📦';
}

export function getEnhanceTier(level) {
  const lvl = parseInt(level, 10) || 0;
  if (lvl <= 0) return 0;
  if (lvl <= 3) return 1;
  if (lvl <= 6) return 2;
  if (lvl <= 9) return 3;
  return 4;
}

export function getEffectiveStats(item) {
  if (!item) return { stats: {}, totalScore: 0 };
  const stats = {};
  const enh = parseInt(item.enhanceLevel, 10) || 0;
  const ilvl = parseInt(item.itemLevel, 10) || 1;

  if (item.slot === 'weapon') {
    let str = 0;
    let dex = 0;
    (item.affixes || []).forEach(a => {
      if (a.stat === 'strength' && a.type === 'flat') str += a.value;
      if (a.stat === 'dexterity' && a.type === 'flat') dex += a.value;
    });
    if (str === 0) str = ilvl * 2 + 5;
    if (dex === 0) dex = ilvl + 10;
    if (enh > 0) {
      str += Math.max(4 * enh, Math.round(enh * 4 * Math.floor(ilvl / 3)));
    }
    stats['STR (Sát Thương)'] = str;
    stats['DEX (Chính Xác)'] = dex;
  } else if (item.slot === 'body' || item.slot === 'shield') {
    let def = 0;
    let hp = 0;
    (item.affixes || []).forEach(a => {
      if (a.stat === 'defense' && a.type === 'flat') def += a.value;
      if (a.stat === 'hp' && a.type === 'flat') hp += a.value;
    });
    if (def === 0) def = ilvl * 3;
    if (enh > 0) {
      def += Math.max(3 * enh, Math.round(enh * 3 * Math.floor(ilvl / 3)));
      hp += enh * 30 * Math.floor(ilvl / 3);
    }
    stats['DEF (Phòng Ngự)'] = def;
    if (hp > 0) stats['HP (Khí Huyết)'] = hp;
  } else if (item.slot === 'feet') {
    let spd = 0;
    let dex = 0;
    (item.affixes || []).forEach(a => {
      if (a.stat === 'speed' && a.type === 'flat') spd += a.value;
      if (a.stat === 'defense' && a.type === 'flat') dex += a.value;
    });
    if (spd === 0) spd = Math.max(5, ilvl * 2);
    if (enh > 0) {
      spd += Math.max(2 * enh, Math.round(enh * 3 * Math.floor(ilvl / 3)));
      dex += Math.max(1 * enh, Math.round(spd * 0.6));
    }
    stats['SPD (Thân Pháp)'] = spd;
    if (dex > 0) stats['DEX (Né Tránh)'] = dex;
  } else if (item.slot === 'ring' || item.slot === 'ring1' || item.slot === 'ring2') {
    let cap = 0;
    let str = 0;
    let dex = 0;
    (item.affixes || []).forEach(a => {
      if (a.stat === 'capacity') cap += a.value;
      if (a.stat === 'strength') str += a.value;
      if (a.stat === 'dexterity') dex += a.value;
    });
    if (enh > 0) {
      const bonus = Math.max(2 * enh, Math.round(enh * 2 * Math.floor(ilvl / 3)));
      str += bonus;
      dex += bonus;
    }
    if (cap > 0) stats['CAP (Trữ Vật)'] = cap;
    if (str > 0) stats['STR (Lực Lượng)'] = str;
    if (dex > 0) stats['DEX (Nhanh Nhẹn)'] = dex;
  }

  (item.affixes || []).forEach(a => {
    if (['critMultiplier', 'critRate', 'damageReduction', 'dodge'].includes(a.stat)) {
      const label = a.stat === 'critMultiplier' ? 'CRIT MUL' : a.stat.toUpperCase();
      stats[label] = (stats[label] || 0) + a.value;
    }
  });

  let totalScore = 0;
  Object.values(stats).forEach(v => {
    if (typeof v === 'number') totalScore += v;
  });
  return { stats, totalScore };
}

export function itemRow(item, showEquip, options = {}) {
  const enh = parseInt(item.enhanceLevel, 10) || 0;
  const tier = getEnhanceTier(enh);
  const enhBadge = enh > 0 ? `<span class="badge-enhance tier-${tier} lvl-${enh}">+${enh}</span>` : '';
  const glowClass = tier > 0 ? `enhance-glow-tier${tier}` : '';

  let mainStat = '';
  let subStat = '';
  if (item.slot === 'weapon') {
    let totalDmg = 0;
    let totalAcc = 0;
    (item.affixes || []).forEach(a => {
      if (a.stat === 'strength' && a.type === 'flat') totalDmg += a.value;
      if (a.stat === 'dexterity' && a.type === 'flat') totalAcc += a.value;
    });
    if (totalDmg === 0) totalDmg = item.itemLevel * 2 + 5;
    if (totalAcc === 0) totalAcc = item.itemLevel + 10;
    if (enh > 0) totalDmg += Math.max(4 * enh, Math.round(enh * 4 * Math.floor((item.itemLevel || 1) / 3)));
    mainStat = `Công ${totalDmg}`;
    subStat = `Chính xác ${totalAcc}`;
  } else if (item.slot === 'body' || item.slot === 'shield' || item.slot === 'feet') {
    let totalDef = 0;
    (item.affixes || []).forEach(a => {
      if (a.stat === 'defense' && a.type === 'flat') totalDef += a.value;
    });
    if (totalDef === 0) totalDef = item.itemLevel * 3;
    if (enh > 0) totalDef += Math.max(3 * enh, Math.round(enh * 3 * Math.floor((item.itemLevel || 1) / 3)));
    mainStat = `Thủ ${totalDef}`;
  } else if (item.slot === 'ring' || item.slot === 'ring1' || item.slot === 'ring2') {
    let cap = 0;
    (item.affixes || []).forEach(a => {
      if (a.stat === 'capacity') cap += a.value;
    });
    mainStat = cap > 0 ? `Trữ vật +${cap}` : '';
  }

  // Stat comparison with currently equipped slot
  let compareHtml = '';
  let headerDeltaBadge = '';
  const isEquipment = item.category !== 'manual' && ['weapon', 'body', 'shield', 'feet', 'ring', 'ring1', 'ring2', 'accessory'].includes(item.slot || item.type);
  if (!options.isEquipped && isEquipment && options.equippedItem !== undefined) {
    const eq = options.equippedItem;
    const myStats = getEffectiveStats(item);
    if (eq) {
      const eqStats = getEffectiveStats(eq);
      const allKeys = Array.from(new Set([...Object.keys(myStats.stats), ...Object.keys(eqStats.stats)]));
      const deltas = allKeys.map(k => {
        const v1 = myStats.stats[k] || 0;
        const v0 = eqStats.stats[k] || 0;
        const d = v1 - v0;
        return { key: k, v1, v0, d };
      });
      const totalDelta = myStats.totalScore - eqStats.totalScore;
      const eqEnh = eq.enhanceLevel > 0 ? ` (+${eq.enhanceLevel})` : '';
      headerDeltaBadge = `<span class="stat-delta-badge ${totalDelta >= 0 ? 'pos' : 'neg'}" title="So với trang bị hiện tại">${totalDelta >= 0 ? `▲ +${totalDelta}` : `▼ ${totalDelta}`}</span>`;

      compareHtml = `
        <div class="stat-compare-box">
          <div class="stat-compare-header">
            <span>So sánh với: <strong class="rarity-${eq.rarity}">${eq.name}${eqEnh}</strong></span>
            <span class="stat-delta-badge ${totalDelta >= 0 ? 'pos' : 'neg'}">
              ${totalDelta >= 0 ? `▲ +${totalDelta}` : `▼ ${totalDelta}`} Tổng
            </span>
          </div>
          <div class="stat-delta-grid">
            ${deltas.map(d => `
              <span class="stat-delta-item ${d.d > 0 ? 'pos' : d.d < 0 ? 'neg' : 'eq'}">
                ${d.key}: ${d.v1} (${d.d > 0 ? `▲ +${d.d}` : d.d < 0 ? `▼ ${d.d}` : '■ 0'})
              </span>
            `).join('')}
          </div>
        </div>
      `;
    } else {
      headerDeltaBadge = `<span class="stat-delta-badge pos" title="Ô trang bị trống">▲ +${myStats.totalScore}</span>`;
      compareHtml = `
        <div class="stat-compare-box">
          <div class="stat-compare-header">
            <span style="opacity:0.6">Ô trang bị hiện tại đang trống</span>
            <span class="stat-delta-badge pos">▲ +${myStats.totalScore} Điểm</span>
          </div>
        </div>
      `;
    }
  }

  const affixStr = (item.affixes || []).map(a => fmtAffix(a)).map(a => `<span class="badge badge-dim">${a}</span>`).join(' ');
  const desc = item.description || `Một vật phẩm loại ${item.slot} cấp ${item.itemLevel} thuộc phẩm chất ${item.rarity}. Khí tức tỏa ra không tồi.`;
  const crafted = item.craftedBy ? `<div class="text-gold mt-xs" style="font-size:12px">Đúc bởi: <strong>${item.craftedBy}</strong></div>` : '';

  // Action buttons
  const buttons = [];
  if (options.isEquipped) {
    const slotKey = options.slotKey || item.slot;
    buttons.push(`<button class="btn btn--sm btn-unequip" data-unequip-slot="${slotKey}">Tháo</button>`);
  } else if (showEquip) {
    if (item.category === 'manual') {
      buttons.push(`<button class="btn btn--sm btn--gold" data-use="${item.id}">Sử Dụng</button>`);
    } else {
      buttons.push(`<button class="btn btn--sm btn--blue" data-eid="${item.id}">Trang Bị</button>`);
    }
  }

  // Quick navigation shortcut to Lò Tạo Hóa for equipment
  if (isEquipment) {
    buttons.push(`<button class="btn btn--sm btn-forge-shortcut" data-forge-jump="${item.id}" title="Chuyển đến Lò Tạo Hóa để cường hóa">Cường Hóa</button>`);
  }

  const btnHtml = buttons.join(' ');

  return `
    <div class="list-item ${glowClass}" style="flex-direction:column; align-items:stretch; padding:10px">
      <!-- Header Row -->
      <div class="w-100 flex items-center justify-between pointer" style="gap:10px" onclick="const b = this.nextElementSibling; b.style.display = b.style.display === 'none' ? 'flex' : 'none'">
        <div class="flex items-center gap-2" style="flex:1">
          <span class="rarity-dot ${item.rarity}"></span>
          <span class="item-name rarity-${item.rarity}" style="font-size:14px">${item.name}</span>
          ${enhBadge}
          ${headerDeltaBadge}
        </div>
        <div class="text-sm text-dim flex gap-3 items-center">
          ${mainStat ? `<span style="color:var(--text-light)">${mainStat}</span>` : ''}
          ${subStat ? `<span style="color:var(--text-light)">${subStat}</span>` : ''}
          <span style="font-size:10px; opacity:0.5; margin-left:8px">▼</span>
        </div>
      </div>
      
      <!-- Expanded Body -->
      <div class="item-body mt-3 pt-3 flex gap-3" style="display:none; border-top:1px solid rgba(255,255,255,0.05); flex-direction:column">
        <div class="flex gap-3">
          <div class="item-icon-box flex-center" style="width:70px;height:70px;background:var(--bg-glass);border-radius:6px;font-size:32px; border:1px solid var(--border-glass)">
            ${getIconForSlot(item.slot, item.category)}
          </div>
          <div class="item-details" style="flex:1">
            <div class="text-sm mb-2" style="color:var(--text-light); line-height:1.4"><strong>${item.name}</strong> ${enhBadge} là loại ${item.baseType}. ${desc}</div>
            <div class="text-xs text-dim flex gap-4 mb-2" style="opacity:0.8">
              <div><strong>Cấp độ:</strong> Lv.${item.itemLevel || 1}</div>
              <div><strong>Thuộc tính:</strong> <span class="rarity-${item.rarity}">${(item.rarity || 'common').toUpperCase()}</span></div>
              ${enh > 0 ? `<div><strong>Cường Hóa:</strong> <span class="badge-enhance tier-${tier} lvl-${enh}">+${enh}</span></div>` : ''}
            </div>
            <div class="text-xs mb-2">
              ${affixStr || '<span class="text-dim">Không có dòng mài mòn nào.</span>'}
            </div>
            ${crafted}
          </div>
        </div>

        ${compareHtml}

        <div class="mt-2 flex justify-end gap-2">
          ${btnHtml}
        </div>
      </div>
    </div>`;
}

export function bindItemActions(container, ctx) {
  if (!container || !ctx) return;
  const { state, api, notify, renderGame } = ctx;

  // 1. Forge Shortcut Jump
  container.querySelectorAll('[data-forge-jump]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const itemId = btn.dataset.forgeJump;
      state.currentPage = 'alchemy';
      state._alchemyTab = 'enhancement';
      state._selectedEnhanceItemId = itemId;
      renderGame();
    });
  });

  // 2. Unequip Button
  container.querySelectorAll('[data-unequip-slot]').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const slot = btn.dataset.unequipSlot;
      try {
        const res = await api.request(`/player/${state.playerId}/unequip`, {
          method: 'POST',
          body: JSON.stringify({ slot })
        });
        state.player = res.player;
        notify(res.message || 'Đã tháo trang bị', 'success');
        renderGame();
      } catch (err) {
        notify(err.message || 'Lỗi khi tháo trang bị', 'error');
      }
    });
  });
}

export function fmtAffix(a) {
  const names = { strength:'STR', speed:'SPD', dexterity:'DEX', defense:'DEF', critMultiplier:'CRIT MUL' };
  const n = names[a.stat] || a.stat;
  const s = a.value >= 0 ? '+' : '';
  if (a.type === 'flat') return `${s}${a.value} ${n}`;
  if (a.type === 'increase') return `${s}${a.value}% ${n}`;
  if (a.type === 'more') return `×${s}${a.value}% ${n}`;
  return `${s}${a.value} ${n}`;
}
