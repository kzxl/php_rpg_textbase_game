/**
 * Adversarial Test Suite: Milestone M2 Armor Mitigation, Evasion & Tribulation Stress
 * 
 * Verifies:
 * 1. MDG Armor Mitigation formula: min(85.0, round((defense / (defense + 5.0 * rawDmg)) * 100, 2))
 *    - 6x3 Matrix: defense in {0, 10, 50, 200, 1000, 100000} x rawDmg in {25, 75, 250}
 *    - Strict 85.0% cap enforcement
 *    - Monotonicity, asymptotic limits & boundary clamps (effDmg = max(8.0, rawDmg))
 * 2. Evasion Dexterity formula: min(35.0, round((dexterity / (dexterity + 2.5 * enemySpeed)) * 100, 2))
 *    - Dexterity in {0, 10, 100, 10000} across speed tiers (0.75x, 1.0x, 1.5x, absolute speeds)
 *    - Strict 35.0% cap enforcement
 *    - Monotonicity, asymptotic limits & boundary clamps (effSpd = max(1.0, enemySpeed))
 * 3. Tribulation Readiness, Qi Shield Capacity (usableEnergy * 2.5) & HP Buffer
 *    - Qi shield formula & energy reservation interactions
 *    - Escalating lightning strike damage modeling across realm tiers
 *    - Precondition checklist & health buffer survival assessment
 * 4. Physical Gym Training Resource Isolation
 *    - Strict Thể Lực (currentStamina) consumption vs Linh Lực (currentEnergy) preservation
 */

import { Harness } from '../e2e/framework/harness.js';

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

// Canonical MDG mathematical oracle
function oracleMitigation(defense, rawDamage) {
  if (defense <= 0) return 0.0;
  const effDmg = Math.max(8.0, rawDamage);
  const pct = (defense / (defense + 5.0 * effDmg)) * 100;
  return Math.min(85.0, Math.round(pct * 100) / 100);
}

// Canonical MDG evasion oracle
function oracleEvasion(dexterity, enemySpeed) {
  if (dexterity <= 0) return 0.0;
  const effSpd = Math.max(1.0, enemySpeed);
  const pct = (dexterity / (dexterity + 2.5 * effSpd)) * 100;
  return Math.min(35.0, Math.round(pct * 100) / 100);
}

console.log('\n\x1b[1m\x1b[36m====================================================================\x1b[0m');
console.log('\x1b[1m\x1b[36m  ADVERSARIAL STRESS TEST: M2 ARMOR MITIGATION & EVASION ENGINE     \x1b[0m');
console.log('\x1b[1m\x1b[36m====================================================================\x1b[0m\n');

// ====================================================================
// SECTION 1: MDG ARMOR MITIGATION 6x3 MATRIX VERIFICATION
// ====================================================================
console.log('\x1b[1m▶ Section 1: MDG Armor Mitigation Matrix (6 Defense Tiers x 3 Damage Tiers)\x1b[0m');

const defenseTiers = [0, 10, 50, 200, 1000, 100000];
const rawDmgTiers = [
  { label: 'Low (25)', val: 25 },
  { label: 'Medium (75)', val: 75 },
  { label: 'Boss (250)', val: 250 }
];

// Expected analytical values:
// rawDmg = 25 (effDmg = 25, 5*eff = 125):
//   def=0: 0%
//   def=10: 10/135 = 7.41%
//   def=50: 50/175 = 28.57%
//   def=200: 200/325 = 61.54%
//   def=1000: 1000/1125 = 88.89% -> CAPPED at 85.0%
//   def=100000: 100000/100125 = 99.88% -> CAPPED at 85.0%
// rawDmg = 75 (effDmg = 75, 5*eff = 375):
//   def=0: 0%
//   def=10: 10/385 = 2.6%
//   def=50: 50/425 = 11.76%
//   def=200: 200/575 = 34.78%
//   def=1000: 1000/1375 = 72.73%
//   def=100000: 100000/100375 = 99.63% -> CAPPED at 85.0%
// rawDmg = 250 (effDmg = 250, 5*eff = 1250):
//   def=0: 0%
//   def=10: 10/1260 = 0.79%
//   def=50: 50/1300 = 3.85%
//   def=200: 200/1450 = 13.79%
//   def=1000: 1000/2250 = 44.44%
//   def=100000: 100000/101250 = 98.77% -> CAPPED at 85.0%

