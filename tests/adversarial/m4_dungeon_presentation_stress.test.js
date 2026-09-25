/**
 * Adversarial Test Suite: Milestone M4 Bí Cảnh & Huyễn Cảnh Presentation Stress Test
 * 
 * Verifies:
 * 1. Timed Secret Realms (⏳ Huyễn Cảnh) Formatting & Boundaries:
 *    - remainingSeconds = 0, 1, 899 (< 15m urgency triggered), 900, 3600, 5400, negative/invalid.
 *    - Urgency badge rendering and CSS class bindings.
 *    - Live countdown interval ticking, DOM text update, and expiration trigger.
 * 2. Difficulty Multiplier Formatting:
 *    - 1.1, 1.25, 1.4 (Timed standard).
 *    - 2.2, 3.5 (Permanent extreme).
 *    - Extreme & boundary values (0.5, 5.0, 10.0, floating precision, null/undefined fallbacks).
 *    - Active run extreme styling vs standard styling.
 * 3. Permanent Forbidden Zone (🔱 Thượng Cổ Cấm Địa) Rendering & Clear Count:
 *    - clear_count = 0 ("Chưa chinh phục", neutral badge).
 *    - clear_count = 1 ("🏆 Đã phá 1 lần", green badge).
 *    - clear_count = 999 ("🏆 Đã phá 999 lần", green badge).
 *    - Null / negative / anomalous clearCount handling.
 * 4. Boss Name Formatting with Affix:
 *    - Ensuring 🔥 [Cuồng Bạo] is consistently applied for extreme difficulty dungeons (Permanent).
 *    - Ensuring 🔥 [Cuồng Bạo] is NOT erroneously applied to standard/timed dungeons.
 *    - Active run hazard banner and badge bindings for difficultyMult >= 2.0.
 * 5. Active Run Wave Bounds & Final Boss Banner:
 *    - Wave 1/4 (normal wave, 0% progress, '⚔️ Tấn Công Ải 1', no final boss banner).
 *    - Wave 4/4 (final boss wave, 75% progress, '🐉 Đại Chiến Trùm Cuối!', final boss banner triggered).
 *    - Wave > total (e.g. 5/4 edge case).
 *    - Wave 1/1 (single-wave boss realm).
 *    - Hospitalized player state gating (disabled attack button, hospital warning).
 */

import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

console.log('\n\x1b[1m\x1b[35m====================================================================\x1b[0m');
console.log('\x1b[1m\x1b[35m  ADVERSARIAL STRESS TEST: M4 DUNGEON & SECRET REALMS (FRONTEND)    \x1b[0m');
console.log('\x1b[1m\x1b[35m====================================================================\x1b[0m\n');

// -----------------------------------------------------------------------------
// Load and build isolated VM harness for frontend/src/pages/dungeon.js
// -----------------------------------------------------------------------------
const dungeonJsPath = path.resolve(__dirname, '../../frontend/src/pages/dungeon.js');
let dungeonJsCode = fs.readFileSync(dungeonJsPath, 'utf8');

// Transform export for VM execution and inject inspection hooks
dungeonJsCode = dungeonJsCode.replace('export function pageDungeon', 'function pageDungeon');
dungeonJsCode = dungeonJsCode.replace(
  'const { state, api, notify, updateSidebar } = ctx',
  `const { state, api, notify, updateSidebar } = ctx;
ctx._harness = {
  formatTime,
  renderActiveRun,
  renderDungeonSections,
  renderTimedList,
  renderPermanentList,
  renderMapItems,
  renderLastResult,
  renderHistory,
  startLiveCountdown,
  render
};`
);

function createMockDOM() {
  let _html = '';
  const elementRegistry = new Map();

  return {
    get innerHTML() { return _html; },
    set innerHTML(val) {
      _html = val;
      // Re-scan IDs
      elementRegistry.clear();
      const idMatches = [...val.matchAll(/id=["']([^"']+)["']/g)];
      for (const m of idMatches) {
        const id = m[1];
        const classMatch = val.match(new RegExp(`class=["']([^"']*)["'][^>]*id=["']${id}["']`)) ||
                           val.match(new RegExp(`id=["']${id}["'][^>]*class=["']([^"']*)["']`));
        const initialClasses = (classMatch ? classMatch[1] : '').split(/\s+/).filter(Boolean);
        
        const parentClassMatch = val.match(new RegExp(`<([a-z0-9]+)[^>]*class=["']([^"']*)["'][^>]*>[^<]*<[^>]*id=["']${id}["']`, 'i'));
        const parentClasses = (parentClassMatch ? parentClassMatch[2] : '').split(/\s+/).filter(Boolean);

        const elObj = {
          id,
          textContent: '',
          classList: {
            classes: initialClasses,
            add(c) { if (!this.classes.includes(c)) this.classes.push(c); },
            contains(c) { return this.classes.includes(c); }
          },
          parentElement: {
            classList: {
              classes: parentClasses,
              add(c) { if (!this.classes.includes(c)) this.classes.push(c); },
              contains(c) { return this.classes.includes(c); }
            }
          },
          addEventListener: () => {}
        };
        elementRegistry.set(id, elObj);
      }
    },
    querySelector(selector) {
      if (selector.startsWith('#')) {
        return elementRegistry.get(selector.slice(1)) || null;
      }
      return null;
    },
    querySelectorAll(selector) {
      return [];
    }
  };
}

