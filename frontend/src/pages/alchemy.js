import { api } from '../services/api.js'

/**
 * Alchemy, Forging & Enhancement Page Controller.
 * Manages 4 Pillars of Crafting:
 * 1. Luyện Đan (Medicines & Pills)
 * 2. Đúc Khí (Equipment Blacksmithing & Forging)
 * 3. Cường Hóa (Equipment Enhancement +1 to +12)
 * 4. Phù Văn (Currency & Affix Modification)
 */
export async function pageAlchemy(el, ctx) {
  const { state, renderGame, notify, updateSidebar } = ctx
  const p = state.player
  const tab = state._alchemyTab || 'recipes'
  const forgeFilter = state._forgeFilter || 'all'

  // Load recipes from state or API
  const medicines = state.medicines || []
  let medicineRecipes = state.recipes || []
  if (!medicineRecipes.length) {
    try {
      const rData = await api.request('/recipes')
      medicineRecipes = rData.recipes || []
      state.recipes = medicineRecipes
    } catch (e) {
      console.warn('Failed loading medicine recipes', e)
    }
  }

  // Load forging recipes
  let forgingRecipes = state._forgingRecipes || []
  if (!forgingRecipes.length) {
    try {
      const fData = await api.getForgingRecipes()
      forgingRecipes = fData.recipes || []
      state._forgingRecipes = forgingRecipes
    } catch (e) {
      console.warn('Failed loading forging recipes', e)
    }
  }

  const getMedName = (id) => {
    const m = medicines.find(x => x.id === id)
    return m ? (m.icon || '💊') + ' ' + m.name : id
  }

  // Calculate player crafting skill bonuses
  let craftBonus = (int) => 0
  let costReduction = 0
  let qualityBonus = 0
  let doubleChance = 0

  ;(p.skills || []).forEach(ps => {
    const sid = typeof ps === 'string' ? ps : ps.id
    const lvl = typeof ps === 'string' ? 1 : (ps.level || 1)
    if (sid === 'tinh_che') craftBonus = lvl * 2
    if (sid === 'phu_an_thuat') costReduction = lvl * 5
    if (sid === 'linh_kiem_thuat') qualityBonus = lvl * 10
    if (sid === 'cuong_hoa_thuat') doubleChance = lvl * 15
  })

  // Crafting level progression
  const craftLvl = p.craftingLevel || 1
  const craftXp = p.craftingXp || 0
  const xpToNext = craftLvl * 50
  const craftProgressPct = Math.min(100, Math.round((craftXp / Math.max(1, xpToNext)) * 100))

  const formatId = (id) => id.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

  // Get all equipment items (equipped + inventory)
  const allItems = []
  Object.entries(p.equipment || {}).forEach(([slot, it]) => {
    if (it) allItems.push({ ...it, loc: 'eq', slotName: slot })
  })
  ;(p.inventory || []).filter(it => it.slot && it.slot !== 'consumable').forEach(it => {
    allItems.push({ ...it, loc: 'inv', slotName: it.slot })
  })

  // Selected item for enhancement
  if (!state._selectedEnhanceItemId && allItems.length > 0) {
    state._selectedEnhanceItemId = allItems[0].id
  }

  // Selected item for currency
  if (!state._selectedCurrencyItemId && allItems.length > 0) {
    state._selectedCurrencyItemId = allItems[0].id
  }

  const rarityColors = {
    legendary: '#f59e0b',
    epic: '#a855f7',
    rare: '#facc15',
    uncommon: '#38bdf8',
    common: '#94a3b8'
  }

  let html = `
    <div class="page-header" style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="display:flex;align-items:center;gap:8px">⚒️ Lò Tạo Hóa (Chế Tác)</h1>
        <div class="text-sm text-dim">Đúc rèn Thần Binh, Luyện Chế Tiên Đan và Cường Hóa Pháp Khí viễn cổ.</div>
      </div>
      
      <!-- CRAFTING MASTERY HUD -->
      <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:8px 14px;min-width:220px">
        <div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;margin-bottom:4px">
          <span style="font-weight:700;color:var(--gold)">🛠️ Luyện Khí Thuật: Cấp ${craftLvl}</span>
          <span class="text-dim text-xs">${craftXp}/${xpToNext} XP</span>
        </div>
        <div style="background:rgba(0,0,0,0.4);border-radius:4px;height:5px;overflow:hidden">
          <div style="background:var(--gold);height:100%;width:${craftProgressPct}%;transition:width 0.3s"></div>
        </div>
      </div>
    </div>

    <!-- 4 TABS NAVIGATION -->
    <div style="display:flex;gap:6px;margin-bottom:14px;overflow-x:auto;padding-bottom:4px">
      <button class="btn ${tab === 'recipes' ? 'btn--gold' : 'btn--dark'} btn--sm tab-btn" data-tab="recipes">
        🔥 Luyện Đan (${medicineRecipes.length})
      </button>
      <button class="btn ${tab === 'forging' ? 'btn--gold' : 'btn--dark'} btn--sm tab-btn" data-tab="forging">
        ⚔️ Đúc Khí (${forgingRecipes.length})
      </button>
      <button class="btn ${tab === 'enhancement' ? 'btn--gold' : 'btn--dark'} btn--sm tab-btn" data-tab="enhancement">
        ✨ Cường Hóa (+1 đến +12)
      </button>
      <button class="btn ${tab === 'currency' ? 'btn--gold' : 'btn--dark'} btn--sm tab-btn" data-tab="currency">
        🔮 Phù Văn
      </button>
    </div>

    <!-- SKILL BUFFS BANNER -->
    ${(craftBonus || costReduction || qualityBonus || doubleChance) ? `
    <div style="background:rgba(255,215,0,0.05);border:1px solid rgba(255,215,0,0.15);border-radius:6px;padding:6px 12px;margin-bottom:12px;font-size:11px;display:flex;gap:12px;flex-wrap:wrap">
      <span style="color:var(--gold);font-weight:600">✨ Gia Trì Nghề Nghiệp:</span>
      ${craftBonus ? `<span>🔥 Thành công +${craftBonus}%</span>` : ''}
      ${costReduction ? `<span>💎 Giảm phí -${costReduction}%</span>` : ''}
      ${qualityBonus ? `<span>✨ Phẩm chất +${qualityBonus}%</span>` : ''}
      ${doubleChance ? `<span>⬆️ Nâng đôi ${doubleChance}%</span>` : ''}
    </div>
    ` : ''}
  `

  // =========================================================================
  // TAB 1: LUYỆN ĐAN (Medicines & Pills)
  // =========================================================================
  if (tab === 'recipes') {
    html += `
      <div class="panel" style="margin-bottom:12px">
        <div class="panel-title">🌿 Khí Hải Tàng Trữ (Dược Liệu)</div>
        <div class="panel-body flex gap-2" style="overflow-x:auto;padding-bottom:10px;white-space:nowrap">
    `
    if (!p.materials || Object.keys(p.materials).length === 0) {
      html += `<div style="color:var(--text-dim);font-size:13px;padding:6px 0">Nguyên liệu trống không...</div>`
    } else {
      for (const [mId, amt] of Object.entries(p.materials)) {
        html += `
          <div class="badge" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);padding:4px 8px;font-size:12px">
            ${formatId(mId)} <span style="color:var(--gold);font-weight:700">x${amt}</span>
          </div>`
      }
    }
    html += `</div></div>`

    html += `<div class="panel"><div class="panel-title">🔥 Đan Phương Truyền Thừa</div><div class="panel-body no-pad">`
    if (medicineRecipes.length === 0) {
      html += `<div style="padding:16px" class="text-dim">Chưa có công thức đan dược...</div>`
    } else {
      medicineRecipes.forEach(r => {
        const targetName = getMedName(r.target)
        const finalRate = Math.min(100, (r.successRate || 100) + craftBonus)
        let reqHtml = ''
        if (r.requirements?.skill) {
          reqHtml = `<div class="text-orange" style="font-size:12px;margin-bottom:8px">Yêu cầu: ${formatId(r.requirements.skill)} lv${r.requirements.level || 1}</div>`
        }
        let matHtml = ''
        ;(r.materials || []).forEach(m => {
          const has = p.materials?.[m.id] || 0
          matHtml += `
            <span style="font-size:12px;margin-right:10px;display:inline-block;background:rgba(255,255,255,0.05);padding:3px 8px;border-radius:4px">
              <span style="color:${has >= m.amount ? 'var(--green)' : 'var(--red)'};font-weight:bold">${has}/${m.amount}</span> ${formatId(m.id)}
            </span>`
        })
        const targetMed = medicines.find(x => x.id === r.target) || {}
        html += `
          <div class="list-item" style="flex-direction:column;padding:0;align-items:stretch;border-bottom:1px solid rgba(255,255,255,0.05)">
            <div class="accordion-header" style="display:flex;justify-content:space-between;align-items:center;padding:12px 14px;cursor:pointer">
              <div style="display:flex;flex-direction:column;gap:4px">
                <strong style="color:var(--gold);font-size:15px">${targetName}</strong>
                <div class="text-xs text-dim flex gap-3">
                  <span class="badge" style="padding:2px 6px">Tier ${r.tier}</span>
                  <span>Tỉ lệ: <span style="color:${finalRate >= 80 ? 'var(--green)' : 'var(--blue)'};font-weight:bold">${finalRate}%</span></span>
                  <span>🔥 Phí: ${r.cost} L.Thạch</span>
                </div>
              </div>
              <div class="text-dim" style="font-size:12px">▼</div>
            </div>
            <div class="accordion-body" style="display:none;padding:12px 14px;background:rgba(0,0,0,0.25);border-top:1px solid rgba(255,255,255,0.05)">
              ${reqHtml}
              <div style="margin-bottom:10px">
                <div class="text-dim" style="font-size:11px;margin-bottom:4px">Nguyên liệu cần có:</div>
                <div class="flex flex-wrap gap-2">${matHtml}</div>
              </div>
              <div class="text-dim" style="font-size:12px;margin-bottom:12px;line-height:1.4">
                <strong>Công Dụng:</strong> ${targetMed.description || 'Chưa rõ.'}
              </div>
              <button class="btn btn--gold btn-craft" style="width:100%;justify-content:center" data-recipe="${r.id}">
                🔥 Khởi Lò Luyện Đan
              </button>
            </div>
          </div>`
      })
    }
    html += `</div></div>`
  }

  // =========================================================================
  // TAB 2: ĐÚC KHÍ (Equipment Forging)
  // =========================================================================
  else if (tab === 'forging') {
    const slotIcons = {
      weapon: '⚔️',
      body: '🛡️',
      shield: '🛡️',
      feet: '👢',
      ring: '💍'
    }

    const filteredForging = forgingRecipes.filter(r => {
      if (forgeFilter === 'all') return true
      return r.slot === forgeFilter
    })

    html += `
      <!-- SUB-FILTERS FOR FORGING -->
      <div style="display:flex;gap:6px;margin-bottom:12px;overflow-x:auto;padding-bottom:4px">
        <button class="btn ${forgeFilter==='all'?'btn--gold':'btn--dark'} btn--xs filter-forge-btn" data-filter="all">Tất Cả (${forgingRecipes.length})</button>
        <button class="btn ${forgeFilter==='weapon'?'btn--gold':'btn--dark'} btn--xs filter-forge-btn" data-filter="weapon">⚔️ Vũ Khí</button>
        <button class="btn ${forgeFilter==='body'?'btn--gold':'btn--dark'} btn--xs filter-forge-btn" data-filter="body">🛡️ Hộ Giáp</button>
        <button class="btn ${forgeFilter==='shield'?'btn--gold':'btn--dark'} btn--xs filter-forge-btn" data-filter="shield">🛡️ Khiên</button>
        <button class="btn ${forgeFilter==='ring'?'btn--gold':'btn--dark'} btn--xs filter-forge-btn" data-filter="ring">💍 Giới Chỉ</button>
        <button class="btn ${forgeFilter==='feet'?'btn--gold':'btn--dark'} btn--xs filter-forge-btn" data-filter="feet">👢 Giày / Hài</button>
      </div>

      <div class="panel">
        <div class="panel-title" style="display:flex;justify-content:space-between;align-items:center">
          <span>⚒️ Danh Sách Bản Đồ Đúc Khí</span>
          <span class="text-xs text-dim">Khoáng thạch & Vật liệu yêu thú</span>
        </div>
        <div class="panel-body no-pad">
    `

    if (filteredForging.length === 0) {
      html += `<div style="padding:16px" class="text-dim">Không có công thức đúc khí trong mục này.</div>`
    } else {
      filteredForging.forEach(r => {
        const icon = slotIcons[r.slot] || '⚔️'
        const rColor = rarityColors[r.rarity] || '#94a3b8'
        const finalRate = Math.min(100, r.successRate + Math.floor(craftLvl / 4) + craftBonus)
        
        let canForge = (p.gold >= r.cost)
        let matsHtml = ''
        ;(r.materials || []).forEach(m => {
          const has = p.materials?.[m.id] || 0
          const ok = has >= m.amount
          if (!ok) canForge = false
          matsHtml += `
            <span style="font-size:12px;background:rgba(255,255,255,0.04);border:1px solid ${ok ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'};padding:3px 8px;border-radius:4px">
              <span style="color:${ok ? 'var(--green)' : 'var(--red)'};font-weight:700">${has}/${m.amount}</span> ${m.name || formatId(m.id)}
            </span>`
        })

        html += `
          <div class="list-item" style="flex-direction:column;padding:0;align-items:stretch;border-bottom:1px solid rgba(255,255,255,0.05)">
            <div class="accordion-header" style="display:flex;justify-content:space-between;align-items:center;padding:12px 14px;cursor:pointer">
              <div style="display:flex;align-items:center;gap:12px">
                <div style="font-size:26px">${icon}</div>
                <div>
                  <div style="font-weight:700;font-size:15px;color:${rColor}">${r.name}</div>
                  <div class="text-xs text-dim flex gap-3 mt-xs">
                    <span class="badge" style="border:1px solid ${rColor};color:${rColor};padding:1px 6px;text-transform:uppercase">${r.rarity}</span>
                    <span>Tier ${r.tier}</span>
                    <span>Tỉ lệ: <span style="color:${finalRate >= 75 ? 'var(--green)' : 'var(--blue)'};font-weight:700">${finalRate}%</span></span>
                    <span>🔥 ${r.cost} Linh Thạch</span>
                  </div>
                </div>
              </div>
              <div class="text-dim" style="font-size:12px">▼</div>
            </div>

            <div class="accordion-body" style="display:none;padding:14px;background:rgba(0,0,0,0.25);border-top:1px solid rgba(255,255,255,0.05)">
              <div style="margin-bottom:10px">
                <div class="text-dim" style="font-size:11px;margin-bottom:6px">Nguyên liệu cần thiết:</div>
                <div class="flex flex-wrap gap-2">${matsHtml}</div>
              </div>
              <div class="text-dim" style="font-size:12px;margin-bottom:12px;line-height:1.4">
                <strong>Đặc Tính:</strong> ${r.description}
              </div>
              <button class="btn btn--gold btn-forge" style="width:100%;justify-content:center" data-recipe="${r.id}" ${canForge ? '' : 'disabled'}>
                ${canForge ? `⚒️ Khởi Động Lò Đúc (${r.cost} 💎)` : '❌ Thiếu Nguyên Liệu hoặc Linh Thạch'}
              </button>
            </div>
          </div>`
      })
    }
    html += `</div></div>`
  }

  // =========================================================================
  // TAB 3: CƯỜNG HÓA (+1 đến +12)
  // =========================================================================
  else if (tab === 'enhancement') {
    const selectedItem = allItems.find(it => it.id === state._selectedEnhanceItemId) || allItems[0]

    html += `
      <div class="panel" style="margin-bottom:12px">
        <div class="panel-title">⚔️ Chọn Trang Bị Cần Cường Hóa</div>
        <div class="panel-body" style="padding:10px 14px">
    `

    if (allItems.length === 0) {
      html += `<div style="opacity:0.4;padding:8px 0">Không có trang bị nào trên người hoặc trong túi.</div>`
    } else {
      html += `
        <select id="selEnhanceItem" style="width:100%;padding:10px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.15);border-radius:6px;font-size:13px">
          ${allItems.map(it => {
            const enh = it.enhanceLevel > 0 ? `+${it.enhanceLevel}` : ''
            return `
              <option value="${it.id}" ${it.id === selectedItem?.id ? 'selected' : ''}>
                ${it.loc === 'eq' ? '🔸 [Đang Mặc]' : '📦 [Túi]'} ${it.displayName || it.name} (${it.rarity || 'common'}) ${enh}
              </option>`
          }).join('')}
        </select>
      `
    }
    html += `</div></div>`

    if (selectedItem) {
      const curLvl = selectedItem.enhanceLevel || 0
      const isMax = curLvl >= 12
      const nextLvl = curLvl + 1
      const ilvl = selectedItem.itemLevel || 1

      // Compute costs and chances inline for instant render
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
      const playerStones = p.materials?.['da_cuong_hoa'] || 0
      const hasEnoughStones = playerStones >= stonesReq
      const hasEnoughGold = p.gold >= goldCost
      const canEnhance = !isMax && hasEnoughStones && hasEnoughGold

      const riskLabels = {
        safe: '<span style="color:#10b981;font-weight:700">✅ 100% Tuyệt Đối Thành Công</span>',
        safe_fail: '<span style="color:#38bdf8;font-weight:700">🛡️ Thất Bại Giữ Nguyên Cấp</span>',
        downgrade: '<span style="color:#f87171;font-weight:700">⚠️ Rủi Ro: Thất Bại Bị Rớt 1 Cấp (-1)</span>'
      }

      html += `
        <div class="panel" style="border:1px solid rgba(255,215,0,0.2);box-shadow:0 0 20px rgba(0,0,0,0.4)">
          <div class="panel-body text-center" style="padding:20px 16px">
            
            <!-- ITEM HEADER -->
            <div style="font-size:36px;margin-bottom:8px">✨</div>
            <h2 style="color:${rarityColors[selectedItem.rarity] || '#fff'};margin-bottom:4px">
              ${selectedItem.displayName || selectedItem.name}
            </h2>
            <div class="text-sm text-dim" style="margin-bottom:16px">
              Loại: <span style="text-transform:uppercase">${selectedItem.slot || selectedItem.baseType}</span> | Cấp trang bị: iLvl ${selectedItem.itemLevel || 1}
            </div>

            <!-- LEVEL PROGRESSION METER -->
            <div style="background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:14px;margin-bottom:16px">
              <div style="display:flex;justify-content:space-around;align-items:center;margin-bottom:10px">
                <div style="text-align:center">
                  <div class="text-xs text-dim">Hiện Tại</div>
                  <div style="font-size:24px;font-weight:800;color:var(--text-bright)">+${curLvl}</div>
                </div>
                <div style="font-size:20px;color:var(--gold)">➜</div>
                <div style="text-align:center">
                  <div class="text-xs text-dim">Mục Tiêu</div>
                  <div style="font-size:24px;font-weight:800;color:var(--gold)">
                    ${isMax ? 'MAX' : `+${nextLvl}`}
                  </div>
                </div>
              </div>

              ${!isMax ? `
              <!-- CHANCE PROGRESS BAR -->
              <div style="margin-bottom:8px">
                <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px">
                  <span>Tỉ Lệ Thành Công:</span>
                  <strong style="color:${successRate >= 60 ? 'var(--green)' : (successRate >= 30 ? 'var(--gold)' : 'var(--red)')}">
                    ${successRate}%
                  </strong>
                </div>
                <div style="background:rgba(255,255,255,0.08);height:8px;border-radius:4px;overflow:hidden">
                  <div style="background:${successRate >= 60 ? 'var(--green)' : (successRate >= 30 ? 'var(--gold)' : 'var(--red)')};height:100%;width:${successRate}%"></div>
                </div>
              </div>
              <div style="font-size:11px">${riskLabels[riskType]}</div>
              ` : `
              <div style="color:var(--gold);font-weight:700">🌟 TRANG BỊ ĐÃ ĐẠT CƯỜNG HÓA TỐI ĐA CỬU THIÊN (+12)!</div>
              `}
            </div>

            <!-- COST REQUIREMENTS -->
            ${!isMax ? `
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px">
              <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:10px">
                <div style="font-size:18px">💎</div>
                <div class="text-xs text-dim">Đá Cường Hóa</div>
                <div style="font-size:14px;font-weight:700;color:${hasEnoughStones ? 'var(--green)' : 'var(--red)'}">
                  ${playerStones} / ${stonesReq} viên
                </div>
              </div>

              <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:10px">
                <div style="font-size:18px">💰</div>
                <div class="text-xs text-dim">Linh Thạch Tiêu Hao</div>
                <div style="font-size:14px;font-weight:700;color:${hasEnoughGold ? 'var(--gold)' : 'var(--red)'}">
                  ${p.gold} / ${goldCost} 💎
                </div>
              </div>
            </div>

            <!-- ENHANCE BUTTON -->
            <button class="btn btn--gold btn--lg btn-enhance" style="width:100%;justify-content:center;font-size:16px;font-weight:800" data-item="${selectedItem.id}" ${canEnhance ? '' : 'disabled'}>
              ${canEnhance ? `✨ TIẾN HÀNH CƯỜNG HÓA (+${nextLvl})` : (isMax ? 'ĐÃ ĐẠT CẤP TỐI ĐA' : '❌ KHÔNG ĐỦ NGUYÊN LIỆU')}
            </button>
            ` : ''}

          </div>
        </div>
      `
    }
  }

  // =========================================================================
  // TAB 4: PHÙ VĂN (Currency Crafting)
  // =========================================================================
  else if (tab === 'currency') {
    html += `
      <div class="panel" style="margin-bottom:10px">
        <div class="panel-title">⚔️ Chọn Trang Bị Khắc Ấn</div>
        <div class="panel-body" style="padding:10px 14px">
          ${allItems.length === 0 ? '<div style="opacity:0.3">Không có trang bị nào...</div>' : `
          <select id="selCurrencyItem" style="width:100%;padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px;font-size:13px">
            ${allItems.map(it => `
              <option value="${it.id}" ${it.id === state._selectedCurrencyItemId ? 'selected' : ''}>
                ${it.loc === 'eq' ? '🔸 [Đang Mặc]' : '📦 [Túi]'} ${it.displayName || it.name} [${it.rarity || '?'}] ${(it.affixes || []).length} dòng
              </option>`).join('')}
          </select>
          <div id="currencyItemPreview" style="margin-top:8px;font-size:12px;opacity:0.7"></div>
          `}
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px">
        ${[
          { id: 'tay_tuy_phu', name: 'Tẩy Tủy Phù', icon: '🔄', desc: 'Xóa toàn bộ affix và roll lại ngẫu nhiên', cost: 200 },
          { id: 'hon_chu_phu', name: 'Hỗn Chú Phù', icon: '➕', desc: 'Thêm 1 dòng affix ngẫu nhiên (tối đa 4)', cost: 500 },
          { id: 'thien_menh_phu', name: 'Thiên Mệnh Phù', icon: '🔒', desc: 'Khóa 1 dòng affix, xóa và roll lại phần còn lại', cost: 1000 },
          { id: 'thang_cap_phu', name: 'Thăng Cấp Phù', icon: '⬆️', desc: 'Tăng item level +1 (tối đa +5)', cost: 1500 },
        ].map(c => {
          const realCost = Math.max(1, Math.round(c.cost * (1 - costReduction / 100)))
          return `
            <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px">
              <div style="font-size:22px;margin-bottom:4px">${c.icon}</div>
              <div style="font-weight:700;font-size:13px;margin-bottom:2px">${c.name}</div>
              <div style="font-size:11px;opacity:0.5;margin-bottom:8px;line-height:1.3">${c.desc}</div>
              <button class="btn btn--gold btn--sm btn-currency" data-cid="${c.id}" style="width:100%">
                💎 ${realCost} ${costReduction > 0 ? `<s style="opacity:0.4;font-size:10px">${c.cost}</s>` : ''}
              </button>
            </div>`
        }).join('')}
      </div>
    `
  }

  el.innerHTML = html

  // =========================================================================
  // DOM EVENT BINDINGS
  // =========================================================================

  // 1. Tab switching
  el.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state._alchemyTab = btn.dataset.tab
      pageAlchemy(el, ctx)
    })
  })

  // 2. Forging category filters
  el.querySelectorAll('.filter-forge-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state._forgeFilter = btn.dataset.filter
      pageAlchemy(el, ctx)
    })
  })

  // 3. Accordion toggling
  el.querySelectorAll('.accordion-header').forEach(hdr => {
    hdr.addEventListener('click', () => {
      const body = hdr.nextElementSibling
      if (!body) return
      if (body.style.display === 'none') {
        body.style.display = 'block'
        const icon = hdr.querySelector('.text-dim:last-child')
        if (icon) icon.textContent = '▲'
      } else {
        body.style.display = 'none'
        const icon = hdr.querySelector('.text-dim:last-child')
        if (icon) icon.textContent = '▼'
      }
    })
  })

  // 4. Medicine craft click
  el.querySelectorAll('.btn-craft').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation()
      const rId = btn.dataset.recipe
      btn.disabled = true; btn.textContent = '⏳ Đang khởi lò...'
      try {
        const res = await api.craftItem(p.id, rId)
        state.player = res.player
        notify(res.message, res.success ? 'success' : 'error')
        updateSidebar()
        pageAlchemy(el, ctx)
      } catch (err) {
        notify(err.message, 'error')
        btn.disabled = false; btn.textContent = '🔥 Khởi Lò Luyện Đan'
      }
    })
  })

  // 5. Equipment forge click
  el.querySelectorAll('.btn-forge').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation()
      const rId = btn.dataset.recipe
      btn.disabled = true; btn.textContent = '⚒️ Đang rèn...'
      try {
        const res = await api.forgeItem(p.id, rId)
        state.player = res.player
        notify(res.message, res.success ? 'success' : 'error')
        updateSidebar()
        pageAlchemy(el, ctx)
      } catch (err) {
        notify(err.message, 'error')
        btn.disabled = false; btn.textContent = '⚒️ Khởi Động Lò Đúc'
      }
    })
  })

  // 6. Enhancement item selection & enhance action
  const selEnh = document.getElementById('selEnhanceItem')
  if (selEnh) {
    selEnh.addEventListener('change', () => {
      state._selectedEnhanceItemId = selEnh.value
      pageAlchemy(el, ctx)
    })
  }

  el.querySelectorAll('.btn-enhance').forEach(btn => {
    btn.addEventListener('click', async () => {
      const itId = btn.dataset.item
      btn.disabled = true; btn.textContent = '✨ Đang luyện...'
      try {
        const res = await api.enhanceItem(p.id, itId)
        state.player = res.player
        notify(res.message, res.isSuccess ? 'success' : 'error')
        updateSidebar()
        pageAlchemy(el, ctx)
      } catch (err) {
        notify(err.message, 'error')
        btn.disabled = false; btn.textContent = '✨ TIẾN HÀNH CƯỜNG HÓA'
      }
    })
  })

  // 7. Currency crafting selection & execution
  const selCur = document.getElementById('selCurrencyItem')
  if (selCur) {
    const updateCurPreview = () => {
      const it = allItems.find(i => i.id === selCur.value)
      const preview = document.getElementById('currencyItemPreview')
      if (it && preview) {
        preview.innerHTML = (it.affixes || []).map(a => `<span style="color:var(--blue)">• ${a.name || a.stat} +${a.value}</span>`).join(' | ') || 'Chưa có dòng thuộc tính nào'
      }
    }
    selCur.addEventListener('change', () => {
      state._selectedCurrencyItemId = selCur.value
      updateCurPreview()
    })
    updateCurPreview()
  }

  el.querySelectorAll('.btn-currency').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!selCur?.value) return notify('Chọn trang bị trước!', 'error')
      const cid = btn.dataset.cid
      let lockIdx = -1

      if (cid === 'thien_menh_phu') {
        const it = allItems.find(i => i.id === selCur.value)
        const affixes = it?.affixes || []
        if (affixes.length === 0) return notify('Trang bị không có dòng thuộc tính để khóa!', 'error')
        const choice = prompt(`Chọn số thứ tự dòng muốn khóa (0-${affixes.length - 1}):\n${affixes.map((a, i) => `${i}: ${a.name || a.stat} +${a.value}`).join('\n')}`)
        if (choice === null) return
        lockIdx = parseInt(choice)
        if (isNaN(lockIdx) || lockIdx < 0 || lockIdx >= affixes.length) return notify('Chỉ số không hợp lệ!', 'error')
      }

      btn.disabled = true; btn.textContent = '⏳...'
      try {
        const res = await api.applyCurrency(p.id, cid, selCur.value, lockIdx)
        notify(res.message, 'success')
        state.player = res.player
        updateSidebar()
        pageAlchemy(el, ctx)
      } catch (e) {
        notify(e.message, 'error')
        btn.disabled = false; btn.textContent = '💎 Dùng'
      }
    })
  })
}
