/**
 * Ngao Du — Travel + Bí Cảnh (Dungeon) with Tab UI
 */
import { pageDungeon } from './dungeon.js'

export function pageTravel(el, ctx) {
  const { state } = ctx
  const activeTab = state._travelTab || 'map'

  el.innerHTML = `
    <div class="page-header">
      <h1>🗺️ Ngao Du</h1>
      <div class="text-sm text-dim">Khám phá thế giới tu tiên và chinh phục bí cảnh.</div>
    </div>
    <div class="tab-bar" style="display:flex;gap:0;margin-bottom:12px;border-bottom:2px solid rgba(255,255,255,0.1)">
      <button class="tab-btn ${activeTab === 'map' ? 'active' : ''}" data-tab="map" style="flex:1;padding:10px;border:none;background:${activeTab === 'map' ? 'rgba(255,255,255,0.08)' : 'transparent'};color:${activeTab === 'map' ? 'var(--gold)' : 'var(--text-dim)'};cursor:pointer;font-size:14px;font-weight:${activeTab === 'map' ? '700' : '400'};border-bottom:2px solid ${activeTab === 'map' ? 'var(--gold)' : 'transparent'};transition:all 0.2s">
        🗺️ Bản Đồ
      </button>
      <button class="tab-btn ${activeTab === 'dungeon' ? 'active' : ''}" data-tab="dungeon" style="flex:1;padding:10px;border:none;background:${activeTab === 'dungeon' ? 'rgba(255,255,255,0.08)' : 'transparent'};color:${activeTab === 'dungeon' ? 'var(--gold)' : 'var(--text-dim)'};cursor:pointer;font-size:14px;font-weight:${activeTab === 'dungeon' ? '700' : '400'};border-bottom:2px solid ${activeTab === 'dungeon' ? 'var(--gold)' : 'transparent'};transition:all 0.2s">
        ⚡ Bí Cảnh
      </button>
    </div>
    <div id="travelTabContent"></div>
  `

  el.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state._travelTab = btn.dataset.tab
      pageTravel(el, ctx)
    })
  })

  const contentEl = el.querySelector('#travelTabContent')
  if (activeTab === 'map') {
    loadTravelMap(contentEl, ctx)
  } else {
    pageDungeon(contentEl, ctx)
  }
}