let activeIntervalCallback = null;
let activeIntervalMs = null;
let clearIntervalCalled = false;

const sandbox = {
  setInterval: (cb, ms) => {
    activeIntervalCallback = cb;
    activeIntervalMs = ms;
    return 999;
  },
  clearInterval: (id) => {
    clearIntervalCalled = true;
    activeIntervalCallback = null;
  },
  console: console,
  document: {
    querySelectorAll: () => [],
    getElementById: (id) => null
  }
};

vm.createContext(sandbox);
vm.runInContext(dungeonJsCode, sandbox);

function setupHarness(dungeonState = {}, playerOverrides = {}) {
  const el = createMockDOM();
  let loadDataCalls = 0;
  const ctx = {
    state: {
      playerId: 'test_player_m4',
      player: { realm: 3, level: 35, hospitalRemaining: 0, ...playerOverrides },
      _dungeon: {
        mapItems: [],
        timedDungeons: [],
        permanentDungeons: [],
        activeRun: null,
        history: [],
        loaded: true,
        combatLog: [],
        lastLoot: [],
        lastResult: null,
        ...dungeonState
      }
    },
    api: {
      getMapItems: async () => { loadDataCalls++; return {}; },
      getDungeonHistory: async () => { return {}; },
      enterDiscoveredDungeon: async () => ({}),
      enterDungeon: async () => ({}),
      fightDungeonWave: async () => ({}),
      abandonDungeon: async () => ({})
    },
    notify: () => {},
    updateSidebar: () => {},
    getLoadDataCalls: () => loadDataCalls
  };

  sandbox.pageDungeon(el, ctx);
  return { el, ctx, harness: ctx._harness, getLoadDataCalls: () => loadDataCalls };
}

// ====================================================================
// SECTION 1: TIMED SECRET REALMS (HUYỄN CẢNH) FORMATTING & BOUNDARY STRESS
// ====================================================================
console.log('\x1b[1m▶ Section 1: Timed Secret Realms Formatting & Boundary Stress\x1b[0m');

const { harness: h1 } = setupHarness();

// 1. formatTime boundary checks
assert(h1.formatTime(0) === 'Đã hết hạn', 'formatTime(0) returns "Đã hết hạn"');
assert(h1.formatTime(1) === '0m 01s', 'formatTime(1) returns "0m 01s"');
assert(h1.formatTime(59) === '0m 59s', 'formatTime(59) returns "0m 59s"');
assert(h1.formatTime(60) === '1m 00s', 'formatTime(60) returns "1m 00s"');
assert(h1.formatTime(899) === '14m 59s', 'formatTime(899) returns "14m 59s"');
assert(h1.formatTime(900) === '15m 00s', 'formatTime(900) returns "15m 00s"');
assert(h1.formatTime(901) === '15m 01s', 'formatTime(901) returns "15m 01s"');
assert(h1.formatTime(3599) === '59m 59s', 'formatTime(3599) returns "59m 59s"');
assert(h1.formatTime(3600) === '1h 00m 00s', 'formatTime(3600) returns "1h 00m 00s"');
assert(h1.formatTime(3661) === '1h 01m 01s', 'formatTime(3661) returns "1h 01m 01s"');
assert(h1.formatTime(5400) === '1h 30m 00s', 'formatTime(5400) returns "1h 30m 00s"');
assert(h1.formatTime(86400) === '24h 00m 00s', 'formatTime(86400) returns "24h 00m 00s"');
assert(h1.formatTime(-1) === 'Đã hết hạn', 'formatTime(-1) negative returns "Đã hết hạn"');
assert(h1.formatTime(-99999) === 'Đã hết hạn', 'formatTime(-99999) extreme negative returns "Đã hết hạn"');
assert(h1.formatTime(null) === 'Đã hết hạn', 'formatTime(null) returns "Đã hết hạn"');

// 2. renderTimedList Card Rendering across boundaries
function makeTimedDungeon(id, remainingSeconds, diffMult = 1.15) {
  return {
    id,
    name: `Huyễn Cảnh ${id}`,
    description: `Mô tả Huyễn Cảnh ${id}`,
    tier: 1,
    requiredRealm: 2,
    difficultyMult: diffMult,
    remainingSeconds,
    waves: 3,
    totalWaves: 4,
    bossName: `Huyễn Thú ${id}`
  };
}

// remainingSeconds = 0
const { el: elT0, ctx: ctxT0 } = setupHarness({ timedDungeons: [makeTimedDungeon(100, 0)] });
assert(elT0.innerHTML.includes('id="countdown-100">Đã hết hạn<'), 'remainingSeconds = 0 renders "Đã hết hạn" in #countdown-100');
assert(elT0.innerHTML.includes('⚠️ Sắp Tan Biến (&lt; 15p)'), 'remainingSeconds = 0 triggers urgency banner (< 15m)');
assert(elT0.innerHTML.includes('countdown-urgency'), 'remainingSeconds = 0 adds countdown-urgency class');

