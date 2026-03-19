/**
 * PvP Arena — Đấu Trường (ELO Rating, Fight, History)
 */
export function pageArena(el, ctx) {
  const { state, api, notify, updateSidebar } = ctx
  const pid = state.playerId
  if (!state._arena) state._arena = { data: null, loaded: false, fighting: false, lastResult: null }
  const ar = state._arena

  async function loadData() {
    try { ar.data = await api.getArena(pid); ar.loaded = true; render() }
    catch (e) { notify(e.message, 'error') }
  }

  function render() {
    const d = ar.data
    const a = d?.arena || {}
    const rankIcon = a.rating >= 1500 ? '👑' : a.rating >= 1200 ? '⚔️' : a.rating >= 1000 ? '🗡️' : '🛡️'

    el.innerHTML = `
      <div class="page-header">
        <h2>⚔️ Đấu Trường</h2>
        <p class="page-sub">So tài với người chơi khác. ELO rating, phần thưởng theo rank.</p>
      </div>

      <div class="panel glass" style="margin-bottom:10px">
        <div class="panel-body" style="display:flex;align-items:center;gap:16px;padding:14px 16px">
          <div style="font-size:36px">${rankIcon}</div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:16px">ELO: ${a.rating || 1000}</div>
            <div style="font-size:12px;opacity:0.6">
              ${a.wins || 0}W / ${a.losses || 0}L · Streak: ${a.streak || 0}
            </div>
          </div>
          <button class="btn btn--red btn--lg" id="btnFight" ${ar.fighting ? 'disabled' : ''}>
            ⚔️ Đấu (${d.entryFee || 50} 💎)
          </button>
        </div>
      </div>

      ${ar.lastResult ? `
      <div class="panel" style="margin-bottom:10px;border-left:3px solid ${ar.lastResult.won ? 'var(--green)' : 'var(--red)'}">
        <div class="panel-body" style="padding:12px 16px">
          <div style="font-weight:700;color:${ar.lastResult.won ? 'var(--green)' : 'var(--red)'}">
            ${ar.lastResult.won ? '🏆 CHIẾN THẮNG!' : '💀 THẤT BẠI!'}
          </div>
          <div style="font-size:12px;margin-top:4px">
            Đối thủ: <strong>${ar.lastResult.opponent?.name}</strong> (Lv${ar.lastResult.opponent?.level}, ELO ${ar.lastResult.opponent?.rating})
          </div>
          <div style="font-size:11px;opacity:0.6;margin-top:4px">ELO: ${ar.lastResult.ratingChange > 0 ? '+' : ''}${ar.lastResult.ratingChange}</div>
          ${ar.lastResult.combatLog ? `<details style="margin-top:6px"><summary style="font-size:11px;cursor:pointer">📜 Combat Log</summary>
            <div style="font-size:10px;opacity:0.5;margin-top:4px;max-height:150px;overflow:auto">${ar.lastResult.combatLog.map(l => `<div>${l}</div>`).join('')}</div>
          </details>` : ''}
        </div>
      </div>
      ` : ''}

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div class="panel">
          <div class="panel-title">🏆 Top 10</div>
          <div class="panel-body no-pad">
            ${(d.top10 || []).map((t, i) => `
              <div class="list-item" style="padding:6px 12px;font-size:12px">
                <span style="width:20px;font-weight:700;color:${i < 3 ? 'var(--gold)' : 'var(--text-dim)'}">#${i + 1}</span>
                <span style="flex:1">${t.name}</span>
                <span style="color:var(--blue)">${t.rating} ELO</span>
                <span style="opacity:0.4;margin-left:6px">${t.wins}W/${t.losses}L</span>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="panel">
          <div class="panel-title">📜 Lịch Sử</div>
          <div class="panel-body no-pad">
            ${(d.history || []).map(h => {
              const won = h.winner_id === pid
              return `<div class="list-item" style="padding:6px 12px;font-size:11px">
                <span style="color:${won ? 'var(--green)' : 'var(--red)'}">
                  ${won ? '✅' : '❌'} vs ${h.attacker_id === pid ? h.defender_name : h.attacker_name}
                </span>
                <span style="opacity:0.4;margin-left:auto">${h.rating_change > 0 ? '+' : ''}${h.rating_change}</span>
              </div>`
            }).join('')}
          </div>
        </div>
      </div>
    `

    document.getElementById('btnFight')?.addEventListener('click', async () => {
      ar.fighting = true; render()
      try {
        const res = await api.arenaFight(pid)
        ar.lastResult = res
        state.player = res.player; updateSidebar()
        notify(res.message, res.won ? 'success' : 'error')
        ar.fighting = false; await loadData()
      } catch (e) { notify(e.message, 'error'); ar.fighting = false; render() }
    })
  }

  if (!ar.loaded) loadData(); else render()
}
