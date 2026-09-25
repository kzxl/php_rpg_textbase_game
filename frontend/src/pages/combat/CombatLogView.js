import { Component } from '../../core/Component.js'
import { renderCombatLogLines } from './constants.js'

/**
 * CombatLogView Component: Displays scrollable, color-coded combat round logs.
 */
export class CombatLogView extends Component {
  template() {
    const { log = [], maxHeight = '250px', title = '📜 Nhật Ký Quyết Đấu Chi Tiết' } = this.props

    return `
      <div class="combat-log-panel panel" style="border: 1px solid var(--border, rgba(255,255,255,0.1)); overflow: hidden; border-radius: 8px; margin-top: 10px;">
        <div style="padding: 8px 16px; background: rgba(0,0,0,0.25); font-size: 11px; color: var(--text-dim, #94a3b8); text-transform: uppercase; font-weight: 600; border-bottom: 1px solid rgba(255,255,255,0.05)">
          ${title}
        </div>
        <div class="combat-log" style="max-height: ${maxHeight}; overflow-y: auto; padding: 12px 16px; font-size: 12px; line-height: 1.5; background: rgba(0,0,0,0.15)">
          ${renderCombatLogLines(log)}
        </div>
      </div>
    `
  }
}
