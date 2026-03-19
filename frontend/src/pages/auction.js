/**
 * Auction House — Đấu Giá (browse, list, buy, cancel)
 */
export function pageAuction(el, ctx) {
  const { state, api, notify, updateSidebar, renderGame } = ctx
  const pid = state.playerId
  const tab = state._auctionTab || 'browse'

  async function loadAndRender() {
    try {
      const [market, mine] = await Promise.all([api.getAuctions(), api.getMyAuctions(pid)])
      state._auctionListings = market.listings || []
      state._auctionMine = mine.listings || []
      render()
    } catch (e) { notify(e.message, 'error') }
  }

  function render() {
    const listings = state._auctionListings || []
    const mine = state._auctionMine || []
    const inv = (state.player.inventory || []).filter(i => i.slot && i.slot !== 'consumable')

    el.innerHTML = `
      <div class="page-header">
        <h2>🏪 Đấu Giá</h2>
        <p class="page-sub">Mua bán trang bị với người chơi khác. Phí đăng 5%, thuế giao dịch 10%.</p>
      </div>

      <div style="display:flex;gap:6px;margin-bottom:10px">
        <button class="btn ${tab === 'browse' ? 'btn--gold' : 'btn--dark'} btn--sm tab-btn" data-tab="browse">🔍 Duyệt</button>
        <button class="btn ${tab === 'sell' ? 'btn--gold' : 'btn--dark'} btn--sm tab-btn" data-tab="sell">📤 Đăng Bán</button>
        <button class="btn ${tab === 'mine' ? 'btn--gold' : 'btn--dark'} btn--sm tab-btn" data-tab="mine">📋 Của Tôi (${mine.length})</button>
      </div>

      ${tab === 'browse' ? `
        <div class="panel"><div class="panel-body no-pad">
          ${listings.length === 0 ? '<div style="padding:16px;opacity:0.3">Chưa có đấu giá nào...</div>' :
            listings.map(l => {
              const item = JSON.parse(l.item_data || '{}')
              return `<div class="list-item" style="padding:8px 14px">
                <div style="flex:1">
                  <strong style="color:var(--gold)">${item.name || '?'}</strong>
                  <span style="font-size:10px;opacity:0.4">[${item.rarity || '?'}]</span>
                  <div style="font-size:10px;opacity:0.4">Bởi: ${l.seller_name}</div>
                </div>
                <button class="btn btn--green btn--sm btn-buy" data-lid="${l.id}">💎 ${l.buyout_price} Mua</button>
              </div>`
            }).join('')}
        </div></div>
      ` : tab === 'sell' ? `
        <div class="panel">
          <div class="panel-title">📤 Đăng Bán Trang Bị</div>
          <div class="panel-body" style="padding:12px 16px">
            ${inv.length === 0 ? '<div style="opacity:0.3">Không có trang bị để bán</div>' : `
              <select id="selSellItem" style="width:100%;padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px;margin-bottom:8px">
                ${inv.map(i => `<option value="${i.id}">${i.name} [${i.rarity}]</option>`).join('')}
              </select>
              <div style="display:flex;gap:8px;margin-bottom:8px">
                <input type="number" id="inpPrice" placeholder="Giá buyout" value="500" min="10" style="flex:1;padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px">
                <select id="selDuration" style="padding:8px;background:var(--bg-secondary);color:var(--text);border:1px solid rgba(255,255,255,0.1);border-radius:6px">
                  <option value="12">12h</option><option value="24" selected>24h</option><option value="48">48h</option>
                </select>
              </div>
              <button class="btn btn--gold" id="btnListItem" style="width:100%">📤 Đăng Bán</button>
            `}
          </div>
        </div>
      ` : `
        <div class="panel"><div class="panel-body no-pad">
          ${mine.length === 0 ? '<div style="padding:16px;opacity:0.3">Chưa có đấu giá</div>' :
            mine.map(l => {
              const item = JSON.parse(l.item_data || '{}')
              return `<div class="list-item" style="padding:8px 14px">
                <div style="flex:1">
                  <strong>${item.name}</strong>
                  <span class="badge" style="margin-left:4px;background:${l.status === 'active' ? 'var(--green)' : l.status === 'sold' ? 'var(--gold)' : 'var(--red)'}">${l.status}</span>
                  <div style="font-size:10px;opacity:0.4">💎 ${l.buyout_price}</div>
                </div>
                ${l.status === 'active' ? `<button class="btn btn--red btn--sm btn-cancel" data-lid="${l.id}">Hủy</button>` : ''}
              </div>`
            }).join('')}
        </div></div>
      `}
    `
    bindEvents()
  }

  function bindEvents() {
    el.querySelectorAll('.tab-btn').forEach(b => b.addEventListener('click', () => { state._auctionTab = b.dataset.tab; loadAndRender() }))
    el.querySelectorAll('.btn-buy').forEach(b => b.addEventListener('click', async () => {
      if (!confirm('Mua vật phẩm này?')) return
      try { const r = await api.buyAuction(pid, parseInt(b.dataset.lid)); notify(r.message, 'success'); state.player = r.player; updateSidebar(); await loadAndRender() }
      catch (e) { notify(e.message, 'error') }
    }))
    el.querySelectorAll('.btn-cancel').forEach(b => b.addEventListener('click', async () => {
      try { const r = await api.cancelAuction(pid, parseInt(b.dataset.lid)); notify(r.message, 'success'); state.player = r.player; updateSidebar(); await loadAndRender() }
      catch (e) { notify(e.message, 'error') }
    }))
    document.getElementById('btnListItem')?.addEventListener('click', async () => {
      const itemId = document.getElementById('selSellItem')?.value
      const price = parseInt(document.getElementById('inpPrice')?.value || '500')
      const duration = parseInt(document.getElementById('selDuration')?.value || '24')
      try { const r = await api.listAuction(pid, itemId, price, duration); notify(r.message, 'success'); state.player = r.player; updateSidebar(); state._auctionTab = 'mine'; await loadAndRender() }
      catch (e) { notify(e.message, 'error') }
    })
  }

  loadAndRender()
}
