import { Component } from '../../core/Component.js'
import { formatId } from './constants.js'

/**
 * PillFurnace Component: Manages Pill & Medicine Crafting (Luyện Đan).
 */
export class PillFurnace extends Component {
  template() {
    const { ctx, craftBonus = 0 } = this.props
    const p = ctx?.state?.player || {}
    const medicines = ctx?.state?.medicines || []
    const medicineRecipes = ctx?.state?.recipes || []

    const getMedName = (id) => {
      const m = medicines.find(x => x.id === id)
      return m ? m.name : id
    }

    return `
      <div class="pill-furnace">
        <!-- HERB STORAGE PANEL -->
        <div class="panel" style="margin-bottom:12px; background:var(--bg-surface, #151922); border-radius:8px; border:1px solid rgba(255,255,255,0.08)">
          <div class="panel-title" style="padding:10px 14px; font-weight:600; border-bottom:1px solid rgba(255,255,255,0.05)">Kho Dược Liệu Tàng Trữ</div>
          <div class="panel-body flex gap-2" style="overflow-x:auto; padding:10px 14px; white-space:nowrap; display:flex">
            ${(!p.materials || Object.keys(p.materials).length === 0) ? `
              <div style="color:var(--text-dim); font-size:13px; padding:6px 0">Nguyên liệu trống không...</div>
            ` : Object.entries(p.materials).map(([mId, amt]) => `
              <div class="badge" style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); padding:4px 8px; font-size:12px; border-radius:4px">
                ${formatId(mId)} <span style="color:var(--gold, #facc15); font-weight:700">x${amt}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- MEDICINE RECIPES LIST -->
        <div class="panel" style="background:var(--bg-surface, #151922); border-radius:8px; border:1px solid rgba(255,255,255,0.08); overflow:hidden">
          <div class="panel-title" style="padding:10px 14px; font-weight:600; border-bottom:1px solid rgba(255,255,255,0.05)">Đan Phương Truyền Thừa</div>
          <div class="panel-body no-pad">
            ${medicineRecipes.length === 0 ? `
              <div style="padding:16px" class="text-dim">Chưa có công thức đan dược...</div>
            ` : medicineRecipes.map(r => {
              const targetName = getMedName(r.target)
              const finalRate = Math.min(100, (r.successRate || 100) + craftBonus)
              let reqHtml = ''
              if (r.requirements?.skill) {
                reqHtml = `<div class="text-orange" style="font-size:12px; margin-bottom:8px">Yêu cầu: ${formatId(r.requirements.skill)} lv${r.requirements.level || 1}</div>`
              }
              let matHtml = ''
              ;(r.materials || []).forEach(m => {
                const has = p.materials?.[m.id] || 0
                matHtml += `
                  <span style="font-size:12px; margin-right:8px; display:inline-block; background:rgba(255,255,255,0.05); padding:3px 8px; border-radius:4px">
                    <span style="color:${has >= m.amount ? 'var(--green, #4ade80)' : 'var(--red, #f87171)'}; font-weight:bold">${has}/${m.amount}</span> ${formatId(m.id)}
                  </span>`
              })
              const targetMed = medicines.find(x => x.id === r.target) || {}
              return `
                <div class="recipe-item" style="border-bottom:1px solid rgba(255,255,255,0.05)">
                  <div class="accordion-header" style="display:flex; justify-content:space-between; align-items:center; padding:12px 14px; cursor:pointer">
                    <div style="display:flex; flex-direction:column; gap:4px">
                      <strong style="color:var(--gold, #facc15); font-size:15px">${targetName}</strong>
                      <div class="text-xs text-dim flex gap-3" style="display:flex; gap:8px">
                        <span class="badge" style="padding:2px 6px">Tier ${r.tier}</span>
                        <span>Tỉ lệ: <span style="color:${finalRate >= 80 ? 'var(--green, #4ade80)' : 'var(--blue, #60a5fa)'}; font-weight:bold">${finalRate}%</span></span>
                        <span>Phí: ${r.cost} Linh Thạch</span>
                      </div>
                    </div>
                    <div class="accordion-arrow text-dim" style="font-size:12px">▼</div>
                  </div>
                  <div class="accordion-body" style="display:none; padding:12px 14px; background:rgba(0,0,0,0.25); border-top:1px solid rgba(255,255,255,0.05)">
                    ${reqHtml}
                    <div style="margin-bottom:10px">
                      <div class="text-dim" style="font-size:11px; margin-bottom:4px">Nguyên liệu cần có:</div>
                      <div style="display:flex; flex-wrap:wrap; gap:6px">${matHtml}</div>
                    </div>
                    <div class="text-dim" style="font-size:12px; margin-bottom:12px; line-height:1.4">
                      <strong>Công Dụng:</strong> ${targetMed.description || 'Chưa rõ.'}
                    </div>
                    <button class="btn btn--gold btn-craft" style="width:100%; justify-content:center" data-recipe="${r.id}">
                      Khởi Lò Luyện Đan
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
    this.on('click', '.accordion-header', (e, target) => {
      const body = target.nextElementSibling
      if (!body) return
      const isHidden = body.style.display === 'none'
      body.style.display = isHidden ? 'block' : 'none'
      const arrow = target.querySelector('.accordion-arrow')
      if (arrow) arrow.textContent = isHidden ? '▲' : '▼'
    })

    this.on('click', '.btn-craft', async (e, target) => {
      e.stopPropagation()
      const rId = target.dataset.recipe
      const { ctx } = this.props
      if (!ctx || !rId) return

      target.disabled = true
      target.textContent = '⏳ Đang khởi lò...'

      try {
        const res = await ctx.api.craftItem(ctx.state.player.id, rId)
        ctx.state.player = res.player
        ctx.notify(res.message, res.success ? 'success' : 'error')
        if (ctx.updateSidebar) ctx.updateSidebar()
        this.update()
      } catch (err) {
        ctx.notify(err.message || 'Lỗi khởi lò', 'error')
        target.disabled = false
        target.textContent = '🔥 Khởi Lò Luyện Đan'
      }
    })
  }
}
