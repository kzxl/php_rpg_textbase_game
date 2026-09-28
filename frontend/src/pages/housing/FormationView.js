import { Component } from '../../core/Component.js'
import { FORMATION_DEFS, formatNumber } from './constants.js'

/**
 * FormationView: Manages cave abode defensive and auxiliary formations.
 * Adheres strictly to Anti-AI-Slop & High-Density Torn UI Standards.
 */
export class FormationView extends Component {
  template() {
    const { housingData = {}, player = {} } = this.props
    const d = housingData
    const isOwned = !!d.owned
    const formations = d.formations || {}
    const currentTier = d.tier || 1
    const gold = player.gold || 0
    const dailyUpkeep = d.dailyUpkeep || 0
    const isMaintenanceDue = !!d.maintenanceDue

    if (!isOwned) {
      return `
        <div class="panel" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:24px; text-align:center;">
          <h3 style="font-size:15px; font-weight:700; color:var(--text-bright); margin-bottom:6px;">Trận Pháp Chưa Mở Khóa</h3>
          <p style="font-size:12px; color:var(--text-dim); margin-bottom:16px;">Đạo hữu cần sở hữu Động Phủ từ Cấp 2 (Mộc Ốc) trở lên để bố trí các đại trận hộ phủ.</p>
        </div>
      `
    }

    return `
      <div class="formation-view" style="display:flex; flex-direction:column; gap:16px;">
        <!-- UPKEEP BANNER -->
        <div class="panel" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:12px 16px;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
            <div>
              <h3 style="font-size:14px; font-weight:700; color:var(--text-bright); margin:0;">
                Hộ Phủ Trận Đạo (Hao Phí: ${formatNumber(dailyUpkeep)} Linh Thạch/ngày)
              </h3>
              <div style="font-size:11px; color:var(--text-dim); margin-top:2px;">
                Trận pháp duy trì hiệu ứng gia tăng chỉ số thụ động. Hàng ngày cần tiêu hao linh thạch để bổ sung linh nhãn.
              </div>
            </div>

            ${dailyUpkeep > 0 ? `
              <div style="display:flex; align-items:center; gap:8px;">
                ${isMaintenanceDue ? `
                  <button class="btn btn--red" id="btnPayMaintenance" style="font-size:12px; padding:5px 14px; border-radius:3px; font-weight:600;">
                    Nộp Phí Duy Trì
                  </button>
                ` : `
                  <span class="badge" style="background:rgba(79,140,98,0.15); border:1px solid var(--green); color:var(--green); font-size:11px; padding:4px 10px; border-radius:3px;">
                    Linh Lực Dồi Dào (Đã Nộp)
                  </span>
                `}
              </div>
            ` : ''}
          </div>
        </div>

        <!-- FORMATIONS LIST -->
        <div class="formations-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:12px;">
          ${Object.entries(formations).map(([fId, f]) => {
            const def = FORMATION_DEFS[fId] || {}
            const curLvl = f.currentLevel || 0
            const maxLvl = f.maxLevel || 5
            const isMaxed = curLvl >= maxLvl
            const canBuild = !!f.canBuild
            const nextCost = f.nextCost || 0
            const nextUpkeep = f.nextDailyCost || 0
            const canAfford = gold >= nextCost

            // Bonus text calculation
            let currentBonusText = 'Chưa kích hoạt'
            let nextBonusText = ''
            if (fId === 'tu_linh_tran') {
              currentBonusText = curLvl > 0 ? `+${curLvl * 2} MP / 10s` : 'Chưa kích hoạt'
              nextBonusText = `+${(curLvl + 1) * 2} MP / 10s`
            } else if (fId === 'ho_the_tran') {
              currentBonusText = curLvl > 0 ? `+${curLvl * 5} HP / 10s` : 'Chưa kích hoạt'
              nextBonusText = `+${(curLvl + 1) * 5} HP / 10s`
            } else if (fId === 'linh_dien_tran') {
              currentBonusText = curLvl > 0 ? `+${Math.round(curLvl * 15)}% tốc độ` : 'Chưa kích hoạt'
              nextBonusText = `+${Math.round((curLvl + 1) * 15)}% tốc độ`
            } else if (fId === 'thu_linh_tran') {
              currentBonusText = curLvl > 0 ? `+${curLvl * 15} Thể lực tối đa` : 'Chưa kích hoạt'
              nextBonusText = `+${(curLvl + 1) * 15} Thể lực tối đa`
            }

            return `
              <div class="panel formation-card" style="background:var(--bg-panel); border:1px solid ${curLvl > 0 ? 'var(--border-light)' : 'var(--border)'}; border-radius:4px; padding:14px; display:flex; flex-direction:column; justify-content:space-between; gap:12px;">
                <div>
                  <!-- HEADER -->
                  <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
                    <div>
                      <div style="display:flex; align-items:center; gap:6px;">
                        <span style="font-size:13px; font-weight:700; color:var(--text-bright);">${f.name}</span>
                        <span class="badge" style="background:${curLvl > 0 ? 'rgba(83,123,180,0.15)' : 'rgba(255,255,255,0.04)'}; border:1px solid ${curLvl > 0 ? 'var(--blue)' : 'var(--border)'}; color:${curLvl > 0 ? 'var(--blue)' : 'var(--text-dim)'}; font-size:10px; padding:1px 6px; border-radius:2px;">
                          ${isMaxed ? 'ĐẠI VIÊN MÃN' : (curLvl > 0 ? `CẤP ${curLvl}/${maxLvl}` : 'CHƯA LẬP')}
                        </span>
                      </div>
                      <div style="font-size:11px; color:var(--text-dim); margin-top:4px;">
                        ${f.description}
                      </div>
                    </div>
                  </div>

                  <!-- BONUS COMPARISON -->
                  <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:8px 10px; margin-top:8px; font-size:11px;">
                    <div style="display:flex; justify-content:space-between; margin-bottom:2px;">
                      <span style="color:var(--text-dim);">Hiệu ứng hiện tại:</span>
                      <strong style="color:${curLvl > 0 ? 'var(--green)' : 'var(--text-dim)'};">${currentBonusText}</strong>
                    </div>
                    ${!isMaxed && canBuild ? `
                      <div style="display:flex; justify-content:space-between;">
                        <span style="color:var(--text-dim);">Cấp tiếp theo:</span>
                        <strong style="color:var(--gold);">${nextBonusText}</strong>
                      </div>
                    ` : ''}
                  </div>
                </div>

                <!-- FOOTER ACTIONS -->
                <div style="border-top:1px solid var(--border); padding-top:10px;">
                  ${!canBuild ? `
                    <div style="font-size:11px; color:var(--red); text-align:center;">
                      Yêu cầu Động Phủ Cấp T${f.requiredTier}+ để khai mở
                    </div>
                  ` : isMaxed ? `
                    <div style="font-size:11px; color:var(--gold); text-align:center; font-weight:600;">
                      Trận Pháp Đã Đạt Cực Hạn
                    </div>
                  ` : `
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                      <div style="font-size:10px; color:var(--text-dim);">
                        Phí nâng: <strong style="color:var(--gold);">${formatNumber(nextCost)}</strong> · Phí duy trì: <strong>${formatNumber(nextUpkeep)}/ngày</strong>
                      </div>
                      <button class="btn btn-upgrade-formation ${canAfford ? 'btn--gold' : 'btn--dark'}" data-fid="${fId}" ${canAfford ? '' : 'disabled'} style="font-size:11px; padding:4px 12px; border-radius:3px; font-weight:600;">
                        ${curLvl === 0 ? 'Bố Trí' : 'Thăng Cấp'}
                      </button>
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
    this.on('click', '.btn-upgrade-formation', (e, target) => {
      const fId = target.dataset.fid
      if (fId && this.props.onUpgradeFormation) {
        this.props.onUpgradeFormation(fId)
      }
    })

    this.on('click', '#btnPayMaintenance', () => {
      if (this.props.onPayMaintenance) {
        this.props.onPayMaintenance()
      }
    })
  }
}
