# Next Work — Tính Năng Cần Hoàn Thiện

## 🔴 Ưu Tiên Cao — Bug / Chưa Hoàn Thiện

### Frontend Flow
- [ ] **World Boss Discovery UI** — Frontend hiển thị khi gặp boss: 2 nút Solo/Phát Động, gọi API rally-boss
- [ ] **Boss Phát Hiện Tab** — Thêm tab "🐉 Boss" trong trang Khám Phá, hiện danh sách active bosses (GET /api/active-bosses)
- [ ] **NPC Quest Dialog** — Frontend hiển thị questOffer/questReminder khi gặp NPC, nút nhận quest
- [ ] **Thiên Phần Tháp Combat Error** — Kiểm tra lỗi chiến đấu cụ thể (user report "chiến đấu lỗi"), có thể liên quan đến missing monster data

### Backend
- [ ] **Công Pháp Special Skills** — Công pháp unlock kỹ năng đặc biệt, đổi công pháp → mất kỹ năng đó
- [ ] **Global Events System** — Hàm `addGlobalEvent()` cho boss rally notifications (hiện check function_exists)

---

## 🟡 Tier 1 — Impact Cao

### Progression & Combat
- [ ] 🏆 **Danh Hiệu (Achievements)** — Hidden achievements, passive bonuses, lore
- [ ] 🎒 **Cường Hóa Trang Bị** — Enhancement +1→+10, tỷ lệ thất bại tăng dần
- [ ] ⛓️ **Thiên Lao Chi Tiết** — Prison system: buôn lậu, vượt ngục, thời gian giam
- [ ] 📊 **Combat History** — Lưu 20 trận gần nhất, thống kê win rate

### Social & Economy
- [ ] 🏰 **Phái (Sect System)** — Chính Đạo / Ma Đạo / Tán Tu, reputation, faction shop
- [ ] ⚔️ **PvP Arena Ranking** — Elo hàng mùa, daily limit, rewards theo rank
- [ ] 📜 **Story Events** — 5 chương cốt truyện integrate vào gameplay

---

## 🟢 Tier 2 — QoL & Polish

- [ ] 🗺️ **World Map Visual** — Bản đồ trực quan thay vì dropdown list
- [ ] 📅 **7-Day Login Calendar** — Streak rewards, monthly reset
- [ ] 🔔 **Push Notification System** — Server-side events, real-time updates
- [ ] 📱 **Responsive Mobile** — Optimize UI cho điện thoại
- [ ] 🎨 **Theme System** — Dark/Light mode, custom accent colors

---

## ✅ Đã Hoàn Thành (Session này)

- [x] Skills 4-tab: Chiến Đấu / Sinh Hoạt / Nội Công / Công Pháp
- [x] Công Pháp merged vào Kỹ Năng (tab 4)
- [x] Nav restructure: Ngao Du, Nhiệm Vụ (merged), bỏ Boss nav, bỏ Gacha
- [x] HP base regen 0.5%/10s, Tọa Thiền 1%/10s
- [x] World Boss: rally-boss + active-bosses endpoints
- [x] NPC quest encounter (duplicate prevention, reminder)
- [x] Tower: stamina cost per floor (10 + floor/10)
- [x] NPC Shop: card layout overhaul + CSS
- [x] Leaderboard: rewrite + fix tab bug
- [x] Events: icon fix + 24 event types
- [x] Wiki: 2 new tabs (Skills, Tower) + comprehensive update
- [x] Migration 031: housing tables + world_bosses columns
- [x] Mugging 2-phase PvP system
