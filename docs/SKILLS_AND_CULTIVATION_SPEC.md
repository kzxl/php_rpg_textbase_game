# Skills & Cultivation Architecture Specification (Mô Hình 4 Trụ Cột)

## 1. Architectural Overview & Design Philosophy

The **Skills & Cultivation (Kỹ Năng & Lĩnh Ngộ)** cluster embodies the core character-building and progression loop of *Nghịch Thiên Ký*. Following the modernization of legacy 6-tab fragmentation, the system is strictly organized around the **Unified 4-Pillar Model (Mô Hình 4 Trụ Cột)** aligned with modern Xianxia game design and MDG specifications:

```
                              [ PLAYER ENTITY ]
                                      │
         ┌────────────────────────────┼────────────────────────────┐
         ▼                            ▼                            ▼
  [ Trụ Cột 1 ]                [ Trụ Cột 2 ]                [ Trụ Cột 3 ]                [ Trụ Cột 4 ]
 ⚔️ CHIÊU THỨC              🧘 TÂM PHÁP & HÀO QUANG     🐺 THÔNG THẠO QUÁI VẬT       ⚒️ THÔNG THẠO CHẾ TẠO
 Active Techniques           Mana Reservation Auras       5★ Action-Driven Bestiary    Lv.1-100 Crafting Ranks
 Trigger Chance & Cost       Passive Mind Methods         Kills, Weakpoint & Execute   Quality Tiers & Salvage
```

Supporting and intersecting these 4 pillars are two specialized auxiliary modules:
- **Tàng Kinh Các (Scripture Pavilion)**: Global scripture repository with perception gates (`Nhãn Thuật`).
- **Thiên Đạo Dị Biến (Heavenly Glitches)**: Non-linear anomaly layer offering 3 Stances and 10 Secret Imprints.

---

## 2. Pillar 1: Chiêu Thức (Active Combat Skills)

### 2.1 Loadout & Slot Scalability
Active techniques represent direct combat moves executed during battle rounds. To prevent button-bloat while rewarding cultivation progression, active skill capacity scales strictly with the player's Major Realm (`realmTier`):

$$\text{Max Active Slots} = 3 + \Delta_{\text{Realm}}$$

- **Phàm Nhân & Luyện Khí (Tier 1-2)**: 3 Slots
- **Kim Đan (Tier 3-4)**: 4 Slots
- **Hóa Thần (Tier 5-6)**: 5 Slots
- **Đại Thừa (Tier 7+)**: 6 Slots

### 2.2 Activation Probability (Trigger Chance)
Active skills do **not** trigger on 100% of turns; instead, each turn in battle performs a probabilistic trigger roll to simulate dynamic tactical martial arts combat:

$$\text{Trigger Chance (\%)} = \text{Base Chance} + (\text{Mastery Level} - 1) + \left\lfloor\frac{\text{Dexterity}}{10}\right\rfloor + \text{Stance Bonus}$$

- **Base Trigger Chance by Tier**:
  - Hoàng Cấp (Tier 1): `55%`
  - Huyền Cấp (Tier 2): `45%`
  - Địa Cấp (Tier 3): `40%`
  - Thiên Cấp (Tier 4): `35%`
  - Thánh Cấp (Tier 5): `30%`
  - Tiên Cấp (Tier 6): `25%`
  - Thần Cấp (Tier 7): `20%`
- **Modifiers**:
  - Skill Mastery Level: `+1%` per level above 1.
  - Dexterity: `+1%` per 10 points.
  - Thế Phá Quy (Breaker Stance): `+5%`.
- **Bounds**: Clamped between `15%` (minimum reliability) and `85%` (preventing absolute determinism).

### 2.3 Turn-by-Turn Execution Flow
```
Turn Begins
   │
   ├─► Query Player Equipped Active Skills
   │
   ├─► Filter skills where currentEnergy >= skill.cost
   │
   ├─► Shuffle Candidate Skills
   │
   ├─► Loop Candidates:
   │      ├─► Calculate Total Trigger Chance
   │      ├─► Roll mt_rand(1, 100) <= Chance
   │      └─► If SUCCESS:
   │             ├─ Deduct skill.cost from currentEnergy
   │             ├─ Apply skill multipliers, elements, and status effects
   │             ├─ Gain Skill Mastery XP (+1)
   │             └─ Log: "⚡ [Kích Hoạt X%] Player casts [SkillName]! (-Cost Qi)"
   │
   └─► If NO SKILL TRIGGERED (or insufficient Qi):
          └─ Execute Normal Attack (Thường công, 0 Qi cost)
```

---

## 3. Pillar 2: Tâm Pháp & Hào Quang (Mana Reservation)

### 3.1 Separation of Energies
To eliminate ambiguity, the engine strictly segregates bodily endurance from mystical combat energy:
1. **Thể Lực (World Stamina)**: Governs world interactions (Map Exploration, Gym Training, Travel). Regenerates passively or via resting.
2. **Linh Lực (Combat Qi)**: Governs active skills and aura reservation in turn-based encounters.

### 3.2 Mana Reservation Mechanic
Auras continuously occupy a percentage of the player's total `maxEnergy`, establishing an active tactical tradeoff between persistent defensive/regenerative buffs and burst combat capacity:

