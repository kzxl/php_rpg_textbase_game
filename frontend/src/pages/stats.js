/**
 * Stats Page — Rèn Luyện & Cảnh Giới
 * Training only (no manual stat point allocation — auto-distributed on level-up)
 */
import { openTribulationModal } from '../game/TribulationModal.js'

export function pageStats(el, ctx) {
  const { state, api, notify, renderGame } = ctx
  const p = state.player, s = p.stats || {}, a = p.allocatedStats || {}
  const td = p.talentDisplay || {}

  // R2.1: Stamina resource distinction
  const staminaCost = 5
  const curStamina = p.currentStamina ?? 100
  const maxStamina = p.maxStamina ?? 100
  const canTrain = curStamina >= staminaCost && !p.hospitalRemaining

  const stats = [
    ['strength', '💪', 'Sức mạnh', 'Tăng sát thương mỗi đòn'],
    ['speed', '🏃', 'Tốc độ', 'Tăng hit chance, giảm escape'],
    ['dexterity', '🎯', 'Khéo léo', 'Tăng dodge, escape, stealth'],
    ['defense', '🛡', 'Phòng thủ', 'Giảm sát thương nhận vào'],
  ]

  // R2.2: MDG Defense Mitigation & Evasion Formulations
  const defVal = s.defense ?? 0
  const calcMitigation = (rawDmg) => {
    if (defVal <= 0) return 0.0
    const effDmg = Math.max(8.0, rawDmg)
    const pct = (defVal / (defVal + 5.0 * effDmg)) * 100
    return Math.min(85.0, Math.round(pct * 100) / 100)
  }
  const lowMit = calcMitigation(25)
  const medMit = calcMitigation(75)
  const bossMit = calcMitigation(250)

  const dexVal = s.dexterity ?? 0
  const curSpeed = s.speed ?? 10
  const calcDodge = (enemySpeed) => {
    if (dexVal <= 0) return 0.0
    const effSpd = Math.max(1.0, enemySpeed)
    const pct = (dexVal / (dexVal + 2.5 * effSpd)) * 100
    return Math.min(35.0, Math.round(pct * 100) / 100)
  }
  const dodgeSlow = calcDodge(curSpeed * 0.75)
  const dodgeEqual = calcDodge(curSpeed * 1.0)
  const dodgeAgile = calcDodge(curSpeed * 1.5)

  // R2.3: Cultivation Breakthrough & Tribulation Readiness
  const nextRealm = p.realmInfo?.nextRealm || {}
  const curLevel = p.level || 1
  const reqLevel = nextRealm.levelMin || ((p.realmTier || 1) + 1) * 10
  const goldCost = nextRealm.cost?.gold || 0
  const energyCost = nextRealm.cost?.energy || 0
  const curGold = p.gold || 0
  const curEnergy = p.currentEnergy || 0

  const levelSatisfied = curLevel >= reqLevel
  const goldSatisfied = curGold >= goldCost
  const energySatisfied = curEnergy >= energyCost
  const canBreakthrough = levelSatisfied && goldSatisfied && energySatisfied && !p.hospitalRemaining && (p.realmInfo?.canBreakthrough ?? true)

  const curHp = p.currentHp ?? 100
  const maxHp = s.maxHp || p.maxHp || 100
  const isWounded = curHp < maxHp
  const targetTier = (p.realmTier || 1) + 1
  const estimatedLightningDmg = Math.round(maxHp * 0.45 * (1 + targetTier * 0.05))
  const usableEnergy = p.usableEnergy ?? p.currentEnergy ?? 0
  const qiShieldCapacity = Math.round(usableEnergy * 2.5)

  const activeAuras = p.activeAuras || []
  const hasGoldenBell = activeAuras.includes('ho_the_kim_chung')
  const hasGaleStride = activeAuras.includes('than_hanh_bo')

  let emergencyPillCount = 0
  if (p.medicines && typeof p.medicines === 'object') {
    emergencyPillCount = Object.values(p.medicines).reduce((acc, val) => acc + (typeof val === 'number' ? val : (val?.qty || 1)), 0)
  } else if (Array.isArray(p.inventory)) {
    emergencyPillCount = p.inventory.filter(i => i.type === 'medicine' || i.type === 'pill' || (i.id && i.id.includes('dan'))).reduce((sum, i) => sum + (i.qty || 1), 0)
  }

  const talentTiers = [
    { name: 'Phàm Cốt', multiplier: '1.0x', class: 'tier-pham', icon: '⚪' },
    { name: 'Linh Cốt', multiplier: '1.1x', class: 'tier-linh', icon: '🔵' },
    { name: 'Huyền Cốt', multiplier: '1.25x', class: 'tier-huyen', icon: '🟣' },
    { name: 'Đạo Cốt', multiplier: '1.5x', class: 'tier-dao', icon: '🟡' },
    { name: 'Tiên Cốt', multiplier: '2.0x', class: 'tier-tien', icon: '🟠' },
  ]

  const maxTrain = Math.floor(curStamina / staminaCost) || 0

  el.innerHTML = `
    <div class="page-header">
      <h1>🏋 Rèn Luyện & Cảnh Giới</h1>
      <div class="actions">
        <span class="text-dim">🏃 ${curStamina}/${maxStamina} thể lực · Chi phí: 5 thể lực/lần</span>
      </div>
    </div>

    ${p.hospitalRemaining > 0 ? `<div class="panel"><div class="panel-body text-red" style="text-align:center">🏥 Đang tịnh dưỡng! Còn ${p.hospitalRemaining}s</div></div>` : ''}

    <!-- R2.3: TIẾN TRÌNH CẢNH GIỚI & ĐỘT PHÁ -->
    <div class="panel glass breakthrough-module">
      <div class="flex justify-between items-center mb-md" style="flex-wrap:wrap;gap:10px">
        <div>
          <div class="text-xs text-dim mb-xs">Cảnh Giới Hiện Tại & Đột Phá</div>
          <div class="text-xl text-gold bold" style="text-shadow:0 0 10px rgba(255,215,0,0.3)">
            🌟 ${p.realmInfo?.fullName || 'Phàm Nhân'}
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="badge ${canBreakthrough ? 'badge-enhance tier-1' : 'badge-enhance tier-3'}">
            ${canBreakthrough ? '⚡ SẴN SÀNG ĐỘT PHÁ' : '🔒 ĐIỀU KIỆN CHƯA ĐỦ'}
          </span>
          ${canBreakthrough 
            ? `<button class="btn btn--gold btn--md shadow-glow btn-breakthrough" style="animation:pulse 2s infinite">⚡ Đột Phá Cảnh Giới!</button>` 
            : `<button class="btn btn--dark btn--md btn-breakthrough" disabled title="Chưa đủ điều kiện đột phá">⚡ Đột Phá</button>`}
        </div>
      </div>

      <!-- Breakthrough Preconditions Checklist -->
      <div class="breakthrough-checklist">
        <div class="checklist-item ${levelSatisfied ? 'satisfied' : 'missing'}">
          <div>
            <div class="text-xs text-dim">Yêu Cầu Tu Vi</div>
            <strong>Lv.${curLevel} / ${reqLevel}</strong>
          </div>
          <span>${levelSatisfied ? '✅ Đạt Cấp' : '⏳ Cần thêm cấp'}</span>
        </div>
        <div class="checklist-item ${goldSatisfied ? 'satisfied' : 'missing'}">
          <div>
            <div class="text-xs text-dim">Linh Thạch Tiêu Hao</div>
            <strong>${curGold} / ${goldCost} 💎</strong>
          </div>
          <span>${goldSatisfied ? '✅ Đủ Ngân Sách' : '❌ Thiếu Linh Thạch'}</span>
        </div>
        <div class="checklist-item ${energySatisfied ? 'satisfied' : 'missing'}">
          <div>
            <div class="text-xs text-dim">Linh Lực Dự Trữ</div>
            <strong>${curEnergy} / ${energyCost} 🔮</strong>
          </div>
          <span>${energySatisfied ? '✅ Đủ Dự Trữ' : '❌ Thiếu Linh Lực'}</span>
        </div>
      </div>

      <!-- Tribulation Readiness -->
      <div style="margin-top:12px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.06)">
        <div class="text-xs text-dim mb-xs flex justify-between">
          <span>⚡ Độ Kiếp Sinh Tồn (Tribulation Readiness)</span>
          <span class="${isWounded ? 'text-red' : 'text-green'}">${isWounded ? '⚠️ Khí huyết bị tổn thương' : '🛡️ Khí huyết viên mãn'}</span>
        </div>
        <div class="tribulation-readiness-grid">
          <div class="readiness-card">
            <div class="readiness-card-title">❤️ Khí Huyết vs Lôi Kiếp</div>
            <div class="readiness-card-val ${isWounded ? 'text-red' : 'text-green'}">${curHp}/${maxHp} HP</div>
            <div class="text-xxs text-dim mt-xs">Ước tính sát thương sét: ~${estimatedLightningDmg} ST</div>
          </div>
          <div class="readiness-card">
            <div class="readiness-card-title">🔵 Chân Khí Hộ Thể (Qi Shield)</div>
            <div class="readiness-card-val text-blue">${qiShieldCapacity} HP</div>
            <div class="text-xxs text-dim mt-xs">${usableEnergy} LL × 2.5 hấp thụ sát thương</div>
          </div>
          <div class="readiness-card">
            <div class="readiness-card-title">🛡️ Tâm Pháp Bảo Hộ</div>
            <div class="readiness-card-val text-purple" style="font-size:12px">
              ${hasGoldenBell ? '✅ Kim Chung (-20%)' : '❌ Kim Chung'} · ${hasGaleStride ? '✅ Thần Hành (+10% Né)' : '❌ Thần Hành'}
            </div>
            <div class="text-xxs text-dim mt-xs">Hào quang duy trì giảm sát thương lôi đình</div>
          </div>
          <div class="readiness-card">
            <div class="readiness-card-title">💊 Đan Dược Hộ Mệnh</div>
            <div class="readiness-card-val text-gold">${emergencyPillCount} viên</div>
            <div class="text-xxs text-dim mt-xs">Tự động kích hoạt cứu mạng khi HP < 20%</div>
          </div>
        </div>
      </div>
    </div>

    <!-- R2.2: PHÂN TÍCH PHÒNG THỦ & THÂN PHÁP (CHUẨN MDG) -->
    <div class="panel defense-breakdown-panel">
      <div class="panel-title flex justify-between items-center">
        <span>🛡️ Phân Tích Phòng Thủ Chuyên Sâu (Chuẩn MDG)</span>
        <span class="badge" style="background:rgba(91,141,217,0.2);color:var(--blue)">Phòng Thủ: ${defVal}</span>
      </div>
      <div class="panel-body no-pad" style="margin-top:10px">
        <div class="text-xs text-dim mb-xs flex justify-between">
          <span>Giảm Sát Thương Vật Lý Theo Uy Lực Đòn Đánh</span>
          <span class="text-gold">Trần tối đa: 85%</span>
        </div>
        <div class="defense-cards-grid">
          <!-- Low Strike -->
          <div class="defense-card tier-low">
            <div class="mitigation-header">
              <span class="text-green">🌱 Đòn Nhẹ (Raw 25)</span>
              <span class="mitigation-badge tier-low">${lowMit}%</span>
            </div>
            <div class="mitigation-track">
              <div class="mitigation-fill tier-low" style="width:${lowMit}%"></div>
            </div>
            <div class="mitigation-desc">Quái thường, trầy xước sơ đẳng</div>
          </div>

          <!-- Medium Strike -->
          <div class="defense-card tier-med">
            <div class="mitigation-header">
              <span class="text-orange">⚔️ Tiêu Chuẩn (Raw 75)</span>
              <span class="mitigation-badge tier-med">${medMit}%</span>
            </div>
            <div class="mitigation-track">
              <div class="mitigation-fill tier-med" style="width:${medMit}%"></div>
            </div>
            <div class="mitigation-desc">Tinh anh, chiêu thức cận chiến</div>
          </div>

          <!-- Boss Strike -->
          <div class="defense-card tier-boss">
            <div class="mitigation-header">
              <span class="text-red">🐉 Đòn Boss (Raw 250)</span>
              <span class="mitigation-badge tier-boss">${bossMit}%</span>
            </div>
            <div class="mitigation-track">
              <div class="mitigation-fill tier-boss" style="width:${bossMit}%"></div>
            </div>
            <div class="mitigation-desc">Trọng Kích Boss, Xuyên Giáp Tự Nhiên</div>
          </div>
        </div>

        <!-- Evasion Dexterity Breakdown -->
        <div style="margin-top:14px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.06)">
          <div class="text-xs text-dim mb-xs flex justify-between">
            <span>Xác Suất Thân Pháp Né Tránh (Khéo léo: ${dexVal})</span>
            <span class="text-purple">Trần né chuẩn: 35%</span>
          </div>
          <div class="evasion-grid">
            <div class="evasion-card">
              <span class="text-dim">🐢 Vs Địch Chậm (0.75x):</span>
              <span class="evasion-val text-cyan">${dodgeSlow}%</span>
            </div>
            <div class="evasion-card">
              <span class="text-dim">⚖️ Vs Ngang Tốc (1.0x):</span>
              <span class="evasion-val text-purple">${dodgeEqual}%</span>
            </div>
            <div class="evasion-card">
              <span class="text-dim">⚡ Vs Thần Tốc (1.5x):</span>
              <span class="evasion-val text-orange">${dodgeAgile}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CĂN CỐT THIÊN PHÚ -->
    <div class="panel" style="margin-bottom:12px">
      <div class="panel-title">🧬 Căn Cốt Thiên Phú</div>
      <div class="panel-body" style="padding:12px 16px">
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;text-align:center">
          ${stats.map(([key, icon, name]) => {
            const t = td[key] || { value: 1.0, name: 'Phàm Cốt', icon: '⚪', color: '#ccc' }
            return `
              <div style="background:rgba(255,255,255,0.03);border:1px solid ${t.color}44;border-radius:8px;padding:10px 8px">
                <div style="font-size:18px">${icon}</div>
                <div style="font-size:11px;opacity:0.6;margin-top:2px">${name}</div>
                <div style="font-size:14px;font-weight:700;color:${t.color};margin-top:4px">${t.icon} ${t.name}</div>
                <div style="font-size:11px;color:${t.color};opacity:0.8">×${t.value} hệ số</div>
              </div>
            `
          }).join('')}
        </div>

        <!-- R2.3: Talent Multipliers Breakdown -->
        <div class="talent-multipliers-table">
          <div class="text-xs text-dim" style="width:100%;margin-bottom:4px">Hệ Thống Phẩm Cấp Căn Cốt:</div>
          ${talentTiers.map(tier => `
            <div class="talent-pill-badge ${tier.class}">
              <span>${tier.icon}</span>
              <strong>${tier.name}</strong>
              <span>(${tier.multiplier})</span>
            </div>
          `).join('')}
        </div>

        <div style="text-align:center;margin-top:10px;font-size:11px;opacity:0.4">
          Dùng 🧬 Tẩy Tủy Đan để tăng bậc ngẫu nhiên · 🔮 Hoán Cốt Đan để reroll toàn bộ
        </div>
      </div>
    </div>

    <!-- R2.1: RÈN LUYỆN CHỈ SỐ TIÊU HAO THỂ LỰC -->
    <div class="panel">
      <div class="panel-title">⚔️ Rèn Luyện Chỉ Số</div>
      <div class="panel-body no-pad">
        ${stats.map(([key, icon, name, desc]) => {
          const t = td[key] || { value: 1.0, name: 'Phàm Cốt', icon: '⚪', color: '#ccc' }
          return `
          <div class="stat-row" style="padding:12px 16px">
            <div class="stat-label">
              <span class="stat-icon">${icon}</span> ${name}
              <div style="font-size:10px;opacity:0.45;margin-top:1px;font-weight:400">${desc}</div>
            </div>
            <div class="stat-val flex items-center gap-3">
              <span style="min-width:40px; text-align:right; font-weight:700">${s[key] ?? 0}</span>
              ${a[key] > 0 ? `<span class="text-green" style="font-size:12px; min-width:30px">(+${a[key]})</span>` : `<span style="min-width:30px"></span>`}
              <span style="font-size:10px;color:${t.color};min-width:50px" title="Căn Cốt: ${t.name} (×${t.value})">${t.icon}×${t.value}</span>
              <input type="number" class="train-count" data-stat="${key}" min="1" max="${maxTrain}" value="1" style="width:50px;padding:3px 6px;border-radius:4px;border:1px solid rgba(255,255,255,0.15);background:rgba(0,0,0,0.3);color:#fff;text-align:center;font-size:12px" ${canTrain ? '' : 'disabled'}>
              <button class="btn btn--sm ${canTrain ? 'btn--blue' : 'btn--dark'} train-btn" data-train="${key}" ${canTrain ? '' : 'disabled'} title="Tốn 5 thể lực/lần · Căn cốt ×${t.value}">Rèn Luyện</button>
            </div>
          </div>
        `}).join('')}
        <div style="padding:8px 16px;font-size:11px;opacity:0.4;border-top:1px solid rgba(255,255,255,0.05)">
          💡 Rèn luyện tốn <strong>5 thể lực</strong> / lần. Hiệu quả nhân với hệ số căn cốt. Tối đa <strong>${maxTrain}</strong> lần hiện tại.
        </div>
        <div class="derived-row mt-3 border-t border-dim pt-3">
          <div class="d-item"><div class="d-val">${s.maxHp ?? 100}</div><div class="d-label">Max HP</div></div>
          <div class="d-item"><div class="d-val">${s.maxEnergy ?? 50}</div><div class="d-label">🔮 Linh lực</div></div>
          <div class="d-item"><div class="d-val">+${s.energyRegen ?? 5}/t</div><div class="d-label">Hồi/lượt</div></div>
        </div>
        <div class="derived-row pb-3">
          <div class="d-item"><div class="d-val">${s.critChance ?? 5}%</div><div class="d-label">Chí mạng</div></div>
          <div class="d-item"><div class="d-val">×${s.critMultiplier ?? 1.5}</div><div class="d-label">Hệ số CM</div></div>
          <div class="d-item"><div class="d-val">10</div><div class="d-label">🔵 Khí/đòn</div></div>
        </div>
      </div>
    </div>`

  el.querySelectorAll('.btn-breakthrough').forEach(btn => {
    btn.addEventListener('click', () => {
      openTribulationModal(ctx)
    })
  })

  el.querySelectorAll('.train-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation()
      const countInput = el.querySelector(`.train-count[data-stat="${btn.dataset.train}"]`)
      const count = parseInt(countInput?.value) || 1
      try {
        const data = await api.trainStat(state.playerId, btn.dataset.train, count)
        state.player = data.player
        notify(data.message, 'success')
        renderGame()
      } catch (e2) { notify(e2.message || 'Lỗi rèn luyện', 'error') }
    })
  })
}

