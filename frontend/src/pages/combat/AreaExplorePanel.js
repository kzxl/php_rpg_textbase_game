import { Component } from '../../core/Component.js'
import { renderCombatLogLines } from './constants.js'

/**
 * AreaExplorePanel Component: Coordinates area metadata, exploration button, and tracked monsters.
 */
export class AreaExplorePanel extends Component {
  template() {
    const { ctx } = this.props
    const p = ctx?.state?.player || {}
    const currentAreaData = ctx?.state?.exploration ? ctx.state.exploration[p.currentArea || 'thanh_lam_tran'] : null
    const areaName = currentAreaData ? currentAreaData.name : 'Vùng Đất Vô Danh'
    const exploreCost = currentAreaData ? (currentAreaData.staminaCost || currentAreaData.stamina_cost || 10) : 10

    const areaRates = currentAreaData?.rates || []
    const herbRate = areaRates.find(r => r.type === 'herb')?.weight || 0
    const mineralRate = areaRates.find(r => r.type === 'mineral')?.weight || 0
    const monsterRate = areaRates.find(r => r.type === 'monster')?.weight || 0
    const specialtyNames = currentAreaData?.specialtyNames || []

    return `
      <div class="area-explore-panel">
        <div class="page-header" style="margin-bottom:12px">
          <h1 style="margin:0; font-size:20px; font-weight:700">🗺️ Khu Vực: ${areaName}</h1>
          <div class="text-dim text-sm" style="font-size:12px; color:var(--text-dim); margin-top:2px">Nơi cất giấu nhiều cơ duyên và hiểm nguy.</div>
        </div>

        <!-- KHÁM PHÁ CARD -->
        <div class="panel" id="panelKhamPha" style="border: 1px solid rgba(208, 165, 48, 0.4); box-shadow: 0 4px 15px rgba(208, 165, 48, 0.1); background:var(--bg-surface, #151922); border-radius:10px; margin-bottom:14px">
          <div class="panel-body text-center" style="padding: 24px 16px; text-align:center">
            <h2 class="text-lg text-gold mb-sm" style="margin:0 0 6px 0; font-size:18px; color:var(--gold, #facc15)">Dò Thám Xung Quanh</h2>
            <p class="text-dim mb-xs" style="font-size:12px; color:var(--text-dim); margin:0 0 10px 0">Tiêu hao thể lực để tìm kiếm tài nguyên, kỳ ngộ hoặc yêu thú.</p>
            <div class="flex gap-2 justify-center flex-wrap mb-sm text-xs" style="display:flex; justify-content:center; gap:8px; flex-wrap:wrap; margin-bottom:12px">
              <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); font-size:11px; padding:3px 8px; border-radius:4px">🌿 Thảo Dược: ~${herbRate}%</span>
              <span class="badge" style="background: rgba(6, 182, 212, 0.15); color: #38bdf8; border: 1px solid rgba(6, 182, 212, 0.3); font-size:11px; padding:3px 8px; border-radius:4px">⛏️ Mạch Khoáng: ~${mineralRate}%</span>
              <span class="badge" style="background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3); font-size:11px; padding:3px 8px; border-radius:4px">👾 Yêu Thú: ~${monsterRate}%</span>
            </div>
            ${specialtyNames.length ? `
              <div class="text-xs mb-md" style="color: #facc15; background: rgba(234, 179, 8, 0.08); border: 1px dashed rgba(234, 179, 8, 0.3); border-radius: 6px; padding: 5px 12px; display: inline-block; margin-bottom:14px; font-size:11px">
                💎 <strong>Đặc Thù Bản Đồ:</strong> ${specialtyNames.join(' · ')}
              </div>
            ` : ''}
            <div class="flex justify-center gap-2 flex-wrap" style="display:flex; justify-content:center; gap:8px; flex-wrap:wrap">
              <button class="btn btn--gold btn--lg" id="btnExplore" style="min-width: 150px; display: flex; justify-content: center; align-items: center; gap: 8px; padding:10px 18px; font-weight:700">
                <span>🔍 Tìm Kiếm</span>
                <span class="badge" style="background: rgba(0,0,0,0.3); color: #fff; font-size:11px; padding:2px 6px">-${exploreCost} Thể Lực</span>
              </button>
              <button class="btn btn--red btn--lg" id="btnAutoBattle" style="min-width: 150px; display: flex; justify-content: center; align-items: center; gap: 8px; padding:10px 18px; font-weight:700">
                <span>⚡ Tự Động Quét Quái</span>
              </button>
            </div>
          </div>
        </div>

        <!-- EXPLORE EVENT RESULT CONTAINER -->
        <div id="exploreResult"></div>

        <!-- TRACKED MONSTERS PANEL -->
        <div class="panel mt-md" style="background:var(--bg-surface, #151922); border-radius:8px; border:1px solid rgba(255,255,255,0.08); margin-bottom:14px">
          <div class="panel-title" style="padding:10px 14px; font-weight:600; border-bottom:1px solid rgba(255,255,255,0.05)">
            ⚔️ Yêu Thú Đang Rình Rập <span class="subtitle" style="font-size:11px; color:var(--text-dim)">(Tối đa 5 con)</span>
          </div>
          <div class="panel-body no-pad" id="trackedMonstersList" style="max-height: 400px; overflow-y: auto;">
            <div style="padding: 16px; text-align: center;" class="text-dim">Đang rà soát dấu vết...</div>
          </div>
        </div>
      </div>
    `
  }

