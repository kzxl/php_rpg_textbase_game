import { Component } from '../../core/Component.js'
import { RARITY_COLORS, calculateEnhanceConfig } from './constants.js'
import { getEnhanceStyle } from '../../core/ui/ItemCard.js'

/**
 * EnhancementAltar Component: Manages Equipment Enhancement (+1 to +12) at Lò Tạo Hóa.
 */
export class EnhancementAltar extends Component {
  initialState() {
    const allItems = this.getAllItems()
    const ctx = this.props.ctx
    const defaultSelected = ctx?.state?._selectedEnhanceItemId || ctx?.state?.selectedEnhanceItemId || allItems[0]?.id
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
    const { ctx } = this.props
    const p = ctx?.state?.player || {}
    const allItems = this.getAllItems()
    const { selectedItemId } = this.state

    const selectedItem = allItems.find(it => it.id === selectedItemId) || allItems[0]

    return `
      <div class="enhancement-altar">
        <!-- ITEM SELECTION PANEL -->
        <div class="panel" style="margin-bottom:12px; background:var(--bg-surface, #151922); border-radius:8px; border:1px solid rgba(255,255,255,0.08)">
          <div class="panel-title" style="padding:10px 14px; font-weight:600; border-bottom:1px solid rgba(255,255,255,0.05)">⚔️ Chọn Trang Bị Cần Cường Hóa</div>
          <div class="panel-body" style="padding:10px 14px">
            ${allItems.length === 0 ? `
              <div style="opacity:0.4; padding:8px 0">Không có trang bị nào trên người hoặc trong túi.</div>
            ` : `
              <select id="selEnhanceItem" class="form-select" style="width:100%; padding:10px; background:var(--bg-secondary, #1a1e29); color:var(--text, #e2e8f0); border:1px solid rgba(255,255,255,0.15); border-radius:6px; font-size:13px">
                ${allItems.map(it => {
                  const enh = it.enhanceLevel > 0 ? `+${it.enhanceLevel}` : ''
                  return `
                    <option value="${it.id}" ${it.id === selectedItem?.id ? 'selected' : ''}>
                      ${it.loc === 'eq' ? '🔸 [Đang Mặc]' : '📦 [Túi]'} ${it.displayName || it.name} (${it.rarity || 'common'}) ${enh}
                    </option>`
                }).join('')}
              </select>
            `}
          </div>
        </div>

        ${selectedItem ? this.renderEnhanceDetails(selectedItem, p) : ''}
      </div>
    `
  }

