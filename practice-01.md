# JavaScript Practice Sheet — Part 1

**Questions 1–15 · Easy → Medium**

> **Pattern:** Questions are written in the same short, practical style as the previous year's Web Development exam: predict output, write a small function, and solve focused JavaScript problems.  
> **Format:** Answer is placed directly below each question for quick self-checking.

---

## Question 1 — Data Types and Operations

Write a function `describeValues(a, b)` that returns an object containing:

- `addition` → result of `a + b`
- `subtraction` → result of `a - b`
- `typeA` → result of `typeof a`
- `typeB` → result of `typeof b`

Use the values directly without converting them first.

Example:

```js
describeValues(10, "5")
// {
//   addition: "105",
//   subtraction: 5,
//   typeA: "number",
//   typeB: "string"
// }
```

### Answer

```js
function describeValues(a, b) {
  return {
    addition: a + b,
    subtraction: a - b,
    typeA: typeof a,
    typeB: typeof b
  };
}
```

---

## Question 2 — Variables and Reassignment

Write a function `updateScore(score)` that:

1. adds `10` to `score`
2. multiplies the result by `2`
3. subtracts `5`
4. returns the final value

Example:

```js
updateScore(20) // 55
```

### Answer

```js
function updateScore(score) {
  score += 10;
  score *= 2;
  score -= 5;
  return score;
}
```

---

## Question 3 — Array Access and Update

Write a function `updateFirst(arr, value)` that replaces the first element of an array with `value` and returns the array.

Example:

```js
updateFirst([10, 20, 30], 99)
// [99, 20, 30]
```

### Answer

```js
function updateFirst(arr, value) {
  arr[0] = value;
  return arr;
}
```

---

## Question 4 — String Processing

Write a function `countCharacters(str)` that returns the number of characters in a string.

Example:

```js
countCharacters("hello") // 5
```

### Answer

```js
function countCharacters(str) {
  return str.length;
}
```

---

## Question 5 — Function Basics

Write a function `isEven(num)` that returns `true` if `num` is even and `false` otherwise.

### Answer

```js
function isEven(num) {
  return num % 2 === 0;
}
```

---

## Question 6 — `var` and Hoisting

Write a function `getScore()` that uses `var` and returns `10`.

Place the `var` declaration at the top of the function and initialize it before returning the value.

Then call:

```js
getScore() // 10
```

The goal is to practice the difference between a variable declaration and its initialization.

### Answer

```js
function getScore() {
  var score;
  score = 10;
  return score;
}
```

With `var`, the declaration is hoisted, but the value is assigned only when the assignment statement executes.

---

## Question 7 — Function Declaration Hoisting

Write a function `runGreeting(name)` that calls a function named `sayHello(name)`.

Keep the `sayHello` function declaration **below** `runGreeting` in your code.

Example:

```js
runGreeting("Sam")
// Hello Sam
```

This is meant to practice function declaration hoisting.

### Answer

```js
function runGreeting(name) {
  return sayHello(name);
}

function sayHello(name) {
  return "Hello " + name;
}
```

Function declarations are hoisted, so `runGreeting` can call `sayHello` even though the declaration appears later in the source.

---

## Question 8 — Execution Order and Call Stack

Write a function `getExecutionOrder()` that uses two nested function calls to return this exact array:

```js
[
  "first",
  "second",
  "first again",
  "done"
]
```

Requirements:

- `first()` should add `"first"`
- `first()` should call `second()`
- `second()` should add `"second"`
- after `second()` returns, `first()` should add `"first again"`
- after `first()` finishes, add `"done"`

### Answer

```js
function getExecutionOrder() {
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
}
```

---

## Question 9 — `map()` Transformation

Write a function `doubleNumbers(nums)` that returns a new array containing every number multiplied by `2`.

Example:

```js
doubleNumbers([1, 2, 3, 4])
// [2, 4, 6, 8]
```

### Answer

```js
function doubleNumbers(nums) {
  return nums.map(function (num) {
    return num * 2;
  });
}
```

---

## Question 10 — `filter()` Selection

Write a function `getAdults(users)` that returns only users whose `age` is at least `18`.

Example:

```js
const users = [
  { name: "A", age: 17 },
  { name: "B", age: 21 },
  { name: "C", age: 18 }
];
```

Expected result:

```js
[
  { name: "B", age: 21 },
  { name: "C", age: 18 }
]
```

### Answer

```js
function getAdults(users) {
  return users.filter(function (user) {
    return user.age >= 18;
  });
}
```

---

## Question 11 — `reduce()` Sum

Write a function `total(nums)` that returns the sum of all numbers using `reduce()`.

Example:

```js
total([10, 20, 30]) // 60
```

### Answer

```js
function total(nums) {
  return nums.reduce(function (sum, num) {
    return sum + num;
  }, 0);
}
```

---

## Question 12 — Pure or Impure?

Consider these two functions:

```js
function add(a, b) {
  return a + b;
}

let total = 0;
function addToTotal(value) {
  total += value;
  return total;
}
```

Which function is pure and which is impure? Explain why.

### Answer

`add()` is **pure** because it depends only on its arguments and does not change external state.

`addToTotal()` is **impure** because it reads and modifies the external variable `total`.

---

## Question 13 — First-Class Functions

Write a function `runGreeting(greetingFunction, name)` that accepts a function as an argument and returns the result of calling that function with `name`.

Also write `greet(name)` that returns `"Hello " + name`.

Example:

```js
runGreeting(greet, "Sam")
// "Hello Sam"
```

This practices treating a function as a value that can be stored in a variable or passed to another function.

### Answer

```js
function greet(name) {
  return "Hello " + name;
}

function runGreeting(greetingFunction, name) {
  return greetingFunction(name);
}
```

---

## Question 14 — Higher-Order Function

Write a function `applyOperation(a, b, operation)` that takes two numbers and a function, then returns the result of calling that function with `a` and `b`.

Example:

```js
applyOperation(10, 5, function (x, y) {
  return x - y;
});

// 5
```

### Answer

```js
function applyOperation(a, b, operation) {
  return operation(a, b);
}
```

---

## Question 15 — `map()` + `filter()` + `reduce()`

Given:

```js
const users = [
  { name: "A", age: 17, score: 80 },
  { name: "B", age: 20, score: 90 },
  { name: "C", age: 22, score: 70 },
  { name: "D", age: 16, score: 95 }
];
```

Return the sum of the scores of users who are adults (`age >= 18`). Use a chain of `filter()`, `map()`, and `reduce()` only.

### Answer

```js
function totalAdultScore(users) {
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
}
```

For the given data, the result is `160`.
