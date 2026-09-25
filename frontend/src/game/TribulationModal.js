/**
 * Heavenly Tribulation Survival Visualizer (Đột Phá Lôi Kiếp)
 * Implements interactive pre-tribulation assessment & multi-wave lightning trial simulation.
 */

export async function openTribulationModal(ctx) {
  const { state, api, notify, updateSidebar, renderGame } = ctx
  const player = state.player
  if (!player) return

  // Create overlay container
  let overlay = document.getElementById('tribulation-modal-overlay')
  if (!overlay) {
    overlay = document.createElement('div')
    overlay.id = 'tribulation-modal-overlay'
    overlay.style.cssText = `
      position: fixed; inset: 0; background: rgba(0, 0, 0, 0.88);
      backdrop-filter: blur(10px); z-index: 10000;
      display: flex; align-items: center; justify-content: center;
      padding: 16px; animation: fadeIn 0.25s ease;
    `
    document.body.appendChild(overlay)
  }

  overlay.innerHTML = `
    <div style="background: #121420; border: 2px solid #eab308; border-radius: 14px; max-width: 580px; width: 100%; box-shadow: 0 10px 40px rgba(0,0,0,0.9), 0 0 30px rgba(234, 179, 8, 0.2); padding: 24px; text-align: center; color: #fff;">
      <div style="font-size: 32px; animation: pulse 1.5s infinite;">⚡</div>
      <div style="font-size: 16px; font-weight: 700; color: #eab308; margin-top: 8px;">Đang dò xét Thiên Khí & Thăm Dò Thiên Kiếp...</div>
    </div>
  `

  try {
    const preview = await api.getTribulationPreview(player.id)
    renderPreview(overlay, preview, ctx)
  } catch (e) {
    overlay.remove()
    notify(e.message || 'Không thể tra cứu thông tin Lôi Kiếp', 'error')
  }
}

