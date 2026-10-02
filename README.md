# JavaScript Term 1 Practice Platform

An interactive, frontend-only coding practice platform designed for students preparing for their Web Development Term 1 JavaScript exam.

Live practice covering 30 practical questions curated from `practice-01.md` and `practice-02.md`, spanning data types, variables, execution contexts, hoisting, call stack, higher-order functions, functional pipelines (`map`, `filter`, `reduce`, `find`, `some`, `every`), algorithms, and object transformations.

---

## 🚀 Features

- **30 Practical Exam Questions**: Easy, Medium, and Hard progression matching previous exam patterns.
- **In-Browser Code Execution & Sandboxing**: Execute student JavaScript code securely inside Web Workers with execution timeouts (2.5s) to guard against accidental infinite loops.
- **Automated Test Case Runner**: Rigorous test suites with deep assertions, parameter cloning, and clear pass/fail diffs for every question.
- **Integrated CodeMirror Editor**: Full syntax highlighting, line numbering, bracket matching, and tab indentations.
- **Progressive Hint System**: 3-tier progressive hints (Hint 1 → Hint 2 → Hint 3) that unlock step-by-step.
- **Official Solutions & "Why This Works" Explanations**: Accessible reference answers directly derived from the exam review sheets.
- **Offline & Local Persistence**: Stores solved questions, custom written code, hint unlocks, and theme settings in `localStorage`.
- **Search & Filter**: Filter questions by difficulty (*Easy*, *Medium*, *Hard*), status (*Solved*, *Unsolved*), or text/concept search.
- **Modern Developer UI**: LeetCode/VS-Code-inspired clean dark mode theme with light mode toggle and full mobile responsiveness.
- **100% Static & Zero Backend**: Completely deployable on GitHub Pages with zero servers, databases, or API keys needed.

---

## 💻 Tech Stack

- **HTML5 & CSS3** (Custom Modern Developer Dark/Light Theme with CSS Grid & Flexbox)
- **Vanilla JavaScript (ES6+)** (No React, Next.js, Node.js server, or external build steps required)
- **CodeMirror 5** (Lightweight CDN editor with JavaScript mode)
- **Lucide Icons** (Crisp, modern SVG icons)
- **Canvas-Confetti** (Lightweight milestone celebration effect)

---

## 🏃 Running Locally

Since the application is 100% static, you can run it using any local static file server:

### Option 1: Python HTTP Server
```bash
# Python 3
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your web browser.

### Option 2: Node `npx serve` or `npx live-server`
```bash
npx serve .
```

### Option 3: VS Code Live Server Extension
Right-click `index.html` in VS Code and select **"Open with Live Server"**.

---

## 🧪 How the Code Checker & Sandbox Work

1. **Web Worker Sandboxing**: When the student clicks **"Run Code"** or **"Check Code"**, the code is passed to an isolated Web Worker.
2. **Console Interception**: `console.log`, `console.info`, `console.warn`, and `console.error` calls are captured, formatted, and streamed to the user's Console Output tab.
3. **Infinite Loop Protection**: If user code enters an infinite loop or runs longer than 2.5 seconds, the worker is automatically terminated and a friendly timeout notification is displayed.
4. **Deep Equality Verification**: Function test suites clone argument objects (preventing mutation contamination) and compare return values using a recursive `deepEqual` assertion engine.
5. **Output Verification**: For output prediction and hoisting questions, captured console logs are compared line-by-line with expected output.

---

## 🔒 Architecture & Security Note

This platform is a **client-side educational practice tool** meant for self-paced learning and exam preparation. Because all JavaScript runs client-side in the student's browser:
- Test cases and reference solutions reside on the client.
- It is designed for learning and self-assessment, not for proctored or high-stakes examination grading.

---

## 🌐 Deploying to GitHub Pages

1. Push this repository to your GitHub account:
   ```bash
   git add .
   git commit -m "Deploy JS Practice Platform"
   git push origin main
   ```
2. Navigate to your repository on GitHub:
   - Click **Settings** > **Pages** (under Code and automation in the left sidebar).
   - Under **Build and deployment** > **Source**, select **Deploy from a branch**.
   - Select `main` (or `master`) branch and folder `/ (root)`.
   - Click **Save**.
3. Your site will be published at `https://<username>.github.io/<repository-name>/`.

---

## 📁 Project Structure

```
/
├── index.html         # Main application markup & layout
├── styles.css         # Styling, dark/light theme, and responsive grid
├── app.js             # UI controller, state sync & event handling
├── questions.js       # Complete 30-question dataset with test suites & hints
├── runner.js          # Web Worker sandbox, deepEqual assertions & execution engine
├── test_verify.js     # Automated verification script testing all 30 solutions
└── README.md          # Documentation & deployment guide
```
