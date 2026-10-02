# JavaScript Practice Sheet — Part 2

**Questions 16–30 · Medium → Hard**

> **Pattern:** These questions move closer to the previous year's exam style: practical array/string manipulation, object processing, execution and hoisting, and functional-programming pipelines.

---

## Question 16 — Remove Duplicates

Write a function `removeDuplicates(arr)` that returns a new array containing each value only once.

Example:

```js
removeDuplicates([1, 2, 2, 3, 1, 4])
// [1, 2, 3, 4]
```

### Answer

```js
function removeDuplicates(arr) {
  return arr.filter(function (value, index) {
    return arr.indexOf(value) === index;
  });
}
```

---

## Question 17 — Count Vowels

Write a function `countVowels(str)` that returns the number of vowels (`a, e, i, o, u`) in the string. Treat uppercase and lowercase letters as the same.

Example:

```js
countVowels("JavaScript") // 3
```

### Answer

```js
function countVowels(str) {
  const vowels = "aeiou";
  let count = 0;

  for (let i = 0; i < str.length; i++) {
    if (vowels.includes(str[i].toLowerCase())) {
      count++;
    }
  }

  return count;
}
```

---

## Question 18 — Second Largest Distinct Number

Write a function `secondLargest(nums)` that returns the second-largest **distinct** number.

Example:

```js
secondLargest([10, 5, 8, 10, 7]) // 8
```

You may assume the array contains at least two distinct numbers.

### Answer

```js
function secondLargest(nums) {
  const unique = nums.filter(function (value, index) {
    return nums.indexOf(value) === index;
  });

  unique.sort(function (a, b) {
    return b - a;
  });

  return unique[1];
}
```

---

## Question 19 — Frequency Counter with `reduce()`

Write a function `frequency(arr)` that returns an object containing the frequency of every value.

Example:

```js
frequency(["a", "b", "a", "c", "b", "a"])
// { a: 3, b: 2, c: 1 }
```

### Answer

```js
function frequency(arr) {
  return arr.reduce(function (counts, value) {
    if (counts[value] === undefined) {
      counts[value] = 1;
    } else {
      counts[value]++;
    }

    return counts;
  }, {});
}
```

---

## Question 20 — Total Revenue

Given:

```js
const users = [
  { name: "A", active: true, amount: 500 },
  { name: "B", active: false, amount: 800 },
  { name: "C", active: true, amount: 1200 },
  { name: "D", active: true, amount: 300 }
];
```

Write `totalRevenue(users)` that returns the total monthly payment from active users.

Use a single functional chain with `filter()`, `map()`, and `reduce()`.

### Answer

```js
function totalRevenue(users) {
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
}
```

Result:

```text
2000
```

---

## Question 21 — First Active User

Given:

```js
const users = [
  { id: 1, name: "A", active: false },
  { id: 2, name: "B", active: false },
  { id: 3, name: "C", active: true },
  { id: 4, name: "D", active: true }
];
```

Write `firstActiveUser(users)` that returns the first active user. If none exists, return `null`.

### Answer

```js
function firstActiveUser(users) {
  const user = users.find(function (user) {
    return user.active === true;
  });

  return user || null;
}
```

---

## Question 22 — Is There a Teenager?

Write `hasTeen(users)` that returns `true` if at least one user has an age from **13 through 19**, inclusive. Otherwise return `false`.

### Answer

```js
function hasTeen(users) {
  return users.some(function (user) {
    return user.age >= 13 && user.age <= 19;
  });
}
```

---

## Question 23 — Are All Users Adults?

Write `allAdults(users)` that returns `true` only when every user is at least `18` years old.

### Answer

```js
function allAdults(users) {
  return users.every(function (user) {
    return user.age >= 18;
  });
}
```

---

## Question 24 — Majority Element

Given an array `nums`, return the element that appears **more than `n / 2` times**. It is guaranteed that such an element exists.

Example:

```js
majorityElement([3, 3, 4, 3, 2, 3, 3]) // 3
```

Write a straightforward solution using loops.

### Answer

```js
function majorityElement(nums) {
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
}
```

---

## Question 25 — Missing Number

You are given an array containing `n` distinct numbers chosen from `0, 1, 2, ..., n`. Return the missing number.

Example:

```js
missingNumber([3, 0, 1]) // 2
```

### Answer

```js
function missingNumber(nums) {
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
}
```

---

## Question 26 — Email Masker

Write `maskEmail(email)` so that only the first and last characters of the username (the part before `@`) remain visible. Replace characters between them with `*`. If the username has length `2` or less, do not mask it.

Examples:

```text
"john.doe@example.com" → "j******e@example.com"
"ab@example.com"      → "ab@example.com"
"a@example.com"       → "a@example.com"
```

### Answer

```js
function maskEmail(email) {
  const atIndex = email.indexOf("@");
  const username = email.slice(0, atIndex);
  const domain = email.slice(atIndex);

  if (username.length <= 2) {
    return email;
  }

  const masked = "*".repeat(username.length - 2);
  return username[0] + masked + username[username.length - 1] + domain;
}
```

---

## Question 27 — Extract Hashtags

Given a tweet, return an array containing every word that starts with `#`, but remove the `#` from the returned words.

Example:

```js
extractHashtags("Loving the #sun and #beach vibes")
// ["sun", "beach"]
```

### Answer

```js
function extractHashtags(str) {
  return str
    .split(" ")
    .filter(function (word) {
      return word.startsWith("#") && word.length > 1;
    })
    .map(function (word) {
      return word.slice(1);
    });
}
```

---

## Question 28 — Hoisting + Temporal Dead Zone

Write a function `getValues()` that returns:

```js
[10, 20]
```

Use:

- `var a` for the first value
- `let b` for the second value

Initialize both variables **before accessing them**.

Then briefly explain why moving `console.log(b)` before the `let b` declaration would cause an error.

### Answer

```js
function getValues() {
  var a = 10;
  let b = 20;

  return [a, b];
}
```

A `let` variable cannot be accessed before its initialization because that part of its scope is the temporal dead zone.

---

## Question 29 — Function Composition

Create three functions:

1. `trimName(name)` → removes leading/trailing spaces.
2. `toUpper(name)` → converts the name to uppercase.
3. `addGreeting(name)` → returns `"Hello, NAME!"`.

Then create a higher-order function `compose3(fn1, fn2, fn3)` that returns a new function applying them from left to right.

Example:

```js
const greet = compose3(trimName, toUpper, addGreeting);

console.log(greet("  sam  "));
// Hello, SAM!
```

### Answer

```js
function trimName(name) {
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
// Hello, SAM!
```

---

## Question 30 — User Data Processing Challenge

Given:

```js
const users = [
  { id: 1, name: "alice", age: 17, active: false },
  { id: 2, name: "bob", age: 21, active: true },
  { id: 3, name: "charlie", age: 19, active: false },
  { id: 4, name: "diana", age: 26, active: true }
];
```

Write `processUsers(users)` that returns an object with:

- `namesUppercase` → all names in uppercase
- `adults` → users whose age is at least 18
- `totalAge` → sum of all ages
- `firstActiveUser` → first active user, or `null`
- `hasTeen` → `true` if at least one user is between 13 and 19
- `allAdults` → `true` only if every user is at least 18

Try to use the appropriate array methods.

### Answer

```js
function processUsers(users) {
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
}
```

For the given data:

```js
{
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
```
