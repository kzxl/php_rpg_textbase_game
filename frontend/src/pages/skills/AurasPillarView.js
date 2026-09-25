import { Component } from '../../core/Component.js'
import { AURA_CONFIGS } from './constants.js'
import { SkillCard } from './SkillCard.js'

/**
 * AurasPillarView Component: Manages Passive Mind Methods & Mana Reservation Auras.
 */
export class AurasPillarView extends Component {
  template() {
    const { ctx } = this.props
    const player = ctx?.state?.player || {}
    const pSkills = player.skills || []
    const allSkills = ctx?.state?.skills || []

    const learned = pSkills.map(ps => {
      const id = typeof ps === 'string' ? ps : ps.id
      const master = allSkills.find(s => s.id === id) || { name: id, id, category: 'mind', type: 'passive' }
      return {
        ...master,
        level: ps.level || 1,
        xp: ps.xp || ps.currentXp || 0,
        equipped: true
      }
    })

    const passiveSkills = learned.filter(s => s.type === 'passive')

    const auraConfigs = player.auraConfigs || AURA_CONFIGS
    const activeAuras = player.activeAuras || []
    const reservedEnergy = player.reservedEnergy || 0
    const usableEnergy = player.usableEnergy ?? Math.max(0, (player.maxEnergy || 100) - reservedEnergy)
    const reservationPct = player.reservationPct || 0
    const usablePct = player.maxEnergy > 0 ? Math.round((usableEnergy / player.maxEnergy) * 100) : 100

    return `
      <div class="auras-pillar-view">
        <!-- MANA RESERVATION HERO BANNER -->
        <div class="card" style="margin-bottom: 16px; border: 1px solid rgba(234, 179, 8, 0.3); background: linear-gradient(135deg, rgba(234, 179, 8, 0.08), rgba(0, 0, 0, 0.4)); padding: 18px; border-radius:10px">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 14px;">
            <div>
              <div style="font-weight: 700; font-size: 16px; color: var(--gold, #facc15); display: flex; align-items: center; gap: 8px;">
                <span>🧘 Cơ Chế Khóa Linh Lực (Mana Reservation)</span>
              </div>
              <div class="text-dim text-xs" style="margin-top: 4px; font-size:11px; color:var(--text-dim)">
                Tâm pháp hào quang duy trì liên tục trong và ngoài chiến đấu. Mỗi hào quang khóa một tỷ lệ Linh Lực tối đa để ban phước chỉ số vĩnh viễn (Tối đa khóa 85%).
              </div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 13px; font-weight: 600;">
                Linh Lực Khả Dụng: <span style="color: #38bdf8; font-size: 16px; font-weight: 700;">${usableEnergy}</span> / ${player.maxEnergy || 100}
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
          <div style="font-weight: 700; color: var(--gold, #facc15); font-size: 14px; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
            <span>🌟 Danh Mục Tâm Pháp Hào Quang</span>
            <span class="text-dim text-xs font-normal" style="font-size:11px; color:var(--text-dim)">(${activeAuras.length}/${Object.keys(auraConfigs).length} đang bật)</span>
          </div>

          <div class="skill-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:12px">
            ${Object.values(auraConfigs).map(aura => {
              const isActive = activeAuras.includes(aura.id)
              const wouldExceed = !isActive && (reservationPct + aura.reservationPct > 85)

              return `
                <div class="skill-card ${isActive ? 'equipped' : ''}" style="background:var(--bg-card, #1a1e29); border:1px solid ${isActive ? 'rgba(234, 179, 8, 0.6)' : 'rgba(255,255,255,0.08)'}; border-radius:8px; padding:12px; display:flex; flex-direction:column; justify-content:space-between; ${isActive ? 'box-shadow: 0 0 12px rgba(234, 179, 8, 0.15);' : ''}">
                  <div>
                    <div class="skill-card-header" style="display:flex; justify-content:space-between; align-items:flex-start">
                      <div>
                        <div class="skill-card-name" style="font-size: 14px; font-weight:700; color:var(--text-bright); display: flex; align-items: center; gap: 6px;">
                          <span>${aura.icon}</span>
                          <span>${aura.name}</span>
                        </div>
                        <div class="skill-card-tier" style="color: #f59e0b; font-size:11px">Khóa ${aura.reservationPct}% Linh Lực (${Math.floor((player.maxEnergy || 100) * (aura.reservationPct / 100))} LL)</div>
                      </div>
                      <div class="skill-card-action">
                        <button class="btn btn--sm ${isActive ? 'btn--gold' : 'btn--outline'} btn-toggle-aura" data-aura="${aura.id}" ${wouldExceed ? 'disabled title="Vượt quá 85% Linh Lực khóa tối đa!"' : ''} style="padding:4px 10px; font-size:11px">
                          ${isActive ? '✅ Đang Duy Trì' : '🔘 Bật Hào Quang'}
                        </button>
                      </div>
                    </div>
                    <div class="skill-card-desc" style="margin-top: 6px; font-size:12px; color:var(--text-dim); line-height:1.4">${aura.desc}</div>
                  </div>
                  <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px;">
                    ${Object.entries(aura.statBonuses || {}).map(([stat, val]) => `
                      <span class="req-tag" style="background: rgba(234, 179, 8, 0.12); color: #fde047; border: 1px solid rgba(234, 179, 8, 0.2); padding:2px 6px; border-radius:4px; font-size:11px">
                        +${val} ${stat}
                      </span>
                    `).join('')}
                  </div>
                </div>
              `
            }).join('')}
          </div>
        </div>

        <!-- PERMANENT PASSIVE TECHNIQUES -->
        <div>
          <div style="font-weight: 700; color: var(--gold, #facc15); font-size: 14px; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
            <span>🧘 Tâm Pháp Thường Trực Đã Lĩnh Ngộ</span>
            <span class="text-dim text-xs font-normal" style="font-size:11px; color:var(--text-dim)">(${passiveSkills.length} tâm pháp)</span>
          </div>

          ${passiveSkills.length > 0 ? `
            <div class="skill-grid" id="passiveSkillsGrid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:12px"></div>
          ` : `
            <div class="panel" style="padding: 20px; text-align: center; color: var(--text-dim); font-size: 12px; background:var(--bg-surface, #151922); border-radius:8px">
              Chưa lĩnh ngộ tâm pháp bị động thường trực nào. Hãy đến Tàng Kinh Các để thỉnh giáo các bí kíp công pháp thượng thừa!
            </div>
          `}
        </div>
      </div>
    `
  }

