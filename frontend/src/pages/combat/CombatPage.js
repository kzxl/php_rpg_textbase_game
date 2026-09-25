import { Component } from '../../core/Component.js'
import { AreaExplorePanel } from './AreaExplorePanel.js'
import { AutoBattleRunner } from './AutoBattleRunner.js'
import { CombatArenaView } from './CombatArenaView.js'
import { renderCombatLogLines } from './constants.js'

/**
 * CombatPage Coordinator: Coordinates 2D Visual Combat, Area Exploration, and Auto-Battle Scans.
 */
export class CombatPage extends Component {
  template() {
    return `
      <div class="combat-page">
        <!-- AUTO BATTLE CONTAINER -->
        <div id="autoBattleContainer"></div>

        <!-- MAIN EXPLORATION VIEW -->
        <div id="areaExploreContainer"></div>

        <!-- ACTIVE COMBAT ARENA VIEW -->
        <div id="combatArenaContainer"></div>
      </div>
    `
  }

  onMounted() {
    this.mountSubViews()
  }

  onUpdated() {
    this.mountSubViews()
  }

  onUnmounted() {
    if (this._explorePanel) this._explorePanel.unmount()
    if (this._autoRunner) this._autoRunner.unmount()
    if (this._arenaView) this._arenaView.unmount()
  }

  mountSubViews() {
    const { ctx } = this.props
    const p = ctx?.state?.player || {}
    const currentAreaData = ctx?.state?.exploration ? ctx.state.exploration[p.currentArea || 'thanh_lam_tran'] : null
    const exploreCost = currentAreaData ? (currentAreaData.staminaCost || currentAreaData.stamina_cost || 10) : 10

    // 1. Auto Battle Runner
    const autoCont = this.container.querySelector('#autoBattleContainer')
    if (autoCont && !this._autoRunner) {
      this._autoRunner = new AutoBattleRunner({
        ctx,
        onStop: () => {
          const exploreEl = this.container.querySelector('#panelKhamPha')
          if (exploreEl) exploreEl.style.display = 'block'
        }
      })
      this._autoRunner.mount(autoCont)
    }

    // 2. Area Explore Panel
    const exploreCont = this.container.querySelector('#areaExploreContainer')
    if (exploreCont && !this._explorePanel) {
      this._explorePanel = new AreaExplorePanel({
        ctx,
        onExplore: () => this.handleExplore(),
        onAutoBattle: () => {
          const exploreEl = this.container.querySelector('#panelKhamPha')
          if (exploreEl) exploreEl.style.display = 'none'
          this._autoRunner.start(exploreCost)
        },
        onAttackTracked: (instanceId) => this.handleCombat(null, instanceId)
      })
      this._explorePanel.mount(exploreCont)
    }
  }

