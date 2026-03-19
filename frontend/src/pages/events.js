/**
 * Events Page — Hiển thị danh sách sự kiện (Event Logs) của người chơi
 */
export function pageEvents(el, ctx) {
  const { state, api, notify, updateSidebar } = ctx
  loadEvents(el, ctx)
}

async function loadEvents(container, ctx) {
  const { state, api, notify, updateSidebar } = ctx
  container.innerHTML = '<div class="loading">Đang tải nhật ký sự kiện...</div>'

  try {
    const data = await api.request(`/player/${state.playerId}/events`)
    const events = data.events || []

    // Xóa unread badge
    if (state.player) {
      state.player.unreadEventsCount = 0
      updateSidebar()
    }

    if (events.length === 0) {
      container.innerHTML = `
        <div class="page-header"><h1>📜 Sự Kiện</h1></div>
        <div class="panel">
          <div class="panel-body text-dim" style="text-align:center; padding: 40px;">
            Gió yên biển lặng. Chưa có sự kiện nào xảy ra với bạn.
          </div>
        </div>
      `
      return
    }

    container.innerHTML = `
      <div class="page-header"><h1>📜 Sự Kiện Gần Đây</h1></div>
      <div class="panel">
        <div class="panel-body no-pad">
          <ul class="event-timeline" style="list-style:none; padding:16px; margin:0;">
            ${events.map(ev => {
              const date = new Date(ev.created_at * 1000)
              const timeStr = date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
              const dateStr = date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })
              
              // Icon mapping based on event type
              let icon = '📌'
              if (ev.type === 'attack') icon = '⚔️'
              if (ev.type === 'hospital') icon = '🏥'
              if (ev.type === 'jail') icon = '🚓'
              if (ev.type === 'money') icon = '💰'
              if (ev.type === 'system') icon = '⚙️'
              if (ev.type === 'trade') icon = '🤝'

              return `
                <li style="display:flex; gap:16px; margin-bottom:12px; padding-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.05); align-items:flex-start;">
                  <div style="flex-shrink:0; width:60px; text-align:right; font-size:12px; color:var(--text-dim);">
                    <div>${timeStr}</div>
                    <div>${dateStr}</div>
                  </div>
                  <div style="flex-shrink:0; font-size:18px;">${icon}</div>
                  <div style="flex-grow:1; font-size:14px; line-height:1.4; ${!ev.is_read ? 'font-weight:bold; color:#fff;' : 'color:var(--text-dim);'}">
                    ${ev.message}
                  </div>
                </li>
              `
            }).join('')}
          </ul>
        </div>
      </div>
    `
  } catch (e) {
    container.innerHTML = `<div class="panel"><div class="panel-body text-red">Lỗi tải dữ liệu sự kiện: ${e.message}</div></div>`
  }
}
