# Project: Nghịch Thiên Ký RPG Engine - Core Gameplay UI Overhaul

## Architecture
Nghịch Thiên Ký RPG Engine utilizes a decoupled architecture:
- **Frontend**: Vanilla JS (ES Modules) bundled via Vite. Centralized state in `main.js`, with per-page renderer functions in `frontend/src/pages/`. Custom Dark Fantasy Xianxia design system in `frontend/src/style.css`.
- **Backend**: Lightweight PHP REST API with modular features in `backend/src/Features/`, domain models in `backend/src/Models/`, static data in `backend/data/`, and core engines in `backend/src/Core/`.
- **Data Flow**: Frontend pages communicate via `api.js` (`fetch` wrapper) to backend JSON endpoints. Player state is synchronized in `state.player` and reflected in both the main view and the sidebar HUD (`updateSidebar()`).

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Kho Nguyên Liệu & Khoáng Thạch Pouch Tab | Dedicated `material` tab in Càn Khôn Túi with category filters (Khoáng Thạch, Yêu Thú, Linh Dược, Linh Tinh, Đá Cường Hóa) and accurate counts | M1 | ORIGINAL_REQUEST §R1 |
| 2 | Trang Bị & Cường Hóa (+N) Feedback | 4-tier visual enhancement badges (+1..+12) with rarity-tiered colors and glowing borders across equipped slots and inventory grid | M1 | ORIGINAL_REQUEST §R1 |
| 3 | Tương Tác Nhanh & Lò Tạo Hóa Shortcut | Quick navigation shortcut `⚒️ Cường Hóa` directly to enhancement anvil in alchemy.js, unequip action, and delta stat comparison tooltips | M1 | ORIGINAL_REQUEST §R1 |
| 4 | Phân Định Tài Nguyên Thể Lực | Align physical gym training labels, stamina checks, and consumption strictly with Thể Lực (currentStamina) instead of Linh Lực | M2 | ORIGINAL_REQUEST §R2 |
| 5 | Phân Tích Phòng Thủ Chuyên Sâu | Interactive physical armor mitigation curves (% reduction for Low 25, Medium 75, Boss 250 strikes) and evasion dexterity probabilities conforming to MDG standards | M2 | ORIGINAL_REQUEST §R2 |
| 6 | Trực Quan Hóa Tiến Trình Cảnh Giới | Breakthrough condition checklist, tribulation readiness metrics (HP buffer, Qi shield, protective auras, pills), and talent multipliers | M2 | ORIGINAL_REQUEST §R2 |
| 7 | Thẻ Bài Đối Thủ Luận Đạo Đấu Trường | Transform flat opponent list into modern card-styled challenges with 7-tier Rank insignias, ELO ratings, level deltas, and win/loss odds meters | M3 | ORIGINAL_REQUEST §R3 |
| 8 | Chiến Tích, Chuỗi Thắng & Combat Logs | Tiered Streak Fire badges (`🔥 Chuỗi`) and collapsible, color-coded duel combat logs persisted in pvp_history | M3 | ORIGINAL_REQUEST §R3 |
| 9 | Phân Biệt Bí Cảnh & Huyễn Cảnh | Visually differentiate ⏳ Huyễn Cảnh (timed countdown rifts with purple celestial styling) from 🔱 Thượng Cổ Cấm Địa (permanent apex danger zones with crimson volcanic styling) | M4 | ORIGINAL_REQUEST §R4 |
| 10 | Chỉ Dẫn Khu Vực & Modifier Bản Đồ | Cultivation realm requirements, color-coded environmental buffs/debuffs, and specialty raw material drop badges across all 18 world realms | M4 | ORIGINAL_REQUEST §R4 |
| 11 | Non-Breaking Architecture & Styling Fidelity | Zero regressions in routing/HUD, 100% backward compatible save states and DB schemas, Vite build exiting 0 | M5 | ORIGINAL_REQUEST §R5 |
| 12 | Opaque-Box E2E Testing Suite | Comprehensive 4-tier requirement-driven E2E test suite verifying R1-R5 specifications independently | M-E2E | ORIGINAL_REQUEST Acceptance Criteria |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M-E2E | E2E Testing Track | Independent opaque-box test harness & test suite (Tiers 1-4) published via TEST_READY.md | none | DONE |
| M1 | Càn Khôn Túi & Lò Tạo Hóa Overhaul | Inventory material pouch tab, +1..+12 enhancement badges, forge shortcuts, unequip route, materials catalog | none | DONE |
| M2 | Rèn Luyện & Cảnh Giới Overhaul | Physical stamina alignment, armor mitigation curves & evasion breakdowns, tribulation readiness UI | M1 | DONE |
| M3 | Luận Đạo Đấu Trường Modernization | Opponent challenge cards, ELO win odds, streak badges, collapsible combat logs | M2 | DONE |
| M4 | Ngao Du Bát Hoang & Bí Cảnh Overhaul | Timed rifts vs permanent forbidden zones differentiation, 18-realm modifiers & specialty badges | M3 | IN_PROGRESS |
| M5 | Final Milestone: Full E2E & Adversarial Coverage | Pass 100% E2E tests (Tiers 1-4) + White-box adversarial hardening (Tier 5) + Forensic Audit | M-E2E, M4 | PLANNED |

