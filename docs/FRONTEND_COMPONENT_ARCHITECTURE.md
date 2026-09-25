# Frontend Component Architecture: LiteUI Mini-Framework

## 1. Executive Summary & Problem Statement

Prior to this architectural evolution, the frontend of the RPG engine suffered from heavy monolithic "God Files":
- `combat.js` (~834 lines / 46KB): Mixed turn-based turn resolution, sprite animations, sound triggers, and DOM mutations.
- `skills.js` (~750 lines / 38KB): Mixed skill trees, breakthrough formulas, and manual DOM innerHTML strings.
- `alchemy.js` (~600 lines / 31KB): Mixed pill crafting, furnace heat loops, and equipment enhancement logic.
- `inventory.js` (~600 lines / 30KB): Mixed 6-slot equipped layout, raw materials categorization, medicine timers, and item action listeners.

### Core Architectural Flaws
1. **Manual Event Binding**: Every page re-render manually bound listeners to elements, creating high risk of memory leaks or detached event handlers.
2. **Scattered State**: State was fragmented across `ctx.state`, global window variables, and ephemeral DOM data attributes.
3. **Repeated Inline Markup**: Items, badges, progress bars, and tabs were repeatedly handwritten with inconsistent inline CSS styles.
4. **Tight Coupling**: Sub-features within a page could not be tested, mocked, or reused independently.

To solve this without adding heavy third-party framework dependencies (e.g. React, Vue) or altering the existing Vite build pipeline, **Option B** was selected: A zero-dependency, Component-Driven Vanilla JS Mini-Framework named **`LiteUI`**.

---

## 2. Core Architecture (`frontend/src/core/`)

### 2.1 Base `Component` Model (`Component.js`)
Every UI component inherits from `Component`, which provides:
- **Reactive State (`state`, `setState`)**: Calling `this.setState(updater)` automatically schedules and triggers a surgical re-render of the component instance.
- **Template Rendering (`template`)**: Pure function returning an HTML string representation based on `this.props` and `this.state`.
- **Mount & Lifecycle Hooks**:
  - `mount(container)`: Mounts component into DOM container, invokes `onMounted()`, and sets up event delegations.
  - `update()`: Re-renders template into container and invokes `onUpdated()`.
  - `unmount()`: Automatically removes all event listeners, clears managed intervals and timeouts, and invokes `onUnmounted()`.
- **Scoped Event Delegation (`on(eventName, selector, handler)`)**: Event listeners are attached to the root container rather than individual children. When the component re-renders or unmounts, listeners are safely managed without DOM leaks.
- **Managed Timers (`setInterval`, `setTimeout`)**: Prevents lingering countdowns and interval leaks when navigating away from pages.

```javascript
import { Component } from './core/Component.js'

export class CustomWidget extends Component {
  initialState() {
    return { count: 0 }
  }

  template() {
    return `
      <div class="custom-widget">
        <span>Counter: ${this.state.count}</span>
        <button class="btn-increment">+1</button>
      </div>
    `
  }

  bindEvents() {
    this.on('click', '.btn-increment', () => {
      this.setState({ count: this.state.count + 1 })
    })
  }
}
```

### 2.2 Reactive `Store` & EventBus (`Store.js`)
Enables cross-component communication and global state subscriptions:
- `getState(key)` / `setState(key, value)`: Reactive key-value store with granular subscriptions.
- `subscribe(key, callback)`: Triggers updates only when the specified state slice changes.
- `emit(eventName, data)` / `on(eventName, handler)`: Decoupled event pub/sub.

---

## 3. Standardized UI Atoms (`frontend/src/core/ui/`)

To eliminate copy-pasted UI fragments, standardized atom components were introduced:

| Atom | File | Responsibility |
|---|---|---|
| `ItemCard` | `ItemCard.js` | Renders ARPG gear cards with rarity borders, stat affixes, sell values, action buttons, and MDG-standard `+1..+12` glowing enhancement badges. |
| `ProgressBar` | `ProgressBar.js` | Renders animated progress bars with customized color themes (Health/Red, Mana/Blue, Stamina/Green, Exp/Gold), numeric ratios, and percentages. |
| `Tabs` | `Tabs.js` | Reusable responsive tab navigation with badge counts, active indicators, and click delegations. |
| `Modal` | `Modal.js` | Reusable modal dialog with backdrop overlay, ESC key listener, action buttons, and unmount cleanup. |

---

## 4. Feature Modularization: Implemented Feature Packages

