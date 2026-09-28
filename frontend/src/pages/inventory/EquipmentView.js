import { Component } from '../../core/Component.js'
import { itemRow, getEnhanceTier, bindItemActions, STAT_SHORT_VI } from '../helpers.js'
import { EQUIPMENT_SLOTS } from './constants.js'

/**
 * EquipmentView Component: Manages 6-slot equipped gear and visual enhancements.
 */
export class EquipmentView extends Component {
  template() {
    const { player = {} } = this.props
    const eq = player.equipment || {}
    const equipList = Object.values(eq).filter(Boolean)

    return `
      <div class="equipment-view">
        <div style="padding:10px 14px;color:var(--text-dim);font-size:12px;border-bottom:1px solid rgba(255,255,255,0.05)">
          Các pháp bảo đang được liên kết:
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;padding:10px 14px">
          ${EQUIPMENT_SLOTS.map(s => {
            const item = eq[s.key] || (s.key === 'ring1' && !eq.ring1 ? eq.ring : null)
            const actualSlot = (s.key === 'ring1' && !eq.ring1 && eq.ring) ? 'ring' : s.key
            const hasItem = item && item.id
            const rarityClass = hasItem ? `rarity-${item.rarity}` : ''
            const enh = hasItem ? (parseInt(item.enhanceLevel, 10) || 0) : 0
            const tier = getEnhanceTier(enh)
            const enhBadge = enh > 0 ? `<span class="badge-enhance tier-${tier} lvl-${enh}">+${enh}</span>` : ''
            const glowClass = tier > 0 ? `enhance-glow-tier${tier}` : ''

            const affixList = hasItem ? (item.affixes || []) : []
            const affixBadge = affixList.length > 0 
              ? `<div style="font-size:9.5px;color:#60a5fa;font-weight:600;margin-top:2px">📜 ${affixList.length} Phù Văn</div>`
              : ''
            const affixTooltip = affixList.map(a => `${a.name ? `[${a.name}] ` : ''}+${a.value} ${(STAT_SHORT_VI[a.stat] || a.stat)}`).join('\n')
            const tooltipAttr = hasItem ? `title="${item.name} (${item.rarity || 'common'})\nCường Hóa: +${enh}${affixTooltip ? '\n\n📜 Phù Văn:\n' + affixTooltip : ''}"` : ''

            return `
              <div class="${glowClass}" ${tooltipAttr} style="background:${hasItem ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)'};border:1px solid ${hasItem ? (enh > 0 ? 'rgba(245,158,11,0.45)' : 'rgba(255,215,0,0.15)') : 'rgba(255,255,255,0.05)'};border-radius:8px;padding:10px;text-align:center;min-height:92px;display:flex;flex-direction:column;justify-content:space-between">
                <div>
                  <div style="font-size:20px;margin-bottom:4px">${s.icon}</div>
                  <div style="font-size:10px;opacity:0.4;margin-bottom:2px">${s.name}</div>
                  ${hasItem
                    ? `<div style="font-size:11px;font-weight:600" class="${rarityClass}">${item.name} ${enhBadge}</div>
                       <div style="font-size:9px;opacity:0.4">[${item.rarity || 'common'}] Lv${item.itemLevel || 1}</div>
                       ${affixBadge}`
                    : `<div style="font-size:11px;opacity:0.2">— Trống —</div>`}
                </div>
                ${hasItem ? `
                  <div style="display:flex;gap:4px;justify-content:center;margin-top:6px">
                    <button class="btn btn--xs btn-unequip" data-unequip-slot="${actualSlot}" title="Tháo trang bị">Tháo</button>
                    <button class="btn btn--xs btn-forge-shortcut" data-forge-jump="${item.id}" title="Đến Lò Tạo Hóa để cường hóa">Rèn</button>
                  </div>
                ` : ''}
              </div>`
          }).join('')}
        </div>
        ${equipList.length > 0 ? `
          <div style="padding:0 14px 10px;font-size:11px;color:var(--text-dim);border-top:1px solid rgba(255,255,255,0.05);padding-top:8px">Chi tiết pháp bảo trang bị:</div>
          ${EQUIPMENT_SLOTS.map(s => {
            const item = eq[s.key] || (s.key === 'ring1' && !eq.ring1 ? eq.ring : null)
            const actualSlot = (s.key === 'ring1' && !eq.ring1 && eq.ring) ? 'ring' : s.key
            return item && item.id ? itemRow(item, false, { isEquipped: true, slotKey: actualSlot }) : ''
          }).join('')}
        ` : ''}
      </div>
    `
  }

  onMounted() {
    if (this.props.ctx) {
      bindItemActions(this.container, this.props.ctx)
    }
  }

  onUpdated() {
    if (this.props.ctx) {
      bindItemActions(this.container, this.props.ctx)
    }
  }

  bindEvents() {
    this.on('click', '.btn-unequip', async (e, target) => {
      e.stopPropagation()
      const slot = target.dataset.unequipSlot
      const { ctx } = this.props
      if (!ctx || !slot) return

      try {
        const res = await ctx.api.request(`/player/${ctx.state.playerId}/unequip`, {
          method: 'POST',
          body: JSON.stringify({ slot })
        })
        ctx.state.player = res.player
        ctx.notify(res.message || 'Đã tháo trang bị', 'success')
        ctx.renderGame()
      } catch (err) {
        ctx.notify(err.message || 'Lỗi tháo trang bị', 'error')
      }
    })

    this.on('click', '.btn-forge-shortcut', (e, target) => {
      e.stopPropagation()
      const itemId = target.dataset.forgeJump
      const { ctx } = this.props
      if (ctx) {
        ctx.state.alchemyTab = 'enhance'
        ctx.state.selectedEnhanceItemId = itemId
        ctx.state.page = 'alchemy'
        ctx.renderGame()
      }
    })
  }
}
