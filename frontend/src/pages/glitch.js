/**
 * Glitch Page — Thiên Đạo Dị Biến & Hệ Thống Sương Mù Tính Năng (Feature Fog of War)
 */

export async function renderGlitchPage(container, ctx) {
  const { state, api, notify, updateSidebar } = ctx
  const player = state.player
  if (!player) return

  container.innerHTML = `
    <div class="panel" style="max-width: 900px; margin: 0 auto;">
      <div id="glitchContentWrapper">
        <div style="text-align: center; padding: 30px; color: #888;">
          <div style="font-size: 32px; animation: pulse 1.5s infinite;">🌌</div>
          <div style="margin-top: 10px;">Đang liên kết thần thức với Thiên Đạo...</div>
        </div>
      </div>
    </div>
  `

  try {
    const res = await api.getGlitches(player.id)
    const status = res.status
    const wrapper = container.querySelector('#glitchContentWrapper')
    if (!wrapper) return

    // TẦNG 1: SƯƠNG MÙ TÍNH NĂNG (Feature Fog of War)
    if (!status.featureUnlocked) {
      renderFeatureLockedFog(wrapper, status.featureDetails, player)
      return
    }

    // TẦNG 2: TÍNH NĂNG ĐÃ KHAI MỞ (Hiển thị chi tiết với sương mù Dấu Ấn)
    renderGlitchUnlocked(wrapper, status, player, ctx)
  } catch (err) {
    container.innerHTML = `
      <div class="panel" style="max-width: 900px; margin: 0 auto; text-align: center; padding: 24px;">
        <div style="color: #ef4444; font-weight: bold; margin-bottom: 8px;">Không thể tải dữ liệu Thiên Đạo Dị Biến</div>
        <div style="color: #888; font-size: 0.9rem;">${err.message || 'Lỗi kết nối máy chủ'}</div>
      </div>
    `
  }
}

