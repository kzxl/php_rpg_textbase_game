/**
 * Alchemy Page — Backward-compatible bridge to modular LiteUI Alchemy Component Architecture.
 */
import { AlchemyPage } from './alchemy/index.js'

export * from './alchemy/index.js'

let _activeAlchemyInstance = null

export async function pageAlchemy(el, ctx) {
  if (_activeAlchemyInstance) {
    _activeAlchemyInstance.unmount()
    _activeAlchemyInstance = null
  }

  _activeAlchemyInstance = new AlchemyPage({ ctx })
  _activeAlchemyInstance.mount(el)
}
