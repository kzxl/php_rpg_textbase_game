import { Component } from '../../core/Component.js'
import { formatNumber } from './constants.js'

/**
 * RentalView: P2P Cave Abode Rental Market.
 * Adheres strictly to Anti-AI-Slop & High-Density Torn UI Standards.
 */
export class RentalView extends Component {
  initialState() {
    return {
      dailyFeeInput: 100,
    }
  }

  template() {
    const { housingData = {}, rentals = [], player = {} } = this.props
    const d = housingData
    const isOwned = !!d.owned
    const isRenting = !!d.isRenting
    const gold = player.gold || 0

    return `
      <div class="rental-view" style="display:flex; flex-direction:column; gap:16px;">
        <!-- OWNER LISTING SECTION -->
        <div class="panel" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:16px 20px;">
          <h3 style="font-size:14px; font-weight:700; color:var(--text-bright); margin:0 0 6px 0;">
            Niêm Yết Gian Phòng Cho Thuê
          </h3>
          <p style="font-size:11px; color:var(--text-dim); margin-bottom:12px;">
            Đạo hữu sở hữu Động Phủ có thể mở cửa sương phòng cho các đồng đạo khác vào tu luyện. Chủ phủ nhận 85% tiền thuê mỗi ngày, 15% nạp thuế thiên đạo.
          </p>

          ${isOwned ? `
            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:12px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px;">
              <div style="display:flex; align-items:center; gap:8px;">
                <label style="font-size:11px; color:var(--text-dim);">Giá Thuê / Ngày:</label>
                <input type="number" id="inputRentalFee" min="10" max="100000" value="${this.state.dailyFeeInput}" style="background:var(--bg-panel); border:1px solid var(--border); color:var(--text-bright); border-radius:3px; padding:4px 8px; width:120px; font-size:12px; font-weight:600;" />
                <span style="font-size:11px; color:var(--text-dim);">Linh Thạch</span>
              </div>
              <button class="btn btn--gold" id="btnListRental" style="font-size:12px; padding:5px 16px; border-radius:3px; font-weight:600;">
                Niêm Yết Cho Thuê
              </button>
            </div>
          ` : `
            <div style="font-size:11px; color:var(--text-dim); font-style:italic;">
              Chỉ chủ nhân Động Phủ mới có quyền niêm yết phòng cho thuê.
            </div>
          `}
        </div>

        <!-- AVAILABLE RENTALS MARKET -->
        <div class="panel" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:16px 20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <h3 style="font-size:14px; font-weight:700; color:var(--text-bright); margin:0;">
              Thị Trường Cho Thuê Phòng Tu Luyện (${rentals.length} Gian Khả Dụng)
            </h3>
            <button class="btn btn--dark btn--sm" id="btnRefreshRentals" style="font-size:11px; padding:3px 10px; border-radius:3px;">
              Làm Mới
            </button>
          </div>

          ${rentals.length === 0 ? `
            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:24px; text-align:center; color:var(--text-dim); font-size:12px;">
              Hiện chưa có đạo hữu nào niêm yết phòng tu luyện trên phường thị.
            </div>
          ` : `
            <div style="overflow-x:auto;">
              <table style="width:100%; border-collapse:collapse; font-size:11px; text-align:left;">
                <thead>
                  <tr style="border-bottom:1px solid var(--border); color:var(--text-dim);">
                    <th style="padding:8px;">Chủ Phủ</th>
                    <th style="padding:8px;">Cảnh Giới Động Phủ</th>
                    <th style="padding:8px;">Gia Tăng Khí Huyết</th>
                    <th style="padding:8px;">Tỷ Lệ Đột Phá</th>
                    <th style="padding:8px;">Giá Thuê / Ngày</th>
                    <th style="padding:8px; text-align:right;">Thao Tác</th>
                  </tr>
                </thead>
                <tbody>
                  ${rentals.map(r => {
                    const isOwnListing = r.owner_id === player.id
                    const canAfford = gold >= r.daily_fee
                    const canRent = !isOwned && !isRenting && !isOwnListing && canAfford

                    return `
                      <tr style="border-bottom:1px solid rgba(255,255,255,0.03);">
                        <td style="padding:8px; font-weight:600; color:var(--text-bright);">
                          ${r.owner_name} <span style="font-size:10px; color:var(--text-dim);">(Cấp ${r.owner_level})</span>
                          ${isOwnListing ? '<span class="badge" style="background:rgba(83,123,180,0.15); color:var(--blue); font-size:9px; padding:1px 4px; border-radius:2px; margin-left:4px;">CỦA BẠN</span>' : ''}
                        </td>
                        <td style="padding:8px;">
                          <span class="badge" style="background:var(--bg-main); border:1px solid var(--border); font-size:10px; padding:1px 6px; border-radius:2px;">
                            ${r.tierName} (T${r.abode_tier})
                          </span>
                        </td>
                        <td style="padding:8px; color:var(--green); font-weight:600;">+${r.hpRegen} HP/10s</td>
                        <td style="padding:8px; color:var(--gold); font-weight:600;">+${r.breakthroughBonus}%</td>
                        <td style="padding:8px; font-weight:700; color:var(--gold);">${formatNumber(r.daily_fee)} Linh Thạch</td>
                        <td style="padding:8px; text-align:right;">
                          ${isOwnListing ? `
                            <button class="btn btn--dark btn--sm" disabled style="font-size:10px; padding:3px 8px; border-radius:2px;">
                              Phòng Của Bạn
                            </button>
                          ` : isOwned ? `
                            <button class="btn btn--dark btn--sm" disabled title="Đã có Động Phủ riêng" style="font-size:10px; padding:3px 8px; border-radius:2px;">
                              Đã Có Phủ
                            </button>
                          ` : isRenting ? `
                            <button class="btn btn--dark btn--sm" disabled title="Đang thuê phòng khác" style="font-size:10px; padding:3px 8px; border-radius:2px;">
                              Đang Thuê
                            </button>
                          ` : `
                            <button class="btn btn-rent-room ${canAfford ? 'btn--gold' : 'btn--dark'} btn--sm" data-rental-id="${r.id}" ${canRent ? '' : 'disabled'} style="font-size:10px; padding:3px 10px; border-radius:2px; font-weight:600;">
                              ${canAfford ? 'Thuê Phòng' : 'Thiếu Tiền'}
                            </button>
                          `}
                        </td>
                      </tr>
                    `
                  }).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>
      </div>
    `
  }

  bindEvents() {
    this.on('input', '#inputRentalFee', (e, target) => {
      this.setState({ dailyFeeInput: parseInt(target.value, 10) || 100 })
    })

    this.on('click', '#btnListRental', () => {
      const fee = this.state.dailyFeeInput
      if (this.props.onListRental) {
        this.props.onListRental(fee)
      }
    })

    this.on('click', '#btnRefreshRentals', () => {
      if (this.props.onRefreshRentals) {
        this.props.onRefreshRentals()
      }
    })

    this.on('click', '.btn-rent-room', (e, target) => {
      const rentalId = parseInt(target.dataset.rentalId, 10)
      if (rentalId && this.props.onRentRoom) {
        this.props.onRentRoom(rentalId)
      }
    })
  }
}
