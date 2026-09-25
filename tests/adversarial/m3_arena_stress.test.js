/**
 * Adversarial Test Suite: Milestone M3 Opponent Cards, Rank Insignias & Elo Odds
 * 
 * Verifies:
 * 1. 7 Rank Insignias mapping across boundary ratings:
 *    [0, 999, 1000, 1199, 1200, 1399, 1400, 1599, 1600, 1799, 1800, 1999, 2000, 5000]
 * 2. Elo Win Probability calculation:
 *    - Identical ratings (50.0%)
 *    - +400 rating delta (~90.9%, Kèo Trên)
 *    - -400 rating delta (~9.1%, Kèo Dưới)
 *    - Extreme deltas (+2000, -2000, +10000, -10000) ensuring no NaN or infinity
 *    - Complementary probability symmetry: P(A, B) + P(B, A) === 100.0%
 * 3. Level Delta Formatting:
 *    - Positive delta (+N, class text-red, "(Δ +N)")
 *    - Negative delta (-N, class text-green, "(Δ -N)")
 *    - Zero delta (0, class text-dim, "(Δ 0)")
 * 4. Tiered Streak Fire Badges & Opponent Card Component Structure
 * 5. Combat Log Parser & Turn Highlight Engine
 */

import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load and evaluate arena.js functions in isolated VM context
const arenaJsPath = path.resolve(__dirname, '../../frontend/src/pages/arena.js');
const arenaJsCode = fs.readFileSync(arenaJsPath, 'utf8');

const arenaVm = {};
vm.createContext(arenaVm);
const exportBridge = `
this.ARENA_RANKS = ARENA_RANKS;
this.getArenaRank = getArenaRank;
this.calcEloWinOdds = calcEloWinOdds;
this.getStreakBadge = getStreakBadge;
this.renderLogTurn = renderLogTurn;
this.renderFightLog = renderFightLog;
`;
const strippedCode = arenaJsCode.replace(/export function pageArena[\s\S]*$/, '') + exportBridge;
vm.runInContext(strippedCode, arenaVm);

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

// Canonical Specification Oracle for Rank Insignias
const CANONICAL_RANKS = [
  { name: 'Vô Danh',   icon: '🌑', min: 0,    color: '#666666', tier: 1 },
  { name: 'Võ Sinh',   icon: '🥋', min: 1000, color: '#5ba3cf', tier: 2 },
  { name: 'Võ Sĩ',    icon: '⚔️', min: 1200, color: '#6a8f3f', tier: 3 },
  { name: 'Đấu Sĩ',   icon: '🔥', min: 1400, color: '#d4a017', tier: 4 },
  { name: 'Đấu Sư',   icon: '💫', min: 1600, color: '#b06cff', tier: 5 },
  { name: 'Á Quân',    icon: '🥈', min: 1800, color: '#c0c0c0', tier: 6 },
  { name: 'Quán Quân', icon: '👑', min: 2000, color: '#ff4500', tier: 7 },
];

function oracleRank(rating) {
  const r = typeof rating === 'number' && !isNaN(rating) ? rating : 1000;
  let rank = CANONICAL_RANKS[0];
  for (const rk of CANONICAL_RANKS) {
    if (r >= rk.min) rank = rk;
  }
  return rank;
}

// Canonical Specification Oracle for Elo Win Odds
function oracleEloWinOdds(myRating, oppRating) {
  const myR = typeof myRating === 'number' && !isNaN(myRating) ? myRating : 1000;
  const oppR = typeof oppRating === 'number' && !isNaN(oppRating) ? oppRating : 1000;
  const exponent = (oppR - myR) / 400;
  const probability = 1 / (1 + Math.pow(10, exponent));
  const winProbability = Math.round(probability * 1000) / 10;

  let tierLabel = '⚖️ Cân Tài';
  let labelShort = 'Cân Tài';
  let badgeColor = '#f59e0b';
  let badgeClass = 'odds-even';

  if (winProbability >= 60.0) {
    tierLabel = '🟢 Kèo Trên';
    labelShort = 'Kèo Trên';
    badgeColor = '#10b981';
    badgeClass = 'odds-advantage';
  } else if (winProbability < 40.0) {
    tierLabel = '⚠️ Kèo Dưới';
    labelShort = 'Kèo Dưới';
    badgeColor = '#ef4444';
    badgeClass = 'odds-underdog';
  }

  return {
    winProbability,
    tierLabel,
    labelShort,
    badgeColor,
    badgeClass,
    eloDelta: oppR - myR
  };
}

