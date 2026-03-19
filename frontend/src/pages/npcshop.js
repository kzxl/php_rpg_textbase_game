/**
 * NPC Shop — Thương Nhân NPC
 * Daily stock limits, player daily purchase cap
 */
export function pageNpcShop(el, ctx) {
  const { state, api, notify, updateSidebar } = ctx
  const pid = state.playerId

  if (!state._npcShop) state._npcShop = { shops: [], tax: {rate:5,reason:''}, loaded: false }
  const s = state._npcShop

  async function loadData() {
    try {
      const data = await api.getShops(pid)
      s.shops = data.shops || []
      s.tax = data.currentTax || {rate:5,reason:'Thuế tiêu chuẩn'}
      s.loaded = true
      render()
    } catch (e) { notify(e.message || 'Lỗi tải shop', 'error') }
  }

  function render() {
    el.innerHTML = `
      <div class="page-header">
        <h2>🧓 Thương Nhân NPC</h2>
        <p class="page-sub">Mua vật phẩm từ NPC. Stock giới hạn/ngày. Mua tối đa 50 vật phẩm/ngày.</p>
      </div>

      <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap">
        <div style="padding:6px 12px;background:rgba(255,200,0,0.08);border:1px solid rgba(255,200,0,0.2);border-radius:6px;font-size:12px">
          📊 Thuế P2P: <strong style="color:var(--gold)">${s.tax.rate}%</strong>
          <span style="opacity:0.5;margin-left:4px">${s.tax.reason}</span>
        </div>
      </div>

      ${s.shops.length === 0 ? '<div class="panel"><div class="panel-body" style="text-align:center;opacity:0.4;padding:30px">Không có cửa hàng</div></div>' : ''}

      ${s.shops.map(shop => `
        <div class="panel" style="margin-bottom:10px">
          <div class="panel-title">${shop.icon} ${shop.name} <span style="opacity:0.4;font-size:11px">— ${shop.area}</span></div>
          <div class="panel-body no-pad">
            ${shop.items.map(item => `
              <div class="list-item" style="padding:8px 14px;display:flex;align-items:center;gap:10px">
                <div style="flex:1">
                  <div style="font-size:13px;font-weight:500">${item.name}</div>
                  <div style="font-size:11px;opacity:0.5">
                    Stock: <span style="color:${item.remainingStock > 0 ? 'var(--green)' : 'var(--red)'}">${item.remainingStock}/${item.dailyStock}</span>
                    · 💎 ${item.currentPrice}
                  </div>
                </div>
                <div style="display:flex;gap:4px;align-items:center">
                  <input type="number" class="buy-qty" data-shop="${shop.id}" data-item="${item.id}" data-price="${item.currentPrice}"
                    value="1" min="1" max="${item.remainingStock}" style="width:40px;text-align:center;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:4px;padding:3px;font-size:11px">
                  <button class="btn btn--sm btn--gold btn-buy" data-shop="${shop.id}" data-item="${item.id}"
                    ${item.remainingStock <= 0 ? 'disabled' : ''}>
                    ${item.remainingStock > 0 ? '🛒 Mua' : '❌ Hết'}
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    `
    bindEvents()
  }

  function bindEvents() {
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