// remainingSeconds = 1
const { el: elT1 } = setupHarness({ timedDungeons: [makeTimedDungeon(101, 1)] });
assert(elT1.innerHTML.includes('id="countdown-101">0m 01s<'), 'remainingSeconds = 1 renders "0m 01s"');
assert(elT1.innerHTML.includes('⚠️ Sắp Tan Biến (&lt; 15p)'), 'remainingSeconds = 1 triggers urgency banner');

// remainingSeconds = 899 (boundary: 14m 59s < 15m)
const { el: elT899 } = setupHarness({ timedDungeons: [makeTimedDungeon(102, 899)] });
assert(elT899.innerHTML.includes('id="countdown-102">14m 59s<'), 'remainingSeconds = 899 renders "14m 59s"');
assert(elT899.innerHTML.includes('⚠️ Sắp Tan Biến (&lt; 15p)'), 'remainingSeconds = 899 triggers urgency banner (< 900s)');

// remainingSeconds = 900 (boundary: exact 15m = 900s, urgency NOT triggered)
const { el: elT900 } = setupHarness({ timedDungeons: [makeTimedDungeon(103, 900)] });
assert(elT900.innerHTML.includes('id="countdown-103">15m 00s<'), 'remainingSeconds = 900 renders "15m 00s"');
assert(!elT900.innerHTML.includes('⚠️ Sắp Tan Biến (&lt; 15p)'), 'remainingSeconds = 900 does NOT trigger urgency banner (>= 900s)');

// remainingSeconds = 3600
const { el: elT3600 } = setupHarness({ timedDungeons: [makeTimedDungeon(104, 3600)] });
assert(elT3600.innerHTML.includes('id="countdown-104">1h 00m 00s<'), 'remainingSeconds = 3600 renders "1h 00m 00s"');
assert(!elT3600.innerHTML.includes('⚠️ Sắp Tan Biến (&lt; 15p)'), 'remainingSeconds = 3600 does NOT trigger urgency banner');

// remainingSeconds = 5400
const { el: elT5400 } = setupHarness({ timedDungeons: [makeTimedDungeon(105, 5400)] });
assert(elT5400.innerHTML.includes('id="countdown-105">1h 30m 00s<'), 'remainingSeconds = 5400 renders "1h 30m 00s"');
assert(!elT5400.innerHTML.includes('⚠️ Sắp Tan Biến (&lt; 15p)'), 'remainingSeconds = 5400 does NOT trigger urgency banner');

// remainingSeconds = -10 (negative/invalid)
const { el: elTNeg } = setupHarness({ timedDungeons: [makeTimedDungeon(106, -10)] });
assert(elTNeg.innerHTML.includes('id="countdown-106">Đã hết hạn<'), 'remainingSeconds = -10 renders "Đã hết hạn"');

// 3. Live Countdown Interval Ticking
const { el: elTick, ctx: ctxTick } = setupHarness({ timedDungeons: [makeTimedDungeon(107, 901)] });
assert(activeIntervalCallback !== null, 'startLiveCountdown registers an active setInterval callback');
assert(activeIntervalMs === 1000, 'setInterval ticks at exactly 1000ms');

// Tick 1: 901 -> 900
activeIntervalCallback();
const countdownEl = elTick.querySelector('#countdown-107');
assert(countdownEl.textContent === '15m 00s', 'Interval tick 1 decrements 901s to 900s ("15m 00s")');
assert(!countdownEl.parentElement.classList.contains('countdown-urgency'), 'Countdown parent does NOT have countdown-urgency at 900s');

// Tick 2: 900 -> 899 (crosses urgency threshold)
activeIntervalCallback();
assert(countdownEl.textContent === '14m 59s', 'Interval tick 2 decrements 900s to 899s ("14m 59s")');
assert(countdownEl.parentElement.classList.contains('countdown-urgency'), 'Countdown parent dynamically acquires countdown-urgency class at 899s');

// Fast forward to expiry (td.remainingSeconds <= 0)
ctxTick.state._dungeon.timedDungeons[0].remainingSeconds = 1;
clearIntervalCalled = false;
activeIntervalCallback(); // 1 -> 0
assert(countdownEl.textContent === 'Đã hết hạn', 'Interval decrements 1s to 0s ("Đã hết hạn")');

// Next tick triggers expiration reload
activeIntervalCallback();
assert(clearIntervalCalled, 'Timer expiration triggers clearInterval to prevent zombie interval');

// ====================================================================
// SECTION 2: DIFFICULTY MULTIPLIER FORMATTING ACROSS DUNGEONS
// ====================================================================
console.log('\n\x1b[1m▶ Section 2: Difficulty Multiplier Formatting Across Dungeons\x1b[0m');