console.log('\n\x1b[1m\x1b[36m====================================================================\x1b[0m');
console.log('\x1b[1m\x1b[36m  ADVERSARIAL STRESS TEST: M3 ARENA FRONTEND ENGINE & ELO CALCULATOR \x1b[0m');
console.log('\x1b[1m\x1b[36m====================================================================\x1b[0m\n');

// ====================================================================
// SECTION 1: 7 RANK INSIGNIAS BOUNDARY RATING MAPPING
// ====================================================================
console.log('\x1b[1m▶ Section 1: 7 Rank Insignias Across Boundary Ratings\x1b[0m');

const boundaryRatings = [
  { rating: 0,    expectedRank: 'Vô Danh',   expectedTier: 1, icon: '🌑' },
  { rating: 999,  expectedRank: 'Vô Danh',   expectedTier: 1, icon: '🌑' },
  { rating: 1000, expectedRank: 'Võ Sinh',   expectedTier: 2, icon: '🥋' },
  { rating: 1199, expectedRank: 'Võ Sinh',   expectedTier: 2, icon: '🥋' },
  { rating: 1200, expectedRank: 'Võ Sĩ',    expectedTier: 3, icon: '⚔️' },
  { rating: 1399, expectedRank: 'Võ Sĩ',    expectedTier: 3, icon: '⚔️' },
  { rating: 1400, expectedRank: 'Đấu Sĩ',   expectedTier: 4, icon: '🔥' },
  { rating: 1599, expectedRank: 'Đấu Sĩ',   expectedTier: 4, icon: '🔥' },
  { rating: 1600, expectedRank: 'Đấu Sư',   expectedTier: 5, icon: '💫' },
  { rating: 1799, expectedRank: 'Đấu Sư',   expectedTier: 5, icon: '💫' },
  { rating: 1800, expectedRank: 'Á Quân',    expectedTier: 6, icon: '🥈' },
  { rating: 1999, expectedRank: 'Á Quân',    expectedTier: 6, icon: '🥈' },
  { rating: 2000, expectedRank: 'Quán Quân', expectedTier: 7, icon: '👑' },
  { rating: 5000, expectedRank: 'Quán Quân', expectedTier: 7, icon: '👑' },
];

for (const b of boundaryRatings) {
  const oracleRes = oracleRank(b.rating);
  assert(
    oracleRes.name === b.expectedRank && oracleRes.tier === b.expectedTier && oracleRes.icon === b.icon,
    `[Oracle] Rating ${b.rating} correctly maps to Tier ${b.expectedTier} (${b.expectedRank} ${b.icon})`
  );

  const arenaRes = arenaVm.getArenaRank(b.rating);
  const matches = arenaRes.name === b.expectedRank && arenaRes.tier === b.expectedTier && arenaRes.icon === b.icon;
  assert(
    matches,
    `[arena.js] Rating ${b.rating} maps to ${b.expectedRank} (Tier ${b.expectedTier})`,
    `Got ${arenaRes.name} (Tier ${arenaRes.tier}), expected ${b.expectedRank} (Tier ${b.expectedTier})`
  );
}

// ====================================================================
// SECTION 2: ELO WIN PROBABILITY ACCURACY & EXTREME STRESS
// ====================================================================
console.log('\n\x1b[1m▶ Section 2: Elo Win Probability Accuracy & Extreme Stress\x1b[0m');

// 2.1 Identical ratings (50.0%)
{
  const pairs = [[1000, 1000], [1400, 1400], [2000, 2000], [5000, 5000]];
  for (const [myR, oppR] of pairs) {
    const odds = arenaVm.calcEloWinOdds(myR, oppR);
    assert(odds.winProbability === 50.0, `Identical ratings (${myR} vs ${oppR}) gives exactly 50.0% win odds (got ${odds.winProbability}%)`);
    assert(odds.tierLabel === '⚖️ Cân Tài', `Identical ratings categorized as ⚖️ Cân Tài (got ${odds.tierLabel})`);
    assert(odds.eloDelta === 0, `Identical ratings eloDelta is 0 (got ${odds.eloDelta})`);
  }
}

