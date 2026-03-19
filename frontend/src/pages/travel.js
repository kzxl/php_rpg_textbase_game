/**
 * Travel Page — Torn-style area travel with countdown timer
 */
export function pageTravel(el, ctx) {
  const { state, api, notify, updateSidebar } = ctx
  loadTravel(el, ctx)
}

async function loadTravel(container, ctx) {
  const { state, api, notify, updateSidebar } = ctx
  container.innerHTML = '<div class="loading">Đang tải bản đồ...</div>'

  try {
    const [areasData, areaData] = await Promise.all([
      api.request('/data/areas'),
      api.request(`/player/${state.playerId}/area`),
    ])

    const areas = areasData.areas || []
    const currentArea = areaData.area
    const player = areaData.player
    const traveling = areaData.traveling || false
    const travelRemaining = areaData.travelRemaining || 0
    const travelDestination = areaData.travelDestination || ''

    if (areaData.message) notify(areaData.message, 'success')
    if (areaData.player) { state.player = areaData.player; updateSidebar() }

    container.innerHTML = `
      <div class="page-header"><h1>🗺️ Ngao Du</h1></div>

      ${traveling ? `
        <div class="panel">
          <div class="panel-body" style="text-align:center">
            <div style="font-size:24px;margin-bottom:8px">🚶</div>
            <strong>Đang di chuyển đến ${travelDestination}</strong>
            <div id="travelTimer" style="font-size:18px;color:var(--gold);margin:8px 0">⏳ ${travelRemaining}s</div>
            <div class="bar-track" style="margin-top:8px">
              <div class="bar-fill energy" id="travelBar" style="width:50%"></div>
            </div>
          </div>
        </div>
      ` : `
        <div class="panel">
          <div class="panel-title">📍 ${currentArea?.name || 'Không rõ'}</div>
          <div class="panel-body"><p class="text-dim">${currentArea?.description || ''}</p></div>
        </div>
      `}

      <div class="panel">
        <div class="panel-title">Danh sách khu vực</div>
        <div class="panel-body no-pad">
          ${areas.map(a => {
            const isHere = a.id === player.currentArea && !traveling
            const tooLow = player.level < (a.min_level || 1)
            const travelTime = parseInt(a.travel_time) || 0

            return `
              <div class="list-item ${isHere ? '' : (tooLow ? '' : 'clickable')}" ${!isHere && !tooLow && !traveling ? `data-travel="${a.id}"` : ''}>
                <div class="item-info">
                  <div class="item-name">
                    ${a.name}
                    ${isHere ? ' <span style="color:var(--green)">(đang ở đây)</span>' : ''}
                    ${tooLow ? ` <span style="color:var(--red)">[Lv.${a.min_level}+]</span>` : ''}
                  </div>
                  <div class="item-desc">${a.description || ''}</div>
                  <div class="item-meta">
                    <span>Lv.${a.min_level || 1}+</span>
                    <span>${travelTime > 0 ? '⏱ ' + travelTime + 's' : '⚡ Tức thời'}</span>
                  </div>
                </div>
                ${!isHere && !tooLow && !traveling ? `
                  <button class="btn btn--blue btn--sm" data-travel="${a.id}">
                    ${travelTime > 0 ? '🚶 Di chuyển' : '⚡ Đi'}
                  </button>
                ` : ''}
              </div>`
          }).join('')}
        </div>
      </div>`

    // Travel buttons
    container.querySelectorAll('[data-travel]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const areaId = btn.dataset.travel
        btn.disabled = true
        try {
          const res = await api.request(`/player/${state.playerId}/travel`, {
            method: 'POST',
            body: JSON.stringify({ areaId }),
          })
          if (res.player) { state.player = res.player; updateSidebar() }
          notify(res.message, 'success')
          loadTravel(container, ctx)
        } catch (e) {
          notify(e.message || 'Lỗi di chuyển!', 'error')
          btn.disabled = false
        }
      })
    })

    // Countdown timer
    if (traveling && travelRemaining > 0) {
      let remaining = travelRemaining
      const timer = setInterval(async () => {
        remaining--
        const timerEl = document.getElementById('travelTimer')
        if (timerEl) timerEl.textContent = `⏳ ${Math.max(0, remaining)}s`

        if (remaining <= 0) {
          clearInterval(timer)
          try {
            const check = await api.request(`/player/${state.playerId}/travel-check`, { method: 'POST' })
            if (check.player) { state.player = check.player; updateSidebar() }
            if (check.arrived) notify(check.message, 'success')
            loadTravel(container, ctx)
          } catch (e) {
            loadTravel(container, ctx)
          }
        }
      }, 1000)
    }

  } catch (e) {
    container.innerHTML = `<div class="panel"><div class="panel-body text-dim">Lỗi tải dữ liệu khu vực</div></div>`
    console.error(e)
  }
}
