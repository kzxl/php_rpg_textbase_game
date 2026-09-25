/**
 * Adversarial Test Suite: M1 Stat Comparison Deltas
 * 
 * Verifies frontend/src/pages/helpers.js:
 * - getEffectiveStats(item)
 * - itemRow(item, showEquip, options)
 * 
 * Tests 5 Core Dimensions:
 * 1. Higher stats comparison
 * 2. Lower stats comparison
 * 3. Identical stats comparison
 * 4. Mixed stats comparison
 * 5. Undefined / null / missing stats & boundary stress
 */

import { getEffectiveStats, itemRow, getEnhanceTier } from '../../frontend/src/pages/helpers.js';

let passed = 0;
let failed = 0;
const results = [];

function assert(condition, testName, details = '') {
  if (condition) {
    passed++;
    results.push({ status: 'PASS', name: testName });
    console.log(`  \x1b[32m✔\x1b[0m ${testName}`);
  } else {
    failed++;
    results.push({ status: 'FAIL', name: testName, details });
    console.error(`  \x1b[31m✘\x1b[0m ${testName}: ${details}`);
  }
}

console.log('\n\x1b[1m\x1b[36m====================================================================\x1b[0m');
console.log('\x1b[1m\x1b[36m  ADVERSARIAL STRESS TEST: STAT COMPARISON DELTA ENGINE             \x1b[0m');
console.log('\x1b[1m\x1b[36m====================================================================\x1b[0m\n');

// ====================================================================
// SECTION 1: HIGHER STATS COMPARISON
// ====================================================================
console.log('\x1b[1m▶ Section 1: Higher Stats Comparison\x1b[0m');

{
  const invWeapon = {
    id: 'wpn_inv_high',
    name: 'Bạch Hổ Kiếm',
    slot: 'weapon',
    baseType: 'kiem',
    rarity: 'rare',
    itemLevel: 10,
    enhanceLevel: 3,
    affixes: [
      { stat: 'strength', type: 'flat', value: 40 },
      { stat: 'dexterity', type: 'flat', value: 30 }
    ]
  };

  const eqWeapon = {
    id: 'wpn_eq_low',
    name: 'Tùng Mộc Kiếm',
    slot: 'weapon',
    baseType: 'kiem',
    rarity: 'common',
    itemLevel: 3,
    enhanceLevel: 0,
    affixes: [
      { stat: 'strength', type: 'flat', value: 10 },
      { stat: 'dexterity', type: 'flat', value: 10 }
    ]
  };

  const invStats = getEffectiveStats(invWeapon);
  const eqStats = getEffectiveStats(eqWeapon);

  assert(invStats.totalScore > eqStats.totalScore, 'Inv weapon has strictly higher totalScore than equipped weapon');
  
  // STR: inv has 40 + (max(4*3, 3*4*floor(10/3)) = 36) = 76; eq has 10 (enh=0) = 10. Delta = +66
  // DEX: inv has 30; eq has 10. Delta = +20
  const expectedTotalDelta = invStats.totalScore - eqStats.totalScore;
  assert(expectedTotalDelta > 0, `Expected total delta is strictly positive (+${expectedTotalDelta})`);

  const html = itemRow(invWeapon, true, { equippedItem: eqWeapon, isEquipped: false });

  assert(html.includes('class="stat-compare-box"'), 'Renders stat comparison box container');
  assert(html.includes('stat-delta-badge pos'), 'Renders positive delta badge with class "pos"');
  assert(html.includes(`▲ +${expectedTotalDelta}`), `Renders exact positive delta formatted as ▲ +${expectedTotalDelta}`);
  assert(html.includes('STR (Sát Thương):'), 'Includes STR stat key in delta breakdown');
  assert(html.includes('DEX (Chính Xác):'), 'Includes DEX stat key in delta breakdown');
  assert(html.includes('class="stat-delta-item pos"'), 'Individual higher stat items have class "pos"');
}

