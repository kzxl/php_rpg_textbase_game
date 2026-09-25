/**
 * Standalone Test Suite Runner for Nghịch Thiên Ký E2E Suite
 */

class TestContext {
  constructor() {
    this.suites = [];
    this.currentSuite = null;
    this.totalTests = 0;
    this.passedTests = 0;
    this.failedTests = 0;
    this.skippedTests = 0;
    this.startTime = 0;
    this.endTime = 0;
  }

  describe(name, fn) {
    const parentSuite = this.currentSuite;
    const suite = {
      name,
      tests: [],
      beforeEachFns: [],
      afterEachFns: [],
      parent: parentSuite
    };

    if (parentSuite) {
      if (!parentSuite.subSuites) parentSuite.subSuites = [];
      parentSuite.subSuites.push(suite);
    } else {
      this.suites.push(suite);
    }

    this.currentSuite = suite;
    try {
      fn();
    } finally {
      this.currentSuite = parentSuite;
    }
  }

  beforeEach(fn) {
    if (this.currentSuite) {
      this.currentSuite.beforeEachFns.push(fn);
    }
  }

  afterEach(fn) {
    if (this.currentSuite) {
      this.currentSuite.afterEachFns.push(fn);
    }
  }

  it(name, fn) {
    if (!this.currentSuite) {
      this.describe('Default Suite', () => {
        this.it(name, fn);
      });
      return;
    }
    this.currentSuite.tests.push({ name, fn });
  }

  async runSuite(suite, prefix = '') {
    const suiteTitle = `${prefix}${suite.name}`;
    console.log(`\n\x1b[1m\x1b[36m▶ ${suiteTitle}\x1b[0m`);

    for (const test of suite.tests) {
      this.totalTests++;
      const testStart = performance.now();
      try {
        // Collect beforeEach hooks from ancestors
        const hooks = [];
        let curr = suite;
        while (curr) {
          hooks.unshift(...curr.beforeEachFns);
          curr = curr.parent;
        }
        for (const hook of hooks) await hook();

        await test.fn();

        // Run afterEach hooks
        const afterHooks = [];
        curr = suite;
        while (curr) {
          afterHooks.push(...curr.afterEachFns);
          curr = curr.parent;
        }
        for (const hook of afterHooks) await hook();

        const duration = (performance.now() - testStart).toFixed(1);
        this.passedTests++;
        console.log(`  \x1b[32m✔\x1b[0m ${test.name} \x1b[90m(${duration}ms)\x1b[0m`);
      } catch (err) {
        const duration = (performance.now() - testStart).toFixed(1);
        this.failedTests++;
        console.log(`  \x1b[31m✖\x1b[0m ${test.name} \x1b[90m(${duration}ms)\x1b[0m`);
        console.log(`    \x1b[31mError: ${err.message}\x1b[0m`);
        if (err.stack) {
          const firstStack = err.stack.split('\n').slice(1, 3).join('\n');
          console.log(`    \x1b[90m${firstStack}\x1b[0m`);
        }
      }
    }

    if (suite.subSuites) {
      for (const sub of suite.subSuites) {
        await this.runSuite(sub, `${prefix}  `);
      }
    }
  }

  async execute() {
    this.startTime = performance.now();
    for (const suite of this.suites) {
      await this.runSuite(suite);
    }
    this.endTime = performance.now();
    return this.getSummary();
  }

  getSummary() {
    return {
      total: this.totalTests,
      passed: this.passedTests,
      failed: this.failedTests,
      skipped: this.skippedTests,
      durationMs: (this.endTime - this.startTime).toFixed(2),
      isSuccess: this.failedTests === 0
    };
  }

  reset() {
    this.suites = [];
    this.currentSuite = null;
    this.totalTests = 0;
    this.passedTests = 0;
    this.failedTests = 0;
    this.skippedTests = 0;
  }
}

export const runner = new TestContext();
export const describe = (name, fn) => runner.describe(name, fn);
export const it = (name, fn) => runner.it(name, fn);
export const test = (name, fn) => runner.it(name, fn);
export const beforeEach = (fn) => runner.beforeEach(fn);
export const afterEach = (fn) => runner.afterEach(fn);
