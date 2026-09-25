import { Component } from '../../core/Component.js'

/**
 * MonstersPillarView Component: Manages 5★ Monster Bestiary, Fog of War, and Lore Milestones.
 */
export class MonstersPillarView extends Component {
  initialState() {
    return {
      monsterFilterRealm: 'all'
    }
  }

  template() {
    const { masteryData } = this.props
    if (!masteryData) {
      return `
        <div style="text-align: center; padding: 40px; color: var(--text-dim);">
          <div style="font-size: 32px; animation: pulse 1.5s infinite;">🐺</div>
          <div style="margin-top: 10px;">Đang triệu hồi Bách Thú Đồ Giám...</div>
        </div>
      `
    }

    const { totalKills, totalSpecies, tierCounts, monsters = [] } = masteryData
    const realms = ['all', 'Luyện Khí', 'Trúc Cơ', 'Kim Đan', 'Nguyên Anh']
    const { monsterFilterRealm } = this.state

    const filteredMonsters = monsters.filter(m => {
      if (monsterFilterRealm === 'all') return true
      return (m.tierName || '').includes(monsterFilterRealm)
    })

    return `
      <div class="monsters-pillar-view">
        <!-- BESTIARY HERO -->
        <div class="mastery-hero" style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom:14px">
          <div class="mastery-stat-pill" style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:10px 14px; flex:1; min-width:120px; text-align:center">
            <div class="mastery-stat-num" style="font-size:20px; font-weight:700; color:var(--gold, #facc15)">${(totalKills || 0).toLocaleString()}</div>
            <div class="mastery-stat-label" style="font-size:11px; color:var(--text-dim)">Tổng Yêu Thú Đã Trảm</div>
          </div>
          <div class="mastery-stat-pill" style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:10px 14px; flex:1; min-width:120px; text-align:center">
            <div class="mastery-stat-num" style="font-size:20px; font-weight:700; color:var(--text-bright)">${totalSpecies || 0}</div>
            <div class="mastery-stat-label" style="font-size:11px; color:var(--text-dim)">Loài Trong Giới Đồ</div>
          </div>
          <div class="mastery-stat-pill" style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:10px 14px; flex:1; min-width:100px; text-align:center">
            <div class="mastery-stat-num" style="font-size:20px; font-weight:700; color: #3b82f6;">${tierCounts?.[1] || 0}</div>
            <div class="mastery-stat-label" style="font-size:11px; color:var(--text-dim)">Chớm Ngộ (1★)</div>
          </div>
          <div class="mastery-stat-pill" style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:10px 14px; flex:1; min-width:100px; text-align:center">
            <div class="mastery-stat-num" style="font-size:20px; font-weight:700; color: #10b981;">${tierCounts?.[2] || 0}</div>
            <div class="mastery-stat-label" style="font-size:11px; color:var(--text-dim)">Thuần Thục (2★)</div>
          </div>
          <div class="mastery-stat-pill" style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:10px 14px; flex:1; min-width:100px; text-align:center">
            <div class="mastery-stat-num" style="font-size:20px; font-weight:700; color: #8b5cf6;">${tierCounts?.[3] || 0}</div>
            <div class="mastery-stat-label" style="font-size:11px; color:var(--text-dim)">Đại Thành (3★)</div>
          </div>
          <div class="mastery-stat-pill" style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:10px 14px; flex:1; min-width:100px; text-align:center">
            <div class="mastery-stat-num" style="font-size:20px; font-weight:700; color: #f59e0b;">${tierCounts?.[4] || 0}</div>
            <div class="mastery-stat-label" style="font-size:11px; color:var(--text-dim)">Khắc Chế (4★)</div>
          </div>
          <div class="mastery-stat-pill" style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:10px 14px; flex:1; min-width:100px; text-align:center">
            <div class="mastery-stat-num" style="font-size:20px; font-weight:700; color: #ef4444;">${tierCounts?.[5] || 0}</div>
            <div class="mastery-stat-label" style="font-size:11px; color:var(--text-dim)">Tuyệt Diệt (5★)</div>
          </div>
        </div>

        <!-- REALM FILTER -->
        <div class="mastery-filter-bar" style="display:flex; gap:6px; margin-bottom:14px; align-items:center; overflow-x:auto; padding-bottom:4px">
          <span class="text-dim text-xs" style="margin-right: 4px; font-size:11px; color:var(--text-dim)">Cảnh Giới:</span>
          ${realms.map(r => `
            <button class="mastery-filter-btn ${monsterFilterRealm === r ? 'active' : ''}" data-mrealm="${r}">
              ${r === 'all' ? 'Tất Cả' : r}
            </button>
          `).join('')}
        </div>

        <!-- MONSTER CARDS GRID -->
        <div class="monster-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:12px">
          ${filteredMonsters.map(m => {
            const mas = m.mastery || {}
            const isFog = (mas.tier || 0) === 0 && (mas.kills || 0) === 0
            const isMax = mas.isMaxTier
            const tierColor = mas.badgeColor || '#6b7280'

            return `
              <div class="monster-mastery-card ${isFog ? 'fog' : ''} ${mas.tier === 5 ? 'apex' : ''}" style="background:var(--bg-card, #1a1e29); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:12px; display:flex; flex-direction:column; justify-content:space-between">
                <div>
                  <div class="monster-card-top" style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px">
                    <div>
                      <div class="monster-card-name" style="font-size:14px; font-weight:700; color:var(--text-bright)">
                        <span>${isFog ? '🌫️' : '🐺'}</span>
                        <span>${m.name}</span>
                      </div>
                      <div class="text-dim text-xs" style="margin-top: 2px; font-size:11px; color:var(--text-dim)">
                        ${m.tierName || 'Phàm Cấp'} • Ngũ Hành: <b>${m.element || 'Vô'}</b>
                      </div>
                    </div>
                    <span class="monster-tier-tag" style="color: ${tierColor}; border:1px solid ${tierColor}; padding:1px 6px; border-radius:4px; font-size:11px">
                      ${mas.tierName || 'Vô Tri'}
                    </span>
                  </div>

                  <div class="monster-kills-row" style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:6px">
                    <span class="monster-stars-display" style="color: ${tierColor}; font-weight:700">${mas.stars || '☆☆☆☆☆'}</span>
                    <span>Đã trảm: <b>${mas.kills || 0}</b> con</span>
                  </div>

                  <!-- PROGRESS BAR -->
                  <div class="bar-track" style="height: 5px; background:rgba(255,255,255,0.08); border-radius:3px; overflow:hidden; margin-bottom: 8px;">
                    <div class="bar-fill" style="width: ${mas.tierProgress || 0}%; background: ${tierColor}; height:100%"></div>
                  </div>
                  ${!isMax ? `
                    <div class="text-dim text-xs" style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size:11px; color:var(--text-dim)">
                      <span>Tiến độ lên Tầng ${mas.nextTier}</span>
                      <span>${mas.kills}/${mas.nextTierReq} kills</span>
                    </div>
                  ` : `
                    <div class="text-xs" style="color: #ef4444; font-weight: 700; margin-bottom: 6px; font-size:11px">
                      👑 Đạt cảnh giới Tuyệt Diệt tối cao!
                    </div>
                  `}

                  <!-- STATS PREVIEW -->
                  ${!isFog ? `
                    <div class="monster-stats-box" style="display:grid; grid-template-columns:repeat(3, 1fr); gap:4px; background:rgba(0,0,0,0.25); border-radius:6px; padding:6px; font-size:11px; margin-bottom:8px">
                      <div>HP: <b>${m.stats?.hp ?? 0}</b></div>
                      <div>Công: <b>${m.stats?.strength ?? 0}</b></div>
                      <div>Thủ: <b>${m.stats?.defense ?? 0}</b></div>
                      <div>Tốc: <b>${m.stats?.speed ?? 0}</b></div>
                      <div>Thân: <b>${m.stats?.dexterity ?? 0}</b></div>
                      <div>XP: <b>+${m.xpReward ?? 0}</b></div>
                    </div>
                  ` : `
                    <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 6px; text-align: center; color: var(--text-dim); font-size: 11px; margin-bottom: 8px;">
                      🌫️ Sương mù dày đặc. Hãy trảm 5 con để khám phá sinh mệnh và thuộc tính!
                    </div>
                  `}
                </div>

                <!-- ACTIVE BUFFS -->
                <div>
                  ${mas.tier >= 2 ? `
                    <div class="monster-buff-active" style="font-size:11px; color:var(--gold, #facc15); background:rgba(255,215,0,0.06); padding:4px 8px; border-radius:4px">
                      ✨ <b>Khắc chế đang kích hoạt:</b> ${mas.desc}
                    </div>
                  ` : `
                    <div class="text-dim text-xs" style="margin-top: 4px; font-style: italic; font-size:10px; color:var(--text-dim)">
                      🔒 Tầng 2 (20 kills) kích hoạt +10% Sát thương lên loài này.
                    </div>
                  `}
                </div>
              </div>
            `
          }).join('')}
        </div>
      </div>
    `
  }

  bindEvents() {
    this.on('click', '[data-mrealm]', (e, target) => {
      this.setState({ monsterFilterRealm: target.dataset.mrealm })
    })
  }
}
