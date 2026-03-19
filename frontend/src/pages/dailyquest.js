/**
 * Daily Quests — Nhiệm Vụ Hàng Ngày
 */
export function pageDailyQuest(el, ctx) {
  const { state, api, notify, updateSidebar } = ctx
  const pid = state.playerId

  async function load() {
    try {
      const data = await api.getDailyQuests(pid)
      state._dailyQuests = data
      render()
    } catch (e) { notify(e.message, 'error') }
  }

  function render() {
    const d = state._dailyQuests || {}
    const quests = d.quests || []
    const allDone = d.allCompleted
    const bonus = d.bonusReward

    el.innerHTML = `
      <div class="page-header">
        <h2>📋 Nhiệm Vụ Hàng Ngày</h2>
        <p class="page-sub">Hoàn thành 3 nhiệm vụ mỗi ngày để nhận thưởng. Reset lúc 00:00.</p>
      </div>

      ${quests.map(q => {
        const info = q.quest_info || {}
        const pct = q.target > 0 ? Math.min(100, Math.round((q.progress / q.target) * 100)) : 0
        return `
        <div class="panel" style="margin-bottom:8px;border-left:3px solid ${q.claimed ? 'var(--text-dim)' : q.completed ? 'var(--green)' : 'var(--blue)'}">
          <div class="panel-body" style="padding:10px 14px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <div>
                <strong>${info.name || q.quest_id}</strong>
                <span class="badge" style="margin-left:6px;font-size:9px;background:${info.difficulty === 'Khó' ? 'var(--red)' : info.difficulty === 'Trung Bình' ? 'var(--orange)' : 'var(--green)'}">${info.difficulty || '?'}</span>
              </div>
              ${q.claimed ? '<span style="font-size:11px;opacity:0.4">✅ Đã nhận</span>' :
                q.completed ? `<button class="btn btn--green btn--sm btn-claim" data-qid="${q.id}">🎁 Nhận</button>` :
                `<span style="font-size:11px;opacity:0.5">${q.progress}/${q.target}</span>`}
            </div>
            <div style="font-size:11px;opacity:0.5;margin-bottom:6px">${info.desc || ''}</div>
            <div style="height:5px;background:rgba(255,255,255,0.05);border-radius:3px;overflow:hidden">
              <div style="height:100%;width:${pct}%;background:${q.completed ? 'var(--green)' : 'var(--blue)'};border-radius:3px;transition:width 0.3s"></div>
            </div>
            <div style="font-size:10px;opacity:0.4;margin-top:4px">💎 ${info.goldReward || 0} · ✨ ${info.xpReward || 0} EXP</div>
          </div>
        </div>`
      }).join('')}

      ${bonus ? `
      <div class="panel glass" style="text-align:center;padding:14px">
        <div style="font-size:14px;font-weight:700;color:var(--gold)">🎊 Hoàn thành tất cả!</div>
        <div style="font-size:12px;margin-top:4px">Bonus: +${bonus.gold} 💎, +${bonus.xp} EXP</div>
      </div>
      ` : ''}
    `

    el.querySelectorAll('.btn-claim').forEach(b => b.addEventListener('click', async () => {
      try {
        const r = await api.claimDailyQuest(pid, parseInt(b.dataset.qid))
        notify(r.message, 'success')
        state.player = r.player; updateSidebar()
        await load()
      } catch (e) { notify(e.message, 'error') }
    }))
  }

  load()
}
