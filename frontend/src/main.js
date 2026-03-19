/**
 * Nghịch Thiên Ký – Tu Tiên RPG
 * App Shell: routing, sidebar, state, notifications
 * Pages are imported from ./pages/
 */
import './style.css'
import { api } from './services/api.js'
import { pageCombat } from './pages/combat.js'
import { pageStats } from './pages/stats.js'
import { pageSkills } from './pages/skills.js'
import { pageInventory } from './pages/inventory.js'
import { pageGym } from './pages/gym.js'
import { pageCrimes } from './pages/crimes.js'
import { pageEducation } from './pages/education.js'
import { pageTravel } from './pages/travel.js'

// ===== STATE =====
const state = {
  playerId: null,
  player: null,
  currentPage: 'combat',
  monsters: [],
  skills: [],
  items: [],
}

const app = document.getElementById('app')

// ===== SHARED CONTEXT (passed to all page modules) =====
const ctx = {
  get state() { return state },
  api,
  notify,
  renderGame,
  updateSidebar,
}

// ===== RENDER =====
async function render() {
  // Auto-login from localStorage
  const savedId = localStorage.getItem('playerId')
  if (savedId && !state.playerId) {
    try {
      const data = await api.getPlayer(savedId)
      state.playerId = savedId
      state.player = data.player
      await loadGameData()
      renderGame()
      return
    } catch (e) {
      localStorage.removeItem('playerId')
    }
  }

  if (!state.playerId) {
    renderIntro()
  } else {
    renderGame()
  }
}

// ==============================
// INTRO / AUTH (Login + Register)
// ==============================
function renderIntro() {
  const authTab = state.authTab || 'login'
  app.innerHTML = `
    <div class="intro-page">
      <div class="intro-box">
        <div class="title">NGHỊCH THIÊN KÝ</div>
        <div class="intro-text">Thế giới này vận hành theo quy luật tuyệt đối.
Không ai có thể vượt qua.

...Cho đến khi hệ thống xuất hiện lỗi.</div>

        <div class="auth-tabs">
          <button class="btn btn--sm ${authTab === 'login' ? 'btn--blue' : 'btn--dark'}" data-auth="login">Đăng nhập</button>
          <button class="btn btn--sm ${authTab === 'register' ? 'btn--blue' : 'btn--dark'}" data-auth="register">Đăng ký</button>
        </div>

        ${authTab === 'login' ? `
          <div class="input-group">
            <label>Tên đăng nhập</label>
            <input type="text" id="inpUsername" placeholder="Username..." />
          </div>
          <div class="input-group">
            <label>Mật khẩu</label>
            <input type="password" id="inpPassword" placeholder="Password..." />
          </div>
          <button class="btn btn--gold btn--lg" id="btnLogin">ĐĂNG NHẬP</button>
        ` : `
          <div class="input-group">
            <label>Tên đăng nhập</label>
            <input type="text" id="inpUsername" placeholder="Chọn username (3+ ký tự)..." />
          </div>
          <div class="input-group">
            <label>Mật khẩu</label>
            <input type="password" id="inpPassword" placeholder="Chọn mật khẩu (4+ ký tự)..." />
          </div>
          <div class="input-group">
            <label>Đạo danh</label>
            <input type="text" id="inpName" placeholder="Tên nhân vật..." />
          </div>
          <div class="input-group">
            <label>Giới tính</label>
            <div class="gender-pick">
              <label class="g-opt"><input type="radio" name="gender" value="male" checked /> ♂ Nam</label>
              <label class="g-opt"><input type="radio" name="gender" value="female" /> ♀ Nữ</label>
            </div>
          </div>
          <button class="btn btn--gold btn--lg" id="btnRegister">BẮT ĐẦU TU LUYỆN</button>
        `}
      </div>
    </div>`

  // Tab switching
  document.querySelectorAll('[data-auth]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.authTab = btn.dataset.auth
      renderIntro()
    })
  })

  // Login
  document.getElementById('btnLogin')?.addEventListener('click', async () => {
    const username = document.getElementById('inpUsername').value.trim()
    const password = document.getElementById('inpPassword').value
    if (!username || !password) return notify('Vui lòng nhập đầy đủ', 'error')
    try {
      const data = await api.login(username, password)
      state.playerId = data.id
      state.player = data.player
      localStorage.setItem('playerId', data.id)
      notify(data.message, 'success')
      await loadGameData()
      renderGame()
    } catch (e) {
      notify(e.message || 'Đăng nhập thất bại!', 'error')
    }
  })

  // Register
  document.getElementById('btnRegister')?.addEventListener('click', async () => {
    const username = document.getElementById('inpUsername').value.trim()
    const password = document.getElementById('inpPassword').value
    const name = document.getElementById('inpName')?.value.trim() || 'Vô Danh'
    const gender = document.querySelector('input[name="gender"]:checked')?.value || 'male'
    if (!username || !password) return notify('Vui lòng nhập đầy đủ', 'error')
    try {
      const data = await api.register(username, password, name, gender)
      state.playerId = data.id
      state.player = data.player
      localStorage.setItem('playerId', data.id)
      notify(data.message, 'success')
      await loadGameData()
      renderGame()
    } catch (e) {
      notify(e.message || 'Đăng ký thất bại!', 'error')
    }
  })
}

