import { Component } from '../../core/Component.js'
import { formatNumber } from './constants.js'

/**
 * RealmTab: Cultivation realm progression, breakthrough preconditions checklist,
 * tribulation survival readiness and realm roadmap.
 * Conforms to Anti-AI-Slop & High-Density Torn UI Standards.
 */
export class RealmTab extends Component {
  initialState() {
    return {
      showRoadmap: false,
    }
  }

  template() {
    const { player = {}, realmData = {} } = this.props
    const curr = realmData.current || player.realmInfo || {}
    const allRealms = realmData.allRealms || []
    const nextRealm = curr.nextRealm || player.realmInfo?.nextRealm || {}
    const curLevel = player.level || 1
    const reqLevel = nextRealm.levelMin || ((player.realmTier || 1) + 1) * 10
    const goldCost = nextRealm.cost?.gold || 0
    const energyCost = nextRealm.cost?.energy || 0
    const curGold = player.gold || 0
    const curEnergy = player.currentEnergy || 0

    const levelSatisfied = curLevel >= reqLevel
    const goldSatisfied = curGold >= goldCost
    const energySatisfied = curEnergy >= energyCost
    const canBreakthrough = levelSatisfied && goldSatisfied && energySatisfied && !player.hospitalRemaining && (curr.canBreakthrough ?? true)

    const curHp = player.currentHp ?? 100
    const maxHp = player.stats?.maxHp || player.maxHp || 100
    const isWounded = curHp < maxHp
    const targetTier = (player.realmTier || 1) + 1
    const estimatedLightningDmg = Math.round(maxHp * 0.45 * (1 + targetTier * 0.05))
    const usableEnergy = player.usableEnergy ?? player.currentEnergy ?? 0
    const qiShieldCapacity = Math.round(usableEnergy * 2.5)

    const activeAuras = player.activeAuras || []
    const hasGoldenBell = activeAuras.includes('ho_the_kim_chung')
    const hasGaleStride = activeAuras.includes('than_hanh_bo')

    let emergencyPillCount = 0
    if (player.medicines && typeof player.medicines === 'object') {
      emergencyPillCount = Object.values(player.medicines).reduce((acc, val) => acc + (typeof val === 'number' ? val : (val?.qty || 1)), 0)
    } else if (Array.isArray(player.inventory)) {
      emergencyPillCount = player.inventory.filter(i => i.type === 'medicine' || i.type === 'pill' || (i.id && i.id.includes('dan'))).reduce((sum, i) => sum + (i.qty || 1), 0)
    }

    const xpPct = player.xpToNext > 0 ? Math.min(100, Math.floor((player.xp / player.xpToNext) * 100)) : 0

    return `
      <div class="realm-tab" style="display:flex; flex-direction:column; gap:16px;">
        <!-- CURRENT REALM MAIN CARD -->
        <div class="panel" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:16px 20px;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px; margin-bottom:12px;">
            <div>
              <div style="display:flex; align-items:center; gap:8px;">
                <span class="badge" style="background:rgba(194,159,85,0.15); border:1px solid var(--gold); color:var(--gold); font-size:11px; font-weight:700; padding:2px 8px; border-radius:3px;">
                  Bậc ${player.realmTier || 1}
                </span>
                <h2 style="font-size:17px; font-weight:700; color:var(--text-bright); margin:0;">
                  ${curr.fullName || 'Phàm Nhân'}
                </h2>
                <span style="font-size:12px; color:var(--text-dim);">· ${curr.subStageName || 'Sơ Kỳ'}</span>
              </div>
              <div style="font-size:11px; color:var(--text-dim); margin-top:4px;">
                Cấp Độ Tu Sĩ: <strong style="color:var(--blue);">Lv.${player.level || 1}</strong> · Tu vi tích lũy: ${formatNumber(player.xp || 0)} / ${formatNumber(player.xpToNext || 1)} XP (${xpPct}%)
              </div>
            </div>

            <!-- ACTION BUTTON -->
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="badge" style="background:${canBreakthrough ? 'rgba(79,140,98,0.15)' : 'rgba(255,255,255,0.04)'}; border:1px solid ${canBreakthrough ? 'var(--green)' : 'var(--border)'}; color:${canBreakthrough ? 'var(--green)' : 'var(--text-dim)'}; font-size:11px; padding:3px 8px; border-radius:3px; font-weight:600;">
                ${canBreakthrough ? 'SẴN SÀNG ĐỘT PHÁ' : 'CHƯA ĐỦ ĐIỀU KIỆN'}
              </span>
              <button class="btn btn-breakthrough ${canBreakthrough ? 'btn--gold' : 'btn--dark'}" ${canBreakthrough ? '' : 'disabled'} style="font-size:12px; padding:6px 18px; border-radius:3px; font-weight:600;">
                Đột Phá Cảnh Giới
              </button>
            </div>
          </div>

          <!-- XP PROGRESS BAR -->
          <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:2px; height:5px; overflow:hidden; margin-top:8px;">
            <div style="background:var(--gold); height:100%; width:${xpPct}%; transition:width 0.3s ease;"></div>
          </div>
        </div>

        <!-- BREAKTHROUGH PRECONDITIONS CHECKLIST -->
        <div class="panel" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:14px 18px;">
          <div style="font-size:12px; font-weight:700; color:var(--text-bright); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:10px;">
            Điều Kiện Thăng Cảnh Giới: ${nextRealm.name || 'Cảnh Giới Kế Tiếp'}
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:10px;">
            <!-- CONDITION 1: LEVEL -->
            <div style="background:var(--bg-main); border:1px solid ${levelSatisfied ? 'var(--green)' : 'var(--border)'}; border-radius:3px; padding:10px 12px; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div style="font-size:10px; color:var(--text-dim);">Yêu Cầu Cấp Độ</div>
                <div style="font-size:13px; font-weight:700; color:var(--text-bright); margin-top:2px;">
                  Lv.${curLevel} / ${reqLevel}
                </div>
              </div>
              <span class="badge" style="background:${levelSatisfied ? 'rgba(79,140,98,0.15)' : 'rgba(255,255,255,0.04)'}; color:${levelSatisfied ? 'var(--green)' : 'var(--red)'}; font-size:10px; padding:2px 6px; border-radius:2px;">
                ${levelSatisfied ? 'Đạt' : 'Chưa Đạt'}
              </span>
            </div>

            <!-- CONDITION 2: GOLD -->
            <div style="background:var(--bg-main); border:1px solid ${goldSatisfied ? 'var(--green)' : 'var(--border)'}; border-radius:3px; padding:10px 12px; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div style="font-size:10px; color:var(--text-dim);">Linh Thạch Tiêu Hao</div>
                <div style="font-size:13px; font-weight:700; color:var(--text-bright); margin-top:2px;">
                  ${formatNumber(curGold)} / ${formatNumber(goldCost)}
                </div>
              </div>
              <span class="badge" style="background:${goldSatisfied ? 'rgba(79,140,98,0.15)' : 'rgba(255,255,255,0.04)'}; color:${goldSatisfied ? 'var(--green)' : 'var(--red)'}; font-size:10px; padding:2px 6px; border-radius:2px;">
                ${goldSatisfied ? 'Đủ' : 'Thiếu'}
              </span>
            </div>

            <!-- CONDITION 3: ENERGY -->
            <div style="background:var(--bg-main); border:1px solid ${energySatisfied ? 'var(--green)' : 'var(--border)'}; border-radius:3px; padding:10px 12px; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div style="font-size:10px; color:var(--text-dim);">Linh Lực Khả Dụng</div>
                <div style="font-size:13px; font-weight:700; color:var(--text-bright); margin-top:2px;">
                  ${formatNumber(curEnergy)} / ${formatNumber(energyCost)} MP
                </div>
              </div>
              <span class="badge" style="background:${energySatisfied ? 'rgba(79,140,98,0.15)' : 'rgba(255,255,255,0.04)'}; color:${energySatisfied ? 'var(--green)' : 'var(--red)'}; font-size:10px; padding:2px 6px; border-radius:2px;">
                ${energySatisfied ? 'Đủ' : 'Thiếu'}
              </span>
            </div>
          </div>
        </div>

        <!-- TRIBULATION READINESS -->
        <div class="panel" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:14px 18px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <div style="font-size:12px; font-weight:700; color:var(--text-bright); text-transform:uppercase; letter-spacing:0.5px;">
              Độ Kiếp Sinh Tồn (Tribulation Readiness)
            </div>
            <span style="font-size:11px; color:${isWounded ? 'var(--red)' : 'var(--green)'}; font-weight:600;">
              ${isWounded ? 'Khí huyết chưa viên mãn' : 'Khí huyết dồi dào'}
            </span>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:8px;">
            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:10px;">
              <div style="font-size:10px; color:var(--text-dim);">Khí Huyết vs Lôi Kiếp</div>
              <div style="font-size:13px; font-weight:700; color:${isWounded ? 'var(--red)' : 'var(--green)'}; margin-top:2px;">
                ${formatNumber(curHp)} / ${formatNumber(maxHp)} HP
              </div>
              <div style="font-size:10px; color:var(--text-dim); margin-top:3px;">
                Ước tính sét: ~${formatNumber(estimatedLightningDmg)} ST
              </div>
            </div>

            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:10px;">
              <div style="font-size:10px; color:var(--text-dim);">Chân Khí Hộ Thể (Khiên Giáp)</div>
              <div style="font-size:13px; font-weight:700; color:var(--blue); margin-top:2px;">
                ${formatNumber(qiShieldCapacity)} HP
              </div>
              <div style="font-size:10px; color:var(--text-dim); margin-top:3px;">
                ${usableEnergy} LL × 2.5 hấp thụ sát thương
              </div>
            </div>

            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:10px;">
              <div style="font-size:10px; color:var(--text-dim);">Tâm Pháp Bảo Hộ</div>
              <div style="font-size:13px; font-weight:700; color:var(--purple); margin-top:2px;">
                ${hasGoldenBell ? 'Kim Chung (-20%)' : 'Chưa kích hoạt'}
              </div>
              <div style="font-size:10px; color:var(--text-dim); margin-top:3px;">
                ${hasGaleStride ? 'Thần Hành (+10% Né)' : 'Không có hào quang phụ'}
              </div>
            </div>

            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:10px;">
              <div style="font-size:10px; color:var(--text-dim);">Đan Dược Hộ Mệnh</div>
              <div style="font-size:13px; font-weight:700; color:var(--gold); margin-top:2px;">
                ${emergencyPillCount} Viên
              </div>
              <div style="font-size:10px; color:var(--text-dim); margin-top:3px;">
                Tự động cứu mạng khi HP < 20%
              </div>
            </div>
          </div>
        </div>

        <!-- REALM ROADMAP (ACCORDION / TOGGLE) -->
        <div class="panel" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:12px 18px;">
          <div style="display:flex; justify-content:space-between; align-items:center; cursor:pointer;" id="btnToggleRoadmap">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:12px; font-weight:700; color:var(--text-bright); text-transform:uppercase; letter-spacing:0.5px;">
                Lộ Trình Cảnh Giới Tu Tiên (${allRealms.length || 19} Bậc)
              </span>
            </div>
            <button class="btn btn--dark btn--xs" style="font-size:10px; padding:2px 8px; border-radius:2px;">
              ${this.state.showRoadmap ? 'Thu Gọn' : 'Xem Lộ Trình'}
            </button>
          </div>

          ${this.state.showRoadmap ? `
            <div style="margin-top:12px; border-top:1px solid var(--border); padding-top:10px; overflow-x:auto;">
              <table style="width:100%; border-collapse:collapse; font-size:11px; text-align:left;">
                <thead>
                  <tr style="border-bottom:1px solid var(--border); color:var(--text-dim);">
                    <th style="padding:6px 8px;">Cảnh Giới</th>
                    <th style="padding:6px 8px;">Yêu Cầu Cấp</th>
                    <th style="padding:6px 8px;">Tỷ Lệ Thất Bại</th>
                    <th style="padding:6px 8px; text-align:right;">Trạng Thái</th>
                  </tr>
                </thead>
                <tbody>
                  ${allRealms.map(r => {
                    const isCurrent = r.tier === (player.realmTier || 1)
                    const isPast = r.tier < (player.realmTier || 1)
                    const isFuture = r.tier > (player.realmTier || 1)

                    return `
                      <tr style="border-bottom:1px solid rgba(255,255,255,0.03); opacity:${isFuture ? '0.5' : '1'};">
                        <td style="padding:6px 8px; font-weight:600; color:${r.color || 'var(--text-bright)'};">
                          ${r.name}
                        </td>
                        <td style="padding:6px 8px; color:var(--text-dim);">Lv.${r.levelMin}+</td>
                        <td style="padding:6px 8px; color:${r.failChance ? 'var(--red)' : 'var(--text-dim)'};">
                          ${r.failChance ? `${r.failChance}%` : '0%'}
                        </td>
                        <td style="padding:6px 8px; text-align:right;">
                          ${isCurrent ? `
                            <span class="badge" style="background:rgba(194,159,85,0.2); color:var(--gold); border:1px solid var(--gold); font-size:9px; padding:1px 5px; border-radius:2px;">
                              HIỆN TẠI
                            </span>
                          ` : isPast ? `
                            <span class="badge" style="background:rgba(79,140,98,0.15); color:var(--green); font-size:9px; padding:1px 5px; border-radius:2px;">
                              ĐÃ QUA
                            </span>
                          ` : `
                            <span class="badge" style="background:var(--bg-main); color:var(--text-dim); font-size:9px; padding:1px 5px; border-radius:2px;">
                              CHƯA ĐẠT
                            </span>
                          `}
                        </td>
                      </tr>
                    `
                  }).join('')}
                </tbody>
              </table>
            </div>
          ` : ''}
        </div>
      </div>
    `
  }

  bindEvents() {
    this.on('click', '.btn-breakthrough', () => {
      if (this.props.onBreakthrough) {
        this.props.onBreakthrough()
      }
    })

    this.on('click', '#btnToggleRoadmap', () => {
      this.setState({ showRoadmap: !this.state.showRoadmap })
    })
  }
}
