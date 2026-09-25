import { Component } from '../../core/Component.js'
import { MATERIAL_FALLBACK_MAP, classifyMaterial, getMaterialIcon, formatMaterialName } from './constants.js'

/**
 * MaterialPouch Component: Manages categorized ores, beast drops, herbs, catalysts, and enhancement stones.
 */
export class MaterialPouch extends Component {
  initialState() {
    return {
      filter: this.props.ctx?.state?._matFilter || 'all',
      searchQuery: '',
    }
  }

  template() {
    const { player = {}, ctx } = this.props
    const { filter, searchQuery } = this.state
    const catalog = ctx?.state?.materialCatalog || MATERIAL_FALLBACK_MAP

    const matEntries = Object.entries(player.materials || {}).filter(([_, qty]) => (qty || 0) > 0)

    const items = matEntries.map(([id, qty]) => {
      const matData = catalog[id] || MATERIAL_FALLBACK_MAP[id] || {
        id,
        name: formatMaterialName(id),
        tier: 1,
        category: 'basic',
        description: 'Nguyên liệu thu thập từ các chuyến ngao du thám hiểm.'
      }
      const group = classifyMaterial(id, matData)
      return { id, qty, matData, group }
    })

    const filtered = items.filter(it => {
      if (filter !== 'all' && it.group !== filter) return false
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        return it.matData.name.toLowerCase().includes(q) || it.id.toLowerCase().includes(q)
      }
      return true
    })

    const tierNames = { 1: 'Phàm', 2: 'Linh', 3: 'Huyền', 4: 'Địa', 5: 'Thiên' }
    const rarityMap = { 1: 'common', 2: 'uncommon', 3: 'rare', 4: 'epic', 5: 'legendary' }

    return `
      <div class="material-pouch">
        <div class="material-filter-bar" style="display:flex; gap:6px; flex-wrap:wrap; padding:10px 14px; border-bottom:1px solid rgba(255,255,255,0.05); align-items:center">
          <button class="mat-filter-btn ${filter === 'all' ? 'active' : ''}" data-mat-filter="all">Tất Cả (${items.length})</button>
          <button class="mat-filter-btn ${filter === 'mineral' ? 'active' : ''}" data-mat-filter="mineral">⛏️ Khoáng Thạch</button>
          <button class="mat-filter-btn ${filter === 'beast' ? 'active' : ''}" data-mat-filter="beast">🐺 Yêu Thú</button>
          <button class="mat-filter-btn ${filter === 'herb' ? 'active' : ''}" data-mat-filter="herb">🌿 Linh Dược</button>
          <button class="mat-filter-btn ${filter === 'catalyst' ? 'active' : ''}" data-mat-filter="catalyst">💎 Linh Tinh</button>
          <button class="mat-filter-btn ${filter === 'enhance' ? 'active' : ''}" data-mat-filter="enhance">✨ Đá Cường Hóa</button>
        </div>

        ${items.length === 0 ? `
          <div style="padding:40px 20px;text-align:center" class="text-dim">
            📦 Kho nguyên liệu trống không. Hãy ngao du bát hoang, thám hiểm bí cảnh hoặc trảm yêu để thu thập khoáng thạch, linh dược!
          </div>
        ` : (filtered.length === 0 ? `
          <div style="padding:30px 20px;text-align:center" class="text-dim">
            Không có nguyên liệu nào thuộc phân loại này trong túi.
          </div>
        ` : `
          <div class="material-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(220px, 1fr)); gap:8px; padding:12px 14px">
            ${filtered.map(it => {
              const m = it.matData
              const t = m.tier || 1
              const rClass = rarityMap[t] || 'common'
              const icon = getMaterialIcon(it.group, m)
              return `
                <div class="mat-card">
                  <div class="mat-card-header">
                    <div class="mat-card-icon">${icon}</div>
                    <div class="mat-card-info">
                      <div class="mat-card-name rarity-${rClass}" title="${m.name}">${m.name}</div>
                      <div class="mat-card-meta">
                        <span class="mat-badge-tier t${t}">T${t} ${tierNames[t] || ''}</span>
                        ${m.sellPrice ? `<span>💰 ${m.sellPrice}</span>` : ''}
                      </div>
                    </div>
                  </div>
                  <div class="mat-card-desc" title="${m.description || ''}">${m.description || 'Nguyên liệu tu tiên quý hiếm.'}</div>
                  <div class="mat-card-qty">x${it.qty}</div>
                </div>`
            }).join('')}
          </div>
        `)}
      </div>
    `
  }

  bindEvents() {
    this.on('click', '[data-mat-filter]', (e, target) => {
      const nextFilter = target.dataset.matFilter
      if (this.props.ctx?.state) {
        this.props.ctx.state._matFilter = nextFilter
      }
      this.setState({ filter: nextFilter })
    })
  }
}
