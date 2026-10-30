document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
     CONFIGURATION
  ===================================================== */
  const CONFIG = {
    limits: {
      maxSessionLines: 100,
      maxRandomLogs: 30,
      hardCap: 500,
    },
    timing: {
      initialBootGreen: 1500,
      bootLogDelay: 400,
      randomLogMin: 2000,
      randomLogMax: 5000,
      panicDuration: 5000,
      panicSpamInterval: 400,
      nukeCountdownInterval: 1000,
      nukeDuration: 5,
      bsodRebootDelay: 4500,
      bsodAnimationDuration: 2600,
      bsodAnimationStep: 40,
      danceDuration: 5000,
      guardBlinkDuration: 700,
    },
    network: {
      latencyMin: 5,
      latencyMax: 85,
      lossSpikeProbability: 0.15,
      lossNormalMax: 3,
      lossSpikeMin: 5,
      lossSpikeMax: 20,
      unstableThreshold: 10,
    },
    thresholds: {
      loadWarn: 50,
      loadFail: 75,
    },
    probabilities: {
      summonSuccess: 0.8,
      weirdLogs: 0.05,
    },
    asciiArt: {
      minLines: 40,
      maxLines: 80,
      minLinesAfter: 50,
      maxLinesAfter: 100,
    },
    statusUpdate: {
      slowInterval: 10000,
      fastInterval: 5000,
    },
    security: {
      nukePassword: "whydoesthiswork",
    },
    // Cached computed values
    computed: {
      bsodSteps: 0,
      bsodPerStep: 0,
    },
  };

  // Initialize computed values
  CONFIG.computed.bsodSteps = Math.ceil(
    CONFIG.timing.bsodAnimationDuration / CONFIG.timing.bsodAnimationStep,
  );
  CONFIG.computed.bsodPerStep = Math.ceil(100 / CONFIG.computed.bsodSteps);

  /* =====================================================
     CONSTANTS
  ===================================================== */
  const LOG_MODES = Object.freeze({
    NORMAL: "normal",
    PANIC: "panic",
    NUKE: "nuke",
    BSOD: "bsod",
  });

  const BAR_STATES = Object.freeze({
    OK: "ok",
    WARN: "warn",
    FAIL: "fail",
    MELTDOWN: "meltdown",
    INSTABILITY: "instability",
  });

  const OVERLAY_CONFIG = [
    {
      key: "panic",
      id: "panic-overlay",
      innerClass: "panic-inner",
      contentId: "panic-content",
      children: [
        { className: "panic-text", text: "!! SYSTEM INSTABILITY DETECTED !!" },
        { className: "panic-text", text: "CONTAINMENT FAILURE POSSIBLE" },
        {
          className: "panic-text small",
          text: "attempting graceful denial...",
        },
      ],
    },
    {
      key: "bsod",
      id: "bsod-overlay",
      innerClass: "bsod-inner",
      contentId: "bsod-content",
    },
    {
      key: "dance",
      id: "dance-overlay",
      innerClass: "dance-inner",
      contentId: "dance-content",
    },
  ];

  const STATUS_CARD_CONFIG = [
    {
      key: "cpu",
      label: "CPU",
      valueId: "cpu-val",
      initialValue: "--%",
      barId: "cpu-bar",
      footId: "cpu-foot",
      footText: "process priority: vibes",
    },
    {
      key: "mem",
      label: "MEM",
      valueId: "mem-val",
      initialValue: "-- MB",
      barId: "mem-bar",
      footId: "mem-foot",
      footText: "leaks classified as features",
    },
    {
      key: "temp",
      label: "TEMP",
      valueId: "temp-val",
      initialValue: "--°C",
      barId: "temp-bar",
      footId: "temp-foot",
      footText: "thermal status: questionable",
      cardId: "temp-card",
    },
    {
      key: "net",
      label: "NET",
      valueId: "net-val",
      initialValue: "--",
      footId: "net-foot",
      footText:
        "uplink: -- | latency: -- ms | packet_loss: --% | status: questionable",
    },
  ];

  const COMMAND_CONFIG = [
    {
      type: "button",
      label: "help",
      cmd: "help",
      title: "Show available commands",
      controls: "mainLog",
    },
    {
      type: "button",
      label: "/summon",
      cmd: "/summon",
      title: "Summon AI assistant",
      controls: "mainLog",
    },
    {
      type: "button",
      label: "/dance",
      cmd: "/dance",
      title: "Trigger dance animation",
      controls: "dance-overlay",
      extraClasses: "cmd-fun",
    },
    {
      type: "button",
      label: "/panic",
      cmd: "/panic",
      title: "Trigger system panic alert",
      controls: "panic-overlay",
      extraClasses: "cmd-warn",
    },
    { type: "guard" },
    {
      type: "button",
      label: "clear",
      cmd: "clear",
      title: "Clear log output",
      controls: "output",
    },
  ];

  /* =====================================================
     UTIL
  ===================================================== */
  const util = Object.freeze({
    pickRandom: (arr) => arr[(Math.random() * arr.length) | 0],
    randBetween: (a, b) => ((Math.random() * (b - a + 1)) | 0) + a,
  });

  /**
   * Debounces a function to limit how often it can be called
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function} - Debounced function
   */
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  /**
   * Helper function to safely update element text content
   * @param {HTMLElement|null} element - The element to update
   * @param {string} content - The text content to set
   */
  function updateElement(element, content) {
    if (element) element.textContent = content;
  }

  /**
   * Helper function to clear and close overlay with optional content reset
   * @param {HTMLElement} overlayEl - The overlay element
   * @param {HTMLElement|null} contentEl - Optional content element to clear
   */
  function clearAndCloseOverlay(overlayEl, contentEl = null) {
    closeOverlay(overlayEl);
    if (contentEl) setChildren(contentEl);
  }

  // Logging mode state
  let logMode = LOG_MODES.NORMAL;
  const isInSpecialMode = () => logMode !== LOG_MODES.NORMAL;
  const setLogMode = (mode) => {
    logMode = mode;
  };

  /* =====================================================
     STATIC TEXT / DATA
  ===================================================== */
  const asciiBox = [
    "╔═══════════════════════════════════════╗",
    "║       whydoesthiswork.localhost       ║",
    "║        it runs. somehow. maybe.       ║",
    "╚═══════════════════════════════════════╝",
    "",
    "",
  ].join("\n");

  const bootLogs = [
    "[sys] ── boot sequence started",
    "[boot] mounting unstable container..............  [==>        ]  23%",
    "[ok] local model jammed into RAM. questionable. [====>      ]  47%",
    "[warn] token buffer overflow ignored.           [=======>   ]  65%",
    "[info] patching logic with tape.                  [========>  ]  78%",
    "[fail] reasoning module missing. using vibes.   [=========> ]  89%",
    "[ok] model now hallucinating confidently.       [==========>] 100%",
    "[sys] serving at whydoesthiswork.localhost",
    "",
  ];

  const randomLogs = [
    "[debug] shuffling attention weights...",
    "[info] running out of tokens, trying anyway.",
    "[ok] sanity check skipped (as usual).",
    "[sys] memory leaks embraced as personality.",
    "[log] parsing markdown with violence.",
    "[debug] retraining based on vibes...",
    "[info] chat loop complete. starting over.",
    "[ok] output sounds confident. must be right.",
    "[trace] hallucination.c: line 42",
    "[sys] YOLO mode engaged.",
    "[note] tokens are people too.",
    "[debug] cache hit rate: suspicious.",
    "[info] tokens flowing smoothly.",
    "[ok] all systems nominal (probably).",
    "[sys] background tasks humming along.",
    "[log] context window expanded.",
    "[debug] attention heads aligned.",
    "[info] processing batch quietly.",
    "[ok] latency within acceptable range.",
    "[sys] memory management: stable.",
    "[log] inference cycle complete.",
    "[debug] temperature set to default.",
    "[info] context preserved.",
    "[ok] checkpoint saved.",
    "[sys] idle cycles utilized.",
    "[log] batch processed.",
    "[warn] latency spike blamed on the user.",
    "[fail] tried logic. got sarcasm.",
  ];

  const weirdLogs = [
    "[???] unexpected clarity detected.",
    "[glitch] ¯\\_(ツ)_/¯ protocol initiated.",
    "[sys] echo chamber feedback loop engaged.",
    "[note] reality index drifting off baseline.",
    "[err] sanity check failed: 'NaN'",
    "[ghost] who coded this?",
    "[glitch] ~s̷y̴s̷t̸e̷m̷~",
  ];

  const asciiVisitors = [
    `              
        (\\-^-/)
        |=   =|
        | ___ |
       /:_____:\\
       \\/_# #_\\//
       /|\\\\_=_/|\\\\
       \\\\_\\\\___/_/
        /_/ \\\\_\\\\
      [robot-01]`,
    `       .-.
      (o o)
      | O \\
       \\   \\_
      .-\\___)=-.
     /         \\
    /  ~ AI ~   \\
    \\  spirit  /
     '._   _.'
        \`-'
      [cryptid]`,
    `      /\\
     /  \\    _  _
    / /\\ \\  ( \\/ )
   / ____ \\  \\  /
  /_/    \\_\\  \\/
   ( ascii mothman )
`,
  ];

  /* =====================================================
     DOM REFERENCES (cached at initialization)
  ===================================================== */
  const shell = document.querySelector(".console-shell");
  const output = document.getElementById("output");
  const cmdline = document.getElementById("cmdline");
  const cmdBar = document.querySelector(".cmd-bar");
  const themeToggleBtn = document.getElementById("themeToggle");
  const logPanel = document.querySelector(".log-panel");
  const overlayMount = document.getElementById("overlay-root");
  const { overlays: overlayEls, contents: overlayContents } =
    renderStaticOverlays(overlayMount);
  buildCommandButtons(document.getElementById("cmd-buttons"));

  // Overlays
  const overlays = {
    panic: overlayEls.panic || document.getElementById("panic-overlay"),
    bsod: overlayEls.bsod || document.getElementById("bsod-overlay"),
    dance: overlayEls.dance || document.getElementById("dance-overlay"),
    auth: document.getElementById("auth-overlay"),
  };
  const panicContent =
    overlayContents.panic || document.getElementById("panic-content");
  const bsodContent =
    overlayContents.bsod || document.getElementById("bsod-content");
  const authContent = document.getElementById("auth-content");

  /**
   * Utility to build a div with optional textContent
   * @param {string} className
   * @param {string} [text]
   * @returns {HTMLDivElement}
   */
  function createDiv(className, text) {
    const div = document.createElement("div");
    div.className = className;
    if (text !== undefined) div.textContent = text;
    return div;
  }

  /**
   * Replaces children with provided nodes while keeping older browser support
   * @param {HTMLElement} container
   * @param {...Node} nodes
   */
  function setChildren(container, ...nodes) {
    if (!container) return;
    if (typeof container.replaceChildren === "function") {
      container.replaceChildren(...nodes);
      return;
    }
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    nodes.forEach((node) => container.appendChild(node));
  }

  /**
   * Renders the panic overlay alert lines without innerHTML
   * @param {HTMLElement} container
   */
  function renderPanicAlert(container) {
    if (!container) return;
    setChildren(
      container,
      createDiv("panic-text", "!! SYSTEM INSTABILITY DETECTED !!"),
      createDiv("panic-text", "CONTAINMENT FAILURE POSSIBLE"),
      createDiv("panic-text small", "attempting graceful denial..."),
    );
  }

  /**
   * Renders the BSOD content and returns the percentage element
   * @param {HTMLElement} container
   * @returns {HTMLElement|null}
   */
  function renderBSODContent(container) {
    if (!container) return null;

    const face = createDiv("bsod-face", ":(");

    const msg = createDiv("bsod-msg");
    msg.append(
      "Your system ran into a problem and needs to restart.",
      document.createElement("br"),
      "We're just collecting some error info, and then we'll restart for you.",
    );

    const progressMsg = createDiv("bsod-msg");
    const pct = document.createElement("span");
    pct.id = "bsod-pct";
    pct.textContent = "0%";
    progressMsg.append(pct, " complete");

    const code = createDiv("bsod-code", "STOP_CODE: VIBE_EXECUTION_FAILURE");

    setChildren(container, face, msg, progressMsg, code);
    return pct;
  }

  /**
   * Populates the dance overlay with animated rows
   * @param {HTMLElement} container
   * @param {number} [rows=6]
   */
  function renderDanceRows(container, rows = 6) {
    if (!container) return;
    const children = [];
    for (let i = 0; i < rows; i++) {
      const row = createDiv(
        `dance-row delay-${i}`,
        "(>'-')>   <('-'<)   ^('-')^",
      );
      children.push(row);
    }
    setChildren(container, ...children);
  }

  /**
   * Creates overlays from config data to avoid duplicated markup
   * @param {HTMLElement|null} mount
   * @returns {{overlays: Record<string, HTMLElement>, contents: Record<string, HTMLElement>}}
   */
  function renderStaticOverlays(mount) {
    const overlayMap = {};
    const contentMap = {};
    if (!mount) return { overlays: overlayMap, contents: contentMap };

    const nodes = OVERLAY_CONFIG.map((cfg) => {
      const wrapper = document.createElement("div");
      wrapper.id = cfg.id;
      wrapper.setAttribute("role", "dialog");
      wrapper.setAttribute("aria-modal", "true");
      wrapper.hidden = true;

      const inner = createDiv(cfg.innerClass || "");
      if (cfg.contentId) inner.id = cfg.contentId;

      if (cfg.children?.length) {
        const children = cfg.children.map((child) =>
          createDiv(child.className, child.text),
        );
        setChildren(inner, ...children);
      }

      wrapper.appendChild(inner);
      overlayMap[cfg.key] = wrapper;
      contentMap[cfg.key] = inner;
      return wrapper;
    });

    mount.replaceWith(...nodes);
    return { overlays: overlayMap, contents: contentMap };
  }

  /**
   * Renders status cards based on config
   * @param {HTMLElement|null} container
   * @returns {Record<string, StatusCard>}
   */
  function buildStatusCards(container) {
    if (!container) {
      return STATUS_CARD_CONFIG.reduce((acc, cfg) => {
        const entry = {
          val: document.getElementById(cfg.valueId),
          foot: document.getElementById(cfg.footId),
        };
        if (cfg.barId) entry.bar = document.getElementById(cfg.barId);
        acc[cfg.key] = entry;
        return acc;
      }, {});
    }

    const refs = {};

    const cards = STATUS_CARD_CONFIG.map((cfg) => {
      const card = document.createElement("div");
      card.className = "status-card";
      if (cfg.cardId) card.id = cfg.cardId;

      const head = createDiv("status-head");
      const label = document.createElement("span");
      label.className = "status-label";
      label.textContent = cfg.label;

      const value = document.createElement("span");
      value.className = "status-val";
      value.textContent = cfg.initialValue;
      value.id = cfg.valueId;
      value.setAttribute("role", "status");
      head.append(label, value);

      const cardRefs = { val: value };

      if (cfg.barId) {
        const barWrap = createDiv("status-bar-wrap");
        const bar = createDiv("status-bar-fill ok");
        bar.id = cfg.barId;
        barWrap.appendChild(bar);
        card.append(head, barWrap);
        cardRefs.bar = bar;
      } else {
        card.appendChild(head);
      }

      const foot = createDiv("status-foot", cfg.footText);
      foot.id = cfg.footId;
      card.appendChild(foot);
      cardRefs.foot = foot;

      refs[cfg.key] = cardRefs;
      return card;
    });

    setChildren(container, ...cards);
    return refs;
  }

  /**
   * Builds the command button cluster (inc. guard) from config
   * @param {HTMLElement|null} container
   */
  function buildCommandButtons(container) {
    if (!container) return;
    const controls = COMMAND_CONFIG.map((cfg) => {
      if (cfg.type === "button") {
        return createCommandButton(cfg);
      }
      if (cfg.type === "guard") {
        return createGuardAssembly();
      }
      return null;
    }).filter(Boolean);

    setChildren(container, ...controls);
  }

  /**
   * @param {{label: string, cmd: string, title: string, controls?: string, extraClasses?: string}} cfg
   * @returns {HTMLButtonElement}
   */
  function createCommandButton(cfg) {
    const btn = document.createElement("button");
    btn.className = ["cmd-btn", cfg.extraClasses].filter(Boolean).join(" ");
    btn.dataset.cmd = cfg.cmd;
    btn.type = "button";
    btn.title = cfg.title;
    if (cfg.controls) btn.setAttribute("aria-controls", cfg.controls);
    btn.textContent = cfg.label;
    return btn;
  }

  /**
   * @returns {HTMLDivElement}
   */
  function createGuardAssembly() {
    const wrapper = document.createElement("div");
    wrapper.className = "nuke-guard";

    const nukeBtn = document.createElement("button");
    nukeBtn.className = "cmd-btn cmd-danger nuke-btn";
    nukeBtn.dataset.cmd = "/nuke";
    nukeBtn.type = "button";
    nukeBtn.id = "nuke-btn";
    nukeBtn.title = "Nuclear option - requires authentication";
    nukeBtn.setAttribute("aria-controls", "bsod-overlay auth-overlay");
    nukeBtn.disabled = true;
    nukeBtn.textContent = "/nuke";

    const hinge = createDiv("guard-hinge");

    const guardSwitch = document.createElement("button");
    guardSwitch.className = "guard-cover";
    guardSwitch.id = "guard-switch";
    guardSwitch.type = "button";
    guardSwitch.setAttribute("aria-pressed", "false");
    guardSwitch.setAttribute("aria-label", "Safety guard - click to open");
    guardSwitch.title = "Guard closed – click to open";
    guardSwitch.setAttribute("aria-controls", "nuke-btn");

    const guardLabel = document.createElement("span");
    guardLabel.className = "guard-label-main";
    guardLabel.textContent = "DANGER";
    guardSwitch.appendChild(guardLabel);

    wrapper.append(nukeBtn, hinge, guardSwitch);
    return wrapper;
  }

  /**
   * @typedef {Object} StatusCard
   * @property {HTMLElement|null} bar
   * @property {HTMLElement|null} val
   * @property {HTMLElement|null} foot
   */

  /**
   * @typedef {Object} StatusCards
   * @property {StatusCard} cpu
   * @property {StatusCard} mem
   * @property {StatusCard} temp
   * @property {Omit<StatusCard, 'bar'>} net
   */

  /** @type {StatusCards} */
  const statusCards = buildStatusCards(document.getElementById("status-grid"));

  /* =====================================================
     A11Y HELPERS: OVERLAYS & FOCUS
  ===================================================== */
  let lastFocusEl = null;

  /**
   * Opens an overlay and manages focus for accessibility
   * @param {HTMLElement} overlayEl - The overlay element to open
   * @param {HTMLElement} [focusEl] - Optional element to focus
   */
  function openOverlay(overlayEl, focusEl) {
    lastFocusEl =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    overlayEl?.removeAttribute("hidden");
    overlayEl?.classList.add("active");
    overlayEl?.setAttribute("aria-hidden", "false");

    const target = focusEl || overlayEl;
    if (!target?.hasAttribute("tabindex"))
      target?.setAttribute("tabindex", "-1");
    target?.focus({ preventScroll: true });
  }

  /**
   * Closes an overlay and restores focus
   * @param {HTMLElement} overlayEl - The overlay element to close
   */
  function closeOverlay(overlayEl) {
    overlayEl?.classList.remove("active");
    overlayEl?.setAttribute("aria-hidden", "true");
    overlayEl?.setAttribute("hidden", "");
    if (lastFocusEl && document.contains(lastFocusEl)) {
      lastFocusEl.focus({ preventScroll: true });
    } else {
      cmdline?.focus({ preventScroll: true });
    }
  }

  /**
   * Overlay manager for consistent overlay handling
   */
  const overlayManager = {
    /**
     * Opens an overlay with setup callback
     * @param {HTMLElement} overlay - Overlay element
     * @param {HTMLElement|null} focusElement - Element to focus
     * @param {Function} [setupCallback] - Setup function
     */
    open(overlay, focusElement, setupCallback) {
      setupCallback?.();
      openOverlay(overlay, focusElement);
    },

    /**
     * Closes an overlay with cleanup callback
     * @param {HTMLElement} overlay - Overlay element
     * @param {Function} [cleanupCallback] - Cleanup function
     */
    close(overlay, cleanupCallback) {
      closeOverlay(overlay);
      cleanupCallback?.();
    },

    /**
     * Shows an overlay temporarily
     * @param {HTMLElement} overlay - Overlay element
     * @param {number} duration - Duration in ms
     * @param {Function} [setupCallback] - Setup function
     * @param {Function} [cleanupCallback] - Cleanup function
     */
    temporary(overlay, duration, setupCallback, cleanupCallback) {
      this.open(overlay, null, setupCallback);
      setTimeout(() => {
        this.close(overlay, cleanupCallback);
      }, duration);
    },
  };

  /* =====================================================
     TIMERS & SCHEDULING (Class-based for better organization)
  ===================================================== */
  class TimerManager {
    constructor() {
      this.intervals = new Set();
      this.timeouts = new Set();
    }

    addInterval(id) {
      this.intervals.add(id);
      return id;
    }

    addTimeout(id) {
      this.timeouts.add(id);
      return id;
    }

    clear(id) {
      if (this.intervals.has(id)) {
        clearInterval(id);
        this.intervals.delete(id);
      }
      if (this.timeouts.has(id)) {
        clearTimeout(id);
        this.timeouts.delete(id);
      }
    }

    clearAll() {
      this.intervals.forEach(clearInterval);
      this.timeouts.forEach(clearTimeout);
      this.intervals.clear();
      this.timeouts.clear();
    }
  }

  const timers = new TimerManager();

  /**
   * Schedules a recurring function call
   * @param {number} ms - Interval in milliseconds
   * @param {Function} fn - Function to call
   * @returns {number} - Timer ID
   */
  function every(ms, fn) {
    const h = setInterval(() => {
      if (!document.hidden) fn();
    }, ms);
    return timers.addInterval(h);
  }

  /**
   * Schedules a one-time function call
   * @param {Function} fn - Function to call
   * @param {number} delay - Delay in milliseconds
   * @returns {number} - Timer ID
   */
  function schedule(fn, delay) {
    const h = setTimeout(() => {
      if (!document.hidden) fn();
    }, delay);
    return timers.addTimeout(h);
  }

  /**
   * Updates fast-changing status (network card)
   */
  function updateFastStatus() {
    const mode = pickNetMode();
    const latency = util.randBetween(
      CONFIG.network.latencyMin,
      CONFIG.network.latencyMax,
    );
    const loss =
      Math.random() < CONFIG.network.lossSpikeProbability
        ? util.randBetween(
            CONFIG.network.lossSpikeMin,
            CONFIG.network.lossSpikeMax,
          )
        : util.randBetween(0, CONFIG.network.lossNormalMax);

    // Update stored stats
    Object.assign(lastStats, {
      netMode: mode,
      latencyMs: latency,
      lossPct: loss,
    });

    // Update NET display
    const status =
      loss > CONFIG.network.unstableThreshold ? "unstable" : "questionable";
    updateElement(statusCards.net.val, mode);
    updateElement(
      statusCards.net.foot,
      `uplink: ${mode} | latency: ${latency} ms | packet_loss: ${loss}% | status: ${status}`,
    );
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      timers.clearAll();
      __loopsRunning = false;
    } else {
      startStatusLoops();
    }
  });

  /* =====================================================
     THEME TOGGLE
  ===================================================== */
  const THEME_MODES = Object.freeze(["dark", "light", "system"]);
  const THEME_STORAGE_KEY = "themeMode";
  const systemThemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  let currentThemeMode = "system";

  /**
   * Returns whether a mode is a valid theme mode.
   * @param {string|null} mode
   * @returns {boolean}
   */
  function isThemeMode(mode) {
    return typeof mode === "string" && THEME_MODES.includes(mode);
  }

  /**
   * Resolves the active visual theme for system mode.
   * @returns {"dark"|"light"}
   */
  function getSystemTheme() {
    return systemThemeQuery.matches ? "dark" : "light";
  }

  /**
   * Resolves a mode to a concrete visual theme.
   * @param {"dark"|"light"|"system"} mode
   * @returns {"dark"|"light"}
   */
  function resolveThemeMode(mode) {
    return mode === "system" ? getSystemTheme() : mode;
  }

  /**
   * Returns the next mode in the cycle.
   * @param {"dark"|"light"|"system"} mode
   * @returns {"dark"|"light"|"system"}
   */
  function nextThemeMode(mode) {
    const idx = THEME_MODES.indexOf(mode);
    return THEME_MODES[(idx + 1) % THEME_MODES.length];
  }

  /**
   * Sets the theme mode
   * @param {"dark"|"light"|"system"} mode - Theme mode
   * @param {{persist?: boolean}} [options]
   */
  function setTheme(mode, options = {}) {
    const safeMode = isThemeMode(mode) ? mode : "system";
    const resolvedMode = resolveThemeMode(safeMode);
    currentThemeMode = safeMode;

    if (shell) shell.dataset.theme = resolvedMode;
    updateElement(
      themeToggleBtn,
      safeMode === "system"
        ? `mode: system (${resolvedMode})`
        : `mode: ${safeMode}`,
    );
    themeToggleBtn?.setAttribute(
      "aria-label",
      `Theme mode: ${safeMode}. Activate to cycle dark, light, and system.`,
    );
    themeToggleBtn?.setAttribute(
      "aria-pressed",
      safeMode === "system" ? "mixed" : String(safeMode === "dark"),
    );

    if (options.persist) {
      localStorage.setItem(THEME_STORAGE_KEY, safeMode);
    }
  }

  /**
   * Applies theme from localStorage
   */
  function applyThemeFromStorage() {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    setTheme(isThemeMode(saved) ? saved : "system");
  }

  /**
   * Toggles between dark, light, and system themes
   */
  function toggleTheme() {
    const next = nextThemeMode(currentThemeMode);
    setTheme(next, { persist: true });
    clickBlip();
  }

  /**
   * Re-applies theme when system preference changes while in system mode.
   */
  function handleSystemThemeChange() {
    if (currentThemeMode === "system") {
      setTheme("system");
    }
  }

  if (typeof systemThemeQuery.addEventListener === "function") {
    systemThemeQuery.addEventListener("change", handleSystemThemeChange);
  } else if (typeof systemThemeQuery.addListener === "function") {
    systemThemeQuery.addListener(handleSystemThemeChange);
  }

  themeToggleBtn?.addEventListener("click", toggleTheme);
  applyThemeFromStorage();

  /* =====================================================
     AUDIO CONTEXT + SFX
  ===================================================== */
  let audioCtx;
  // Track last error-beep time to avoid overlapping with click blips
  let lastErrorBeepAt = 0;

  /**
   * Initializes and returns the audio context
   * @returns {AudioContext} - The audio context
   */
  function initAudioCtx() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  }

  /**
   * Ensures the AudioContext exists and is running before scheduling audio.
   * Returns a Promise that resolves with the active context.
   */
  function ensureAudioReady() {
    const ctx = initAudioCtx();
    if (ctx.state === "suspended") {
      // resume() returns a promise; schedule audio only after it resolves
      return ctx
        .resume()
        .then(() => ctx)
        .catch(() => ctx);
    }
    return Promise.resolve(ctx);
  }

  /**
   * Error boundary wrapper for audio functions
   * @param {Function} fn - Audio function to wrap
   * @returns {Function} - Wrapped function
   */
  function safeAudio(fn) {
    return (...args) => {
      try {
        return fn(...args);
      } catch (e) {
        console.warn("Audio error:", e);
      }
    };
  }

  /**
   * Plays a UI click/blip sound
   */
  const clickBlip = safeAudio(() => {
    // If an error beep just played, skip the click blip to prevent overlap
    if (performance.now() - lastErrorBeepAt < 200) return;
    const ctx = initAudioCtx();
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "square";
    o.frequency.value = 600;
    o.connect(g);
    g.connect(ctx.destination);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.15, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);
    o.start(t);
    o.stop(t + 0.09);
  });

  /**
   * Plays an error beep sound
   */
  const playErrorBeep = safeAudio(() => {
    lastErrorBeepAt = performance.now();
    const ctx = initAudioCtx();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sawtooth";
    o.frequency.value = 220;
    o.connect(g);
    g.connect(ctx.destination);
    const t = ctx.currentTime;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.15, t + 0.02);
    o.start(t);
    o.frequency.exponentialRampToValueAtTime(110, t + 0.12);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);
    o.stop(t + 0.16);
  });

  /**
   * Plays a panic alarm sound
   */
  const playPanicAlarm = safeAudio(() => {
    const ctx = initAudioCtx();
    const startT = ctx.currentTime;
    function toneBurst(freq, startOffset) {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "square";
      o.frequency.value = freq;
      o.connect(g);
      g.connect(ctx.destination);

      g.gain.setValueAtTime(0.0001, startT + startOffset);
      g.gain.linearRampToValueAtTime(0.2, startT + startOffset + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, startT + startOffset + 0.35);

      o.start(startT + startOffset);
      o.stop(startT + startOffset + 0.4);
    }
    for (let i = 0; i < 12; i++) {
      const off = i * 0.4;
      const f = i % 2 === 0 ? 440 : 220;
      toneBurst(f, off);
    }
  });

  /**
   * Plays a nuke countdown alarm; schedules beeps only after the
   * AudioContext is running so they align with the visible countdown.
   */
  function playNukeAlarm() {
    ensureAudioReady()
      .then((ctx) => {
        const base = ctx.currentTime;
        const total = Math.max(0, CONFIG.timing.nukeDuration - 0.05);

        function beepBurst(startOffset) {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = "square";
          o.frequency.value = 880;
          o.connect(g);
          g.connect(ctx.destination);

          g.gain.setValueAtTime(0.0001, base + startOffset);
          g.gain.linearRampToValueAtTime(0.25, base + startOffset + 0.01);
          g.gain.exponentialRampToValueAtTime(
            0.0001,
            base + startOffset + 0.12,
          );

          o.start(base + startOffset);
          o.stop(base + startOffset + 0.15);
        }

        // schedule short beeps throughout the visible countdown
        for (let off = 0; off < total; off += 0.25) {
          beepBurst(off);
        }
      })
      .catch((e) => {
        console.warn("Audio init error for nuke alarm:", e);
      });
  }

  /**
   * Immediate short beep for each visible countdown tick.
   */
  function playTickBeep() {
    ensureAudioReady()
      .then((ctx) => {
        const t = ctx.currentTime;
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "square";
        o.frequency.value = 880;
        o.connect(g);
        g.connect(ctx.destination);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.linearRampToValueAtTime(0.2, t + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.11);
        o.start(t);
        o.stop(t + 0.12);
      })
      .catch(() => {});
  }

  /**
   * Plays a BSOD crash tone
   */
  const playCrashTone = safeAudio(() => {
    const ctx = initAudioCtx();
    const now = ctx.currentTime;

    function burst(freq, dur, gainVal) {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "square";
      o.frequency.value = freq;
      o.connect(g);
      g.connect(ctx.destination);
      g.gain.setValueAtTime(0.0001, now);
      g.gain.linearRampToValueAtTime(gainVal, now + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      o.start(now);
      o.stop(now + dur + 0.02);
    }

    burst(440, 0.4, 0.3);
    burst(622, 0.4, 0.2);
    burst(880, 0.4, 0.2);
    burst(110, 0.6, 0.15);
  });

  /**
   * Plays the dance music
   */
  let danceNodes = new Set();
  const playDanceTune = safeAudio(() => {
    const ctx = initAudioCtx();
    const tempo = 150;
    const beat = 60 / tempo;
    const lead = [440, 523, 659, 523];
    for (let bar = 0; bar < 5; bar++) {
      const t0 = ctx.currentTime + bar * beat * 4;
      // Melody
      lead.forEach((f, i) => {
        const o = ctx.createOscillator(),
          g = ctx.createGain();
        o.type = "square";
        o.frequency.value = f;
        o.connect(g);
        g.connect(ctx.destination);
        g.gain.setValueAtTime(0.14, t0 + i * beat);
        g.gain.linearRampToValueAtTime(0.0001, t0 + i * beat + beat * 0.9);
        o.start(t0 + i * beat);
        o.stop(t0 + i * beat + beat);
        danceNodes.add(o);
        danceNodes.add(g);
      });
      // Bass
      for (let i = 0; i < 4; i++) {
        const o = ctx.createOscillator(),
          g = ctx.createGain();
        o.type = "square";
        o.frequency.value = 110;
        o.connect(g);
        g.connect(ctx.destination);
        g.gain.setValueAtTime(0.09, t0 + i * beat);
        g.gain.linearRampToValueAtTime(0.0001, t0 + i * beat + beat);
        o.start(t0 + i * beat);
        o.stop(t0 + i * beat + beat);
        danceNodes.add(o);
        danceNodes.add(g);
      }
      // Kick
      const k = ctx.createOscillator(),
        kg = ctx.createGain();
      k.type = "triangle";
      k.frequency.setValueAtTime(120, t0);
      k.connect(kg);
      kg.connect(ctx.destination);
      kg.gain.setValueAtTime(0.25, t0);
      k.frequency.exponentialRampToValueAtTime(50, t0 + 0.08);
      kg.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.12);
      k.start(t0);
      k.stop(t0 + 0.13);
      danceNodes.add(k);
      danceNodes.add(kg);

      // Snare-ish
      const s = ctx.createOscillator(),
        sg = ctx.createGain();
      s.type = "square";
      s.frequency.setValueAtTime(300, t0 + beat * 2);
      s.connect(sg);
      sg.connect(ctx.destination);
      sg.gain.setValueAtTime(0.12, t0 + beat * 2);
      sg.gain.exponentialRampToValueAtTime(0.0001, t0 + beat * 2 + 0.08);
      s.start(t0 + beat * 2);
      s.stop(t0 + beat * 2 + 0.09);
      danceNodes.add(s);
      danceNodes.add(sg);
    }
  });

  /**
   * Stops the dance music
   */
  function stopDanceTune() {
    danceNodes.forEach((n) => {
      try {
        if (n.stop) n.stop();
        n.disconnect();
      } catch (e) {}
    });
    danceNodes.clear();
  }

  /* =====================================================
     STATUS CARDS (slow/fast update split)
  ===================================================== */
  let lastStats = {
    cpu: 0,
    mem: 0,
    temp: 0,
    netMode: "idle",
    latencyMs: 0,
    lossPct: 0,
  };

  // initialBoot flag keeps bars green on first launch
  let initialBoot = true;
  setTimeout(() => {
    initialBoot = false;
  }, CONFIG.timing.initialBootGreen);

  /**
   * Picks a random network mode
   * @returns {string} - Network mode
   */
  function pickNetMode() {
    const modes = ["idle", "rx", "tx", "link?", "??"];
    return util.pickRandom(modes);
  }

  /**
   * Classifies load percentage into status level
   * @param {number} pct - Percentage value
   * @returns {string} - Status level ('ok', 'warn', or 'fail')
   */
  function classifyLoad(pct) {
    if (pct < CONFIG.thresholds.loadWarn) return BAR_STATES.OK;
    if (pct < CONFIG.thresholds.loadFail) return BAR_STATES.WARN;
    return BAR_STATES.FAIL;
  }

  /**
   * Checks if a status bar is locked (instability or meltdown)
   * @param {HTMLElement} barEl - Bar element
   * @returns {boolean} - True if locked
   */
  function isBarLocked(barEl) {
    return (
      barEl?.classList.contains(BAR_STATES.INSTABILITY) ||
      barEl?.classList.contains(BAR_STATES.MELTDOWN)
    );
  }

  /**
   * Sets the bar state/color
   * @param {HTMLElement} barEl - Bar element
   * @param {string} state - State class name
   */
  function setBarState(barEl, state) {
    if (isBarLocked(barEl)) return;
    // force green for initial boot for the three bars
    if (
      initialBoot &&
      (barEl === statusCards.cpu.bar ||
        barEl === statusCards.mem.bar ||
        barEl === statusCards.temp.bar)
    ) {
      barEl?.classList.remove(
        BAR_STATES.OK,
        BAR_STATES.WARN,
        BAR_STATES.FAIL,
        BAR_STATES.MELTDOWN,
        BAR_STATES.INSTABILITY,
      );
      barEl?.classList.add(BAR_STATES.OK);
      return;
    }
    barEl?.classList.remove(BAR_STATES.OK, BAR_STATES.WARN, BAR_STATES.FAIL);
    barEl?.classList.add(state);
  }

  /**
   * Applies instability visual state to status bars
   */
  function applyInstabilityBars() {
    [statusCards.cpu.bar, statusCards.mem.bar, statusCards.temp.bar].forEach(
      (bar) => {
        bar?.classList.remove(
          BAR_STATES.OK,
          BAR_STATES.WARN,
          BAR_STATES.FAIL,
          BAR_STATES.MELTDOWN,
        );
        bar?.classList.add(BAR_STATES.INSTABILITY);
      },
    );

    updateElement(statusCards.cpu.foot, "process priority: degraded");
    updateElement(statusCards.mem.foot, "memory integrity: questionable");
    updateElement(statusCards.temp.foot, "thermal status: unstable");
    updateElement(statusCards.net.val, "???");
    updateElement(
      statusCards.net.foot,
      "uplink: unstable | latency: spiking | packet_loss: escalating | status: WARNING",
    );
  }

  /**
   * Clears instability visual state from status bars
   */
  function clearInstabilityBars() {
    [statusCards.cpu.bar, statusCards.mem.bar, statusCards.temp.bar].forEach(
      (bar) => bar?.classList.remove(BAR_STATES.INSTABILITY),
    );
  }

  /**
   * Applies meltdown visual state to status bars
   */
  function applyMeltdownBars() {
    [statusCards.cpu.bar, statusCards.mem.bar, statusCards.temp.bar].forEach(
      (bar) => {
        bar?.classList.remove(
          BAR_STATES.OK,
          BAR_STATES.WARN,
          BAR_STATES.FAIL,
          BAR_STATES.INSTABILITY,
        );
        bar?.classList.add(BAR_STATES.MELTDOWN);
      },
    );

    updateElement(statusCards.cpu.foot, "cpu status: cascading failure");
    updateElement(statusCards.mem.foot, "ram status: bitrot detected");
    updateElement(statusCards.temp.foot, "thermal status: runaway");
    updateElement(statusCards.net.val, "DOWN");
    updateElement(
      statusCards.net.foot,
      "uplink: DISCONNECTED | latency: ∞ ms | packet_loss: 100% | status: HARD FAIL",
    );
  }

  /**
   * Clears meltdown visual state from status bars
   */
  function clearMeltdownBars() {
    [statusCards.cpu.bar, statusCards.mem.bar, statusCards.temp.bar].forEach(
      (bar) => bar?.classList.remove(BAR_STATES.MELTDOWN),
    );
  }

  /**
   * Updates slow-changing status (CPU, MEM, TEMP cards)
   */
  function updateSlowStatus() {
    // Generate readings
    let cpu = initialBoot ? 5 : Math.floor(Math.random() * 101);
    let memUsed = initialBoot ? 100 : Math.floor(Math.random() * 1001);
    let temp = initialBoot ? 35 : Math.floor(Math.random() * 101);

    // Clamp values
    cpu = Math.min(Math.max(cpu, 0), 100);
    memUsed = Math.min(Math.max(memUsed, 0), 1000);
    temp = Math.min(Math.max(temp, 0), 100);

    // Calculate widths
    const cpuWidth = cpu;
    const memWidth = (memUsed / 1000) * 100;
    const tempWidth = temp;

    // Save last stats
    lastStats.cpu = cpu;
    lastStats.mem = memUsed;
    lastStats.temp = temp;

    // Check if any bars are locked
    const anyLocked =
      isBarLocked(statusCards.cpu.bar) ||
      isBarLocked(statusCards.mem.bar) ||
      isBarLocked(statusCards.temp.bar);

    // Only update the numeric readouts if we're not locked
    if (!anyLocked) {
      updateElement(statusCards.cpu.val, `${cpu}%`);
      updateElement(statusCards.mem.val, `${memUsed} MB`);
      updateElement(statusCards.temp.val, `${temp} °C`);
    }

    // Update bar widths + colours
    const bars = [
      { el: statusCards.cpu.bar, widthPct: cpuWidth },
      { el: statusCards.mem.bar, widthPct: memWidth },
      { el: statusCards.temp.bar, widthPct: tempWidth },
    ];

    bars.forEach(({ el, widthPct }) => {
      if (!isBarLocked(el)) {
        if (el) el.style.width = `${Math.min(widthPct, 100)}%`;
      }

      if (!isBarLocked(el)) {
        if (
          initialBoot &&
          (el === statusCards.cpu.bar ||
            el === statusCards.mem.bar ||
            el === statusCards.temp.bar)
        ) {
          el?.classList.remove(
            BAR_STATES.OK,
            BAR_STATES.WARN,
            BAR_STATES.FAIL,
            BAR_STATES.MELTDOWN,
            BAR_STATES.INSTABILITY,
          );
          el?.classList.add(BAR_STATES.OK);
        } else {
          const state = classifyLoad(widthPct);
          el?.classList.remove(BAR_STATES.OK, BAR_STATES.WARN, BAR_STATES.FAIL);
          el?.classList.add(state);
        }
      }
    });

    // Update footer texts
    if (!isBarLocked(statusCards.cpu.bar)) {
      const cpuFooter =
        cpuWidth >= CONFIG.thresholds.loadFail
          ? "process priority: degraded"
          : cpuWidth >= CONFIG.thresholds.loadWarn
            ? "process priority: questionable"
            : "process priority: looks good (i think)";
      updateElement(statusCards.cpu.foot, cpuFooter);
    }

    if (!isBarLocked(statusCards.mem.bar)) {
      const memFooter =
        memWidth >= CONFIG.thresholds.loadFail
          ? "memory status: leaking"
          : memWidth >= CONFIG.thresholds.loadWarn
            ? "memory status: questionable"
            : "memory status: should be sufficient";
      updateElement(statusCards.mem.foot, memFooter);
    }

    if (!isBarLocked(statusCards.temp.bar)) {
      const tempFooter =
        temp >= CONFIG.thresholds.loadFail
          ? "thermal status: screaming"
          : temp >= CONFIG.thresholds.loadWarn
            ? "thermal status: warm-ish"
            : "thermal status: questionable";
      updateElement(statusCards.temp.foot, tempFooter);
    }
  }

  /**
   * Starts the status update loops
   */
  let __loopsRunning = false;
  function startStatusLoops() {
    if (__loopsRunning) return;
    __loopsRunning = true;
    // Run once immediately
    updateSlowStatus();
    updateFastStatus();

    // Then keep updating
    every(CONFIG.statusUpdate.slowInterval, updateSlowStatus);
    every(CONFIG.statusUpdate.fastInterval, updateFastStatus);
  }

  startStatusLoops();

  /**
   * Scrolls to bottom if user was already at bottom before append
   * @param {HTMLElement} scroller
   * @param {boolean} wasAtBottom
   */
  function scrollToBottomIfStuck(scroller, wasAtBottom) {
    if (!scroller) return;
    if (wasAtBottom) {
      requestAnimationFrame(() => {
        scroller.scrollTop = scroller.scrollHeight;
      });
    }
  }
  /* =====================================================
     LOGGING SYSTEM
  ===================================================== */
  output.textContent = `${asciiBox}\n`;

  let dynamicLogElements = [];
  let lastLog = "";
  let bootIndex = 0;
  let lineCounter = 0;
  let nextAsciiAt = util.randBetween(
    CONFIG.asciiArt.minLines,
    CONFIG.asciiArt.maxLines,
  );
  let sessionLineCount = 0;

  const GLITCH_RE = /^\[(glitch|\?\?\?|err|ghost)\]/;

  const logClasses = {
    "[ok]": "log-ok",
    "[warn]": "log-warn",
    "[fail]": "log-fail",
  };

  /**
   * Rotates the log buffer when it gets too full
   */
  function rotateLogBuffer() {
    output.textContent = "[sys] log buffer rotated.\n";
    dynamicLogElements = [];
    lineCounter = 0;
    nextAsciiAt = util.randBetween(
      CONFIG.asciiArt.minLines,
      CONFIG.asciiArt.maxLines,
    );
    sessionLineCount = 1;
  }

  /**
   * Appends a styled log line to the output
   * @param {string} text - Log text to append
   * @param {boolean} track - Whether to track this log for removal
   */
  function appendStyledLog(text, track) {
    if (sessionLineCount >= CONFIG.limits.maxSessionLines) {
      rotateLogBuffer();
    }

    const scroller = logPanel;
    const wasAtBottom =
      scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 10;
    const frag = document.createDocumentFragment();

    if (track && !isInSpecialMode() && ++lineCounter >= nextAsciiAt) {
      const pre = document.createElement("pre");
      pre.className = "ascii-block";
      pre.textContent = `${util.pickRandom(asciiVisitors)}\n`;
      pre.setAttribute("aria-hidden", "true");
      frag.appendChild(pre);
      dynamicLogElements.push(pre);
      lineCounter = 0;
      nextAsciiAt = util.randBetween(
        CONFIG.asciiArt.minLinesAfter,
        CONFIG.asciiArt.maxLinesAfter,
      );
    }

    const span = document.createElement("span");
    span.textContent = `${text}\n`;

    const prefix = text.substring(0, text.indexOf("]") + 1);
    if (logClasses[prefix]) {
      span.classList.add(logClasses[prefix]);
    } else if (GLITCH_RE.test(text)) {
      span.classList.add("log-glitch");
    }

    frag.appendChild(span);
    if (track) dynamicLogElements.push(span);
    output.appendChild(frag);
    sessionLineCount++;

    if (dynamicLogElements.length > CONFIG.limits.maxRandomLogs) {
      const toRemove = dynamicLogElements.splice(
        0,
        dynamicLogElements.length - CONFIG.limits.maxRandomLogs,
      );
      toRemove.forEach((n) => n?.remove());
    }

    while (output.childNodes.length > CONFIG.limits.hardCap) {
      output.firstChild?.remove();
    }

    scrollToBottomIfStuck(scroller, wasAtBottom);
  }

  /**
   * Prints boot logs sequentially
   */
  function printBootLogs() {
    if (isInSpecialMode()) {
      schedule(printBootLogs, CONFIG.timing.bootLogDelay);
      return;
    }
    if (bootIndex < bootLogs.length) {
      appendStyledLog(bootLogs[bootIndex++], false);
      schedule(printBootLogs, CONFIG.timing.bootLogDelay);
    } else {
      schedule(generateRandomLogs, 1000);
    }
  }

  /**
   * Generates random log messages
   */
  function generateRandomLogs() {
    const delay =
      Math.floor(
        Math.random() *
          (CONFIG.timing.randomLogMax - CONFIG.timing.randomLogMin),
      ) + CONFIG.timing.randomLogMin;

    if (isInSpecialMode()) {
      schedule(generateRandomLogs, delay);
      return;
    }

    const pool =
      Math.random() < CONFIG.probabilities.weirdLogs ? weirdLogs : randomLogs;
    let line;
    do {
      line = util.pickRandom(pool);
    } while (line === lastLog);
    lastLog = line;

    appendStyledLog(line, true);

    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => schedule(generateRandomLogs, delay), {
        timeout: delay,
      });
    } else {
      schedule(generateRandomLogs, delay);
    }
  }

  schedule(printBootLogs, 800);

  /* =====================================================
     PANIC MODE (/panic)
  ===================================================== */
  /**
   * Triggers the panic overlay with rapid log spam
   */
  function triggerPanic() {
    if (!panicContent || !overlays.panic) return;
    setLogMode(LOG_MODES.PANIC);
    applyInstabilityBars();

    // Override header values during panic
    updateElement(statusCards.cpu.val, "???");
    updateElement(statusCards.mem.val, "???");
    updateElement(statusCards.temp.val, "???");
    updateElement(statusCards.cpu.foot, "process priority: unstable");
    updateElement(
      statusCards.mem.foot,
      "memory status: fragmentation detected",
    );
    updateElement(statusCards.temp.foot, "thermal status: escalating");

    renderPanicAlert(panicContent);
    openOverlay(overlays.panic, panicContent);

    appendStyledLog("[warn] abnormal energy spike in inference chamber", false);
    appendStyledLog(
      "[fail] containment breach flagged. ignoring for now.",
      false,
    );
    appendStyledLog("[err] escalating to panic handler...", false);

    playPanicAlarm();

    const spamInt = timers.addInterval(
      setInterval(() => {
        appendStyledLog("[panic] subsystem meltdown risk: acceptable", false);
      }, CONFIG.timing.panicSpamInterval),
    );

    timers.addTimeout(
      setTimeout(() => {
        timers.clear(spamInt);
        clearInstabilityBars();
        updateSlowStatus();
        updateFastStatus();
        closeOverlay(overlays.panic);
        appendStyledLog("[ok] crisis averted. nothing was learned.", false);
        setLogMode(LOG_MODES.NORMAL);
      }, CONFIG.timing.panicDuration),
    );
  }

  /* =====================================================
     NUKE → COUNTDOWN (RED) → BSOD (BLUE) (/nuke)
  ===================================================== */
  let nukeInProgress = false;

  // Rapid metronome-style beep during countdown
  let nukeMetronome = null;

  function playMetronomeBeep() {
    ensureAudioReady()
      .then((ctx) => {
        const t = ctx.currentTime;
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "square";
        o.frequency.value = 880; // same flavor as original
        o.connect(g);
        g.connect(ctx.destination);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.linearRampToValueAtTime(0.18, t + 0.008);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
        o.start(t);
        o.stop(t + 0.1);
      })
      .catch(() => {});
  }

  function startNukeMetronome(rateMs = 250) {
    // 4 ticks per second by default
    if (nukeMetronome) timers.clear(nukeMetronome);
    nukeMetronome = every(rateMs, () => playMetronomeBeep());
  }

  function stopNukeMetronome() {
    if (nukeMetronome) {
      timers.clear(nukeMetronome);
      nukeMetronome = null;
    }
  }

  /**
   * Opens the in-site auth modal (uses static HTML in index.html).
   * Resolves with: true (correct), false (wrong), null (cancelled)
   */
  function openAuthModal() {
    return new Promise((resolve) => {
      if (!overlays.auth || !authContent) return resolve(null);

      // Open the overlay and focus the modal card
      openOverlay(overlays.auth, authContent);

      // Query static elements
      const inputEl = document.getElementById("auth-input");
      const okBtn = document.getElementById("auth-ok");
      const cancelBtn = document.getElementById("auth-cancel");
      const errEl = document.getElementById("auth-error");

      // Reset state each time the modal opens
      if (errEl) errEl.style.display = "none";
      if (inputEl) {
        inputEl.value = "";
        setTimeout(() => inputEl.focus({ preventScroll: true }), 0);
      }

      const submit = () => {
        const val = (inputEl?.value || "").trim();
        if (!val) {
          if (errEl) errEl.style.display = "block";
          return;
        }
        if (val === CONFIG.security.nukePassword) {
          cleanup();
          resolve(true);
        } else {
          // Wrong code → close modal and let caller disarm
          cleanup();
          resolve(false);
        }
      };

      const cancel = () => {
        cleanup();
        resolve(null);
      };

      function onKey(e) {
        if (e.key === "Enter") {
          e.preventDefault();
          submit();
        }
        if (e.key === "Escape") {
          e.preventDefault();
          cancel();
        }
      }

      function hideErr() {
        if (errEl) errEl.style.display = "none";
      }

      function cleanup() {
        document.removeEventListener("keydown", onKey, true);
        inputEl?.removeEventListener("input", hideErr);
        okBtn?.removeEventListener("click", submit);
        cancelBtn?.removeEventListener("click", cancel);
        closeOverlay(overlays.auth);
        // Do NOT clear innerHTML; markup lives in HTML
      }

      inputEl?.addEventListener("input", hideErr);
      okBtn?.addEventListener("click", submit);
      cancelBtn?.addEventListener("click", cancel);
      document.addEventListener("keydown", onKey, true);
    });
  }

  function requestNukeAuth() {
    return openAuthModal();
  }

  function disarmNuke(reason = "authentication failed") {
    handleCommandError(`${reason}. nuclear sequence disarmed.`, true);

    stopNukeMetronome();
    // Close the guard and reset state
    guardManager.close();
    nukeInProgress = false;

    // Reset UI state so nothing "sticks"
    setLogMode(LOG_MODES.NORMAL);
    clearMeltdownBars();
    updateSlowStatus();
    updateFastStatus();
  }

  /**
   * Triggers the nuclear countdown sequence
   */
  function triggerNuke() {
    if (nukeInProgress) return;
    if (!panicContent || !overlays.panic) {
      handleCommandError("panic overlay unavailable.");
      return;
    }
    nukeInProgress = true;
    setLogMode(LOG_MODES.NUKE);

    applyMeltdownBars();

    // Override header values during nuke
    updateElement(statusCards.cpu.val, "!!!");
    updateElement(statusCards.mem.val, "!!!");
    updateElement(statusCards.temp.val, "!!!");

    let t = CONFIG.timing.nukeDuration;

    setChildren(panicContent);
    const big = document.createElement("div");
    big.className = "panic-countdown-big";
    const cnt = document.createElement("span");
    cnt.id = "panic-count";
    cnt.textContent = `T-${t}`;
    big.appendChild(cnt);
    const cap = document.createElement("div");
    cap.className = "panic-caption";
    cap.textContent = "NUCLEAR RELEASE ARMED";
    const small = document.createElement("div");
    small.className = "panic-text small";
    small.textContent = "please remain calm";
    panicContent.appendChild(big);
    panicContent.appendChild(cap);
    panicContent.appendChild(small);
    openOverlay(overlays.panic, panicContent);

    appendStyledLog("[warn] nuclear option armed. stand by.", false);
    startNukeMetronome(250);

    // Immediate beep for T-5 display
    // playTickBeep();

    const countdownEl = cnt;
    const tickInterval = timers.addInterval(
      setInterval(() => {
        t--;
        if (t > 0) {
          if (countdownEl) countdownEl.textContent = `T-${t}`;
          appendStyledLog(`[warn] T-${t}`, false);
        } else {
          stopNukeMetronome();
          timers.clear(tickInterval);
          closeOverlay(overlays.panic);
          launchBSOD();
        }
      }, CONFIG.timing.nukeCountdownInterval),
    );
  }

  /**
   * Launches the BSOD (Blue Screen of Death) overlay
   */
  function launchBSOD() {
    if (!bsodContent || !overlays.bsod) {
      handleCommandError("bsod overlay unavailable.");
      return;
    }
    appendStyledLog("[fail] /nuke executed. system halt requested.", false);

    overlays.bsod?.classList.add("active");
    overlays.bsod?.setAttribute("aria-hidden", "false");
    overlays.bsod?.removeAttribute("hidden");

    playCrashTone();

    const pctEl = renderBSODContent(bsodContent);

    if (!bsodContent.hasAttribute("tabindex"))
      bsodContent.setAttribute("tabindex", "-1");
    bsodContent.focus({ preventScroll: true });

    // Animate percentage using requestAnimationFrame for better performance
    const startTime = performance.now();

    function animateBSOD(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(
        100,
        (elapsed / CONFIG.timing.bsodAnimationDuration) * 100,
      );
      updateElement(pctEl, `${Math.floor(progress)}%`);

      if (progress < 100) {
        requestAnimationFrame(animateBSOD);
      }
    }

    requestAnimationFrame(animateBSOD);

    timers.addTimeout(
      setTimeout(() => {
        // Hide BSOD overlay and clear content
        clearAndCloseOverlay(overlays.bsod, bsodContent);

        // Clear meltdown visuals
        clearMeltdownBars();

        // Simulate "fresh boot": wipe the console log buffer
        output.textContent = "";
        dynamicLogElements = [];
        sessionLineCount = 0;
        lineCounter = 0;
        nextAsciiAt = util.randBetween(
          CONFIG.asciiArt.minLinesAfter,
          CONFIG.asciiArt.maxLinesAfter,
        );

        // Mark reboot done
        nukeInProgress = false;

        // Reset nuke guard to closed state
        guardManager.close();

        // Refresh status cards
        updateSlowStatus();
        updateFastStatus();

        // First line after reboot
        setLogMode(LOG_MODES.NORMAL);
        appendStyledLog("[ok] reboot complete. nothing was learned.", true);

        cmdline?.focus({ preventScroll: true });
      }, CONFIG.timing.bsodRebootDelay),
    );
  }

  /* =====================================================
     DANCE OVERLAY
  ===================================================== */
  /**
   * Triggers the dance overlay with music
   */
  function doDance() {
    if (!overlays.dance) return;
    overlayManager.temporary(
      overlays.dance,
      CONFIG.timing.danceDuration,
      () => {
        renderDanceRows(overlays.dance);
        overlays.dance.style.display = "flex";
        playDanceTune();
      },
      () => {
        overlays.dance.style.display = "none";
        stopDanceTune();
      },
    );
  }

  /* =====================================================
     COMMAND HANDLERS
  ===================================================== */
  /**
   * Centralized error handler for commands
   * @param {string} message - Error message to display
   * @param {boolean} [shouldBeep=true] - Whether to play error beep
   */
  function handleCommandError(message, shouldBeep = true) {
    if (shouldBeep) playErrorBeep();
    appendStyledLog(`[err] ${message}`, true);
  }

  /**
   * Handles the help command
   */
  function handleHelpCommand() {
    clickBlip();
    appendStyledLog(
      "[help] commands: help, /summon, /dance, /panic, /open, /close, /nuke, clear",
      true,
    );
  }

  /**
   * Handles the summon command
   */
  function handleSummonCommand() {
    if (Math.random() < CONFIG.probabilities.summonSuccess) {
      const art = util.pickRandom(asciiVisitors);
      appendStyledLog(art, true);
      clickBlip();
    } else {
      handleCommandError("summoning failed: entity refused to materialise.");
    }
  }

  /**
   * Handles the guard command (open/close)
   * @param {string} action - Action to perform ('open' or 'close')
   */
  function handleGuardCommand(action) {
    if (!guardManager.element) {
      handleCommandError("guard not found.");
      return;
    }

    const isOpen = guardManager.isOpen();
    const wantsOpen = action === "open";

    if (isOpen === wantsOpen) {
      appendStyledLog(`[info] guard already ${action}.`, true);
      playErrorBeep();
      return;
    }

    guardManager.toggle();
    appendStyledLog(`[ok] safety guard ${action}ed.`, true);
  }

  /**
   * Handles the nuke command
   */
  async function handleNukeCommand() {
    if (guardManager.button?.disabled) {
      handleCommandError("/nuke blocked: safety guard is closed.");
      if (guardManager.element) {
        guardManager.element.classList.add("blink");
        setTimeout(
          () => guardManager.element?.classList.remove("blink"),
          CONFIG.timing.guardBlinkDuration,
        );
      }
      return;
    }

    // Fake nuclear confirmation gate
    const auth = await requestNukeAuth();
    if (auth === null) {
      appendStyledLog("[info] launch cancelled. guard closing.", true);
      clickBlip(); // simple feedback (no error tone)
      guardManager.close(); // close the guard on cancel
      return;
    }
    if (auth !== true) {
      disarmNuke("wrong launch code");
      return;
    }

    appendStyledLog("[ok] code accepted. proceeding to launch window.", true);
    triggerNuke();
  }

  /**
   * Handles the clear command
   */
  function handleClearCommand() {
    clickBlip();
    output.textContent = "";
    dynamicLogElements = [];
    sessionLineCount = 0;
    lineCounter = 0;
    nextAsciiAt = util.randBetween(
      CONFIG.asciiArt.minLinesAfter,
      CONFIG.asciiArt.maxLinesAfter,
    );
    appendStyledLog("[sys] display buffer wiped. evidence deleted.", true);
  }

  // Command handler map for efficient lookup
  const commandHandlers = new Map([
    ["help", handleHelpCommand],
    ["/help", handleHelpCommand],
    ["/summon", handleSummonCommand],
    ["/dance", doDance],
    ["/panic", triggerPanic],
    ["/open", () => handleGuardCommand("open")],
    ["/close", () => handleGuardCommand("close")],
    ["/nuke", handleNukeCommand],
    ["clear", handleClearCommand],
    ["/clear", handleClearCommand],
  ]);

  /**
   * Executes user commands from the command line
   * @param {string} cmd - The command to execute
   */
  function runCommand(cmd) {
    const c = (cmd || "").trim().toLowerCase();
    if (!c) return;

    const handler = commandHandlers.get(c);
    if (handler) {
      handler();
    } else {
      handleCommandError(`unknown command: ${c}`);
    }
  }

  /* =====================================================
     COMMAND BAR & INPUT WIRING
  ===================================================== */
  cmdBar?.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-cmd]");
    if (!btn) return;

    const command = btn.dataset.cmd;
    runCommand(command);
  });

  cmdline?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      runCommand(cmdline.value);
      cmdline.value = "";
    }
  });

  // Unlock audio on first interaction
  window.addEventListener("pointerdown", initAudioCtx, { once: true });
  window.addEventListener("keydown", initAudioCtx, { once: true });

  /* =====================================================
     NUKE GUARD SWITCH LOGIC
  ===================================================== */
  const guardManager = {
    element: document.getElementById("guard-switch"),
    button: document.getElementById("nuke-btn"),

    /**
     * Sets guard state explicitly
     * @param {boolean} shouldOpen - Desired state
     */
    setState(shouldOpen) {
      if (!this.element || !this.button) return;
      const changed = this.isOpen() !== shouldOpen;

      if (changed) {
        this.element.classList.toggle("open", shouldOpen);
        this.element.setAttribute("aria-pressed", String(shouldOpen));
        this.button.disabled = !shouldOpen;
        this.element.title = shouldOpen
          ? "Guard open — click to close"
          : "Guard closed — click to open";
        clickBlip();
      }
    },

    /**
     * Toggles guard open/closed and plays click
     */
    toggle() {
      this.setState(!this.isOpen());
    },

    /**
     * Opens the guard
     */
    open() {
      this.setState(true);
    },

    /**
     * Checks if guard is open
     * @returns {boolean} - True if open
     */
    isOpen() {
      return this.element?.classList.contains("open") ?? false;
    },

    /**
     * Forces guard to closed state
     */
    close() {
      this.setState(false);
    },
  };

  // Setup guard switch event listeners
  if (guardManager.element) {
    guardManager.element.addEventListener("click", () => guardManager.toggle());
    guardManager.element.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter" || ev.key === " ") {
        ev.preventDefault();
        guardManager.toggle();
      }
    });
  }
});
