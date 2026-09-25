/**
 * Standalone Zero-Dependency Assertion Engine for Nghịch Thiên Ký E2E Suite
 */

export class AssertionError extends Error {
  constructor(message, actual, expected, operator) {
    super(message || `Assertion failed: expected ${JSON.stringify(expected)} ${operator || '=='} actual ${JSON.stringify(actual)}`);
    this.name = 'AssertionError';
    this.actual = actual;
    this.expected = expected;
    this.operator = operator;
  }
}

export const assert = {
  ok(value, message) {
    if (!value) {
      throw new AssertionError(message || `Expected truthy value, got ${value}`, value, true, 'truthy');
    }
  },

  isTrue(value, message) {
    if (value !== true) {
      throw new AssertionError(message || `Expected strictly true, got ${value}`, value, true, '===');
    }
  },

  isFalse(value, message) {
    if (value !== false) {
      throw new AssertionError(message || `Expected strictly false, got ${value}`, value, false, '===');
    }
  },

  strictEqual(actual, expected, message) {
    if (actual !== expected) {
      throw new AssertionError(
        message || `Strict equality failed:\n  Actual:   ${actual}\n  Expected: ${expected}`,
        actual,
        expected,
        '==='
      );
    }
  },

  notStrictEqual(actual, expected, message) {
    if (actual === expected) {
      throw new AssertionError(
        message || `Expected values to be strictly not equal:\n  Actual:   ${actual}\n  Expected: ${expected}`,
        actual,
        expected,
        '!=='
      );
    }
  },

  deepStrictEqual(actual, expected, message) {
    const actStr = JSON.stringify(actual);
    const expStr = JSON.stringify(expected);
    if (actStr !== expStr) {
      throw new AssertionError(
        message || `Deep strict equality failed:\n  Actual:   ${actStr}\n  Expected: ${expStr}`,
        actual,
        expected,
        'deepStrictEqual'
      );
    }
  },

  throws(fn, errorMatcher, message) {
    let threw = false;
    let thrownErr = null;
    try {
      fn();
    } catch (err) {
      threw = true;
      thrownErr = err;
    }

    if (!threw) {
      throw new AssertionError(message || 'Expected function to throw an error, but it did not', null, 'Error', 'throws');
    }

    if (errorMatcher) {
      if (typeof errorMatcher === 'string' && !thrownErr.message.includes(errorMatcher)) {
        throw new AssertionError(
          message || `Expected error message to contain "${errorMatcher}", got "${thrownErr.message}"`,
          thrownErr.message,
          errorMatcher,
          'includes'
        );
      } else if (errorMatcher instanceof RegExp && !errorMatcher.test(thrownErr.message)) {
        throw new AssertionError(
          message || `Expected error message to match regex ${errorMatcher}, got "${thrownErr.message}"`,
          thrownErr.message,
          errorMatcher,
          'matches'
        );
      }
    }
  },

  match(actual, regex, message) {
    if (!regex.test(actual)) {
      throw new AssertionError(
        message || `Expected "${actual}" to match pattern ${regex}`,
        actual,
        regex,
        'match'
      );
    }
  },

  between(actual, min, max, message) {
    if (actual < min || actual > max) {
      throw new AssertionError(
        message || `Expected ${actual} to be between [${min}, ${max}]`,
        actual,
        `[${min}, ${max}]`,
        'between'
      );
    }
  },

  closeTo(actual, expected, delta = 0.01, message) {
    if (Math.abs(actual - expected) > delta) {
      throw new AssertionError(
        message || `Expected ${actual} to be close to ${expected} within delta ${delta} (diff: ${Math.abs(actual - expected)})`,
        actual,
        expected,
        'closeTo'
      );
    }
  },

  includes(collection, item, message) {
    const passed = Array.isArray(collection) || typeof collection === 'string'
      ? collection.includes(item)
      : (collection && typeof collection === 'object' && item in collection);
    if (!passed) {
      throw new AssertionError(
        message || `Expected collection to include ${JSON.stringify(item)}`,
        collection,
        item,
        'includes'
      );
    }
  }
};
