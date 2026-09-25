# Secret Realms & Dungeon Discovery Specification

## 1. Overview
The **Secret Realms Discovery System** expands the world exploration gameplay by dynamically unearthing instanced challenge domains when players explore the vast mortal and immortal territories.

Dungeon discoveries are divided into two distinct archetypes:
1. **Timed Secret Realms (Huyễn Cảnh / Ephemeral Domains)**: Transitory pocket dimensions rich in rare spiritual herbs, ores, and elixirs. Governed by a live expiration countdown timer. Once the timer reaches zero, the entrance collapses and the domain vanishes from the player's secret realm tab.
2. **Permanent Secret Realms (Thượng Cổ Cấm Địa / Ancient Forbidden Zones)**: Unsealed prehistoric zones that remain unlocked indefinitely. The creatures and primordial fiends lurking within possess extreme attributes ($2.0\times - 3.5\times$ base stats, devastating curses, stuns, and high lethality), guarded by apex ancient bosses with legendary treasures.

---

## 2. Discovery Mechanics & Probability

Exploration events executed via `POST /api/player/{id}/explore` evaluate global discovery roll rates alongside player encounters and rare skill epiphanies:

| Event Type | Probability | Prerequisites / Behavior |
| :--- | :--- | :--- |
| **Skill Epiphany (Cơ Duyên)** | 0.5% (5 / 1000) | Learns an unlearned divine art scroll directly. |
| **Player Encounter (Đụng Độ)** | 15% (15 / 100) | Interacts with / challenges another active cultivator in the area. |
| **Secret Realm Discovery (Bí Cảnh)** | **6% (60 / 1000)** | Unearths a Timed or Permanent domain via `SecretRealmRegistry`. |
| **Territory Gathering / Mob** | Remaining Weight | Regular monsters, regional herb gathering, mineral mining, items, NPCs. |

### Archetype Distribution
When a secret realm discovery triggers ($6\%$ roll):
- **$65\%$ Probability $\rightarrow$ Timed Secret Realm (Huyễn Cảnh)**:
  - Generates expiration window: $30\text{ to }90$ minutes (`time() + mt_rand(1800, 5400)`).
  - Domain tier aligned with the player's realm.
- **$35\%$ Probability $\rightarrow$ Permanent Secret Realm (Thượng Cổ Cấm Địa)**:
  - Evaluates unlocked permanent keys for the player to prevent duplicate triggers.
  - Generates permanent record (`expires_at = NULL`).
  - Sets danger difficulty multiplier between $2.20\times$ and $3.50\times$.
  - Fallbacks safely to a Timed Realm if all eligible permanent cấm địa have already been discovered.

---

## 3. Secret Realm Templates

### 3.1 Timed Secret Realms (Huyễn Cảnh)
| Key | Domain Name | Tier | Waves | Duration | Diff Mult | Key Rewards |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `huyen_canh_linh_duoc` | Huyễn Cảnh: Dược Thần Cổ Cốc | 1 | 3 | 45 min | $1.10\times$ | Rare herbs, Spirit Stones, Tẩy Tủy Đan |
| `huyen_canh_tinh_thach` | Huyễn Cảnh: Huyễn Tinh Ma Động | 2 | 3 | 60 min | $1.20\times$ | Elemental crystals, Spirit minerals, Tẩy Tủy Đan |
| `huyen_canh_tinh_ha` | Huyễn Cảnh: Tinh Hà Lạc Cảnh | 3 | 4 | 75 min | $1.30\times$ | Beast Core (Grand), Hoàn Cốt Đan |
| `huyen_canh_huyet_nguyet` | Huyễn Cảnh: Huyết Nguyệt Tàn Giới | 4 | 4 | 90 min | $1.40\times$ | Ultimate beast cores, high XP bonus, Hoàn Cốt Đan |

