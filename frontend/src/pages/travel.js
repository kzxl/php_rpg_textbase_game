/**
 * Ngao Du — Travel + Bí Cảnh (Dungeon) with Pure 2D Map UI (Zero Three.js)
 */
import { pageDungeon } from './dungeon.js'
import { pageTienCanh } from './tiencanh.js'

/**
 * Cultivation Realm title resolution across 18 world realms
 */
export function getCultivationRealmTitle(level) {
  const lvl = parseInt(level) || 1
  if (lvl <= 10) return 'Luyện Khí'
  if (lvl <= 20) return 'Trúc Cơ'
  if (lvl <= 30) return 'Kim Đan'
  if (lvl <= 40) return 'Nguyên Anh'
  if (lvl <= 50) return 'Hóa Thần'
  if (lvl <= 65) return 'Luyện Hư'
  if (lvl <= 80) return 'Hợp Thể'
  if (lvl <= 100) return 'Đại Thừa'
  if (lvl <= 120) return 'Độ Kiếp'
  if (lvl <= 135) return 'Chân Tiên'
  if (lvl <= 145) return 'Kim Tiên'
  if (lvl <= 155) return 'Thái Ất'
  return 'Đại La / Hỗn Nguyên'
}

/**
 * Environmental stat modifier color classification
 */
export function getModifierTagClass(text) {
  if (!text) return 'modifier-tag--buff'
  const t = text.toLowerCase()
  if (t.includes('st nhận') || t.includes('gây & nhận') || t.includes('huyết chiến') || t.includes('hỗn loạn')) {
    return 'modifier-tag--hybrid'
  }
  if (t.includes('-10%') || t.includes('-15%') || t.includes('đóng băng: -') || t.includes('u minh: -') || (t.includes('-') && !t.includes('->'))) {
    return 'modifier-tag--debuff'
  }
  return 'modifier-tag--buff'
}

/**
 * Specialty raw material category badge with R1 inventory icons
 */
export function getSpecialtyBadge(name) {
  const n = (name || '').toLowerCase()
  let icon = '🌿'
  let cls = 'specialty-pill--herb'

  if (n.includes('thạch') || n.includes('khoáng') || n.includes('quặng') || n.includes('thiết') || n.includes('tinh thạch') || n.includes('kim loại') || n.includes('thần thạch')) {
    icon = '⛏️'
    cls = 'specialty-pill--mineral'
  } else if (n.includes('nanh') || n.includes('cốt') || n.includes('vũ') || n.includes('nhãn') || n.includes('xác') || n.includes('thịt') || n.includes('da') || n.includes('hạch') || n.includes('yêu thú') || n.includes('nội đan')) {
    icon = '🐾'
    cls = 'specialty-pill--beast'
  } else if (n.includes('thảo') || n.includes('diệp') || n.includes('hoa') || n.includes('chi') || n.includes('nhựa') || n.includes('mộc') || n.includes('cây')) {
    icon = '🌿'
    cls = 'specialty-pill--herb'
  } else if (n.includes('tinh') || n.includes('châu') || n.includes('khí') || n.includes('thủy') || n.includes('phiến')) {
    icon = '⛏️'
    cls = 'specialty-pill--mineral'
  }
  return `<span class="specialty-pill ${cls}">${icon} ${name}</span>`
}

