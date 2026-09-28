import { Component } from '../../core/Component.js'
import { HOUSING_TIERS, formatNumber } from './constants.js'

/**
 * AbodeOverview: Manages cave abode tier, active passives, upkeep and upgrades.
 * Anti-AI-Slop standard: zero emojis, clean rectangular cards, compact typography.
 */
export class AbodeOverview extends Component {
  template() {
    const { housingData = {}, player = {} } = this.props
    const d = housingData
    const isOwned = !!d.owned
    const currentTier = d.tier || 1
    const tierInfo = d.tierInfo || HOUSING_TIERS[currentTier] || HOUSING_TIERS[1]
    const nextTier = d.nextTier
    const passives = d.passiveBonuses || {}
    const gold = player.gold || 0

    if (!isOwned) {
      const entryTier = HOUSING_TIERS[1]
      const canAfford = gold >= entryTier.cost

      return `
        <div class="abode-overview unowned-view" style="display:flex; flex-direction:column; gap:16px;">
          <div class="panel" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:20px;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
              <div>
                <span class="badge" style="background:var(--bg-main); border:1px solid var(--border-light); font-size:11px; padding:2px 8px; border-radius:3px; color:var(--text-dim); text-transform:uppercase; letter-spacing:0.5px;">
                  Chưa Sở Hữu Động Phủ
                </span>
                <h3 style="font-size:16px; font-weight:700; color:var(--text-bright); margin-top:8px;">
                  Khởi Tạo Động Phủ — ${entryTier.name} (T1)
                </h3>
              </div>
              <div style="text-align:right;">
                <div style="font-size:11px; color:var(--text-dim);">Chi phí kiến tạo</div>
                <div style="font-size:15px; font-weight:700; color:var(--gold);">${formatNumber(entryTier.cost)} Linh Thạch</div>
              </div>
            </div>

            <p style="font-size:13px; color:var(--text-dim); line-height:1.6; margin-bottom:16px;">
              ${entryTier.description} Động phủ là nơi nghỉ ngơi an toàn, tăng tốc độ tự nhiên hồi phục Khí Huyết, gia tăng xác suất thành công khi đột phá cảnh giới và mở khóa Dược Viên để gieo trồng dược liệu luyện đan.
            </p>

            <!-- STAT HIGHLIGHTS -->
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:10px; margin-bottom:20px;">
              <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border); border-radius:3px; padding:10px 12px;">
                <div style="font-size:11px; color:var(--text-dim);">Hồi Phục Khí Huyết</div>
                <div style="font-size:14px; font-weight:700; color:var(--green); margin-top:2px;">+${entryTier.hpRegen} HP / 10s</div>
              </div>
              <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border); border-radius:3px; padding:10px 12px;">
                <div style="font-size:11px; color:var(--text-dim);">Khoảnh Dược Viên</div>
                <div style="font-size:14px; font-weight:700; color:var(--blue); margin-top:2px;">${entryTier.gardenSlots} Ô Đất</div>
              </div>
              <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border); border-radius:3px; padding:10px 12px;">
                <div style="font-size:11px; color:var(--text-dim);">Tỷ Lệ Đột Phá Cảnh Giới</div>
                <div style="font-size:14px; font-weight:700; color:var(--gold); margin-top:2px;">+${entryTier.breakthroughBonus}%</div>
              </div>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border); padding-top:14px;">
              <div style="font-size:12px; color:var(--text-dim);">
                Số dư hiện có: <strong style="color:${canAfford ? 'var(--text-bright)' : 'var(--red)'};">${formatNumber(gold)}</strong> Linh Thạch
              </div>
              <button class="btn ${canAfford ? 'btn--gold' : 'btn--dark'}" id="btnPurchaseAbode" ${canAfford ? '' : 'disabled'} style="padding:6px 20px; font-weight:600; border-radius:3px;">
                ${canAfford ? `Khởi Tạo ${entryTier.name}` : 'Không Đủ Linh Thạch'}
              </button>
            </div>
          </div>
        </div>
      `
    }

    // OWNED VIEW
    const isMaintenanceDue = !!d.maintenanceDue
    const dailyUpkeep = d.dailyUpkeep || 0
    const canAffordUpgrade = nextTier && gold >= nextTier.cost

    return `
      <div class="abode-overview owned-view" style="display:flex; flex-direction:column; gap:16px;">
        <!-- ABODE MAIN CARD -->
        <div class="panel" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:16px 20px;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px; margin-bottom:12px;">
            <div>
              <div style="display:flex; align-items:center; gap:8px;">
                <span class="badge" style="background:rgba(83,123,180,0.15); border:1px solid var(--blue); color:var(--blue); font-size:11px; font-weight:700; padding:2px 8px; border-radius:3px;">
                  Cấp ${currentTier}
                </span>
                <h2 style="font-size:17px; font-weight:700; color:var(--text-bright); margin:0;">
                  ${tierInfo.name}
                </h2>
                <span class="badge" style="background:rgba(79,140,98,0.15); border:1px solid var(--green); color:var(--green); font-size:10px; padding:2px 6px; border-radius:3px;">
                  ${d.isRenting ? 'Phòng Thuê' : 'Chính Chủ'}
                </span>
              </div>
              <div style="font-size:12px; color:var(--text-dim); margin-top:4px;">
                ${tierInfo.description}
              </div>
            </div>

            <!-- UPKEEP SUMMARY -->
            <div style="display:flex; align-items:center; gap:12px; background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:8px 12px;">
              <div>
                <div style="font-size:10px; color:var(--text-dim); text-transform:uppercase;">Phí Trận Pháp / Ngày</div>
                <div style="font-size:13px; font-weight:700; color:${dailyUpkeep > 0 ? 'var(--orange)' : 'var(--text-dim)'};">
                  ${formatNumber(dailyUpkeep)} Linh Thạch
                </div>
              </div>
              ${dailyUpkeep > 0 ? `
                <div>
                  ${isMaintenanceDue ? `
                    <button class="btn btn--sm btn--red" id="btnPayUpkeep" style="font-size:11px; padding:4px 10px; border-radius:3px;">
                      Nộp Phí
                    </button>
                  ` : `
                    <span class="badge" style="background:rgba(79,140,98,0.15); border:1px solid var(--green); color:var(--green); font-size:10px; padding:3px 8px; border-radius:3px;">
                      Đã Nộp
                    </span>
                  `}
                </div>
              ` : ''}
            </div>
          </div>

          <!-- PASSIVE BUFFS GRID -->
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 1fr)); gap:8px; margin-top:16px;">
            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:10px;">
              <div style="font-size:11px; color:var(--text-dim);">Hồi Phục Khí Huyết</div>
              <div style="font-size:14px; font-weight:700; color:var(--green); margin-top:2px;">
                +${passives.hpRegenBonus || tierInfo.hpRegen} HP <span style="font-size:10px; font-weight:400; color:var(--text-dim);">/ 10s</span>
              </div>
            </div>

            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:10px;">
              <div style="font-size:11px; color:var(--text-dim);">Hồi Phục Linh Lực</div>
              <div style="font-size:14px; font-weight:700; color:var(--blue); margin-top:2px;">
                +${passives.energyRegenBonus || 0} MP <span style="font-size:10px; font-weight:400; color:var(--text-dim);">/ 10s</span>
              </div>
            </div>

            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:10px;">
              <div style="font-size:11px; color:var(--text-dim);">Thể Lực Tối Đa</div>
              <div style="font-size:14px; font-weight:700; color:var(--cyan); margin-top:2px;">
                +${passives.staminaMaxBonus || 0} Điểm
              </div>
            </div>

            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:10px;">
              <div style="font-size:11px; color:var(--text-dim);">Gia Tốc Dược Điền</div>
              <div style="font-size:14px; font-weight:700; color:var(--purple); margin-top:2px;">
                +${Math.round((passives.gardenSpeedBonus || 0) * 100)}%
              </div>
            </div>

            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:10px;">
              <div style="font-size:11px; color:var(--text-dim);">Tỷ Lệ Đột Phá</div>
              <div style="font-size:14px; font-weight:700; color:var(--gold); margin-top:2px;">
                +${passives.breakthroughBonus || tierInfo.breakthroughBonus}%
              </div>
            </div>
          </div>
        </div>

        <!-- UPGRADE ABODE CARD -->
        <div class="panel" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:16px 20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <h3 style="font-size:14px; font-weight:700; color:var(--text-bright); margin:0;">
              Tiến Trình Động Phủ
            </h3>
            <span style="font-size:11px; color:var(--text-dim);">
              Quy Mô: ${d.maxSlots || tierInfo.gardenSlots} Khoảnh Đất Dược Liệu
            </span>
          </div>

          ${nextTier ? `
            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:12px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
              <div>
                <div style="display:flex; align-items:center; gap:6px;">
                  <span class="badge" style="background:var(--bg-panel); border:1px solid var(--border-light); font-size:10px; padding:1px 6px; border-radius:3px; color:var(--text-dim);">
                    Cấp Kế: T${nextTier.tier}
                  </span>
                  <span style="font-weight:700; font-size:13px; color:var(--text-bright);">${nextTier.name}</span>
                </div>
                <div style="font-size:11px; color:var(--text-dim); margin-top:4px;">
                  ${nextTier.description}
                </div>
                <div style="font-size:11px; color:var(--text-dim); margin-top:6px; display:flex; gap:12px;">
                  <span>Khí Huyết: <strong style="color:var(--green);">+${nextTier.hpRegen} HP/10s</strong></span>
                  <span>Dược Viên: <strong style="color:var(--blue);">${nextTier.gardenSlots} Ô</strong></span>
                  <span>Đột Phá: <strong style="color:var(--gold);">+${nextTier.breakthroughBonus}%</strong></span>
                </div>
              </div>

              <div style="text-align:right;">
                <div style="font-size:11px; color:var(--text-dim); margin-bottom:4px;">
                  Yêu Cầu: <strong style="color:var(--gold);">${formatNumber(nextTier.cost)}</strong> Linh Thạch
                </div>
                <button class="btn ${canAffordUpgrade ? 'btn--gold' : 'btn--dark'}" id="btnUpgradeAbode" ${canAffordUpgrade ? '' : 'disabled'} style="font-size:12px; padding:6px 16px; border-radius:3px;">
                  ${canAffordUpgrade ? `Thăng Cấp Lên ${nextTier.name}` : 'Không Đủ Linh Thạch'}
                </button>
              </div>
            </div>
          ` : `
            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:14px; text-align:center; color:var(--gold); font-size:13px; font-weight:600;">
              Động Phủ Đã Đạt Cảnh Giới Tối Cao (Thiên Cung — Đại Viên Mãn)
            </div>
          `}
        </div>
      </div>
    `
  }

  bindEvents() {
    this.on('click', '#btnPurchaseAbode', () => {
      if (this.props.onPurchase) {
        this.props.onPurchase()
      }
    })

    this.on('click', '#btnUpgradeAbode', () => {
      if (this.props.onUpgrade) {
        this.props.onUpgrade()
      }
    })

    this.on('click', '#btnPayUpkeep', () => {
      if (this.props.onPayUpkeep) {
        this.props.onPayUpkeep()
      }
    })
  }
}
