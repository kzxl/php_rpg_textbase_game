import { Component } from '../../core/Component.js'
import { SkillCard } from './SkillCard.js'
import { getMaxSkillSlots } from './constants.js'

/**
 * CombatPillarView Component: Manages Active Combat Skills & Real-time Loadout Slots.
 */
export class CombatPillarView extends Component {
  initialState() {
    return {
      skillFilter: 'all'
    }
  }

  template() {
    const { ctx } = this.props
    const player = ctx?.state?.player || {}
    const pSkills = player.skills || []
    const allSkills = ctx?.state?.skills || []
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

    const activeSkills = learned.filter(s => s.type !== 'passive')
    const equippedSkills = activeSkills.filter(s => s.equipped)

    let displayedSkills = activeSkills
    if (this.state.skillFilter === 'equipped') displayedSkills = activeSkills.filter(s => s.equipped)
    if (this.state.skillFilter === 'unequipped') displayedSkills = activeSkills.filter(s => !s.equipped)

    return `
      <div class="combat-pillar-view">
        <!-- LOADOUT SLOTS -->
        <div class="loadout-bar" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 14px; margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          <div>
            <div style="font-weight: 700; color: var(--gold, #facc15); font-size: 14px; display: flex; align-items: center; gap: 6px;">
              <span>⚔️ Ô Xuất Chiêu Thực Chiến:</span>
              <span style="color: #fff;">${equippedSkills.length}/${maxSlots}</span>
            </div>
            <div class="text-dim text-xs" style="margin-top: 2px; font-size:11px; color:var(--text-dim)">
              Cảnh giới hiện tại cho phép trang bị tối đa <b>${maxSlots}</b> chiêu thức. Mỗi hiệp đấu sẽ tung xúc xắc theo <b>xác suất kích hoạt</b> và tiêu hao Linh Lực thực chiến.
            </div>
          </div>
          <div class="loadout-slots" style="display: flex; gap: 8px;">
            ${Array.from({ length: maxSlots }).map((_, idx) => {
              const eq = equippedSkills[idx]
              if (eq) {
                return `<div class="loadout-slot filled" style="width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; background: rgba(59, 130, 246, 0.15); border: 1px solid var(--blue, #3b82f6); border-radius: 6px; font-size: 18px;" title="${eq.name} (Lv.${eq.level})">⚔️</div>`
              }
              return `<div class="loadout-slot" style="width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; background: rgba(0, 0, 0, 0.3); border: 1px dashed rgba(255,255,255,0.2); border-radius: 6px; font-size: 14px; color: var(--text-dim);" title="Ô trống">➕</div>`
            }).join('')}
          </div>
        </div>

        <!-- FILTER TABS -->
        <div style="display: flex; gap: 8px; margin-bottom: 14px;">
          <button class="mastery-filter-btn ${this.state.skillFilter === 'all' ? 'active' : ''}" data-sfilter="all">Tất Cả Chiêu Thức (${activeSkills.length})</button>
          <button class="mastery-filter-btn ${this.state.skillFilter === 'equipped' ? 'active' : ''}" data-sfilter="equipped">Đã Trang Bị (${equippedSkills.length})</button>
          <button class="mastery-filter-btn ${this.state.skillFilter === 'unequipped' ? 'active' : ''}" data-sfilter="unequipped">Chưa Trang Bị (${activeSkills.length - equippedSkills.length})</button>
        </div>

        <!-- SKILLS GRID -->
        <div class="skill-grid" id="combatSkillsGrid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:12px">
          ${displayedSkills.length === 0 ? `
            <div class="text-dim" style="padding: 20px; text-align:center; grid-column: 1 / -1">Chưa có chiêu thức kích hoạt nào trong danh mục này. Hãy đến Tàng Kinh Các để thỉnh bí kíp!</div>
          ` : ''}
        </div>
      </div>
    `
  }

  onMounted() {
    this.renderCards()
  }

  onUpdated() {
    this.renderCards()
  }

  renderCards() {
    const gridEl = this.container.querySelector('#combatSkillsGrid')
    if (!gridEl) return

    const { ctx } = this.props
    const player = ctx?.state?.player || {}
    const pSkills = player.skills || []
    const allSkills = ctx?.state?.skills || []
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

    const activeSkills = learned.filter(s => s.type !== 'passive')
    const equippedSkills = activeSkills.filter(s => s.equipped)

    let displayedSkills = activeSkills
    if (this.state.skillFilter === 'equipped') displayedSkills = activeSkills.filter(s => s.equipped)
    if (this.state.skillFilter === 'unequipped') displayedSkills = activeSkills.filter(s => !s.equipped)

    gridEl.innerHTML = ''
    displayedSkills.forEach(s => {
      const cardContainer = document.createElement('div')
      const card = new SkillCard({
        skill: s,
        isLearned: true,
        canEquip: equippedSkills.length < maxSlots,
        player,
        onEquipToggle: (sid, shouldEq) => this.toggleEquip(sid, shouldEq)
      })
      card.mount(cardContainer)
      gridEl.appendChild(cardContainer.firstElementChild)
    })
  }

  async toggleEquip(skillId, shouldEquip) {
    const { ctx } = this.props
    const pid = ctx?.state?.playerId || ctx?.state?.player?.id
    if (!ctx || !pid) return

    try {
      const res = await ctx.api.equipSkill(pid, skillId, shouldEquip)
      ctx.state.player = res.player
      ctx.notify(res.message, 'success')
      if (ctx.updateSidebar) ctx.updateSidebar()
      if (this.props.onSkillEquipped) {
        this.props.onSkillEquipped(res)
      }
      this.update()
    } catch (err) {
      ctx.notify(err.message || 'Lỗi trang bị chiêu thức', 'error')
    }
  }

  bindEvents() {
    this.on('click', '[data-sfilter]', (e, target) => {
      this.setState({ skillFilter: target.dataset.sfilter })
    })
  }
}
