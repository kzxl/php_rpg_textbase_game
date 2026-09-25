/**
 * Equipment Fixtures for Nghịch Thiên Ký E2E Suite
 */

export const equipmentFixtures = {
  // Baseline +0 Novice Sword
  noviceSword0: {
    id: 'eq_novice_sword_0',
    name: 'Thiết Kiếm',
    slot: 'weapon',
    baseType: 'sword',
    itemLevel: 1,
    rarity: 'common',
    enhanceLevel: 0,
    affixes: [
      { stat: 'strength', type: 'flat', value: 5 }
    ]
  },

  // +3 Safe Enhancement Weapon (Tier 1)
  swordTier1: {
    id: 'eq_sword_tier1',
    name: 'Thiết Kiếm +3',
    slot: 'weapon',
    baseType: 'sword',
    itemLevel: 3,
    rarity: 'common',
    enhanceLevel: 3,
    affixes: [
      { stat: 'strength', type: 'flat', value: 11 }
    ]
  },

  // +6 Mid-Tier Weapon (Tier 2)
  swordTier2: {
    id: 'eq_sword_tier2',
    name: 'Tinh Cương Kiếm +6',
    slot: 'weapon',
    baseType: 'sword',
    itemLevel: 15,
    rarity: 'rare',
    enhanceLevel: 6,
    affixes: [
      { stat: 'strength', type: 'flat', value: 35 }
    ]
  },

  // +9 High-Stakes Weapon (Tier 3)
  swordTier3: {
    id: 'eq_sword_tier3',
    name: 'Huyết Lang Vương Kiếm +9',
    slot: 'weapon',
    baseType: 'sword',
    itemLevel: 45,
    rarity: 'epic',
    enhanceLevel: 9,
    affixes: [
      { stat: 'strength', type: 'flat', value: 120 }
    ]
  },

  // +12 Apex Weapon (Tier 4)
  swordTier4: {
    id: 'eq_sword_tier4',
    name: 'Bản Nguyên Tru Tiên Kiếm +12',
    slot: 'weapon',
    baseType: 'sword',
    itemLevel: 150,
    rarity: 'legendary',
    enhanceLevel: 12,
    affixes: [
      { stat: 'strength', type: 'flat', value: 850 }
    ]
  },

  // Armor sets
  noviceArmor0: {
    id: 'eq_novice_armor_0',
    name: 'Thô Bì Hộ Giáp',
    slot: 'body',
    baseType: 'armor',
    itemLevel: 1,
    rarity: 'common',
    enhanceLevel: 0,
    affixes: [
      { stat: 'defense', type: 'flat', value: 6 }
    ]
  },

  armorTier2: {
    id: 'eq_armor_tier2',
    name: 'Giáp Thiết Trùng +5',
    slot: 'body',
    baseType: 'armor',
    itemLevel: 15,
    rarity: 'rare',
    enhanceLevel: 5,
    affixes: [
      { stat: 'defense', type: 'flat', value: 45 }
    ]
  },

  // Boots
  bootsTier2: {
    id: 'eq_boots_tier2',
    name: 'Băng Phách Hài +4',
    slot: 'feet',
    baseType: 'boots',
    itemLevel: 15,
    rarity: 'uncommon',
    enhanceLevel: 4,
    affixes: [
      { stat: 'speed', type: 'flat', value: 20 },
      { stat: 'dexterity', type: 'flat', value: 15 }
    ]
  },

  // Ring
  ringTier1: {
    id: 'eq_ring_tier1',
    name: 'Trữ Vật Giới Chỉ +2',
    slot: 'ring',
    baseType: 'tru_vat_gioi',
    itemLevel: 6,
    rarity: 'uncommon',
    enhanceLevel: 2,
    affixes: [
      { stat: 'capacity', type: 'flat', value: 15 },
      { stat: 'strength', type: 'flat', value: 8 }
    ]
  }
};
