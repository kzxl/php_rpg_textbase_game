/**
 * Bí Cảnh — Instanced Dungeon System
 * Player activates Ngọc Giản → fights through waves → boss fight → rewards
 */
export function pageDungeon(el, ctx) {
  const { state, api, notify, updateSidebar, renderGame } = ctx
  const pid = state.playerId

  if (!state._dungeon) {
    state._dungeon = {
      mapItems: [],
      activeRun: null,
      history: [],
      loaded: false,
      combatLog: [],
      lastLoot: [],
      lastResult: null,
    }
  }
  const d = state._dungeon

  async function loadData() {
    try {
      const [mapData, histData] = await Promise.all([
        api.getMapItems(pid),
        api.getDungeonHistory(pid),
      ])
      d.mapItems = mapData.mapItems || []
      d.activeRun = mapData.activeRun || null
      d.history = histData.history || []
      d.loaded = true
      render()
    } catch (e) { notify(e.message || 'Lỗi tải Bí Cảnh', 'error') }
  }

  function render() {
    el.innerHTML = `
      <div class="page-header">
        <h2>🗺️ Bí Cảnh</h2>
        <p class="page-sub">Kích hoạt Ngọc Giản để mở Bí Cảnh. Chiến đấu qua từng tầng và đánh bại Boss cuối!</p>
      </div>

      ${d.activeRun ? renderActiveRun() : renderMapItems()}

      ${d.lastResult ? renderLastResult() : ''}

      ${renderHistory()}
    `
    bindEvents()
  }

  function renderActiveRun() {
    const r = d.activeRun
    const isBoss = r.currentWave === r.totalWaves
    const progress = ((r.currentWave - 1) / r.totalWaves * 100).toFixed(0)

    return `
      <div class="panel" style="border-color:var(--gold);margin-bottom:12px">
        <div class="panel-title" style="color:var(--gold)">⚡ Đang Trong Bí Cảnh</div>
        <div class="panel-body" style="padding:14px 16px">
          <div style="font-size:15px;font-weight:600;margin-bottom:8px">${r.dungeonName || r.dungeonId}</div>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
            <div style="flex:1;background:rgba(255,255,255,0.05);border-radius:4px;height:8px;overflow:hidden">
              <div style="width:${progress}%;height:100%;background:linear-gradient(90deg,var(--blue),var(--gold));border-radius:4px;transition:width 0.3s"></div>
            </div>
            <span style="font-size:12px;opacity:0.6">Tầng ${r.currentWave}/${r.totalWaves}</span>
          </div>
          <div style="display:flex;gap:8px">
            <button class="btn btn--gold" id="btnFight" ${state.player?.hospitalRemaining > 0 ? 'disabled' : ''}>
              ${isBoss ? '🐉 Đánh Boss!' : '⚔️ Chiến Đấu Tầng ' + r.currentWave}
            </button>
            <button class="btn btn--dark" id="btnAbandon">🚪 Bỏ Cuộc</button>
          </div>
          ${state.player?.hospitalRemaining > 0 ? '<div style="color:var(--red);font-size:12px;margin-top:8px">🏥 Đang tịnh dưỡng, chờ hồi phục...</div>' : ''}
        </div>
      </div>
    `
  }

  function renderMapItems() {
    if (d.mapItems.length === 0) {
      return `
        <div class="panel">
          <div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">
            Chưa có Ngọc Giản nào. Hãy đánh quái để có cơ hội nhận Ngọc Giản!
          </div>
        </div>
      `
    }

    return `
      <div class="panel">
        <div class="panel-title">📜 Ngọc Giản Sở Hữu</div>
        <div class="panel-body no-pad">
          ${d.mapItems.map(m => {
            const dg = m.dungeon
            return `
              <div class="list-item" style="padding:12px 16px">
                <div class="item-info" style="flex:1">
                  <div class="item-name">${m.item.icon} ${m.item.name} <span style="opacity:0.5">x${m.quantity}</span></div>
                  ${dg ? `
                    <div class="item-meta">
                      ${dg.name} · T${dg.tier} · ${dg.waves + 1} tầng · Boss: ${dg.bossName}
                    </div>
                  ` : ''}
                </div>
                ${dg ? `<button class="btn btn--sm btn--gold" data-enter="${m.item.id}">⚡ Kích Hoạt</button>` : ''}
              </div>
            `
          }).join('')}
        </div>
      </div>
    `
  }

  function renderLastResult() {
    const r = d.lastResult
    const icon = r.result === 'dungeon_complete' ? '🏆' : (r.result === 'wave_cleared' ? '✅' : '💀')
    const color = r.result === 'dungeon_failed' ? 'var(--red)' : 'var(--gold)'

    return `
      <div class="panel" style="margin-bottom:12px;border-color:${color}">
        <div class="panel-title" style="color:${color}">${icon} Kết Quả</div>
        <div class="panel-body" style="padding:12px 16px">
          <div style="font-weight:600;margin-bottom:8px">${r.message}</div>
          ${r.loot?.length ? `
            <div style="margin-bottom:8px">
              ${r.loot.map(l => `<div style="font-size:12px;color:var(--green)">🎁 ${l}</div>`).join('')}
            </div>
          ` : ''}
          <details style="cursor:pointer">
            <summary style="font-size:12px;opacity:0.5">📜 Chiến đấu log (${r.combatLog?.length || 0} dòng)</summary>
            <div style="max-height:150px;overflow-y:auto;font-size:11px;opacity:0.6;margin-top:4px;padding:8px;background:rgba(0,0,0,0.2);border-radius:6px">
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
      <div class="panel" style="margin-top:12px">
        <div class="panel-title">📚 Lịch Sử Bí Cảnh</div>
        <div class="panel-body no-pad" style="max-height:200px;overflow-y:auto">
          ${d.history.map(h => {
            const icon = h.status === 'completed' ? '✅' : (h.status === 'failed' ? '❌' : (h.status === 'abandoned' ? '🚪' : '⏳'))
            const color = h.status === 'completed' ? 'var(--green)' : (h.status === 'failed' ? 'var(--red)' : 'var(--orange)')
            return `
              <div class="list-item" style="padding:8px 14px;font-size:12px">
                <span style="color:${color}">${icon} ${h.dungeonName}</span>
                <span style="opacity:0.4;margin-left:auto">Tầng ${h.wave}/${h.totalWaves} · ${new Date(h.startedAt).toLocaleDateString('vi-VN')}</span>
              </div>
            `
          }).join('')}
        </div>
      </div>
    `
  }

  function bindEvents() {
    // Enter dungeon
    document.querySelectorAll('[data-enter]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const mapItemId = btn.dataset.enter
        if (!confirm('⚡ Kích hoạt Ngọc Giản và vào Bí Cảnh?')) return
        btn.disabled = true
        try {
          const data = await api.enterDungeon(pid, mapItemId)
          notify(data.message, 'success')
          state.player = data.player
          updateSidebar()
          d.activeRun = data.run
          d.lastResult = null
          await loadData()
        } catch (e) { notify(e.message, 'error'); btn.disabled = false }
      })
    })

    // Fight wave
    document.getElementById('btnFight')?.addEventListener('click', async () => {
      const btn = document.getElementById('btnFight')
      btn.disabled = true
      btn.textContent = '⏳ Đang chiến đấu...'
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
      } catch (e) { notify(e.message, 'error'); btn.disabled = false; btn.textContent = '⚔️ Chiến Đấu' }
    })

    // Abandon
    document.getElementById('btnAbandon')?.addEventListener('click', async () => {
      if (!confirm('🚪 Bỏ cuộc? Ngọc Giản sẽ không được hoàn lại!')) return
      try {
        await api.abandonDungeon(pid)
        notify('Đã rời khỏi Bí Cảnh.', 'info')
        d.activeRun = null
        d.lastResult = null
        await loadData()
      } catch (e) { notify(e.message, 'error') }
    })
  }

  if (!d.loaded) loadData()
  else render()
}
