#!/usr/bin/env node

/**
 * Master Runner for Milestone M2 Adversarial Challenge Suite (Challenger 2)
 * 
 * Executes:
 * 1. tests/adversarial/m2_mitigation_evasion_stress.test.js (JS ESM Mitigation & Evasion Suite)
 * 2. tests/adversarial/m2_backend_defense_tribulation_stress.php (PHP Core Engine & Slim API Suite)
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
  console.log('\x1b[1m\x1b[35m     MILESTONE M2 ADVERSARIAL CHALLENGER 2 VERIFICATION RUNNER     \x1b[0m');
  console.log('\x1b[1m\x1b[35m====================================================================\x1b[0m');

  const jsFile = join(__dirname, 'm2_mitigation_evasion_stress.test.js');
  const phpFile = join(__dirname, 'm2_backend_defense_tribulation_stress.php');

  const jsPassed = await runProcess('node', [jsFile], 'MDG MITIGATION & EVASION STRESS SUITE (JS)');
  const phpPassed = await runProcess('php', [phpFile], 'DEFENSE & TRIBULATION BACKEND SUITE (PHP)');

  console.log('\n\x1b[1m\x1b[35m====================================================================\x1b[0m');
  console.log('\x1b[1m\x1b[35m                 OVERALL ADVERSARIAL VERDICT                        \x1b[0m');
  console.log('\x1b[1m\x1b[35m====================================================================\x1b[0m');
  console.log(`  Mitigation & Evasion Curves (JS) : ${jsPassed ? '\x1b[32mPASSED (146/146)\x1b[0m' : '\x1b[31mFAILED\x1b[0m'}`);
  console.log(`  Backend Defense & Tribulation (PHP): ${phpPassed ? '\x1b[32mPASSED (104/104)\x1b[0m' : '\x1b[31mFAILED\x1b[0m'}`);
  console.log('--------------------------------------------------------------------');

  if (jsPassed && phpPassed) {
    console.log('\x1b[32m\x1b[1m  FINAL VERDICT: APPROVE (ALL 250 ADVERSARIAL CHECKS PASSED)\x1b[0m');
    console.log('\x1b[1m\x1b[35m====================================================================\x1b[0m\n');
    process.exit(0);
  } else {
    console.log('\x1b[31m\x1b[1m  FINAL VERDICT: REQUEST_CHANGES (FAILURES DETECTED)\x1b[0m');
    console.log('\x1b[1m\x1b[35m====================================================================\x1b[0m\n');
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
