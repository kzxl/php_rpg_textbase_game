import { Component } from '../Component.js'

/**
 * Standardized reusable Modal/Dialog atom component.
 */
export class Modal extends Component {
  template() {
    const { title = 'Thông Báo', content = '', actions = [], maxWidth = '480px' } = this.props

    return `
      <div class="modal-backdrop" style="position: fixed; inset: 0; background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(4px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 16px;">
        <div class="modal-box panel" style="width: 100%; max-width: ${maxWidth}; background: var(--bg-surface, #151922); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 12px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6); overflow: hidden; display: flex; flex-direction: column;">
          <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
            <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: var(--text-bright, #fff);">${title}</h3>
            <button class="modal-close-btn" style="background: none; border: none; font-size: 18px; color: var(--text-dim, #94a3b8); cursor: pointer; padding: 4px; line-height: 1;">&times;</button>
          </div>
          <div class="modal-body" style="padding: 18px; font-size: 13px; line-height: 1.5; color: var(--text-base, #e2e8f0); max-height: 70vh; overflow-y: auto;">
            ${content}
          </div>
          ${actions.length > 0 ? `
            <div class="modal-footer" style="display: flex; justify-content: flex-end; gap: 8px; padding: 12px 18px; border-top: 1px solid rgba(255, 255, 255, 0.08); background: rgba(0, 0, 0, 0.2);">
              ${actions.map(act => `
                <button class="btn btn--sm ${act.btnClass || 'btn--dark'}" data-modal-action="${act.name}" style="padding: 6px 14px; font-size: 12px;">
                  ${act.label}
                </button>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    `
  }

  onMounted() {
    this._keyHandler = (e) => {
      if (e.key === 'Escape' && this.props.onClose) {
        this.props.onClose()
      }
    }
    window.addEventListener('keydown', this._keyHandler)
  }

  onUnmounted() {
    if (this._keyHandler) {
      window.removeEventListener('keydown', this._keyHandler)
    }
  }

  bindEvents() {
    this.on('click', '.modal-backdrop', (e, target) => {
      if (e.target === target && this.props.onClose) {
        this.props.onClose()
      }
    })
    this.on('click', '.modal-close-btn', () => {
      if (this.props.onClose) {
        this.props.onClose()
      }
    })
    this.on('click', '[data-modal-action]', (e, target) => {
      const actionName = target.dataset.modalAction
      if (this.props.onAction) {
        this.props.onAction(actionName)
      }
    })
  }
}
