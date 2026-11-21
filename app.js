/* ISO/SAE 21434 study guide — application */
(function () {
  "use strict";

  var MODULES = window.MODULES || [];
  var INTERVIEW = window.INTERVIEW || [];
  var GLOSSARY = window.GLOSSARY || [];
  var EXAM = window.EXAM || [];
  var STORE_KEY = "iso21434.guide.v1";

  var view = document.getElementById("view");
  var sidebar = document.getElementById("sidebar");
  var ringFg = document.getElementById("ringFg");
  var ringTxt = document.getElementById("ringTxt");
  var searchInput = document.getElementById("searchInput");
  var menuBtn = document.getElementById("menuBtn");
  var scrim = document.getElementById("scrim");

  /* ---------- state ---------- */
  function loadState() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      var s = raw ? JSON.parse(raw) : null;
      if (!s || typeof s !== "object") throw new Error("bad");
      s.lessons = s.lessons || {};
      s.quizzes = s.quizzes || {};
      s.exam = s.exam || null;
      return s;
    } catch (e) {
      return { lessons: {}, quizzes: {}, exam: null };
    }
  }
  var state = loadState();
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {}
    paintProgress();
  }

  /* ---------- helpers ---------- */
  var flat = [];
  MODULES.forEach(function (m) {
    m.lessons.forEach(function (l) {
      flat.push({ lesson: l, module: m });
    });
  });
  function totalLessons() { return flat.length; }
  function doneLessons() {
    return flat.filter(function (x) { return state.lessons[x.lesson.id]; }).length;
  }
  function moduleProgress(m) {
    var done = m.lessons.filter(function (l) { return state.lessons[l.id]; }).length;
    return { done: done, total: m.lessons.length, pct: Math.round((done / m.lessons.length) * 100) };
  }
  function pct() {
    var t = totalLessons();
    return t ? Math.round((doneLessons() / t) * 100) : 0;
  }
  function findLesson(id) {
    for (var i = 0; i < flat.length; i++) if (flat[i].lesson.id === id) return { entry: flat[i], index: i };
    return null;
  }
  function findModule(id) {
    for (var i = 0; i < MODULES.length; i++) if (MODULES[i].id === id) return MODULES[i];
    return null;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); }
  function route() {
    var h = location.hash.replace(/^#\/?/, "");
    return h || "home";
  }
  function go(hash) { location.hash = hash; }

  /* ---------- progress paint ---------- */
  function paintProgress() {
    var p = pct();
    var circumference = 2 * Math.PI * 15.5;
    if (ringFg) {
      ringFg.style.strokeDasharray = circumference.toFixed(1);
      ringFg.style.strokeDashoffset = (circumference * (1 - p / 100)).toFixed(1);
    }
    if (ringTxt) ringTxt.textContent = p + "%";
  }

  /* ---------- sidebar ---------- */
  var collapsed = {};
  function renderSidebar() {
    var current = route();
    var currentLesson = current.indexOf("lesson/") === 0 ? current.split("/")[1] : null;

    var html = "";
    html += '<div class="nav-quick">';
    html += '<a href="#/home" class="' + (current === "home" ? "active" : "") + '"><span class="ico">▤</span>Overview</a>';
    html += '<a href="#/exam" class="' + (current === "exam" ? "active" : "") + '"><span class="ico">✎</span>Mock exam</a>';
    html += '<a href="#/interview" class="' + (current === "interview" ? "active" : "") + '"><span class="ico">◈</span>Interview</a>';
    html += '<a href="#/glossary" class="' + (current === "glossary" ? "active" : "") + '"><span class="ico">≡</span>Glossary</a>';
    html += '</div>';
    html += '<div class="nav-heading">Course</div>';

    MODULES.forEach(function (m) {
      var pr = moduleProgress(m);
      var isCollapsed = collapsed[m.id] && !m.lessons.some(function (l) { return l.id === currentLesson; });
      html += '<div class="mod' + (pr.done === pr.total ? " mod-done" : "") + '">';
      html += '<button class="mod-head" data-mod="' + m.id + '">';
      html += '<span class="mod-num">' + m.num + '</span>';
      html += '<span class="mod-title">' + esc(m.title) + '</span>';
      html += '<span class="mod-prog">' + pr.done + "/" + pr.total + '</span>';
      html += '</button>';
      html += '<ul class="lessons"' + (isCollapsed ? " hidden" : "") + ' data-lessons="' + m.id + '">';
      m.lessons.forEach(function (l) {
        var done = !!state.lessons[l.id];
        html += '<li><a href="#/lesson/' + l.id + '" class="' + (l.id === currentLesson ? "active" : "") + (done ? " done" : "") + '">';
        html += '<span class="tick">' + (done ? "✓" : "·") + '</span><span>' + esc(l.title) + '</span></a></li>';
      });
      html += '</ul></div>';
    });

    html += '<div class="nav-sep"></div>';
    html += '<div class="nav-heading">Reference</div>';
    html += '<div class="nav-quick">';
    html += '<a href="#/cheatsheet" class="' + (current === "cheatsheet" ? "active" : "") + '"><span class="ico">▦</span>Cheat sheet</a>';
    html += '<a href="#/interview" class="' + (current === "interview" ? "active" : "") + '"><span class="ico">★</span>Q&amp;A bank</a>';
    html += '</div>';
    sidebar.innerHTML = html;
  }

  sidebar.addEventListener("click", function (e) {
    var btn = e.target.closest(".mod-head");
    if (btn) {
      var id = btn.getAttribute("data-mod");
      collapsed[id] = !collapsed[id];
      var list = sidebar.querySelector('[data-lessons="' + id + '"]');
      if (list) list.hidden = !!collapsed[id];
      return;
    }
    if (e.target.closest("a")) closeMenu();
  });

  /* ---------- views ---------- */
  function home() {
    var p = pct();
    var qCount = MODULES.reduce(function (n, m) { return n + (m.quiz ? m.quiz.length : 0); }, 0);
    var h = '<div class="wrap-wide">';
    h += '<section class="hero">';
    h += '<div class="eyebrow">Automotive Cybersecurity Engineering</div>';
    h += '<h1>Understand ISO/SAE 21434 well enough to implement it &mdash; and to defend it in an interview.</h1>';
    h += '<p>Thirteen modules built around the clauses of the standard, the TARA method in detail, a practical rollout playbook, 90 module quiz questions, a 25-question mock exam, 37 interview questions with model answers and a searchable glossary.</p>';
    h += '<div class="hero-stats">';
    h += '<div><b>' + MODULES.length + '</b><span>Modules</span></div>';
    h += '<div><b>' + totalLessons() + '</b><span>Lessons</span></div>';
    h += '<div><b>' + (qCount + EXAM.length) + '</b><span>Questions</span></div>';
    h += '<div><b>' + INTERVIEW.length + '</b><span>Interview Q&amp;A</span></div>';
    h += '<div><b>' + p + '%</b><span>Your progress</span></div>';
    h += '</div></section>';

    h += '<div class="section-label">Start here</div>';
    h += '<div class="grid-3">';
    var startTiles = [
      { id: "m0l1", k: "First read", t: "What the standard is", d: "Scope, provenance, and what it deliberately does not prescribe." },
      { id: "m6l2", k: "Core method", t: "TARA in the concept phase", d: "The engine everything else depends on." },
      { id: "m10l5", k: "Worked example", t: "Risk value, treatment, example", d: "Follow a remote-unlock analysis end to end." },
      { id: "m12l1", k: "Delivery", t: "Roles and a 90-day rollout", d: "How to stand the capability up in practice." }
    ];
    startTiles.forEach(function (t) {
      h += '<a class="tile" href="#/lesson/' + t.id + '"><span class="tnum">' + t.k + '</span><h4>' + t.t + '</h4><p>' + t.d + '</p></a>';
    });
    h += '</div>';

    h += '<div class="section-label">All modules</div><div class="grid-3">';
    MODULES.forEach(function (m) {
      var pr = moduleProgress(m);
      h += '<a class="tile" href="#/lesson/' + m.lessons[0].id + '">';
      h += '<span class="tnum">Module ' + m.num + ' · ' + m.lessons.length + ' lessons</span>';
      h += '<h4>' + esc(m.title) + '</h4><p>' + esc(m.blurb) + '</p>';
      h += '<div class="tprog"><i style="width:' + pr.pct + '%"></i></div>';
      h += '</a>';
    });
    h += '</div>';

    h += '<div class="section-label">Practice</div><div class="grid-3">';
    h += '<a class="tile" href="#/interview"><span class="tnum">Interview</span><h4>' + INTERVIEW.length + ' questions with model answers</h4><p>Filter by topic, reveal answers, and rehearse the phrasing.</p></a>';
    h += '<a class="tile" href="#/exam"><span class="tnum">Exam</span><h4>' + EXAM.length + ' mixed questions</h4><p>80% to pass. Covers clauses, TARA, CAL and regulation.</p></a>';
    h += '<a class="tile" href="#/cheatsheet"><span class="tnum">Reference</span><h4>One-page cheat sheet</h4><p>Clause map, TARA chain, rating scales, key distinctions.</p></a>';
    h += '</div>';
    h += '<p class="note-sm" style="margin-top:1.4rem">Progress is stored in this browser only. Lessons are marked complete when you press the button at the end of each one.</p>';
    h += '</div>';
    return h;
  }

  function lessonView(id) {
    var found = findLesson(id);
    if (!found) return '<div class="wrap"><div class="empty">Lesson not found. <a href="#/home">Back to overview</a></div></div>';
    var entry = found.entry;
    var l = entry.lesson;
    var m = entry.module;
    var done = !!state.lessons[l.id];
    var prev = flat[found.index - 1];
    var next = flat[found.index + 1];

    var h = '<div class="wrap">';
    h += '<div class="crumb"><a href="#/home">Course</a> / Module ' + m.num + ' — ' + esc(m.title) + '</div>';
    h += '<h1>' + esc(l.title) + '</h1>';
    h += '<div class="meta-row"><span class="chip accent">Module ' + m.num + '</span><span class="chip">' + l.minutes + ' min read</span>';
    if (m.quiz) h += '<span class="chip">Quiz: ' + m.quiz.length + ' questions</span>';
    h += '</div>';
    h += l.body;
    h += '<div class="lesson-foot">';
    h += '<button class="btn ' + (done ? "done" : "") + '" data-complete="' + l.id + '">' + (done ? "✓ Completed" : "Mark as complete") + '</button>';
    if (m.quiz) h += '<a class="btn ghost" href="#/quiz/' + m.id + '">Module quiz</a>';
    h += '<a class="btn ghost" href="#/interview">Practice questions</a>';
    if (next) h += '<a class="btn next" href="#/lesson/' + next.lesson.id + '">Next: ' + esc(next.lesson.title) + ' →</a>';
    h += '</div>';
    h += '<div style="margin-top:1.2rem">';
    if (prev) h += '<a class="note-sm" href="#/lesson/' + prev.lesson.id + '">← ' + esc(prev.lesson.title) + '</a>';
    h += '</div></div>';
    return h;
  }

  function quizView(moduleId) {
    var m = findModule(moduleId);
    if (!m || !m.quiz) return '<div class="wrap"><div class="empty">Quiz not found. <a href="#/home">Back to overview</a></div></div>';
    var best = state.quizzes[m.id];
    var h = '<div class="wrap">';
    h += '<div class="crumb"><a href="#/home">Course</a> / Module ' + m.num + ' — ' + esc(m.title) + '</div>';
    h += '<h1>Module quiz: ' + esc(m.title) + '</h1>';
    h += '<p class="lead">Answer all ' + m.quiz.length + ' questions. Each answer reveals an explanation.</p>';
    h += '<div class="scorebar" data-quizar="' + m.id + '"><div><div class="big" id="qScore">0/' + m.quiz.length + '</div><div class="lbl">Correct</div></div>';
    h += '<div style="flex:1"><div class="lbl" id="qMsg">' + (best ? "Best so far: " + best.score + "/" + best.total : "No attempt recorded yet") + '</div></div>';
    h += '<a class="btn ghost" href="#/lesson/' + m.lessons[0].id + '">Review lessons</a></div>';
    h += '<div id="quizList">' + quizList(m.quiz) + '</div>';
    h += '<p style="margin-top:1.4rem"><a href="#/exam">Take the full mock exam →</a></p>';
    h += '</div>';
    return h;
  }

  function quizList(qs) {
    var html = "";
    qs.forEach(function (q, i) {
      html += '<div class="qcard" data-q="' + i + '">';
      html += '<div class="qnum">Question ' + (i + 1) + '</div>';
      html += '<div class="qtext">' + esc(q.q) + '</div><ul class="opts">';
      q.options.forEach(function (o, j) {
        html += '<li><button class="opt" data-q="' + i + '" data-o="' + j + '"><span class="key">' + "ABCD"[j] + '</span><span>' + esc(o) + '</span></button></li>';
      });
      html += '</ul><p class="explain" hidden></p></div>';
    });
    return html;
  }

  function examView() {
    var best = state.exam;
    var h = '<div class="wrap">';
    h += '<div class="crumb"><a href="#/home">Course</a> / Mock exam</div>';
    h += '<h1>Mock exam</h1>';
    h += '<p class="lead">' + EXAM.length + ' questions across the whole standard. You need 80% to pass. Each answer reveals an explanation, so treat a wrong answer as a lesson pointer.</p>';
    h += '<div class="scorebar" data-quizar="exam"><div><div class="big" id="qScore">0/' + EXAM.length + '</div><div class="lbl">Correct</div></div>';
    h += '<div style="flex:1"><div class="lbl" id="qMsg">' + (best ? "Best so far: " + best.score + "/" + best.total : "No attempt recorded yet") + '</div></div>';
    h += '<a class="btn ghost" href="#/cheatsheet">Open cheat sheet</a></div>';
    h += '<div id="quizList">' + quizList(EXAM) + '</div>';
    h += '</div>';
    return h;
  }

  function interviewView() {
    var topics = [];
    INTERVIEW.forEach(function (q) { if (topics.indexOf(q.topic) < 0) topics.push(q.topic); });
    var h = '<div class="wrap">';
    h += '<div class="crumb"><a href="#/home">Course</a> / Interview preparation</div>';
    h += '<h1>Interview question bank</h1>';
    h += '<p class="lead">' + INTERVIEW.length + ' questions with model answers, grouped by topic. Answer aloud before revealing &mdash; recall beats rereading.</p>';
    h += '<div class="filters" id="topicFilters"><button class="on" data-topic="all">All</button>';
    topics.forEach(function (t) { h += '<button data-topic="' + esc(t) + '">' + esc(t) + '</button>'; });
    h += '</div>';
    h += '<div id="qaList">';
    h += '<div class="callout tip"><div class="ci">◆</div><div class="cb"><div class="ct">How to use this</div><p>Pick a topic, cover the answer, and speak for 60&ndash;90 seconds. Then open it and compare structure, not wording. Interviewers reward a clear chain &mdash; context, method, decision, evidence &mdash; over a recital of clause numbers.</p></div></div>';
    INTERVIEW.forEach(function (q, i) {
      h += '<details class="qa" data-topic="' + esc(q.topic) + '"><summary><span class="qmark">Q' + (i + 1) + '</span><span>' + esc(q.q) + '</span><span class="caret">›</span></summary>';
      h += '<div class="abody"><div class="tag">' + esc(q.topic) + '</div>' + q.a + '</div></details>';
    });
    h += '</div></div>';
    return h;
  }

  function glossaryView() {
    var sorted = GLOSSARY.slice().sort(function (a, b) { return a.term.localeCompare(b.term); });
    var h = '<div class="wrap">';
    h += '<div class="crumb"><a href="#/home">Course</a> / Glossary</div>';
    h += '<h1>Glossary</h1>';
    h += '<p class="lead">' + sorted.length + ' terms. Search by keyword &mdash; useful before an interview when you need precision rather than recall.</p>';
    h += '<label class="search" style="background:var(--surface);border-color:var(--line-2);color:var(--ink-3);display:flex;margin:1rem 0 1.2rem;max-width:26rem"><span>⌕</span><input id="glossSearch" type="search" placeholder="Filter terms…" style="color:var(--ink);width:100%" /></label>';
    h += '<div class="gloss" id="glossList">';
    sorted.forEach(function (g) {
      h += '<div class="gloss-item" data-text="' + esc((g.term + " " + g.def + " " + (g.abbr || "")).toLowerCase()) + '"><dl><dt>' + esc(g.term) + (g.abbr ? '<span class="abbr">' + esc(g.abbr) + '</span>' : '') + '</dt><dd>' + esc(g.def) + '</dd></dl></div>';
    });
    h += '</div></div>';
    return h;
  }

  function cheatSheet() {
    var h = '<div class="wrap-wide">';
    h += '<div class="crumb"><a href="#/home">Course</a> / Reference</div>';
    h += '<h1>One-page cheat sheet</h1>';
    h += '<p class="lead">Everything worth having in your head, on one screen. Print it, or revise it five minutes before an interview.</p>';
    h += '<div class="cheat-grid">';

    h += '<div class="cheat-card"><h4>Clause map</h4><ul>';
    h += '<li><strong>5</strong> Organisational management</li><li><strong>6</strong> Project-dependent management</li><li><strong>7</strong> Distributed activities</li><li><strong>8</strong> Continual activities</li><li><strong>9</strong> Concept</li><li><strong>10</strong> Product development</li><li><strong>11</strong> Validation</li><li><strong>12</strong> Production</li><li><strong>13</strong> Operations &amp; maintenance</li><li><strong>14</strong> End of support</li><li><strong>15</strong> TARA methods</li>';
    h += '</ul><p class="note-sm">Annex A work products · B culture · C CIA template · D relevance · E CAL · F impact · G feasibility · H TARA example</p></div>';

    h += '<div class="cheat-card"><h4>TARA chain</h4><ul>';
    h += '<li>Asset + property</li><li>Damage scenario</li><li>Threat scenario (asset + property + cause)</li><li>Impact: safety, financial, operational, privacy</li><li>Attack path (attack tree)</li><li>Feasibility per path: high/medium/low/very low</li><li>Risk value 1&ndash;5</li><li>Treatment: avoid / reduce / share / retain</li><li>Goal or claim &rarr; requirement &rarr; verification</li>';
    h += '</ul></div>';

    h += '<div class="cheat-card"><h4>Attack potential factors</h4><ul><li>Elapsed time</li><li>Expertise</li><li>Knowledge of the item</li><li>Window of opportunity</li><li>Equipment</li></ul><p class="note-sm">Sum &rarr; 0&ndash;13 high, 14&ndash;19 medium, 20&ndash;24 low, &ge;25 very low (typical Annex G style mapping).</p></div>';

    h += '<div class="cheat-card"><h4>Goals vs claims vs requirements</h4><p><strong>Goal</strong> &mdash; technology-independent outcome from a treatment decision.<br><strong>Claim</strong> &mdash; recorded rationale for retained/shared/out-of-scope risk, with approver.<br><strong>Requirement</strong> &mdash; verifiable, allocated specification including failure behaviour.</p></div>';

    h += '<div class="cheat-card"><h4>Definitions to get word-perfect</h4><p><strong>Item</strong> &mdash; system/function analysed, with boundary and interfaces.<br><strong>Asset</strong> &mdash; object whose compromise causes harm.<br><strong>Damage scenario</strong> &mdash; adverse consequence.<br><strong>Threat scenario</strong> &mdash; asset + property + cause.<br><strong>Attack path</strong> &mdash; steps realising the threat scenario.<br><strong>CAL</strong> &mdash; informative 1&ndash;4 rigour scale, not an ASIL.</p></div>';

    h += '<div class="cheat-card"><h4>21434 vs R155 vs 26262</h4><ul><li><strong>21434</strong>: voluntary standard, process and evidence, TARA, CAL</li><li><strong>R155</strong>: regulation, CSMS certificate + vehicle type approval, Annex 5 threats</li><li><strong>26262</strong>: voluntary standard, functional safety, HARA, ASIL</li><li><strong>R156 / 24089</strong>: software update management and engineering</li></ul></div>';

    h += '<div class="cheat-card"><h4>Release gate checklist</h4><ul><li>Case complete, assessed, no open majors</li><li>All requirements verified, deviations approved</li><li>Validation done at vehicle level</li><li>Production requirements and key management defined</li><li>Monitoring and incident response assigned</li><li>Residual risk accepted by an authorised role</li><li>Support period agreed</li></ul></div>';

    h += '<div class="cheat-card"><h4>Incident response</h4><p>Prepare &rarr; detect &rarr; triage &rarr; contain &rarr; analyse &rarr; remediate &rarr; recover &rarr; lessons learned (update TARA, requirements, tests, monitoring).</p><p class="note-sm">Per-incident plan with lead, actions, times, closure criteria.</p></div>';

    h += '<div class="cheat-card"><h4>Traceability to protect</h4><ul><li>Goal &rarr; requirement</li><li>Requirement &rarr; verification result</li><li>Threat scenario &rarr; treatment decision</li><li>Retained risk &rarr; claim &rarr; approver</li><li>TARA version &rarr; released software version</li></ul></div>';

    h += '<div class="cheat-card"><h4>Numbers worth remembering</h4><ul><li>Published 2021, supersedes SAE J3061</li><li>ISO/TC 22/SC 32 + SAE International</li><li>4 impact categories, 4 severity levels</li><li>4 feasibility levels, risk value 1&ndash;5</li><li>CAL 1&ndash;4, informative (Annex E)</li><li>R155 CSMS certificate valid up to 3 years</li></ul></div>';

    h += '</div>';
    h += '<div class="callout exam" style="margin-top:1.4rem"><div class="ci">●</div><div class="cb"><div class="ct">The 30-second answer</div><p>&ldquo;ISO 21434 is a risk-driven process standard for vehicle cybersecurity. It runs an organisation-level management system, a per-project plan and case, supplier interfaces and continual monitoring, around a lifecycle from concept to decommissioning, with a TARA method in clause 15 that turns threats into goals and requirements. It is evidenced through work products, not certificates.&rdquo;</p></div></div>';
    h += '</div>';
    return h;
  }

  /* ---------- quiz behaviour ---------- */
  var quizState = {}; // key -> {answered:Set, correct:int, total:int}

  function initQuiz(key, total) {
    if (!quizState[key]) quizState[key] = { answered: {}, correct: 0, total: total };
    return quizState[key];
  }
  function paintScore(key) {
    var st = quizState[key];
    if (!st) return;
    var scoreEl = document.getElementById("qScore");
    if (scoreEl) scoreEl.textContent = st.correct + "/" + st.total;
    var msgEl = document.getElementById("qMsg");
    if (!msgEl) return;
    var n = Object.keys(st.answered).length;
    if (n < st.total) {
      msgEl.textContent = n + " of " + st.total + " answered";
    } else {
      var p = Math.round((st.correct / st.total) * 100);
      var verdict = p >= 80 ? "Pass — ready for this material." : p >= 60 ? "Close — review the missed lessons and retry." : "Review the module lessons, then retry.";
      msgEl.textContent = "Score " + p + "% · " + verdict;
    }
  }
  function recordResult(key, st) {
    if (key === "exam") {
      var prev = state.exam;
      if (!prev || st.correct > prev.score) {
        state.exam = { score: st.correct, total: st.total };
        save();
      }
    } else {
      var old = state.quizzes[key];
      if (!old || st.correct > old.score) {
        state.quizzes[key] = { score: st.correct, total: st.total };
        save();
      }
    }
  }

  /* delegated clicks inside the view */
  view.addEventListener("click", function (e) {
    var complete = e.target.closest("[data-complete]");
    if (complete) {
      var id = complete.getAttribute("data-complete");
      if (state.lessons[id]) delete state.lessons[id];
      else state.lessons[id] = true;
      save();
      renderSidebar();
      render();
      return;
    }

    var opt = e.target.closest(".opt");
    if (opt && !opt.disabled) {
      var card = opt.closest(".qcard");
      var qIndex = parseInt(card.getAttribute("data-q"), 10);
      var chosen = parseInt(opt.getAttribute("data-o"), 10);
      var key = document.querySelector("[data-quizar]").getAttribute("data-quizar");
      var questions = key === "exam" ? EXAM : (findModule(key) || { quiz: [] }).quiz;
      var q = questions[qIndex];
      if (!q) return;

      var buttons = card.querySelectorAll(".opt");
      buttons.forEach(function (b) {
        b.disabled = true;
        var j = parseInt(b.getAttribute("data-o"), 10);
        if (j === q.answer) b.classList.add("correct");
        if (j === chosen && chosen !== q.answer) b.classList.add("wrong");
      });
      var ex = card.querySelector(".explain");
      if (ex) {
        ex.hidden = false;
        ex.innerHTML = "<b>" + (chosen === q.answer ? "Correct." : "Not quite.") + "</b> " + esc(q.explain);
      }

      var st = initQuiz(key, questions.length);
      if (!st.answered[qIndex]) {
        st.answered[qIndex] = true;
        if (chosen === q.answer) st.correct++;
      }
      paintScore(key);
      if (Object.keys(st.answered).length === st.total) recordResult(key, st);

      var topicBtn = document.querySelector('#topicFilters button[data-topic]');
      if (topicBtn) return;
      return;
    }

    var filter = e.target.closest("#topicFilters button");
    if (filter) {
      var topic = filter.getAttribute("data-topic");
      document.querySelectorAll("#topicFilters button").forEach(function (b) { b.classList.remove("on"); });
      filter.classList.add("on");
      document.querySelectorAll("#qaList details.qa").forEach(function (d) {
        d.style.display = (topic === "all" || d.getAttribute("data-topic") === topic) ? "" : "none";
      });
      return;
    }
  });

  view.addEventListener("input", function (e) {
    if (e.target.id === "glossSearch") {
      var term = e.target.value.toLowerCase().trim();
      document.querySelectorAll("#glossList .gloss-item").forEach(function (item) {
        var text = item.getAttribute("data-text") || "";
        item.style.display = !term || text.indexOf(term) >= 0 ? "" : "none";
      });
    }
  });

  /* ---------- search ---------- */
  function runSearch(term) {
    term = term.toLowerCase().trim();
    if (!term) { renderSidebar(); return; }
    var matches = flat.filter(function (x) {
      return (x.lesson.title + " " + x.lesson.body).toLowerCase().indexOf(term) >= 0;
    });
    var html = '<div class="nav-heading">' + matches.length + ' lesson' + (matches.length === 1 ? "" : "s") + ' matching "' + esc(term) + '"</div>';
    if (!matches.length) {
      html += '<p style="color:#8b95a5;font-size:.8rem;padding:.4rem .55rem">No lessons match. Try "TARA", "CAL" or "supplier".</p>';
    }
    matches.slice(0, 30).forEach(function (x) {
      html += '<a href="#/lesson/' + x.lesson.id + '" style="display:flex;gap:.5rem;padding:.4rem .55rem;color:#c6cedb;text-decoration:none;font-size:.8rem;border-radius:7px">';
      html += '<span style="color:#7db9f5;font:.6rem var(--mono)">' + x.module.num + '</span><span>' + esc(x.lesson.title) + '</span></a>';
    });
    sidebar.innerHTML = html;
  }
  if (searchInput) {
    searchInput.addEventListener("input", function () { runSearch(searchInput.value); });
    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        var term = searchInput.value.toLowerCase().trim();
        if (!term) return;
        var hit = flat.filter(function (x) { return (x.lesson.title + " " + x.lesson.body).toLowerCase().indexOf(term) >= 0; })[0];
        if (hit) { go("lesson/" + hit.lesson.id); searchInput.blur(); }
      }
      if (e.key === "Escape") { searchInput.value = ""; renderSidebar(); }
    });
  }

  /* ---------- router ---------- */
  function render() {
    var r = route();
    var html;
    if (r === "home") html = home();
    else if (r.indexOf("lesson/") === 0) html = lessonView(r.split("/")[1]);
    else if (r.indexOf("quiz/") === 0) html = quizView(r.split("/")[1]);
    else if (r === "exam") html = examView();
    else if (r === "interview") html = interviewView();
    else if (r === "glossary") html = glossaryView();
    else if (r === "cheatsheet") html = cheatSheet();
    else html = '<div class="wrap"><div class="empty">Page not found. <a href="#/home">Back to overview</a></div></div>';

    view.innerHTML = html;

    var quizBar = document.querySelector("[data-quizar]");
    if (quizBar) {
      var key = quizBar.getAttribute("data-quizar");
      var total = key === "exam" ? EXAM.length : (findModule(key) || { quiz: [] }).quiz.length;
      initQuiz(key, total);
      paintScore(key);
      /* restore recorded best message if fresh */
      var st = quizState[key];
      if (!Object.keys(st.answered).length) {
        var best = key === "exam" ? state.exam : state.quizzes[key];
        var msg = document.getElementById("qMsg");
        if (msg) msg.textContent = best ? "Best so far: " + best.score + "/" + best.total : "No attempt recorded yet";
      }
    }
    paintProgress();
  }

  function closeMenu() {
    sidebar.classList.remove("open");
    if (scrim) scrim.classList.remove("show");
  }

  function onRoute() {
    renderSidebar();
    render();
    closeMenu();
    window.scrollTo({ top: 0, behavior: "instant" in document.documentElement.style ? "instant" : "auto" });
    view.focus({ preventScroll: true });
  }

  window.addEventListener("hashchange", onRoute);

  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      var open = sidebar.classList.toggle("open");
      if (scrim) scrim.classList.toggle("show", open);
    });
  }
  if (scrim) scrim.addEventListener("click", closeMenu);

  /* keyboard: n = next lesson, c = mark complete */
  document.addEventListener("keydown", function (e) {
    if (e.target.matches("input, textarea") || e.metaKey || e.ctrlKey || e.altKey) return;
    var r = route();
    if (r.indexOf("lesson/") !== 0) return;
    var found = findLesson(r.split("/")[1]);
    if (!found) return;
    if (e.key === "n" && flat[found.index + 1]) go("lesson/" + flat[found.index + 1].lesson.id);
    if (e.key === "c") {
      var id = found.lesson.id;
      if (state.lessons[id]) delete state.lessons[id]; else state.lessons[id] = true;
      save(); renderSidebar(); render();
    }
  });

  /* boot */
  if (!location.hash) location.hash = "#/home";
  onRoute();
})();
