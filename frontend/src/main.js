/**
 * Thiên Đạo Bị Lỗi – Torn City Style UI
 */
import './style.css'
import { api } from './services/api.js'

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

// ===== RENDER =====
function render() {
  if (!state.playerId) {
    renderIntro()
  } else {
    renderGame()
  }
}

// ==============================
// INTRO / CHARACTER CREATION
// ==============================
function renderIntro() {
  app.innerHTML = `
    <div class="intro-page">
      <div class="intro-box">
        <div class="title">天 道 · THIÊN ĐẠO</div>
        <div class="intro-text">Thế giới này vận hành theo quy luật tuyệt đối.
Không ai có thể vượt qua.

Nhưng bạn… <em>vừa phát hiện ra một điều kỳ lạ.</em>

Bạn đã nhảy… 100 lần.
Và cơ thể bạn… <em>nhẹ đi một chút.</em></div>
        <div class="panel" style="border:none; background:transparent;">
          <div class="panel-body">
            <input class="input mb-md" id="playerName" placeholder="Nhập tên đạo hữu..." maxlength="20" />
            <div class="gender-grid">
              <div class="gender-card" data-gender="male" id="gMale">
                <div class="g-icon">⚔</div>
                <div class="g-label">Nam</div>
                <div class="g-desc">Mạnh mẽ, bền bỉ</div>
              </div>
              <div class="gender-card" data-gender="female" id="gFemale">
                <div class="g-icon">☽</div>
                <div class="g-label">Nữ</div>
                <div class="g-desc">Khéo léo, nhanh nhẹn</div>
              </div>
            </div>
            <button class="btn" id="btnCreate" style="width:100%;padding:10px;" disabled>BẮT ĐẦU TU LUYỆN</button>
          </div>
        </div>
      </div>
    </div>`

  let gender = null
  document.querySelectorAll('.gender-card').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.gender-card').forEach(c => c.classList.remove('selected'))
      el.classList.add('selected')
      gender = el.dataset.gender
      document.getElementById('btnCreate').disabled = false
    })
  })

  document.getElementById('btnCreate').addEventListener('click', async () => {
    const name = document.getElementById('playerName').value.trim() || 'Vô Danh'
    if (!gender) return
    const btn = document.getElementById('btnCreate')
    btn.disabled = true
    btn.textContent = 'ĐANG TẠO...'
    try {
      const data = await api.createPlayer(name, gender)
      state.playerId = data.id
      state.player = data.player
      await loadGameData()
      render()
    } catch (e) {
      notify('Lỗi kết nối server! Đảm bảo backend PHP đang chạy.', 'error')
      btn.disabled = false
      btn.textContent = 'BẮT ĐẦU TU LUYỆN'
    }
  })
}

