/**
 * Master Adversarial Test Runner: Milestone M4 Travel & Secret Realms
 * 
 * Orchestrates:
 * 1. m4_travel_secret_realms_stress.test.js (Frontend JS Suite)
 * 2. m4_dungeon_backend_stress.php (Backend PHP Suite)
 */

import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('\n\x1b[1m\x1b[35m====================================================================\x1b[0m');
console.log('\x1b[1m\x1b[35m  MASTER ADVERSARIAL RUNNER: MILESTONE M4 (TRAVEL & SECRET REALMS)  \x1b[0m');
console.log('\x1b[1m\x1b[35m====================================================================\x1b[0m\n');

let jsPassed = false;
let phpPassed = false;

// 1. Run Frontend JS Test
console.log('\x1b[1m>>> RUNNING TRAVEL & SECRET REALMS FRONTEND SUITE (JS) ...\x1b[0m\n');
const jsTestPath = path.resolve(__dirname, 'm4_travel_secret_realms_stress.test.js');
try {
  execSync(`node "${jsTestPath}"`, { stdio: 'inherit' });
  jsPassed = true;
} catch (e) {
  jsPassed = false;
}

// 2. Run Backend PHP Test
console.log('\n\x1b[1m>>> RUNNING SECRET REALMS BACKEND ENGINE & REST SUITE (PHP) ...\x1b[0m\n');
const phpTestPath = path.resolve(__dirname, 'm4_dungeon_backend_stress.php');
try {
  execSync(`php "${phpTestPath}"`, { stdio: 'inherit' });
  phpPassed = true;
} catch (e) {
  phpPassed = false;
}

console.log('\n\x1b[1m\x1b[35m====================================================================\x1b[0m');
console.log('\x1b[1m\x1b[35m                 OVERALL M4 ADVERSARIAL VERDICT                     \x1b[0m');
console.log('\x1b[1m\x1b[35m====================================================================\x1b[0m');

console.log(`  Frontend & Timer Suite (JS)    : ${jsPassed ? '\x1b[32mPASSED\x1b[0m' : '\x1b[31mFAILED\x1b[0m'}`);
console.log(`  Backend Engine & REST (PHP)    : ${phpPassed ? '\x1b[32mPASSED\x1b[0m' : '\x1b[31mFAILED\x1b[0m'}`);
console.log('--------------------------------------------------------------------');

if (jsPassed && phpPassed) {
  console.log('\x1b[32m\x1b[1m  FINAL VERDICT: APPROVE (ALL M4 ADVERSARIAL CHECKS PASSED)\x1b[0m');
  console.log('\x1b[1m\x1b[35m====================================================================\x1b[0m\n');
  process.exit(0);
} else {
  console.log('\x1b[31m\x1b[1m  FINAL VERDICT: REQUEST_CHANGES (CRITICAL FLAWS DETECTED)\x1b[0m');
  console.log('\x1b[1m\x1b[35m====================================================================\x1b[0m\n');
  process.exit(1);
}
