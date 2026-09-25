# Test Infrastructure & Specification Document (TEST_INFRA.md)
**Project**: Nghịch Thiên Ký RPG Engine  
**Track**: Opaque-Box E2E Testing Suite (Requirements R1 through R5)  
**Document Version**: 1.0.0  
**Status**: APPROVED & ACTIVE  

---

## 1. Executive Summary & Testing Philosophy

This document defines the architectural specification, formal verification methodology, and execution framework for the **Nghịch Thiên Ký RPG Engine Opaque-Box E2E Test Suite**.

The primary objective is to validate all functional, mathematical, interface, and regression requirements spanning Milestones M1 through M5 (Requirements R1 through R5) independently of frontend rendering quirks and without requiring external database or web server daemons.

The test suite implements a rigorous **4-Tier Verification Architecture**:
1. **Tier 1 — Category-Partition Feature Coverage**: Systematic partitioning of inputs and state domains into equivalence classes, ensuring $\ge 5$ deterministic test cases for each of Features 1 through 11 (minimum 55 unit/feature tests).
2. **Tier 2 — Boundary Value Analysis (BVA) & Corner Cases**: Stress-testing parameter edges, integer overflows, down-rank penalties, zero/negative balances, mitigation asymptotes, and realm caps ($\ge 5$ boundary tests per feature).
3. **Tier 3 — Pairwise Combinatorial Testing**: Orthogonal combinatorial arrays verifying multi-system interactions (e.g., enhanced equipment equipped during arena duels with stamina-trained player stats in high-scaling secret realms).
4. **Tier 4 — Real-World Workload Testing**: Multi-step holistic gameplay journeys simulating authentic user workflows from novice onboarding through high-tier cultivation, forge mastery, and apex realm conquests ($\ge 5$ extensive scenarios).

---

## 2. Feature Verification Matrix

| # | Feature Key | Requirement Scope | Primary Systems & Models | Verification Strategy |
|---|---|---|---|---|
| **F1** | Material Pouch Tab & Categorization | R1 (§1) | `materials.json`, `inventory.js`, `p.materials` | Equivalence classes across 5 material categories, count validations, and rarity badges. |
| **F2** | Enhancement Badges (+1 to +12) | R1 (§2) | `FORGING_SPEC §3`, `alchemy.js`, `helpers.js` | 4-tier visual badges, glowing CSS classes, and exact stat scaling formulas across all equipment types. |
| **F3** | Forge Shortcuts, Stat Deltas & Unequip | R1 (§3) | `inventory.js`, `helpers.js`, `Player::unequipItem` | State navigation jump triggers, equipment differential delta arithmetic (`▲`/`▼`), and slot unequip transactions. |
| **F4** | Physical Gym Stamina Alignment | R2 (§1) | `stats.js`, `gym.js`, `Player::trainStat` | Strict Thể Lực (`currentStamina`) deduction (-5/train), rejection on stamina deficiency, and non-depletion of Linh Lực (`currentEnergy`). |
| **F5** | Armor Mitigation Curves & Evasion | R2 (§2) | `StatEngine.php`, `stats.js` | Authoritative MDG asymptotic curve matching for Low (25), Medium (75), and Boss (250) strikes; Dexterity dodge probabilities. |
| **F6** | Cultivation Breakthrough & Tribulation | R2 (§3) | `RealmSystem.php`, `TribulationModal.js`, `stats.js` | Level/gold/energy precondition checklist, Qi shield buffer metrics, protective aura checks, and talent multipliers. |
| **F7** | Arena Opponent Cards & Win Odds | R3 (§1) | `Arena/routes.php`, `arena.js` | 7-tier rank insignias, ELO ratings, level deltas, and Elo logistic probability curve ($P(\text{win})$). |
| **F8** | Win Streaks & Duel Combat Logs | R3 (§2) | `pvp_history`, `arena.js` | Streak fire badges (`🔥 Chuỗi`), multiplier incentives ($1.5\times$ ELO, $+50\%$ gold), and structured JSON fight logs. |
| **F9** | Secret Realm Archetype Distinction | R4 (§1) | `SecretRealmRegistry.php`, `dungeon.js` | Ephemeral ⏳ Huyễn Cảnh (countdown timer, auto-expiry, $1.1\times-1.4\times$) vs Permanent 🔱 Thượng Cổ Cấm Địa ($2.2\times-3.5\times$, Cuồng Bạo). |
| **F10** | Zone Guidance & Realm Modifiers | R4 (§2) | `exploration.json`, `Player.php`, `travel.js` | 18 canonical world zones, cultivation level floors, travel times, environmental buff/debuff mapping, and signature resource yields. |
| **F11** | Non-Breaking Architecture & Build | R5 | `vite.config.js`, `package.json`, CSS System | Clean `npm run build` execution with exit code 0, backward compatible state schemas, and zero route regressions. |

---

## 3. Mathematical & Algorithmic Oracles

### 3.1 Equipment Enhancement Stat Scaling
Given enhancement level $L \in [1, 12]$ and item level $\text{iLvl}$:
* **Weapon** ($\text{Strength}$):
  $$\text{Strength}(L, \text{iLvl}) = \max\left(4L, \; \text{round}\left(4L \times \left\lfloor\frac{\text{iLvl}}{3}\right\rfloor\right)\right)$$