// ==============================
// MAIN GAME (Torn Layout)
// ==============================
function renderGame() {
  const p = state.player; if (!p) return
  const hpPct = Math.max(0, (p.currentHp / p.maxHp) * 100)
  const enPct = p.maxEnergy > 0 ? Math.max(0, (p.currentEnergy / p.maxEnergy) * 100) : 0

  app.innerHTML = `
    <div class="game-layout">
      <!-- SIDEBAR -->
      <aside class="sidebar">
        <div class="sidebar-header">
          <div class="game-title">THIÊN ĐẠO</div>
          <div class="game-sub">Bị Lỗi v1.0</div>
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
        </div>

        <ul class="sidebar-nav">
          <li class="nav-section">Chiến đấu</li>
          <li class="nav-item ${state.currentPage === 'combat' ? 'active' : ''}" data-page="combat">
            <span class="icon">⚔</span> Tìm quái
          </li>
          <li class="nav-item ${state.currentPage === 'gym' ? 'active' : ''}" data-page="gym">
            <span class="icon">🏋</span> Rèn luyện
          </li>

          <li class="nav-section">Nhân vật</li>
          <li class="nav-item ${state.currentPage === 'stats' ? 'active' : ''}" data-page="stats">
            <span class="icon">📊</span> Chỉ số
            ${p.statPoints > 0 ? `<span class="badge">${p.statPoints}</span>` : ''}
          </li>
          <li class="nav-item ${state.currentPage === 'skills' ? 'active' : ''}" data-page="skills">
            <span class="icon">⚡</span> Kỹ năng
          </li>
          <li class="nav-item ${state.currentPage === 'inventory' ? 'active' : ''}" data-page="inventory">
            <span class="icon">🎒</span> Trang bị
          </li>

          <li class="nav-section">Khác</li>
          <li class="nav-item ${state.currentPage === 'hospital' ? 'active' : ''}" data-page="hospital">
            <span class="icon">🏥</span> Tịnh dưỡng
            ${p.hospitalRemaining > 0 ? `<span class="badge">${p.hospitalRemaining}s</span>` : ''}
          </li>
          <li class="nav-item" id="navHeal">
            <span class="icon">❤</span> Hồi phục
          </li>
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

  document.getElementById('navHeal')?.addEventListener('click', async () => {
    try {
      const data = await api.healPlayer(state.playerId)
      state.player = data.player
      notify('Đã hồi phục hoàn toàn!', 'success')
      renderGame()
    } catch (e) { notify('Lỗi hồi phục', 'error') }
  })

  renderPage()
}

function renderPage() {
  const el = document.getElementById('pageContent')
  if (!el) return
  switch (state.currentPage) {
    case 'combat': pageCombat(el); break
    case 'gym': pageGym(el); break
    case 'stats': pageStats(el); break
    case 'skills': pageSkills(el); break
    case 'inventory': pageInventory(el); break
    case 'hospital': pageHospital(el); break
  }
}

// ==============================
// COMBAT PAGE
// ==============================
function pageCombat(el) {
  el.innerHTML = `
    <div class="page-header">
      <h1>⚔ Tìm quái vật</h1>
    </div>
    <div class="panel">
      <div class="panel-title">Chọn đối thủ</div>
      <div class="panel-body no-pad">
        ${state.monsters.map(m => `
          <div class="list-item clickable" data-mid="${m.id}">
            <div class="item-info">
              <div class="item-name">${m.name}</div>
              <div class="item-desc">${m.description || ''}</div>
              <div class="item-meta">
                <span>❤${m.stats.hp}</span>
                <span>💪${m.stats.strength}</span>
                <span>🏃${m.stats.speed}</span>
                <span>🎯${m.stats.dexterity}</span>
                <span>🛡${m.stats.defense}</span>
              </div>
            </div>
            <button class="btn btn--red btn--sm">Chiến</button>
          </div>
        `).join('')}
      </div>
    </div>
    <div id="combatResult"></div>`

  el.querySelectorAll('.list-item.clickable').forEach(item => {
    item.addEventListener('click', () => startCombat(item.dataset.mid))
  })
}

async function startCombat(monsterId) {
  const rEl = document.getElementById('combatResult')
  if (!rEl) return
  if (!state.player.currentHp || state.player.currentHp <= 0) {
    return notify('Đã kiệt sức! Hãy hồi phục trước.', 'error')
  }
  if ((state.player.currentEnergy || 0) < 10) {
    return notify('Không đủ Linh lực để chiến đấu!', 'error')
  }
  if (state.player.hospitalRemaining > 0) {
    return notify(`Đang tịnh dưỡng! Còn ${state.player.hospitalRemaining}s`, 'error')
  }

  rEl.innerHTML = `<div class="panel"><div class="panel-body" style="text-align:center;color:var(--gold)">⏳ Đang chiến đấu...</div></div>`

  try {
    const r = await api.fullCombat(state.playerId, monsterId)
    state.player = r.player

    if (r.outcome === 'no_energy') {
      rEl.innerHTML = `<div class="panel"><div class="panel-body" style="text-align:center;color:var(--red)">${r.log[0]}</div></div>`
      updateSidebar()
      return
    }

    const logHtml = r.log.map(l => {
      if (l.startsWith('---')) return `<div class="turn">${l}</div>`
      if (l.includes('linh lực') && l.includes('+')) return `<div class="energy">${l}</div>`
      if (l.includes('linh lực')) return `<div class="energy-cost">${l}</div>`
      if (l.includes('kiệt linh')) return `<div class="miss">${l}</div>`
      if (l.includes('hụt')) return `<div class="miss">${l}</div>`
      if (l.includes('né được')) return `<div class="dodge">${l}</div>`
      if (l.includes('CHÍNH MẠNG') || l.includes('💥')) return `<div class="crit">${l}</div>`
      if (l.includes('🔥')) return `<div class="heavy">${l}</div>`
      if (l.includes('chặn hoàn toàn') || l.includes('🛡')) return `<div class="dodge">${l}</div>`
      if (l.includes('ngã xuống') || l.includes('💀')) return `<div class="death">${l}</div>`
      if (l.includes('Chiến thắng') || l.includes('🏆')) return `<div class="victory">${l}</div>`
      if (l.includes('Đột phá') || l.includes('🎉')) return `<div class="levelup">${l}</div>`
      if (l.includes('bỏ chạy') || l.includes('🏃')) return `<div class="flee">${l}</div>`
      if (l.includes('Hết') || l.includes('⏰')) return `<div class="stalemate">${l}</div>`
      if (l.includes('Bất phân') || l.includes('🤝')) return `<div class="stalemate">${l}</div>`
      if (l.includes('Thoát thân') || l.includes('🚪')) return `<div class="flee">${l}</div>`
      return `<div class="hit">${l}</div>`
    }).join('')

    const m = r.monster
    const pHp = Math.max(0, (state.player.currentHp / state.player.maxHp) * 100)
    const mHp = Math.max(0, (m.currentHp / m.maxHp) * 100)

    // Outcome banner
    const outcomeMap = {
      'win': { icon: '🏆', text: 'Chiến thắng', cls: 'win' },
      'loss': { icon: '💀', text: 'Thất bại', cls: 'lose' },
      'stalemate': { icon: '⏰', text: 'Bất phân thắng bại', cls: 'draw' },
      'flee': { icon: '🏃', text: 'Thoát thân', cls: 'flee' },
    }
    const oc = outcomeMap[r.outcome] || outcomeMap['loss']
    const rewardText = r.rewards ? ` · +${r.rewards.xp} XP` : ''

    rEl.innerHTML = `
      <div class="panel">
        <div class="panel-title">${oc.icon} ${oc.text}
          <span class="subtitle">${r.turns}/${r.maxTurns || 25} lượt${rewardText}</span>
        </div>
        <div class="panel-body combat-result ${oc.cls}">
          <div class="combat-opponents">
            <div class="fighter">
              <div class="f-name player-name">${state.player.name}</div>
              <div class="mini-hp-bar"><div class="fill hp" style="width:${pHp}%"></div></div>
              <div class="mini-hp-val">${state.player.currentHp}/${state.player.maxHp}</div>
            </div>
            <div class="vs">VS</div>
            <div class="fighter">
              <div class="f-name monster-name">${m.name}</div>
              <div class="mini-hp-bar"><div class="fill hp" style="width:${mHp}%"></div></div>
              <div class="mini-hp-val">${m.currentHp}/${m.maxHp}</div>
            </div>
          </div>
        </div>
        <div class="combat-log">${logHtml}</div>
      </div>`

    // Update sidebar only (not full re-render which would destroy combat result)
    updateSidebar()
  } catch (e) {
    rEl.innerHTML = `<div class="panel"><div class="panel-body text-red">Lỗi: ${e.message}</div></div>`
  }
}

function updateSidebar() {
  const p = state.player; if (!p) return
  const hpPct = Math.max(0, (p.currentHp / p.maxHp) * 100)
  const enPct = p.maxEnergy > 0 ? Math.max(0, (p.currentEnergy / p.maxEnergy) * 100) : 0

  const sp = document.querySelector('.sidebar-player')
  if (sp) {
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
      </div>`
  }

  // Update stat badge
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