## Interface Contracts
### Inventory ↔ Alchemy / Forge
- Shortcut invocation: `state.currentPage = 'alchemy'`, `state._alchemyTab = 'enhancement'`, `state._selectedEnhanceItemId = item.id`, followed by `renderGame()`.
- Unequip API: `POST /api/player/{id}/unequip` with body `{"slot": string}`, returning updated `{player, message}`.
- Materials API: `GET /api/data/materials`, returning `{success: true, data: { [id: string]: MaterialData }}`.

### Cultivation & Gym ↔ Player Resource
- Gym training request: `POST /api/player/{id}/gym-train` with body `{"stat": "strength"|"speed"|"dexterity"|"defense"}`. Consumes 5 `currentStamina` (Thể Lực) instead of `currentEnergy`.
- Mitigation formula: `Mitigation (%) = min(85, round((defense / (defense + 5.0 * rawDamage)) * 100, 2))` for rawDamage ∈ [25, 75, 250].
- Evasion formula: `Dodge (%) = min(35, round((dexterity / (dexterity + 2.5 * enemySpeed)) * 100, 2))` for enemySpeed ∈ [0.75 * spd, 1.0 * spd, 1.5 * spd].

### Arena ↔ Matchmaking & Duel History
- Opponent card schema: `{player_id, name, level, rating, streak, rank_tier, win_probability}`.
- Win odds calculation: `P(win) = round(1 / (1 + 10 ** ((oppRating - myRating) / 400)) * 100, 1)`.
- History log persistence: `pvp_history.fight_log` stores JSON-encoded combat log array `[{turn, attacker, defender, damage, action, isCrit, isDodge, text}]`.

### Secret Realms ↔ Map & Travel
- Dungeon card distinction:
  - Timed Rift (`realm_type === 'timed'`): Purple celestial theme `#8a2be2`, countdown timer, waves count, difficulty multiplier (1.1x - 1.4x).
  - Permanent Forbidden Zone (`realm_type === 'permanent'`): Crimson hazard theme `#ff4444`, `🔥 [Cuồng Bạo]` apex badge, difficulty multiplier (2.2x - 3.5x).
- Area guidance schema: `{id, name, min_level, realm_name, stamina_cost, modifiers: [...], specialties: [...]}`.

## Code Layout
### Implementation Track File Ownership
- M1 Files:
  - `frontend/src/pages/inventory.js`
  - `frontend/src/pages/helpers.js`
  - `frontend/src/style.css` (Section: `/* === R1: INVENTORY & FORGE === */`)
  - `backend/src/Features/Inventory/routes.php`
  - `backend/data/materials.json`
- M2 Files:
  - `frontend/src/pages/stats.js`
  - `frontend/src/pages/gym.js`
  - `frontend/src/style.css` (Section: `/* === R2: CULTIVATION & STATS === */`)
  - `backend/src/Features/Gym/routes.php`
  - `backend/src/Models/Player.php`
- M3 Files:
  - `frontend/src/pages/arena.js`
  - `frontend/src/style.css` (Section: `/* === R3: ARENA === */`)
  - `backend/src/Features/Arena/routes.php`
- M4 Files:
  - `frontend/src/pages/dungeon.js`
  - `frontend/src/pages/travel.js`
  - `frontend/src/style.css` (Section: `/* === R4: TRAVEL & REALMS === */`)

### E2E Testing Track File Ownership
- `tests/e2e/` (Test runner, harness, fixtures, test suites Tiers 1-4)
- `TEST_INFRA.md` & `TEST_READY.md`
