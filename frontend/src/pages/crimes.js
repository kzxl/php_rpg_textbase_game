/**
 * Crimes Page — Nghịch Thiên / Phá Luật + Thiên Lao (Jail)
 */
export function pageCrimes(el, ctx) {
  const { state, api, notify, renderGame } = ctx
  const p = state.player
  const crimes = state.crimes || []
  const isJailed = (p.jailRemaining ?? 0) > 0

  if (isJailed) {
    const remaining = p.jailRemaining
    const bailCost = Math.max(10, 100 * Math.ceil(remaining / 60) * p.level)
    el.innerHTML = `
      <div class="page-header"><h1>🏛 Thiên Lao</h1></div>
      <div class="panel">
        <div class="panel-title">Trạng thái</div>
        <div class="panel-body" style="text-align:center">
          <div style="font-size:28px;color:var(--red);font-weight:700">⛓ Bị giam giữ</div>
          <div class="text-dim mt-sm">Thời gian còn lại: <strong style="color:var(--gold)">${remaining}s</strong></div>
          <div style="margin-top:16px;display:flex;gap:12px;justify-content:center">
            <button class="btn btn--blue" id="btnEscape">🏃 Vượt ngục (3 Nghịch Khí)</button>
            <button class="btn btn--gold" id="btnBail">💰 Bảo lãnh (${bailCost} Lính Thạch)</button>
          </div>
        </div>
      </div>`

    document.getElementById('btnEscape')?.addEventListener('click', async () => {
      try {
        const data = await api.escapeJail(state.playerId)
        state.player = data.player
        notify(data.message, data.success ? 'success' : 'error')
        renderGame()
      } catch (e) { notify(e.message || 'Lỗi', 'error') }
    })
    document.getElementById('btnBail')?.addEventListener('click', async () => {
      try {
        const data = await api.bail(state.playerId)
        state.player = data.player
        notify(data.message, data.success ? 'success' : 'error')
        renderGame()
      } catch (e) { notify(e.message || 'Lỗi', 'error') }
    })
    return
  }

  el.innerHTML = `
    <div class="page-header">
      <h1>💀 Nghịch Thiên – Phá Luật</h1>
      <div class="actions"><span class="text-dim">💀 ${p.nerve ?? 0}/${p.maxNerve ?? 15} Nghịch Khí · 💰 ${p.gold ?? 0} Lính Thạch</span></div>
    </div>
    <div class="panel">
      <div class="panel-title">Hành động</div>
      <div class="panel-body no-pad">
        ${crimes.map(c => {
          const cs = p.crimeSkills?.[c.id] ?? 0
          const locked = cs < (c.minSkill ?? 0)
          const canDo = !locked && (p.nerve ?? 0) >= c.nerveCost
          return `
            <div class="list-item">
              <div class="item-info">
                <div class="item-name">${c.icon} ${c.name} ${locked ? '🔒' : ''}</div>
                <div class="item-meta">
                  ${c.description} · ${c.nerveCost} Nghịch Khí
                  ${locked ? ` · Cần Skill ${c.minSkill}` : ` · Skill: ${cs}/100`}
                </div>
              </div>
              <button class="btn btn--sm ${canDo ? 'btn--red' : ''}" data-crime="${c.id}" ${canDo ? '' : 'disabled'}>
                ${locked ? '🔒' : 'Thực hiện'}
              </button>
            </div>`
        }).join('')}
      </div>
    </div>`

  el.querySelectorAll('[data-crime]').forEach(btn => {
    btn.addEventListener('click', async () => {
      try {
        const data = await api.commitCrime(state.playerId, btn.dataset.crime)
        state.player = data.player
        const type = data.outcome === 'success' ? 'success' : data.outcome === 'critical_fail' ? 'error' : 'info'
        notify(data.message, type)
        renderGame()
      } catch (e) { notify(e.message || 'Lỗi', 'error') }
    })
  })
}