export function pageTravel(el, ctx) {
  const { state } = ctx
  const activeTab = state._travelTab || 'map'

  el.innerHTML = `
    <div class="page-header">
      <h1>🗺️ Ngao Du Bát Hoang</h1>
      <div class="text-sm text-dim">Khám phá thế giới tu tiên, chinh phục bí cảnh và tầm bảo tiên cảnh.</div>
    </div>
    <div class="tab-bar" style="display:flex;gap:0;margin-bottom:12px;border-bottom:2px solid rgba(255,255,255,0.1)">
      <button class="tab-btn ${activeTab === 'map' ? 'active' : ''}" data-tab="map" style="flex:1;padding:10px;border:none;background:${activeTab === 'map' ? 'rgba(255,255,255,0.08)' : 'transparent'};color:${activeTab === 'map' ? 'var(--gold)' : 'var(--text-dim)'};cursor:pointer;font-size:14px;font-weight:${activeTab === 'map' ? '700' : '400'};border-bottom:2px solid ${activeTab === 'map' ? 'var(--gold)' : 'transparent'};transition:all 0.2s">
        🗺️ Bản Đồ Bát Hoang
      </button>
      <button class="tab-btn ${activeTab === 'dungeon' ? 'active' : ''}" data-tab="dungeon" style="flex:1;padding:10px;border:none;background:${activeTab === 'dungeon' ? 'rgba(255,255,255,0.08)' : 'transparent'};color:${activeTab === 'dungeon' ? 'var(--gold)' : 'var(--text-dim)'};cursor:pointer;font-size:14px;font-weight:${activeTab === 'dungeon' ? '700' : '400'};border-bottom:2px solid ${activeTab === 'dungeon' ? 'var(--gold)' : 'transparent'};transition:all 0.2s">
        ⚡ Bí Cảnh
      </button>
      <button class="tab-btn ${activeTab === 'tiencanh' ? 'active' : ''}" data-tab="tiencanh" style="flex:1;padding:10px;border:none;background:${activeTab === 'tiencanh' ? 'rgba(255,255,255,0.08)' : 'transparent'};color:${activeTab === 'tiencanh' ? 'var(--gold)' : 'var(--text-dim)'};cursor:pointer;font-size:14px;font-weight:${activeTab === 'tiencanh' ? '700' : '400'};border-bottom:2px solid ${activeTab === 'tiencanh' ? 'var(--gold)' : 'transparent'};transition:all 0.2s">
        🌌 Tiên Cảnh (Atlas)
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
  } else if (activeTab === 'dungeon') {
    pageDungeon(contentEl, ctx)
  } else {
    pageTienCanh(contentEl, ctx)
  }
}

async function loadTravelMap(container, ctx) {
  const { state, api, notify, updateSidebar } = ctx
  container.innerHTML = '<div class="loading" style="padding:20px; text-align:center">Đang mở địa đồ bát hoang...</div>'

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
      'thanh_lam_tran': '🌾 Tân thủ thôn: Khu vực an toàn',
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
      'cuu_u_than_uyen': '👿 Cửu U ma khí: +35% ST, +20% Tốc Độ',
      'thai_co_hong_hoang': '🦕 Hồng hoang cổ khí: +25% HP, +20% Giáp',
      'chu_thien_tinh_hai': '🌌 Tinh tú xoay chuyển: +30% Tốc Độ, +25% Nhanh Nhẹn',
      'hon_don_tien_vuc': '🔮 Hỗn độn tiên khí: +35% Toàn Chỉ Số',
      'hon_nguyen_dao_canh': '👑 Hỗn nguyên đạo vực: +60% ST, +50% Toàn Thuộc Tính',
    }
    const envEffect = envMap[player?.currentArea] || ''

    // Sort areas by sort_order or mapY
    const sortedAreas = [...areas].sort((a, b) => (a.sort_order || a.mapY || 0) - (b.sort_order || b.mapY || 0))

    container.innerHTML = `
      ${traveling ? `
        <div class="panel glass" style="border-color:var(--gold); box-shadow:0 0 20px rgba(255,215,0,0.15); margin-bottom:16px">
          <div class="panel-body" style="text-align:center; padding: 24px">
            <div style="font-size:36px; margin-bottom:10px; animation:bounce 1s infinite">🚶💨</div>
            <strong style="font-size:16px; color:var(--text-bright)">Đang phi hành tới: <span style="color:var(--gold)">${travelDestination}</span></strong>
            <div id="travelTimer" style="font-size:26px; font-weight:bold; color:var(--gold); margin:12px 0; text-shadow:0 0 12px rgba(255,215,0,0.4)">⏳ ${travelRemaining}s</div>
            <div class="bar-track" style="margin-top:12px; height:10px; background:rgba(0,0,0,0.5); border-radius:5px; overflow:hidden">
              <div class="bar-fill energy" id="travelBar" style="width:100%; height:100%; background:linear-gradient(90deg, #f59e0b, #fbbf24); transition: width 1s linear"></div>
            </div>
            <div class="text-xs text-dim" style="margin-top:8px">Đang vượt qua kết giới... Xin kiên nhẫn chờ đến nơi.</div>
          </div>
        </div>
      ` : `
        <div class="panel" style="border-color:rgba(100,200,100,0.3); margin-bottom:16px">
          <div class="panel-body" style="padding: 14px 16px">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-xs text-dim mb-xs">📍 Cảnh Giới Hiện Tại</div>
                <div class="text-lg text-green bold" style="display:flex;align-items:center;gap:6px">
                  ${areaName}
                  <span class="badge" style="background:rgba(34,197,94,0.15);color:var(--green);border:1px solid rgba(34,197,94,0.4);font-size:11px">Tọa Trấn</span>
                </div>
              </div>
              <div style="text-align:right">
                <div class="text-xs text-dim">Thể lực khám phá</div>
                <div class="text-gold bold">-${staminaCost} TL/lần</div>
              </div>
            </div>
            ${currentArea?.description ? `<div class="text-sm text-dim" style="margin-top:6px;line-height:1.4">${currentArea.description}</div>` : ''}
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:10px">
              <span class="badge" style="background:rgba(255,255,255,0.08);font-size:11px;font-weight:600">
                Yêu Cầu: Lv.${currentArea?.min_level || 1}+ · ${getCultivationRealmTitle(currentArea?.min_level || 1)} Cảnh
              </span>
              ${envEffect ? `<span class="modifier-tag ${getModifierTagClass(envEffect)}">${envEffect}</span>` : ''}
            </div>
            ${currentConfig?.specialtyNames?.length ? `
              <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-top:8px">
                <span style="font-size:11px;color:var(--text-dim)">💎 Đặc Sản:</span>
                ${currentConfig.specialtyNames.map(s => getSpecialtyBadge(s)).join(' ')}
              </div>
            ` : ''}
          </div>
        </div>
      `}

      <!-- 2D REALM MAP OVERVIEW -->
      <div class="panel">
        <div class="panel-title flex items-center justify-between">
          <span>🗺️ Thiên Địa Giới Đồ (2D Bát Hoang Tinh Đồ)</span>
          <span class="text-xs text-dim">${sortedAreas.length} Khu vực</span>
        </div>
        <div class="panel-body" style="background:linear-gradient(180deg, rgba(15,23,42,0.8) 0%, rgba(10,15,28,0.95) 100%); padding:12px">
          <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(260px, 1fr)); gap:12px">
            ${sortedAreas.map((a, idx) => {
              const exploArea = exploConfig[a.id]
              const isHere = a.id === player.currentArea && !traveling
              const tooLow = player.level < (a.min_level || 1)
              const travelTime = parseInt(a.travel_time) || 0
              const aStaminaCost = parseInt(a.stamina_cost) || exploArea?.staminaCost || 10
              const aEnvEffect = envMap[a.id] || ''
              const aTier = a.tier || 'Bát Hoang'
              const realmTitle = getCultivationRealmTitle(a.min_level)
              const specialtiesList = exploArea?.specialtyNames || a.specialties || []
              const stamBg = aStaminaCost >= 100 ? 'rgba(239,68,68,0.2)' : aStaminaCost >= 40 ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.06)'
              const stamColor = aStaminaCost >= 100 ? 'var(--red)' : aStaminaCost >= 40 ? 'var(--gold)' : 'var(--text-dim)'

              let cardBorder = 'rgba(255,255,255,0.08)'
              let cardBg = 'rgba(255,255,255,0.03)'
              if (isHere) {
                cardBorder = 'rgba(34, 197, 94, 0.6)'
                cardBg = 'rgba(34, 197, 94, 0.08)'
              } else if (tooLow) {
                cardBorder = 'rgba(239, 68, 68, 0.2)'
                cardBg = 'rgba(15, 23, 42, 0.4)'
              }

              return `
                <div class="realm-card ${isHere ? 'current-realm' : ''} ${tooLow ? 'locked-realm' : ''}" 
                     style="border:1px solid ${cardBorder}; background:${cardBg}; border-radius:8px; padding:12px; display:flex; flex-direction:column; justify-content:space-between; transition:all 0.2s ease; position:relative; overflow:hidden">
                  
                  ${isHere ? '<div style="position:absolute; top:0; right:0; width:0; height:0; border-top:28px solid #22c55e; border-left:28px solid transparent"><span style="position:absolute; top:-26px; right:3px; font-size:10px; color:#000">✓</span></div>' : ''}

                  <div>
                    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:4px">
                      <div style="font-weight:700; font-size:14px; color:${isHere ? 'var(--green)' : (tooLow ? 'var(--text-dim)' : 'var(--text-bright)')}">
                        #${idx + 1} ${a.name}
                      </div>
                      ${tooLow ? '<span style="color:var(--red); font-size:12px">🔒 Khóa</span>' : ''}
                    </div>

                    <div style="display:inline-block; font-size:10px; color:var(--gold); opacity:0.85; margin-bottom:6px; font-weight:600">
                      🏛️ ${aTier}
                    </div>

                    <div style="font-size:11px; color:var(--text-dim); margin-bottom:8px; line-height:1.3">
                      ${a.description || 'Vùng đất hoang sơ chưa rõ lai lịch.'}
                    </div>

                    <div style="display:flex; flex-wrap:wrap; gap:4px; margin-bottom:8px">
                      <span class="badge" style="font-size:10px; padding:2px 6px; background:${tooLow ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.06)'}; color:${tooLow ? 'var(--red)' : 'var(--text-dim)'}">
                        Lv.${a.min_level || 1}+ · ${realmTitle} Cảnh
                      </span>
                      <span class="badge" style="font-size:10px; padding:2px 6px; background:rgba(255,255,255,0.06); color:var(--text-dim)">
                        ${travelTime > 0 ? `⏱ ${travelTime}s` : '⚡ Tức thời'}
                      </span>
                      <span class="badge" style="font-size:10px; padding:2px 6px; background:${stamBg}; color:${stamColor}; border:1px solid ${stamBg}">
                        🏃 -${aStaminaCost} TL (Dò thám)
                      </span>
                    </div>

                    ${specialtiesList.length ? `
                      <div style="margin-bottom:8px">
                        <div style="font-size:10px; color:var(--text-dim); margin-bottom:3px">Đặc sản tài nguyên:</div>
                        <div style="display:flex; flex-wrap:wrap; gap:4px">
                          ${specialtiesList.map(s => getSpecialtyBadge(typeof s === 'string' ? s : s.name)).join('')}
                        </div>
                      </div>
                    ` : ''}

                    ${exploArea?.rates ? `
                      <div style="display:flex; gap:6px; font-size:10px; margin-bottom:8px; opacity:0.85">
                        <span style="color:#34d399">🌿 ~${exploArea.rates.find(r => r.type === 'herb')?.weight || 0}%</span>
                        <span style="color:rgba(255,255,255,0.2)">·</span>
                        <span style="color:#38bdf8">⛏️ ~${exploArea.rates.find(r => r.type === 'mineral')?.weight || 0}%</span>
                        <span style="color:rgba(255,255,255,0.2)">·</span>
                        <span style="color:#f87171">👾 ~${exploArea.rates.find(r => r.type === 'monster')?.weight || 0}%</span>
                      </div>
                    ` : ''}

                    ${aEnvEffect ? `
                      <div style="margin-bottom:10px">
                        <div class="modifier-tag ${getModifierTagClass(aEnvEffect)}">
                          ${aEnvEffect}
                        </div>
                      </div>
                    ` : ''}
                  </div>

                  <div style="margin-top:auto">
                    ${isHere ? `
                      <button class="btn btn--block btn--sm" disabled style="background:rgba(34,197,94,0.2); color:var(--green); border:1px solid rgba(34,197,94,0.4)">
                        📍 Đang tọa trấn
                      </button>
                    ` : tooLow ? `
                      <button class="btn btn--block btn--sm" disabled style="opacity:0.5; cursor:not-allowed">
                        Cần Đạt Cấp ${a.min_level} (${realmTitle})
                      </button>
                    ` : `
                      <button class="btn btn--blue btn--block btn--sm" data-travel="${a.id}" ${traveling ? 'disabled' : ''}>
                        ${travelTime > 0 ? `🚶 Vi Hành (${travelTime}s)` : '⚡ Độn Thổ Đến'}
                      </button>
                    `}
                  </div>

                </div>
              `
            }).join('')}
          </div>
        </div>
      </div>
    `

    // Event listeners for travel buttons
    container.querySelectorAll('[data-travel]').forEach(el => {
      el.addEventListener('click', async (e) => {
        e.stopPropagation()
        const areaId = el.dataset.travel

        container.querySelectorAll('[data-travel]').forEach(b => {
          if (b.tagName === 'BUTTON') b.disabled = true
          b.style.pointerEvents = 'none'
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

    // Countdown timer logic when traveling
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
