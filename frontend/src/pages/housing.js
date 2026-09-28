/**
 * Housing Page — Backward-compatible bridge to modular LiteUI Housing Component Architecture.
 */
import { HousingPage } from './housing/index.js'

export * from './housing/index.js'

let _activeHousingInstance = null

export async function pageHousing(el, ctx) {
  if (_activeHousingInstance) {
    _activeHousingInstance.unmount()
    _activeHousingInstance = null
  }

  _activeHousingInstance = new HousingPage({ ctx })
  _activeHousingInstance.mount(el)
}
