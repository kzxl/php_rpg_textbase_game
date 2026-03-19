/**
 * Gacha System — Thiên Cơ Đài (pull, pity counter, results)
 */
export function pageGacha(el, ctx) {
  const { state, api, notify, updateSidebar, renderGame } = ctx
  const pid = state.playerId
  const rarityColor = { common: '#999', uncommon: 'var(--green)', rare: 'var(--blue)', legendary: 'var(--gold)' }

  async function load() {
    try {
      const [pools, pity] = await Promise.all([api.getGachaPools(), api.getGachaPity(pid)])
      state._gacha = { pools: pools.pools || {}, pity: pity.pity || {}, results: state._gacha?.results || [] }
      render()
    } catch (e) { notify(e.message, 'error') }
  }

  function render() {
    const g = state._gacha || {}
    const pools = g.pools || {}
    const pity = g.pity || {}
    const results = g.results || []

    el.innerHTML = `
      <div class="page-header">
        <h2>🎰 Thiên Cơ Đài</h2>
        <p class="page-sub">Quay trang bị ngẫu nhiên. Pity system đảm bảo, quay càng nhiều càng may.</p>
      </div>

      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:12px">
        ${Object.entries(pools).map(([pid2, p]) => {
          const pt = pity[pid2] || {}
          return `
          <div class="panel glass">
            <div class="panel-body" style="padding:14px;text-align:center">
              <div style="font-size:24px;margin-bottom:6px">${pid2 === 'premium' ? '✨' : '🎰'}</div>
              <div style="font-weight:700">${p.name}</div>
              <div style="font-size:11px;opacity:0.5;margin:4px 0">
                <span style="color:${rarityColor.legendary}">★ ${p.rates?.legendary}%</span> ·
                <span style="color:${rarityColor.rare}">◆ ${p.rates?.rare}%</span> ·
                <span style="color:${rarityColor.uncommon}">● ${p.rates?.uncommon}%</span>
              </div>
              <div style="font-size:10px;opacity:0.3;margin-bottom:8px">
                Pity Rare: ${pt.pulls_since_rare || 0}/${p.pityRare} · Legend: ${pt.pulls_since_legendary || 0}/${p.pityLegendary}
              </div>
              <div style="display:flex;gap:6px;justify-content:center">
                <button class="btn btn--gold btn--sm btn-pull" data-pool="${pid2}" data-pulls="1">💎 ${p.cost} x1</button>
                <button class="btn btn--gold btn--sm btn-pull" data-pool="${pid2}" data-pulls="10">💎 ${p.cost * 10} x10</button>
              </div>
            </div>
          </div>`
        }).join('')}
      </div>

      ${results.length > 0 ? `
      <div class="panel">
        <div class="panel-title">🎁 Kết Quả Quay (${results.length})</div>
        <div class="panel-body" style="padding:10px 14px">
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:6px">
            ${results.map(r => `
              <div style="background:rgba(255,255,255,0.03);border:1px solid ${rarityColor[r.rarity] || '#555'};border-radius:6px;padding:8px;text-align:center">
                <div style="font-size:14px">${r.item?.slot === 'weapon' ? '⚔️' : r.item?.slot === 'armor' ? '🛡️' : '💍'}</div>
                <div style="font-size:11px;font-weight:600;color:${rarityColor[r.rarity]}">${r.item?.name || '?'}</div>
                <div style="font-size:9px;opacity:0.4">[${r.rarity}] ${(r.item?.affixes || []).length} affix</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      ` : ''}
    `

    el.querySelectorAll('.btn-pull').forEach(b => b.addEventListener('click', async () => {
      const poolId = b.dataset.pool
      const pulls = parseInt(b.dataset.pulls)
      b.disabled = true; b.textContent = '⏳...'
      try {
        const r = await api.gachaPull(state.playerId, poolId, pulls)
        notify(r.message, 'success')
        state.player = r.player; updateSidebar()
        state._gacha.results = r.results || []
        state._gacha.pity[poolId] = r.pity
        render()
      } catch (e) { notify(e.message, 'error'); b.disabled = false }
    }))
  }

  load()
}
