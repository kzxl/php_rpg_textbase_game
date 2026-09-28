import { Component } from '../../core/Component.js'
import { TALISMAN_RECIPES } from './constants.js'
import { fmtAffix, getEnhanceTier, getEnhanceDescription } from '../helpers.js'

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

    const enh = selectedItem ? (parseInt(selectedItem.enhanceLevel, 10) || 0) : 0
    const enhTier = getEnhanceTier(enh)
    const enhBadge = enh > 0 ? `<span class="badge-enhance tier-${enhTier} lvl-${enh}">+${enh}</span>` : ''
    const enhDesc = enh > 0 ? getEnhanceDescription(selectedItem) : ''
    const affixes = selectedItem?.affixes || []

    return `
      <div class="talisman-inscriber">
        <!-- ITEM SELECTOR PANEL -->
        <div class="panel" style="margin-bottom:12px; background:var(--bg-surface, #151922); border-radius:8px; border:1px solid rgba(255,255,255,0.08)">
          <div class="panel-title" style="padding:10px 14px; font-weight:600; border-bottom:1px solid rgba(255,255,255,0.05); display:flex; justify-content:space-between; align-items:center">
            <span>⚔️ Chọn Trang Bị Khắc Ấn Phù Văn</span>
            <span style="font-size:11px; color:var(--text-dim); font-weight:normal">${allItems.length} trang bị khả dụng</span>
          </div>
          <div class="panel-body" style="padding:12px 14px">
            ${allItems.length === 0 ? `
              <div style="opacity:0.3; padding:12px; text-align:center">Không có trang bị nào trong túi hoặc đang mặc...</div>
            ` : `
              <select id="selCurrencyItem" class="form-select" style="width:100%; padding:8px 10px; background:var(--bg-secondary, #1a1e29); color:var(--text, #e2e8f0); border:1px solid rgba(255,255,255,0.12); border-radius:6px; font-size:13px">
                ${allItems.map(it => {
                  const itEnh = parseInt(it.enhanceLevel, 10) || 0
                  const itEnhStr = itEnh > 0 ? ` (+${itEnh})` : ''
                  const itAffixesCount = (it.affixes || []).length
                  return `
                    <option value="${it.id}" ${it.id === selectedItem?.id ? 'selected' : ''}>
                      ${it.loc === 'eq' ? '🔸 [Đang Mặc]' : '📦 [Túi]'} ${it.displayName || it.name}${itEnhStr} [${(it.rarity || 'common').toUpperCase()}] — ${itAffixesCount}/4 Phù Văn
                    </option>
                  `
                }).join('')}
              </select>

              <!-- DETAILED ITEM & AFFIX PREVIEW CARD -->
              <div style="margin-top:12px; background:rgba(0,0,0,0.25); border:1px solid rgba(255,255,255,0.08); border-radius:6px; padding:12px">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px">
                  <div>
                    <div style="font-size:14px; font-weight:700" class="rarity-${selectedItem?.rarity || 'common'}">
                      ${selectedItem?.displayName || selectedItem?.name} ${enhBadge}
                    </div>
                    <div style="font-size:11px; color:var(--text-dim); margin-top:2px">
                      Phẩm chất: <span class="rarity-${selectedItem?.rarity || 'common'}">${(selectedItem?.rarity || 'common').toUpperCase()}</span> | Cấp: Lv.${selectedItem?.itemLevel || 1} | Vị trí: ${selectedItem?.slotName || selectedItem?.slot || 'Trang bị'}
                    </div>
                  </div>
                  <div style="text-align:right">
                    <span style="font-size:11px; font-weight:600; color:var(--gold, #facc15)">${affixes.length}/4 Khắc Ấn</span>
                  </div>
                </div>

                ${enhDesc ? `
                  <div style="font-size:11.5px; color:#38bdf8; background:rgba(56,189,248,0.08); border:1px solid rgba(56,189,248,0.2); border-radius:4px; padding:4px 8px; margin-bottom:10px">
                    ⚡ Uy Lực Cường Hóa: <strong>${enhDesc}</strong>
                  </div>
                ` : ''}

                <!-- 4 SLOTS BREAKDOWN -->
                <div style="font-size:11px; font-weight:700; color:var(--text-dim); margin-bottom:6px; text-transform:uppercase; letter-spacing:0.5px">
                  📜 Danh Sách Phù Văn Khắc Ấn (Tối đa 4 dòng):
                </div>
                <div style="display:flex; flex-direction:column; gap:5px">
                  ${[0, 1, 2, 3].map(slotIdx => {
                    const affix = affixes[slotIdx]
                    if (affix) {
                      const tierStr = affix.tier ? `<span style="font-size:9.5px; background:rgba(234, 179, 8, 0.15); color:#facc15; border:1px solid rgba(234, 179, 8, 0.35); padding:1px 5px; border-radius:3px; font-weight:700">Tầng ${affix.tier}</span>` : ''
                      return `
                        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:4px; padding:6px 10px; font-size:12px">
                          <div style="display:flex; align-items:center; gap:6px">
                            <span style="font-size:11px; color:var(--text-dim)">#${slotIdx + 1}</span>
                            <span style="color:var(--gold, #facc15); font-weight:700">${affix.name ? `[${affix.name}]` : `[Phù Văn]`}</span>
                            ${tierStr}
                          </div>
                          <span style="color:#60a5fa; font-weight:600">${fmtAffix(affix, true)}</span>
                        </div>
                      `
                    } else {
                      return `
                        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.01); border:1px dashed rgba(255,255,255,0.08); border-radius:4px; padding:6px 10px; font-size:11.5px; opacity:0.6">
                          <div style="display:flex; align-items:center; gap:6px">
                            <span style="font-size:11px; color:var(--text-dim)">#${slotIdx + 1}</span>
                            <span style="font-style:italic">— Ô Khắc Ấn Trống —</span>
                          </div>
                          <span style="font-size:10px; color:#38bdf8">Dùng [Hỗn Chú Phù] để khắc thêm</span>
                        </div>
                      `
                    }
                  }).join('')}
                </div>
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
        const choice = prompt(`Chọn số thứ tự dòng muốn khóa (0-${affixes.length - 1}):\n${affixes.map((a, i) => `${i}: ${fmtAffix(a, true)}`).join('\n')}`)
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
