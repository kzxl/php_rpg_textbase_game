#!/usr/bin/env node

/**
 * Master Runner for Milestone M3 Adversarial Challenge Suite (Challenger 2)
 * 
 * Executes:
 * 1. tests/adversarial/m3_streak_combat_log_stress.test.js (JS ESM Streak Badges & Combat Log Suite)
 * 2. tests/adversarial/m3_backend_fight_log_persistence_stress.php (PHP Fight Log Persistence & Backend Route Suite)
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
  console.log('\x1b[1m\x1b[35m     MILESTONE M3 ADVERSARIAL CHALLENGER 2 VERIFICATION RUNNER     \x1b[0m');
  console.log('\x1b[1m\x1b[35m====================================================================\x1b[0m');

  const jsFile = join(__dirname, 'm3_streak_combat_log_stress.test.js');
  const phpFile = join(__dirname, 'm3_backend_fight_log_persistence_stress.php');

  const jsPassed = await runProcess('node', [jsFile], 'STREAK BADGES & COMBAT LOG RENDERER SUITE (JS)');
  const phpPassed = await runProcess('php', [phpFile], 'FIGHT LOG PERSISTENCE & ARENA BACKEND SUITE (PHP)');

  console.log('\n\x1b[1m\x1b[35m====================================================================\x1b[0m');
  console.log('\x1b[1m\x1b[35m                 OVERALL ADVERSARIAL VERDICT                        \x1b[0m');
  console.log('\x1b[1m\x1b[35m====================================================================\x1b[0m');
  console.log(`  Streak Badges & Combat Log (JS)     : ${jsPassed ? '\x1b[32mPASSED\x1b[0m' : '\x1b[31mFAILED (Uncaught TypeError: logs.map is not a function on non-array JSON)\x1b[0m'}`);
  console.log(`  Backend Fight Log & Routes (PHP)    : ${phpPassed ? '\x1b[32mPASSED\x1b[0m' : '\x1b[31mFAILED (DivisionByZeroError at routes.php:35 crashing GET /arena & POST /arena/fight)\x1b[0m'}`);
  console.log('--------------------------------------------------------------------');

  if (jsPassed && phpPassed) {
    console.log('\x1b[32m\x1b[1m  FINAL VERDICT: APPROVE (ALL ADVERSARIAL CHECKS PASSED)\x1b[0m');
    console.log('\x1b[1m\x1b[35m====================================================================\x1b[0m\n');
    process.exit(0);
  } else {
    console.log('\x1b[31m\x1b[1m  FINAL VERDICT: REQUEST_CHANGES (CRITICAL FAILURE MODES DISCOVERED)\x1b[0m');
    console.log('\x1b[1m\x1b[35m====================================================================\x1b[0m\n');
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