// ==============================
// STATS PAGE
// ==============================
function pageStats(el) {
  const p = state.player, s = p.stats, a = p.allocatedStats || {}
  const has = p.statPoints > 0

  const stats = [
    ['strength', '💪', 'Sức mạnh'],
    ['speed', '🏃', 'Tốc độ'],
    ['dexterity', '🎯', 'Khéo léo'],
    ['defense', '🛡', 'Phòng thủ'],
  ]

  el.innerHTML = `
    <div class="page-header">
      <h1>📊 Chỉ số chiến đấu</h1>
      ${has ? `<div class="actions"><span class="text-gold">✦ ${p.statPoints} điểm chưa phân bổ</span></div>` : ''}
    </div>
    <div class="panel">
      <div class="panel-title">Battle Stats</div>
      <div class="panel-body no-pad">
        ${stats.map(([key, icon, name]) => `
          <div class="stat-row">
            <div class="stat-label"><span class="stat-icon">${icon}</span> ${name}</div>
            <div class="stat-val">
              ${s[key] ?? 0}
              ${a[key] > 0 ? `<span class="bonus">(+${a[key]})</span>` : ''}
              ${has ? `<button class="allocate-btn" data-stat="${key}">+</button>` : ''}
            </div>
          </div>
        `).join('')}
        <div class="derived-row">
          <div class="d-item"><div class="d-val">${s.maxHp ?? 100}</div><div class="d-label">Max HP</div></div>
          <div class="d-item"><div class="d-val">${s.maxEnergy ?? 50}</div><div class="d-label">🔮 Linh lực</div></div>
          <div class="d-item"><div class="d-val">+${s.energyRegen ?? 5}/t</div><div class="d-label">Hồi/lượt</div></div>
        </div>
        <div class="derived-row">
          <div class="d-item"><div class="d-val">${s.critChance ?? 5}%</div><div class="d-label">Chí mạng</div></div>
          <div class="d-item"><div class="d-val">×${s.critMultiplier ?? 1.5}</div><div class="d-label">Hệ số CM</div></div>
          <div class="d-item"><div class="d-val">10</div><div class="d-label">🔵 Chi phí/đòn</div></div>
        </div>
      </div>
    </div>`

  el.querySelectorAll('.allocate-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation()
      try {
        const data = await api.allocateStat(state.playerId, btn.dataset.stat)
        state.player = data.player
        notify(data.message, 'success')
        renderGame()
      } catch (e2) { notify('Lỗi phân bổ', 'error') }
    })
  })
}