{
  // Armor higher stats: DEF & HP
  const invArmor = {
    id: 'armor_inv_high',
    name: 'Huyền Vũ Khải',
    slot: 'body',
    baseType: 'giap',
    rarity: 'epic',
    itemLevel: 12,
    enhanceLevel: 6,
    affixes: [
      { stat: 'defense', type: 'flat', value: 80 },
      { stat: 'hp', type: 'flat', value: 200 }
    ]
  };

  const eqArmor = {
    id: 'armor_eq_low',
    name: 'Thô Bố Y',
    slot: 'body',
    baseType: 'giap',
    rarity: 'common',
    itemLevel: 2,
    enhanceLevel: 0,
    affixes: [
      { stat: 'defense', type: 'flat', value: 15 }
    ]
  };

  const invStats = getEffectiveStats(invArmor);
  const eqStats = getEffectiveStats(eqArmor);
  const delta = invStats.totalScore - eqStats.totalScore;

  const html = itemRow(invArmor, true, { equippedItem: eqArmor, isEquipped: false });
  assert(delta > 0, 'Inv armor has higher totalScore');
  assert(html.includes(`▲ +${delta}`), 'Header badge displays positive delta for armor');
  assert(html.includes('DEF (Phòng Ngự):'), 'Delta breakdown includes DEF');
  assert(html.includes('HP (Khí Huyết):'), 'Delta breakdown includes HP');
}

// ====================================================================
// SECTION 2: LOWER STATS COMPARISON
// ====================================================================
console.log('\n\x1b[1m▶ Section 2: Lower Stats Comparison\x1b[0m');

{
  const invWeapon = {
    id: 'wpn_inv_low',
    name: 'Rỉ Sét Thiết Kiếm',
    slot: 'weapon',
    baseType: 'kiem',
    rarity: 'common',
    itemLevel: 1,
    enhanceLevel: 0,
    affixes: [
      { stat: 'strength', type: 'flat', value: 5 },
      { stat: 'dexterity', type: 'flat', value: 5 }
    ]
  };

  const eqWeapon = {
    id: 'wpn_eq_high',
    name: 'Tru Tiên Kiếm',
    slot: 'weapon',
    baseType: 'kiem',
    rarity: 'legendary',
    itemLevel: 15,
    enhanceLevel: 9,
    affixes: [
      { stat: 'strength', type: 'flat', value: 120 },
      { stat: 'dexterity', type: 'flat', value: 90 }
    ]
  };

  const invStats = getEffectiveStats(invWeapon);
  const eqStats = getEffectiveStats(eqWeapon);
  const totalDelta = invStats.totalScore - eqStats.totalScore;

  assert(totalDelta < 0, `Inv weapon has negative total delta (${totalDelta})`);

  const html = itemRow(invWeapon, true, { equippedItem: eqWeapon, isEquipped: false });

  assert(html.includes('stat-delta-badge neg'), 'Renders negative delta badge with class "neg"');
  assert(html.includes(`▼ ${totalDelta}`), `Renders negative total delta formatted as ▼ ${totalDelta}`);
  assert(html.includes('class="stat-delta-item neg"'), 'Individual lower stat items have class "neg"');
  assert(html.includes('▼ -'), 'Individual negative stat deltas contain ▼ -');
}

// ====================================================================
// SECTION 3: IDENTICAL STATS COMPARISON
// ====================================================================
console.log('\n\x1b[1m▶ Section 3: Identical Stats Comparison\x1b[0m');

