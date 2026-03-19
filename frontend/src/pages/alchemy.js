import { api } from '../services/api.js'

export function pageAlchemy(el, ctx) {
  const { state, renderGame, notify } = ctx
  const p = state.player
  const recipes = state.recipes || []
  const medicines = state.medicines || []

  const getMedName = (id) => {
    const m = medicines.find(x => x.id === id)
    return m ? m.name : id
  }

  // Helper to format material ID to readable name
  const formatMedId = (id) => {
    return id.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  }

  let html = `
    <div class="header">
      <div class="title">⚗️ Lò Luyện Đan</div>
      <div class="subtitle">Chưởng hỏa luyện hóa Vạn Vật, khai mở thiên địa tạo hóa. Kỹ năng Tinh Chế càng cao, tỉ lệ thành công càng tăng.</div>
    </div>
    
    <div class="card" style="margin-bottom: 20px;">
      <h3 style="margin-bottom: 10px; color: var(--gold);">Thảo Dược & Khí Hải Tàng Trữ</h3>
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
  `

  if (!p.materials || Object.keys(p.materials).length === 0) {
    html += `<div style="color:var(--text-muted); font-size:14px;">Bạn chưa thu thập được linh thảo hay tụ linh thạch nào. Hãy ra ngoài Khám Phá!</div>`
  } else {
    for (const [mId, amt] of Object.entries(p.materials)) {
      html += `<div class="badge" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 4px 8px;">
        ${formatMedId(mId)} <span style="color:var(--gold)">x${amt}</span>
      </div>`
    }
  }

  html += `</div></div>`

  html += `<h3 style="margin-bottom: 15px; color: var(--gold);">Bản Ghi Công Thức (Đan Phương)</h3>`
  
  if (recipes.length === 0) {
    html += `<div class="card">Chưa có công thức luyện đan nào lưu truyền...</div>`
  } else {
    html += `<div class="grid list-grid" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));">`
    recipes.forEach(r => {
      const targetName = getMedName(r.target)
      let reqHtml = ''
      if (r.requirements && r.requirements.skill) {
         reqHtml = `<div style="font-size:12px; color:var(--text-muted);">Yêu cầu: Kỹ năng ${formatMedId(r.requirements.skill)} lv${r.requirements.level || 1}</div>`
      }

      let matHtml = ''
      r.materials.forEach(m => {
         const has = p.materials?.[m.id] || 0
         const color = has >= m.amount ? 'var(--green)' : 'var(--red)'
         matHtml += `<span style="font-size:12px; margin-right:12px; display:inline-block;"><span style="color:${color}; font-weight:bold;">${has}/${m.amount}</span> ${formatMedId(m.id)}</span>`
      })

      // Calculate player success rate
      let bonus = 0;
      p.skills.forEach(ps => {
         const sid = typeof ps === 'string' ? ps : ps.id;
         if (sid === 'tinh_che') {
            const lvl = typeof ps === 'string' ? 1 : (ps.level || 1);
            bonus = lvl * 2;
         }
      })
      const finalRate = Math.min(100, (r.successRate || 100) + bonus);

      html += `
        <div class="card" style="display:flex; flex-direction:column; justify-content:space-between; border: 1px solid rgba(255,215,0,0.1);">
          <div>
            <div style="display:flex; justify-content:space-between; margin-bottom: 8px;">
              <strong style="color:var(--gold); font-size: 16px;">${targetName}</strong>
              <span class="badge">Tier ${r.tier}</span>
            </div>
            ${reqHtml}
            <div style="margin-top:8px;">
              <div style="font-size:12px; color:var(--text-muted); margin-bottom:4px;">Nguyên liệu:</div>
              <div>${matHtml}</div>
            </div>
            <div style="margin-top:10px; font-size:12px; display:flex; justify-content:space-between;">
              <span>Phí tổn: <span style="color:var(--gold)">💎 ${r.cost}</span></span>
              <span>Tỉ lệ: <span style="color:var(--blue); font-weight:bold;">${finalRate}%</span></span>
            </div>
          </div>
          <button class="btn btn--gold btn-craft" style="margin-top: 15px; width:100%; border-radius: 4px;" data-recipe="${r.id}">🔥 Khai Lò Luyện Đan</button>
        </div>
      `
    })
    html += `</div>`
  }

  el.innerHTML = html

  el.querySelectorAll('.btn-craft').forEach(btn => {
    btn.addEventListener('click', async () => {
      const recId = btn.dataset.recipe
      
      const rOpt = recipes.find(r => r.id === recId)
      if(rOpt && p.gold < (rOpt.cost || 0)) {
         return notify("Quỷ nghèo! Không đủ linh thạch mồi lửa lò đan.", "error")
      }

      try {
        const res = await api.craftItem(p.id, recId)
        ctx.state.player = res.player
        ctx.notify(res.message, res.success ? 'success' : 'error')
        ctx.renderGame()
      } catch(e) {
        ctx.notify(e.message, 'error')
      }
    })
  })
}
