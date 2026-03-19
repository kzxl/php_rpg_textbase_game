/**
 * Inventory Page — Equipment + Medicines (Pháp Bảo)
 */
import { itemRow, fmtAffix } from './helpers.js'

export function pageInventory(el, ctx) {
  const { state, api, notify, renderGame } = ctx
  const equip = Object.values(state.player.equipment || {})
  const p = state.player
  const meds = state.medicines || []
  const medCD = p.medCooldownRemaining || 0
  const tab = state.inventoryTab || 'equipped'

  const hasDuocLy = p.skills && p.skills.some(s => {
    const sid = typeof s === 'string' ? s : s.id;
    return sid === 'duoc_ly' || sid === 'y_thuat';
  });

  const ring1 = equip.find(i => i.slot === 'ring1')
  const ring2 = equip.find(i => i.slot === 'ring2')
  
  // Calculate max capacity
  let capacity = 20
  if (ring1?.id === 'tui_tru_vat' || ring1?.baseType?.includes('tru_vat'))
    capacity += (ring1.affixes?.[0]?.value || 10)
  if (ring2?.id === 'tui_tru_vat' || ring2?.baseType?.includes('tru_vat'))
    capacity += (ring2.affixes?.[0]?.value || 10) 

  el.innerHTML = `
    <div class="page-header">
      <h1>🎒 Túi Đồ <span style="font-size:14px;color:var(--text-dim)">(${(p.inventory || []).length} / ${capacity})</span></h1>
      <button class="btn btn--dark btn--sm" id="btnGen" title="Debug: Sinh đồ ngẫu nhiên">🎲 Sinh Mẫu</button>
    </div>
    
    <div class="panel">
      <!-- Scrollable Tab Container -->
      <div class="panel-title" style="display:flex; gap:4px; overflow-x:auto; padding-bottom:8px; white-space:nowrap; border-bottom:1px solid rgba(255,255,255,0.05)">
        <button class="btn btn--sm ${tab === 'equipped' ? 'btn--blue' : 'btn--dark'}" data-tab="equipped">Ngự Khí</button>
        <button class="btn btn--sm ${tab === 'weapon' ? 'btn--blue' : 'btn--dark'}" data-tab="weapon">Vũ Khí</button>
        <button class="btn btn--sm ${tab === 'armor' ? 'btn--blue' : 'btn--dark'}" data-tab="armor">Phòng Cụ</button>
        <button class="btn btn--sm ${tab === 'accessory' ? 'btn--blue' : 'btn--dark'}" data-tab="accessory">Trang Sức</button>
        <button class="btn btn--sm ${tab === 'manual' ? 'btn--blue' : 'btn--dark'}" data-tab="manual">Bí Tịch</button>
        <button class="btn btn--sm ${tab === 'medicine' ? 'btn--blue' : 'btn--dark'}" data-tab="medicine">
          Đan Dược ${medCD > 0 ? `<span style="color:var(--orange); font-size:11px">(${medCD}s)</span>` : ''}
        </button>
      </div>
      <div class="panel-body no-pad" id="invTabContent" style="min-height: 200px"></div>
    </div>`

  const content = document.getElementById('invTabContent')

  // Listeners config
  const setupEquipBindings = () => {
    content.querySelectorAll('[data-eid]').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation(); // Avoid triggering accordion toggle
        try {
          const data = await api.equipItem(state.playerId, btn.dataset.eid)
          state.player = data.player
          notify(data.message, 'success')
          renderGame()
        } catch (err) { notify(err.message || 'Lỗi trang bị', 'error') }
      })
    })

    content.querySelectorAll('[data-use]').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation(); // Avoid triggering accordion toggle
        try {
          const data = await api.useItem(state.playerId, btn.dataset.use)
          state.player = data.player
          notify(data.message, 'success')
          renderGame()
        } catch (err) { notify(err.message || 'Lỗi sử dụng', 'error') }
      })
    })
  }

  // Content routing
  if (tab === 'equipped') {
    const eq = p.equipment || {}
    const slots = [
      { key: 'weapon',  icon: '⚔️', name: 'Vũ Khí' },
      { key: 'body',    icon: '🥋', name: 'Giáp' },
      { key: 'shield',  icon: '🛡️', name: 'Thuẫn' },
      { key: 'feet',    icon: '👢', name: 'Hài' },
      { key: 'ring1',   icon: '💍', name: 'Nhẫn 1' },
      { key: 'ring2',   icon: '💍', name: 'Nhẫn 2' },
    ]
    content.innerHTML = `
      <div style="padding:10px 14px;color:var(--text-dim);font-size:12px;border-bottom:1px solid rgba(255,255,255,0.05)">
        Các pháp bảo đang được liên kết:
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;padding:10px 14px">
        ${slots.map(s => {
          const item = eq[s.key]
          const hasItem = item && item.id
          const rarityClass = hasItem ? `rarity-${item.rarity}` : ''
          return `
            <div style="background:${hasItem ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)'};border:1px solid ${hasItem ? 'rgba(255,215,0,0.15)' : 'rgba(255,255,255,0.05)'};border-radius:8px;padding:10px;text-align:center;min-height:70px;display:flex;flex-direction:column;justify-content:center">
              <div style="font-size:20px;margin-bottom:4px">${s.icon}</div>
              <div style="font-size:10px;opacity:0.4;margin-bottom:2px">${s.name}</div>
              ${hasItem
                ? `<div style="font-size:11px;font-weight:600" class="${rarityClass}">${item.name}</div>
                   <div style="font-size:9px;opacity:0.3">[${item.rarity}] Lv${item.itemLevel || '?'}</div>`
                : `<div style="font-size:11px;opacity:0.2">— Trống —</div>`}
            </div>`
        }).join('')}
      </div>
      ${equip.length > 0 ? `
        <div style="padding:0 14px 10px;font-size:11px;color:var(--text-dim);border-top:1px solid rgba(255,255,255,0.05);padding-top:8px">Chi tiết:</div>
        ${equip.filter(i => i && i.id).map(i => itemRow(i, false)).join('')}
      ` : ''}
    `
    setupEquipBindings()
  } else if (tab === 'medicine') {
    content.innerHTML = `
      <div style="padding:12px">
        ${medCD > 0 ? `
          <div style="text-align:center;padding:8px;margin-bottom:8px;background:rgba(255,165,0,0.1);border-radius:8px">
            <span style="color:var(--orange);font-weight:700">⏳ Đan độc: ${medCD}s / ${300}s</span>
            <div class="bar-track" style="margin-top:4px"><div class="bar-fill nerve" style="width:${medCD/300*100}%;background:var(--orange)"></div></div>
          </div>` : ''}
        ${meds.length === 0 ? '<div class="text-dim text-center mt-3">Túi trống không.</div>' :
          meds.map(m => `
            <div class="list-item" style="padding:10px; align-items:center">
              <div class="item-info" style="flex:1">
                <div class="item-name">${m.icon || '💊'} ${m.name}</div>
                <div class="item-meta">
                  ${m.description}
                  ${m.healPercent ? ` · Phục hồi ${m.healPercent}% HP` : ''}
                  ${m.cooldownAdd ? ` · Sinh Đan độc ${m.cooldownAdd}s` : ''}
                  ${m.duration ? ` · Hiệu lực ${m.duration} trận` : ''}
                  ${m.toxicity && hasDuocLy ? `<div class="text-red mt-xs">⚠️ Phản Phệ: ${m.toxicity.chance}% tẩu hỏa nhập ma</div>` : ''}
                  ${m.penalty && hasDuocLy ? `<div class="text-orange mt-xs">⚠️ Tác dụng phụ: ${m.penalty.map(x => `Giảm ${Math.abs(x.value)*100}% ${x.stat}`).join(', ')}</div>` : ''}
                </div>
              </div>
              <button class="btn btn--sm btn--blue" data-med="${m.id}" 
                ${medCD + (m.cooldownAdd || 0) > 300 ? 'disabled' : ''}>Nuốt</button>
            </div>
          `).join('')}
      </div>`

    content.querySelectorAll('[data-med]').forEach(btn => {
      btn.addEventListener('click', async () => {
        try {
          const data = await api.useMedicine(state.playerId, btn.dataset.med)
          state.player = data.player
          notify(data.message, 'success')
          renderGame()
        } catch (e) { notify(e.message || 'Đan độc quá nồng!', 'error') }
      })
    })
  } else {
    const playerInv = (p.inventory || [])
    let filteredItems = []
    if (tab === 'weapon') {
      filteredItems = playerInv.filter(i => i.slot === 'weapon' && i.category !== 'manual')
    } else if (tab === 'armor') {
      filteredItems = playerInv.filter(i => ['body', 'shield', 'feet'].includes(i.slot))
    } else if (tab === 'accessory') {
      filteredItems = playerInv.filter(i => ['ring', 'amulet', 'ring1', 'ring2'].includes(i.slot))
    } else if (tab === 'manual') {
      filteredItems = playerInv.filter(i => i.category === 'manual')
    }

    content.innerHTML = `
      ${filteredItems.length === 0 ? `<div style="padding:20px; text-align:center" class="text-dim">Không có vật phẩm loại này.</div>` : filteredItems.map(i => itemRow(i, true)).join('')}
    `
    setupEquipBindings()
  }

  el.querySelectorAll('[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.inventoryTab = btn.dataset.tab
      pageInventory(el, ctx)
    })
  })

  document.getElementById('btnGen')?.addEventListener('click', async () => {
    const rars = ['common','rare','epic','legendary']
    try {
      const data = await api.generateItem(state.playerId, rars[Math.floor(Math.random()*rars.length)])
      state.player = data.player
      state.items = data.items || []
      notify(data.message, 'success')
      pageInventory(el, ctx)
    } catch (e) { notify('Lỗi tạo ngẫu nhiên', 'error') }
  })
}
