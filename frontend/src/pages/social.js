/**
 * Giao Tế – Đạo Hữu & Kẻ Thù
 * Social page: friends, enemies, pending requests, player search
 */
export function pageSocial(el, ctx) {
  const { state, api, notify, renderGame, updateSidebar } = ctx
  const pid = state.playerId

  // Local state for this page
  if (!state._social) {
    state._social = {
      tab: 'friends',
      searchQuery: '',
      searchResults: [],
      relationships: { friends: [], enemies: [], pendingSent: [], pendingReceived: [] },
      loaded: false,
    }
  }
  const s = state._social

  async function loadRelationships() {
    try {
      const data = await api.getRelationships(pid)
      s.relationships = data
      s.loaded = true
      renderSocialPage()
    } catch (e) {
      notify(e.message || 'Lỗi tải dữ liệu Giao Tế', 'error')
    }
  }

  function renderSocialPage() {
    const { friends, enemies, pendingSent, pendingReceived } = s.relationships
    const pendingCount = pendingReceived.length

    el.innerHTML = `
      <div class="page-header">
        <h2>🤝 Đạo Hữu</h2>
        <p class="page-sub">Kết bạn bè, đánh dấu kẻ thù, giao lưu giang hồ</p>
      </div>

      <!-- Search -->
      <div class="card" style="margin-bottom:16px">
        <div style="display:flex;gap:8px;align-items:center">
          <input type="text" id="socialSearch" placeholder="Tìm người chơi theo tên..." 
                 value="${s.searchQuery}" 
                 style="flex:1;padding:8px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:14px" />
          <button class="btn btn--blue btn--sm" id="btnSearch">🔍 Tìm</button>
        </div>
        ${s.searchResults.length > 0 ? `
          <div style="margin-top:12px">
            ${s.searchResults.map(p => `
              <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:8px;border-bottom:1px solid rgba(255,255,255,0.05)">
                <div>
                  <span style="font-weight:600;color:var(--gold)">${p.name}</span>
                  <span style="opacity:0.6;margin-left:8px">Lv.${p.level} · ${p.realm} · ${p.gender === 'male' ? '♂' : '♀'}</span>
                </div>
                <div style="display:flex;gap:4px">
                  ${p.id !== pid ? `
                    <button class="btn btn--sm btn--blue" data-action="add-friend" data-target="${p.id}">🤝 Kết Giao</button>
                    <button class="btn btn--sm btn--dark" data-action="add-enemy" data-target="${p.id}">⚔️ Kẻ Thù</button>
                  ` : '<span style="opacity:0.4;font-size:12px">Bạn</span>'}
                </div>
              </div>
            `).join('')}
          </div>
        ` : (s.searchQuery ? '<div style="margin-top:12px;text-align:center;color:var(--text-dim)">Không có đạo hữu nào phù hợp.</div>' : '')}
      </div>

      <!-- Tabs -->
      <div class="social-tabs" style="display:flex;gap:8px;margin-bottom:16px">
        <button class="btn btn--sm ${s.tab === 'friends' ? 'btn--blue' : 'btn--dark'}" data-tab="friends">
          🤝 Đạo Hữu (${friends.length})
        </button>
        <button class="btn btn--sm ${s.tab === 'enemies' ? 'btn--blue' : 'btn--dark'}" data-tab="enemies">
          ⚔️ Kẻ Thù (${enemies.length})
        </button>
        <button class="btn btn--sm ${s.tab === 'pending' ? 'btn--blue' : 'btn--dark'}" data-tab="pending">
          📨 Lời Mời ${pendingCount > 0 ? `<span class="badge">${pendingCount}</span>` : ''}
        </button>
      </div>

      <!-- Content -->
      <div class="card">
        ${s.tab === 'friends' ? renderFriendsList(friends) : ''}
        ${s.tab === 'enemies' ? renderEnemiesList(enemies) : ''}
        ${s.tab === 'pending' ? renderPendingList(pendingReceived, pendingSent) : ''}
      </div>
    `

    // Event bindings
    bindEvents()
  }

  function renderFriendsList(friends) {
    if (friends.length === 0) return '<div style="text-align:center;opacity:0.5;padding:20px">Chưa có đạo hữu nào. Hãy tìm kiếm và kết giao!</div>'
    return friends.map(f => `
      <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
        <div>
          <span style="font-weight:600;color:var(--green)">${f.name}</span>
          <span style="opacity:0.6;margin-left:8px">Lv.${f.level} · ${f.realm}</span>
          <div style="font-size:11px;opacity:0.4;margin-top:2px">📍 ${f.currentArea || 'unknown'}</div>
        </div>
        <button class="btn btn--sm btn--dark" data-action="remove-friend" data-target="${f.id}" title="Hủy kết giao">💔</button>
      </div>
    `).join('')
  }

  function renderEnemiesList(enemies) {
    if (enemies.length === 0) return '<div style="text-align:center;opacity:0.5;padding:20px">Không có kẻ thù. Giang hồ thái bình!</div>'
    return enemies.map(e => `
      <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
        <div>
          <span style="font-weight:600;color:var(--red)">${e.name}</span>
          <span style="opacity:0.6;margin-left:8px">Lv.${e.level} · ${e.realm}</span>
          <div style="font-size:11px;opacity:0.4;margin-top:2px">📍 ${e.currentArea || 'unknown'}</div>
        </div>
        <button class="btn btn--sm btn--dark" data-action="remove-enemy" data-target="${e.id}" title="Bỏ kẻ thù">🕊️</button>
      </div>
    `).join('')
  }

  function renderPendingList(received, sent) {
    let html = ''
    if (received.length > 0) {
      html += '<div style="font-weight:600;margin-bottom:8px;color:var(--gold)">📥 Lời mời nhận được</div>'
      html += received.map(p => `
        <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05)">
          <div>
            <span style="font-weight:600">${p.name}</span>
            <span style="opacity:0.6;margin-left:8px">Lv.${p.level} · ${p.realm}</span>
          </div>
          <div style="display:flex;gap:4px">
            <button class="btn btn--sm btn--green" data-action="accept-friend" data-target="${p.id}">✅ Chấp Nhận</button>
            <button class="btn btn--sm btn--dark" data-action="reject-friend" data-target="${p.id}">❌ Từ Chối</button>
          </div>
        </div>
      `).join('')
    }
    if (sent.length > 0) {
      html += '<div style="font-weight:600;margin-top:16px;margin-bottom:8px;opacity:0.7">📤 Lời mời đã gửi</div>'
      html += sent.map(p => `
        <div class="social-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.05);opacity:0.6">
          <div>
            <span>${p.name}</span>
            <span style="opacity:0.6;margin-left:8px">Lv.${p.level}</span>
          </div>
          <span style="font-size:12px">⏳ Đang chờ</span>
        </div>
      `).join('')
    }
    if (received.length === 0 && sent.length === 0) {
      html = '<div style="text-align:center;opacity:0.5;padding:20px">Không có lời mời nào.</div>'
    }
    return html
  }

  function bindEvents() {
    // Search
    document.getElementById('btnSearch')?.addEventListener('click', async () => {
      const q = document.getElementById('socialSearch')?.value.trim()
      if (!q || q.length < 2) return notify('Cần ít nhất 2 ký tự', 'error')
      s.searchQuery = q
      try {
        const data = await api.searchPlayers(q)
        s.searchResults = data.players || []
        renderSocialPage()
      } catch (e) {
        notify(e.message, 'error')
      }
    })

    // Enter key for search
    document.getElementById('socialSearch')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') document.getElementById('btnSearch')?.click()
    })

    // Tabs
    document.querySelectorAll('[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        s.tab = btn.dataset.tab
        renderSocialPage()
      })
    })

    // Actions
    document.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const action = btn.dataset.action
        const targetId = btn.dataset.target
        btn.disabled = true
        try {
          let data
          switch (action) {
            case 'add-friend': data = await api.addFriend(pid, targetId); break
            case 'accept-friend': data = await api.acceptFriend(pid, targetId); break
            case 'reject-friend': data = await api.rejectFriend(pid, targetId); break
            case 'remove-friend': data = await api.removeFriend(pid, targetId); break
            case 'add-enemy': data = await api.addEnemy(pid, targetId); break
            case 'remove-enemy': data = await api.removeEnemy(pid, targetId); break
          }
          notify(data.message || 'Thành công!', 'success')
          await loadRelationships()
        } catch (e) {
          notify(e.message || 'Lỗi!', 'error')
          btn.disabled = false
        }
      })
    })
  }

  // Initial load
  if (!s.loaded) {
    loadRelationships()
  } else {
    renderSocialPage()
  }
}