  renderEnhanceDetails(selectedItem, p) {
    const curLvl = parseInt(selectedItem.enhanceLevel, 10) || 0
    const isMax = curLvl >= 12
    const nextLvl = curLvl + 1
    const ilvl = selectedItem.itemLevel || 1

    const { successRate, stonesReq, goldCost, riskType } = calculateEnhanceConfig(nextLvl, ilvl)

    const playerStones = p.materials?.['da_cuong_hoa'] || 0
    const hasEnoughStones = playerStones >= stonesReq
    const hasEnoughGold = p.gold >= goldCost
    const canEnhance = !isMax && hasEnoughStones && hasEnoughGold

    const riskLabels = {
      safe: '<span style="color:#10b981; font-weight:700">✅ 100% Tuyệt Đối Thành Công</span>',
      safe_fail: '<span style="color:#38bdf8; font-weight:700">🛡️ Thất Bại Giữ Nguyên Cấp</span>',
      downgrade: '<span style="color:#f87171; font-weight:700">⚠️ Rủi Ro: Thất Bại Bị Rớt 1 Cấp (-1)</span>'
    }

    const curTierStyle = getEnhanceStyle(curLvl)
    const nextTierStyle = getEnhanceStyle(nextLvl)
    const curGlow = curTierStyle ? `box-shadow: 0 0 10px ${curTierStyle.glow}` : ''
    const nextGlow = nextTierStyle ? `box-shadow: 0 0 10px ${nextTierStyle.glow}` : ''

    return `
      <div class="panel" style="border:1px solid rgba(255,215,0,0.2); box-shadow:0 0 20px rgba(0,0,0,0.4); background:var(--bg-surface, #151922); border-radius:10px">
        <div class="panel-body text-center" style="padding:20px 16px; text-align:center">
          
          <!-- ITEM HEADER -->
          <div style="font-size:36px; margin-bottom:8px">✨</div>
          <h2 style="color:${RARITY_COLORS[selectedItem.rarity] || '#fff'}; margin-bottom:4px; font-size:18px; font-weight:700">
            ${selectedItem.displayName || selectedItem.name}
          </h2>
          <div class="text-sm text-dim" style="margin-bottom:16px; font-size:12px; color:var(--text-dim)">
            Loại: <span style="text-transform:uppercase">${selectedItem.slot || selectedItem.baseType}</span> | Cấp trang bị: iLvl ${selectedItem.itemLevel || 1}
          </div>

          <!-- LEVEL PROGRESSION METER -->
          <div style="background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:14px; margin-bottom:16px">
            <div style="display:flex; justify-content:space-around; align-items:center; margin-bottom:10px">
              <div style="text-align:center">
                <div class="text-xs text-dim" style="font-size:11px; color:var(--text-dim)">Hiện Tại</div>
                <div style="font-size:24px; font-weight:800; color:${curTierStyle?.color || 'var(--text-bright)'}; ${curGlow}">+${curLvl}</div>
              </div>
              <div style="font-size:20px; color:var(--gold, #facc15)">➜</div>
              <div style="text-align:center">
                <div class="text-xs text-dim" style="font-size:11px; color:var(--text-dim)">Mục Tiêu</div>
                <div style="font-size:24px; font-weight:800; color:${nextTierStyle?.color || 'var(--gold)'}; ${nextGlow}">
                  ${isMax ? 'MAX' : `+${nextLvl}`}
                </div>
              </div>
            </div>

            ${!isMax ? `
              <!-- CHANCE PROGRESS BAR -->
              <div style="margin-bottom:8px">
                <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px">
                  <span>Tỉ Lệ Thành Công:</span>
                  <strong style="color:${successRate >= 60 ? 'var(--green, #4ade80)' : (successRate >= 30 ? 'var(--gold, #facc15)' : 'var(--red, #f87171)')}">
                    ${successRate}%
                  </strong>
                </div>
                <div style="background:rgba(255,255,255,0.08); height:8px; border-radius:4px; overflow:hidden">
                  <div style="background:${successRate >= 60 ? 'var(--green, #4ade80)' : (successRate >= 30 ? 'var(--gold, #facc15)' : 'var(--red, #f87171)')}; height:100%; width:${successRate}%"></div>
                </div>
              </div>
              <div style="font-size:11px">${riskLabels[riskType]}</div>
            ` : `
              <div style="color:var(--gold, #facc15); font-weight:700">🌟 TRANG BỊ ĐÃ ĐẠT CƯỜNG HÓA TỐI ĐA CỬU THIÊN (+12)!</div>
            `}
          </div>

          <!-- COST REQUIREMENTS -->
          ${!isMax ? `
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:16px">
              <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:10px">
                <div style="font-size:18px">💎</div>
                <div class="text-xs text-dim" style="font-size:11px; color:var(--text-dim)">Đá Cường Hóa</div>
                <div style="font-size:14px; font-weight:700; color:${hasEnoughStones ? 'var(--green, #4ade80)' : 'var(--red, #f87171)'}">
                  ${playerStones} / ${stonesReq} viên
                </div>
              </div>

              <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:10px">
                <div style="font-size:18px">💰</div>
                <div class="text-xs text-dim" style="font-size:11px; color:var(--text-dim)">Linh Thạch Tiêu Hao</div>
                <div style="font-size:14px; font-weight:700; color:${hasEnoughGold ? 'var(--gold, #facc15)' : 'var(--red, #f87171)'}">
                  ${p.gold || 0} / ${goldCost} 💎
                </div>
              </div>
            </div>

            <!-- ENHANCE BUTTON -->
            <button class="btn btn--gold btn--lg btn-enhance" style="width:100%; justify-content:center; font-size:16px; font-weight:800; padding:12px" data-item="${selectedItem.id}" ${canEnhance ? '' : 'disabled'}>
              ${canEnhance ? `✨ TIẾN HÀNH CƯỜNG HÓA (+${nextLvl})` : (isMax ? 'ĐÃ ĐẠT CẤP TỐI ĐA' : '❌ KHÔNG ĐỦ NGUYÊN LIỆU')}
            </button>
          ` : ''}

        </div>
      </div>
    `
  }

  bindEvents() {
    this.on('change', '#selEnhanceItem', (e, target) => {
      const selectedId = target.value
      if (this.props.ctx?.state) {
        this.props.ctx.state._selectedEnhanceItemId = selectedId
        this.props.ctx.state.selectedEnhanceItemId = selectedId
      }
      this.setState({ selectedItemId: selectedId })
    })

    this.on('click', '.btn-enhance', async (e, target) => {
      const itId = target.dataset.item
      const { ctx } = this.props
      if (!ctx || !itId) return

      target.disabled = true
      target.textContent = '✨ Đang luyện...'

      try {
        const res = await ctx.api.enhanceItem(ctx.state.player.id, itId)
        ctx.state.player = res.player
        ctx.notify(res.message, res.isSuccess ? 'success' : 'error')
        if (ctx.updateSidebar) ctx.updateSidebar()
        this.update()
      } catch (err) {
        ctx.notify(err.message || 'Lỗi cường hóa', 'error')
        target.disabled = false
        target.textContent = '✨ TIẾN HÀNH CƯỜNG HÓA'
      }
    })
  }
}
