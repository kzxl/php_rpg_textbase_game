/**
 * Bí Cảnh — Instanced Dungeon & Secret Realm System
 * Includes:
 * 1. Timed Secret Realms (Huyễn Cảnh): Ephemeral with countdown timer, disappears when expired
 * 2. Permanent Secret Realms (Thượng Cổ Cấm Địa): Permanent unlock, extremely dangerous monsters (x2.0 - x3.5 stats)
 * 3. Ancient Jade Slips (Ngọc Giản): Consumable dungeon keys from monster drops
 */

let _countdownTimer = null

export function pageDungeon(el, ctx) {
  const { state, api, notify, updateSidebar } = ctx
  const pid = state.playerId

  if (!state._dungeon) {
    state._dungeon = {
      mapItems: [],
      timedDungeons: [],
      permanentDungeons: [],
      activeRun: null,
      history: [],
      loaded: false,
      combatLog: [],
      lastLoot: [],
      lastResult: null,
    }
  }
  const d = state._dungeon

  // Clear any existing timer
  if (_countdownTimer) {
    clearInterval(_countdownTimer)
    _countdownTimer = null
  }

  async function loadData() {
    try {
      const [mapData, histData] = await Promise.all([
        api.getMapItems(pid),
        api.getDungeonHistory(pid),
      ])
      d.mapItems = mapData.mapItems || []
      d.timedDungeons = mapData.timedDungeons || []
      d.permanentDungeons = mapData.permanentDungeons || []
      d.activeRun = mapData.activeRun || null
      d.history = histData.history || []
      d.loaded = true
      render()
      startLiveCountdown()
    } catch (e) {
      notify(e.message || 'Lỗi tải Bí Cảnh', 'error')
    }
  }

  function formatTime(seconds) {
    if (seconds <= 0) return 'Đã hết hạn'
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = Math.floor(seconds % 60)
    if (h > 0) {
      return `${h}h ${m < 10 ? '0' : ''}${m}m ${s < 10 ? '0' : ''}${s}s`
    }
    return `${m}m ${s < 10 ? '0' : ''}${s}s`
  }

  function startLiveCountdown() {
    if (d.timedDungeons.length === 0) return

    _countdownTimer = setInterval(() => {
      let hasExpired = false
      d.timedDungeons.forEach(td => {
        if (td.remainingSeconds > 0) {
          td.remainingSeconds -= 1
          const timeEl = el.querySelector(`#countdown-${td.id}`)
          if (timeEl) {
            timeEl.textContent = formatTime(td.remainingSeconds)
            if (td.remainingSeconds < 900) {
              timeEl.parentElement?.classList.add('countdown-urgency')
            }
          }
        } else {
          hasExpired = true
        }
      })

      if (hasExpired) {
        // Refresh to remove expired dungeons
        clearInterval(_countdownTimer)
        _countdownTimer = null
        loadData()
      }
    }, 1000)
  }

  function render() {
    el.innerHTML = `
      <div class="page-header" style="margin-bottom:16px">
        <h2 style="display:flex;align-items:center;gap:8px">
          <span>Bí Cảnh Bát Hoang</span>
        </h2>
        <p class="page-sub" style="font-size:13px;line-height:1.5">
          Khám phá các di tích thần bí. Gồm <strong>Huyễn Cảnh Có Thời Hạn</strong> (xuất hiện chốc lát rồi biến mất) và <strong>Cấm Địa Thượng Cổ Vĩnh Cửu</strong> (quái vật cuồng bạo x2.0 ~ x3.5 sức mạnh).
        </p>
      </div>

      ${d.activeRun ? renderActiveRun() : renderDungeonSections()}

      ${d.lastResult ? renderLastResult() : ''}

      ${renderHistory()}
    `
    bindEvents()
  }

  function renderActiveRun() {
    const r = d.activeRun
    const isBoss = r.currentWave === r.totalWaves
    const progress = ((r.currentWave - 1) / r.totalWaves * 100).toFixed(0)
    const isExtreme = (r.difficultyMult || 1) >= 2.0
    const diffMult = (r.difficultyMult || 1.0).toFixed(2)

    return `
      <div class="panel ${isExtreme ? 'realm-card--permanent' : ''}" style="border-color:${isExtreme ? '#572c30' : '#735f37'};margin-bottom:16px">
        <div class="panel-title" style="color:${isExtreme ? '#d67a7a' : 'var(--gold)'};display:flex;justify-content:space-between;align-items:center">
          <span>Đang Trong Bí Cảnh</span>
          ${isExtreme ? `<span class="badge-danger-apex">Quái Cuồng Bạo x${diffMult}</span>` : `<span class="badge" style="background:rgba(194,159,85,0.15);color:#dfcfb2;border:1px solid rgba(194,159,85,0.3);font-size:11px">Độ Khó x${diffMult}</span>`}
        </div>
        <div class="panel-body" style="padding:14px 16px">
          <div style="font-size:17px;font-weight:700;margin-bottom:8px;color:var(--text-bright)">${r.dungeonName || r.dungeonId}</div>

          <!-- Highlight Banner -->
          ${isBoss ? `
            <div style="background:rgba(184,74,74,0.12);border:1px solid rgba(184,74,74,0.35);border-radius:6px;padding:8px 12px;margin-bottom:12px;text-align:center">
              <span style="font-size:13px;font-weight:700;color:#d67a7a;letter-spacing:0.5px">
                TẦNG CUỐI CÙNG — TRÙM BÍ CẢNH TRẤN THỦ
              </span>
            </div>
          ` : `
            <div style="background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:6px;padding:6px 12px;margin-bottom:12px">
              <span style="font-size:12px;opacity:0.85">
                Đang vượt ải: <strong>Tầng ${r.currentWave} / ${r.totalWaves}</strong>
              </span>
            </div>
          `}

          <!-- Wave Progress Indicator -->
          <div style="margin-bottom:14px">
            <div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;font-weight:600;margin-bottom:6px">
              <span style="color:var(--text-dim)">Tiến Độ Ải:</span>
              <span style="color:${isBoss ? '#d67a7a' : 'var(--gold)'};font-weight:700">Tầng ${r.currentWave} / ${r.totalWaves} (${progress}%)</span>
            </div>
            <div style="background:rgba(255,255,255,0.06);border-radius:4px;height:8px;overflow:hidden;padding:1px;border:1px solid rgba(255,255,255,0.1)">
              <div style="width:${progress}%;height:100%;background:${isExtreme ? '#8c4242' : '#82a4d4'};border-radius:3px;transition:width 0.3s"></div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div style="display:flex;gap:10px">
            <button class="btn ${isExtreme ? 'btn--red' : 'btn--gold'}" id="btnFight" style="flex:1;font-weight:700;font-size:14px" ${state.player?.hospitalRemaining > 0 ? 'disabled' : ''}>
              ${isBoss ? 'Đại Chiến Trùm Cuối' : 'Tấn Công Ải ' + r.currentWave}
            </button>
            <button class="btn btn--dark" id="btnAbandon" style="padding:0 20px">Rút Lui</button>
          </div>
          ${state.player?.hospitalRemaining > 0 ? '<div style="color:var(--red);font-size:12px;margin-top:10px">[Trọng thương] Chờ hồi phục khí huyết...</div>' : ''}
        </div>
      </div>
    `
  }

  function renderDungeonSections() {
    return `
      <!-- SECTION 1: TIMED SECRET REALMS -->
      <div class="panel" style="margin-bottom:16px;border-color:rgba(168, 85, 247, 0.4)">
        <div class="panel-title" style="color:#c084fc;display:flex;align-items:center;justify-content:space-between">
          <span>Huyễn Cảnh (Có Thời Hạn)</span>
          <span class="badge" style="background:rgba(168,85,247,0.15);color:#d8b4fe;border:1px solid rgba(168,85,247,0.3);font-size:11px">
            ${d.timedDungeons.length} Khả Dụng
          </span>
        </div>
        <div class="panel-body no-pad">
          ${renderTimedList()}
        </div>
      </div>

      <!-- SECTION 2: PERMANENT SECRET REALMS -->
      <div class="panel" style="margin-bottom:16px;border-color:rgba(239, 68, 68, 0.4)">
        <div class="panel-title" style="color:#f87171;display:flex;align-items:center;justify-content:space-between">
          <span>Thượng Cổ Cấm Địa (Vĩnh Cửu)</span>
          <span class="badge" style="background:rgba(239,68,68,0.15);color:#fca5a5;border:1px solid rgba(239,68,68,0.3);font-size:11px">
            ${d.permanentDungeons.length} Cấm Địa
          </span>
        </div>
        <div class="panel-body no-pad">
          ${renderPermanentList()}
        </div>
      </div>

      <!-- SECTION 3: MAP ITEMS -->
      <div class="panel" style="margin-bottom:16px">
        <div class="panel-title" style="display:flex;align-items:center;justify-content:space-between">
          <span>Ngọc Giản Cổ Đồ (Khai Mở Tiêu Hao)</span>
          <span style="font-size:12px;opacity:0.6">${d.mapItems.length} Mẫu Đồ</span>
        </div>
        <div class="panel-body no-pad">
          ${renderMapItems()}
        </div>
      </div>
    `
  }

  function renderTimedList() {
    if (d.timedDungeons.length === 0) {
      return `
        <div style="text-align:center;opacity:0.6;padding:24px 16px;font-size:13px">
          Hiện tại chưa phát hiện Huyễn Cảnh nào.<br>
          <span style="font-size:12px;opacity:0.8">Hãy đi <strong>Khám Phá</strong> tại các vùng đất để nắm bắt cơ duyên phát hiện ảo cảnh sắp tiêu tán!</span>
        </div>
      `
    }

    return d.timedDungeons.map(td => {
      const curRealm = state.player?.realm ?? 1
      const canEnter = curRealm >= td.requiredRealm
      const diffMult = (td.difficultyMult || 1.1).toFixed(2)
      const isUrgent = td.remainingSeconds < 900
      const regularWaves = td.waves || (td.totalWaves > 1 ? td.totalWaves - 1 : 3)

      const dropPills = [
        '<span class="tag">Linh Thảo</span>',
        '<span class="tag">Huyết Tinh</span>',
        '<span class="tag">Nội Đan</span>',
        '<span class="tag">Tẩy Tủy Đan</span>'
      ].join(' ')

      return `
        <div class="realm-card--timed" style="margin:12px;padding:16px">
          <div style="display:flex;align-items:flex-start;gap:14px">
            <div style="flex:1">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;flex-wrap:wrap">
                <span style="font-weight:700;color:#e9d5ff;font-size:15px">${td.name}</span>
                <span class="realm-badge--timed">Bậc ${td.tier || 1}</span>
                <span class="badge ${isUrgent ? 'countdown-urgency' : ''}" style="background:rgba(168,85,247,0.15);color:#d8b4fe;border:1px solid rgba(168,85,247,0.3);font-size:11px;font-weight:600">
                  Còn <span id="countdown-${td.id}">${formatTime(td.remainingSeconds)}</span>
                </span>
                ${isUrgent ? '<span class="badge countdown-urgency" style="background:rgba(184,74,74,0.15);color:#d67a7a;border:1px solid rgba(184,74,74,0.3);font-size:10px;font-weight:700">Sắp Tan Biến (&lt; 15p)</span>' : ''}
                <span class="badge bg-darker text-xs">Cảnh giới ${td.requiredRealm}+</span>
              </div>
              <div style="font-size:12px;opacity:0.85;line-height:1.4;margin-bottom:8px">${td.description}</div>
              <div style="display:flex;gap:12px;flex-wrap:wrap;font-size:11px;margin-bottom:8px">
                <span style="color:#d8b4fe">Ải: <strong>${regularWaves} Ải + 1 Thủ Lĩnh</strong></span>
                <span style="color:#fbbf24">Độ khó: <strong>x${diffMult}</strong></span>
                <span style="color:#c084fc">Thủ Vệ: <strong style="color:#e9d5ff">${td.bossName}</strong></span>
              </div>
              <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;font-size:11px">
                <span style="opacity:0.7">Vật phẩm:</span>
                ${dropPills}
              </div>
            </div>
            <div style="align-self:center">
              <button class="btn btn--sm btn--gold" data-enter-disc="${td.id}" ${!canEnter ? 'disabled' : ''}>
                ${canEnter ? 'Tiến Vào' : 'Cảnh Giới Thấp'}
              </button>
            </div>
          </div>
        </div>
      `
    }).join('')
  }

  function renderPermanentList() {
    if (d.permanentDungeons.length === 0) {
      return `
        <div style="text-align:center;opacity:0.6;padding:24px 16px;font-size:13px">
          Chưa khai mở Cấm Địa Thượng Cổ nào.<br>
          <span style="font-size:12px;opacity:0.8">Khi đi <strong>Khám Phá</strong>, bạn có cơ hội đào phá phong ấn cổ xưa để mở khóa Cấm Địa Vĩnh Viễn!</span>
        </div>
      `
    }

    return d.permanentDungeons.map(pd => {
      const curRealm = state.player?.realm ?? 1
      const canEnter = curRealm >= pd.requiredRealm
      const diffMult = (pd.difficultyMult || 2.2).toFixed(2)
      const clearText = pd.clearCount > 0 ? `Đã phá ${pd.clearCount} lần` : 'Chưa chinh phục'
      const regularWaves = pd.waves || (pd.totalWaves > 1 ? pd.totalWaves - 1 : 4)

      const dropPills = [
        '<span class="tag">Nội Đan</span>',
        '<span class="tag">Tẩy Tủy Đan</span>',
        '<span class="tag">Hoàn Cốt Đan</span>',
        '<span class="tag">Ngọc Giản Cổ Đồ</span>'
      ].join(' ')

      return `
        <div class="realm-card--permanent" style="margin:12px;padding:16px">
          <!-- Prominent Hazard Banner -->
          <div style="background:rgba(184,74,74,0.12);border:1px solid rgba(184,74,74,0.35);border-radius:4px;padding:6px 12px;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
            <span style="color:#d67a7a;font-size:12px;font-weight:700;letter-spacing:0.5px">
              CỰC HUNG HIỂM: Quái Vật Cuồng Bạo (x${diffMult})
            </span>
            <span class="badge-danger-apex">[Cuồng Bạo]</span>
          </div>

          <div style="display:flex;align-items:flex-start;gap:14px">
            <div style="flex:1">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;flex-wrap:wrap">
                <span style="font-weight:700;color:#fca5a5;font-size:15px">${pd.name}</span>
                <span class="realm-badge--permanent">Cấm Địa Bậc ${pd.tier || 1}</span>
                <span class="badge" style="background:rgba(184,74,74,0.15);color:#d67a7a;border:1px solid rgba(184,74,74,0.3);font-size:11px;font-weight:600">
                  Độ Khó: x${diffMult}
                </span>
                <span class="badge" style="background:${pd.clearCount > 0 ? 'rgba(79,140,98,0.15)' : 'rgba(255,255,255,0.06)'};color:${pd.clearCount > 0 ? '#7cb387' : 'var(--text-dim)'};border:1px solid ${pd.clearCount > 0 ? 'rgba(79,140,98,0.35)' : 'rgba(255,255,255,0.1)'};font-size:11px">
                  ${clearText}
                </span>
                <span class="badge bg-darker text-xs">Cảnh giới ${pd.requiredRealm}+</span>
              </div>
              <div style="font-size:12px;opacity:0.85;line-height:1.4;margin-bottom:8px">${pd.description}</div>
              <div style="display:flex;gap:12px;flex-wrap:wrap;font-size:11px;margin-bottom:8px">
                <span style="color:#fca5a5">🏰 <strong>${regularWaves} Ải + 1 Ma Thần</strong></span>
                <span>🐉 Trùm Cấm Địa: <strong style="color:#f87171"><span class="badge-danger-apex">🔥 [Cuồng Bạo]</span> ${pd.bossName}</strong></span>
              </div>
              <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;font-size:11px">
                <span style="opacity:0.7">💎 Thưởng Thượng Cổ:</span>
                ${dropPills}
              </div>
            </div>
            <div style="align-self:center">
              <button class="btn btn--sm btn--red" data-enter-disc="${pd.id}" ${!canEnter ? 'disabled' : ''}>
                ${canEnter ? '🔥 Khiêu Chiến' : '🔒 Cảnh Giới Thấp'}
              </button>
            </div>
          </div>
        </div>
      `
    }).join('')
  }

  function renderMapItems() {
    if (d.mapItems.length === 0) {
      return `
        <div style="text-align:center;opacity:0.5;padding:24px 16px;font-size:13px">
          Chưa có Ngọc Giản nào trong Túi Đồ.<br>
          <span style="font-size:12px;opacity:0.8">Hãy đánh bại quái vật thế giới để có cơ hội thu thập Ngọc Giản Cổ Đồ!</span>
        </div>
      `
    }

    return d.mapItems.map(m => {
      const dg = m.dungeon
      return `
        <div class="list-item" style="padding:14px 16px;border:1px solid var(--border);border-left:3px solid #4a7858;border-radius:4px;margin:8px 12px;display:flex;align-items:center;gap:12px;background:var(--bg-panel-alt)">
          <div class="item-info" style="flex:1">
            <div class="item-name" style="font-size:14px;font-weight:700;color:var(--text-bright);display:flex;align-items:center;gap:8px">
              <span>${m.item.name}</span>
              <span class="badge" style="background:rgba(74,120,88,0.15);color:#7cb387;border:1px solid rgba(74,120,88,0.3);font-size:11px">x${m.quantity} Mảnh</span>
            </div>
            ${dg ? `
              <div class="item-meta" style="font-size:12px;opacity:0.8;margin-top:4px">
                🏛️ ${dg.name} · Bậc T${dg.tier} · 🏰 ${dg.waves + 1} Tầng · 🐉 Boss: <strong style="color:var(--gold)">${dg.bossName}</strong>
              </div>
            ` : ''}
          </div>
          ${dg ? `
            <button class="btn btn--sm btn--gold" data-enter="${m.item.id}" style="font-weight:700">
              ⚡ Kích Hoạt
            </button>
          ` : ''}
        </div>
      `
    }).join('')
  }

  function renderLastResult() {
    const r = d.lastResult
    const icon = r.result === 'dungeon_complete' ? '🏆' : (r.result === 'wave_cleared' ? '✅' : '💀')
    const color = r.result === 'dungeon_failed' ? 'var(--red)' : 'var(--gold)'

    return `
      <div class="panel" style="margin-bottom:16px;border-color:${color}">
        <div class="panel-title" style="color:${color}">${icon} Kết Quả Chiến Đấu</div>
        <div class="panel-body" style="padding:12px 16px">
          <div style="font-weight:600;margin-bottom:8px;font-size:14px">${r.message}</div>
          ${r.loot?.length ? `
            <div style="margin-bottom:10px;padding:8px;background:rgba(16,185,129,0.1);border-radius:6px;border:1px solid rgba(16,185,129,0.2)">
              <div style="font-size:11px;font-weight:700;color:var(--green);margin-bottom:4px">🎁 CHIẾN LỢI PHẨM THU ĐƯỢC:</div>
              ${r.loot.map(l => `<div style="font-size:12px;color:var(--green)">${l}</div>`).join('')}
            </div>
          ` : ''}
          <details style="cursor:pointer">
            <summary style="font-size:12px;opacity:0.6">📜 Xem chi tiết diễn biến (${r.combatLog?.length || 0} lượt)</summary>
            <div style="max-height:160px;overflow-y:auto;font-size:11px;opacity:0.7;margin-top:6px;padding:8px;background:rgba(0,0,0,0.3);border-radius:6px">
              ${(r.combatLog || []).map(l => `<div>${l}</div>`).join('')}
            </div>
          </details>
        </div>
      </div>
    `
  }

  function renderHistory() {
    if (d.history.length === 0) return ''

    return `
      <div class="panel" style="margin-top:16px">
        <div class="panel-title">📚 Lịch Sử Khiêu Chiến Bí Cảnh</div>
        <div class="panel-body no-pad" style="max-height:220px;overflow-y:auto">
          ${d.history.map(h => {
            const icon = h.status === 'completed' ? '✅' : (h.status === 'failed' ? '❌' : (h.status === 'abandoned' ? '🚪' : '⏳'))
            const color = h.status === 'completed' ? 'var(--green)' : (h.status === 'failed' ? 'var(--red)' : 'var(--orange)')
            return `
              <div class="list-item" style="padding:10px 14px;font-size:12px;border-bottom:1px solid rgba(255,255,255,0.04)">
                <span style="color:${color};font-weight:600">${icon} ${h.dungeonName}</span>
                <span style="opacity:0.5;margin-left:auto">Tầng ${h.wave}/${h.totalWaves} · ${new Date(h.startedAt).toLocaleDateString('vi-VN')}</span>
              </div>
            `
          }).join('')}
        </div>
      </div>
    `
  }

  function bindEvents() {
    // Enter discovered dungeon (Timed or Permanent)
    document.querySelectorAll('[data-enter-disc]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const discId = btn.dataset.enterDisc
        if (!confirm('⚡ Quyết định tiến vào Bí Cảnh này để khiêu chiến?')) return
        btn.disabled = true
        try {
          const data = await api.enterDiscoveredDungeon(pid, discId)
          notify(data.message, 'success')
          state.player = data.player
          updateSidebar()
          d.activeRun = data.run
          d.lastResult = null
          await loadData()
        } catch (e) {
          notify(e.message, 'error')
          btn.disabled = false
        }
      })
    })

    // Enter map item dungeon
    document.querySelectorAll('[data-enter]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const mapItemId = btn.dataset.enter
        if (!confirm('⚡ Kích hoạt Ngọc Giản và mở lối vào Bí Cảnh?')) return
        btn.disabled = true
        try {
          const data = await api.enterDungeon(pid, mapItemId)
          notify(data.message, 'success')
          state.player = data.player
          updateSidebar()
          d.activeRun = data.run
          d.lastResult = null
          await loadData()
        } catch (e) {
          notify(e.message, 'error')
          btn.disabled = false
        }
      })
    })

    // Fight wave
    document.getElementById('btnFight')?.addEventListener('click', async () => {
      const btn = document.getElementById('btnFight')
      btn.disabled = true
      btn.textContent = '⏳ Đang giao chiến...'
      try {
        const data = await api.fightDungeonWave(pid)
        state.player = data.player
        updateSidebar()
        d.lastResult = data

        if (data.result === 'dungeon_complete' || data.result === 'dungeon_failed') {
          d.activeRun = null
        } else if (data.result === 'wave_cleared') {
          d.activeRun.currentWave = data.nextWave
        }
        render()
      } catch (e) {
        notify(e.message, 'error')
        btn.disabled = false
        btn.textContent = '⚔️ Chiến Đấu'
      }
    })

    // Abandon
    document.getElementById('btnAbandon')?.addEventListener('click', async () => {
      if (!confirm('🚪 Rút lui khỏi Bí Cảnh? Tiến trình hiện tại sẽ bị hủy!')) return
      try {
        await api.abandonDungeon(pid)
        notify('Đã rời khỏi Bí Cảnh an toàn.', 'info')
        d.activeRun = null
        d.lastResult = null
        await loadData()
      } catch (e) {
        notify(e.message, 'error')
      }
    })
  }

  if (!d.loaded) loadData()
  else {
    render()
    startLiveCountdown()
  }
}