  onMounted() {
    this.loadTrackedMonsters()
  }

  async loadTrackedMonsters() {
    const { ctx } = this.props
    if (!ctx) return
    const p = ctx.state?.player || {}
    const listEl = this.container.querySelector('#trackedMonstersList')
    if (!listEl) return

    try {
      const res = await ctx.api.getAreaMonsters(p.id)
      if (res.monsters) {
        ctx.state.player.trackedMonsters = res.monsters
        if (res.monsters.length === 0) {
          listEl.innerHTML = `<div style="padding: 16px; text-align: center;" class="text-dim">Không có dấu vết yêu thú nào quanh đây.</div>`
          return
        }

        listEl.innerHTML = res.monsters.map(m => {
          const hpPct = Math.max(0, Math.min(100, (m.currentHp / (m.stats?.hp || 1)) * 100))
          return `
            <div class="list-item" style="padding:10px 14px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.05)">
              <div style="display:flex; align-items:center; gap:10px">
                <span style="font-size:24px">${m.icon || '👾'}</span>
                <div>
                  <div style="font-weight:700; color:var(--red, #f87171)">${m.name} <span style="font-size:11px; color:var(--text-dim)">Lv.${m.level || 1}</span></div>
                  <div style="width:120px; background:rgba(0,0,0,0.4); height:6px; border-radius:3px; overflow:hidden; margin-top:4px">
                    <div style="width:${hpPct}%; background:var(--red, #f87171); height:100%"></div>
                  </div>
                </div>
              </div>
              <button class="btn btn--sm btn--red btn-attack-tracked" data-instance-id="${m.instanceId || m.id}">Tấn Công</button>
            </div>
          `
        }).join('')
      }
    } catch (err) {
      listEl.innerHTML = `<div style="padding: 12px; text-align: center; color:var(--red)">Lỗi nạp quái vật</div>`
    }
  }

  bindEvents() {
    this.on('click', '#btnExplore', () => {
      if (this.props.onExplore) this.props.onExplore()
    })

    this.on('click', '#btnAutoBattle', () => {
      if (this.props.onAutoBattle) this.props.onAutoBattle()
    })

    this.on('click', '.btn-attack-tracked', (e, target) => {
      const instanceId = target.dataset.instanceId
      if (this.props.onAttackTracked) {
        this.props.onAttackTracked(instanceId)
      }
    })
  }
}
