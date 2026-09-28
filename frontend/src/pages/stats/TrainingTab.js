import { Component } from '../../core/Component.js'
import { STAT_CONFIG, formatNumber } from './constants.js'

/**
 * TrainingTab: High-density attribute training (Gym) with quick multipliers and combat stats.
 * Conforms to Anti-AI-Slop & Torn City High-Density Standards.
 */
export class TrainingTab extends Component {
  initialState() {
    return {
      trainCounts: {
        strength: 1,
        speed: 1,
        dexterity: 1,
        defense: 1,
      },
      trainingStat: null,
    }
  }

  template() {
    const { player = {} } = this.props
    const s = player.stats || {}
    const a = player.allocatedStats || {}
    const td = player.talentDisplay || {}
    const curStamina = player.currentStamina ?? 100
    const maxStamina = player.maxStamina ?? 100
    const staminaCost = 5
    const maxTrain = Math.max(0, Math.floor(curStamina / staminaCost))
    const isWounded = player.hospitalRemaining > 0
    const canTrain = curStamina >= staminaCost && !isWounded

    return `
      <div class="training-tab" style="display:flex; flex-direction:column; gap:16px;">
        <!-- STAMINA & TRAINING HUD -->
        <div class="panel" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:14px 18px;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
            <div>
              <div style="display:flex; align-items:center; gap:8px;">
                <h3 style="font-size:14px; font-weight:700; color:var(--text-bright); margin:0;">
                  Thể Phách & Thể Lực Rèn Luyện
                </h3>
                <span class="badge" style="background:rgba(83,123,180,0.15); border:1px solid var(--blue); color:var(--blue); font-size:10px; font-weight:700; padding:1px 6px; border-radius:2px;">
                  ${maxTrain} Lượt Khả Dụng
                </span>
              </div>
              <div style="font-size:11px; color:var(--text-dim); margin-top:2px;">
                Tiêu hao <strong style="color:var(--text-bright);">${staminaCost} Thể Lực</strong> cho mỗi lượt rèn luyện. Tốc độ hồi phục: <strong style="color:var(--green);">+${s.staminaRegen ?? 2}/10s</strong>.
              </div>
            </div>

            <div style="display:flex; align-items:center; gap:12px;">
              <div style="text-align:right;">
                <div style="font-size:10px; color:var(--text-dim); text-transform:uppercase;">Thể Lực Hiện Tại</div>
                <div style="font-size:15px; font-weight:700; color:${canTrain ? 'var(--cyan)' : 'var(--red)'};">
                  ${curStamina} / ${maxStamina}
                </div>
              </div>
              <!-- STAMINA PROGRESS BAR -->
              <div style="width:100px; height:6px; background:var(--bg-main); border:1px solid var(--border); border-radius:2px; overflow:hidden;">
                <div style="background:var(--cyan); height:100%; width:${Math.min(100, Math.round((curStamina / Math.max(1, maxStamina)) * 100))}%;"></div>
              </div>
            </div>
          </div>
        </div>

        ${isWounded ? `
          <div class="panel" style="background:rgba(184,74,74,0.1); border:1px solid var(--red); border-radius:4px; padding:10px 14px; text-align:center; color:var(--red); font-size:12px;">
            Đang trọng thương tịnh dưỡng. Còn ${player.hospitalRemaining}s nữa mới có thể tiếp tục rèn luyện.
          </div>
        ` : ''}

        <!-- 4 ATTRIBUTES TRAINING CARDS -->
        <div class="attributes-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:12px;">
          ${STAT_CONFIG.map(cfg => {
            const key = cfg.key
            const val = s[key] ?? 0
            const allocated = a[key] ?? 0
            const talent = td[key] || { value: 1.0, name: 'Phàm Cốt', color: '#94a3b8' }
            const currentCount = this.state.trainCounts[key] || 1
            const effectiveCount = Math.min(Math.max(1, currentCount), Math.max(1, maxTrain))
            const staminaRequired = effectiveCount * staminaCost
            const hasEnough = curStamina >= staminaRequired
            const isTrainingThis = this.state.trainingStat === key

            return `
              <div class="panel stat-card" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:14px; display:flex; flex-direction:column; justify-content:space-between; gap:12px;">
                <div>
                  <!-- HEADER -->
                  <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                    <div>
                      <div style="display:flex; align-items:center; gap:6px;">
                        <span style="font-size:14px; font-weight:700; color:var(--text-bright);">${cfg.name}</span>
                        <span style="font-size:10px; color:var(--text-dim); font-weight:600;">[${cfg.abbr}]</span>
                        <span class="badge" style="background:rgba(255,255,255,0.03); border:1px solid ${talent.color}44; color:${talent.color}; font-size:10px; padding:1px 5px; border-radius:2px;">
                          ${talent.name} (×${talent.value})
                        </span>
                      </div>
                      <div style="font-size:11px; color:var(--text-dim); margin-top:2px;">
                        ${cfg.desc}
                      </div>
                    </div>
                  </div>

                  <!-- VALUE DISPLAY -->
                  <div style="display:flex; align-items:baseline; gap:8px; margin-top:10px;">
                    <div style="font-size:22px; font-weight:800; color:var(--text-bright); font-family:monospace;">
                      ${formatNumber(val)}
                    </div>
                    ${allocated > 0 ? `
                      <span style="font-size:11px; color:var(--green); font-weight:600;">
                        (+${formatNumber(allocated)})
                      </span>
                    ` : ''}
                  </div>
                </div>

                <!-- QUICK MULTIPLIERS & ACTION -->
                <div style="border-top:1px solid var(--border); padding-top:10px;">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                    <div style="font-size:11px; color:var(--text-dim);">
                      Số lượt rèn: <strong style="color:var(--text-bright);">${effectiveCount}</strong> (${staminaRequired} Thể lực)
                    </div>
                    <div style="display:flex; gap:3px;">
                      <button class="btn btn--dark btn--xs btn-quick-count" data-stat="${key}" data-count="1" style="font-size:10px; padding:2px 6px; border-radius:2px;">1</button>
                      <button class="btn btn--dark btn--xs btn-quick-count" data-stat="${key}" data-count="5" style="font-size:10px; padding:2px 6px; border-radius:2px;">5</button>
                      <button class="btn btn--dark btn--xs btn-quick-count" data-stat="${key}" data-count="10" style="font-size:10px; padding:2px 6px; border-radius:2px;">10</button>
                      <button class="btn btn--dark btn--xs btn-quick-count" data-stat="${key}" data-count="${maxTrain}" style="font-size:10px; padding:2px 6px; border-radius:2px;">Tối Đa</button>
                    </div>
                  </div>

                  <div style="display:flex; gap:6px;">
                    <input type="number" class="input-train-count" data-stat="${key}" min="1" max="${Math.max(1, maxTrain)}" value="${effectiveCount}" style="width:65px; background:var(--bg-main); border:1px solid var(--border); color:var(--text-bright); border-radius:3px; padding:4px 6px; font-size:11px; text-align:center;" ${canTrain ? '' : 'disabled'} />
                    <button class="btn btn-train ${canTrain && hasEnough ? 'btn--blue' : 'btn--dark'}" data-stat="${key}" ${canTrain && hasEnough && !isTrainingThis ? '' : 'disabled'} style="flex:1; font-size:11px; padding:5px 12px; border-radius:3px; font-weight:600;">
                      ${isTrainingThis ? 'Đang Luyện...' : `Rèn Luyện ${cfg.name}`}
                    </button>
                  </div>
                </div>
              </div>
            `
          }).join('')}
        </div>

        <!-- DERIVED COMBAT ATTRIBUTES HUD -->
        <div class="panel" style="background:var(--bg-panel); border:1px solid var(--border); border-radius:4px; padding:12px 16px;">
          <div style="font-size:11px; font-weight:700; color:var(--text-dim); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:10px;">
            Chỉ Số Chiến Đấu Phái Sinh
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:8px;">
            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:8px 10px;">
              <div style="font-size:10px; color:var(--text-dim);">Khí Huyết Tối Đa</div>
              <div style="font-size:13px; font-weight:700; color:var(--green); margin-top:2px;">${formatNumber(s.maxHp ?? 100)} HP</div>
            </div>
            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:8px 10px;">
              <div style="font-size:10px; color:var(--text-dim);">Linh Lực Tối Đa</div>
              <div style="font-size:13px; font-weight:700; color:var(--blue); margin-top:2px;">${formatNumber(s.maxEnergy ?? 50)} MP</div>
            </div>
            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:8px 10px;">
              <div style="font-size:10px; color:var(--text-dim);">Hồi Linh Lực</div>
              <div style="font-size:13px; font-weight:700; color:var(--blue); margin-top:2px;">+${s.energyRegen ?? 5} / lượt</div>
            </div>
            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:8px 10px;">
              <div style="font-size:10px; color:var(--text-dim);">Tỷ Lệ Chí Mạng</div>
              <div style="font-size:13px; font-weight:700; color:var(--gold); margin-top:2px;">${s.critChance ?? 5}%</div>
            </div>
            <div style="background:var(--bg-main); border:1px solid var(--border); border-radius:3px; padding:8px 10px;">
              <div style="font-size:10px; color:var(--text-dim);">Sát Thương Chí Mạng</div>
              <div style="font-size:13px; font-weight:700; color:var(--gold); margin-top:2px;">×${s.critMultiplier ?? 1.5}</div>
            </div>
          </div>
        </div>
      </div>
    `
  }

  bindEvents() {
    // Quick count buttons
    this.on('click', '.btn-quick-count', (e, target) => {
      const stat = target.dataset.stat
      const count = parseInt(target.dataset.count, 10) || 1
      const current = { ...this.state.trainCounts }
      current[stat] = count
      this.setState({ trainCounts: current })
    })

    // Input change
    this.on('input', '.input-train-count', (e, target) => {
      const stat = target.dataset.stat
      const count = parseInt(target.value, 10) || 1
      const current = { ...this.state.trainCounts }
      current[stat] = count
      this.setState({ trainCounts: current })
    })

    // Train button
    this.on('click', '.btn-train', async (e, target) => {
      const stat = target.dataset.stat
      const count = this.state.trainCounts[stat] || 1
      if (this.props.onTrain) {
        this.setState({ trainingStat: stat })
        try {
          await this.props.onTrain(stat, count)
        } finally {
          this.setState({ trainingStat: null })
        }
      }
    })
  }
}
