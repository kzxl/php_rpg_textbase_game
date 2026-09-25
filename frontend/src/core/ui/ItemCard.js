import { Component } from '../Component.js'

/**
 * Enhancement Tier Styling Config conforming to MDG standards.
 */
export const ENHANCE_TIER_STYLES = {
  tier1: { label: '+1~+3', color: '#4ade80', glow: 'rgba(74,222,128,0.25)', border: '#4ade80' },
  tier2: { label: '+4~+6', color: '#60a5fa', glow: 'rgba(96,165,250,0.3)', border: '#60a5fa' },
  tier3: { label: '+7~+9', color: '#c084fc', glow: 'rgba(192,132,252,0.35)', border: '#c084fc' },
  tier4: { label: '+10~+11', color: '#fb923c', glow: 'rgba(251,146,60,0.4)', border: '#fb923c' },
  tier5: { label: '+12', color: '#facc15', glow: 'rgba(250,204,21,0.5)', border: '#facc15' },
}

export function getEnhanceStyle(level = 0) {
  if (level >= 12) return ENHANCE_TIER_STYLES.tier5
  if (level >= 10) return ENHANCE_TIER_STYLES.tier4
  if (level >= 7) return ENHANCE_TIER_STYLES.tier3
  if (level >= 4) return ENHANCE_TIER_STYLES.tier2
  if (level >= 1) return ENHANCE_TIER_STYLES.tier1
  return null
}

export function renderEnhanceBadge(level = 0) {
  if (!level || level <= 0) return ''
  const tier = getEnhanceStyle(level)
  return `<span class="badge" style="background:${tier.color}22; color:${tier.color}; border:1px solid ${tier.border}; font-weight:700; box-shadow:0 0 6px ${tier.glow}; padding:1px 5px; font-size:11px; border-radius:3px">+${level}</span>`
}

/**
 * Standardized ItemCard component for inventory grids and slot previews.
 */
export class ItemCard extends Component {
  initialState() {
    return {
      isHovered: false,
    }
  }

  template() {
    const { item, isEquipped = false, showActions = true, actions = [] } = this.props
    if (!item) {
      return `
        <div class="item-card item-card--empty" style="border:1px dashed rgba(255,255,255,0.15); border-radius:8px; padding:12px; text-align:center; color:var(--text-dim); min-height:80px; display:flex; align-items:center; justify-content:center">
          <span>Trống</span>
        </div>
      `
    }

    const enhanceLevel = item.enhanceLevel || 0
    const enhanceBadge = renderEnhanceBadge(enhanceLevel)
    const enhanceStyle = getEnhanceStyle(enhanceLevel)
    const rarityClass = item.rarity ? `item--${item.rarity}` : ''
    const borderGlow = enhanceStyle ? `border-color: ${enhanceStyle.border}; box-shadow: 0 0 8px ${enhanceStyle.glow}` : ''

    const affixesHtml = (item.affixes || []).map(aff => {
      const isPositive = (aff.value || 0) >= 0
      const sign = isPositive ? '+' : ''
      const statLabel = aff.stat || aff.type || 'Chỉ số'
      return `<span class="affix-tag" style="background:rgba(255,255,255,0.06); padding:1px 6px; border-radius:4px; font-size:11px; margin-right:4px; color:${isPositive ? 'var(--green-light, #86efac)' : 'var(--red-light, #fca5a5)'}">${statLabel} ${sign}${aff.value}${aff.isPercent ? '%' : ''}</span>`
    }).join('')

    return `
      <div class="item-card ${rarityClass}" data-item-id="${item.id}" style="position:relative; background:var(--bg-card, #1a1e29); border:1px solid rgba(255,255,255,0.1); border-radius:8px; padding:10px; display:flex; flex-direction:column; gap:6px; ${borderGlow}">
        <div style="display:flex; justify-content:space-between; align-items:center">
          <div style="display:flex; align-items:center; gap:6px">
            <span style="font-size:18px">${item.icon || '⚔️'}</span>
            <span style="font-weight:600; color:var(--text-bright, #fff)">${item.name || 'Vật phẩm'}</span>
            ${enhanceBadge}
          </div>
          <span style="font-size:11px; color:var(--text-dim); text-transform:uppercase">${item.slot || item.type || ''}</span>
        </div>

        ${item.description ? `<div style="font-size:11px; color:var(--text-dim); line-height:1.3">${item.description}</div>` : ''}

        ${affixesHtml ? `<div style="display:flex; flex-wrap:wrap; gap:4px; margin-top:2px">${affixesHtml}</div>` : ''}

        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:4px; font-size:11px; border-top:1px solid rgba(255,255,255,0.05); padding-top:6px">
          <span style="color:var(--gold, #facc15)">💰 ${item.sellPrice || item.value || 0} Linh Thạch</span>
          ${isEquipped ? '<span style="color:var(--blue-light, #93c5fd); font-size:10px">Đang trang bị</span>' : ''}
        </div>

        ${showActions && actions.length > 0 ? `
          <div class="item-actions" style="display:flex; gap:4px; margin-top:6px">
            ${actions.map(act => `
              <button class="btn btn--sm ${act.btnClass || 'btn--dark'}" data-action="${act.name}" data-item-id="${item.id}" style="flex:1; font-size:11px; padding:3px 6px">
                ${act.label}
              </button>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `
  }

  bindEvents() {
    this.on('click', '[data-action]', (e, target) => {
      const actionName = target.dataset.action
      const itemId = target.dataset.itemId
      if (this.props.onAction) {
        this.props.onAction(actionName, itemId, this.props.item)
      }
    })
  }
}
