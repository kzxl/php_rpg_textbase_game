/**
 * Khám Phá Area & Combat Page
 */
export function pageCombat(el, ctx) {
  const { state, api, notify, renderGame, updateSidebar } = ctx
  const p = state.player

  const currentAreaData = state.exploration ? state.exploration[p.currentArea || 'thanh_lam_tran'] : null
  const areaName = currentAreaData ? currentAreaData.name : 'Vùng Đất Vô Danh'
  const exploreCost = currentAreaData ? currentAreaData.staminaCost : 10

  el.innerHTML = `
    <div class="page-header">
      <h1>🗺️ Khu Vực: ${areaName}</h1>
      <div class="text-dim text-sm">Nơi cất giấu nhiều cơ duyên và hiểm nguy.</div>
    </div>

    <!-- KHÁM PHÁ -->
    <div class="panel" style="border-color: rgba(208, 165, 48, 0.4); box-shadow: 0 4px 15px rgba(208, 165, 48, 0.1);">
      <div class="panel-body text-center" style="padding: 24px 16px;">
        <h2 class="text-lg text-gold mb-sm">Dò Thám Xung Quanh</h2>
        <p class="text-dim mb-md">Tiêu hao thể lực để tìm kiếm tài nguyên, kỳ ngộ hoặc yêu thú.</p>
        <button class="btn btn--gold btn--lg" id="btnExplore" style="width: 100%; max-width: 300px; margin: 0 auto; display: flex; justify-content: center; align-items: center; gap: 8px;">
          <span>🔍 Tìm Kiếm</span>
          <span class="badge" style="background: rgba(0,0,0,0.3); color: #fff;">-${exploreCost} Thể Lực</span>
        </button>
      </div>
    </div>

    <div id="exploreResult"></div>

    <!-- ĐÁNH THEO ĐỊA ĐIỂM CŨ -->
    <div class="panel mt-md">
      <div class="panel-title">Bản Địa Yêu Thú <span class="subtitle">(Đánh Chủ Động)</span></div>
      <div class="panel-body no-pad">
        ${state.monsters.map(m => `
          <div class="list-item clickable" data-mid="${m.id}">
            <div class="item-info">
              <div class="item-name">${m.name}</div>
              <div class="item-desc">${m.description || ''}</div>
              <div class="item-meta">
                <span>❤${m.stats.hp}</span>
                <span>💪${m.stats.strength}</span>
                <span>🏃${m.stats.speed}</span>
                <span>🎯${m.stats.dexterity}</span>
                <span>🛡${m.stats.defense}</span>
              </div>
            </div>
            <button class="btn btn--red btn--sm">Chiến</button>
          </div>
        `).join('')}
      </div>
    </div>
    
    <div id="combatResult"></div>`

  // Attach Explore Event
  const btnExplore = document.getElementById('btnExplore')
  if (btnExplore) {
    btnExplore.addEventListener('click', () => doExplore(ctx))
  }

  // Attach Combat Events
  el.querySelectorAll('.list-item.clickable').forEach(item => {
    item.addEventListener('click', () => startCombat(item.dataset.mid, ctx))
  })
}

async function doExplore(ctx) {
  const { state, api, notify, updateSidebar } = ctx
  const rEl = document.getElementById('exploreResult')
  if (!rEl) return

  rEl.innerHTML = `<div class="panel"><div class="panel-body text-center text-gold">⏳ Đang tìm kiếm...</div></div>`

  try {
    const data = await api.explore(state.playerId)
    state.player = data.player
    updateSidebar()

    const ev = data.event
    let html = `
      <div class="panel" style="background: rgba(255,255,255,0.05); border-color: var(--blue);">
        <div class="panel-body text-center">
    `

    if (ev.type === 'monster') {
      html += `
        <div style="font-size: 32px; margin-bottom: 8px;">🐉</div>
        <div class="text-lg text-red bold mb-sm">${ev.message}</div>
      `
      // Pick random monster (simplified logic for now)
      const available = state.monsters || []
      const m = available[Math.floor(Math.random() * available.length)]
      html += `<button class="btn btn--red btn--lg mt-sm w-full" id="btnExploreCombat" data-mid="${m.id}">🗡️ Nghênh Chiến: ${m.name}</button>`
    } else if (ev.type === 'npc') {
      html += `
        <div style="font-size: 32px; margin-bottom: 8px;">👴</div>
        <div class="text-lg text-gold bold mb-sm">${ev.message}</div>
      `
    } else if (ev.type === 'material' || ev.type === 'item') {
      html += `
        <div style="font-size: 32px; margin-bottom: 8px;">📦</div>
        <div class="text-lg text-green bold mb-sm">${ev.message}</div>
      `
    } else {
      html += `
        <div style="font-size: 32px; margin-bottom: 8px;">💨</div>
        <div class="text-md text-dim mb-sm">${ev.message}</div>
      `
    }

    if (ev.type !== 'monster') {
      html += `<button class="btn btn--blue mt-sm" id="btnExploreContinue">Tiếp tục tìm kiếm</button>`
    }

    html += `</div></div>`
    rEl.innerHTML = html

    if (ev.type === 'monster') {
      document.getElementById('btnExploreCombat').addEventListener('click', (e) => {
        // Clear explore msg and start combat
        rEl.innerHTML = ''
        startCombat(e.target.dataset.mid, ctx)
      })
    } else {
      document.getElementById('btnExploreContinue').addEventListener('click', () => {
        rEl.innerHTML = ''
      })
    }
  } catch (e) {
    rEl.innerHTML = `<div class="panel"><div class="panel-body text-red text-center">Lỗi: ${e.message}</div></div>`
  }
}

