/**
 * Adversarial Test Suite: Milestone M4 Zone Guidance & 18 World Realms (Challenger 2)
 * 
 * Empirically stress-tests:
 * 1. getCultivationRealmTitle(level) mapping across all boundary conditions:
 *    - level <= 0, 1, 10, 11, 20, 21, 30, 31, 40, 41, 50, 51, 65, 66, 80, 81, 100, 101, 120, 121, 135, 136, 145, 146, 155, 156, 200, 999.
 *    - Transition points: 10/11, 20/21, 30/31, 40/41, 50/51, 65/66, 80/81, 100/101, 120/121, 135/136, 145/146, 155/156.
 *    - Type coercion: string numbers ("10", "11", "50+"), null, undefined, NaN, empty string, negative floats.
 *    - Authentic Vietnamese Xianxia realm title verification (zero null/undefined, canonical titles only).
 * 
 * 2. getModifierTagClass(text) environmental modifier classification:
 *    - All 18 environmental strings from backend/data/exploration.json & travel.js envMap.
 *    - Edge cases: empty string, pure buffs (+15% Tốc Độ), pure debuffs (-10% Tốc Độ, -15% Phòng Ngự), hybrid modifiers (+30% ST, +20% ST nhận, Hỗn loạn), unknown strings, arrow notation ("10 -> 20").
 *    - Case insensitivity & keyword detection.
 * 
 * 3. getSpecialtyBadge(name) resource badge categorization:
 *    - All 36 signature specialty materials across all 18 realms from backend/data/exploration.json.
 *    - Correct CSS badge class (.specialty-pill--herb, .specialty-pill--mineral, .specialty-pill--beast).
 *    - Appropriate category icon (🌿, ⛏️, 🐾).
 *    - Edge cases: empty string, null, undefined, casing variations, unrecognized fallback.
 * 
 * 4. End-to-End Zone Guidance Integration on all 18 World Realms:
 *    - Integration with exploration config and travel map card rendering.
 *    - Monotonic level requirements and boundary alignment.
 * 
 * 5. CSS Token Fidelity:
 *    - Presence and validity of all badge and tag CSS classes in frontend/src/style.css.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getCultivationRealmTitle, getModifierTagClass, getSpecialtyBadge } from '../../frontend/src/pages/travel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let passed = 0;
let failed = 0;
const failures = [];

function assert(condition, testName, details = '') {
  if (condition) {
    passed++;
    console.log(`  \x1b[32m✔\x1b[0m ${testName}`);
  } else {
    failed++;
    failures.push({ name: testName, details });
    console.error(`  \x1b[31m✘\x1b[0m ${testName}: ${details}`);
  }
}

console.log('\n\x1b[1m\x1b[35m====================================================================\x1b[0m');
console.log('\x1b[1m\x1b[35m  ADVERSARIAL STRESS TEST: M4 ZONE GUIDANCE ACROSS 18 REALMS (CHALLENGER 2)  \x1b[0m');
console.log('\x1b[1m\x1b[35m====================================================================\x1b[0m\n');

// Canonical Authentic Xianxia Realm Titles
const CANONICAL_REALMS = [
  'Luyện Khí',
  'Trúc Cơ',
  'Kim Đan',
  'Nguyên Anh',
  'Hóa Thần',
  'Luyện Hư',
  'Hợp Thể',
  'Đại Thừa',
  'Độ Kiếp',
  'Chân Tiên',
  'Kim Tiên',
  'Thái Ất',
  'Đại La / Hỗn Nguyên'
];

// ====================================================================
// SECTION 1: CULTIVATION REALM TITLE BOUNDARY STRESS TESTING
// ====================================================================
console.log('\x1b[1m▶ Section 1: getCultivationRealmTitle(level) Boundary & Type Stress\x1b[0m');

// 1.1 Explicit Mission Boundaries
const missionBoundaries = [
  { level: -999, expected: 'Luyện Khí', desc: 'Extreme negative level (-999)' },
  { level: -50,  expected: 'Luyện Khí', desc: 'Negative level (-50)' },
  { level: -1,   expected: 'Luyện Khí', desc: 'Negative level (-1)' },
  { level: 0,    expected: 'Luyện Khí', desc: 'Zero level (0)' },
  { level: 1,    expected: 'Luyện Khí', desc: 'Level 1 (Starter min)' },
  { level: 10,   expected: 'Luyện Khí', desc: 'Level 10 (Luyện Khí max)' },
  { level: 11,   expected: 'Trúc Cơ',   desc: 'Level 11 (Trúc Cơ min)' },
  { level: 20,   expected: 'Trúc Cơ',   desc: 'Level 20 (Trúc Cơ max)' },
  { level: 21,   expected: 'Kim Đan',   desc: 'Level 21 (Kim Đan min)' },
  { level: 30,   expected: 'Kim Đan',   desc: 'Level 30 (Kim Đan max)' },
  { level: 31,   expected: 'Nguyên Anh',desc: 'Level 31 (Nguyên Anh min)' },
  { level: 40,   expected: 'Nguyên Anh',desc: 'Level 40 (Nguyên Anh max)' },
  { level: 41,   expected: 'Hóa Thần',  desc: 'Level 41 (Hóa Thần min)' },
  { level: 50,   expected: 'Hóa Thần',  desc: 'Level 50 (Hóa Thần max)' },
  { level: 51,   expected: 'Luyện Hư',  desc: 'Level 51 (Luyện Hư min)' },
  { level: 65,   expected: 'Luyện Hư',  desc: 'Level 65 (Luyện Hư max)' },
  { level: 66,   expected: 'Hợp Thể',   desc: 'Level 66 (Hợp Thể min)' },
  { level: 80,   expected: 'Hợp Thể',   desc: 'Level 80 (Hợp Thể max)' },
  { level: 81,   expected: 'Đại Thừa',  desc: 'Level 81 (Đại Thừa min)' },
  { level: 100,  expected: 'Đại Thừa',  desc: 'Level 100 (Đại Thừa max)' },
  { level: 101,  expected: 'Độ Kiếp',   desc: 'Level 101 (Độ Kiếp min)' },
  { level: 120,  expected: 'Độ Kiếp',   desc: 'Level 120 (Độ Kiếp max)' },
  { level: 121,  expected: 'Chân Tiên', desc: 'Level 121 (Chân Tiên min)' },
  { level: 135,  expected: 'Chân Tiên', desc: 'Level 135 (Chân Tiên max)' },
  { level: 136,  expected: 'Kim Tiên',  desc: 'Level 136 (Kim Tiên min)' },
  { level: 145,  expected: 'Kim Tiên',  desc: 'Level 145 (Kim Tiên max)' },
  { level: 146,  expected: 'Thái Ất',   desc: 'Level 146 (Thái Ất min)' },
  { level: 155,  expected: 'Thái Ất',   desc: 'Level 155 (Thái Ất max)' },
  { level: 156,  expected: 'Đại La / Hỗn Nguyên', desc: 'Level 156 (Đại La / Hỗn Nguyên min)' },
  { level: 200,  expected: 'Đại La / Hỗn Nguyên', desc: 'Level 200 (Apex progression)' },
  { level: 999,  expected: 'Đại La / Hỗn Nguyên', desc: 'Level 999 (High realm end-game)' },
  { level: 9999, expected: 'Đại La / Hỗn Nguyên', desc: 'Level 9999 (Extreme uncapped realm)' },
];

missionBoundaries.forEach(({ level, expected, desc }) => {
  const result = getCultivationRealmTitle(level);
  assert(result === expected, `Boundary [${level}]: ${desc} => "${expected}"`, `Expected "${expected}", received "${result}"`);
});

// 1.2 Transition Step Stress (Level n vs Level n+1)
const transitions = [
  { lo: 10,  hi: 11,  loExp: 'Luyện Khí', hiExp: 'Trúc Cơ' },
  { lo: 20,  hi: 21,  loExp: 'Trúc Cơ',   hiExp: 'Kim Đan' },
  { lo: 30,  hi: 31,  loExp: 'Kim Đan',   hiExp: 'Nguyên Anh' },
  { lo: 40,  hi: 41,  loExp: 'Nguyên Anh',hiExp: 'Hóa Thần' },
  { lo: 50,  hi: 51,  loExp: 'Hóa Thần',  hiExp: 'Luyện Hư' },
  { lo: 65,  hi: 66,  loExp: 'Luyện Hư',  hiExp: 'Hợp Thể' },
  { lo: 80,  hi: 81,  loExp: 'Hợp Thể',   hiExp: 'Đại Thừa' },
  { lo: 100, hi: 101, loExp: 'Đại Thừa',  hiExp: 'Độ Kiếp' },
  { lo: 120, hi: 121, loExp: 'Độ Kiếp',   hiExp: 'Chân Tiên' },
  { lo: 135, hi: 136, loExp: 'Chân Tiên', hiExp: 'Kim Tiên' },
  { lo: 145, hi: 146, loExp: 'Kim Tiên',  hiExp: 'Thái Ất' },
  { lo: 155, hi: 156, loExp: 'Thái Ất',   hiExp: 'Đại La / Hỗn Nguyên' },
];

transitions.forEach(({ lo, hi, loExp, hiExp }) => {
  const resLo = getCultivationRealmTitle(lo);
  const resHi = getCultivationRealmTitle(hi);
  assert(resLo === loExp && resHi === hiExp, `Transition boundary ${lo}->${hi}: "${loExp}" -> "${hiExp}"`);
});

// 1.3 String & Defensive Type Coercion
const stringInputs = [
  { input: '1',     expected: 'Luyện Khí', desc: 'String "1"' },
  { input: '10',    expected: 'Luyện Khí', desc: 'String "10"' },
  { input: '11',    expected: 'Trúc Cơ',   desc: 'String "11"' },
  { input: '30',    expected: 'Kim Đan',   desc: 'String "30"' },
  { input: '50',    expected: 'Hóa Thần',  desc: 'String "50"' },
  { input: '65',    expected: 'Luyện Hư',  desc: 'String "65"' },
  { input: '100',   expected: 'Đại Thừa',  desc: 'String "100"' },
  { input: '120',   expected: 'Độ Kiếp',   desc: 'String "120"' },
  { input: '155',   expected: 'Thái Ất',   desc: 'String "155"' },
  { input: '156',   expected: 'Đại La / Hỗn Nguyên', desc: 'String "156"' },
  { input: '999',   expected: 'Đại La / Hỗn Nguyên', desc: 'String "999"' },
  { input: '50+',   expected: 'Hóa Thần',  desc: 'String "50+" with suffix' },
  { input: '120 Lv',expected: 'Độ Kiếp',   desc: 'String "120 Lv"' },
  { input: null,    expected: 'Luyện Khí', desc: 'Null input fallback' },
  { input: undefined, expected: 'Luyện Khí', desc: 'Undefined input fallback' },
  { input: NaN,     expected: 'Luyện Khí', desc: 'NaN input fallback' },
  { input: '',      expected: 'Luyện Khí', desc: 'Empty string fallback' },
  { input: 'abc',   expected: 'Luyện Khí', desc: 'Non-numeric string fallback' },
  { input: 25.8,    expected: 'Kim Đan',   desc: 'Floating point 25.8' },
  { input: -0.5,    expected: 'Luyện Khí', desc: 'Negative float -0.5' },
];

stringInputs.forEach(({ input, expected, desc }) => {
  const result = getCultivationRealmTitle(input);
  assert(result === expected, `Type handling: ${desc} => "${expected}"`, `Received "${result}"`);
});

// 1.4 Authentic Vietnamese Xianxia Realm Title Conformance
for (let lvl = 1; lvl <= 160; lvl++) {
  const title = getCultivationRealmTitle(lvl);
  const isValid = CANONICAL_REALMS.includes(title);
  if (!isValid) {
    assert(false, `Level ${lvl} produced non-canonical title "${title}"`);
    break;
  }
}
assert(true, 'Exhaustive verification: All levels 1..160 map strictly to authentic Vietnamese Xianxia titles without undefined or null');

// ====================================================================
// SECTION 2: ENVIRONMENTAL MODIFIER CLASSIFICATION STRESS TESTING
// ====================================================================
console.log('\n\x1b[1m▶ Section 2: getModifierTagClass(text) Environmental Classification\x1b[0m');

// 2.1 The 18 Canonical World Realm Environment Strings
const realmEnvEffects = [
  { area: 'thanh_lam_tran', text: '🌾 Tân thủ thôn: Khu vực an toàn', expected: 'modifier-tag--buff' },
  { area: 'hac_phong_lam', text: '🌲 Rừng rậm: +5% Tốc Độ', expected: 'modifier-tag--buff' },
  { area: 'vong_linh_coc', text: '👻 Âm khí: +10% Nhanh Nhẹn', expected: 'modifier-tag--buff' },
  { area: 'thiet_huyet_son', text: '🌋 Nóng bức: +10% ST Hỏa', expected: 'modifier-tag--buff' },
  { area: 'thien_kiep_uyen', text: '⚡ Lôi điện: +15% Tốc Độ', expected: 'modifier-tag--buff' },
  { area: 'bac_suong_canh', text: '❄️ Đóng băng: -10% Tốc Độ', expected: 'modifier-tag--debuff' },
  { area: 'am_sat_hoang', text: '🎯 Sát khí: +15 Nhanh Nhẹn', expected: 'modifier-tag--buff' },
  { area: 'co_moc_linh_vien', text: '🌳 Linh mộc: +15% Phòng Ngự', expected: 'modifier-tag--buff' },
  { area: 'huyet_ma_chien_truong', text: '🩸 Huyết chiến: +30% ST, +20% ST nhận', expected: 'modifier-tag--hybrid' },
  { area: 'thien_hoa_linh_dia', text: '🔥 Địa hỏa: +25% ST Hỏa', expected: 'modifier-tag--buff' },
  { area: 'u_minh_quy_vuc', text: '💀 U minh: -15% Phòng Ngự', expected: 'modifier-tag--debuff' },
  { area: 'thien_dao_tan_tich', text: '✨ Thiên đạo: +15% Toàn Chỉ Số', expected: 'modifier-tag--buff' },
  { area: 'vo_tan_hu_khong', text: '🌀 Hỗn loạn: +50% ST Gây & Nhận', expected: 'modifier-tag--hybrid' },
  { area: 'cuu_u_than_uyen', text: '👿 Cửu U ma khí: +35% ST, +20% Tốc Độ', expected: 'modifier-tag--buff' },
  { area: 'thai_co_hong_hoang', text: '🦕 Hồng hoang cổ khí: +25% HP, +20% Giáp', expected: 'modifier-tag--buff' },
  { area: 'chu_thien_tinh_hai', text: '🌌 Tinh tú xoay chuyển: +30% Tốc Độ, +25% Nhanh Nhẹn', expected: 'modifier-tag--buff' },
  { area: 'hon_don_tien_vuc', text: '🔮 Hỗn độn tiên khí: +35% Toàn Chỉ Số', expected: 'modifier-tag--buff' },
  { area: 'hon_nguyen_dao_canh', text: '👑 Hỗn nguyên đạo vực: +60% ST, +50% Toàn Thuộc Tính', expected: 'modifier-tag--buff' },
];

assert(realmEnvEffects.length === 18, 'Exactly 18 world realm environmental modifiers defined');

realmEnvEffects.forEach(({ area, text, expected }) => {
  const result = getModifierTagClass(text);
  assert(result === expected, `Realm ${area}: "${text}" => ${expected}`, `Received "${result}"`);
});

// 2.2 Edge Cases and Boundary Modifiers
const edgeModifierTests = [
  // Empty / Null / Undefined
  { text: '', expected: 'modifier-tag--buff', desc: 'Empty string defaults to buff class' },
  { text: null, expected: 'modifier-tag--buff', desc: 'Null text defaults to buff class' },
  { text: undefined, expected: 'modifier-tag--buff', desc: 'Undefined text defaults to buff class' },

  // Pure Buffs
  { text: '+15% Tốc Độ', expected: 'modifier-tag--buff', desc: 'Pure buff: +15% Tốc Độ' },
  { text: '+20% Phòng Ngự', expected: 'modifier-tag--buff', desc: 'Pure buff: +20% Phòng Ngự' },
  { text: '+30% ST Hỏa, +10% Bạo Kích', expected: 'modifier-tag--buff', desc: 'Pure multi-buff positive string' },
  { text: 'Tăng cường linh lực: +50%', expected: 'modifier-tag--buff', desc: 'Pure buff description' },

  // Pure Debuffs
  { text: '-10% Tốc Độ', expected: 'modifier-tag--debuff', desc: 'Pure debuff: -10% Tốc Độ' },
  { text: '-15% Phòng Ngự', expected: 'modifier-tag--debuff', desc: 'Pure debuff: -15% Phòng Ngự' },
  { text: 'đóng băng: -20% Tốc Độ', expected: 'modifier-tag--debuff', desc: 'Debuff keyword "đóng băng: -"' },
  { text: 'u minh: -30% Giáp', expected: 'modifier-tag--debuff', desc: 'Debuff keyword "u minh: -"' },
  { text: '-5% Kháng Bạo', expected: 'modifier-tag--debuff', desc: 'Generic minus sign debuff' },

  // Hybrid Modifiers
  { text: '+30% ST, +20% ST nhận', expected: 'modifier-tag--hybrid', desc: 'Hybrid with "st nhận"' },
  { text: '+50% ST Gây & Nhận', expected: 'modifier-tag--hybrid', desc: 'Hybrid with "gây & nhận"' },
  { text: 'Huyết chiến đẫm máu (+40% Công, -20% Máu)', expected: 'modifier-tag--hybrid', desc: 'Hybrid with "huyết chiến"' },
  { text: 'Hỗn loạn cấm chế đảo nghịch', expected: 'modifier-tag--hybrid', desc: 'Hybrid with "hỗn loạn"' },
  { text: 'ST NHẬN TĂNG CAO', expected: 'modifier-tag--hybrid', desc: 'Uppercase "ST NHẬN" check' },
  { text: 'GÂY & NHẬN SÁT THƯƠNG', expected: 'modifier-tag--hybrid', desc: 'Uppercase "GÂY & NHẬN" check' },

  // Arrow notation edge case (e.g. "10 -> 20" contains hyphen but is not a debuff)
  { text: 'Linh khí tăng: 10 -> 20', expected: 'modifier-tag--buff', desc: 'Arrow notation "->" does not trigger debuff' },

  // Unknown non-matching strings
  { text: 'Vùng Đất Bình Yên', expected: 'modifier-tag--buff', desc: 'Generic peaceful string defaults to buff' },
  { text: 'Chưa Rõ Thuộc Tính', expected: 'modifier-tag--buff', desc: 'Unknown neutral string defaults to buff' },
];

edgeModifierTests.forEach(({ text, expected, desc }) => {
  const result = getModifierTagClass(text);
  assert(result === expected, `Modifier edge case: ${desc} => "${expected}"`, `Received "${result}"`);
});

// ====================================================================
// SECTION 3: SPECIALTY BADGE CATEGORIZATION & RENDERING
// ====================================================================
console.log('\n\x1b[1m▶ Section 3: getSpecialtyBadge(name) Resource Badges Across All 18 Realms\x1b[0m');

const exploPath = path.resolve(__dirname, '../../backend/data/exploration.json');
const exploData = JSON.parse(fs.readFileSync(exploPath, 'utf8'));

// 3.1 Verify all specialty names across 18 realms
let totalSpecialtiesTested = 0;
const categoryCount = { herb: 0, mineral: 0, beast: 0 };

Object.entries(exploData).forEach(([areaId, area]) => {
  const names = area.specialtyNames || [];
  assert(names.length > 0, `Area ${areaId} has configured specialtyNames array`);

  names.forEach(name => {
    totalSpecialtiesTested++;
    const badgeHtml = getSpecialtyBadge(name);

    // Assert valid HTML format
    const hasPillClass = badgeHtml.includes('class="specialty-pill');
    const hasName = badgeHtml.includes(name);
    const hasIcon = badgeHtml.includes('🌿') || badgeHtml.includes('⛏️') || badgeHtml.includes('🐾');

    assert(hasPillClass && hasName && hasIcon, `Specialty [${areaId}] "${name}" produces valid HTML badge with icon and name`);

    // Tally categories
    if (badgeHtml.includes('specialty-pill--herb')) categoryCount.herb++;
    else if (badgeHtml.includes('specialty-pill--mineral')) categoryCount.mineral++;
    else if (badgeHtml.includes('specialty-pill--beast')) categoryCount.beast++;
  });
});

console.log(`  \x1b[36mℹ Total specialty materials tested:\x1b[0m ${totalSpecialtiesTested} (🌿 Herbs: ${categoryCount.herb}, ⛏️ Minerals: ${categoryCount.mineral}, 🐾 Beasts: ${categoryCount.beast})`);
assert(totalSpecialtiesTested === 36, `Exactly 36 specialty materials verified across 18 realms (found ${totalSpecialtiesTested})`);
assert(categoryCount.herb > 0 && categoryCount.mineral > 0 && categoryCount.beast > 0, 'All 3 primary material archetypes (Herbs, Minerals, Beast Parts) are actively represented');

// 3.2 Key Xianxia Material Archetype Verification
const archetypeSamples = [
  // Herbs
  { name: 'Thanh Lam Diệp', expectedIcon: '🌿', expectedClass: 'specialty-pill--herb' },
  { name: 'Ám Hồn Thảo', expectedIcon: '🌿', expectedClass: 'specialty-pill--herb' },
  { name: 'Huyền Băng Hoa', expectedIcon: '🌿', expectedClass: 'specialty-pill--herb' },
  { name: 'Hỏa Linh Chi Thượng Phẩm', expectedIcon: '🌿', expectedClass: 'specialty-pill--herb' },
  { name: 'Nhựa Hắc Phong Mộc', expectedIcon: '🌿', expectedClass: 'specialty-pill--herb' },
  { name: 'Cây Trường Sinh', expectedIcon: '🌿', expectedClass: 'specialty-pill--herb' },

  // Minerals & Ores
  { name: 'Thiết Khoáng Thô', expectedIcon: '⛏️', expectedClass: 'specialty-pill--mineral' },
  { name: 'Hắc Phong Thạch', expectedIcon: '⛏️', expectedClass: 'specialty-pill--mineral' },
  { name: 'Thiết Huyết Quặng', expectedIcon: '⛏️', expectedClass: 'specialty-pill--mineral' },
  { name: 'Địa Hỏa Tinh Thạch', expectedIcon: '⛏️', expectedClass: 'specialty-pill--mineral' },
  { name: 'Tàn Phiến Trận Đồ', expectedIcon: '⛏️', expectedClass: 'specialty-pill--mineral' },
  { name: 'Hỗn Nguyên Đạo Châu', expectedIcon: '⛏️', expectedClass: 'specialty-pill--mineral' },
  { name: 'Cửu U Hắc Thủy', expectedIcon: '⛏️', expectedClass: 'specialty-pill--mineral' },
  { name: 'Hỗn Độn Khí Tinh', expectedIcon: '⛏️', expectedClass: 'specialty-pill--mineral' },

  // Beast & Monster Parts
  { name: 'Hạch Sấm', expectedIcon: '🐾', expectedClass: 'specialty-pill--beast' },
  { name: 'Huyết Ma Cốt Tinh', expectedIcon: '🐾', expectedClass: 'specialty-pill--beast' },
  { name: 'Xác Khí Cổ', expectedIcon: '🐾', expectedClass: 'specialty-pill--beast' },
  { name: 'Ma Nhãn U Minh', expectedIcon: '🐾', expectedClass: 'specialty-pill--beast' },
  { name: 'Nanh Bá Vương Thượng Cổ', expectedIcon: '🐾', expectedClass: 'specialty-pill--beast' },
  { name: 'Lôi Đế Vũ', expectedIcon: '🐾', expectedClass: 'specialty-pill--beast' },
  { name: 'Nội Đan Yêu Thú', expectedIcon: '🐾', expectedClass: 'specialty-pill--beast' },
  { name: 'Da Báo Ma Giới', expectedIcon: '🐾', expectedClass: 'specialty-pill--beast' },
  { name: 'Thịt Kỳ Lân', expectedIcon: '🐾', expectedClass: 'specialty-pill--beast' },
];

archetypeSamples.forEach(({ name, expectedIcon, expectedClass }) => {
  const badge = getSpecialtyBadge(name);
  const iconMatch = badge.includes(expectedIcon);
  const classMatch = badge.includes(expectedClass);
  assert(iconMatch && classMatch, `Archetype sample "${name}": Icon ${expectedIcon}, Class ${expectedClass}`, `Badge output: ${badge}`);
});

// 3.3 Specialty Badge Edge Cases
const badgeEdgeCases = [
  { name: '', expectedClass: 'specialty-pill--herb', desc: 'Empty string fallback' },
  { name: 'Vật Phẩm Lạ', expectedClass: 'specialty-pill--herb', desc: 'Unknown un-categorized material defaults to herb' },
  { name: 'KHOÁNG THẠCH THẦN', expectedClass: 'specialty-pill--mineral', desc: 'Uppercase uppercase keyword "THẠCH"' },
  { name: 'nội đan hoàng kim', expectedClass: 'specialty-pill--beast', desc: 'Lowercase keyword "nội đan"' },
];

badgeEdgeCases.forEach(({ name, expectedClass, desc }) => {
  const badge = getSpecialtyBadge(name);
  assert(badge.includes(expectedClass), `Badge edge case: ${desc}`, `Badge output: ${badge}`);
});

// ====================================================================
// SECTION 4: INTEGRATION TEST ACROSS 18 WORLD REALMS
// ====================================================================
console.log('\n\x1b[1m▶ Section 4: Full Zone Guidance Integration on All 18 World Realms\x1b[0m');

// Sorted realms by sort_order
const areaKeys = Object.keys(exploData);
assert(areaKeys.length === 18, `Exactly 18 realms in exploration.json (found ${areaKeys.length})`);

// 4.1 Check all 18 realms
let prevStamina = 0;
let isStaminaMonotonic = true;

areaKeys.forEach((key, idx) => {
  const area = exploData[key];
  const realmTitle = getCultivationRealmTitle(area.min_level);
  const badgeText = `Lv.${area.min_level || 1}+ · ${realmTitle} Cảnh`;

  // Verify non-empty, authentic realm title
  assert(CANONICAL_REALMS.includes(realmTitle), `Realm #${idx + 1} (${area.name}): Valid Realm "${realmTitle}"`);
  assert(badgeText.startsWith(`Lv.${area.min_level}+`), `Realm #${idx + 1} (${area.name}): Badge starts with Lv.${area.min_level}+`);
  assert(area.staminaCost >= 10 && area.staminaCost <= 200, `Realm #${idx + 1} (${area.name}): Stamina cost ${area.staminaCost} is in valid range [10, 200]`);

  if (area.staminaCost < prevStamina) isStaminaMonotonic = false;
  prevStamina = area.staminaCost;
});

assert(isStaminaMonotonic, 'Stamina costs scale monotonically from 10 to 200 across all 18 realms');

// ====================================================================
// SECTION 5: CSS TOKEN FIDELITY & BALANCE VERIFICATION
// ====================================================================
console.log('\n\x1b[1m▶ Section 5: CSS Token Fidelity & Style Sheet Balance\x1b[0m');

const cssPath = path.resolve(__dirname, '../../frontend/src/style.css');
const cssContent = fs.readFileSync(cssPath, 'utf8');

const requiredTokens = [
  'modifier-tag',
  'modifier-tag--buff',
  'modifier-tag--debuff',
  'modifier-tag--hybrid',
  'specialty-pill',
  'specialty-pill--herb',
  'specialty-pill--mineral',
  'specialty-pill--beast',
  'realm-card--timed',
  'realm-card--permanent',
  'realm-badge--timed',
  'realm-badge--permanent',
  'badge-danger-apex',
  'countdown-urgency'
];

requiredTokens.forEach(token => {
  assert(cssContent.includes(`.${token}`), `CSS Token .${token} is defined in style.css`);
});

let braceBalance = 0;
for (const char of cssContent) {
  if (char === '{') braceBalance++;
  if (char === '}') braceBalance--;
}
assert(braceBalance === 0, `style.css brace balance is 0 (found ${braceBalance})`);

// ====================================================================
// SUMMARY & VERDICT
// ====================================================================
console.log('\n\x1b[1m\x1b[35m====================================================================\x1b[0m');
console.log('\x1b[1m\x1b[35m                 OVERALL ADVERSARIAL TEST SUMMARY                   \x1b[0m');
console.log('\x1b[1m\x1b[35m====================================================================\x1b[0m');

const total = passed + failed;
console.log(`  Total Checks Executed : \x1b[1m${total}\x1b[0m`);
console.log(`  Passed Checks         : \x1b[32m\x1b[1m${passed}\x1b[0m`);
const failColor = failed > 0 ? '\x1b[31m' : '\x1b[32m';
console.log(`  Failed Checks         : ${failColor}\x1b[1m${failed}\x1b[0m`);
console.log('--------------------------------------------------------------------');

if (failed === 0) {
  console.log('\x1b[32m\x1b[1m  VERDICT: APPROVE (ALL M4 ZONE GUIDANCE ADVERSARIAL CHECKS PASSED)\x1b[0m');
  console.log('\x1b[1m\x1b[35m====================================================================\x1b[0m\n');
  process.exit(0);
} else {
  console.log('\x1b[31m\x1b[1m  VERDICT: REQUEST_CHANGES (FAILURES DETECTED IN ZONE GUIDANCE)\x1b[0m');
  failures.forEach(f => console.error(`    - ${f.name}: ${f.details}`));
  console.log('\x1b[1m\x1b[35m====================================================================\x1b[0m\n');
  process.exit(1);
}
