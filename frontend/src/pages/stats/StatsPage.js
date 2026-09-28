import { Component } from '../../core/Component.js'
import { Tabs } from '../../core/ui/Tabs.js'
import { TrainingTab } from './TrainingTab.js'
import { RealmTab } from './RealmTab.js'
import { MechanicsTab } from './MechanicsTab.js'
import { openTribulationModal } from '../../game/TribulationModal.js'

/**
 * StatsPage Coordinator: Manages Cultivation, Realm & Analytical Mechanics Navigation.
 * Conforms to Anti-AI-Slop & Torn City High-Density Standards.
 */
export class StatsPage extends Component {
  initialState() {
    const ctx = this.props.ctx || {}
    return {
      activeTab: ctx.state?._statsTab || 'training',
      realmData: null,
      loading: true,
    }
  }

  template() {
    const { ctx } = this.props
    const player = ctx?.state?.player || {}
    const curRealm = player.realmInfo?.fullName || 'Phàm Nhân'
    const curLevel = player.level || 1

    return `
      <div class="stats-page">
        <!-- HEADER -->
        <div class="page-header" style="display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:12px; margin-bottom:12px;">
          <div>
            <h1 style="display:flex; align-items:center; gap:8px; margin:0; font-size:18px; font-weight:700;">
              Tu Luyện & Cảnh Giới
            </h1>
            <div class="text-sm text-dim" style="font-size:12px; color:var(--text-dim); margin-top:2px;">
              Rèn luyện tứ đại thuộc tính thể phách, ngưng tụ tu vi và phá vỡ bình cảnh thiên kiếp.
            </div>
          </div>

          <!-- SUMMARY CHIP -->
          <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border); border-radius:4px; padding:6px 12px; font-size:12px; display:flex; align-items:center; gap:8px;">
            <span class="badge" style="background:rgba(194,159,85,0.15); border:1px solid var(--gold); color:var(--gold); font-size:10px; font-weight:700; padding:1px 6px; border-radius:2px;">
              Lv.${curLevel}
            </span>
            <strong style="color:var(--text-bright);">${curRealm}</strong>
            <span style="color:var(--text-dim);">·</span>
            <span style="color:var(--cyan); font-weight:600;">${player.currentStamina ?? 100}/${player.maxStamina ?? 100} Thể Lực</span>
          </div>
        </div>

        <!-- TABS BAR MOUNT -->
        <div id="statsTabsNav" style="margin-bottom:12px;"></div>

        <!-- SUBVIEW CONTAINER -->
        <div id="statsTabContent"></div>
      </div>
    `
  }

  async onMounted() {
    await this.loadRealmData()
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

  async loadRealmData() {
    const { ctx } = this.props
    if (!ctx) return
    const pid = ctx.state.playerId

    try {
      const realmData = await ctx.api.getRealmInfo(pid)
      this.setState({ realmData, loading: false })
    } catch {
      this.setState({ loading: false })
    }
  }

  renderTabs() {
    const navContainer = this.container?.querySelector('#statsTabsNav')
    if (!navContainer) return

    if (this._tabsComponent) {
      this._tabsComponent.unmount()
      this._tabsComponent = null
    }

    const { ctx } = this.props
    const player = ctx?.state?.player || {}
    const canBreakthrough = !!player.realmInfo?.canBreakthrough

    const tabsConfig = [
      {
        id: 'training',
        label: 'Rèn Luyện Thể Phách',
      },
      {
        id: 'realm',
        label: 'Cảnh Giới & Đột Phá',
        badge: canBreakthrough ? '!' : null,
      },
      {
        id: 'mechanics',
        label: 'Cơ Chế & Căn Cốt',
      },
    ]

    this._tabsComponent = new Tabs({
      tabs: tabsConfig,
      activeTab: this.state.activeTab,
      onTabChange: (tabId) => {
        if (ctx?.state) {
          ctx.state._statsTab = tabId
        }
        this.setState({ activeTab: tabId })
      },
    })

    this._tabsComponent.mount(navContainer)
  }

  renderActiveSubView() {
    const subContainer = this.container?.querySelector('#statsTabContent')
    if (!subContainer) return

    if (this._currentSubView) {
      this._currentSubView.unmount()
      this._currentSubView = null
    }

    const { ctx } = this.props
    const player = ctx?.state?.player || {}
    const { activeTab, realmData } = this.state

    if (activeTab === 'training') {
      this._currentSubView = new TrainingTab({
        player,
        onTrain: (stat, count) => this.handleTrain(stat, count),
      })
    } else if (activeTab === 'realm') {
      this._currentSubView = new RealmTab({
        player,
        realmData: realmData || { current: player.realmInfo },
        onBreakthrough: () => this.handleBreakthrough(),
      })
    } else if (activeTab === 'mechanics') {
      this._currentSubView = new MechanicsTab({
        player,
      })
    }

    if (this._currentSubView) {
      this._currentSubView.mount(subContainer)
    }
  }

  async handleTrain(stat, count) {
    const { ctx } = this.props
    const pid = ctx?.state?.playerId
    try {
      const data = await ctx.api.trainStat(pid, stat, count)
      ctx.state.player = data.player
      ctx.notify(data.message, 'success')
      ctx.updateSidebar()
      this.update()
    } catch (err) {
      ctx.notify(err.message || 'Lỗi rèn luyện', 'error')
    }
  }

  handleBreakthrough() {
    const { ctx } = this.props
    openTribulationModal(ctx)
  }
}