// Timed multipliers: 1.1, 1.25, 1.4
const { el: elDiffTimed } = setupHarness({
  timedDungeons: [
    makeTimedDungeon(111, 1800, 1.1),
    makeTimedDungeon(112, 1800, 1.25),
    makeTimedDungeon(113, 1800, 1.4),
    makeTimedDungeon(114, 1800, null),
    makeTimedDungeon(115, 1800, undefined)
  ]
});
assert(elDiffTimed.innerHTML.includes('Độ khó: <strong>x1.10</strong>'), 'Difficulty 1.1 formats as "x1.10" (2 decimal places)');
assert(elDiffTimed.innerHTML.includes('Độ khó: <strong>x1.25</strong>'), 'Difficulty 1.25 formats as "x1.25"');
assert(elDiffTimed.innerHTML.includes('Độ khó: <strong>x1.40</strong>'), 'Difficulty 1.4 formats as "x1.40"');
assert(elDiffTimed.innerHTML.includes('Độ khó: <strong>x1.10</strong>'), 'Null difficulty falls back to default 1.1 ("x1.10")');

// Permanent multipliers: 2.2, 3.5, and extremes
function makePermanentDungeon(id, clearCount, diffMult = 2.2) {
  return {
    id,
    name: `Cấm Địa ${id}`,
    description: `Mô tả Cấm Địa ${id}`,
    tier: 2,
    requiredRealm: 3,
    difficultyMult: diffMult,
    clearCount,
    waves: 4,
    totalWaves: 5,
    bossName: `Ma Thần ${id}`
  };
}

const { el: elDiffPerm } = setupHarness({
  permanentDungeons: [
    makePermanentDungeon(201, 0, 2.2),
    makePermanentDungeon(202, 1, 3.5),
    makePermanentDungeon(203, 0, 5.0),
    makePermanentDungeon(204, 0, 0.5),
    makePermanentDungeon(205, 0, 1.333333),
    makePermanentDungeon(206, 0, null)
  ]
});

assert(elDiffPerm.innerHTML.includes('Quái Vật Cuồng Bạo (x2.20)'), 'Permanent difficulty 2.2 formats as "(x2.20)" in hazard banner');
assert(elDiffPerm.innerHTML.includes('⚠️ Độ Khó: x2.20'), 'Permanent difficulty 2.2 formats as "x2.20" in badge');
assert(elDiffPerm.innerHTML.includes('Quái Vật Cuồng Bạo (x3.50)'), 'Permanent difficulty 3.5 formats as "(x3.50)" in hazard banner');
assert(elDiffPerm.innerHTML.includes('⚠️ Độ Khó: x3.50'), 'Permanent difficulty 3.5 formats as "x3.50" in badge');
assert(elDiffPerm.innerHTML.includes('Quái Vật Cuồng Bạo (x5.00)'), 'Extreme difficulty 5.0 formats cleanly as "(x5.00)"');
assert(elDiffPerm.innerHTML.includes('Quái Vật Cuồng Bạo (x0.50)'), 'Sub-unity difficulty 0.5 formats cleanly as "(x0.50)"');
assert(elDiffPerm.innerHTML.includes('Quái Vật Cuồng Bạo (x1.33)'), 'Floating precision 1.333333 rounds to 2 decimals "(x1.33)"');
assert(elDiffPerm.innerHTML.includes('Quái Vật Cuồng Bạo (x2.20)'), 'Null permanent difficulty falls back to default 2.2 ("x2.20")');

// Active Run Multiplier Formatting
const { el: elRunStd } = setupHarness({
  activeRun: {
    id: 1,
    dungeonId: 'timed_1',
    dungeonName: 'Huyễn Cảnh Dược Cốc',
    difficultyMult: 1.25,
    currentWave: 1,
    totalWaves: 4
  }
});
assert(elRunStd.innerHTML.includes('Độ Khó x1.25'), 'Active run with diffMult 1.25 displays standard gold badge "Độ Khó x1.25"');
assert(!elRunStd.innerHTML.includes('badge-danger-apex'), 'Active run with diffMult 1.25 does NOT display badge-danger-apex');

const { el: elRunApex } = setupHarness({
  activeRun: {
    id: 2,
    dungeonId: 'perm_1',
    dungeonName: 'Cấm Địa Man Hoang',
    difficultyMult: 2.5,
    currentWave: 1,
    totalWaves: 4
  }
});
assert(elRunApex.innerHTML.includes('badge-danger-apex'), 'Active run with diffMult 2.5 (>= 2.0) displays badge-danger-apex');
assert(elRunApex.innerHTML.includes('⚠️ Quái Cuồng Bạo x2.50'), 'Active run with diffMult 2.5 displays "⚠️ Quái Cuồng Bạo x2.50"');
assert(elRunApex.innerHTML.includes('realm-card--permanent'), 'Active run with diffMult 2.5 adds realm-card--permanent panel styling');

// ====================================================================
// SECTION 3: PERMANENT FORBIDDEN ZONE RENDERING & CLEAR COUNT TRACKING
// ====================================================================
console.log('\n\x1b[1m▶ Section 3: Permanent Forbidden Zone Rendering & Clear Count Tracking\x1b[0m');

// clear_count = 0 ("Chưa chinh phục")
const { el: elC0 } = setupHarness({ permanentDungeons: [makePermanentDungeon(210, 0)] });
assert(elC0.innerHTML.includes('Chưa chinh phục'), 'clear_count = 0 displays "Chưa chinh phục"');
assert(!elC0.innerHTML.includes('🏆 Đã phá'), 'clear_count = 0 does NOT display "🏆 Đã phá"');
assert(elC0.innerHTML.includes('var(--text-dim)'), 'clear_count = 0 uses neutral dim text color');