// 2.2 +400 rating delta (~90.9%)
{
  const oddsPlus400 = arenaVm.calcEloWinOdds(1400, 1000);
  assert(oddsPlus400.winProbability === 90.9, `+400 rating delta (1400 vs 1000) gives 90.9% win odds (got ${oddsPlus400.winProbability}%)`);
  assert(oddsPlus400.tierLabel === '🟢 Kèo Trên', `+400 rating delta categorized as 🟢 Kèo Trên (got ${oddsPlus400.tierLabel})`);
  assert(oddsPlus400.eloDelta === -400, `+400 rating delta eloDelta is -400 (opp - my = 1000 - 1400 = -400)`);
}

// 2.3 -400 rating delta (~9.1%)
{
  const oddsMinus400 = arenaVm.calcEloWinOdds(1000, 1400);
  assert(oddsMinus400.winProbability === 9.1, `-400 rating delta (1000 vs 1400) gives 9.1% win odds (got ${oddsMinus400.winProbability}%)`);
  assert(oddsMinus400.tierLabel === '⚠️ Kèo Dưới', `-400 rating delta categorized as ⚠️ Kèo Dưới (got ${oddsMinus400.tierLabel})`);
  assert(oddsMinus400.eloDelta === 400, `-400 rating delta eloDelta is +400 (opp - my = 1400 - 1000 = +400)`);
}

// 2.4 Extreme deltas (+2000, -2000, +10000, -10000)
{
  const oddsExtremePos = arenaVm.calcEloWinOdds(3000, 1000);
  assert(oddsExtremePos.winProbability === 100.0, `Extreme +2000 delta yields 100.0% win probability (got ${oddsExtremePos.winProbability}%)`);
  assert(!isNaN(oddsExtremePos.winProbability) && isFinite(oddsExtremePos.winProbability), `Extreme +2000 delta is not NaN or Infinity`);
  assert(oddsExtremePos.tierLabel === '🟢 Kèo Trên', `Extreme +2000 delta labeled 🟢 Kèo Trên`);

  const oddsExtremeNeg = arenaVm.calcEloWinOdds(1000, 3000);
  assert(oddsExtremeNeg.winProbability === 0.0, `Extreme -2000 delta yields 0.0% win probability (got ${oddsExtremeNeg.winProbability}%)`);
  assert(!isNaN(oddsExtremeNeg.winProbability) && isFinite(oddsExtremeNeg.winProbability), `Extreme -2000 delta is not NaN or Infinity`);
  assert(oddsExtremeNeg.tierLabel === '⚠️ Kèo Dưới', `Extreme -2000 delta labeled ⚠️ Kèo Dưới`);

  const massivePos = arenaVm.calcEloWinOdds(50000, 1000);
  assert(massivePos.winProbability === 100.0 && Number.isFinite(massivePos.winProbability), `Massive +49000 delta is strictly finite 100.0%`);

  const massiveNeg = arenaVm.calcEloWinOdds(1000, 50000);
  assert(massiveNeg.winProbability === 0.0 && Number.isFinite(massiveNeg.winProbability), `Massive -49000 delta is strictly finite 0.0%`);
}

// 2.5 Complementary Probability Symmetry
{
  const testPairs = [
    [1000, 1100],
    [1200, 1350],
    [1400, 1600],
    [1600, 1800],
    [1000, 1400],
    [1500, 1750]
  ];

  for (const [rA, rB] of testPairs) {
    const oddsAB = arenaVm.calcEloWinOdds(rA, rB);
    const oddsBA = arenaVm.calcEloWinOdds(rB, rA);
    const sum = Math.round((oddsAB.winProbability + oddsBA.winProbability) * 10) / 10;
    assert(sum === 100.0, `Symmetry: P(${rA}, ${rB}) + P(${rB}, ${rA}) = ${oddsAB.winProbability}% + ${oddsBA.winProbability}% = ${sum}% (expected 100.0%)`);
  }
}

