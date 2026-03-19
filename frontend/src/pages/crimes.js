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

  const categoryMap = {
    theft: { label: '🧤 Trộm cắp', color: 'var(--blue)' },
    fraud: { label: '🎭 Gian trá', color: 'var(--purple)' },
    vandalism: { label: '🔥 Phá hoại', color: 'var(--orange)' },
    intel: { label: '🕶️ Tình báo', color: 'var(--cyan)' },
    trade: { label: '📦 Buôn bán', color: 'var(--green)' },
    explore: { label: '⚰️ Thám hiểm', color: 'var(--gold)' },
    combat: { label: '🗡️ Chiến đấu', color: 'var(--red)' },
    ritual: { label: '🩸 Nghi lễ', color: '#c0392b' },
  }
  const specialLabels = {
    unlock_hidden_event: '🔓 Mở content ẩn',
    rare_material_drop: '✨ Nguyên liệu hiếm',
    random_buff: '⬆️ Buff ngẫu nhiên',
    random_debuff: '⬇️ Debuff khi thất bại',
    boss_encounter: '🐉 Gặp Boss',
    epic_loot: '🏺 Bảo vật hiếm',
    legendary_drop: '💎 Cổ vật truyền thuyết',
  }

  el.innerHTML = `
    <div class="page-header">
      <h1>💀 Nghịch Thiên – Phá Luật</h1>
      <div class="actions"><span class="text-dim">💀 ${p.nerve ?? 0}/${p.maxNerve ?? 15} Nghịch Khí · 💰 ${p.gold ?? 0} Linh Thạch · 🏴 CE: ${p.crimeExp ?? 0}</span></div>
    </div>
    <div class="panel">
      <div class="panel-title">Hành động <span class="subtitle">${crimes.length} loại</span></div>
      <div class="panel-body no-pad">
        ${crimes.map(c => {
          const cs = p.crimeSkills?.[c.id] ?? 0
          const locked = cs < (c.minSkill ?? 0)
          const canDo = !locked && (p.nerve ?? 0) >= c.nerveCost
          const cat = categoryMap[c.category] || categoryMap.theft
          const specials = c.special || []
          const successEst = Math.min(95, c.baseSuccessRate + cs * 0.5)
          return `
            <div class="list-item crime-item ${locked ? 'crime-locked' : ''}">
              <div class="item-info">
                <div class="item-name" style="display:flex;align-items:center;gap:8px;">
                  <span style="font-size:18px">${c.icon}</span>
                  <span>${c.name}</span>
                  ${locked ? '<span style="opacity:0.5">🔒</span>' : ''}
                  <span class="badge" style="background:${cat.color};font-size:10px;padding:1px 6px;">${cat.label}</span>
                </div>
                <div class="item-desc">${c.description}</div>
                <div class="item-meta" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;">
                  <span>⚡ ${c.nerveCost} Khí</span>
                  <span>💰 ${c.rewards.goldMin}-${c.rewards.goldMax}</span>
                  <span style="color:${successEst >= 60 ? 'var(--green)' : successEst >= 40 ? 'var(--orange)' : 'var(--red)'}">🎯 ${Math.round(successEst)}%</span>
                  ${locked ? `<span style="color:var(--red)">Cần Skill ${c.minSkill}</span>` : `<span>📊 ${cs}/100</span>`}
                </div>
                ${specials.length > 0 ? `
                  <div style="margin-top:4px;display:flex;flex-wrap:wrap;gap:4px;">
                    ${specials.map(s => `<span class="badge" style="background:rgba(255,255,255,0.08);font-size:10px;padding:1px 5px;">${specialLabels[s] || s}</span>`).join('')}
                  </div>
                ` : ''}
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
