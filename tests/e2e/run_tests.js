#!/usr/bin/env node

/**
 * Nghịch Thiên Ký RPG Engine — Opaque-Box E2E Test Suite Runner
 * 
 * Executes full verification across 4 Tiers:
 * - Tier 1: Category-Partition Feature Coverage (Features 1 to 11, >= 5 tests each)
 * - Tier 2: Boundary Value Analysis & Corner Cases (Features 1 to 11, >= 5 tests each)
 * - Tier 3: Pairwise Combinatorial Interactions (Cross-Feature Integrations)
 * - Tier 4: Real-World Application Workload Scenarios (>= 5 Complete Player Journeys)
 * 
 * Usage:
 *   node tests/e2e/run_tests.js
 */

import { runner } from './framework/test_runner.js';
import { registerTier1Tests } from './suites/tier1_feature_coverage.test.js';
import { registerTier2Tests } from './suites/tier2_boundary_corner.test.js';
import { registerTier3Tests } from './suites/tier3_pairwise_combinatorial.test.js';
import { registerTier4Tests } from './suites/tier4_real_world_scenarios.test.js';

async function main() {
  console.log('\x1b[1m\x1b[35m====================================================================\x1b[0m');
  console.log('\x1b[1m\x1b[35m  NGHỊCH THIÊN KÝ RPG ENGINE — OPAQUE-BOX E2E TEST SUITE RUNNER   \x1b[0m');
  console.log('\x1b[1m\x1b[35m====================================================================\x1b[0m');
  console.log(`\x1b[90mExecution Timestamp: ${new Date().toISOString()}\x1b[0m`);
  console.log(`\x1b[90mEnvironment: Node.js ${process.version} (${process.platform})\x1b[0m\n`);

  // Register All 4 Tiers
  registerTier1Tests();
  registerTier2Tests();
  registerTier3Tests();
  registerTier4Tests();

  // Execute Suite
  const summary = await runner.execute();

  // Print Summary Report
  console.log('\n\x1b[1m\x1b[35m====================================================================\x1b[0m');
  console.log('\x1b[1m\x1b[35m                     E2E TEST RUNNER SUMMARY                        \x1b[0m');
  console.log('\x1b[1m\x1b[35m====================================================================\x1b[0m');
  console.log(`  Total Tests Executed : \x1b[1m${summary.total}\x1b[0m`);
  console.log(`  Passed Tests         : \x1b[32m\x1b[1m${summary.passed}\x1b[0m`);
  console.log(`  Failed Tests         : ${summary.failed > 0 ? `\x1b[31m\x1b[1m${summary.failed}\x1b[0m` : `\x1b[32m0\x1b[0m`}`);
  console.log(`  Skipped Tests        : \x1b[90m${summary.skipped}\x1b[0m`);
  console.log(`  Total Duration       : \x1b[36m${summary.durationMs}ms\x1b[0m`);
  console.log('--------------------------------------------------------------------');

  if (summary.isSuccess) {
    console.log('\x1b[32m\x1b[1m  RESULT: ALL E2E TEST SUITES PASSED CLEANLY (100% SUCCESS)\x1b[0m');
    console.log('\x1b[32m  Requirements R1, R2, R3, R4, R5 Verified Independently.\x1b[0m');
    console.log('\x1b[1m\x1b[35m====================================================================\x1b[0m\n');
    process.exit(0);
  } else {
    console.log('\x1b[31m\x1b[1m  RESULT: E2E TEST FAILURES DETECTED\x1b[0m');
    console.log('\x1b[31m  Review the diagnostic output above for details.\x1b[0m');
    console.log('\x1b[1m\x1b[35m====================================================================\x1b[0m\n');
    process.exit(1);
  }
}

main().catch(err => {
  console.error('\x1b[31mFatal Runner Error:\x1b[0m', err);
  process.exit(1);
});