{
  const itemA = {
    id: 'item_twin_1',
    name: 'Linh Quy Thuẫn',
    slot: 'shield',
    baseType: 'thuan',
    rarity: 'rare',
    itemLevel: 8,
    enhanceLevel: 4,
    affixes: [
      { stat: 'defense', type: 'flat', value: 45 },
      { stat: 'hp', type: 'flat', value: 100 }
    ]
  };

  const itemB = {
    id: 'item_twin_2',
    name: 'Linh Quy Thuẫn B',
    slot: 'shield',
    baseType: 'thuan',
    rarity: 'rare',
    itemLevel: 8,
    enhanceLevel: 4,
    affixes: [
      { stat: 'defense', type: 'flat', value: 45 },
      { stat: 'hp', type: 'flat', value: 100 }
    ]
  };

  const statsA = getEffectiveStats(itemA);
  const statsB = getEffectiveStats(itemB);

  assert(statsA.totalScore === statsB.totalScore, 'Twin items have identical totalScore');
  assert(JSON.stringify(statsA.stats) === JSON.stringify(statsB.stats), 'Twin items have identical stat breakdown');

  const html = itemRow(itemA, true, { equippedItem: itemB, isEquipped: false });

  assert(html.includes('▲ +0'), 'Zero total delta displays as ▲ +0 (neutral non-negative)');
  assert(html.includes('stat-delta-badge pos'), 'Zero total delta gets pos class (>= 0)');
  assert(html.includes('stat-delta-item eq'), 'Individual identical stats have class "eq"');
  assert(html.includes('■ 0'), 'Individual identical stats format delta as "■ 0"');
  assert(!html.includes('NaN'), 'Output contains zero NaN values');
  assert(!html.includes('undefined'), 'Output contains zero undefined literals');
}

// ====================================================================
// SECTION 4: MIXED STATS COMPARISON (ASYMMETRIC & BALANCED)
// ====================================================================
console.log('\n\x1b[1m▶ Section 4: Mixed Stats Comparison\x1b[0m');

{
  // Inv has higher STR (+50 vs +20) but lower DEX (+10 vs +40)
  const invWeapon = {
    id: 'wpn_inv_heavy',
    name: 'Trọng Khảm Đao',
    slot: 'weapon',
    baseType: 'dao',
    rarity: 'rare',
    itemLevel: 6,
    enhanceLevel: 0,
    affixes: [
      { stat: 'strength', type: 'flat', value: 50 },
      { stat: 'dexterity', type: 'flat', value: 10 }
    ]
  };

  const eqWeapon = {
    id: 'wpn_eq_swift',
    name: 'Tật Phong Kiếm',
    slot: 'weapon',
    baseType: 'kiem',
    rarity: 'rare',
    itemLevel: 6,
    enhanceLevel: 0,
    affixes: [
      { stat: 'strength', type: 'flat', value: 20 },
      { stat: 'dexterity', type: 'flat', value: 40 }
    ]
  };

  const html = itemRow(invWeapon, true, { equippedItem: eqWeapon, isEquipped: false });

  // Both should be in the delta grid: STR has pos delta (+30), DEX has neg delta (-30)
  assert(html.includes('STR (Sát Thương): 50 (▲ +30)'), 'STR shows +30 positive delta');
  assert(html.includes('DEX (Chính Xác): 10 (▼ -30)'), 'DEX shows -30 negative delta');
  assert(html.includes('stat-delta-item pos'), 'Grid has at least one positive item');
  assert(html.includes('stat-delta-item neg'), 'Grid has at least one negative item');
}

{
  // Asymmetric stats: Inv has critRate and damageReduction; Eq has dodge and critMultiplier
  const invArmor = {
    id: 'armor_inv_affixes',
    name: 'Băng Tằm Y',
    slot: 'body',
    baseType: 'giap',
    rarity: 'epic',
    itemLevel: 5,
    enhanceLevel: 0,
    affixes: [
      { stat: 'defense', type: 'flat', value: 30 },
      { stat: 'critRate', type: 'flat', value: 12 },
      { stat: 'damageReduction', type: 'flat', value: 8 }
    ]
  };

  const eqArmor = {
    id: 'armor_eq_affixes',
    name: 'Hỏa Xà Giáp',
    slot: 'body',
    baseType: 'giap',
    rarity: 'epic',
    itemLevel: 5,
    enhanceLevel: 0,
    affixes: [
      { stat: 'defense', type: 'flat', value: 30 },
      { stat: 'dodge', type: 'flat', value: 15 },
      { stat: 'critMultiplier', type: 'flat', value: 25 }
    ]
  };

  const invStats = getEffectiveStats(invArmor);
  const eqStats = getEffectiveStats(eqArmor);

  assert(invStats.stats['CRITRATE'] === 12, 'Inv has CRITRATE 12');
  assert(invStats.stats['DAMAGEREDUCTION'] === 8, 'Inv has DAMAGEREDUCTION 8');
  assert(eqStats.stats['DODGE'] === 15, 'Eq has DODGE 15');
  assert(eqStats.stats['CRIT MUL'] === 25, 'Eq has CRIT MUL 25');

  const html = itemRow(invArmor, true, { equippedItem: eqArmor, isEquipped: false });

  // Missing stats on one side must default to 0
  assert(html.includes('CRITRATE: 12 (▲ +12)'), 'CRITRATE deltas from 0 to 12 (+12)');
  assert(html.includes('DAMAGEREDUCTION: 8 (▲ +8)'), 'DAMAGEREDUCTION deltas from 0 to 8 (+8)');
  assert(html.includes('DODGE: 0 (▼ -15)'), 'DODGE deltas from 15 to 0 (-15)');
  assert(html.includes('CRIT MUL: 0 (▼ -25)'), 'CRIT MUL deltas from 25 to 0 (-25)');
}

