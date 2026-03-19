/**
 * Skills Page — Learn and view skills
 */
export function pageSkills(el, ctx) {
  const { state, api, notify } = ctx
  const learned = state.player.skills || []
  const learnedIds = learned.map(s => s.id)
  const available = state.skills.filter(s => !learnedIds.includes(s.id))

  el.innerHTML = `
    <div class="page-header"><h1>⚡ Kỹ năng</h1></div>

    <div class="panel">
      <div class="panel-title">Đã học (${learned.length})</div>
      <div class="panel-body no-pad">
        ${learned.length === 0 ? '<div style="padding:14px" class="text-dim">Chưa có kỹ năng nào</div>' :
          learned.map(s => `
            <div class="list-item">
              <div class="item-info">
                <div class="item-name">${s.name}</div>
                <div class="item-meta">${s.type === 'passive' ? '🔮 Nội công' : `⚡ Chiêu thức · 🔵${s.cost || 0} linh lực`}${s.description ? ' · ' + s.description : ''}</div>
              </div>
            </div>
          `).join('')}
      </div>
    </div>

    <div class="panel">
      <div class="panel-title">Có thể học (${available.length})</div>
      <div class="panel-body no-pad">
        ${available.map(s => `
          <div class="list-item">
            <div class="item-info">
              <div class="item-name">${s.name}</div>
              <div class="item-meta">${s.type === 'passive' ? '🔮 Nội công' : `⚡ Chiêu thức · 🔵${s.cost || 0} linh lực`}${s.description ? ' · ' + s.description : ''}</div>
            </div>
            <button class="btn btn--sm" data-sid="${s.id}">Học</button>
          </div>
        `).join('')}
      </div>
    </div>`

  el.querySelectorAll('[data-sid]').forEach(btn => {
    btn.addEventListener('click', async () => {
      try {
        const data = await api.learnSkill(state.playerId, btn.dataset.sid)
        state.player = data.player
        notify(data.message, 'success')
        pageSkills(el, ctx)
      } catch (e) { notify('Lỗi học kỹ năng', 'error') }
    })
  })
}
