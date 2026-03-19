/**
 * Stats Page — Rèn Luyện & Cảnh Giới
 * Training only (no manual stat point allocation — auto-distributed on level-up)
 */
export function pageStats(el, ctx) {
  const { state, api, notify, renderGame } = ctx
  const p = state.player, s = p.stats, a = p.allocatedStats || {}
  const energyCost = 5
  const canTrain = p.currentEnergy >= energyCost && !p.hospitalRemaining
  const td = p.talentDisplay || {}

  const stats = [
    ['strength', '💪', 'Sức mạnh', 'Tăng sát thương mỗi đòn'],
    ['speed', '🏃', 'Tốc độ', 'Tăng hit chance, giảm escape'],
    ['dexterity', '🎯', 'Khéo léo', 'Tăng dodge, escape, stealth'],
    ['defense', '🛡', 'Phòng thủ', 'Giảm sát thương nhận vào'],
  ]

  el.innerHTML = `
    <div class="page-header">
      <h1>🏋 Rèn Luyện & Cảnh Giới</h1>
      <div class="actions">
        <span class="text-dim">🔮 ${p.currentEnergy}/${p.maxEnergy} linh lực · Chi phí: ${energyCost}/lần</span>
      </div>
    </div>

    ${p.hospitalRemaining > 0 ? `<div class="panel"><div class="panel-body text-red" style="text-align:center">🏥 Đang tịnh dưỡng! Còn ${p.hospitalRemaining}s</div></div>` : ''}

    <div class="panel glass" style="margin-bottom:12px">
      <div class="panel-body flex justify-between" style="align-items:center">
        <div>
          <div class="text-sm text-dim mb-xs">Cảnh Giới Hiện Tại</div>
          <div class="text-xl text-gold bold" style="text-shadow:0 0 10px rgba(255,215,0,0.3)">
            🌟 ${p.realmInfo?.fullName || 'Phàm Nhân'}
          </div>
        </div>
        <div>
          ${p.realmInfo?.canBreakthrough 
            ? `<button class="btn btn--gold btn--lg shadow-glow btn-breakthrough" style="animation:pulse 2s infinite">⚡ Đột Phá Cảnh Giới!</button>` 
            : `<div class="text-sm text-dim" style="opacity:0.6">Chưa đủ điều kiện đột phá</div>`}
        </div>
      </div>
    </div>

    <div class="panel" style="margin-bottom:12px">
      <div class="panel-title">🧬 Căn Cốt Thiên Phú</div>
      <div class="panel-body" style="padding:12px 16px">
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;text-align:center">
          ${stats.map(([key, icon, name]) => {
            const t = td[key] || { value: 1.0, name: 'Phàm Cốt', icon: '⚪', color: '#ccc' }
            return `
              <div style="background:rgba(255,255,255,0.03);border:1px solid ${t.color}44;border-radius:8px;padding:10px 8px">
                <div style="font-size:18px">${icon}</div>
                <div style="font-size:11px;opacity:0.6;margin-top:2px">${name}</div>
                <div style="font-size:14px;font-weight:700;color:${t.color};margin-top:4px">${t.icon} ${t.name}</div>
                <div style="font-size:11px;color:${t.color};opacity:0.8">×${t.value} hệ số</div>
              </div>
            `
          }).join('')}
        </div>
        <div style="text-align:center;margin-top:8px;font-size:11px;opacity:0.4">
          Dùng 🧬 Tẩy Tủy Đan để tăng bậc ngẫu nhiên · 🔮 Hoán Cốt Đan để reroll toàn bộ
        </div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-title">⚔️ Rèn Luyện Chỉ Số</div>
      <div class="panel-body no-pad">
        ${stats.map(([key, icon, name, desc]) => {
          const t = td[key] || { value: 1.0, name: 'Phàm Cốt', icon: '⚪', color: '#ccc' }
          const maxTrain = Math.floor(p.currentEnergy / energyCost) || 0
          return `
          <div class="stat-row" style="padding:12px 16px">
            <div class="stat-label">
              <span class="stat-icon">${icon}</span> ${name}
              <div style="font-size:10px;opacity:0.45;margin-top:1px;font-weight:400">${desc}</div>
            </div>
            <div class="stat-val flex items-center gap-3">
              <span style="min-width:40px; text-align:right; font-weight:700">${s[key] ?? 0}</span>
              ${a[key] > 0 ? `<span class="text-green" style="font-size:12px; min-width:30px">(+${a[key]})</span>` : `<span style="min-width:30px"></span>`}
              <span style="font-size:10px;color:${t.color};min-width:50px" title="Căn Cốt: ${t.name} (×${t.value})">${t.icon}×${t.value}</span>
              <input type="number" class="train-count" data-stat="${key}" min="1" max="${maxTrain}" value="1" style="width:50px;padding:3px 6px;border-radius:4px;border:1px solid rgba(255,255,255,0.15);background:rgba(0,0,0,0.3);color:#fff;text-align:center;font-size:12px" ${canTrain ? '' : 'disabled'}>
              <button class="btn btn--sm ${canTrain ? 'btn--blue' : 'btn--dark'} train-btn" data-train="${key}" ${canTrain ? '' : 'disabled'} title="Tốn ${energyCost} Linh lực/lần · Căn cốt ×${t.value}">Rèn Luyện</button>
            </div>
          </div>
        `}).join('')}
        <div style="padding:8px 16px;font-size:11px;opacity:0.4;border-top:1px solid rgba(255,255,255,0.05)">
          💡 Rèn luyện tốn <strong>${energyCost} linh lực</strong> / lần. Hiệu quả nhân với hệ số căn cốt. Tối đa <strong>${Math.floor(p.currentEnergy / energyCost)}</strong> lần hiện tại.
        </div>
        <div class="derived-row mt-3 border-t border-dim pt-3">
          <div class="d-item"><div class="d-val">${s.maxHp ?? 100}</div><div class="d-label">Max HP</div></div>
          <div class="d-item"><div class="d-val">${s.maxEnergy ?? 50}</div><div class="d-label">🔮 Linh lực</div></div>
          <div class="d-item"><div class="d-val">+${s.energyRegen ?? 5}/t</div><div class="d-label">Hồi/lượt</div></div>
        </div>
        <div class="derived-row pb-3">
          <div class="d-item"><div class="d-val">${s.critChance ?? 5}%</div><div class="d-label">Chí mạng</div></div>
          <div class="d-item"><div class="d-val">×${s.critMultiplier ?? 1.5}</div><div class="d-label">Hệ số CM</div></div>
          <div class="d-item"><div class="d-val">10</div><div class="d-label">🔵 Khí/đòn</div></div>
        </div>
      </div>
    </div>`

  el.querySelector('.btn-breakthrough')?.addEventListener('click', async () => {
    try {
      const btn = el.querySelector('.btn-breakthrough')
      btn.disabled = true
      btn.innerHTML = 'Đang Độ Kiếp...'
      const data = await api.attemptBreakthrough(state.playerId)
      state.player = data.player
      notify(data.message, 'success')
      renderGame()
    } catch (e) {
      notify(e.message || 'Đột phá thất bại', 'error')
      const btn = el.querySelector('.btn-breakthrough')
      if (btn) { btn.disabled = false; btn.innerHTML = '⚡ Đột Phá Cảnh Giới!' }
    }
  })

  el.querySelectorAll('.train-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation()
      const countInput = el.querySelector(`.train-count[data-stat="${btn.dataset.train}"]`)
      const count = parseInt(countInput?.value) || 1
      try {
        const data = await api.trainStat(state.playerId, btn.dataset.train, count)
        state.player = data.player
        notify(data.message, 'success')
        renderGame()
      } catch (e2) { notify(e2.message || 'Lỗi rèn luyện', 'error') }
    })
  })
}