  onMounted() {
    this.renderPassiveCards()
  }

  onUpdated() {
    this.renderPassiveCards()
  }

  renderPassiveCards() {
    const gridEl = this.container.querySelector('#passiveSkillsGrid')
    if (!gridEl) return

    const { ctx } = this.props
    const player = ctx?.state?.player || {}
    const pSkills = player.skills || []
    const allSkills = ctx?.state?.skills || []

    const learned = pSkills.map(ps => {
      const id = typeof ps === 'string' ? ps : ps.id
      const master = allSkills.find(s => s.id === id) || { name: id, id, category: 'mind', type: 'passive' }
      return {
        ...master,
        level: ps.level || 1,
        xp: ps.xp || ps.currentXp || 0,
        equipped: true
      }
    })

    const passiveSkills = learned.filter(s => s.type === 'passive')
    gridEl.innerHTML = ''

    passiveSkills.forEach(s => {
      const cardContainer = document.createElement('div')
      const card = new SkillCard({
        skill: s,
        isLearned: true,
        player,
      })
      card.mount(cardContainer)
      gridEl.appendChild(cardContainer.firstElementChild)
    })
  }

  bindEvents() {
    this.on('click', '.btn-toggle-aura', async (e, target) => {
      const auraId = target.dataset.aura
      const { ctx } = this.props
      if (!ctx || !auraId) return

      try {
        const res = await ctx.api.request(`/player/${ctx.state.playerId}/toggle-aura`, {
          method: 'POST',
          body: JSON.stringify({ auraId })
        })
        ctx.state.player = res.player
        ctx.notify(res.message, 'success')
        if (ctx.updateSidebar) ctx.updateSidebar()
        this.update()
      } catch (err) {
        ctx.notify(err.message || 'Lỗi bật/tắt hào quang', 'error')
      }
    })
  }
}
