/**
 * Inventory Page — Backward-compatible bridge to modular LiteUI Inventory Component Architecture.
 */
import { InventoryPage, MATERIAL_FALLBACK_MAP, classifyMaterial } from './inventory/index.js'

export { MATERIAL_FALLBACK_MAP, classifyMaterial }

let _activeInventoryInstance = null

export function pageInventory(el, ctx) {
  window.__rpgContext = ctx

  // Runtime API bindings if missing
  if (ctx?.api && !ctx.api.unequipItem) {
    ctx.api.unequipItem = (id, slot) => ctx.api.request(`/player/${id}/unequip`, {
      method: 'POST',
      body: JSON.stringify({ slot })
    })
  }
  if (ctx?.api && !ctx.api.getMaterials) {
    ctx.api.getMaterials = () => ctx.api.request('/data/materials')
  }

  // Cleanup prior active instance to prevent memory leaks
  if (_activeInventoryInstance) {
    _activeInventoryInstance.unmount()
    _activeInventoryInstance = null
  }

  _activeInventoryInstance = new InventoryPage({ ctx })
  _activeInventoryInstance.mount(el)
}
