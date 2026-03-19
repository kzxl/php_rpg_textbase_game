/**
 * Skills Page — Learn and view skills
 */
export function pageSkills(el, ctx) {
  const { state, api, notify } = ctx
  const pSkills = state.player.skills || []
  const learnedIds = pSkills.map(s => typeof s === 'string' ? s : s.id)
  
  const learnedData = pSkills.map(ps => {
    const id = typeof ps === 'string' ? ps : ps.id;
    const master = state.skills.find(s => s.id === id) || { name: 'Vô danh thủ thuật', id };
    return { ...master, level: ps.level || 1, currentXp: ps.currentXp || 0 };
  })

  const available = state.skills.filter(s => !learnedIds.includes(s.id))

  el.innerHTML = `
    <div class="page-header"><h1>⚡ Thần Thông</h1></div>

    <div class="panel">
      <div class="panel-title">Đã học (${learnedData.length})</div>
      <div class="panel-body no-pad">
        ${learnedData.length === 0 ? '<div style="padding:14px" class="text-dim">Chưa lĩnh hội kỹ năng nào</div>' :
          learnedData.map(s => {
            const isPassive = s.type === 'passive' && (!s.tags || (!s.tags.includes('movement') && !s.tags.includes('thân pháp')))
            const actionBtn = isPassive 
              ? `<span class="text-xs text-dim">Vĩnh Viễn Kích Hoạt</span>` 
              : (s.isEquipped 
                  ? `<button class="btn btn--sm equip-btn" style="background:var(--red)" data-eq="0" data-sid="${s.id}">Tháo Gỡ</button>`
                  : `<button class="btn btn--sm equip-btn" data-eq="1" data-sid="${s.id}">Trang Bị</button>`)
            const equipBadge = s.isEquipped && !isPassive ? `<span class="badge" style="background:var(--green)">Đang trang bị</span>` : ''

            return `
            <div class="list-item flex flex-col items-start gap-4" style="${s.isEquipped && !isPassive ? 'border-left: 3px solid var(--green); background: rgba(50, 200, 100, 0.05);' : ''}">
              <div class="item-info w-full">
                <div class="flex justify-between items-center mb-xs">
                  <div class="item-name text-lg">${s.name} <span class="badge" style="background:var(--blue)">Tầng ${s.level}</span> ${equipBadge}</div>
                  <div class="text-xs text-gold">${s.currentXp} / 100 XP</div>
                </div>
                <div class="flex justify-between items-center mb-sm">
                  <div class="item-meta">${s.type === 'passive' ? '🔮 Nội công' : `⚡ Chiêu thức · 🔵${s.cost || 0} linh lực`}${s.description ? ' · ' + s.description : ''}</div>
                  <div>${actionBtn}</div>
                </div>
                
                <!-- Master XP Bar -->
                <div class="w-full bg-darker rounded" style="height: 4px; overflow: hidden;">
                  <div class="bg-gold h-full" style="width: ${Math.min(100, Math.max(0, (s.currentXp / 100) * 100))}%"></div>
                </div>
              </div>
            </div>`
          }).join('')}
      </div>
      </div>
    </div>`

  el.querySelectorAll('.equip-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      try {
        const sid = btn.dataset.sid
        const eq = btn.dataset.eq === '1'
        const data = await api.equipSkill(state.playerId, sid, eq)
        state.player = data.player 
        notify(data.message, 'success')
        pageSkills(el, ctx)
      } catch (e) {
        notify(e.message || 'Lỗi trang bị', 'error')
      }
    })
  })
}