  async handleExplore() {
    const { ctx } = this.props
    if (!ctx) return
    const rEl = this.container.querySelector('#exploreResult')
    if (!rEl) return

    rEl.innerHTML = `<div class="panel" style="background:rgba(255,255,255,0.05); margin-bottom:12px; border-radius:8px"><div class="panel-body text-center text-gold" style="padding:16px">⏳ Đang tìm kiếm...</div></div>`

    try {
      const data = await ctx.api.explore(ctx.state.playerId)
      ctx.state.player = data.player
      if (ctx.updateSidebar) ctx.updateSidebar()

      const ev = data.event
      const cost = data.cost || 10
      const curStamina = data.player.currentStamina ?? 0
      const maxStamina = data.player.maxStamina ?? 100
      const hasEnoughStamina = curStamina >= cost

      let html = `
        <div class="panel" style="background: rgba(255,255,255,0.05); border:1px solid var(--blue, #3b82f6); border-radius:8px; margin-bottom:14px; overflow:hidden">
          <div class="panel-body text-center" style="padding:16px; text-align:center">
            <div style="margin-bottom: 10px;">
              <span class="badge" style="background: rgba(239,68,68,0.15); color: #f87171; border: 1px solid rgba(239,68,68,0.3); font-size: 11px; padding: 3px 8px; border-radius:4px">
                🏃 -${cost} Thể Lực (Hiện có: ${curStamina}/${maxStamina})
              </span>
            </div>
      `

      if (ev.type === 'monster') {
        html += `
          <div style="font-size: 32px; margin-bottom: 8px;">🐉</div>
          <div class="text-lg text-red bold mb-sm" style="font-size:16px; font-weight:700; color:var(--red, #f87171); margin-bottom:8px">${ev.message}</div>
          <div class="flex gap-2 justify-center mt-md w-full" style="display:flex; justify-content:center; gap:8px; margin-top:12px">
            <button class="btn btn--red flex-1" id="btnExploreCombat" data-mid="${ev.monsterId}" style="padding:8px 14px">🗡️ Giao Chiến</button>
            <button class="btn btn--blue flex-1" id="btnExploreTrack" data-mid="${ev.monsterId}" style="padding:8px 14px">👣 Theo Dõi</button>
            <button class="btn btn--gold flex-1" id="btnExploreAgain" ${!hasEnoughStamina ? 'disabled' : ''} style="padding:8px 14px">🔍 Dò Tiếp</button>
          </div>
        `
      } else if (ev.type === 'monster_ambush' && ev.combatResult) {
        const cr = ev.combatResult
        const oc = cr.outcome === 'win' ? '🏆 Chiến thắng!' : cr.outcome === 'loss' ? '💀 Bại trận!' : '⏰ Bất phân'
        const ocColor = cr.outcome === 'win' ? 'var(--green, #4ade80)' : cr.outcome === 'loss' ? 'var(--red, #f87171)' : 'var(--orange, #fb923c)'
        html += `
          <div style="font-size:36px; margin-bottom:8px">⚠️</div>
          <div class="text-lg bold" style="color:var(--red, #f87171); margin-bottom:8px; font-size:16px; font-weight:700">${ev.message}</div>
          <div style="font-size:16px; font-weight:700; color:${ocColor}; margin-bottom:12px">${oc}</div>
          <div class="combat-log" style="max-height:200px; overflow-y:auto; text-align:left; background:rgba(0,0,0,0.2); padding:10px; border-radius:6px">
            ${renderCombatLogLines(cr.log || [])}
          </div>
          <div class="flex gap-2 justify-center mt-md" style="display:flex; justify-content:center; gap:8px; margin-top:12px">
            <button class="btn btn--gold flex-1" id="btnExploreAgain" ${!hasEnoughStamina ? 'disabled' : ''} style="padding:8px 14px">🔍 Dò Thám Tiếp (-${cost} TL)</button>
            <button class="btn btn--blue" id="btnExploreContinue" style="padding:8px 14px">Tiếp tục</button>
          </div>
        `
      } else if (ev.type === 'worldBoss') {
        html += `
          <div style="font-size: 48px; margin-bottom: 8px;">🔥</div>
          <div class="text-lg text-red bold mb-sm" style="font-size:16px; font-weight:700; color:var(--red, #f87171); margin-bottom:8px">${ev.message}</div>
          <div class="text-sm text-dim mb-md" style="font-size:12px; color:var(--text-dim); margin-bottom:12px">Lãnh Chúa Bản Đồ — Sinh vật cực kỳ hung hãn!</div>
          <div class="flex gap-2 justify-center mt-md w-full" style="display:flex; justify-content:center; gap:8px; margin-top:12px">
            <button class="btn btn--red flex-1" id="btnExploreCombat" data-mid="${ev.monsterId}" style="padding:8px 14px">⚔️ Thách Đấu</button>
            <button class="btn btn--blue flex-1" id="btnExploreTrack" data-mid="${ev.monsterId}" style="padding:8px 14px">👣 Ghi Dấu</button>
            <button class="btn btn--gold flex-1" id="btnExploreAgain" ${!hasEnoughStamina ? 'disabled' : ''} style="padding:8px 14px">🔍 Dò Tiếp</button>
          </div>
        `
      } else {
        html += `
          <div style="font-size: 40px; margin-bottom: 8px;">💎</div>
          <div class="text-lg text-bright bold mb-sm" style="font-size:15px; font-weight:700; margin-bottom:8px">${ev.message || 'Thu hoạch kỳ ngộ'}</div>
          <div class="flex gap-2 justify-center mt-md" style="display:flex; justify-content:center; gap:8px; margin-top:12px">
            <button class="btn btn--gold flex-1" id="btnExploreAgain" ${!hasEnoughStamina ? 'disabled' : ''} style="padding:8px 14px">🔍 Dò Tiếp</button>
            <button class="btn btn--dark" id="btnExploreContinue" style="padding:8px 14px">Đóng</button>
          </div>
        `
      }

      html += `</div></div>`
      rEl.innerHTML = html

      // Bind explore events
      const btnCombat = rEl.querySelector('#btnExploreCombat')
      if (btnCombat) {
        btnCombat.addEventListener('click', (e) => {
          rEl.innerHTML = ''
          this.handleCombat(e.target.dataset.mid, null)
        })
      }

      const btnTrack = rEl.querySelector('#btnExploreTrack')
      if (btnTrack) {
        btnTrack.addEventListener('click', async (e) => {
          try {
            const res = await ctx.api.trackMonster(ctx.state.playerId, e.target.dataset.mid)
            if (res.success) {
              ctx.notify(res.message, 'success')
              rEl.innerHTML = ''
              if (this._explorePanel) this._explorePanel.loadTrackedMonsters()
            }
          } catch (err) {
            ctx.notify('Lỗi theo dõi: ' + err.message, 'error')
          }
        })
      }

      const btnAgain = rEl.querySelector('#btnExploreAgain')
      if (btnAgain) {
        btnAgain.addEventListener('click', () => this.handleExplore())
      }

      const btnCont = rEl.querySelector('#btnExploreContinue')
      if (btnCont) {
        btnCont.addEventListener('click', () => { rEl.innerHTML = '' })
      }
    } catch (err) {
      rEl.innerHTML = `<div class="panel" style="background:rgba(255,255,255,0.05); margin-bottom:12px; border-radius:8px"><div class="panel-body text-red text-center" style="padding:16px; color:var(--red)">Lỗi: ${err.message}</div></div>`
    }
  }