$$\text{Reserved Qi} = \left\lfloor \text{maxEnergy} \times \frac{\min(85, \sum \text{ReservationPct})}{100} \right\rfloor$$

$$\text{Usable Qi} = \max(5, \text{maxEnergy} - \text{Reserved Qi})$$

- **Maximum Reservation Cap**: 85% (at least 15% or 5 Qi remains accessible for basic techniques).
- **Canonical Auras**:
  - `ho_the_kim_chung` (Hộ Thể Kim Chung): 20% Reservation (+25 Defense, +100 HP, -20% Lightning Tribulation damage).
  - `thanh_tam_quyet` (Thanh Tâm Quyết): 15% Reservation (+10% Dodge, +5% Crit, immunity to Freeze).
  - `toa_thien` (Toạ Thiền Tụ Khí): 10% Reservation (+5 HP Regen, +2 Stamina Regen per tick).

---

## 4. Pillar 3: Thông Thạo Quái Vật (Monster Mastery)

Replaces legacy abstract passives with an action-driven 5-Star Bestiary system tracking confirmed kills per monster species (`player_monster_mastery`):

| Star Rank | Kills Required | Unlocked Combat Advantage |
| :---: | :---: | :--- |
| **★☆☆☆☆ (Nhập Môn)** | 1 | Lifts Fog of War: reveals monster attributes, element, and lore in Wiki. |
| **★★☆☆☆ (Tiểu Thành)** | 5 | Species Instinct Counter: `+10%` final damage dealt to this monster. |
| **★★★☆☆ (Đại Thành)** | 15 | Defensive Acclimation: `-10%` damage taken from this monster species; `+15%` drop rate. |
| **★★★★☆ (Khắc Chế)**| 35 | Flaw Exploitation: `+20%` damage dealt; `25%` chance redirecting hit into Glitch Weakpoint (x2.5 Dmg). |
| **★★★★★ (Tuyệt Diệt)**| 75 | Sovereign Execution: `+25%` damage dealt; `10%` chance instant Execute if monster HP $\le 15\%$. |

---

## 5. Pillar 4: Thông Thạo Chế Tạo (Crafting Mastery)

Integrates Alchemy (Luyện Đan) and Forging (Đúc Khí) into a singular mastery progression with Dao titles scaling from Level 1 to 100+:

### 5.1 Mastery Ranks & Titles
- **Lv. 1 - 20**: Dược Đồng / Thiết Điệt (Apprentice)
- **Lv. 21 - 40**: Đan Sĩ / Luyện Khí Sư (Adept)
- **Lv. 41 - 60**: Đại Sư (Master) — Unlocks Critical Quality Crafting (`Tinh Phẩm` / `Cực Phẩm`)
- **Lv. 61 - 80**: Tông Sư (Grandmaster) — `15%` chance to duplicate crafted pills
- **Lv. 81 - 100+**: Thần Nông / Âu Dã Tử (Saint Artisan) — `20%` material refund upon failure; chance for `Thiên Phẩm` gear

### 5.2 Quality Tier Bonuses
When crafting equipment at high mastery:
- **Phàm Phẩm (Standard)**: 100% base attributes.
- **Tinh Phẩm (Superior)**: +15% base attributes, +1 bonus affix slot.
- **Cực Phẩm (Flawless)**: +30% base attributes, +2 bonus affix slots.
- **Thiên Phẩm (Divine)**: +50% base attributes, guaranteed rare elemental modifier.

---

## 6. Database Schema & State Mapping

```sql
-- Player Skills State
CREATE TABLE IF NOT EXISTS player_skills (
    player_id VARCHAR(64) NOT NULL,
    skill_id VARCHAR(64) NOT NULL,
    level INT UNSIGNED NOT NULL DEFAULT 1,
    current_xp INT UNSIGNED NOT NULL DEFAULT 0,
    is_equipped TINYINT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (player_id, skill_id)
);

-- Active Auras Persistence
-- Stored as JSON column in `players.active_auras` ['ho_the_kim_chung', 'toa_thien']

-- Monster Mastery Persistence
CREATE TABLE IF NOT EXISTS player_monster_mastery (
    player_id VARCHAR(64) NOT NULL,
    monster_id VARCHAR(64) NOT NULL,
    kills INT UNSIGNED NOT NULL DEFAULT 0,
    mastery_tier TINYINT UNSIGNED NOT NULL DEFAULT 0,
    PRIMARY KEY (player_id, monster_id)
);

-- Crafting Mastery Persistence
-- Stored in `players.crafting_level` and `players.crafting_xp`
```

---

## 7. API Route Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/player/{id}/learn-skill` | Acquires a new skill from scripture or quest. |
| `POST` | `/api/player/{id}/equip-skill` | Toggles equipping an active skill into the combat loadout. |
| `POST` | `/api/player/{id}/skills/toggle-aura` | Toggles a Mana Reservation aura on/off. |
| `GET`  | `/api/player/{id}/monster-mastery` | Retrieves 5★ bestiary progress and active combat bonuses. |
| `GET`  | `/api/player/{id}/crafting-mastery` | Retrieves crafting level, Dao title, and passive perk bonuses. |
| `GET`  | `/api/data/skills` | Returns global skill master catalog. |
