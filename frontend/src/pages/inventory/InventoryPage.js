import { Component } from '../../core/Component.js'
import { Tabs } from '../../core/ui/Tabs.js'
import { EquipmentView } from './EquipmentView.js'
import { MaterialPouch } from './MaterialPouch.js'
import { MedicineBag } from './MedicineBag.js'
import { ItemGridView } from './ItemGridView.js'
import { MATERIAL_FALLBACK_MAP } from './constants.js'

/**
 * InventoryPage Coordinator: Modular container managing inventory navigation and sub-views.
 */
export class InventoryPage extends Component {
  initialState() {
    const ctx = this.props.ctx || {}
    return {
      activeTab: ctx.state?.inventoryTab || 'equipped',
    }
  }

  template() {
    const { ctx } = this.props
    const p = ctx?.state?.player || {}
    const equip = Object.values(p.equipment || {})
    const ring1 = equip.find(i => i.slot === 'ring1')
    const ring2 = equip.find(i => i.slot === 'ring2')

    let capacity = 20
    if (ring1?.id === 'tui_tru_vat' || ring1?.baseType?.includes('tru_vat')) {
      capacity += (ring1.affixes?.[0]?.value || 10)
    }
    if (ring2?.id === 'tui_tru_vat' || ring2?.baseType?.includes('tru_vat')) {
      capacity += (ring2.affixes?.[0]?.value || 10)
    }

    const currentCount = (p.inventory || []).length

    return `
      <div class="inventory-page">
        <div class="page-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px">
          <h1 style="margin:0; font-size:20px; font-weight:700">
            🎒 Túi Đồ <span style="font-size:14px; color:var(--text-dim); font-weight:400">(${currentCount} / ${capacity})</span>
          </h1>
          <button class="btn btn--dark btn--sm" id="btnGen" title="Debug: Sinh đồ ngẫu nhiên">🎲 Sinh Mẫu</button>
        </div>
        
        <div class="panel" style="background:var(--bg-surface, #151922); border-radius:10px; border:1px solid rgba(255,255,255,0.08); overflow:hidden">
          <div id="invTabsContainer" style="padding:10px 14px 0 14px"></div>
          <div class="panel-body no-pad" id="invTabContent" style="min-height:220px"></div>
        </div>
      </div>
    `
  }

  onMounted() {
    this.ensureMaterialCatalog()
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

  ensureMaterialCatalog() {
    const { ctx } = this.props
    if (!ctx) return

    if (!ctx.state.materialCatalog) {
      ctx.state.materialCatalog = { ...MATERIAL_FALLBACK_MAP }
      ctx.api?.request('/data/materials')?.then(res => {
        let remoteMap = {}
        if (res && res.data && typeof res.data === 'object' && !Array.isArray(res.data)) {
          remoteMap = res.data
        } else if (res && res.materials && Array.isArray(res.materials)) {
          res.materials.forEach(m => { remoteMap[m.id] = m })
        }
        ctx.state.materialCatalog = { ...MATERIAL_FALLBACK_MAP, ...remoteMap }
        if (this.state.activeTab === 'material' && this._currentSubView) {
          this._currentSubView.update()
        }
      })?.catch(err => {
        console.warn('Material catalog fetch warning, falling back to local map', err)
      })
    }
  }

  renderTabs() {
    const tabsContainer = this.container.querySelector('#invTabsContainer')
    if (!tabsContainer) return

    const { ctx } = this.props
    const p = ctx?.state?.player || {}
    const medCD = p.medCooldownRemaining || 0
    const matEntries = Object.entries(p.materials || {}).filter(([_, qty]) => (qty || 0) > 0)

    const tabDefinitions = [
      { id: 'equipped', label: 'Ngự Khí', icon: '⚔️' },
      { id: 'weapon', label: 'Vũ Khí', icon: '🗡️' },
      { id: 'armor', label: 'Phòng Cụ', icon: '🥋' },
      { id: 'accessory', label: 'Trang Sức', icon: '💍' },
      { id: 'manual', label: 'Bí Tịch', icon: '📜' },
      { id: 'medicine', label: 'Đan Dược', icon: '💊', badge: medCD > 0 ? `${medCD}s` : null },
      { id: 'material', label: 'Kho Nguyên Liệu', icon: '⛏️', badge: matEntries.length > 0 ? matEntries.length : null },
    ]

    if (this._tabsComponent) {
      this._tabsComponent.unmount()
    }

    this._tabsComponent = new Tabs({
      tabs: tabDefinitions,
      activeTab: this.state.activeTab,
      onTabChange: (tabId) => {
        if (ctx) ctx.state.inventoryTab = tabId
        this.setState({ activeTab: tabId })
      }
    })

    this._tabsComponent.mount(tabsContainer)
  }

  renderActiveSubView() {
    const contentContainer = this.container.querySelector('#invTabContent')
    if (!contentContainer) return

    if (this._currentSubView) {
      this._currentSubView.unmount()
      this._currentSubView = null
    }

    const { ctx } = this.props
    const player = ctx?.state?.player || {}
    const { activeTab } = this.state

    if (activeTab === 'equipped') {
      this._currentSubView = new EquipmentView({ player, ctx })
    } else if (activeTab === 'material') {
      this._currentSubView = new MaterialPouch({ player, ctx })
    } else if (activeTab === 'medicine') {
      this._currentSubView = new MedicineBag({ player, ctx })
    } else {
      this._currentSubView = new ItemGridView({ player, category: activeTab, ctx })
    }

    this._currentSubView.mount(contentContainer)
  }

  bindEvents() {
    this.on('click', '#btnGen', async () => {
      const { ctx } = this.props
      if (!ctx) return
      const rars = ['common', 'rare', 'epic', 'legendary']
      const chosenRarity = rars[Math.floor(Math.random() * rars.length)]

      try {
        const data = await ctx.api.generateItem(ctx.state.playerId, chosenRarity)
        ctx.state.player = data.player
        ctx.state.items = data.items || []
        ctx.notify(data.message || 'Đã tạo pháp bảo ngẫu nhiên', 'success')
        this.update()
      } catch (e) {
        ctx.notify('Lỗi tạo ngẫu nhiên', 'error')
      }
    })
  }
}
