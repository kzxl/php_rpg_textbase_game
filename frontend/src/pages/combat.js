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

    <!-- DẤU VẾT YÊU THÚ -->
    <div class="panel mt-md">
      <div class="panel-title">Bản Địa Yêu Thú <span class="subtitle">(Tối đa 5 con rình rập)</span></div>
      <div class="panel-body no-pad" id="trackedMonstersList" style="max-height: 400px; overflow-y: auto;">
        <div style="padding: 16px; text-align: center;" class="text-dim">Đang rà soát dấu vết...</div>
      </div>
    </div>
    
    <div id="combatResult"></div>`

  // Phase 5: Fetch active tracked monsters and render with Sương Mù
  const hasPerception = p.skills && p.skills.some(s => {
    const sid = typeof s === 'string' ? s : s.id;
    return sid === 'thien_nhan' || sid === 'nhan_thuat';
  });
  const renderStat = (val) => hasPerception ? val : '???';

  const loadTrackedMonsters = async () => {
    try {
      const res = await api.getAreaMonsters(p.id);
      if (res.monsters) {
        state.player.trackedMonsters = res.monsters; // cache locally
        const listEl = document.getElementById('trackedMonstersList');
        if (!listEl) return;
        
        if (res.monsters.length === 0) {
           listEl.innerHTML = `<div style="padding: 16px; text-align: center;" class="text-dim">Không có dấu vết yêu thú nào quanh đây.</div>`;
           return;
        }

        listEl.innerHTML = res.monsters.map(m => `
          <div class="list-item flex flex-col items-start gap-4">
            <div class="item-info" style="width: 100%;">
              <div class="flex justify-between items-center mb-sm">
                <div class="item-name text-lg">${m.name} <span class="text-xs text-dim">(${m.instance_id.substring(0,8)})</span></div>
                <button class="btn btn--red btn--sm btn-attack-tracked" data-inst="${m.instance_id}" data-mid="${m.id}">Giao Chiến</button>
              </div>
              <div class="item-desc text-sm text-dim mb-sm">${hasPerception ? (m.description || '') : 'Bản thể mờ ảo, không rõ căn cơ.'}</div>
              
              <!-- HP Bar -->
              <div class="w-full bg-darker rounded mb-sm" style="height: 6px; overflow: hidden;">
                <div class="bg-red h-full" style="width: ${(m.currentHp / m.stats.hp) * 100}%"></div>
              </div>

              <div class="item-meta flex gap-4 text-xs">
                <span class="text-red">❤ ${m.currentHp} / ${renderStat(m.stats.hp)}</span>
                <span class="text-orange">💪 ${renderStat(m.stats.strength)}</span>
                <span class="text-cyan">🏃 ${renderStat(m.stats.speed)}</span>
                <span class="text-green">🎯 ${renderStat(m.stats.dexterity)}</span>
                <span class="text-blue">🛡 ${renderStat(m.stats.defense)}</span>
              </div>
            </div>
          </div>
        `).join('')

        // Bind Attack Buttons
        const attackBtns = listEl.querySelectorAll('.btn-attack-tracked');
        attackBtns.forEach(btn => {
          btn.addEventListener('click', (e) => {
            const btnTarget = e.currentTarget;
            doCombat(ctx, btnTarget.dataset.mid, btnTarget.dataset.inst);
          });
        });
      }
    } catch (e) {
      console.error("Lỗi tải dấu vết:", e)
    }
  }

  loadTrackedMonsters();

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
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--red flex-1" id="btnExploreCombat" data-mid="${ev.monsterId}">🗡️ Giao Chiến</button>
          <button class="btn btn--blue flex-1" id="btnExploreTrack" data-mid="${ev.monsterId}">👣 Theo Dõi</button>
        </div>
      `
    } else if (ev.type === 'worldBoss') {
      html += `
        <div style="font-size: 48px; margin-bottom: 8px; animation: pulse 1s infinite;">🔥</div>
        <div class="text-lg text-red bold mb-sm" style="text-shadow: 0 0 10px rgba(255,0,0,0.5);">${ev.message}</div>
        <div class="text-sm text-dim mb-md">Lãnh Chúa Bản Đồ — Sinh vật cực kỳ mạnh!</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--red flex-1" id="btnExploreCombat" data-mid="${ev.monsterId}">⚔️ Thách Đấu</button>
          <button class="btn btn--blue flex-1" id="btnExploreTrack" data-mid="${ev.monsterId}">👣 Ghi Dấu</button>
        </div>
      `
    } else if (ev.type === 'npc' && ev.npcId) {
      // Phase 9: Real NPC encounter with quest system
      html += `
        <div style="font-size: 48px; margin-bottom: 8px;">${ev.npcIcon || '🧓'}</div>
        <div class="text-lg text-gold bold mb-sm">${ev.message}</div>
        <div class="text-sm text-dim mb-md" style="font-style:italic;">"${ev.greeting}"</div>
      `
      if (ev.hasQuests) {
        html += `<button class="btn btn--gold btn--sm mt-sm" id="btnNpcInteract" data-npc="${ev.npcId}">💬 Nói Chuyện</button>`
      }
      html += `<button class="btn btn--blue btn--sm mt-sm ml-sm" id="btnExploreContinue">Tiếp Tục</button>`
      html += `</div></div>`
      // NPC quest modal placeholder
      html += `<div id="npcQuestModal"></div>`
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
      // Show quest notifications if any
      if (ev.questNotifications && ev.questNotifications.length > 0) {
        ev.questNotifications.forEach(qn => {
          html += `<div class="text-sm text-gold mt-sm" style="animation: fadeIn 0.5s;">🏷️ ${qn.message}</div>`
        })
      }
    } else {
      html += `
        <div style="font-size: 32px; margin-bottom: 8px;">💨</div>
        <div class="text-md text-dim mb-sm">${ev.message}</div>
      `
    }

    if (ev.type !== 'monster' && ev.type !== 'worldBoss' && !(ev.type === 'npc' && ev.npcId)) {
      html += `<button class="btn btn--blue mt-sm" id="btnExploreContinue">Tiếp tục tìm kiếm</button>`
    }

    if (!(ev.type === 'npc' && ev.npcId)) {
      html += `</div></div>`
    }
    rEl.innerHTML = html

    if (ev.type === 'monster' || ev.type === 'worldBoss') {
      document.getElementById('btnExploreCombat').addEventListener('click', (e) => {
        rEl.innerHTML = ''
        doCombat(ctx, e.target.dataset.mid, null)
      })
      document.getElementById('btnExploreTrack').addEventListener('click', async (e) => {
        try {
          const res = await api.trackMonster(state.playerId, e.target.dataset.mid);
          if (res.success) {
            notify(res.message, 'success');
            rEl.innerHTML = '';
            if (typeof ctx.renderGame === 'function') ctx.renderGame();
          } else if (res.error) {
            notify(res.error, 'error');
          }
        } catch (err) {
          notify('Lỗi theo dõi: ' + err.message, 'error');
        }
      })
    }

    // NPC interact button
    if (ev.type === 'npc' && ev.npcId) {
      document.getElementById('btnNpcInteract')?.addEventListener('click', async () => {
        await showNpcQuests(ctx, ev.npcId, rEl)
      })
    }
    
    document.getElementById('btnExploreContinue')?.addEventListener('click', () => {
      rEl.innerHTML = ''
    })
  } catch (e) {
    rEl.innerHTML = `<div class="panel"><div class="panel-body text-red text-center">Lỗi: ${e.message}</div></div>`
  }
}