// ====================================================================
// SECTION 5: UNDEFINED / NULL / CORRUPTED / BOUNDARY STRESS
// ====================================================================
console.log('\n\x1b[1m▶ Section 5: Undefined & Boundary Stress\x1b[0m');

{
  // 5.1: Item with null/undefined affixes
  const bareItem = {
    id: 'bare_item',
    name: 'Trọc Kiếm',
    slot: 'weapon',
    baseType: 'kiem',
    rarity: 'common',
    itemLevel: undefined,
    enhanceLevel: null,
    affixes: null
  };

  const stats = getEffectiveStats(bareItem);
  assert(stats.totalScore > 0, 'Item with null affixes/enh and undefined itemLevel falls back to default base stats');
  assert(stats.stats['STR (Sát Thương)'] === 7, 'Default STR is ilvl(1) * 2 + 5 = 7');
  assert(stats.stats['DEX (Chính Xác)'] === 11, 'Default DEX is ilvl(1) + 10 = 11');
}

{
  // 5.2: Item with corrupted non-numeric values
  const corruptedItem = {
    id: 'corrupt_item',
    name: 'Tà Kiếm',
    slot: 'weapon',
    baseType: 'kiem',
    rarity: 'common',
    itemLevel: 'not_a_number',
    enhanceLevel: 'bad_enhance',
    affixes: [
      { stat: 'strength', type: 'flat', value: 20 }
    ]
  };

  const stats = getEffectiveStats(corruptedItem);
  assert(!isNaN(stats.totalScore), 'TotalScore is not NaN for corrupted string levels');
  assert(stats.stats['STR (Sát Thương)'] === 20, 'Uses flat affix value');
  assert(stats.stats['DEX (Chính Xác)'] === 11, 'Defaults missing DEX to ilvl(1) + 10 = 11');
}

{
  // 5.3: Equipped slot is null (empty slot)
  const invItem = {
    id: 'inv_fresh',
    name: 'Tân Thủ Y',
    slot: 'body',
    baseType: 'giap',
    rarity: 'common',
    itemLevel: 1,
    enhanceLevel: 0,
    affixes: []
  };

  const html = itemRow(invItem, true, { equippedItem: null, isEquipped: false });
  assert(html.includes('Ô trang bị hiện tại đang trống'), 'Shows "Ô trang bị hiện tại đang trống" message when equippedItem is null');
  assert(html.includes('▲ +3 Điểm') || html.includes('▲ +3'), 'Delta badge displays full score against empty slot');
}

{
  // 5.4: Equipped item option is undefined (omitted)
  const invItem = {
    id: 'inv_no_opt',
    name: 'Vô Hữu Đao',
    slot: 'weapon',
    baseType: 'dao',
    rarity: 'common'
  };

  const html = itemRow(invItem, true, { isEquipped: false });
  assert(!html.includes('stat-compare-box'), 'Does NOT render comparison box when options.equippedItem is undefined');
}