// ==============================
// SKILLS PAGE
// ==============================
function pageSkills(el) {
  const learned = state.player.skills || []
  const learnedIds = learned.map(s => s.id)
  const available = state.skills.filter(s => !learnedIds.includes(s.id))

  el.innerHTML = `
    <div class="page-header"><h1>⚡ Kỹ năng</h1></div>

    <div class="panel">
      <div class="panel-title">Đã học (${learned.length})</div>
      <div class="panel-body no-pad">
        ${learned.length === 0 ? '<div style="padding:14px" class="text-dim">Chưa có kỹ năng nào</div>' :
          learned.map(s => `
            <div class="list-item">
              <div class="item-info">
                <div class="item-name">${s.name}</div>
                <div class="item-meta">${s.type === 'passive' ? '🔮 Nội công' : `⚡ Chiêu thức · 🔵${s.cost || 0} linh lực`}${s.description ? ' · ' + s.description : ''}</div>
              </div>
            </div>
          `).join('')}
      </div>
    </div>

    <div class="panel">
      <div class="panel-title">Có thể học (${available.length})</div>
      <div class="panel-body no-pad">
        ${available.map(s => `
          <div class="list-item">
            <div class="item-info">
              <div class="item-name">${s.name}</div>
              <div class="item-meta">${s.type === 'passive' ? '🔮 Nội công' : `⚡ Chiêu thức · 🔵${s.cost || 0} linh lực`}${s.description ? ' · ' + s.description : ''}</div>
            </div>
            <button class="btn btn--sm" data-sid="${s.id}">Học</button>
          </div>
        `).join('')}
      </div>
    </div>`

  el.querySelectorAll('[data-sid]').forEach(btn => {
    btn.addEventListener('click', async () => {
      try {
        const data = await api.learnSkill(state.playerId, btn.dataset.sid)
        state.player = data.player
        notify(data.message, 'success')
        pageSkills(el)
      } catch (e) { notify('Lỗi học kỹ năng', 'error') }
    })
  })
}

