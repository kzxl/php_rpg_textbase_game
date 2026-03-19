/**
 * Travel Page — Torn-style area travel with 2D Map Visuals
 */
export function pageTravel(el, ctx) {
  const { state, api, notify, updateSidebar } = ctx
  loadTravel(el, ctx)
}

async function loadTravel(container, ctx) {
  const { state, api, notify, updateSidebar } = ctx
  container.innerHTML = '<div class="loading" style="padding:20px; text-align:center">Đang mở địa đồ...</div>'

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

    // Sort areas by MapY for proper z-index rendering (bottom elements render on top)
    const sortedAreas = [...areas].sort((a, b) => (a.mapY || 0) - (b.mapY || 0))

    container.innerHTML = `
      <div class="page-header">
        <h1>🗺️ Ngao Du Quần Vực</h1>
        <div class="text-sm text-dim">Tiêu tốn Hành Lực để băng qua các dải tinh vực.</div>
      </div>

      ${traveling ? `
        <div class="panel glass" style="border-color:var(--gold); box-shadow:0 0 20px rgba(255,215,0,0.1)">
          <div class="panel-body" style="text-align:center; padding: 24px">
            <div style="font-size:32px; margin-bottom:12px; animation:bounce 1s infinite">🚶</div>
            <strong style="font-size:16px">Đang tiến về ${travelDestination}</strong>
            <div id="travelTimer" style="font-size:24px; font-weight:bold; color:var(--gold); margin:12px 0; text-shadow:0 0 10px rgba(255,215,0,0.3)">⏳ ${travelRemaining}s</div>
            <div class="bar-track" style="margin-top:12px; height:8px">
              <div class="bar-fill energy" id="travelBar" style="width:100%; background:var(--gold); transition: width 1s linear"></div>
            </div>
          </div>
        </div>
      ` : `
        <div class="panel">
          <div class="panel-body flex items-center justify-between" style="padding: 12px 16px">
            <div>
              <div class="text-xs text-dim mb-xs">Vị trí hiện tại</div>
              <div class="text-lg text-green bold">📍 ${currentArea?.name || 'Không rõ'}</div>
            </div>
            <div class="text-sm text-dim" style="max-width:200px; text-align:right">
              ${currentArea?.description || ''}
            </div>
          </div>
        </div>
      `}

      <!-- 2D MAP VISUAL -->
      <div class="panel">
        <div class="panel-title">Thiên Địa Giới Đồ</div>
        <div class="panel-body no-pad" style="position:relative; width:100%; height:300px; background-color: #0f172a; background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 20px 20px; overflow:hidden; border-radius:0 0 8px 8px">
          
          <!-- Connective SVG Lines (Faux Routes) -->
          <svg style="position:absolute; top:0; left:0; width:100%; height:100%; z-index:0; pointer-events:none">
            <path d="M 50% 85% L 50% 50% L 80% 55% L 85% 30% L 80% 15%" stroke="rgba(255, 255, 255, 0.1)" stroke-width="2" fill="none" stroke-dasharray="4 4" />
            <path d="M 50% 85% L 35% 75% L 15% 45% L 30% 15% L 50% 5%" stroke="rgba(255, 255, 255, 0.1)" stroke-width="2" fill="none" stroke-dasharray="4 4" />
            <path d="M 50% 50% L 30% 40% L 35% 75%" stroke="rgba(255, 255, 255, 0.1)" stroke-width="2" fill="none" stroke-dasharray="4 4" />
            <path d="M 80% 55% L 65% 70% L 50% 85%" stroke="rgba(255, 255, 255, 0.1)" stroke-width="2" fill="none" stroke-dasharray="4 4" />
            <path d="M 50% 50% L 50% 20% L 50% 5%" stroke="rgba(255, 255, 255, 0.1)" stroke-width="2" fill="none" stroke-dasharray="4 4" />
            <path d="M 80% 15% L 70% 25% L 50% 20%" stroke="rgba(255, 255, 255, 0.1)" stroke-width="2" fill="none" stroke-dasharray="4 4" />
          </svg>

          <!-- Nodes -->
          ${sortedAreas.map(a => {
            const isHere = a.id === player.currentArea && !traveling
            const tooLow = player.level < (a.min_level || 1)
            const x = a.mapX || 50
            const y = a.mapY || 50
            const color = isHere ? 'var(--green)' : (tooLow ? 'var(--red)' : 'var(--blue)')
            const glow = isHere ? `box-shadow: 0 0 15px ${color}; animation: pulse 2s infinite` : ''
            const clickable = !isHere && !tooLow && !traveling
            
            return `
              <div class="map-node ${clickable ? 'clickable' : ''}" ${clickable ? `data-travel="${a.id}"` : ''} 
                   style="position:absolute; left:${x}%; top:${y}%; transform:translate(-50%, -50%); z-index:1; display:flex; flex-direction:column; align-items:center; width:max-content">
                <div class="node-label" style="font-size:10px; background:rgba(0,0,0,0.6); padding:2px 6px; border-radius:4px; margin-bottom:4px; color:${isHere ? 'var(--green)' : 'var(--text-light)'}; border:1px solid ${isHere ? 'var(--green)' : 'rgba(255,255,255,0.1)'}">
                  ${a.name} ${tooLow ? `[Lv.${a.min_level}]` : ''}
                </div>
                <div class="node-dot" style="width:12px; height:12px; background-color:${color}; border-radius:50%; border:2px solid #fff; ${glow}"></div>
              </div>
            `
          }).join('')}
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">Thiết Lập Lộ Trình</div>
        <div class="panel-body no-pad" style="max-height: 250px; overflow-y:auto">
          ${areas.map(a => {
            const isHere = a.id === player.currentArea && !traveling
            const tooLow = player.level < (a.min_level || 1)
            const travelTime = parseInt(a.travel_time) || 0

            return `
              <div class="list-item ${isHere ? '' : (tooLow ? '' : 'clickable')}" ${!isHere && !tooLow && !traveling ? `data-travel="${a.id}"` : ''} style="padding: 10px 14px">
                <div class="item-info">
                  <div class="item-name" style="font-size:14px">
                    ${a.name}
                    ${isHere ? ' <span style="color:var(--green); font-size:11px">(đang ở đây)</span>' : ''}
                    ${tooLow ? ` <span style="color:var(--red); font-size:11px">[Lv.${a.min_level}+]</span>` : ''}
                  </div>
                  <div class="item-meta" style="margin-top:2px">
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

    // Bind events for both map nodes and list buttons
    container.querySelectorAll('[data-travel]').forEach(el => {
      el.addEventListener('click', async (e) => {
        e.stopPropagation()
        const areaId = el.dataset.travel
        
        // Disable all buttons immediately to prevent double click
        container.querySelectorAll('[data-travel]').forEach(b => {
           if(b.tagName === 'BUTTON') b.disabled = true;
           b.style.pointerEvents = 'none';
        })
        
        try {
          const res = await api.request(`/player/${state.playerId}/travel`, {
            method: 'POST',
            body: JSON.stringify({ areaId }),
          })
          if (res.player) { state.player = res.player; updateSidebar() }
          notify(res.message, 'success')
          loadTravel(container, ctx)
        } catch (err) {
          notify(err.message || 'Lỗi di chuyển!', 'error')
          loadTravel(container, ctx) // Reset UI
        }
      })
    })

    // Countdown timer logic
    if (traveling && travelRemaining > 0) {
      let remaining = travelRemaining
      const totalTime = travelRemaining // Assuming it just started, ideally we'd need start time. Rough visual.
      
      const timer = setInterval(async () => {
        remaining--
        const timerEl = document.getElementById('travelTimer')
        const barEl = document.getElementById('travelBar')
        
        if (timerEl) {
           timerEl.textContent = `⏳ ${Math.max(0, remaining)}s`
        }
        if (barEl) {
           // Simple smooth descend
           barEl.style.width = `${Math.max(0, (remaining / totalTime) * 100)}%`
        }

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
