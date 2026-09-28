# 🏯 Nghịch Thiên Ký — Tu Tiên RPG Engine

> A high-performance, persistent text-based multiplayer RPG engine inspired by Torn City mechanics and eastern cultivation (Tu Tiên) mythology. Powered by a modular PHP backend and a reactive Vanilla JS + Vite frontend.

![PHP](https://img.shields.io/badge/PHP-8.1+-blue)
![Vite](https://img.shields.io/badge/Vite-6-purple)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)
![License](https://img.shields.io/badge/License-Private-red)

---

## 📋 Overview

**Nghịch Thiên Ký** (Defiance of Fate) is a persistent browser-based multiplayer online role-playing game (PBBG). The engine combines eastern cultivation progression with gritty, persistent economics, turn-based tactical combat, territory warfare, and high-density user interfaces designed according to dark slate aesthetic standards.

### 🎮 Core Gameplay Pillars

- **Cultivation & Breakthroughs**: Progress across 7 major Realm Tiers (from *Luyện Khí* to *Đại Thừa*), facing heavenly tribulations with tangible stat growth upon each breakthrough.
- **Turn-Based Tactical Combat**: Features bodily injury mechanics, Glitch Weakpoint strikes, 4 distinct martial stances (*Phá Quy, Du Long, Huyễn Ảnh, Kim Cương*), floating visual feedback, and color-coded combat round logs.
- **Inventory & Capacity Governance (Càn Khôn Túi)**:
  - Enforced max inventory capacity with ring storage scaling.
  - Safe loot overflow management: When the pouch is full, new drops become **Pending Loot** on the ground, allowing players to either swap an existing item out or leave the drop behind.
  - Item discarding with instant confirmation directly from the inventory.
  - Up to 4 talisman affixes (Phù Văn) per item, with tier badges and localized stat breakdowns.
- **Lò Tạo Hóa (Forging & Alchemy)**:
  - *Luyện Đan*: Concoct spiritual pills and healing elixirs.
  - *Đúc Khí*: Forge weapons, armors, boots, and storage rings from raw ores and beast parts.
  - *Cường Hóa (+1 to +12)*: Upgrade gear with glowing tier auras and dynamic combat scaling.
  - *Khắc Ấn Phù Văn*: PoE-inspired currency talisman modifications (*Tẩy Tủy Phù, Hỗn Chú Phù, Thiên Mệnh Phù, Thăng Cấp Phù*) with an interactive 4-slot preview panel.
- **Động Phủ (Immortal Abode & Housing)**: 5 distinct dwelling tiers with an interactive Spiritual Garden (*Dược Viên*) for herb planting/harvesting, defensive array formations (*Trận Pháp*), and property leasing.
- **Skill Pillars & Auras**: 6 skill branches including Active Combat Skills, Sustained Auras (*Hào Quang* with toggle locks and spirit drain), Life Skills, Mind Methods, and Glitch Insights.
- **Secret Realms & Exploration**: Distinguishes timed countdown rifts (⏳ *Huyễn Cảnh*) from permanent apex danger zones (🔱 *Thượng Cổ Cấm Địa*). Features an automated scanner (*Auto-Battle*) equipped with stamina and full-bag safeguards.
- **Luận Đạo Đấu Trường (PvP Arena)**: Card-style matchmaking displaying opponent ranks, ELO ratings, level deltas, win streaks, and recent duel replays.

---

## 🛠️ Installation & Setup

### Prerequisites
- **PHP**: 8.1 or higher (extensions: `pdo_mysql`, `json`, `mbstring`)
- **MySQL**: 8.0 or higher
- **Node.js**: 18.0 or higher (with npm)
- **Composer**: PHP package dependency manager

### 1. Backend Configuration
```bash
cd backend
composer install
cp .env.example .env  # Configure DB_HOST, DB_NAME, DB_USER, DB_PASS
# Run database migrations in sequence
php migrations/run_001_init.php
# ... execute all migrations up to run_031
php migrations/run_031_housing_boss_safety.php
```

### 2. Frontend Build
```bash
cd frontend
npm install
npm run build    # Produces production-ready bundle in frontend/dist/
```

### 3. Running Dev Servers
```bash
# Terminal 1 - Backend API (port 8080)
cd backend
php -S localhost:8080 -t public

# Terminal 2 - Frontend Dev Server (port 3000)
cd frontend
npm run dev
```

Open your browser at `http://localhost:3000/`.

---

## 🏗️ Architecture & Project Structure

```
rpg-engine/
├── backend/
│   ├── public/           # Public entry point (index.php)
│   ├── src/
│   │   ├── Core/         # Database, CombatEngine, PlayerRepository
│   │   ├── Models/       # Player, Monster, Item
│   │   ├── Systems/      # ItemSystem, SkillSystem, MonsterSystem
│   │   ├── Services/     # PvPCombatService, ForgingService, BazaarService
│   │   └── Features/     # 34 modular feature domains
│   │       ├── Arena/        # PvP Arena routes & matchmaking
│   │       ├── Combat/       # Full combat simulation & loot resolution
│   │       ├── Crafting/     # Equipment and pill recipes
│   │       ├── CurrencyCrafting/ # Talisman modifications & affix rerolling
│   │       ├── Exploration/  # World exploration & random encounters
│   │       ├── Housing/      # Dwelling, herb gardens, formation arrays
│   │       ├── Inventory/    # Equipment, unequip, discard, medicine usage
│   │       └── ...
│   ├── data/             # Static game definitions (skills, materials, dungeons)
│   └── migrations/       # Incremental MySQL DDL and seed migrations
│
├── frontend/
│   ├── src/
│   │   ├── core/         # Component base class, event emitter, UI primitives
│   │   ├── game/         # 3D/2D canvas visual engines
│   │   ├── pages/        # Modular page coordinators & views
│   │   │   ├── combat/   # CombatPage, CombatArenaView, AutoBattleRunner
│   │   │   ├── inventory/# InventoryPage, EquipmentView, constants
│   │   │   ├── alchemy/  # AlchemyPage, TalismanInscriber, EnhancementAltar
│   │   │   ├── housing/  # HousingPage, GardenTab, FormationsTab
│   │   │   ├── stats/    # StatsPage, TrainingTab, RealmTab, MechanicsTab
│   │   │   └── helpers.js# Shared itemRow, fmtAffix, and stat calculation helpers
│   │   ├── services/     # API client singleton
│   │   ├── main.js       # App shell, routing, state, and modal manager
│   │   └── style.css     # Dark slate design system and animations
│   ├── dist/             # Production distribution
│   └── vite.config.js    # Vite bundler configuration
│
├── docs/                 # Production-grade architecture & gameplay specifications
└── tests/                # Automated integration, adversarial, & visual screenshot tests
```

---

## ⚡ Feature Summary Matrix

| Domain | Feature Highlights |
| :--- | :--- |
| ⚔️ **Combat Engine** | Turn-based resolution, body part targeting, Glitch Weakpoint triggers (2.5x damage), 4 active stances, combat log history. |
| 🎒 **Càn Khôn Túi** | Capacity checking, Pending Loot decision card (`Swap Item` / `Leave Behind`), direct discard action, affix tier badges. |
| ⚗️ **Lò Tạo Hóa** | Equipment forging, pill concoction, +1..+12 enhancement altar with aura glows, 4-slot talisman rune inscription. |
| 🌟 **Cảnh Giới** | 7 realm tiers, heavenly tribulation trials, dynamic realm stat multipliers, physical armor mitigation curves. |
| ⚡ **Kỹ Năng & Hào Quang**| Active combat arts, toggleable auras with spirit lock, life skills, cultivation mind techniques. |
| 🏠 **Động Phủ** | 5 housing tiers, herbal medicine garden with growth cycles, defensive formation arrays, lease agreements. |
| 🗺️ **Ngao Du & Bí Cảnh** | 2D exploration grid, timed *Huyễn Cảnh* rifts, permanent *Thượng Cổ Cấm Địa* apex monster zones. |
| 🏆 **Đấu Trường (PvP)** | Card-style opponent matchups, ELO delta calculation, win streak fire badges, turn-by-turn duel replays. |
| 🤖 **Auto-Battle** | Continuous monster scanning with automated stamina exhaustion and full-bag pause safeguards. |

---

## 💾 Database & Migrations

The engine operates on MySQL 8.0 with automatic migration scripts:

```bash
# Execute migrations from project root
cd backend
php migrations/run_001_init.php
# ...
php migrations/run_031_housing_boss_safety.php
```

Key tables: `players`, `player_items`, `player_housing`, `player_tracked_monsters`, `tower_runs`, `pvp_arena`, `bazaar_listings`, `factions`.

---

## 🎨 UI & Design Principles

- **Palette**: Dark slate aesthetic (`#0a0e17` base, `#151922` surface cards, gold/blue/red accent badges).
- **Anti-AI-Slop Standard**: Clean rectangular chips, high information density, crisp 1px borders, zero generic gradient clutter.
- **Full Localization**: English technical codebase with authentic eastern cultivation (Tiên Hiệp) Vietnamese UI nomenclature.

---

*Nghịch Thiên Ký — "Trời đất bất nhân, coi vạn vật như cỏ rác."*