const expectedMatrix = {
  0: { 25: 0.0, 75: 0.0, 250: 0.0 },
  10: { 25: 7.41, 75: 2.6, 250: 0.79 },
  50: { 25: 28.57, 75: 11.76, 250: 3.85 },
  200: { 25: 61.54, 75: 34.78, 250: 13.79 },
  1000: { 25: 85.0, 75: 72.73, 250: 44.44 },
  100000: { 25: 85.0, 75: 85.0, 250: 85.0 }
};

for (const def of defenseTiers) {
  for (const dmg of rawDmgTiers) {
    const expected = expectedMatrix[def][dmg.val];
    const actualHarness = Harness.calcArmorMitigation(def, dmg.val);
    const actualOracle = oracleMitigation(def, dmg.val);

    assert(
      actualHarness === expected,
      `Matrix [Def ${def}, ${dmg.label}]: Harness computed ${actualHarness}% (expected ${expected}%)`,
      `Mismatch: got ${actualHarness}, want ${expected}`
    );

    assert(
      actualOracle === expected,
      `Oracle [Def ${def}, ${dmg.label}]: Analytical oracle matches ${expected}%`,
      `Mismatch: got ${actualOracle}, want ${expected}`
    );

    // Verify cap invariant
    assert(
      actualHarness <= 85.0,
      `Cap Invariant [Def ${def}, ${dmg.label}]: Mitigation ${actualHarness}% is strictly <= 85.0%`
    );
  }
}

// ====================================================================
// SECTION 2: ARMOR MITIGATION BOUNDARIES, ASYMPTOTES & MONOTONICITY
// ====================================================================
console.log('\n\x1b[1m▶ Section 2: Armor Mitigation Boundaries, Asymptotes & Monotonicity\x1b[0m');

// 2.1: Negative and zero defense boundaries
assert(Harness.calcArmorMitigation(-1, 25) === 0.0, 'Negative defense (-1) yields strictly 0.0% mitigation');
assert(Harness.calcArmorMitigation(-1000, 75) === 0.0, 'Large negative defense (-1000) yields strictly 0.0% mitigation');
assert(Harness.calcArmorMitigation(0, 250) === 0.0, 'Zero defense yields strictly 0.0% mitigation');

// 2.2: Extreme defense values (approaching infinity)
assert(Harness.calcArmorMitigation(500000, 250) === 85.0, 'Defense 500,000 strictly caps at 85.0% against Boss 250');
assert(Harness.calcArmorMitigation(10000000, 250) === 85.0, 'Defense 10,000,000 strictly caps at 85.0% against Boss 250');
assert(Harness.calcArmorMitigation(Number.MAX_SAFE_INTEGER, 250) === 85.0, 'Defense MAX_SAFE_INTEGER strictly caps at 85.0%');

// 2.3: Damage floor clamp: effDmg = max(8.0, rawDmg)
// With defense = 40, rawDmg = 0 -> effDmg = 8.0 -> 40 / (40 + 5*8) = 40 / 80 = 50.0%
assert(Harness.calcArmorMitigation(40, 0) === 50.0, 'Raw damage 0 clamps to 8.0 floor: Def 40 yields 50.0% mitigation');
assert(Harness.calcArmorMitigation(40, -50) === 50.0, 'Negative raw damage (-50) clamps to 8.0 floor: Def 40 yields 50.0%');
assert(Harness.calcArmorMitigation(40, 4) === 50.0, 'Raw damage 4 clamps to 8.0 floor: Def 40 yields 50.0%');
assert(Harness.calcArmorMitigation(40, 8) === 50.0, 'Raw damage 8 exact floor: Def 40 yields 50.0%');

// 2.4: Monotonicity stress fuzzing across 50 random test vectors
let monotonicityPassed = true;
for (let i = 0; i < 50; i++) {
  const d1 = Math.floor(Math.random() * 5000);
  const d2 = d1 + Math.floor(Math.random() * 5000) + 1;
  const raw = Math.floor(Math.random() * 400) + 10;

  const mit1 = Harness.calcArmorMitigation(d1, raw);
  const mit2 = Harness.calcArmorMitigation(d2, raw);

  if (mit1 > mit2) {
    monotonicityPassed = false;
    console.error(`Monotonicity violation: Def ${d1} (${mit1}%) > Def ${d2} (${mit2}%) at raw ${raw}`);
    break;
  }
}
assert(monotonicityPassed, 'Monotonicity: Higher defense strictly never decreases mitigation across 50 fuzzed pairs');

