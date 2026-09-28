/**
 * Shared helpers for page modules
 */
export const STAT_NAMES_VI = {
  strength: 'Lực Đạo (Công)',
  defense: 'Hộ Thể (Thủ)',
  speed: 'Thân Pháp (Tốc)',
  dexterity: 'Mẫn Tiệp (Né/Xác)',
  hp: 'Khí Huyết (HP)',
  maxHp: 'Khí Huyết Tối Đa',
  critRate: 'Tỷ Lệ Bạo Kích',
  critMultiplier: 'Sát Thương Bạo Kích',
  damageReduction: 'Giảm Sát Thương',
  dodge: 'Né Tránh',
  capacity: 'Không Gian Trữ Vật',
};

export const STAT_SHORT_VI = {
  strength: 'Công',
  defense: 'Thủ',
  speed: 'Tốc',
  dexterity: 'Thân Pháp',
  hp: 'HP',
  maxHp: 'HP',
  critRate: 'Bạo Kích',
  critMultiplier: 'ST Bạo',
  damageReduction: 'Giảm Thương',
  dodge: 'Né',
  capacity: 'Trữ Vật',
};

export function getEnhanceDescription(item) {
  const enh = parseInt(item.enhanceLevel, 10) || 0;
  if (enh <= 0) return '';
  const ilvl = parseInt(item.itemLevel, 10) || 1;
  const ilvlScale = Math.max(1, Math.floor(ilvl / 3));

  if (item.slot === 'weapon') {
    const bonusStr = Math.max(4 * enh, Math.round(enh * 4 * ilvlScale));
    return `+${bonusStr} Lực Đạo (Công)`;
  }
  if (item.slot === 'body' || item.slot === 'shield' || item.slot === 'head') {
    const bonusDef = Math.max(3 * enh, Math.round(enh * 3 * ilvlScale));
    const bonusHp = enh * 30 * ilvlScale;
    return `+${bonusDef} Hộ Thể & +${bonusHp} Khí Huyết`;
  }
  if (item.slot === 'feet') {
    const bonusSpd = Math.max(2 * enh, Math.round(enh * 3 * ilvlScale));
    const bonusDex = Math.max(1 * enh, Math.round(bonusSpd * 0.6));
    return `+${bonusSpd} Thân Pháp & +${bonusDex} Mẫn Tiệp`;
  }
  if (['ring', 'ring1', 'ring2', 'accessory'].includes(item.slot)) {
    const bonus = Math.max(2 * enh, Math.round(enh * 2 * ilvlScale));
    return `+${bonus} Lực Đạo & +${bonus} Mẫn Tiệp`;
  }
  return `Cấp Cường Hóa +${enh}`;
}

