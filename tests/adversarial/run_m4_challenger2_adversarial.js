#!/usr/bin/env node

/**
 * Master Runner for Milestone M4 Adversarial Challenge Suite (Challenger 2)
 * 
 * Executes:
 * 1. tests/adversarial/m4_zone_guidance_stress.test.js (Zone Guidance, 18 Realms, Modifiers & Specialties)
 * 2. tests/adversarial/m4_travel_secret_realms_stress.test.js (Travel & Secret Realms Timers & Multipliers)
 * 3. tests/adversarial/m4_dungeon_backend_stress.php (Backend Secret Realm Registry & Dungeon Engine)
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function runProcess(cmd, args, label) {
  return new Promise((resolve) => {
    console.log(`\n\x1b[1m\x1b[33m>>> RUNNING ${label} ...\x1b[0m`);
    const safeArgs = args.map(a => `"${a}"`);
    const proc = spawn(cmd, safeArgs, { stdio: 'inherit', shell: true });
    proc.on('close', (code) => {
      resolve(code === 0);
    });
    proc.on('error', (err) => {
      console.error(`Failed to launch ${label}:`, err);
      resolve(false);
    });
  });
}

async function main() {
  console.log('\x1b[1m\x1b[35m====================================================================\x1b[0m');
  console.log('\x1b[1m\x1b[35m     MILESTONE M4 ADVERSARIAL CHALLENGER 2 VERIFICATION RUNNER     \x1b[0m');
  console.log('\x1b[1m\x1b[35m====================================================================\x1b[0m');

  const zoneTestFile = join(__dirname, 'm4_zone_guidance_stress.test.js');
  const travelTestFile = join(__dirname, 'm4_travel_secret_realms_stress.test.js');
  const phpTestFile = join(__dirname, 'm4_dungeon_backend_stress.php');

  const zonePassed = await runProcess('node', [zoneTestFile], 'M4 ZONE GUIDANCE & 18 REALMS SUITE (JS)');
  const travelPassed = await runProcess('node', [travelTestFile], 'M4 TRAVEL & SECRET REALMS SUITE (JS)');
  const phpPassed = await runProcess('php', [phpTestFile], 'M4 SECRET REALMS BACKEND ENGINE & REST SUITE (PHP)');

  console.log('\n\x1b[1m\x1b[35m====================================================================\x1b[0m');
  console.log('\x1b[1m\x1b[35m                 OVERALL ADVERSARIAL VERDICT                        \x1b[0m');
  console.log('\x1b[1m\x1b[35m====================================================================\x1b[0m');
  console.log(`  Zone Guidance & 18 Realms (JS)     : ${zonePassed ? '\x1b[32mPASSED\x1b[0m' : '\x1b[31mFAILED\x1b[0m'}`);
  console.log(`  Travel & Secret Realms (JS)        : ${travelPassed ? '\x1b[32mPASSED\x1b[0m' : '\x1b[31mFAILED\x1b[0m'}`);
  console.log(`  Backend Dungeons & Routes (PHP)    : ${phpPassed ? '\x1b[32mPASSED\x1b[0m' : '\x1b[31mFAILED\x1b[0m'}`);
  console.log('--------------------------------------------------------------------');

  if (zonePassed && travelPassed && phpPassed) {
    console.log('\x1b[32m\x1b[1m  FINAL VERDICT: APPROVE (ALL M4 ADVERSARIAL CHECKS PASSED)\x1b[0m');
    console.log('\x1b[1m\x1b[35m====================================================================\x1b[0m\n');
    process.exit(0);
  } else {
    console.log('\x1b[31m\x1b[1m  FINAL VERDICT: REQUEST_CHANGES (CRITICAL FLAWS DETECTED)\x1b[0m');
    console.log('\x1b[1m\x1b[35m====================================================================\x1b[0m\n');
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
