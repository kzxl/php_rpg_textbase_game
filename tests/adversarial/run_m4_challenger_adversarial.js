/**
 * Adversarial Challenger 2 Test Suite: Milestone M4 (Travel & Secret Realms Overhaul)
 * 
 * Deeply stress-tests:
 * 1. Integrity and Facade Audit
 * 2. Cultivation Realm Mapping Stress (13 realm boundaries + invalid/edge inputs)
 * 3. Environmental Modifier Classifier Stress (18 canonical zones + edge cases)
 * 4. Specialty Badge Categorization Stress (herbs, minerals, beast materials, edge cases)
 * 5. CSS Design System Token Fidelity & Brace Balance
 * 6. Dungeon Page Component DOM Contracts (Timed, Permanent, Active Run, Buttons)
 * 7. Travel Map 18-Zone Conformance & Progression Check
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;

function assert(condition, message, details = '') {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  \x1b[32m✔\x1b[0m ${message}`);
  } else {
    failedChecks++;
    console.error(`  \x1b[31m✘\x1b[0m ${message} ${details ? `(${details})` : ''}`);
  }
}

console.log('\n\x1b[1m\x1b[35m====================================================================\x1b[0m');
console.log('\x1b[1m\x1b[35m  ADVERSARIAL CHALLENGER: M4 TRAVEL & SECRET REALMS DEEP AUDIT      \x1b[0m');
console.log('\x1b[1m\x1b[35m====================================================================\x1b[0m\n');

// --------------------------------------------------------------------
// SECTION 1: INTEGRITY AND CODEBASE FACADE AUDIT
// --------------------------------------------------------------------
console.log('\x1b[1m▶ Section 1: Integrity & Facade Audit\x1b[0m');

const dungeonJsPath = path.join(rootDir, 'frontend/src/pages/dungeon.js');
const travelJsPath = path.join(rootDir, 'frontend/src/pages/travel.js');
const styleCssPath = path.join(rootDir, 'frontend/src/style.css');

const dungeonCode = fs.readFileSync(dungeonJsPath, 'utf8');
const travelCode = fs.readFileSync(travelJsPath, 'utf8');
const styleCss = fs.readFileSync(styleCssPath, 'utf8');

assert(!dungeonCode.includes('// mock') && !dungeonCode.includes('// dummy'), 'dungeon.js contains no dummy/mock markers');
assert(!travelCode.includes('// mock') && !travelCode.includes('// dummy'), 'travel.js contains no dummy/mock markers');
assert(dungeonCode.includes('renderTimedList') && dungeonCode.includes('renderPermanentList') && dungeonCode.includes('renderActiveRun'), 'dungeon.js implements genuine renderer functions');
assert(travelCode.includes('export function getCultivationRealmTitle'), 'travel.js exports getCultivationRealmTitle');
assert(travelCode.includes('export function getModifierTagClass'), 'travel.js exports getModifierTagClass');
assert(travelCode.includes('export function getSpecialtyBadge'), 'travel.js exports getSpecialtyBadge');

// Import travel.js functions directly via ES Module
const { getCultivationRealmTitle, getModifierTagClass, getSpecialtyBadge } = await import('../../frontend/src/pages/travel.js');

// --------------------------------------------------------------------
// SECTION 2: CULTIVATION REALM MAPPING STRESS TEST
// --------------------------------------------------------------------
console.log('\n\x1b[1m▶ Section 2: Cultivation Realm Mapping Stress (13 Realm Boundaries)\x1b[0m');

const realmExpectations = [
  { level: 1, expected: 'Luyện Khí' },
  { level: 10, expected: 'Luyện Khí' },
  { level: 11, expected: 'Trúc Cơ' },
  { level: 20, expected: 'Trúc Cơ' },
  { level: 21, expected: 'Kim Đan' },
  { level: 30, expected: 'Kim Đan' },
  { level: 31, expected: 'Nguyên Anh' },
  { level: 40, expected: 'Nguyên Anh' },
  { level: 41, expected: 'Hóa Thần' },
  { level: 50, expected: 'Hóa Thần' },
  { level: 51, expected: 'Luyện Hư' },
  { level: 65, expected: 'Luyện Hư' },
  { level: 66, expected: 'Hợp Thể' },
  { level: 80, expected: 'Hợp Thể' },
  { level: 81, expected: 'Đại Thừa' },
  { level: 100, expected: 'Đại Thừa' },
  { level: 101, expected: 'Độ Kiếp' },
  { level: 120, expected: 'Độ Kiếp' },
  { level: 121, expected: 'Chân Tiên' },
  { level: 135, expected: 'Chân Tiên' },
  { level: 136, expected: 'Kim Tiên' },
  { level: 145, expected: 'Kim Tiên' },
  { level: 146, expected: 'Thái Ất' },
  { level: 155, expected: 'Thái Ất' },
  { level: 156, expected: 'Đại La / Hỗn Nguyên' },
  { level: 999, expected: 'Đại La / Hỗn Nguyên' },
];

realmExpectations.forEach(({ level, expected }) => {
  const result = getCultivationRealmTitle(level);
  assert(result === expected, `Level ${level} correctly resolves to '${expected}' (got '${result}')`);
});

// Edge & Malformed inputs
assert(getCultivationRealmTitle(0) === 'Luyện Khí', 'Level 0 defaults to Luyện Khí');
assert(getCultivationRealmTitle(-10) === 'Luyện Khí', 'Negative level defaults to Luyện Khí');
assert(getCultivationRealmTitle("25") === 'Kim Đan', 'String "25" parses to Kim Đan');
assert(getCultivationRealmTitle(null) === 'Luyện Khí', 'Null input safely resolves to Luyện Khí');
assert(getCultivationRealmTitle(undefined) === 'Luyện Khí', 'Undefined input safely resolves to Luyện Khí');
assert(getCultivationRealmTitle("invalid") === 'Luyện Khí', 'Malformed string safely resolves to Luyện Khí');

// --------------------------------------------------------------------
// SECTION 3: ENVIRONMENTAL MODIFIER CLASSIFIER STRESS TEST
// --------------------------------------------------------------------
console.log('\n\x1b[1m▶ Section 3: Environmental Modifier Classifier Stress (18 Canonical Zones)\x1b[0m');

const canonicalModifiers = [
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

canonicalModifiers.forEach(({ area, text, expected }) => {
  const result = getModifierTagClass(text);
  assert(result === expected, `Area '${area}' modifier correctly classified as '${expected}'`);
});

// Adversarial edge inputs for modifier classifier
assert(getModifierTagClass(null) === 'modifier-tag--buff', 'Null text defaults safely to buff tag');
assert(getModifierTagClass(undefined) === 'modifier-tag--buff', 'Undefined text defaults safely to buff tag');
assert(getModifierTagClass('') === 'modifier-tag--buff', 'Empty text defaults safely to buff tag');
assert(getModifierTagClass('Sát thương: -15% Phòng Thủ') === 'modifier-tag--debuff', 'Negative debuff identified correctly');
assert(getModifierTagClass('Hiệu ứng Huyết Chiến tàn bạo') === 'modifier-tag--hybrid', 'Hybrid effect identified correctly');

// --------------------------------------------------------------------
// SECTION 4: SPECIALTY BADGE CATEGORIZATION STRESS TEST
// --------------------------------------------------------------------
console.log('\n\x1b[1m▶ Section 4: Specialty Badge Categorization Stress\x1b[0m');

const specialtyTestCases = [
  { name: 'Thanh Lam Diệp', icon: '🌿', cls: 'specialty-pill--herb' },
  { name: 'Linh Thảo', icon: '🌿', cls: 'specialty-pill--herb' },
  { name: 'Thiên Hoa Diệp', icon: '🌿', cls: 'specialty-pill--herb' },
  { name: 'Thiết Khoáng Thô', icon: '⛏️', cls: 'specialty-pill--mineral' },
  { name: 'Băng Phách Thạch', icon: '⛏️', cls: 'specialty-pill--mineral' },
  { name: 'Huyền Thiết Tinh', icon: '⛏️', cls: 'specialty-pill--mineral' },
  { name: 'Lang Nanh', icon: '🐾', cls: 'specialty-pill--beast' },
  { name: 'Ma Cốt', icon: '🐾', cls: 'specialty-pill--beast' },
  { name: 'Yêu Thú Nhãn', icon: '🐾', cls: 'specialty-pill--beast' },
  { name: 'Nội Đan', icon: '🐾', cls: 'specialty-pill--beast' },
];

specialtyTestCases.forEach(({ name, icon, cls }) => {
  const badgeHtml = getSpecialtyBadge(name);
  assert(badgeHtml.includes(cls), `Item '${name}' receives class '${cls}'`);
  assert(badgeHtml.includes(icon), `Item '${name}' receives icon '${icon}'`);
  assert(badgeHtml.includes(name), `Item '${name}' renders item name in HTML`);
});

// Boundary tests for badge renderer
assert(getSpecialtyBadge(null).includes('specialty-pill'), 'Null input renders valid specialty-pill span');
assert(getSpecialtyBadge('').includes('specialty-pill'), 'Empty string renders valid specialty-pill span');

// --------------------------------------------------------------------
// SECTION 5: CSS DESIGN SYSTEM TOKEN FIDELITY & BRACE BALANCE
// --------------------------------------------------------------------
console.log('\n\x1b[1m▶ Section 5: CSS Design System Token Fidelity & Brace Balance\x1b[0m');

let braceBalance = 0;
for (const char of styleCss) {
  if (char === '{') braceBalance++;
  if (char === '}') braceBalance--;
}
assert(braceBalance === 0, `style.css brace balance is strictly 0 (got ${braceBalance})`);

// Essential R4 classes and keyframes
const requiredCssTokens = [
  '.realm-card--timed',
  '.realm-card--permanent',
  '.realm-badge--timed',
  '.realm-badge--permanent',
  '.badge-danger-apex',
  '.countdown-urgency',
  '.modifier-tag',
  '.modifier-tag--buff',
  '.modifier-tag--debuff',
  '.modifier-tag--hybrid',
  '.specialty-pill',
  '.specialty-pill--herb',
  '.specialty-pill--mineral',
  '.specialty-pill--beast',
  '.specialty-pill--rare',
  '.specialty-pill--epic',
  '.specialty-pill--legendary',
  '@keyframes crimsonHazardPulse',
  '@keyframes cuongBaoThreatGlow',
  '@keyframes urgencyPulse'
];

requiredCssTokens.forEach(token => {
  assert(styleCss.includes(token), `CSS contains required token: ${token}`);
});

// Verify color styling contrast
assert(styleCss.includes('rgba(168, 85, 247, 0.45)'), 'Timed realm card uses celestial purple border');
assert(styleCss.includes('rgba(239, 68, 68, 0.45)'), 'Permanent realm card uses crimson red border');
assert(styleCss.includes('cuongBaoThreatGlow'), 'Apex danger badge has glowing threat animation');

// --------------------------------------------------------------------
// SECTION 6: DUNGEON PAGE DOM CONTRACTS & RENDER VERIFICATION
// --------------------------------------------------------------------
console.log('\n\x1b[1m▶ Section 6: Dungeon Page DOM Contracts & Render Verification\x1b[0m');

// Verify Timed Dungeon requirements in dungeonCode
assert(dungeonCode.includes('class="realm-card--timed"'), 'dungeon.js wraps timed rifts in realm-card--timed');
assert(dungeonCode.includes('id="countdown-${td.id}"'), 'dungeon.js binds live countdown span #countdown-${id}');
assert(dungeonCode.includes('td.remainingSeconds < 900'), 'dungeon.js checks urgency threshold (< 15 mins = 900s)');
assert(dungeonCode.includes('⚠️ Sắp Tan Biến (&lt; 15p)') || dungeonCode.includes('⚠️ Sắp Tan Biến (< 15p)'), 'dungeon.js displays urgency indicator for expiring rifts');
assert(dungeonCode.includes('${regularWaves} Ải + 1 Thủ Lĩnh'), 'dungeon.js formats wave breakdown correctly');
assert(dungeonCode.includes('${td.bossName}'), 'dungeon.js previews boss guardian');

// Verify Permanent Dungeon requirements in dungeonCode
assert(dungeonCode.includes('class="realm-card--permanent"'), 'dungeon.js wraps permanent forbidden zones in realm-card--permanent');
assert(dungeonCode.includes('⚠️ CỰC HUNG HIỂM: Quái Vật Cuồng Bạo (x${diffMult})'), 'dungeon.js displays prominent hazard banner');
assert(dungeonCode.includes('class="badge-danger-apex">🔥 [Cuồng Bạo]</span>'), 'dungeon.js tags apex boss with Cuồng Bạo badge');
assert(dungeonCode.includes('pd.clearCount > 0 ? `🏆 Đã phá ${pd.clearCount} lần` : \'Chưa chinh phục\''), 'dungeon.js accurately renders conquest count or unvanquished status');

// Verify Active Run requirements in dungeonCode
assert(dungeonCode.includes('id="btnFight"'), 'dungeon.js contains attack button #btnFight');
assert(dungeonCode.includes('id="btnAbandon"'), 'dungeon.js contains retreat button #btnAbandon');
assert(dungeonCode.includes('Tầng ${r.currentWave} / ${r.totalWaves}'), 'dungeon.js renders wave progress indicator');
assert(dungeonCode.includes('🔥 TẦNG CUỐI CÙNG — TRÙM BÍ CẢNH TRẤN THỦ!'), 'dungeon.js triggers highlight banner on boss wave');

// --------------------------------------------------------------------
// SECTION 7: CANONICAL 18-ZONE EXPLORATION INTEGRITY
// --------------------------------------------------------------------
console.log('\n\x1b[1m▶ Section 7: Canonical 18-Zone Exploration Data Integrity\x1b[0m');

const explorationPath = path.join(rootDir, 'backend/data/exploration.json');
const explorationData = JSON.parse(fs.readFileSync(explorationPath, 'utf8'));

const zoneKeys = Object.keys(explorationData);
assert(zoneKeys.length === 18, `exploration.json contains exactly 18 zones (found ${zoneKeys.length})`);

let prevMinLevel = 0;
let monotonic = true;
zoneKeys.forEach(k => {
  const z = explorationData[k];
  const minLvl = z.min_level || z.minLevel || 1;
  if (minLvl < prevMinLevel) monotonic = false;
  prevMinLevel = minLvl;
});
assert(monotonic, 'Monotonic level requirements across all 18 world zones');

zoneKeys.forEach(k => {
  const z = explorationData[k];
  const title = getCultivationRealmTitle(z.min_level || 1);
  assert(typeof title === 'string' && title.length > 0, `Zone '${k}' resolves to valid cultivation realm '${title}'`);
});

// --------------------------------------------------------------------
// SUMMARY & VERDICT
// --------------------------------------------------------------------
console.log('\n\x1b[1m\x1b[35m====================================================================\x1b[0m');
console.log('\x1b[1m\x1b[35m        M4 CHALLENGER ADVERSARIAL EXECUTION SUMMARY                 \x1b[0m');
console.log('\x1b[1m\x1b[35m====================================================================\x1b[0m');
console.log(`  Total Checks Executed : ${totalChecks}`);
console.log(`  Passed Checks         : ${passedChecks}`);
console.log(`  Failed Checks         : ${failedChecks}`);
console.log('--------------------------------------------------------------------');

if (failedChecks === 0) {
  console.log('\x1b[32m\x1b[1m  VERDICT: APPROVE (ALL M4 CHALLENGER CHECKS PASSED 100%)\x1b[0m\n');
  process.exit(0);
} else {
  console.log('\x1b[31m\x1b[1m  VERDICT: REQUEST_CHANGES (CHALLENGER IDENTIFIED FAILURES)\x1b[0m\n');
  process.exit(1);
}