  async handleCombat(monsterId, instanceId = null) {
    const { ctx } = this.props
    if (!ctx) return
    const arenaCont = this.container.querySelector('#combatArenaContainer')
    if (!arenaCont) return

    const p = ctx.state?.player || {}
    if (!p.currentHp || p.currentHp <= 0) {
      return ctx.notify('Đã kiệt sức! Hãy tịnh dưỡng trước.', 'error')
    }
    if (p.hospitalRemaining > 0) {
      return ctx.notify(`Đang tịnh dưỡng! Còn ${p.hospitalRemaining}s`, 'error')
    }

    arenaCont.innerHTML = `
      <div class="panel border-gold bg-dark" style="animation:pulse 1.5s infinite; background:rgba(0,0,0,0.4); border:1px solid var(--gold, #facc15); border-radius:8px; margin-bottom:16px">
        <div class="panel-body text-center text-gold" style="padding:20px; text-align:center">
          <div style="font-size:36px; margin-bottom:8px">⚔️</div>
          <div style="font-weight:bold; font-size:16px; color:var(--gold, #facc15)">Vận chuyển linh lực, chuẩn bị khai chiến...</div>
        </div>
      </div>`
    arenaCont.scrollIntoView({ behavior: 'smooth' })

    try {
      const res = await ctx.api.request('/combat/full', {
        method: 'POST',
        body: JSON.stringify({
          playerId: ctx.state.playerId,
          monsterId: !instanceId ? monsterId : null,
          trackedMonsterId: instanceId,
        })
      })
      ctx.state.player = res.player
      if (ctx.updateSidebar) ctx.updateSidebar()

      if (this._arenaView) {
        this._arenaView.unmount()
      }

      this._arenaView = new CombatArenaView({
        combatData: res,
        player: res.player
      })
      this._arenaView.mount(arenaCont)

      if (this._explorePanel) {
        this._explorePanel.loadTrackedMonsters()
      }
    } catch (err) {
      arenaCont.innerHTML = `<div class="panel" style="background:rgba(255,255,255,0.05); margin-bottom:12px; border-radius:8px"><div class="panel-body text-red" style="padding:16px; color:var(--red)">Lỗi chiến đấu: ${err.message}</div></div>`
    }
  }
}
