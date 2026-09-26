import { Component } from '../../core/Component.js'

/**
 * CraftingPillarView Component: Manages Crafting Mastery, Perks & Quick Recipes.
 */
export class CraftingPillarView extends Component {
  template() {
    const { masteryData, player = {} } = this.props
    if (!masteryData) {
      return `
        <div style="text-align: center; padding: 40px; color: var(--text-dim);">
          <div style="font-size: 32px; animation: pulse 1.5s infinite;">⚒️</div>
          <div style="margin-top: 10px;">Đang mở Lò Luyện Đan & Lò Rèn...</div>
        </div>
      `
    }

    const { craftingLevel, craftingXp, xpToNext, progressPercent, title, badgeColor, perks, recipes = [] } = masteryData

    return `
      <div class="crafting-pillar-view">
        <!-- HERO BANNER -->
        <div class="crafting-hero" style="background:rgba(255,255,255,0.02); border:1px solid var(--border); border-radius:8px; padding:18px; margin-bottom:14px">
          <div class="crafting-hero-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px">
            <div class="crafting-hero-title" style="font-weight:700; font-size:16px; color:var(--gold, #facc15); display:flex; align-items:center; gap:8px">
              <span>🔥</span>
              <span>Thông Thạo Đan Đạo & Chế Tác</span>
            </div>
            <span class="crafting-rank-badge" style="background: ${badgeColor || '#d97706'}; color:#fff; font-size:11px; padding:3px 8px; border-radius:4px; font-weight:700">
              ${title || 'Đan Đồng'} (Lv.${craftingLevel || 1})
            </span>
          </div>

          <div style="margin-bottom: 6px; display: flex; justify-content: space-between; font-size: 12px;">
            <span>Kinh Nghiệm Luyện Chế: <b>${craftingXp || 0} / ${xpToNext || 100} XP</b></span>
            <span style="color: var(--gold, #facc15); font-weight:700">${progressPercent || 0}%</span>
          </div>
          <div class="bar-track" style="height: 6px; background:rgba(0,0,0,0.4); border-radius:3px; overflow:hidden; margin-bottom: 12px;">
            <div class="bar-fill" style="width: ${progressPercent || 0}%; height:100%; background: #9c773a;"></div>
          </div>
          <div class="text-dim text-xs" style="font-size:11px; color:var(--text-dim)">Mỗi lần luyện chế thành công hoặc thất bại đều tích lũy đan đạo chi lực, tôi luyện trình độ đan sư.</div>

          <!-- CRAFTING PERKS -->
          <div class="crafting-perks-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:10px; margin-top:14px">
            <div class="crafting-perk-item" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:6px; padding:8px 12px; display:flex; gap:10px; align-items:center">
              <div class="crafting-perk-icon" style="font-size:20px">🎯</div>
              <div class="crafting-perk-info">
                <div class="crafting-perk-name" style="font-size:11px; color:var(--text-dim)">Tỷ Lệ Thành Công</div>
                <div class="crafting-perk-val" style="font-size:12px; font-weight:700; color:var(--green, #4ade80)">+${perks?.successBonusPct ?? 0}% tỷ lệ luyện thành</div>
              </div>
            </div>

            <div class="crafting-perk-item" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:6px; padding:8px 12px; display:flex; gap:10px; align-items:center">
              <div class="crafting-perk-icon" style="font-size:20px">✨</div>
              <div class="crafting-perk-info">
                <div class="crafting-perk-name" style="font-size:11px; color:var(--text-dim)">Xác Suất Đại Thành</div>
                <div class="crafting-perk-val" style="font-size:12px; font-weight:700; color:var(--gold, #facc15)">${perks?.critQualityChance ?? 0}% (Tinh/Cực/Thiên)</div>
              </div>
            </div>

            <div class="crafting-perk-item" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:6px; padding:8px 12px; display:flex; gap:10px; align-items:center">
              <div class="crafting-perk-icon" style="font-size:20px">🛡️</div>
              <div class="crafting-perk-info">
                <div class="crafting-perk-name" style="font-size:11px; color:var(--text-dim)">Bảo Toàn Dược Liệu</div>
                <div class="crafting-perk-val" style="font-size:12px; font-weight:700; color:#38bdf8">Thu hồi ${perks?.materialReturnRate ?? 0}% khi nổ lò</div>
              </div>
            </div>

            <div class="crafting-perk-item" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:6px; padding:8px 12px; display:flex; gap:10px; align-items:center">
              <div class="crafting-perk-icon" style="font-size:20px">🌟</div>
              <div class="crafting-perk-info">
                <div class="crafting-perk-name" style="font-size:11px; color:var(--text-dim)">Thiên Phẩm Đan</div>
                <div class="crafting-perk-val" style="font-size:12px; font-weight:700; color:#c084fc">${perks?.canCraftDivine ? '✅ Đã kích hoạt' : '🔒 Yêu cầu Lv.76+'}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- RECIPES & CRAFTING SHORTCUT -->
        <div class="panel" style="background:var(--bg-surface, #151922); border-radius:8px; border:1px solid rgba(255,255,255,0.08); overflow:hidden">
          <div class="panel-title" style="display: flex; justify-content: space-between; align-items: center; padding:10px 14px; border-bottom:1px solid rgba(255,255,255,0.05); font-weight:600">
            <span>📜 Đan Phương & Công Thức Chế Tác (${recipes.length})</span>
          </div>
          <div class="panel-body" style="padding:14px">
            <div class="shop-items-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(260px, 1fr)); gap:10px">
              ${recipes.map(r => {
                const mats = r.materials || []
                const hasAllMats = mats.every(m => (player.materials?.[m.id] || 0) >= m.amount)
                const hasGold = (player.gold || 0) >= (r.cost || 0)
                const canCraft = hasAllMats && hasGold

                return `
                  <div class="shop-item-card" style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:10px; display:flex; flex-direction:column; justify-content:space-between">
                    <div>
                      <div class="shop-item-header" style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px">
                        <div>
                          <div class="shop-item-name" style="font-weight:700; font-size:13px; color:var(--text-bright)">${r.name}</div>
                          <div class="shop-item-rarity text-dim" style="font-size:11px; color:var(--text-dim)">Tầng ${r.tier || 1} • Cơ bản ${r.successRate}%</div>
                        </div>
                        <span class="badge" style="background: rgba(208, 165, 48, 0.15); color: var(--gold, #facc15); font-size:11px; padding:2px 6px; border-radius:4px">
                          Tốn ${r.cost || 0} 💰
                        </span>
                      </div>
                      <div class="shop-item-desc" style="margin-bottom: 8px; font-size:11px; line-height:1.4">
                        Dược liệu yêu cầu:<br/>
                        ${mats.map(m => {
                          const cur = player.materials?.[m.id] || 0
                          const ok = cur >= m.amount
                          return `<span style="color: ${ok ? 'var(--green, #4ade80)' : 'var(--red, #f87171)'};">• ${m.id} (${cur}/${m.amount})</span>`
                        }).join('<br/>')}
                      </div>
                    </div>
                    <div class="shop-item-footer" style="display:flex; justify-content:space-between; align-items:center; margin-top:8px; border-top:1px solid rgba(255,255,255,0.05); padding-top:6px">
                      <span class="text-xs text-dim" style="font-size:10px; color:var(--text-dim)">${r.craftTime ? `Thời gian: ${r.craftTime}s` : 'Lập tức'}</span>
                      <button class="btn btn--sm ${canCraft ? 'btn--gold' : 'btn--outline'} btn-craft-action" data-rid="${r.id}" ${canCraft ? '' : 'disabled'} style="font-size:11px; padding:3px 8px">
                        ${canCraft ? '🔥 Luyện Chế' : 'Thiếu Liệu'}
                      </button>
                    </div>
                  </div>
                `
              }).join('')}
            </div>
          </div>
        </div>
      </div>
    `
  }

  bindEvents() {
    this.on('click', '.btn-craft-action', async (e, target) => {
      const rId = target.dataset.rid
      const { ctx } = this.props
      if (!ctx || !rId) return

      target.disabled = true
      target.textContent = '⏳...'

      try {
        const res = await ctx.api.craftItem(ctx.state.player.id, rId)
        ctx.state.player = res.player
        ctx.notify(res.message, res.success ? 'success' : 'error')
        if (ctx.updateSidebar) ctx.updateSidebar()
        this.update()
      } catch (err) {
        ctx.notify(err.message || 'Lỗi luyện chế', 'error')
        target.disabled = false
        target.textContent = '🔥 Luyện Chế'
      }
    })
  }
}