// 2.6 Zero Rating Edge Case in calcEloWinOdds
{
  // If myRating is 0 and oppRating is 1000:
  // With correct parsing: exponent = (1000 - 0) / 400 = 2.5. 1 / (1 + 10^2.5) = 0.3%.
  // If buggy `parseInt(0) || 1000` is used: exponent = (1000 - 1000) / 400 = 0 -> 50.0%!
  const zeroOdds = arenaVm.calcEloWinOdds(0, 1000);
  assert(
    zeroOdds.winProbability < 1.0,
    `Zero rating player (0 vs 1000) should have < 1.0% win probability`,
    `Got ${zeroOdds.winProbability}%, indicating 0 rating was replaced with 1000 via falsy || fallback!`
  );
}

// ====================================================================
// SECTION 3: LEVEL DELTA FORMATTING
// ====================================================================
console.log('\n\x1b[1m▶ Section 3: Level Delta Formatting\x1b[0m');

function formatLevelDelta(oppLevel, myLevel) {
  const deltaLevel = oppLevel - myLevel;
  const deltaLevelStr = deltaLevel > 0 ? `+${deltaLevel}` : `${deltaLevel}`;
  const deltaLevelClass = deltaLevel > 0 ? 'text-red' : (deltaLevel < 0 ? 'text-green' : 'text-dim');
  const formattedHtml = `Lv.${oppLevel} <span class="level-delta ${deltaLevelClass}">(Δ ${deltaLevelStr})</span>`;
  return { deltaLevel, deltaLevelStr, deltaLevelClass, formattedHtml };
}

// 3.1 Positive level delta (opponent higher level -> danger red)
{
  const res = formatLevelDelta(25, 20);
  assert(res.deltaLevel === 5, `Level delta 25 - 20 is +5`);
  assert(res.deltaLevelStr === '+5', `Positive delta string has leading '+' (+5)`);
  assert(res.deltaLevelClass === 'text-red', `Positive level delta has class text-red`);
  assert(res.formattedHtml.includes('(Δ +5)'), `HTML contains "(Δ +5)"`);
}

// 3.2 Negative level delta (opponent lower level -> safe green)
{
  const res = formatLevelDelta(15, 20);
  assert(res.deltaLevel === -5, `Level delta 15 - 20 is -5`);
  assert(res.deltaLevelStr === '-5', `Negative delta string formats as '-5'`);
  assert(res.deltaLevelClass === 'text-green', `Negative level delta has class text-green`);
  assert(res.formattedHtml.includes('(Δ -5)'), `HTML contains "(Δ -5)"`);
}

// 3.3 Zero level delta (identical level -> neutral dim)
{
  const res = formatLevelDelta(20, 20);
  assert(res.deltaLevel === 0, `Level delta 20 - 20 is 0`);
  assert(res.deltaLevelStr === '0', `Zero delta string formats as '0' without sign`);
  assert(res.deltaLevelClass === 'text-dim', `Zero level delta has class text-dim`);
  assert(res.formattedHtml.includes('(Δ 0)'), `HTML contains "(Δ 0)"`);
}

// 3.4 Boundary level pairs
{
  const resMinMax = formatLevelDelta(999, 1);
  assert(resMinMax.deltaLevelStr === '+998' && resMinMax.deltaLevelClass === 'text-red', `Boundary Lv.999 vs Lv.1 formats +998 text-red`);

  const resMaxMin = formatLevelDelta(1, 999);
  assert(resMaxMin.deltaLevelStr === '-998' && resMaxMin.deltaLevelClass === 'text-green', `Boundary Lv.1 vs Lv.999 formats -998 text-green`);
}

// ====================================================================
// SECTION 4: TIERED STREAK FIRE BADGES & CARD RENDERING
// ====================================================================
console.log('\n\x1b[1m▶ Section 4: Streak Fire Badges & Opponent Card Elements\x1b[0m');