async function loadTravelMap(container, ctx) {
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

    // Enrich area with exploration config data
    const exploConfig = state.exploration || {}
    const currentConfig = exploConfig[player?.currentArea || 'thanh_lam_tran']
    const areaName = currentArea?.name || currentConfig?.name || 'Vùng Đất Vô Danh'
    const staminaCost = currentConfig?.staminaCost || 10

    // Environment effects map
    const envMap = {
      'hac_phong_lam': '🌲 Rừng rậm: +5% Tốc Độ',
      'vong_linh_coc': '👻 Âm khí: +10% Nhanh Nhẹn',
      'thiet_huyet_son': '🌋 Nóng bức: +10% ST Hỏa',
      'thien_kiep_uyen': '⚡ Lôi điện: +15% Tốc Độ',
      'bac_suong_canh': '❄️ Đóng băng: -10% Tốc Độ',
      'am_sat_hoang': '🎯 Sát khí: +15 Nhanh Nhẹn',
      'co_moc_linh_vien': '🌳 Linh mộc: +15% Phòng Ngự',
      'huyet_ma_chien_truong': '🩸 Huyết chiến: +30% ST, +20% ST nhận',
      'thien_hoa_linh_dia': '🔥 Địa hỏa: +25% ST Hỏa',
      'u_minh_quy_vuc': '💀 U minh: -15% Phòng Ngự',
      'thien_dao_tan_tich': '✨ Thiên đạo: +15% Toàn Chỉ Số',
      'vo_tan_hu_khong': '🌀 Hỗn loạn: +50% ST Gây & Nhận',
    }
    const envEffect = envMap[player?.currentArea] || ''

    // Sort areas by sort_order/MapY
    const sortedAreas = [...areas].sort((a, b) => (a.sort_order || a.mapY || 0) - (b.sort_order || b.mapY || 0))
    const sortedMapAreas = [...areas].sort((a, b) => (a.mapY || 0) - (b.mapY || 0))

    container.innerHTML = `
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
        <div class="panel" style="border-color:rgba(100,200,100,0.3)">
          <div class="panel-body" style="padding: 14px 16px">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-xs text-dim mb-xs">📍 Vị trí hiện tại</div>
                <div class="text-lg text-green bold">${areaName}</div>
              </div>
              <div style="text-align:right">
                <div class="text-xs text-dim">Thể lực khám phá</div>
                <div class="text-gold bold">-${staminaCost}/lần</div>
              </div>
            </div>
            ${currentArea?.description ? `<div class="text-sm text-dim" style="margin-top:6px">${currentArea.description}</div>` : ''}
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
              <span class="badge" style="background:rgba(255,255,255,0.08);font-size:11px">Lv.${currentArea?.min_level || 1}+</span>
              ${envEffect ? `<span class="badge" style="background:rgba(255,255,255,0.08);font-size:11px">${envEffect}</span>` : ''}
            </div>
          </div>
        </div>
      `}

      <!-- 2D MAP VISUAL -->
      <div class="panel mt-md">
        <div class="panel-title">Thiên Địa Giới Đồ</div>
        <div class="panel-body no-pad" style="position:relative; width:100%; height:300px; background-color: #0f172a; background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 20px 20px; overflow:hidden; border-radius:0 0 8px 8px">
          
          <svg style="position:absolute; top:0; left:0; width:100%; height:100%; z-index:0; pointer-events:none">
            <path d="M 50% 85% L 50% 50% L 80% 55% L 85% 30% L 80% 15%" stroke="rgba(255, 255, 255, 0.1)" stroke-width="2" fill="none" stroke-dasharray="4 4" />
            <path d="M 50% 85% L 35% 75% L 15% 45% L 30% 15% L 50% 5%" stroke="rgba(255, 255, 255, 0.1)" stroke-width="2" fill="none" stroke-dasharray="4 4" />
            <path d="M 50% 50% L 30% 40% L 35% 75%" stroke="rgba(255, 255, 255, 0.1)" stroke-width="2" fill="none" stroke-dasharray="4 4" />
            <path d="M 80% 55% L 65% 70% L 50% 85%" stroke="rgba(255, 255, 255, 0.1)" stroke-width="2" fill="none" stroke-dasharray="4 4" />
            <path d="M 50% 50% L 50% 20% L 50% 5%" stroke="rgba(255, 255, 255, 0.1)" stroke-width="2" fill="none" stroke-dasharray="4 4" />
            <path d="M 80% 15% L 70% 25% L 50% 20%" stroke="rgba(255, 255, 255, 0.1)" stroke-width="2" fill="none" stroke-dasharray="4 4" />
          </svg>

          ${sortedMapAreas.map(a => {
            const exploArea = exploConfig[a.id]
            const isHere = a.id === player.currentArea && !traveling
            const tooLow = player.level < (a.min_level || 1)
            const x = exploArea?.mapX || 50
            const y = exploArea?.mapY || 50
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

      <div class="panel mt-md">
        <div class="panel-title">Thiết Lập Lộ Trình</div>
        <div class="panel-body no-pad" style="max-height: 300px; overflow-y:auto">
          ${sortedAreas.map(a => {
            const exploArea = exploConfig[a.id]
            const isHere = a.id === player.currentArea && !traveling
            const tooLow = player.level < (a.min_level || 1)
            const travelTime = parseInt(a.travel_time) || 0
            const aStaminaCost = exploArea?.staminaCost || '?'
            const aEnvEffect = envMap[a.id] || ''

            return `
              <div class="list-item ${isHere ? '' : (tooLow ? '' : 'clickable')}" ${!isHere && !tooLow && !traveling ? `data-travel="${a.id}"` : ''} style="padding: 10px 14px">
                <div class="item-info" style="flex:1">
                  <div class="item-name" style="font-size:14px">
                    ${a.name}
                    ${isHere ? ' <span style="color:var(--green); font-size:11px">(đang ở đây)</span>' : ''}
                    ${tooLow ? ` <span style="color:var(--red); font-size:11px">[Lv.${a.min_level}+]</span>` : ''}
                  </div>
                  <div class="item-meta" style="margin-top:2px;display:flex;gap:6px;flex-wrap:wrap">
                    <span>Lv.${a.min_level || 1}+</span>
                    <span>${travelTime > 0 ? '⏱ ' + travelTime + 's' : '⚡ Tức thời'}</span>
                    <span>🏃 -${aStaminaCost}</span>
                    ${aEnvEffect ? `<span style="font-size:10px;opacity:0.6">${aEnvEffect}</span>` : ''}
                  </div>
                  ${a.description ? `<div class="text-xs text-dim" style="margin-top:2px">${a.description}</div>` : ''}
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

    // Bind events
    container.querySelectorAll('[data-travel]').forEach(el => {
      el.addEventListener('click', async (e) => {
        e.stopPropagation()
        const areaId = el.dataset.travel
        
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
          loadTravelMap(container, ctx)
        } catch (err) {
          notify(err.message || 'Lỗi di chuyển!', 'error')
          loadTravelMap(container, ctx)
        }
      })
    })

    // Countdown timer logic
    if (traveling && travelRemaining > 0) {
      let remaining = travelRemaining
      const totalTime = travelRemaining
      
      const timer = setInterval(async () => {
        remaining--
        const timerEl = document.getElementById('travelTimer')
        const barEl = document.getElementById('travelBar')
        
        if (timerEl) timerEl.textContent = `⏳ ${Math.max(0, remaining)}s`
        if (barEl) barEl.style.width = `${Math.max(0, (remaining / totalTime) * 100)}%`

        if (remaining <= 0) {
          clearInterval(timer)
          try {
            const check = await api.request(`/player/${state.playerId}/travel-check`, { method: 'POST' })
            if (check.player) { state.player = check.player; updateSidebar() }
            if (check.arrived) notify(check.message, 'success')
            loadTravelMap(container, ctx)
          } catch (e) {
            loadTravelMap(container, ctx)
          }
        }
      }, 1000)
    }

  } catch (e) {
    container.innerHTML = `<div class="panel"><div class="panel-body text-dim">Lỗi tải dữ liệu khu vực</div></div>`
    console.error(e)
  }
}
