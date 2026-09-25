import { Component } from '../../core/Component.js'
import { itemRow, bindItemActions } from '../helpers.js'

/**
 * ItemGridView Component: Displays filterable inventory equipment & manuals.
 */
export class ItemGridView extends Component {
  template() {
    const { player = {}, category = 'weapon' } = this.props
    const playerInv = player.inventory || []

    let filteredItems = []
    if (category === 'weapon') {
      filteredItems = playerInv.filter(i => i.slot === 'weapon' && i.category !== 'manual')
    } else if (category === 'armor') {
      filteredItems = playerInv.filter(i => ['body', 'shield', 'feet'].includes(i.slot))
    } else if (category === 'accessory') {
      filteredItems = playerInv.filter(i => ['ring', 'amulet', 'ring1', 'ring2'].includes(i.slot))
    } else if (category === 'manual') {
      filteredItems = playerInv.filter(i => i.category === 'manual')
    }

    if (filteredItems.length === 0) {
      return `<div style="padding:20px; text-align:center" class="text-dim">Không có vật phẩm loại này.</div>`
    }

    return `
      <div class="item-grid-view">
        ${filteredItems.map(i => {
          let eqItem = null
          if (i.slot === 'weapon') eqItem = player.equipment?.weapon
          else if (i.slot === 'body') eqItem = player.equipment?.body
          else if (i.slot === 'shield') eqItem = player.equipment?.shield
          else if (i.slot === 'feet') eqItem = player.equipment?.feet
          else if (['ring', 'ring1', 'ring2', 'amulet'].includes(i.slot)) {
            eqItem = player.equipment?.ring1 || player.equipment?.ring2 || null
          }
          return itemRow(i, true, { equippedItem: eqItem, isEquipped: false })
        }).join('')}
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
    this.on('click', '[data-eid]', async (e, target) => {
      e.stopPropagation()
      const itemId = target.dataset.eid
      const { ctx } = this.props
      if (!ctx || !itemId) return

      try {
        const data = await ctx.api.equipItem(ctx.state.playerId, itemId)
        ctx.state.player = data.player
        ctx.notify(data.message, 'success')
        ctx.renderGame()
      } catch (err) {
        ctx.notify(err.message || 'Lỗi trang bị', 'error')
      }
    })

    this.on('click', '[data-use]', async (e, target) => {
      e.stopPropagation()
      const itemId = target.dataset.use
      const { ctx } = this.props
      if (!ctx || !itemId) return

      try {
        const data = await ctx.api.useItem(ctx.state.playerId, itemId)
        ctx.state.player = data.player
        ctx.notify(data.message, 'success')
        ctx.renderGame()
      } catch (err) {
        ctx.notify(err.message || 'Lỗi sử dụng', 'error')
      }
    })
  }
}
