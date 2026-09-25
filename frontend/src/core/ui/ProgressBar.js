import { Component } from '../Component.js'

/**
 * Standardized animated ProgressBar atom component.
 */
export class ProgressBar extends Component {
  template() {
    const {
      value = 0,
      max = 100,
      label = '',
      color = 'var(--blue, #3b82f6)',
      height = '14px',
      showValue = true,
      showPercent = true,
      striped = false,
    } = this.props

    const pct = Math.max(0, Math.min(100, max > 0 ? (value / max) * 100 : 0))
    const formattedPct = pct.toFixed(1)

    return `
      <div class="progress-wrapper" style="width: 100%; display: flex; flex-direction: column; gap: 4px;">
        ${label || showValue ? `
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px;">
            ${label ? `<span style="font-weight: 500; color: var(--text-bright, #fff);">${label}</span>` : '<span></span>'}
            <div style="display: flex; gap: 6px; color: var(--text-dim, #94a3b8);">
              ${showValue ? `<span>${value.toLocaleString()} / ${max.toLocaleString()}</span>` : ''}
              ${showPercent ? `<span style="font-weight: 600; color: var(--text-bright, #fff);">(${formattedPct}%)</span>` : ''}
            </div>
          </div>
        ` : ''}
        <div class="progress-bar-bg" style="width: 100%; height: ${height}; background: rgba(255,255,255,0.08); border-radius: 4px; overflow: hidden; position: relative;">
          <div class="progress-bar-fill ${striped ? 'progress-bar-fill--striped' : ''}" style="width: ${pct}%; height: 100%; background: ${color}; transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1); border-radius: 4px;"></div>
        </div>
      </div>
    `
  }
}
