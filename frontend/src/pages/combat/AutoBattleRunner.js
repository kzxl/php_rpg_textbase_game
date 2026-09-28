import { Component } from '../../core/Component.js'

/**
 * AutoBattleRunner Component: Coordinates automated monster scanning, stamina safety checks, and loot accumulation.
 */
export class AutoBattleRunner extends Component {
  initialState() {
    return {
      isRunning: false,
      victoryCount: 0,
      totalXp: 0,
      totalGold: 0,
      statusMessage: 'Đang rà soát dấu vết yêu thú xung quanh...',
      statusIcon: '🔍',
      statusClass: 'text-gold',
    }
  }

  template() {
    const { isRunning, victoryCount, totalXp, totalGold, statusMessage, statusIcon, statusClass } = this.state
    if (!isRunning) return ''

    return `
      <div class="auto-battle-runner panel mt-md" style="border:1px solid var(--gold, #facc15); border-radius:8px; margin-bottom:14px; background:var(--bg-surface, #151922); overflow:hidden">
        <div class="panel-title flex justify-between items-center" style="display:flex; justify-content:space-between; align-items:center; padding:10px 14px; border-bottom:1px solid rgba(255,255,255,0.05)">
          <span style="font-weight:600; color:var(--gold, #facc15)">⚡ Tự Động Rà Soát & Quét Quái (Auto-Combat)</span>
          <button class="btn btn--red btn--sm" id="btnStopAuto" style="font-size:11px; padding:3px 8px">Dừng Quét</button>
        </div>
        <div class="panel-body text-center" style="font-size:13px; color:var(--text-bright, #fff); padding:16px; background: rgba(0,0,0,0.3); text-align:center">
          <div style="font-size:28px; margin-bottom:8px">${statusIcon}</div>
          <div class="${statusClass}" style="font-weight:700">${statusMessage}</div>
          <div class="text-dim text-xs mt-xs" style="font-size:11px; color:var(--text-dim); margin-top:6px">
            Đã thắng: ${victoryCount} trận | +${totalXp} XP | +${totalGold} Linh Thạch
          </div>
        </div>
      </div>
    `
  }

  start(exploreCost = 10) {
    this.setState({
      isRunning: true,
      victoryCount: 0,
      totalXp: 0,
      totalGold: 0,
      statusMessage: 'Đang dò thám linh khí & truy tìm yêu thú...',
      statusIcon: '🧭',
      statusClass: 'text-gold',
    })
    this.runLoop(exploreCost)
  }

  stop() {
    this.setState({ isRunning: false })
    if (this.props.onStop) this.props.onStop()
  }

