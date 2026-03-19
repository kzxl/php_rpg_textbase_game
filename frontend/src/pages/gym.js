/**
 * Gym Page — Train stats (Lực Thể)
 */
export function pageGym(el, ctx) {
  const { state, api, notify, renderGame } = ctx
  const p = state.player
  const stats = [
    ['strength', '💪', 'Sức mạnh', 'Tăng sát thương mỗi đòn'],
    ['speed', '🏃', 'Tốc độ', 'Tăng hit chance, giảm escape của đối thủ'],
    ['dexterity', '🎯', 'Khéo léo', 'Tăng dodge, escape, stealth'],
    ['defense', '🛡', 'Phòng thủ', 'Giảm sát thương nhận vào'],
  ]
  const energyCost = 5
  const canTrain = p.currentEnergy >= energyCost && !p.hospitalRemaining

  el.innerHTML = `
    <div class="page-header">
      <h1>🏋 Rèn luyện</h1>
      <div class="actions"><span class="text-dim">🔮 ${p.currentEnergy}/${p.maxEnergy} linh lực · Chi phí: ${energyCost}/lần</span></div>
    </div>
    ${p.hospitalRemaining > 0 ? `<div class="panel"><div class="panel-body" style="text-align:center;color:var(--red)">🏥 Đang tịnh dưỡng, không thể rèn luyện! Còn ${p.hospitalRemaining}s</div></div>` : ''}
    <div class="panel">
      <div class="panel-title">Chọn chỉ số rèn luyện</div>
      <div class="panel-body no-pad">
        ${stats.map(([key, icon, name, desc]) => `
          <div class="list-item">
            <div class="item-info">
              <div class="item-name">${icon} ${name}</div>
              <div class="item-meta">${desc} · Hiện tại: <strong>${p.allocatedStats?.[key] ?? 0}</strong></div>
            </div>
            <button class="btn btn--sm ${canTrain ? 'btn--green' : ''}" data-train="${key}" ${canTrain ? '' : 'disabled'}>+1</button>
          </div>
        `).join('')}
      </div>
    </div>
    <div class="panel">
      <div class="panel-title">💡 Lưu ý</div>
      <div class="panel-body text-dim" style="font-size:12px">
        Mỗi lần rèn luyện tốn <strong>${energyCost} linh lực</strong> và tăng <strong>+1</strong> chỉ số đã chọn.<br>
        Linh lực hồi phục theo thời gian. Tập trung vào chỉ số phù hợp với lối chơi của bạn.
      </div>
    </div>`

  el.querySelectorAll('[data-train]').forEach(btn => {
    btn.addEventListener('click', async () => {
      try {
        const data = await api.trainStat(state.playerId, btn.dataset.train)
        state.player = data.player
        notify(data.message, 'success')
        renderGame()
      } catch (e) { notify(e.message || 'Lỗi rèn luyện', 'error') }
    })
  })
}
