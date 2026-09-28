import { Component } from '../../core/Component.js'
import { STAT_CONFIG, TALENT_TIERS, calcMitigation, calcDodge, formatNumber } from './constants.js'

/**
 * MechanicsTab: Deep combat analytical formulas (MDG armor mitigation curves, evasion probabilities,
 * and talent roots multipliers).
 * Conforms to Anti-AI-Slop & High-Density Torn UI Standards.
 */
export class MechanicsTab extends Component {
  template() {
    const { player = {} } = this.props
    const s = player.stats || {}
    const td = player.talentDisplay || {}
    const defVal = s.defense ?? 0
    const dexVal = s.dexterity ?? 0
    const curSpeed = s.speed ?? 10

    // MDG Armor Mitigation Curves
    const lowMit = calcMitigation(defVal, 25)
    const medMit = calcMitigation(defVal, 75)
    const bossMit = calcMitigation(defVal, 250)

    // Evasion Dexterity Breakdown
    const dodgeSlow = calcDodge(dexVal, curSpeed * 0.75)
    const dodgeEqual = calcDodge(dexVal, curSpeed * 1.0)
    const dodgeAgile = calcDodge(dexVal, curSpeed * 1.5)

    return `
      <div class="mechanics-tab" style="display:flex; flex-direction:column; gap:16px;">
        <!-- ARMOR MITIGATION CURVE -->
        <div class="panel" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:14px 18px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <div>
              <h3 style="font-size:14px; font-weight:700; color:var(--text-bright); margin:0;">
                Phân Tích Phòng Ngự & Giảm Sát Thương (Chuẩn MDG)
              </h3>
              <div style="font-size:11px; color:var(--text-dim); margin-top:2px;">
                Đường cong giảm thiểu sát thương thực tế phụ thuộc vào uy lực đòn đánh của đối phương.
              </div>
            </div>
            <span class="badge" style="background:rgba(83,123,180,0.15); border:1px solid var(--blue); color:var(--blue); font-size:11px; font-weight:700; padding:2px 8px; border-radius:3px;">
              Phòng Thủ: ${formatNumber(defVal)}
            </span>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:10px; margin-top:12px;">
            <!-- LOW STRIKE -->
            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:10px 12px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <span style="font-size:11px; font-weight:600; color:var(--green);">Đòn Nhẹ (25 ST)</span>
                <span style="font-size:12px; font-weight:700; color:var(--green);">${lowMit}%</span>
              </div>
              <div style="background:rgba(0,0,0,0.3); border-radius:2px; height:5px; overflow:hidden; margin-bottom:6px;">
                <div style="background:var(--green); height:100%; width:${lowMit}%;"></div>
              </div>
              <div style="font-size:10px; color:var(--text-dim);">Quái thường, trầy xước sơ đẳng</div>
            </div>

            <!-- MEDIUM STRIKE -->
            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:10px 12px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <span style="font-size:11px; font-weight:600; color:var(--orange);">Đòn Tiêu Chuẩn (75 ST)</span>
                <span style="font-size:12px; font-weight:700; color:var(--orange);">${medMit}%</span>
              </div>
              <div style="background:rgba(0,0,0,0.3); border-radius:2px; height:5px; overflow:hidden; margin-bottom:6px;">
                <div style="background:var(--orange); height:100%; width:${medMit}%;"></div>
              </div>
              <div style="font-size:10px; color:var(--text-dim);">Tinh anh, chiêu thức cận chiến</div>
            </div>

            <!-- BOSS STRIKE -->
            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:10px 12px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <span style="font-size:11px; font-weight:600; color:var(--red);">Đòn Boss (250 ST)</span>
                <span style="font-size:12px; font-weight:700; color:var(--red);">${bossMit}%</span>
              </div>
              <div style="background:rgba(0,0,0,0.3); border-radius:2px; height:5px; overflow:hidden; margin-bottom:6px;">
                <div style="background:var(--red); height:100%; width:${bossMit}%;"></div>
              </div>
              <div style="font-size:10px; color:var(--text-dim);">Trọng kích Boss, xuyên giáp tự nhiên</div>
            </div>
          </div>

          <div style="font-size:10px; color:var(--text-dim); margin-top:10px; text-align:right;">
            Trần giảm sát thương vật lý tối đa: <strong style="color:var(--gold);">85%</strong>
          </div>
        </div>

        <!-- EVASION DEXTERITY BREAKDOWN -->
        <div class="panel" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:14px 18px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <div>
              <h3 style="font-size:14px; font-weight:700; color:var(--text-bright); margin:0;">
                Thân Pháp & Xác Suất Né Tránh (Khéo Léo: ${formatNumber(dexVal)})
              </h3>
              <div style="font-size:11px; color:var(--text-dim); margin-top:2px;">
                Xác suất né tránh dựa trên chênh lệch giữa Thân Pháp của bạn và Tốc Độ đối phương.
              </div>
            </div>
            <span style="font-size:11px; color:var(--text-dim);">Trần né chuẩn: <strong style="color:var(--purple);">35%</strong></span>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:10px; margin-top:12px;">
            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:10px 12px; display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:11px; color:var(--text-dim);">Địch Chậm (0.75x):</span>
              <strong style="font-size:13px; color:var(--cyan);">${dodgeSlow}%</strong>
            </div>

            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:10px 12px; display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:11px; color:var(--text-dim);">Ngang Tốc (1.0x):</span>
              <strong style="font-size:13px; color:var(--purple);">${dodgeEqual}%</strong>
            </div>

            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:10px 12px; display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:11px; color:var(--text-dim);">Thần Tốc (1.5x):</span>
              <strong style="font-size:13px; color:var(--orange);">${dodgeAgile}%</strong>
            </div>
          </div>
        </div>

        <!-- TALENT & ROOTS SYSTEM -->
        <div class="panel" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:14px 18px;">
          <h3 style="font-size:14px; font-weight:700; color:var(--text-bright); margin:0 0 6px 0;">
            Căn Cốt Thiên Phú (Hệ Số Tăng Trưởng)
          </h3>
          <p style="font-size:11px; color:var(--text-dim); margin-bottom:12px;">
            Căn cốt quyết định hiệu quả tăng điểm khi rèn luyện thể phách tại phòng tập hoặc tu vi đột phá.
          </p>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:8px; margin-bottom:14px;">
            ${STAT_CONFIG.map(cfg => {
              const t = td[cfg.key] || { value: 1.0, name: 'Phàm Cốt', color: '#94a3b8' }
              return `
                <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:10px; text-align:center;">
                  <div style="font-size:11px; color:var(--text-dim);">${cfg.name}</div>
                  <div style="font-size:13px; font-weight:700; color:${t.color}; margin-top:3px;">
                    ${t.name}
                  </div>
                  <div style="font-size:11px; color:var(--text-dim); margin-top:2px;">
                    Hệ số ×${t.value}
                  </div>
                </div>
              `
            }).join('')}
          </div>

          <div style="border-top:1px solid var(--border); padding-top:10px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px;">
            <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
              <span style="font-size:10px; color:var(--text-dim); text-transform:uppercase; margin-right:4px;">Thang Bậc Căn Cốt:</span>
              ${TALENT_TIERS.map(tier => `
                <span class="badge" style="background:var(--bg-main); border:1px solid ${tier.color}44; color:${tier.color}; font-size:10px; padding:2px 6px; border-radius:2px;">
                  ${tier.name} (${tier.multiplier})
                </span>
              `).join('')}
            </div>

            <div style="font-size:10px; color:var(--text-dim); font-style:italic;">
              Dùng Tẩy Tủy Đan để tăng bậc · Dùng Hoán Cốt Đan để định hình lại toàn bộ
            </div>
          </div>
        </div>
      </div>
    `
  }
}
