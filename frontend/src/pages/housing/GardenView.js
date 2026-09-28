import { Component } from '../../core/Component.js'
import { HERB_DEFS, formatDuration } from './constants.js'

/**
 * GardenView: Interactive herbal plots with real-time countdown, seeding and harvesting.
 * Adheres strictly to Anti-AI-Slop & High-Density Torn UI Standards.
 */
export class GardenView extends Component {
  initialState() {
    return {
      selectedSeeds: {}, // map of slotIndex -> herbId
    }
  }

  template() {
    const { housingData = {} } = this.props
    const d = housingData
    const isOwned = !!d.owned
    const maxSlots = d.maxSlots || 1
    const gardenSlots = d.gardenSlots || []
    const herbs = d.gardenHerbs || HERB_DEFS

    if (!isOwned) {
      return `
        <div class="panel" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:24px; text-align:center;">
          <h3 style="font-size:15px; font-weight:700; color:var(--text-bright); margin-bottom:6px;">Dược Viên Chưa Mở Khóa</h3>
          <p style="font-size:12px; color:var(--text-dim); margin-bottom:16px;">Đạo hữu cần khởi tạo Động Phủ trước để sở hữu khoảnh linh điền gieo trồng dược thảo.</p>
        </div>
      `
    }

    // Count ready slots
    const readyCount = gardenSlots.filter(s => s && s.ready).length

    return `
      <div class="garden-view" style="display:flex; flex-direction:column; gap:16px;">
        <!-- ACTION BAR -->
        <div class="panel" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:12px 16px;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
            <div>
              <h3 style="font-size:14px; font-weight:700; color:var(--text-bright); margin:0;">
                Linh Điền Dược Viên (${maxSlots} Khoảnh Đất)
              </h3>
              <div style="font-size:11px; color:var(--text-dim); margin-top:2px;">
                Dược thảo tự động sinh trưởng và được chuyển trực tiếp vào Càn Khôn Túi khi thu hoạch.
              </div>
            </div>

            <div style="display:flex; align-items:center; gap:8px;">
              <button class="btn ${readyCount > 0 ? 'btn--green' : 'btn--dark'}" id="btnHarvestAll" ${readyCount > 0 ? '' : 'disabled'} style="font-size:12px; padding:5px 14px; border-radius:3px;">
                Thu Hoạch Tất Cả ${readyCount > 0 ? `(${readyCount})` : ''}
              </button>
            </div>
          </div>
        </div>

        <!-- PLOTS GRID -->
        <div class="plots-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:10px;">
          ${Array.from({ length: maxSlots }, (_, i) => {
            const slot = gardenSlots.find(s => s && s.slotIndex === i) || null
            return this.renderSlot(i, slot, herbs)
          }).join('')}
        </div>

        <!-- HERBS REFERENCE TABLE -->
        <div class="panel" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:12px 16px;">
          <div style="font-size:12px; font-weight:700; color:var(--text-bright); margin-bottom:8px; text-transform:uppercase; letter-spacing:0.5px;">
            Danh Mục Thảo Mộc Khả Dụng
          </div>
          <div style="overflow-x:auto;">
            <table style="width:100%; border-collapse:collapse; font-size:11px; text-align:left;">
              <thead>
                <tr style="border-bottom:1px solid var(--border); color:var(--text-dim);">
                  <th style="padding:6px 8px;">Thảo Mộc</th>
                  <th style="padding:6px 8px;">Phẩm Cấp</th>
                  <th style="padding:6px 8px;">Thời Gian</th>
                  <th style="padding:6px 8px;">Sản Lượng</th>
                  <th style="padding:6px 8px;">Đặc Tính Luyện Đan</th>
                </tr>
              </thead>
              <tbody>
                ${Object.values(herbs).map(h => `
                  <tr style="border-bottom:1px solid rgba(255,255,255,0.03);">
                    <td style="padding:6px 8px; font-weight:600; color:var(--text-bright);">${h.name}</td>
                    <td style="padding:6px 8px;"><span class="badge" style="background:var(--bg-main); border:1px solid var(--border); font-size:10px; padding:1px 5px; border-radius:2px;">Cấp ${h.tier}</span></td>
                    <td style="padding:6px 8px; color:var(--text-dim);">${formatDuration(h.growthTime)}</td>
                    <td style="padding:6px 8px; color:var(--gold);">${h.qty ? `${h.qty[0]} - ${h.qty[1]}` : '1 - 3'}</td>
                    <td style="padding:6px 8px; color:var(--text-dim);">${h.description}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `
  }

  renderSlot(index, slot, herbs) {
    if (!slot || !slot.herb) {
      // Empty plot
      const selectedSeed = this.state.selectedSeeds[index] || ''
      return `
        <div class="garden-slot empty-slot" data-slot="${index}" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:12px; display:flex; flex-direction:column; justify-content:space-between; min-height:130px;">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <span style="font-size:11px; font-weight:700; color:var(--text-bright);">Khoảnh #${index + 1}</span>
              <span class="badge" style="background:rgba(255,255,255,0.04); border:1px solid var(--border); color:var(--text-dim); font-size:9px; padding:1px 5px; border-radius:2px;">
                BỎ TRỐNG
              </span>
            </div>
            <div style="font-size:11px; color:var(--text-dim); margin-bottom:8px;">
              Linh điền đang màu mỡ, sẵn sàng tiếp nhận hạt giống.
            </div>
          </div>

          <div style="display:flex; flex-direction:column; gap:6px;">
            <select class="seed-select" data-slot="${index}" style="width:100%; background:var(--bg-main); color:var(--text); border:1px solid var(--border); border-radius:3px; padding:4px 6px; font-size:11px;">
              <option value="">-- Chọn Hạt Giống --</option>
              ${Object.values(herbs).map(h => `
                <option value="${h.id}" ${selectedSeed === h.id ? 'selected' : ''}>
                  ${h.name} (T${h.tier} · ${formatDuration(h.growthTime)})
                </option>
              `).join('')}
            </select>
            <button class="btn btn--blue btn-plant" data-slot="${index}" ${selectedSeed ? '' : 'disabled'} style="font-size:11px; padding:4px 8px; border-radius:3px; width:100%;">
              Gieo Giống
            </button>
          </div>
        </div>
      `
    }

    const isReady = !!slot.ready
    const remSec = Math.max(0, slot.remainingSeconds || 0)
    const pct = Math.min(100, Math.max(0, slot.progressPercent || 0))
    const herbName = slot.herbName || slot.herb

    return `
      <div class="garden-slot active-slot ${isReady ? 'ready-slot' : ''}" data-slot="${index}" data-remaining="${remSec}" data-total="${slot.growthTime || 180}" style="background:var(--bg-panel); border:1px solid ${isReady ? 'var(--green)' : 'var(--border)'}; border-radius:4px; padding:12px; display:flex; flex-direction:column; justify-content:space-between; min-height:130px;">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <span style="font-size:11px; font-weight:700; color:var(--text-bright);">Khoảnh #${index + 1}</span>
            <span class="badge" style="background:${isReady ? 'rgba(79,140,98,0.15)' : 'rgba(83,123,180,0.15)'}; border:1px solid ${isReady ? 'var(--green)' : 'var(--blue)'}; color:${isReady ? 'var(--green)' : 'var(--blue)'}; font-size:9px; padding:1px 5px; border-radius:2px;">
              ${isReady ? 'SẴN SÀNG' : 'ĐANG SINH TRƯỞNG'}
            </span>
          </div>

          <div style="font-size:13px; font-weight:700; color:var(--text-bright); margin-bottom:2px;">
            ${herbName}
          </div>
          <div style="font-size:10px; color:var(--text-dim); margin-bottom:8px;">
            Phẩm cấp: Cấp ${slot.tier || 1}
          </div>
        </div>

        <div>
          <!-- PROGRESS BAR -->
          <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:2px; height:5px; overflow:hidden; margin-bottom:6px;">
            <div class="garden-progress-fill" style="background:${isReady ? 'var(--green)' : 'var(--blue)'}; height:100%; width:${pct}%; transition:width 0.5s ease;"></div>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; font-size:10px; color:var(--text-dim); margin-bottom:8px;">
            <span class="garden-countdown">${isReady ? 'Đã chín mùi' : `${formatDuration(remSec)} còn lại`}</span>
            <span>${pct}%</span>
          </div>

          ${isReady ? `
            <button class="btn btn--green btn-harvest" data-slot="${index}" style="font-size:11px; padding:4px 8px; border-radius:3px; width:100%; font-weight:600;">
              Thu Hoạch
            </button>
          ` : `
            <button class="btn btn--dark" disabled style="font-size:11px; padding:4px 8px; border-radius:3px; width:100%; opacity:0.6;">
              Chờ Thu Hoạch
            </button>
          `}
        </div>
      </div>
    `
  }

  onMounted() {
    this.startCountdownLoop()
  }

  onUpdated() {
    this.startCountdownLoop()
  }

  startCountdownLoop() {
    // Clean prior intervals automatically handled by Component.setInterval
    this.setInterval(() => {
      this.tickCountdowns()
    }, 1000)
  }

  tickCountdowns() {
    if (!this.container) return
    const activePlots = this.container.querySelectorAll('.active-slot')
    let needsFullRefresh = false

    activePlots.forEach(plot => {
      let rem = parseInt(plot.dataset.remaining || '0', 10)
      const total = parseInt(plot.dataset.total || '1', 10)
      if (rem > 0) {
        rem -= 1
        plot.dataset.remaining = String(rem)
        const pct = Math.min(100, Math.round(((total - rem) / Math.max(1, total)) * 100))

        const countEl = plot.querySelector('.garden-countdown')
        if (countEl) countEl.textContent = `${formatDuration(rem)} còn lại`

        const fillEl = plot.querySelector('.garden-progress-fill')
        if (fillEl) fillEl.style.width = `${pct}%`

        if (rem === 0) {
          needsFullRefresh = true
        }
      }
    })

    if (needsFullRefresh && this.props.onTimeElapsed) {
      this.props.onTimeElapsed()
    }
  }

  bindEvents() {
    // Seed selection change
    this.on('change', '.seed-select', (e, target) => {
      const slot = parseInt(target.dataset.slot, 10)
      const val = target.value
      const current = { ...this.state.selectedSeeds }
      current[slot] = val
      this.setState({ selectedSeeds: current })
    })

    // Plant button
    this.on('click', '.btn-plant', (e, target) => {
      const slot = parseInt(target.dataset.slot, 10)
      const herbId = this.state.selectedSeeds[slot]
      if (herbId && this.props.onPlant) {
        this.props.onPlant(slot, herbId)
      }
    })

    // Single slot harvest
    this.on('click', '.btn-harvest', (e, target) => {
      const slot = parseInt(target.dataset.slot, 10)
      if (this.props.onHarvest) {
        this.props.onHarvest(slot)
      }
    })

    // Batch harvest
    this.on('click', '#btnHarvestAll', () => {
      if (this.props.onHarvestAll) {
        this.props.onHarvestAll()
      }
    })
  }
}