/** Render màn sương mù phong ấn khi tính năng chưa đủ điều kiện mở */
function renderFeatureLockedFog(wrapper, details, player) {
  const reqs = details?.requirements || []

  wrapper.innerHTML = `
    <div style="text-align: center; padding: 40px 20px; background: radial-gradient(circle at center, rgba(168, 85, 247, 0.15) 0%, rgba(0,0,0,0.6) 80%); border-radius: 12px; border: 1px dashed rgba(168, 85, 247, 0.3);">
      <div style="font-size: 54px; filter: drop-shadow(0 0 15px rgba(168, 85, 247, 0.6)); margin-bottom: 12px; animation: pulse 2s infinite;">
        🌫️
      </div>
      <h2 style="color: #c084fc; font-size: 1.5rem; letter-spacing: 1px; margin-bottom: 8px; text-transform: uppercase;">
        Thiên Cơ Hỗn Loạn — Vụ Khí Mông Lung
      </h2>
      <div style="color: #a1a1aa; max-width: 580px; margin: 0 auto 24px; font-size: 0.9rem; line-height: 1.6; font-style: italic;">
        "Trời đất vận hành theo quy luật tuyệt đối. Nhục thân phàm nhân chưa đủ căn cơ để cảm ứng kẽ hở quy luật của càn khôn..."
      </div>

      <div style="background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; max-width: 480px; margin: 0 auto 24px; padding: 16px; text-align: left;">
        <div style="font-size: 0.8rem; color: #fbbf24; text-transform: uppercase; font-weight: bold; margin-bottom: 12px; letter-spacing: 0.5px; display: flex; align-items: center; gap: 6px;">
          <span>📜</span> Điều Kiện Phá Bỏ Sương Mù (Đạt 1 trong các mục):
        </div>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${reqs.map(r => `
            <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.85rem; padding: 6px 10px; background: rgba(255,255,255,0.02); border-radius: 6px; border-left: 3px solid ${r.met ? '#22c55e' : '#6b7280'};">
              <span style="color: ${r.met ? '#86efac' : '#d1d5db'}; display: flex; align-items: center; gap: 8px;">
                <span>${r.met ? '✅' : '🔒'}</span> ${r.label}
              </span>
              <span style="font-size: 0.8rem; color: ${r.met ? '#22c55e' : '#9ca3af'}; font-weight: bold;">
                ${r.current}
              </span>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="font-size: 0.8rem; color: #71717a; max-width: 460px; margin: 0 auto;">
        💡 Gợi ý: Hãy tiếp tục đột phá tu vi lên <strong>Trúc Cơ</strong> hoặc chiến đấu sinh tử để kích phát kẽ hở thời không.
      </div>
    </div>
  `
}

/** Render giao diện Dị Biến đầy đủ khi đã thoát khỏi sương mù */
function renderGlitchUnlocked(wrapper, status, player, ctx) {
  const { api, notify, updateSidebar } = ctx
  const imprints = status.imprints || []
  const stances = status.stances || {}
  const activeStance = status.activeStance || 'breaker'

  wrapper.innerHTML = `
    <div>
      <!-- HEADER -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-panel, #333); padding-bottom: 12px; margin-bottom: 16px;">
        <div>
          <h2 style="margin: 0; color: #c084fc; display: flex; align-items: center; gap: 8px;">
            <span>🌌</span> Thiên Đạo Dị Biến
          </h2>
          <div style="font-size: 0.85rem; color: #9ca3af; margin-top: 4px;">
            Khai thác lỗ hổng quy luật của thế giới. Hành vi lặp lại tích lũy thành Dấu Ấn & Nội Tại Nghịch Thiên.
          </div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 0.75rem; color: #aaa; text-transform: uppercase;">Điểm Thấu Triệt</div>
          <div style="font-size: 1.5rem; font-weight: bold; color: #fbbf24; text-shadow: 0 0 10px rgba(251,191,36,0.4);" id="glitchInsightVal">
            ${status.glitchInsight || 0}
          </div>
        </div>
      </div>

      <!-- OVERRIDE CARD -->
      <div style="background: rgba(192, 132, 252, 0.08); border: 1px solid rgba(192, 132, 252, 0.25); border-radius: 8px; padding: 14px 16px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <div>
          <div style="font-weight: bold; color: #e9d5ff; font-size: 0.95rem;">⚡ Lách Luật Thiên Đạo (Glitch Override)</div>
          <div style="font-size: 0.8rem; color: #d8b4fe;">
            ${player.hospitalUntil > Math.floor(Date.now() / 1000) 
              ? 'Xóa bỏ ghi chép tử thương, xuất viện ngay lập tức và hồi 50% HP.' 
              : 'Đảo chiều quy luật, nạp đầy 100% Linh Lực và Thể Lực tức thì.'}
          </div>
        </div>
        <button id="btnOverrideTribulation" class="btn btn--gold" style="white-space: nowrap; font-size: 0.85rem; padding: 6px 14px;">
          🔮 Thi Triển (-50 Thấu Triệt)
        </button>
      </div>

      <!-- STANCE SELECTOR (Kèm sương mù cảnh giới) -->
      <div style="margin-bottom: 24px;">
        <h3 style="margin: 0 0 10px 0; font-size: 1rem; color: #e5e7eb;">⚔️ Thế Chiến Đấu Cổ Điển (Combat Stances)</h3>
        <div id="stanceContainer" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px;"></div>
      </div>

      <!-- GLITCH IMPRINTS (Hệ thống sương mù 3 cấp độ) -->
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h3 style="margin: 0; font-size: 1rem; color: #e5e7eb;">📜 Dấu Ấn Quy Luật & Sấm Truyền</h3>
          <span style="font-size: 0.85rem; color: #a855f7;">
            ${status.unlockedCount}/${status.totalCount} Dấu Ấn Đã Khai Phá
          </span>
        </div>
        <div id="imprintsContainer" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(270px, 1fr)); gap: 14px;"></div>
      </div>
    </div>
  `

  // Override click handler
  const btnOverride = wrapper.querySelector('#btnOverrideTribulation')
  if (btnOverride) {
    btnOverride.onclick = async () => {
      btnOverride.disabled = true
      btnOverride.textContent = 'Đang lách luật...'
      try {
        const res = await api.overrideTribulation(player.id)
        notify(res.message, 'success')
        state.player = res.player
        updateSidebar()
        renderGlitchPage(wrapper.parentElement, ctx)
      } catch (err) {
        notify(err.message || 'Thao tác lách luật thất bại!', 'error')
        btnOverride.disabled = false
        btnOverride.textContent = '🔮 Thi Triển (-50 Thấu Triệt)'
      }
    }
  }

  // Render Stances with locks
  renderStances(wrapper, stances, activeStance, player, api, notify, updateSidebar)

  // Render Imprints with Fog of War
  renderImprints(wrapper, imprints, player, notify, updateSidebar)
}

function renderStances(wrapper, stances, activeStance, player, api, notify, updateSidebar) {
  const container = wrapper.querySelector('#stanceContainer')
  if (!container) return
  container.innerHTML = ''

  Object.values(stances).forEach(st => {
    const isUnlocked = st.isUnlocked !== false
    const isActive = st.id === activeStance
    const card = document.createElement('div')

    card.style.cssText = `
      background: ${isActive ? 'rgba(168, 85, 247, 0.15)' : (isUnlocked ? 'var(--bg-main, #1a1e28)' : 'rgba(0,0,0,0.35)')};
      border: 1px solid ${isActive ? '#c084fc' : (isUnlocked ? 'var(--border-panel, #333)' : 'rgba(255,255,255,0.06)')};
      border-radius: 8px;
      padding: 12px;
      cursor: ${isUnlocked ? 'pointer' : 'not-allowed'};
      transition: all 0.2s ease;
      position: relative;
      opacity: ${isUnlocked ? '1' : '0.55'};
    `

    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
        <div style="font-weight: bold; color: ${isUnlocked ? st.color : '#888'}; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">
          <span>${isUnlocked ? st.icon : '🔒'}</span> ${st.name}
        </div>
        ${isActive ? '<span style="font-size: 0.7rem; background: #a855f7; color: #fff; padding: 2px 6px; border-radius: 4px; font-weight: bold;">ĐANG DÙNG</span>' : ''}
        ${!isUnlocked ? `<span style="font-size: 0.65rem; background: rgba(0,0,0,0.5); color: #fbbf24; border: 1px solid rgba(251,191,36,0.3); padding: 2px 6px; border-radius: 4px;">PHONG ẤN</span>` : ''}
      </div>
      <div style="font-size: 0.8rem; color: #9ca3af; line-height: 1.4;">
        ${isUnlocked ? st.description : `<span style="color:#f59e0b;">${st.unlockRequirement || 'Chưa mở khóa'}</span>`}
      </div>
    `

    card.onclick = async () => {
      if (!isUnlocked) {
        return notify(st.unlockRequirement || 'Thế chiến đấu này đang bị phong ấn!', 'error')
      }
      if (isActive) return
      try {
        const res = await api.setStance(player.id, st.id)
        notify(res.message, 'success')
        state.player = res.player
        updateSidebar()
        renderStances(wrapper, stances, st.id, player, api, notify, updateSidebar)
      } catch (e) {
        notify(e.message || 'Chuyển thế thất bại', 'error')
      }
    }
    container.appendChild(card)
  })
}

