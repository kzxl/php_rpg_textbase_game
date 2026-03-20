/**
 * NPC Shop — Thương Nhân NPC (Overhauled UI)
 * Premium card-based layout, category tabs, rarity colors
 */
export function pageNpcShop(el, ctx) {
  const { state, api, notify, updateSidebar } = ctx
  const pid = state.playerId

  if (!state._npcShop) state._npcShop = { shops: [], tax: {rate:5,reason:''}, loaded: false }
  const s = state._npcShop
  let activeShopIdx = parseInt(localStorage.getItem('npcShopIdx') || '0')

  async function loadData() {
    try {
      el.innerHTML = '<div class="loading" style="padding:40px;text-align:center">⏳ Đang tải gian hàng...</div>'
      const data = await api.getShops(pid)
      s.shops = data.shops || []
      s.tax = data.currentTax || {rate:5,reason:'Thuế tiêu chuẩn'}
      s.loaded = true
      if (activeShopIdx >= s.shops.length) activeShopIdx = 0
      render()
    } catch (e) { notify(e.message || 'Lỗi tải shop', 'error') }
  }

  function render() {
    if (s.shops.length === 0) {
      el.innerHTML = `
        <div class="page-header"><h1>🧓 Thương Nhân</h1></div>
        <div class="panel"><div class="panel-body text-dim" style="text-align:center;padding:40px">
          Chưa có thương nhân nào mở cửa hàng tại khu vực này.
        </div></div>`
      return
    }

    const shop = s.shops[activeShopIdx] || s.shops[0]

    // Shop selector tabs
    const shopTabs = s.shops.map((sh, i) => `
      <button class="skill-tab ${i === activeShopIdx ? 'active' : ''}" data-shop-idx="${i}">
        ${sh.icon || '🧓'} ${sh.name}
      </button>
    `).join('')

    // Rarity color map
    const rarityColor = { common: '#888', uncommon: '#4a9', rare: '#48f', epic: '#a4f', legendary: 'var(--gold)' }
    const rarityName = { common: 'Phàm', uncommon: 'Tốt', rare: 'Quý', epic: 'Huyền', legendary: 'Thần' }

    // Item cards
    const itemsHtml = (shop.items || []).map(item => {
      const rColor = rarityColor[item.rarity || 'common'] || '#888'
      const rName = rarityName[item.rarity || 'common'] || 'Phàm'
      const outOfStock = (item.remainingStock ?? 1) <= 0
      const canAfford = (state.player?.gold ?? 0) >= (item.currentPrice || 0)

      return `
        <div class="shop-item-card ${outOfStock ? 'out-of-stock' : ''}" style="border-left:3px solid ${rColor}">
          <div class="shop-item-header">
            <div>
              <div class="shop-item-name" style="color:${rColor}">${item.name}</div>
              <div class="shop-item-rarity" style="color:${rColor}">${rName} · Tầng ${item.tier || 1}</div>
            </div>
            <div class="shop-item-stock">
              <span style="color:${outOfStock ? 'var(--red)' : 'var(--green)'}">
                ${outOfStock ? '❌ Hết hàng' : `📦 ${item.remainingStock}/${item.dailyStock}`}
              </span>
            </div>
          </div>
          ${item.description ? `<div class="shop-item-desc">${item.description}</div>` : ''}
          <div class="shop-item-footer">
            <div class="shop-item-price ${canAfford ? '' : 'too-expensive'}">
              💎 ${item.currentPrice?.toLocaleString() || '?'} Linh Thạch
            </div>
            <div class="shop-item-buy">
              <input type="number" class="buy-qty" data-shop="${shop.id}" data-item="${item.id}" 
                value="1" min="1" max="${item.remainingStock || 1}" 
                ${outOfStock ? 'disabled' : ''}>
              <button class="btn btn--sm ${outOfStock ? '' : canAfford ? 'btn--gold' : 'btn--dark'} btn-buy" 
                data-shop="${shop.id}" data-item="${item.id}"
                ${outOfStock || !canAfford ? 'disabled' : ''}>
                ${outOfStock ? '❌' : canAfford ? '🛒 Mua' : '💸 Thiếu'}
              </button>
            </div>
          </div>
        </div>
      `
    }).join('')

    el.innerHTML = `
      <div class="page-header">
        <h1>🧓 Thương Nhân</h1>
        <div class="text-dim text-sm">Mỗi thương nhân có hàng giới hạn mỗi ngày. Mua sắm thông minh!</div>
      </div>

      <div class="shop-info-bar">
        <div class="shop-info-tag">📊 Thuế: <strong style="color:var(--gold)">${s.tax.rate}%</strong></div>
        <div class="shop-info-tag">💎 ${(state.player?.gold ?? 0).toLocaleString()} Linh Thạch</div>
        <div class="shop-info-tag">📍 ${shop.area || 'Không rõ'}</div>
      </div>

      ${s.shops.length > 1 ? `<div class="skill-tabs" style="margin-bottom:12px">${shopTabs}</div>` : ''}

      <div class="shop-items-grid">
        ${itemsHtml || '<div class="text-dim" style="padding:20px">Gian hàng trống</div>'}
      </div>
    `
    bindEvents()
  }

  function bindEvents() {
    // Shop tab switch
    el.querySelectorAll('.skill-tab[data-shop-idx]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeShopIdx = parseInt(btn.dataset.shopIdx)
        localStorage.setItem('npcShopIdx', activeShopIdx)
        render()
      })
    })

    // Buy buttons
    el.querySelectorAll('.btn-buy').forEach(btn => {
      btn.addEventListener('click', async () => {
        const shopId = btn.dataset.shop
        const itemId = btn.dataset.item
        const qtyInput = el.querySelector(`.buy-qty[data-shop="${shopId}"][data-item="${itemId}"]`)
        const qty = parseInt(qtyInput?.value || 1)

        btn.disabled = true
        btn.textContent = '⏳...'
        try {
          const data = await api.buyFromShop(pid, shopId, itemId, qty)
          notify(data.message, 'success')
          state.player = data.player
          updateSidebar()
          await loadData()
        } catch (e) {
          notify(e.message, 'error')
          btn.disabled = false
          btn.textContent = '🛒 Mua'
        }
      })
    })
  }

  if (!s.loaded) loadData()
  else render()
}