// ==============================
// INVENTORY PAGE
// ==============================
function pageInventory(el) {
  const equip = Object.values(state.player.equipment || {})

  el.innerHTML = `
    <div class="page-header">
      <h1>🎒 Trang bị</h1>
      <div class="actions"><button class="btn btn--dark btn--sm" id="btnGen">🎲 Tạo ngẫu nhiên</button></div>
    </div>

    <div class="panel">
      <div class="panel-title">Đang trang bị (${equip.length})</div>
      <div class="panel-body no-pad">
        ${equip.length === 0 ? '<div style="padding:14px" class="text-dim">Chưa trang bị gì</div>' :
          equip.map(i => itemRow(i, false)).join('')}
      </div>
    </div>

    <div class="panel">
      <div class="panel-title">Kho vũ khí (${state.items.length})</div>
      <div class="panel-body no-pad">
        ${state.items.map(i => itemRow(i, true)).join('')}
      </div>
    </div>`

  el.querySelectorAll('[data-eid]').forEach(btn => {
    btn.addEventListener('click', async () => {
      try {
        const data = await api.equipItem(state.playerId, btn.dataset.eid)
        state.player = data.player
        notify(data.message, 'success')
        renderGame()
      } catch (e) { notify('Lỗi trang bị', 'error') }
    })
  })

  document.getElementById('btnGen')?.addEventListener('click', async () => {
    const rars = ['common','common','rare','rare','epic','legendary']
    try {
      const data = await api.generateItem(rars[Math.floor(Math.random() * rars.length)])
      notify(`Đã tạo: ${data.item.name} (${data.item.rarity})`, 'success')
    } catch (e) { notify('Lỗi', 'error') }
  })
}

// ==============================
// GYM PAGE (Rèn luyện)
// ==============================
function pageGym(el) {
  const p = state.player
  const stats = [
    ['strength', '💪', 'Sức mạnh', 'Tăng sát thương mỗi đòn'],
    ['speed', '🏃', 'Tốc độ', 'Tăng hit chance, giảm escape của đối thủ'],
    ['dexterity', '🎯', 'Khéo léo', 'Tăng dodge, escape, stealth'],
    ['defense', '🛡', 'Phòng thủ', 'Giảm sát thương nhận vào'],
  ]
  const energyCost = 5
  const canTrain = p.currentEnergy >= energyCost && !p.hospitalRemaining

  el.innerHTML = `
    <div class="page-header">
      <h1>🏋 Rèn luyện</h1>
      <div class="actions"><span class="text-dim">🔮 ${p.currentEnergy}/${p.maxEnergy} linh lực · Chi phí: ${energyCost}/lần</span></div>
    </div>
    ${p.hospitalRemaining > 0 ? `<div class="panel"><div class="panel-body" style="text-align:center;color:var(--red)">🏥 Đang tịnh dưỡng, không thể rèn luyện! Còn ${p.hospitalRemaining}s</div></div>` : ''}
    <div class="panel">
      <div class="panel-title">Chọn chỉ số rèn luyện</div>
      <div class="panel-body no-pad">
        ${stats.map(([key, icon, name, desc]) => `
          <div class="list-item">
            <div class="item-info">
              <div class="item-name">${icon} ${name}</div>
              <div class="item-meta">${desc} · Hiện tại: <strong>${p.allocatedStats?.[key] ?? 0}</strong></div>
            </div>
            <button class="btn btn--sm ${canTrain ? 'btn--green' : ''}" data-train="${key}" ${canTrain ? '' : 'disabled'}>+1</button>
          </div>
        `).join('')}
      </div>
    </div>
    <div class="panel">
      <div class="panel-title">💡 Lưu ý</div>
      <div class="panel-body text-dim" style="font-size:12px">
        Mỗi lần rèn luyện tốn <strong>${energyCost} linh lực</strong> và tăng <strong>+1</strong> chỉ số đã chọn.<br>
        Linh lực hồi phục theo thời gian. Tập trung vào chỉ số phù hợp với lối chơi của bạn.
      </div>
    </div>`

  el.querySelectorAll('[data-train]').forEach(btn => {
    btn.addEventListener('click', async () => {
      try {
        const data = await api.trainStat(state.playerId, btn.dataset.train)
        state.player = data.player
        notify(data.message, 'success')
        renderGame()
      } catch (e) { notify(e.message || 'Lỗi rèn luyện', 'error') }
    })
  })
}