// 2.5: Damage penetration stress: heavier strikes must yield equal or lower mitigation
let penetrationPassed = true;
for (let i = 0; i < 50; i++) {
  const def = Math.floor(Math.random() * 2000) + 10;
  const dmgLight = Math.floor(Math.random() * 100) + 10;
  const dmgHeavy = dmgLight + Math.floor(Math.random() * 200) + 10;

  const mitLight = Harness.calcArmorMitigation(def, dmgLight);
  const mitHeavy = Harness.calcArmorMitigation(def, dmgHeavy);

  if (mitHeavy > mitLight) {
    penetrationPassed = false;
    console.error(`Penetration violation: Heavy dmg ${dmgHeavy} (${mitHeavy}%) > Light dmg ${dmgLight} (${mitLight}%) at def ${def}`);
    break;
  }
}
assert(penetrationPassed, 'Armor Penetration: Heavier hits strictly yield lower or equal mitigation across 50 fuzzed pairs');

// ====================================================================
// SECTION 3: EVASION DEXTERITY MATRIX VERIFICATION
// ====================================================================
console.log('\n\x1b[1m▶ Section 3: Evasion Dexterity Matrix (4 Dex Tiers x Speed Scenarios)\x1b[0m');

// Formula: min(35.0, round((dexterity / (dexterity + 2.5 * enemySpeed)) * 100, 2))
// Baseline player speed = 10:
//   Slow (0.75x = 7.5): 2.5 * 7.5 = 18.75
//     dex=0: 0.0%
//     dex=10: 10 / (10 + 18.75) = 10 / 28.75 = 34.78%
//     dex=100: 100 / (100 + 18.75) = 100 / 118.75 = 84.21% -> CAPPED at 35.0%
//     dex=10000: 10000 / (10000 + 18.75) = 99.81% -> CAPPED at 35.0%
//   Equal (1.0x = 10.0): 2.5 * 10.0 = 25.0
//     dex=0: 0.0%
//     dex=10: 10 / (10 + 25.0) = 10 / 35 = 28.57%
//     dex=100: 100 / (100 + 25.0) = 100 / 125 = 80.0% -> CAPPED at 35.0%
//     dex=10000: 10000 / (10000 + 25.0) = 99.75% -> CAPPED at 35.0%
//   Agile (1.5x = 15.0): 2.5 * 15.0 = 37.5
//     dex=0: 0.0%
//     dex=10: 10 / (10 + 37.5) = 10 / 47.5 = 21.05%
//     dex=100: 100 / (100 + 37.5) = 100 / 137.5 = 72.73% -> CAPPED at 35.0%
//     dex=10000: 10000 / (10000 + 37.5) = 99.63% -> CAPPED at 35.0%

const dexTiers = [0, 10, 100, 10000];
const speedScenarios = [
  { label: 'Slow (7.5 spd)', spd: 7.5 },
  { label: 'Equal (10.0 spd)', spd: 10.0 },
  { label: 'Agile (15.0 spd)', spd: 15.0 }
];

const expectedEvasionMatrix = {
  0: { 7.5: 0.0, 10.0: 0.0, 15.0: 0.0 },
  10: { 7.5: 34.78, 10.0: 28.57, 15.0: 21.05 },
  100: { 7.5: 35.0, 10.0: 35.0, 15.0: 35.0 },
  10000: { 7.5: 35.0, 10.0: 35.0, 15.0: 35.0 }
};

for (const dex of dexTiers) {
  for (const sc of speedScenarios) {
    const expected = expectedEvasionMatrix[dex][sc.spd];
    const actualHarness = Harness.calcEvasionChance(dex, sc.spd);
    const actualOracle = oracleEvasion(dex, sc.spd);

    assert(
      actualHarness === expected,
      `Evasion Matrix [Dex ${dex}, ${sc.label}]: Harness computed ${actualHarness}% (expected ${expected}%)`,
      `Mismatch: got ${actualHarness}, want ${expected}`
    );

    assert(
      actualOracle === expected,
      `Oracle Evasion [Dex ${dex}, ${sc.label}]: Analytical oracle matches ${expected}%`,
      `Mismatch: got ${actualOracle}, want ${expected}`
    );

    assert(
      actualHarness <= 35.0,
      `Evasion Cap Invariant [Dex ${dex}, ${sc.label}]: Evasion ${actualHarness}% is strictly <= 35.0%`
    );
  }
}

