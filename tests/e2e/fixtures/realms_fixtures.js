/**
 * World Realms & Secret Dungeons Fixtures for Nghịch Thiên Ký E2E Suite
 */

export const realmsFixtures = {
  // All 18 Canonical World Zones conforming to exploration.json & Player.php
  worldZones: [
    { id: 'thanh_lam_tran', name: 'Thanh Lam Trấn', tier: 'Phàm Trần', min_level: 1, required_realm: 'Luyện Khí', stamina_cost: 10, travel_time: 0, env: 'Khu vực an toàn', specialties: ['Thanh Lam Diệp', 'Thiết Khoáng Thô'] },
    { id: 'hac_phong_lam', name: 'Hắc Phong Lâm', tier: 'Phàm Trần', min_level: 8, required_realm: 'Luyện Khí', stamina_cost: 12, travel_time: 15, env: '+5% Tốc Độ', specialties: ['Nhựa Hắc Phong Mộc', 'Hắc Phong Thạch'] },
    { id: 'vong_linh_coc', name: 'Vong Linh Cốc', tier: 'Phàm Trần', min_level: 18, required_realm: 'Trúc Cơ', stamina_cost: 15, travel_time: 25, env: '+10% Nhanh Nhẹn', specialties: ['Ám Hồn Thảo', 'U Hồn Thạch'] },
    { id: 'bac_suong_canh', name: 'Bắc Sương Cảnh', tier: 'Man Hoang', min_level: 30, required_realm: 'Kim Đan', stamina_cost: 18, travel_time: 35, env: '-10% Tốc Độ', specialties: ['Huyền Băng Hoa', 'Băng Phách Thạch'] },
    { id: 'co_moc_linh_vien', name: 'Cổ Mộc Linh Viên', tier: 'Man Hoang', min_level: 30, required_realm: 'Kim Đan', stamina_cost: 20, travel_time: 40, env: '+15% Phòng Ngự', specialties: ['Mộc Linh Chi', 'Cổ Mộc Thạch'] },
    { id: 'am_sat_hoang', name: 'Ám Sát Hoang', tier: 'Man Hoang', min_level: 38, required_realm: 'Kim Đan', stamina_cost: 22, travel_time: 45, env: '+15 Nhanh Nhẹn', specialties: ['Ám Sát Thảo', 'Huyết Thạch'] },
    { id: 'thiet_huyet_son', name: 'Thiết Huyết Sơn', tier: 'Man Hoang', min_level: 45, required_realm: 'Hóa Thần', stamina_cost: 25, travel_time: 50, env: '+10% ST Hỏa', specialties: ['Thiết Huyết Thảo', 'Xích Huyết Khoáng'] },
    { id: 'thien_kiep_uyen', name: 'Thiên Kiếp Uyên', tier: 'Man Hoang', min_level: 55, required_realm: 'Luyện Hư', stamina_cost: 30, travel_time: 60, env: '+15% Tốc Độ', specialties: ['Lôi Đình Thảo', 'Kiếp Lôi Tinh Thạch'] },
    { id: 'huyet_ma_chien_truong', name: 'Huyết Ma Chiến Trường', tier: 'Viễn Cổ', min_level: 65, required_realm: 'Hợp Thể', stamina_cost: 35, travel_time: 70, env: '+30% ST, +20% ST nhận', specialties: ['Ma Huyết Thảo', 'Huyết Tinh Thạch'] },
    { id: 'thien_hoa_linh_dia', name: 'Thiên Hỏa Linh Địa', tier: 'Viễn Cổ', min_level: 75, required_realm: 'Hợp Thể', stamina_cost: 40, travel_time: 80, env: '+25% ST Hỏa', specialties: ['Thiên Hỏa Liên', 'Địa Hỏa Thạch'] },
    { id: 'u_minh_quy_vuc', name: 'U Minh Quỷ Vực', tier: 'Viễn Cổ', min_level: 85, required_realm: 'Đại Thừa', stamina_cost: 45, travel_time: 90, env: '-15% Phòng Ngự', specialties: ['U Minh Quỷ Thảo', 'Cửu U Thạch'] },
    { id: 'thien_dao_tan_tich', name: 'Thiên Đạo Tàn Tích', tier: 'Viễn Cổ', min_level: 95, required_realm: 'Đại Thừa', stamina_cost: 50, travel_time: 100, env: '+15% Toàn Chỉ Số', specialties: ['Thiên Đạo Thảo', 'Thần Tích Thạch'] },
    { id: 'vo_tan_hu_khong', name: 'Vô Tận Hư Không', tier: 'Vực Ngoại', min_level: 105, required_realm: 'Độ Kiếp', stamina_cost: 60, travel_time: 120, env: '+50% ST Gây & Nhận', specialties: ['Hư Không Thảo', 'Không Gian Tinh Thạch'] },
    { id: 'cuu_u_than_uyen', name: 'Cửu U Thần Uyên', tier: 'Vực Ngoại', min_level: 115, required_realm: 'Độ Kiếp', stamina_cost: 70, travel_time: 140, env: '+35% ST, +20% Tốc Độ', specialties: ['Ma Linh Chi', 'Hắc Ám Thần Thạch'] },
    { id: 'thai_co_hong_hoang', name: 'Thái Cổ Hồng Hoang', tier: 'Vực Ngoại', min_level: 125, required_realm: 'Chân Tiên', stamina_cost: 80, travel_time: 160, env: '+25% HP, +20% Giáp', specialties: ['Hồng Hoang Cổ Thảo', 'Thái Cổ Thần Thạch'] },
    { id: 'chu_thien_tinh_hai', name: 'Chư Thiên Tinh Hải', tier: 'Vực Ngoại', min_level: 135, required_realm: 'Kim Tiên', stamina_cost: 90, travel_time: 180, env: '+30% Tốc Độ, +25% Dex', specialties: ['Tinh Thần Thảo', 'Tinh Tú Thạch'] },
    { id: 'hon_don_tien_vuc', name: 'Hỗn Độn Tiên Vực', tier: 'Vực Ngoại', min_level: 145, required_realm: 'Thái Ất', stamina_cost: 100, travel_time: 200, env: '+35% Toàn Chỉ Số', specialties: ['Hỗn Độn Thảo', 'Tiên Giới Hỗn Độn Thạch'] },
    { id: 'hon_nguyen_dao_canh', name: 'Hỗn Nguyên Đạo Cảnh', tier: 'Đỉnh Phong', min_level: 155, required_realm: 'Đại La', stamina_cost: 120, travel_time: 240, env: '+60% ST, +50% Toàn Thuộc Tính', specialties: ['Hỗn Nguyên Đạo Thảo', 'Đạo Cảnh Thần Thạch'] }
  ],

  // ⏳ Huyễn Cảnh (Timed Secret Realms)
  timedDungeons: [
    {
      id: 'dungeon_timed_01',
      name: 'U Ảnh Ảo Cảnh',
      realm_type: 'timed',
      requiredRealm: 2,
      totalWaves: 3,
      remainingSeconds: 1800, // 30 minutes
      expires_at: 1770000000,
      difficultyMult: 1.25,
      bossName: 'Hắc Ám Huyễn Ma',
      description: 'Huyễn cảnh sinh ra do vết nứt không gian, sẽ sụp đổ sau khi hết giờ.'
    },
    {
      id: 'dungeon_timed_02',
      name: 'Lôi Đình Huyễn Vực',
      realm_type: 'timed',
      requiredRealm: 4,
      totalWaves: 4,
      remainingSeconds: 450,
      expires_at: 1770001000,
      difficultyMult: 1.35,
      bossName: 'Lôi Ma Hộ Vệ',
      description: 'Ảo cảnh tích tụ sấm sét cuồng phong sắp tan biến.'
    }
  ],

  // 🔱 Thượng Cổ Cấm Địa (Permanent Forbidden Zones)
  permanentDungeons: [
    {
      id: 'dungeon_perm_01',
      name: 'Thần Ma Cổ Mộ',
      realm_type: 'permanent',
      requiredRealm: 5,
      totalWaves: 5,
      remainingSeconds: null,
      expires_at: null,
      difficultyMult: 2.8,
      bossName: 'Cổ Ma Tàn Hồn',
      isCleared: true,
      clearCount: 3,
      description: 'Cấm địa thượng cổ nơi chôn cất ma thần, quái vật cuồng bạo x2.8 lần.'
    },
    {
      id: 'dungeon_perm_02',
      name: 'Huyết Uyên Cấm Địa',
      realm_type: 'permanent',
      requiredRealm: 10,
      totalWaves: 6,
      remainingSeconds: null,
      expires_at: null,
      difficultyMult: 3.5,
      bossName: 'Huyết Hải Ma Tổ',
      isCleared: false,
      clearCount: 0,
      description: 'Vực thẳm máu tanh vô tận với sức mạnh quái vật cuồng nộ x3.5.'
    }
  ]
};
