# Nghịch Thiên Ký — Feature Registry & System Invariant Matrix

## 1. System Architecture Overview

```
Frontend (Vite + Vanilla JS SPA)
  ├── main.js (App Shell, State, Routing Dispatcher, Sidebar HUD)
  ├── pages/*.js (Modular Page Controllers)
  └── services/api.js (REST Client)
          │ HTTP / JSON
          ▼
Backend (PHP 8.2+ LitePlatform Micro-Framework)
  ├── public/index.php (Kernel Bootstrapper)
  ├── src/Core/ (Kernel, Service Providers, EntityManager, StatEngine, CombatEngine)
  ├── src/Models/ (Player, Monster, Item, Modifier)
  ├── src/Features/*/ (35 Modular Route & Feature Controllers)
  └── migrations/ (Schema Migrations)
          │ PDO
          ▼
Database (MySQL 8.0 / MariaDB)
```

---

## 2. Master Feature Registry by Domain

### Domain 1: HÀNH TRÌNH (Journey & Exploration) — Priority 1
| Code | Feature Name | Backend Module | Frontend Page | Core Endpoints | State & Invariants |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `EXP-01` | **Khám Phá (Exploration)** | `Features/Exploration` | `pages/combat.js` | `POST /api/player/{id}/explore` | Dynamic stamina cost (10 - 200 TL) scaling across 18 canonical realms. Spawns monsters, NPCs, items, or random encounters. |
| `EXP-02` | **Chiến Đấu 2D (Combat Arena)** | `Features/Combat` | `pages/combat.js` | `POST /api/combat/full` | Turn-based 25 turns max. Probabilistic active skill trigger (15-85%), Qi consumption, weakpoint targeting, hit/dodge/crit rolls. Fallback to normal attack. |
| `EXP-03` | **Ngao Du Bát Hoang (World Map / Travel)** | `Features/Travel` | `pages/travel.js` | `GET /api/data/areas`, `POST /api/player/{id}/travel` | 18 canonical realms in 5 tiers (Lv.1 to Lv.4000+). Travel timers, level gates, and unique environmental realm modifiers. |
| `EXP-04` | **Phó Bản Bí Cảnh (Dungeon)** | `Features/Dungeon` | `pages/dungeon.js` | `GET/POST /api/player/{id}/dungeons` | Multi-node runs with boss and item drops. |
| `EXP-05` | **Bát Hoang Tiên Cảnh (TienCanh)** | `Features/TienCanh` | `pages/tiencanh.js` | `GET/POST /api/player/{id}/tiencanh` | Dynamic exploration atlas grid. |
| `EXP-06` | **Thiên Cơ Nhiệm Vụ (Quests)** | `Features/Quests`, `Features/NPC` | `pages/quests.js` | `GET/POST /api/player/{id}/quests` | Kill and collect quest tracking from area NPCs. |
| `EXP-07` | **Nhiệm Vụ Hằng Ngày (Daily)** | `Features/DailyQuest` | `pages/dailyquest.js` | `GET/POST /api/daily-quests` | Daily rotating quests and rewards. |
| ~~`EXP-08`~~ | **[DECOMMISSIONED] Nghịch Thiên (Crime)** | *Removed* | *Removed* | *N/A* | *Decommissioned per player progression alignment (Nghịch Khí removed).* |

---

