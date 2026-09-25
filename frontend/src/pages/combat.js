/**
 * Khám Phá Area & Combat Page
 */
import { ThreeEngine } from '../game/ThreeEngine.js';

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

    <!-- AUTO BATTLE 3D ARENA -->
    <div class="panel mt-md toggle-auto-combat" style="display:none; border-color:var(--gold);">
      <div class="panel-title flex justify-between items-center">
         <span>⚔️ Đấu Trường Tự Động (3D)</span>
         <button class="btn btn--red btn--sm" id="btnStopAuto">Dừng Auto</button>
      </div>
      <div class="panel-body no-pad" id="autoCombat3DContainer" style="height:350px; background:#000;"></div>
      <div class="panel-body text-center" id="autoCombatStatus" style="font-size:12px; color:var(--text-dim); padding:8px;"></div>
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
            <span>⚔️ Tự Động Đánh (3D)</span>
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

  // Phase 5: Fetch active tracked monsters and render with Sương Mù
  // Progressive Info Disclosure: monster insight from Thiên Cơ
  const mi = p.insightLevels?.monster ?? 0
  const renderMonsterStat = (val) => mi >= 3 ? val : '???'

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

          // Tier 0: name only
          let descHtml = '<div class="item-desc text-sm text-dim mb-sm">Bản thể mờ ảo, không rõ căn cơ.</div>'
          if (mi >= 1) descHtml = `<div class="item-desc text-sm text-dim mb-sm">${m.description || 'Yêu thú vùng này.'}</div>`

          // Tier 1+: HP bar
          let hpBarHtml = ''
          if (mi >= 1) {
            hpBarHtml = `<div class="w-full bg-darker rounded mb-sm" style="height: 6px; overflow: hidden;">
              <div style="width: ${hpPct}%; background: ${hpColor}; height: 100%;"></div>
            </div>`
          }

          // Tier 2+: HP numbers
          let hpText = mi >= 2 ? `❤ ${m.currentHp}/${m.stats.hp}` : (mi >= 1 ? `❤ ???` : '')

          // Tier 3+: combat stats  
          let statsHtml = ''
          if (mi >= 3) {
            statsHtml = `
              <span class="text-orange">💪 ${m.stats.strength}</span>
              <span class="text-cyan">🏃 ${m.stats.speed}</span>
              <span class="text-green">🎯 ${m.stats.dexterity}</span>
              <span class="text-blue">🛡 ${m.stats.defense}</span>`
          }

          // Tier 4+: drops
          let dropsHtml = ''
          if (mi >= 4 && m.drops && m.drops.length > 0) {
            dropsHtml = `<div class="text-xs text-dim mt-sm" style="display:flex;gap:4px;flex-wrap:wrap;">
              📦 ${m.drops.map(d => `<span class="badge" style="background:rgba(255,255,255,0.08);font-size:9px;padding:1px 4px;">${d.id} (${mi >= 5 ? d.chance+'%' : '?%'})</span>`).join('')}
            </div>`
          }

          // Tier 5+: XP/gold
          let rewardHtml = ''
          if (mi >= 5) {
            const goldMin = m.goldReward?.[0] ?? m.goldReward?.min ?? '?'
            const goldMax = m.goldReward?.[1] ?? m.goldReward?.max ?? '?'
            rewardHtml = `<span class="text-gold">💰 ${goldMin}-${goldMax}</span> <span class="text-purple">✨ ${m.xpReward ?? '?'} XP</span>`
          }

          return `
            <div class="list-item flex flex-col items-start gap-4">
              <div class="item-info" style="width: 100%;">
                <div class="flex justify-between items-center mb-sm">
                  <div class="item-name text-lg">${m.name} <span class="text-xs text-dim">(${m.instance_id?.substring(0,8) ?? ''})</span></div>
                  <button class="btn btn--red btn--sm btn-attack-tracked" data-inst="${m.instance_id}" data-mid="${m.id}">Giao Chiến</button>
                </div>
                ${descHtml}
                ${hpBarHtml}
                <div class="item-meta flex gap-4 text-xs flex-wrap">
                  ${hpText ? `<span class="text-red">${hpText}</span>` : ''}
                  ${statsHtml}
                  ${rewardHtml}
                </div>
                ${dropsHtml}
              </div>
            </div>`
        }).join('')

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

  // Render Area Monsters from Backend (GameDataRepository::getMonstersByArea)
  const loadAreaMonsters = async () => {
    const listEl = document.getElementById('areaMonstersList')
    if (!listEl) return
    try {
      const res = await api.getAreaMonsters(p.id)
      // The area-monsters endpoint returns tracked + area monsters 
      // Use state.monsters filtered by tier matching area  
      const areaData = state.exploration ? state.exploration[p.currentArea || 'thanh_lam_tran'] : null
      const am = (state.monsters || []).filter(m => !m.isWorldBoss && !m.is_world_boss)
      // Show all non-boss monsters as "possible encounters" for this area
      const displayMonsters = am.length > 0 ? am : []

      if (displayMonsters.length === 0) {
        listEl.innerHTML = `<div style="padding: 16px; text-align: center;" class="text-dim">Không rõ quần thể yêu thú nơi đây.</div>`
        return
      }

      listEl.innerHTML = displayMonsters.map(m => {
        let descHtml = '<div class="item-desc text-sm text-dim mb-sm">Thông tin mờ ảo...</div>'
        if (mi >= 1) descHtml = `<div class="item-desc text-sm text-dim mb-sm">${m.description || 'Yêu thú sinh sống tại vùng này.'}</div>`

        return `
          <div class="list-item flex flex-col items-start gap-4" style="opacity: 0.8;">
            <div class="item-info" style="width: 100%;">
              <div class="item-name text-md text-gold">${m.name} <span class="text-xs text-dim ml-sm">${m.tierName || ''}</span></div>
              ${descHtml}
            </div>
          </div>
        `
      }).join('')
    } catch (e) {
      console.error('Lỗi tải quần thể:', e)
    }
  }
  
  loadAreaMonsters();

  // Attach Explore Event
  const btnExplore = document.getElementById('btnExplore')
  if (btnExplore) {
    btnExplore.addEventListener('click', () => doExplore(ctx))
  }

  // Attach Combat Events
  el.querySelectorAll('.list-item.clickable').forEach(item => {
    item.addEventListener('click', () => startCombat(item.dataset.mid, ctx))
  })

  // --- AUTO BATTLE LOGIC ---
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
      
      const container = document.getElementById('autoCombat3DContainer');
      if (ctx._activeThreeArena) ctx._activeThreeArena.destroy();
      ctx._activeThreeArena = new ThreeEngine(container);
      ctx._activeThreeArena.setupCombatArena();
      ctx._activeThreeArena.startLoop();
      
      startAutoBattleLoop();
    });
  }

  if (btnStop) {
    btnStop.addEventListener('click', () => {
      isAutoBattling = false;
      panelKhamPha.style.display = 'block';
      panelAuto.style.display = 'none';
      if (ctx._activeThreeArena) ctx._activeThreeArena.destroy();
    });
  }

  async function startAutoBattleLoop() {
     while(isAutoBattling) {
        statusEl.innerHTML = "<span class='text-gold'>⏳ Đang rà soát và thám hiểm...</span>";
        const playerState = state.player;
        
        if ((playerState.currentStamina || 0) < exploreCost) {
            statusEl.innerHTML = "<span class='text-red'>❌ Hết thể lực! Tự động dừng.</span>";
            isAutoBattling = false;
            break;
        }
        if (playerState.currentHp / playerState.maxHp < 0.2) {
            statusEl.innerHTML = "<span class='text-red'>❌ Máu quá thấp! Tự động dừng.</span>";
            isAutoBattling = false;
            break;
        }

        try {
           const dUrl = await api.explore(state.playerId);
           state.player = dUrl.player; 
           updateSidebar();

           if (dUrl.event && (dUrl.event.type === 'monster' || dUrl.event.type === 'worldBoss')) {
               statusEl.innerHTML = `<span class='text-red'>⚔️ Đã tìm thấy ${dUrl.event.message}... Chuẩn bị giao chiến!</span>`;
               await new Promise(r => setTimeout(r, 1000));
               
               if (!isAutoBattling) break;

               ctx._activeThreeArena.resetCombatArena();
               const cr = await api.request('/combat/full', { 
                  method: 'POST', 
                  body: JSON.stringify({ playerId: state.playerId, monsterId: dUrl.event.monsterId }) 
               });
               state.player = cr.player; 
               updateSidebar();
               
               const isWin = cr.outcome === 'win';
               await ctx._activeThreeArena.playCombatAnimation(isWin, cr.outcome);
               
               if (isWin) {
                   statusEl.innerHTML = `<span class='text-green'>🏆 Chiến thắng! Nhận được ${cr.rewards?.xp||0} XP. Lặp lại sau 1s...</span>`;
               } else {
                   statusEl.innerHTML = `<span class='text-red'>💀 ${cr.outcome === 'flee' ? 'Đã bỏ chạy' : 'Thất bại'}! Vòng lặp dừng.</span>`;
                   isAutoBattling = false;
                   break;
               }
           } else if (dUrl.event && dUrl.event.type === 'monster_ambush' && dUrl.event.combatResult) {
               // Bị quái đánh lén
               const cr = dUrl.event.combatResult;
               const isWin = cr.outcome === 'win';
               statusEl.innerHTML = `<span class='text-orange'>⚠️ Bị phục kích! ${dUrl.event.message}</span>`;
               
               ctx._activeThreeArena.resetCombatArena();
               await new Promise(r => setTimeout(r, 600));
               await ctx._activeThreeArena.playCombatAnimation(isWin, cr.outcome);
               
               if (!isWin) {
                   statusEl.innerHTML = `<span class='text-red'>💀 Thuộc hạ bãi! Vòng lặp dừng.</span>`;
                   isAutoBattling = false;
                   break;
               }
           } else {
               statusEl.innerHTML = `<span class='text-blue'>♻️ ${dUrl.event.message}. Đang tiếp tục...</span>`;
           }
        } catch(e) {
           statusEl.innerHTML = `<span class='text-red'>Lỗi hệ thống hoặc Database. Dừng auto.</span>`;
           isAutoBattling = false;
           console.error(e);
           break;
        }
        await new Promise(r => setTimeout(r, 1500));
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
      // Monster ambush — forced combat, show result
      const cr = ev.combatResult
      const logHtml = (cr.log || []).map(l => {
        if (l.startsWith('---')) return `<div class="turn">${l}</div>`
        if (l.includes('hụt')) return `<div class="miss">${l}</div>`
        if (l.includes('CHÍNH MẠNG') || l.includes('💥')) return `<div class="crit">${l}</div>`
        if (l.includes('ngã xuống') || l.includes('💀')) return `<div class="death">${l}</div>`
        if (l.includes('Chiến thắng') || l.includes('🏆')) return `<div class="victory">${l}</div>`
        return `<div class="hit">${l}</div>`
      }).join('')
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
      // Display study effect if any
      if (ev.studyEffect) {
        const se = ev.studyEffect
        const seColor = se.isDebuff ? 'var(--red)' : 'var(--gold)'
        html += `<div class="text-sm mt-sm" style="color:${seColor};animation:fadeIn 0.5s;">
          ${se.message}
        </div>`
      }
      if (ev.hasQuests) {
        html += `<button class="btn btn--gold btn--sm mt-sm" id="btnNpcInteract" data-npc="${ev.npcId}">💬 Nói Chuyện</button>`
      }
      html += `<button class="btn btn--blue btn--sm mt-sm ml-sm" id="btnExploreContinue">Tiếp Tục</button>`
      html += `</div></div>`
      // NPC quest modal placeholder
      html += `<div id="npcQuestModal"></div>`
    } else if (ev.type === 'player_encounter' && ev.player) {
      html += `
        <div style="font-size: 48px; margin-bottom: 8px;">👤</div>
        <div class="text-lg text-gold bold mb-sm">${ev.message}</div>
        <div class="text-sm text-dim mb-md">Âm thầm lướt qua hay chủ động giao hảo?</div>
        <div class="flex gap-2 justify-center mt-md w-full" style="flex-wrap:wrap">
          <button class="btn btn--blue flex-1" id="btnInteractFriend" data-pid="${ev.player.id}">🤝 Kết Giao</button>
          <button class="btn btn--gold flex-1" id="btnInteractGift" data-pid="${ev.player.id}">💎 Tặng 100 LT</button>
          <button class="btn btn--red flex-1" id="btnInteractMug" data-pid="${ev.player.id}">⚔️ Cướp Linh Thạch</button>
        </div>
      `
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
      html += `<button class="btn btn--blue mt-sm" id="btnExploreContinue">Tiếp tục hành trình</button>`
    }

    if (!(ev.type === 'npc' && ev.npcId)) {
      html += `</div></div>`
    }
    rEl.innerHTML = html

    if (ev.type === 'player_encounter' && ev.player) {
      document.getElementById('btnInteractFriend').addEventListener('click', async (e) => {
        try {
          const res = await api.addFriend(state.playerId, e.target.dataset.pid);
          if (res.success || res.message) notify(res.message || 'Đã gửi lời mời!', 'success');
        } catch (err) { notify(err.message, 'error'); }
      });
      document.getElementById('btnInteractGift').addEventListener('click', async (e) => {
        try {
          const res = await api.interactPlayer(state.playerId, e.target.dataset.pid, 'gift', 100);
          if (res.player) {
            state.player = res.player;
            updateSidebar();
            notify(res.message, 'success');
            const pbody = e.target.closest('.panel-body');
            if(pbody) pbody.innerHTML = `<div class="text-green text-lg mb-md">Đã bồi đắp hảo cảm!</div><button class="btn btn--blue" id="btnExploreContinueAfterGift">Rời đi</button>`;
            document.getElementById('btnExploreContinueAfterGift')?.addEventListener('click', () => { rEl.innerHTML = ''; });
          }
        } catch (err) { notify(err.message, 'error'); }
      });
      document.getElementById('btnInteractMug')?.addEventListener('click', async (e) => {
        const victimId = e.target.dataset.pid
        e.target.disabled = true
        e.target.textContent = '⏳ Đang tấn công...'
        try {
          const res = await api.request(`/player/${state.playerId}/mug`, {
            method: 'POST', body: JSON.stringify({ victimId })
          })
          state.player = res.player; updateSidebar()
          const pbody = e.target.closest('.panel-body')
          if (pbody) {
            const resultColor = res.success ? 'var(--green)' : 'var(--red)'
            const resultIcon = res.success ? '💰' : '💀'
            pbody.innerHTML = `
              <div style="font-size:36px;margin-bottom:8px">${resultIcon}</div>
              <div style="color:${resultColor};font-size:16px;font-weight:700;margin-bottom:8px">${res.message}</div>
              ${res.goldStolen > 0 ? `<div class="text-gold">+${res.goldStolen} 💎 Linh Thạch</div>` : ''}
              <div style="font-size:11px;opacity:0.5;margin-top:8px">Tỉ lệ: ${res.successChance}%</div>
              <button class="btn btn--blue mt-md" id="btnExploreContinueAfterMug">Tiếp tục</button>
            `
            document.getElementById('btnExploreContinueAfterMug')?.addEventListener('click', () => { rEl.innerHTML = '' })
          }
          notify(res.message, res.success ? 'success' : 'error')
        } catch (err) {
          notify(err.message, 'error')
          e.target.disabled = false
          e.target.textContent = '⚔️ Cướp Linh Thạch'
        }
      });
    }

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
      if (l.includes('PHÁT HIỆN LỖI THIÊN ĐẠO') || l.includes('🌌 [PHÁT HIỆN')) return `<div class="glitch-unlock" style="background:rgba(168,85,247,0.2);border:1px solid #c084fc;padding:6px 10px;border-radius:6px;margin:4px 0;color:#f0abfc;font-weight:bold;text-shadow:0 0 10px rgba(192,132,252,0.5)">${l}</div>`
      if (l.includes('VẾT NỨT THIÊN ĐẠO') || l.includes('Khai thác Lỗi')) return `<div class="glitch-burst" style="color:#d8b4fe;font-weight:bold;text-shadow:0 0 8px rgba(192,132,252,0.4)">${l}</div>`
      if (l.includes('Thế Du Đạo') || l.includes('nương theo kẽ hở')) return `<div class="flow-dodge" style="color:#67e8f9;font-weight:600">${l}</div>`
      if (l.includes('Kim Thân Bất Diệt')) return `<div class="undying-proc" style="color:#fde047;font-weight:600">${l}</div>`
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
    const glitchBanner = r.weakpoint ? `
      <div style="background:rgba(168,85,247,0.12);border-top:1px solid rgba(168,85,247,0.25);padding:6px 12px;display:flex;justify-content:space-between;align-items:center;font-size:0.8rem;">
        <span style="color:#d8b4fe;">🌌 Vết Nứt Thiên Đạo: <strong>${r.weakpoint}</strong></span>
        <span style="color:#fbbf24;">🔮 Thấu Triệt: <strong>${r.glitchInsight || 0}</strong></span>
      </div>
    ` : ''

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
        ${glitchBanner}
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
