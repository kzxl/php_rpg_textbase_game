/**
 * Stats Page — View and allocate battle stats
 */
export function pageStats(el, ctx) {
  const { state, api, notify, renderGame } = ctx
  const p = state.player, s = p.stats, a = p.allocatedStats || {}
  const has = p.statPoints > 0

  const stats = [
    ['strength', '💪', 'Sức mạnh'],
    ['speed', '🏃', 'Tốc độ'],
    ['dexterity', '🎯', 'Khéo léo'],
    ['defense', '🛡', 'Phòng thủ'],
  ]

  el.innerHTML = `
    <div class="page-header">
      <h1>📊 Chỉ số chiến đấu</h1>
      ${has ? `<div class="actions"><span class="text-gold">✦ ${p.statPoints} điểm chưa phân bổ</span></div>` : ''}
    </div>
    <div class="panel">
      <div class="panel-title">Battle Stats</div>
      <div class="panel-body no-pad">
        ${stats.map(([key, icon, name]) => `
          <div class="stat-row">
            <div class="stat-label"><span class="stat-icon">${icon}</span> ${name}</div>
            <div class="stat-val">
              ${s[key] ?? 0}
              ${a[key] > 0 ? `<span class="bonus">(+${a[key]})</span>` : ''}
              ${has ? `<button class="allocate-btn" data-stat="${key}">+</button>` : ''}
            </div>
          </div>
        `).join('')}
        <div class="derived-row">
          <div class="d-item"><div class="d-val">${s.maxHp ?? 100}</div><div class="d-label">Max HP</div></div>
          <div class="d-item"><div class="d-val">${s.maxEnergy ?? 50}</div><div class="d-label">🔮 Linh lực</div></div>
          <div class="d-item"><div class="d-val">+${s.energyRegen ?? 5}/t</div><div class="d-label">Hồi/lượt</div></div>
        </div>
        <div class="derived-row">
          <div class="d-item"><div class="d-val">${s.critChance ?? 5}%</div><div class="d-label">Chí mạng</div></div>
          <div class="d-item"><div class="d-val">×${s.critMultiplier ?? 1.5}</div><div class="d-label">Hệ số CM</div></div>
          <div class="d-item"><div class="d-val">10</div><div class="d-label">🔵 Chi phí/đòn</div></div>
        </div>
      </div>
    </div>`

  el.querySelectorAll('.allocate-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation()
      try {
        const data = await api.allocateStat(state.playerId, btn.dataset.stat)
        state.player = data.player
        notify(data.message, 'success')
        renderGame()
      } catch (e2) { notify('Lỗi phân bổ', 'error') }
    })
  })
}
