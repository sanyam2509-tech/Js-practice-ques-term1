# JavaScript Practice Sheet — Part 1

**Questions 1–15 · Easy → Medium**

> **Pattern:** Questions are written in the same short, practical style as the previous year's Web Development exam: predict output, write a small function, and solve focused JavaScript problems.  
> **Format:** Answer is placed directly below each question for quick self-checking.

---

## Question 1 — Data Types and Operations

What is printed?

```js
let a = 10;
let b = "5";

console.log(a + b);
console.log(a - b);
console.log(typeof a);
console.log(typeof b);
```

### Answer

```text
105
5
number
string
```

---

## Question 2 — Variables and Reassignment

What is the final value of `score`?

```js
let score = 20;
score += 10;
score *= 2;
score -= 5;

console.log(score);
```

### Answer

```text
55
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

## Question 6 — `var` Hoisting

What is printed?

```js
console.log(x);
var x = 10;
console.log(x);
```

### Answer

```text
undefined
10
```

The `var` declaration is hoisted, but the assignment happens when execution reaches `x = 10`.

---

## Question 7 — Function Declaration Hoisting

What is printed?

```js
sayHello();

function sayHello() {
  console.log("Hello");
}
```

### Answer

```text
Hello
```

---

## Question 8 — Execution Order and Call Stack

What is the output order?

```js
function first() {
  console.log("first");
  second();
  console.log("first again");
}

function second() {
  console.log("second");
}

first();
console.log("done");
```

### Answer

```text
first
second
first again
done
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

What is printed?

```js
function greet(name) {
  return "Hello " + name;
}

const fn = greet;

console.log(fn("Sam"));
```

### Answer

```text
Hello Sam
```

A function can be stored in a variable just like other values.

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
