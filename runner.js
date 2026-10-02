// JavaScript Practice Platform - Execution & Test Runner Engine

(function(root) {
  // Deep Equality Utility
  function deepEqual(a, b) {
    if (a === b) {
      return true;
    }

    // Handle NaN
    if (typeof a === 'number' && typeof b === 'number' && isNaN(a) && isNaN(b)) {
      return true;
    }

    if (a === null || typeof a !== 'object' || b === null || typeof b !== 'object') {
      return false;
    }

    // Dates
    if (a instanceof Date && b instanceof Date) {
      return a.getTime() === b.getTime();
    }

    // RegExps
    if (a instanceof RegExp && b instanceof RegExp) {
      return a.toString() === b.toString();
    }

    // Array check
    const isArrA = Array.isArray(a);
    const isArrB = Array.isArray(b);
    if (isArrA !== isArrB) return false;

    if (isArrA) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (!deepEqual(a[i], b[i])) return false;
      }
      return true;
    }

    // Object comparison
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
      if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
      if (!deepEqual(a[key], b[key])) return false;
    }

    return true;
  }

  // Value Formatter
  function formatValue(val) {
    if (val === undefined) return "undefined";
    if (val === null) return "null";
    if (typeof val === "string") return JSON.stringify(val);
    if (typeof val === "number" || typeof val === "boolean") return String(val);
    if (typeof val === "function") return val.toString();
    if (val instanceof Error) return `${val.name}: ${val.message}`;
    try {
      return JSON.stringify(val, null, 2);
    } catch (e) {
      return String(val);
    }
  }

  // Deep clone helper
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

  // Web Worker Script Code
  const WORKER_CODE = `
    self.deepEqual = ${deepEqual.toString()};
    self.formatValue = ${formatValue.toString()};
    self.deepClone = ${deepClone.toString()};

    self.onmessage = function(e) {
      const { action, code, question, timeout = 2500 } = e.data;
      const startTime = performance.now();
      const logs = [];

      // Capture console methods
      function capture(type, args) {
        const formatted = args.map(arg => {
          if (typeof arg === "string") return arg;
          return formatValue(arg);
        }).join(" ");
        logs.push({ type, message: formatted, time: performance.now() - startTime });
      }

      console.log = (...args) => capture("log", args);
      console.info = (...args) => capture("info", args);
      console.warn = (...args) => capture("warn", args);
      console.error = (...args) => capture("error", args);

      try {
        if (action === "run") {
          // 1. Compile User Code
          let userExports = {};
          let compileError = null;
          try {
            const userFn = new Function(
              code + "\\n" +
              "return { " +
                (question && question.targetFunction ? question.targetFunction + ": (typeof " + question.targetFunction + " !== 'undefined' ? " + question.targetFunction + " : undefined)," : "") +
                "greet: (typeof greet !== 'undefined' ? greet : undefined)," +
                "runGreeting: (typeof runGreeting !== 'undefined' ? runGreeting : undefined)," +
                "compose3: (typeof compose3 !== 'undefined' ? compose3 : undefined)," +
                "trimName: (typeof trimName !== 'undefined' ? trimName : undefined)," +
                "toUpper: (typeof toUpper !== 'undefined' ? toUpper : undefined)," +
                "addGreeting: (typeof addGreeting !== 'undefined' ? addGreeting : undefined)" +
              "};"
            );
            userExports = userFn();
          } catch (err) {
            compileError = {
              name: err.name || "SyntaxError",
              message: err.message || String(err),
              stack: err.stack
            };
          }

          if (compileError) {
            self.postMessage({
              success: false,
              syntaxError: true,
              error: compileError,
              logs,
              duration: Math.round((performance.now() - startTime) * 10) / 10
            });
            return;
          }

          // 2. Execute Example or Top-level
          let returnValue = undefined;
          let runError = null;
          let exampleLabel = null;

          if (question && question.runExamples && question.runExamples.length > 0) {
            const example = question.runExamples[0];
            exampleLabel = example.label || "";
            try {
              if (example.customRun) {
                const runnerFn = (new Function("return " + example.customRun))();
                returnValue = runnerFn(userExports);
              } else if (question.targetFunction && typeof userExports[question.targetFunction] === "function") {
                const targetFn = userExports[question.targetFunction];
                const clonedArgs = deepClone(example.args || []);
                returnValue = targetFn.apply(null, clonedArgs);
              } else if (example.codeSnippet) {
                returnValue = (new Function(code + "\\n" + example.codeSnippet))();
              } else if (question.targetFunction && typeof userExports[question.targetFunction] === "undefined") {
                runError = {
                  name: "ReferenceError",
                  message: "Function '" + question.targetFunction + "' is not defined in your code."
                };
              }
            } catch (execErr) {
              runError = {
                name: execErr.name || "RuntimeError",
                message: execErr.message || String(execErr)
              };
            }
          } else {
            // General top-level execution
            try {
              returnValue = (new Function(code))();
            } catch (execErr) {
              runError = {
                name: execErr.name || "RuntimeError",
                message: execErr.message || String(execErr)
              };
            }
          }

          const duration = Math.round((performance.now() - startTime) * 10) / 10;
          self.postMessage({
            success: !runError,
            logs,
            error: runError,
            returnValue: returnValue !== undefined ? formatValue(returnValue) : undefined,
            exampleLabel,
            duration
          });
          return;
        }

        if (action === "test") {
          // Run test suite
          const results = [];
          let allPassed = true;
          let compileError = null;

          let userExports = {};
          try {
            const userFn = new Function(
              code + "\\n" +
              "return { " +
                (question.targetFunction ? question.targetFunction + ": (typeof " + question.targetFunction + " !== 'undefined' ? " + question.targetFunction + " : undefined)," : "") +
                "greet: (typeof greet !== 'undefined' ? greet : undefined)," +
                "sayHello: (typeof sayHello !== 'undefined' ? sayHello : undefined)," +
                "runGreeting: (typeof runGreeting !== 'undefined' ? runGreeting : undefined)," +
                "compose3: (typeof compose3 !== 'undefined' ? compose3 : undefined)," +
                "trimName: (typeof trimName !== 'undefined' ? trimName : undefined)," +
                "toUpper: (typeof toUpper !== 'undefined' ? toUpper : undefined)," +
                "addGreeting: (typeof addGreeting !== 'undefined' ? addGreeting : undefined)" +
              "};"
            );
            userExports = userFn();
          } catch (err) {
            compileError = {
              name: err.name || "SyntaxError",
              message: err.message || String(err)
            };
            self.postMessage({
              success: false,
              syntaxError: true,
              error: compileError,
              logs,
              duration: Math.round((performance.now() - startTime) * 10) / 10
            });
            return;
          }

          const targetFn = question.targetFunction ? userExports[question.targetFunction] : null;
          if (question.targetFunction && typeof targetFn !== "function" && !question.tests[0]?.customCheck) {
            self.postMessage({
              success: false,
              missingFunction: true,
              error: {
                name: "ReferenceError",
                message: "Function '" + question.targetFunction + "' is not defined or is not a function."
              },
              logs,
              duration: Math.round((performance.now() - startTime) * 10) / 10
            });
            return;
          }

          // Run tests
          for (let i = 0; i < question.tests.length; i++) {
            const test = question.tests[i];
            const testStart = performance.now();
            let testPassed = false;
            let actualValue;
            let testError = null;

            try {
              if (test.customCheck) {
                const checker = (new Function("return " + test.customCheck))();
                testPassed = checker(userExports);
                actualValue = testPassed ? test.expected : "Check failed";
              } else {
                const clonedArgs = deepClone(test.args || []);
                actualValue = targetFn.apply(null, clonedArgs);
                testPassed = deepEqual(actualValue, test.expected);
              }
            } catch (err) {
              testError = err.message || String(err);
              actualValue = "Error: " + testError;
            }

            if (!testPassed) allPassed = false;

            results.push({
              id: i + 1,
              name: test.name,
              passed: !!testPassed,
              argsDesc: test.argsDesc || (test.args ? test.args.map(formatValue).join(", ") : ""),
              expected: formatValue(test.expected),
              actual: formatValue(actualValue),
              error: testError,
              duration: Math.round((performance.now() - testStart) * 10) / 10
            });
          }

          const duration = Math.round((performance.now() - startTime) * 10) / 10;
          self.postMessage({
            success: true,
            results,
            allPassed,
            logs,
            duration
          });
        }
      } catch (fatalErr) {
        self.postMessage({
          success: false,
          error: {
            name: fatalErr.name || "RuntimeError",
            message: fatalErr.message || String(fatalErr)
          },
          logs,
          duration: Math.round((performance.now() - startTime) * 10) / 10
        });
      }
    };
  `;

  class CodeRunner {
    constructor() {
      this.currentWorker = null;
      this.workerTimeout = null;
    }

    terminate() {
      if (this.currentWorker) {
        this.currentWorker.terminate();
        this.currentWorker = null;
      }
      if (this.workerTimeout) {
        clearTimeout(this.workerTimeout);
        this.workerTimeout = null;
      }
    }

    executeWorker(action, code, question = null, timeoutMs = 2500) {
      this.terminate();

      return new Promise((resolve) => {
        let isResolved = false;

        let blob;
        try {
          blob = new Blob([WORKER_CODE], { type: "application/javascript" });
        } catch (e) {
          resolve({
            success: false,
            error: {
              name: "EnvironmentError",
              message: "Web Workers are not supported in this browser context."
            }
          });
          return;
        }

        const workerUrl = URL.createObjectURL(blob);
        const worker = new Worker(workerUrl);
        this.currentWorker = worker;

        this.workerTimeout = setTimeout(() => {
          if (!isResolved) {
            isResolved = true;
            this.terminate();
            URL.revokeObjectURL(workerUrl);
            resolve({
              success: false,
              timedOut: true,
              error: {
                name: "TimeoutError",
                message: "Execution timed out after " + timeoutMs + "ms. Check for an infinite loop or heavy recursion."
              },
              logs: []
            });
          }
        }, timeoutMs);

        worker.onmessage = (e) => {
          if (!isResolved) {
            isResolved = true;
            this.terminate();
            URL.revokeObjectURL(workerUrl);
            resolve(e.data);
          }
        };

        worker.onerror = (err) => {
          if (!isResolved) {
            isResolved = true;
            this.terminate();
            URL.revokeObjectURL(workerUrl);
            resolve({
              success: false,
              error: {
                name: "WorkerError",
                message: err.message || "An unexpected error occurred during execution."
              },
              logs: []
            });
          }
        };

        worker.postMessage({
          action,
          code,
          question,
          timeout: timeoutMs
        });
      });
    }

    async runCode(code, question = null, timeoutMs = 2500) {
      return this.executeWorker("run", code, question, timeoutMs);
    }

    async testCode(code, question, timeoutMs = 2500) {
      return this.executeWorker("test", code, question, timeoutMs);
    }
  }

  // Export
  root.CodeRunner = CodeRunner;
  root.deepEqual = deepEqual;
  root.formatValue = formatValue;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { CodeRunner, deepEqual, formatValue };
  }
})(typeof window !== "undefined" ? window : globalThis);
