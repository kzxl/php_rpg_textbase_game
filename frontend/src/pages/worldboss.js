/**
 * World Boss — Boss Thế Giới (multi-player, damage tracking)
 */
export function pageWorldBoss(el, ctx) {
  const { state, api, notify, updateSidebar } = ctx
  const pid = state.playerId

  async function load() {
    try { state._worldBoss = await api.getWorldBoss(); render() }
    catch (e) { notify(e.message, 'error') }
  }

  function render() {
    const d = state._worldBoss || {}
    const boss = d.boss || {}
    const hpPct = d.hpPercent || 0
    const top = d.topContributors || []
    const rewards = d.rewards || {}
    const alive = boss.status === 'active' && boss.current_hp > 0

    el.innerHTML = `
      <div class="page-header">
        <h2>🐉 Boss Thế Giới</h2>
        <p class="page-sub">Liên kết đánh Boss. Phần thưởng chia theo sát thương đóng góp.</p>
      </div>

      <div class="panel glass" style="margin-bottom:10px">
        <div class="panel-body" style="padding:16px;text-align:center">
          <div style="font-size:36px;margin-bottom:8px">${alive ? '🐉' : '💀'}</div>
          <div style="font-size:18px;font-weight:700">${boss.name || 'Đang tải...'}</div>
          <div style="font-size:12px;opacity:0.5">Lv${boss.level || '?'} · ${alive ? 'ĐANG HOẠT ĐỘNG' : 'ĐÃ BỊ ĐÁNH BẠI'}</div>
          <div style="margin:12px auto;max-width:300px">
            <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px">
              <span>❤️ HP</span><span>${(boss.current_hp || 0).toLocaleString()} / ${(boss.max_hp || 0).toLocaleString()}</span>
            </div>
            <div style="height:10px;background:rgba(255,0,0,0.1);border-radius:5px;overflow:hidden">
              <div style="height:100%;width:${hpPct}%;background:${hpPct > 50 ? 'var(--red)' : hpPct > 20 ? 'var(--orange)' : 'var(--green)'};border-radius:5px;transition:width 0.3s"></div>
            </div>
          </div>
          ${alive ? `<button class="btn btn--red btn--lg" id="btnAttackBoss">⚔️ Tấn Công (5 Thể Lực)</button>` :
            '<div style="color:var(--gold);margin-top:8px">🎉 Boss đã bị đánh bại! Phần thưởng đã phát.</div>'}
          <div style="font-size:11px;opacity:0.4;margin-top:6px">Phần thưởng: 💎 ${rewards.gold || 0} · ✨ ${rewards.xp || 0} EXP (Top 3 x1.5)</div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">🏆 Top Đóng Góp</div>
        <div class="panel-body no-pad">
          ${top.length === 0 ? '<div style="padding:16px;opacity:0.3">Chưa ai đánh...</div>' :
            top.map((t, i) => `
              <div class="list-item" style="padding:6px 12px;font-size:12px">
                <span style="width:20px;font-weight:700;color:${i < 3 ? 'var(--gold)' : 'var(--text-dim)'}">#${i + 1}</span>
                <span style="flex:1">${t.name}</span>
                <span style="color:var(--red)">${t.total_damage?.toLocaleString()} dmg</span>
                <span style="opacity:0.4;margin-left:6px">(${t.hits} hits)</span>
              </div>
            `).join('')}
        </div>
      </div>
    `

    document.getElementById('btnAttackBoss')?.addEventListener('click', async () => {
      try {
        const r = await api.attackWorldBoss(pid)
        notify(r.message, r.defeated ? 'success' : 'info')
        state.player = r.player; updateSidebar()
        await load()
      } catch (e) { notify(e.message, 'error') }
    })
  }

  load()
}