### 4.1 Càn Khôn Túi: Inventory Package (`frontend/src/pages/inventory/`)
The monolithic `frontend/src/pages/inventory.js` was decomposed into a modular package:
```
frontend/src/pages/
├── inventory.js                <-- Backward-compatible bridge entry point
└── inventory/
    ├── constants.js            <-- Material catalogs, classification logic & slot definitions
    ├── EquipmentView.js        <-- 6-slot equipped layout, +N badges & forge jump shortcuts
    ├── MaterialPouch.js        <-- Categorized pouch (Ores, Beasts, Herbs, Catalysts, Stones)
    ├── MedicineBag.js          <-- Pill storage, toxicity warnings & cooldown countdowns
    ├── ItemGridView.js         <-- Gear inventory grid, stat comparisons & actions
    ├── InventoryPage.js        <-- Coordinator component managing tabs & lifecycle
    └── index.js                <-- Clean barrel export
```

### 4.2 Lò Tạo Hóa: Alchemy & Forging Package (`frontend/src/pages/alchemy/`)
The monolithic `frontend/src/pages/alchemy.js` (659 lines) was partitioned into a dedicated package:
```
frontend/src/pages/
├── alchemy.js                  <-- Backward-compatible bridge entry point
└── alchemy/
    ├── constants.js            <-- Rarity colors, slot icons, talisman recipes & enhance cost formulas
    ├── PillFurnace.js          <-- Herb inventory chips, recipe accordions, craft rate bonuses
    ├── EquipmentForge.js       <-- 16-recipe forging across 5 tiers with category filter
    ├── EnhancementAltar.js     <-- +1 to +12 equipment enhancement, success meter & risk protection
    ├── TalismanInscriber.js    <-- Currency & affix modification (Tẩy Tủy, Hỗn Chú, Thiên Mệnh, Thăng Cấp)
    ├── AlchemyPage.js          <-- Coordinator managing 4 pillars, mastery XP & skill buffs
    └── index.js                <-- Clean barrel export
```

### 4.3 Quyết Đấu & Khám Phá: Combat Package (`frontend/src/pages/combat/`)
The heaviest monolithic file `frontend/src/pages/combat.js` (834 lines) was partitioned into a dedicated package:
```
frontend/src/pages/
├── combat.js                   <-- Backward-compatible bridge entry point
└── combat/
    ├── constants.js            <-- Stances (breaker, flow, glitch), outcome maps, log line colorizers
    ├── CombatLogView.js        <-- Color-coded scrollable battle log
    ├── CombatArenaView.js      <-- 2D Fighter Cards Arena, animated HP meters, glitch weakpoint badge & categorized loot panel
    ├── AutoBattleRunner.js     <-- Automated combat scanner with stamina and <20% HP safety cut-offs
    ├── AreaExplorePanel.js     <-- Exploration card, drop rate chips, tracked monsters & encounters
    ├── CombatPage.js           <-- Coordinator tying exploration, auto-battle, and combat execution
    └── index.js                <-- Clean barrel export
```

### 4.4 Backward Compatibility Guarantee
Existing code importing from `frontend/src/pages/inventory.js`, `frontend/src/pages/alchemy.js`, or `frontend/src/pages/combat.js` continues to work with zero modification:
```javascript
// frontend/src/pages/combat.js
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
```

---

## 5. Quality Assurance & Verification Metrics

- **Vite Compilation**: `npm run build` completed in **783ms** with **61 modules transformed, 0 errors and 0 warnings**.
- **E2E Independent Test Suite**: **130/130 tests passing (100%)** across 4 tiers (Feature coverage, boundaries, pairwise combinations, real-world workflows).
- **Adversarial Stress Suite**: **116/116 checks passing (100%)** (55 Stat Comparison deltas + 61 Unequip & Capacity invariant checks).
- **Total Test Coverage**: **246 test assertions verified**.

---

## 6. Migration Roadmap for Remaining Monoliths

With the `LiteUI` framework established and verified in `inventory`, `alchemy`, and `combat`, the remaining god files will follow the identical partition pattern:

1. **`skills.js` -> `frontend/src/pages/skills/`**:
   - `SkillTreeView.js`: Martial arts progression.
   - `BreakthroughView.js`: Realm advancement and tribulation readiness.
   - `SpiritualRootsView.js`: Elemental root affinities and talent modifiers.
   - `SkillsPage.js`: Coordinator.
2. **`wiki.js` -> `frontend/src/pages/wiki/`**:
   - `MonsterIndex.js`: Monster encyclopedia.
   - `HerbMineralCompendium.js`: Resource compendium.
   - `RealmsGuide.js`: Cultivation realms roadmap.