* **Armor & Shield** (`body`, `shield`):
  $$\text{Defense}(L, \text{iLvl}) = \max\left(3L, \; \text{round}\left(3L \times \left\lfloor\frac{\text{iLvl}}{3}\right\rfloor\right)\right)$$
  $$\text{MaxHP}(L, \text{iLvl}) = 30L \times \max\left(1, \left\lfloor\frac{\text{iLvl}}{3}\right\rfloor\right)$$
* **Boots** (`feet`):
  $$\text{Speed}(L, \text{iLvl}) = \max\left(2L, \; \text{round}\left(3L \times \left\lfloor\frac{\text{iLvl}}{3}\right\rfloor\right)\right)$$
  $$\text{Dexterity}(L, \text{iLvl}) = \max\left(1L, \; \text{round}\left(\text{Speed} \times 0.6\right)\right)$$
* **Rings & Accessories** (`ring`, `accessory`):
  $$\text{Strength \& Dexterity}(L, \text{iLvl}) = \max\left(2L, \; \text{round}\left(2L \times \left\lfloor\frac{\text{iLvl}}{3}\right\rfloor\right)\right)$$

### 3.2 Physical Armor Mitigation Curve
Given player physical defense $\text{Def}$ and incoming raw damage $D_{\text{raw}} \in \{25, 75, 250\}$:
$$\text{Mitigation } (\%) = \min\left(85.0, \; \text{round}\left(\frac{\text{Def}}{\text{Def} + 5.0 \times D_{\text{raw}}} \times 100, 2\right)\right)$$
* Low-Tier Strike ($D_{\text{raw}} = 25$): $\text{Denominator} = \text{Def} + 125$
* Medium-Tier Strike ($D_{\text{raw}} = 75$): $\text{Denominator} = \text{Def} + 375$
* Boss-Tier Strike ($D_{\text{raw}} = 250$): $\text{Denominator} = \text{Def} + 1250$

### 3.3 Evasion Dexterity Probability
Given player dexterity $\text{Dex}$ and opponent combat speed $V_{\text{opp}}$:
$$\text{Dodge } (\%) = \min\left(35.0, \; \text{round}\left(\frac{\text{Dex}}{\text{Dex} + 2.5 \times V_{\text{opp}}} \times 100, 2\right)\right)$$
* Slow Opponent ($V_{\text{opp}} = 0.5 \times \text{Dex}$): Capped at $35.0\%$
* Equal Speed Opponent ($V_{\text{opp}} = 1.0 \times \text{Dex}$): $\text{Dodge} = \frac{1}{3.5} \times 100 \approx 28.57\%$
* Fast Opponent ($V_{\text{opp}} = 2.0 \times \text{Dex}$): $\text{Dodge} = \frac{1}{6.0} \times 100 \approx 16.67\%$

### 3.4 Arena Elo Win/Loss Probability
Given player rating $R_{\text{me}}$ and opponent rating $R_{\text{opp}}$:
$$P(\text{win}) = \text{round}\left(\frac{1}{1 + 10^{(R_{\text{opp}} - R_{\text{me}}) / 400}} \times 100, 1\right)$$
Categorization:
* $P(\text{win}) \ge 65.0\%$: Kèo Trên (`🟢`)
* $45.0\% \le P(\text{win}) < 65.0\%$: Cân Tài (`⚖️`)
* $P(\text{win}) < 45.0\%$: Kèo Dưới (`⚠️`)

---

## 4. Test Suite Structure & Organization

```
tests/e2e/
├── run_tests.js                 # Central Test Runner CLI & Summary Generator
├── framework/
│   ├── assert.js                # Assertion Engine (eq, deepEq, throws, match, between)
│   ├── test_runner.js           # Suite Lifecycle (describe, it, before/after hooks)
│   └── harness.js               # State & Environment Simulation Harness
├── fixtures/
│   ├── player_fixtures.js       # Player Archetypes (Novice, Mid-tier, End-game)
│   ├── materials_fixtures.js    # Catalog of Ores, Beast Parts, Herbs, Catalysts
│   ├── equipment_fixtures.js    # Weapons, Armors, Rings with Enhanced Affixes
│   ├── arena_fixtures.js        # Opponents across 7 Ranks, Win Streaks, Fight Logs
│   └── realms_fixtures.js       # 18 Map Realms, Secret Dungeons, Timed Rifts
└── suites/
    ├── tier1_feature_coverage.test.js      # Tier 1: >= 5 Tests per Feature (55+ Tests)
    ├── tier2_boundary_corner.test.js       # Tier 2: Boundary Value Analysis (55+ Tests)
    ├── tier3_pairwise_combinatorial.test.js # Tier 3: Cross-Feature Interactions
    └── tier4_real_world_scenarios.test.js  # Tier 4: Comprehensive Gameplay Journeys
```

---

## 5. Execution & Verification Instructions

### 5.1 Standalone Test Runner Invocation
The test runner is completely self-contained within Node.js (requires no external npm dependencies or running servers):
```bash
node tests/e2e/run_tests.js
```

### 5.2 Build Verification
To verify frontend compilation integrity conforming to R5:
```bash
cd frontend && npm run build
```

### 5.3 Acceptance Criteria Thresholds
* **Total Executed Tests**: $\ge 120$ test assertions across Tiers 1–4.
* **Pass Rate**: $100\%$ zero failed tests.
* **Execution Time**: $< 5$ seconds for instantaneous CI feedback.
* **Frontend Compilation**: Exit code 0, 0 compiler diagnostics.
