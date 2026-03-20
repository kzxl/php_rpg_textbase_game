/**
 * Thiên Phần Tháp — Infinite Tower Endgame
 */
export function pageTower(el, ctx) {
  const { state, api, notify, updateSidebar } = ctx
  const pid = state.playerId
  if (!state._tw) state._tw = { data: null, loaded: false, fighting: false, tab: 'tower' }
  const tw = state._tw

  async function loadData() {
    try { tw.data = await api.request(`/player/${pid}/tower`); tw.loaded = true; render() }
    catch (e) { notify(e.message, 'error') }
  }

  function render() {
    const d = tw.data
    const run = d?.run
    const lb = d?.leaderboard || []
    const ms = d?.milestones || {}
    const nm = d?.nextMilestone

    el.innerHTML = `
      <div class="page-header">
        <h2>🗼 Thiên Phần Tháp</h2>
        <p class="page-sub">Leo tháp vô hạn — mùa ${d?.season || '?'} | Reset hàng tháng</p>
      </div>

      <!-- STATUS CARD -->
      <div class="panel glass" style="margin-bottom:12px;border-left:3px solid #ff4500">
        <div class="panel-body" style="display:flex;align-items:center;gap:16px;padding:16px">
          <div style="font-size:48px">🗼</div>
          <div style="flex:1">
            ${run ? `
              <div style="font-weight:800;font-size:22px">Tầng ${run.currentFloor}</div>
              <div style="font-size:12px;opacity:0.6">Kỷ lục: T.${run.highestFloor} · ${run.totalKills} kills · ${run.status === 'dead' ? '💀 Đã ngã' : '🟢 Đang leo'}</div>
              ${nm ? `<div style="font-size:11px;margin-top:4px;color:var(--gold)">🎯 Mốc tiếp: T.${nm.floor} → ${nm.reward.title} (+${nm.reward.gold}💎)</div>` : ''}
            ` : `
              <div style="font-weight:700;font-size:16px">Chưa vào tháp mùa này</div>
              <div style="font-size:12px;opacity:0.5">Bắt đầu leo để tranh hạng!</div>
            `}
          </div>
          <div>
            ${!run || run.status === 'dead' ? `<button class="btn btn--red btn--lg" id="btnEnter">${run ? '🔄 Hồi Sinh' : '⚡ Vào Tháp'}</button>` : `<button class="btn btn--red btn--lg" id="btnFight" ${tw.fighting?'disabled':''}>⚔️ Chiến Đấu</button>`}
          </div>
        </div>
      </div>

      <!-- TABS -->
      <div style="display:flex;gap:8px;margin-bottom:12px">
        <button class="btn ${tw.tab==='tower'?'btn--blue':''} btn--sm" data-tab="tower">🗼 Tháp</button>
        <button class="btn ${tw.tab==='leaderboard'?'btn--blue':''} btn--sm" data-tab="leaderboard">🏆 Bảng Xếp Hạng</button>
        <button class="btn ${tw.tab==='milestones'?'btn--blue':''} btn--sm" data-tab="milestones">🎯 Mốc Thưởng</button>
      </div>

      <div id="twContent"></div>
      <div id="twResult" style="margin-top:12px"></div>
    `

    el.querySelectorAll('[data-tab]').forEach(b => b.addEventListener('click', () => { tw.tab = b.dataset.tab; render() }))

    document.getElementById('btnEnter')?.addEventListener('click', async () => {
      try {
        const res = await api.request(`/player/${pid}/tower/climb`, { method:'POST' })
        notify(res.message, 'success')
        await loadData()
      } catch(e) { notify(e.message, 'error') }
    })

    document.getElementById('btnFight')?.addEventListener('click', async () => {
      tw.fighting = true; render()
      try {
        const res = await api.request(`/player/${pid}/tower/fight`, { method:'POST' })
        state.player = res.player; updateSidebar()
        tw.fighting = false

        const resultEl = document.getElementById('twResult')
        if (resultEl) {
          const won = res.result !== 'death'
          resultEl.innerHTML = `
            <div class="panel" style="border-left:3px solid ${won?'var(--green)':'var(--red)'}">
              <div class="panel-body" style="padding:14px">
                <div style="font-weight:700;font-size:14px">${res.message}</div>
                ${res.loot?.length ? `<div style="font-size:12px;margin-top:6px;opacity:0.7">${res.loot.join(' · ')}</div>` : ''}
                ${res.milestone ? `<div style="margin-top:8px;padding:8px;background:rgba(255,215,0,0.15);border-radius:6px;font-weight:700;color:var(--gold)">🏆 ${res.milestone.title}!</div>` : ''}
                ${res.combatResults?.map(cr => `<details style="margin-top:6px"><summary style="cursor:pointer;font-size:11px">${cr.monster} — ${cr.result==='win'?'✅':'❌'}</summary><pre style="font-size:10px;max-height:150px;overflow:auto;opacity:0.6;margin-top:4px">${(cr.log||[]).map(l=>`${l.turn||''}: ${l.text||JSON.stringify(l)}`).join('\n')}</pre></details>`).join('') || ''}
              </div>
            </div>
          `
        }
        await loadData()
      } catch(e) { notify(e.message, 'error'); tw.fighting = false; render() }
    })

    const content = document.getElementById('twContent')
    if (!content) return
    if (tw.tab === 'leaderboard') renderLeaderboard(content, lb, d.playerRank)
    else if (tw.tab === 'milestones') renderMilestones(content, ms, run?.highestFloor || 0)
    else renderFloorPreview(content, run)
  }

  function renderFloorPreview(el, run) {
    if (!run) { el.innerHTML = '<div class="panel"><div class="panel-body" style="text-align:center;padding:30px;opacity:0.5">Vào tháp để bắt đầu leo!</div></div>'; return }
    const floor = run.currentFloor
    const types = []
    if (floor % 10 === 0) types.push('👑 Boss')
    else if (floor % 15 === 0) types.push('💰 Bảo Tàng (2.5x loot)')
    else if (floor % 7 === 0) types.push('☠️ Bẫy Trận (-10% HP)')
    else if (floor % 13 === 0) types.push('💚 Linh Tuyền (+20% HP)')
    else if (floor % 11 === 0) types.push('⚡ Tinh Anh (+30% stats)')
    else if (floor % 9 === 0 && floor > 20) types.push('☯ Ngũ Hành')
    const monstersCount = Math.min(1 + Math.floor(floor / 20), 3)
    el.innerHTML = `<div class="panel"><div class="panel-body" style="padding:14px">
      <div style="font-weight:700">Tầng ${floor} Preview</div>
      <div style="font-size:12px;opacity:0.7;margin-top:4px">
        ${types.length ? types.join(' · ') : '⚔️ Thường'}
        · ${monstersCount} quái
        · Sức mạnh ×${(Math.pow(1.08, floor-1)).toFixed(1)}
      </div>
    </div></div>`
  }

  function renderLeaderboard(el, lb, playerRank) {
    el.innerHTML = `<div class="panel"><div class="panel-title">🏆 Mùa ${tw.data?.season}</div><div class="panel-body no-pad">
      ${lb.length === 0 ? '<div style="padding:20px;text-align:center;opacity:0.4">Chưa có ai leo tháp mùa này</div>' : ''}
      ${lb.map(r => {
        const medal = r.rank <= 3 ? ['','🥇','🥈','🥉'][r.rank] : `#${r.rank}`
        const isMe = r.playerId === pid
        return `<div class="list-item" style="padding:8px 14px;${isMe?'background:rgba(255,215,0,0.1)':''}">
          <span style="width:40px;font-weight:700;font-size:14px">${medal}</span>
          <span style="flex:1;font-weight:${isMe?800:400}">${r.name}</span>
          <span style="font-size:12px;opacity:0.7">T.${r.floor} · ${r.kills} kills</span>
        </div>`
      }).join('')}
    </div></div>
    ${playerRank > 0 ? `<div style="text-align:center;margin-top:8px;font-size:12px;opacity:0.6">Hạng của bạn: #${playerRank}</div>` : ''}`
  }

  function renderMilestones(el, ms, highestFloor) {
    el.innerHTML = `<div class="panel"><div class="panel-title">🎯 Mốc Thưởng</div><div class="panel-body no-pad">
      ${Object.entries(ms).map(([floor, reward]) => {
        const reached = highestFloor >= parseInt(floor)
        return `<div class="list-item" style="padding:10px 14px;${reached?'opacity:0.5':''}">
          <span style="font-size:18px">${reached ? '✅' : '🔒'}</span>
          <span style="flex:1;font-weight:600">Tầng ${floor}</span>
          <span style="font-size:12px">${reward.title} · +${reward.gold}💎</span>
        </div>`
      }).join('')}
    </div></div>`
  }

  if (!tw.loaded) loadData(); else render()
}
