/**
 * Admin Page — Thiên Đạo Đài (Control Panel)
 * Tab-based editor for all JSON game data.
 */
export function pageAdmin(el, ctx) {
  const { state, api, notify, renderGame } = ctx

  if (state.player.role !== 'admin') {
    el.innerHTML = `<div class="panel"><div class="panel-body text-center text-red">⛔ Không có quyền truy cập Thiên Đạo Đài.</div></div>`
    return
  }

  const tabs = [
    { id: 'monsters', label: '🐉 Quái Vật', file: 'monsters' },
    { id: 'npcs', label: '🧓 NPC', file: 'npcs' },
    { id: 'areas', label: '🗺️ Khu Vực', file: 'areas' },
    { id: 'items', label: '⚔️ Vật Phẩm', file: 'items' },
    { id: 'materials', label: '🧪 Nguyên Liệu', file: 'materials' },
    { id: 'crimes', label: '🕵️ Hành Động', file: 'crimes' },
    { id: 'education', label: '📖 Tu Luyện', file: 'education' },
  ]

  let activeTab = 'monsters'

  el.innerHTML = `
    <div class="page-header">
      <h1>🛠 Thiên Đạo Đài</h1>
      <div class="page-subtitle">Admin Control Panel — Chỉnh sửa dữ liệu game trực tiếp</div>
    </div>
    <div class="admin-layout">
      <div class="admin-tabs" id="adminTabs">
        ${tabs.map(t => `
          <button class="admin-tab ${t.id === activeTab ? 'active' : ''}" data-tab="${t.id}">${t.label}</button>
        `).join('')}
      </div>
      <div class="admin-content" id="adminContent">
        <div class="loading-spinner">⏳ Đang tải...</div>
      </div>
    </div>
  `

  // Tab switching
  document.getElementById('adminTabs').addEventListener('click', (e) => {
    const btn = e.target.closest('.admin-tab')
    if (!btn) return
    activeTab = btn.dataset.tab
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'))
    btn.classList.add('active')
    loadTabData(activeTab)
  })

  loadTabData(activeTab)

  async function loadTabData(tabId) {
    const container = document.getElementById('adminContent')
    if (!container) return
    container.innerHTML = '<div class="loading-spinner">⏳ Đang tải...</div>'

    try {
      const data = await api.request(`/admin/${tabId}`)
      renderTabContent(tabId, data, container)
    } catch (e) {
      container.innerHTML = `<div class="panel"><div class="panel-body text-red">Lỗi: ${e.message}</div></div>`
    }
  }

  function renderTabContent(tabId, data, container) {
    if (tabId === 'monsters') renderMonsters(data, container)
    else if (tabId === 'npcs') renderNpcs(data, container)
    else if (tabId === 'areas') renderAreas(data, container)
    else renderGenericJson(tabId, data, container)
  }

  // === MONSTER EDITOR ===
  function renderMonsters(data, container) {
    const monsters = data.monsters || []
    container.innerHTML = `
      <div class="admin-table-header">
        <span class="text-dim">${monsters.length} quái vật</span>
      </div>
      <div class="admin-grid">
        ${monsters.map(m => `
          <div class="admin-card" data-id="${m.id}">
            <div class="admin-card-header">
              <span class="admin-card-name">${m.name} ${m.isWorldBoss ? '🔥' : ''}</span>
              <span class="badge" style="background:${data.tierInfo?.[m.tier]?.color || '#888'}">${data.tierInfo?.[m.tier]?.name || 'T' + m.tier}</span>
            </div>
            <div class="admin-card-stats">
              <div>❤ ${m.stats?.hp || '?'}</div>
              <div>💪 ${m.stats?.strength || '?'}</div>
              <div>🏃 ${m.stats?.speed || '?'}</div>
              <div>🛡 ${m.stats?.defense || '?'}</div>
            </div>
            <div class="admin-card-meta">
              <span>XP: ${m.xpReward || 0}</span>
              <span>Gold: ${Array.isArray(m.goldReward) ? m.goldReward.join('-') : m.goldReward}</span>
              ${m.areaId ? `<span>📍 ${m.areaId}</span>` : ''}
            </div>
            <button class="btn btn--blue btn--sm admin-edit-btn" data-id="${m.id}" data-type="monsters" data-key="monsters">✏️ Sửa</button>
          </div>
        `).join('')}
      </div>
    `
    bindEditButtons(container, data, 'monsters', 'monsters')
  }

  // === NPC EDITOR ===
  function renderNpcs(data, container) {
    const npcs = data.npcs || []
    container.innerHTML = `
      <div class="admin-table-header">
        <span class="text-dim">${npcs.length} NPC</span>
      </div>
      <div class="admin-grid">
        ${npcs.map(n => `
          <div class="admin-card" data-id="${n.id}">
            <div class="admin-card-header">
              <span class="admin-card-name">${n.icon || '🧓'} ${n.name}</span>
              <span class="badge" style="background:var(--purple)">${n.profession}</span>
            </div>
            <div class="admin-card-meta">
              <span>Quests: ${(n.quests || []).length}</span>
              <span>Areas: ${(n.areaIds || []).join(', ')}</span>
            </div>
            <button class="btn btn--blue btn--sm admin-edit-btn" data-id="${n.id}" data-type="npcs" data-key="npcs">✏️ Sửa</button>
          </div>
        `).join('')}
      </div>
    `
    bindEditButtons(container, data, 'npcs', 'npcs')
  }

  // === AREA EDITOR ===
  function renderAreas(data, container) {
    const areaIds = Object.keys(data)
    container.innerHTML = `
      <div class="admin-table-header">
        <span class="text-dim">${areaIds.length} khu vực</span>
      </div>
      <div class="admin-grid">
        ${areaIds.map(id => {
          const a = data[id]
          return `
            <div class="admin-card" data-id="${id}">
              <div class="admin-card-header">
                <span class="admin-card-name">📍 ${a.name || id}</span>
                <span class="badge" style="background:var(--orange)">⚡${a.staminaCost}</span>
              </div>
              <div class="admin-card-meta">
                ${(a.events || []).map(e => `<span>${e.type}: ${e.weight}</span>`).join('')}
              </div>
              <button class="btn btn--blue btn--sm admin-edit-area" data-id="${id}">✏️ Sửa</button>
            </div>
          `
        }).join('')}
      </div>
    `
    container.querySelectorAll('.admin-edit-area').forEach(btn => {
      btn.addEventListener('click', () => {
        const areaId = btn.dataset.id
        const areaData = data[areaId]
        showJsonEditor(areaId, areaData, `areas/${areaId}`, container)
      })
    })
  }

  // === GENERIC JSON EDITOR ===
  function renderGenericJson(tabId, data, container) {
    const jsonStr = JSON.stringify(data, null, 2)
    const lineCount = jsonStr.split('\n').length
    container.innerHTML = `
      <div class="admin-table-header">
        <span class="text-dim">${tabId} — Raw JSON Editor</span>
        <button class="btn btn--gold btn--sm" id="btnSaveGeneric">💾 Lưu</button>
      </div>
      <textarea id="genericEditor" class="admin-json-editor" rows="${Math.min(lineCount + 5, 30)}">${escapeHtml(jsonStr)}</textarea>
    `
    document.getElementById('btnSaveGeneric')?.addEventListener('click', async () => {
      try {
        const val = document.getElementById('genericEditor').value
        const parsed = JSON.parse(val)
        // For generic, we save the entire object via PUT with first key
        notify('Generic save chưa hỗ trợ — vui lòng dùng editor chi tiết.', 'error')
      } catch (e) {
        notify('JSON không hợp lệ: ' + e.message, 'error')
      }
    })
  }

  // === JSON EDIT MODAL ===
  function showJsonEditor(entityId, entityData, apiPath, parentContainer) {
    const jsonStr = JSON.stringify(entityData, null, 2)
    const modal = document.createElement('div')
    modal.className = 'admin-modal-overlay'
    modal.innerHTML = `
      <div class="admin-modal">
        <div class="admin-modal-header">
          <span>✏️ Sửa: ${entityId}</span>
          <button class="btn btn--dark btn--sm admin-modal-close">✕</button>
        </div>
        <textarea class="admin-json-editor" id="modalEditor" rows="20">${escapeHtml(jsonStr)}</textarea>
        <div class="admin-modal-footer">
          <button class="btn btn--gold" id="btnModalSave">💾 Lưu Thay Đổi</button>
          <button class="btn btn--dark admin-modal-close">Hủy</button>
        </div>
      </div>
    `
    document.body.appendChild(modal)

    modal.querySelectorAll('.admin-modal-close').forEach(btn => {
      btn.addEventListener('click', () => modal.remove())
    })
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove()
    })

    document.getElementById('btnModalSave').addEventListener('click', async () => {
      try {
        const val = document.getElementById('modalEditor').value
        const parsed = JSON.parse(val)
        await api.request(`/admin/${apiPath}`, {
          method: 'PUT',
          body: JSON.stringify(parsed),
        })
        notify('✅ Đã lưu!', 'success')
        modal.remove()
        loadTabData(activeTab)
      } catch (e) {
        notify('Lỗi: ' + e.message, 'error')
      }
    })
  }

  function bindEditButtons(container, data, apiType, dataKey) {
    container.querySelectorAll('.admin-edit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id
        const items = data[dataKey] || []
        const item = items.find(i => i.id === id)
        if (item) showJsonEditor(id, item, `${apiType}/${id}`, container)
      })
    })
  }

  function escapeHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
  }
}
