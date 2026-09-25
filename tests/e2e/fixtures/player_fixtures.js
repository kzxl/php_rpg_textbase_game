/**
 * Player Archetype Fixtures for Nghịch Thiên Ký E2E Suite
 */

export const playerFixtures = {
  // Level 1 Novice in Thanh Lam Trấn
  novice: {
    id: 'player_novice_001',
    name: 'Diệp Thần (Tân Thủ)',
    level: 1,
    realm: 1,
    currentArea: 'thanh_lam_tran',
    gold: 500,
    currentHp: 100,
    maxHp: 100,
    currentStamina: 100,
    maxStamina: 100,
    currentEnergy: 50,
    maxEnergy: 50,
    usableEnergy: 50,
    hospitalRemaining: 0,
    stats: {
      strength: 10,
      speed: 10,
      dexterity: 10,
      defense: 10,
      maxHp: 100,
      maxEnergy: 50
    },
    allocatedStats: { strength: 0, speed: 0, dexterity: 0, defense: 0 },
    talentDisplay: {
      strength: { value: 1.0, name: 'Phàm Cốt', icon: '⚪', color: '#ccc' },
      speed: { value: 1.0, name: 'Phàm Cốt', icon: '⚪', color: '#ccc' },
      dexterity: { value: 1.0, name: 'Phàm Cốt', icon: '⚪', color: '#ccc' },
      defense: { value: 1.0, name: 'Phàm Cốt', icon: '⚪', color: '#ccc' }
    },
    realmInfo: {
      id: 'luyen_khi_1',
      name: 'Luyện Khí Tầng 1',
      fullName: 'Luyện Khí Sơ Kỳ',
      canBreakthrough: false
    },
    equipment: {},
    inventory: [],
    materials: {
      thiet_khoang_tho: 15,
      da_tho: 10,
      quang_dong: 5,
      da_cuong_hoa: 3
    }
  },

  // Level 35 Midgame Cultivator (Kim Đan Sơ Kỳ)
  midgame: {
    id: 'player_mid_002',
    name: 'Hàn Lập (Kim Đan)',
    level: 35,
    realm: 3,
    currentArea: 'bac_suong_canh',
    gold: 15000,
    currentHp: 1200,
    maxHp: 1200,
    currentStamina: 80,
    maxStamina: 120,
    currentEnergy: 350,
    maxEnergy: 350,
    usableEnergy: 280, // Reserved 70 by aura
    hospitalRemaining: 0,
    stats: {
      strength: 150,
      speed: 120,
      dexterity: 140,
      defense: 110,
      maxHp: 1200,
      maxEnergy: 350
    },
    allocatedStats: { strength: 25, speed: 15, dexterity: 20, defense: 20 },
    talentDisplay: {
      strength: { value: 1.5, name: 'Huyền Cốt', icon: '🟣', color: '#b06cff' },
      speed: { value: 1.2, name: 'Linh Cốt', icon: '🔵', color: '#5ba3cf' },
      dexterity: { value: 1.5, name: 'Huyền Cốt', icon: '🟣', color: '#b06cff' },
      defense: { value: 1.2, name: 'Linh Cốt', icon: '🔵', color: '#5ba3cf' }
    },
    realmInfo: {
      id: 'kim_dan_1',
      name: 'Kim Đan Sơ Kỳ',
      fullName: 'Kim Đan Cảnh',
      canBreakthrough: true
    },
    equipment: {
      weapon: {
        id: 'eq_tinh_cuong_kiem',
        name: 'Tinh Cương Kiếm',
        slot: 'weapon',
        baseType: 'sword',
        itemLevel: 15,
        rarity: 'rare',
        enhanceLevel: 6,
        affixes: [{ stat: 'strength', type: 'flat', value: 35 }]
      },
      body: {
        id: 'eq_thiet_trung_giap',
        name: 'Giáp Thiết Trùng',
        slot: 'body',
        baseType: 'armor',
        itemLevel: 15,
        rarity: 'rare',
        enhanceLevel: 5,
        affixes: [{ stat: 'defense', type: 'flat', value: 45 }]
      }
    },
    materials: {
      quang_bac: 12,
      kim_loai_linh: 8,
      bang_phach_thach: 6,
      da_cuong_hoa: 25
    },
    inventory: []
  },

  // Level 155 Apex Daoist (Đại La Kim Tiên)
  apex: {
    id: 'player_apex_003',
    name: 'Vô Nhai Tiên Tôn',
    level: 155,
    realm: 18,
    currentArea: 'hon_nguyen_dao_canh',
    gold: 5000000,
    currentHp: 85000,
    maxHp: 85000,
    currentStamina: 300,
    maxStamina: 300,
    currentEnergy: 10000,
    maxEnergy: 10000,
    usableEnergy: 8500,
    hospitalRemaining: 0,
    stats: {
      strength: 4500,
      speed: 3800,
      dexterity: 4200,
      defense: 3900,
      maxHp: 85000,
      maxEnergy: 10000
    },
    allocatedStats: { strength: 800, speed: 600, dexterity: 700, defense: 750 },
    talentDisplay: {
      strength: { value: 2.2, name: 'Tiên Cốt', icon: '🔥', color: '#ff4500' },
      speed: { value: 2.0, name: 'Tiên Cốt', icon: '🔥', color: '#ff4500' },
      dexterity: { value: 2.5, name: 'Thần Cốt', icon: '⚡', color: '#ffd700' },
      defense: { value: 2.2, name: 'Tiên Cốt', icon: '🔥', color: '#ff4500' }
    },
    equipment: {
      weapon: {
        id: 'eq_ban_nguyen_tru_tien',
        name: 'Bản Nguyên Tru Tiên Kiếm',
        slot: 'weapon',
        baseType: 'sword',
        itemLevel: 150,
        rarity: 'legendary',
        enhanceLevel: 12,
        affixes: [{ stat: 'strength', type: 'flat', value: 850 }]
      }
    },
    materials: {
      ban_nguyen_tinh: 10,
      hon_don_khi_tinh: 8,
      da_cuong_hoa: 150
    },
    inventory: []
  },

  // Wounded Player currently in hospital
  hospitalized: {
    id: 'player_wounded_004',
    name: 'Trần Bại Tướng',
    level: 20,
    currentArea: 'thanh_lam_tran',
    gold: 100,
    currentHp: 1,
    maxHp: 500,
    currentStamina: 100,
    maxStamina: 100,
    currentEnergy: 10,
    hospitalRemaining: 45, // In hospital for 45s
    stats: { strength: 30, speed: 25, dexterity: 30, defense: 20 }
  },

  // Exhausted player with zero stamina
  exhausted: {
    id: 'player_exhausted_005',
    name: 'Lý Kiệt Lực',
    level: 15,
    currentArea: 'thanh_lam_tran',
    gold: 200,
    currentHp: 300,
    maxHp: 300,
    currentStamina: 3, // Less than 5!
    maxStamina: 100,
    currentEnergy: 100, // Plenty of energy, but NO stamina!
    maxEnergy: 100,
    hospitalRemaining: 0,
    stats: { strength: 20, speed: 20, dexterity: 20, defense: 20 }
  }
};
