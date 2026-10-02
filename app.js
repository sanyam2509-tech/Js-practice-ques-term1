// JavaScript Practice Platform - Main Application Controller

document.addEventListener("DOMContentLoaded", () => {
  // Application State & Storage
  const STORAGE_PREFIX = "js_practice_";
  
  const state = {
    solved: loadStorage("solved", []),
    currentQuestionId: loadStorage("current_q", 1),
    code: loadStorage("code", {}),
    hintsRevealed: loadStorage("hints", {}),
    solutionViewed: loadStorage("solution_viewed", {}),
    quizSelections: loadStorage("quiz_selections", {}),
    activeFilter: "all",
    searchQuery: "",
    activeTab: "testResults",
    theme: localStorage.getItem(STORAGE_PREFIX + "theme") || "light"
  };

  const runner = new CodeRunner();
  let editor = null;
  let codeChangeDebounce = null;

  // DOM Elements
  const els = {
    // Header
    progressFill: document.getElementById("progressFill"),
    progressCounter: document.getElementById("progressCounter"),
    statEasy: document.getElementById("statEasy"),
    statMed: document.getElementById("statMed"),
    statHard: document.getElementById("statHard"),
    resetAllBtn: document.getElementById("resetAllBtn"),
    themeToggleBtn: document.getElementById("themeToggleBtn"),
    themeIcon: document.getElementById("themeIcon"),
    mobileMenuBtn: document.getElementById("mobileMenuBtn"),

    // Sidebar
    sidebar: document.getElementById("sidebar"),
    searchInput: document.getElementById("searchInput"),
    filterPills: document.querySelectorAll(".filter-pill"),
    questionList: document.getElementById("questionList"),

    // Problem Panel
    problemPanel: document.getElementById("problemPanel"),
    problemTitle: document.getElementById("problemTitle"),
    categoryBadge: document.getElementById("categoryBadge"),
    diffBadge: document.getElementById("diffBadge"),
    typeBadge: document.getElementById("typeBadge"),
    conceptsList: document.getElementById("conceptsList"),
    problemDescription: document.getElementById("problemDescription"),
    quizContainer: document.getElementById("quizContainer"),
    hintsList: document.getElementById("hintsList"),
    solutionCard: document.getElementById("solutionCard"),
    btnRevealSolution: document.getElementById("btnRevealSolution"),
    solutionContent: document.getElementById("solutionContent"),
    solutionCodeText: document.getElementById("solutionCodeText"),
    explanationText: document.getElementById("explanationText"),
    copySolutionBtn: document.getElementById("copySolutionBtn"),

    // Editor & Actions
    editorContainer: document.getElementById("editorContainer"),
    runCodeBtn: document.getElementById("runCodeBtn"),
    checkCodeBtn: document.getElementById("checkCodeBtn"),
    resetCodeBtn: document.getElementById("resetCodeBtn"),
    execStatusBadge: document.getElementById("execStatusBadge"),

    // Console & Test Results
    tabTestResults: document.getElementById("tabTestResults"),
    tabConsoleLogs: document.getElementById("tabConsoleLogs"),
    testResultBadge: document.getElementById("testResultBadge"),
    consoleLogsBadge: document.getElementById("consoleLogsBadge"),
    clearConsoleBtn: document.getElementById("clearConsoleBtn"),
    testResultsView: document.getElementById("testResultsView"),
    logsStreamView: document.getElementById("logsStreamView"),

    // Footer
    prevQuestionBtn: document.getElementById("prevQuestionBtn"),
    nextQuestionBtn: document.getElementById("nextQuestionBtn"),
    qPositionText: document.getElementById("qPositionText"),

    // Modals & Toasts
    resetModal: document.getElementById("resetModal"),
    cancelResetModal: document.getElementById("cancelResetModal"),
    confirmResetModal: document.getElementById("confirmResetModal"),

    solutionConfirmModal: document.getElementById("solutionConfirmModal"),
    cancelSolutionModal: document.getElementById("cancelSolutionModal"),
    confirmSolutionModal: document.getElementById("confirmSolutionModal"),

    toastContainer: document.getElementById("toastContainer")
  };

  // Local Storage Helpers
  function loadStorage(key, defaultValue) {
    try {
      const data = localStorage.getItem(STORAGE_PREFIX + key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.warn("Error reading localStorage:", e);
      return defaultValue;
    }
  }

  function saveStorage(key, value) {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    } catch (e) {
      console.warn("Error writing localStorage:", e);
    }
  }

  // Toast System
  function showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    
    let iconName = "info";
    if (type === "success") iconName = "check-circle-2";
    if (type === "error") iconName = "alert-circle";

    toast.innerHTML = `<i data-lucide="${iconName}" style="width: 15px; height: 15px;"></i><span>${message}</span>`;
    els.toastContainer.appendChild(toast);
    
    if (window.lucide) {
      lucide.createIcons({ root: toast });
    }

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(8px)";
      toast.style.transition = "all 0.25s ease";
      setTimeout(() => toast.remove(), 260);
    }, 3000);
  }

  // Theme Management
  function applyTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_PREFIX + "theme", theme);

    if (editor) {
      editor.setOption("theme", theme === "dark" ? "dracula" : "default");
    }

    if (els.themeIcon) {
      els.themeIcon.setAttribute("data-lucide", theme === "dark" ? "sun" : "moon");
      if (window.lucide) lucide.createIcons();
    }
  }

  // Set Execution Status Badge in Editor Toolbar
  function setExecStatus(status, text = "") {
    if (!els.execStatusBadge) return;
    
    if (status === "idle") {
      els.execStatusBadge.innerHTML = "";
      els.execStatusBadge.className = "exec-status-badge";
    } else if (status === "running") {
      els.execStatusBadge.className = "exec-status-badge running";
      els.execStatusBadge.innerHTML = `<i data-lucide="loader-2" class="spin" style="width: 11px; height: 11px;"></i> Running...`;
    } else if (status === "success") {
      els.execStatusBadge.className = "exec-status-badge success";
      els.execStatusBadge.innerHTML = `<i data-lucide="check" style="width: 11px; height: 11px;"></i> ${text || "Finished"}`;
    } else if (status === "error") {
      els.execStatusBadge.className = "exec-status-badge error";
      els.execStatusBadge.innerHTML = `<i data-lucide="x" style="width: 11px; height: 11px;"></i> ${text || "Error"}`;
    } else if (status === "timeout") {
      els.execStatusBadge.className = "exec-status-badge timeout";
      els.execStatusBadge.innerHTML = `<i data-lucide="clock" style="width: 11px; height: 11px;"></i> Timed out`;
    }

    if (window.lucide) {
      lucide.createIcons({ root: els.execStatusBadge });
    }
  }

  // Initialize CodeMirror Editor
  function initCodeMirror() {
    editor = CodeMirror(els.editorContainer, {
      value: "",
      mode: "javascript",
      theme: state.theme === "dark" ? "dracula" : "default",
      lineNumbers: true,
      matchBrackets: true,
      autoCloseBrackets: true,
      tabSize: 2,
      indentWithTabs: false,
      extraKeys: {
        "Tab": function(cm) {
          cm.replaceSelection("  ", "end");
        },
        "Cmd-Enter": () => handleRunCode(),
        "Ctrl-Enter": () => handleRunCode(),
        "Cmd-Shift-Enter": () => handleCheckCode(),
        "Ctrl-Shift-Enter": () => handleCheckCode()
      }
    });

    editor.on("change", () => {
      const currentQ = getCurrentQuestion();
      if (!currentQ) return;
      
      clearTimeout(codeChangeDebounce);
      codeChangeDebounce = setTimeout(() => {
        state.code[currentQ.id] = editor.getValue();
        saveStorage("code", state.code);
      }, 250);
    });
  }

  // Markdown Formatter
  function renderMarkdown(text) {
    if (!text) return "";

    let html = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Code blocks: ```js ... ``` or ```text ... ```
    html = html.replace(/```(js|text|javascript)?\n([\s\S]*?)```/g, (match, lang, code) => {
      const unescapedCode = code
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");
      return `
        <div class="code-block-wrapper">
          <div class="code-block-header">
            <span>${lang === 'text' ? 'Expected Output' : 'JavaScript'}</span>
          </div>
          <pre class="code-block-content">${escapeHTML(unescapedCode.trim())}</pre>
        </div>
      `;
    });

    // Inline code `code`
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');

    // Bold text **text**
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Paragraphs
    const paragraphs = html.split(/\n\n+/);
    return paragraphs.map(p => {
      p = p.trim();
      if (p.startsWith('<div class="code-block') || p.startsWith('<h2') || p.startsWith('<h3')) {
        return p;
      }
      return `<p>${p.replace(/\n/g, '<br>')}</p>`;
    }).join('');
  }

  function escapeHTML(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Question Helpers
  function getCurrentQuestion() {
    return questions.find(q => q.id === state.currentQuestionId) || questions[0];
  }

  // Update Progress and Stats
  function updateProgressUI() {
    const total = questions.length;
    const solvedCount = state.solved.length;
    const percentage = Math.round((solvedCount / total) * 100);

    els.progressFill.style.width = `${percentage}%`;
    els.progressCounter.textContent = `${solvedCount} / ${total} (${percentage}%)`;

    const easyTotal = questions.filter(q => q.difficulty === "easy").length;
    const medTotal = questions.filter(q => q.difficulty === "medium").length;
    const hardTotal = questions.filter(q => q.difficulty === "hard").length;

    const easySolved = questions.filter(q => q.difficulty === "easy" && state.solved.includes(q.id)).length;
    const medSolved = questions.filter(q => q.difficulty === "medium" && state.solved.includes(q.id)).length;
    const hardSolved = questions.filter(q => q.difficulty === "hard" && state.solved.includes(q.id)).length;

    els.statEasy.textContent = `${easySolved}/${easyTotal}`;
    els.statMed.textContent = `${medSolved}/${medTotal}`;
    els.statHard.textContent = `${hardSolved}/${hardTotal}`;

    els.qPositionText.textContent = `Question ${state.currentQuestionId} of ${total}`;
    els.prevQuestionBtn.disabled = state.currentQuestionId <= 1;
    els.nextQuestionBtn.disabled = state.currentQuestionId >= total;
  }

  // Render Sidebar Question List (All 30 Questions)
  function renderSidebar() {
    els.questionList.innerHTML = "";
    const filter = state.activeFilter;
    const query = state.searchQuery.toLowerCase().trim();

    const filteredQuestions = questions.filter(q => {
      const isSolved = state.solved.includes(q.id);
      if (filter === "easy" && q.difficulty !== "easy") return false;
      if (filter === "medium" && q.difficulty !== "medium") return false;
      if (filter === "hard" && q.difficulty !== "hard") return false;
      if (filter === "solved" && !isSolved) return false;
      if (filter === "unsolved" && isSolved) return false;

      if (query) {
        const titleMatch = q.title.toLowerCase().includes(query);
        const conceptMatch = q.concepts.some(c => c.toLowerCase().includes(query));
        const numMatch = `q${q.id}`.includes(query) || `${q.id}` === query;
        if (!titleMatch && !conceptMatch && !numMatch) return false;
      }

      return true;
    });

    if (filteredQuestions.length === 0) {
      els.questionList.innerHTML = `
        <div class="empty-state-text" style="padding: 20px;">
          No matching questions.
        </div>
      `;
      return;
    }

    filteredQuestions.forEach(q => {
      const isSolved = state.solved.includes(q.id);
      const isActive = q.id === state.currentQuestionId;

      const item = document.createElement("div");
      item.className = `question-item ${isActive ? 'active' : ''} ${isSolved ? 'solved' : ''}`;
      item.setAttribute("role", "listitem");
      item.setAttribute("tabindex", "0");

      item.innerHTML = `
        <div class="q-status-icon">
          <i data-lucide="${isSolved ? 'check-circle-2' : 'circle'}" style="width: 14px; height: 14px;"></i>
        </div>
        <span class="q-badge-num">Q${q.id}</span>
        <span class="q-title-text" title="${q.title}">${q.title}</span>
        <span class="difficulty-tag diff-${q.difficulty}">${q.difficulty}</span>
      `;

      item.addEventListener("click", () => {
        selectQuestion(q.id);
        if (window.innerWidth <= 900) {
          els.sidebar.classList.remove("open");
        }
      });

      item.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          selectQuestion(q.id);
        }
      });

      els.questionList.appendChild(item);
    });

    if (window.lucide) {
      lucide.createIcons({ root: els.questionList });
    }
  }

  // Load and Render Active Question
  function selectQuestion(questionId) {
    state.currentQuestionId = questionId;
    saveStorage("current_q", questionId);

    const q = getCurrentQuestion();

    // 1. Meta & Badges
    els.problemTitle.textContent = `Q${q.id} — ${q.title}`;
    els.categoryBadge.textContent = q.category || "Practice";
    els.diffBadge.textContent = q.difficulty;
    els.diffBadge.className = `difficulty-tag diff-${q.difficulty}`;
    
    let typeName = "Function Implementation";
    if (q.type === "conceptual") typeName = "Concept Analysis";
    els.typeBadge.textContent = typeName;

    // 2. Concepts tags
    els.conceptsList.innerHTML = q.concepts.map(c => `
      <span class="concept-tag">${escapeHTML(c)}</span>
    `).join("");

    // 3. Problem Description
    els.problemDescription.innerHTML = renderMarkdown(q.description);

    // 4. Interactive Quiz / Self-Check (if question has a quiz e.g. Q12)
    renderQuiz(q);

    // 5. Progressive Hints Section
    renderHints(q);

    // 6. Solution Card
    renderSolution(q);

    // 7. Load Editor Code with Boilerplate / Starter Code
    const savedCode = state.code[q.id];
    const initialCode = savedCode !== undefined ? savedCode : (q.starterCode || "");
    editor.setValue(initialCode);
    editor.clearHistory();

    // 8. Reset Execution Views
    resetTestView();
    resetConsoleView(q);
    setExecStatus("idle");

    // 9. Update UI controls & highlights
    updateProgressUI();
    renderSidebar();

    // Scroll problem panel to top
    els.problemPanel.scrollTop = 0;
  }

  // Render Interactive Quiz (e.g. Q12)
  function renderQuiz(q) {
    if (!q.quiz) {
      els.quizContainer.style.display = "none";
      els.quizContainer.innerHTML = "";
      return;
    }

    els.quizContainer.style.display = "block";
    const savedSelection = state.quizSelections[q.id];

    els.quizContainer.innerHTML = `
      <div class="quiz-card">
        <div class="section-title-sm">
          <i data-lucide="help-circle" style="width: 14px; height: 14px; color: var(--accent-blue);"></i>
          Conceptual Self-Check
        </div>
        <div class="quiz-question">${escapeHTML(q.quiz.question)}</div>
        <div class="quiz-options" id="quizOptions"></div>
      </div>
    `;

    const optionsContainer = els.quizContainer.querySelector("#quizOptions");
    q.quiz.options.forEach((opt, idx) => {
      const isSelected = savedSelection === idx;
      const isCorrect = idx === q.quiz.correctIndex;
      
      const optEl = document.createElement("div");
      optEl.className = "quiz-option";
      if (savedSelection !== undefined) {
        if (isSelected) {
          optEl.classList.add(isCorrect ? "correct" : "wrong");
        } else if (isCorrect) {
          optEl.classList.add("correct");
        }
      }

      optEl.innerHTML = `
        <i data-lucide="${isSelected ? (isCorrect ? 'check-circle' : 'x-circle') : 'circle'}" style="width: 15px; height: 15px; flex-shrink: 0; margin-top: 1px;"></i>
        <span>${escapeHTML(opt)}</span>
      `;

      optEl.addEventListener("click", () => {
        state.quizSelections[q.id] = idx;
        saveStorage("quiz_selections", state.quizSelections);
        if (idx === q.quiz.correctIndex) {
          if (!state.solved.includes(q.id)) {
            state.solved.push(q.id);
            saveStorage("solved", state.solved);
            showToast("✓ Correct understanding! Question marked as solved.", "success");
            triggerConfetti();
          }
        }
        renderQuiz(q);
        renderSidebar();
        updateProgressUI();
      });

      optionsContainer.appendChild(optEl);
    });

    if (window.lucide) {
      lucide.createIcons({ root: els.quizContainer });
    }
  }

  // Render Progressive Hints
  function renderHints(q) {
    els.hintsList.innerHTML = "";
    const revealedCount = state.hintsRevealed[q.id] || 0;

    q.hints.forEach((hintText, index) => {
      const hintNum = index + 1;
      const isRevealed = revealedCount >= hintNum;
      const isNextToUnlock = revealedCount === index;

      const card = document.createElement("div");
      card.className = `hint-card ${isRevealed ? 'revealed' : ''}`;

      card.innerHTML = `
        <div class="hint-header" data-hint-index="${index}">
          <div class="hint-title">
            <i data-lucide="${isRevealed ? 'lightbulb' : 'lock'}" style="width: 14px; height: 14px; color: ${isRevealed ? 'var(--accent-yellow)' : 'var(--text-muted)'};"></i>
            <span>Hint ${hintNum}</span>
          </div>
          <div class="hint-status">
            ${isRevealed ? '<span>Revealed</span> <i data-lucide="check" style="width: 12px; height: 12px;"></i>' : (isNextToUnlock ? '<span style="color: var(--accent-blue); font-weight: 600;">Click to reveal</span>' : '<span>Locked</span>')}
          </div>
        </div>
        <div class="hint-content">
          ${escapeHTML(hintText)}
        </div>
      `;

      card.querySelector(".hint-header").addEventListener("click", () => {
        if (!isRevealed && isNextToUnlock) {
          state.hintsRevealed[q.id] = hintNum;
          saveStorage("hints", state.hintsRevealed);
          renderHints(q);
        } else if (isRevealed) {
          card.classList.toggle("revealed");
        } else {
          showToast(`Please unlock Hint ${hintNum - 1} first!`, "info");
        }
      });

      els.hintsList.appendChild(card);
    });

    if (window.lucide) {
      lucide.createIcons({ root: els.hintsList });
    }
  }

  // Render Official Solution
  function renderSolution(q) {
    const isViewed = !!state.solutionViewed[q.id];

    if (isViewed) {
      els.solutionCard.classList.add("revealed");
      els.solutionContent.style.display = "flex";
      els.btnRevealSolution.innerHTML = `<i data-lucide="unlock" style="width: 12px; height: 12px;"></i><span>Solution Unlocked</span>`;
      els.solutionCodeText.textContent = q.solution;
      els.explanationText.innerHTML = `<strong>Why this works:</strong> ${renderMarkdown(q.explanation || '')}`;
    } else {
      els.solutionCard.classList.remove("revealed");
      els.solutionContent.style.display = "none";
      els.btnRevealSolution.innerHTML = `<i data-lucide="lock" style="width: 12px; height: 12px;"></i><span>View Official Solution</span>`;
      els.solutionCodeText.textContent = "";
      els.explanationText.innerHTML = "";
    }

    if (window.lucide) {
      lucide.createIcons({ root: els.solutionCard });
    }
  }

  // Copy Solution Button
  els.copySolutionBtn.addEventListener("click", () => {
    const q = getCurrentQuestion();
    if (q && q.solution) {
      navigator.clipboard.writeText(q.solution).then(() => {
        showToast("Solution copied to clipboard!", "success");
      });
    }
  });

  // Reveal Solution Button
  els.btnRevealSolution.addEventListener("click", () => {
    const q = getCurrentQuestion();
    if (state.solutionViewed[q.id]) {
      const isCurrentlyOpen = els.solutionContent.style.display === "flex";
      els.solutionContent.style.display = isCurrentlyOpen ? "none" : "flex";
      return;
    }

    els.solutionConfirmModal.classList.add("active");
  });

  els.cancelSolutionModal.addEventListener("click", () => {
    els.solutionConfirmModal.classList.remove("active");
  });

  els.confirmSolutionModal.addEventListener("click", () => {
    const q = getCurrentQuestion();
    state.solutionViewed[q.id] = true;
    saveStorage("solution_viewed", state.solutionViewed);
    els.solutionConfirmModal.classList.remove("active");
    renderSolution(q);
    showToast("Official solution revealed.", "info");
  });

  // Reset Test Results UI
  function resetTestView() {
    els.testResultsView.innerHTML = `
      <div class="test-summary-card idle">
        <span>Click <strong>"Check Code"</strong> to run automated test cases against your submission.</span>
      </div>
    `;
    els.testResultBadge.textContent = "-";
    els.testResultBadge.className = "tab-badge";
  }

  // Reset Console UI
  function resetConsoleView(q) {
    const exampleLabel = q && q.runExamples && q.runExamples[0] ? q.runExamples[0].label : "";
    els.logsStreamView.innerHTML = `
      <div class="empty-state-text">
        Click <strong>"Run Code"</strong> to execute your solution with example inputs${exampleLabel ? ' (' + escapeHTML(exampleLabel) + ')' : ''}.
      </div>
    `;
    els.consoleLogsBadge.textContent = "0";
  }

  // Switch Console / Test Results Tab
  function switchTab(tabName) {
    state.activeTab = tabName;
    if (tabName === "testResults") {
      els.tabTestResults.classList.add("active");
      els.tabConsoleLogs.classList.remove("active");
      els.testResultsView.style.display = "flex";
      els.logsStreamView.style.display = "none";
    } else {
      els.tabConsoleLogs.classList.add("active");
      els.tabTestResults.classList.remove("active");
      els.logsStreamView.style.display = "flex";
      els.testResultsView.style.display = "none";
    }
  }

  els.tabTestResults.addEventListener("click", () => switchTab("testResults"));
  els.tabConsoleLogs.addEventListener("click", () => switchTab("consoleLogs"));

  // Clear Console Button
  els.clearConsoleBtn.addEventListener("click", () => {
    els.logsStreamView.innerHTML = `<div class="empty-state-text">Console output cleared. Click "Run Code" to execute again.</div>`;
    els.consoleLogsBadge.textContent = "0";
  });

  // Render Captured Logs & Execution Output
  function renderExecutionOutput(res) {
    els.logsStreamView.innerHTML = "";

    const { success, logs = [], error = null, returnValue = undefined, exampleLabel = "", duration = 0 } = res;

    // 1. Execution Header Banner
    const banner = document.createElement("div");
    banner.className = `exec-banner ${success ? 'success' : 'error'}`;
    banner.innerHTML = `
      <span>${success ? '✓ Program finished successfully' : '✕ Execution failed'}</span>
      <span style="font-family: var(--font-mono); font-size: 11px;">${duration}ms</span>
    `;
    els.logsStreamView.appendChild(banner);

    // 2. Executed Example Label (if present)
    if (exampleLabel) {
      const exDiv = document.createElement("div");
      exDiv.className = "exec-example-label";
      exDiv.innerHTML = `<strong>Executed:</strong> <code>${escapeHTML(exampleLabel)}</code>`;
      els.logsStreamView.appendChild(exDiv);
    }

    // 3. Error Box (if runtime or syntax error)
    if (error) {
      const errBox = document.createElement("div");
      errBox.className = "error-details-box";
      errBox.innerHTML = `<strong>${escapeHTML(error.name || 'Error')}:</strong> ${escapeHTML(error.message || String(error))}`;
      els.logsStreamView.appendChild(errBox);
    }

    // 4. Return Value Section
    if (returnValue !== undefined) {
      const retBox = document.createElement("div");
      retBox.className = "return-value-box";
      retBox.innerHTML = `
        <span class="return-value-title">Return Value</span>
        <pre class="return-value-content">${escapeHTML(returnValue)}</pre>
      `;
      els.logsStreamView.appendChild(retBox);
    }

    // 5. Captured Console Logs
    if (logs.length > 0) {
      const logGroup = document.createElement("div");
      logGroup.className = "logs-group";
      logGroup.innerHTML = `<span class="logs-group-title">Console Output (${logs.length})</span>`;

      logs.forEach(l => {
        const entry = document.createElement("div");
        entry.className = `log-entry ${l.type}`;
        entry.innerHTML = `
          <span class="log-type-tag ${l.type}">${l.type}</span>
          <span class="log-text">${escapeHTML(l.message)}</span>
        `;
        logGroup.appendChild(entry);
      });

      els.logsStreamView.appendChild(logGroup);
    }

    // Update Console Tab Badge
    const totalOutputItems = logs.length + (returnValue !== undefined ? 1 : 0) + (error ? 1 : 0);
    els.consoleLogsBadge.textContent = String(totalOutputItems);
  }

  // Celebration Confetti
  function triggerConfetti() {
    if (typeof confetti === "function") {
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.8 }
      });
    }
  }

  // =========================================================================
  // RUN CODE ACTION (Immediate feedback, example execution, NO test scoring)
  // =========================================================================
  async function handleRunCode() {
    const q = getCurrentQuestion();
    const code = editor.getValue();

    els.runCodeBtn.disabled = true;
    els.runCodeBtn.innerHTML = `<i data-lucide="loader-2" class="spin" style="width: 12px; height: 12px;"></i> Running...`;
    setExecStatus("running");

    // Automatically switch to Console Output tab
    switchTab("consoleLogs");
    els.logsStreamView.innerHTML = `<div class="empty-state-text"><i data-lucide="loader-2" class="spin" style="width: 14px; height: 14px;"></i> Executing code...</div>`;
    if (window.lucide) lucide.createIcons({ root: els.logsStreamView });

    try {
      const result = await runner.runCode(code, q, 2500);

      renderExecutionOutput(result);

      if (result.timedOut) {
        setExecStatus("timeout");
        showToast("Execution timed out (2500ms). Check for infinite loops.", "error");
      } else if (!result.success || result.error) {
        setExecStatus("error", result.error.name || "Error");
        showToast(result.error.message || "Execution error", "error");
      } else {
        setExecStatus("success", `Finished in ${result.duration}ms`);
      }
    } catch (err) {
      renderExecutionOutput({
        success: false,
        error: { name: "ExecutionError", message: err.message },
        duration: 0
      });
      setExecStatus("error");
    } finally {
      els.runCodeBtn.disabled = false;
      els.runCodeBtn.innerHTML = `<i data-lucide="play" style="width: 12px; height: 12px;"></i> Run Code`;
      if (window.lucide) lucide.createIcons();
    }
  }

  // =========================================================================
  // CHECK CODE ACTION (Automated test evaluation, scores submission & updates solved state)
  // =========================================================================
  async function handleCheckCode() {
    const q = getCurrentQuestion();
    const code = editor.getValue();

    els.checkCodeBtn.disabled = true;
    els.checkCodeBtn.innerHTML = `<i data-lucide="loader-2" class="spin" style="width: 13px; height: 13px;"></i> Checking...`;
    setExecStatus("running");

    // Automatically switch to Test Results tab
    switchTab("testResults");

    try {
      const res = await runner.testCode(code, q, 2500);

      if (res.timedOut) {
        els.testResultsView.innerHTML = `
          <div class="test-summary-card failed">
            <span>✗ Execution Timed Out (2500ms)</span>
          </div>
          <div class="test-case-item failed">
            <div class="tc-value actual-fail">Your code took too long to execute. Please check for infinite loops or deep recursion.</div>
          </div>
        `;
        els.testResultBadge.textContent = "Timeout";
        els.testResultBadge.className = "tab-badge failed";
        setExecStatus("timeout");
        showToast("Execution timed out! Check for infinite loops.", "error");
        return;
      }

      if (res.syntaxError) {
        els.testResultsView.innerHTML = `
          <div class="test-summary-card failed">
            <span>✗ Syntax Error in Code</span>
          </div>
          <div class="test-case-item failed">
            <div class="tc-value actual-fail">${escapeHTML(res.error.name)}: ${escapeHTML(res.error.message)}</div>
          </div>
        `;
        els.testResultBadge.textContent = "Syntax Error";
        els.testResultBadge.className = "tab-badge failed";
        setExecStatus("error", "Syntax Error");
        showToast("Syntax error in submitted code.", "error");
        return;
      }

      if (res.missingFunction) {
        els.testResultsView.innerHTML = `
          <div class="test-summary-card failed">
            <span>✗ Required Function Not Found</span>
          </div>
          <div class="test-case-item failed">
            <div class="tc-value actual-fail">${escapeHTML(res.error.message)}</div>
          </div>
        `;
        els.testResultBadge.textContent = "Missing Fn";
        els.testResultBadge.className = "tab-badge failed";
        setExecStatus("error", "Missing Function");
        showToast(`Function '${q.targetFunction}' is missing.`, "error");
        return;
      }

      // Render Individual Test Cases
      const results = res.results || [];
      const passedCount = results.filter(r => r.passed).length;
      const totalCount = results.length;
      const allPassed = res.allPassed && totalCount > 0;

      els.testResultBadge.textContent = `${passedCount}/${totalCount}`;
      els.testResultBadge.className = `tab-badge ${allPassed ? 'success' : 'failed'}`;

      let html = `
        <div class="test-summary-card ${allPassed ? 'passed' : 'failed'}">
          <span>${allPassed ? '✓ All tests passed!' : `✗ ${passedCount} / ${totalCount} tests passed`}</span>
          <span style="font-family: var(--font-mono); font-size: 11px;">${res.duration}ms</span>
        </div>
      `;

      results.forEach(tc => {
        html += `
          <div class="test-case-item ${tc.passed ? 'passed' : 'failed'}">
            <div class="test-case-header">
              <span>${escapeHTML(tc.name)}</span>
              <span class="test-case-status ${tc.passed ? 'passed' : 'failed'}">
                <i data-lucide="${tc.passed ? 'check-circle' : 'x-circle'}" style="width: 13px; height: 13px;"></i>
                ${tc.passed ? 'Passed' : 'Failed'}
              </span>
            </div>
            <div class="test-case-details">
              ${tc.argsDesc ? `<span class="tc-label">Input:</span><span class="tc-value">${escapeHTML(tc.argsDesc)}</span>` : ''}
              <span class="tc-label">Expected:</span>
              <span class="tc-value expected">${escapeHTML(tc.expected)}</span>
              <span class="tc-label">Received:</span>
              <span class="tc-value ${tc.passed ? '' : 'actual-fail'}">${escapeHTML(tc.actual)}</span>
            </div>
          </div>
        `;
      });

      els.testResultsView.innerHTML = html;

      // Handle Success
      if (allPassed) {
        setExecStatus("success", "Passed All Tests");
        if (!state.solved.includes(q.id)) {
          state.solved.push(q.id);
          saveStorage("solved", state.solved);
          showToast(`✓ Great job! Question ${q.id} solved!`, "success");
          triggerConfetti();
        } else {
          showToast(`✓ All tests passed!`, "success");
        }
        updateProgressUI();
        renderSidebar();
      } else {
        setExecStatus("error", `${passedCount}/${totalCount} Passed`);
        showToast(`${passedCount} of ${totalCount} tests passed. Check test details.`, "error");
      }

    } catch (err) {
      els.testResultsView.innerHTML = `
        <div class="test-summary-card failed">
          <span>✗ Error Running Tests</span>
        </div>
        <div class="test-case-item failed">
          <div class="tc-value actual-fail">${escapeHTML(err.message)}</div>
        </div>
      `;
      setExecStatus("error");
    } finally {
      els.checkCodeBtn.disabled = false;
      els.checkCodeBtn.innerHTML = `<i data-lucide="check" style="width: 13px; height: 13px;"></i> Check Code`;
      if (window.lucide) lucide.createIcons();
    }
  }

  // Reset Code for Current Question
  els.resetCodeBtn.addEventListener("click", () => {
    const q = getCurrentQuestion();
    const currentVal = editor.getValue();
    const starterVal = q.starterCode || "";

    if (currentVal.trim() === starterVal.trim()) {
      showToast("Code is already at starter state.", "info");
      return;
    }

    if (confirm(`Reset code for Question ${q.id} to original starter code?`)) {
      editor.setValue(starterVal);
      state.code[q.id] = starterVal;
      saveStorage("code", state.code);
      resetTestView();
      resetConsoleView(q);
      setExecStatus("idle");
      showToast(`Code for Q${q.id} reset to starter code.`, "info");
    }
  });

  // Reset All Progress
  els.resetAllBtn.addEventListener("click", () => {
    els.resetModal.classList.add("active");
  });

  els.cancelResetModal.addEventListener("click", () => {
    els.resetModal.classList.remove("active");
  });

  els.confirmResetModal.addEventListener("click", () => {
    state.solved = [];
    state.code = {};
    state.hintsRevealed = {};
    state.solutionViewed = {};
    state.quizSelections = {};
    saveStorage("solved", []);
    saveStorage("code", {});
    saveStorage("hints", {});
    saveStorage("solution_viewed", {});
    saveStorage("quiz_selections", {});

    els.resetModal.classList.remove("active");
    selectQuestion(1);
    showToast("All practice progress has been reset.", "info");
  });

  // Filter Buttons
  els.filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      els.filterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      state.activeFilter = pill.getAttribute("data-filter");
      renderSidebar();
    });
  });

  // Search Input
  els.searchInput.addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
    renderSidebar();
  });

  // Navigation Buttons
  els.prevQuestionBtn.addEventListener("click", () => {
    if (state.currentQuestionId > 1) {
      selectQuestion(state.currentQuestionId - 1);
    }
  });

  els.nextQuestionBtn.addEventListener("click", () => {
    if (state.currentQuestionId < questions.length) {
      selectQuestion(state.currentQuestionId + 1);
    }
  });

  // Global Keyboard Shortcuts
  window.addEventListener("keydown", (e) => {
    if (e.altKey && e.key === "ArrowLeft") {
      e.preventDefault();
      if (state.currentQuestionId > 1) selectQuestion(state.currentQuestionId - 1);
    }
    if (e.altKey && e.key === "ArrowRight") {
      e.preventDefault();
      if (state.currentQuestionId < questions.length) selectQuestion(state.currentQuestionId + 1);
    }
  });

  // Theme Toggle Button
  els.themeToggleBtn.addEventListener("click", () => {
    applyTheme(state.theme === "dark" ? "light" : "dark");
  });

  // Mobile Menu Button
  els.mobileMenuBtn.addEventListener("click", () => {
    els.sidebar.classList.toggle("open");
  });

  // Action Button Listeners
  els.runCodeBtn.addEventListener("click", handleRunCode);
  els.checkCodeBtn.addEventListener("click", handleCheckCode);

  // Initialize App
  initCodeMirror();
  applyTheme(state.theme);
  selectQuestion(state.currentQuestionId || 1);
});