function renderImprints(wrapper, imprints, player, notify, updateSidebar) {
  const container = wrapper.querySelector('#imprintsContainer')
  if (!container) return
  container.innerHTML = ''

  imprints.forEach(imp => {
    const card = document.createElement('div')
    const fog = imp.fogLevel || (imp.isUnlocked ? 'revealed' : 'fog')

    let bg = 'rgba(15, 23, 42, 0.5)'
    let border = 'rgba(255,255,255,0.08)'
    let shadow = 'none'

    if (fog === 'revealed') {
      bg = 'rgba(30, 41, 59, 0.75)'
      border = imp.color
      shadow = `0 0 12px ${imp.color}33`
    } else if (fog === 'partial') {
      bg = 'rgba(24, 24, 27, 0.6)'
      border = '1px dashed rgba(168, 85, 247, 0.4)'
    } else {
      bg = 'rgba(10, 10, 15, 0.5)'
      border = '1px dashed rgba(255, 255, 255, 0.08)'
    }

    card.style.cssText = `
      background: ${bg};
      border: 1px solid ${border};
      border-radius: 8px;
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: ${shadow};
      position: relative;
      overflow: hidden;
    `

    card.innerHTML = `
      <div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
          <div style="font-weight: bold; color: ${imp.color}; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">
            <span>${imp.icon}</span> ${imp.name}
          </div>
          <span style="font-size: 0.7rem; color: ${fog === 'revealed' ? '#fbbf24' : '#6b7280'}; border: 1px solid ${fog === 'revealed' ? 'rgba(251,191,36,0.3)' : 'rgba(255,255,255,0.08)'}; padding: 1px 6px; border-radius: 4px;">
            ${fog === 'revealed' ? imp.title : (fog === 'partial' ? 'Chớm Ngộ' : 'Sương Mù')}
          </span>
        </div>

        <div style="font-size: 0.78rem; color: ${fog === 'fog' ? '#9ca3af' : '#a1a1aa'}; font-style: italic; margin-bottom: 8px; line-height: 1.4;">
          "${imp.lore}"
        </div>

        <div style="font-size: 0.82rem; color: ${fog === 'revealed' ? '#e4e4e7' : '#9ca3af'}; margin-bottom: 10px; background: rgba(0,0,0,0.25); padding: 6px 8px; border-radius: 4px;">
          <strong style="color: ${fog === 'revealed' ? '#67e8f9' : '#888'};">
            ${fog === 'revealed' ? 'Hiệu ứng:' : (fog === 'partial' ? 'Manh mối:' : 'Sấm truyền:')}
          </strong> ${imp.description}
        </div>
      </div>

      <div>
        ${fog === 'revealed' ? `
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 8px; margin-top: 4px;">
            <span style="font-size: 0.75rem; color: #4ade80; font-weight: bold;">✓ ĐẠI TRIỆT ĐẠI NGỘ</span>
            <button class="btn btn--dark btnSetTitle" style="font-size: 0.75rem; padding: 2px 8px;" data-title="${imp.title}">
              ${player.activeTitle === imp.title ? 'Đang Đeo' : 'Đeo Danh Hiệu'}
            </button>
          </div>
        ` : (fog === 'partial' ? `
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #a855f7; margin-bottom: 4px;">
              <span>Tiến độ cảm ứng:</span>
              <span>${imp.progress.current} / ${imp.progress.threshold}</span>
            </div>
            <div style="height: 6px; background: rgba(255,255,255,0.08); border-radius: 3px; overflow: hidden;">
              <div style="width: ${imp.progress.percent}%; height: 100%; background: linear-gradient(90deg, #a855f7, #c084fc); transition: width 0.3s;"></div>
            </div>
          </div>
        ` : `
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #6b7280; margin-bottom: 4px;">
              <span>Màn sương che giấu:</span>
              <span>??? / ???</span>
            </div>
            <div style="height: 6px; background: rgba(255,255,255,0.04); border-radius: 3px; overflow: hidden;">
              <div style="width: 15%; height: 100%; background: #4b5563; opacity: 0.5;"></div>
            </div>
          </div>
        `)}
      </div>
    `

    const btnTitle = card.querySelector('.btnSetTitle')
    if (btnTitle) {
      btnTitle.onclick = () => {
        player.activeTitle = imp.title
        notify(`Đã kích hoạt danh hiệu: [${imp.title}]!`, 'success')
        updateSidebar()
        renderImprints(wrapper, imprints, player, notify, updateSidebar)
      }
    }

    container.appendChild(card)
  })
}
