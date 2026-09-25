import { Component } from '../../core/Component.js'
import { Tabs } from '../../core/ui/Tabs.js'
import { PillFurnace } from './PillFurnace.js'
import { EquipmentForge } from './EquipmentForge.js'
import { EnhancementAltar } from './EnhancementAltar.js'
import { TalismanInscriber } from './TalismanInscriber.js'

/**
 * AlchemyPage Coordinator: Manages crafting navigation across 4 pillars.
 */
export class AlchemyPage extends Component {
  initialState() {
    const ctx = this.props.ctx || {}
    return {
      activeTab: ctx.state?._alchemyTab || ctx.state?.alchemyTab || 'recipes',
    }
  }

  template() {
    const { ctx } = this.props
    const p = ctx?.state?.player || {}

    // Calculate player crafting skill bonuses
    let craftBonus = 0
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

    return `
      <div class="alchemy-page">
        <!-- HEADER -->
        <div class="page-header" style="display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:12px; margin-bottom:12px">
          <div>
            <h1 style="display:flex; align-items:center; gap:8px; margin:0; font-size:20px; font-weight:700">
              ⚒️ Lò Tạo Hóa (Chế Tác)
            </h1>
            <div class="text-sm text-dim" style="font-size:12px; color:var(--text-dim); margin-top:2px">
              Đúc rèn Thần Binh, Luyện Chế Tiên Đan và Cường Hóa Pháp Khí viễn cổ.
            </div>
          </div>
          
          <!-- CRAFTING MASTERY HUD -->
          <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:8px; padding:8px 14px; min-width:220px">
            <div style="display:flex; justify-content:space-between; align-items:center; font-size:12px; margin-bottom:4px">
              <span style="font-weight:700; color:var(--gold, #facc15)">🛠️ Luyện Khí Thuật: Cấp ${craftLvl}</span>
              <span class="text-dim text-xs" style="font-size:10px; color:var(--text-dim)">${craftXp}/${xpToNext} XP</span>
            </div>
            <div style="background:rgba(0,0,0,0.4); border-radius:4px; height:5px; overflow:hidden">
              <div style="background:var(--gold, #facc15); height:100%; width:${craftProgressPct}%; transition:width 0.3s"></div>
            </div>
          </div>
        </div>

        <!-- 4 TABS NAVIGATION MOUNT CONTAINER -->
        <div id="alchemyTabsNav" style="margin-bottom:12px"></div>

        <!-- SKILL BUFFS BANNER -->
        ${(craftBonus || costReduction || qualityBonus || doubleChance) ? `
          <div style="background:rgba(255,215,0,0.05); border:1px solid rgba(255,215,0,0.15); border-radius:6px; padding:6px 12px; margin-bottom:12px; font-size:11px; display:flex; gap:12px; flex-wrap:wrap">
            <span style="color:var(--gold, #facc15); font-weight:600">✨ Gia Trì Nghề Nghiệp:</span>
            ${craftBonus ? `<span>🔥 Thành công +${craftBonus}%</span>` : ''}
            ${costReduction ? `<span>💎 Giảm phí -${costReduction}%</span>` : ''}
            ${qualityBonus ? `<span>✨ Phẩm chất +${qualityBonus}%</span>` : ''}
            ${doubleChance ? `<span>⬆️ Nâng đôi ${doubleChance}%</span>` : ''}
          </div>
        ` : ''}

        <!-- SUBVIEW CONTENT CONTAINER -->
        <div id="alchemyTabContent"></div>
      </div>
    `
  }

  async onMounted() {
    await this.ensureRecipesLoaded()
    this.renderTabs()
    this.renderActiveSubView()
  }

  onUpdated() {
    this.renderTabs()
    this.renderActiveSubView()
  }

  onUnmounted() {
    if (this._currentSubView) {
      this._currentSubView.unmount()
      this._currentSubView = null
    }
    if (this._tabsComponent) {
      this._tabsComponent.unmount()
      this._tabsComponent = null
    }
  }

  async ensureRecipesLoaded() {
    const { ctx } = this.props
    if (!ctx) return

    let needRerender = false

    // Load medicine recipes
    if (!ctx.state.recipes || ctx.state.recipes.length === 0) {
      try {
        const rData = await ctx.api.request('/recipes')
        ctx.state.recipes = rData.recipes || []
        needRerender = true
      } catch (e) {
        console.warn('Failed loading medicine recipes', e)
      }
    }

    // Load forging recipes
    if (!ctx.state._forgingRecipes || ctx.state._forgingRecipes.length === 0) {
      try {
        const fData = await ctx.api.getForgingRecipes()
        ctx.state._forgingRecipes = fData.recipes || []
        needRerender = true
      } catch (e) {
        console.warn('Failed loading forging recipes', e)
      }
    }

    if (needRerender && this._isMounted) {
      this.update()
    }
  }

  renderTabs() {
    const navContainer = this.container.querySelector('#alchemyTabsNav')
    if (!navContainer) return

    const { ctx } = this.props
    const medicineRecipes = ctx?.state?.recipes || []
    const forgingRecipes = ctx?.state?._forgingRecipes || []

    const tabDefinitions = [
      { id: 'recipes', label: 'Luyện Đan', icon: '🔥', badge: medicineRecipes.length || null },
      { id: 'forging', label: 'Đúc Khí', icon: '⚔️', badge: forgingRecipes.length || null },
      { id: 'enhancement', label: 'Cường Hóa (+1..+12)', icon: '✨' },
      { id: 'currency', label: 'Phù Văn', icon: '🔮' },
    ]

    if (this._tabsComponent) {
      this._tabsComponent.unmount()
    }

    this._tabsComponent = new Tabs({
      tabs: tabDefinitions,
      activeTab: this.state.activeTab,
      onTabChange: (tabId) => {
        if (ctx) {
          ctx.state._alchemyTab = tabId
          ctx.state.alchemyTab = tabId
        }
        this.setState({ activeTab: tabId })
      }
    })

    this._tabsComponent.mount(navContainer)
  }

  renderActiveSubView() {
    const contentContainer = this.container.querySelector('#alchemyTabContent')
    if (!contentContainer) return

    if (this._currentSubView) {
      this._currentSubView.unmount()
      this._currentSubView = null
    }

    const { ctx } = this.props
    const p = ctx?.state?.player || {}
    const { activeTab } = this.state

    let craftBonus = 0
    let costReduction = 0
    const craftLvl = p.craftingLevel || 1

    ;(p.skills || []).forEach(ps => {
      const sid = typeof ps === 'string' ? ps : ps.id
      const lvl = typeof ps === 'string' ? 1 : (ps.level || 1)
      if (sid === 'tinh_che') craftBonus = lvl * 2
      if (sid === 'phu_an_thuat') costReduction = lvl * 5
    })

    if (activeTab === 'recipes') {
      this._currentSubView = new PillFurnace({ ctx, craftBonus })
    } else if (activeTab === 'forging') {
      this._currentSubView = new EquipmentForge({ ctx, craftLvl, craftBonus })
    } else if (activeTab === 'enhancement') {
      this._currentSubView = new EnhancementAltar({ ctx })
    } else if (activeTab === 'currency') {
      this._currentSubView = new TalismanInscriber({ ctx, costReduction })
    }

    if (this._currentSubView) {
      this._currentSubView.mount(contentContainer)
    }
  }
}
