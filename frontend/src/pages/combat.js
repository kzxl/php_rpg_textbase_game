/**
 * Khám Phá Area & Combat Page — 2D Turn-Based Visual Combat (Zero Three.js)
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

    <!-- AUTO BATTLE 2D ARENA -->
    <div class="panel mt-md toggle-auto-combat" style="display:none; border-color:var(--gold);">
      <div class="panel-title flex justify-between items-center">
         <span>⚡ Tự Động Rà Soát & Quét Quái (Auto-Combat)</span>
         <button class="btn btn--red btn--sm" id="btnStopAuto">Dừng Quét</button>
      </div>
      <div class="panel-body text-center" id="autoCombatStatus" style="font-size:13px; color:var(--text-bright); padding:16px; background: rgba(0,0,0,0.3);">
        <div style="font-size:28px;margin-bottom:8px">🔍</div>
        <div>Đang rà soát dấu vết yêu thú xung quanh...</div>
      </div>
    </div>

    <!-- KHÁM PHÁ -->
    <div class="panel" id="panelKhamPha" style="border-color: rgba(208, 165, 48, 0.4); box-shadow: 0 4px 15px rgba(208, 165, 48, 0.1);">
      <div class="panel-body text-center" style="padding: 24px 16px;">
        <h2 class="text-lg text-gold mb-sm">Dò Thám Xung Quanh</h2>
        <p class="text-dim mb-md">Tiêu hao thể lực để tìm kiếm tài nguyên, kỳ ngộ hoặc yêu thú.</p>
        <div class="flex justify-center gap-2 flex-wrap">
          <button class="btn btn--gold btn--lg" id="btnExplore" style="min-width: 150px; display: flex; justify-content: center; align-items: center; gap: 8px;">
            <span>🔍 Tìm Kiếm</span>
            <span class="badge" style="background: rgba(0,0,0,0.3); color: #fff;">-${exploreCost} Thể Lực</span>
          </button>
          <button class="btn btn--red btn--lg" id="btnAutoBattle" style="min-width: 150px; display: flex; justify-content: center; align-items: center; gap: 8px;">
            <span>⚡ Tự Động Quét Quái</span>
          </button>
        </div>
      </div>
    </div>

    <!-- DẤU VẾT YÊU THÚ (tấn công) -->
    <div class="panel mt-md">
      <div class="panel-title">⚔️ Yêu Thú Đang Rình Rập <span class="subtitle">(Tối đa 5 con)</span></div>
      <div class="panel-body no-pad" id="trackedMonstersList" style="max-height: 400px; overflow-y: auto;">
        <div style="padding: 16px; text-align: center;" class="text-dim">Đang rà soát dấu vết...</div>
      </div>
    </div>

    <div id="combatResult"></div>
    <div id="exploreResult"></div>

    <!-- QUẦN THỂ YÊU THÚ -->
    <div class="panel mt-md">
      <div class="panel-title">📋 Quần Thể Yêu Thú <span class="subtitle">(Có thể xuất hiện tại đây)</span></div>
      <div class="panel-body no-pad" id="areaMonstersList" style="max-height: 250px; overflow-y: auto;">
      </div>
    </div>`

  // Progressive Info Disclosure: monster insight from Thiên Cơ
  const mi = p.insightLevels?.monster ?? 0

  const loadTrackedMonsters = async () => {
    try {
      const res = await api.getAreaMonsters(p.id)
      if (res.monsters) {
        state.player.trackedMonsters = res.monsters
        const listEl = document.getElementById('trackedMonstersList')
        if (!listEl) return
        
        if (res.monsters.length === 0) {
           listEl.innerHTML = `<div style="padding: 16px; text-align: center;" class="text-dim">Không có dấu vết yêu thú nào quanh đây.</div>`
           return
        }

        listEl.innerHTML = res.monsters.map(m => {
          const hpPct = (m.currentHp / m.stats.hp) * 100
          const hpColor = hpPct > 60 ? 'var(--green)' : hpPct > 30 ? 'var(--orange)' : 'var(--red)'

          let descHtml = '<div class="item-desc text-sm text-dim mb-sm">Bản thể mờ ảo, không rõ căn cơ.</div>'
          if (mi >= 1) descHtml = `<div class="item-desc text-sm text-dim mb-sm">${m.description || 'Yêu thú vùng này.'}</div>`

          let hpBarHtml = ''
          if (mi >= 1) {
            hpBarHtml = `<div class="w-full bg-darker rounded mb-sm" style="height: 6px; overflow: hidden;">
              <div style="width: ${hpPct}%; background: ${hpColor}; height: 100%;"></div>
            </div>`
          }

          let hpText = mi >= 2 ? `❤ ${m.currentHp}/${m.stats.hp}` : (mi >= 1 ? `❤ ???` : '')

          return `
            <div class="monster-card ${m.is_boss ? 'boss' : ''}" style="display: flex; gap: 16px; padding: 12px 16px; border-bottom: 1px solid var(--border); align-items: center;">
              <div class="monster-icon" style="font-size: 32px; width: 48px; text-align: center;">${m.icon || '👾'}</div>
              <div class="monster-info" style="flex: 1;">
                <div class="monster-header flex justify-between items-center mb-xs">
                  <div class="flex items-center gap-2">
                    <span class="monster-name bold" style="color: ${m.is_boss ? 'var(--red)' : 'var(--text-bright)'}; font-size: 15px;">${m.name}</span>
                    <span class="badge ${m.is_boss ? 'bg-red' : 'bg-darker'}">Cấp ${m.level}</span>
                  </div>
                  <div class="text-sm bold" style="color: ${hpColor};">${hpText}</div>
                </div>
                ${hpBarHtml}
                ${descHtml}
                <div class="flex gap-2 justify-end">
                   <button class="btn btn--red btn--sm btnTrackedCombat" data-instance-id="${m.instance_id}" data-monster-id="${m.monster_id}">🗡️ Quyết Đấu</button>
                </div>
              </div>
            </div>
          `
        }).join('')

        listEl.querySelectorAll('.btnTrackedCombat').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const mId = e.currentTarget.dataset.monsterId
            const instId = e.currentTarget.dataset.instanceId
            doCombat(ctx, mId, instId)
          })
        })
      }
    } catch(e) {
      console.error(e)
    }
  }

  const loadAreaMonsters = async () => {
    try {
      const res = await api.getAreaMonsterTemplates(p.currentArea || 'thanh_lam_tran')
      if (res.monsters) {
        const areaListEl = document.getElementById('areaMonstersList')
        if (!areaListEl) return
        if (res.monsters.length === 0) {
          areaListEl.innerHTML = `<div style="padding: 16px; text-align: center;" class="text-dim">Khu vực này hiện chưa có ghi chép yêu thú.</div>`
          return
        }

        areaListEl.innerHTML = res.monsters.map(m => {
          return `
            <div style="display: flex; gap: 12px; padding: 8px 16px; border-bottom: 1px solid var(--border); align-items: center;">
              <div style="font-size: 24px; width: 36px; text-align: center;">${m.icon || '👾'}</div>
              <div style="flex: 1;">
                <div class="flex items-center gap-2">
                  <span class="bold" style="color: ${m.isBoss ? 'var(--red)' : 'var(--text-bright)'}; font-size: 13px;">${m.name}</span>
                  <span class="badge ${m.isBoss ? 'bg-red' : 'bg-darker'} text-xs">Cấp ${m.level}</span>
                </div>
                <div class="text-xs text-dim">${m.description || 'Yêu thú sinh sống tại khu vực này.'}</div>
              </div>
            </div>
          `
        }).join('')
      }
    } catch (e) {
      console.error(e)
    }
  }

  loadTrackedMonsters()
  loadAreaMonsters()

  // BIND EXPLORE
  document.getElementById('btnExplore')?.addEventListener('click', () => doExplore(ctx))

  // 2D AUTO BATTLE LOOP
  let isAutoBattling = false;
  const btnAuto = document.getElementById('btnAutoBattle');
  const btnStop = document.getElementById('btnStopAuto');
  const panelKhamPha = document.getElementById('panelKhamPha');
  const panelAuto = document.querySelector('.toggle-auto-combat');
  const statusEl = document.getElementById('autoCombatStatus');

  if (btnAuto) {
    btnAuto.addEventListener('click', () => {
      isAutoBattling = true;
      panelKhamPha.style.display = 'none';
      panelAuto.style.display = 'block';
      startAutoBattleLoop();
    });
  }

  if (btnStop) {
    btnStop.addEventListener('click', () => {
      isAutoBattling = false;
      panelKhamPha.style.display = 'block';
      panelAuto.style.display = 'none';
    });
  }

  async function startAutoBattleLoop() {
     let victoryCount = 0;
     let totalXp = 0;
     let totalGold = 0;

     while(isAutoBattling) {
        statusEl.innerHTML = `
          <div style="font-size:24px;margin-bottom:6px;animation:spin 2s linear infinite">🧭</div>
          <div class="text-gold bold">Đang dò thám linh khí & truy tìm yêu thú...</div>
          <div class="text-dim text-xs mt-xs">Đã thắng: ${victoryCount} trận | +${totalXp} XP | +${totalGold} Linh Thạch</div>
        `;
        const playerState = state.player;
        
        if ((playerState.currentStamina || 0) < exploreCost) {
            statusEl.innerHTML = "<div class='text-red bold'>❌ Hết thể lực! Tự động dừng rà soát.</div>";
            isAutoBattling = false;
            break;
        }
        if (playerState.currentHp / playerState.maxHp < 0.2) {
            statusEl.innerHTML = "<div class='text-red bold'>❌ Khí huyết quá thấp (<20%)! Tự động dừng để bảo toàn tính mạng.</div>";
            isAutoBattling = false;
            break;
        }

        try {
           const dUrl = await api.explore(state.playerId);
           state.player = dUrl.player; 
           updateSidebar();

           if (dUrl.event && (dUrl.event.type === 'monster' || dUrl.event.type === 'worldBoss')) {
               statusEl.innerHTML = `
                 <div style="font-size:28px;margin-bottom:6px">⚔️</div>
                 <div class="text-red bold">Phát hiện ${dUrl.event.message}! Bắt đầu quyết chiến...</div>
               `;
               await new Promise(r => setTimeout(r, 600));
               
               if (!isAutoBattling) break;

               const cr = await api.request('/combat/full', { 
                  method: 'POST', 
                  body: JSON.stringify({ playerId: state.playerId, monsterId: dUrl.event.monsterId }) 
               });
               state.player = cr.player; 
               updateSidebar();
               
               const isWin = cr.outcome === 'win';
               if (isWin) {
                   victoryCount++;
                   totalXp += (cr.rewards?.xp || 0);
                   totalGold += (cr.rewards?.gold || 0);
                   statusEl.innerHTML = `
                     <div style="font-size:28px;margin-bottom:6px">🏆</div>
                     <div class="text-green bold">Chiến thắng ${cr.monster?.name}! (+${cr.rewards?.xp||0} XP, +${cr.rewards?.gold||0} Linh Thạch)</div>
                     <div class="text-dim text-xs mt-xs">Tổng thắng: ${victoryCount} | Tiếp tục sau 1s...</div>
                   `;
               } else {
                   statusEl.innerHTML = `
                     <div style="font-size:28px;margin-bottom:6px">💀</div>
                     <div class="text-red bold">${cr.outcome === 'flee' ? 'Đã bỏ chạy thành công' : 'Thất bại trọng thương'}! Vòng lặp dừng.</div>
                   `;
                   isAutoBattling = false;
                   break;
               }
           } else if (dUrl.event && dUrl.event.type === 'monster_ambush' && dUrl.event.combatResult) {
               const cr = dUrl.event.combatResult;
               const isWin = cr.outcome === 'win';
               if (isWin) {
                   victoryCount++;
                   totalXp += (cr.rewards?.xp || 0);
                   totalGold += (cr.rewards?.gold || 0);
                   statusEl.innerHTML = `<div class='text-orange bold'>⚠️ Đẩy lui cuộc phục kích của ${cr.monster?.name}! (+${cr.rewards?.xp||0} XP)</div>`;
               } else {
                   statusEl.innerHTML = `<div class='text-red bold'>💀 Bị đánh úp trọng thương! Vòng lặp dừng.</div>`;
                   isAutoBattling = false;
                   break;
               }
           } else {
               statusEl.innerHTML = `<div class='text-blue'>${dUrl.event?.message || 'Không có biến cố'}. Tiếp tục...</div>`;
           }
        } catch(e) {
           statusEl.innerHTML = `<div class='text-red'>Lỗi: ${e.message}. Dừng tự động.</div>`;
           isAutoBattling = false;
           break;
        }
        await new Promise(r => setTimeout(r, 1200));
     }
  }
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
    } else if (ev.type === 'monster_ambush' && ev.combatResult) {
      const cr = ev.combatResult
      const logHtml = renderCombatLogLines(cr.log || [])
      const oc = cr.outcome === 'win' ? '🏆 Chiến thắng!' : cr.outcome === 'loss' ? '💀 Bại trận!' : '⏰ Bất phân'
      const ocColor = cr.outcome === 'win' ? 'var(--green)' : cr.outcome === 'loss' ? 'var(--red)' : 'var(--orange)'
      html += `
        <div style="font-size:36px;margin-bottom:8px">⚠️</div>
        <div class="text-lg bold" style="color:var(--red);margin-bottom:8px">${ev.message}</div>
        <div style="font-size:16px;font-weight:700;color:${ocColor};margin-bottom:12px">${oc}</div>
        <div class="combat-log" style="max-height:200px;overflow-y:auto;text-align:left">${logHtml}</div>
      `
    } else if (ev.type === 'worldBoss') {
      html += `
        <div style="font-size: 48px; margin-bottom: 8px; animation: pulse 1s infinite;">🔥</div>
        <div class="text-lg text-red bold mb-sm" style="text-shadow: 0 0 10px rgba(255,0,0,0.5);">${ev.message}</div>
        <div class="text-sm text-dim mb-md">Lãnh Chúa Bản Đồ — Sinh vật cực kỳ hung hãn!</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--red flex-1" id="btnExploreCombat" data-mid="${ev.monsterId}">⚔️ Thách Đấu</button>
          <button class="btn btn--blue flex-1" id="btnExploreTrack" data-mid="${ev.monsterId}">👣 Ghi Dấu</button>
        </div>
      `
    } else if (ev.type === 'npc' && ev.npcId) {
      html += `
        <div style="font-size: 48px; margin-bottom: 8px;">${ev.npcIcon || '🧓'}</div>
        <div class="text-lg text-gold bold mb-sm">${ev.message}</div>
        <div class="text-sm text-dim mb-md">${ev.npcTitle || 'Kỳ nhân dị sĩ qua đường'}</div>
        <button class="btn btn--gold" id="btnNpcInteract">💬 Bái Kiến</button>
      `
    } else if (ev.type === 'player_encounter' && ev.targetPlayer) {
      const tp = ev.targetPlayer;
      html += `
        <div style="font-size: 48px; margin-bottom: 8px;">🧑‍🌾</div>
        <div class="text-lg text-bright bold mb-sm">Gặp gỡ Đạo Hữu: ${tp.name}</div>
        <div class="text-sm text-dim mb-md">Cảnh giới: ${tp.realmTierName || 'Phàm nhân'} · Cấp ${tp.level}</div>
        <div class="flex gap-2 justify-center mt-md w-full">
          <button class="btn btn--green flex-1" id="btnInteractGift" data-pid="${tp.id}">🎁 Tặng Linh Thạch (+100)</button>
          <button class="btn btn--red flex-1" id="btnInteractMug" data-pid="${tp.id}">⚔️ Cướp Bóc</button>
        </div>
      `;
    } else {
      html += `
        <div style="font-size: 32px; margin-bottom: 8px;">✨</div>
        <div class="text-lg text-bright bold mb-sm">${ev.message}</div>
        ${ev.gold ? `<div class="text-gold bold">+${ev.gold} 💎 Linh Thạch</div>` : ''}
        ${ev.item ? `<div class="text-green bold">+1 ${ev.item.name}</div>` : ''}
        <button class="btn btn--blue mt-md" id="btnExploreContinue">Tiếp tục</button>
      `
    }

    html += `</div></div>`
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

/** 2D Visual Turn-Based Combat Execution */
async function doCombat(ctx, monsterId, instanceId = null) {
  const { state, api, notify, updateSidebar, renderGame } = ctx
  const rEl = document.getElementById('combatResult')
  if (!rEl) return

  if (!state.player.currentHp || state.player.currentHp <= 0) {
    return notify('Đã kiệt sức! Hãy tịnh dưỡng trước.', 'error')
  }
  if (state.player.hospitalRemaining > 0) {
    return notify(`Đang tịnh dưỡng! Còn ${state.player.hospitalRemaining}s`, 'error')
  }

  rEl.innerHTML = `
    <div class="panel border-gold bg-dark" style="animation:pulse 1.5s infinite">
      <div class="panel-body text-center text-gold" style="padding:20px;">
        <div style="font-size:36px;margin-bottom:8px">⚔️</div>
        <div style="font-weight:bold;font-size:16px;">Vận chuyển linh lực, chuẩn bị khai chiến...</div>
      </div>
    </div>`
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

    const m = r.monster
    const pHp = Math.max(0, (state.player.currentHp / state.player.maxHp) * 100)
    const mHp = Math.max(0, (m.currentHp / m.maxHp) * 100)

    const outcomeMap = {
      'win': { icon: '🏆', text: 'Chiến Thắng', cls: 'win', color: 'var(--green)' },
      'loss': { icon: '💀', text: 'Trọng Thương Bại Trận', cls: 'lose', color: 'var(--red)' },
      'stalemate': { icon: '⏰', text: 'Bất Phân Thắng Bại', cls: 'draw', color: 'var(--orange)' },
      'flee': { icon: '🏃', text: 'Thoát Thân Thành Công', cls: 'flee', color: 'var(--blue)' },
    }
    const oc = outcomeMap[r.outcome] || outcomeMap['loss']
    const goldText = r.rewards?.gold ? ` · +${r.rewards.gold} 💎` : ''
    const rewardText = r.rewards ? ` · +${r.rewards.xp} XP${goldText}` : ''

    const stanceInfo = {
      breaker: { name: 'Thế Phá Quy', color: '#ef4444', icon: '⚡' },
      flow: { name: 'Thế Du Đạo', color: '#06b6d4', icon: '🌀' },
      glitch: { name: 'Thế Nghịch Hành', color: '#a855f7', icon: '🌌' },
    }[r.activeStance || 'breaker'] || { name: 'Bình Thường', color: '#888', icon: '⚔️' }

    // Render 2D Turn-Based Visual Arena
    rEl.innerHTML = `
      <div class="panel" style="border: 1px solid var(--border-panel); overflow:hidden;">
        <!-- Header -->
        <div class="panel-title flex justify-between items-center" style="background: rgba(0,0,0,0.3); padding: 10px 16px;">
          <div style="font-weight:bold; color: ${oc.color}; font-size:15px; display:flex; align-items:center; gap:8px;">
            <span>${oc.icon}</span> <span>${oc.text}</span>
          </div>
          <div class="text-sm text-dim">
            ${r.turns}/${r.maxTurns || 25} Lượt ${rewardText}
          </div>
        </div>

        <!-- 2D Fighter Cards Arena -->
        <div class="panel-body" style="background: radial-gradient(circle at center, rgba(30,41,59,0.5) 0%, rgba(15,23,42,0.9) 100%); padding: 20px 16px;">
          <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 16px; align-items: center; max-width: 750px; margin: 0 auto;">
            
            <!-- Player Card -->
            <div class="fighter-card" id="cardPlayer" style="background: rgba(15,23,42,0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 14px; text-align: center;">
              <div style="font-size: 36px; margin-bottom: 6px;">🧑‍🌾</div>
              <div style="font-weight: bold; color: var(--text-bright); font-size: 15px; margin-bottom: 2px;">${state.player.name}</div>
              <div style="font-size: 11px; color: ${stanceInfo.color}; font-weight: 600; margin-bottom: 8px;">
                ${stanceInfo.icon} ${stanceInfo.name}
              </div>
              <div style="background: rgba(0,0,0,0.5); border-radius: 4px; height: 10px; overflow: hidden; margin-bottom: 4px;">
                <div id="barPlayerHp" style="width: ${pHp}%; height: 100%; background: ${pHp > 50 ? 'var(--green)' : (pHp > 20 ? 'var(--orange)' : 'var(--red)')}; transition: width 0.4s ease;"></div>
              </div>
              <div style="font-size: 11px; color: var(--text-dim);" id="valPlayerHp">${state.player.currentHp}/${state.player.maxHp} HP</div>
            </div>

            <!-- VS Badge -->
            <div style="text-align: center;">
              <div style="font-size: 24px; font-weight: 900; color: var(--gold); text-shadow: 0 0 10px rgba(251,191,36,0.5); letter-spacing: 2px;">VS</div>
              <div style="font-size: 11px; color: #a855f7; font-weight: bold; margin-top: 4px;">+${r.glitchEvents?.length ? r.glitchEvents.length * 5 : 0} Thấu Triệt</div>
            </div>

            <!-- Monster Card -->
            <div class="fighter-card" id="cardMonster" style="background: rgba(15,23,42,0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 14px; text-align: center; position: relative;">
              <div style="font-size: 36px; margin-bottom: 6px;">${m.icon || '👾'}</div>
              <div style="font-weight: bold; color: var(--red); font-size: 15px; margin-bottom: 2px;">${m.name}</div>
              <div style="font-size: 11px; color: var(--text-dim); margin-bottom: 8px;">Lv.${m.level || 1} · ${m.element || 'Kim'}</div>
              <div style="background: rgba(0,0,0,0.5); border-radius: 4px; height: 10px; overflow: hidden; margin-bottom: 4px;">
                <div id="barMonsterHp" style="width: ${mHp}%; height: 100%; background: ${mHp > 50 ? 'var(--red)' : 'var(--orange)'}; transition: width 0.4s ease;"></div>
              </div>
              <div style="font-size: 11px; color: var(--text-dim);" id="valMonsterHp">${m.currentHp}/${m.maxHp} HP</div>

              <!-- Glitch Weakpoint Badge -->
              ${r.weakpoint ? `
                <div class="glitch-weakpoint-badge" style="margin-top: 8px; font-size: 11px; background: rgba(168,85,247,0.2); border: 1px solid #c084fc; color: #e9d5ff; border-radius: 12px; padding: 2px 8px; display: inline-block;">
                  🌌 Vết Nứt: <strong>${r.weakpoint}</strong> (x2.5 Dmg)
                </div>
              ` : ''}
            </div>

          </div>
        </div>

        <!-- Combat Log -->
        <div class="panel-body no-pad" style="border-top: 1px solid var(--border);">
          <div style="padding: 8px 16px; background: rgba(0,0,0,0.2); font-size: 11px; color: var(--text-dim); text-transform: uppercase; font-weight: 600;">
            📜 Nhật Ký Quyết Đấu Chi Tiết
          </div>
          <div class="combat-log" style="max-height: 250px; overflow-y: auto; padding: 12px 16px;">
            ${renderCombatLogLines(r.log)}
          </div>
        </div>
      </div>`

    // Trigger Floating Damage Animation
    const cardMonster = document.getElementById('cardMonster')
    const cardPlayer = document.getElementById('cardPlayer')
    if (r.glitchEvents && r.glitchEvents.length > 0 && cardMonster) {
      r.glitchEvents.forEach((ev, idx) => {
        setTimeout(() => {
          spawnFloatingDamage(cardMonster, `-${ev.damage} 🌌 [VẾT NỨT]`, 'glitch')
          cardMonster.classList.add('shake')
          setTimeout(() => cardMonster.classList.remove('shake'), 400)
        }, idx * 400 + 200)
      })
    } else if (cardMonster && r.rewards) {
      spawnFloatingDamage(cardMonster, `-${Math.round(m.maxHp * 0.4)} 💥`, 'crit')
    }

    updateSidebar()
    if (instanceId && typeof renderGame === 'function') {
      setTimeout(() => renderGame(), 1500)
    }
  } catch (e) {
    rEl.innerHTML = `<div class="panel"><div class="panel-body text-red">Lỗi chiến đấu: ${e.message}</div></div>`
  }
}