### Domain 2: TU CHÂN (Cultivation & Progression)
| Code | Feature Name | Backend Module | Frontend Page | Core Endpoints | State & Invariants |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `CUL-01` | **Tu Luyện & Cảnh Giới (Realm)** | `Features/Realm`, `Features/Tribulation` | `pages/stats.js`, `pages/realm.js` | `GET/POST /api/player/{id}/realm`, `/tribulation/*` | 19 canonical realms + unlimited procedural realms. Major realm breakthroughs summon multi-wave Heavenly Tribulation (Đột Phá Lôi Kiếp). |
| `CUL-02` | **Rèn Luyện Thể Chất (Gym)** | `Features/Gym` | `pages/stats.js` | `POST /api/player/{id}/train` | Multiplies stat gain by talent aptitude. Spends stamina. |
| `CUL-03` | **Chiêu Thức (Skills - Pillar 1)** | `Features/Skill` | `pages/skills.js` (tab `combat`) | `POST /api/player/{id}/skills/equip` | Equipped active combat loadout (3-6 slots). Dynamic trigger chance roll (15-85%). Usage-based mastery XP. |
| ~~`CUL-04`~~ | **[RETIRED] Công Pháp Cũ (Education Trees)** | *Deprecated* | *Decommissioned* | *N/A* | *Replaced by action-driven Monster Mastery (`CUL-08`) and Crafting Mastery (`CUL-09`).* |
| `CUL-05` | **Tàng Kinh Các (Library)** | `Core/GameDataRepository` | `pages/skills.js`, `pages/library.js` | `GET /api/data/skills` | Catalog of skills. Filtered by player Nhãn Thuật perception level. |
| `CUL-06` | **Thiên Đạo Dị Biến (Glitch - Pillar 4)** | `Features/Glitch`, `Systems/GlitchSystem` | `pages/skills.js` (tab `glitch`) | `GET/POST /api/player/{id}/glitches` | Feature Fog of War. 3 Stances + 10 Hidden Imprints with riddles. |
| `CUL-07` | **Càn Khôn Túi (Inventory)** | `Features/Inventory` | `pages/inventory.js` | `POST /api/player/{id}/equip`, `/use-item` | Equipment slots + storage capacity from rings/pouches. |
| `CUL-08` | **Thông Thạo Quái Vật (Monster Mastery - Pillar 2)** | `Features/MonsterMastery`, `Systems/MonsterMasterySystem` | `pages/skills.js` (tab `monsters`) | `GET /api/player/{id}/monster-mastery` | 5★ Bestiary kill progression. Tier 0 Fog of War, Tier 1 stats reveal, Tier 2 +10% DMG, Tier 3 -10% DEF & +15% drop, Tier 4 +20% DMG & x2 weakpoint, Tier 5 +25% DMG & 10% execute. |
| `CUL-09` | **Thông Thạo Chế Tạo (Crafting Mastery - Pillar 3)** | `Features/Crafting`, `Features/MonsterMastery` | `pages/skills.js` (tab `crafting`) | `GET /api/player/{id}/crafting-mastery` | Level 1-100+ progression, Dao title ranks (Dược Đồng -> Thần Nông), success bonuses, critical quality (Tinh/Cực/Thiên Phẩm), material salvage refunds. |

---

### Domain 3: TRANH ĐẤU (PvP & Challenge Trials)
| Code | Feature Name | Backend Module | Frontend Page | Core Endpoints | State & Invariants |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `PVP-01` | **Luận Đạo Đấu Trường (Arena)** | `Features/Arena` | `pages/arena.js` | `GET/POST /api/arena` | Asynchronous player vs player rankings and combat. |
| `PVP-02` | **Thiên Phần Tháp (Tower)** | `Features/Tower` | `pages/tower.js` | `POST /api/tower/climb` | Endless tower climb with escalating monster scaling per floor. |
| `PVP-03` | **Ma Thú Xâm Lăng (World Boss)**| `Features/WorldBoss` | `pages/worldboss.js` | `GET/POST /api/worldboss` | Community boss with high HP pool and top damage leaderboard. |
| `PVP-04` | **Cướp Đoạt (Mugging)** | `Features/Mugging` | `pages/profile.js` | `POST /api/player/{id}/mug` | Direct PvP mugging with cooldowns. |

---

### Domain 4: TIÊN PHỦ (World & Dwellings)
| Code | Feature Name | Backend Module | Frontend Page | Core Endpoints | State & Invariants |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `DWL-01` | **Động Phủ (Housing)** | `Features/Housing` | `pages/housing.js` | `GET/POST /api/housing` | Tiered dwellings with HP regen, garden, training room facilities. |
| `DWL-02` | **Tông Môn Bang Hội (Guild)** | `Features/Guild` | `pages/guild.js` | `GET/POST /api/guilds` | Guild ranks, treasury, wars, and member roster. |
| `DWL-03` | **Luyện Đan & Đúc Khí (Craft)** | `Features/Crafting`, `Features/CurrencyCrafting` | `pages/alchemy.js` | `POST /api/crafting/craft` | Recipe crafting, leveling crafting mastery up to 100. |

---

