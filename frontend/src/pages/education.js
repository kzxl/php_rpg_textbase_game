/**
 * Education Page — Hệ thống Tu Luyện (Trees, Milestones, Nodes)
 */
export function pageEducation(el, ctx) {
  const { state, api, notify, renderGame } = ctx
  const p = state.player
  const trees = state.educationTrees || []
  
  const unlocked = p.unlockedNodes || []
  const studyingFull = p.studyingNode || '' // e.g. "internal_1|internal_cultivation"
  const studyingNodeId = studyingFull ? studyingFull.split('|')[0] : ''
  const endsAt = p.studyEndsAt || 0
  const remaining = Math.max(0, endsAt - Math.floor(Date.now() / 1000))
  const treeProgress = p.treeProgress || {}
  const skillProgress = p.skillProgress || {}

  // Current Active Tab
  let activeTabId = localStorage.getItem('eduActiveTree') || trees[0]?.id
  let activeTree = trees.find(t => t.id === activeTabId) || trees[0]
  if (!activeTree && trees.length > 0) activeTree = trees[0]

  const render = () => {
    if (!activeTree) {
      el.innerHTML = `<div class="p-lg">Chưa có dữ liệu tu luyện.</div>`
      return
    }

    // --- TABS BUIlDER ---
    const tabsHtml = trees.map(t => `
      <button class="edu-tab ${t.id === activeTree.id ? 'active' : ''}" data-tab="${t.id}">
        <span class="edu-tab-icon">${t.icon}</span>
        <span class="edu-tab-name">${t.name}</span>
        <span class="edu-tab-badge">${treeProgress[t.id] || 0}</span>
      </button>
    `).join('')

    // --- Đang Học (Studying Panel) ---
    let studyingHtml = ''
    if (studyingNodeId) {
      let sNode = null
      let sTree = null
      trees.forEach(t => {
        const found = t.nodes.find(n => n.id === studyingNodeId)
        if (found) { sNode = found; sTree = t }
      })

      if (sNode) {
        studyingHtml = `
          <div class="panel edu-studying-panel glass">
            <div class="panel-body text-center">
              <div class="text-sm text-dim mb-xs">Đang lãnh ngộ: ${sTree.name}</div>
              <div class="text-gold text-lg bold">${sNode.name}</div>
              <div class="edu-timer mt-sm">⏳ Còn lại: <strong id="eduCounter">${remaining}s</strong></div>
              <button class="btn btn--green btn--lg mt-md w-full" id="btnCheckEdu" ${remaining > 0 ? 'disabled' : ''}>
                ${remaining > 0 ? 'Đang Lãnh Ngộ...' : '✨ Đột Phá!'}
              </button>
            </div>
          </div>
        `
      }
    }

    // --- MILESTONES BUIlDER ---
    const currentPts = treeProgress[activeTree.id] || 0
    let nextMilestone = null;
    for (const ms of (activeTree.milestones || [])) {
      if (currentPts < ms.require) {
        nextMilestone = ms;
        break;
      }
    }
    
    let milestonesHtml = '';
    if (nextMilestone) {
      milestonesHtml = `
        <div class="edu-milestone locked">
          <div class="ms-header">
            <span class="ms-pts">Cảnh giới kế tiếp: Cần ${nextMilestone.require} Điểm</span>
            <span class="ms-status" style="color:var(--gold)">Trúc cơ chờ đợi</span>
          </div>
          <div class="ms-desc">${nextMilestone.description}</div>
        </div>
      `;
    } else {
      milestonesHtml = `<div class="text-green text-sm flex items-center gap-2"><div style="font-size:24px">🌟</div> Cảnh giới đã viên mãn! Không còn chướng ngại.</div>`;
    }

    // --- NODES BUIlDER ---
    const discovered = p.discoveredNodes || []
    const nodesHtml = (activeTree.nodes || []).map(n => {
      const isDone = unlocked.includes(n.id)
      const isStudying = studyingNodeId === n.id
      const prereqsMet = (n.prerequisites || []).every(req => unlocked.includes(req))
      const hasChild = activeTree.nodes.some(child => (child.prerequisites || []).includes(n.id))
      
      // Tự động discover các node cấp 1 (không có prereq)
      const isDiscovered = discovered.includes(n.id) || isDone || !(n.prerequisites && n.prerequisites.length > 0)

      // HIDE LOGIC FOR COMPACTNESS:
      // - Chưa có Bí Tịch (Manual) thì Ẩn lặn không sủi tăm.
      if (!isDiscovered) return ''
      
      // - Bị đè lên bởi mốc tiếp theo để gọn danh sách (chỉ áp dụng nếu node kế tiếp cùng nhánh đã được discover).
      if (isDone && hasChild) return ''
      
      let stateClass = ''
      if (isStudying) stateClass = 'studying'
      else if (isDone) stateClass = 'done'
      else stateClass = 'available'

      let btnHtml = ''
      if (isStudying) {
        btnHtml = `<button class="btn btn--sm" disabled>Đang Lãnh Ngộ...</button>`
      } else if (studyingNodeId) {
        btnHtml = `<button class="btn btn--sm" disabled>Tâm trí bận rộn</button>`
      } else if (isDone) {
        btnHtml = `<button class="btn btn--sm btn--gold btn-learn" data-node="${n.id}">Tiếp Tục Lãnh Ngộ (${n.duration}s)</button>`
      } else if (!prereqsMet) {
        btnHtml = `<button class="btn btn--sm" disabled>Chưa đả thông kinh mạch</button>`
      } else {
        btnHtml = `<button class="btn btn--sm btn--blue btn-learn" data-node="${n.id}">Bắt Đầu (${n.duration}s)</button>`
      }

      const sp = skillProgress[n.id] || { level: 1, exp: 0 }
      const maxExp = sp.level * 100
      let lvlHtml = ''
      if (isDone) {
        lvlHtml = `<div class="text-xs text-gold mt-xs">Cảnh giới: ${sp.level} | Độ hiểu thấu: ${sp.exp}/${maxExp}</div>`
      }

      return `
        <div class="edu-node ${stateClass}">
          <div class="edu-node-info">
            <div class="edu-node-title">${n.name}</div>
            <div class="edu-node-desc">${n.description}</div>
            <div class="edu-node-bonus text-green text-sm mt-xs">${n.bonusDescription}</div>
            ${lvlHtml}
          </div>
          <div class="edu-node-action">
            ${btnHtml}
          </div>
        </div>
      `
    }).join('')


    el.innerHTML = `
      <div class="page-header">
        <h1>🧘 Công Pháp Tu Luyện</h1>
        <div class="text-dim text-sm mt-xs">Tu luyện công pháp, nâng cao thông thạo từng bước.</div>
      </div>

      <div class="edu-layout">
        <div class="edu-sidebar">
          <div class="edu-tabs">${tabsHtml}</div>
          ${studyingHtml}
        </div>
        
        <div class="edu-content">
          <div class="panel glass">
            <div class="panel-body">
              <h2 class="text-lg text-gold mb-sm">${activeTree.icon} ${activeTree.name}</h2>
              <p class="text-dim mb-md">${activeTree.description}</p>
              
              <h3 class="text-md mb-xs mt-md border-b pb-xs">🌟 Cảnh Giới Đột Phá</h3>
              <div class="edu-milestones-grid mb-lg">
                ${milestonesHtml || '<div class="text-dim text-sm">Nhánh này chưa có cảnh giới đặc biệt.</div>'}
              </div>

              <h3 class="text-md mb-xs border-b pb-xs">📖 Pháp Quyết</h3>
              <div class="edu-nodes-list">
                ${nodesHtml || '<div class="text-dim text-sm">Chưa có pháp quyết.</div>'}
              </div>
            </div>
          </div>
        </div>
      </div>
    `

    // Attach Listeners
    el.querySelectorAll('.edu-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        const tid = btn.dataset.tab
        localStorage.setItem('eduActiveTree', tid)
        activeTabId = tid
        activeTree = trees.find(t => t.id === tid) || trees[0]
        render()
      })
    })

    // Timer Logic for Countdown
    if (window.eduTimer) clearInterval(window.eduTimer)
    if (studyingNodeId && endsAt > 0) {
      window.eduTimer = setInterval(() => {
        const now = Math.floor(Date.now() / 1000);
        let currentRem = Math.max(0, endsAt - now);
        
        const counter = document.getElementById('eduCounter');
        if (counter) counter.innerText = currentRem + 's';
        
        if (currentRem <= 0) {
          clearInterval(window.eduTimer);
          const btn = document.getElementById('btnCheckEdu');
          if (btn) {
            btn.disabled = false;
            btn.innerHTML = '✨ Đột Phá!';
          }
        }
      }, 1000);
    }

    const btnCheck = el.querySelector('#btnCheckEdu')
    if (btnCheck) {
      btnCheck.addEventListener('click', async () => {
        try {
          btnCheck.disabled = true
          btnCheck.innerHTML = 'Đang xử lý...'
          const data = await api.checkEducation(state.playerId)
          state.player = data.player
          notify(data.message, data.completed ? 'success' : 'info')
          renderGame() // Re-render the whole game shell to update sidebar stats and page again
        } catch (e) {
          notify(e.message || 'Lỗi đột phá', 'error')
          btnCheck.disabled = false
          btnCheck.innerHTML = 'Thử lại'
        }
      })
    }

    el.querySelectorAll('.btn-learn').forEach(btn => {
      btn.addEventListener('click', async () => {
        try {
          const nodeId = btn.dataset.node
          btn.disabled = true
          btn.innerHTML = 'Chờ...'
          const data = await api.enrollNode(state.playerId, nodeId, activeTree.id)
          state.player = data.player
          notify(data.message, 'success')
          renderGame()
        } catch (e) {
          notify(e.message || 'Lỗi ghi danh', 'error')
          btn.disabled = false
          btn.innerHTML = 'Bắt Đầu'
        }
      })
    })
  }

  // Initial render
  render()
}