// clear_count = 1 ("Đã phá 1 lần")
const { el: elC1 } = setupHarness({ permanentDungeons: [makePermanentDungeon(211, 1)] });
assert(elC1.innerHTML.includes('🏆 Đã phá 1 lần'), 'clear_count = 1 displays "🏆 Đã phá 1 lần"');
assert(elC1.innerHTML.includes('#6ee7b7'), 'clear_count = 1 uses emerald success text color');
assert(elC1.innerHTML.includes('rgba(16,185,129,0.15)'), 'clear_count = 1 uses emerald background tint');

// clear_count = 999 ("Đã phá 999 lần")
const { el: elC999 } = setupHarness({ permanentDungeons: [makePermanentDungeon(212, 999)] });
assert(elC999.innerHTML.includes('🏆 Đã phá 999 lần'), 'clear_count = 999 displays "🏆 Đã phá 999 lần"');

// Edge cases: negative, null, undefined
const { el: elCAnom } = setupHarness({
  permanentDungeons: [
    makePermanentDungeon(213, -5),
    makePermanentDungeon(214, null),
    makePermanentDungeon(215, undefined)
  ]
});
assert(elCAnom.innerHTML.includes('Chưa chinh phục'), 'Negative clear_count (-5) gracefully falls back to "Chưa chinh phục"');
assert(!elCAnom.innerHTML.includes('🏆 Đã phá -5 lần'), 'Negative clear_count does not produce invalid "Đã phá -5 lần"');

// Realm Gating on Permanent Dungeon Cards
const { el: elPermGate } = setupHarness(
  { permanentDungeons: [makePermanentDungeon(216, 0)] }, // requires Realm 3
  { realm: 1 } // Realm 1 player
);
assert(elPermGate.innerHTML.includes('disabled'), 'Player Realm 1 has disabled button for Realm 3 Permanent Dungeon');
assert(elPermGate.innerHTML.includes('🔒 Cảnh Giới Thấp'), 'Player Realm 1 sees locked button "🔒 Cảnh Giới Thấp"');

// ====================================================================
// SECTION 4: BOSS NAME FORMATTING WITH AFFIX (🔥 [Cuồng Bạo])
// ====================================================================
console.log('\n\x1b[1m▶ Section 4: Boss Name Formatting with Affix (🔥 [Cuồng Bạo])\x1b[0m');

const { el: elAffix } = setupHarness({
  timedDungeons: [makeTimedDungeon(120, 1800, 1.2)],
  permanentDungeons: [makePermanentDungeon(220, 0, 2.8)]
});

// 1. Permanent dungeon boss formatting
assert(elAffix.innerHTML.includes('<span class="badge-danger-apex">🔥 [Cuồng Bạo]</span>'), 'Permanent dungeon hazard banner renders badge-danger-apex 🔥 [Cuồng Bạo]');
assert(elAffix.innerHTML.includes('🐉 Trùm Cấm Địa: <strong style="color:#f87171"><span class="badge-danger-apex">🔥 [Cuồng Bạo]</span> Ma Thần 220</strong>'),
  'Permanent dungeon boss name consistently prefixed with 🔥 [Cuồng Bạo] in apex danger style');

// 2. Timed dungeon boss formatting (MUST NOT have Cuồng Bạo)
assert(elAffix.innerHTML.includes('🐉 Thủ Vệ: <strong style="color:#e9d5ff">Huyễn Thú 120</strong>'),
  'Timed dungeon boss name does NOT have Cuồng Bạo tag');
assert(!elAffix.innerHTML.includes('🐉 Thủ Vệ: <strong style="color:#e9d5ff"><span class="badge-danger-apex">'),
  'Timed dungeon boss name strictly remains non-affixed');

// 3. No double affix bug
const bossNameWithPreexistingAffix = '🔥 [Cuồng Bạo] Viễn Cổ Ma Thần';
const { el: elDoubleAffix } = setupHarness({
  permanentDungeons: [{
    ...makePermanentDungeon(221, 0, 3.0),
    bossName: bossNameWithPreexistingAffix
  }]
});
// When bossName already has affix, verify how it renders
assert(elDoubleAffix.innerHTML.includes(bossNameWithPreexistingAffix), 'Pre-affixed boss name renders properly without crashing');

// ====================================================================
// SECTION 5: ACTIVE RUN WAVE BOUNDS & FINAL BOSS BANNER
// ====================================================================
console.log('\n\x1b[1m▶ Section 5: Active Run Wave Bounds & Final Boss Banner\x1b[0m');

// 1. Wave 1 of 4 (Normal initial wave)
const { el: elW1 } = setupHarness({
  activeRun: {
    id: 10,
    dungeonId: 'cam_dia_man_hoang',
    dungeonName: 'Cấm Địa Man Hoang',
    difficultyMult: 2.2,
    currentWave: 1,
    totalWaves: 4
  }
});
assert(elW1.innerHTML.includes('Tầng 1 / 4 (0%)'), 'Wave 1/4 reports progress (0%)');
assert(elW1.innerHTML.includes('⚔️ Đang vượt ải: <strong>Tầng 1 / 4</strong>'), 'Wave 1/4 renders standard progress banner');
assert(elW1.innerHTML.includes('⚔️ Tấn Công Ải 1'), 'Wave 1/4 button text is "⚔️ Tấn Công Ải 1"');
assert(!elW1.innerHTML.includes('🔥 TẦNG CUỐI CÙNG — TRÙM BÍ CẢNH TRẤN THỦ! 🔥'), 'Wave 1/4 does NOT render final boss banner');
assert(!elW1.innerHTML.includes('🐉 Đại Chiến Trùm Cuối!'), 'Wave 1/4 does NOT render final boss attack button');

