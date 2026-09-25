import { Component } from '../../core/Component.js'
import { calcTriggerChance } from './constants.js'

/**
 * SkillCard Component: Standardized visual card for active combat skills and passive mind methods.
 */
export class SkillCard extends Component {
  template() {
    const { skill, isLearned = true, canEquip = true, player = {} } = this.props
    const s = skill
    const xpNeeded = (s.level || 1) * 100
    const xpPct = Math.min(100, (((s.xp || 0)) / xpNeeded) * 100)
    const isPassive = s.type === 'passive'
    const tierStars = '★'.repeat(Math.min(s.tier || 1, 7))
    const tierColor = (s.tier || 1) >= 5 ? 'var(--gold, #facc15)' : (s.tier || 1) >= 3 ? 'var(--purple, #c084fc)' : 'var(--blue, #60a5fa)'

    let actionHtml = ''
    if (!isLearned) {
      actionHtml = `<span class="text-dim" style="font-size:11px; color:var(--text-dim)">Chưa lĩnh ngộ</span>`
    } else if (isPassive) {
      actionHtml = `<span style="font-size:11px; font-weight:700; color:var(--green, #4ade80)">🧘 Tâm Pháp Thường Trực</span>`
    } else if (s.equipped) {
      actionHtml = `<button class="btn btn--sm btn--red btn-equip-toggle" data-eq="0" data-sid="${s.id}" style="padding:4px 10px; font-size:11px">Tháo</button>`
    } else {
      actionHtml = `<button class="btn btn--sm ${canEquip ? 'btn--blue' : 'btn--outline'} btn-equip-toggle" data-eq="1" data-sid="${s.id}" ${canEquip ? '' : 'disabled title="Đã đầy ô kỹ năng!"'} style="padding:4px 10px; font-size:11px">Trang Bị</button>`
    }

    const totalChance = calcTriggerChance(s, player, isLearned)

    return `
      <div class="skill-card ${isLearned ? '' : 'locked'} ${s.equipped && !isPassive ? 'equipped' : ''}" style="background:var(--bg-card, #1a1e29); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:12px; display:flex; flex-direction:column; justify-content:space-between">
        <div>
          <div class="skill-card-header" style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px">
            <div>
              <div class="skill-card-name" style="font-size: 14px; font-weight:700; color:var(--text-bright, #fff)">${s.name}</div>
              <div class="skill-card-tier" style="color:${tierColor}; font-size:11px">${tierStars} Tầng ${s.tier || 1} • ${isPassive ? 'Tâm Pháp' : 'Chiêu Thức'}</div>
            </div>
            <div class="skill-card-action">${actionHtml}</div>
          </div>
          <div class="skill-card-desc" style="font-size:12px; color:var(--text-dim, #94a3b8); margin-bottom:10px; line-height:1.4">${s.description || 'Tuyệt kỹ thượng thừa tu chân giới.'}</div>
        </div>

        <div>
          ${isLearned ? `
            <div class="skill-card-mastery" style="background:rgba(0,0,0,0.25); border-radius:6px; padding:6px 10px; margin-bottom:8px">
              <div class="skill-mastery-label" style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:4px">
                <span style="font-weight:600">Thông thạo Lv.${s.level}</span>
                <span class="text-dim" style="color:var(--text-dim)">${s.xp || 0}/${xpNeeded} XP</span>
              </div>
              <div class="bar-track" style="height:4px; background:rgba(255,255,255,0.08); border-radius:2px; overflow:hidden">
                <div class="bar-fill xp" style="width:${xpPct}%; height:100%; background:var(--gold, #facc15)"></div>
              </div>
              ${s.masteryBonus ? `<div class="skill-mastery-bonus" style="font-size:11px; color:var(--gold, #facc15); margin-top:4px">✨ ${s.masteryBonus}</div>` : ''}
            </div>
          ` : `
            <div class="skill-card-req" style="margin-bottom:8px">
              ${(s.requirements || []).map(r => `<span class="req-tag" style="background:rgba(255,255,255,0.05); padding:2px 6px; border-radius:4px; font-size:10px">🔒 ${r}</span>`).join(' ')}
            </div>
          `}

          ${!isPassive ? `
            <div class="skill-card-cost" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px; padding-top:6px; border-top:1px solid rgba(255,255,255,0.06); font-size:11px">
              <span>🔵 ${s.cost || 0} Linh Lực</span>
              <span style="color:#f59e0b; font-weight:700">🎯 Xuất chiêu: ${totalChance}%</span>
            </div>
          ` : ''}
        </div>
      </div>
    `
  }

  bindEvents() {
    this.on('click', '.btn-equip-toggle', (e, target) => {
      e.stopPropagation()
      const shouldEquip = target.dataset.eq === '1'
      const skillId = target.dataset.sid
      if (this.props.onEquipToggle) {
        this.props.onEquipToggle(skillId, shouldEquip)
      }
    })
  }
}
