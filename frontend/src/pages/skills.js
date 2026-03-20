/**
 * Skills Page — Kỹ Năng (3 Tabs: Chiến Đấu / Sinh Hoạt / Nội Công)
 * Unified mastery/proficiency system across all categories.
 */
export function pageSkills(el, ctx) {
  const { state, api, notify } = ctx
  const pSkills = state.player.skills || []
  const learnedIds = pSkills.map(s => typeof s === 'string' ? s : s.id)
  const allSkills = state.skills || []
  const categories = {
    combat:   { icon: '⚔️', name: 'Chiến Đấu', desc: 'Chiêu thức sử dụng trong giao đấu' },
    life:     { icon: '🛠️', name: 'Sinh Hoạt', desc: 'Thu thập, chế tạo, sinh tồn' },
    internal: { icon: '🧘', name: 'Nội Công', desc: 'Công pháp thụ động tăng cường bản thân' }
  }

  let activeTab = localStorage.getItem('skillsTab') || 'combat'

  const render = () => {
    // Learned skills enriched with master data
    const learned = pSkills.map(ps => {
      const id = typeof ps === 'string' ? ps : ps.id
      const master = allSkills.find(s => s.id === id) || { name: id, id, category: 'combat' }
      return {
        ...master,
        level: ps.level || 1,
        xp: ps.xp || ps.currentXp || 0,
        equipped: ps.equipped || ps.isEquipped || false
      }
    })

    // Filter by active tab
    const tabSkills = learned.filter(s => (s.category || 'combat') === activeTab)
    const unlearned = allSkills.filter(s => (s.category || 'combat') === activeTab && !learnedIds.includes(s.id))

    // Tab buttons
    const tabsHtml = Object.entries(categories).map(([key, cat]) => {
      const count = learned.filter(s => (s.category || 'combat') === key).length
      return `<button class="skill-tab ${key === activeTab ? 'active' : ''}" data-tab="${key}">
        ${cat.icon} ${cat.name} <span class="skill-tab-count">${count}</span>
      </button>`
    }).join('')

    // Skill card renderer
    const renderSkill = (s, isLearned) => {
      const xpNeeded = s.level * 100
      const xpPct = Math.min(100, (s.xp / xpNeeded) * 100)
      const isPassive = s.type === 'passive'
      const tierStars = '★'.repeat(Math.min(s.tier || 1, 7))
      const tierColor = (s.tier || 1) >= 5 ? 'var(--gold)' : (s.tier || 1) >= 3 ? 'var(--purple)' : 'var(--blue)'

      let actionHtml = ''
      if (!isLearned) {
        actionHtml = `<span class="text-dim" style="font-size:11px">Chưa lĩnh ngộ</span>`
      } else if (isPassive) {
        actionHtml = `<span style="font-size:10px;color:var(--green)">🔮 Vĩnh Viễn</span>`
      } else if (s.equipped) {
        actionHtml = `<button class="btn btn--sm btn--red equip-btn" data-eq="0" data-sid="${s.id}">Tháo</button>`
      } else {
        actionHtml = `<button class="btn btn--sm btn--blue equip-btn" data-eq="1" data-sid="${s.id}">Trang Bị</button>`
      }

      return `
        <div class="skill-card ${isLearned ? '' : 'locked'} ${s.equipped && !isPassive ? 'equipped' : ''}">
          <div class="skill-card-header">
            <div>
              <div class="skill-card-name">${s.name}</div>
              <div class="skill-card-tier" style="color:${tierColor}">${tierStars} Tầng ${s.tier || 1}</div>
            </div>
            <div class="skill-card-action">${actionHtml}</div>
          </div>
          <div class="skill-card-desc">${s.description || ''}</div>
          ${isLearned ? `
            <div class="skill-card-mastery">
              <div class="skill-mastery-label">
                <span>Thông thạo Lv.${s.level}</span>
                <span class="text-dim">${s.xp}/${xpNeeded}</span>
              </div>
              <div class="bar-track" style="height:4px"><div class="bar-fill xp" style="width:${xpPct}%"></div></div>
              ${s.masteryBonus ? `<div class="skill-mastery-bonus">✨ ${s.masteryBonus}</div>` : ''}
            </div>
          ` : `
            <div class="skill-card-req">
              ${(s.requirements || []).map(r => `<span class="req-tag">🔒 ${r}</span>`).join(' ')}
            </div>
          `}
          ${s.cost ? `<div class="skill-card-cost">🔵 ${s.cost} Linh Lực</div>` : ''}
        </div>
      `
    }

    el.innerHTML = `
      <div class="page-header">
        <h1>⚡ Kỹ Năng</h1>
        <div class="text-dim text-sm">Thông thạo tăng theo sử dụng — mỗi level tăng hiệu quả.</div>
      </div>

      <div class="skill-tabs">${tabsHtml}</div>

      <div class="panel">
        <div class="panel-title">
          ${categories[activeTab].icon} ${categories[activeTab].name}
          <span class="subtitle">${categories[activeTab].desc}</span>
        </div>
        <div class="panel-body">
          ${tabSkills.length === 0 && unlearned.length === 0
            ? '<div class="text-dim">Chưa có kỹ năng nào trong nhánh này.</div>'
            : ''}
          
          ${tabSkills.length > 0 ? `
            <div class="skill-grid">
              ${tabSkills.map(s => renderSkill(s, true)).join('')}
            </div>
          ` : ''}

          ${unlearned.length > 0 ? `
            <div style="margin-top:16px;padding-top:12px;border-top:1px solid var(--border)">
              <div class="text-dim text-sm" style="margin-bottom:8px">🔒 Chưa lĩnh ngộ (${unlearned.length})</div>
              <div class="skill-grid">
                ${unlearned.map(s => renderSkill({ ...s, level: 0, xp: 0 }, false)).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `

    // Tab click handlers
    el.querySelectorAll('.skill-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = btn.dataset.tab
        localStorage.setItem('skillsTab', activeTab)
        render()
      })
    })

    // Equip handlers
    el.querySelectorAll('.equip-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        try {
          const sid = btn.dataset.sid
          const eq = btn.dataset.eq === '1'
          const data = await api.equipSkill(state.playerId, sid, eq)
          state.player = data.player
          notify(data.message, 'success')
          render()
        } catch (e) {
          notify(e.message || 'Lỗi trang bị', 'error')
        }
      })
    })
  }

  render()
}
