/**
 * PvP Arena — Luận Đạo Đấu Trường (Rank Tiers, Insignias, Win Odds, Streaks, Collapsible Combat Logs)
 */

const ARENA_RANKS = [
  { name: 'Vô Danh',   icon: '🌑', min: 0,    color: '#666666', tier: 1 },
  { name: 'Võ Sinh',   icon: '🥋', min: 1000, color: '#5ba3cf', tier: 2 },
  { name: 'Võ Sĩ',    icon: '⚔️', min: 1200, color: '#6a8f3f', tier: 3 },
  { name: 'Đấu Sĩ',   icon: '🔥', min: 1400, color: '#d4a017', tier: 4 },
  { name: 'Đấu Sư',   icon: '💫', min: 1600, color: '#b06cff', tier: 5 },
  { name: 'Á Quân',    icon: '🥈', min: 1800, color: '#c0c0c0', tier: 6 },
  { name: 'Quán Quân', icon: '👑', min: 2000, color: '#ff4500', tier: 7 },
]

function getArenaRank(rating) {
  const parsed = parseInt(rating)
  const r = isNaN(parsed) ? 1000 : parsed
  let rank = ARENA_RANKS[0]
  for (const rk of ARENA_RANKS) {
    if (r >= rk.min) rank = rk
  }
  return rank
}

/**
 * Standard Elo win probability calculation
 * Formula: P(win) = round(1 / (1 + 10 ** ((oppRating - myRating) / 400)) * 100, 1)
 */
function calcEloWinOdds(myRating, oppRating) {
  const myParsed = parseInt(myRating)
  const oppParsed = parseInt(oppRating)
  const myR = isNaN(myParsed) ? 1000 : myParsed
  const oppR = isNaN(oppParsed) ? 1000 : oppParsed
  const exponent = (oppR - myR) / 400
  const probability = 1 / (1 + Math.pow(10, exponent))
  const winProbability = Math.round(probability * 1000) / 10

  let tierLabel = '⚖️ Cân Tài'
  let labelShort = 'Cân Tài'
  let badgeColor = '#f59e0b'
  let badgeClass = 'odds-even'

  if (winProbability >= 60.0) {
    tierLabel = '🟢 Kèo Trên'
    labelShort = 'Kèo Trên'
    badgeColor = '#10b981'
    badgeClass = 'odds-advantage'
  } else if (winProbability < 40.0) {
    tierLabel = '⚠️ Kèo Dưới'
    labelShort = 'Kèo Dưới'
    badgeColor = '#ef4444'
    badgeClass = 'odds-underdog'
  }

  return {
    winProbability,
    tierLabel,
    labelShort,
    badgeColor,
    badgeClass,
    eloDelta: oppR - myR
  }
}

/**
 * Tiered Streak Fire Badges
 * - 1-2 wins: 🔥 Chuỗi xN (Subtle)
 * - 3-4 wins: ⚡ Chuỗi xN (Lightning)
 * - 5-9 wins: 🔥 Chuỗi xN (Fiery flame with pulsing glow)
 * - 10+ wins: 👑 Bất Bại xN (Crown)
 */
function getStreakBadge(streakCount) {
  const s = parseInt(streakCount) || 0
  if (s >= 10) {
    return {
      text: `👑 Bất Bại x${s}`,
      cssClass: 'badge-streak streak-apex streak-fire-apex',
      icon: '👑',
      count: s
    }
  }
  if (s >= 5) {
    return {
      text: `🔥 Chuỗi x${s}`,
      cssClass: 'badge-streak streak-flame streak-fire-high',
      icon: '🔥',
      count: s
    }
  }
  if (s >= 3) {
    return {
      text: `⚡ Chuỗi x${s}`,
      cssClass: 'badge-streak streak-lightning',
      icon: '⚡',
      count: s
    }
  }
  if (s >= 1) {
    return {
      text: `🔥 Chuỗi x${s}`,
      cssClass: 'badge-streak streak-subtle streak-basic',
      icon: '🔥',
      count: s
    }
  }
  if (s < 0) {
    return {
      text: `💀 Bại x${Math.abs(s)}`,
      cssClass: 'badge-streak streak-loss',
      icon: '💀',
      count: s
    }
  }
  return null
}

