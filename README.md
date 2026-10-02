# JS Practice — Term 1

A browser-based JavaScript practice platform for Term 1 exam preparation.

🌐 **Live Deployed Application**: [https://sanyam2509-tech.github.io/Js-practice-ques-term1/](https://sanyam2509-tech.github.io/Js-practice-ques-term1/)

---

## 📖 Overview

This is a static, browser-based coding practice platform designed to help students master core JavaScript concepts and prepare for Web Development Term 1 examinations.

All 30 practical questions are curated directly from `practice-01.md` and `practice-02.md`, covering:
- Data Types, Type Coercion & Operations
- Variable Scoping, Hoisting & Temporal Dead Zone (`var`, `let`, `const`)
- Functions, Call Stack & Execution Contexts
- Higher-Order Functions & First-Class Citizens
- Array Methods & Functional Pipelines (`map`, `filter`, `reduce`, `find`, `some`, `every`)
- Practical Algorithmic Problem Solving (Frequency counters, second largest, majority element, missing number, string masking, hashtag extraction, function composition)

---

## 🚀 Key Features

- **30 Practice Questions**: Curated across Easy (14), Medium (11), and Hard (5) difficulty levels.
- **In-Browser Coding Editor**: CodeMirror integration with JavaScript syntax highlighting, line numbers, and auto-closing brackets.
- **Run Code**: Instantly execute student code against sample inputs and see immediate return values and formatted `console.log()` streams.
- **Check Code**: Automated test runner executing multi-case test suites with parameter isolation and deep equality assertions.
- **Progressive Hints**: Step-by-step guidance (Hint 1 → Hint 2 → Hint 3) to guide students without spoiling answers.
- **Official Solutions & Explanations**: Reference answers and "Why This Works" breakdowns hidden behind confirmation modals with one-click clipboard copy.
- **Scaffolded Starter Code**: Minimal starting templates with function signatures and guide comments (never giving away the solution).
- **Web Worker Execution Sandbox**: Safe execution isolated in Web Workers with 2.5s infinite-loop protection.
- **Local Progress Persistence**: Solved state, editor code, hint unlocks, and theme settings automatically persist in `localStorage`.
- **Light / Dark Themes**: Clean, high-contrast light theme default with instant dark mode toggle.
- **100% Static Frontend**: Zero backend, zero node server, zero database, zero external build steps — fully hosted on GitHub Pages.

---

## 💻 Tech Stack

- **HTML5 & CSS3** (CSS Grid, Flexbox, CSS Custom Properties)
- **Vanilla JavaScript (ES6+)**
- **CodeMirror 5** (Editor via CDN)
- **Lucide Icons** (UI icons via CDN)
- **Canvas-Confetti** (Milestone celebrations via CDN)

---

## 🏃 Running Locally

Clone the repository and serve statically:

```bash
# Clone repository
git clone https://github.com/sanyam2509-tech/Js-practice-ques-term1.git
cd Js-practice-ques-term1

# Option 1: Python HTTP Server
python3 -m http.server 8000

# Option 2: Node npx serve
npx serve .
```

Then visit `http://localhost:8000` in your web browser.

---

## 🧪 Automated Solution Verification

To verify that all 30 questions pass their official solutions against their test suites:

```bash
node test_verify.js
```

---

## 📁 Repository Structure

```
.
├── index.html         # Main application layout & structure
├── styles.css         # Clean light/dark developer styling & responsiveness
├── app.js             # Application controller, state management, UI sync
├── questions.js       # 30-question dataset with scaffolding, test suites & hints
├── runner.js          # In-browser Web Worker runner with deepEqual assertions
├── test_verify.js     # CLI verification script testing all 30 questions
├── practice-01.md     # Source-of-truth Question Sheet Part 1
├── practice-02.md     # Source-of-truth Question Sheet Part 2
└── README.md          # Project documentation & live deployment link
```
