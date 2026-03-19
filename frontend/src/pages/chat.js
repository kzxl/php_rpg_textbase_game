/**
 * Chat – Giang Hồ Truyền Âm
 * Global chat + Private messages to friends
 * Auto-polls every 5 seconds
 */
export function pageChat(el, ctx) {
  const { state, api, notify } = ctx
  const pid = state.playerId

  if (!state._chat) {
    state._chat = {
      tab: 'global',
      globalMessages: [],
      privateMessages: [],
      friends: [],
      selectedFriend: null,
      lastGlobalId: 0,
      lastPrivateId: 0,
      pollTimer: null,
      loaded: false,
    }
  }
  const c = state._chat

  async function loadInitial() {
    try {
      const [globalData, friendsData] = await Promise.all([
        api.getGlobalChat(),
        api.getChatFriends(pid),
      ])
      c.globalMessages = globalData.messages || []
      c.friends = friendsData.friends || []
      if (c.globalMessages.length > 0) {
        c.lastGlobalId = c.globalMessages[c.globalMessages.length - 1].id
      }
      c.loaded = true
      renderChat()
      startPolling()
    } catch (e) {
      notify(e.message || 'Lỗi tải chat', 'error')
    }
  }

  function startPolling() {
    stopPolling()
    c.pollTimer = setInterval(async () => {
      try {
        if (c.tab === 'global') {
          const data = await api.getGlobalChat(c.lastGlobalId)
          if (data.messages && data.messages.length > 0) {
            c.globalMessages.push(...data.messages)
            // Keep only last 100
            if (c.globalMessages.length > 100) c.globalMessages = c.globalMessages.slice(-100)
            c.lastGlobalId = c.globalMessages[c.globalMessages.length - 1].id
            renderMessageList()
            scrollToBottom()
          }
        } else if (c.tab === 'private' && c.selectedFriend) {
          const data = await api.getPrivateChat(pid, c.selectedFriend.id, c.lastPrivateId)
          if (data.messages && data.messages.length > 0) {
            c.privateMessages.push(...data.messages)
            if (c.privateMessages.length > 100) c.privateMessages = c.privateMessages.slice(-100)
            c.lastPrivateId = c.privateMessages[c.privateMessages.length - 1].id
            renderMessageList()
            scrollToBottom()
          }
        }
      } catch (_) { /* silent poll error */ }
    }, 5000)
  }

  function stopPolling() {
    if (c.pollTimer) { clearInterval(c.pollTimer); c.pollTimer = null }
  }

  function renderChat() {
    const messages = c.tab === 'global' ? c.globalMessages : c.privateMessages

    el.innerHTML = `
      <div class="page-header">
        <h2>💬 Giang Hồ Truyền Âm</h2>
        <p class="page-sub">Giao lưu với các đạo hữu trong giang hồ</p>
      </div>

      <div class="chat-tabs" style="display:flex;gap:8px;margin-bottom:12px">
        <button class="btn btn--sm ${c.tab === 'global' ? 'btn--blue' : 'btn--dark'}" data-chat-tab="global">🌍 Toàn Cầu</button>
        <button class="btn btn--sm ${c.tab === 'private' ? 'btn--blue' : 'btn--dark'}" data-chat-tab="private">📨 Riêng</button>
        ${c.tab === 'private' ? `
          <select id="friendSelect" style="flex:1;padding:4px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:13px">
            <option value="">-- Chọn Đạo Hữu --</option>
            ${c.friends.map(f => `<option value="${f.id}" ${c.selectedFriend?.id === f.id ? 'selected' : ''}>${f.name} (Lv.${f.level})</option>`).join('')}
          </select>
        ` : ''}
      </div>

      <div class="card" style="height:400px;display:flex;flex-direction:column;overflow:hidden">
        <div id="chatMessages" style="flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:4px">
          ${renderMessages(messages)}
        </div>
        <div style="padding:8px;border-top:1px solid rgba(255,255,255,0.1);display:flex;gap:8px">
          <input type="text" id="chatInput" placeholder="${c.tab === 'global' ? 'Nói gì đó với giang hồ...' : 'Nhắn riêng...'}"
                 maxlength="500"
                 style="flex:1;padding:8px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:14px" />
          <button class="btn btn--blue btn--sm" id="btnSend">📤</button>
        </div>
      </div>
    `

    bindChatEvents()
    scrollToBottom()
  }

  function renderMessages(messages) {
    if (messages.length === 0) {
      return '<div style="text-align:center;opacity:0.4;padding:40px">Chưa có tin nhắn nào...</div>'
    }
    return messages.map(m => {
      const isMe = m.sender_id === pid
      const time = new Date(m.created_at).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      return `
        <div style="padding:4px 0;${isMe ? 'text-align:right' : ''}">
          <span style="font-size:11px;opacity:0.4">${time}</span>
          <span style="font-weight:600;color:${isMe ? 'var(--blue)' : 'var(--gold)'}"> ${m.sender_name}</span>
          <span style="opacity:0.8">: ${escapeHtml(m.message)}</span>
        </div>
      `
    }).join('')
  }

  function renderMessageList() {
    const msgEl = document.getElementById('chatMessages')
    if (!msgEl) return
    const messages = c.tab === 'global' ? c.globalMessages : c.privateMessages
    msgEl.innerHTML = renderMessages(messages)
  }

  function scrollToBottom() {
    const msgEl = document.getElementById('chatMessages')
    if (msgEl) msgEl.scrollTop = msgEl.scrollHeight
  }

  function escapeHtml(str) {
    const div = document.createElement('div')
    div.textContent = str
    return div.innerHTML
  }

  function bindChatEvents() {
    // Tab switching
    document.querySelectorAll('[data-chat-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        c.tab = btn.dataset.chatTab
        if (c.tab === 'global') {
          c.lastGlobalId = c.globalMessages.length > 0 ? c.globalMessages[c.globalMessages.length - 1].id : 0
        }
        renderChat()
        startPolling()
      })
    })

    // Friend select
    document.getElementById('friendSelect')?.addEventListener('change', async (e) => {
      const friendId = e.target.value
      if (!friendId) { c.selectedFriend = null; c.privateMessages = []; renderChat(); return }
      c.selectedFriend = c.friends.find(f => f.id === friendId) || null
      c.lastPrivateId = 0
      try {
        const data = await api.getPrivateChat(pid, friendId)
        c.privateMessages = data.messages || []
        if (c.privateMessages.length > 0) {
          c.lastPrivateId = c.privateMessages[c.privateMessages.length - 1].id
        }
        renderMessageList()
        scrollToBottom()
      } catch (e) { notify(e.message, 'error') }
    })

    // Send
    const sendFn = async () => {
      const input = document.getElementById('chatInput')
      const msg = input?.value.trim()
      if (!msg) return

      if (c.tab === 'private' && !c.selectedFriend) {
        return notify('Chọn Đạo Hữu trước!', 'error')
      }

      try {
        await api.sendChat(pid, c.tab, c.tab === 'private' ? c.selectedFriend.id : null, msg)
        input.value = ''
        // Immediate refresh
        if (c.tab === 'global') {
          const data = await api.getGlobalChat(c.lastGlobalId)
          if (data.messages?.length > 0) {
            c.globalMessages.push(...data.messages)
            c.lastGlobalId = c.globalMessages[c.globalMessages.length - 1].id
          }
        } else {
          const data = await api.getPrivateChat(pid, c.selectedFriend.id, c.lastPrivateId)
          if (data.messages?.length > 0) {
            c.privateMessages.push(...data.messages)
            c.lastPrivateId = c.privateMessages[c.privateMessages.length - 1].id
          }
        }
        renderMessageList()
        scrollToBottom()
      } catch (e) {
        notify(e.message || 'Lỗi gửi tin nhắn', 'error')
      }
    }

    document.getElementById('btnSend')?.addEventListener('click', sendFn)
    document.getElementById('chatInput')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendFn()
    })
  }

  // Cleanup on page change — stop polling
  const origRenderPage = ctx.renderGame
  // We rely on re-init to clean up

  if (!c.loaded) {
    loadInitial()
  } else {
    renderChat()
    startPolling()
  }
}
