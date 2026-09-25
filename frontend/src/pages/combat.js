/**
 * Combat Page — Backward-compatible bridge to modular LiteUI Combat Component Architecture.
 */
import { CombatPage } from './combat/index.js'

export * from './combat/index.js'

let _activeCombatInstance = null

export function pageCombat(el, ctx) {
  if (_activeCombatInstance) {
    _activeCombatInstance.unmount()
    _activeCombatInstance = null
  }

  _activeCombatInstance = new CombatPage({ ctx })
  _activeCombatInstance.mount(el)
}
