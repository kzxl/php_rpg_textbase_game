/**
 * Glitch Page — Thiên Đạo Dị Biến & Dấu Ấn Hành Vi
 */

export async function renderGlitchPage(container, ctx) {
  const { state, api, notify, updateSidebar } = ctx
  const player = state.player
  if (!player) return

  container.innerHTML = `
    <div class="panel" style="max-width: 900px; margin: 0 auto;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-panel, #333); padding-bottom: 12px; margin-bottom: 16px;">
        <div>
          <h2 style="margin: 0; color: #c084fc; display: flex; align-items: center; gap: 8px;">
            <span>🌌</span> Thiên Đạo Dị Biến
          </h2>
          <div style="font-size: 0.85rem; color: #9ca3af; margin-top: 4px;">
            Khai thác lỗ hổng quy luật của thế giới. Hành động lặp lại tích lũy thành Dấu Ấn & Nội Tại Nghịch Thiên.
          </div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 0.75rem; color: #aaa; text-transform: uppercase;">Điểm Thấu Triệt</div>
          <div style="font-size: 1.5rem; font-weight: bold; color: #fbbf24; text-shadow: 0 0 10px rgba(251,191,36,0.4);" id="glitchInsightVal">
            ${player.glitchInsight || 0}
          </div>
        </div>
      </div>

      <!-- Action Card: Glitch Override -->
      <div style="background: rgba(192, 132, 252, 0.08); border: 1px solid rgba(192, 132, 252, 0.25); border-radius: 8px; padding: 14px 16px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <div>
          <div style="font-weight: bold; color: #e9d5ff; font-size: 0.95rem;">⚡ Lách Luật Thiên Đạo (Glitch Override)</div>
          <div style="font-size: 0.8rem; color: #d8b4fe;">
            ${player.hospitalUntil > Math.floor(Date.now() / 1000) 
              ? 'Xóa bỏ ghi chép tử thương, xuất viện ngay lập tức và hồi 50% HP.' 
              : 'Đảo chiều quy luật, nạp đầy 100% Linh Lực tức thì.'}
          </div>
        </div>
        <button id="btnOverrideTribulation" class="btn btn--gold" style="white-space: nowrap; font-size: 0.85rem; padding: 6px 14px;">
          🔮 Thi Triển (-50 Thấu Triệt)
        </button>
      </div>

      <!-- Stance Selector -->
      <div style="margin-bottom: 24px;">
        <h3 style="margin: 0 0 10px 0; font-size: 1rem; color: #e5e7eb;">⚔️ Thế Chiến Đấu Cổ Điển (Combat Stance)</h3>
        <div id="stanceContainer" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px;">
          <div style="color: #888; font-size: 0.85rem;">Đang tải thế chiến đấu...</div>
        </div>
      </div>

      <!-- Glitch Imprints Grid -->
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h3 style="margin: 0; font-size: 1rem; color: #e5e7eb;">📜 Dấu Ấn Hành Vi Đã Phát Hiện</h3>
          <span style="font-size: 0.85rem; color: #a855f7;" id="imprintCountLabel">Đang tải...</span>
        </div>
        <div id="imprintsContainer" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(270px, 1fr)); gap: 14px;">
          <div style="color: #888; font-size: 0.85rem;">Đang kiểm tra sổ sinh tử Thiên Đạo...</div>
        </div>
      </div>
    </div>
  `

  // Fetch full glitch status
  try {
    const res = await api.getGlitches(player.id)
    const status = res.status
    renderStances(status.stances, status.activeStance)
    renderImprints(status.imprints, status.unlockedCount, status.totalCount)
  } catch (err) {
    notify(err.message || 'Không thể tải dữ liệu Thiên Đạo.', 'error')
  }

  // Handle Override
  const btnOverride = container.querySelector('#btnOverrideTribulation')
  if (btnOverride) {
    btnOverride.onclick = async () => {
      btnOverride.disabled = true
      btnOverride.textContent = 'Đang lách luật...'
      try {
        const res = await api.overrideTribulation(player.id)
        notify(res.message, 'success')
        state.player = res.player
        updateSidebar()
        // Refresh page
        renderGlitchPage(container, ctx)
      } catch (err) {
        notify(err.message || 'Thao tác lách luật thất bại!', 'error')
        btnOverride.disabled = false
        btnOverride.textContent = '🔮 Thi Triển (-50 Thấu Triệt)'
      }
    }
  }

  function renderStances(stances, activeStance) {
    const wrap = container.querySelector('#stanceContainer')
    if (!wrap) return
    wrap.innerHTML = ''

    Object.values(stances).forEach(st => {
      const isActive = st.id === activeStance
      const card = document.createElement('div')
      card.style.cssText = `
        background: ${isActive ? 'rgba(168, 85, 247, 0.15)' : 'var(--bg-main, #1a1e28)'};
        border: 1px solid ${isActive ? '#c084fc' : 'var(--border-panel, #333)'};
        border-radius: 8px;
        padding: 12px;
        cursor: pointer;
        transition: all 0.2s ease;
        position: relative;
      `
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <div style="font-weight: bold; color: ${st.color}; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">
            <span>${st.icon}</span> ${st.name}
          </div>
          ${isActive ? '<span style="font-size: 0.7rem; background: #a855f7; color: #fff; padding: 2px 6px; border-radius: 4px; font-weight: bold;">ĐANG DÙNG</span>' : ''}
        </div>
        <div style="font-size: 0.8rem; color: #9ca3af; line-height: 1.4;">${st.description}</div>
      `
      card.onclick = async () => {
        if (isActive) return
        try {
          const res = await api.setStance(player.id, st.id)
          notify(res.message, 'success')
          state.player = res.player
          renderStances(stances, st.id)
          updateSidebar()
        } catch (e) {
          notify(e.message || 'Chuyển thế thất bại', 'error')
        }
      }
      wrap.appendChild(card)
    })
  }

  function renderImprints(imprints, unlockedCount, totalCount) {
    const countLbl = container.querySelector('#imprintCountLabel')
    if (countLbl) countLbl.textContent = `${unlockedCount}/${totalCount} Dấu Ấn Mở Khóa`

    const wrap = container.querySelector('#imprintsContainer')
    if (!wrap) return
    wrap.innerHTML = ''

    imprints.forEach(imp => {
      const card = document.createElement('div')
      const isUn = imp.isUnlocked
      card.style.cssText = `
        background: ${isUn ? 'rgba(30, 41, 59, 0.7)' : 'rgba(15, 23, 42, 0.5)'};
        border: 1px solid ${isUn ? imp.color : 'rgba(255,255,255,0.1)'};
        border-radius: 8px;
        padding: 12px 14px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-shadow: ${isUn ? `0 0 12px ${imp.color}33` : 'none'};
        opacity: ${isUn ? '1' : '0.85'};
      `

      card.innerHTML = `
        <div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
            <div style="font-weight: bold; color: ${isUn ? imp.color : '#888'}; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">
              <span>${imp.icon}</span> ${imp.name}
            </div>
            <span style="font-size: 0.7rem; color: ${isUn ? '#fbbf24' : '#6b7280'}; border: 1px solid ${isUn ? 'rgba(251,191,36,0.3)' : 'rgba(255,255,255,0.1)'}; padding: 1px 6px; border-radius: 4px;">
              ${imp.title}
            </span>
          </div>

          <div style="font-size: 0.78rem; color: #a1a1aa; font-style: italic; margin-bottom: 8px; line-height: 1.35;">
            "${imp.lore}"
          </div>

          <div style="font-size: 0.82rem; color: ${isUn ? '#e4e4e7' : '#9ca3af'}; margin-bottom: 10px; background: rgba(0,0,0,0.25); padding: 6px 8px; border-radius: 4px;">
            <strong style="color: ${isUn ? '#67e8f9' : '#888'};">Hiệu ứng:</strong> ${imp.description}
          </div>
        </div>

        <div>
          ${isUn ? `
            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 8px; margin-top: 4px;">
              <span style="font-size: 0.75rem; color: #4ade80; font-weight: bold;">✓ ĐÃ KHAI THÁC</span>
              <button class="btn btn--dark btnSetTitle" style="font-size: 0.75rem; padding: 2px 8px;" data-title="${imp.title}">
                ${player.activeTitle === imp.title ? 'Đang Đeo' : 'Đeo Danh Hiệu'}
              </button>
            </div>
          ` : `
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #71717a; margin-bottom: 4px;">
                <span>Tiến độ hành vi:</span>
                <span>${imp.progress.current} / ${imp.progress.threshold}</span>
              </div>
              <div style="height: 6px; background: rgba(255,255,255,0.08); border-radius: 3px; overflow: hidden;">
                <div style="width: ${imp.progress.percent}%; height: 100%; background: ${imp.color}; transition: width 0.3s;"></div>
              </div>
            </div>
          `}
        </div>
      `

      // Handle set title button
      const btnTitle = card.querySelector('.btnSetTitle')
      if (btnTitle) {
        btnTitle.onclick = () => {
          player.activeTitle = imp.title
          notify(`Đã kích hoạt danh hiệu: [${imp.title}]!`, 'success')
          updateSidebar()
          renderImprints(imprints, unlockedCount, totalCount)
        }
      }

      wrap.appendChild(card)
    })
  }
}
