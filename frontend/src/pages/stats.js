/**
 * Stats Page — Backward-compatible bridge to modular LiteUI Stats/Cultivation Component Architecture.
 */
import { StatsPage } from './stats/index.js'

export * from './stats/index.js'

let _activeStatsInstance = null

export async function pageStats(el, ctx) {
  if (_activeStatsInstance) {
    _activeStatsInstance.unmount()
    _activeStatsInstance = null
  }

  _activeStatsInstance = new StatsPage({ ctx })
  _activeStatsInstance.mount(el)
}
