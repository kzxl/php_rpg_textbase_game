/**
 * Tông Môn (Guild) — Create, join, contribute, upgrade
 */
export function pageGuild(el, ctx) {
  const { state, api, notify, updateSidebar } = ctx
  const pid = state.playerId

  if (!state._guild) state._guild = { data: null, loaded: false, allGuilds: null }
  const g = state._guild

  async function loadData() {
    try {
      g.data = await api.getMyGuild(pid)
      g.loaded = true
      render()
    } catch (e) { notify(e.message || 'Lỗi', 'error') }
  }

  async function loadAllGuilds() {
    try {
      const res = await api.listGuilds()
      g.allGuilds = res.guilds || []
      render()
    } catch (e) { notify(e.message, 'error') }
  }

  function render() {
    const d = g.data
    el.innerHTML = `
      <div class="page-header">
        <h2>🏯 Tông Môn</h2>
        <p class="page-sub">Lập hoặc gia nhập Tông Môn. Cùng nhau tu luyện, nhận buff toàn đội.</p>
      </div>

      ${d?.inGuild ? renderGuild(d) : renderNoGuild(d)}
    `
    bindEvents()
  }

  function renderNoGuild(d) {
    return `
      <div class="panel" style="margin-bottom:12px">
        <div class="panel-title">🏗️ Lập Tông Môn Mới</div>
        <div class="panel-body" style="padding:14px 16px">
          <div style="display:grid;gap:8px;max-width:360px">
            <input type="text" id="guildName" placeholder="Tên Tông Môn (2-30 ký tự)" class="input" style="padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px">
            <input type="text" id="guildTag" placeholder="Tag (2-5 ký tự, VD: TMQ)" class="input" maxlength="5" style="padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px">
            <textarea id="guildDesc" placeholder="Mô tả..." rows="2" style="padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px;resize:none"></textarea>
            <button class="btn btn--gold" id="btnCreate">🏯 Lập Tông Môn (${d?.createCost || 10000} 💎)</button>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title flex justify-between">
          <span>📋 Danh Sách Tông Môn</span>
          <button class="btn btn--sm btn--dark" id="btnLoadGuilds">🔄 Tải</button>
        </div>
        <div class="panel-body no-pad" id="guildList">
          ${g.allGuilds ? g.allGuilds.map(gg => `
            <div class="list-item" style="padding:8px 14px;display:flex;align-items:center;gap:10px">
              <div style="flex:1">
                <div style="font-weight:600">[${gg.tag}] ${gg.name}</div>
                <div style="font-size:11px;opacity:0.5">Lv${gg.level} · ${gg.member_count}/${gg.max_members} · Quỹ: ${gg.treasury} 💎 · Chưởng Môn: ${gg.leader_name}</div>
              </div>
              <button class="btn btn--sm btn--green btn-join" data-gid="${gg.id}" ${gg.member_count >= gg.max_members ? 'disabled' : ''}>
                ${gg.member_count >= gg.max_members ? 'Đầy' : 'Gia nhập'}
              </button>
            </div>
          `).join('') : '<div style="padding:20px;text-align:center;opacity:0.3">Nhấn "Tải" để xem danh sách</div>'}
        </div>
      </div>
    `
  }

  function renderGuild(d) {
    const gu = d.guild
    const mem = d.members || []
    const log = d.log || []

    return `
      <div class="panel glass" style="margin-bottom:12px">
        <div class="panel-body" style="display:flex;align-items:center;gap:16px;padding:14px 16px">
          <div style="font-size:36px">🏯</div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:16px">[${gu.tag}] ${gu.name} <span style="opacity:0.3">Lv${gu.level}</span></div>
            <div style="font-size:12px;opacity:0.6">${gu.levelInfo?.name || ''} · ${gu.memberCount}/${gu.maxMembers} thành viên</div>
            <div style="font-size:12px;margin-top:3px">
              💰 Quỹ: <strong style="color:var(--gold)">${gu.treasury} 💎</strong>
              · Phí duy trì: <span style="color:var(--orange)">${gu.dailyUpkeep}/ngày</span>
              ${gu.upkeepDue ? ' · <span style="color:var(--red)">⚠️ Chưa nộp phí!</span>' : ''}
            </div>
            ${Object.keys(gu.buffs || {}).length > 0 ? `
              <div style="font-size:11px;margin-top:3px;color:var(--green)">
                Buff: ${Object.entries(gu.buffs).map(([k,v]) => `${k} +${v}%`).join(', ')}
              </div>
            ` : ''}
          </div>
          <div style="display:flex;flex-direction:column;gap:4px">
            ${d.myRole === 'leader' && gu.nextLevel ? `<button class="btn btn--sm btn--gold" id="btnUpgradeGuild" title="Nâng lên ${gu.nextLevel.name}">⬆ ${gu.nextLevel.upgradeCost} 💎</button>` : ''}
            ${d.myRole === 'leader' && gu.upkeepDue ? `<button class="btn btn--sm btn--orange" id="btnPayUpkeep">💰 Nộp phí</button>` : ''}
          </div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">
        <div class="panel">
          <div class="panel-title">💰 Đóng Góp</div>
          <div class="panel-body" style="padding:12px;display:flex;gap:6px;align-items:center">
            <input type="number" id="contributeAmt" value="100" min="1" style="flex:1;padding:6px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:4px">
            <button class="btn btn--sm btn--gold" id="btnContribute">💎 Đóng góp</button>
          </div>
          <div style="padding:0 12px 10px;font-size:11px;opacity:0.4">
            Bạn đã đóng: ${d.myContributed} 💎 · Vai trò: ${d.myRole === 'leader' ? '👑 Chưởng Môn' : d.myRole === 'elder' ? '⭐ Trưởng Lão' : '🙋 Đệ Tử'}
          </div>
        </div>

        <div class="panel">
          <div class="panel-title">📜 Nhật Ký</div>
          <div class="panel-body" style="max-height:160px;overflow-y:auto;padding:8px 12px">
            ${log.slice(0, 10).map(l => `
              <div style="font-size:11px;padding:2px 0;border-bottom:1px solid rgba(255,255,255,0.03)">
                <span style="opacity:0.4">${new Date(l.created_at).toLocaleString('vi')}</span>
                ${l.detail || l.action}
              </div>
            `).join('') || '<div style="opacity:0.3">Chưa có hoạt động</div>'}
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">👥 Thành Viên (${mem.length}/${gu.maxMembers})</div>
        <div class="panel-body no-pad" style="max-height:250px;overflow-y:auto">
          ${mem.map(m => `
            <div class="list-item" style="padding:6px 14px;display:flex;align-items:center;gap:8px">
              <span style="font-size:14px">${m.role === 'leader' ? '👑' : m.role === 'elder' ? '⭐' : '🙋'}</span>
              <div style="flex:1">
                <span style="font-weight:500">${m.name}</span>
                <span style="font-size:10px;opacity:0.4;margin-left:6px">Đóng góp: ${m.contributed} 💎</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      ${d.myRole !== 'leader' ? '<button class="btn btn--sm btn--red" id="btnLeave" style="margin-top:10px">🚪 Rời Tông Môn</button>' : ''}
    `
  }

  function bindEvents() {
    document.getElementById('btnCreate')?.addEventListener('click', async () => {
      const name = document.getElementById('guildName')?.value?.trim()
      const tag = document.getElementById('guildTag')?.value?.trim()
      const desc = document.getElementById('guildDesc')?.value?.trim()
      if (!name || !tag) return notify('Nhập tên và tag!', 'error')
      try {
        const res = await api.createGuild(pid, name, tag, desc)
        notify(res.message, 'success')
        state.player = res.player; updateSidebar()
        g.loaded = false; await loadData()
      } catch (e) { notify(e.message, 'error') }
    })

    document.getElementById('btnLoadGuilds')?.addEventListener('click', loadAllGuilds)

    document.querySelectorAll('.btn-join').forEach(btn => {
      btn.addEventListener('click', async () => {
        try {
          const res = await api.joinGuild(pid, parseInt(btn.dataset.gid))
          notify(res.message, 'success')
          g.loaded = false; await loadData()
        } catch (e) { notify(e.message, 'error') }
      })
    })

    document.getElementById('btnContribute')?.addEventListener('click', async () => {
      const amt = parseInt(document.getElementById('contributeAmt')?.value || 0)
      if (amt <= 0) return
      try {
        const res = await api.contributeGuild(pid, amt)
        notify(res.message, 'success')
        state.player = res.player; updateSidebar()
        await loadData()
      } catch (e) { notify(e.message, 'error') }
    })

    document.getElementById('btnUpgradeGuild')?.addEventListener('click', async () => {
      if (!confirm('Nâng cấp Tông Môn? Dùng tiền quỹ.')) return
      try {
        const res = await api.upgradeGuild(pid)
        notify(res.message, 'success')
        await loadData()
      } catch (e) { notify(e.message, 'error') }
    })

    document.getElementById('btnPayUpkeep')?.addEventListener('click', async () => {
      try {
        const res = await api.payGuildUpkeep(g.data.guild.id)
        notify(res.message, 'success')
        await loadData()
      } catch (e) { notify(e.message, 'error') }
    })

    document.getElementById('btnLeave')?.addEventListener('click', async () => {
      if (!confirm('Rời Tông Môn?')) return
      try {
        const res = await api.leaveGuild(pid)
        notify(res.message, 'success')
        g.loaded = false; await loadData()
      } catch (e) { notify(e.message, 'error') }
    })
  }

  if (!g.loaded) loadData()
  else render()
}
