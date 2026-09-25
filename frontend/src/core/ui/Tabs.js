import { Component } from '../Component.js'

/**
 * Standardized reusable Tabs atom component.
 */
export class Tabs extends Component {
  template() {
    const { tabs = [], activeTab = '', customClass = '' } = this.props

    return `
      <div class="tabs-nav ${customClass}" style="display: flex; gap: 4px; overflow-x: auto; padding-bottom: 8px; white-space: nowrap; border-bottom: 1px solid rgba(255,255,255,0.08);">
        ${tabs.map(tab => {
          const isActive = tab.id === activeTab
          const btnClass = isActive ? 'btn--blue' : 'btn--dark'
          return `
            <button class="btn btn--sm ${btnClass} tab-btn" data-tab-id="${tab.id}" style="display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px; font-size: 12px; cursor: pointer; transition: all 0.2s ease;">
              ${tab.icon ? `<span>${tab.icon}</span>` : ''}
              <span>${tab.label}</span>
              ${tab.badge !== undefined && tab.badge !== null && tab.badge !== '' ? `
                <span class="badge" style="background: rgba(255,255,255,0.15); font-size: 10px; padding: 1px 6px; border-radius: 999px;">${tab.badge}</span>
              ` : ''}
            </button>
          `
        }).join('')}
      </div>
    `
  }

  bindEvents() {
    this.on('click', '.tab-btn', (e, target) => {
      const tabId = target.dataset.tabId
      if (tabId && tabId !== this.props.activeTab && this.props.onTabChange) {
        this.props.onTabChange(tabId)
      }
    })
  }
}