async function startCombat(monsterId, ctx) {
  const { state, api, notify, updateSidebar } = ctx
  const rEl = document.getElementById('combatResult')
  if (!rEl) return

  if (!state.player.currentHp || state.player.currentHp <= 0) {
    return notify('Đã kiệt sức! Hãy hồi phục trước.', 'error')
  }
  if ((state.player.currentEnergy || 0) < 10 && !state.player.currentEnergy) { // Fallback bypass if missing logic
    return notify('Không đủ Linh lực!', 'error')
  }
  if (state.player.hospitalRemaining > 0) {
    return notify(`Đang tịnh dưỡng! Còn ${state.player.hospitalRemaining}s`, 'error')
  }

  rEl.innerHTML = `<div class="panel"><div class="panel-body" style="text-align:center;color:var(--gold)">⏳ Đang chiến đấu...</div></div>`
  rEl.scrollIntoView({ behavior: 'smooth' })

  try {
    const r = await api.fullCombat(state.playerId, monsterId)
    state.player = r.player

    if (r.outcome === 'no_energy') {
      rEl.innerHTML = `<div class="panel"><div class="panel-body" style="text-align:center;color:var(--red)">${r.log[0]}</div></div>`
      updateSidebar()
      return
    }

    const logHtml = r.log.map(l => {
      if (l.startsWith('---')) return `<div class="turn">${l}</div>`
      if (l.includes('linh lực') && l.includes('+')) return `<div class="energy">${l}</div>`
      if (l.includes('linh lực')) return `<div class="energy-cost">${l}</div>`
      if (l.includes('kiệt linh')) return `<div class="miss">${l}</div>`
      if (l.includes('hụt')) return `<div class="miss">${l}</div>`
      if (l.includes('né được')) return `<div class="dodge">${l}</div>`
      if (l.includes('CHÍNH MẠNG') || l.includes('💥')) return `<div class="crit">${l}</div>`
      if (l.includes('🔥')) return `<div class="heavy">${l}</div>`
      if (l.includes('chặn hoàn toàn') || l.includes('🛡')) return `<div class="dodge">${l}</div>`
      if (l.includes('ngã xuống') || l.includes('💀')) return `<div class="death">${l}</div>`
      if (l.includes('Chiến thắng') || l.includes('🏆')) return `<div class="victory">${l}</div>`
      if (l.includes('Đột phá') || l.includes('🎉')) return `<div class="levelup">${l}</div>`
      if (l.includes('bỏ chạy') || l.includes('🏃')) return `<div class="flee">${l}</div>`
      if (l.includes('Hết') || l.includes('⏰')) return `<div class="stalemate">${l}</div>`
      if (l.includes('Bất phân') || l.includes('🤝')) return `<div class="stalemate">${l}</div>`
      if (l.includes('Thoát thân') || l.includes('🚪')) return `<div class="flee">${l}</div>`
      if (l.includes('Linh Thạch') || l.includes('💰')) return `<div class="gold-reward">${l}</div>`
      if (l.includes('Tịnh dưỡng') || l.includes('🏥')) return `<div class="hospital">${l}</div>`
      return `<div class="hit">${l}</div>`
    }).join('')

    const m = r.monster
    const pHp = Math.max(0, (state.player.currentHp / state.player.maxHp) * 100)
    const mHp = Math.max(0, (m.currentHp / m.maxHp) * 100)

    const outcomeMap = {
      'win': { icon: '🏆', text: 'Chiến thắng', cls: 'win' },
      'loss': { icon: '💀', text: 'Thất bại', cls: 'lose' },
      'stalemate': { icon: '⏰', text: 'Bất phân thắng bại', cls: 'draw' },
      'flee': { icon: '🏃', text: 'Thoát thân', cls: 'flee' },
    }
    const oc = outcomeMap[r.outcome] || outcomeMap['loss']
    const goldText = r.rewards?.gold ? ` · +${r.rewards.gold} 💰` : ''
    const rewardText = r.rewards ? ` · +${r.rewards.xp} XP${goldText}` : ''

    rEl.innerHTML = `
      <div class="panel">
        <div class="panel-title">${oc.icon} ${oc.text}
          <span class="subtitle">${r.turns}/${r.maxTurns || 25} lượt${rewardText}</span>
        </div>
        <div class="panel-body combat-result ${oc.cls}">
          <div class="combat-opponents">
            <div class="fighter">
              <div class="f-name player-name">${state.player.name}</div>
              <div class="mini-hp-bar"><div class="fill hp" style="width:${pHp}%"></div></div>
              <div class="mini-hp-val">${state.player.currentHp}/${state.player.maxHp}</div>
            </div>
            <div class="vs">VS</div>
            <div class="fighter">
              <div class="f-name monster-name">${m.name}</div>
              <div class="mini-hp-bar"><div class="fill hp" style="width:${mHp}%"></div></div>
              <div class="mini-hp-val">${m.currentHp}/${m.maxHp}</div>
            </div>
          </div>
        </div>
        <div class="combat-log">${logHtml}</div>
      </div>`

    updateSidebar()
  } catch (e) {
    rEl.innerHTML = `<div class="panel"><div class="panel-body text-red">Lỗi: ${e.message}</div></div>`
  }
}
