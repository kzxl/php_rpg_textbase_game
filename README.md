# 🏯 Nghịch Thiên Ký — Tu Tiên RPG Engine

> Text-based MMORPG lấy cảm hứng từ Torn City, theme tu tiên (cultivation). PHP backend + Vanilla JS frontend.

![PHP](https://img.shields.io/badge/PHP-8.1+-blue)
![Vite](https://img.shields.io/badge/Vite-5-purple)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)
![License](https://img.shields.io/badge/License-Private-red)

---

## 📋 Tổng Quan

Nghịch Thiên Ký là một text-based RPG multiplayer với hệ thống tu luyện sâu, chiến đấu theo lượt, khám phá thế giới mở, và kinh tế người chơi. Game chạy trên trình duyệt, thiết kế theo phong cách dark premium.

### 🎮 Gameplay Core
- **Tu Luyện** — Train 4 stats (STR/SPD/DEX/DEF) tại Rèn Luyện
- **Chiến Đấu** — Hệ thống turn-based với body part targeting, dodge, crit
- **Khám Phá** — Ngao du vùng đất, gặp quái/NPC/Boss/người chơi
- **Cảnh Giới** — 7 realm tiers với breakthrough trials
- **Kỹ Năng** — 4 nhánh: Chiến Đấu, Sinh Hoạt, Nội Công, Công Pháp

---

## 🛠️ Cài Đặt

### Yêu cầu
- PHP 8.1+ với extensions: `pdo_mysql`, `json`, `mbstring`
- MySQL 8.0+
- Node.js 18+ (build frontend)
- Composer (PHP dependencies)

### Backend Setup
```bash
cd backend
composer install
cp .env.example .env  # Cấu hình DB
php migrations/run_001_init.php
# ... chạy tất cả migrations theo thứ tự
php migrations/run_031_housing_boss_safety.php
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev      # Dev server (hot reload)
npm run build    # Production build → dist/
```

### Chạy Server
```bash
# Backend API
cd backend
php -S localhost:8080 -t public

# Frontend (dev)
cd frontend
npm run dev
```

---

## 🏗️ Kiến Trúc

```
rpg-engine/
├── backend/
│   ├── public/           # Entry point (index.php)
│   ├── src/
│   │   ├── Core/         # Database, CombatEngine, Router
│   │   ├── Models/       # Player, Monster
│   │   ├── Systems/      # ItemSystem
│   │   └── Features/     # 34 feature modules (folder-per-feature)
│   ├── data/             # JSON data (skills, exploration, items...)
│   └── migrations/       # DB migrations (run_001 → run_031)
│
├── frontend/
│   ├── src/
│   │   ├── main.js       # App shell, navigation, sidebar
│   │   ├── style.css     # Complete design system
│   │   ├── pages/        # Page components (20+ pages)
│   │   └── services/     # API client
│   └── dist/             # Built output
│
├── story.md              # World lore & backstory
└── next_work.md          # TODO & roadmap
```

### Backend — Folder-per-Feature
Mỗi feature là một folder độc lập trong `src/Features/`:
```
Features/
├── Arena/        ⚔️ PvP Đấu Trường
├── Combat/       🗡️ PvE Combat
├── Crafting/     ⚒️ Chế Tác
├── Crime/        🔪 Ác Nghiệp
├── Dungeon/      🏰 Bí Cảnh
├── Education/    📖 Công Pháp (Education Tree)
├── Exploration/  🗺️ Khám Phá
├── Guild/        🏯 Bảng Hội
├── Housing/      🏠 Động Phủ
├── Leaderboard/  🏆 Bảng Xếp Hạng
├── Market/       🏪 Giao Dịch
├── Mugging/      💀 Cướp Bóc (PvP)
├── NpcShop/      🧓 Thương Nhân
├── Realm/        🌟 Cảnh Giới
├── Skill/        ⚡ Kỹ Năng
├── Tower/        🗼 Thiên Phần Tháp
├── WorldBoss/    🐉 World Boss
└── ...           (34 modules total)
```

---

## ⚡ Tính Năng Chính

| Feature | Mô tả |
|---------|-------|
| 🏋️ **Rèn Luyện** | Train 4 stats, Gym cooldown, bonus từ Căn Cốt |
| ⚔️ **Chiến Đấu** | Turn-based, body part targeting, 5 outcomes/turn |
| 🗺️ **Ngao Du** | Khám phá, di chuyển, bí cảnh, tiên cảnh |
| 🐉 **World Boss** | Gặp qua khám phá → solo hoặc phát động rally |
| 🗼 **Thiên Phần Tháp** | Infinite tower, mùa monthly, milestones |
| 🌟 **Cảnh Giới** | 7 tiers, breakthrough trials, realm bonuses |
| ⚡ **Kỹ Năng** | 4 tab: Chiến Đấu / Sinh Hoạt / Nội Công / Công Pháp |
| 🏠 **Động Phủ** | Nhà ở, Dược Viên, Trận Pháp, cho thuê |
| ⚗️ **Luyện Đan** | Thu thập nguyên liệu → craft đan dược/vũ khí |
| 🔪 **Ác Nghiệp** | Crime system, nerve-based, jail risk |
| 💀 **Cướp Bóc** | PvP mugging 2-phase: tấn công → hành động |
| 🏪 **Giao Dịch** | Player marketplace + đấu giá |
| 🧓 **Thương Nhân** | NPC shops, daily stock, rarity tiers |
| 🏯 **Bảng Hội** | Guild system, treasury, permissions |
| 🏆 **Bảng Xếp Hạng** | Level, Gold, PvP ELO, Guild ranking |
| 📜 **Sự Kiện** | Event timeline, 24 event types |
| 📖 **Wiki** | In-game guide, 13 tabs |

---

## 🎨 Design System

- **Theme**: Dark premium (#0a0e17 background)
- **Colors**: Custom CSS variables (gold, blue, green, red, orange)
- **Components**: Panel/Glass cards, skill tabs, stat bars
- **Typography**: System fonts, Vietnamese full support
- **Layout**: Sidebar + main content, responsive grid

---

## 💾 Database

MySQL với 20+ tables. Migrations tự động:

```bash
# Chạy tất cả migrations
for f in backend/migrations/run_*.php; do php "$f"; done
```

Key tables: `players`, `player_inventory`, `player_housing`, `tower_runs`, `world_bosses`, `guilds`, `pvp_arena`, `market_listings`...

---

## 📝 Roadmap

Xem chi tiết tại [next_work.md](next_work.md)

**Ưu tiên cao:**
- World Boss discovery UI (frontend flow)
- Công Pháp special skills
- Achievement system
- Equipment enhancement

**QoL:**
- Visual world map
- 7-day login calendar
- Mobile responsive
- Combat history

---

## 🧑‍💻 Tech Stack

| Layer | Tech |
|-------|------|
| Backend | PHP 8.1, Slim Framework, PDO MySQL |
| Frontend | Vanilla JS, Vite 5, CSS3 |
| Database | MySQL 8.0 |
| Build | Vite (ESM bundler) |
| VCS | Git → GitHub |

---

*Nghịch Thiên Ký — "Trời đất bất nhân, coi vạn vật như cỏ rác."*
