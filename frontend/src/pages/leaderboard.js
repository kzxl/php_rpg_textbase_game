/**
 * Leaderboard — Bảng Xếp Hạng (Level, Gold, PvP, Guild)
 */
export function pageLeaderboard(el, ctx) {
  const { state, api, notify } = ctx
  const tab = state._lbTab || 'level'

  async function load() {
    try { state._lbData = await api.getLeaderboard(tab); render() }
    catch (e) { notify(e.message, 'error') }
  }

  function render() {
    const d = state._lbData || {}
    const ranks = d.rankings || []
    const tabNames = { level: '📊 Level', gold: '💰 Linh Thạch', pvp: '⚔️ PvP', guild: '🏯 Tông Môn' }

    el.innerHTML = `
      <div class="page-header">
        <h2>🏆 Bảng Xếp Hạng</h2>
        <p class="page-sub">Top 50 người chơi và guild.</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:10px">
        ${Object.entries(tabNames).map(([k, v]) =>
          `<button class="btn ${tab === k ? 'btn--gold' : 'btn--dark'} btn--sm tab-btn" data-tab="${k}">${v}</button>`
        ).join('')}
      </div>

      <div class="panel">
        <div class="panel-body no-pad">
          ${tab === 'guild' ? ranks.map((r, i) => `
            <div class="list-item" style="padding:8px 14px;font-size:12px">
              <span style="width:28px;font-weight:700;color:${i < 3 ? 'var(--gold)' : 'var(--text-dim)'}">#${i + 1}</span>
              <span style="flex:1">
                <strong>[${r.tag}] ${r.name}</strong>
                <span style="opacity:0.4"> Lv${r.level}</span>
              </span>
              <span style="opacity:0.4">${r.members}/${r.max_members} 👤</span>
              <span style="color:var(--gold);margin-left:8px">💰 ${parseInt(r.treasury || 0).toLocaleString()}</span>
            </div>
          `).join('') :

          tab === 'pvp' ? ranks.map((r, i) => `
            <div class="list-item" style="padding:8px 14px;font-size:12px">
              <span style="width:28px;font-weight:700;color:${i < 3 ? 'var(--gold)' : 'var(--text-dim)'}">#${i + 1}</span>
              <span style="flex:1"><strong>${r.name}</strong> <span style="opacity:0.4">Lv${r.level}</span></span>
              <span style="color:var(--blue)">${r.rating} ELO</span>
              <span style="opacity:0.4;margin-left:6px">${r.wins}W/${r.losses}L</span>
            </div>
          `).join('') :

          ranks.map((r, i) => `
            <div class="list-item" style="padding:8px 14px;font-size:12px">
              <span style="width:28px;font-weight:700;color:${i < 3 ? 'var(--gold)' : 'var(--text-dim)'}">#${i + 1}</span>
              <span style="flex:1"><strong>${r.name}</strong></span>
              ${tab === 'level' ? `<span>Lv${r.level}</span>` : ''}
              <span style="color:var(--gold);margin-left:8px">💎 ${parseInt(r.gold || 0).toLocaleString()}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `

    el.querySelectorAll('.tab-btn').forEach(b => b.addEventListener('click', () => {
      state._lbTab = b.dataset.tab
      load()
    }))
  }

  load()
}
