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
  const tab = state.inventoryTab || 'equip'

  const hasDuocLy = p.skills && p.skills.some(s => {
    const sid = typeof s === 'string' ? s : s.id;
    return sid === 'duoc_ly' || sid === 'y_thuat';
  });

  el.innerHTML = `
    <div class="page-header"><h1>🎒 Pháp Bảo</h1></div>
    <div class="panel">
      <div class="panel-title" style="display:flex;gap:0">
        <button class="btn btn--sm ${tab === 'equip' ? 'btn--blue' : 'btn--dark'}" data-tab="equip">⚔ Pháp Khí</button>
        <button class="btn btn--sm ${tab === 'medicine' ? 'btn--blue' : 'btn--dark'}" data-tab="medicine">
          💊 Đan Dược ${medCD > 0 ? `<span style="color:var(--orange)">(⏳${medCD}s)</span>` : ''}
        </button>
      </div>
      <div class="panel-body no-pad" id="invTabContent"></div>
    </div>`

  const content = document.getElementById('invTabContent')

  if (tab === 'equip') {
    content.innerHTML = `
      <div style="padding:10px;display:flex;gap:8px">
        <button class="btn btn--dark btn--sm" id="btnGen">🎲 Tạo ngẫu nhiên</button>
      </div>
      <div class="panel" style="margin:0">
        <div class="panel-title">Đang trang bị (${equip.length})</div>
        <div class="panel-body no-pad">
          ${equip.length === 0 ? '<div style="padding:14px" class="text-dim">Chưa trang bị gì</div>' :
            equip.map(i => itemRow(i, false)).join('')}
        </div>
      </div>
      <div class="panel" style="margin:0">
        <div class="panel-title">Kho vũ khí (${state.items.length})</div>
        <div class="panel-body no-pad">
          ${state.items.map(i => itemRow(i, true)).join('')}
        </div>
      </div>`

    content.querySelectorAll('[data-eid]').forEach(btn => {
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
        const data = await api.generateItem(state.playerId, rars[Math.floor(Math.random()*rars.length)])
        state.player = data.player
        state.items = data.items || []
        notify(data.message, 'success')
        pageInventory(el, ctx)
      } catch (e) { notify('Lỗi tạo item', 'error') }
    })
  } else {
    content.innerHTML = `
      <div style="padding:12px">
        ${medCD > 0 ? `
          <div style="text-align:center;padding:8px;margin-bottom:8px;background:rgba(255,165,0,0.1);border-radius:8px">
            <span style="color:var(--orange);font-weight:700">⏳ Đan độc: ${medCD}s / ${300}s</span>
            <div class="bar-track" style="margin-top:4px"><div class="bar-fill nerve" style="width:${medCD/300*100}%;background:var(--orange)"></div></div>
          </div>` : ''}
        ${meds.length === 0 ? '<div class="text-dim">Không có đan dược</div>' :
          meds.map(m => `
            <div class="list-item">
              <div class="item-info">
                <div class="item-name">${m.icon || '💊'} ${m.name}</div>
                <div class="item-meta">
                  ${m.description}
                  ${m.healPercent ? ` · +${m.healPercent}% HP` : ''}
                  ${m.cooldownAdd ? ` · Đan độc +${m.cooldownAdd}s` : ''}
                  ${m.duration ? ` · Hiệu lực ${m.duration} trận` : ''}
                  ${m.toxicity && hasDuocLy ? `<div class="text-red mt-xs">⚠️ Phản Phệ: ${m.toxicity.chance}% tẩu hỏa nhập ma</div>` : ''}
                  ${m.toxicity && !hasDuocLy ? `<div class="text-purple mt-xs">❓ Dược lực cuồng bạo không rõ...</div>` : ''}
                  ${m.penalty && hasDuocLy ? `<div class="text-orange mt-xs">⚠️ Phản tác dụng: ${m.penalty.map(x => `Giảm ${Math.abs(x.value)*100}% ${x.stat}`).join(', ')}</div>` : ''}
                </div>
              </div>
              <button class="btn btn--sm btn--blue" data-med="${m.id}" 
                ${medCD + (m.cooldownAdd || 0) > 300 ? 'disabled' : ''}>Dùng</button>
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
  }

  el.querySelectorAll('[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.inventoryTab = btn.dataset.tab
      pageInventory(el, ctx)
    })
  })
}
