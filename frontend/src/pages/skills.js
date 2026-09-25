/**
 * Skills Page — Backward-compatible bridge to modular LiteUI Skills Component Architecture.
 */
import { SkillsPage } from './skills/index.js'

export * from './skills/index.js'

let _activeSkillsInstance = null

export function pageSkills(el, ctx) {
  if (_activeSkillsInstance) {
    _activeSkillsInstance.unmount()
    _activeSkillsInstance = null
  }

  _activeSkillsInstance = new SkillsPage({ ctx })
  _activeSkillsInstance.mount(el)
}