  async runLoop(exploreCost) {
    const { ctx } = this.props
    if (!ctx) return

    while (this.state.isRunning) {
      const p = ctx.state?.player || {}
      if ((p.currentStamina || 0) < exploreCost) {
        this.setState({
          statusMessage: '❌ Hết thể lực! Tự động dừng rà soát.',
          statusIcon: '⚠️',
          statusClass: 'text-red',
          isRunning: false,
        })
        break
      }
      if ((p.currentHp / (p.maxHp || 1)) < 0.2) {
        this.setState({
          statusMessage: '❌ Khí huyết quá thấp (<20%)! Tự động dừng để bảo toàn tính mạng.',
          statusIcon: '🩸',
          statusClass: 'text-red',
          isRunning: false,
        })
        break
      }

      try {
        const dUrl = await ctx.api.explore(ctx.state.playerId)
        ctx.state.player = dUrl.player
        if (ctx.updateSidebar) ctx.updateSidebar()

        if (dUrl.event && (dUrl.event.type === 'monster' || dUrl.event.type === 'worldBoss')) {
          this.setState({
            statusMessage: `Phát hiện ${dUrl.event.message}! Bắt đầu quyết chiến...`,
            statusIcon: '⚔️',
            statusClass: 'text-red',
          })
          await new Promise(r => setTimeout(r, 600))
          if (!this.state.isRunning) break

          const cr = await ctx.api.request('/combat/full', {
            method: 'POST',
            body: JSON.stringify({ playerId: ctx.state.playerId, monsterId: dUrl.event.monsterId })
          })
          ctx.state.player = cr.player
          if (ctx.updateSidebar) ctx.updateSidebar()

          const isWin = cr.outcome === 'win'
          if (isWin) {
            if (cr.pendingLoot) {
              const nextWins = this.state.victoryCount + 1
              const nextXp = this.state.totalXp + (cr.rewards?.xp || 0)
              const nextGold = this.state.totalGold + (cr.rewards?.gold || 0)
              this.setState({
                victoryCount: nextWins,
                totalXp: nextXp,
                totalGold: nextGold,
                statusMessage: `⚠️ Càn Khôn Túi đã đầy! Tự động dừng rà soát để người chơi xử lý chiến lợi phẩm [${cr.pendingLoot.name || 'Pháp bảo'}].`,
                statusIcon: '⚠️',
                statusClass: 'text-orange',
                isRunning: false,
              })
              break
            }

            const nextWins = this.state.victoryCount + 1
            const nextXp = this.state.totalXp + (cr.rewards?.xp || 0)
            const nextGold = this.state.totalGold + (cr.rewards?.gold || 0)
            this.setState({
              victoryCount: nextWins,
              totalXp: nextXp,
              totalGold: nextGold,
              statusMessage: `Chiến thắng ${cr.monster?.name}! (+${cr.rewards?.xp || 0} XP, +${cr.rewards?.gold || 0} 💎)`,
              statusIcon: '🏆',
              statusClass: 'text-green',
            })
          } else {
            this.setState({
              statusMessage: `${cr.outcome === 'flee' ? 'Đã bỏ chạy thành công' : 'Thất bại trọng thương'}! Vòng lặp dừng.`,
              statusIcon: '💀',
              statusClass: 'text-red',
              isRunning: false,
            })
            break
          }
        } else if (dUrl.event && dUrl.event.type === 'monster_ambush' && dUrl.event.combatResult) {
          const cr = dUrl.event.combatResult
          if (cr.outcome === 'win') {
            if (cr.pendingLoot) {
              this.setState({
                victoryCount: this.state.victoryCount + 1,
                totalXp: this.state.totalXp + (cr.rewards?.xp || 0),
                totalGold: this.state.totalGold + (cr.rewards?.gold || 0),
                statusMessage: '⚠️ Càn Khôn Túi đã đầy! Tự động dừng rà soát để xử lý chiến lợi phẩm rơi.',
                statusIcon: '⚠️',
                statusClass: 'text-orange',
                isRunning: false,
              })
              break
            }

            this.setState({
              victoryCount: this.state.victoryCount + 1,
              totalXp: this.state.totalXp + (cr.rewards?.xp || 0),
              totalGold: this.state.totalGold + (cr.rewards?.gold || 0),
              statusMessage: `Đẩy lui cuộc phục kích của ${cr.monster?.name}! (+${cr.rewards?.xp || 0} XP)`,
              statusIcon: '⚠️',
              statusClass: 'text-orange',
            })
          } else {
            this.setState({
              statusMessage: '💀 Bị đánh úp trọng thương! Vòng lặp dừng.',
              statusIcon: '💀',
              statusClass: 'text-red',
              isRunning: false,
            })
            break
          }
        } else {
          this.setState({
            statusMessage: `${dUrl.event?.message || 'Không có biến cố'}. Tiếp tục...`,
            statusIcon: '🧭',
            statusClass: 'text-blue',
          })
        }
      } catch (err) {
        this.setState({
          statusMessage: `Lỗi: ${err.message}. Dừng tự động.`,
          statusIcon: '❌',
          statusClass: 'text-red',
          isRunning: false,
        })
        break
      }

      await new Promise(r => setTimeout(r, 1200))
    }
  }

  bindEvents() {
    this.on('click', '#btnStopAuto', () => {
      this.stop()
    })
  }
}
