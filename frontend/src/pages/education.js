/**
 * Education Page — Tu Luyện (courses)
 */
export function pageEducation(el, ctx) {
  const { state, api, notify, renderGame } = ctx
  const p = state.player
  const courses = state.courses || []
  const completed = p.completedCourses || []
  const studying = p.currentCourse || ''
  const remaining = p.courseRemaining ?? 0

  el.innerHTML = `
    <div class="page-header"><h1>📜 Tu Luyện</h1></div>

    ${studying ? `
    <div class="panel">
      <div class="panel-title">📖 Đang học</div>
      <div class="panel-body" style="text-align:center">
        <div style="font-size:20px;font-weight:700;color:var(--gold)">${courses.find(c => c.id === studying)?.name ?? studying}</div>
        <div class="text-dim mt-sm">⏳ Còn lại: <strong>${remaining}s</strong></div>
        <button class="btn btn--green mt-sm" id="btnCheckEdu" ${remaining > 0 ? 'disabled' : ''}>
          ${remaining > 0 ? 'Đang học...' : '✅ Nhận kết quả'}
        </button>
      </div>
    </div>` : ''}

    <div class="panel">
      <div class="panel-title">Danh sách môn học (${completed.length}/${courses.length} hoàn thành)</div>
      <div class="panel-body no-pad">
        ${courses.map(c => {
          const done = completed.includes(c.id)
          const prereqMet = (c.prerequisites || []).every(p => completed.includes(p))
          const canEnroll = !done && !studying && prereqMet
          return `
            <div class="list-item">
              <div class="item-info">
                <div class="item-name">${c.icon} ${c.name} ${done ? '✅' : ''}</div>
                <div class="item-meta">
                  ${c.description} · ${c.duration}s · ${c.bonusDescription}
                  ${!prereqMet ? ` · 🔒 Cần: ${c.prerequisites.join(', ')}` : ''}
                </div>
              </div>
              <button class="btn btn--sm ${canEnroll ? 'btn--blue' : ''}" data-enroll="${c.id}" ${canEnroll ? '' : 'disabled'}>
                ${done ? '✅' : canEnroll ? 'Học' : '🔒'}
              </button>
            </div>`
        }).join('')}
      </div>
    </div>`

  document.getElementById('btnCheckEdu')?.addEventListener('click', async () => {
    try {
      const data = await api.checkEducation(state.playerId)
      state.player = data.player
      notify(data.message, data.completed ? 'success' : 'info')
      renderGame()
    } catch (e) { notify(e.message || 'Lỗi', 'error') }
  })

  el.querySelectorAll('[data-enroll]').forEach(btn => {
    btn.addEventListener('click', async () => {
      try {
        const data = await api.enrollCourse(state.playerId, btn.dataset.enroll)
        state.player = data.player
        notify(data.message, 'success')
        renderGame()
      } catch (e) { notify(e.message || 'Lỗi', 'error') }
    })
  })
}
