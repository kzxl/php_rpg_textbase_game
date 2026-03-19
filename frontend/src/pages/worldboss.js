/**
 * World Boss — Boss Thế Giới (full combat, no hospital penalty)
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
        <p class="page-sub">Liên kết đánh Boss. Phần thưởng chia theo sát thương đóng góp. <strong>Không phạt tịnh dưỡng!</strong></p>
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

      <div id="bossCombatResult"></div>

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
      const btn = document.getElementById('btnAttackBoss')
      btn.disabled = true
      btn.textContent = '⏳ Đang giao chiến...'
      const rEl = document.getElementById('bossCombatResult')

      try {
        const r = await api.attackWorldBoss(pid)
        state.player = r.player; updateSidebar()

        // Render combat log like exploration combat
        if (r.log && r.log.length > 0) {
          const logHtml = r.log.map(l => {
            if (l.startsWith('---')) return `<div class="turn">${l}</div>`
            if (l.includes('hụt')) return `<div class="miss">${l}</div>`
            if (l.includes('né được')) return `<div class="dodge">${l}</div>`
            if (l.includes('CHÍNH MẠNG') || l.includes('💥')) return `<div class="crit">${l}</div>`
            if (l.includes('🔥')) return `<div class="heavy text-orange">${l}</div>`
            if (l.includes('chặn hoàn toàn') || l.includes('🛡')) return `<div class="dodge">${l}</div>`
            if (l.includes('ngã xuống') || l.includes('💀')) return `<div class="death">${l}</div>`
            if (l.includes('Chiến thắng') || l.includes('🏆')) return `<div class="victory">${l}</div>`
            if (l.includes('bỏ chạy') || l.includes('🏃')) return `<div class="flee">${l}</div>`
            if (l.includes('Bất phân') || l.includes('🤝')) return `<div class="stalemate">${l}</div>`
            if (l.includes('🧪')) return `<div class="status-effect text-purple">${l}</div>`
            if (l.includes('💔')) return `<div class="dot-damage text-purple bold">${l}</div>`
            if (l.includes('✨')) return `<div class="regen text-green">${l}</div>`
            return `<div class="hit">${l}</div>`
          }).join('')

          const outcomeMap = {
            'win': { icon: '🏆', text: 'Chiến thắng', cls: 'win' },
            'loss': { icon: '💀', text: 'Hết sức (Không phạt)', cls: 'lose' },
            'stalemate': { icon: '⏰', text: 'Bất phân thắng bại', cls: 'draw' },
            'flee': { icon: '🏃', text: 'Thoát thân', cls: 'flee' },
          }
          const oc = outcomeMap[r.outcome] || outcomeMap['loss']

          const pHp = Math.max(0, (state.player.currentHp / state.player.maxHp) * 100)
          rEl.innerHTML = `
            <div class="panel mt-md" style="border-color:var(--red)">
              <div class="panel-title">${oc.icon} ${oc.text}
                <span class="subtitle">${r.turns}/${r.maxTurns || 25} lượt · ⚔️ ${r.damage} dmg cho Boss</span>
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
                    <div class="f-name monster-name">${boss.name}</div>
                    <div class="mini-hp-bar"><div class="fill hp" style="width:${(r.bossHp / r.bossMaxHp * 100).toFixed(1)}%"></div></div>
                    <div class="mini-hp-val">${r.bossHp.toLocaleString()}/${r.bossMaxHp.toLocaleString()}</div>
                  </div>
                </div>
              </div>
              <div class="combat-log">${logHtml}</div>
            </div>`
        }

        if (r.defeated) {
          notify(r.message, 'success')
        } else {
          notify(`⚔️ ${r.damage} dmg!`, 'info')
        }

        // Re-render boss info (HP bar, etc)
        await load()
      } catch (e) {
        notify(e.message, 'error')
        btn.disabled = false
        btn.textContent = '⚔️ Tấn Công'
      }
    })
  }

  load()
}