/**
 * Render single combat turn with color coding for attacker, defender, crits, dodges, damage
 */
function renderLogTurn(item, idx, attackerName, defenderName) {
  if (typeof item === 'object' && item !== null) {
    const turnNum = item.turn || (idx + 1)
    const isCrit = Boolean(item.isCrit)
    const isDodge = Boolean(item.isDodge)
    const isSkill = item.action === 'skill' || Boolean(item.skillName)
    const damage = item.damage !== undefined ? item.damage : null

    let contentHtml = ''
    if (item.text) {
      let t = item.text
        .replace(/(CHÍ MẠNG!?|bạo kích!?)/gi, '<strong class="log-crit">$1</strong>')
        .replace(/(né tránh[^!.]*)/gi, '<span class="log-dodge">$1</span>')
        .replace(/(⚡\s*\[Kích Hoạt\]\s*[^\[]*\[[^\]]+\])/gi, '<span class="log-skill">$1</span>')
        .replace(/(gây\s*)(\d+)(\s*(?:sát thương|ST))/gi, '$1<strong class="log-damage">$2$3</strong>')
      contentHtml = t
    } else {
      const actor = item.attacker === 'player' ? (attackerName || 'Bạn') : (item.attacker === 'opponent' ? (defenderName || 'Đối thủ') : (item.attacker || 'Đấu giả'))
      const target = item.defender ? `→ ${item.defender === 'player' ? (attackerName || 'Bạn') : (defenderName || 'Đối thủ')}` : ''
      const actionDesc = isSkill ? `thi triển <strong>[${item.skillName || 'Kỹ năng'}]</strong>` : 'xuất thường công'
      let outcome = ''
      if (isDodge) {
        outcome = `<span class="log-dodge">🎯 né tránh hoàn toàn!</span>`
      } else if (damage !== null) {
        outcome = `gây <strong class="${isCrit ? 'log-crit' : 'log-damage'}">${damage} ST</strong> ${isCrit ? '<span class="log-crit-tag">💥 CHÍ MẠNG!</span>' : ''}`
      }
      contentHtml = `<span class="log-actor text-bright">${actor}</span> ${target} ${actionDesc} ${outcome}`
    }

    return `
      <div class="log-turn ${isCrit ? 'turn-crit' : ''} ${isDodge ? 'turn-dodge' : ''}">
        <span class="log-turn-badge">H.${turnNum}</span>
        <div class="log-turn-content">${contentHtml}</div>
      </div>
    `
  }

  // String format
  const str = String(item)
  const turnMatch = str.match(/^(?:Turn|Hiệp)\s*(\d+):\s*(.*)$/i)
  const turnNum = turnMatch ? turnMatch[1] : (idx + 1)
  const body = turnMatch ? turnMatch[2] : str

  const isCrit = /CHÍ MẠNG|bạo kích/i.test(body)
  const isDodge = /né tránh/i.test(body)

  const formattedBody = body
    .replace(/(CHÍ MẠNG!?|bạo kích!?)/gi, '<strong class="log-crit">$1</strong>')
    .replace(/(né tránh[^!.]*)/gi, '<span class="log-dodge">$1</span>')
    .replace(/(⚡\s*\[Kích Hoạt\]\s*[^\[]*\[[^\]]+\])/gi, '<span class="log-skill">$1</span>')
    .replace(/(gây\s*)(\d+)(\s*(?:sát thương|ST))/gi, '$1<strong class="log-damage">$2$3</strong>')

  return `
    <div class="log-turn ${isCrit ? 'turn-crit' : ''} ${isDodge ? 'turn-dodge' : ''}">
      <span class="log-turn-badge">H.${turnNum}</span>
      <div class="log-turn-content">${formattedBody}</div>
    </div>
  `
}