/** Show NPC quest list modal */
async function showNpcQuests(ctx, npcId, parentEl) {
  const { state, api, notify, renderGame } = ctx
  const modalEl = document.getElementById('npcQuestModal') || parentEl

  try {
    const data = await api.getNpc(npcId)
    const npc = data.npc
    if (!npc) return

    const playerQuests = (state.player.activeQuests || []).map(q => q.quest_id)

    let questsHtml = npc.quests.map(q => {
      const alreadyAccepted = playerQuests.includes(q.id)
      return `
        <div class="quest-offer" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:12px;margin-bottom:8px;">
          <div class="flex justify-between items-center mb-sm">
            <span class="text-gold bold">${q.name}</span>
            <span class="text-xs badge" style="background:${q.type==='kill'?'var(--red)':'var(--green)'}">${q.type==='kill'?'⚔️ Tiêu Diệt':'📦 Thu Thập'}</span>
          </div>
          <div class="text-sm text-dim mb-sm">${q.description}</div>
          <div class="text-xs text-dim mb-sm">Phần thưởng: ${q.rewards.gold ? q.rewards.gold + '💎 ' : ''}${q.rewards.xp ? q.rewards.xp + '✨ ' : ''}${q.rewards.skillChance ? '🎯 ' + q.rewards.skillChance.chance + '% kỹ năng' : ''}</div>
          ${alreadyAccepted 
            ? '<span class="text-xs text-dim">✅ Đã nhận</span>' 
            : `<button class="btn btn--gold btn--sm btn-accept-quest" data-npc="${npcId}" data-qid="${q.id}">📜 Nhận Nhiệm Vụ</button>`
          }
        </div>
      `
    }).join('')

    modalEl.innerHTML = `
      <div class="panel mt-md" style="border-color:var(--gold);">
        <div class="panel-title">${npc.icon || '🧓'} ${npc.name} <span class="subtitle">${npc.profession}</span></div>
        <div class="panel-body">
          ${questsHtml || '<div class="text-dim">Không có nhiệm vụ nào.</div>'}
        </div>
      </div>
    `

    modalEl.querySelectorAll('.btn-accept-quest').forEach(btn => {
      btn.addEventListener('click', async () => {
        btn.disabled = true
        btn.textContent = '⏳...'
        try {
          const res = await api.acceptQuest(state.playerId, btn.dataset.npc, btn.dataset.qid)
          state.player = res.player
          notify(res.message, 'success')
          renderGame()
        } catch (err) {
          notify(err.message || 'Lỗi nhận quest', 'error')
          btn.disabled = false
          btn.textContent = '📜 Nhận Nhiệm Vụ'
        }
      })
    })
  } catch (e) {
    console.error('NPC load error:', e)
  }
}