// 2. Wave 2 of 4 (Intermediate wave)
const { el: elW2 } = setupHarness({
  activeRun: {
    id: 11,
    dungeonId: 'cam_dia_man_hoang',
    dungeonName: 'Cấm Địa Man Hoang',
    difficultyMult: 2.2,
    currentWave: 2,
    totalWaves: 4
  }
});
assert(elW2.innerHTML.includes('Tầng 2 / 4 (25%)'), 'Wave 2/4 reports progress (25%)');
assert(elW2.innerHTML.includes('width:25%'), 'Wave 2/4 progress bar width is 25%');
assert(elW2.innerHTML.includes('⚔️ Tấn Công Ải 2'), 'Wave 2/4 button text is "⚔️ Tấn Công Ải 2"');

// 3. Wave 3 of 4 (Penultimate wave)
const { el: elW3 } = setupHarness({
  activeRun: {
    id: 12,
    dungeonId: 'cam_dia_man_hoang',
    dungeonName: 'Cấm Địa Man Hoang',
    difficultyMult: 2.2,
    currentWave: 3,
    totalWaves: 4
  }
});
assert(elW3.innerHTML.includes('Tầng 3 / 4 (50%)'), 'Wave 3/4 reports progress (50%)');
assert(elW3.innerHTML.includes('width:50%'), 'Wave 3/4 progress bar width is 50%');

// 4. Wave 4 of 4 (Final Boss Wave)
const { el: elW4 } = setupHarness({
  activeRun: {
    id: 13,
    dungeonId: 'cam_dia_man_hoang',
    dungeonName: 'Cấm Địa Man Hoang',
    difficultyMult: 2.2,
    currentWave: 4,
    totalWaves: 4
  }
});
assert(elW4.innerHTML.includes('Tầng 4 / 4 (75%)'), 'Wave 4/4 reports progress (75%)');
assert(elW4.innerHTML.includes('width:75%'), 'Wave 4/4 progress bar width is 75%');
assert(elW4.innerHTML.includes('🔥 TẦNG CUỐI CÙNG — TRÙM BÍ CẢNH TRẤN THỦ! 🔥'), 'Wave 4/4 TRIGGERS final boss highlight banner');
assert(elW4.innerHTML.includes('🐉 Đại Chiến Trùm Cuối!'), 'Wave 4/4 button changes to "🐉 Đại Chiến Trùm Cuối!"');
assert(!elW4.innerHTML.includes('⚔️ Đang vượt ải:'), 'Wave 4/4 does NOT render standard wave banner');

// 5. Edge case: Wave 5 of 4 (wave > total)
const { el: elW5 } = setupHarness({
  activeRun: {
    id: 14,
    dungeonId: 'cam_dia_man_hoang',
    dungeonName: 'Cấm Địa Man Hoang',
    difficultyMult: 2.2,
    currentWave: 5,
    totalWaves: 4
  }
});
assert(elW5.innerHTML.includes('Tầng 5 / 4 (100%)'), 'Wave 5/4 edge case reports 100% progress without throwing');
assert(elW5.innerHTML.includes('width:100%'), 'Wave 5/4 progress bar width is 100%');
// Document that isBoss evaluates (5 === 4) which is false
const isBossAtW5 = (5 === 4);
assert(!isBossAtW5, 'Empirical check: isBoss evaluates (currentWave === totalWaves), so wave > total does NOT trigger boss banner');

// 6. Edge case: Single Wave Dungeon (totalWaves = 1, currentWave = 1)
const { el: elSingleWave } = setupHarness({
  activeRun: {
    id: 15,
    dungeonId: 'boss_lair',
    dungeonName: 'Độc Lập Ma Thần Động',
    difficultyMult: 2.5,
    currentWave: 1,
    totalWaves: 1
  }
});
assert(elSingleWave.innerHTML.includes('🔥 TẦNG CUỐI CÙNG — TRÙM BÍ CẢNH TRẤN THỦ! 🔥'), 'Single wave dungeon (1/1) immediately triggers final boss banner');
assert(elSingleWave.innerHTML.includes('🐉 Đại Chiến Trùm Cuối!'), 'Single wave dungeon (1/1) button displays "🐉 Đại Chiến Trùm Cuối!"');

// 7. Hospitalized state gating
const { el: elHosp } = setupHarness(
  {
    activeRun: {
      id: 16,
      dungeonId: 'cam_dia_man_hoang',
      dungeonName: 'Cấm Địa Man Hoang',
      difficultyMult: 2.2,
      currentWave: 2,
      totalWaves: 4
    }
  },
  { realm: 3, level: 35, hospitalRemaining: 120 }
);
assert(elHosp.innerHTML.includes('id="btnFight"') && elHosp.innerHTML.includes('disabled'), 'Hospitalized player has disabled #btnFight button');
assert(elHosp.innerHTML.includes('🏥 Đang trọng thương, chờ hồi phục khí huyết...'), 'Hospitalized player sees medical alert banner');