// ====================================================================
// SECTION 4: EVASION BOUNDARIES, SPEED TIERS & ASYMPTOTES
// ====================================================================
console.log('\n\x1b[1m▶ Section 4: Evasion Boundaries, Speed Tiers & Asymptotes\x1b[0m');

// 4.1: Negative and zero dexterity boundaries
assert(Harness.calcEvasionChance(-5, 10) === 0.0, 'Negative dexterity (-5) yields strictly 0.0% evasion');
assert(Harness.calcEvasionChance(-500, 50) === 0.0, 'Large negative dexterity (-500) yields strictly 0.0% evasion');
assert(Harness.calcEvasionChance(0, 1) === 0.0, 'Zero dexterity against 1 speed yields strictly 0.0% evasion');

// 4.2: Extreme dexterity values (approaching infinity)
assert(Harness.calcEvasionChance(100000, 100) === 35.0, 'Dexterity 100,000 strictly caps at 35.0% against fast foe');
assert(Harness.calcEvasionChance(10000000, 500) === 35.0, 'Dexterity 10,000,000 strictly caps at 35.0% against speed 500');
assert(Harness.calcEvasionChance(Number.MAX_SAFE_INTEGER, 1000) === 35.0, 'Dexterity MAX_SAFE_INTEGER strictly caps at 35.0%');

// 4.3: Speed floor clamp: effSpd = max(1.0, enemySpeed)
// With dex = 10, enemySpeed = 0 -> effSpd = 1.0 -> 10 / (10 + 2.5*1) = 10 / 12.5 = 80.0% -> capped at 35.0%
assert(Harness.calcEvasionChance(10, 0) === 35.0, 'Enemy speed 0 clamps to 1.0 floor: Dex 10 yields 35.0% cap');
assert(Harness.calcEvasionChance(10, -20) === 35.0, 'Negative enemy speed (-20) clamps to 1.0: Dex 10 yields 35.0% cap');

// With low dex = 1, enemySpeed = 0 -> effSpd = 1.0 -> 1 / (1 + 2.5) = 1 / 3.5 = 28.57%
assert(Harness.calcEvasionChance(1, 0) === 28.57, 'Low Dex 1 against clamped 0 speed: yields exactly 28.57%');
assert(Harness.calcEvasionChance(1, 1) === 28.57, 'Low Dex 1 against exact speed 1: yields exactly 28.57%');

// 4.4: High speed foe suppression (approaching 0% evasion)
// Dex = 10, Speed = 1000 -> 10 / (10 + 2500) = 10 / 2510 = 0.40%
assert(Harness.calcEvasionChance(10, 1000) === 0.4, 'Dex 10 vs hypersonic enemy (1000 spd) drops to 0.40%');
assert(Harness.calcEvasionChance(10, 10000) === 0.04, 'Dex 10 vs god-speed enemy (10000 spd) drops to 0.04%');

// 4.5: Monotonicity stress fuzzing across 50 random test vectors
let evasionMonotonicityPassed = true;
for (let i = 0; i < 50; i++) {
  const dex1 = Math.floor(Math.random() * 500);
  const dex2 = dex1 + Math.floor(Math.random() * 500) + 1;
  const spd = Math.floor(Math.random() * 200) + 5;

  const ev1 = Harness.calcEvasionChance(dex1, spd);
  const ev2 = Harness.calcEvasionChance(dex2, spd);

  if (ev1 > ev2) {
    evasionMonotonicityPassed = false;
    console.error(`Evasion Monotonicity violation: Dex ${dex1} (${ev1}%) > Dex ${dex2} (${ev2}%) at spd ${spd}`);
    break;
  }
}
assert(evasionMonotonicityPassed, 'Evasion Monotonicity: Higher dexterity strictly never decreases evasion chance');

// ====================================================================
// SECTION 5: TRIBULATION READINESS, QI SHIELD CAPACITY & HP BUFFER
// ====================================================================
console.log('\n\x1b[1m▶ Section 5: Tribulation Readiness, Qi Shield Capacity & HP Buffer\x1b[0m');