{
  // 5.5: Non-equipment items (manual, medicine)
  const manualItem = {
    id: 'manual_book',
    name: 'Cửu Dương Chân Kinh',
    category: 'manual',
    slot: 'manual',
    baseType: 'bi_kip',
    rarity: 'legendary'
  };

  const html = itemRow(manualItem, true, { equippedItem: null, isEquipped: false });
  assert(!html.includes('stat-compare-box'), 'Does NOT render comparison box for skill manuals');
  assert(!html.includes('btn-forge-shortcut'), 'Does NOT render forge shortcut for skill manuals');
}

{
  // 5.6: Already equipped item (options.isEquipped = true)
  const eqItem = {
    id: 'currently_worn',
    name: 'Đang Mặc Chiến Giáp',
    slot: 'body',
    baseType: 'giap',
    rarity: 'rare'
  };

  const html = itemRow(eqItem, false, { isEquipped: true, slotKey: 'body' });
  assert(!html.includes('stat-compare-box'), 'Does NOT render comparison box for already equipped items');
  assert(html.includes('data-unequip-slot="body"'), 'Renders unequip button for equipped item');
  assert(html.includes('btn-unequip'), 'Unequip button has class btn-unequip');
}

{
  // 5.7: Extreme boundary numbers (level 999, enhance +12)
  const godWeapon = {
    id: 'god_weapon',
    name: 'Thần Khí Bàn Cổ Phủ',
    slot: 'weapon',
    baseType: 'riu',
    rarity: 'legendary',
    itemLevel: 999,
    enhanceLevel: 12,
    affixes: [
      { stat: 'strength', type: 'flat', value: 100000 },
      { stat: 'dexterity', type: 'flat', value: 50000 }
    ]
  };

  const stats = getEffectiveStats(godWeapon);
  assert(stats.totalScore > 150000, 'Calculates massive numbers without overflow');
  assert(Number.isFinite(stats.totalScore), 'Total score is finite');
  assert(!isNaN(stats.totalScore), 'Total score is not NaN');
}

{
  // 5.8: Negative affix stats (cursed item)
  const cursedRing = {
    id: 'ring_cursed',
    name: 'Hắc Ám Giới Chỉ',
    slot: 'ring',
    baseType: 'gioi_chi',
    rarity: 'rare',
    itemLevel: 5,
    enhanceLevel: 0,
    affixes: [
      { stat: 'strength', type: 'flat', value: -15 },
      { stat: 'dexterity', type: 'flat', value: -10 }
    ]
  };

  const stats = getEffectiveStats(cursedRing);
  // Even with negative affixes, totalScore should reflect accurately
  assert(Number.isInteger(stats.totalScore), 'Total score for negative affixes is an integer');
}

// ====================================================================
// SUMMARY REPORT
// ====================================================================
console.log('\n\x1b[1m\x1b[36m====================================================================\x1b[0m');
console.log('\x1b[1m\x1b[36m             STAT COMPARISON TEST EXECUTION SUMMARY                 \x1b[0m');
console.log('\x1b[1m\x1b[36m====================================================================\x1b[0m');
console.log(`  Total Checks Executed : \x1b[1m${passed + failed}\x1b[0m`);
console.log(`  Passed Checks         : \x1b[32m\x1b[1m${passed}\x1b[0m`);
console.log(`  Failed Checks         : ${failed > 0 ? `\x1b[31m\x1b[1m${failed}\x1b[0m` : `\x1b[32m0\x1b[0m`}`);
console.log('--------------------------------------------------------------------');

if (failed === 0) {
  console.log('\x1b[32m\x1b[1m  VERDICT: ALL STAT COMPARISON DELTA TESTS PASSED (100% SUCCESS)\x1b[0m');
  console.log('\x1b[1m\x1b[36m====================================================================\x1b[0m\n');
  process.exit(0);
} else {
  console.log('\x1b[31m\x1b[1m  VERDICT: FAILURES DETECTED IN STAT COMPARISON DELTA ENGINE\x1b[0m');
  console.log('\x1b[1m\x1b[36m====================================================================\x1b[0m\n');
  process.exit(1);
}
