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

---

## 6. Map-Specific Characteristic Materials (Signature Specialties)

Each realm features native signature materials (`specialties`) that can only be found or have their highest concentrations in that specific habitat.

### 6.1 Weighted Pool Selection & Specialty Procs
Items inside the area resource pools have calibrated weights:
- Standard materials: weight $\approx 35 - 50$
- Signature specialty materials: weight $\approx 20 - 30$ with `isSpecialty: true`

When a signature specialty material is rolled:
1. **Title & Log Elevation**:
   - Herb: `🌟 [ĐẶC SẢN VÙNG MIỀN] Dược Thảo Bản Địa: [Tên NVL]`
   - Mineral: `💎 [KHOÁNG MẠCH BẢN ĐỊA] Khoáng Thạch Đặc Thù: [Tên NVL]`
   - Material: `🌟 [VẬT LIỆU BẢN ĐỊA] Nhặt được [Tên NVL] (Đặc sản [Vùng])`
2. **Experience & Gold Bonuses**:
   - Extra $+15$ life skill XP.
   - Extra $+15$ to $+45$ Spirit Stones (Linh Thạch).
3. **Frontend Presentation**:
   - Highlighted in UI via a prominent gradient badge (`🌟 ĐẶC SẢN BẢN ĐỊA`).
   - Signature materials of each realm are displayed on both the Combat Exploration panel (`pages/combat.js`) and the World Map travel cards (`pages/travel.js`).

### 6.2 Master 18-Realm Signature Material Directory

| # | Realm ID | Realm Name | Herb % | Mineral % | Signature Characteristic Materials |
|---|---|---|:---:|:---:|---|
| 1 | `thanh_lam_tran` | Thanh Lam Trấn | 25% | 10% | `mat_thao_moc_thanh_lam` (Thanh Lam Diệp), `mat_thiet_khoang_tho` (Thiết Khoáng Thô) |
| 2 | `hac_phong_lam` | Hắc Phong Lâm | 25% | 10% | `mat_nhua_hac_phong` (Nhựa Hắc Phong Mộc), `mat_hac_thach` (Hắc Phong Thạch) |
| 3 | `vong_linh_coc` | Vọng Linh Cốc | 15% | 20% | `mat_am_hon_thao` (Ám Hồn Thảo), `mat_u_hon_thach` (U Hồn Thạch) |
| 4 | `bac_suong_canh` | Bắc Sương Cảnh | 25% | 12% | `mat_huyen_bang_hoa` (Huyền Băng Hoa), `mat_bang_phach_thach` (Băng Phách Thạch) |
| 5 | `co_moc_linh_vien` | Cổ Mộc Linh Viên | 35% | 10% | `mat_huyen_thien_hoa` (Huyền Thiên Hoa), `mat_co_moc_tam` (Cổ Mộc Tinh Tâm) |
| 6 | `am_sat_hoang` | Ám Sát Hoang | 10% | 25% | `mat_sa_tinh_thao` (Sa Tinh Thảo), `mat_hac_sa_tinh` (Hắc Sa Tinh) |
| 7 | `thiet_huyet_son` | Thiết Huyết Sơn | 10% | 30% | `mat_thiet_huyet_khoang` (Thiết Huyết Quặng), `mat_tinh_hoa` (Tinh Hỏa) |
| 8 | `thien_kiep_uyen` | Thiên Kiếp Uyên | 10% | 30% | `mat_hach_sam` (Hạch Sấm Cổ), `mat_loi_tinh_thach` (Lôi Kiếp Thạch) |
| 9 | `huyet_ma_chien_truong` | Huyết Ma Chiến Trường | 10% | 25% | `mat_huyet_tinh_thach` (Huyết Ma Cốt Tinh), `mat_xac_khi` (Xác Khí Cổ) |
| 10 | `thien_hoa_linh_dia` | Thiên Hỏa Linh Địa | 20% | 25% | `hoa_linh_chi` (Hỏa Linh Chi Thượng Phẩm), `mat_dia_hoa_tinh` (Địa Hỏa Tinh Thạch) |
| 11 | `u_minh_quy_vuc` | U Minh Quỷ Vực | 10% | 25% | `mat_u_minh_thao` (U Minh Quỷ Thảo), `mat_ma_nhan` (Ma Nhãn U Minh) |
| 12 | `thien_dao_tan_tich` | Thiên Đạo Tàn Tích | 15% | 25% | `mat_tran_phap_tan_phien` (Tàn Phiến Trận Đồ), `mat_thien_thach` (Thiên Thạch Thượng Cổ) |
| 13 | `vo_tan_hu_khong` | Vô Tận Hư Không | 5% | 35% | `mat_hu_khong_tinh` (Hư Không Tinh), `mat_khong_gian_thach` (Không Gian Thạch) |
| 14 | `cuu_u_than_uyen` | Cửu U Thần Uyên | 5% | 30% | `mat_cuu_u_hac_thuy` (Cửu U Hắc Thủy), `mat_loi_dia` (Lõi Địa) |
| 15 | `thai_co_hong_hoang` | Thái Cổ Hồng Hoang | 15% | 25% | `mat_moc_hoang_tinh` (Mộc Hoang Tinh), `mat_ba_vuong_nanh` (Nanh Bá Vương) |
| 16 | `chu_thien_tinh_hai` | Chư Thiên Tinh Hải | 10% | 30% | `mat_tinh_tieu_thach` (Tinh Tiêu Thạch), `mat_loi_de_vu` (Lôi Đế Vũ) |
| 17 | `hon_don_tien_vuc` | Hỗn Độn Tiên Vực | 15% | 25% | `mat_hon_don_khi` (Hỗn Độn Khí Tinh), `mat_gioi_tu_thach` (Giới Tử Thạch) |
| 18 | `hon_nguyen_dao_canh` | Hỗn Nguyên Đạo Cảnh | 15% | 25% | `mat_hon_nguyen_chau` (Hỗn Nguyên Đạo Châu), `ban_nguyen_tinh` (Bản Nguyên Tinh) |