function renderPreview(overlay, preview, ctx) {
  const { state, api, notify, updateSidebar, renderGame } = ctx
  const tri = preview.tribulation || {}
  const stats = preview.playerStats || {}
  const color = tri.color || '#eab308'

  overlay.innerHTML = `
    <div style="background: #111422; border: 2px solid ${color}; border-radius: 14px; max-width: 600px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 12px 50px rgba(0,0,0,0.95), 0 0 35px ${color}44; color: #fff; animation: scaleUp 0.25s ease;">
      <!-- HEADER -->
      <div style="padding: 20px 24px; border-bottom: 1px solid rgba(255,255,255,0.08); background: linear-gradient(135deg, ${color}22, rgba(0,0,0,0.6)); text-align: center; position: relative;">
        <span style="position: absolute; top: 16px; right: 20px; font-size: 20px; cursor: pointer; color: var(--text-dim);" id="btn-close-tribulation">✕</span>
        <div style="font-size: 28px; line-height: 1;">🌩️</div>
        <div style="font-size: 20px; font-weight: 800; color: ${color}; margin-top: 6px; letter-spacing: 0.5px;">
          ${tri.name || 'Thiên Lôi Giáng Trần'}
        </div>
        <div style="font-size: 12px; color: var(--text-dim); margin-top: 4px; font-style: italic;">
          "${tri.lore || 'Thiên đạo khảo nghiệm, chín chết một sống, tắm mình trong lôi điện để tẩy thoát phàm thai.'}"
        </div>
      </div>

      <div style="padding: 20px 24px;">
        <!-- TRIBULATION SPECS -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 18px; text-align: center;">
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 10px;">
            <div style="font-size: 11px; color: var(--text-dim);">Số Đợt Sét</div>
            <div style="font-size: 18px; font-weight: 800; color: ${color}; margin-top: 2px;">${tri.waves || 3} Đợt</div>
          </div>
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 10px;">
            <div style="font-size: 11px; color: var(--text-dim);">Uy Lực Khởi Đầu</div>
            <div style="font-size: 18px; font-weight: 800; color: #ef4444; margin-top: 2px;">~${tri.baseDamage || 150} ST</div>
          </div>
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 10px;">
            <div style="font-size: 11px; color: var(--text-dim);">Gia Tăng Uy Lực</div>
            <div style="font-size: 18px; font-weight: 800; color: #f59e0b; margin-top: 2px;">+${Math.round(((tri.scaling || 1.3) - 1) * 100)}%/đợt</div>
          </div>
        </div>

        <!-- DEFENSIVE ASSESSMENT -->
        <div style="background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 14px; margin-bottom: 18px;">
          <div style="font-size: 13px; font-weight: 700; color: var(--gold); margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
            <span>🛡️ Khả Năng Sinh Tồn & Phòng Hộ Bản Thân</span>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 12px;">
            <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
              <span class="text-dim">❤️ Khí Huyết:</span>
              <span style="font-weight: 700; color: #10b981;">${stats.currentHp}/${stats.maxHp} HP</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
              <span class="text-dim">🔵 Chân Khí Hộ Thể:</span>
              <span style="font-weight: 700; color: #38bdf8;">${stats.usableEnergy} LL (1 LL = 2.5 HP)</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
              <span class="text-dim">🛡️ Giáp Giảm Thương:</span>
              <span style="font-weight: 700; color: #60a5fa;">-${stats.defenseMitigationPct || 0}% ST cơ thể</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
              <span class="text-dim">💨 Thân Pháp Chẻ Sét:</span>
              <span style="font-weight: 700; color: #a78bfa;">${stats.dodgeChancePct || 0}% né (-40% ST)</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 4px 0;">
              <span class="text-dim">🌟 Hộ Thể Kim Chung:</span>
              <span style="font-weight: 700; color: ${stats.hasGoldenBell ? '#10b981' : 'var(--text-dim)'};">
                ${stats.hasGoldenBell ? '✅ Giảm thêm 20% Lôi Kiếp' : '❌ Chưa kích hoạt'}
              </span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 4px 0;">
              <span class="text-dim">💊 Đan Dược Cứu Mạng:</span>
              <span style="font-weight: 700; color: #f59e0b;">Tự động dùng khi HP < 20%</span>
            </div>
          </div>
        </div>

        <div style="font-size: 11px; color: var(--text-dim); text-align: center; margin-bottom: 18px; line-height: 1.5;">
          ⚠️ <b>Cảnh báo:</b> Đột phá thất bại trước lôi kiếp sẽ tổn hại đan điền, rơi vào trạng thái trọng thương tịnh dưỡng 90 giây và tiêu hao một phần tài nguyên đột phá. Hãy đảm bảo đầy Máu & Linh Lực trước khi dẫn thiên lôi!
        </div>

        <!-- ACTIONS -->
        <div style="display: flex; gap: 12px; justify-content: center;">
          <button class="btn btn--outline" id="btn-cancel-tribulation" style="min-width: 120px;">
            Tạm Hoãn
          </button>
          <button class="btn btn--gold btn--lg shadow-glow" id="btn-start-tribulation" style="min-width: 220px; font-weight: 800; font-size: 15px; animation: pulse 2s infinite;">
            ⚡ DẪN LÔI ĐỘ KIẾP!
          </button>
        </div>
      </div>
    </div>
  `

  overlay.querySelector('#btn-close-tribulation')?.addEventListener('click', () => overlay.remove())
  overlay.querySelector('#btn-cancel-tribulation')?.addEventListener('click', () => overlay.remove())

  overlay.querySelector('#btn-start-tribulation')?.addEventListener('click', async () => {
    await runTribulationExperience(overlay, ctx, tri)
  })
}

