/**
 * PvPActionModal — Interactive Post-Combat Decision Modal for the Trifecta Outcomes:
 * 1. Chỉ Điểm (Spar / Leave) — 100% XP, +1 Tâm Cảnh, 0 Plunder, 30-60s hospital.
 * 2. Trọng Thương (Hospitalize) — 40% XP, Faction Chain, 0 Plunder, 10-60m hospital.
 * 3. Đoạt Bảo (Mug / Plunder) — 20% XP, Logarithmic anti-grief plunder, 2-5m hospital.
 */
export function showPvPActionModal({ data, pid, state, api, notify, updateSidebar, onComplete }) {
  const sessionId = data.session_id || data.sessionId
  const victimName = data.victimName || data.defender_name || 'Đối thủ'
  const victimGold = data.victimGold ?? data.defender_gold ?? 0

  const overlay = document.createElement('div')
  overlay.className = 'modal-overlay pvp-action-overlay'
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);backdrop-filter:blur(4px);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;'

  let leaseSeconds = data.action_expires_in || 60

  overlay.innerHTML = `
    <div class="pvp-modal-content" style="background:#151824;border:1px solid var(--border);border-radius:8px;width:100%;max-width:480px;box-shadow:0 8px 24px rgba(0,0,0,0.5);overflow:hidden;animation:fadeIn 0.2s ease">
      <div style="background:rgba(0,0,0,0.25);padding:14px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between">
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-size:24px">⚔️</span>
          <div>
            <div style="font-weight:bold;color:var(--gold);font-size:15px">HẠ GỤC ĐỐI THỦ: ${victimName}</div>
            <div style="font-size:11px;color:var(--text-dim)">Linh Thạch tại thân: 💎 ${victimGold.toLocaleString()}</div>
          </div>
        </div>
        <div style="font-size:12px;font-weight:bold;color:#f87171;background:rgba(0,0,0,0.5);padding:4px 8px;border-radius:8px;border:1px solid rgba(248,113,113,0.3)">
          ⏱️ <span id="pvpLeaseTimer">${leaseSeconds}s</span>
        </div>
      </div>

      <div style="padding:16px;display:flex;flex-direction:column;gap:12px">
        <div style="font-size:12px;color:#d1d5db;line-height:1.5">
          Quyết đấu đã phân định thắng bại! Trong vòng 60 giây, hãy lựa chọn một trong ba kết cục nhân quả sau:
        </div>

        <!-- Option 1: Chỉ Điểm -->
        <button class="btn btn--outline pvp-choice-btn" data-action="leave" style="text-align:left;padding:12px;border:1px solid rgba(59,130,246,0.4);background:rgba(59,130,246,0.08);border-radius:8px;cursor:pointer;display:flex;flex-direction:column;gap:4px;transition:all 0.2s">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="font-weight:bold;color:#60a5fa;font-size:13px">🚶 Chỉ Điểm (Spar / Leave)</span>
            <span style="font-size:11px;background:#1e3a8a;color:#93c5fd;padding:2px 6px;border-radius:4px">Đề cử cày cấp</span>
          </div>
          <div style="font-size:11px;color:#cbd5e1">
            Thu kiếm vào bao, bảo tồn đạo tâm. Nhận <strong>100% Tu Vi XP</strong> & <strong>+1 Tâm Cảnh</strong>. Đối thủ chỉ bị chấn động nhẹ (30-60s).
          </div>
        </button>

        <!-- Option 2: Trọng Thương -->
        <button class="btn btn--outline pvp-choice-btn" data-action="wound" style="text-align:left;padding:12px;border:1px solid rgba(239,68,68,0.4);background:rgba(239,68,68,0.08);border-radius:8px;cursor:pointer;display:flex;flex-direction:column;gap:4px;transition:all 0.2s">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="font-weight:bold;color:#f87171;font-size:13px">🩸 Trọng Thương (Hospitalize)</span>
            <span style="font-size:11px;background:#7f1d1d;color:#fca5a5;padding:2px 6px;border-radius:4px">Tranh đoạt lãnh địa</span>
          </div>
          <div style="font-size:11px;color:#cbd5e1">
            Đoạn tuyệt kinh mạch. Khóa đối thủ tịnh dưỡng từ <strong>10 đến 60 phút</strong>. Nhận 40% Tu Vi XP & Điểm Chiến Tích Tông Môn.
          </div>
        </button>

        <!-- Option 3: Đoạt Bảo -->
        <button class="btn btn--outline pvp-choice-btn" data-action="rob" style="text-align:left;padding:12px;border:1px solid rgba(234,179,8,0.4);background:rgba(234,179,8,0.08);border-radius:8px;cursor:pointer;display:flex;flex-direction:column;gap:4px;transition:all 0.2s">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="font-weight:bold;color:#fde047;font-size:13px">💰 Đoạt Bảo (Mug / Plunder)</span>
            <span style="font-size:11px;background:#713f12;color:#fef08a;padding:2px 6px;border-radius:4px">Cướp bóc</span>
          </div>
          <div style="font-size:11px;color:#cbd5e1">
            Tịch thu <strong>4% - 18% Linh Thạch</strong> unbanked (áp dụng đường cong chống cày cuốc). Đối thủ tịnh dưỡng 2-5 phút.
          </div>
        </button>
      </div>
    </div>
  `

  document.body.appendChild(overlay)

  const timerEl = overlay.querySelector('#pvpLeaseTimer')
  const countdownInterval = setInterval(() => {
    leaseSeconds--
    if (timerEl) timerEl.textContent = `${leaseSeconds}s`
    if (leaseSeconds <= 0) {
      clearInterval(countdownInterval)
      executeAction('leave')
    }
  }, 1000)

  async function executeAction(action) {
    clearInterval(countdownInterval)
    overlay.querySelectorAll('.pvp-choice-btn').forEach(b => {
      b.disabled = true
      b.style.opacity = '0.6'
    })

    try {
      const res = await api.resolveMugAction(pid, action, sessionId)
      overlay.remove()
      notify(res.message || 'Đã hoàn tất kết cục giao chiến!', 'success')
      if (res.player && state) {
        state.player = res.player
        if (updateSidebar) updateSidebar()
      }
      if (onComplete) onComplete(res)
    } catch (err) {
      overlay.remove()
      notify(err.message || 'Lỗi khi giải quyết kết cục!', 'error')
    }
  }

  overlay.querySelectorAll('.pvp-choice-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      executeAction(btn.dataset.action)
    })
  })
}