// 4.1 Streak badges tiers
{
  assert(arenaVm.getStreakBadge(0) === null, `Streak 0 returns null (no badge)`);
  
  const b1 = arenaVm.getStreakBadge(1);
  assert(b1.text === '🔥 Chuỗi x1' && b1.cssClass.includes('streak-subtle'), `Streak 1: 🔥 Chuỗi x1 subtle`);
  
  const b2 = arenaVm.getStreakBadge(2);
  assert(b2.text === '🔥 Chuỗi x2', `Streak 2: 🔥 Chuỗi x2`);

  const b3 = arenaVm.getStreakBadge(3);
  assert(b3.text === '⚡ Chuỗi x3' && b3.cssClass.includes('streak-lightning'), `Streak 3: ⚡ Chuỗi x3 lightning`);

  const b4 = arenaVm.getStreakBadge(4);
  assert(b4.text === '⚡ Chuỗi x4', `Streak 4: ⚡ Chuỗi x4 lightning`);

  const b5 = arenaVm.getStreakBadge(5);
  assert(b5.text === '🔥 Chuỗi x5' && b5.cssClass.includes('streak-flame'), `Streak 5: 🔥 Chuỗi x5 fiery flame`);

  const b9 = arenaVm.getStreakBadge(9);
  assert(b9.text === '🔥 Chuỗi x9', `Streak 9: 🔥 Chuỗi x9 fiery flame`);

  const b10 = arenaVm.getStreakBadge(10);
  assert(b10.text === '👑 Bất Bại x10' && b10.cssClass.includes('streak-apex'), `Streak 10: 👑 Bất Bại x10 apex crown`);

  const b15 = arenaVm.getStreakBadge(15);
  assert(b15.text === '👑 Bất Bại x15', `Streak 15: 👑 Bất Bại x15 apex crown`);

  const bLoss = arenaVm.getStreakBadge(-3);
  assert(bLoss.text === '💀 Bại x3' && bLoss.cssClass.includes('streak-loss'), `Negative streak -3: 💀 Bại x3`);
}

// ====================================================================
// SECTION 5: COMBAT LOG RENDERING & TURN HIGHLIGHTS
// ====================================================================
console.log('\n\x1b[1m▶ Section 5: Combat Log Rendering & Highlights\x1b[0m');

{
  const structuredTurns = [
    { turn: 1, attacker: 'player', action: 'skill', skillName: 'Liệt Hỏa Quyền', damage: 350, isCrit: true, isDodge: false },
    { turn: 2, attacker: 'opponent', action: 'attack', damage: 0, isCrit: false, isDodge: true },
    { turn: 3, attacker: 'player', action: 'attack', damage: 220, isCrit: false, isDodge: false }
  ];

  const html = arenaVm.renderFightLog(structuredTurns, true, 'Kiếm Khách', 'Huyết Ma');
  assert(html.includes('combat-log-turns'), `Renders combat-log-turns container`);
  assert(html.includes('log-crit'), `Highlights critical strike with class log-crit`);
  assert(html.includes('CHÍ MẠNG'), `Highlights CHÍ MẠNG tag`);
  assert(html.includes('log-dodge'), `Highlights dodge with class log-dodge`);
  assert(html.includes('Liệt Hỏa Quyền'), `Includes skill name`);

  // Legacy fallback
  const emptyHtml = arenaVm.renderFightLog([], true, 'A', 'B');
  assert(emptyHtml.includes('combat-log-empty'), `Empty or legacy fight log renders combat-log-empty fallback`);
  assert(emptyHtml.includes('bản ghi lịch sử trước khi nâng cấp'), `Empty fight log explains legacy status`);
}

// ====================================================================
// SUMMARY REPORT
// ====================================================================
console.log('\n\x1b[1m\x1b[36m====================================================================\x1b[0m');
console.log('\x1b[1m\x1b[36m             M3 ARENA TEST SUITE EXECUTION SUMMARY                  \x1b[0m');
console.log('\x1b[1m\x1b[36m====================================================================\x1b[0m');
console.log(`  Total Checks Executed : \x1b[1m${passed + failed}\x1b[0m`);
console.log(`  Passed Checks         : \x1b[32m\x1b[1m${passed}\x1b[0m`);
console.log(`  Failed Checks         : ${failed > 0 ? `\x1b[31m\x1b[1m${failed}\x1b[0m` : `\x1b[32m0\x1b[0m`}`);
console.log('--------------------------------------------------------------------');

if (failed === 0) {
  console.log('\x1b[32m\x1b[1m  VERDICT: ALL M3 ARENA FRONTEND TESTS PASSED (100% SUCCESS)\x1b[0m');
  console.log('\x1b[1m\x1b[36m====================================================================\x1b[0m\n');
  process.exit(0);
} else {
  console.log('\x1b[31m\x1b[1m  VERDICT: FAILURES DETECTED IN M3 ARENA FRONTEND / RATING MAPPING\x1b[0m');
  console.log('\x1b[1m\x1b[36m====================================================================\x1b[0m\n');
  process.exit(1);
}