// ==============================
// GAME SHELL
// ==============================
function renderGame() {
  const p = state.player
  if (!p) return
  const hpPct = Math.max(0, (p.currentHp / p.maxHp) * 100)
  const enPct = p.maxEnergy > 0 ? Math.max(0, (p.currentEnergy / p.maxEnergy) * 100) : 0
  const nervePct = (p.maxNerve ?? 15) > 0 ? Math.max(0, ((p.nerve ?? 0) / (p.maxNerve ?? 15)) * 100) : 0

  app.innerHTML = `
    <div class="game-layout">
      <!-- SIDEBAR -->
      <aside class="sidebar">
        <div class="sidebar-header">
          <div class="game-title">NGHỊCH THIÊN KÝ</div>
          <div class="game-sub">Tu Tiên RPG v2.0</div>
        </div>

        <div class="sidebar-player">
          <div class="player-name">${p.name}</div>
          <div class="player-meta">Lv.${p.level} · ${p.gender === 'male' ? '♂ Nam' : '♀ Nữ'}</div>
          <div class="sidebar-bar">
            <div class="bar-label"><span>HP</span><span>${p.currentHp}/${p.maxHp}</span></div>
            <div class="bar-track"><div class="bar-fill hp" style="width:${hpPct}%" data-low="${hpPct < 30}"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label"><span>🔮 Linh lực</span><span>${p.currentEnergy}/${p.maxEnergy}</span></div>
            <div class="bar-track"><div class="bar-fill energy" style="width:${enPct}%"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label"><span>💀 Nghịch Khí</span><span>${p.nerve ?? 0}/${p.maxNerve ?? 15}</span></div>
            <div class="bar-track"><div class="bar-fill nerve" style="width:${nervePct}%"></div></div>
          </div>
          <div class="sidebar-gold">💎 ${p.gold ?? 0} Linh Thạch</div>
        </div>

        <ul class="nav">
          <li class="nav-section">CHIẾN ĐẤU</li>
          <li class="nav-item ${state.currentPage === 'combat' ? 'active' : ''}" data-page="combat">
            <span class="icon">⚔</span> Tìm quái
          </li>
          <li class="nav-item ${state.currentPage === 'gym' ? 'active' : ''}" data-page="gym">
            <span class="icon">🏋</span> Rèn Luyện
          </li>

          <li class="nav-section">NGHỊCH THIÊN</li>
          <li class="nav-item ${state.currentPage === 'crimes' ? 'active' : ''}" data-page="crimes">
            <span class="icon">💀</span> Phá Luật
          </li>
          <li class="nav-item ${state.currentPage === 'education' ? 'active' : ''}" data-page="education">
            <span class="icon">📜</span> Tu Luyện
          </li>
          <li class="nav-item ${state.currentPage === 'travel' ? 'active' : ''}" data-page="travel">
            <span class="icon">🗺️</span> Ngao Du
            ${(p.travelRemaining ?? 0) > 0 ? `<span class="badge" style="background:var(--blue)">🚶</span>` : ''}
          </li>

          <li class="nav-section">NHÂN VẬT</li>
          <li class="nav-item ${state.currentPage === 'stats' ? 'active' : ''}" data-page="stats">
            <span class="icon">📊</span> Căn Cốt
            ${p.statPoints > 0 ? `<span class="badge">${p.statPoints}</span>` : ''}
          </li>
          <li class="nav-item ${state.currentPage === 'skills' ? 'active' : ''}" data-page="skills">
            <span class="icon">⚡</span> Thần Thông
          </li>
          <li class="nav-item ${state.currentPage === 'inventory' ? 'active' : ''}" data-page="inventory">
            <span class="icon">🎒</span> Pháp Bảo
            ${(p.medCooldownRemaining ?? 0) > 0 ? `<span class="badge" style="background:var(--orange)">⏳</span>` : ''}
          </li>
          ${(p.hospitalRemaining ?? 0) > 0 ? `
          <li class="nav-section" style="color:var(--red)">⚠ Đang bị thương</li>
          <li class="nav-item" style="color:var(--red);pointer-events:none">
            <span class="icon">🏥</span> Tịnh dưỡng ${p.hospitalRemaining}s
          </li>` : ''}
        </ul>
      </aside>

      <!-- CONTENT -->
      <main class="main-content">
        <div id="pageContent"></div>
      </main>
    </div>`

  // Sidebar nav events
  document.querySelectorAll('.nav-item[data-page]').forEach(item => {
    item.addEventListener('click', () => {
      state.currentPage = item.dataset.page
      renderGame()
    })
  })

  renderPage()
}