async function runTribulationExperience(overlay, ctx, triConfig) {
  const { state, api, notify, updateSidebar, renderGame } = ctx
  const color = triConfig.color || '#eab308'

  // Show battle arena in modal
  overlay.innerHTML = `
    <div style="background: #0d0f1a; border: 2px solid ${color}; border-radius: 14px; max-width: 620px; width: 100%; max-height: 92vh; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 15px 60px rgba(0,0,0,0.98), 0 0 45px ${color}66; color: #fff;">
      <!-- ARENA TOP -->
      <div style="padding: 16px 20px; background: linear-gradient(180deg, ${color}22, rgba(0,0,0,0.8)); border-bottom: 1px solid rgba(255,255,255,0.1); text-align: center; position: relative;" id="tribulation-arena-header">
        <div style="font-size: 14px; font-weight: 700; color: ${color}; letter-spacing: 1px;">
          ⚡ ${triConfig.name || 'THIÊN LÔI GIÁNG TRẦN'}
        </div>
        <div style="font-size: 12px; color: var(--text-dim); margin-top: 2px;" id="tribulation-wave-indicator">
          Đang ngưng tụ lôi vân...
        </div>

        <!-- DYNAMIC BARS -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px;">
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
              <span>❤️ Khí Huyết</span>
              <span id="tri-hp-val">...</span>
            </div>
            <div class="bar-track" style="height: 10px; background: rgba(0,0,0,0.6); border-radius: 5px; overflow: hidden;">
              <div class="bar-fill hp" id="tri-hp-bar" style="width: 100%; transition: width 0.5s ease;"></div>
            </div>
          </div>
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
              <span>🔵 Chân Khí</span>
              <span id="tri-energy-val">...</span>
            </div>
            <div class="bar-track" style="height: 10px; background: rgba(0,0,0,0.6); border-radius: 5px; overflow: hidden;">
              <div class="bar-fill energy" id="tri-energy-bar" style="width: 100%; transition: width 0.5s ease;"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- LOG STREAM -->
      <div id="tribulation-log-stream" style="flex: 1; min-height: 260px; max-height: 380px; overflow-y: auto; padding: 16px 20px; font-family: monospace; font-size: 13px; line-height: 1.6; background: rgba(0,0,0,0.4); display: flex; flex-direction: column; gap: 8px;">
        <div style="color: #94a3b8; text-align: center; font-style: italic;">
          Vòm trời cuồn cuộn mây đen... Lôi đình chực chờ xé toạc hư không!
        </div>
      </div>

      <!-- FOOTER ACTION -->
      <div style="padding: 16px 20px; border-top: 1px solid rgba(255,255,255,0.08); background: rgba(0,0,0,0.6); text-align: center;" id="tribulation-footer">
        <span style="font-size: 12px; color: var(--text-dim); animation: pulse 1.5s infinite;">
          ⚡ Đang chống đỡ Thiên Kiếp giáng hạ...
        </span>
      </div>
    </div>
  `

  const logStream = overlay.querySelector('#tribulation-log-stream')
  const waveIndicator = overlay.querySelector('#tribulation-wave-indicator')
  const hpBar = overlay.querySelector('#tri-hp-bar')
  const energyBar = overlay.querySelector('#tri-energy-bar')
  const hpVal = overlay.querySelector('#tri-hp-val')
  const energyVal = overlay.querySelector('#tri-energy-val')
  const footer = overlay.querySelector('#tribulation-footer')

  try {
    const res = await api.attemptBreakthrough(state.playerId)
    const tri = res.tribulation

    if (!tri || !tri.logs) {
      // Direct success without tribulation (e.g. minor sub-stage or simple unlock)
      if (res.player) state.player = res.player
      notify(res.message, res.success ? 'success' : 'error')
      if (typeof updateSidebar === 'function') updateSidebar()
      overlay.remove()
      renderGame()
      return
    }

    // Initialize bars
    let maxHp = res.player?.maxHp || tri.startingHp
    let currentHp = tri.startingHp
    let currentEnergy = tri.startingEnergy
    let maxEnergy = res.player?.maxEnergy || Math.max(50, tri.startingEnergy)

    hpVal.textContent = `${currentHp}/${maxHp}`
    energyVal.textContent = `${currentEnergy}`

    // Sequentially replay each wave with dramatic delay
    const logs = tri.logs || []
    for (let i = 0; i < logs.length; i++) {
      const log = logs[i]
      await new Promise(r => setTimeout(r, 900))

      // Update wave indicator
      waveIndicator.textContent = `ĐỢT ${log.wave}/${tri.totalWaves} ĐANG GIÁNG XUỐNG!`
      waveIndicator.style.color = '#ef4444'

      // Flash effect on screen
      overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
      setTimeout(() => { overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.88)' }, 80)

      // Add log message
      const logDiv = document.createElement('div')
      logDiv.style.cssText = `
        padding: 8px 12px; border-radius: 6px;
        background: ${log.defeated ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.05)'};
        border-left: 3px solid ${log.defeated ? '#ef4444' : log.dodged ? '#a78bfa' : color};
        animation: fadeIn 0.3s ease;
      `
      logDiv.innerHTML = `
        <div style="font-weight: 700; color: ${color}; margin-bottom: 2px;">
          ⚡ Đợt ${log.wave}/${tri.totalWaves}: Sét Uy Lực ${log.rawDamage} ST
        </div>
        <div style="color: #e2e8f0; font-size: 12px;">${log.text}</div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 4px; font-size: 11px;">
          ${log.dodged ? '<span style="color: #a78bfa;">💨 Chẻ sét né tránh</span>' : ''}
          ${log.auraMitigated ? '<span style="color: #10b981;">🛡️ Kim Chung hóa giải</span>' : ''}
          ${log.absorbedByQi > 0 ? `<span style="color: #38bdf8;">🔵 Chân khí hấp thụ: ${log.absorbedByQi} ST</span>` : ''}
          <span style="color: #f87171;">💥 Thương tổn: -${log.actualHpDamage} HP</span>
          ${log.medicineRescued ? '<span style="color: #f59e0b; font-weight:700;">💊 Dùng đan dược cứu mệnh!</span>' : ''}
        </div>
      `
      logStream.appendChild(logDiv)
      logStream.scrollTop = logStream.scrollHeight

      // Update bars smoothly
      currentHp = log.hpRemaining
      currentEnergy = log.energyRemaining
      const hpPct = Math.max(0, Math.min(100, Math.round((currentHp / maxHp) * 100)))
      const enPct = Math.max(0, Math.min(100, Math.round((currentEnergy / maxEnergy) * 100)))

      hpBar.style.width = `${hpPct}%`
      energyBar.style.width = `${enPct}%`
      hpVal.textContent = `${currentHp}/${maxHp}`
      energyVal.textContent = `${currentEnergy}`

      if (log.defeated) break
    }

    await new Promise(r => setTimeout(r, 800))

    // OUTCOME BANNER
    if (res.player) state.player = res.player
    if (typeof updateSidebar === 'function') updateSidebar()

    if (tri.survived) {
      waveIndicator.textContent = '🌟 LÔI VÂN TAN BIẾN • ĐỘ KIẾP VIÊN MÃN'
      waveIndicator.style.color = '#10b981'

      const winBanner = document.createElement('div')
      winBanner.style.cssText = `
        background: linear-gradient(135deg, rgba(234, 179, 8, 0.2), rgba(16, 185, 129, 0.2));
        border: 2px solid #eab308; border-radius: 8px; padding: 14px; text-align: center;
        margin-top: 8px; animation: scaleUp 0.3s ease;
      `
      winBanner.innerHTML = `
        <div style="font-size: 24px;">👑</div>
        <div style="font-size: 16px; font-weight: 800; color: #eab308; margin-top: 4px;">
          ĐỘT PHÁ THÀNH CÔNG!
        </div>
        <div style="font-size: 12px; color: #e2e8f0; margin-top: 4px;">
          ${res.message}
        </div>
      `
      logStream.appendChild(winBanner)
      logStream.scrollTop = logStream.scrollHeight

      footer.innerHTML = `
        <button class="btn btn--gold btn--lg shadow-glow" id="btn-finish-tribulation" style="min-width: 200px; font-weight: 700;">
          🌟 ĐÓN NHẬN TIÊN PHÁP
        </button>
      `
      notify(res.message, 'success')
    } else {
      waveIndicator.textContent = '☠️ TRỌNG THƯƠNG • ĐỘT PHÁ THẤT BẠI'
      waveIndicator.style.color = '#ef4444'

      const loseBanner = document.createElement('div')
      loseBanner.style.cssText = `
        background: rgba(239, 68, 68, 0.2); border: 2px solid #ef4444; border-radius: 8px;
        padding: 14px; text-align: center; margin-top: 8px; animation: scaleUp 0.3s ease;
      `
      loseBanner.innerHTML = `
        <div style="font-size: 24px;">☠️</div>
        <div style="font-size: 15px; font-weight: 800; color: #ef4444; margin-top: 4px;">
          ĐỘT PHÁ THẤT BẠI!
        </div>
        <div style="font-size: 12px; color: #cbd5e1; margin-top: 4px;">
          ${res.message}
        </div>
      `
      logStream.appendChild(loseBanner)
      logStream.scrollTop = logStream.scrollHeight

      footer.innerHTML = `
        <button class="btn btn--dark" id="btn-finish-tribulation" style="min-width: 180px;">
          🏥 VỀ DƯỠNG THƯƠNG
        </button>
      `
      notify(res.message, 'error')
    }

    overlay.querySelector('#btn-finish-tribulation')?.addEventListener('click', () => {
      overlay.remove()
      renderGame()
    })

  } catch (err) {
    notify(err.message || 'Lỗi trong quá trình độ kiếp', 'error')
    overlay.remove()
    renderGame()
  }
}
