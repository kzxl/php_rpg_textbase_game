/**
 * Tiên Cảnh — Endgame Atlas Maps (PoE-style)
 */
export function pageTienCanh(el, ctx) {
  const { state, api, notify, updateSidebar } = ctx
  const pid = state.playerId
  if (!state._tc) state._tc = { data: null, loaded: false, fighting: false, tab: 'atlas' }
  const tc = state._tc

  async function loadData() {
    try { tc.data = await api.request(`/player/${pid}/atlas-maps`); tc.loaded = true; render() }
    catch (e) { notify(e.message, 'error') }
  }

  function render() {
    const d = tc.data
    const atlas = d?.atlas || {}
    const maps = d?.maps || []
    const activeRun = d?.activeRun
    const allMaps = d?.allMaps || []
    const modifiers = d?.modifiers || []

    el.innerHTML = `
      <div class="page-header">
        <h2>🗺️ Tiên Cảnh</h2>
        <p class="page-sub">Ngao du tiên cảnh — Endgame Atlas. Thu thập Tiên Đồ, chinh phục 8 tầng giới.</p>
      </div>

      <!-- ATLAS OVERVIEW -->
      <div class="panel glass" style="margin-bottom:12px;border-left:3px solid var(--gold)">
        <div class="panel-body" style="display:flex;align-items:center;gap:16px;padding:16px">
          <div style="font-size:42px">🗺️</div>
          <div style="flex:1">
            <div style="font-size:11px;opacity:0.5;text-transform:uppercase;letter-spacing:1px">Atlas Progress</div>
            <div style="font-weight:800;font-size:18px">${atlas.completed || 0}/${atlas.total || 16} Maps</div>
            <div style="font-size:12px;opacity:0.7">IIQ Bonus: +${atlas.bonus || 0}%</div>
            <div style="background:rgba(255,255,255,0.1);border-radius:4px;height:6px;margin-top:6px;overflow:hidden">
              <div style="background:var(--gold);height:100%;width:${atlas.pct || 0}%;border-radius:4px;transition:width 0.5s"></div>
            </div>
          </div>
          <div style="font-size:24px;font-weight:800;color:var(--gold)">${atlas.pct || 0}%</div>
        </div>
      </div>

      <!-- TABS -->
      <div style="display:flex;gap:8px;margin-bottom:12px">
        <button class="btn ${tc.tab==='atlas'?'btn--blue':''} btn--sm" data-tab="atlas">🗺️ Atlas</button>
        <button class="btn ${tc.tab==='inventory'?'btn--blue':''} btn--sm" data-tab="inventory">📦 Tiên Đồ (${maps.length})</button>
        ${activeRun ? `<button class="btn btn--red btn--sm" data-tab="run">⚔️ Active Run</button>` : ''}
      </div>

      <div id="tcContent"></div>
    `

    el.querySelectorAll('[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => { tc.tab = btn.dataset.tab; render() })
    })

    const content = document.getElementById('tcContent')
    if (!content) return

    if (activeRun && tc.tab === 'run') {
      renderActiveRun(content, activeRun)
    } else if (tc.tab === 'inventory') {
      renderInventory(content, maps, modifiers)
    } else {
      renderAtlas(content, allMaps, atlas)
    }
  }

  function renderAtlas(el, allMaps, atlas) {
    const tiers = tc.data?.tiers || []
    el.innerHTML = tiers.map(tier => {
      const tierMaps = allMaps.filter(m => m.tier === tier.tier)
      return `
        <div class="panel" style="margin-bottom:8px">
          <div class="panel-title">T${tier.tier} ${tier.name} <span style="opacity:0.4;font-size:11px">(Realm ${tier.requiredRealm}+, ${tier.scale}× scale)</span></div>
          <div class="panel-body no-pad">
            ${tierMaps.map(m => {
              const completed = (atlas.progress?.[m.id] || 0)
              const elIcons = {fire:'🔥',water:'💧',wood:'🌿',earth:'⛰️',metal:'⚔️'}
              return `<div class="list-item" style="padding:8px 14px">
                <span style="font-size:16px">${elIcons[m.element]||'🗺️'}</span>
                <span style="flex:1;font-weight:${completed?700:400}">${m.name}</span>
                ${completed ? `<span style="color:var(--green);font-size:11px">✅ ×${completed}</span>` : '<span style="opacity:0.3;font-size:11px">❓</span>'}
              </div>`
            }).join('')}
          </div>
        </div>
      `
    }).join('')
  }

  function renderInventory(el, maps, modifiers) {
    if (maps.length === 0) {
      el.innerHTML = '<div class="panel"><div class="panel-body" style="text-align:center;padding:30px;opacity:0.5">Chưa có Tiên Đồ. Drop từ World Boss hoặc Tiên Cảnh.</div></div>'
      return
    }
    el.innerHTML = maps.map((m, i) => {
      const mods = m.modifiers || []
      return `<div class="panel" style="margin-bottom:8px;border-left:3px solid ${tierColor(m.tier)}">
        <div class="panel-body" style="padding:12px 14px">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="font-size:28px">🗺️</div>
            <div style="flex:1">
              <div style="font-weight:700">${m.mapName || m.mapId} <span style="color:${tierColor(m.tier)};font-size:12px">T${m.tier}</span></div>
              <div style="font-size:11px;opacity:0.6">${mods.length > 0 ? mods.map(mod => mod.name).join(' · ') : 'Không có modifier'}</div>
            </div>
            <div style="display:flex;gap:6px">
              ${mods.length < 3 ? `<button class="btn btn--blue btn--sm btn-add-mod" data-idx="${i}">☯ Mod</button>` : ''}
              <button class="btn btn--red btn--sm btn-open-map" data-idx="${i}">⚡ Mở</button>
            </div>
          </div>
        </div>
      </div>`
    }).join('')

    el.querySelectorAll('.btn-open-map').forEach(btn => {
      btn.addEventListener('click', async () => {
        try {
          const res = await api.request(`/player/${pid}/atlas-maps/open`, { method:'POST', body: JSON.stringify({mapIndex: parseInt(btn.dataset.idx)}) })
          notify(res.message, 'success')
          state.player = res.player; updateSidebar()
          tc.tab = 'run'; await loadData()
        } catch(e) { notify(e.message, 'error') }
      })
    })

    el.querySelectorAll('.btn-add-mod').forEach(btn => {
      btn.addEventListener('click', () => showModifierPicker(parseInt(btn.dataset.idx)))
    })
  }

  function showModifierPicker(mapIndex) {
    const mods = tc.data?.modifiers || []
    const popup = document.createElement('div')
    popup.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:100'
    popup.innerHTML = `<div class="panel" style="width:350px;max-height:80vh;overflow:auto">
      <div class="panel-title">☯ Chọn Modifier</div>
      <div class="panel-body no-pad">
        ${mods.map(mod => `<div class="list-item" style="padding:10px 14px;cursor:pointer" data-modid="${mod.id}">
          <span style="flex:1"><strong>${mod.name}</strong><br><span style="font-size:11px;opacity:0.6">${mod.desc} · IIQ +${mod.iiqBonus}%</span></span>
        </div>`).join('')}
      </div>
    </div>`
    popup.addEventListener('click', async (e) => {
      const item = e.target.closest('[data-modid]')
      if (item) {
        try {
          const res = await api.request(`/player/${pid}/atlas-maps/modify`, { method:'POST', body: JSON.stringify({mapIndex, modifierId: item.dataset.modid}) })
          notify(res.message, 'success')
          state.player = res.player; updateSidebar()
          popup.remove(); await loadData()
        } catch(e2) { notify(e2.message, 'error') }
      } else if (e.target === popup) popup.remove()
    })
    document.body.appendChild(popup)
  }

  function renderActiveRun(el, run) {
    const progress = run.currentWave / run.totalWaves * 100
    const mods = run.modifiers || []
    el.innerHTML = `
      <div class="panel" style="border-left:3px solid var(--red)">
        <div class="panel-body" style="padding:16px">
          <div style="font-weight:800;font-size:16px">⚔️ ${run.mapName} <span style="color:${tierColor(run.tier)}">T${run.tier}</span></div>
          <div style="font-size:12px;opacity:0.6;margin-top:4px">
            Tầng ${run.currentWave}/${run.totalWaves}
            ${mods.length > 0 ? ' · ' + mods.map(m => m.name).join(' ') : ''}
          </div>
          <div style="background:rgba(255,255,255,0.1);border-radius:4px;height:8px;margin-top:8px;overflow:hidden">
            <div style="background:var(--red);height:100%;width:${progress}%;border-radius:4px;transition:width 0.3s"></div>
          </div>
          <div style="display:flex;gap:8px;margin-top:12px">
            <button class="btn btn--red btn--lg" id="btnTCFight" ${tc.fighting?'disabled':''}>⚔️ Chiến Đấu</button>
            <button class="btn btn--sm" id="btnTCQuit">🚪 Rời</button>
          </div>
          <div id="tcCombatResult" style="margin-top:12px"></div>
        </div>
      </div>
    `
    document.getElementById('btnTCFight')?.addEventListener('click', async () => {
      tc.fighting = true; render()
      try {
        const res = await api.request(`/player/${pid}/atlas-maps/fight`, { method:'POST' })
        state.player = res.player; updateSidebar()
        const won = res.result !== 'map_failed'
        notify(res.message, won ? 'success' : 'error')
        tc.fighting = false
        if (res.result === 'map_complete' || res.result === 'map_failed') {
          tc.tab = 'atlas'
        }
        await loadData()
      } catch(e) { notify(e.message, 'error'); tc.fighting = false; render() }
    })
    document.getElementById('btnTCQuit')?.addEventListener('click', async () => {
      try {
        await api.request(`/player/${pid}/atlas-maps/abandon`, { method:'POST' })
        notify('Đã rời Tiên Cảnh', 'info')
        tc.tab = 'atlas'; await loadData()
      } catch(e) { notify(e.message, 'error') }
    })
  }

  function tierColor(tier) {
    const colors = {1:'#5ba3cf',2:'#6a8f3f',3:'#d4a017',4:'#b06cff',5:'#ff6b35',6:'#ff4500',7:'#e91e63',8:'#ff0000'}
    return colors[tier] || '#666'
  }

  if (!tc.loaded) loadData(); else render()
}
