export function pageLibrary(el, ctx) {
  const { state, api, notify } = ctx
  const p = state.player

  // Determine player's perception tier (Ngộ Tính) based on 'nhan_thuat'
  const nhanThuat = (p.skills || []).find(s => (typeof s === 'string' ? s : s.id) === 'nhan_thuat');
  const perceptionLevel = nhanThuat ? (nhanThuat.level || 1) : 0;

  // Filter skills: sort by Tier ascending
  const allSkills = [...state.skills].sort((a, b) => (a.tier || 1) - (b.tier || 1));
  const learnedIds = (p.skills || []).map(s => typeof s === 'string' ? s : s.id);

  const romanTiers = { 1: 'Nhất', 2: 'Nhị', 3: 'Tam', 4: 'Tứ', 5: 'Ngũ' };

  el.innerHTML = `
    <div class="page-header">
      <h1>📚 Tàng Kinh Các</h1>
      <div class="text-sm text-dim">Kho tàng tuyệt học của nhân gian. Ngộ tính hiện tại: Tầng ${perceptionLevel}</div>
    </div>
    <div class="skills-grid" style="display: grid; gap: 16px; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));">
        ${allSkills.map(s => {
          const isLearned = learnedIds.includes(s.id);
          const tier = s.tier || 1;
          const isHidden = tier > perceptionLevel + 1; // Can see +1 tier above current perception
          const canReadReqs = tier <= perceptionLevel; // Can read reqs if perception >= tier

          let reqsHtml = '';
          if (s.requirements && s.requirements.length > 0) {
            if (canReadReqs || isLearned) {
               reqsHtml = `<div class="mt-sm text-xs text-orange">Điều kiện lĩnh hội: ${s.requirements.map(req => `<br>- ${req}`).join('')}</div>`;
            } else if (isHidden) {
               reqsHtml = `<div class="mt-sm text-xs text-dim" style="font-style: italic;">[???] Khẩu quyết bị mờ đi. Ngộ tính quá thấp để lĩnh hội. Cần Nhãn Thuật Tầng ${tier}</div>`;
            } else {
               reqsHtml = `<div class="mt-sm text-xs text-dim">[???] Có cảm giác mờ ảo về điều kiện học.</div>`;
            }
          } else {
             reqsHtml = `<div class="mt-sm text-xs text-green">Điều kiện lĩnh hội: Sẵn sàng</div>`;
          }

          return `
            <div class="panel" style="border-color: ${isLearned ? 'var(--blue)' : 'var(--bg-lighter)'}">
              <div class="panel-body flex flex-col items-start gap-4">
                <div class="w-full">
                  <div class="flex justify-between items-center mb-xs">
                    <div class="item-name text-lg ${isLearned ? 'text-blue' : ''}">${s.name}</div>
                    <div class="badge" style="background:var(--gold)">Bậc ${romanTiers[tier] || tier}</div>
                  </div>
                  <div class="item-meta mb-sm">${s.type === 'passive' ? '🔮 Nội công' : `⚡ Chiêu thức · 🔵${s.cost || 0} linh lực`}</div>
                  <div class="text-sm text-dim mb-md">${canReadReqs || isLearned ? s.description : 'Sách cổ không thể nhìn thấu công dụng.'}</div>
                  
                  ${reqsHtml}

                  <div class="mt-md flex justify-end">
                    ${isLearned 
                        ? `<button class="btn btn--sm" disabled style="opacity: 0.5">Đã Lĩnh Hội</button>`
                        : `<button class="btn btn--gold btn--sm btn-learn" data-sid="${s.id}">Lĩnh Hội</button>`}
                  </div>
                </div>
              </div>
            </div>
          `;
        }).join('')}
    </div>
  `

  el.querySelectorAll('.btn-learn').forEach(btn => {
    btn.addEventListener('click', async () => {
      try {
        const data = await api.learnSkill(p.id, btn.dataset.sid);
        if (data.error) {
            notify(data.error, 'error');
        } else {
            state.player = data.player;
            notify(data.message, 'success');
            pageLibrary(el, ctx); // Refresh component
        }
      } catch (e) { notify('Lỗi học kỹ năng: ' + e.message, 'error') }
    })
  });
}
