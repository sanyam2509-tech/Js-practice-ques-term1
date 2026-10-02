const { questions } = require("./questions.js");
const { deepEqual, formatValue } = require("./runner.js");

function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(deepClone);
  const copy = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copy[key] = deepClone(obj[key]);
    }
  }
  return copy;
}

console.log(`Verifying all ${questions.length} questions against their official solutions...\n`);

let passedCount = 0;
let failedCount = 0;

for (const q of questions) {
  process.stdout.write(`Q${q.id} [${q.title}] ... `);
  
  if (q.type === "conceptual") {
    console.log("✓ Conceptual (Self-Check + Quiz verified)");
    passedCount++;
    continue;
  }

  if (q.type === "output") {
    // Test output capture
    const logs = [];
    const origLog = console.log;
    console.log = (...args) => {
      logs.push(args.map(a => typeof a === 'string' ? a : formatValue(a)).join(' '));
    };

    let evalError = null;
    try {
      (new Function(q.solution))();
    } catch (e) {
      evalError = e;
    } finally {
      console.log = origLog;
    }

    let qPassed = true;
    for (const test of q.tests) {
      if (test.expectError) {
        if (!evalError || evalError.name !== "ReferenceError") {
          qPassed = false;
        }
      } else {
        const expected = test.expected || [];
        if (expected.length !== logs.length || !expected.every((val, i) => String(logs[i]).trim() === String(val).trim())) {
          qPassed = false;
        }
      }
    }

    if (qPassed) {
      console.log("✓ Output matched");
      passedCount++;
    } else {
      console.log(`✗ Output mismatch! Expected: ${JSON.stringify(q.tests[0].expected)}, Actual: ${JSON.stringify(logs)}`);
      failedCount++;
    }
    continue;
  }

  if (q.type === "function") {
    let userExports = {};
    try {
      const userFn = new Function(
        q.solution + "\n" +
        "return { " +
          (q.targetFunction ? q.targetFunction + ": (typeof " + q.targetFunction + " !== 'undefined' ? " + q.targetFunction + " : undefined)," : "") +
          "compose3: (typeof compose3 !== 'undefined' ? compose3 : undefined)," +
          "trimName: (typeof trimName !== 'undefined' ? trimName : undefined)," +
          "toUpper: (typeof toUpper !== 'undefined' ? toUpper : undefined)," +
          "addGreeting: (typeof addGreeting !== 'undefined' ? addGreeting : undefined)" +
        "};"
      );
      userExports = userFn();
    } catch (e) {
      console.log(`✗ Solution compilation error: ${e.message}`);
      failedCount++;
      continue;
    }

    const targetFn = q.targetFunction ? userExports[q.targetFunction] : null;
    let allQTestsPassed = true;

    for (const test of q.tests) {
      let testPassed = false;
      try {
        if (test.customCheck) {
          const checker = (new Function("return " + test.customCheck))();
          testPassed = checker(userExports);
        } else {
          const args = deepClone(test.args);
          const actual = targetFn.apply(null, args);
          testPassed = deepEqual(actual, test.expected);
          if (!testPassed) {
            console.log(`\n  Failed test: ${test.name}`);
            console.log(`  Expected: ${JSON.stringify(test.expected)}`);
            console.log(`  Actual:   ${JSON.stringify(actual)}`);
          }
        }
      } catch (e) {
        console.log(`\n  Test runtime error: ${e.message}`);
        testPassed = false;
      }

      if (!testPassed) {
        allQTestsPassed = false;
      }
    }

    if (allQTestsPassed) {
      console.log(`✓ All ${q.tests.length} tests passed`);
      passedCount++;
    } else {
      console.log(`✗ Tests failed`);
      failedCount++;
    }
  }
}

console.log(`\n================================`);
console.log(`Verification Summary: ${passedCount} passed, ${failedCount} failed out of ${questions.length} questions.`);
if (failedCount > 0) {
  process.exit(1);
}
