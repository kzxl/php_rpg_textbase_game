import { Component } from '../../core/Component.js'
import { OUTCOME_MAP, getStance, spawnFloatingDamage, renderCombatLogLines } from './constants.js'
import { fmtAffix } from '../helpers.js'

/**
 * CombatArenaView Component: 2D Visual Turn-Based Arena with Fighter Cards, HP bars & Loot panel.
 */
export class CombatArenaView extends Component {
  template() {
    const { combatData = {}, player = {}, ctx = null } = this.props
    const r = combatData
    const m = r.monster || {}
    const p = ctx?.state?.player || player
    const pendingItem = r.pendingLoot || p.pendingLoot

    const pHp = Math.max(0, ((player.currentHp || 0) / (player.maxHp || 1)) * 100)
    const mHp = Math.max(0, ((m.currentHp || 0) / (m.maxHp || 1)) * 100)

    const oc = OUTCOME_MAP[r.outcome] || OUTCOME_MAP['loss']
    const goldText = r.rewards?.gold ? ` · +${r.rewards.gold} 💎` : ''
    const rewardText = r.rewards ? ` · +${r.rewards.xp || 0} XP${goldText}` : ''
    const stanceInfo = getStance(r.activeStance || 'breaker')

    return `
      <div class="combat-arena-view panel" style="border: 1px solid var(--border-panel, rgba(255,255,255,0.15)); overflow:hidden; border-radius:10px; margin-bottom:16px">
        <!-- Header -->
        <div class="panel-title flex justify-between items-center" style="background: rgba(0,0,0,0.35); padding: 10px 16px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.05)">
          <div style="font-weight:bold; color: ${oc.color}; font-size:15px; display:flex; align-items:center; gap:8px;">
            <span>${oc.icon}</span> <span>${oc.text}</span>
          </div>
          <div class="text-sm text-dim" style="font-size:12px; color:var(--text-dim)">
            ${r.turns || 1}/${r.maxTurns || 25} Lượt ${rewardText}
          </div>
        </div>

        <!-- 2D Fighter Cards Arena -->
        <div class="panel-body" style="background: radial-gradient(circle at center, rgba(30,41,59,0.5) 0%, rgba(15,23,42,0.95) 100%); padding: 20px 16px;">
          <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 16px; align-items: center; max-width: 750px; margin: 0 auto;">
            
            <!-- Player Card -->
            <div class="fighter-card" id="cardPlayer" style="background: rgba(15,23,42,0.85); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 14px; text-align: center; position:relative">
              <div style="font-size: 36px; margin-bottom: 6px;">🧑‍🌾</div>
              <div style="font-weight: bold; color: var(--text-bright, #fff); font-size: 15px; margin-bottom: 2px;">${player.name || 'Tu Sĩ'}</div>
              <div style="font-size: 11px; color: ${stanceInfo.color}; font-weight: 600; margin-bottom: 8px;">
                ${stanceInfo.icon} ${stanceInfo.name}
              </div>
              <div style="background: rgba(0,0,0,0.5); border-radius: 4px; height: 10px; overflow: hidden; margin-bottom: 4px;">
                <div id="barPlayerHp" style="width: ${pHp}%; height: 100%; background: ${pHp > 50 ? 'var(--green, #4ade80)' : (pHp > 20 ? 'var(--orange, #fb923c)' : 'var(--red, #f87171)')}; transition: width 0.4s ease;"></div>
              </div>
              <div style="font-size: 11px; color: var(--text-dim);" id="valPlayerHp">${player.currentHp}/${player.maxHp} HP</div>
            </div>

            <!-- VS Badge -->
            <div style="text-align: center;">
              <div style="font-size: 22px; font-weight: 800; color: var(--gold); letter-spacing: 2px;">VS</div>
              <div style="font-size: 11px; color: #a992c7; font-weight: 600; margin-top: 4px;">+${r.glitchEvents?.length ? r.glitchEvents.length * 5 : 0} Thấu Triệt</div>
            </div>

            <!-- Monster Card -->
            <div class="fighter-card" id="cardMonster" style="background: rgba(15,23,42,0.85); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 14px; text-align: center; position: relative;">
              <div style="font-size: 36px; margin-bottom: 6px;">${m.icon || '👾'}</div>
              <div style="font-weight: bold; color: var(--red, #f87171); font-size: 15px; margin-bottom: 2px;">${m.name || 'Yêu Thú'}</div>
              <div style="font-size: 11px; color: var(--text-dim); margin-bottom: 8px;">Lv.${m.level || 1} · ${m.element || 'Kim'}</div>
              <div style="background: rgba(0,0,0,0.5); border-radius: 4px; height: 10px; overflow: hidden; margin-bottom: 4px;">
                <div id="barMonsterHp" style="width: ${mHp}%; height: 100%; background: ${mHp > 50 ? 'var(--red, #f87171)' : 'var(--orange, #fb923c)'}; transition: width 0.4s ease;"></div>
              </div>
              <div style="font-size: 11px; color: var(--text-dim);" id="valMonsterHp">${m.currentHp}/${m.maxHp} HP</div>

              <!-- Glitch Weakpoint Badge -->
              ${r.weakpoint ? `
                <div class="glitch-weakpoint-badge" style="margin-top: 8px; font-size: 11px; background: rgba(168,85,247,0.2); border: 1px solid #c084fc; color: #e9d5ff; border-radius: 12px; padding: 2px 8px; display: inline-block;">
                  🌌 Vết Nứt: <strong>${r.weakpoint}</strong> (x2.5 Dmg)
                </div>
              ` : ''}
            </div>

          </div>
        </div>

        <!-- MDG Standard: Categorized Loot Drop Panel -->
        ${r.rewards?.lootItems?.length ? `
          <div class="panel-body" style="background: rgba(15, 23, 42, 0.95); border-top: 1px solid rgba(255,255,255,0.1); padding: 12px 16px;">
            <div style="font-size: 12px; font-weight: 700; color: var(--gold, #facc15); text-transform: uppercase; margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between;">
              <span style="display:flex; align-items:center; gap:6px">🎁 CHIẾN LỢI PHẨM THU ĐƯỢC</span>
              <span class="badge" style="background:rgba(234,179,8,0.2); color:#facc15; font-size:10px">${r.rewards.lootItems.length} MÓN</span>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 8px;">
              ${r.rewards.lootItems.map(item => `
                <div style="background: rgba(255,255,255,0.04); border: 1px solid ${item.color || 'rgba(255,255,255,0.15)'}; border-radius: 6px; padding: 8px 10px; display: flex; align-items: center; gap: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.3)">
                  <div style="font-size: 22px;">${item.icon || '📦'}</div>
                  <div style="flex: 1; overflow: hidden;">
                    <div style="font-weight: 700; font-size: 13px; color: ${item.color || 'var(--text-bright)'}; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">
                      ${item.name} ${item.quantity > 1 ? `<span style="opacity:0.8">x${item.quantity}</span>` : ''}
                    </div>
                    <div style="font-size: 10px; opacity: 0.8; text-transform: uppercase;">
                      ${item.isPending ? '<span style="color:#f87171; font-weight:700">⚠️ Rơi xuống đất (Túi đầy)</span>' : (item.rarity || item.type)}
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- PENDING LOOT DECISION CARD (Khi túi đồ đầy) -->
        ${pendingItem ? `
          <div class="pending-loot-panel" style="background: rgba(30, 27, 75, 0.45); border-top: 1px solid rgba(239, 68, 68, 0.4); border-bottom: 1px solid rgba(239, 68, 68, 0.4); padding: 14px 16px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; flex-wrap:wrap; gap:8px">
              <div style="display:flex; align-items:center; gap:8px">
                <span style="font-size:22px">⚠️</span>
                <div>
                  <div style="font-weight:700; color:#f87171; font-size:13.5px">
                    CÀN KHÔN TÚI ĐÃ ĐẦY (${(p.inventory || []).length}/${p.maxInventorySize || 20})!
                  </div>
                  <div style="font-size:11px; color:var(--text-dim)">
                    Pháp bảo rơi trên đất. Bạn có thể hoán đổi với một món đồ trong túi hoặc bỏ qua.
                  </div>
                </div>
              </div>
              <span class="badge" style="background:rgba(239,68,68,0.15); color:#f87171; border:1px solid rgba(239,68,68,0.3); font-size:10.5px">
                Cần Xử Lý
              </span>
            </div>

            <!-- Pending Item Info -->
            <div style="background:rgba(0,0,0,0.35); border:1px solid rgba(255,255,255,0.1); border-radius:8px; padding:10px 14px; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px">
              <div style="display:flex; align-items:center; gap:10px">
                <div style="font-size:28px; width:44px; height:44px; display:flex; align-items:center; justify-content:center; background:rgba(255,255,255,0.05); border-radius:6px">
                  ${pendingItem.category === 'manual' ? '📜' : (pendingItem.slot === 'weapon' ? '⚔️' : (pendingItem.slot === 'feet' ? '👢' : (pendingItem.slot === 'ring' ? '💍' : '🛡️')))}
                </div>
                <div>
                  <div style="font-size:13.5px; font-weight:700" class="rarity-${pendingItem.rarity || 'common'}">
                    ${pendingItem.name} <span style="font-size:10.5px; opacity:0.8">[${(pendingItem.rarity || 'common').toUpperCase()}]</span>
                  </div>
                  <div style="font-size:11px; color:var(--text-dim)">
                    Cấp: Lv.${pendingItem.itemLevel || 1} · Loại: ${pendingItem.baseType || pendingItem.slot || 'Pháp bảo'}
                  </div>
                  ${(pendingItem.affixes || []).length > 0 ? `
                    <div style="font-size:11px; color:#60a5fa; margin-top:2px">
                      📜 ${pendingItem.affixes.map(a => fmtAffix(a)).join(' · ')}
                    </div>
                  ` : ''}
                </div>
              </div>

              <!-- Action buttons -->
              <div style="display:flex; gap:6px; align-items:center; flex-wrap:wrap">
                ${(p.inventory || []).length < (p.maxInventorySize || 20) ? `
                  <button class="btn btn--green btn--sm btn-claim-pending">
                    📥 Thu Nạp
                  </button>
                ` : ''}
                <button class="btn btn--gold btn--sm btn-toggle-swap">
                  🔄 Bỏ Đồ Trong Túi Để Chứa
                </button>
                <button class="btn btn--danger btn--sm btn-discard-loot">
                  🚪 Bỏ Qua Món Này
                </button>
              </div>
            </div>

            <!-- Expandable Inventory Swap Picker -->
            <div id="swapItemPicker" style="display:none; background:rgba(0,0,0,0.5); border:1px solid rgba(255,255,255,0.12); border-radius:8px; padding:12px; margin-top:8px">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px">
                <span style="font-size:11.5px; font-weight:700; color:var(--gold, #facc15)">
                  📦 Nhấp chọn món đồ trong túi bạn muốn vứt bỏ:
                </span>
                <span style="font-size:10.5px; color:var(--text-dim)">${(p.inventory || []).length} món trong túi</span>
              </div>
              <div style="max-height:220px; overflow-y:auto; display:flex; flex-direction:column; gap:5px; padding-right:4px">
                ${(p.inventory || []).map((invItem) => `
                  <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:6px; padding:6px 10px; font-size:11.5px">
                    <div>
                      <span class="rarity-${invItem.rarity || 'common'}" style="font-weight:600">${invItem.name}</span>
                      <span style="font-size:10px; opacity:0.5; margin-left:6px">[Lv.${invItem.itemLevel || 1} ${(invItem.rarity || 'common').toUpperCase()}]</span>
                      ${(invItem.affixes || []).length > 0 ? `<span style="font-size:10px; color:#60a5fa; margin-left:6px">(${invItem.affixes.length} phù văn)</span>` : ''}
                    </div>
                    <button class="btn btn--xs btn--danger btn-confirm-swap" data-swap-id="${invItem.id}" data-item-name="${invItem.name}" style="padding:2px 8px; font-size:10.5px">
                      Vứt Món Này & Nhặt Mới
                    </button>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        ` : ''}

        <!-- Combat Log -->
        <div class="panel-body no-pad" style="border-top: 1px solid var(--border, rgba(255,255,255,0.1));">
          <div style="padding: 8px 16px; background: rgba(0,0,0,0.2); font-size: 11px; color: var(--text-dim); text-transform: uppercase; font-weight: 600;">
            📜 Nhật Ký Quyết Đấu Chi Tiết
          </div>
          <div class="combat-log" style="max-height: 250px; overflow-y: auto; padding: 12px 16px;">
            ${renderCombatLogLines(r.log)}
          </div>
        </div>
      </div>
    `
  }

  bindEvents() {
    this.on('click', '.btn-toggle-swap', () => {
      const picker = this.container.querySelector('#swapItemPicker')
      if (picker) {
        picker.style.display = picker.style.display === 'none' ? 'block' : 'none'
      }
    })

    this.on('click', '.btn-confirm-swap', async (e, target) => {
      const discardId = target.dataset.swapId
      const itemName = target.dataset.itemName || 'vật phẩm này'
      const { ctx, combatData = {} } = this.props
      if (!ctx) return
      const p = ctx.state?.player || this.props.player
      const pendingItem = combatData.pendingLoot || p?.pendingLoot

      if (!confirm(`Bạn có chắc chắn muốn vứt bỏ [${itemName}] để nhặt [${pendingItem?.name}] không?`)) {
        return
      }

      target.disabled = true
      target.textContent = '⏳...'

      try {
        const res = await ctx.api.resolveLoot(ctx.state.playerId, 'swap', discardId, pendingItem)
        ctx.notify(res.message, 'success')
        ctx.state.player = res.player
        combatData.pendingLoot = null
        if (ctx.updateSidebar) ctx.updateSidebar()
        this.update()
      } catch (err) {
        ctx.notify(err.message || 'Lỗi hoán đổi vật phẩm', 'error')
        target.disabled = false
        target.textContent = 'Vứt Món Này & Nhặt Mới'
      }
    })

    this.on('click', '.btn-discard-loot', async (e, target) => {
      const { ctx, combatData = {} } = this.props
      if (!ctx) return
      if (!confirm('Bạn có chắc chắn muốn bỏ qua chiến lợi phẩm này không? Nó sẽ biến mất vĩnh viễn.')) {
        return
      }
      target.disabled = true
      target.textContent = '⏳...'

      try {
        const res = await ctx.api.resolveLoot(ctx.state.playerId, 'discard_loot')
        ctx.notify(res.message, 'info')
        ctx.state.player = res.player
        combatData.pendingLoot = null
        if (ctx.updateSidebar) ctx.updateSidebar()
        this.update()
      } catch (err) {
        ctx.notify(err.message || 'Lỗi bỏ qua chiến lợi phẩm', 'error')
        target.disabled = false
        target.textContent = '🚪 Bỏ Qua Món Này'
      }
    })

    this.on('click', '.btn-claim-pending', async (e, target) => {
      const { ctx, combatData = {} } = this.props
      if (!ctx) return
      const p = ctx.state?.player || this.props.player
      const pendingItem = combatData.pendingLoot || p?.pendingLoot

      target.disabled = true
      target.textContent = '⏳...'

      try {
        const res = await ctx.api.resolveLoot(ctx.state.playerId, 'claim', null, pendingItem)
        ctx.notify(res.message, 'success')
        ctx.state.player = res.player
        combatData.pendingLoot = null
        if (ctx.updateSidebar) ctx.updateSidebar()
        this.update()
      } catch (err) {
        ctx.notify(err.message || 'Lỗi thu nạp vật phẩm', 'error')
        target.disabled = false
        target.textContent = '📥 Thu Nạp'
      }
    })
  }

  onMounted() {
    const { combatData = {} } = this.props
    const cardMonster = this.container.querySelector('#cardMonster')
    const m = combatData.monster || {}

    if (combatData.glitchEvents && combatData.glitchEvents.length > 0 && cardMonster) {
      combatData.glitchEvents.forEach((ev, idx) => {
        this.setTimeout(() => {
          spawnFloatingDamage(cardMonster, `-${ev.damage} 🌌 [VẾT NỨT]`, 'glitch')
          cardMonster.classList.add('shake')
          this.setTimeout(() => cardMonster.classList.remove('shake'), 400)
        }, idx * 400 + 200)
      })
    } else if (cardMonster && combatData.rewards) {
      spawnFloatingDamage(cardMonster, `-${Math.round((m.maxHp || 100) * 0.4)} 💥`, 'crit')
    }
  }
}
