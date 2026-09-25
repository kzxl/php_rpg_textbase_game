# Skills & Cultivation System Specification (Cụm Kỹ Năng — Công Pháp)

## 1. Executive Summary & Audit Findings

The current **Kỹ Năng & Công Pháp** cluster is composed of 6 sub-features across multiple data files and page scripts:

```
[Current 6-Tab Structure]
├── Tab 1: Chiến Đấu (Active combat techniques)
├── Tab 2: Sinh Hoạt (Gathering & craft skills)
├── Tab 3: Nội Công (Passive stat modifiers)
├── Tab 4: Công Pháp (Timed study trees: education.json)
├── Tab 5: Tàng Kinh Các (Scripture library & perception check)
└── Tab 6: Thiên Đạo Dị Biến (Stances & Fog-of-War Imprints)
```

### Critical Issues Identified in Audit:
1. **Terminology Collision ("Nội Công")**:
   - Tab 3 is titled "Nội Công" (skills from `skills.json` like `toa_thien`).
   - Tab 4 (Công Pháp) has a primary tree titled "Nội Công" (`internal_cultivation` in `education.json`).
   - *Impact*: Players are confused about where their passives come from and which "Nội Công" they are leveling.
2. **Library Redundancy**:
   - Tabs 1-3 already display a list of "Chưa lĩnh ngộ" (unlearned skills).
   - Tab 5 (Tàng Kinh Các) shows all skills again as an encyclopedia.
   - *Impact*: Dilutes the purpose of Tàng Kinh Các from an ancient scripture pavilion into a duplicate skill list.
3. **Tab Overload**:
   - 6 horizontal tabs crowd the mobile and tablet responsive layouts.

---

## 2. Proposed Unified 4-Pillar Model (Mô Hình 4 Trụ Cột)

To maintain deep Xianxia flavor while eliminating clutter, we restructure the cluster into **4 distinct, non-overlapping pillars**:

```
[Unified 4-Pillar Model]
├── 1. ⚔️ CHIÊU THỨC (Skills & Techniques)
│      ├── Sub-Filter: Tất Cả | Chủ Động | Bị Động | Sinh Hoạt
│      └── Equipped combat loadout (Max 4 active skills)
│
├── 2. 📖 TÂM PHÁP (Cultivation Trees / Education)
│      ├── Cây 1: Kinh Mạch Thiên (HP, Thể Lực, Phòng Ngự)
│      ├── Cây 2: Thiên Cơ Thiên (Nhãn Thuật, Ngộ Tính, Rơi Đồ)
│      └── Cây 3: Đan Đạo Thiên (Hiệu quả đan dược, Luyện Đan)
│
├── 3. 🌌 DỊ BIẾN (Heavenly Glitches & Anomalies)
│      ├── Sương Mù Tính Năng (Master Fog of War)
│      ├── 3 Thế Chiến Đấu (Stances: Phá Quy, Du Đạo, Nghịch Hành)
│      └── 10 Dấu Ấn Bí Ẩn (Mystery Imprints with Riddles)
│
└── 4. 📚 TÀNG KINH CÁC (Scripture Pavilion)
       ├── Tra cứu bí tịch theo Phẩm Cấp (Hoàng/Huyền/Địa/Thiên/Thánh/Thần)
       └── Mua / Đổi bí tịch dựa trên Nhãn Thuật (Perception Tier)
```

---

## 3. Data & Entity Relationship

```
Player Model
  ├── skills: [{ id, level, xp, equipped }] ──► skills.json
  ├── studyingNode, studyEndsAt, unlockedNodes ──► education.json
  ├── unlockedImprints, activeStance, glitchInsight ──► GlitchSystem
  └── talentDisplay, realmTier ──► StatEngine & RealmSystem
```

---

## 4. Key Improvements in the 4-Pillar Model

| Pillar | Focus | What changes from current implementation? |
| :--- | :--- | :--- |
| **Chiêu Thức** | Actionable combat & life skills | Combines Tabs 1, 2, 3 into a single unified page with clean quick-filter tags (`Chủ động`, `Bị động`, `Sinh hoạt`). |
| **Tâm Pháp** | Internal foundation (Gốc rễ) | Renamed from "Nội Công" / "Công Pháp" to "Tâm Pháp Kinh Mạch" to avoid naming collisions. |
| **Dị Biến** | Rule-breaking anomalies | Integrated with 2-tier Fog of War (locked for beginners; riddles for undiscovered imprints). |
| **Tàng Kinh Các**| Scripture discovery & acquisition | Focuses on scripture scrolls acquisition and requirement decoding based on player Nhãn Thuật tier. |
