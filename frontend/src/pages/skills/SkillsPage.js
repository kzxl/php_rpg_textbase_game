import { Component } from '../../core/Component.js'
import { CombatPillarView } from './CombatPillarView.js'
import { AurasPillarView } from './AurasPillarView.js'
import { MonstersPillarView } from './MonstersPillarView.js'
import { CraftingPillarView } from './CraftingPillarView.js'
import { getMaxSkillSlots } from './constants.js'
import { pageLibrary } from '../library.js'
import { renderGlitchPage } from '../glitch.js'

/**
 * SkillsPage Coordinator: Manages 4 Pillars of Cultivation Skills + Scripture Library & Glitches.
 */
export class SkillsPage extends Component {
  initialState() {
    let savedPillar = localStorage.getItem('activeSkillPillar') || 'combat'
    if (!['combat', 'auras', 'monsters', 'crafting', 'library', 'glitch'].includes(savedPillar)) {
      savedPillar = 'combat'
    }
    return {
      activePillar: savedPillar,
      monsterMasteryData: null,
      craftingMasteryData: null,
    }
  }

  template() {
    const { ctx } = this.props
    const player = ctx?.state?.player || {}
    const pSkills = player.skills || []
    const allSkills = ctx?.state?.skills || []
    const maxSlots = getMaxSkillSlots(player.realmTier || 1)

    const isGlitchUnlocked = (player.realmTier ?? 1) >= 2 || (player.glitchInsight ?? 0) >= 20 || (player.unlockedImprints || []).length > 0

    const learned = pSkills.map(ps => {
      const id = typeof ps === 'string' ? ps : ps.id
      const master = allSkills.find(s => s.id === id) || { name: id, id, category: 'combat', type: 'active' }
      return {
        ...master,
        equipped: ps.equipped || ps.isEquipped || false
      }
    })

    const activeSkills = learned.filter(s => s.type !== 'passive')
    const equippedSkills = activeSkills.filter(s => s.equipped)

    const pillars = {
      combat: {
        icon: '⚔️',
        name: 'Chiêu Thức',
        sub: `${activeSkills.length} chiêu • ${equippedSkills.length}/${maxSlots} ô xuất`,
      },
      auras: {
        icon: '🧘',
        name: 'Tâm Pháp & Hào Quang',
        sub: `Khóa ${player.reservationPct || 0}% LL • ${(player.activeAuras || []).length} Hào quang`,
      },
      monsters: {
        icon: '🐺',
        name: 'Thông Thạo Quái Vật',
        sub: 'Bách thú đồ giám • Sát quái 5★',
      },
      crafting: {
        icon: '⚒️',
        name: 'Thông Thạo Chế Tạo',
        sub: `Lv.${player.craftingLevel || 1} • Đan đạo & Đúc rèn`,
      }
    }

    const { activePillar } = this.state

    return `
      <div class="skills-page">
        <!-- HEADER -->
        <div class="page-header" style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px; margin-bottom:14px">
          <div>
            <h1 style="display: flex; align-items: center; gap: 10px; margin:0; font-size:20px; font-weight:700">
              <span>⚡ Tứ Đại Trụ Cột Kỹ Năng</span>
            </h1>
            <div class="text-dim text-sm" style="font-size:12px; color:var(--text-dim); margin-top:2px">
              Hệ thống tu hành thực chiến: Chiêu thức tôi luyện, tâm pháp hào quang, bách thú đồ giám & đan đạo chế tác.
            </div>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn--sm ${activePillar === 'library' ? 'btn--gold' : 'btn--outline'}" id="btnOpenLibrary" style="font-size:11px; padding:4px 10px">
              📚 Tàng Kinh Các
            </button>
            <button class="btn btn--sm ${activePillar === 'glitch' ? 'btn--purple' : 'btn--outline'}" id="btnOpenGlitch" style="font-size:11px; padding:4px 10px">
              ${isGlitchUnlocked ? '🌌 Thiên Đạo Dị Biến' : '🌫️ Kẽ Hở Quy Luật'}
            </button>
          </div>
        </div>

        <!-- 4 PILLARS SELECTOR -->
        <div class="pillar-tabs" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:10px; margin-bottom:16px">
          ${Object.entries(pillars).map(([key, p]) => `
            <div class="pillar-tab ${activePillar === key ? 'active' : ''}" data-pillar="${key}" style="background:var(--bg-surface, #151922); border:1px solid ${activePillar === key ? 'var(--gold, #facc15)' : 'rgba(255,255,255,0.08)'}; border-radius:8px; padding:12px; cursor:pointer; display:flex; align-items:center; gap:10px; transition:all 0.2s">
              <div class="pillar-icon" style="font-size:24px">${p.icon}</div>
              <div class="pillar-info">
                <div class="pillar-name" style="font-weight:700; font-size:13px; color:${activePillar === key ? 'var(--gold, #facc15)' : 'var(--text-bright)'}">${p.name}</div>
                <div class="pillar-sub" style="font-size:11px; color:var(--text-dim); margin-top:2px">${p.sub}</div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- ACTIVE PILLAR CONTAINER -->
        <div id="pillarContentContainer"></div>
      </div>
    `
  }

  onMounted() {
    this.mountActivePillar()
  }

  onUpdated() {
    this.mountActivePillar()
  }

  onUnmounted() {
    if (this._currentPillarView) {
      this._currentPillarView.unmount()
      this._currentPillarView = null
    }
  }

  async mountActivePillar() {
    const container = this.container.querySelector('#pillarContentContainer')
    if (!container) return

    if (this._currentPillarView) {
      this._currentPillarView.unmount()
      this._currentPillarView = null
    }

    const { ctx } = this.props
    const { activePillar } = this.state

    if (activePillar === 'library') {
      pageLibrary(container, ctx)
      return
    }

    if (activePillar === 'glitch') {
      renderGlitchPage(container, ctx)
      return
    }

    if (activePillar === 'combat') {
      this._currentPillarView = new CombatPillarView({
        ctx,
        onSkillEquipped: () => this.updatePillarTabLabels()
      })
    } else if (activePillar === 'auras') {
      this._currentPillarView = new AurasPillarView({
        ctx,
        onAuraToggled: () => this.updatePillarTabLabels()
      })
    } else if (activePillar === 'monsters') {
      this._currentPillarView = new MonstersPillarView({
        ctx,
        masteryData: this.state.monsterMasteryData
      })
      if (!this.state.monsterMasteryData && ctx?.api) {
        ctx.api.getMonsterMastery(ctx.state.playerId).then(data => {
          this.setState({ monsterMasteryData: data })
        }).catch(err => {
          console.warn('Failed loading monster mastery data', err)
        })
      }
    } else if (activePillar === 'crafting') {
      this._currentPillarView = new CraftingPillarView({
        ctx,
        masteryData: this.state.craftingMasteryData,
        player: ctx.state?.player
      })
      if (!this.state.craftingMasteryData && ctx?.api) {
        ctx.api.getCraftingMastery(ctx.state.playerId).then(data => {
          this.setState({ craftingMasteryData: data })
        }).catch(err => {
          console.warn('Failed loading crafting mastery data', err)
        })
      }
    }

    if (this._currentPillarView) {
      this._currentPillarView.mount(container)
    }
  }

  updatePillarTabLabels() {
    const { ctx } = this.props
    const player = ctx?.state?.player || {}
    const pSkills = player.skills || []
    const allSkills = ctx?.state?.skills || []
    const maxSlots = getMaxSkillSlots(player.realmTier || 1)

    const learned = pSkills.map(ps => {
      const id = typeof ps === 'string' ? ps : ps.id
      const master = allSkills.find(s => s.id === id) || { id, type: 'active' }
      return { ...master, equipped: ps.equipped || ps.isEquipped || false }
    })
    const activeSkills = learned.filter(s => s.type !== 'passive')
    const equippedSkills = activeSkills.filter(s => s.equipped)

    const combatSub = this.container?.querySelector('[data-pillar="combat"] .pillar-sub')
    if (combatSub) {
      combatSub.textContent = `${activeSkills.length} chiêu • ${equippedSkills.length}/${maxSlots} ô xuất`
    }
    const auraSub = this.container?.querySelector('[data-pillar="auras"] .pillar-sub')
    if (auraSub) {
      auraSub.textContent = `Khóa ${player.reservationPct || 0}% LL • ${(player.activeAuras || []).length} Hào quang`
    }
  }

  bindEvents() {
    this.on('click', '[data-pillar]', (e, target) => {
      const pKey = target.dataset.pillar
      localStorage.setItem('activeSkillPillar', pKey)
      this.setState({ activePillar: pKey })
    })

    this.on('click', '#btnOpenLibrary', () => {
      localStorage.setItem('activeSkillPillar', 'library')
      this.setState({ activePillar: 'library' })
    })

    this.on('click', '#btnOpenGlitch', () => {
      localStorage.setItem('activeSkillPillar', 'glitch')
      this.setState({ activePillar: 'glitch' })
    })
  }
}