// ==============================
// HOSPITAL PAGE (Tịnh dưỡng)
// ==============================
function pageHospital(el) {
  const p = state.player
  const isHosp = p.hospitalRemaining > 0
  const medCD = p.medCooldownRemaining || 0
  const meds = state.medicines || []

  el.innerHTML = `
    <div class="page-header">
      <h1>🏥 Tịnh dưỡng</h1>
    </div>

    <div class="panel">
      <div class="panel-title">Trạng thái</div>
      <div class="panel-body" style="text-align:center">
        ${isHosp
          ? `<div style="font-size:24px;color:var(--red);font-weight:700">🏥 Đang tịnh dưỡng</div>
             <div class="text-dim mt-sm">Thời gian còn lại: <strong style="color:var(--gold)">${p.hospitalRemaining}s</strong></div>
             <div class="text-dim mt-sm">HP: ${p.currentHp}/${p.maxHp}</div>`
          : `<div style="font-size:24px;color:var(--green);font-weight:700">✅ Khỏe mạnh</div>
             <div class="text-dim mt-sm">HP: ${p.currentHp}/${p.maxHp}</div>`
        }
        ${medCD > 0 ? `<div class="text-dim mt-sm">⏳ Đan dược cooldown: <strong style="color:var(--orange)">${medCD}s</strong></div>` : ''}
      </div>
    </div>

    <div class="panel">
      <div class="panel-title">💊 Đan dược</div>
      <div class="panel-body no-pad">
        ${meds.length === 0 ? '<div style="padding:14px" class="text-dim">Không có đan dược</div>' :
          meds.map(m => `
            <div class="list-item">
              <div class="item-info">
                <div class="item-name">${m.icon} ${m.name}</div>
                <div class="item-meta">${m.description} · +${m.healPercent}% HP · -${m.reduceHospital}s tịnh dưỡng · CD: ${m.cooldown}s</div>
              </div>
              <button class="btn btn--sm btn--blue" data-med="${m.id}" ${medCD > 0 ? 'disabled' : ''}>Dùng</button>
            </div>
          `).join('')}
      </div>
    </div>`

  el.querySelectorAll('[data-med]').forEach(btn => {
    btn.addEventListener('click', async () => {
      try {
        const data = await api.useMedicine(state.playerId, btn.dataset.med)
        state.player = data.player
        notify(data.message, 'success')
        renderGame()
      } catch (e) { notify(e.message || 'Lỗi dùng đan', 'error') }
    })
  })
}

function itemRow(item, showEquip) {
  const affixStr = (item.affixes || []).map(a => fmtAffix(a)).join(' · ')
  return `
    <div class="list-item">
      <div class="item-info">
        <span class="rarity-dot ${item.rarity}"></span>
        <span class="item-name rarity-${item.rarity}">${item.name}</span>
        <div class="item-meta">${item.slot} · ${item.rarity}${affixStr ? ' · ' + affixStr : ''}</div>
      </div>
      ${showEquip ? `<button class="btn btn--sm btn--blue" data-eid="${item.id}">Equip</button>` : ''}
    </div>`
}

function fmtAffix(a) {
  const names = { strength:'STR', speed:'SPD', dexterity:'DEX', defense:'DEF', critMultiplier:'CRIT MUL' }
  const n = names[a.stat] || a.stat
  const s = a.value >= 0 ? '+' : ''
  if (a.type === 'flat') return `${s}${a.value} ${n}`
  if (a.type === 'increase') return `${s}${a.value}% ${n}`
  if (a.type === 'more') return `×${s}${a.value}% ${n}`
  return `${s}${a.value} ${n}`
}

// ===== UTILITIES =====
async function loadGameData() {
  try {
    const [md, sd, id, medsD] = await Promise.all([api.getMonsters(), api.getSkills(), api.getItems(), api.getMedicines()])
    state.monsters = md.monsters || []
    state.skills = sd.skills || []
    state.items = id.items || []
    state.medicines = medsD.medicines || []
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
