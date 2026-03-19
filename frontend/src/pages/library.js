export function pageLibrary(el, ctx) {
  const { state, api, notify } = ctx
  const p = state.player

  // Determine player's perception tier (Ngộ Tính) based on 'nhan_thuat'
  const nhanThuat = (p.skills || []).find(s => (typeof s === 'string' ? s : s.id) === 'nhan_thuat');
  const perceptionLevel = nhanThuat ? (nhanThuat.level || 1) : 0;

  // Filter skills: sort by Tier ascending
  const allSkills = [...state.skills].sort((a, b) => (a.tier || 1) - (b.tier || 1));
  const learnedIds = (p.skills || []).map(s => typeof s === 'string' ? s : s.id);

  const romanTiers = { 1: 'Nhất', 2: 'Nhị', 3: 'Tam', 4: 'Tứ', 5: 'Ngũ', 6: 'Lục', 7: 'Thất', 8: 'Bát', 9: 'Cửu' };

  el.innerHTML = `
    <div class="page-header">
      <h1>📚 Tàng Kinh Các</h1>
      <div class="text-sm text-dim">Kho tàng tuyệt học của nhân gian. Ngộ tính hiện tại: Nhãn Thuật Tầng ${perceptionLevel}</div>
    </div>
    <div class="panel">
      <div class="panel-body no-pad" id="libraryList">
        ${allSkills.map(s => {
          const isLearned = learnedIds.includes(s.id)
          const tier = s.tier || 1
          const isHidden = tier > perceptionLevel + 1 // Can see +1 tier above current perception
          const canReadReqs = tier <= perceptionLevel // Can read reqs if perception >= tier

          let reqsHtml = ''
          if (s.requirements && s.requirements.length > 0) {
            if (canReadReqs || isLearned) {
               reqsHtml = `<div class="mt-sm text-xs text-orange">Điều kiện: ${s.requirements.map(req => `<br>• ${req}`).join('')}</div>`
            } else if (isHidden) {
               reqsHtml = `<div class="mt-sm text-xs text-dim" style="font-style: italic;">[???] Khẩu quyết bị sương mù che khuất. Cần Nhãn Thuật Tầng ${tier}.</div>`
            } else {
               reqsHtml = `<div class="mt-sm text-xs text-dim">[???] Đạo hạnh thấp kém, linh hồn hoa mắt chóng mặt.</div>`
            }
          } else {
             reqsHtml = `<div class="mt-sm text-xs text-green">Điều kiện: Phàm nhân cũng có thể luyện</div>`
          }

          return `
            <div class="list-item" style="flex-direction:column; padding:0; align-items:stretch">
              <!-- Accordion Header -->
              <div class="accordion-header" style="display:flex; justify-content:space-between; align-items:center; padding:14px; cursor:pointer">
                <div>
                  <div style="color:${isLearned ? 'var(--blue)' : 'var(--text-light)'}; font-size:16px; font-weight:bold; margin-bottom:4px">
                    ${s.name} ${isLearned ? ' <span style="font-size:12px; color:var(--text-dim)">(Đã Lĩnh Hội)</span>' : ''}
                  </div>
                  <div class="flex gap-2 items-center">
                    <span class="badge" style="background:${isLearned ? 'rgba(59,130,246,0.2)' : 'var(--gold)'}">Bậc ${romanTiers[tier] || tier}</span>
                    <span class="text-xs text-dim">${s.type === 'passive' ? '🔮 Nội công' : '⚡ Chiêu thức'}</span>
                  </div>
                </div>
                <div class="text-dim" style="font-size:12px">▼</div>
              </div>
              
              <!-- Accordion Body -->
              <div class="accordion-body" style="display:none; padding:14px; background:rgba(0,0,0,0.2); border-top:1px solid rgba(255,255,255,0.05)">
                <div class="text-sm text-dim mb-md italic" style="line-height:1.5">
                  "${canReadReqs || isLearned ? s.description : 'Sách cổ không thể nhìn thấu công dụng.'}"
                </div>
                ${s.type !== 'passive' && s.cost ? `<div class="text-xs text-blue mb-sm">Tiêu hao: 🔵 ${s.cost} linh lực</div>` : ''}
                
                ${reqsHtml}

                <div class="mt-md" style="display:flex; justify-content:flex-end">
                  ${isLearned 
                      ? `<button class="btn btn--sm" disabled style="opacity: 0.5">Đã Lĩnh Hội</button>`
                      : `<button class="btn ${isHidden ? 'btn--dark' : 'btn--gold'} btn--sm btn-learn" ${isHidden ? 'disabled title="Ngộ tính chưa đủ"' : ''} data-sid="${s.id}">Lĩnh Hội 📜</button>`}
                </div>
              </div>
            </div>
          `
        }).join('')}
      </div>
    </div>
  `

  // Accordion Expand Logic
  el.querySelectorAll('.accordion-header').forEach(hdr => {
    hdr.addEventListener('click', () => {
      const body = hdr.nextElementSibling
      if (body.style.display === 'none') {
        body.style.display = 'block'
        hdr.querySelector('div:last-child').textContent = '▲'
      } else {
        body.style.display = 'none'
        hdr.querySelector('div:last-child').textContent = '▼'
      }
    })
  })

  // Learn Skill Logic
  el.querySelectorAll('.btn-learn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation()
      try {
        const data = await api.learnSkill(p.id, btn.dataset.sid)
        if (data.error) {
            notify(data.error, 'error')
        } else {
            state.player = data.player
            notify(data.message, 'success')
            pageLibrary(el, ctx) // Refresh component
        }
      } catch (err) { notify('Lỗi học kỹ năng: ' + err.message, 'error') }
    })
  })
}
