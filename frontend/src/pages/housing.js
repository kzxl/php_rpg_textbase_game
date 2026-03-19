/**
 * Động Phủ (Housing) — Player house with herb garden
 */
export function pageHousing(el, ctx) {
  const { state, api, notify, updateSidebar, renderGame } = ctx
  const pid = state.playerId

  if (!state._housing) state._housing = { data: null, loaded: false }
  const h = state._housing

  async function loadData() {
    try {
      const data = await api.getHousing(pid)
      h.data = data
      h.loaded = true
      render()
    } catch (e) { notify(e.message || 'Lỗi tải Động Phủ', 'error') }
  }

  function render() {
    const d = h.data
    el.innerHTML = `
      <div class="page-header">
        <h2>🏠 Động Phủ</h2>
        <p class="page-sub">Nơi tu luyện yên tĩnh. Nâng cấp Động Phủ để tăng hồi HP và trồng Dược thảo.</p>
      </div>

      ${d.owned ? renderOwned(d) : renderBuy(d)}
    `
    bindEvents()
  }

  function renderBuy(d) {
    const t = d.tiers[1]
    return `
      <div class="panel">
        <div class="panel-title">🏗️ Mua Động Phủ</div>
        <div class="panel-body" style="text-align:center;padding:24px">
          <div style="font-size:40px;margin-bottom:12px">🏠</div>
          <div style="font-weight:600;margin-bottom:6px">${t.name}</div>
          <div style="font-size:12px;opacity:0.6;margin-bottom:12px">${t.description}</div>
          <div style="margin-bottom:12px">
            <span style="color:var(--green)">❤️ +${t.hpRegen} HP/phút</span> ·
            <span style="color:var(--blue)">🌿 ${t.gardenSlots} ô vườn</span>
          </div>
          <button class="btn btn--gold btn--lg" id="btnBuyHouse">💎 ${t.cost} Linh thạch — Mua</button>
        </div>
      </div>
    `
  }

  function renderOwned(d) {
    const gSlots = d.gardenSlots || []
    const herbs = d.gardenHerbs || {}

    return `
      <div class="panel glass" style="margin-bottom:12px">
        <div class="panel-body" style="display:flex;align-items:center;gap:16px;padding:14px 16px">
          <div style="font-size:36px">🏠</div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:15px">${d.tierInfo.name} <span style="opacity:0.4">(T${d.tier})</span></div>
            <div style="font-size:12px;opacity:0.6">${d.tierInfo.description}</div>
            <div style="font-size:12px;margin-top:4px">
              <span style="color:var(--green)">❤️ +${d.tierInfo.hpRegen} HP/phút</span> ·
              <span style="color:var(--blue)">🌿 ${d.maxSlots} ô vườn</span>
            </div>
          </div>
          ${d.nextTier ? `
            <button class="btn btn--gold btn--sm" id="btnUpgrade" title="Nâng lên ${d.nextTier.name}">
              ⬆ ${d.nextTier.cost} 💎
            </button>
          ` : '<span style="font-size:10px;color:var(--gold)">Tối đa</span>'}
        </div>
      </div>

      <div class="panel">
        <div class="panel-title flex justify-between">
          <span>🌿 Dược Viên</span>
          <button class="btn btn--sm btn--green" id="btnHarvest">🌾 Thu hoạch tất cả</button>
        </div>
        <div class="panel-body" style="padding:12px 16px">
          <div style="display:grid;grid-template-columns:repeat(${Math.min(d.maxSlots, 5)},1fr);gap:8px">
            ${Array.from({length: d.maxSlots}, (_, i) => {
              const slot = gSlots[i] || {}
              const hasHerb = !!slot.herb
              const ready = slot.ready
              const remaining = slot.remaining || 0
              const mins = Math.ceil(remaining / 60)

              return `
                <div style="background:rgba(255,255,255,0.03);border:1px solid ${ready ? 'var(--green)' : (hasHerb ? 'var(--blue)' : 'rgba(255,255,255,0.08)')};border-radius:8px;padding:10px;text-align:center;min-height:80px">
                  ${hasHerb ? `
                    <div style="font-size:20px">${ready ? '🌾' : '🌱'}</div>
                    <div style="font-size:11px;margin-top:4px">${slot.herbName || slot.herb}</div>
                    <div style="font-size:10px;color:${ready ? 'var(--green)' : 'var(--orange)'};margin-top:2px">
                      ${ready ? '✅ Sẵn sàng!' : '⏳ ' + mins + ' phút'}
                    </div>
                  ` : `
                    <div style="font-size:20px;opacity:0.2">🟫</div>
                    <div style="font-size:10px;opacity:0.3;margin-top:4px">Trống</div>
                    <select class="plant-select" data-slot="${i}" style="font-size:10px;margin-top:4px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:4px;padding:2px;width:100%">
                      <option value="">— Chọn —</option>
                      ${Object.entries(herbs).map(([hid, hi]) =>
                        `<option value="${hid}">${hi.name}</option>`
                      ).join('')}
                    </select>
                  `}
                </div>
              `
            }).join('')}
          </div>
        </div>
      </div>

      ${d.formations ? `
      <div class="panel" style="margin-top:10px">
        <div class="panel-title flex justify-between">
          <span>🔮 Trận Pháp</span>
          ${d.dailyCost > 0 ? `
            <span style="font-size:11px">
              Hao phí: <strong style="color:var(--orange)">${d.dailyCost} 💎/ngày</strong>
              ${d.maintenanceDue ? `<button class="btn btn--sm btn--orange" id="btnMaintenance">💰 Nộp phí</button>` : '<span style="color:var(--green);margin-left:6px">✅ Đã nộp</span>'}
            </span>
          ` : ''}
        </div>
        <div class="panel-body" style="padding:12px 16px">
          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">
            ${Object.entries(d.formations).map(([fId, f]) => {
              const maxed = f.currentLevel >= f.maxLevel
              return `
                <div style="background:rgba(255,255,255,0.03);border:1px solid ${f.currentLevel > 0 ? 'var(--blue)' : 'rgba(255,255,255,0.08)'};border-radius:8px;padding:10px">
                  <div style="display:flex;justify-content:space-between;align-items:center">
                    <div>
                      <span style="font-size:16px">${f.icon}</span>
                      <strong style="margin-left:4px">${f.name}</strong>
                      ${f.currentLevel > 0 ? `<span style="color:var(--blue);font-size:11px"> Lv${f.currentLevel}</span>` : ''}
                    </div>
                    ${!f.canBuild ? `<span style="font-size:10px;color:var(--red)">T${f.requiredTier}+</span>` :
                      maxed ? '<span style="font-size:10px;color:var(--gold)">MAX</span>' :
                      `<button class="btn btn--sm btn--gold btn-formation" data-fid="${fId}">
                        ⬆ ${f.nextCost} 💎
                      </button>`
                    }
                  </div>
                  <div style="font-size:11px;opacity:0.5;margin-top:4px">${f.description}</div>
                  ${f.currentLevel > 0 ? `<div style="font-size:10px;color:var(--orange);margin-top:2px">Phí: ${f.nextDailyCost || (f.dailyCosts ? f.dailyCosts[f.currentLevel-1] : '?')}/ngày</div>` : ''}
                </div>
              `
            }).join('')}
          </div>
        </div>
      </div>
      ` : ''}
    `
  }

  function bindEvents() {
    document.getElementById('btnBuyHouse')?.addEventListener('click', async () => {
      if (!confirm('Mua Động Phủ?')) return
      try {
        const data = await api.buyHousing(pid)
        notify(data.message, 'success')
        state.player = data.player
        updateSidebar()
        await loadData()
      } catch (e) { notify(e.message, 'error') }
    })

    document.getElementById('btnUpgrade')?.addEventListener('click', async () => {
      if (!confirm('Nâng cấp Động Phủ?')) return
      try {
        const data = await api.buyHousing(pid)
        notify(data.message, 'success')
        state.player = data.player
        updateSidebar()
        await loadData()
      } catch (e) { notify(e.message, 'error') }
    })

    document.querySelectorAll('.plant-select').forEach(sel => {
      sel.addEventListener('change', async (e) => {
        const herbId = e.target.value
        if (!herbId) return
        const slotIndex = parseInt(sel.dataset.slot)
        try {
          const data = await api.plantHerb(pid, herbId, slotIndex)
          notify(data.message, 'success')
          await loadData()
        } catch (e2) { notify(e2.message, 'error') }
      })
    })

    document.getElementById('btnHarvest')?.addEventListener('click', async () => {
      try {
        const data = await api.harvestGarden(pid)
        notify(data.message, 'success')
        state.player = data.player
        updateSidebar()
        await loadData()
      } catch (e) { notify(e.message, 'error') }
    })

    // Formations
    document.querySelectorAll('.btn-formation').forEach(btn => {
      btn.addEventListener('click', async () => {
        const fId = btn.dataset.fid
        btn.disabled = true; btn.textContent = '⏳...';
        try {
          const data = await api.upgradeFormation(pid, fId)
          notify(data.message, 'success')
          state.player = data.player; updateSidebar()
          await loadData()
        } catch (e) { notify(e.message, 'error'); btn.disabled = false; btn.textContent = '⬆ Nâng'; }
      })
    })

    document.getElementById('btnMaintenance')?.addEventListener('click', async () => {
      try {
        const data = await api.payMaintenance(pid)
        notify(data.message, 'success')
        state.player = data.player; updateSidebar()
        await loadData()
      } catch (e) { notify(e.message, 'error') }
    })
  }

  if (!h.loaded) loadData()
  else render()
}
