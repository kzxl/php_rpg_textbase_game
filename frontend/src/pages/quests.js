import { pageDailyQuest } from './dailyquest.js'

export function pageQuests(el, ctx) {
  const { state, api, notify, renderGame } = ctx
  const activeTab = state._questTab || 'npc'

  el.innerHTML = `
    <div class="page-header">
      <h2>📜 Thiên Cơ Nhiệm Vụ</h2>
      <p class="page-subtitle">Theo dõi tiến độ kỳ duyên NPC và nhiệm vụ nhật thường</p>
    </div>
    <div class="tab-bar" style="display:flex;gap:0;margin-bottom:12px;border-bottom:2px solid rgba(255,255,255,0.1)">
      <button class="tab-btn ${activeTab === 'npc' ? 'active' : ''}" data-qtab="npc" style="flex:1;padding:10px;border:none;background:${activeTab === 'npc' ? 'rgba(255,255,255,0.08)' : 'transparent'};color:${activeTab === 'npc' ? 'var(--gold)' : 'var(--text-dim)'};cursor:pointer;font-size:14px;font-weight:${activeTab === 'npc' ? '700' : '400'};border-bottom:2px solid ${activeTab === 'npc' ? 'var(--gold)' : 'transparent'};transition:all 0.2s">
        📜 Kỳ Duyên NPC
      </button>
      <button class="tab-btn ${activeTab === 'daily' ? 'active' : ''}" data-qtab="daily" style="flex:1;padding:10px;border:none;background:${activeTab === 'daily' ? 'rgba(255,255,255,0.08)' : 'transparent'};color:${activeTab === 'daily' ? 'var(--gold)' : 'var(--text-dim)'};cursor:pointer;font-size:14px;font-weight:${activeTab === 'daily' ? '700' : '400'};border-bottom:2px solid ${activeTab === 'daily' ? 'var(--gold)' : 'transparent'};transition:all 0.2s">
        📋 Nhật Thường Hàng Ngày
      </button>
    </div>
    <div id="questTabContent">
      <div id="questList" class="quest-container">
        <div class="loading-spinner">⏳ Đang tải...</div>
      </div>
    </div>
  `

  el.querySelectorAll('[data-qtab]').forEach(btn => {
    btn.addEventListener('click', () => {
      state._questTab = btn.dataset.qtab
      pageQuests(el, ctx)
    })
  })

  const contentEl = el.querySelector('#questTabContent')
  if (activeTab === 'daily') {
    pageDailyQuest(contentEl, ctx)
    return
  }

  loadQuests()

  async function loadQuests() {
    try {
      const data = await api.getQuests(state.playerId)
      const quests = data.quests || []
      const container = document.getElementById('questList')
      if (!container) return

      if (quests.length === 0) {
        container.innerHTML = `
          <div class="empty-state">
            <div class="empty-icon">📜</div>
            <p>Chưa có nhiệm vụ nào.</p>
            <p class="text-muted">Hãy đi Khám Phá để gặp NPC và nhận nhiệm vụ!</p>
          </div>
        `
        return
      }

      container.innerHTML = quests.map(q => {
        const pct = q.questAmount > 0 ? Math.min(100, (q.progress / q.questAmount) * 100) : 0
        const isDone = q.progress >= q.questAmount
        const typeIcon = q.questType === 'kill' ? '⚔️' : '📦'
        const statusClass = isDone ? 'quest-done' : ''

        return `
          <div class="quest-card ${statusClass}" data-quest-id="${q.quest_id}">
            <div class="quest-header">
              <span class="quest-npc">${q.npcIcon || '🧓'} ${q.npcName || 'NPC'}</span>
              <span class="quest-type">${typeIcon} ${q.questType === 'kill' ? 'Tiêu Diệt' : 'Thu Thập'}</span>
            </div>
            <div class="quest-name">${q.questName || q.quest_id}</div>
            <div class="quest-desc">${q.questDescription || ''}</div>
            <div class="quest-progress">
              <div class="bar-track" style="height:8px">
                <div class="bar-fill ${isDone ? 'hp' : 'energy'}" style="width:${pct}%"></div>
              </div>
              <span class="quest-progress-text">${q.progress}/${q.questAmount}</span>
            </div>
            ${isDone ? `<button class="btn btn--gold btn--sm quest-complete-btn" data-qid="${q.quest_id}">✅ Trả Nhiệm Vụ</button>` : ''}
          </div>
        `
      }).join('')

      // Complete quest buttons
      container.querySelectorAll('.quest-complete-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          const qid = btn.dataset.qid
          btn.disabled = true
          btn.textContent = '⏳...'
          try {
            const result = await api.completeQuest(state.playerId, qid)
            state.player = result.player
            notify(result.message, 'success')
            if (result.skillGained) {
              notify(`🎯 Lĩnh ngộ: ${result.skillGained}!`, 'success')
            }
            renderGame()
          } catch (e) {
            notify(e.message || 'Lỗi trả quest', 'error')
            btn.disabled = false
            btn.textContent = '✅ Trả Nhiệm Vụ'
          }
        })
      })
    } catch (e) {
      console.error('Error loading quests:', e)
      const container = document.getElementById('questList')
      if (container) {
        container.innerHTML = '<p class="text-muted">Không thể tải nhiệm vụ.</p>'
      }
    }
  }
}