function spawnFloatingDamage(parentEl, text, type = 'normal') {
  if (!parentEl) return
  const floatEl = document.createElement('div')
  floatEl.className = `floating-damage damage-${type}`
  floatEl.textContent = text
  parentEl.appendChild(floatEl)
  setTimeout(() => floatEl.remove(), 1100)
}

function renderCombatLogLines(log) {
  return (log || []).map(l => {
    if (l.startsWith('---')) return `<div class="turn" style="font-weight:bold;color:var(--text-bright);margin:6px 0 2px 0;">${l}</div>`
    if (l.includes('PHÁT HIỆN LỖI THIÊN ĐẠO') || l.includes('🌌 [PHÁT HIỆN')) return `<div class="glitch-unlock" style="background:rgba(168,85,247,0.2);border:1px solid #c084fc;padding:6px 10px;border-radius:6px;margin:4px 0;color:#f0abfc;font-weight:bold;text-shadow:0 0 10px rgba(192,132,252,0.5)">${l}</div>`
    if (l.includes('VẾT NỨT THIÊN ĐẠO') || l.includes('Khai thác Lỗi')) return `<div class="glitch-burst" style="color:#d8b4fe;font-weight:bold;text-shadow:0 0 8px rgba(192,132,252,0.4)">${l}</div>`
    if (l.includes('Thế Du Đạo') || l.includes('nương theo kẽ hở')) return `<div class="flow-dodge" style="color:#67e8f9;font-weight:600">${l}</div>`
    if (l.includes('Kim Thân Bất Diệt')) return `<div class="undying-proc" style="color:#fde047;font-weight:600">${l}</div>`
    if (l.includes('linh lực') && l.includes('+')) return `<div class="energy" style="color:var(--cyan)">${l}</div>`
    if (l.includes('linh lực')) return `<div class="energy-cost" style="color:var(--blue)">${l}</div>`
    if (l.includes('hụt')) return `<div class="miss" style="color:var(--text-dim)">${l}</div>`
    if (l.includes('né được')) return `<div class="dodge" style="color:var(--blue)">${l}</div>`
    if (l.includes('CHÍNH MẠNG') || l.includes('💥')) return `<div class="crit" style="color:var(--gold);font-weight:bold">${l}</div>`
    if (l.includes('ngã xuống') || l.includes('💀')) return `<div class="death" style="color:var(--red);font-weight:bold">${l}</div>`
    if (l.includes('Chiến thắng') || l.includes('🏆')) return `<div class="victory" style="color:var(--green);font-weight:bold">${l}</div>`
    if (l.includes('Đột phá') || l.includes('🎉')) return `<div class="levelup" style="color:var(--gold);font-weight:bold">${l}</div>`
    if (l.includes('bỏ chạy') || l.includes('🏃')) return `<div class="flee" style="color:var(--orange)">${l}</div>`
    if (l.includes('Hết') || l.includes('⏰')) return `<div class="stalemate" style="color:var(--orange)">${l}</div>`
    if (l.includes('Linh Thạch') || l.includes('💰')) return `<div class="gold-reward" style="color:var(--gold)">${l}</div>`
    if (l.includes('Tịnh dưỡng') || l.includes('🏥')) return `<div class="hospital" style="color:var(--red)">${l}</div>`
    if (l.includes('🧪')) return `<div class="status-effect text-purple">${l}</div>`
    if (l.includes('✨')) return `<div class="regen text-green">${l}</div>`
    return `<div class="hit">${l}</div>`
  }).join('')
}
