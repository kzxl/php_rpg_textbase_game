/**
 * PvP Arena — Đấu Trường (Rank Tiers, Opponent Selection, Streak Bonus)
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
    const rank = a.rank || {}
    const streak = parseInt(a.streak) || 0
    const streakText = streak >= 5 ? `🔥x${streak}` : streak >= 3 ? `⚡x${streak}` : streak > 0 ? `${streak}W` : streak < 0 ? `${Math.abs(streak)}L` : ''
    const streakColor = streak >= 5 ? 'var(--gold)' : streak >= 3 ? 'var(--orange)' : streak > 0 ? 'var(--green)' : streak < 0 ? 'var(--red)' : 'var(--text-dim)'

    el.innerHTML = `
      <div class="page-header">
        <h2>⚔️ Đấu Trường</h2>
        <p class="page-sub">So tài với đạo hữu thiên hạ. Chinh phục bậc thang Thiên Đạo!</p>
      </div>

      <!-- RANK CARD -->
      <div class="panel glass" style="margin-bottom:12px;border-left:3px solid ${rank.color || '#666'}">
        <div class="panel-body" style="display:flex;align-items:center;gap:16px;padding:16px">
          <div style="font-size:42px;text-shadow:0 0 12px ${rank.color || '#666'}">${rank.icon || '🛡️'}</div>
          <div style="flex:1">
            <div style="font-size:11px;opacity:0.5;text-transform:uppercase;letter-spacing:1px">Rank</div>
            <div style="font-weight:800;font-size:18px;color:${rank.color || '#fff'}">${rank.name || 'Chưa xếp hạng'}</div>
            <div style="font-size:13px;opacity:0.7;margin-top:2px">
              ELO: <strong>${a.rating || 1000}</strong> · ${a.wins || 0}W/${a.losses || 0}L
              ${streakText ? ` · <span style="color:${streakColor};font-weight:700">${streakText}</span>` : ''}
            </div>
            ${rank.nextThreshold ? `
              <div style="margin-top:6px">
                <div style="font-size:10px;opacity:0.4">Tiến trình → ${rank.nextThreshold} ELO</div>
                <div style="background:rgba(255,255,255,0.1);border-radius:4px;height:6px;margin-top:3px;overflow:hidden">
                  <div style="background:${rank.color || '#666'};height:100%;width:${rank.progress || 0}%;border-radius:4px;transition:width 0.5s ease"></div>
                </div>
              </div>
            ` : '<div style="font-size:10px;opacity:0.4;margin-top:4px">🏆 Đỉnh cao! Thiên Đạo Đệ Nhất!</div>'}
          </div>
        </div>
      </div>

      <!-- RANK-UP CELEBRATION -->
      ${ar.lastResult?.rankUp ? `
      <div class="panel" style="margin-bottom:12px;border:2px solid var(--gold);animation:pulse 1.5s infinite;text-align:center;padding:16px">
        <div style="font-size:36px">${ar.lastResult.newRank?.icon}</div>
        <div style="font-size:16px;font-weight:800;color:var(--gold);margin-top:6px">🎉 THĂNG CẤP! ${ar.lastResult.newRank?.name}!</div>
      </div>
      ` : ''}

      <!-- LAST RESULT -->
      ${ar.lastResult ? `
      <div class="panel" style="margin-bottom:12px;border-left:3px solid ${ar.lastResult.won ? 'var(--green)' : 'var(--red)'}">
        <div class="panel-body" style="padding:12px 16px">
          <div style="font-weight:700;color:${ar.lastResult.won ? 'var(--green)' : 'var(--red)'}">
            ${ar.lastResult.won ? '🏆 CHIẾN THẮNG!' : '💀 THẤT BẠI!'}
          </div>
          <div style="font-size:12px;margin-top:4px">
            Đối thủ: <strong>${ar.lastResult.opponent?.name}</strong> 
            ${ar.lastResult.opponent?.rank ? ar.lastResult.opponent.rank.icon : ''} 
            (ELO ${ar.lastResult.opponent?.rating})
          </div>
          <div style="font-size:11px;opacity:0.6;margin-top:4px">
            ELO: ${ar.lastResult.ratingChange > 0 ? '+' : ''}${ar.lastResult.ratingChange}
            ${ar.lastResult.goldEarned > 0 ? ` · +${ar.lastResult.goldEarned} 💎` : ''}
          </div>
          ${ar.lastResult.combatLog?.length ? `<details style="margin-top:6px"><summary style="font-size:11px;cursor:pointer">📜 Combat Log</summary>
            <div class="combat-log" style="font-size:10px;margin-top:4px;max-height:150px;overflow:auto">${ar.lastResult.combatLog.map(l => `<div>${l}</div>`).join('')}</div>
          </details>` : ''}
        </div>
      </div>
      ` : ''}

      <!-- OPPONENTS -->
      <div class="panel" style="margin-bottom:12px">
        <div class="panel-title">🎯 Chọn Đối Thủ</div>
        <div class="panel-body no-pad">
          ${(d.opponents || []).length > 0 ? (d.opponents || []).map(o => `
            <div class="list-item" style="padding:10px 14px;display:flex;align-items:center;gap:10px;cursor:pointer" >
              <span style="font-size:20px">${o.rank?.icon || '🛡️'}</span>
              <div style="flex:1">
                <div style="font-weight:600">${o.name} <span style="opacity:0.4;font-size:11px">Lv.${o.level}</span></div>
                <div style="font-size:11px;color:${o.rank?.color || '#888'}">${o.rank?.name || 'Đồng'} · ELO ${o.rating}</div>
              </div>
              <button class="btn btn--red btn--sm btn-fight-opp" data-oid="${o.player_id}" ${ar.fighting ? 'disabled' : ''}>⚔️ Đấu</button>
            </div>
          `).join('') : '<div style="padding:16px;text-align:center;opacity:0.5">Không tìm thấy đối thủ phù hợp</div>'}
          <div style="padding:8px 14px;text-align:center">
            <button class="btn btn--blue btn--sm" id="btnRandomFight" ${ar.fighting ? 'disabled' : ''}>🎲 Đấu Ngẫu Nhiên (${d.entryFee || 50} 💎)</button>
          </div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div class="panel">
          <div class="panel-title">🏆 Top 10</div>
          <div class="panel-body no-pad">
            ${(d.top10 || []).map((t, i) => `
              <div class="list-item" style="padding:6px 12px;font-size:12px">
                <span style="width:20px;font-weight:700;color:${i < 3 ? 'var(--gold)' : 'var(--text-dim)'}">#${i + 1}</span>
                <span>${t.rank?.icon || ''}</span>
                <span style="flex:1">${t.name}</span>
                <span style="color:${t.rank?.color || 'var(--blue)'}; font-weight:600">${t.rating}</span>
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

    // Bind opponent fight buttons
    el.querySelectorAll('.btn-fight-opp').forEach(btn => {
      btn.addEventListener('click', (e) => doFight(e.target.dataset.oid))
    })
    document.getElementById('btnRandomFight')?.addEventListener('click', () => doFight(null))
  }

  async function doFight(opponentId) {
    ar.fighting = true; render()
    try {
      const res = await api.request(`/player/${pid}/arena/fight`, {
        method: 'POST', body: JSON.stringify({ opponentId })
      })
      ar.lastResult = res
      state.player = res.player; updateSidebar()
      notify(res.message, res.won ? 'success' : 'error')
      ar.fighting = false; await loadData()
    } catch (e) { notify(e.message, 'error'); ar.fighting = false; render() }
  }

  if (!ar.loaded) loadData(); else render()
}