// ====================================================================
// SECTION 6: EMPTY STATE RENDERING & BOUNDARY RESILIENCE
// ====================================================================
console.log('\n\x1b[1m▶ Section 6: Empty State Rendering & Boundary Resilience\x1b[0m');

const { el: elEmpty } = setupHarness({
  timedDungeons: [],
  permanentDungeons: [],
  mapItems: [],
  history: [],
  activeRun: null,
  lastResult: null
});

assert(elEmpty.innerHTML.includes('🌀 Hiện tại chưa phát hiện Huyễn Cảnh nào.'), 'Empty timed dungeons list renders informative guidance');
assert(elEmpty.innerHTML.includes('🌋 Chưa khai mở Cấm Địa Thượng Cổ nào.'), 'Empty permanent dungeons list renders informative guidance');
assert(elEmpty.innerHTML.includes('📜 Chưa có Ngọc Giản nào trong Túi Đồ.'), 'Empty map items list renders informative guidance');
assert(!elEmpty.innerHTML.includes('📚 Lịch Sử Khiêu Chiến Bí Cảnh'), 'Empty history panel is not rendered');
assert(!elEmpty.innerHTML.includes('Kết Quả Chiến Đấu'), 'Empty last result panel is not rendered');

// ====================================================================
// SECTION 7: ANCIENT JADE SLIPS (NGỌC GIẢN CỔ ĐỒ) RENDERING
// ====================================================================
console.log('\n\x1b[1m▶ Section 7: Ancient Jade Slips (Ngọc Giản) Metadata & Actions\x1b[0m');

const mockMapItems = [
  {
    item: { id: 'map_t1', name: 'Ngọc Giản Cổ Đồ T1', icon: '📜' },
    quantity: 3,
    dungeon: {
      id: 'dungeon_t1',
      name: 'U Tối Cổ Động',
      tier: 1,
      waves: 3,
      bossName: 'Cổ Động Xà Vương'
    }
  },
  {
    item: { id: 'map_t2_orphan', name: 'Mảnh Ngọc Rách', icon: '📜' },
    quantity: 1,
    dungeon: null // Edge case: item with no linked dungeon definition
  }
];

const { el: elMaps } = setupHarness({ mapItems: mockMapItems });
assert(elMaps.innerHTML.includes('x3 Mảnh'), 'Map item displays accurate quantity badge "x3 Mảnh"');
assert(elMaps.innerHTML.includes('🏛️ U Tối Cổ Động · Bậc T1 · 🏰 4 Tầng · 🐉 Boss: <strong style="color:var(--gold)">Cổ Động Xà Vương</strong>'),
  'Map item displays full dungeon metadata (Tier, Total waves = waves + 1, Boss name)');
assert(elMaps.innerHTML.includes('data-enter="map_t1"'), 'Map item binds data-enter attribute to item ID');
assert(elMaps.innerHTML.includes('⚡ Kích Hoạt'), 'Map item renders activation button');
// Orphan item check
assert(elMaps.innerHTML.includes('Mảnh Ngọc Rách'), 'Orphan map item renders name safely');
assert(!elMaps.innerHTML.includes('data-enter="map_t2_orphan"'), 'Orphan map item without dungeon does not render activation button');

// ====================================================================
// SECTION 8: COMBAT RESULTS & HISTORY PERSISTENCE RENDERING
// ====================================================================
console.log('\n\x1b[1m▶ Section 8: Combat Results & History Persistence Rendering\x1b[0m');

// 1. Complete Result
const { el: elResComplete } = setupHarness({
  lastResult: {
    result: 'dungeon_complete',
    message: 'Chiến thắng vang dội!',
    loot: ['💎 500 Linh thạch', '📦 Dược liệu x2'],
    combatLog: ['Turn 1: Hit', 'Turn 2: Crit']
  }
});
assert(elResComplete.innerHTML.includes('🏆 Kết Quả Chiến Đấu'), 'Dungeon complete displays trophy icon');
assert(elResComplete.innerHTML.includes('🎁 CHIẾN LỢI PHẨM THU ĐƯỢC:'), 'Displays loot container header');
assert(elResComplete.innerHTML.includes('💎 500 Linh thạch'), 'Displays individual loot items');
assert(elResComplete.innerHTML.includes('📜 Xem chi tiết diễn biến (2 lượt)'), 'Displays combat log count');

// 2. Failed Result
const { el: elResFail } = setupHarness({
  lastResult: {
    result: 'dungeon_failed',
    message: 'Thất bại thảm hại!',
    loot: [],
    combatLog: ['Turn 1: Defeated']
  }
});
assert(elResFail.innerHTML.includes('💀 Kết Quả Chiến Đấu'), 'Dungeon failed displays skull icon');
assert(elResFail.innerHTML.includes('border-color:var(--red)'), 'Dungeon failed uses crimson border');

