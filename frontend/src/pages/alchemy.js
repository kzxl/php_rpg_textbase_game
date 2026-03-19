import { api } from '../services/api.js'

export function pageAlchemy(el, ctx) {
  const { state, renderGame, notify, updateSidebar } = ctx
  const p = state.player
  const recipes = state.recipes || []
  const medicines = state.medicines || []
  const tab = state._alchemyTab || 'recipes'

  const getMedName = (id) => {
    const m = medicines.find(x => x.id === id)
    return m ? (m.icon || '💊') + ' ' + m.name : id
  }

  // Calculate player crafting skill bonuses
  let craftBonus = 0, costReduction = 0, qualityBonus = 0, doubleChance = 0
  ;(p.skills || []).forEach(ps => {
    const sid = typeof ps === 'string' ? ps : ps.id
    const lvl = typeof ps === 'string' ? 1 : (ps.level || 1)
    if (sid === 'tinh_che') craftBonus = lvl * 2
    if (sid === 'phu_an_thuat') costReduction = lvl * 5
    if (sid === 'linh_kiem_thuat') qualityBonus = lvl * 10
    if (sid === 'cuong_hoa_thuat') doubleChance = lvl * 15
  })

  const formatMedId = (id) => id.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

  // Get all equipment items (equipped + inventory)
  const allItems = []
  Object.values(p.equipment || {}).forEach(i => { if (i) allItems.push({ ...i, loc: 'eq' }) })
  ;(p.inventory || []).filter(i => i.slot && i.slot !== 'consumable').forEach(i => allItems.push({ ...i, loc: 'inv' }))

  let html = `
    <div class="page-header">
      <h1>⚒️ Lò Tạo Hóa (Chế Tác)</h1>
      <div class="text-sm text-dim">Nơi đúc kết Đan dược, rèn Pháp khí và khắc Phù Văn.</div>
    </div>

    <div style="display:flex;gap:6px;margin-bottom:12px">
      <button class="btn ${tab === 'recipes' ? 'btn--gold' : 'btn--dark'} btn--sm tab-btn" data-tab="recipes">🔥 Luyện Đan</button>
      <button class="btn ${tab === 'currency' ? 'btn--gold' : 'btn--dark'} btn--sm tab-btn" data-tab="currency">🔮 Phù Văn</button>
    </div>

    ${(craftBonus || costReduction || qualityBonus || doubleChance) ? `
    <div style="background:rgba(255,215,0,0.05);border:1px solid rgba(255,215,0,0.15);border-radius:6px;padding:6px 12px;margin-bottom:10px;font-size:11px;display:flex;gap:12px;flex-wrap:wrap">
      <span style="color:var(--gold);font-weight:600">🛠 Kỹ năng Chế Tác:</span>
      ${craftBonus ? `<span>🔥 Thành công +${craftBonus}%</span>` : ''}
      ${costReduction ? `<span>💎 Giảm phí -${costReduction}%</span>` : ''}
      ${qualityBonus ? `<span>✨ Chất lượng +${qualityBonus}%</span>` : ''}
      ${doubleChance ? `<span>⬆️ Nâng đôi ${doubleChance}%</span>` : ''}
    </div>
    ` : ''}
  `

  if (tab === 'recipes') {
    // === RECIPE TAB (Luyện Đan) ===
    html += `<div class="panel"><div class="panel-title">🌿 Khí Hải Tàng Trữ (Nguyên Liệu)</div>
      <div class="panel-body flex gap-2" style="overflow-x:auto;padding-bottom:12px;white-space:nowrap">`
    if (!p.materials || Object.keys(p.materials).length === 0) {
      html += `<div style="color:var(--text-dim);font-size:14px;padding:8px 0">Nguyên liệu trống không...</div>`
    } else {
      for (const [mId, amt] of Object.entries(p.materials)) {
        html += `<div class="badge" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);padding:4px 8px">${formatMedId(mId)} <span style="color:var(--gold)">x${amt}</span></div>`
      }
    }
    html += `</div></div>`

    html += `<div class="panel"><div class="panel-title">🔥 Bản Ghi Công Thức</div><div class="panel-body no-pad">`
    if (recipes.length === 0) {
      html += `<div style="padding:16px" class="text-dim">Chưa có công thức...</div>`
    } else {
      recipes.forEach(r => {
        const targetName = getMedName(r.target)
        const finalRate = Math.min(100, (r.successRate || 100) + craftBonus)
        let reqHtml = ''
        if (r.requirements?.skill) reqHtml = `<div class="text-orange" style="font-size:12px;margin-bottom:8px">Yêu cầu: ${formatMedId(r.requirements.skill)} lv${r.requirements.level || 1}</div>`
        let matHtml = ''
        r.materials.forEach(m => {
          const has = p.materials?.[m.id] || 0
          matHtml += `<span style="font-size:13px;margin-right:12px;display:inline-block;background:rgba(255,255,255,0.05);padding:2px 6px;border-radius:4px"><span style="color:${has >= m.amount ? 'var(--green)' : 'var(--red)'};font-weight:bold">${has}/${m.amount}</span> ${formatMedId(m.id)}</span>`
        })
        const targetMed = medicines.find(x => x.id === r.target) || {}
        html += `
          <div class="list-item" style="flex-direction:column;padding:0;align-items:stretch">
            <div class="accordion-header" style="display:flex;justify-content:space-between;align-items:center;padding:12px 14px;cursor:pointer">
              <div style="display:flex;flex-direction:column;gap:4px">
                <strong style="color:var(--gold);font-size:16px">${targetName}</strong>
                <div class="text-xs text-dim flex gap-3">
                  <span class="badge" style="padding:2px 6px">Tier ${r.tier}</span>
                  <span>Tỉ lệ: <span style="color:${finalRate >= 80 ? 'var(--green)' : 'var(--blue)'};font-weight:bold">${finalRate}%</span></span>
                  <span>🔥 Phí: ${r.cost} L.Thạch</span>
                </div>
              </div>
              <div class="text-dim" style="font-size:12px">▼</div>
            </div>
            <div class="accordion-body" style="display:none;padding:12px 14px;background:rgba(0,0,0,0.2);border-top:1px solid rgba(255,255,255,0.05)">
              ${reqHtml}
              <div style="margin-bottom:12px">
                <div class="text-dim" style="font-size:12px;margin-bottom:6px">Nguyên liệu:</div>
                <div class="flex flex-wrap gap-2">${matHtml}</div>
              </div>
              <div class="text-dim" style="font-size:12px;margin-bottom:12px;line-height:1.4">
                <strong>Thuộc Tính:</strong><br>${targetMed.description || 'Chưa rõ.'}
              </div>
              <button class="btn btn--gold btn-craft" style="width:100%;justify-content:center" data-recipe="${r.id}">🔥 Khởi Động Lò</button>
            </div>
          </div>`
      })
    }
    html += `</div></div>`
  } else {
    // === CURRENCY CRAFTING TAB (Phù Văn) ===
    html += `
      <div class="panel" style="margin-bottom:10px">
        <div class="panel-title">⚔️ Chọn Trang Bị</div>
        <div class="panel-body" style="padding:10px 14px">
          ${allItems.length === 0 ? '<div style="opacity:0.3">Không có trang bị nào...</div>' : `
          <select id="selItem" style="width:100%;padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px;font-size:13px">
            ${allItems.map(it => `<option value="${it.id}">${it.loc === 'eq' ? '🔸' : '📦'} ${it.name || it.baseType} [${it.rarity || '?'}] ${(it.affixes || []).length} affix</option>`).join('')}
          </select>
          <div id="itemPreview" style="margin-top:8px;font-size:11px;opacity:0.5"></div>
          `}
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">
        ${[
          { id: 'tay_tuy_phu', name: 'Tẩy Tủy Phù', icon: '🔄', desc: 'Xóa toàn bộ affix và roll lại', cost: 200 },
          { id: 'hon_chu_phu', name: 'Hỗn Chú Phù', icon: '➕', desc: 'Thêm 1 affix (tối đa 4)', cost: 500 },
          { id: 'thien_menh_phu', name: 'Thiên Mệnh Phù', icon: '🔒', desc: 'Khóa 1 affix, reroll còn lại', cost: 1000 },
          { id: 'thang_cap_phu', name: 'Thăng Cấp Phù', icon: '⬆️', desc: 'Tăng item level +1 (max +5)', cost: 1500 },
        ].map(c => {
          const realCost = Math.max(1, Math.round(c.cost * (1 - costReduction / 100)))
          return `
            <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px">
              <div style="font-size:20px;margin-bottom:4px">${c.icon}</div>
              <div style="font-weight:700;font-size:13px;margin-bottom:2px">${c.name}</div>
              <div style="font-size:11px;opacity:0.5;margin-bottom:8px;line-height:1.3">${c.desc}</div>
              <button class="btn btn--gold btn--sm btn-currency" data-cid="${c.id}" style="width:100%">
                💎 ${realCost} ${costReduction > 0 ? `<s style="opacity:0.4;font-size:10px">${c.cost}</s>` : ''}
              </button>
            </div>`
        }).join('')}
      </div>
    `
  }

  el.innerHTML = html

  // === TAB SWITCHING ===
  el.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state._alchemyTab = btn.dataset.tab
      pageAlchemy(el, ctx)
    })
  })

  // === ACCORDION ===
  el.querySelectorAll('.accordion-header').forEach(hdr => {
    hdr.addEventListener('click', () => {
      const body = hdr.nextElementSibling
      if (body.style.display === 'none') {
        body.style.display = 'block'
        hdr.querySelector('.text-dim:last-child').textContent = '▲'
      } else {
        body.style.display = 'none'
        hdr.querySelector('.text-dim:last-child').textContent = '▼'
      }
    })
  })

  // === RECIPE CRAFTING ===
  el.querySelectorAll('.btn-craft').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation()
      const rOpt = recipes.find(r => r.id === btn.dataset.recipe)
      if (rOpt && p.gold < (rOpt.cost || 0)) return notify("Không đủ linh thạch!", "error")
      try {
        const res = await api.craftItem(p.id, btn.dataset.recipe)
        state.player = res.player
        notify(res.message, res.success ? 'success' : 'error')
        renderGame()
      } catch(err) { notify(err.message, 'error') }
    })
  })

  // === CURRENCY CRAFTING ===
  el.querySelectorAll('.btn-currency').forEach(btn => {
    btn.addEventListener('click', async () => {
      const sel = document.getElementById('selItem')
      if (!sel?.value) return notify('Chọn trang bị trước!', 'error')
      const cid = btn.dataset.cid
      let lockIdx = -1
      if (cid === 'thien_menh_phu') {
        const item = allItems.find(i => i.id === sel.value)
        const affixes = item?.affixes || []
        if (affixes.length === 0) return notify('Item không có affix để khóa!', 'error')
        const choice = prompt(`Chọn affix để khóa (0-${affixes.length - 1}):\n${affixes.map((a, i) => `${i}: ${a.name || a.stat} +${a.value}`).join('\n')}`)
        if (choice === null) return
        lockIdx = parseInt(choice)
        if (isNaN(lockIdx) || lockIdx < 0 || lockIdx >= affixes.length) return notify('Chỉ số không hợp lệ!', 'error')
      }
      btn.disabled = true; btn.textContent = '⏳...'
      try {
        const res = await api.applyCurrency(p.id, cid, sel.value, lockIdx)
        notify(res.message, 'success')
        state.player = res.player
        updateSidebar()
        pageAlchemy(el, ctx)
      } catch (e) {
        notify(e.message, 'error')
        btn.disabled = false; btn.textContent = '💎 Dùng'
      }
    })
  })

  // Item preview on select change
  document.getElementById('selItem')?.addEventListener('change', () => {
    const item = allItems.find(i => i.id === document.getElementById('selItem').value)
    const preview = document.getElementById('itemPreview')
    if (item && preview) {
      preview.innerHTML = (item.affixes || []).map(a => `<span style="color:var(--blue)">• ${a.name || a.stat} +${a.value}</span>`).join(' | ') || 'Không có affix'
    }
  })
  // Auto-trigger preview
  document.getElementById('selItem')?.dispatchEvent(new Event('change'))
}
