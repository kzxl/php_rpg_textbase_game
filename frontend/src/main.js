/**
 * Nghịch Thiên Ký – Tu Tiên RPG
 * App Shell: routing, sidebar, state, notifications
 * Pages are imported from ./pages/
 */
import './style.css'
import { api } from './services/api.js'
import { pageCombat } from './pages/combat.js'
import { pageLibrary } from './pages/library.js'
import { pageStats } from './pages/stats.js'
import { pageSkills } from './pages/skills.js'
import { pageInventory } from './pages/inventory.js'
import { pageCrimes } from './pages/crimes.js'
import { pageEducation } from './pages/education.js'
import { pageTravel } from './pages/travel.js'
import { pageAlchemy } from './pages/alchemy.js'
import { pageQuests } from './pages/quests.js'
import { pageAdmin } from './pages/admin.js'
import { pageSocial } from './pages/social.js'
import { pageChat } from './pages/chat.js'
import { pageMarket } from './pages/market.js'
import { pageRealm } from './pages/realm.js'
import { pageEvents } from './pages/events.js'
import { pageDungeon } from './pages/dungeon.js'
import { pageTienCanh } from './pages/tiencanh.js'
import { pageHousing } from './pages/housing.js'
import { pageWiki } from './pages/wiki.js'
import { pageNpcShop } from './pages/npcshop.js'
import { pageGuild } from './pages/guild.js'
import { pageProfile } from './pages/profile.js'
import { pageArena } from './pages/arena.js'
import { pageAuction } from './pages/auction.js'
import { pageDailyQuest } from './pages/dailyquest.js'
import { pageWorldBoss } from './pages/worldboss.js'
import { pageGacha } from './pages/gacha.js'
import { pageLeaderboard } from './pages/leaderboard.js'

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
// ===== STATUS EFFECTS WITH LIVE COUNTDOWN =====
function renderStatusEffects(p) {
  const now = Math.floor(Date.now() / 1000)
  const effects = []
  
  if (p.hospitalUntil && p.hospitalUntil > now) {
    effects.push({ icon: '🏥', label: 'Tịnh dưỡng', endTime: p.hospitalUntil, color: 'var(--red)' })
  }
  if (p.medCooldownUntil && p.medCooldownUntil > now) {
    effects.push({ icon: '💊', label: 'Đan độc', endTime: p.medCooldownUntil, color: 'var(--orange)' })
  }
  if (p.jailUntil && p.jailUntil > now) {
    effects.push({ icon: '⛓️', label: 'Ngục tù', endTime: p.jailUntil, color: 'var(--purple)' })
  }
  if (p.travelArrivesAt && p.travelArrivesAt > now) {
    effects.push({ icon: '🚶', label: 'Di chuyển', endTime: p.travelArrivesAt, color: 'var(--blue)' })
  }
  
  if (effects.length === 0) return ''
  
  return `<div class="status-effects" style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px;margin-bottom:2px">
    ${effects.map(e => {
      const rem = Math.max(0, e.endTime - now)
      const m = Math.floor(rem / 60)
      const s = rem % 60
      const timeStr = m > 0 ? `${m}p${String(s).padStart(2,'0')}s` : `${s}s`
      return `<span class="status-icon" data-end="${e.endTime}" style="
        display:inline-flex;align-items:center;gap:2px;
        background:rgba(0,0,0,0.4);border:1px solid ${e.color}55;
        padding:2px 6px;border-radius:12px;font-size:11px;
        color:${e.color};white-space:nowrap;
      " title="${e.label}">${e.icon} <span class="cd-time">${timeStr}</span></span>`
    }).join('')}
  </div>`
}

// Live countdown interval
let _statusInterval = null
function startStatusCountdown() {
  if (_statusInterval) clearInterval(_statusInterval)
  _statusInterval = setInterval(() => {
    const now = Math.floor(Date.now() / 1000)
    document.querySelectorAll('.status-icon[data-end]').forEach(el => {
      const end = parseInt(el.dataset.end)
      const rem = Math.max(0, end - now)
      if (rem <= 0) {
        el.remove()
        return
      }
      const m = Math.floor(rem / 60)
      const s = rem % 60
      const cdEl = el.querySelector('.cd-time')
      if (cdEl) cdEl.textContent = m > 0 ? `${m}p${String(s).padStart(2,'0')}s` : `${s}s`
    })
    // Remove empty container
    document.querySelectorAll('.status-effects').forEach(c => {
      if (c.children.length === 0) c.remove()
    })
  }, 1000)
}

function renderPlayerBuffs(p) {
  let html = '';
  // Môi trường
  const envMap = {
    'hac_phong_lam': { icon: '🌲', tooltip: 'Rừng Rậm: Tăng 5% Tốc Độ' },
    'vong_linh_coc': { icon: '👻', tooltip: 'Âm Khí: Tăng 10% Nhanh Nhẹn' },
    'thiet_huyet_son': { icon: '🌋', tooltip: 'Nóng Bức: Tăng 10% Sát Thương Hỏa' },
    'thien_kiep_uyen': { icon: '⚡', tooltip: 'Lôi Điện: Tăng 15% Tốc Độ' },
    'bac_suong_canh': { icon: '❄️', tooltip: 'Đóng Băng: Giảm 10% Tốc Độ' },
    'am_sat_hoang': { icon: '🎯', tooltip: 'Sát Khí: Tăng 15 Nhanh Nhẹn Nhận Vào (More Dexterity)' },
    'co_moc_linh_vien': { icon: '🌳', tooltip: 'Linh Khí Mộc: Tăng 15% Phòng Ngự' },
    'huyet_ma_chien_truong': { icon: '🩸', tooltip: 'Huyết Chiến: Tăng 30% ST Giữ Thân, Tăng 20% ST Nhận' },
    'thien_hoa_linh_dia': { icon: '🔥', tooltip: 'Địa Hỏa Cự Phệ: Tăng 25% Sát Thương Hỏa' },
    'u_minh_quy_vuc': { icon: '💀', tooltip: 'U Ám Hút Hồn: Giảm 15% Phòng Ngự' },
    'thien_dao_tan_tich': { icon: '✨', tooltip: 'Thiên Đạo Ban Phước: Tăng 15% Toàn Chỉ Số' },
    'vo_tan_hu_khong': { icon: '🌀', tooltip: 'Hỗn Loạn Cực Hạn: Tăng 50% ST Gây Ra & Nhận Vào' },
  };
  const env = envMap[p.currentArea];
  if (env) {
    html += `<span style="cursor:help; background:rgba(255,255,255,0.08); padding:1px 4px; border-radius:4px; font-size:12px; border:1px solid rgba(255,255,255,0.1);" title="${env.tooltip}">${env.icon} Cảnh Vực</span>`;
  }
  
  // Đan dược / Buff chiến đấu
  if (p.combatBuffs && p.combatBuffs.length > 0) {
    p.combatBuffs.forEach(b => {
      let icon = '💊';
      let label = 'Buff';
      
      if (b.type === 'status' && b.stat === 'poison') {
        icon = '☠️';
        label = 'Trúng Độc';
      } else if (b.type === 'status' && b.stat === 'confuse') {
        icon = '👹';
        label = 'Ma Hóa';
      } else if (b.stat === 'allStats' || b.stat === 'hp' || b.stat === 'damage') {
        icon = '🔥';
        label = 'Cuồng Nộ';
      } else if (b.stat === 'defense' || b.stat === 'resist') {
        icon = '🛡️';
        label = 'Kiên Cố';
      } else if (b.stat === 'speed' || b.stat === 'dexterity') {
        icon = '💨';
        label = 'Thân Pháp';
      } else {
        icon = '✨';
        label = 'Cường Hóa';
      }

      let durText = b.duration ? ` (-${b.duration} Trận)` : '';
      let title = `Hiệu ứng: ${b.stat} (${b.type} ${b.value})${b.duration ? ` - Còn lại: ${b.duration} Trận đấu` : ''}`;
      
      html += `<span style="cursor:help; background:rgba(255,255,255,0.08); padding:1px 4px; border-radius:4px; font-size:12px; border:1px solid rgba(255,255,255,0.1); display:flex; gap:4px; align-items:center;" title="${title}">${icon} ${label}${durText}</span>`;
    })
  }

  if (!html) return '';
  return `<div class="player-buffs" style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;align-items:center;">${html}</div>`;
}