/**
 * Render complete combat log or graceful fallback for legacy records
 */
function renderFightLog(fightLogRaw, won, attackerName, defenderName) {
  let logs = []
  if (fightLogRaw) {
    if (typeof fightLogRaw === 'string') {
      try {
        logs = JSON.parse(fightLogRaw)
      } catch (e) {
        logs = []
      }
    } else {
      logs = fightLogRaw
    }
  }

  let logList = []
  if (Array.isArray(logs)) {
    logList = logs
  } else if (logs && typeof logs === 'object' && Array.isArray(logs.turns)) {
    logList = logs.turns
  } else if (logs && typeof logs === 'object' && Array.isArray(logs.log)) {
    logList = logs.log
  }

  if (!logList || logList.length === 0) {
    return `<div class="combat-log-empty text-dim">📜 Không có nhật ký chiến đấu chi tiết cho trận đấu này (bản ghi lịch sử trước khi nâng cấp). Kết quả: ${won ? '<span style="color:var(--green)">Chiến thắng</span>' : '<span style="color:var(--red)">Thất bại</span>'}.</div>`
  }

  return `
    <div class="combat-log-turns">
      ${logList.map((item, idx) => renderLogTurn(item, idx, attackerName, defenderName)).join('')}
    </div>
  `
}

export function pageArena(el, ctx) {
  const { state, api, notify, updateSidebar } = ctx
  const pid = state.playerId
  if (!state._arena) state._arena = { data: null, loaded: false, fighting: false, lastResult: null }
  const ar = state._arena

  async function loadData() {
    try { ar.data = await api.getArena(pid); ar.loaded = true; render() }
    catch (e) { notify(e.message, 'error') }
  }

  function render() {
    const d = ar.data || {}
    const a = d.arena || {}
    const parsedMyRating = parseInt(a.rating)
    const myRating = isNaN(parsedMyRating) ? 1000 : parsedMyRating
    const myRank = a.rank || getArenaRank(myRating)
    const myStreak = parseInt(a.streak) || 0
    const playerStreakBadge = myStreak !== 0 ? getStreakBadge(myStreak) : null

    el.innerHTML = `
      <div class="page-header">
        <h2>⚔️ Luận Đạo Đấu Trường</h2>
        <p class="page-sub">Tranh đoạt bảng phong thần, so tài cùng đạo hữu thiên hạ. Chinh phục bậc thang Thiên Đạo!</p>
      </div>

      <!-- RANK CARD -->
      <div class="panel glass" style="margin-bottom:14px; border-left:4px solid ${myRank.color || '#666'}">
        <div class="panel-body" style="display:flex; align-items:center; gap:16px; padding:16px">
          <div style="font-size:38px">${myRank.icon || '🛡️'}</div>
          <div style="flex:1">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:6px">
              <div>
                <div style="font-size:11px; opacity:0.5; text-transform:uppercase; letter-spacing:1px">Cấp Bậc Hiện Tại</div>
                <div style="font-weight:800; font-size:19px; color:${myRank.color || '#fff'}">${myRank.name || 'Chưa xếp hạng'}</div>
              </div>
              ${playerStreakBadge ? `<div><span class="${playerStreakBadge.cssClass}">${playerStreakBadge.text}</span></div>` : ''}
            </div>
            <div style="font-size:13px; opacity:0.75; margin-top:4px">
              ELO: <strong>${myRating}</strong> · Thắng: <strong>${a.wins || 0}</strong> / Bại: <strong>${a.losses || 0}</strong>
            </div>
            ${myRank.nextThreshold ? `
              <div style="margin-top:8px">
                <div style="display:flex; justify-content:space-between; font-size:10px; opacity:0.6">
                  <span>Tiến trình đến ${myRank.nextThreshold} ELO</span>
                  <span>${myRank.progress || 0}%</span>
                </div>
                <div style="background:rgba(255,255,255,0.1); border-radius:4px; height:6px; margin-top:3px; overflow:hidden">
                  <div style="background:${myRank.color || '#666'}; height:100%; width:${myRank.progress || 0}%; border-radius:4px; transition:width 0.5s ease"></div>
                </div>
              </div>
            ` : '<div style="font-size:11px; color:var(--gold); margin-top:6px">👑 Đỉnh cao! Thiên Đạo Đệ Nhất Vô Song!</div>'}
          </div>
        </div>
      </div>

      <!-- RANK-UP CELEBRATION -->
      ${ar.lastResult?.rankUp ? `
      <div class="panel" style="margin-bottom:14px; border:2px solid var(--gold); animation:pulse 1.5s infinite; text-align:center; padding:16px">
        <div style="font-size:40px">${ar.lastResult.newRank?.icon}</div>
        <div style="font-size:18px; font-weight:800; color:var(--gold); margin-top:6px">🎉 THĂNG CẤP! BẠN ĐÃ ĐẠT HẠNG ${ar.lastResult.newRank?.name}!</div>
      </div>
      ` : ''}

      <!-- LAST RESULT -->
      ${ar.lastResult ? `
      <div class="panel" style="margin-bottom:14px; border-left:4px solid ${ar.lastResult.won ? 'var(--green)' : 'var(--red)'}">
        <div class="panel-body" style="padding:14px 16px">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px">
            <div style="font-weight:800; font-size:16px; color:${ar.lastResult.won ? 'var(--green)' : 'var(--red)'}">
              ${ar.lastResult.won ? '🏆 CHIẾN THẮNG!' : '💀 THẤT BẠI!'}
            </div>
            <div style="font-size:12px; font-weight:700">
              ELO: <span style="color:${ar.lastResult.ratingChange >= 0 ? 'var(--green)' : 'var(--red)'}">${ar.lastResult.ratingChange > 0 ? '+' : ''}${ar.lastResult.ratingChange}</span>
              ${ar.lastResult.goldEarned > 0 ? ` · <span style="color:var(--gold)">+${ar.lastResult.goldEarned} 💎</span>` : ''}
            </div>
          </div>
          <div style="font-size:13px; margin-top:6px">
            Đối thủ: <strong>${ar.lastResult.opponent?.name}</strong> 
            ${ar.lastResult.opponent?.rank ? ar.lastResult.opponent.rank.icon : ''} 
            (ELO ${ar.lastResult.opponent?.rating})
          </div>
          ${ar.lastResult.combatLog?.length ? `
            <div style="margin-top:10px">
              <button class="btn-toggle-log" data-log-id="last-result-log">📜 Xem Diễn Biến Trận Đấu</button>
              <div class="combat-log-collapse" id="last-result-log" style="display:none; margin-top:8px">
                ${renderFightLog(ar.lastResult.combatLog, ar.lastResult.won, 'Bạn', ar.lastResult.opponent?.name)}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
      ` : ''}

      <!-- OPPONENTS -->
      <div class="panel" style="margin-bottom:14px">
        <div class="panel-title flex justify-between items-center">
          <span>🎯 Danh Sách Đối Thủ (Khiêu Chiến)</span>
          <span class="text-xs text-dim">Phí: ${d.entryFee || 50} 💎 · Thắng: ${d.winGold || 200} 💎 + ELO</span>
        </div>
        <div class="panel-body no-pad">
          ${(d.opponents || []).length > 0 ? `
            <div class="arena-cards-grid">
              ${(d.opponents || []).map(o => {
                const oRank = o.rank || getArenaRank(o.rating)
                const myLevel = state.player?.level || 1
                const deltaLevel = o.level - myLevel
                const deltaLevelStr = deltaLevel > 0 ? `+${deltaLevel}` : `${deltaLevel}`
                const deltaLevelClass = deltaLevel > 0 ? 'text-red' : (deltaLevel < 0 ? 'text-green' : 'text-dim')
                const odds = calcEloWinOdds(myRating, o.rating)
                const oppStreak = parseInt(o.streak) || 0
                const oppStreakBadge = oppStreak > 0 ? getStreakBadge(oppStreak) : null

                return `
                  <div class="arena-card rank-tier-${oRank.tier || 1}" style="--rank-color: ${oRank.color || '#666'}">
                    <div class="arena-card-header">
                      <div class="rank-insignia" style="background: ${oRank.color || '#666'}22; border-color: ${oRank.color || '#666'}55;">
                        <span class="rank-icon">${oRank.icon}</span>
                        <span class="rank-name" style="color: ${oRank.color || '#fff'}">${oRank.name}</span>
                      </div>
                      <div class="level-indicator">
                        Lv.${o.level} <span class="level-delta ${deltaLevelClass}">(Δ ${deltaLevelStr})</span>
                      </div>
                    </div>

                    <div class="arena-card-body">
                      <div class="opp-profile">
                        <div class="opp-name">${o.name}</div>
                        <div class="opp-rating-row">
                          <span class="opp-rating">ELO <strong>${o.rating}</strong></span>
                          <span class="elo-delta text-dim">(${odds.eloDelta >= 0 ? '+' : ''}${odds.eloDelta})</span>
                        </div>
                      </div>

                      ${oppStreakBadge ? `
                        <div class="opp-streak-container">
                          <span class="${oppStreakBadge.cssClass}">${oppStreakBadge.text}</span>
                        </div>
                      ` : ''}

                      <div class="odds-meter">
                        <div class="odds-meter-header">
                          <span class="odds-badge ${odds.badgeClass}">${odds.tierLabel}</span>
                          <span class="odds-percent" style="color: ${odds.badgeColor}">${odds.winProbability}% Thắng</span>
                        </div>
                        <div class="odds-track">
                          <div class="odds-fill ${odds.badgeClass}" style="width: ${Math.min(100, Math.max(5, odds.winProbability))}%; background: ${odds.badgeColor}"></div>
                        </div>
                      </div>
                    </div>

                    <div class="arena-card-footer">
                      <button class="btn btn--red btn--sm btn-block btn-fight-opp" data-oid="${o.player_id}" ${ar.fighting ? 'disabled' : ''}>
                        ⚔️ Khiêu Chiến (${d.entryFee || 50} 💎)
                      </button>
                    </div>
                  </div>
                `
              }).join('')}
            </div>
          ` : '<div style="padding:20px; text-align:center; opacity:0.5">Không tìm thấy đối thủ phù hợp quanh mốc ELO của bạn.</div>'}

          <div style="padding:12px 14px; text-align:center; border-top:1px solid rgba(255,255,255,0.06)">
            <button class="btn btn--blue" id="btnRandomFight" ${ar.fighting ? 'disabled' : ''}>
              🎲 Đấu Ngẫu Nhiên (${d.entryFee || 50} 💎)
            </button>
          </div>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px" class="arena-columns">
        <!-- TOP 10 -->
        <div class="panel">
          <div class="panel-title">🏆 Bảng Xếp Hạng Top 10</div>
          <div class="panel-body no-pad">
            ${(d.top10 || []).map((t, i) => {
              const tRank = t.rank || getArenaRank(t.rating)
              const tStreakVal = parseInt(t.streak) || 0
              const tStreak = tStreakVal > 0 ? getStreakBadge(tStreakVal) : null
              return `
                <div class="list-item" style="padding:8px 12px; font-size:12px; display:flex; align-items:center; gap:8px">
                  <span style="width:24px; font-weight:700; color:${i < 3 ? 'var(--gold)' : 'var(--text-dim)'}">#${i + 1}</span>
                  <span>${tRank.icon || ''}</span>
                  <span style="flex:1; font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis">${t.name}</span>
                  ${tStreak ? `<span class="${tStreak.cssClass}" style="font-size:9px; padding:1px 5px">${tStreak.text}</span>` : ''}
                  <span style="color:${tRank.color || 'var(--blue)'}; font-weight:700">${t.rating}</span>
                </div>
              `
            }).join('')}
          </div>
        </div>

        <!-- DUEL HISTORY -->
        <div class="panel">
          <div class="panel-title">📜 Lịch Sử Đấu Trường</div>
          <div class="panel-body no-pad">
            ${(d.history || []).length > 0 ? (d.history || []).map((h, hIdx) => {
              const won = h.winner_id === pid
              const isAttacker = h.attacker_id === pid
              const opponentName = isAttacker ? h.defender_name : h.attacker_name
              const roleText = isAttacker ? 'Tấn công' : 'Phòng thủ'
              const logId = `history-log-${h.id || hIdx}`

              return `
                <div class="duel-history-item">
                  <div class="duel-header-row">
                    <span class="badge" style="background:${won ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)'}; color:${won ? 'var(--green)' : 'var(--red)'}; font-weight:700; font-size:11px">
                      ${won ? '🏆 THẮNG' : '💀 THUA'}
                    </span>
                    <div class="duel-meta">
                      <div class="duel-opponent-name">vs ${opponentName}</div>
                      <div class="duel-sub text-dim">${roleText} · ${h.created_at || 'Vừa xong'}</div>
                    </div>
                    <div style="text-align:right">
                      <div style="font-weight:700; font-size:12px; color:${h.rating_change >= 0 ? 'var(--green)' : 'var(--red)'}">
                        ${h.rating_change > 0 ? '+' : ''}${h.rating_change} ELO
                      </div>
                      ${h.gold_reward > 0 ? `<div style="font-size:10px; color:var(--gold)">+${h.gold_reward} 💎</div>` : ''}
                    </div>
                    <button class="btn-toggle-log" data-log-id="${logId}">📜 Xem Diễn Biến</button>
                  </div>
                  
                  <div class="combat-log-collapse" id="${logId}" style="display:none">
                    ${renderFightLog(h.fight_log, won, h.attacker_name, h.defender_name)}
                  </div>
                </div>
              `
            }).join('') : '<div style="padding:16px; text-align:center; opacity:0.5">Chưa có trận đấu nào trong lịch sử</div>'}
          </div>
        </div>
      </div>
    `

    // Bind opponent fight buttons
    el.querySelectorAll('.btn-fight-opp').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.target.closest('.btn-fight-opp')
        if (target?.dataset?.oid) doFight(target.dataset.oid)
      })
    })

    // Bind random fight button
    document.getElementById('btnRandomFight')?.addEventListener('click', () => doFight(null))

    // Bind combat log collapse toggle buttons
    el.querySelectorAll('.btn-toggle-log').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.target.closest('.btn-toggle-log')
        const logId = target?.dataset?.logId
        if (!logId) return
        const logEl = document.getElementById(logId)
        if (!logEl) return
        const isHidden = logEl.style.display === 'none'
        logEl.style.display = isHidden ? 'block' : 'none'
        target.textContent = isHidden ? '🔽 Thu Gọn' : '📜 Xem Diễn Biến'
      })
    })
  }

  async function doFight(opponentId) {
    ar.fighting = true; render()
    try {
      const res = await api.request(`/player/${pid}/arena/fight`, {
        method: 'POST', body: JSON.stringify({ opponentId })
      })
      ar.lastResult = res
      state.player = res.player; updateSidebar()
      notify(res.message, res.won ? 'success' : 'error')
      ar.fighting = false; await loadData()
    } catch (e) { notify(e.message, 'error'); ar.fighting = false; render() }
  }

  if (!ar.loaded) loadData(); else render()
}