async function doCombat(ctx, monsterId, instanceId = null) {
  const { state, api, notify, updateSidebar, renderGame } = ctx
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

  rEl.innerHTML = `<div class="panel border-red bg-dark"><div class="panel-body text-center text-red">⚔️ Đang giao chiến...</div></div>`
  rEl.scrollIntoView({ behavior: 'smooth' })

  try {
    const r = await api.request('/combat/full', {
      method: 'POST',
      body: JSON.stringify({ 
        playerId: state.playerId, 
        monsterId: !instanceId ? monsterId : null,
        trackedMonsterId: instanceId 
      })
    })
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
      if (l.includes('🔥')) return `<div class="heavy text-orange">${l}</div>`
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
      if (l.includes('🧪')) return `<div class="status-effect text-purple">${l}</div>`
      if (l.includes('💔')) return `<div class="dot-damage text-purple bold">${l}</div>`
      if (l.includes('✨')) return `<div class="regen text-green">${l}</div>`
      if (l.includes('♻️')) return `<div class="reflect text-red">${l}</div>`
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
    if (instanceId && typeof renderGame === 'function') {
      setTimeout(() => renderGame(), 1500)
    }
  } catch (e) {
    rEl.innerHTML = `<div class="panel"><div class="panel-body text-red">Lỗi: ${e.message}</div></div>`
  }
}