// ===== PAGE DISPATCHER =====
const pageMap = {
  combat: pageCombat,
  gym: pageGym,
  crimes: pageCrimes,
  education: pageEducation,
  stats: pageStats,
  skills: pageSkills,
  inventory: pageInventory,
  travel: pageTravel,
}

function renderPage() {
  const el = document.getElementById('pageContent')
  if (!el) return
  const pageFn = pageMap[state.currentPage]
  if (pageFn) pageFn(el, ctx)
}

// ===== SIDEBAR UPDATE (partial, no full re-render) =====
function updateSidebar() {
  const p = state.player; if (!p) return
  const hpPct = Math.max(0, (p.currentHp / p.maxHp) * 100)
  const enPct = p.maxEnergy > 0 ? Math.max(0, (p.currentEnergy / p.maxEnergy) * 100) : 0

  const sp = document.querySelector('.sidebar-player')
  if (sp) {
    const nervePct = (p.maxNerve ?? 15) > 0 ? Math.max(0, ((p.nerve ?? 0) / (p.maxNerve ?? 15)) * 100) : 0
    sp.innerHTML = `
      <div class="player-name">${p.name}</div>
      <div class="player-meta">Lv.${p.level} · ${p.gender === 'male' ? '♂ Nam' : '♀ Nữ'}</div>
      <div class="sidebar-bar">
        <div class="bar-label"><span>HP</span><span>${p.currentHp}/${p.maxHp}</span></div>
        <div class="bar-track"><div class="bar-fill hp" style="width:${hpPct}%" data-low="${hpPct < 30}"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label"><span>🔮 Linh lực</span><span>${p.currentEnergy}/${p.maxEnergy}</span></div>
        <div class="bar-track"><div class="bar-fill energy" style="width:${enPct}%"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label"><span>💀 Nghịch Khí</span><span>${p.nerve ?? 0}/${p.maxNerve ?? 15}</span></div>
        <div class="bar-track"><div class="bar-fill nerve" style="width:${nervePct}%"></div></div>
      </div>
      <div class="sidebar-gold">💎 ${p.gold ?? 0} Linh Thạch</div>`
  }

  const statNav = document.querySelector('.nav-item[data-page="stats"]')
  if (statNav) {
    const badge = statNav.querySelector('.badge')
    if (p.statPoints > 0) {
      if (badge) badge.textContent = p.statPoints
      else statNav.insertAdjacentHTML('beforeend', `<span class="badge">${p.statPoints}</span>`)
    } else if (badge) {
      badge.remove()
    }
  }
}

// ===== UTILITIES =====
async function loadGameData() {
  try {
    const [md, sd, id, medsD, crimesD, eduD] = await Promise.all([
      api.getMonsters(), api.getSkills(), api.getItems(),
      api.getMedicines(), api.getCrimes(), api.getEducation()
    ])
    state.monsters = md.monsters || []
    state.skills = sd.skills || []
    state.items = id.items || []
    state.medicines = medsD.medicines || []
    state.crimes = crimesD.crimes || []
    state.courses = eduD.courses || []
  } catch (e) { console.error('Load data failed:', e) }
}

function notify(msg, type = 'info') {
  document.querySelector('.notification')?.remove()
  const el = document.createElement('div')
  el.className = `notification ${type}`
  el.textContent = msg
  document.body.appendChild(el)
  setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity 0.3s'; setTimeout(() => el.remove(), 300) }, 3000)
}

// ===== INIT =====
render()
