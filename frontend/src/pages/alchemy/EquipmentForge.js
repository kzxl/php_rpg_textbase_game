import { Component } from '../../core/Component.js'
import { RARITY_COLORS, SLOT_ICONS, formatId } from './constants.js'

/**
 * EquipmentForge Component: Manages Equipment Forging & Blacksmithing (Đúc Khí).
 */
export class EquipmentForge extends Component {
  initialState() {
    return {
      forgeFilter: this.props.ctx?.state?._forgeFilter || 'all'
    }
  }

  template() {
    const { ctx, craftLvl = 1, craftBonus = 0 } = this.props
    const p = ctx?.state?.player || {}
    const forgingRecipes = ctx?.state?._forgingRecipes || []
    const { forgeFilter } = this.state

    const filteredForging = forgingRecipes.filter(r => {
      if (forgeFilter === 'all') return true
      return r.slot === forgeFilter
    })

    return `
      <div class="equipment-forge">
        <!-- SUB-FILTERS FOR FORGING -->
        <div style="display:flex; gap:6px; margin-bottom:12px; overflow-x:auto; padding-bottom:4px">
          <button class="btn ${forgeFilter==='all'?'btn--gold':'btn--dark'} btn--xs filter-forge-btn" data-filter="all">Tất Cả (${forgingRecipes.length})</button>
          <button class="btn ${forgeFilter==='weapon'?'btn--gold':'btn--dark'} btn--xs filter-forge-btn" data-filter="weapon">⚔️ Vũ Khí</button>
          <button class="btn ${forgeFilter==='body'?'btn--gold':'btn--dark'} btn--xs filter-forge-btn" data-filter="body">🛡️ Hộ Giáp</button>
          <button class="btn ${forgeFilter==='shield'?'btn--gold':'btn--dark'} btn--xs filter-forge-btn" data-filter="shield">🛡️ Khiên</button>
          <button class="btn ${forgeFilter==='ring'?'btn--gold':'btn--dark'} btn--xs filter-forge-btn" data-filter="ring">💍 Giới Chỉ</button>
          <button class="btn ${forgeFilter==='feet'?'btn--gold':'btn--dark'} btn--xs filter-forge-btn" data-filter="feet">👢 Giày / Hài</button>
        </div>

        <div class="panel" style="background:var(--bg-surface, #151922); border-radius:8px; border:1px solid rgba(255,255,255,0.08); overflow:hidden">
          <div class="panel-title" style="display:flex; justify-content:space-between; align-items:center; padding:10px 14px; border-bottom:1px solid rgba(255,255,255,0.05)">
            <span style="font-weight:600">⚒️ Danh Sách Bản Đồ Đúc Khí</span>
            <span class="text-xs text-dim">Khoáng thạch & Vật liệu yêu thú</span>
          </div>
          <div class="panel-body no-pad">
            ${filteredForging.length === 0 ? `
              <div style="padding:16px" class="text-dim">Không có công thức đúc khí trong mục này.</div>
            ` : filteredForging.map(r => {
              const icon = SLOT_ICONS[r.slot] || '⚔️'
              const rColor = RARITY_COLORS[r.rarity] || '#94a3b8'
              const finalRate = Math.min(100, (r.successRate || 80) + Math.floor(craftLvl / 4) + craftBonus)
              
              let canForge = (p.gold >= r.cost)
              let matsHtml = ''
              ;(r.materials || []).forEach(m => {
                const has = p.materials?.[m.id] || 0
                const ok = has >= m.amount
                if (!ok) canForge = false
                matsHtml += `
                  <span style="font-size:12px; background:rgba(255,255,255,0.04); border:1px solid ${ok ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}; padding:3px 8px; border-radius:4px">
                    <span style="color:${ok ? 'var(--green, #4ade80)' : 'var(--red, #f87171)'}; font-weight:700">${has}/${m.amount}</span> ${m.name || formatId(m.id)}
                  </span>`
              })

              return `
                <div class="forge-recipe-item" style="border-bottom:1px solid rgba(255,255,255,0.05)">
                  <div class="accordion-header" style="display:flex; justify-content:space-between; align-items:center; padding:12px 14px; cursor:pointer">
                    <div style="display:flex; align-items:center; gap:12px">
                      <div style="font-size:26px">${icon}</div>
                      <div>
                        <div style="font-weight:700; font-size:15px; color:${rColor}">${r.name}</div>
                        <div class="text-xs text-dim flex gap-3 mt-xs" style="display:flex; gap:8px">
                          <span class="badge" style="border:1px solid ${rColor}; color:${rColor}; padding:1px 6px; text-transform:uppercase">${r.rarity}</span>
                          <span>Tier ${r.tier}</span>
                          <span>Tỉ lệ: <span style="color:${finalRate >= 75 ? 'var(--green, #4ade80)' : 'var(--blue, #60a5fa)'}; font-weight:700">${finalRate}%</span></span>
                          <span>🔥 ${r.cost} Linh Thạch</span>
                        </div>
                      </div>
                    </div>
                    <div class="accordion-arrow text-dim" style="font-size:12px">▼</div>
                  </div>

                  <div class="accordion-body" style="display:none; padding:14px; background:rgba(0,0,0,0.25); border-top:1px solid rgba(255,255,255,0.05)">
                    <div style="margin-bottom:10px">
                      <div class="text-dim" style="font-size:11px; margin-bottom:6px">Nguyên liệu cần thiết:</div>
                      <div style="display:flex; flex-wrap:wrap; gap:6px">${matsHtml}</div>
                    </div>
                    <div class="text-dim" style="font-size:12px; margin-bottom:12px; line-height:1.4">
                      <strong>Đặc Tính:</strong> ${r.description}
                    </div>
                    <button class="btn btn--gold btn-forge" style="width:100%; justify-content:center" data-recipe="${r.id}" ${canForge ? '' : 'disabled'}>
                      ${canForge ? `⚒️ Khởi Động Lò Đúc (${r.cost} 💎)` : '❌ Thiếu Nguyên Liệu hoặc Linh Thạch'}
                    </button>
                  </div>
                </div>
              `
            }).join('')}
          </div>
        </div>
      </div>
    `
  }

  bindEvents() {
    this.on('click', '.filter-forge-btn', (e, target) => {
      const nextFilter = target.dataset.filter
      if (this.props.ctx?.state) {
        this.props.ctx.state._forgeFilter = nextFilter
      }
      this.setState({ forgeFilter: nextFilter })
    })

    this.on('click', '.accordion-header', (e, target) => {
      const body = target.nextElementSibling
      if (!body) return
      const isHidden = body.style.display === 'none'
      body.style.display = isHidden ? 'block' : 'none'
      const arrow = target.querySelector('.accordion-arrow')
      if (arrow) arrow.textContent = isHidden ? '▲' : '▼'
    })

    this.on('click', '.btn-forge', async (e, target) => {
      e.stopPropagation()
      const rId = target.dataset.recipe
      const { ctx } = this.props
      if (!ctx || !rId) return

      target.disabled = true
      target.textContent = '⚒️ Đang rèn...'

      try {
        const res = await ctx.api.forgeItem(ctx.state.player.id, rId)
        ctx.state.player = res.player
        ctx.notify(res.message, res.success ? 'success' : 'error')
        if (ctx.updateSidebar) ctx.updateSidebar()
        this.update()
      } catch (err) {
        ctx.notify(err.message || 'Lỗi rèn trang bị', 'error')
        target.disabled = false
        target.textContent = '⚒️ Khởi Động Lò Đúc'
      }
    })
  }
}