function renderGame() {
  const p = state.player
  if (!p) return
  const hpPct = Math.max(0, (p.currentHp / p.maxHp) * 100)
  const stPct = p.maxStamina > 0 ? Math.max(0, (p.currentStamina / p.maxStamina) * 100) : 0
  const enPct = p.maxEnergy > 0 ? Math.max(0, (p.currentEnergy / p.maxEnergy) * 100) : 0
  const nervePct = (p.maxNerve ?? 15) > 0 ? Math.max(0, ((p.nerve ?? 0) / (p.maxNerve ?? 15)) * 100) : 0

  const currentAreaData = state.exploration ? state.exploration[p.currentArea || 'thanh_lam_tran'] : null
  const areaName = currentAreaData ? currentAreaData.name : 'Khám Phá'

  app.innerHTML = `
    <div class="game-layout">
      <!-- SIDEBAR -->
      <aside class="sidebar">
        <div class="sidebar-header">
          <div class="game-title">NGHỊCH THIÊN KÝ</div>
          <div class="game-sub">Tu Tiên RPG v2.0</div>
          <div style="position:relative;margin-top:8px">
            <input type="text" id="searchPlayerInput" placeholder="🔍 Tìm Người Chơi..." autocomplete="off" style="width:100%;padding:6px 10px;border-radius:6px;border:1px solid rgba(255,255,255,0.15);background:rgba(0,0,0,0.3);color:#fff;font-size:12px;outline:none">
            <div id="searchResults" style="position:absolute;top:100%;left:0;right:0;background:#1a1a2e;border:1px solid rgba(255,255,255,0.15);border-radius:0 0 6px 6px;max-height:200px;overflow-y:auto;z-index:100;display:none"></div>
          </div>
        </div>

        <div class="sidebar-player">
          <div class="player-name">${p.name}</div>
          <div class="player-meta">Lv.${p.level} · ${p.realmInfo?.fullName || '?'}</div>
          ${renderStatusEffects(p)}
          ${renderPlayerBuffs(p)}
          <div class="sidebar-bar" style="margin-top:8px">
            <div class="bar-label">
              <span>❤️ Khí Huyết</span>
              <span>
                ${p.currentHp}/${p.maxHp}
                ${p.currentHp < p.maxHp ? `<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">${p.skills?.some(s => s.id === 'toa_thien') ? '+1%/10s' : '(Không tự hồi)'}</span>` : ''}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill hp" style="width:${hpPct}%" data-low="${hpPct < 30}"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label">
              <span>🏃 Thể Lực</span>
              <span>
                ${p.currentStamina ?? 100}/${p.maxStamina ?? 100}
                ${(p.currentStamina ?? 100) < (p.maxStamina ?? 100) ? `<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${p.stats?.staminaRegen ?? 10}/10s</span>` : ''}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill stamina" style="width:${stPct}%"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label">
              <span>🔮 Linh Lực</span>
              <span>
                ${p.currentEnergy}/${p.maxEnergy}
                ${p.currentEnergy < p.maxEnergy ? `<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${p.stats?.energyRegen ?? 5}/10s</span>` : ''}
              </span>
            </div>
            <div class="bar-track"><div class="bar-fill energy" style="width:${enPct}%"></div></div>
          </div>
          <div class="sidebar-bar" style="margin-top:4px">
            <div class="bar-label"><span>💀 Nghịch Khí</span><span>${p.nerve ?? 0}/${p.maxNerve ?? 15}</span></div>
            <div class="bar-track"><div class="bar-fill nerve" style="width:${nervePct}%"></div></div>
          </div>
          <div class="sidebar-gold" style="padding-bottom:12px">
            <div style="font-size:16px; font-weight:bold; color:var(--gold); text-shadow:0 0 10px rgba(255,215,0,0.3); margin-bottom:8px">💎 ${p.gold ?? 0} Linh Thạch</div>
            <div style="display:flex; gap:6px; width:100%">
              <button class="btn btn--dark nav-item ${state.currentPage === 'events' ? 'active' : ''}" data-page="events" style="flex:1; padding:6px; font-size:14px; position:relative" title="Sự Kiện">
                📜
                ${(p.unreadEventsCount ?? 0) > 0 ? `<span class="badge" style="position:absolute; top:-4px; right:-4px; background:var(--red); width:8px; height:8px; padding:0; border-radius:50%"></span>` : ''}
              </button>
              <button class="btn btn--dark" style="flex:1; padding:6px; font-size:14px; opacity:0.3; cursor:default" disabled></button>
              <button class="btn btn--dark" style="flex:1; padding:6px; font-size:14px; opacity:0.3; cursor:default" disabled></button>
            </div>
          </div>
        </div>

        <ul class="nav" style="${(p.travelRemaining || 0) > 0 ? 'pointer-events:none; opacity:0.6;' : ''}">
          <li class="nav-section">TỰ THÂN</li>
          <li class="nav-item ${state.currentPage === 'stats' ? 'active' : ''}" data-page="stats">
            <span class="icon">🏋</span> Rèn Luyện
            ${state.player?.realmInfo?.canBreakthrough ? '<span class="badge" style="background:var(--gold);animation:pulse 1.5s infinite">!</span>' : ''}
          </li>
          <li class="nav-item ${state.currentPage === 'inventory' ? 'active' : ''}" data-page="inventory">
            <span class="icon">🎒</span> Túi Đồ
            ${(p.medCooldownRemaining ?? 0) > 0 ? `<span class="badge" style="background:var(--orange)">⏳</span>` : ''}
          </li>
          <li class="nav-item ${state.currentPage === 'skills' ? 'active' : ''}" data-page="skills">
            <span class="icon">⚡</span> Kỹ Năng
          </li>
          <li class="nav-item ${state.currentPage === 'education' ? 'active' : ''}" data-page="education">
            <span class="icon">🧘</span> Tu Luyện
          </li>


          <li class="nav-section">HÀNH TRÌNH</li>
          <li class="nav-item ${state.currentPage === 'travel' ? 'active' : ''}" data-page="travel">
            <span class="icon">🚶</span> Ngao Du
            ${(p.travelRemaining ?? 0) > 0 ? `<span class="badge" style="background:var(--blue)">⏳</span>` : ''}
          </li>
          <li class="nav-item ${state.currentPage === 'combat' ? 'active' : ''}" data-page="combat">
            <span class="icon">🔍</span> Khám Phá (${areaName})
          </li>
          <li class="nav-item ${state.currentPage === 'quests' ? 'active' : ''}" data-page="quests">
            <span class="icon">📜</span> Nhiệm Vụ
            ${(p.activeQuests || []).filter(q => q.status === 'active').length > 0 ? `<span class="badge" style="background:var(--purple)">${(p.activeQuests || []).filter(q => q.status === 'active').length}</span>` : ''}
          </li>
          <li class="nav-item ${state.currentPage === 'dailyquest' ? 'active' : ''}" data-page="dailyquest">
            <span class="icon">📋</span> Nhật Nhiệm
          </li>
          <li class="nav-item ${state.currentPage === 'crimes' ? 'active' : ''}" data-page="crimes">
            <span class="icon">💀</span> Ác Nghiệp
          </li>

          <li class="nav-section">CHIẾN ĐẤU</li>
          <li class="nav-item ${state.currentPage === 'arena' ? 'active' : ''}" data-page="arena">
            <span class="icon">⚔️</span> Đấu Trường
          </li>
          <li class="nav-item ${state.currentPage === 'worldboss' ? 'active' : ''}" data-page="worldboss">
            <span class="icon">🐉</span> Boss Thế Giới
          </li>
          <li class="nav-item ${state.currentPage === 'tiencanh' ? 'active' : ''}" data-page="tiencanh">
            <span class="icon">🗺️</span> Tiên Cảnh
          </li>

          <li class="nav-section">THẾ GIỚI</li>
          <li class="nav-item ${state.currentPage === 'housing' ? 'active' : ''}" data-page="housing">
            <span class="icon">🏠</span> Động Phủ
          </li>
          <li class="nav-item ${state.currentPage === 'guild' ? 'active' : ''}" data-page="guild">
            <span class="icon">🏯</span> Tông Môn
          </li>
          <li class="nav-item ${state.currentPage === 'alchemy' ? 'active' : ''}" data-page="alchemy">
            <span class="icon">⚒️</span> Chế Tác
          </li>
          <li class="nav-item ${state.currentPage === 'wiki' ? 'active' : ''}" data-page="wiki">
            <span class="icon">📚</span> Tri Thức
          </li>
          <li class="nav-item ${state.currentPage === 'leaderboard' ? 'active' : ''}" data-page="leaderboard">
            <span class="icon">🏆</span> Xếp Hạng
          </li>

          <li class="nav-section">KINH TẾ</li>
          <li class="nav-item ${state.currentPage === 'market' ? 'active' : ''}" data-page="market">
            <span class="icon">🏪</span> Giao Dịch Đài
          </li>
          <li class="nav-item ${state.currentPage === 'npcshop' ? 'active' : ''}" data-page="npcshop">
            <span class="icon">🧓</span> Thương Nhân
          </li>
          <li class="nav-item ${state.currentPage === 'auction' ? 'active' : ''}" data-page="auction">
            <span class="icon">🏛️</span> Đấu Giá
          </li>
          <li class="nav-item ${state.currentPage === 'gacha' ? 'active' : ''}" data-page="gacha">
            <span class="icon">🎰</span> Thiên Cơ Đài
          </li>

          ${p.role === 'admin' ? `
          <li class="nav-section">VÔ THƯỢNG</li>
          <li class="nav-item ${state.currentPage === 'admin' ? 'active' : ''}" data-page="admin">
            <span class="icon">⚙️</span> Admin
          </li>` : ''}
        </ul>
      </aside>

      <!-- CONTENT -->
      <main class="main-content">
        <div id="pageContent"></div>
      </main>
      
      <!-- POPUP WIDGET (Chat / Social) -->
      <div class="floating-popup-container" id="popupContainer" style="${state.popupOpen ? 'display:flex;' : 'display:none;'}">
        <div class="popup-header">
          <div class="popup-tabs">
            <button class="popup-tab ${state.popupPage === 'chat' ? 'active' : ''}" data-popup="chat">💬 Truyền Âm</button>
            <button class="popup-tab ${state.popupPage === 'social' ? 'active' : ''}" data-popup="social">🤝 Đạo Hữu</button>
          </div>
          <button class="popup-close" id="btnPopupClose">✖</button>
        </div>
        <div id="popupContent" class="popup-body"></div>
      </div>
      
      <!-- FLOATING BUTTONS -->
      <div class="floating-actions">
        <button class="btn-fab bg-blue" id="btnFabChat" title="Truyền Âm"><span class="icon">💬</span></button>
        <button class="btn-fab bg-green" id="btnFabSocial" title="Đạo Hữu"><span class="icon">🤝</span></button>
      </div>
    </div>`

  // Sidebar nav events
  document.querySelectorAll('.nav-item[data-page]').forEach(item => {
    item.addEventListener('click', () => {
      // Close popup if moving to other main pages? (Optional, here we keep it independent)
      state.currentPage = item.dataset.page
      renderGame()
    })
  })

  // Popup logic
  document.getElementById('btnFabChat')?.addEventListener('click', () => openPopup('chat'))
  document.getElementById('btnFabSocial')?.addEventListener('click', () => openPopup('social'))
  
  // Custom navigation for Events (since it's also inside the 3-button row)
  const evBtn = document.querySelector('.sidebar-gold .nav-item[data-page="events"]')
  if (evBtn) {
    evBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      state.currentPage = 'events'
      state.popupOpen = false
      renderGame()
    })
  }

  document.getElementById('btnPopupClose')?.addEventListener('click', () => {
    state.popupOpen = false
    renderGame()
  })
  document.querySelectorAll('.popup-tab[data-popup]').forEach(btn => {
    btn.addEventListener('click', () => openPopup(btn.dataset.popup))
  })

  renderPage()
  if (state.popupOpen) renderPopupContent()

  // Search autocomplete
  const searchInput = document.getElementById('searchPlayerInput')
  const searchResults = document.getElementById('searchResults')
  let searchTimer = null
  if (searchInput && searchResults) {
    searchInput.addEventListener('input', () => {
      clearTimeout(searchTimer)
      const q = searchInput.value.trim()
      if (q.length < 2) { searchResults.style.display = 'none'; return }
      searchTimer = setTimeout(async () => {
        try {
          const data = await api.searchPlayers(q)
          const players = data.players || data.results || []
          if (players.length === 0) {
            searchResults.innerHTML = '<div style="padding:8px 12px;font-size:12px;color:var(--text-dim)">Không tìm thấy</div>'
          } else {
            searchResults.innerHTML = players.map(pl => `
              <div class="search-result" data-pid="${pl.id}" style="padding:8px 12px;cursor:pointer;font-size:12px;border-bottom:1px solid rgba(255,255,255,0.05);display:flex;justify-content:space-between;align-items:center">
                <span>${pl.name} <span style="opacity:0.4">Lv.${pl.level}</span></span>
                <span style="opacity:0.3;font-size:10px">${pl.realmInfo?.name || ''}</span>
              </div>
            `).join('')
          }
          searchResults.style.display = 'block'
          searchResults.querySelectorAll('.search-result').forEach(r => {
            r.addEventListener('click', () => {
              state.currentPage = 'profile'
              state._viewProfileId = r.dataset.pid
              searchResults.style.display = 'none'
              searchInput.value = ''
              renderGame()
            })
            r.addEventListener('mouseenter', () => r.style.background = 'rgba(255,255,255,0.08)')
            r.addEventListener('mouseleave', () => r.style.background = 'transparent')
          })
        } catch (e) { searchResults.style.display = 'none' }
      }, 300)
    })
    searchInput.addEventListener('blur', () => {
      setTimeout(() => { searchResults.style.display = 'none' }, 200)
    })
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { searchResults.style.display = 'none'; searchInput.blur() }
    })
  }
  startStatusCountdown()
}

function openPopup(page) {
  state.popupOpen = true
  state.popupPage = page
  renderGame()
}

// ===== POPUP DISPATCHER =====
function renderPopupContent() {
  const el = document.getElementById('popupContent')
  if (!el) return
  if (state.popupPage === 'chat') pageChat(el, ctx)
  else if (state.popupPage === 'social') pageSocial(el, ctx)
}

// ===== PAGE DISPATCHER =====
const pageMap = {
  combat: pageCombat,
  crimes: pageCrimes,
  education: pageEducation,
  stats: pageStats,
  skills: pageSkills,
  inventory: pageInventory,
  travel: pageTravel,
  alchemy: pageAlchemy,
  quests: pageQuests,
  admin: pageAdmin,
  social: pageSocial,
  chat: pageChat,
  market: pageMarket,
  realm: pageRealm,
  events: pageEvents,
  dungeon: pageDungeon,
  housing: pageHousing,
  wiki: pageWiki,
  npcshop: pageNpcShop,
  guild: pageGuild,
  library: pageLibrary,
  profile: pageProfile,
  arena: pageArena,
  auction: pageAuction,
  dailyquest: pageDailyQuest,
  worldboss: pageWorldBoss,
  gacha: pageGacha,
  leaderboard: pageLeaderboard,
  tiencanh: pageTienCanh,
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
    const stPct = p.maxStamina > 0 ? Math.max(0, (p.currentStamina / p.maxStamina) * 100) : 0
    const nervePct = (p.maxNerve ?? 15) > 0 ? Math.max(0, ((p.nerve ?? 0) / (p.maxNerve ?? 15)) * 100) : 0
    sp.innerHTML = `
      <div class="player-name">${p.name}</div>
      <div class="player-meta">Lv.${p.level} · ${p.realmInfo?.fullName || '?'}</div>
      ${renderStatusEffects(p)}
      ${renderPlayerBuffs(p)}
      <div class="sidebar-bar" style="margin-top:8px">
        <div class="bar-label">
          <span>❤️ Khí Huyết</span>
          <span>
            ${p.currentHp}/${p.maxHp}
            ${p.currentHp < p.maxHp ? `<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">${p.skills?.some(s => s.id === 'toa_thien') ? '+1%/10s' : '(Không tự hồi)'}</span>` : ''}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill hp" style="width:${hpPct}%" data-low="${hpPct < 30}"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label">
          <span>🏃 Thể Lực</span>
          <span>
            ${p.currentStamina ?? 100}/${p.maxStamina ?? 100}
            ${(p.currentStamina ?? 100) < (p.maxStamina ?? 100) ? `<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${p.stats?.staminaRegen ?? 10}/10s</span>` : ''}
          </span>
        </div>
        <div class="bar-track"><div class="bar-fill stamina" style="width:${stPct}%"></div></div>
      </div>
      <div class="sidebar-bar" style="margin-top:4px">
        <div class="bar-label">
          <span>🔮 Linh Lực</span>
          <span>
            ${p.currentEnergy}/${p.maxEnergy}
            ${p.currentEnergy < p.maxEnergy ? `<span style="font-size:10px; color:var(--text-dim); margin-left:4px;">+${p.stats?.energyRegen ?? 5}/10s</span>` : ''}
          </span>
        </div>
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
    let badgesHtml = ''
    if (p.statPoints > 0) badgesHtml += `<span class="badge">${p.statPoints}</span>`
    if (p.realmInfo?.canBreakthrough) badgesHtml += `<span class="badge" style="background:var(--gold);animation:pulse 1.5s infinite">!</span>`
    
    // Remove existing badges
    statNav.querySelectorAll('.badge').forEach(b => b.remove())
    statNav.insertAdjacentHTML('beforeend', badgesHtml)
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
    state.educationTrees = eduD.trees || []
    state.exploration = (await api.getExploration())
    state.recipes = (await api.getRecipes()).recipes
    state.npcs = (await api.getNpcs()).npcs || []
  } catch (e) {
    console.error('Lỗi tải dữ liệu:', e)
  }
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
