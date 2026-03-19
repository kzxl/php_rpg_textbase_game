/**
 * Giao Dịch Đài – Player Marketplace + Cướp Đoạt (Mugging)
 * Tabs: Browse Market, My Listings, Sell Form, Mugging
 * Torn-style accordion, search/filter, and PVP gold theft
 */
export function pageMarket(el, ctx) {
  const { state, api, notify, updateSidebar } = ctx
  const pid = state.playerId

  if (!state._market) {
    state._market = {
      tab: 'browse',
      filter: '',
      sort: 'newest',
      search: '',
      listings: [],
      myListings: [],
      mugTargets: [],
      mugLog: [],
      mugCooldown: 0,
      loaded: false,
      showListForm: false,
    }
  }
  const m = state._market

  async function loadMarket() {
    try {
      const [allData, myData] = await Promise.all([
        api.getMarketListings(m.filter, m.sort),
        api.getMyListings(pid),
      ])
      m.listings = allData.listings || []
      m.myListings = myData.listings || []
      m.loaded = true
      renderMarket()
    } catch (e) { notify(e.message || 'Lỗi tải Giao Dịch Đài', 'error') }
  }

  async function loadMugging() {
    try {
      const [targetData, logData] = await Promise.all([
        api.getMugTargets(pid),
        api.getMugLog(pid),
      ])
      m.mugTargets = targetData.targets || []
      m.mugCooldown = targetData.mugCooldown || 0
      m.mugLog = logData.logs || []
      renderMarket()
    } catch (e) { notify(e.message || 'Lỗi tải dữ liệu Cướp Đoạt', 'error') }
  }

  function renderMarket() {
    const p = state.player
    el.innerHTML = `
      <div class="page-header">
        <h2>🏪 Giao Dịch Đài</h2>
        <p class="page-sub">Mua bán vật phẩm & cướp đoạt linh thạch. Phí giao dịch: 5%</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap;align-items:center">
        <button class="btn btn--sm ${m.tab === 'browse' ? 'btn--blue' : 'btn--dark'}" data-mtab="browse">🛒 Sạp Hàng</button>
        <button class="btn btn--sm ${m.tab === 'my' ? 'btn--blue' : 'btn--dark'}" data-mtab="my">📦 Sạp Tôi (${m.myListings.length}/10)</button>
        <button class="btn btn--sm ${m.tab === 'mug' ? 'btn--red' : 'btn--dark'}" data-mtab="mug">⚔️ Cướp Đoạt</button>
        <button class="btn btn--sm btn--gold" id="btnShowList">➕ Đăng Bán</button>
      </div>

      ${m.showListForm ? renderListForm(p) : ''}

      ${m.tab === 'browse' ? renderBrowse() : (m.tab === 'my' ? renderMyListings() : renderMugging())}
    `
    bindMarketEvents()
  }

  function renderBrowse() {
    let html = `
      <div class="panel">
        <div class="panel-body" style="padding:10px 14px">
          <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
            <button class="btn btn--xs ${m.filter === '' ? 'btn--blue' : 'btn--dark'}" data-filter="">Tất cả</button>
            <button class="btn btn--xs ${m.filter === 'item' ? 'btn--blue' : 'btn--dark'}" data-filter="item">⚔️ Trang Bị</button>
            <button class="btn btn--xs ${m.filter === 'material' ? 'btn--blue' : 'btn--dark'}" data-filter="material">🧱 Nguyên Liệu</button>
            <button class="btn btn--xs ${m.filter === 'medicine' ? 'btn--blue' : 'btn--dark'}" data-filter="medicine">💊 Đan Dược</button>
            <select id="sortSelect" style="padding:4px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:12px;margin-left:auto">
              <option value="newest" ${m.sort === 'newest' ? 'selected' : ''}>Mới nhất</option>
              <option value="price_asc" ${m.sort === 'price_asc' ? 'selected' : ''}>Giá tăng</option>
              <option value="price_desc" ${m.sort === 'price_desc' ? 'selected' : ''}>Giá giảm</option>
            </select>
          </div>
          <div style="margin-top:8px">
            <input type="text" id="searchInput" placeholder="🔍 Tìm theo tên vật phẩm hoặc affix..." value="${m.search}" style="width:100%;padding:8px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:13px" />
          </div>
        </div>
      </div>
    `

    // Filter by search text
    let filtered = m.listings
    if (m.search.trim()) {
      const q = m.search.toLowerCase().trim()
      filtered = filtered.filter(l => {
        if (l.item_name.toLowerCase().includes(q)) return true
        // Search in affix data for equipment
        if (l.item_data?.affixes) {
          return l.item_data.affixes.some(a =>
            (a.stat || '').toLowerCase().includes(q) ||
            (a.type || '').toLowerCase().includes(q)
          )
        }
        return false
      })
    }

    if (filtered.length === 0) {
      html += '<div class="panel"><div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">Không tìm thấy sạp hàng nào.</div></div>'
    } else {
      html += '<div class="panel"><div class="panel-body no-pad" style="max-height:400px;overflow-y:auto">'
      html += filtered.map(l => {
        const typeIcon = l.item_type === 'item' ? '⚔️' : (l.item_type === 'material' ? '🧱' : '💊')
        const rarityClass = l.item_data?.rarity || ''
        const isOwn = l.seller_id === pid
        const affixStr = l.item_data?.affixes
          ? l.item_data.affixes.map(a => `${a.stat} ${a.type === 'flat' ? '+' : ''}${a.value}${a.type !== 'flat' ? '%' : ''}`).join(', ')
          : ''

        return `
          <div class="list-item" style="padding:10px 14px">
            <div class="item-info" style="flex:1">
              <div class="item-name">
                ${typeIcon}
                <span style="color:var(--gold)">${l.item_name}</span>
                ${l.quantity > 1 ? `<span style="opacity:0.5"> x${l.quantity}</span>` : ''}
                ${rarityClass ? `<span class="rarity-${rarityClass}" style="font-size:11px;margin-left:4px">[${rarityClass}]</span>` : ''}
              </div>
              <div class="item-meta" style="margin-top:2px">
                <span style="opacity:0.4">Người bán: ${l.seller_name}</span>
                ${affixStr ? `<span style="color:var(--blue);font-size:11px;margin-left:6px">${affixStr}</span>` : ''}
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-weight:600;color:var(--gold);white-space:nowrap">💎 ${l.price}${l.quantity > 1 ? '/cái' : ''}</span>
              ${!isOwn ? `<button class="btn btn--sm btn--green" data-buy="${l.id}" data-qty="${l.quantity}" data-price="${l.price}">🛒 Mua</button>` : '<span style="font-size:11px;opacity:0.4">Sạp bạn</span>'}
            </div>
          </div>
        `
      }).join('')
      html += '</div></div>'
    }
    return html
  }

  function renderMyListings() {
    if (m.myListings.length === 0) {
      return '<div class="panel"><div class="panel-body" style="text-align:center;opacity:0.5;padding:30px">Bạn chưa đăng bán gì.</div></div>'
    }
    let html = '<div class="panel"><div class="panel-body no-pad">'
    html += m.myListings.map(l => {
      const typeIcon = l.item_type === 'item' ? '⚔️' : (l.item_type === 'material' ? '🧱' : '💊')
      return `
        <div class="list-item" style="padding:10px 14px">
          <div class="item-info">
            <div class="item-name">${typeIcon} ${l.item_name} ${l.quantity > 1 ? `<span style="opacity:0.5">x${l.quantity}</span>` : ''}</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <span style="color:var(--gold)">💎 ${l.price}/cái</span>
            <button class="btn btn--sm btn--dark" data-cancel="${l.id}">📦 Thu Hồi</button>
          </div>
        </div>
      `
    }).join('')
    html += '</div></div>'
    return html
  }

  function renderMugging() {
    let html = `
      <div class="panel" style="border-color:var(--red)">
        <div class="panel-title" style="color:var(--red)">⚔️ Cướp Đoạt Linh Thạch</div>
        <div class="panel-body" style="padding:12px 16px">
          <div class="text-sm text-dim" style="margin-bottom:12px">
            Phục kích tu sĩ cùng khu vực để cướp Linh thạch. Chênh lệch tối đa ±10 cấp. Thất bại sẽ bị phản đòn và trọng thương!
          </div>
          ${m.mugCooldown > 0 ? `<div style="color:var(--orange);margin-bottom:12px;font-weight:600">⏳ Đang hồi sức... Chờ ${m.mugCooldown}s</div>` : ''}
    `

    if (m.mugTargets.length === 0) {
      html += '<div style="text-align:center;opacity:0.5;padding:20px">Không có mục tiêu nào ở khu vực này.</div>'
    } else {
      html += m.mugTargets.map(t => `
        <div class="list-item" style="padding:8px 14px">
          <div class="item-info">
            <div class="item-name">${t.gender === 'female' ? '♀' : '♂'} ${t.name}</div>
            <div class="item-meta">Lv.${t.level} · ${t.current_area}</div>
          </div>
          <button class="btn btn--sm btn--red" data-mug="${t.id}" ${m.mugCooldown > 0 ? 'disabled' : ''}>💀 Phục Kích</button>
        </div>
      `).join('')
    }

    html += '</div></div>'

    // Mugging Log
    if (m.mugLog.length > 0) {
      html += `
        <div class="panel" style="margin-top:12px">
          <div class="panel-title">📜 Lịch Sử Phục Kích</div>
          <div class="panel-body no-pad" style="max-height:200px;overflow-y:auto">
            ${m.mugLog.map(log => {
              const isAttacker = log.attacker_id === pid
              const icon = log.outcome === 'success' ? '✅' : '❌'
              const color = log.outcome === 'success' ? 'var(--green)' : 'var(--red)'
              const text = isAttacker
                ? (log.outcome === 'success' ? `Cướp ${log.victim_name}: +${log.gold_stolen} 💎` : `Phục kích ${log.victim_name} thất bại!`)
                : (log.outcome === 'success' ? `Bị ${log.attacker_name} cướp: -${log.gold_stolen} 💎` : `${log.attacker_name} phục kích bạn thất bại!`)
              return `<div class="list-item" style="padding:6px 14px;font-size:12px;color:${color}">${icon} ${text} <span style="opacity:0.4;margin-left:auto">${new Date(log.created_at).toLocaleString('vi-VN')}</span></div>`
            }).join('')}
          </div>
        </div>
      `
    }

    return html
  }

  function renderListForm(p) {
    const materials = Object.entries(p.materials || {}).map(([id, qty]) => ({ id, qty, type: 'material', name: id }))
    const medicines = Object.entries(p.medicines || {}).map(([id, qty]) => ({ id, qty, type: 'medicine', name: id }))
    const items = (p.inventory || []).map(i => ({ id: i.id, qty: 1, type: 'item', name: i.name || i.id }))
    const all = [...materials, ...medicines, ...items]

    return `
      <div class="panel" style="margin-bottom:12px;border-color:var(--gold)">
        <div class="panel-title" style="color:var(--gold)">📝 Đăng Bán Vật Phẩm</div>
        <div class="panel-body" style="padding:12px 16px">
          ${all.length === 0 ? '<div style="opacity:0.5">Không có gì để bán!</div>' : `
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end">
              <div style="flex:1;min-width:200px">
                <label style="font-size:12px;opacity:0.6;display:block;margin-bottom:4px">Vật phẩm</label>
                <select id="listItem" style="width:100%;padding:6px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:13px">
                  ${all.map(a => `<option value="${a.type}|${a.id}">${a.type === 'item' ? '⚔️' : (a.type === 'material' ? '🧱' : '💊')} ${a.name} ${a.qty > 1 ? `(có: ${a.qty})` : ''}</option>`).join('')}
                </select>
              </div>
              <div style="width:80px">
                <label style="font-size:12px;opacity:0.6;display:block;margin-bottom:4px">Số lượng</label>
                <input type="number" id="listQty" value="1" min="1" style="width:100%;padding:6px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:13px" />
              </div>
              <div style="width:100px">
                <label style="font-size:12px;opacity:0.6;display:block;margin-bottom:4px">Giá 💎/cái</label>
                <input type="number" id="listPrice" value="10" min="1" style="width:100%;padding:6px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#eee;font-size:13px" />
              </div>
              <button class="btn btn--sm btn--gold" id="btnConfirmList">🏪 Đăng</button>
            </div>
          `}
        </div>
      </div>
    `
  }

  function bindMarketEvents() {
    // Tabs
    document.querySelectorAll('[data-mtab]').forEach(btn => {
      btn.addEventListener('click', () => {
        m.tab = btn.dataset.mtab
        if (m.tab === 'mug' && m.mugTargets.length === 0) {
          loadMugging()
          return
        }
        renderMarket()
      })
    })

    // Show list form
    document.getElementById('btnShowList')?.addEventListener('click', () => {
      m.showListForm = !m.showListForm
      renderMarket()
    })

    // Filter
    document.querySelectorAll('[data-filter]').forEach(btn => {
      btn.addEventListener('click', async () => {
        m.filter = btn.dataset.filter
        await loadMarket()
      })
    })

    // Sort
    document.getElementById('sortSelect')?.addEventListener('change', async (e) => {
      m.sort = e.target.value
      await loadMarket()
    })

    // Search
    document.getElementById('searchInput')?.addEventListener('input', (e) => {
      m.search = e.target.value
      renderMarket()
      // Restore cursor position
      const input = document.getElementById('searchInput')
      if (input) { input.focus(); input.setSelectionRange(m.search.length, m.search.length) }
    })

    // Confirm list
    document.getElementById('btnConfirmList')?.addEventListener('click', async () => {
      const sel = document.getElementById('listItem')?.value
      if (!sel) return
      const [itemType, itemId] = sel.split('|')
      const quantity = parseInt(document.getElementById('listQty')?.value) || 1
      const price = parseInt(document.getElementById('listPrice')?.value) || 0
      if (price <= 0) return notify('Giá phải lớn hơn 0!', 'error')

      try {
        const data = await api.listForSale(pid, itemType, itemId, quantity, price)
        notify(data.message, 'success')
        state.player = data.player
        updateSidebar()
        m.showListForm = false
        await loadMarket()
      } catch (e) { notify(e.message, 'error') }
    })

    // Buy
    document.querySelectorAll('[data-buy]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const listingId = parseInt(btn.dataset.buy)
        const maxQty = parseInt(btn.dataset.qty)
        const price = parseInt(btn.dataset.price)
        let qty = 1
        if (maxQty > 1) {
          const input = prompt(`Mua bao nhiêu? (tối đa ${maxQty}, giá ${price} 💎/cái)`, '1')
          if (!input) return
          qty = Math.min(parseInt(input) || 1, maxQty)
        }
        btn.disabled = true
        try {
          const data = await api.buyFromMarket(pid, listingId, qty)
          notify(data.message, 'success')
          state.player = data.player
          updateSidebar()
          await loadMarket()
        } catch (e) {
          notify(e.message, 'error')
          btn.disabled = false
        }
      })
    })

    // Cancel
    document.querySelectorAll('[data-cancel]').forEach(btn => {
      btn.addEventListener('click', async () => {
        btn.disabled = true
        try {
          const data = await api.cancelListing(pid, parseInt(btn.dataset.cancel))
          notify(data.message, 'success')
          state.player = data.player
          updateSidebar()
          await loadMarket()
        } catch (e) {
          notify(e.message, 'error')
          btn.disabled = false
        }
      })
    })

    // Mugging
    document.querySelectorAll('[data-mug]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const victimId = btn.dataset.mug
        if (!confirm('⚠️ Xác nhận phục kích? Thất bại sẽ bị phản đòn và trọng thương!')) return
        btn.disabled = true
        btn.textContent = '⏳...'
        try {
          const data = await api.mugPlayer(pid, victimId)
          notify(data.message, data.success ? 'success' : 'error')
          state.player = data.player
          updateSidebar()
          await loadMugging()
        } catch (e) {
          notify(e.message, 'error')
          btn.disabled = false
          btn.textContent = '💀 Phục Kích'
        }
      })
    })
  }

  if (m.tab === 'mug') {
    loadMugging()
  } else if (!m.loaded) {
    loadMarket()
  } else {
    renderMarket()
  }
}
