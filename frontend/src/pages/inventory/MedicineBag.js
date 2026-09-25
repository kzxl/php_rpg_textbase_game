import { Component } from '../../core/Component.js'

/**
 * MedicineBag Component: Manages pill cabinet, cooldown tracking, and toxicity feedback.
 */
export class MedicineBag extends Component {
  template() {
    const { player = {}, ctx } = this.props
    const meds = ctx?.state?.medicines || []
    const medCD = player.medCooldownRemaining || 0

    const hasDuocLy = player.skills && player.skills.some(s => {
      const sid = typeof s === 'string' ? s : s.id
      return sid === 'duoc_ly' || sid === 'y_thuat'
    })

    return `
      <div class="medicine-bag" style="padding:12px">
        ${medCD > 0 ? `
          <div style="text-align:center;padding:8px;margin-bottom:8px;background:rgba(255,165,0,0.1);border-radius:8px">
            <span style="color:var(--orange);font-weight:700">⏳ Đan độc: ${medCD}s / 300s</span>
            <div class="bar-track" style="margin-top:4px"><div class="bar-fill nerve" style="width:${(medCD/300)*100}%;background:var(--orange)"></div></div>
          </div>` : ''}

        ${meds.length === 0 ? '<div class="text-dim text-center mt-3">Túi trống không.</div>' :
          meds.map(m => `
            <div class="list-item" style="padding:10px; align-items:center; display:flex; justify-content:space-between; border-bottom:1px solid rgba(255,255,255,0.05)">
              <div class="item-info" style="flex:1">
                <div class="item-name" style="font-weight:600; color:var(--text-bright)">${m.icon || '💊'} ${m.name}</div>
                <div class="item-meta" style="font-size:11px; color:var(--text-dim); margin-top:2px">
                  ${m.description}
                  ${m.healPercent ? ` · Phục hồi ${m.healPercent}% HP` : ''}
                  ${m.cooldownAdd ? ` · Sinh Đan độc ${m.cooldownAdd}s` : ''}
                  ${m.duration ? ` · Hiệu lực ${m.duration} trận` : ''}
                  ${m.toxicity && hasDuocLy ? `<div class="text-red mt-xs">⚠️ Phản Phệ: ${m.toxicity.chance}% tẩu hỏa nhập ma</div>` : ''}
                  ${m.penalty && hasDuocLy ? `<div class="text-orange mt-xs">⚠️ Tác dụng phụ: ${m.penalty.map(x => `Giảm ${Math.abs(x.value)*100}% ${x.stat}`).join(', ')}</div>` : ''}
                </div>
              </div>
              <button class="btn btn--sm btn--blue btn-use-med" data-med="${m.id}" 
                ${medCD + (m.cooldownAdd || 0) > 300 ? 'disabled' : ''}>Nuốt</button>
            </div>
          `).join('')}
      </div>
    `
  }

  bindEvents() {
    this.on('click', '.btn-use-med', async (e, target) => {
      const medId = target.dataset.med
      const { ctx } = this.props
      if (!ctx || !medId) return

      try {
        const data = await ctx.api.useMedicine(ctx.state.playerId, medId)
        ctx.state.player = data.player
        ctx.notify(data.message, 'success')
        ctx.renderGame()
      } catch (err) {
        ctx.notify(err.message || 'Đan độc quá nồng!', 'error')
      }
    })
  }
}
