/**
 * Adversarial Test Suite: Milestone M3 Streak Badges & Combat Log Serialization (Frontend)
 * 
 * Challenger 2: Empirical stress testing of:
 * 1. Streak Badges Matrix: 0, 1, 2, 3, 4, 5, 9, 10, 50 wins + negative + boundaries + malformed inputs
 * 2. Combat Log Turn Renderer: Crits, Dodges, Skills, Damage Numbers, Actor/Target, Turn Badges
 * 3. Combat Log Container: JSON deserialization, Raw arrays, Fallback on null/empty/corrupted/malformed
 * 4. CSS Token Fidelity: Ensure all rendered classes exist in frontend/src/style.css
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../');

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

// Load real, unmodified functions from frontend/src/pages/arena.js
const arenaJsPath = path.join(rootDir, 'frontend/src/pages/arena.js');
const arenaCode = fs.readFileSync(arenaJsPath, 'utf8');
const wrappedCode = arenaCode.replace('export function pageArena', 'function pageArena') +
  '\nreturn { ARENA_RANKS, getArenaRank, calcEloWinOdds, getStreakBadge, renderLogTurn, renderFightLog };';
const {
  ARENA_RANKS,
  getArenaRank,
  calcEloWinOdds,
  getStreakBadge,
  renderLogTurn,
  renderFightLog
} = new Function(wrappedCode)();

// Load style.css for CSS fidelity verification
const styleCssPath = path.join(rootDir, 'frontend/src/style.css');
const styleCssContent = fs.readFileSync(styleCssPath, 'utf8');

console.log('\n\x1b[1m\x1b[36m====================================================================\x1b[0m');
console.log('\x1b[1m\x1b[36m  ADVERSARIAL STRESS TEST: M3 STREAK BADGES & COMBAT LOG RENDERER   \x1b[0m');
console.log('\x1b[1m\x1b[36m====================================================================\x1b[0m\n');

// ====================================================================
// SECTION 1: STREAK BADGE MATRIX (0, 1, 2, 3, 4, 5, 9, 10, 50 WINS)
// ====================================================================
console.log('\x1b[1m▶ Section 1: Streak Badge Resolution Matrix (0, 1, 2, 3, 4, 5, 9, 10, 50)\x1b[0m');

{
  // 1. 0 wins: MUST return null (no badge)
  const b0 = getStreakBadge(0);
  assert(b0 === null, 'Streak 0 wins: strictly returns null (no badge)');

  // 2. 1 win: Tier 1 Subtle flame (🔥 Chuỗi x1)
  const b1 = getStreakBadge(1);
  assert(b1 !== null && b1.text === '🔥 Chuỗi x1', 'Streak 1 win: text is "🔥 Chuỗi x1"');
  assert(b1.icon === '🔥', 'Streak 1 win: icon is "🔥"');
  assert(b1.count === 1, 'Streak 1 win: count is 1');
  assert(b1.cssClass.includes('badge-streak'), 'Streak 1 win: has class badge-streak');
  assert(b1.cssClass.includes('streak-subtle') || b1.cssClass.includes('streak-basic'), 'Streak 1 win: has subtle/basic tier class');

  // 3. 2 wins: Tier 1 Subtle flame (🔥 Chuỗi x2)
  const b2 = getStreakBadge(2);
  assert(b2 !== null && b2.text === '🔥 Chuỗi x2', 'Streak 2 wins: text is "🔥 Chuỗi x2"');
  assert(b2.icon === '🔥', 'Streak 2 wins: icon is "🔥"');
  assert(b2.count === 2, 'Streak 2 wins: count is 2');
  assert(b2.cssClass.includes('streak-subtle') || b2.cssClass.includes('streak-basic'), 'Streak 2 wins: has subtle/basic tier class');

  // 4. 3 wins: Tier 2 Lightning (⚡ Chuỗi x3)
  const b3 = getStreakBadge(3);
  assert(b3 !== null && b3.text === '⚡ Chuỗi x3', 'Streak 3 wins: text is "⚡ Chuỗi x3"');
  assert(b3.icon === '⚡', 'Streak 3 wins: icon is "⚡"');
  assert(b3.count === 3, 'Streak 3 wins: count is 3');
  assert(b3.cssClass.includes('streak-lightning'), 'Streak 3 wins: has class streak-lightning');

  // 5. 4 wins: Tier 2 Lightning (⚡ Chuỗi x4)
  const b4 = getStreakBadge(4);
  assert(b4 !== null && b4.text === '⚡ Chuỗi x4', 'Streak 4 wins: text is "⚡ Chuỗi x4"');
  assert(b4.icon === '⚡', 'Streak 4 wins: icon is "⚡"');
  assert(b4.count === 4, 'Streak 4 wins: count is 4');
  assert(b4.cssClass.includes('streak-lightning'), 'Streak 4 wins: has class streak-lightning');

  // 6. 5 wins: Tier 3 Fiery Flame (🔥 Chuỗi x5)
  const b5 = getStreakBadge(5);
  assert(b5 !== null && b5.text === '🔥 Chuỗi x5', 'Streak 5 wins: text is "🔥 Chuỗi x5"');
  assert(b5.icon === '🔥', 'Streak 5 wins: icon is "🔥"');
  assert(b5.count === 5, 'Streak 5 wins: count is 5');
  assert(b5.cssClass.includes('streak-flame') || b5.cssClass.includes('streak-fire-high'), 'Streak 5 wins: has flame/fire-high class');

  // 7. 9 wins: Tier 3 Fiery Flame (🔥 Chuỗi x9)
  const b9 = getStreakBadge(9);
  assert(b9 !== null && b9.text === '🔥 Chuỗi x9', 'Streak 9 wins: text is "🔥 Chuỗi x9"');
  assert(b9.icon === '🔥', 'Streak 9 wins: icon is "🔥"');
  assert(b9.count === 9, 'Streak 9 wins: count is 9');
  assert(b9.cssClass.includes('streak-flame') || b9.cssClass.includes('streak-fire-high'), 'Streak 9 wins: has flame/fire-high class');

  // 8. 10 wins: Tier 4 Apex Crown (👑 Bất Bại x10)
  const b10 = getStreakBadge(10);
  assert(b10 !== null && b10.text === '👑 Bất Bại x10', 'Streak 10 wins: text is "👑 Bất Bại x10"');
  assert(b10.icon === '👑', 'Streak 10 wins: icon is "👑"');
  assert(b10.count === 10, 'Streak 10 wins: count is 10');
  assert(b10.cssClass.includes('streak-apex') || b10.cssClass.includes('streak-fire-apex'), 'Streak 10 wins: has apex/fire-apex class');

  // 9. 50 wins: Tier 4 Apex Crown (👑 Bất Bại x50)
  const b50 = getStreakBadge(50);
  assert(b50 !== null && b50.text === '👑 Bất Bại x50', 'Streak 50 wins: text is "👑 Bất Bại x50"');
  assert(b50.icon === '👑', 'Streak 50 wins: icon is "👑"');
  assert(b50.count === 50, 'Streak 50 wins: count is 50');
  assert(b50.cssClass.includes('streak-apex') || b50.cssClass.includes('streak-fire-apex'), 'Streak 50 wins: has apex/fire-apex class');
}

// ====================================================================
// SECTION 2: ADVERSARIAL STREAK BOUNDARIES & FAULT-TOLERANCE
// ====================================================================
console.log('\n\x1b[1m▶ Section 2: Adversarial Boundaries, Loss Streaks & Hostile Inputs\x1b[0m');

{
  // Boundary transitions:
  // 2 -> 3 (Subtle -> Lightning)
  assert(!getStreakBadge(2).cssClass.includes('streak-lightning'), 'Boundary 2: strictly not lightning');
  assert(getStreakBadge(3).cssClass.includes('streak-lightning'), 'Boundary 3: strictly is lightning');

  // 4 -> 5 (Lightning -> Flame Glow)
  assert(getStreakBadge(4).cssClass.includes('streak-lightning'), 'Boundary 4: strictly is lightning');
  assert(getStreakBadge(5).cssClass.includes('streak-flame') || getStreakBadge(5).cssClass.includes('streak-fire-high'), 'Boundary 5: strictly is flame');

  // 9 -> 10 (Flame Glow -> Crown Apex)
  assert(!getStreakBadge(9).cssClass.includes('streak-apex'), 'Boundary 9: strictly not apex');
  assert(getStreakBadge(10).cssClass.includes('streak-apex') || getStreakBadge(10).cssClass.includes('streak-fire-apex'), 'Boundary 10: strictly is apex');

  // Negative streaks (loss streak badges):
  const bLoss1 = getStreakBadge(-1);
  assert(bLoss1 !== null && bLoss1.text === '💀 Bại x1', 'Loss streak -1: text is "💀 Bại x1"');
  assert(bLoss1.icon === '💀', 'Loss streak -1: icon is "💀"');
  assert(bLoss1.cssClass.includes('streak-loss'), 'Loss streak -1: has class streak-loss');

  const bLoss5 = getStreakBadge(-5);
  assert(bLoss5 !== null && bLoss5.text === '💀 Bại x5', 'Loss streak -5: text is "💀 Bại x5"');
  assert(bLoss5.cssClass.includes('streak-loss'), 'Loss streak -5: has class streak-loss');

  // String coercion resilience:
  assert(getStreakBadge('0') === null, 'String "0": coerced safely to null');
  assert(getStreakBadge('1')?.text === '🔥 Chuỗi x1', 'String "1": parsed as 1 win');
  assert(getStreakBadge('4')?.text === '⚡ Chuỗi x4', 'String "4": parsed as 4 wins');
  assert(getStreakBadge('5')?.text === '🔥 Chuỗi x5', 'String "5": parsed as 5 wins');
  assert(getStreakBadge('10')?.text === '👑 Bất Bại x10', 'String "10": parsed as 10 wins');
  assert(getStreakBadge('50')?.text === '👑 Bất Bại x50', 'String "50": parsed as 50 wins');
  assert(getStreakBadge('-3')?.text === '💀 Bại x3', 'String "-3": parsed as 3 losses');

  // Malformed inputs safe handling (never throw):
  assert(getStreakBadge(null) === null, 'Input null: safely returns null');
  assert(getStreakBadge(undefined) === null, 'Input undefined: safely returns null');
  assert(getStreakBadge('') === null, 'Input empty string: safely returns null');
  assert(getStreakBadge('invalid_str') === null, 'Input "invalid_str": safely returns null');
  assert(getStreakBadge(NaN) === null, 'Input NaN: safely returns null');
  assert(getStreakBadge({}) === null, 'Input empty object: safely returns null');
  assert(getStreakBadge([]) === null, 'Input empty array: safely returns null');
}

// ====================================================================
// SECTION 3: CSS DESIGN SYSTEM FIDELITY FOR STREAK BADGES
// ====================================================================
console.log('\n\x1b[1m▶ Section 3: CSS Design System Token Fidelity for Streak Badges\x1b[0m');

{
  const testTiers = [1, 3, 5, 10, -1];
  for (const s of testTiers) {
    const badge = getStreakBadge(s);
    const classes = badge.cssClass.split(' ').filter(c => c.trim().length > 0);
    for (const cls of classes) {
      const existsInCss = styleCssContent.includes(`.${cls}`);
      assert(existsInCss, `CSS Rule Definition: .${cls} exists in frontend/src/style.css`);
    }
  }

  // Keyframe animations verification in CSS
  assert(styleCssContent.includes('@keyframes streakFireGlow'), 'CSS Animations: @keyframes streakFireGlow defined');
  assert(styleCssContent.includes('@keyframes streakCrownCorona'), 'CSS Animations: @keyframes streakCrownCorona defined');
}

// ====================================================================
// SECTION 4: COMBAT TURN LOG RENDERER (CRITS, DODGES, SKILLS, DAMAGE)
// ====================================================================
console.log('\n\x1b[1m▶ Section 4: Combat Turn Log Renderer: Crits, Dodges, Skills, Damage Numbers\x1b[0m');

{
  // A. CRITICAL STRIKES (Object & String format)
  const objCrit = {
    turn: 1,
    attacker: 'player',
    defender: 'opponent',
    damage: 320,
    isCrit: true,
    isDodge: false,
    action: 'attack'
  };
  const htmlObjCrit = renderLogTurn(objCrit, 0, 'Tiêu Viêm', 'Hàn Lập');
  assert(htmlObjCrit.includes('turn-crit'), 'Object Crit: container has .turn-crit CSS class');
  assert(htmlObjCrit.includes('log-crit'), 'Object Crit: damage has .log-crit styling');
  assert(htmlObjCrit.includes('💥 CHÍ MẠNG!'), 'Object Crit: contains crit badge "💥 CHÍ MẠNG!"');
  assert(htmlObjCrit.includes('320 ST'), 'Object Crit: displays damage "320 ST"');

  const strCrit = 'Turn 2: ⚔️ Tiêu Viêm xuất thường công gây 280 sát thương - CHÍ MẠNG!';
  const htmlStrCrit = renderLogTurn(strCrit, 1, 'Tiêu Viêm', 'Hàn Lập');
  assert(htmlStrCrit.includes('turn-crit'), 'String Crit: container has .turn-crit CSS class');
  assert(htmlStrCrit.includes('<strong class="log-crit">CHÍ MẠNG!</strong>'), 'String Crit: wraps CHÍ MẠNG! in .log-crit strong tag');

  const strBaoKich = 'Turn 3: Hàn Lập bạo kích! gây 450 sát thương';
  const htmlStrBaoKich = renderLogTurn(strBaoKich, 2, 'Tiêu Viêm', 'Hàn Lập');
  assert(htmlStrBaoKich.includes('turn-crit'), 'String Bạo Kích: container has .turn-crit CSS class');
  assert(htmlStrBaoKich.includes('<strong class="log-crit">bạo kích!</strong>'), 'String Bạo Kích: wraps bạo kích! in .log-crit');

  // B. DODGE / NÉ TRÁNH (Object & String format)
  const objDodge = {
    turn: 2,
    attacker: 'opponent',
    defender: 'player',
    isDodge: true,
    damage: 0,
    action: 'attack'
  };
  const htmlObjDodge = renderLogTurn(objDodge, 1, 'Tiêu Viêm', 'Hàn Lập');
  assert(htmlObjDodge.includes('turn-dodge'), 'Object Dodge: container has .turn-dodge CSS class');
  assert(htmlObjDodge.includes('log-dodge'), 'Object Dodge: contains .log-dodge element');
  assert(htmlObjDodge.includes('🎯 né tránh hoàn toàn!'), 'Object Dodge: contains "🎯 né tránh hoàn toàn!" text');

  const strDodge = 'Turn 4: Tiêu Viêm né tránh hoàn toàn đòn đánh!';
  const htmlStrDodge = renderLogTurn(strDodge, 3, 'Tiêu Viêm', 'Hàn Lập');
  assert(htmlStrDodge.includes('turn-dodge'), 'String Dodge: container has .turn-dodge CSS class');
  assert(htmlStrDodge.includes('<span class="log-dodge">né tránh hoàn toàn đòn đánh</span>'), 'String Dodge: wraps né tránh text in .log-dodge span');

  // C. SKILL TRIGGER (Object & String format)
  const objSkill = {
    turn: 3,
    attacker: 'player',
    defender: 'opponent',
    action: 'skill',
    skillName: 'Dị Hỏa Hằng Cổ Xích',
    damage: 650,
    isCrit: false,
    isDodge: false
  };
  const htmlObjSkill = renderLogTurn(objSkill, 2, 'Tiêu Viêm', 'Hàn Lập');
  assert(htmlObjSkill.includes('thi triển <strong>[Dị Hỏa Hằng Cổ Xích]</strong>'), 'Object Skill: displays skill name correctly');
  assert(!htmlObjSkill.includes('turn-crit'), 'Object Skill (non-crit): does not have turn-crit class');
  assert(!htmlObjSkill.includes('turn-dodge'), 'Object Skill (non-dodge): does not have turn-dodge class');
  assert(htmlObjSkill.includes('650 ST'), 'Object Skill: displays 650 ST damage');

  const strSkill = 'Turn 5: ⚡ [Kích Hoạt] Hàn Lập thi triển [Thanh Trúc Kiếm Trận] gây 550 sát thương!';
  const htmlStrSkill = renderLogTurn(strSkill, 4, 'Tiêu Viêm', 'Hàn Lập');
  assert(htmlStrSkill.includes('<span class="log-skill">⚡ [Kích Hoạt] Hàn Lập thi triển [Thanh Trúc Kiếm Trận]</span>'), 'String Skill: wraps ⚡ [Kích Hoạt] skill banner in .log-skill span');
  assert(htmlStrSkill.includes('<strong class="log-damage">550 sát thương</strong>'), 'String Skill: highlights 550 sát thương in .log-damage');

  // D. DAMAGE NUMBERS HIGHLIGHTING
  const strDmgST = 'Turn 6: Tiêu Viêm gây 120 ST';
  const htmlStrDmgST = renderLogTurn(strDmgST, 5, 'Tiêu Viêm', 'Hàn Lập');
  assert(htmlStrDmgST.includes('<strong class="log-damage">120 ST</strong>'), 'String Damage: highlights "120 ST" in .log-damage');

  const objZeroDmg = {
    turn: 7,
    attacker: 'player',
    defender: 'opponent',
    damage: 0,
    isCrit: false,
    isDodge: false
  };
  const htmlObjZeroDmg = renderLogTurn(objZeroDmg, 6, 'Tiêu Viêm', 'Hàn Lập');
  assert(htmlObjZeroDmg.includes('0 ST'), 'Object Zero Damage: preserves and renders "0 ST" (not omitted)');

  // E. ACTOR & DEFENDER NAME RESOLUTION
  const objActorDefault = { turn: 8, attacker: 'player', defender: 'opponent', damage: 50 };
  const htmlDefault = renderLogTurn(objActorDefault, 7, '', '');
  assert(htmlDefault.includes('Bạn'), 'Actor fallback: player resolves to "Bạn" when attackerName empty');
  assert(htmlDefault.includes('Đối thủ'), 'Defender fallback: opponent resolves to "Đối thủ" when defenderName empty');

  // F. TURN BADGES NUMBERING
  assert(renderLogTurn({ turn: 15, damage: 10 }, 0).includes('H.15'), 'Turn Badge: respects explicit turn number (H.15)');
  assert(renderLogTurn({ damage: 10 }, 4).includes('H.5'), 'Turn Badge: defaults to (idx + 1) when turn missing (H.5)');
  assert(renderLogTurn('Hiệp 9: đối thủ tấn công gây 10 ST', 0).includes('H.9'), 'Turn Badge: parses "Hiệp 9:" prefix as H.9');
  assert(renderLogTurn('Turn 11: thường công gây 10 ST', 0).includes('H.11'), 'Turn Badge: parses "Turn 11:" prefix as H.11');
}

// ====================================================================
// SECTION 5: COMPLETE COMBAT LOG CONTAINER & DESERIALIZATION
// ====================================================================
console.log('\n\x1b[1m▶ Section 5: Combat Log Container: Deserialization & Edge-Case Fallbacks\x1b[0m');

{
  const sampleLogs = [
    'Turn 1: ⚔️ Tiêu Viêm xuất thường công gây 80 sát thương',
    'Turn 2: ⚡ [Kích Hoạt] Hàn Lập thi triển [Thanh Trúc Kiếm] gây 200 sát thương!',
    'Turn 3: Tiêu Viêm né tránh hoàn toàn!',
    'Turn 4: ⚔️ Tiêu Viêm xuất thường công gây 350 sát thương - CHÍ MẠNG!'
  ];

  // 1. JSON String parsing:
  const jsonStr = JSON.stringify(sampleLogs);
  const renderedFromJson = renderFightLog(jsonStr, true, 'Tiêu Viêm', 'Hàn Lập');
  assert(renderedFromJson.includes('combat-log-turns'), 'JSON String: renders .combat-log-turns container');
  assert((renderedFromJson.match(/class="log-turn-badge"/g) || []).length === 4, 'JSON String: renders all 4 turns');

  // 2. Direct Array parsing:
  const renderedFromArray = renderFightLog(sampleLogs, false, 'Tiêu Viêm', 'Hàn Lập');
  assert(renderedFromArray.includes('combat-log-turns'), 'Direct Array: renders .combat-log-turns container');
  assert((renderedFromArray.match(/class="log-turn-badge"/g) || []).length === 4, 'Direct Array: renders all 4 turns');

  // 3. Fallback on NULL (legacy records prior to update):
  const fallbackNullWin = renderFightLog(null, true, 'A', 'B');
  assert(fallbackNullWin.includes('combat-log-empty'), 'Null Log: renders .combat-log-empty notice');
  assert(fallbackNullWin.includes('bản ghi lịch sử trước khi nâng cấp'), 'Null Log: contains upgrade notice text');
  assert(fallbackNullWin.includes('Chiến thắng'), 'Null Log (Won): specifies Chiến thắng result');

  const fallbackNullLoss = renderFightLog(null, false, 'A', 'B');
  assert(fallbackNullLoss.includes('Thất bại'), 'Null Log (Loss): specifies Thất bại result');

  // 4. Fallback on UNDEFINED:
  const fallbackUndefined = renderFightLog(undefined, true, 'A', 'B');
  assert(fallbackUndefined.includes('combat-log-empty'), 'Undefined Log: gracefully renders fallback');

  // 5. Fallback on EMPTY STRING:
  const fallbackEmptyStr = renderFightLog('', false, 'A', 'B');
  assert(fallbackEmptyStr.includes('combat-log-empty'), 'Empty String Log: gracefully renders fallback');

  // 6. Fallback on EMPTY ARRAY `[]`:
  const fallbackEmptyArr = renderFightLog([], true, 'A', 'B');
  assert(fallbackEmptyArr.includes('combat-log-empty'), 'Empty Array Log: gracefully renders fallback');

  // 7. Fallback on EMPTY JSON ARRAY `"[]"`:
  const fallbackEmptyJsonArr = renderFightLog('[]', true, 'A', 'B');
  assert(fallbackEmptyJsonArr.includes('combat-log-empty'), 'Empty JSON Array Log: gracefully renders fallback');

  // 8. Fallback on MALFORMED JSON STRING:
  const fallbackMalformed = renderFightLog('{not valid json, "turn": [', false, 'A', 'B');
  assert(fallbackMalformed.includes('combat-log-empty'), 'Malformed JSON: does not throw, gracefully falls back to notice');

  // 9. ADVERSARIAL STRESS: Non-array JSON values (Objects, Numbers, Booleans)
  // BUG FINDING: renderFightLog must NOT throw TypeError if fight_log is a JSON object or scalar
  try {
    const fallbackObjectJson = renderFightLog('{"error": "timeout", "status": "failed"}', true, 'A', 'B');
    assert(fallbackObjectJson.includes('combat-log-empty'), 'Adversarial JSON Object: safely falls back to notice without throwing');
  } catch (err) {
    assert(false, 'Adversarial JSON Object: safely falls back to notice without throwing', `UNCAUGHT EXCEPTION: ${err.name} - ${err.message}`);
  }

  try {
    const fallbackNumberJson = renderFightLog('42', true, 'A', 'B');
    assert(fallbackNumberJson.includes('combat-log-empty'), 'Adversarial JSON Number: safely falls back to notice without throwing');
  } catch (err) {
    assert(false, 'Adversarial JSON Number: safely falls back to notice without throwing', `UNCAUGHT EXCEPTION: ${err.name} - ${err.message}`);
  }

  try {
    const fallbackBooleanJson = renderFightLog('true', true, 'A', 'B');
    assert(fallbackBooleanJson.includes('combat-log-empty'), 'Adversarial JSON Boolean: safely falls back to notice without throwing');
  } catch (err) {
    assert(false, 'Adversarial JSON Boolean: safely falls back to notice without throwing', `UNCAUGHT EXCEPTION: ${err.name} - ${err.message}`);
  }
}

// ====================================================================
// SUMMARY & EXIT
// ====================================================================
console.log('\n\x1b[1m\x1b[36m====================================================================\x1b[0m');
console.log('\x1b[1m\x1b[36m             M3 ADVERSARIAL JS SUITE EXECUTION SUMMARY              \x1b[0m');
console.log('\x1b[1m\x1b[36m====================================================================\x1b[0m');
console.log(`  Total Checks Executed : ${passed + failed}`);
console.log(`  Passed Checks         : \x1b[32m${passed}\x1b[0m`);
console.log(`  Failed Checks         : ${failed > 0 ? `\x1b[31m${failed}\x1b[0m` : '\x1b[32m0\x1b[0m'}`);
console.log('--------------------------------------------------------------------');

if (failed === 0) {
  console.log('\x1b[32m\x1b[1m  VERDICT: ALL M3 STREAK BADGES & COMBAT LOG CHECKS PASSED (100%)\x1b[0m');
  console.log('\x1b[1m\x1b[36m====================================================================\x1b[0m\n');
  process.exit(0);
} else {
  console.error(`\x1b[31m\x1b[1m  VERDICT: ${failed} ADVERSARIAL JS VULNERABILITIES DETECTED\x1b[0m`);
  console.log('\x1b[1m\x1b[36m====================================================================\x1b[0m\n');
  process.exit(1);
}
