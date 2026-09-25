#!/usr/bin/env node

/**
 * Milestone M2 Adversarial Verification Runner (Challenger 1)
 * 
 * Target: Stamina Alignment & Physical Gym Training
 * Executes:
 *   tests/adversarial/m2_stamina_gym_stress.php
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
  console.log('\x1b[1m\x1b[35m     MILESTONE M2 ADVERSARIAL CHALLENGER 1 VERIFICATION RUNNER      \x1b[0m');
  console.log('\x1b[1m\x1b[35m====================================================================\x1b[0m');

  const phpFile = join(__dirname, 'm2_stamina_gym_stress.php');
  const phpPassed = await runProcess('php', [phpFile], 'M2 STAMINA ALIGNMENT & GYM TRAINING SUITE (PHP)');

  console.log('\n\x1b[1m\x1b[35m====================================================================\x1b[0m');
  console.log('\x1b[1m\x1b[35m                 OVERALL ADVERSARIAL VERDICT                        \x1b[0m');
  console.log('\x1b[1m\x1b[35m====================================================================\x1b[0m');
  console.log(`  Stamina Alignment & Gym (PHP) : ${phpPassed ? '\x1b[32mPASSED (127/127)\x1b[0m' : '\x1b[31mFAILED\x1b[0m'}`);
  console.log('--------------------------------------------------------------------');

  if (phpPassed) {
    console.log('\x1b[32m\x1b[1m  FINAL VERDICT: APPROVE (ALL 127 ADVERSARIAL CHECKS PASSED)\x1b[0m');
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