export function renderAffixBadges(affixes = []) {
  if (!affixes || affixes.length === 0) {
    return `<div style="font-size:11px; color:var(--text-dim); padding:4px 0;">Chưa có phù văn khắc ấn. Dùng Hỗn Chú Phù tại Lò Tạo Hóa để khắc ấn thuộc tính!</div>`;
  }
  return affixes.map((a, idx) => {
    const tierBadge = a.tier ? `<span style="font-size:9.5px; background:rgba(234, 179, 8, 0.12); color:#facc15; border:1px solid rgba(234, 179, 8, 0.3); padding:1px 5px; border-radius:3px; font-weight:700">Tầng ${a.tier}</span>` : '';
    const nameStr = `<span style="color:var(--gold, #facc15); font-weight:700; font-size:12px">${a.name ? `[${a.name}]` : `[Phù Văn ${idx + 1}]`}</span>`;
    const statFormatted = fmtAffix(a, true);
    return `
      <div class="affix-line" style="display:flex; justify-content:space-between; align-items:center; gap:8px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:4px; padding:4px 10px; margin-bottom:4px; font-size:11.5px">
        <div style="display:flex; align-items:center; gap:6px">
          <span>📜</span>
          ${nameStr}
          ${tierBadge}
        </div>
        <span style="color:#60a5fa; font-weight:600">${statFormatted}</span>
      </div>
    `;
  }).join('');
}

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

  const enhanceDesc = enh > 0 ? getEnhanceDescription(item) : '';

  return `
    <div class="list-item ${glowClass}" style="flex-direction:column; align-items:stretch; padding:10px">
      <!-- Header Row -->
      <div class="w-100 flex items-center justify-between pointer" style="gap:10px" onclick="const b = this.nextElementSibling; b.style.display = b.style.display === 'none' ? 'flex' : 'none'">
        <div class="flex items-center gap-2" style="flex:1; flex-wrap:wrap">
          <span class="rarity-dot ${item.rarity}"></span>
          <span class="item-name rarity-${item.rarity}" style="font-size:14px; font-weight:600">${item.name}</span>
          ${enhBadge}
          ${headerDeltaBadge}
          ${(item.affixes || []).length > 0 ? `<span class="badge" style="font-size:10px; background:rgba(96,165,250,0.12); color:#60a5fa; border:1px solid rgba(96,165,250,0.25); padding:1px 5px; border-radius:3px">📜 ${item.affixes.length} Phù Văn</span>` : ''}
        </div>
        <div class="text-sm text-dim flex gap-3 items-center">
          ${mainStat ? `<span style="color:var(--text-light); font-weight:600">${mainStat}</span>` : ''}
          ${subStat ? `<span style="color:var(--text-dim); font-size:11px">${subStat}</span>` : ''}
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
            <div class="text-xs text-dim flex gap-4 mb-2" style="opacity:0.8; flex-wrap:wrap">
              <div><strong>Cấp độ:</strong> Lv.${item.itemLevel || 1}</div>
              <div><strong>Phẩm chất:</strong> <span class="rarity-${item.rarity}">${(item.rarity || 'common').toUpperCase()}</span></div>
              ${enh > 0 ? `<div><strong>Cường Hóa:</strong> <span class="badge-enhance tier-${tier} lvl-${enh}">+${enh}</span></div>` : ''}
              <div><strong>Khắc Ấn:</strong> <span style="color:#60a5fa">${(item.affixes || []).length}/4 dòng</span></div>
            </div>
            ${crafted}
          </div>
        </div>

        <!-- PHÙ VĂN KHẮC ẤN PANEL -->
        <div style="background:rgba(0,0,0,0.25); border:1px solid rgba(255,255,255,0.06); border-radius:6px; padding:8px 10px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px">
            <span style="font-weight:700; color:var(--gold, #facc15); font-size:11.5px; display:flex; align-items:center; gap:4px">
              <span>📜 Phù Văn Khắc Ấn</span>
              <span style="color:var(--text-dim); font-weight:normal; font-size:10.5px">(${(item.affixes || []).length}/4 dòng tối đa)</span>
            </span>
            ${(item.affixes || []).length < 4 && isEquipment ? `<span style="font-size:10px; color:#38bdf8;">+ Khắc thêm tại Lò Tạo Hóa</span>` : ''}
          </div>
          <div class="affixes-container">
            ${renderAffixBadges(item.affixes)}
          </div>
        </div>

        ${enh > 0 ? `
          <div style="background:rgba(234,179,8,0.05); border:1px solid rgba(234,179,8,0.18); border-radius:6px; padding:6px 10px; font-size:11.5px; display:flex; justify-content:space-between; align-items:center">
            <span style="color:#fde047; font-weight:600">✨ Uy Lực Cường Hóa (+${enh}):</span>
            <span style="color:var(--text-bright); font-weight:600">${enhanceDesc}</span>
          </div>
        ` : ''}

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

export function fmtAffix(a, full = false) {
  if (!a) return '';
  const statName = (full ? STAT_NAMES_VI[a.stat] : STAT_SHORT_VI[a.stat]) || a.stat || '';
  const s = (a.value || 0) >= 0 ? '+' : '';
  const valStr = a.type === 'increase' ? `${s}${a.value}%` : (a.type === 'more' ? `×${s}${a.value}%` : `${s}${a.value}`);
  const affixName = a.name ? `[${a.name}] ` : '';
  return `${affixName}${valStr} ${statName}`;
}
