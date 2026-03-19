/**
 * Player Profile — Search & View Other Players
 * Actions: Attack (Mugging), Add Friend, View Stats
 */
export function pageProfile(el, ctx) {
  const { state, api, notify, updateSidebar } = ctx
  const pid = state.playerId

  if (!state._profile) state._profile = { results: [], viewing: null, searchQuery: '' }
  const pr = state._profile

  function render() {
    el.innerHTML = `
      <div class="page-header">
        <h2>🔍 Tìm Đạo Hữu</h2>
        <p class="page-sub">Tìm kiếm người chơi theo tên. Xem profile, tấn công hoặc kết bạn.</p>
      </div>

      <div class="panel" style="margin-bottom:12px">
        <div class="panel-body" style="padding:12px 16px;display:flex;gap:8px">
          <input type="text" id="searchInput" placeholder="Nhập tên người chơi..."
            value="${pr.searchQuery}"
            style="flex:1;padding:8px 12px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px;font-size:13px">
          <button class="btn btn--blue" id="btnSearch">🔍 Tìm</button>
        </div>
      </div>

      ${pr.viewing ? renderProfile(pr.viewing) : ''}

      ${pr.results.length > 0 && !pr.viewing ? `
      <div class="panel">
        <div class="panel-title">📋 Kết quả (${pr.results.length})</div>
        <div class="panel-body no-pad">
          ${pr.results.map(p => `
            <div class="list-item" style="padding:8px 14px;display:flex;align-items:center;gap:10px;cursor:pointer" data-view="${p.id}">
              <div style="flex:1">
                <div style="font-weight:600">${p.name}</div>
                <div style="font-size:11px;opacity:0.5">Lv${p.level} · Realm T${p.realm_tier || '?'}</div>
              </div>
              <button class="btn btn--sm btn--dark btn-view" data-vid="${p.id}">👁 Xem</button>
            </div>
          `).join('')}
        </div>
      </div>
      ` : (!pr.viewing && pr.searchQuery ? '<div style="text-align:center;opacity:0.3;padding:20px">Không tìm thấy</div>' : '')}
    `
    bindEvents()
  }

  function renderProfile(p) {
    const isMe = p.id === pid
    const hpPct = p.maxHp > 0 ? Math.round((p.currentHp / p.maxHp) * 100) : 100
    const areaNames = {
      'thanh_lam_tran': 'Thanh Lam Trấn', 'hac_phong_lam': 'Hắc Phong Lâm',
      'vong_linh_coc': 'Vong Linh Cốc', 'thiet_huyet_son': 'Thiết Huyết Sơn',
      'bac_suong_canh': 'Bắc Sương Cảnh',
    }
    return `
      <div class="panel glass" style="margin-bottom:12px">
        <div class="panel-body" style="padding:16px">
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:12px">
            <div style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--orange));display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:bold;color:#111">
              ${p.name[0]?.toUpperCase() || '?'}
            </div>
            <div style="flex:1">
              <div style="font-size:18px;font-weight:700">${p.name}</div>
              <div style="font-size:12px;opacity:0.6">
                Lv.${p.level} · ${p.realmInfo?.fullName || 'Phàm Nhân'}
                ${p.guild ? ` · <span style="color:var(--blue)">[${p.guild.tag}] ${p.guild.guild_name}</span>` : ''}
              </div>
              <div style="font-size:11px;opacity:0.4;margin-top:2px">
                📍 ${areaNames[p.currentArea] || p.currentArea}
                ${p.housingTier > 0 ? ` · 🏠 T${p.housingTier}` : ''}
                · 📜 ${p.skills} kỹ năng · ⚔ ${p.items} vật phẩm
              </div>
            </div>
          </div>

          <div style="margin-bottom:10px">
            <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px">
              <span>❤️ Khí Huyết</span><span>${p.currentHp}/${p.maxHp}</span>
            </div>
            <div style="height:6px;background:rgba(255,255,255,0.05);border-radius:3px;overflow:hidden">
              <div style="height:100%;width:${hpPct}%;background:${hpPct > 30 ? 'var(--green)' : 'var(--red)'};border-radius:3px;transition:width 0.3s"></div>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:12px">
            <div style="background:rgba(255,255,255,0.03);border-radius:6px;padding:6px;text-align:center">
              <div style="font-size:11px;opacity:0.4">💪 STR</div>
              <div style="font-weight:700;color:var(--red)">${p.stats.strength}</div>
            </div>
            <div style="background:rgba(255,255,255,0.03);border-radius:6px;padding:6px;text-align:center">
              <div style="font-size:11px;opacity:0.4">⚡ SPD</div>
              <div style="font-weight:700;color:var(--blue)">${p.stats.speed}</div>
            </div>
            <div style="background:rgba(255,255,255,0.03);border-radius:6px;padding:6px;text-align:center">
              <div style="font-size:11px;opacity:0.4">🎯 DEX</div>
              <div style="font-weight:700;color:var(--orange)">${p.stats.dexterity}</div>
            </div>
            <div style="background:rgba(255,255,255,0.03);border-radius:6px;padding:6px;text-align:center">
              <div style="font-size:11px;opacity:0.4">🛡 DEF</div>
              <div style="font-weight:700;color:var(--green)">${p.stats.defense}</div>
            </div>
          </div>

          <div style="font-size:12px;margin-bottom:12px">💰 Linh thạch: <strong style="color:var(--gold)">${p.gold?.toLocaleString()} 💎</strong></div>

          ${!isMe ? `
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            <button class="btn btn--red btn--sm" id="btnAttack" data-tid="${p.id}">⚔️ Tấn Công</button>
            <button class="btn btn--green btn--sm" id="btnAddFriend" data-tid="${p.id}">🤝 Kết Bạn</button>
            <button class="btn btn--dark btn--sm" id="btnBackSearch">◀ Quay lại</button>
          </div>
          ` : '<div style="opacity:0.3;text-align:center;font-size:12px">Đây là bạn!</div>'}
        </div>
      </div>
    `
  }

  function bindEvents() {
    document.getElementById('btnSearch')?.addEventListener('click', doSearch)
    document.getElementById('searchInput')?.addEventListener('keydown', e => {
      if (e.key === 'Enter') doSearch()
    })

    document.querySelectorAll('.btn-view, [data-view]').forEach(el => {
      el.addEventListener('click', async () => {
        const targetId = el.dataset.vid || el.dataset.view
        try {
          const data = await api.getPlayerProfile(targetId)
          pr.viewing = data.profile
          render()
        } catch (e) { notify(e.message, 'error') }
      })
    })

    document.getElementById('btnAttack')?.addEventListener('click', async () => {
      const tid = document.getElementById('btnAttack').dataset.tid
      if (!confirm(`Tấn công ${pr.viewing.name}?`)) return
      try {
        const data = await api.mugPlayer(pid, tid)
        notify(data.message, data.won ? 'success' : 'error')
        if (data.player) { state.player = data.player; updateSidebar() }
      } catch (e) { notify(e.message, 'error') }
    })

    document.getElementById('btnAddFriend')?.addEventListener('click', async () => {
      const tid = document.getElementById('btnAddFriend').dataset.tid
      try {
        const data = await api.addFriend(pid, tid)
        notify(data.message || 'Đã gửi lời mời!', 'success')
      } catch (e) { notify(e.message, 'error') }
    })

    document.getElementById('btnBackSearch')?.addEventListener('click', () => {
      pr.viewing = null
      render()
    })
  }

  async function doSearch() {
    const input = document.getElementById('searchInput')
    const q = input?.value?.trim()
    if (!q || q.length < 2) return notify('Nhập ít nhất 2 ký tự!', 'error')
    pr.searchQuery = q
    pr.viewing = null
    try {
      const data = await api.searchPlayers(q)
      pr.results = data.players || []
      render()
    } catch (e) { notify(e.message, 'error') }
  }

  render()
}
