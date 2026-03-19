/**
 * Cảnh Giới – Chi Tiết Tu Tiên Realm System
 * Hiển thị cảnh giới hiện tại, danh sách tất cả realms, nút Đột phá
 */
export function pageRealm(el, ctx) {
  const { state, api, notify, updateSidebar } = ctx
  const pid = state.playerId

  let loaded = false
  let realmData = null

  async function load() {
    try {
      const data = await api.getRealmInfo(pid)
      realmData = data
      loaded = true
      render()
    } catch (e) { notify(e.message || 'Lỗi tải Cảnh Giới', 'error') }
  }

  function render() {
    if (!realmData) return
    const curr = realmData.current
    const allRealms = realmData.allRealms || []
    const p = state.player
    const xpPct = p.xpToNext > 0 ? Math.floor(p.xp / p.xpToNext * 100) : 0

    el.innerHTML = `
      <div class="page-header">
        <h2>🌟 Cảnh Giới Tu Tiên</h2>
        <p class="page-sub">Con đường tu tiên, mỗi bước là một kiếp nạn</p>
      </div>

      <!-- CURRENT REALM -->
      <div class="card" style="border:2px solid ${curr.color};margin-bottom:16px">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
          <span style="font-size:36px">${curr.icon}</span>
          <div>
            <div style="font-size:20px;font-weight:700;color:${curr.color}">${curr.fullName}</div>
            <div style="opacity:0.5;font-size:13px">Tầng ${curr.tier}/8 · ${curr.subStageName}</div>
          </div>
        </div>

        <div class="sidebar-bar" style="margin:8px 0">
          <div class="bar-label"><span>⭐ Tu Vi</span><span>Lv.${p.level} — ${p.xp}/${p.xpToNext} XP</span></div>
          <div class="bar-track"><div class="bar-fill" style="width:${xpPct}%;background:${curr.color}"></div></div>
        </div>

        ${curr.bonuses ? `
          <div style="margin-top:8px">
            <div style="font-size:12px;font-weight:600;opacity:0.6;margin-bottom:4px">Bonus Cảnh Giới:</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              ${Object.entries(curr.bonuses).filter(([,v]) => v > 0).map(([k,v]) => `
                <span class="tag" style="background:rgba(255,255,255,0.08);border-radius:4px;padding:2px 6px;font-size:11px">+${v} ${k}</span>
              `).join('')}
            </div>
          </div>
        ` : ''}

        ${curr.unlocks ? `
          <div style="margin-top:8px">
            <div style="font-size:12px;font-weight:600;opacity:0.6;margin-bottom:4px">Đã Mở Khóa:</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              ${curr.unlocks.map(u => `<span style="font-size:12px;opacity:0.7">✅ ${u}</span>`).join(' · ')}
            </div>
          </div>
        ` : ''}
      </div>

      <!-- BREAKTHROUGH -->
      ${curr.canBreakthrough ? renderBreakthrough(curr) : ''}

      <!-- REALM MAP -->
      <div class="card">
        <div style="font-weight:600;margin-bottom:12px;color:var(--gold)">📜 Bản Đồ Cảnh Giới</div>
        ${allRealms.map(r => {
          const isCurrent = r.tier === curr.tier
          const isPast = r.tier < curr.tier
          const isFuture = r.tier > curr.tier
          const opacity = isFuture ? '0.35' : '1'
          const border = isCurrent ? `2px solid ${r.color}` : '1px solid rgba(255,255,255,0.05)'
          return `
            <div style="display:flex;align-items:center;gap:10px;padding:8px;border-bottom:${border};opacity:${opacity};transition:opacity 0.3s">
              <span style="font-size:24px;width:32px;text-align:center">${r.icon}</span>
              <div style="flex:1">
                <span style="font-weight:600;color:${r.color}">${r.name}</span>
                <span style="opacity:0.4;font-size:12px;margin-left:8px">Lv.${r.levelMin}+</span>
                ${r.failChance ? `<span style="opacity:0.5;font-size:11px;margin-left:8px;color:#ff6b6b">☠️ ${r.failChance}% thất bại</span>` : ''}
                ${isPast ? '<span style="color:var(--green);font-size:12px;margin-left:8px">✅</span>' : ''}
                ${isCurrent ? '<span style="color:var(--gold);font-size:12px;margin-left:8px">◀ Hiện tại</span>' : ''}
              </div>
            </div>
          `
        }).join('')}
      </div>
    `

    bindEvents()
  }

  function renderBreakthrough(curr) {
    const next = curr.nextRealm
    if (!next) return ''
    const costStr = next.cost ? `💎 ${next.cost.gold} + 🔮 ${next.cost.energy}` : 'Miễn phí'
    return `
      <div class="card" style="border:2px solid ${next.icon === '⚡' ? '#4fc3f7' : '#ffd54f'};margin-bottom:16px;background:rgba(255,215,0,0.03)">
        <div style="font-weight:700;color:var(--gold);font-size:16px;margin-bottom:8px">
          ⚡ ĐỘT PHÁ — Lên ${next.name} ${next.icon}
        </div>
        <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:8px;font-size:13px">
          <div><span style="opacity:0.5">Chi phí:</span> ${costStr}</div>
          ${next.trialMonster ? `<div><span style="opacity:0.5">Thử luyện:</span> ⚔️ Chiến đấu</div>` : ''}
          <div><span style="opacity:0.5">Tỷ lệ thất bại:</span> <span style="color:#ff6b6b">${next.failChance || 0}%</span></div>
        </div>
        <div style="font-size:12px;opacity:0.5;margin-bottom:8px">
          Bonus mới: ${Object.entries(next.bonuses).filter(([,v]) => v > 0).map(([k,v]) => `+${v} ${k}`).join(', ')}
        </div>
        <div style="font-size:12px;opacity:0.5;margin-bottom:12px">
          Mở khóa: ${next.unlocks.join(', ')}
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <button class="btn btn--gold" id="btnBreakthrough">⚡ ĐỘT PHÁ</button>
          <span style="font-size:11px;opacity:0.4">⚠️ Thất bại sẽ bị trọng thương + mất một phần tài nguyên</span>
        </div>
      </div>
    `
  }

  function bindEvents() {
    document.getElementById('btnBreakthrough')?.addEventListener('click', async () => {
      const btn = document.getElementById('btnBreakthrough')
      if (!confirm('Bạn có chắc muốn đột phá? Thất bại sẽ bị trọng thương!')) return
      btn.disabled = true
      btn.textContent = '⏳ Đang đột phá...'
      try {
        const data = await api.attemptBreakthrough(pid)
        if (data.success) {
          notify(data.message, 'success')
          state.player = data.player
          updateSidebar()
          // Reload realm page
          await load()
        } else {
          notify(data.message, 'error')
          if (data.player) {
            state.player = data.player
            updateSidebar()
          }
          await load()
        }
      } catch (e) {
        notify(e.message || 'Lỗi đột phá', 'error')
        btn.disabled = false
        btn.textContent = '⚡ ĐỘT PHÁ'
      }
    })
  }

  load()
}