### 3.2 Permanent Ancient Forbidden Zones (Thượng Cổ Cấm Địa)
| Key | Forbidden Zone | Tier | Waves | Diff Mult | Apex Boss Guardian | Key Rewards |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `cam_dia_man_hoang` | Cấm Địa: Man Hoang Cổ Trạch | 2 | 4 | **$2.20\times$** | Thượng Cổ Thôn Thiên Mãng (HP 1800, ATK 65, Toxic Bite) | Mid/High Jade Slips, Rare Cores, Tẩy Tủy Đan |
| `cam_dia_u_minh_vuc` | Cấm Địa: U Minh Vạn Quỷ Vực | 3 | 5 | **$2.60\times$** | Minh Vương Tàn Hồn (HP 3200, ATK 88, DEF 55, Soul Drain) | Supreme Beast Cores, Hoàn Cốt Đan, 1200+ Gold |
| `cam_dia_loi_dinh_coc` | Cấm Địa: Vạn Kiếp Lôi Đình Cốc | 4 | 5 | **$3.00\times$** | Cửu Thiên Lôi Kiếp Cự Thần (HP 5500, ATK 125, DEF 75, Stun 40%) | Thunder Cores, Supreme Jade Slips, 2500+ Gold |
| `cam_dia_hon_don_vuc` | Cấm Địa: Hỗn Độn Hư Không Vực | 5 | 6 | **$3.50\times$** | Hỗn Độn Ma Tổ Tàn Thân (HP 9500, ATK 165, DEF 100, Chaos Debuff) | Primordial Relics, Hoàn Cốt Đan x3, 5000+ Gold |

---

## 4. Extreme Monster Scaling in Cấm Địa

For permanent ancient forbidden zones, monsters receive aggressive attribute scaling during combat execution in `POST /api/player/{id}/dungeon/fight`:
$$\text{ScaleFactor} = \left( 1 + (\text{Wave} - 1) \times 0.15 + (\text{Tier} - 1) \times 0.20 \right) \times \text{DifficultyMult}$$

Where $\text{DifficultyMult} \in [2.20, 3.50]$:
- **Health (HP)**: $\text{BaseHP} \times \text{ScaleFactor}$
- **Attack (Strength)**: $\text{BaseStrength} \times \text{ScaleFactor}$
- **Agility & Dexterity**: $\text{BaseSpeed} \times \max(1.0, 1 + (\text{ScaleFactor} - 1) \times 0.35)$
- **Armor (Defense)**: $\text{BaseDefense} \times \max(1.0, 1 + (\text{ScaleFactor} - 1) \times 0.45)$
- **Encounter Affix**: Prepends `🔥 [Cuồng Bạo]` to mob names when $\text{DifficultyMult} \ge 2.0$.

---

## 5. Schema & Persistence

### `player_discovered_dungeons` Table
```sql
CREATE TABLE IF NOT EXISTS player_discovered_dungeons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_id VARCHAR(32) NOT NULL,
    dungeon_key VARCHAR(64) NOT NULL,
    realm_type ENUM('timed', 'permanent') NOT NULL DEFAULT 'timed',
    name VARCHAR(120) NOT NULL,
    description TEXT NULL,
    tier INT UNSIGNED DEFAULT 1,
    required_realm INT UNSIGNED DEFAULT 1,
    difficulty_mult DECIMAL(4,2) DEFAULT 1.00,
    waves INT UNSIGNED DEFAULT 3,
    area_id VARCHAR(50) NULL,
    discovered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL DEFAULT NULL,
    is_cleared TINYINT(1) DEFAULT 0,
    cleared_at TIMESTAMP NULL DEFAULT NULL,
    clear_count INT UNSIGNED DEFAULT 0,
    status ENUM('available', 'cleared', 'expired') DEFAULT 'available',
    monster_pool JSON DEFAULT NULL,
    boss_data JSON DEFAULT NULL,
    rewards_data JSON DEFAULT NULL,
    INDEX idx_player_status (player_id, status),
    INDEX idx_expires (expires_at),
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### `dungeon_runs` Alterations
- `discovered_id INT NULL DEFAULT NULL` — Links active dungeon instance directly to discovered domain record.
- `difficulty_mult DECIMAL(4,2) DEFAULT 1.00` — Retains the domain difficulty multiplier throughout all waves.
- `map_item_id VARCHAR(50) NULL DEFAULT ''` — Nullable for non-item activated dungeons.

---

## 6. Frontend Presentation

In `frontend/src/pages/dungeon.js`, the Secret Realms tab organizes content into three clear, responsive panels:
1. **⏳ Bí Cảnh Huyễn Cảnh (Có Thời Hạn)**:
   - Live per-second countdown (`formatTime(remainingSeconds)`).
   - Dynamic expiration listener that refreshes once timer lapses.
   - Distinct purple/gold celestial badges.
2. **🔱 Thượng Cổ Cấm Địa (Vĩnh Cửu - Cực Hung Hiểm)**:
   - Crimson danger warning badges (`⚠️ QUÁI CỰC HUNG HIỂM x2.2 ~ x3.5`).
   - Clear counters tracking historical conquest milestones (`🏆 Đã phá N lần`).
3. **📜 Ngọc Giản Cổ Đồ (Khai Mở Tiêu Hao)**:
   - Retains traditional inventory-based map slip activations.
