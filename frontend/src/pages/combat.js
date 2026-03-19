/**
 * Combat Page — Fight monsters
 */
export function pageCombat(el, ctx) {
  const { state, api, notify, renderGame, updateSidebar } = ctx

  el.innerHTML = `
    <div class="page-header">
      <h1>⚔ Tìm quái vật</h1>
    </div>
    <div class="panel">
      <div class="panel-title">Chọn đối thủ</div>
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

  el.querySelectorAll('.list-item.clickable').forEach(item => {
    item.addEventListener('click', () => startCombat(item.dataset.mid, ctx))
  })
}

async function startCombat(monsterId, ctx) {
  const { state, api, notify, updateSidebar } = ctx
  const rEl = document.getElementById('combatResult')
  if (!rEl) return
  if (!state.player.currentHp || state.player.currentHp <= 0) {
    return notify('Đã kiệt sức! Hãy hồi phục trước.', 'error')
  }
  if ((state.player.currentEnergy || 0) < 10) {
    return notify('Không đủ Linh lực để chiến đấu!', 'error')
  }
  if (state.player.hospitalRemaining > 0) {
    return notify(`Đang tịnh dưỡng! Còn ${state.player.hospitalRemaining}s`, 'error')
  }

  rEl.innerHTML = `<div class="panel"><div class="panel-body" style="text-align:center;color:var(--gold)">⏳ Đang chiến đấu...</div></div>`

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