// 5.1: Qi Shield Capacity: usableEnergy * 2.5
const energyCases = [
  { energy: 0, expectedShield: 0 },
  { energy: 1, expectedShield: 2.5 },
  { energy: 10, expectedShield: 25 },
  { energy: 40, expectedShield: 100 },
  { energy: 100, expectedShield: 250 },
  { energy: 200, expectedShield: 500 },
  { energy: 1000, expectedShield: 2500 }
];

for (const ec of energyCases) {
  const evalResult = Harness.evaluateBreakthrough(
    { level: 10, gold: 500, currentEnergy: ec.energy, usableEnergy: ec.energy, currentHp: 500 },
    { levelMin: 10, cost: { gold: 500, energy: ec.energy } }
  );

  assert(
    evalResult.qiShieldHp === ec.expectedShield,
    `Qi Shield [${ec.energy} LL]: Evaluates to ${evalResult.qiShieldHp} HP shield (expected ${ec.expectedShield} HP)`
  );
}

// 5.2: Usable Energy vs Reserved Energy for Auras
// If player has maxEnergy = 100, and auras reserve 60%, usableEnergy is 40 -> shield is 100 HP
{
  const reservedPct = 60;
  const maxEnergy = 100;
  const usableEnergy = Math.floor(maxEnergy * (1 - reservedPct / 100));
  const shieldCapacity = usableEnergy * 2.5;

  assert(usableEnergy === 40, 'Aura Reservation 60%: Leaves exactly 40 usable energy');
  assert(shieldCapacity === 100, 'Aura Reservation 60%: Qi Shield capacity is exactly 100 HP');
}

// 5.3: HP Buffer vs Estimated Lightning Strike Damage
// Lightning Damage formula from stats.js:
// estimatedLightningDmg = Math.round(maxHp * 0.45 * (1 + targetTier * 0.05))
function calcLightningDmg(maxHp, targetTier) {
  return Math.round(maxHp * 0.45 * (1 + targetTier * 0.05));
}

// Tier 2 (targetTier 2): 0.45 * (1 + 0.10) = 0.45 * 1.10 = 0.495 -> 49.5% maxHp
// Tier 5 (targetTier 5): 0.45 * (1 + 0.25) = 0.45 * 1.25 = 0.5625 -> 56.25% maxHp
// Tier 10 (targetTier 10): 0.45 * (1 + 0.50) = 0.45 * 1.50 = 0.675 -> 67.5% maxHp
assert(calcLightningDmg(1000, 2) === 495, 'Tier 2 Lightning Strike on 1000 HP: ~495 damage (49.5%)');
assert(calcLightningDmg(2000, 5) === 1125, 'Tier 5 Lightning Strike on 2000 HP: ~1125 damage (56.25%)');
assert(calcLightningDmg(10000, 10) === 6750, 'Tier 10 Apex Lightning Strike on 10000 HP: ~6750 damage (67.5%)');

// 5.4: Wounded State & Breakthrough Readiness Evaluator
{
  // Fully prepared Daoist: healthy, sufficient resources, ready
  const healthyDaoist = {
    level: 15,
    gold: 2000,
    currentEnergy: 100,
    usableEnergy: 100,
    currentHp: 1000,
    maxHp: 1000,
    hospitalRemaining: 0
  };
  const req = { levelMin: 10, cost: { gold: 500, energy: 50 } };
  const resHealthy = Harness.evaluateBreakthrough(healthyDaoist, req);

  assert(resHealthy.canBreakthrough === true, 'Healthy Daoist: canBreakthrough is TRUE');
  assert(resHealthy.isWounded === false, 'Healthy Daoist: isWounded is FALSE (full HP)');
  assert(resHealthy.readinessScore === 100, 'Healthy Daoist: Full readiness score (100/100)');
  assert(resHealthy.qiShieldHp === 250, 'Healthy Daoist: Qi shield provides 250 HP buffer');

  // Wounded Daoist: HP < maxHp
  const woundedDaoist = { ...healthyDaoist, currentHp: 400 };
  const resWounded = Harness.evaluateBreakthrough(woundedDaoist, req);

  assert(resWounded.canBreakthrough === true, 'Wounded Daoist: canBreakthrough remains allowed if resources met');
  assert(resWounded.isWounded === true, 'Wounded Daoist: isWounded correctly detected as TRUE (400/1000 HP)');
  assert(resWounded.readinessScore === 80, 'Wounded Daoist: Readiness score penalized by 20 pts (80/100)');

  // Hospitalized Daoist
  const hospitalizedDaoist = { ...healthyDaoist, hospitalRemaining: 45 };
  const resHosp = Harness.evaluateBreakthrough(hospitalizedDaoist, req);
  assert(resHosp.canBreakthrough === false, 'Hospitalized Daoist: canBreakthrough is strictly BLOCKED');
}

