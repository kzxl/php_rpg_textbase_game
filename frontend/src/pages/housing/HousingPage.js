import { Component } from '../../core/Component.js'
import { Tabs } from '../../core/ui/Tabs.js'
import { AbodeOverview } from './AbodeOverview.js'
import { GardenView } from './GardenView.js'
import { FormationView } from './FormationView.js'
import { RentalView } from './RentalView.js'

/**
 * HousingPage Coordinator: Manages cave abode tabs, state synchronization, and action dispatch.
 * Conforms strictly to Anti-AI-Slop & Torn City High-Density Standards.
 */
export class HousingPage extends Component {
  initialState() {
    const ctx = this.props.ctx || {}
    return {
      activeTab: ctx.state?._housingTab || 'overview',
      housingData: null,
      rentals: [],
      loading: true,
      error: null,
    }
  }

  template() {
    const { loading, error, housingData } = this.state
    const d = housingData || {}
    const tierName = d.tierInfo?.name || 'Động Phủ'
    const tierNum = d.tier || 1

    return `
      <div class="housing-page">
        <!-- HEADER -->
        <div class="page-header" style="display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:12px; margin-bottom:12px;">
          <div>
            <h1 style="display:flex; align-items:center; gap:8px; margin:0; font-size:18px; font-weight:700;">
              Động Phủ Tu Tiên
            </h1>
            <div class="text-sm text-dim" style="font-size:12px; color:var(--text-dim); margin-top:2px;">
              Tụ tập linh mạch thiên địa, bồi dưỡng căn cơ, gieo trồng linh dược và lập trận hộ thân.
            </div>
          </div>

          ${d.owned ? `
            <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border); border-radius:4px; padding:6px 12px; font-size:12px; display:flex; align-items:center; gap:8px;">
              <span class="badge" style="background:rgba(83,123,180,0.15); border:1px solid var(--blue); color:var(--blue); font-size:10px; font-weight:700; padding:1px 6px; border-radius:2px;">
                T${tierNum}
              </span>
              <strong style="color:var(--text-bright);">${tierName}</strong>
              <span style="color:var(--text-dim);">·</span>
              <span style="color:var(--green); font-weight:600;">+${d.passiveBonuses?.hpRegenBonus || d.tierInfo?.hpRegen || 2} HP/10s</span>
            </div>
          ` : ''}
        </div>

        <!-- TABS BAR MOUNT -->
        <div id="housingTabsNav" style="margin-bottom:12px;"></div>

        <!-- MAIN CONTENT AREA -->
        <div id="housingTabContent">
          ${loading ? `
            <div class="panel" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:32px; text-align:center; color:var(--text-dim); font-size:12px;">
              Đang dẫn dắt linh khí vào Động Phủ...
            </div>
          ` : error ? `
            <div class="panel" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:24px; text-align:center; color:var(--red); font-size:12px;">
              Lỗi: ${error}
            </div>
          ` : ''}
        </div>
      </div>
    `
  }

  async onMounted() {
    await this.loadAllData()
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

  async loadAllData() {
    const { ctx } = this.props
    if (!ctx) return
    const pid = ctx.state.playerId

    try {
      const [housingData, rentalsRes] = await Promise.all([
        ctx.api.getHousing(pid),
        ctx.api.getRentals().catch(() => ({ rentals: [] })),
      ])

      this.setState({
        housingData,
        rentals: rentalsRes.rentals || [],
        loading: false,
        error: null,
      })
    } catch (err) {
      this.setState({
        loading: false,
        error: err.message || 'Không thể kết nối đến Động Phủ',
      })
    }
  }

  renderTabs() {
    const navContainer = this.container?.querySelector('#housingTabsNav')
    if (!navContainer) return

    if (this._tabsComponent) {
      this._tabsComponent.unmount()
      this._tabsComponent = null
    }

    const { housingData, rentals = [] } = this.state
    const d = housingData || {}
    const gardenSlots = d.gardenSlots || []
    const readyHerbsCount = gardenSlots.filter(s => s && s.ready).length

    // Active formations count
    let activeFormations = 0
    if (d.formations) {
      Object.values(d.formations).forEach(f => {
        if (f.currentLevel > 0) activeFormations++
      })
    }

    const tabsConfig = [
      {
        id: 'overview',
        label: 'Tổng Quan',
        badge: d.owned ? `T${d.tier || 1}` : null,
      },
      {
        id: 'garden',
        label: 'Dược Viên',
        badge: readyHerbsCount > 0 ? readyHerbsCount : null,
      },
      {
        id: 'formations',
        label: 'Hộ Phủ Trận Pháp',
        badge: activeFormations > 0 ? activeFormations : null,
      },
      {
        id: 'rentals',
        label: 'Phường Thị Thuê Phủ',
        badge: rentals.length > 0 ? rentals.length : null,
      },
    ]

    this._tabsComponent = new Tabs({
      tabs: tabsConfig,
      activeTab: this.state.activeTab,
      onTabChange: (tabId) => {
        const { ctx } = this.props
        if (ctx?.state) {
          ctx.state._housingTab = tabId
        }
        this.setState({ activeTab: tabId })
      },
    })

    this._tabsComponent.mount(navContainer)
  }

  renderActiveSubView() {
    const subContainer = this.container?.querySelector('#housingTabContent')
    if (!subContainer || this.state.loading || this.state.error) return

    if (this._currentSubView) {
      this._currentSubView.unmount()
      this._currentSubView = null
    }

    const { ctx } = this.props
    const pid = ctx?.state?.playerId
    const player = ctx?.state?.player || {}
    const { housingData, rentals, activeTab } = this.state

    if (activeTab === 'overview') {
      this._currentSubView = new AbodeOverview({
        housingData,
        player,
        onPurchase: () => this.handleBuyOrUpgrade(),
        onUpgrade: () => this.handleBuyOrUpgrade(),
        onPayUpkeep: () => this.handlePayMaintenance(),
      })
    } else if (activeTab === 'garden') {
      this._currentSubView = new GardenView({
        housingData,
        onPlant: (slot, herbId) => this.handlePlant(slot, herbId),
        onHarvest: (slot) => this.handleHarvest(slot),
        onHarvestAll: () => this.handleHarvest(null),
        onTimeElapsed: () => this.loadAllData(),
      })
    } else if (activeTab === 'formations') {
      this._currentSubView = new FormationView({
        housingData,
        player,
        onUpgradeFormation: (fId) => this.handleUpgradeFormation(fId),
        onPayMaintenance: () => this.handlePayMaintenance(),
      })
    } else if (activeTab === 'rentals') {
      this._currentSubView = new RentalView({
        housingData,
        rentals,
        player,
        onListRental: (fee) => this.handleListRental(fee),
        onRentRoom: (rentalId) => this.handleRentRoom(rentalId),
        onRefreshRentals: () => this.loadAllData(),
      })
    }

    if (this._currentSubView) {
      this._currentSubView.mount(subContainer)
    }
  }

  async handleBuyOrUpgrade() {
    const { ctx } = this.props
    const pid = ctx.state.playerId
    try {
      const res = await ctx.api.buyHousing(pid)
      ctx.notify(res.message, 'success')
      if (res.player) {
        ctx.state.player = res.player
        ctx.updateSidebar()
      }
      await this.loadAllData()
    } catch (err) {
      ctx.notify(err.message || 'Lỗi nâng cấp Động Phủ', 'error')
    }
  }

  async handlePlant(slotIndex, herbId) {
    const { ctx } = this.props
    const pid = ctx.state.playerId
    try {
      const res = await ctx.api.plantHerb(pid, herbId, slotIndex)
      ctx.notify(res.message, 'success')
      await this.loadAllData()
    } catch (err) {
      ctx.notify(err.message || 'Lỗi gieo giống', 'error')
    }
  }

  async handleHarvest(slotIndex = null) {
    const { ctx } = this.props
    const pid = ctx.state.playerId
    try {
      let res
      if (slotIndex !== null) {
        // Send targeted harvest slot
        res = await ctx.api.request(`/player/${pid}/housing/harvest`, {
          method: 'POST',
          body: JSON.stringify({ slotIndex }),
        })
      } else {
        res = await ctx.api.harvestGarden(pid)
      }

      ctx.notify(res.message, 'success')
      if (res.player) {
        ctx.state.player = res.player
        ctx.updateSidebar()
      }
      await this.loadAllData()
    } catch (err) {
      ctx.notify(err.message || 'Lỗi thu hoạch', 'error')
    }
  }

  async handleUpgradeFormation(formationId) {
    const { ctx } = this.props
    const pid = ctx.state.playerId
    try {
      const res = await ctx.api.upgradeFormation(pid, formationId)
      ctx.notify(res.message, 'success')
      if (res.player) {
        ctx.state.player = res.player
        ctx.updateSidebar()
      }
      await this.loadAllData()
    } catch (err) {
      ctx.notify(err.message || 'Lỗi thăng cấp trận pháp', 'error')
    }
  }

  async handlePayMaintenance() {
    const { ctx } = this.props
    const pid = ctx.state.playerId
    try {
      const res = await ctx.api.payMaintenance(pid)
      ctx.notify(res.message, 'success')
      if (res.player) {
        ctx.state.player = res.player
        ctx.updateSidebar()
      }
      await this.loadAllData()
    } catch (err) {
      ctx.notify(err.message || 'Lỗi nộp phí duy trì', 'error')
    }
  }

  async handleListRental(pricePerDay) {
    const { ctx } = this.props
    const pid = ctx.state.playerId
    try {
      const res = await ctx.api.listForRent(pid, pricePerDay)
      ctx.notify(res.message, 'success')
      await this.loadAllData()
    } catch (err) {
      ctx.notify(err.message || 'Lỗi niêm yết phòng', 'error')
    }
  }

  async handleRentRoom(rentalId) {
    const { ctx } = this.props
    const pid = ctx.state.playerId
    try {
      const res = await ctx.api.rentRoom(pid, rentalId)
      ctx.notify(res.message, 'success')
      if (res.player) {
        ctx.state.player = res.player
        ctx.updateSidebar()
      }
      await this.loadAllData()
    } catch (err) {
      ctx.notify(err.message || 'Lỗi thuê phòng', 'error')
    }
  }
}
