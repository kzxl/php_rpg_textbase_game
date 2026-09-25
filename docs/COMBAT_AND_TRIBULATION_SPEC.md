# Combat & Heavenly Tribulation Specification (Chiến Đấu & Lôi Kiếp)

## 1. Executive Summary & Design Scope

Combat in *Nghịch Thiên Ký* bridges tactical turn-based martial exchanges (adapted from Torn City's hit location & outcome models) with deep Xianxia mystical concepts:
1. **Dynamic Active Skill Trigger Probability (Xác Suất Kích Hoạt)**: Probabilistic skill activation replacing deterministic spam.
2. **Heavenly Tribulation Survival Trials (Đột Phá Lôi Kiếp)**: High-stakes survival trials where players endure sequential multi-wave heavenly lightning strikes to advance major realms.
3. **Glitch Weakpoints & Stance Dynamics (Vết Nứt & Thế Chiến Đấu)**: Breaker, Flow, and Glitch stances exploiting universal rule tears.
4. **Five Elements Affinity Cycle (Ngũ Hành Tương Khắc)**: Directional elemental multipliers.

---

## 2. CombatEngine Architecture

### 2.1 Fight Bounds & Turn Limit
- **Max Turns**: `25` turns per battle.
- **Stalemate Rule**: If neither combatant has fallen after 25 turns, the fight concludes in a draw (`stalemate`), rewarding half XP and partial spirit stones.
- **Auto-Flee Check**: When a monster misses an attack and player HP is critically low ($< 25\%$), the player attempts an automatic escape roll:
  $$\text{Flee Chance (\%)} = \text{DodgeChance}(\text{Player Dexterity}, \text{Monster Speed})$$

### 2.2 Hit Locations & Damage Multipliers
Each attack targets a specific anatomical body part based on weighted distributions:

| Body Part | Damage Multiplier | Selection Weight | Description |
| :--- | :---: | :---: | :--- |
| **Đầu (Head)** | `3.5x` | 5 | Devastating critical strike |
| **Cổ (Throat)** | `3.5x` | 3 | Lethal vital strike |
| **Tim (Heart)** | `3.5x` | 2 | Core fatal strike |
| **Ngực (Chest)** | `2.0x` | 15 | Major torso impact |
| **Bụng (Stomach)**| `2.0x` | 12 | Core body blow |
| **Háng (Groin)** | `2.0x` | 5 | Incapacitating strike |
| **Tay (Arms)** | `1.0x` | 20 | Standard limb strike |
| **Chân (Legs)** | `1.0x` | 20 | Standard limb strike |
| **Vai (Shoulder)**| `0.7x` | 10 | Glancing blow |
| **Bàn tay (Hands)**| `0.7x` | 8 | Deflected contact |

---

## 3. Active Skill Trigger Probability (Cơ Chế Xuất Chiêu)

### 3.1 Mathematical Formula
When player turn starts, equipped active skills roll for activation:

$$\text{Trigger Chance} = \text{Base} + (\text{Level} - 1)\times 1\% + \left\lfloor\frac{\text{Dexterity}}{10}\right\rfloor\times 1\% + \text{StanceBonus}$$

- **Base Rates**: Tier 1: `55%`, Tier 2: `45%`, Tier 3: `40%`, Tier 4: `35%`, Tier 5: `30%`, Tier 6: `25%`, Tier 7: `20%`.
- **Clamping**: $\text{Trigger Chance} \in [15\%, 85\%]$.

### 3.2 Dual State Handling
1. **Trigger Success (`mt_rand(1, 100) <= TriggerChance`)**:
   - Deducts skill energy (`cost`) from `player.currentEnergy`.
   - Applies skill damage multiplier, multi-hit iterations, execute scaling, and status debuffs (Burn, Poison, Freeze).
   - Accrues skill mastery XP (+1).
   - Log: `⚡ [Kích Hoạt X%] {Player} bạo phát linh lực, thi triển [{SkillName}]! (-{Cost} Linh Lực)`
2. **Trigger Failure / Insufficient Energy**:
   - Player defaults to **Thường Công (Normal Attack)**.
   - Cost: `0` Qi. Base multiplier: `1.0x`. Physical weapon damage.
   - Log: `⚔️ {Player} vận kình xuất thường công`

---

## 4. Heavenly Tribulation Survival Mechanics (Đột Phá Lôi Kiếp)

Major Realm breakthroughs (e.g. Luyện Khí $\to$ Trúc Cơ $\to$ Kim Đan $\to$ Nguyên Anh) summon the wrath of heaven through a dedicated survival trial.

### 4.1 Lightning Strike Characteristics
Each major realm breakthrough features a specific lightning configuration:

| Realm Transition | Tribulation Title | Lightning Waves | Base Power | Primary Damage Type |
| :--- | :--- | :---: | :---: | :--- |
| **Luyện Khí $\to$ Trúc Cơ** | Tam Cửu Lôi Kiếp | 3 | 250 | Lôi Điện Thuần Dương |
| **Trúc Cơ $\to$ Kim Đan** | Lục Cửu Lôi Kiếp | 6 | 600 | Tử Tiêu Thần Lôi |
| **Kim Đan $\to$ Nguyên Anh**| Cửu Cửu Lôi Kiếp | 9 | 1,400 | Hỗn Độn Diệt Thế Kiếp |
| **Nguyên Anh $\to$ Hóa Thần**| Cửu U Ma Kiếp | 9 | 3,200 | U Minh Huyền Lôi |
| **Hóa Thần $\to$ Luyện Hư** | Ngũ Hành Thiên Kiếp | 12 | 7,500 | Ngũ Hành Tịch Diệt Lôi |
| **Luyện Hư $\to$ Hợp Thể** | Thái Cực Lôi Kiếp | 12 | 16,000 | Vô Cực Thái Thanh Lôi |
| **Hợp Thể $\to$ Đại Thừa** | Hỗn Nguyên Đạo Kiếp | 15 | 35,000 | Cửu Thiên Đạo Tổ Kiếp |
| **Đại Thừa $\to$ Độ Kiếp** | Vô Thượng Thiên Kiếp | 18 | 80,000 | Thiên Đạo Phạt Tội Lôi |

### 4.2 Multi-Wave Damage Scaling
Lightning intensity escalates exponentially across consecutive waves:

$$\text{Wave Power}(w) = \text{Base Power} \times \left(1.0 + (w - 1) \times 0.20\right)$$

### 4.3 Mitigation Pipeline
Damage sustained by the player during each lightning wave passes through layered defenses:

$$\text{Sustained Damage} = \text{Wave Power} \times (1 - \text{DefenseReduction}) \times (1 - \text{AuraReduction}) \times (1 - \text{PillMitigation})$$

- **Defense Reduction**: Up to `75%` mitigation via high defense attributes.
- **Aura Mitigation**: `ho_the_kim_chung` grants flat `-20%` tribulation damage reduction.
- **Consumable Pills**:
  - `Hộ Mạch Đan`: `-25%` damage for 3 waves.
  - `Độ Kiếp Đan`: Prevents instant death once if HP reaches 0 (leaves player with 1 HP).

### 4.4 Trial Outcomes
- **Survival (HP > 0 after all waves)**: Realm successfully shattered! Major stat multipliers applied; `realmTier` increments; full HP/Qi restoration.
- **Failure (HP reaches 0)**: Breakthrough shattered. Player is hospitalized (`hospitalUntil`), experiences 10% cultivation XP backlash, and must recover before attempting again.

---

## 5. Glitch Weakpoints & Combat Stances

### 5.1 Three Tactical Stances
- **Thế Phá Quy (Breaker)**:
  - +20% damage on Weakpoint hits.
  - +5% Active Skill Trigger probability.
  - Prioritizes critical weakpoint spawns (Đầu, Tim, Ngực).
- **Thế Du Đạo (Flow)**:
  - +15% dodge chance.
  - Dodging restores `6` Linh Lực and reflects `25%` of enemy strength back as counter damage.
- **Thế Nghịch Hành (Glitch)**:
  - Desperation scaling: damage increases inversely with current HP:
    $$\text{Bonus DMG} = (1 - \text{HpRatio}) \times 80\%$$

### 5.2 Glitch Weakpoints (Vết Nứt Thiên Đạo)
- Each round rolls a random body part displaying a dimensional glitch tear.
- Hitting the weakpoint deals **2.5x base damage** (3.0x with `weakpoint_striker` imprint).
- Grants `+5` Thấu Triệt (Insight) points and applies **Glitch Shock** to the monster (-25% damage on its next attack).
