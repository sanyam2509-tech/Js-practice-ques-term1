// JavaScript Practice Platform - Question Dataset (All 30 Questions synced with latest practice-01.md & practice-02.md)

const questions = [
  {
    id: 1,
    title: "Data Types and Operations",
    difficulty: "easy",
    category: "Basics & Types",
    concepts: ["data types", "type coercion", "typeof operator", "objects"],
    type: "function",
    targetFunction: "describeValues",
    description: `Write a function \`describeValues(a, b)\` that returns an object containing:

- \`addition\` → result of \`a + b\`
- \`subtraction\` → result of \`a - b\`
- \`typeA\` → result of \`typeof a\`
- \`typeB\` → result of \`typeof b\`

Use the values directly without converting them first.

### Example:
\`\`\`js
describeValues(10, "5")
// {
//   addition: "105",
//   subtraction: 5,
//   typeA: "number",
//   typeB: "string"
// }
\`\`\``,
    starterCode: `function describeValues(a, b) {
  // Write your code here
  
}`,
    runExamples: [
      {
        args: [10, "5"],
        label: 'describeValues(10, "5")'
      }
    ],
    tests: [
      {
        name: "Describes values for number and numeric string (10, '5')",
        args: [10, "5"],
        expected: {
          addition: "105",
          subtraction: 5,
          typeA: "number",
          typeB: "string"
        }
      },
      {
        name: "Describes two numbers (5, 2)",
        args: [5, 2],
        expected: {
          addition: 7,
          subtraction: 3,
          typeA: "number",
          typeB: "number"
        }
      },
      {
        name: "Describes string and number ('10', 3)",
        args: ["10", 3],
        expected: {
          addition: "103",
          subtraction: 7,
          typeA: "string",
          typeB: "number"
        }
      },
      {
        name: "Describes boolean and number (true, 1)",
        args: [true, 1],
        expected: {
          addition: 2,
          subtraction: 0,
          typeA: "boolean",
          typeB: "number"
        }
      }
    ],
    hints: [
      "Return an object literal with the keys: `addition`, `subtraction`, `typeA`, and `typeB`.",
      "For `typeA` and `typeB`, use the `typeof` operator: `typeof a` and `typeof b`.",
      "`return { addition: a + b, subtraction: a - b, typeA: typeof a, typeB: typeof b };`."
    ],
    solution: `function describeValues(a, b) {
  return {
    addition: a + b,
    subtraction: a - b,
    typeA: typeof a,
    typeB: typeof b
  };
}`,
    explanation: `The function computes addition with \`+\` and subtraction with \`-\`, demonstrating JavaScript's automatic type coercion. The \`typeof\` operator returns the type name of each argument as a string.`
  },
  {
    id: 2,
    title: "Variables and Reassignment",
    difficulty: "easy",
    category: "Variables",
    concepts: ["variables", "assignment operators", "arithmetic"],
    type: "function",
    targetFunction: "updateScore",
    description: `Write a function \`updateScore(score)\` that:

1. adds \`10\` to \`score\`
2. multiplies the result by \`2\`
3. subtracts \`5\`
4. returns the final value

### Example:
\`\`\`js
updateScore(20) // 55
\`\`\``,
    starterCode: `function updateScore(score) {
  // 1. add 10 to score
  // 2. multiply result by 2
  // 3. subtract 5
  // 4. return final value
  
}`,
    runExamples: [
      {
        args: [20],
        label: "updateScore(20)"
      }
    ],
    tests: [
      {
        name: "Updates score starting from 20 -> 55",
        args: [20],
        expected: 55
      },
      {
        name: "Updates score starting from 0 -> 15",
        args: [0],
        expected: 15
      },
      {
        name: "Updates score starting from 5 -> 25",
        args: [5],
        expected: 25
      },
      {
        name: "Updates score starting from 100 -> 215",
        args: [100],
        expected: 215
      }
    ],
    hints: [
      "Use compound assignment operators: `score += 10`, `score *= 2`, `score -= 5`.",
      "Make sure you perform the operations in the exact given sequence.",
      "Return the final modified `score` variable: `return score;`."
    ],
    solution: `function updateScore(score) {
  score += 10;
  score *= 2;
  score -= 5;
  return score;
}`,
    explanation: `Applying the operations in sequence on initial score 20: 20 + 10 = 30; 30 * 2 = 60; 60 - 5 = 55. The function returns 55.`
  },
  {
    id: 3,
    title: "Array Access and Update",
    difficulty: "easy",
    category: "Arrays",
    concepts: ["arrays", "indexing", "mutation"],
    type: "function",
    targetFunction: "updateFirst",
    description: `Write a function \`updateFirst(arr, value)\` that replaces the first element of an array with \`value\` and returns the array.

### Example:
\`\`\`js
updateFirst([10, 20, 30], 99)
// [99, 20, 30]
\`\`\``,
    starterCode: `function updateFirst(arr, value) {
  // Replace first element of arr with value and return arr
  
}`,
    runExamples: [
      {
        args: [[10, 20, 30], 99],
        label: "updateFirst([10, 20, 30], 99)"
      }
    ],
    tests: [
      {
        name: "Replaces first element of [10, 20, 30] with 99",
        args: [[10, 20, 30], 99],
        expected: [99, 20, 30]
      },
      {
        name: "Replaces first element of single-element array [1] with 42",
        args: [[1], 42],
        expected: [42]
      },
      {
        name: "Replaces first element of string array ['a', 'b', 'c'] with 'z'",
        args: [["a", "b", "c"], "z"],
        expected: ["z", "b", "c"]
      },
      {
        name: "Works with boolean values",
        args: [[null, false], true],
        expected: [true, false]
      }
    ],
    hints: [
      "JavaScript arrays are zero-indexed, so the first element is at index 0.",
      "Assign the new value to index 0: `arr[0] = value;`.",
      "Return the updated array: `return arr;`."
    ],
    solution: `function updateFirst(arr, value) {
  arr[0] = value;
  return arr;
}`,
    explanation: `Array elements are accessed and updated by index. Setting \`arr[0] = value\` replaces the first item, and returning \`arr\` gives the caller the modified array.`
  },
  {
    id: 4,
    title: "String Processing",
    difficulty: "easy",
    category: "Strings",
    concepts: ["strings", "length property"],
    type: "function",
    targetFunction: "countCharacters",
    description: `Write a function \`countCharacters(str)\` that returns the number of characters in a string.

### Example:
\`\`\`js
countCharacters("hello") // 5
\`\`\``,
    starterCode: `function countCharacters(str) {
  // Return the number of characters in str
  
}`,
    runExamples: [
      {
        args: ["hello"],
        label: 'countCharacters("hello")'
      }
    ],
    tests: [
      {
        name: "Counts characters in 'hello'",
        args: ["hello"],
        expected: 5
      },
      {
        name: "Handles empty string ''",
        args: [""],
        expected: 0
      },
      {
        name: "Counts characters in string with spaces 'JavaScript Practice'",
        args: ["JavaScript Practice"],
        expected: 19
      },
      {
        name: "Handles string containing only spaces '   '",
        args: ["   "],
        expected: 3
      }
    ],
    hints: [
      "Every string in JavaScript has a built-in property that returns its character count.",
      "Use `.length` on the string.",
      "`return str.length;` will return the character count."
    ],
    solution: `function countCharacters(str) {
  return str.length;
}`,
    explanation: `The \`.length\` property of a JavaScript string returns the number of UTF-16 code units (characters) in the string.`
  },
  {
    id: 5,
    title: "Function Basics",
    difficulty: "easy",
    category: "Functions",
    concepts: ["functions", "modulo operator", "booleans"],
    type: "function",
    targetFunction: "isEven",
    description: `Write a function \`isEven(num)\` that returns \`true\` if \`num\` is even and \`false\` otherwise.

### Examples:
\`\`\`js
isEven(4)  // true
isEven(7)  // false
isEven(0)  // true
\`\`\``,
    starterCode: `function isEven(num) {
  // Return true if num is even, false otherwise
  
}`,
    runExamples: [
      {
        args: [4],
        label: "isEven(4)"
      }
    ],
    tests: [
      {
        name: "Checks positive even number 4",
        args: [4],
        expected: true
      },
      {
        name: "Checks positive odd number 7",
        args: [7],
        expected: false
      },
      {
        name: "Checks zero (0 is even)",
        args: [0],
        expected: true
      },
      {
        name: "Checks negative even number -2",
        args: [-2],
        expected: true
      },
      {
        name: "Checks negative odd number -5",
        args: [-5],
        expected: false
      }
    ],
    hints: [
      "Use the remainder/modulo operator `%` to test divisibility by 2.",
      "An even number divided by 2 has a remainder of 0: `num % 2 === 0`.",
      "`return num % 2 === 0;` directly returns the boolean."
    ],
    solution: `function isEven(num) {
  return num % 2 === 0;
}`,
    explanation: `The remainder operator \`%\` returns 0 when an integer is evenly divisible by 2. If \`num % 2 === 0\`, the number is even.`
  },
  {
    id: 6,
    title: "`var` and Hoisting",
    difficulty: "easy",
    category: "Execution & Hoisting",
    concepts: ["hoisting", "var", "declaration vs initialization"],
    type: "function",
    targetFunction: "getScore",
    description: `Write a function \`getScore()\` that uses \`var\` and returns \`10\`.

Place the \`var\` declaration at the top of the function and initialize it before returning the value.

Then call:

\`\`\`js
getScore() // 10
\`\`\`

The goal is to practice the difference between a variable declaration and its initialization.`,
    starterCode: `function getScore() {
  var score;
  // initialize score
  // return score
  
}`,
    runExamples: [
      {
        args: [],
        label: "getScore()"
      }
    ],
    tests: [
      {
        name: "Returns 10 from getScore() using var",
        args: [],
        expected: 10
      }
    ],
    hints: [
      "Declare `var score;` at the top of the function.",
      "Assign `score = 10;` on the next line.",
      "Return `score;`."
    ],
    solution: `function getScore() {
  var score;
  score = 10;
  return score;
}`,
    explanation: `With \`var\`, the declaration \`var score\` is hoisted to the top of the function during compilation, while the assignment \`score = 10\` executes sequentially at runtime.`
  },
  {
    id: 7,
    title: "Function Declaration Hoisting",
    difficulty: "easy",
    category: "Execution & Hoisting",
    concepts: ["hoisting", "function declaration", "execution context"],
    type: "function",
    targetFunction: "runGreeting",
    description: `Write a function \`runGreeting(name)\` that calls a function named \`sayHello(name)\`.

Keep the \`sayHello\` function declaration **below** \`runGreeting\` in your code.

### Example:
\`\`\`js
runGreeting("Sam")
// "Hello Sam"
\`\`\`

This is meant to practice function declaration hoisting.`,
    starterCode: `function runGreeting(name) {
  // Call sayHello(name) here
  
}

function sayHello(name) {
  // Return "Hello " + name
  
}`,
    runExamples: [
      {
        args: ["Sam"],
        label: 'runGreeting("Sam")'
      }
    ],
    tests: [
      {
        name: "Returns 'Hello Sam' when calling runGreeting('Sam')",
        args: ["Sam"],
        expected: "Hello Sam"
      },
      {
        name: "Returns 'Hello Alex' when calling runGreeting('Alex')",
        args: ["Alex"],
        expected: "Hello Alex"
      },
      {
        name: "Returns 'Hello World' when calling runGreeting('World')",
        args: ["World"],
        expected: "Hello World"
      }
    ],
    hints: [
      "Inside `runGreeting(name)`, return `sayHello(name);`.",
      "Below `runGreeting`, define `function sayHello(name) { return 'Hello ' + name; }`.",
      "Function declarations are hoisted completely into memory, so calling `sayHello` before its declaration succeeds without error."
    ],
    solution: `function runGreeting(name) {
  return sayHello(name);
}

function sayHello(name) {
  return "Hello " + name;
}`,
    explanation: `Function declarations are hoisted in their entirety into memory during the creation phase. Therefore, \`runGreeting\` can invoke \`sayHello\` even though \`sayHello\` is declared below it in the source code.`
  },
  {
    id: 8,
    title: "Execution Order and Call Stack",
    difficulty: "easy",
    category: "Execution & Hoisting",
    concepts: ["call stack", "execution context", "nested functions"],
    type: "function",
    targetFunction: "getExecutionOrder",
    description: `Write a function \`getExecutionOrder()\` that uses two nested function calls to return this exact array:

\`\`\`js
[
  "first",
  "second",
  "first again",
  "done"
]
\`\`\`

### Requirements:
- \`first()\` should add \`"first"\`
- \`first()\` should call \`second()\`
- \`second()\` should add \`"second"\`
- after \`second()\` returns, \`first()\` should add \`"first again"\`
- after \`first()\` finishes, add \`"done"\``,
    starterCode: `function getExecutionOrder() {
  const result = [];

  function first() {
    // 1. add "first" to result
    // 2. call second()
    // 3. add "first again" to result
  }

  function second() {
    // add "second" to result
  }

  // 1. call first()
  // 2. add "done" to result
  // 3. return result

}`,
    runExamples: [
      {
        args: [],
        label: "getExecutionOrder()"
      }
    ],
    tests: [
      {
        name: "Returns exact array representing call stack execution order",
        args: [],
        expected: [
          "first",
          "second",
          "first again",
          "done"
        ]
      }
    ],
    hints: [
      "Initialize `const result = [];` at the start of `getExecutionOrder`.",
      "Inside `first()`, do `result.push('first'); second(); result.push('first again');`.",
      "Inside `second()`, do `result.push('second');`.",
      "Call `first();`, push `'done'`, and return `result`."
    ],
    solution: `function getExecutionOrder() {
  const result = [];

  function first() {
    result.push("first");
    second();
    result.push("first again");
  }

  function second() {
    result.push("second");
  }

  first();
  result.push("done");

  return result;
}`,
    explanation: `The call stack pushes \`first()\`, which pushes "first", then calls \`second()\` (pushed on top of stack). \`second()\` pushes "second" and finishes (popped). Control returns to \`first()\`, pushing "first again" (popped). Global execution pushes "done" and returns the array.`
  },
  {
    id: 9,
    title: "`map()` Transformation",
    difficulty: "easy",
    category: "Functional Array Methods",
    concepts: ["array methods", "map", "transformation", "immutability"],
    type: "function",
    targetFunction: "doubleNumbers",
    description: `Write a function \`doubleNumbers(nums)\` that returns a new array containing every number multiplied by \`2\`.

### Example:
\`\`\`js
doubleNumbers([1, 2, 3, 4])
// [2, 4, 6, 8]
\`\`\``,
    starterCode: `function doubleNumbers(nums) {
  // Your code here using map
  
}`,
    runExamples: [
      {
        args: [[1, 2, 3, 4]],
        label: "doubleNumbers([1, 2, 3, 4])"
      }
    ],
    tests: [
      {
        name: "Doubles positive numbers [1, 2, 3, 4]",
        args: [[1, 2, 3, 4]],
        expected: [2, 4, 6, 8]
      },
      {
        name: "Handles empty array []",
        args: [[]],
        expected: []
      },
      {
        name: "Handles negative numbers and zero [-2, 0, 5]",
        args: [[-2, 0, 5]],
        expected: [-4, 0, 10]
      },
      {
        name: "Handles single element array [100]",
        args: [[100]],
        expected: [200]
      }
    ],
    hints: [
      "The `.map()` method transforms every element in an array and returns a new array.",
      "Pass a callback function to `nums.map(...)` that receives each number `num`.",
      "Return `num * 2` from the callback function."
    ],
    solution: `function doubleNumbers(nums) {
  return nums.map(function (num) {
    return num * 2;
  });
}`,
    explanation: `\`Array.prototype.map()\` iterates over each element in the input array, applies the callback function, and returns a new array with the transformed values without mutating the original array.`
  },
  {
    id: 10,
    title: "`filter()` Selection",
    difficulty: "easy",
    category: "Functional Array Methods",
    concepts: ["array methods", "filter", "objects", "predicates"],
    type: "function",
    targetFunction: "getAdults",
    description: `Write a function \`getAdults(users)\` that returns only users whose \`age\` is at least \`18\`.

### Example:
\`\`\`js
const users = [
  { name: "A", age: 17 },
  { name: "B", age: 21 },
  { name: "C", age: 18 }
];

getAdults(users);
// [
//   { name: "B", age: 21 },
//   { name: "C", age: 18 }
// ]
\`\`\``,
    starterCode: `function getAdults(users) {
  // Your code here using filter
  
}`,
    runExamples: [
      {
        args: [[
          { name: "A", age: 17 },
          { name: "B", age: 21 },
          { name: "C", age: 18 }
        ]],
        label: 'getAdults(users)'
      }
    ],
    tests: [
      {
        name: "Filters users with age >= 18",
        args: [[
          { name: "A", age: 17 },
          { name: "B", age: 21 },
          { name: "C", age: 18 }
        ]],
        expected: [
          { name: "B", age: 21 },
          { name: "C", age: 18 }
        ]
      },
      {
        name: "Returns empty array when all users are minors",
        args: [[
          { name: "Kid", age: 5 },
          { name: "Teen", age: 15 }
        ]],
        expected: []
      },
      {
        name: "Handles single adult user",
        args: [[{ name: "Old", age: 90 }]],
        expected: [{ name: "Old", age: 90 }]
      },
      {
        name: "Handles empty array",
        args: [[]],
        expected: []
      }
    ],
    hints: [
      "The `.filter()` method returns a new array containing all elements that pass the predicate test.",
      "Inside the callback function `function(user)`, check if `user.age >= 18`.",
      "`return users.filter(user => user.age >= 18);`."
    ],
    solution: `function getAdults(users) {
  return users.filter(function (user) {
    return user.age >= 18;
  });
}`,
    explanation: `\`Array.prototype.filter()\` runs a callback function for each user. When the callback returns \`true\` (here, \`user.age >= 18\`), the user is included in the new returned array.`
  },
  {
    id: 11,
    title: "`reduce()` Sum",
    difficulty: "easy",
    category: "Functional Array Methods",
    concepts: ["array methods", "reduce", "accumulation", "initial value"],
    type: "function",
    targetFunction: "total",
    description: `Write a function \`total(nums)\` that returns the sum of all numbers using \`reduce()\`.

### Example:
\`\`\`js
total([10, 20, 30]) // 60
\`\`\``,
    starterCode: `function total(nums) {
  // Your code here using reduce
  
}`,
    runExamples: [
      {
        args: [[10, 20, 30]],
        label: "total([10, 20, 30])"
      }
    ],
    tests: [
      {
        name: "Sums [10, 20, 30]",
        args: [[10, 20, 30]],
        expected: 60
      },
      {
        name: "Sums [1, 2, 3, 4, 5]",
        args: [[1, 2, 3, 4, 5]],
        expected: 15
      },
      {
        name: "Returns 0 for empty array []",
        args: [[]],
        expected: 0
      },
      {
        name: "Handles negative numbers [-10, 10, -5, 5]",
        args: [[-10, 10, -5, 5]],
        expected: 0
      },
      {
        name: "Handles single element [42]",
        args: [[42]],
        expected: 42
      }
    ],
    hints: [
      "`reduce()` takes two arguments: a reducer callback function and an initial accumulator value.",
      "The reducer function takes `(sum, num)` and returns `sum + num`.",
      "Always supply `0` as the second argument to `reduce(..., 0)` so it handles empty arrays safely."
    ],
    solution: `function total(nums) {
  return nums.reduce(function (sum, num) {
    return sum + num;
  }, 0);
}`,
    explanation: `\`Array.prototype.reduce()\` accumulates elements of the array into a single return value. Starting at initial accumulator 0, it iterates over each item adding \`num\` to \`sum\`.`
  },
  {
    id: 12,
    title: "Pure or Impure?",
    difficulty: "easy",
    category: "Functional Programming",
    concepts: ["pure functions", "side effects", "shared state", "deterministic"],
    type: "conceptual",
    description: `Consider these two functions:

\`\`\`js
function add(a, b) {
  return a + b;
}

let total = 0;
function addToTotal(value) {
  total += value;
  return total;
}
\`\`\`

**Question:** Which function is pure and which is impure? Explain why.

Use the editor to run and observe both functions, then complete the self-check below or click **View Answer**.`,
    starterCode: `function add(a, b) {
  return a + b;
}

let total = 0;
function addToTotal(value) {
  total += value;
  return total;
}

console.log("add(2, 3):", add(2, 3));
console.log("add(2, 3):", add(2, 3));

console.log("addToTotal(5):", addToTotal(5));
console.log("addToTotal(5):", addToTotal(5));`,
    runExamples: [
      {
        codeSnippet: `console.log("add(2, 3):", add(2, 3)); console.log("addToTotal(5):", addToTotal(5));`,
        label: "Run Pure vs Impure demo"
      }
    ],
    quiz: {
      question: "Which of the following statements is correct?",
      options: [
        "add() is pure because it has no side effects and is deterministic; addToTotal() is impure because it mutates external state.",
        "addToTotal() is pure because it returns a number; add() is impure because it takes two arguments.",
        "Both functions are pure because they both return values.",
        "Both functions are impure because they perform addition."
      ],
      correctIndex: 0
    },
    hints: [
      "A pure function always returns the same output for the same inputs and produces no side effects (does not modify external variables).",
      "Notice that calling `add(2, 3)` multiple times always returns 5 and touches nothing outside.",
      "Notice that `addToTotal(5)` modifies the external variable `total`, giving different results on successive calls (5, then 10)."
    ],
    solution: `// add() is pure because it depends only on its arguments and does not change external state.
// addToTotal() is impure because it reads and modifies the external variable total.`,
    explanation: `\`add()\` is **pure** because it depends only on its arguments and does not change external state. \`addToTotal()\` is **impure** because it reads and modifies the external variable \`total\`.`
  },
  {
    id: 13,
    title: "First-Class Functions",
    difficulty: "easy",
    category: "Functions",
    concepts: ["first-class functions", "higher-order functions", "callbacks"],
    type: "function",
    targetFunction: "runGreeting",
    description: `Write a function \`runGreeting(greetingFunction, name)\` that accepts a function as an argument and returns the result of calling that function with \`name\`.

Also write \`greet(name)\` that returns \`"Hello " + name\`.

### Example:
\`\`\`js
runGreeting(greet, "Sam")
// "Hello Sam"
\`\`\`

This practices treating a function as a value that can be stored in a variable or passed to another function.`,
    starterCode: `function greet(name) {
  // Return "Hello " + name
  
}

function runGreeting(greetingFunction, name) {
  // Call greetingFunction with name and return result
  
}`,
    runExamples: [
      {
        customRun: `(function(exports) {
          if (typeof exports.greet === 'function' && typeof exports.runGreeting === 'function') {
            return exports.runGreeting(exports.greet, "Sam");
          }
          return "Please define greet and runGreeting";
        })`,
        label: 'runGreeting(greet, "Sam")'
      }
    ],
    tests: [
      {
        name: "Calls greet with 'Sam' -> 'Hello Sam'",
        customCheck: `(function(userExports) {
          if (typeof userExports.runGreeting !== 'function' || typeof userExports.greet !== 'function') return false;
          return userExports.runGreeting(userExports.greet, "Sam") === "Hello Sam";
        })`,
        argsDesc: 'runGreeting(greet, "Sam")',
        expected: "Hello Sam"
      },
      {
        name: "Calls greet with 'Alex' -> 'Hello Alex'",
        customCheck: `(function(userExports) {
          if (typeof userExports.runGreeting !== 'function' || typeof userExports.greet !== 'function') return false;
          return userExports.runGreeting(userExports.greet, "Alex") === "Hello Alex";
        })`,
        argsDesc: 'runGreeting(greet, "Alex")',
        expected: "Hello Alex"
      },
      {
        name: "Verifies passing a custom function argument dynamically",
        customCheck: `(function(userExports) {
          if (typeof userExports.runGreeting !== 'function') return false;
          const customFn = n => "Welcome, " + n + "!";
          return userExports.runGreeting(customFn, "Jordan") === "Welcome, Jordan!";
        })`,
        argsDesc: 'runGreeting(n => "Welcome, " + n + "!", "Jordan")',
        expected: "Welcome, Jordan!"
      }
    ],
    hints: [
      "In `greet(name)`, return `'Hello ' + name;`.",
      "In `runGreeting(greetingFunction, name)`, call `greetingFunction(name)` and return its result.",
      "Functions in JavaScript are first-class citizens and can be passed around as arguments."
    ],
    solution: `function greet(name) {
  return "Hello " + name;
}

function runGreeting(greetingFunction, name) {
  return greetingFunction(name);
}`,
    explanation: `A function can be passed as an argument just like any other value. \`runGreeting\` receives the function reference in \`greetingFunction\`, calls it with \`name\`, and returns the evaluated string.`
  },
  {
    id: 14,
    title: "Higher-Order Function",
    difficulty: "easy",
    category: "Functional Programming",
    concepts: ["higher-order functions", "callbacks", "abstraction"],
    type: "function",
    targetFunction: "applyOperation",
    description: `Write a function \`applyOperation(a, b, operation)\` that takes two numbers and a function, then returns the result of calling that function with \`a\` and \`b\`.

### Example:
\`\`\`js
applyOperation(10, 5, function (x, y) {
  return x - y;
});

// 5
\`\`\``,
    starterCode: `function applyOperation(a, b, operation) {
  // Your code here
  
}`,
    runExamples: [
      {
        args: [10, 5, (x, y) => x - y],
        label: "applyOperation(10, 5, (x, y) => x - y)"
      }
    ],
    tests: [
      {
        name: "Applies subtraction callback (10 - 5)",
        args: [10, 5, (x, y) => x - y],
        expected: 5
      },
      {
        name: "Applies multiplication callback (3 * 4)",
        args: [3, 4, (x, y) => x * y],
        expected: 12
      },
      {
        name: "Applies division callback (20 / 5)",
        args: [20, 5, (x, y) => x / y],
        expected: 4
      },
      {
        name: "Applies modulo callback (7 % 3)",
        args: [7, 3, (x, y) => x % y],
        expected: 1
      }
    ],
    hints: [
      "A higher-order function is a function that accepts another function as an argument or returns a function.",
      "Call `operation` as a function passing `a` and `b` as arguments: `operation(a, b)`.",
      "`return operation(a, b);` will return the evaluated result."
    ],
    solution: `function applyOperation(a, b, operation) {
  return operation(a, b);
}`,
    explanation: `\`applyOperation\` is a higher-order function because it accepts a callback function as its \`operation\` parameter, invokes it with \`a\` and \`b\`, and returns the evaluated result.`
  },
  {
    id: 15,
    title: "`map()` + `filter()` + `reduce()`",
    difficulty: "medium",
    category: "Functional Array Methods",
    concepts: ["method chaining", "filter", "map", "reduce", "functional pipeline"],
    type: "function",
    targetFunction: "totalAdultScore",
    description: `Given:

\`\`\`js
const users = [
  { name: "A", age: 17, score: 80 },
  { name: "B", age: 20, score: 90 },
  { name: "C", age: 22, score: 70 },
  { name: "D", age: 16, score: 95 }
];
\`\`\`

Return the sum of the scores of users who are adults (\`age >= 18\`). Use a chain of \`filter()\`, \`map()\`, and \`reduce()\` only.

For the given data, the result is \`160\`.`,
    starterCode: `function totalAdultScore(users) {
  // Chain .filter(), .map(), and .reduce()
  
}`,
    runExamples: [
      {
        args: [[
          { name: "A", age: 17, score: 80 },
          { name: "B", age: 20, score: 90 },
          { name: "C", age: 22, score: 70 },
          { name: "D", age: 16, score: 95 }
        ]],
        label: "totalAdultScore(users)"
      }
    ],
    tests: [
      {
        name: "Calculates total adult score for mixed users (90 + 70 = 160)",
        args: [[
          { name: "A", age: 17, score: 80 },
          { name: "B", age: 20, score: 90 },
          { name: "C", age: 22, score: 70 },
          { name: "D", age: 16, score: 95 }
        ]],
        expected: 160
      },
      {
        name: "Returns 0 when all users are under 18",
        args: [[{ name: "A", age: 15, score: 100 }]],
        expected: 0
      },
      {
        name: "Calculates sum when all users are adults",
        args: [[
          { name: "A", age: 18, score: 50 },
          { name: "B", age: 19, score: 50 }
        ]],
        expected: 100
      },
      {
        name: "Handles empty array",
        args: [[]],
        expected: 0
      }
    ],
    hints: [
      "Step 1: Use `.filter(user => user.age >= 18)` to keep only adult users.",
      "Step 2: Chain `.map(user => user.score)` to extract each user's score.",
      "Step 3: Chain `.reduce((sum, score) => sum + score, 0)` to sum all scores."
    ],
    solution: `function totalAdultScore(users) {
  return users
    .filter(function (user) {
      return user.age >= 18;
    })
    .map(function (user) {
      return user.score;
    })
    .reduce(function (sum, score) {
      return sum + score;
    }, 0);
}`,
    explanation: `Method chaining pipes the output of one array method into the next. \`.filter()\` selects adult users, \`.map()\` extracts their score numbers, and \`.reduce()\` sums the scores starting with initial value 0.`
  },
  {
    id: 16,
    title: "Remove Duplicates",
    difficulty: "medium",
    category: "Arrays & Algorithms",
    concepts: ["arrays", "deduplication", "filter", "indexOf"],
    type: "function",
    targetFunction: "removeDuplicates",
    description: `Write a function \`removeDuplicates(arr)\` that returns a new array containing each value only once.

### Example:
\`\`\`js
removeDuplicates([1, 2, 2, 3, 1, 4])
// [1, 2, 3, 4]
\`\`\``,
    starterCode: `function removeDuplicates(arr) {
  // Your code here
  
}`,
    runExamples: [
      {
        args: [[1, 2, 2, 3, 1, 4]],
        label: "removeDuplicates([1, 2, 2, 3, 1, 4])"
      }
    ],
    tests: [
      {
        name: "Removes duplicate numbers [1, 2, 2, 3, 1, 4]",
        args: [[1, 2, 2, 3, 1, 4]],
        expected: [1, 2, 3, 4]
      },
      {
        name: "Removes duplicate strings ['a', 'b', 'a', 'c', 'b']",
        args: [["a", "b", "a", "c", "b"]],
        expected: ["a", "b", "c"]
      },
      {
        name: "Handles empty array []",
        args: [[]],
        expected: []
      },
      {
        name: "Handles array of identical elements [5, 5, 5, 5]",
        args: [[5, 5, 5, 5]],
        expected: [5]
      },
      {
        name: "Leaves already unique array unchanged [1, 2, 3]",
        args: [[1, 2, 3]],
        expected: [1, 2, 3]
      }
    ],
    hints: [
      "`arr.indexOf(value)` always returns the index of the *first* occurrence of that value.",
      "If `arr.indexOf(value) === index`, then this element is being seen for the first time.",
      "Use `arr.filter((value, index) => arr.indexOf(value) === index)`."
    ],
    solution: `function removeDuplicates(arr) {
  return arr.filter(function (value, index) {
    return arr.indexOf(value) === index;
  });
}`,
    explanation: `\`arr.indexOf(value)\` returns the position of the first occurrence of \`value\` in \`arr\`. If the current \`index\` equals the first index, it is kept; duplicate subsequent occurrences have a different index and get filtered out.`
  },
  {
    id: 17,
    title: "Count Vowels",
    difficulty: "medium",
    category: "Strings & Loops",
    concepts: ["strings", "loops", "character analysis", "case insensitivity"],
    type: "function",
    targetFunction: "countVowels",
    description: `Write a function \`countVowels(str)\` that returns the number of vowels (\`a, e, i, o, u\`) in the string. Treat uppercase and lowercase letters as the same.

### Example:
\`\`\`js
countVowels("JavaScript") // 3
\`\`\``,
    starterCode: `function countVowels(str) {
  // Your code here
  
}`,
    runExamples: [
      {
        args: ["JavaScript"],
        label: 'countVowels("JavaScript")'
      }
    ],
    tests: [
      {
        name: "Counts vowels in 'JavaScript' (3)",
        args: ["JavaScript"],
        expected: 3
      },
      {
        name: "Counts vowels in all-vowels uppercase/lowercase 'AEIOUaeiou'",
        args: ["AEIOUaeiou"],
        expected: 10
      },
      {
        name: "Returns 0 for vowel-less word 'rhythm'",
        args: ["rhythm"],
        expected: 0
      },
      {
        name: "Handles empty string ''",
        args: [""],
        expected: 0
      },
      {
        name: "Counts vowels in sentence 'Web Development Term 1'",
        args: ["Web Development Term 1"],
        expected: 6
      }
    ],
    hints: [
      "Define a string of vowels: `const vowels = 'aeiou';`.",
      "Loop through the string characters using a `for` loop or `for...of`.",
      "Convert each character to lowercase with `.toLowerCase()` and check `vowels.includes(...)`."
    ],
    solution: `function countVowels(str) {
  const vowels = "aeiou";
  let count = 0;

  for (let i = 0; i < str.length; i++) {
    if (vowels.includes(str[i].toLowerCase())) {
      count++;
    }
  }

  return count;
}`,
    explanation: `By converting each character to lowercase and checking if it exists in the string \`"aeiou"\`, we count all vowel occurrences regardless of case.`
  },
  {
    id: 18,
    title: "Second Largest Distinct Number",
    difficulty: "medium",
    category: "Arrays & Sorting",
    concepts: ["arrays", "sorting", "distinct values", "deduplication"],
    type: "function",
    targetFunction: "secondLargest",
    description: `Write a function \`secondLargest(nums)\` that returns the second-largest **distinct** number.

### Example:
\`\`\`js
secondLargest([10, 5, 8, 10, 7]) // 8
\`\`\`

You may assume the array contains at least two distinct numbers.`,
    starterCode: `function secondLargest(nums) {
  // Your code here
  
}`,
    runExamples: [
      {
        args: [[10, 5, 8, 10, 7]],
        label: "secondLargest([10, 5, 8, 10, 7])"
      }
    ],
    tests: [
      {
        name: "Finds second largest with duplicate maximum [10, 5, 8, 10, 7]",
        args: [[10, 5, 8, 10, 7]],
        expected: 8
      },
      {
        name: "Finds second largest in two-element array [1, 2]",
        args: [[1, 2]],
        expected: 1
      },
      {
        name: "Handles multiple duplicates [100, 100, 99, 98]",
        args: [[100, 100, 99, 98]],
        expected: 99
      },
      {
        name: "Handles negative numbers [-10, -5, -20, -5, -1]",
        args: [[-10, -5, -20, -5, -1]],
        expected: -5
      },
      {
        name: "Finds second largest in unsorted digits [3, 1, 4, 1, 5, 9, 2, 6, 5]",
        args: [[3, 1, 4, 1, 5, 9, 2, 6, 5]],
        expected: 6
      }
    ],
    hints: [
      "First filter out duplicate numbers so each distinct number appears once.",
      "Sort the unique numbers in descending order using `sort((a, b) => b - a)`.",
      "The second-largest distinct number is at index 1: `unique[1]`."
    ],
    solution: `function secondLargest(nums) {
  const unique = nums.filter(function (value, index) {
    return nums.indexOf(value) === index;
  });

  unique.sort(function (a, b) {
    return b - a;
  });

  return unique[1];
}`,
    explanation: `Removing duplicates ensures that duplicate highest values (e.g. two 10s) do not occupy both first and second place. Sorting descending with \`b - a\` places the highest at index 0 and second-highest at index 1.`
  },
  {
    id: 19,
    title: "Frequency Counter with `reduce()`",
    difficulty: "medium",
    category: "Objects & Reduce",
    concepts: ["objects", "reduce", "frequency map", "dictionary"],
    type: "function",
    targetFunction: "frequency",
    description: `Write a function \`frequency(arr)\` that returns an object containing the frequency of every value.

### Example:
\`\`\`js
frequency(["a", "b", "a", "c", "b", "a"])
// { a: 3, b: 2, c: 1 }
\`\`\``,
    starterCode: `function frequency(arr) {
  // Your code here using reduce
  
}`,
    runExamples: [
      {
        args: [["a", "b", "a", "c", "b", "a"]],
        label: 'frequency(["a", "b", "a", "c", "b", "a"])'
      }
    ],
    tests: [
      {
        name: "Counts character frequencies ['a', 'b', 'a', 'c', 'b', 'a']",
        args: [["a", "b", "a", "c", "b", "a"]],
        expected: { a: 3, b: 2, c: 1 }
      },
      {
        name: "Counts numeric values [1, 2, 2, 3, 3, 3]",
        args: [[1, 2, 2, 3, 3, 3]],
        expected: { 1: 1, 2: 2, 3: 3 }
      },
      {
        name: "Handles empty array []",
        args: [[]],
        expected: {}
      },
      {
        name: "Counts words in array ['apple', 'banana', 'apple']",
        args: [["apple", "banana", "apple"]],
        expected: { apple: 2, banana: 1 }
      }
    ],
    hints: [
      "Use `reduce(callback, {})` with an empty object `{}` as the initial value.",
      "Inside the reducer: check `if (counts[value] === undefined) counts[value] = 1; else counts[value]++;`.",
      "Always return the accumulator `counts` at the end of each iteration."
    ],
    solution: `function frequency(arr) {
  return arr.reduce(function (counts, value) {
    if (counts[value] === undefined) {
      counts[value] = 1;
    } else {
      counts[value]++;
    }

    return counts;
  }, {});
}`,
    explanation: `The initial value of the accumulator is an empty object \`{}\`. For each element, if the key does not exist yet, we set it to 1; otherwise, we increment its count. The accumulated object is returned.`
  },
  {
    id: 20,
    title: "Total Revenue",
    difficulty: "medium",
    category: "Functional Array Methods",
    concepts: ["objects", "filter", "map", "reduce", "business logic"],
    type: "function",
    targetFunction: "totalRevenue",
    description: `Given:

\`\`\`js
const users = [
  { name: "A", active: true, amount: 500 },
  { name: "B", active: false, amount: 800 },
  { name: "C", active: true, amount: 1200 },
  { name: "D", active: true, amount: 300 }
];
\`\`\`

Write \`totalRevenue(users)\` that returns the total monthly payment from active users.

Use a single functional chain with \`filter()\`, \`map()\`, and \`reduce()\`.

### Expected Result:
\`2000\` (500 + 1200 + 300)`,
    starterCode: `function totalRevenue(users) {
  // Chain .filter(), .map(), and .reduce()
  
}`,
    runExamples: [
      {
        args: [[
          { name: "A", active: true, amount: 500 },
          { name: "B", active: false, amount: 800 },
          { name: "C", active: true, amount: 1200 },
          { name: "D", active: true, amount: 300 }
        ]],
        label: "totalRevenue(users)"
      }
    ],
    tests: [
      {
        name: "Sums amounts for active users from example data",
        args: [[
          { name: "A", active: true, amount: 500 },
          { name: "B", active: false, amount: 800 },
          { name: "C", active: true, amount: 1200 },
          { name: "D", active: true, amount: 300 }
        ]],
        expected: 2000
      },
      {
        name: "Returns 0 when all users are inactive",
        args: [[{ name: "A", active: false, amount: 1000 }]],
        expected: 0
      },
      {
        name: "Handles single active user",
        args: [[{ name: "A", active: true, amount: 250 }]],
        expected: 250
      },
      {
        name: "Handles empty array []",
        args: [[]],
        expected: 0
      }
    ],
    hints: [
      "Filter for users where `user.active === true`.",
      "Map each active user to their `user.amount`.",
      "Reduce the amounts to sum them with initial accumulator `0`."
    ],
    solution: `function totalRevenue(users) {
  return users
    .filter(function (user) {
      return user.active === true;
    })
    .map(function (user) {
      return user.amount;
    })
    .reduce(function (total, amount) {
      return total + amount;
    }, 0);
}`,
    explanation: `The pipeline filters for active users (\`user.active === true\`), maps to extract the \`amount\` property of each, and reduces by summing into a total starting at 0.`
  },
  {
    id: 21,
    title: "First Active User",
    difficulty: "medium",
    category: "Functional Array Methods",
    concepts: ["array methods", "find", "null handling", "objects"],
    type: "function",
    targetFunction: "firstActiveUser",
    description: `Given:

\`\`\`js
const users = [
  { id: 1, name: "A", active: false },
  { id: 2, name: "B", active: false },
  { id: 3, name: "C", active: true },
  { id: 4, name: "D", active: true }
];
\`\`\`

Write \`firstActiveUser(users)\` that returns the first active user. If none exists, return \`null\`.`,
    starterCode: `function firstActiveUser(users) {
  // Your code here using find
  
}`,
    runExamples: [
      {
        args: [[
          { id: 1, name: "A", active: false },
          { id: 2, name: "B", active: false },
          { id: 3, name: "C", active: true },
          { id: 4, name: "D", active: true }
        ]],
        label: "firstActiveUser(users)"
      }
    ],
    tests: [
      {
        name: "Finds first active user from list",
        args: [[
          { id: 1, name: "A", active: false },
          { id: 2, name: "B", active: false },
          { id: 3, name: "C", active: true },
          { id: 4, name: "D", active: true }
        ]],
        expected: { id: 3, name: "C", active: true }
      },
      {
        name: "Returns null when no active user is present",
        args: [[{ id: 1, name: "A", active: false }]],
        expected: null
      },
      {
        name: "Returns the first element if it is active",
        args: [[{ id: 1, name: "A", active: true }]],
        expected: { id: 1, name: "A", active: true }
      },
      {
        name: "Returns null for empty array",
        args: [[]],
        expected: null
      }
    ],
    hints: [
      "Use `Array.prototype.find()` to find the first element matching a predicate.",
      "If `find()` finds no match, it returns `undefined`.",
      "Use the fallback `user || null` or a ternary to return `null` instead of `undefined`."
    ],
    solution: `function firstActiveUser(users) {
  const user = users.find(function (user) {
    return user.active === true;
  });

  return user || null;
}`,
    explanation: `\`Array.prototype.find()\` scans the array from left to right and returns the first element satisfying the predicate. If no match is found, \`find()\` yields \`undefined\`, which \`user || null\` converts to \`null\`.`
  },
  {
    id: 22,
    title: "Is There a Teenager?",
    difficulty: "medium",
    category: "Functional Array Methods",
    concepts: ["array methods", "some", "range check", "booleans"],
    type: "function",
    targetFunction: "hasTeen",
    description: `Write \`hasTeen(users)\` that returns \`true\` if at least one user has an age from **13 through 19**, inclusive. Otherwise return \`false\`.

### Examples:
\`\`\`js
hasTeen([{ age: 12 }, { age: 19 }, { age: 25 }]) // true
hasTeen([{ age: 10 }, { age: 20 }, { age: 30 }]) // false
\`\`\``,
    starterCode: `function hasTeen(users) {
  // Your code here using some
  
}`,
    runExamples: [
      {
        args: [[{ age: 12 }, { age: 19 }, { age: 25 }]],
        label: "hasTeen([{ age: 12 }, { age: 19 }, { age: 25 }])"
      }
    ],
    tests: [
      {
        name: "Returns true when a 19-year old is present",
        args: [[{ age: 12 }, { age: 19 }, { age: 25 }]],
        expected: true
      },
      {
        name: "Returns false when no teenager is present",
        args: [[{ age: 10 }, { age: 20 }, { age: 30 }]],
        expected: false
      },
      {
        name: "Returns true for boundary age 13",
        args: [[{ age: 13 }]],
        expected: true
      },
      {
        name: "Returns false for empty array",
        args: [[]],
        expected: false
      }
    ],
    hints: [
      "The `.some()` method tests whether at least one element in the array passes the provided condition.",
      "Check if `user.age >= 13 && user.age <= 19`.",
      "`return users.some(user => user.age >= 13 && user.age <= 19);`."
    ],
    solution: `function hasTeen(users) {
  return users.some(function (user) {
    return user.age >= 13 && user.age <= 19;
  });
}`,
    explanation: `\`Array.prototype.some()\` returns \`true\` as soon as any element satisfies the range condition \`user.age >= 13 && user.age <= 19\`. If none match (or the array is empty), it returns \`false\`.`
  },
  {
    id: 23,
    title: "Are All Users Adults?",
    difficulty: "medium",
    category: "Functional Array Methods",
    concepts: ["array methods", "every", "predicates", "booleans"],
    type: "function",
    targetFunction: "allAdults",
    description: `Write \`allAdults(users)\` that returns \`true\` only when every user is at least \`18\` years old.

### Examples:
\`\`\`js
allAdults([{ age: 18 }, { age: 22 }, { age: 30 }]) // true
allAdults([{ age: 18 }, { age: 17 }, { age: 25 }]) // false
\`\`\``,
    starterCode: `function allAdults(users) {
  // Your code here using every
  
}`,
    runExamples: [
      {
        args: [[{ age: 18 }, { age: 22 }, { age: 30 }]],
        label: "allAdults([{ age: 18 }, { age: 22 }, { age: 30 }])"
      }
    ],
    tests: [
      {
        name: "Returns true when all users are >= 18",
        args: [[{ age: 18 }, { age: 22 }, { age: 30 }]],
        expected: true
      },
      {
        name: "Returns false when one user is 17",
        args: [[{ age: 18 }, { age: 17 }, { age: 25 }]],
        expected: false
      },
      {
        name: "Returns true for single adult",
        args: [[{ age: 21 }]],
        expected: true
      },
      {
        name: "Returns true for empty array (vacuous truth)",
        args: [[]],
        expected: true
      }
    ],
    hints: [
      "The `.every()` method tests whether all elements in the array pass the provided test.",
      "Check if `user.age >= 18`.",
      "`return users.every(user => user.age >= 18);`."
    ],
    solution: `function allAdults(users) {
  return users.every(function (user) {
    return user.age >= 18;
  });
}`,
    explanation: `\`Array.prototype.every()\` returns \`true\` if the callback returns truthy for all items. If even one element fails the test (\`user.age < 18\`), it immediately short-circuits and returns \`false\`.`
  },
  {
    id: 24,
    title: "Majority Element",
    difficulty: "medium",
    category: "Arrays & Algorithms",
    concepts: ["algorithms", "loops", "frequency", "arrays"],
    type: "function",
    targetFunction: "majorityElement",
    description: `Given an array \`nums\`, return the element that appears **more than \`n / 2\` times**. It is guaranteed that such an element exists.

### Example:
\`\`\`js
majorityElement([3, 3, 4, 3, 2, 3, 3]) // 3
\`\`\`

Write a straightforward solution using loops.`,
    starterCode: `function majorityElement(nums) {
  // Your code here
  
}`,
    runExamples: [
      {
        args: [[3, 3, 4, 3, 2, 3, 3]],
        label: "majorityElement([3, 3, 4, 3, 2, 3, 3])"
      }
    ],
    tests: [
      {
        name: "Finds majority element 3 in [3, 3, 4, 3, 2, 3, 3]",
        args: [[3, 3, 4, 3, 2, 3, 3]],
        expected: 3
      },
      {
        name: "Finds majority element 2 in [2, 2, 1, 1, 1, 2, 2]",
        args: [[2, 2, 1, 1, 1, 2, 2]],
        expected: 2
      },
      {
        name: "Handles single element array [1]",
        args: [[1]],
        expected: 1
      },
      {
        name: "Finds majority element 7 in [7, 7, 5, 7, -1, 7, 7]",
        args: [[7, 7, 5, 7, -1, 7, 7]],
        expected: 7
      }
    ],
    hints: [
      "A straightforward approach is to count occurrences of each element with nested loops.",
      "For each element `nums[i]`, count how many times it matches `nums[j]`.",
      "If `count > nums.length / 2`, return `nums[i]`."
    ],
    solution: `function majorityElement(nums) {
  for (let i = 0; i < nums.length; i++) {
    let count = 0;

    for (let j = 0; j < nums.length; j++) {
      if (nums[i] === nums[j]) {
        count++;
      }
    }

    if (count > nums.length / 2) {
      return nums[i];
    }
  }
}`,
    explanation: `The outer loop picks a candidate number, and the inner loop counts how many times it appears in the entire array. Once \`count > nums.length / 2\`, that number is returned.`
  },
  {
    id: 25,
    title: "Missing Number",
    difficulty: "medium",
    category: "Math & Algorithms",
    concepts: ["math", "Gauss summation", "loops", "arrays"],
    type: "function",
    targetFunction: "missingNumber",
    description: `You are given an array containing \`n\` distinct numbers chosen from \`0, 1, 2, ..., n\`. Return the missing number.

### Example:
\`\`\`js
missingNumber([3, 0, 1]) // 2
\`\`\``,
    starterCode: `function missingNumber(nums) {
  // Your code here
  
}`,
    runExamples: [
      {
        args: [[3, 0, 1]],
        label: "missingNumber([3, 0, 1])"
      }
    ],
    tests: [
      {
        name: "Finds missing number in [3, 0, 1]",
        args: [[3, 0, 1]],
        expected: 2
      },
      {
        name: "Finds missing number at end of range [0, 1]",
        args: [[0, 1]],
        expected: 2
      },
      {
        name: "Finds missing number 8 in range 0..9",
        args: [[9, 6, 4, 2, 3, 5, 7, 0, 1]],
        expected: 8
      },
      {
        name: "Handles single element [0] (missing 1)",
        args: [[0]],
        expected: 1
      },
      {
        name: "Handles single element [1] (missing 0)",
        args: [[1]],
        expected: 0
      }
    ],
    hints: [
      "The expected sum of numbers from 0 up to n is `0 + 1 + 2 + ... + n` (or `n * (n + 1) / 2`).",
      "The actual sum is the sum of all elements currently present in `nums`.",
      "The missing number is simply `expectedSum - actualSum`."
    ],
    solution: `function missingNumber(nums) {
  const n = nums.length;
  let expected = 0;
  let actual = 0;

  for (let i = 0; i <= n; i++) {
    expected += i;
  }

  for (let i = 0; i < nums.length; i++) {
    actual += nums[i];
  }

  return expected - actual;
}`,
    explanation: `By comparing the expected sum of all integers from 0 to \`n\` with the actual sum of integers present in \`nums\`, the difference reveals the missing value in O(n) time and O(1) space.`
  },
  {
    id: 26,
    title: "Email Masker",
    difficulty: "hard",
    category: "String Manipulation",
    concepts: ["strings", "slicing", "repeat", "formatting"],
    type: "function",
    targetFunction: "maskEmail",
    description: `Write \`maskEmail(email)\` so that only the first and last characters of the username (the part before \`@\`) remain visible. Replace characters between them with \`*\`. If the username has length \`2\` or less, do not mask it.

### Examples:
\`\`\`text
"john.doe@example.com" → "j******e@example.com"
"ab@example.com"      → "ab@example.com"
"a@example.com"       → "a@example.com"
\`\`\``,
    starterCode: `function maskEmail(email) {
  // Your code here
  
}`,
    runExamples: [
      {
        args: ["john.doe@example.com"],
        label: 'maskEmail("john.doe@example.com")'
      }
    ],
    tests: [
      {
        name: "Masks standard email 'john.doe@example.com'",
        args: ["john.doe@example.com"],
        expected: "j******e@example.com"
      },
      {
        name: "Does not mask 2-letter username 'ab@example.com'",
        args: ["ab@example.com"],
        expected: "ab@example.com"
      },
      {
        name: "Does not mask 1-letter username 'a@example.com'",
        args: ["a@example.com"],
        expected: "a@example.com"
      },
      {
        name: "Masks longer username 'alexander@test.org'",
        args: ["alexander@test.org"],
        expected: "a*******r@test.org"
      },
      {
        name: "Masks 3-letter username 'sam@domain.com'",
        args: ["sam@domain.com"],
        expected: "s*m@domain.com"
      }
    ],
    hints: [
      "Find the index of '@' using `email.indexOf('@')`.",
      "Extract the username with `email.slice(0, atIndex)` and domain with `email.slice(atIndex)`.",
      "If `username.length <= 2`, return `email`. Otherwise build `username[0] + '*'.repeat(username.length - 2) + username[username.length - 1] + domain`."
    ],
    solution: `function maskEmail(email) {
  const atIndex = email.indexOf("@");
  const username = email.slice(0, atIndex);
  const domain = email.slice(atIndex);

  if (username.length <= 2) {
    return email;
  }

  const masked = "*".repeat(username.length - 2);
  return username[0] + masked + username[username.length - 1] + domain;
}`,
    explanation: `We split the email into \`username\` and \`domain\` at the \`@\` index. If username length > 2, we keep the first character (\`username[0]\`), insert \`*\` repeated for the intermediate length (\`username.length - 2\`), append the last username character (\`username[username.length - 1]\`), and attach \`domain\`.`
  },
  {
    id: 27,
    title: "Extract Hashtags",
    difficulty: "hard",
    category: "Strings & Filtering",
    concepts: ["strings", "filter", "map", "split", "startsWith"],
    type: "function",
    targetFunction: "extractHashtags",
    description: `Given a tweet, return an array containing every word that starts with \`#\`, but remove the \`#\` from the returned words.

### Example:
\`\`\`js
extractHashtags("Loving the #sun and #beach vibes")
// ["sun", "beach"]
\`\`\``,
    starterCode: `function extractHashtags(str) {
  // Your code here
  
}`,
    runExamples: [
      {
        args: ["Loving the #sun and #beach vibes"],
        label: 'extractHashtags("Loving the #sun and #beach vibes")'
      }
    ],
    tests: [
      {
        name: "Extracts hashtags from 'Loving the #sun and #beach vibes'",
        args: ["Loving the #sun and #beach vibes"],
        expected: ["sun", "beach"]
      },
      {
        name: "Returns empty array when no hashtags exist",
        args: ["No hashtags here"],
        expected: []
      },
      {
        name: "Extracts multiple consecutive hashtags",
        args: ["#javascript #web #code #exam"],
        expected: ["javascript", "web", "code", "exam"]
      },
      {
        name: "Ignores standalone '#' with no letters",
        args: ["A hashtag alone # should not be returned"],
        expected: []
      }
    ],
    hints: [
      "Split the string into words using `.split(' ')`.",
      "Filter words with `.filter(word => word.startsWith('#') && word.length > 1)`.",
      "Remove the leading '#' using `.map(word => word.slice(1))`."
    ],
    solution: `function extractHashtags(str) {
  return str
    .split(" ")
    .filter(function (word) {
      return word.startsWith("#") && word.length > 1;
    })
    .map(function (word) {
      return word.slice(1);
    });
}`,
    explanation: `\`str.split(" ")\` creates an array of words. \`.filter()\` keeps only tokens starting with \`#\` that have at least one character after the hashtag (\`word.length > 1\`), and \`.map()\` strips the leading character with \`word.slice(1)\`.`
  },
  {
    id: 28,
    title: "Hoisting + Temporal Dead Zone",
    difficulty: "hard",
    category: "Execution & Hoisting",
    concepts: ["hoisting", "temporal dead zone", "let vs var", "scope"],
    type: "function",
    targetFunction: "getValues",
    description: `Write a function \`getValues()\` that returns:

\`\`\`js
[10, 20]
\`\`\`

Use:

- \`var a\` for the first value (\`10\`)
- \`let b\` for the second value (\`20\`)

Initialize both variables **before accessing them**.

Then understand why moving \`console.log(b)\` before the \`let b\` declaration would cause an error (Temporal Dead Zone).`,
    starterCode: `function getValues() {
  // Declare and initialize var a = 10;
  // Declare and initialize let b = 20;
  // Return [a, b];
  
}`,
    runExamples: [
      {
        args: [],
        label: "getValues()"
      }
    ],
    tests: [
      {
        name: "Returns [10, 20] using var and let",
        args: [],
        expected: [10, 20]
      }
    ],
    hints: [
      "Inside `getValues()`, write `var a = 10;`.",
      "On the next line, write `let b = 20;`.",
      "Return `[a, b];`."
    ],
    solution: `function getValues() {
  var a = 10;
  let b = 20;

  return [a, b];
}`,
    explanation: `A \`let\` variable cannot be accessed before its initialization because that part of its scope is in the Temporal Dead Zone (TDZ). Initializing \`var a = 10\` and \`let b = 20\` before returning allows \`[a, b]\` to evaluate to \`[10, 20]\`.`
  },
  {
    id: 29,
    title: "Function Composition",
    difficulty: "hard",
    category: "Functional Programming",
    concepts: ["higher-order functions", "composition", "closures"],
    type: "function",
    targetFunction: "compose3",
    description: `Create three functions:

1. \`trimName(name)\` → removes leading/trailing spaces.
2. \`toUpper(name)\` → converts the name to uppercase.
3. \`addGreeting(name)\` → returns \`"Hello, NAME!"\`.

Then create a higher-order function \`compose3(fn1, fn2, fn3)\` that returns a new function applying them from left to right.

### Example:
\`\`\`js
const greet = compose3(trimName, toUpper, addGreeting);

console.log(greet("  sam  "));
// Hello, SAM!
\`\`\``,
    starterCode: `function trimName(name) {
  // Remove leading and trailing spaces
}

function toUpper(name) {
  // Convert the name to uppercase
}

function addGreeting(name) {
  // Return "Hello, NAME!"
}

function compose3(fn1, fn2, fn3) {
  // Return a new function.
  // The returned function should apply fn1, then fn2, then fn3.
}`,
    runExamples: [
      {
        customRun: `(function(userExports) {
          if (typeof userExports.compose3 === 'function') {
            const greet = userExports.compose3(userExports.trimName, userExports.toUpper, userExports.addGreeting);
            return greet("  sam  ");
          }
          return "Please implement compose3";
        })`,
        label: 'compose3(trimName, toUpper, addGreeting)("  sam  ")'
      }
    ],
    tests: [
      {
        name: "Composes trimName -> toUpper -> addGreeting on '  sam  '",
        customCheck: `(function(userCode) {
          const fn = userCode.compose3(userCode.trimName, userCode.toUpper, userCode.addGreeting);
          return fn("  sam  ") === "Hello, SAM!";
        })`,
        argsDesc: "compose3(trimName, toUpper, addGreeting)('  sam  ')",
        expected: "Hello, SAM!"
      },
      {
        name: "Composes mathematical operations (+1 -> *2 -> -3) on 5",
        customCheck: `(function(userCode) {
          const fn = userCode.compose3(x => x + 1, x => x * 2, x => x - 3);
          return fn(5) === 9;
        })`,
        argsDesc: "compose3(x => x+1, x => x*2, x => x-3)(5)",
        expected: 9
      },
      {
        name: "Composes string operations on 'Hello World'",
        customCheck: `(function(userCode) {
          const fn = userCode.compose3(s => s.toLowerCase(), s => s.replace(" ", "_"), s => "@" + s);
          return fn("Hello World") === "@hello_world";
        })`,
        argsDesc: "compose3(toLowerCase, replaceSpace, addAt)('Hello World')",
        expected: "@hello_world"
      }
    ],
    hints: [
      "`compose3` should return a new function: `return function(value) { ... }`.",
      "Inside the returned function, pass `value` through `fn1`, then pass that result to `fn2`, and finally to `fn3`.",
      "`return fn3(fn2(fn1(value)));`."
    ],
    solution: `function trimName(name) {
  return name.trim();
}

function toUpper(name) {
  return name.toUpperCase();
}

function addGreeting(name) {
  return "Hello, " + name + "!";
}

function compose3(fn1, fn2, fn3) {
  return function (value) {
    return fn3(fn2(fn1(value)));
  };
}

const greet = compose3(trimName, toUpper, addGreeting);

console.log(greet("  sam  "));
// Hello, SAM!`,
    explanation: `Function composition combines simple functions into a unified pipeline. \`compose3\` returns a closure that receives an initial value, invokes \`fn1\`, feeds its result into \`fn2\`, and passes that result into \`fn3\`.`
  },
  {
    id: 30,
    title: "User Data Processing Challenge",
    difficulty: "hard",
    category: "Comprehensive Challenge",
    concepts: ["map", "filter", "reduce", "find", "some", "every", "objects"],
    type: "function",
    targetFunction: "processUsers",
    description: `Given:

\`\`\`js
const users = [
  { id: 1, name: "alice", age: 17, active: false },
  { id: 2, name: "bob", age: 21, active: true },
  { id: 3, name: "charlie", age: 19, active: false },
  { id: 4, name: "diana", age: 26, active: true }
];
\`\`\`

Write \`processUsers(users)\` that returns an object with:

- \`namesUppercase\` → all names in uppercase
- \`adults\` → users whose age is at least 18
- \`totalAge\` → sum of all ages
- \`firstActiveUser\` → first active user, or \`null\`
- \`hasTeen\` → \`true\` if at least one user is between 13 and 19
- \`allAdults\` → \`true\` only if every user is at least 18

Try to use the appropriate array methods.`,
    starterCode: `function processUsers(users) {
  // Process the users array and return the required object.

  // 1. Get all names in uppercase.
  // 2. Get users whose age is at least 18.
  // 3. Calculate the sum of all ages.
  // 4. Find the first active user, or null.
  // 5. Check whether at least one user is between 13 and 19.
  // 6. Check whether every user is an adult.

  return {
    namesUppercase: /* implement */,
    adults: /* implement */,
    totalAge: /* implement */,
    firstActiveUser: /* implement */,
    hasTeen: /* implement */,
    allAdults: /* implement */
  };
}`,
    runExamples: [
      {
        args: [[
          { id: 1, name: "alice", age: 17, active: false },
          { id: 2, name: "bob", age: 21, active: true },
          { id: 3, name: "charlie", age: 19, active: false },
          { id: 4, name: "diana", age: 26, active: true }
        ]],
        label: "processUsers(users)"
      }
    ],
    tests: [
      {
        name: "Processes standard 4-user dataset",
        args: [[
          { id: 1, name: "alice", age: 17, active: false },
          { id: 2, name: "bob", age: 21, active: true },
          { id: 3, name: "charlie", age: 19, active: false },
          { id: 4, name: "diana", age: 26, active: true }
        ]],
        expected: {
          namesUppercase: ["ALICE", "BOB", "CHARLIE", "DIANA"],
          adults: [
            { id: 2, name: "bob", age: 21, active: true },
            { id: 3, name: "charlie", age: 19, active: false },
            { id: 4, name: "diana", age: 26, active: true }
          ],
          totalAge: 83,
          firstActiveUser: { id: 2, name: "bob", age: 21, active: true },
          hasTeen: true,
          allAdults: false
        }
      },
      {
        name: "Processes all-adults dataset with allActive",
        args: [[
          { id: 1, name: "tom", age: 20, active: true },
          { id: 2, name: "jerry", age: 30, active: false }
        ]],
        expected: {
          namesUppercase: ["TOM", "JERRY"],
          adults: [
            { id: 1, name: "tom", age: 20, active: true },
            { id: 2, name: "jerry", age: 30, active: false }
          ],
          totalAge: 50,
          firstActiveUser: { id: 1, name: "tom", age: 20, active: true },
          hasTeen: false,
          allAdults: true
        }
      },
      {
        name: "Processes dataset with no active users and all teens",
        args: [[
          { id: 1, name: "ana", age: 14, active: false }
        ]],
        expected: {
          namesUppercase: ["ANA"],
          adults: [],
          totalAge: 14,
          firstActiveUser: null,
          hasTeen: true,
          allAdults: false
        }
      }
    ],
    hints: [
      "Use `users.map(u => u.name.toUpperCase())` for `namesUppercase`.",
      "Use `users.filter(u => u.age >= 18)` for `adults`.",
      "Use `users.reduce((sum, u) => sum + u.age, 0)` for `totalAge`.",
      "Use `users.find(u => u.active === true) || null` for `firstActiveUser`.",
      "Use `users.some(u => u.age >= 13 && u.age <= 19)` for `hasTeen`.",
      "Use `users.every(u => u.age >= 18)` for `allAdults`."
    ],
    solution: `function processUsers(users) {
  return {
    namesUppercase: users.map(function (user) {
      return user.name.toUpperCase();
    }),

    adults: users.filter(function (user) {
      return user.age >= 18;
    }),

    totalAge: users.reduce(function (sum, user) {
      return sum + user.age;
    }, 0),

    firstActiveUser: users.find(function (user) {
      return user.active === true;
    }) || null,

    hasTeen: users.some(function (user) {
      return user.age >= 13 && user.age <= 19;
    }),

    allAdults: users.every(function (user) {
      return user.age >= 18;
    })
  };
}`,
    explanation: `This problem brings together all fundamental array methods: map (transformation), filter (selection), reduce (aggregation), find (search), some (existential test), and every (universal test) to assemble a rich reporting payload.`
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { questions };
}
