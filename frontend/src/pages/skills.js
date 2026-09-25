/**
 * Skills Hub — Kỹ Năng & Lĩnh Ngộ (Mô Hình 4 Trụ Cột Chuẩn MDG)
 * Trụ Cột 1: ⚔️ Chiêu Thức (Active Combat Skills & Loadout Slots)
 * Trụ Cột 2: 🧘 Tâm Pháp & Hào Quang (Passive Mind Methods & Mana Reservation)
 * Trụ Cột 3: 🐺 Thông Thạo Quái Vật (Monster Lore, 5★ Bestiary & Fog of War)
 * Trụ Cột 4: ⚒️ Thông Thạo Chế Tạo (Crafting Mastery, Alchemy & Forging Perks)
 * Phụ Lục:   📚 Tàng Kinh Các (Scripture Library) & 🌌 Thiên Đạo Dị Biến (Glitches)
 */

import { pageLibrary } from './library.js'
import { renderGlitchPage } from './glitch.js'

export function pageSkills(el, ctx) {
  const { state, api, notify, updateSidebar } = ctx
  const player = state.player
  if (!player) return

  const pSkills = player.skills || []
  const allSkills = state.skills || []

  // Check if Glitch system has preliminary signs
  const isGlitchUnlocked = (player.realmTier ?? 1) >= 2 || (player.glitchInsight ?? 0) >= 20 || (player.unlockedImprints || []).length > 0

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

  const maxSlots = getMaxSkillSlots(player.realmTier || 1)

  // Standardize learned skills
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

  const activeSkills = learned.filter(s => s.type !== 'passive')
  const passiveSkills = learned.filter(s => s.type === 'passive')
  const equippedSkills = activeSkills.filter(s => s.equipped)

  const pillars = {
    combat: {
      icon: '⚔️',
      name: 'Chiêu Thức',
      sub: `${activeSkills.length} chiêu • ${equippedSkills.length}/${maxSlots} ô xuất`,
      badge: `${equippedSkills.length}/${maxSlots}`
    },
    auras: {
      icon: '🧘',
      name: 'Tâm Pháp & Hào Quang',
      sub: `Khóa ${player.reservationPct || 0}% LL • ${(player.activeAuras || []).length} Hào quang`,
      badge: `${player.reservationPct || 0}%`
    },
    monsters: {
      icon: '🐺',
      name: 'Thông Thạo Quái Vật',
      sub: 'Bách thú đồ giám • Sát quái 5★',
      badge: '★'
    },
    crafting: {
      icon: '⚒️',
      name: 'Thông Thạo Chế Tạo',
      sub: `Lv.${player.craftingLevel || 1} • Đan đạo & Đúc rèn`,
      badge: `Lv.${player.craftingLevel || 1}`
    }
  }

  let activePillar = localStorage.getItem('activeSkillPillar') || 'combat'
  // Validate active pillar
  if (!['combat', 'auras', 'monsters', 'crafting', 'library', 'glitch'].includes(activePillar)) {
    activePillar = 'combat'
  }

  let skillFilter = 'all' // 'all' | 'equipped' | 'unequipped'
  let monsterFilterRealm = 'all'

  // Data cache
  let monsterMasteryData = null
  let craftingMasteryData = null

  // Helper: Render card for skills
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

    // Trigger probability calculation for active skills
    const tierChances = { 1: 55, 2: 45, 3: 40, 4: 35, 5: 30, 6: 25, 7: 20 }
    const baseChance = s.triggerChance || tierChances[s.tier || 1] || 40
    const dexBonus = Math.floor((player.stats?.dexterity || 10) / 10)
    const levelBonus = Math.max(0, (s.level || 1) - 1)
    const stanceBonus = (player.activeStance === 'breaker') ? 5 : 0
    const totalChance = isLearned ? Math.min(85, Math.max(15, baseChance + levelBonus + dexBonus + stanceBonus)) : baseChance

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
        ${!isPassive ? `
          <div class="skill-card-cost" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px; margin-top:8px; padding-top:6px; border-top:1px solid rgba(255,255,255,0.06);">
            <span>🔵 ${s.cost || 0} Linh Lực</span>
            <span style="color:#f59e0b; font-weight:700;" title="Xác suất xuất chiêu: Cơ bản ${baseChance}% + Cấp (+${levelBonus}%) + Mẫn tiệp (+${dexBonus}%)${stanceBonus ? ' + Thế phá quy (+5%)' : ''}">
              🎯 Xác suất xuất chiêu: ${totalChance}%
            </span>
          </div>
        ` : ''}
      </div>
    `
  }

  const renderHeader = () => `
    <div class="page-header" style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px;">
      <div>
        <h1 style="display: flex; align-items: center; gap: 10px;">
          <span>⚡ Tứ Đại Trụ Cột Kỹ Năng</span>
        </h1>
        <div class="text-dim text-sm">Hệ thống tu hành thực chiến: Chiêu thức tôi luyện, tâm pháp hào quang, bách thú đồ giám & đan đạo chế tác.</div>
      </div>
      <div style="display: flex; gap: 8px;">
        <button class="btn btn--sm ${activePillar === 'library' ? 'btn--gold' : 'btn--outline'}" id="btn-open-library">
          📚 Tàng Kinh Các
        </button>
        <button class="btn btn--sm ${activePillar === 'glitch' ? 'btn--purple' : 'btn--outline'}" id="btn-open-glitch">
          ${isGlitchUnlocked ? '🌌 Thiên Đạo Dị Biến' : '🌫️ Kẽ Hở Quy Luật'}
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
  // PILLAR 1: CHIÊU THỨC (ACTIVE COMBAT SKILLS)
  // ==========================================
  const renderCombatPillar = () => {
    let displayedSkills = activeSkills
    if (skillFilter === 'equipped') displayedSkills = activeSkills.filter(s => s.equipped)
    if (skillFilter === 'unequipped') displayedSkills = activeSkills.filter(s => !s.equipped)

    return `
      <!-- LOADOUT SLOTS -->
      <div class="loadout-bar" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 14px; margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div>
          <div style="font-weight: 700; color: var(--gold); font-size: 14px; display: flex; align-items: center; gap: 6px;">
            <span>⚔️ Ô Xuất Chiêu Thực Chiến:</span>
            <span style="color: #fff;">${equippedSkills.length}/${maxSlots}</span>
          </div>
          <div class="text-dim text-xs" style="margin-top: 2px;">
            Cảnh giới hiện tại (${player.realmInfo?.fullName || 'Phàm Cấp'}) cho phép trang bị tối đa <b>${maxSlots}</b> chiêu thức. Mỗi hiệp đấu sẽ tung xúc xắc theo <b>xác suất kích hoạt</b> và tiêu hao Linh Lực thực chiến.
          </div>
        </div>
        <div class="loadout-slots" style="display: flex; gap: 8px;">
          ${Array.from({ length: maxSlots }).map((_, idx) => {
            const eq = equippedSkills[idx]
            if (eq) {
              return `<div class="loadout-slot filled" style="width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; background: rgba(59, 130, 246, 0.15); border: 1px solid var(--blue); border-radius: 6px; font-size: 18px; cursor: pointer;" title="${eq.name} (Lv.${eq.level})">⚔️</div>`
            }
            return `<div class="loadout-slot" style="width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; background: rgba(0, 0, 0, 0.3); border: 1px dashed rgba(255,255,255,0.2); border-radius: 6px; font-size: 14px; color: var(--text-dim);" title="Ô trống">➕</div>`
          }).join('')}
        </div>
      </div>

      <!-- FILTER TABS -->
      <div style="display: flex; gap: 8px; margin-bottom: 14px;">
        <button class="mastery-filter-btn ${skillFilter === 'all' ? 'active' : ''}" data-sfilter="all">Tất Cả Chiêu Thức (${activeSkills.length})</button>
        <button class="mastery-filter-btn ${skillFilter === 'equipped' ? 'active' : ''}" data-sfilter="equipped">Đã Trang Bị (${equippedSkills.length})</button>
        <button class="mastery-filter-btn ${skillFilter === 'unequipped' ? 'active' : ''}" data-sfilter="unequipped">Chưa Trang Bị (${activeSkills.length - equippedSkills.length})</button>
      </div>

      <div class="skill-grid">
        ${displayedSkills.length > 0
          ? displayedSkills.map(s => renderCard(s, true)).join('')
          : '<div class="text-dim" style="padding: 20px;">Chưa có chiêu thức kích hoạt nào trong danh mục này. Hãy đến Tàng Kinh Các để thỉnh bí kíp!</div>'}
      </div>
    `
  }

  // ==========================================
  // PILLAR 2: TÂM PHÁP & HÀO QUANG (MANA RESERVATION)
  // ==========================================
  const renderAurasPillar = () => {
    const auraConfigs = player.auraConfigs || {
      'ho_the_kim_chung': {
        id: 'ho_the_kim_chung',
        name: 'Hộ Thể Kim Chung',
        icon: '🛡️',
        reservationPct: 20,
        desc: 'Khóa 20% Linh Lực tối đa. Tăng +25 Giáp & +100 Máu, giảm 20% sát thương lôi kiếp khi độ kiếp.',
        statBonuses: { defense: 25, maxHp: 100 }
      },
      'than_hanh_bo': {
        id: 'than_hanh_bo',
        name: 'Thần Hành Hào Quang',
        icon: '💨',
        reservationPct: 15,
        desc: 'Khóa 15% Linh Lực tối đa. Tăng +20 Tốc độ & +15 Thân pháp né tránh.',
        statBonuses: { speed: 20, dexterity: 15 }
      },
      'hoa_diem_chan_khi': {
        id: 'hoa_diem_chan_khi',
        name: 'Hỏa Diễm Chân Khí',
        icon: '🔥',
        reservationPct: 25,
        desc: 'Khóa 25% Linh Lực tối đa. Tăng +25 Lực đạo & +10% Tỷ lệ Bạo Kích.',
        statBonuses: { strength: 25, critChance: 10 }
      },
      'toa_thien': {
        id: 'toa_thien',
        name: 'Toạ Thiền Tụ Khí',
        icon: '🧘',
        reservationPct: 10,
        desc: 'Khóa 10% Linh Lực tối đa. Gia tăng tốc độ hồi phục Khí Huyết & Thể Lực (+5 HP & +2 TL / 10s).',
        statBonuses: { hpRegen: 5, staminaRegen: 2 }
      }
    }

    const activeAuras = player.activeAuras || []
    const reservedEnergy = player.reservedEnergy || 0
    const usableEnergy = player.usableEnergy ?? Math.max(0, player.maxEnergy - reservedEnergy)
    const reservationPct = player.reservationPct || 0
    const usablePct = player.maxEnergy > 0 ? Math.round((usableEnergy / player.maxEnergy) * 100) : 100

    return `
      <!-- MANA RESERVATION HERO BANNER -->
      <div class="card" style="margin-bottom: 16px; border: 1px solid rgba(234, 179, 8, 0.3); background: linear-gradient(135deg, rgba(234, 179, 8, 0.08), rgba(0, 0, 0, 0.4)); padding: 18px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 14px;">
          <div>
            <div style="font-weight: 700; font-size: 16px; color: var(--gold); display: flex; align-items: center; gap: 8px;">
              <span>🧘 Cơ Chế Khóa Linh Lực (Mana Reservation)</span>
            </div>
            <div class="text-dim text-xs" style="margin-top: 4px;">
              Tâm pháp hào quang duy trì liên tục trong và ngoài chiến đấu. Mỗi hào quang khóa một tỷ lệ Linh Lực tối đa để ban phước chỉ số vĩnh viễn (Tối đa khóa 85%).
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 13px; font-weight: 600;">
              Linh Lực Khả Dụng: <span style="color: #38bdf8; font-size: 16px; font-weight: 700;">${usableEnergy}</span> / ${player.maxEnergy}
            </div>
            <div style="font-size: 12px; color: #f59e0b; margin-top: 2px;">
              Đã khóa: <b>${reservedEnergy}</b> LL (${reservationPct}% / 85% tối đa)
            </div>
          </div>
        </div>

        <!-- SPLIT RESERVATION BAR -->
        <div style="position: relative; height: 16px; background: rgba(0, 0, 0, 0.5); border-radius: 8px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.1); display: flex; margin-bottom: 12px;">
          <div style="width: ${usablePct}%; background: linear-gradient(90deg, #0284c7, #38bdf8); transition: width 0.4s ease;" title="Linh Lực Khả Dụng: ${usableEnergy}"></div>
          <div style="width: ${reservationPct}%; background: linear-gradient(90deg, #d97706, #fbbf24); transition: width 0.4s ease;" title="Linh Lực Bị Khóa: ${reservedEnergy} (${reservationPct}%)"></div>
        </div>

        <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--text-dim);">
          <span style="display: flex; align-items: center; gap: 4px;"><span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #38bdf8;"></span> Linh Lực Khả Dụng (Dùng cho Chiêu Thức)</span>
          <span style="display: flex; align-items: center; gap: 4px;"><span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #fbbf24;"></span> Linh Lực Bị Khóa (Duy Trì Hào Quang)</span>
        </div>
      </div>

      <!-- AURA GRID -->
      <div style="margin-bottom: 24px;">
        <div style="font-weight: 700; color: var(--gold); font-size: 14px; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
          <span>🌟 Danh Mục Tâm Pháp Hào Quang</span>
          <span class="text-dim text-xs font-normal">(${activeAuras.length}/${Object.keys(auraConfigs).length} đang bật)</span>
        </div>

        <div class="skill-grid">
          ${Object.values(auraConfigs).map(aura => {
            const isActive = activeAuras.includes(aura.id)
            const wouldExceed = !isActive && (reservationPct + aura.reservationPct > 85)

            return `
              <div class="skill-card ${isActive ? 'equipped' : ''}" style="${isActive ? 'border-color: rgba(234, 179, 8, 0.6); box-shadow: 0 0 12px rgba(234, 179, 8, 0.15);' : ''}">
                <div class="skill-card-header">
                  <div>
                    <div class="skill-card-name" style="font-size: 14px; display: flex; align-items: center; gap: 6px;">
                      <span>${aura.icon}</span>
                      <span>${aura.name}</span>
                    </div>
                    <div class="skill-card-tier" style="color: #f59e0b;">Khóa ${aura.reservationPct}% Linh Lực (${Math.floor(player.maxEnergy * (aura.reservationPct / 100))} LL)</div>
                  </div>
                  <div class="skill-card-action">
                    <button class="btn btn--sm ${isActive ? 'btn--gold' : 'btn--outline'} btn-toggle-aura" data-aura="${aura.id}" ${wouldExceed ? 'disabled title="Vượt quá 85% Linh Lực khóa tối đa!"' : ''}>
                      ${isActive ? '✅ Đang Duy Trì' : '🔘 Bật Hào Quang'}
                    </button>
                  </div>
                </div>
                <div class="skill-card-desc" style="margin-top: 6px;">${aura.desc}</div>
                <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px;">
                  ${Object.entries(aura.statBonuses || {}).map(([stat, val]) => `
                    <span class="req-tag" style="background: rgba(234, 179, 8, 0.12); color: #fde047; border: 1px solid rgba(234, 179, 8, 0.2);">
                      +${val} ${stat}
                    </span>
                  `).join('')}
                </div>
              </div>
            `
          }).join('')}
        </div>
      </div>

      <!-- PERMANENT PASSIVE MIND TECHNIQUES -->
      <div>
        <div style="font-weight: 700; color: var(--gold); font-size: 14px; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
          <span>🧘 Tâm Pháp Thường Trực Đã Lĩnh Ngộ</span>
          <span class="text-dim text-xs font-normal">(${passiveSkills.length} tâm pháp)</span>
        </div>

        ${passiveSkills.length > 0 ? `
          <div class="skill-grid">
            ${passiveSkills.map(s => renderCard(s, true)).join('')}
          </div>
        ` : `
          <div class="panel" style="padding: 20px; text-align: center; color: var(--text-dim); font-size: 12px;">
            Chưa lĩnh ngộ tâm pháp bị động thường trực nào. Hãy đến Tàng Kinh Các để thỉnh giáo các bí kíp công pháp thượng thừa!
          </div>
        `}
      </div>
    `
  }

  // ==========================================
  // PILLAR 3: THÔNG THẠO QUÁI VẬT (BESTIARY)
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
          <span class="mastery-stat-num">${(totalKills || 0).toLocaleString()}</span>
          <span class="mastery-stat-label">Tổng Yêu Thú Đã Trảm</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num">${totalSpecies || 0}</span>
          <span class="mastery-stat-label">Loài Trong Giới Đồ</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num" style="color: #3b82f6;">${tierCounts?.[1] || 0}</span>
          <span class="mastery-stat-label">Chớm Ngộ (1★)</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num" style="color: #10b981;">${tierCounts?.[2] || 0}</span>
          <span class="mastery-stat-label">Thuần Thục (2★)</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num" style="color: #8b5cf6;">${tierCounts?.[3] || 0}</span>
          <span class="mastery-stat-label">Đại Thành (3★)</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num" style="color: #f59e0b;">${tierCounts?.[4] || 0}</span>
          <span class="mastery-stat-label">Khắc Chế (4★)</span>
        </div>
        <div class="mastery-stat-pill">
          <span class="mastery-stat-num" style="color: #ef4444;">${tierCounts?.[5] || 0}</span>
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
                    <div class="monster-stat-cell">HP: <b>${m.stats?.hp ?? 0}</b></div>
                    <div class="monster-stat-cell">Công: <b>${m.stats?.strength ?? 0}</b></div>
                    <div class="monster-stat-cell">Thủ: <b>${m.stats?.defense ?? 0}</b></div>
                    <div class="monster-stat-cell">Tốc: <b>${m.stats?.speed ?? 0}</b></div>
                    <div class="monster-stat-cell">Thân: <b>${m.stats?.dexterity ?? 0}</b></div>
                    <div class="monster-stat-cell">XP: <b>+${m.xpReward ?? 0}</b></div>
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
  // PILLAR 4: THÔNG THẠO CHẾ TẠO
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
              <div class="crafting-perk-val">+${perks?.successBonusPct ?? 0}% tỷ lệ luyện thành</div>
            </div>
          </div>

          <div class="crafting-perk-item">
            <div class="crafting-perk-icon">✨</div>
            <div class="crafting-perk-info">
              <div class="crafting-perk-name">Xác Suất Đại Thành</div>
              <div class="crafting-perk-val">${perks?.critQualityChance ?? 0}% (Tinh / Cực / Thiên Phẩm)</div>
            </div>
          </div>

          <div class="crafting-perk-item">
            <div class="crafting-perk-icon">🛡️</div>
            <div class="crafting-perk-info">
              <div class="crafting-perk-name">Bảo Toàn Dược Liệu</div>
              <div class="crafting-perk-val">Thu hồi ${perks?.materialReturnRate ?? 0}% khi nổ lò</div>
            </div>
          </div>

          <div class="crafting-perk-item">
            <div class="crafting-perk-icon">🌟</div>
            <div class="crafting-perk-info">
              <div class="crafting-perk-name">Thiên Phẩm Đan</div>
              <div class="crafting-perk-val">${perks?.canCraftDivine ? '✅ Đã kích hoạt (+50% chỉ số)' : '🔒 Yêu cầu Lv.76+'}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- RECIPES & CRAFTING SHORTCUT -->
      <div class="panel">
        <div class="panel-title" style="display: flex; justify-content: space-between; align-items: center;">
          <span>📜 Đan Phương & Công Thức Chế Tác (${recipes?.length || 0})</span>
        </div>
        <div class="panel-body">
          <div class="shop-items-grid">
            ${(recipes || []).map(r => {
              const mats = r.materials || []
              const hasAllMats = mats.every(m => (player.materials?.[m.id] || 0) >= m.amount)
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
                      const cur = player.materials?.[m.id] || 0
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

    // 3. 4 CHÍNH TRỤ CỘT
    el.innerHTML = `
      ${renderHeader()}
      <div id="pillar-content">
        ${activePillar === 'combat' ? renderCombatPillar() : ''}
        ${activePillar === 'auras' ? renderAurasPillar() : ''}
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
        if (pCont && activePillar === 'monsters') {
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
        if (pCont && activePillar === 'crafting') {
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

    // Glitch Quick Switch
    const btnGlitch = el.querySelector('#btn-open-glitch')
    if (btnGlitch) {
      btnGlitch.addEventListener('click', () => {
        activePillar = 'glitch'
        localStorage.setItem('activeSkillPillar', 'glitch')
        render()
      })
    }
  }

  const bindActionEvents = () => {
    // Combat Skill Filters
    el.querySelectorAll('[data-sfilter]').forEach(btn => {
      btn.addEventListener('click', () => {
        skillFilter = btn.dataset.sfilter
        const pCont = el.querySelector('#pillar-content')
        if (pCont && activePillar === 'combat') {
          pCont.innerHTML = renderCombatPillar()
          bindActionEvents()
        }
      })
    })

    // Aura Toggle Handlers
    el.querySelectorAll('.btn-toggle-aura').forEach(btn => {
      btn.addEventListener('click', async () => {
        const auraId = btn.dataset.aura
        btn.disabled = true
        try {
          const res = await api.toggleAura(player.id, auraId)
          if (res.player) state.player = res.player
          notify(res.message, res.success ? 'success' : 'warning')
          if (typeof updateSidebar === 'function') updateSidebar()
          render()
        } catch (e) {
          notify(e.message || 'Lỗi chuyển trạng thái Hào Quang', 'error')
          btn.disabled = false
        }
      })
    })

    // Monster Realm Filter
    el.querySelectorAll('[data-mrealm]').forEach(btn => {
      btn.addEventListener('click', () => {
        monsterFilterRealm = btn.dataset.mrealm
        const pCont = el.querySelector('#pillar-content')
        if (pCont && activePillar === 'monsters') {
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
          if (typeof updateSidebar === 'function') updateSidebar()
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
          if (typeof updateSidebar === 'function') updateSidebar()
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