### Domain 5: THƯƠNG HỘI (Economy & Fortune)
| Code | Feature Name | Backend Module | Frontend Page | Core Endpoints | State & Invariants |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `ECO-01` | **Phường Thị (Market)** | `Features/Market` | `pages/market.js` | `GET/POST /api/market` | P2P trading market with listings and buyouts. |
| `ECO-02` | **Đấu Giá Các (Auction)** | `Features/Auction` | `pages/market.js` (tab `auction`) | `GET/POST /api/auction` | Timed bidding on rare gear with minimum increments. |
| `ECO-03` | **Tiên Các Thương Nhân (NPC Shop)**| `Features/NpcShop` | `pages/npcshop.js` | `GET/POST /api/npc-shop` | Fixed item sales for gold/spirit stones. |
| `ECO-04` | **Thiên Cơ Đài (Gacha)** | `Features/Gacha` | `pages/gacha.js` | `POST /api/gacha/pull` | Spirit stone pull for rare equipment with pity counter. |

---

### Domain 6: VÔ THƯỢNG (System, Social & Meta)
| Code | Feature Name | Backend Module | Frontend Page | Core Endpoints | State & Invariants |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `SYS-01` | **Xác Thực (Auth)** | `Features/Auth` | `renderIntro()` | `POST /api/auth/login`, `/register` | Token/session storage in localStorage. |
| `SYS-02` | **Thiên Đạo Quản Trị (Admin)**| `Features/Admin` | `pages/admin.js` | `/api/admin/*` | Role check (`role === 'admin'`). Player inspector, item grants. |
| `SYS-03` | **Truyền Âm (Chat)** | `Features/Chat` | `pages/chat.js` | `GET/POST /api/chat` | Global and private messaging channels. |
| `SYS-04` | **Đạo Hữu (Social & Friends)** | `Features/Social` | `pages/social.js` | `GET/POST /api/social` | Friends list, online status, direct profile shortcuts. |
| `SYS-05` | **Bảng Xếp Hạng (Leaderboard)** | `Features/Leaderboard` | `pages/leaderboard.js` | `GET /api/leaderboard` | Top level, wealth, arena ratings. |
| `SYS-06` | **Sự Kiện & Lịch Sử (Events)** | `Features/Events`, `Features/TimeEvent` | `pages/events.js` | `GET /api/events` | Combat logs, hospital notifications, trade receipts. |
| `SYS-07` | **Thiết Lập & Đăng Xuất (Settings & Session)** | `Features/Auth` | `main.js` (`showSettingsModal`) | `POST /api/auth/login` | LocalStorage session invalidation (`isLoggedOut`), audio/shake/toast preferences, dev bypass synchronization. |

---

## 3. Regression Prevention Checklist

1. **Global Scope Invariants**:
   - Helper functions `loadPlayer()`, `savePlayer()`, and `jsonResponse()` must stay globally accessible in `src/Core/helpers.php`.
   - Never import route files without DI container injection.
2. **Schema Invariants**:
   - `xp`, `xp_to_next`, `gold`, `current_hp`, `max_hp` MUST remain `BIGINT UNSIGNED` to support infinite level progression.
   - `realm_tier` MUST remain `INT UNSIGNED`.
3. **Stat Calculation Pipeline**:
   - All modifiers must pass through `ModifierEngine::apply()`.
   - Realm cumulative bonuses (`RealmSystem::getCumulativeBonuses()`) must always be injected into `Player::gatherModifiers()`.
   - Derived `maxHp` from `StatEngine::calculateAll()` must be synchronized with `Player->maxHp` in `toArray()` to prevent HUD mismatch.
4. **Energy Separation Invariant**:
   - **Thể Lực (Stamina World)**: Exclusively deducted for world exploration (10-200 TL per step), gym training, and travel. Never spent during turn combat.
   - **Linh Lực (Qi / Mana Combat)**: Exclusively consumed during combat turns for triggered active skills (10-100 Qi) and persistent aura reservation (10-85%). Never spent on exploration.
5. **Skill Activation Invariant**:
   - Only equipped active skills (`isEquipped === true`) with sufficient available energy (`currentEnergy >= cost`) may enter the trigger chance roll.
   - Turns without skill triggers must cleanly fall back to `⚔️ Thường công` (Normal Attack) at 0 energy cost.
6. **Fog of War Invariant**:
   - Never expose raw action thresholds or internal counter names of deep-fog imprints to unauthenticated or low-level players.
