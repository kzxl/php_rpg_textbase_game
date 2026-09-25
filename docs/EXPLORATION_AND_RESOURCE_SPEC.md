# Technical Specification: Exploration & Differentiated Resource System

## 1. Overview
The Exploration Engine (`Features/Exploration/routes.php`) provides an immersive world discovery loop across 18 celestial realms. It explicitly separates resource discovery into dedicated thematic branches:
1. 🌿 **Herb Gathering (`type: 'herb'`)**: Dedicated to medicinal herbs, scaling with the `hai_duoc` (Herb Gathering) life skill.
2. ⛏️ **Mineral Mining (`type: 'mineral'`)**: Dedicated to ores, spirit stones, and space crystals, scaling with the `khai_khoang` (Mining) life skill.
3. 📦 **Wilderness Materials (`type: 'material'`)**: General beast drops and worldly curiosities.

---

## 2. Area Weight Distribution Archetypes
All 18 realms feature tuned probability weights totaling 100%:
- **Lush & Forest Realms** (e.g., *Cổ Mộc Linh Viên*, *Hắc Phong Lâm*, *Thanh Lam Trấn*):
  - Herb Weight: 25% – 35%
  - Mineral Weight: 10% – 12%
- **Mountain, Cave & Void Realms** (e.g., *Thiết Huyết Sơn*, *Thiên Kiếp Uyên*, *Vô Tận Hư Không*):
  - Mineral Weight: 25% – 35%
  - Herb Weight: 5% – 10%
- **Balanced Celestial Realms** (e.g., *Thiên Đạo Tàn Tích*, *Thái Cổ Hồng Hoang*, *Hỗn Nguyên Đạo Cảnh*):
  - Mineral Weight: 25%
  - Herb Weight: 15%

---

## 3. Skill Scaling & Yield Formulas

### 3.1 Base Yield Multiplier
Both life skills (`hai_duoc` and `khai_khoang`) provide incremental yield increases as players level up:
$$\text{Yield}_{\text{base}} = 1 + \left\lfloor \frac{\max(0, \text{SkillLevel} - 1)}{3} \right\rfloor$$
- **Level 1 – 3**: 1 item
- **Level 4 – 6**: 2 items
- **Level 7 – 9**: 3 items
- **Level 10+**: 4+ items

### 3.2 Critical Harvest / Deep Vein Strike
When gathering herbs or mining minerals, players have a chance to trigger a Critical Harvest:
$$\text{CritChance} = \min(50\%, 10\% + \text{SkillLevel} \times 3\%)$$
- **Effect**: Yield is doubled ($2 \times \text{Yield}_{\text{base}}$).
- **Bonus Spirit Stones (Linh Thạch)**:
  - Herbs: $\text{BonusGold} = \text{random}(10, 30) \times \text{Tier}$
  - Minerals: $\text{BonusGold} = \text{random}(15, 40) \times \text{Tier}$

### 3.3 Experience Progression
Gaining skill experience scales directly with the material tier ($T \in [1, 5]$):
$$\text{XP}_{\text{gain}} = (T \times 15) + (\text{isCritical} ? 10 : 0)$$
- **Auto-Registration**: If a player explores before formally learning a life skill, the system automatically registers the skill at Level 1 with 0 XP and applies the gained XP.
- **Persistence**: All skill XP changes are instantly synchronized to the `player_skills` relational table via `PlayerRepository::saveSkills($id, $player)` inside `PlayerService::save`.

---

## 4. Event Payloads

### Herb Gathering Payload
```json
{
  "type": "herb",
  "title": "🌿 Dược Thảo Thiên Nhiên",
  "message": "🌿 Phát hiện linh thảo sinh trưởng! Thu hái được 2x Linh Thảo.",
  "itemId": "linh_thao",
  "itemName": "Linh Thảo",
  "quantity": 2,
  "isCritical": false,
  "skillId": "hai_duoc",
  "skillName": "Hái Dược",
  "skillLevel": 1,
  "skillXpGained": 15,
  "levelUp": null,
  "bonusGold": 0,
  "questNotifications": []
}
```

### Mineral Mining Payload
```json
{
  "type": "mineral",
  "title": "⛏️ Mạch Khoáng Thiên Địa",
  "message": "💎 [MẠCH KHOÁNG ĐẠI PHÁT] Đục thủng cổ thạch (Khai Khoáng Cấp 2), bạn khai thác được 2x Tinh Thạch thượng phẩm!",
  "itemId": "mat_tinh_thach",
  "itemName": "Tinh Thạch",
  "quantity": 2,
  "isCritical": true,
  "skillId": "khai_khoang",
  "skillName": "Khai Khoáng",
  "skillLevel": 2,
  "skillXpGained": 40,
  "levelUp": null,
  "bonusGold": 45,
  "questNotifications": []
}
```

---

## 5. Backward Compatibility
Any area defining legacy `material` event pools automatically undergoes dynamic classification:
- If material belongs to category `herb` or contains floral substrings (`thao`, `chi`, `hoa`), it delegates to the **Herb Gathering Engine**.
- If material belongs to `elemental`, `spirit`, or contains mineral substrings (`thach`, `tinh`, `kim_loai`, `loi_dia`), it delegates to the **Mineral Mining Engine**.
- General beast parts (meat, hides, venom, bones) remain under general `material`.