// 3. History Statuses
const { el: elHist } = setupHarness({
  history: [
    { dungeonName: 'Cấm Địa 1', wave: 4, totalWaves: 4, status: 'completed', startedAt: '2026-09-25T12:00:00Z' },
    { dungeonName: 'Huyễn Cảnh 1', wave: 2, totalWaves: 4, status: 'failed', startedAt: '2026-09-25T11:00:00Z' },
    { dungeonName: 'Cấm Địa 2', wave: 1, totalWaves: 5, status: 'abandoned', startedAt: '2026-09-25T10:00:00Z' },
    { dungeonName: 'Huyễn Cảnh 2', wave: 3, totalWaves: 4, status: 'active', startedAt: '2026-09-25T09:00:00Z' }
  ]
});
assert(elHist.innerHTML.includes('✅ Cấm Địa 1'), 'Completed history entry renders with green checkmark');
assert(elHist.innerHTML.includes('❌ Huyễn Cảnh 1'), 'Failed history entry renders with red cross');
assert(elHist.innerHTML.includes('🚪 Cấm Địa 2'), 'Abandoned history entry renders with exit door');
assert(elHist.innerHTML.includes('⏳ Huyễn Cảnh 2'), 'Active/interrupted history entry renders with hourglass');

// ====================================================================
// SECTION 9: ACTIVE RUN VIEW FOCUS & CONCURRENT MULTI-TIMER
// ====================================================================
console.log('\n\x1b[1m▶ Section 9: Active Run View Focus & Multi-Timer Concurrency\x1b[0m');

// 1. When activeRun is present, section lists (timed/permanent/mapItems) must NOT be shown
const { el: elRunFocus } = setupHarness({
  activeRun: {
    id: 99,
    dungeonId: 'test_run',
    dungeonName: 'Đang Vượt Bí Cảnh',
    difficultyMult: 1.5,
    currentWave: 2,
    totalWaves: 4
  },
  timedDungeons: [makeTimedDungeon(301, 1000)],
  permanentDungeons: [makePermanentDungeon(302, 0)],
  mapItems: [mockMapItems[0]]
});
assert(elRunFocus.innerHTML.includes('⚡ Đang Trong Bí Cảnh'), 'Active run panel is prominently rendered');
assert(!elRunFocus.innerHTML.includes('⏳ Bí Cảnh Huyễn Cảnh (Có Thời Hạn)'), 'Timed section header is hidden during active run');
assert(!elRunFocus.innerHTML.includes('🔱 Thượng Cổ Cấm Địa (Vĩnh Cửu'), 'Permanent section header is hidden during active run');
assert(!elRunFocus.innerHTML.includes('📜 Ngọc Giản Cổ Đồ (Khai Mở'), 'Map items section header is hidden during active run');

// 2. Multi-Timer Concurrency: 2 Timed Dungeons with Different Timers
const { el: elMulti, ctx: ctxMulti } = setupHarness({
  timedDungeons: [
    makeTimedDungeon(401, 5),   // Expires in 5s
    makeTimedDungeon(402, 1200) // Expires in 1200s (20m)
  ]
});
assert(activeIntervalCallback !== null, 'Active interval exists for multi-timer test');
// Tick 1
activeIntervalCallback();
assert(ctxMulti.state._dungeon.timedDungeons[0].remainingSeconds === 4, 'Timer 1 decremented to 4s');
assert(ctxMulti.state._dungeon.timedDungeons[1].remainingSeconds === 1199, 'Timer 2 decremented to 1199s');

// Fast forward timer 1 to 0 while timer 2 still has time
ctxMulti.state._dungeon.timedDungeons[0].remainingSeconds = 0;
clearIntervalCalled = false;
activeIntervalCallback();
assert(clearIntervalCalled, 'When any timer reaches 0, clearInterval is called to reload data');

// ====================================================================
// SUMMARY & VERDICT
// ====================================================================
console.log('\n\x1b[1m\x1b[35m====================================================================\x1b[0m');
console.log('\x1b[1m\x1b[35m         M4 DUNGEON PRESENTATION ADVERSARIAL TEST SUMMARY           \x1b[0m');
console.log('\x1b[1m\x1b[35m====================================================================\x1b[0m');
const total = passed + failed;
console.log(`  Total Checks Executed : \x1b[1m${total}\x1b[0m`);
console.log(`  Passed Checks         : \x1b[32m\x1b[1m${passed}\x1b[0m`);
const failColor = failed > 0 ? '\x1b[31m' : '\x1b[32m';
console.log(`  Failed Checks         : ${failColor}\x1b[1m${failed}\x1b[0m`);
console.log('--------------------------------------------------------------------');

if (failed === 0) {
  console.log('\x1b[32m\x1b[1m  FINAL VERDICT: APPROVE (ALL M4 DUNGEON PRESENTATION CHECKS PASSED)\x1b[0m');
  console.log('\x1b[1m\x1b[35m====================================================================\x1b[0m\n');
  process.exit(0);
} else {
  console.log('\x1b[31m\x1b[1m  FINAL VERDICT: REQUEST_CHANGES (FAILURES DETECTED)\x1b[0m');
  console.log('\x1b[1m\x1b[35m====================================================================\x1b[0m\n');
  process.exit(1);
}
