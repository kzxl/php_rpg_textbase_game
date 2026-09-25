/**
 * Skills Hub — Kỹ Năng & Lĩnh Ngộ (Mô Hình 4 Trụ Cột)
 * Trụ Cột 1: ⚔️ Chiêu Thức & Tâm Pháp (Active Combat Skills & Passive Mind Methods)
 * Trụ Cột 2: 🐺 Thông Thạo Quái Vật (Monster Mastery, Bestiary & Fog of War)
 * Trụ Cột 3: ⚒️ Thông Thạo Chế Tạo (Crafting Mastery, Alchemy & Forging Perks)
 * Trụ Cột 4: 🌌 Thiên Đạo Dị Biến (Heavenly Glitches, Fog of War & Stances)
 * Phụ Lục:   📚 Tàng Kinh Các (Scripture Library)
 */

import { pageLibrary } from './library.js'
import { renderGlitchPage } from './glitch.js'

export function pageSkills(el, ctx) {
  const { state, api, notify } = ctx
  const player = state.player
  if (!player) return

  const pSkills = player.skills || []
  const learnedIds = pSkills.map(s => typeof s === 'string' ? s : s.id)
  const allSkills = state.skills || []

  // Check if Glitch system has preliminary signs
  const isGlitchUnlocked = (player.realmTier ?? 1) >= 2 || (player.glitchInsight ?? 0) >= 20 || (player.unlockedImprints || []).length > 0

  const pillars = {
    combat: {
      icon: '⚔️',
      name: 'Chiêu Thức & Tâm Pháp',
      sub: `${pSkills.length} đã ngộ • Luyện kỹ`,
      badge: `${pSkills.length}`
    },
    monsters: {
      icon: '🐺',
      name: 'Thông Thạo Quái Vật',
      sub: 'Bách thú đồ giám • Sát quái',
      badge: '★'
    },
    crafting: {
      icon: '⚒️',
      name: 'Thông Thạo Chế Tạo',
      sub: `Lv.${player.craftingLevel || 1} • Đan đạo & Đúc rèn`,
      badge: `Lv.${player.craftingLevel || 1}`
    },
    glitch: {
      icon: isGlitchUnlocked ? '🌌' : '🌫️',
      name: isGlitchUnlocked ? 'Thiên Đạo Dị Biến' : 'Kẽ Hở Quy Luật',
      sub: isGlitchUnlocked ? `${player.glitchInsight || 0} Thấu Triệt` : 'Sương mù che phủ',
      badge: isGlitchUnlocked ? `${player.glitchInsight || 0}` : '?'
    }
  }

  let activePillar = localStorage.getItem('activeSkillPillar') || 'combat'
  let skillFilter = 'all' // 'all' | 'active' | 'passive'
  let monsterFilterRealm = 'all'

  // Data cache
  let monsterMasteryData = null
  let craftingMasteryData = null

  // Maximum active combat skill slots based on Realm Tier
  const getMaxSkillSlots = (realmTier) => {
    switch (realmTier) {
      case 1: return 2 // Luyện Khí
      case 2: return 3 // Trúc Cơ
      case 3: return 4 // Kim Đan
      case 4: return 5 // Nguyên Anh
      default: return 6 // Hoá Thần+
    }
  }

  const renderHeader = () => `
    <div class="page-header" style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px;">
      <div>
        <h1 style="display: flex; align-items: center; gap: 10px;">
          <span>⚡ Tứ Đại Trụ Cột Kỹ Năng</span>
        </h1>
        <div class="text-dim text-sm">Hệ thống tu hành thực chiến: Chiêu thức tôi luyện, thông thạo vạn vật, đúc tạo đan khí & khai mở dị biến.</div>
      </div>
      <div style="display: flex; gap: 8px;">
        <button class="btn btn--sm ${activePillar === 'library' ? 'btn--gold' : 'btn--outline'}" id="btn-open-library">
          📚 Tàng Kinh Các
        </button>
      </div>
    </div>

    <!-- 4 PILLARS SELECTOR -->
    <div class="pillar-tabs">
      ${Object.entries(pillars).map(([key, p]) => `
        <div class="pillar-tab ${activePillar === key ? 'active' : ''}" data-pillar="${key}">
          <div class="pillar-icon">${p.icon}</div>
          <div class="pillar-info">
            <div class="pillar-name">${p.name}</div>
            <div class="pillar-sub">${p.sub}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `

  // ==========================================
  // PILLAR 1: CHIÊU THỨC & TÂM PHÁP
  // ==========================================
  const renderCombatPillar = () => {
    const maxSlots = getMaxSkillSlots(player.realmTier || 1)
    const learned = pSkills.map(ps => {
      const id = typeof ps === 'string' ? ps : ps.id
      const master = allSkills.find(s => s.id === id) || { name: id, id, category: 'combat', type: 'active' }
      return {
        ...master,
        level: ps.level || 1,
        xp: ps.xp || ps.currentXp || 0,
        equipped: ps.equipped || ps.isEquipped || false
      }
    })

    const equippedSkills = learned.filter(s => s.equipped && s.type !== 'passive')
    const activeSkills = learned.filter(s => s.type !== 'passive')
    const passiveSkills = learned.filter(s => s.type === 'passive')

    let displayedSkills = learned
    if (skillFilter === 'active') displayedSkills = activeSkills
    if (skillFilter === 'passive') displayedSkills = passiveSkills

    const renderCard = (s, isLearned) => {
      const xpNeeded = (s.level || 1) * 100
      const xpPct = Math.min(100, ((s.xp || 0) / xpNeeded) * 100)
      const isPassive = s.type === 'passive'
      const tierStars = '★'.repeat(Math.min(s.tier || 1, 7))
      const tierColor = (s.tier || 1) >= 5 ? 'var(--gold)' : (s.tier || 1) >= 3 ? 'var(--purple)' : 'var(--blue)'

      let actionHtml = ''
      if (!isLearned) {
        actionHtml = `<span class="text-dim" style="font-size:11px">Chưa lĩnh ngộ</span>`
      } else if (isPassive) {
        actionHtml = `<span style="font-size:11px; font-weight:700; color:var(--green)">🧘 Tâm Pháp Thường Trực</span>`
      } else if (s.equipped) {
        actionHtml = `<button class="btn btn--sm btn--red equip-btn" data-eq="0" data-sid="${s.id}">Tháo</button>`
      } else {
        const canEquip = equippedSkills.length < maxSlots
        actionHtml = `<button class="btn btn--sm ${canEquip ? 'btn--blue' : 'btn--outline'} equip-btn" data-eq="1" data-sid="${s.id}" ${canEquip ? '' : 'title="Đã đầy ô kỹ năng!"'}>Trang Bị</button>`
      }

      return `
        <div class="skill-card ${isLearned ? '' : 'locked'} ${s.equipped && !isPassive ? 'equipped' : ''}">
          <div class="skill-card-header">
            <div>
              <div class="skill-card-name" style="font-size: 14px;">${s.name}</div>
              <div class="skill-card-tier" style="color:${tierColor}">${tierStars} Tầng ${s.tier || 1} • ${isPassive ? 'Tâm Pháp' : 'Chiêu Thức'}</div>
            </div>
            <div class="skill-card-action">${actionHtml}</div>
          </div>
          <div class="skill-card-desc">${s.description || 'Tuyệt kỹ thượng thừa tu chân giới.'}</div>
          ${isLearned ? `
            <div class="skill-card-mastery">
              <div class="skill-mastery-label">
                <span>Thông thạo Lv.${s.level}</span>
                <span class="text-dim">${s.xp}/${xpNeeded} XP</span>
              </div>
              <div class="bar-track" style="height:4px"><div class="bar-fill xp" style="width:${xpPct}%"></div></div>
              ${s.masteryBonus ? `<div class="skill-mastery-bonus">✨ ${s.masteryBonus}</div>` : ''}
            </div>
          ` : `
            <div class="skill-card-req">
              ${(s.requirements || []).map(r => `<span class="req-tag">🔒 ${r}</span>`).join(' ')}
            </div>
          `}
          ${s.cost ? `<div class="skill-card-cost">🔵 ${s.cost} Linh Lực / lần xuất chiêu</div>` : ''}
        </div>
      `
    }

    return `
      <!-- LOADOUT SLOTS -->
      <div class="loadout-bar">
        <div>
          <div style="font-weight: 700; color: var(--gold); font-size: 13px;">⚔️ Ô Xuất Chiêu Thực Chiến: ${equippedSkills.length}/${maxSlots}</div>
          <div class="text-dim text-xs">Cảnh giới hiện tại cho phép trang bị tối đa ${maxSlots} chiêu thức kích hoạt trong giao đấu.</div>
        </div>
        <div class="loadout-slots">
          ${Array.from({ length: maxSlots }).map((_, idx) => {
            const eq = equippedSkills[idx]
            if (eq) {
              return `<div class="loadout-slot filled" title="${eq.name} (Lv.${eq.level})">⚔️</div>`
            }
            return `<div class="loadout-slot" title="Ô trống">➕</div>`
          }).join('')}
        </div>
      </div>

      <!-- FILTER TABS -->
      <div style="display: flex; gap: 8px; margin-bottom: 14px;">
        <button class="mastery-filter-btn ${skillFilter === 'all' ? 'active' : ''}" data-sfilter="all">Tất Cả (${learned.length})</button>
        <button class="mastery-filter-btn ${skillFilter === 'active' ? 'active' : ''}" data-sfilter="active">⚔️ Chiêu Thức (${activeSkills.length})</button>
        <button class="mastery-filter-btn ${skillFilter === 'passive' ? 'active' : ''}" data-sfilter="passive">🧘 Tâm Pháp (${passiveSkills.length})</button>
      </div>

      <div class="skill-grid">
        ${displayedSkills.length > 0
          ? displayedSkills.map(s => renderCard(s, true)).join('')
          : '<div class="text-dim" style="padding: 20px;">Chưa lĩnh ngộ pháp quyết nào trong danh mục này. Hãy đến Tàng Kinh Các hoặc tầm bảo khi ngao du!</div>'}
      </div>
    `
  }

  // ==========================================
  // PILLAR 2: THÔNG THẠO QUÁI VẬT (BESTIARY)
  // ==========================================
  const renderMonstersPillar = () => {
    if (!monsterMasteryData) {
      return `
        <div style="text-align: center; padding: 40px; color: var(--text-dim);">
          <div style="font-size: 32px; animation: pulse 1.5s infinite;">🐺</div>
          <div style="margin-top: 10px;">Đang triệu hồi Bách Thú Đồ Giám...</div>
        </div>
      `
    }

    const { totalKills, totalSpecies, tierCounts, monsters, tiers } = monsterMasteryData
    const realms = ['all', 'Luyện Khí', 'Trúc Cơ', 'Kim Đan', 'Nguyên Anh']

    const filteredMonsters = monsters.filter(m => {
      if (monsterFilterRealm === 'all') return true
      return (m.tierName || '').includes(monsterFilterRealm)
    })

    return `
      <!-- BESTIARY HERO -->
      <div class="mastery-hero">
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num">${totalKills.toLocaleString()}</span>
          <span class="mastery-stat-label">Tổng Yêu Thú Đã Trảm</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num">${totalSpecies}</span>
          <span class="mastery-stat-label">Loài Trong Giới Đồ</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num" style="color: #3b82f6;">${tierCounts[1] || 0}</span>
          <span class="mastery-stat-label">Chớm Ngộ (1★)</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num" style="color: #10b981;">${tierCounts[2] || 0}</span>
          <span class="mastery-stat-label">Thuần Thục (2★)</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num" style="color: #8b5cf6;">${tierCounts[3] || 0}</span>
          <span class="mastery-stat-label">Đại Thành (3★)</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num" style="color: #f59e0b;">${tierCounts[4] || 0}</span>
          <span class="mastery-stat-label">Khắc Chế (4★)</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num" style="color: #ef4444;">${tierCounts[5] || 0}</span>
          <span class="mastery-stat-label">Tuyệt Diệt (5★)</span>
        </div>
      </div>

      <!-- REALM FILTER -->
      <div class="mastery-filter-bar">
        <span class="text-dim text-xs" style="margin-right: 4px;">Cảnh Giới:</span>
        ${realms.map(r => `
          <button class="mastery-filter-btn ${monsterFilterRealm === r ? 'active' : ''}" data-mrealm="${r}">
            ${r === 'all' ? 'Tất Cả' : r}
          </button>
        `).join('')}
      </div>

      <!-- MONSTER CARDS GRID -->
      <div class="monster-grid">
        ${filteredMonsters.map(m => {
          const mas = m.mastery || {}
          const isFog = (mas.tier || 0) === 0 && (mas.kills || 0) === 0
          const isMax = mas.isMaxTier
          const tierColor = mas.badgeColor || '#6b7280'

          return `
            <div class="monster-mastery-card ${isFog ? 'fog' : ''} ${mas.tier === 5 ? 'apex' : ''}">
              <div>
                <div class="monster-card-top">
                  <div>
                    <div class="monster-card-name">
                      <span>${isFog ? '🌫️' : '🐺'}</span>
                      <span>${m.name}</span>
                    </div>
                    <div class="text-dim text-xs" style="margin-top: 2px;">
                      ${m.tierName || 'Phàm Cấp'} • Ngũ Hành: <b>${m.element || 'Vô'}</b>
                    </div>
                  </div>
                  <span class="monster-tier-tag" style="color: ${tierColor}; border-color: ${tierColor}">
                    ${mas.tierName || 'Vô Tri'}
                  </span>
                </div>

                <div class="monster-kills-row">
                  <span class="monster-stars-display" style="color: ${tierColor}">${mas.stars || '☆☆☆☆☆'}</span>
                  <span>Đã trảm: <b>${mas.kills || 0}</b> con</span>
                </div>

                <!-- PROGRESS BAR -->
                <div class="bar-track" style="height: 5px; margin-bottom: 8px;">
                  <div class="bar-fill" style="width: ${mas.tierProgress || 0}%; background: ${tierColor}"></div>
                </div>
                ${!isMax ? `
                  <div class="text-dim text-xs" style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                    <span>Tiến độ lên Tầng ${mas.nextTier}</span>
                    <span>${mas.kills}/${mas.nextTierReq} kills</span>
                  </div>
                ` : `
                  <div class="text-xs" style="color: #ef4444; font-weight: 700; margin-bottom: 6px;">
                    👑 Đạt cảnh giới Tuyệt Diệt tối cao!
                  </div>
                `}

                <!-- STATS PREVIEW (Revealed at Tier 1+) -->
                ${!isFog ? `
                  <div class="monster-stats-box">
                    <div class="monster-stat-cell">HP: <b>${m.stats.hp}</b></div>
                    <div class="monster-stat-cell">Công: <b>${m.stats.strength}</b></div>
                    <div class="monster-stat-cell">Thủ: <b>${m.stats.defense}</b></div>
                    <div class="monster-stat-cell">Tốc: <b>${m.stats.speed}</b></div>
                    <div class="monster-stat-cell">Thân: <b>${m.stats.dexterity}</b></div>
                    <div class="monster-stat-cell">XP: <b>+${m.xpReward}</b></div>
                  </div>
                ` : `
                  <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 6px; text-align: center; color: var(--text-dim); font-size: 11px; margin: 8px 0;">
                    🌫️ Sương mù dày đặc. Hãy trảm 5 con để khám phá thông tin sinh mệnh và thuộc tính!
                  </div>
                `}
              </div>

              <!-- ACTIVE BUFFS -->
              <div>
                ${mas.tier >= 2 ? `
                  <div class="monster-buff-active">
                    ✨ <b>Khắc chế đang kích hoạt:</b><br/>
                    ${mas.desc}
                  </div>
                ` : `
                  <div class="text-dim text-xs" style="margin-top: 6px; font-style: italic;">
                    🔒 Tầng 2 (20 kills) kích hoạt +10% Sát thương lên loài này.
                  </div>
                `}
              </div>
            </div>
          `
        }).join('')}
      </div>
    `
  }

  // ==========================================
  // PILLAR 3: THÔNG THẠO CHẾ TẠO
  // ==========================================
  const renderCraftingPillar = () => {
    if (!craftingMasteryData) {
      return `
        <div style="text-align: center; padding: 40px; color: var(--text-dim);">
          <div style="font-size: 32px; animation: pulse 1.5s infinite;">⚒️</div>
          <div style="margin-top: 10px;">Đang mở Lò Luyện Đan & Lò Rèn...</div>
        </div>
      `
    }

    const { craftingLevel, craftingXp, xpToNext, progressPercent, title, badgeColor, perks, recipes } = craftingMasteryData

    return `
      <!-- HERO BANNER -->
      <div class="crafting-hero">
        <div class="crafting-hero-header">
          <div class="crafting-hero-title">
            <span>🔥</span>
            <span>Thông Thạo Đan Đạo & Chế Tác</span>
          </div>
          <span class="crafting-rank-badge" style="background: ${badgeColor};">
            ${title} (Lv.${craftingLevel})
          </span>
        </div>

        <div style="margin-bottom: 6px; display: flex; justify-content: space-between; font-size: 12px;">
          <span>Kinh Nghiệm Luyện Chế: <b>${craftingXp} / ${xpToNext} XP</b></span>
          <span style="color: var(--gold);">${progressPercent}%</span>
        </div>
        <div class="bar-track" style="height: 8px; margin-bottom: 12px;">
          <div class="bar-fill" style="width: ${progressPercent}%; background: linear-gradient(90deg, #f59e0b, #ef4444);"></div>
        </div>
        <div class="text-dim text-xs">Mỗi lần luyện chế thành công hoặc thất bại đều tích lũy đan đạo chi lực, tôi luyện trình độ đan sư.</div>

        <!-- CRAFTING PERKS -->
        <div class="crafting-perks-grid">
          <div class="crafting-perk-item">
            <div class="crafting-perk-icon">🎯</div>
            <div class="crafting-perk-info">
              <div class="crafting-perk-name">Tỷ Lệ Thành Công</div>
              <div class="crafting-perk-val">+${perks.successBonusPct}% tỷ lệ luyện thành</div>
            </div>
          </div>

          <div class="crafting-perk-item">
            <div class="crafting-perk-icon">✨</div>
            <div class="crafting-perk-info">
              <div class="crafting-perk-name">Xác Suất Đại Thành</div>
              <div class="crafting-perk-val">${perks.critQualityChance}% (Tinh / Cực / Thiên Phẩm)</div>
            </div>
          </div>

          <div class="crafting-perk-item">
            <div class="crafting-perk-icon">🛡️</div>
            <div class="crafting-perk-info">
              <div class="crafting-perk-name">Bảo Toàn Dược Liệu</div>
              <div class="crafting-perk-val">Thu hồi ${perks.materialReturnRate}% khi nổ lò</div>
            </div>
          </div>

          <div class="crafting-perk-item">
            <div class="crafting-perk-icon">🌟</div>
            <div class="crafting-perk-info">
              <div class="crafting-perk-name">Thiên Phẩm Đan</div>
              <div class="crafting-perk-val">${perks.canCraftDivine ? '✅ Đã kích hoạt (+50% chỉ số)' : '🔒 Yêu cầu Lv.76+'}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- RECIPES & CRAFTING SHORTCUT -->
      <div class="panel">
        <div class="panel-title" style="display: flex; justify-content: space-between; align-items: center;">
          <span>📜 Đan Phương & Công Thức Chế Tác (${recipes.length})</span>
        </div>
        <div class="panel-body">
          <div class="shop-items-grid">
            ${recipes.map(r => {
              const mats = r.materials || []
              const hasAllMats = mats.every(m => (player.materials[m.id] || 0) >= m.amount)
              const hasGold = (player.gold || 0) >= (r.cost || 0)
              const canCraft = hasAllMats && hasGold

              return `
                <div class="shop-item-card">
                  <div class="shop-item-header">
                    <div>
                      <div class="shop-item-name">${r.name}</div>
                      <div class="shop-item-rarity text-dim">Tầng ${r.tier || 1} • Cơ bản ${r.successRate}%</div>
                    </div>
                    <span class="badge" style="background: rgba(208, 165, 48, 0.15); color: var(--gold);">
                      Tốn ${r.cost || 0} 💰
                    </span>
                  </div>
                  <div class="shop-item-desc" style="margin-bottom: 8px;">
                    Dược liệu yêu cầu:<br/>
                    ${mats.map(m => {
                      const cur = player.materials[m.id] || 0
                      const ok = cur >= m.amount
                      return `<span style="color: ${ok ? 'var(--green)' : 'var(--red)'}; font-size: 11px;">• ${m.id} (${cur}/${m.amount})</span>`
                    }).join('<br/>')}
                  </div>
                  <div class="shop-item-footer">
                    <span class="text-xs text-dim">${r.craftTime ? `Thời gian: ${r.craftTime}s` : 'Lập tức'}</span>
                    <button class="btn btn--sm ${canCraft ? 'btn--gold' : 'btn--outline'} btn-craft-action" data-rid="${r.id}" ${canCraft ? '' : 'disabled'}>
                      ${canCraft ? '🔥 Luyện Chế' : 'Thiếu Liệu'}
                    </button>
                  </div>
                </div>
              `
            }).join('')}
          </div>
        </div>
      </div>
    `
  }

  // ==========================================
  // MAIN RENDER LOOP
  // ==========================================
  const render = async () => {
    // 1. TÀNG KINH CÁC TAB
    if (activePillar === 'library') {
      el.innerHTML = `
        ${renderHeader()}
        <div id="library-container"></div>
      `
      bindHeaderEvents()
      const libEl = el.querySelector('#library-container')
      if (libEl) pageLibrary(libEl, ctx)
      return
    }

    // 2. THIÊN ĐẠO DỊ BIẾN TAB
    if (activePillar === 'glitch') {
      el.innerHTML = `
        ${renderHeader()}
        <div id="glitch-container"></div>
      `
      bindHeaderEvents()
      const glitchEl = el.querySelector('#glitch-container')
      if (glitchEl) renderGlitchPage(glitchEl, ctx)
      return
    }

    // 3. CHIÊU THỨC / QUÁI VẬT / CHẾ TẠO
    el.innerHTML = `
      ${renderHeader()}
      <div id="pillar-content">
        ${activePillar === 'combat' ? renderCombatPillar() : ''}
        ${activePillar === 'monsters' ? renderMonstersPillar() : ''}
        ${activePillar === 'crafting' ? renderCraftingPillar() : ''}
      </div>
    `

    bindHeaderEvents()
    bindActionEvents()

    // Lazy load data for Monsters and Crafting if needed
    if (activePillar === 'monsters' && !monsterMasteryData) {
      try {
        monsterMasteryData = await api.getMonsterMastery(player.id)
        const pCont = el.querySelector('#pillar-content')
        if (pCont) {
          pCont.innerHTML = renderMonstersPillar()
          bindActionEvents()
        }
      } catch (e) {
        notify('Không thể tải Bách Thú Đồ Giám: ' + e.message, 'error')
      }
    }

    if (activePillar === 'crafting' && !craftingMasteryData) {
      try {
        craftingMasteryData = await api.getCraftingMastery(player.id)
        const pCont = el.querySelector('#pillar-content')
        if (pCont) {
          pCont.innerHTML = renderCraftingPillar()
          bindActionEvents()
        }
      } catch (e) {
        notify('Không thể tải Thông Thạo Chế Tạo: ' + e.message, 'error')
      }
    }
  }

  const bindHeaderEvents = () => {
    // Pillar Switchers
    el.querySelectorAll('.pillar-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        activePillar = btn.dataset.pillar
        localStorage.setItem('activeSkillPillar', activePillar)
        render()
      })
    })

    // Scripture Library Quick Switch
    const btnLib = el.querySelector('#btn-open-library')
    if (btnLib) {
      btnLib.addEventListener('click', () => {
        activePillar = 'library'
        localStorage.setItem('activeSkillPillar', 'library')
        render()
      })
    }
  }

  const bindActionEvents = () => {
    // Combat Skill Filters
    el.querySelectorAll('[data-sfilter]').forEach(btn => {
      btn.addEventListener('click', () => {
        skillFilter = btn.dataset.sfilter
        render()
      })
    })

    // Monster Realm Filter
    el.querySelectorAll('[data-mrealm]').forEach(btn => {
      btn.addEventListener('click', () => {
        monsterFilterRealm = btn.dataset.mrealm
        const pCont = el.querySelector('#pillar-content')
        if (pCont) {
          pCont.innerHTML = renderMonstersPillar()
          bindActionEvents()
        }
      })
    })

    // Equip / Unequip Skill Handlers
    el.querySelectorAll('.equip-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        try {
          const sid = btn.dataset.sid
          const eq = btn.dataset.eq === '1'
          const data = await api.equipSkill(player.id, sid, eq)
          state.player = data.player
          notify(data.message, 'success')
          render()
        } catch (e) {
          notify(e.message || 'Lỗi trang bị pháp quyết', 'error')
        }
      })
    })

    // Direct Craft Action
    el.querySelectorAll('.btn-craft-action').forEach(btn => {
      btn.addEventListener('click', async () => {
        const rid = btn.dataset.rid
        btn.disabled = true
        btn.innerText = 'Đang luyện...'
        try {
          const res = await api.craftItem(player.id, rid)
          if (res.player) state.player = res.player
          notify(res.message, res.success ? 'success' : 'warning')
          // Refresh crafting data
          craftingMasteryData = await api.getCraftingMastery(player.id)
          render()
        } catch (e) {
          notify(e.message || 'Lỗi luyện chế', 'error')
          btn.disabled = false
          btn.innerText = '🔥 Luyện Chế'
        }
      })
    })
  }

  render()
}