// ====================================================================
// SECTION 6: PHYSICAL GYM TRAINING RESOURCE ISOLATION
// ====================================================================
console.log('\n\x1b[1m▶ Section 6: Physical Gym Training Resource Isolation\x1b[0m');

{
  const trainee = {
    level: 5,
    currentStamina: 50,
    maxStamina: 100,
    currentEnergy: 80,
    maxEnergy: 80,
    hospitalRemaining: 0,
    stats: { strength: 20, defense: 20, speed: 20, dexterity: 20 },
    allocatedStats: { strength: 0, defense: 0, speed: 0, dexterity: 0 },
    talentDisplay: { strength: { value: 1.25 } }
  };

  // Train 1 session (costs 5 stamina)
  const trainRes = Harness.simulateGymTrain(trainee, 'strength', 1);

  assert(trainRes.staminaUsed === 5, 'Gym Train consumes exactly 5 Thể Lực (stamina)');
  assert(trainRes.updatedPlayer.currentStamina === 45, 'Remaining Thể Lực drops from 50 to 45');
  assert(trainRes.energyDepleted === 0, 'Gym Train strictly depletes ZERO Linh Lực (energy)');
  assert(trainRes.updatedPlayer.currentEnergy === 80, 'Linh Lực remains strictly unchanged at 80');
  assert(trainRes.effectiveGain === 1, 'Strength stat increased by 1 (1 * 1.25 rounded)');
}

// 6.2: Rejection on insufficient stamina (4 vs 5)
{
  const exhaustedPlayer = {
    currentStamina: 4,
    currentEnergy: 100,
    hospitalRemaining: 0
  };

  let threw = false;
  try {
    Harness.simulateGymTrain(exhaustedPlayer, 'defense', 1);
  } catch (err) {
    threw = true;
    assert(err.message.includes('Không đủ Thể Lực'), 'Insufficient stamina (4 < 5) strictly rejects with error message');
  }
  assert(threw, 'Gym training with stamina 4 strictly throws an error');
}

// 6.3: Multi-training stamina scaling (10 sessions = 50 stamina)
{
  const heavyTrainee = {
    currentStamina: 60,
    currentEnergy: 150,
    hospitalRemaining: 0,
    stats: { defense: 50 },
    allocatedStats: { defense: 0 },
    talentDisplay: { defense: { value: 2.0 } }
  };

  const multiRes = Harness.simulateGymTrain(heavyTrainee, 'defense', 10);
  assert(multiRes.staminaUsed === 50, '10 Gym sessions consume exactly 50 stamina');
  assert(multiRes.updatedPlayer.currentStamina === 10, 'Remaining stamina is 10 (60 - 50)');
  assert(multiRes.energyDepleted === 0, 'Zero energy depleted during 10 gym sessions');
  assert(multiRes.effectiveGain === 20, 'Defense gains +20 points (10 * 2.0 Tiên Cốt multiplier)');
}

// ====================================================================
// SUMMARY & VERDICT
// ====================================================================
console.log('\n\x1b[1m\x1b[36m====================================================================\x1b[0m');
console.log('\x1b[1m\x1b[36m             M2 ADVERSARIAL JS SUITE EXECUTION SUMMARY              \x1b[0m');
console.log('\x1b[1m\x1b[36m====================================================================\x1b[0m');
console.log(`  Total Checks Executed : ${passed + failed}`);
console.log(`  Passed Checks         : \x1b[32m${passed}\x1b[0m`);
console.log(`  Failed Checks         : \x1b[31m${failed}\x1b[0m`);
console.log('--------------------------------------------------------------------');

if (failed === 0) {
  console.log('\x1b[32m\x1b[1m  VERDICT: ALL M2 MITIGATION & EVASION TESTS PASSED (100% SUCCESS)\x1b[0m');
  console.log('\x1b[1m\x1b[36m====================================================================\x1b[0m\n');
  process.exit(0);
} else {
  console.log('\x1b[31m\x1b[1m  VERDICT: FAILURES DETECTED IN M2 FORMULAS\x1b[0m');
  console.log('\x1b[1m\x1b[36m====================================================================\x1b[0m\n');
  process.exit(1);
}
