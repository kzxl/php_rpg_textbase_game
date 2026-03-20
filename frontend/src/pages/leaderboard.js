/**
 * Leaderboard — Bảng Xếp Hạng (Level, Gold, PvP, Guild)
 * Fixed: tab switching now correctly re-reads state._lbTab
 */
export function pageLeaderboard(el, ctx) {
  const { state, api, notify } = ctx
  if (!state._lbTab) state._lbTab = 'level'

  async function load() {
    const tab = state._lbTab || 'level'
    el.innerHTML = '<div class="loading" style="padding:40px;text-align:center">⏳ Đang tải bảng xếp hạng...</div>'
    try {
      const data = await api.getLeaderboard(tab)
      state._lbData = data
      render()
    } catch (e) {
      el.innerHTML = `<div class="panel"><div class="panel-body text-dim" style="text-align:center;padding:30px">
        ⚠️ Lỗi tải bảng xếp hạng: ${e.message}
      </div></div>`
    }
  }

  function render() {
    const tab = state._lbTab || 'level'
    const d = state._lbData || {}
    const ranks = d.rankings || []
    const tabs = [
      { id: 'level', icon: '📊', name: 'Cấp Độ' },
      { id: 'gold', icon: '💰', name: 'Linh Thạch' },
      { id: 'pvp', icon: '⚔️', name: 'Đấu Trường' },
      { id: 'guild', icon: '🏯', name: 'Tông Môn' }
    ]

    const tabsHtml = tabs.map(t => `
      <button class="skill-tab ${tab === t.id ? 'active' : ''}" data-tab="${t.id}">
        ${t.icon} ${t.name}
      </button>
    `).join('')

    // Render rankings based on tab
    let ranksHtml = ''
    if (ranks.length === 0) {
      ranksHtml = '<div class="text-dim" style="text-align:center;padding:30px">Chưa có dữ liệu xếp hạng.</div>'
    } else if (tab === 'guild') {
      ranksHtml = ranks.map((r, i) => `
        <div class="lb-row ${i < 3 ? 'lb-top' : ''}">
          <div class="lb-rank ${i < 3 ? 'lb-rank-top' : ''}">${i < 3 ? ['🥇','🥈','🥉'][i] : '#' + (i+1)}</div>
          <div class="lb-info">
            <div class="lb-name">[${r.tag}] ${r.name}</div>
            <div class="lb-sub">👤 ${r.members}/${r.max_members} · Leader: ${r.leader_name || '?'}</div>
          </div>
          <div class="lb-stat">
            <div class="lb-stat-value" style="color:var(--gold)">💰 ${parseInt(r.treasury || 0).toLocaleString()}</div>
            <div class="lb-stat-label">Lv.${r.level}</div>
          </div>
        </div>
      `).join('')
    } else if (tab === 'pvp') {
      ranksHtml = ranks.map((r, i) => `
        <div class="lb-row ${i < 3 ? 'lb-top' : ''}">
          <div class="lb-rank ${i < 3 ? 'lb-rank-top' : ''}">${i < 3 ? ['🥇','🥈','🥉'][i] : '#' + (i+1)}</div>
          <div class="lb-info">
            <div class="lb-name">${r.name}</div>
            <div class="lb-sub">Lv.${r.level} · ${r.wins || 0}W/${r.losses || 0}L${r.streak > 0 ? ` · 🔥${r.streak}` : ''}</div>
          </div>
          <div class="lb-stat">
            <div class="lb-stat-value" style="color:var(--blue)">${r.rating || 1000}</div>
            <div class="lb-stat-label">ELO</div>
          </div>
        </div>
      `).join('')
    } else {
      ranksHtml = ranks.map((r, i) => `
        <div class="lb-row ${i < 3 ? 'lb-top' : ''}">
          <div class="lb-rank ${i < 3 ? 'lb-rank-top' : ''}">${i < 3 ? ['🥇','🥈','🥉'][i] : '#' + (i+1)}</div>
          <div class="lb-info">
            <div class="lb-name">${r.name}</div>
            <div class="lb-sub">${r.realm_tier ? `Cảnh giới ${r.realm_tier}` : ''} ${tab === 'level' ? `· Lv.${r.level}` : ''}</div>
          </div>
          <div class="lb-stat">
            <div class="lb-stat-value" style="color:var(--gold)">
              ${tab === 'gold' ? `💎 ${parseInt(r.gold || 0).toLocaleString()}` : `Lv.${r.level}`}
            </div>
          </div>
        </div>
      `).join('')
    }

    el.innerHTML = `
      <div class="page-header">
        <h1>🏆 Bảng Xếp Hạng</h1>
        <div class="text-dim text-sm">Top 50 tu sĩ và tông môn mạnh nhất.</div>
      </div>

      <div class="skill-tabs" style="margin-bottom:12px">${tabsHtml}</div>

      <div class="panel">
        <div class="panel-body no-pad">
          ${ranksHtml}
        </div>
      </div>
    `

    // Tab click handlers
    el.querySelectorAll('.skill-tab[data-tab]').forEach(b => {
      b.addEventListener('click', () => {
        state._lbTab = b.dataset.tab
        load()
      })
    })
  }

  load()
}
