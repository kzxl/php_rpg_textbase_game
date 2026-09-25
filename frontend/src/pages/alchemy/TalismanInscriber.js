import { Component } from '../../core/Component.js'
import { TALISMAN_RECIPES } from './constants.js'

/**
 * TalismanInscriber Component: Manages Currency & Affix Modification (Phù Văn).
 */
export class TalismanInscriber extends Component {
  initialState() {
    const allItems = this.getAllItems()
    const ctx = this.props.ctx
    const defaultSelected = ctx?.state?._selectedCurrencyItemId || allItems[0]?.id
    return {
      selectedItemId: defaultSelected
    }
  }

  getAllItems() {
    const p = this.props.ctx?.state?.player || {}
    const items = []
    Object.entries(p.equipment || {}).forEach(([slot, it]) => {
      if (it) items.push({ ...it, loc: 'eq', slotName: slot })
    })
    ;(p.inventory || []).filter(it => it.slot && it.slot !== 'consumable').forEach(it => {
      items.push({ ...it, loc: 'inv', slotName: it.slot })
    })
    return items
  }

  template() {
    const { costReduction = 0 } = this.props
    const allItems = this.getAllItems()
    const { selectedItemId } = this.state
    const selectedItem = allItems.find(it => it.id === selectedItemId) || allItems[0]

    return `
      <div class="talisman-inscriber">
        <!-- ITEM SELECTOR PANEL -->
        <div class="panel" style="margin-bottom:10px; background:var(--bg-surface, #151922); border-radius:8px; border:1px solid rgba(255,255,255,0.08)">
          <div class="panel-title" style="padding:10px 14px; font-weight:600; border-bottom:1px solid rgba(255,255,255,0.05)">⚔️ Chọn Trang Bị Khắc Ấn</div>
          <div class="panel-body" style="padding:10px 14px">
            ${allItems.length === 0 ? `
              <div style="opacity:0.3">Không có trang bị nào...</div>
            ` : `
              <select id="selCurrencyItem" class="form-select" style="width:100%; padding:8px; background:var(--bg-secondary, #1a1e29); color:var(--text, #e2e8f0); border:1px solid rgba(255,255,255,0.1); border-radius:6px; font-size:13px">
                ${allItems.map(it => `
                  <option value="${it.id}" ${it.id === selectedItem?.id ? 'selected' : ''}>
                    ${it.loc === 'eq' ? '🔸 [Đang Mặc]' : '📦 [Túi]'} ${it.displayName || it.name} [${it.rarity || '?'}] ${(it.affixes || []).length} dòng
                  </option>`).join('')}
              </select>
              <div id="currencyItemPreview" style="margin-top:8px; font-size:12px; opacity:0.85">
                ${(selectedItem?.affixes || []).map(a => `<span style="color:var(--blue, #60a5fa)">• ${a.name || a.stat} +${a.value}</span>`).join(' | ') || 'Chưa có dòng thuộc tính nào'}
              </div>
            `}
          </div>
        </div>

        <!-- TALISMAN ACTION CARDS GRID -->
        <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:10px">
          ${TALISMAN_RECIPES.map(c => {
            const realCost = Math.max(1, Math.round(c.cost * (1 - costReduction / 100)))
            return `
              <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:12px; display:flex; flex-direction:column; justify-content:space-between">
                <div>
                  <div style="font-size:22px; margin-bottom:4px">${c.icon}</div>
                  <div style="font-weight:700; font-size:13px; margin-bottom:2px; color:var(--text-bright, #fff)">${c.name}</div>
                  <div style="font-size:11px; opacity:0.5; margin-bottom:8px; line-height:1.3">${c.desc}</div>
                </div>
                <button class="btn btn--gold btn--sm btn-currency" data-cid="${c.id}" style="width:100%; justify-content:center">
                  💎 ${realCost} ${costReduction > 0 ? `<s style="opacity:0.4; font-size:10px">${c.cost}</s>` : ''}
                </button>
              </div>`
          }).join('')}
        </div>
      </div>
    `
  }

  bindEvents() {
    this.on('change', '#selCurrencyItem', (e, target) => {
      const selectedId = target.value
      if (this.props.ctx?.state) {
        this.props.ctx.state._selectedCurrencyItemId = selectedId
      }
      this.setState({ selectedItemId: selectedId })
    })

    this.on('click', '.btn-currency', async (e, target) => {
      const { ctx } = this.props
      const { selectedItemId } = this.state
      const allItems = this.getAllItems()
      const selectedItem = allItems.find(it => it.id === selectedItemId)

      if (!selectedItem) return ctx.notify('Chọn trang bị trước!', 'error')
      const cid = target.dataset.cid
      let lockIdx = -1

      if (cid === 'thien_menh_phu') {
        const affixes = selectedItem.affixes || []
        if (affixes.length === 0) return ctx.notify('Trang bị không có dòng thuộc tính để khóa!', 'error')
        const choice = prompt(`Chọn số thứ tự dòng muốn khóa (0-${affixes.length - 1}):\n${affixes.map((a, i) => `${i}: ${a.name || a.stat} +${a.value}`).join('\n')}`)
        if (choice === null) return
        lockIdx = parseInt(choice, 10)
        if (isNaN(lockIdx) || lockIdx < 0 || lockIdx >= affixes.length) return ctx.notify('Chỉ số không hợp lệ!', 'error')
      }

      target.disabled = true
      target.textContent = '⏳...'

      try {
        const res = await ctx.api.applyCurrency(ctx.state.player.id, cid, selectedItem.id, lockIdx)
        ctx.notify(res.message, 'success')
        ctx.state.player = res.player
        if (ctx.updateSidebar) ctx.updateSidebar()
        this.update()
      } catch (err) {
        ctx.notify(err.message || 'Lỗi áp dụng phù chú', 'error')
        target.disabled = false
        target.textContent = '💎 Dùng'
      }
    })
  }
}
