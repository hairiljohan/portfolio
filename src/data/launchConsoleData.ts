const htmlContent = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>whydoesthiswork.localhost</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="dark light" />
    <style>
      /* CSS CONTENT INJECTED HERE */
      REPLACE_WITH_CSS
    </style>
  </head>
  <body>
    <noscript>
      <div class="noscript-warning">This console requires JavaScript.</div>
    </noscript>

    <a class="skip" href="#mainLog">Skip to content</a>

    <div class="console-shell" id="console-root" data-theme="dark">
      <div id="overlay-root"></div>
      <header class="top-bar" role="banner">
        <div class="site-id">
          <h1 class="site-name">whydoesthiswork.localhost</h1>
          <span class="site-sub">local AI stack console</span>
        </div>
        <button id="themeToggle" class="top-btn" type="button" aria-label="Toggle theme" aria-pressed="true" aria-controls="console-root">
          mode: dark
        </button>
      </header>
      <section class="status-grid" aria-label="System status" id="status-grid"></section>
      <main class="log-panel" id="mainLog" tabindex="-1">
        <pre id="output" role="log" aria-live="polite" aria-atomic="false" aria-relevant="additions"></pre>
      </main>
      <nav class="cmd-bar" aria-label="Control surface">
        <div class="cmd-buttons" id="cmd-buttons"></div>
        <label for="cmdline" class="visually-hidden">Command line</label>
        <input id="cmdline" class="cmd-input" type="text" autocomplete="off" autocapitalize="none" spellcheck="false" inputmode="text" placeholder="type command and press Enter (e.g. help)" />
      </nav>
    </div>

    <div id="auth-overlay" class="overlay" hidden aria-hidden="true">
      <div id="auth-content" class="auth-card" role="dialog" aria-modal="true" aria-labelledby="auth-title">
        <h2 id="auth-title" class="auth-title">CONFIRM LAUNCH</h2>
        <div class="auth-sub">Enter launch code:</div>
        <input type="password" class="auth-input" id="auth-input" autocomplete="off" spellcheck="false" />
        <div class="auth-error" id="auth-error" role="status" aria-live="polite">Please enter launch code.</div>
        <div class="auth-actions">
          <button type="button" class="auth-btn secondary" id="auth-cancel">ABORT</button>
          <button type="button" class="auth-btn primary" id="auth-ok">LAUNCH</button>
        </div>
      </div>
    </div>
    <script>
      /* JS CONTENT INJECTED HERE */
      REPLACE_WITH_JS
    </script>
  </body>
</html>
`;

const cssContent = `
@layer tokens, base, components, utilities;
@layer tokens {
  :root {
    color-scheme: light dark;
    --font-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace;
    --font-system: system-ui, -apple-system, BlinkMacSystemFont, "Inter", Roboto, "Helvetica Neue", Arial, sans-serif;
    --radius-default: 4px;
    --radius-small: 2px;
    --body-bg: #000;
    --body-text: #fff;
    --animation-speed-fast: 0.12s;
    --animation-speed-normal: 0.2s;
    --animation-speed-slow: 0.22s;
    --animation-duration-guard: 1.5s;
    --ease-bounce: cubic-bezier(0.2, 0.8, 0.2, 1);
    --ease-smooth: ease-in-out;
    --z-index-overlay: 9999;
    --z-index-guard-hinge: 3;
    --z-index-guard-cover: 2;
    --z-index-nuke-btn: 1;
    --min-touch-target: 44px;
    --gap-small: 0.5rem;
    --gap-default: 1rem;
    --gap-large: 1.25rem;
    --status-track-bg: #000;
    --auth-input-bg: #fff;
    --auth-input-color: #0f172a;
    --auth-input-border: #cbd5e1;
    --auth-input-focus-border: #2563eb;
    --auth-input-focus-shadow: rgba(37, 99, 235, 0.35);
    --auth-btn-primary-bg: #e53935;
    --auth-btn-primary-bg-hover: #f44336;
    --auth-btn-primary-border: #b71c1c;
    --auth-btn-primary-color: #fff;
    --auth-btn-secondary-bg: #1e293b;
    --auth-btn-secondary-bg-hover: #334155;
    --auth-btn-secondary-border: #475569;
    --auth-btn-secondary-color: #e2e8f0;
    --guard-hinge-height: 6px;
    --guard-hinge-width: 60%;
    --guard-offset-open: 10%;
    --perspective-depth: 400px;
    --guard-hinge-bg: #3a3a3a;
    --guard-hinge-border: #111;
    --guard-hinge-shadow: 0 1px 1px rgba(0, 0, 0, 0.8), 0 0 4px rgba(255, 255, 255, 0.1) inset;
    --guard-cover-bg: linear-gradient(to bottom, #7a0000 0%, #a80000 40%, #650000 100%);
    --guard-cover-border: #2a0000;
    --guard-cover-text: #fff;
    --guard-cover-text-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
    --rainbow-spectrum: linear-gradient(90deg, red, orange, yellow, green, cyan, blue, violet);
  }
  .console-shell[data-theme="dark"] {
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.6);
    --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.7);
    --shadow-lg: 0 6px 20px rgba(0, 0, 0, 0.8);
    --bg-page: #0a0a0a;
    --bg-panel: #111;
    --bg-panel-alt: #151515;
    --border-card: rgba(255, 255, 255, 0.12);
    --border-strong: rgba(255, 255, 255, 0.4);
    --txt-main: #e5e5e5;
    --txt-dim: #8a8a8a;
    --accent-ok: #4dff91;
    --accent-warn: #ffd93b;
    --accent-fail: #ff4d4d;
    --cmd-btn-bg: #000;
    --cmd-btn-border: rgba(255, 255, 255, 0.25);
    --cmd-btn-bg-hover: #1a1a1a;
    --panic-bg: rgba(255, 0, 0, 0.12);
    --panic-text: #ff4d4d;
    --scanline: rgba(255, 0, 0, 0.18);
    --bsod-bg: #0078d7;
    --bsod-text: #ffffff;
    --fun-glow: rgba(255, 255, 255, 0.4);
    --auth-input-bg: #0f172a;
    --auth-input-color: #e5e7eb;
    --auth-input-border: #334155;
    --auth-btn-primary-bg: #ff3b30;
    --auth-btn-primary-bg-hover: #ff3b30;
    --auth-btn-primary-border: #b91c1c;
    --auth-btn-secondary-bg: #0f172a;
    --auth-btn-secondary-bg-hover: #0f172a;
    --auth-btn-secondary-border: #334155;
    --auth-btn-secondary-color: #e2e8f0;
  }
  .console-shell[data-theme="light"] {
    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.12);
    --shadow-md: 0 2px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 4px 12px rgba(0, 0, 0, 0.15);
    --bg-page: #f5f5f5;
    --bg-panel: #ffffff;
    --bg-panel-alt: #fafafa;
    --border-card: rgba(0, 0, 0, 0.2);
    --border-strong: rgba(0, 0, 0, 0.6);
    --txt-main: #1a1a1a;
    --txt-dim: #555;
    --accent-ok: #00a854;
    --accent-warn: #faad14;
    --accent-fail: #ff4d4f;
    --cmd-btn-bg: #fff;
    --cmd-btn-border: rgba(0, 0, 0, 0.4);
    --cmd-btn-bg-hover: #eaeaea;
    --panic-bg: rgba(255, 0, 0, 0.08);
    --panic-text: #c00000;
    --scanline: rgba(255, 0, 0, 0.15);
    --bsod-bg: #0078d7;
    --bsod-text: #ffffff;
    --fun-glow: rgba(0, 0, 0, 0.4);
  }
}
@layer utilities {
  [hidden] { display: none; }
  .skip { position: absolute; inset-inline-start: -9999px; inset-block-start: auto; }
  .skip:focus { inset-inline-start: 1rem; inset-block-start: 1rem; background: #000; color: #fff; padding: var(--gap-small); border: 1px solid #fff; z-index: 99999; }
  .visually-hidden { position: absolute; clip: rect(1px, 1px, 1px, 1px); padding: 0; border: 0; block-size: 1px; inline-size: 1px; overflow: hidden; }
  :is(.guard-cover, .panic-inner, #bsod-overlay, #dance-overlay, #auth-overlay .auth-card, .auth-btn, .site-id, .top-btn, .cmd-btn, .status-head, .status-foot, #output, .cmd-input) { font-family: var(--font-mono); }
}
@layer base {
  html, body { margin: 0; padding: 0; block-size: 100%; height: 100%; }
  body { font-family: var(--font-system); background-color: var(--body-bg); color: var(--body-text); line-height: 1.4; }
  .console-shell { min-block-size: 100%; background: var(--bg-page); color: var(--txt-main); display: grid; grid-template-rows: auto auto 1fr auto; gap: var(--gap-default); padding: var(--gap-default) var(--gap-default) 4rem; box-sizing: border-box; position: relative; overflow: hidden; background-image: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, transparent 40%, rgba(255, 255, 255, 0.02) 100%); background-size: cover; }
}
@layer components {
  .nuke-guard { position: relative; display: inline-flex; align-items: center; justify-content: center; margin-inline-start: var(--gap-small); perspective: var(--perspective-depth); }
  .nuke-guard .nuke-btn { position: relative; z-index: var(--z-index-nuke-btn); }
  .guard-hinge { position: absolute; inset-inline-start: 50%; inset-block-start: calc(-1 * var(--guard-hinge-height)); inline-size: var(--guard-hinge-width); block-size: var(--guard-hinge-height); transform: translateX(-50%); background: var(--guard-hinge-bg); border: 1px solid var(--guard-hinge-border); border-radius: var(--radius-small); box-shadow: var(--guard-hinge-shadow); z-index: var(--z-index-guard-hinge); pointer-events: none; }
  #nuke-btn[disabled] { opacity: 0.55; cursor: not-allowed; filter: saturate(0.7); box-shadow: none; }
  .guard-cover { position: absolute; inset-inline-start: 0; inset-block-start: 0; inline-size: 100%; block-size: 100%; background: var(--guard-cover-bg); border: 1px solid var(--guard-cover-border); border-radius: var(--radius-default); display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-align: center; text-transform: uppercase; color: var(--guard-cover-text); text-shadow: var(--guard-cover-text-shadow); -webkit-font-smoothing: antialiased; cursor: pointer; pointer-events: auto; transform-origin: top center; transform-style: preserve-3d; transition: transform var(--animation-speed-slow) var(--ease-bounce), box-shadow 120ms; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.6); z-index: var(--z-index-guard-cover); backface-visibility: visible; }
  .guard-label-main { display: block; }
  .guard-label-sub { font-size: 9px; opacity: 0.6; letter-spacing: 0.08em; margin-block-start: 2px; }
  .guard-cover.open { transform: rotateX(179.9deg) translateY(var(--guard-offset-open)) translateZ(0); box-shadow: 0 10px 18px rgba(0, 0, 0, 0.8); will-change: transform; }
  .guard-cover.blink { animation: guard-blink var(--animation-duration-guard) var(--ease-smooth); will-change: transform; }
  .guard-cover[aria-pressed="true"] { display: flex !important; visibility: visible !important; opacity: 1 !important; }
  :is(#panic-overlay, #bsod-overlay, #dance-overlay) { position: absolute; inset: 0; display: none; align-items: center; justify-content: center; }
  #panic-overlay { background: var(--panic-bg); border: 2px solid var(--panic-text); box-shadow: 0 0 30px var(--panic-text); pointer-events: none; z-index: var(--z-index-overlay); }
  #panic-overlay.active { display: flex; animation: panicPulse 0.15s linear infinite; }
  .panic-inner { text-align: center; text-transform: uppercase; color: var(--panic-text); font-weight: 600; line-height: 1.3; }
  .panic-text { font-size: 2rem; letter-spacing: 0.08em; }
  .panic-text.small { font-size: 1rem; margin-block-start: var(--gap-small); opacity: 0.8; }
  .panic-countdown-big { font-size: 4rem; font-weight: 600; letter-spacing: 0.08em; line-height: 1.1; margin-block-end: var(--gap-small); color: var(--panic-text); }
  .panic-caption { font-size: 1rem; font-weight: 500; color: var(--panic-text); text-transform: uppercase; line-height: 1.3; }
  #panic-content:focus, #panic-content:focus-visible, .bsod-inner:focus, .bsod-inner:focus-visible, #dance-overlay:focus, #dance-overlay:focus-visible { outline: none; }
  #panic-overlay::after { content: ""; position: absolute; inset: 0; background: repeating-linear-gradient(0deg, transparent 0 2px, var(--scanline) 2px, transparent 3px); mix-blend-mode: screen; pointer-events: none; }
  #bsod-overlay { z-index: 10000; background: var(--bsod-bg); color: var(--bsod-text); text-align: center; line-height: 1.4; }
  #bsod-overlay.active { display: flex; }
  .bsod-inner { max-inline-size: 90%; word-wrap: break-word; }
  .bsod-face { font-size: 4rem; font-weight: 600; line-height: 1.2; margin-block-end: var(--gap-default); }
  .bsod-msg { font-size: 1rem; margin-block-end: var(--gap-default); }
  .bsod-code { font-size: 0.8rem; opacity: 0.8; }
  #dance-overlay { background: rgba(0, 0, 0, 0.85); flex-direction: column; z-index: 5000; backface-visibility: hidden; }
  #dance-overlay.active { display: flex; }
  .dance-row { font-size: 4rem; font-weight: bold; background: var(--rainbow-spectrum); background-size: 400%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: rainbow 2s linear infinite, bounce 0.5s infinite alternate; transform: translateZ(0); will-change: transform, background-position; backface-visibility: hidden; }
  .dance-row.delay-0 { animation-delay: 0s, 0s; }
  .dance-row.delay-1 { animation-delay: 0.12s, 0s; }
  .dance-row.delay-2 { animation-delay: 0.24s, 0s; }
  .dance-row.delay-3 { animation-delay: 0.36s, 0s; }
  .dance-row.delay-4 { animation-delay: 0.48s, 0s; }
  .dance-row.delay-5 { animation-delay: 0.6s, 0s; }
  #auth-overlay[hidden] { display: none; }
  #auth-overlay { position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; padding: 0; margin: 0; backdrop-filter: blur(2px); background: rgba(0, 0, 0, 0.45); z-index: var(--z-index-overlay); }
  #auth-overlay .auth-card { position: relative; transform: none; margin: 0 auto; width: min(560px, 90%); border-radius: 12px; padding: 18px 18px 14px; box-shadow: var(--shadow-lg), 0 0 0 1px var(--border-card); border: 1px solid var(--border-card); background: var(--bg-panel); color: var(--txt-main); animation: auth-pop var(--animation-speed-normal) ease-out; }
  .auth-title { font-size: 16px; line-height: 1.2; font-weight: 700; margin: 0 0 6px; letter-spacing: 0.2px; }
  .auth-sub { font-size: 13px; opacity: 0.8; margin-bottom: 12px; }
  .auth-input { width: 100%; font-size: 14px; padding: 9px 11px; border-radius: 8px; border: 1px solid var(--auth-input-border); outline: none; background: var(--auth-input-bg); color: var(--auth-input-color); }
  .auth-input:focus { box-shadow: 0 0 0 3px var(--auth-input-focus-shadow); border-color: var(--auth-input-focus-border); }
  .auth-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 12px; }
  .auth-btn { appearance: none; border: 1px solid transparent; border-radius: 8px; padding: 8px 12px; font-size: 13px; cursor: pointer; text-transform: uppercase; letter-spacing: 0.06em; transition: background 0.15s ease, color 0.15s ease, border 0.15s ease; }
  .auth-btn.primary { background: var(--auth-btn-primary-bg); color: var(--auth-btn-primary-color); border-color: var(--auth-btn-primary-border); }
  .auth-btn.primary:hover { background: var(--auth-btn-primary-bg-hover); border-color: var(--auth-btn-primary-border); }
  .auth-btn.secondary { background: var(--auth-btn-secondary-bg); color: var(--auth-btn-secondary-color); border-color: var(--auth-btn-secondary-border); }
  .auth-btn.secondary:hover { background: var(--auth-btn-secondary-bg-hover); }
  .top-bar { display: flex; justify-content: space-between; align-items: flex-start; background: var(--bg-panel); border: 1px solid var(--border-card); border-radius: var(--radius-default); box-shadow: var(--shadow-lg); padding: 0.75rem var(--gap-default); min-block-size: 3.5rem; contain: layout style; }
  .site-id { display: flex; flex-direction: column; color: var(--txt-main); text-shadow: 0 0 6px rgba(255, 255, 255, 0.15); }
  .site-name { font-size: 1rem; line-height: 1.3; font-weight: 600; letter-spacing: 0.05em; margin: 0; }
  .site-sub { font-size: 0.75rem; line-height: 1.2; color: var(--txt-dim); }
  :is(.top-btn, .cmd-btn) { background: var(--cmd-btn-bg); color: var(--txt-main); border: 1px solid var(--cmd-btn-border); border-radius: var(--radius-default); cursor: pointer; text-transform: lowercase; }
  .top-btn { font-size: 0.8rem; line-height: 1; padding: var(--gap-small) 0.75rem; }
  .top-btn:is(:hover, :focus-visible), .cmd-btn:is(:hover, :focus-visible), .cmd-input:focus { background: var(--cmd-btn-bg-hover); outline: 2px solid var(--cmd-btn-border); }
  .guard-cover:focus-visible { outline: 2px solid var(--cmd-btn-border); }
  .status-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(180px, 100%), 1fr)); gap: 0.75rem; }
  .status-card { background: var(--bg-panel-alt); border: 1px solid var(--border-card); border-radius: var(--radius-default); box-shadow: var(--shadow-sm); padding: 0.75rem 0.75rem var(--gap-small); display: flex; flex-direction: column; min-inline-size: 0; contain: layout style paint; }
  .status-head { display: flex; justify-content: space-between; align-items: flex-start; font-size: 0.8rem; color: var(--txt-main); text-transform: uppercase; letter-spacing: 0.05em; }
  .status-val { font-weight: 600; }
  .status-bar-wrap { margin-block-start: var(--gap-small); background: var(--status-track-bg); border: 1px solid var(--border-strong); border-radius: var(--radius-small); block-size: 6px; position: relative; overflow: hidden; }
  .status-bar-fill { block-size: 100%; inline-size: 10%; transition: inline-size var(--animation-speed-normal) linear; transform: translateZ(0); }
  .status-bar-fill.ok { background: var(--accent-ok); }
  .status-bar-fill.warn { background: var(--accent-warn); }
  .status-bar-fill.fail { background: var(--accent-fail); }
  .status-bar-fill.instability { background: var(--accent-warn); animation: instability-flicker var(--animation-speed-fast) infinite; will-change: inline-size, opacity; }
  .status-bar-fill.meltdown { background: var(--accent-fail); animation: meltdown-flicker 0.16s steps(2) infinite; will-change: inline-size, opacity; }
  .status-foot { margin-block-start: var(--gap-small); color: var(--txt-dim); font-size: 0.7rem; line-height: 1.4; word-break: break-word; }
  .log-panel { background: var(--bg-panel); border: 1px solid var(--border-card); border-radius: var(--radius-default); box-shadow: var(--shadow-md); padding: var(--gap-default); min-block-size: 30vh; max-block-size: 50vh; overflow-y: auto; overflow-x: hidden; position: relative; contain: layout style; content-visibility: auto; contain-intrinsic-block-size: 30vh; }
  #output { white-space: pre-wrap; font-size: 0.9rem; line-height: 1.5; color: var(--txt-main); margin: 0; padding: 0; }
  .log-ok::before { content: "✓ "; color: var(--accent-ok); }
  .log-warn::before { content: "⚠ "; color: var(--accent-warn); }
  .log-fail::before { content: "✖ "; color: var(--accent-fail); }
  .log-glitch::before { content: "⌇ "; color: var(--accent-fail); }
  .log-warn { color: var(--accent-warn); }
  .log-fail { color: var(--accent-fail); }
  .log-glitch { color: var(--accent-fail); animation: flicker var(--animation-duration-guard) infinite; will-change: opacity; }
  #output pre.ascii-block { white-space: pre; font-variant-ligatures: none; font-size: 0.8rem; line-height: 1.4; color: var(--txt-dim); margin: 0.75rem 0; }
  .cmd-bar { display: flex; flex-direction: column; gap: var(--gap-small); background: var(--bg-panel); border: 1px solid var(--border-card); border-radius: var(--radius-default); box-shadow: var(--shadow-md); padding: 0.75rem var(--gap-default); contain: layout style; }
  .cmd-buttons { display: flex; flex-wrap: wrap; gap: var(--gap-small); }
  .cmd-btn { padding: var(--gap-small) 0.75rem; font-size: 0.8rem; line-height: 1; min-block-size: var(--min-touch-target); min-inline-size: 64px; }
  .cmd-btn.cmd-warn { border-color: var(--accent-warn); box-shadow: 0 0 10px var(--accent-warn); color: var(--accent-warn); }
  .cmd-btn.cmd-danger { border-color: var(--accent-fail); box-shadow: 0 0 10px var(--accent-fail); color: var(--accent-fail); }
  .cmd-btn.cmd-fun { border: 2px solid transparent; background-image: linear-gradient(var(--cmd-btn-bg), var(--cmd-btn-bg)), var(--rainbow-spectrum); background-origin: border-box; background-clip: padding-box, border-box; color: var(--txt-main); box-shadow: 0 0 12px var(--fun-glow); animation: rainbow-border 3s linear infinite; will-change: filter; }
  .cmd-input { flex: 1; min-inline-size: 0; background: var(--bg-panel-alt); color: var(--txt-main); border: 1px solid var(--border-card); border-radius: var(--radius-default); font-size: 0.8rem; line-height: 1.4; padding: 0.6rem 0.75rem; }
  .cmd-input:focus { background: var(--bg-panel); }
  @media (min-width: 600px) { .cmd-bar { flex-direction: row; align-items: flex-start; } .cmd-buttons { flex: 0 0 auto; } .cmd-input { flex: 1; } }
  @media (min-width: 768px) { .console-shell { padding: 2rem 2rem 4rem; gap: var(--gap-large); } .log-panel { max-block-size: 60vh; } }
  @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms; animation-iteration-count: 1; transition-duration: 0.01ms; } .log-glitch { animation: none; } .cmd-btn.cmd-fun, .dance-row, .guard-cover.blink, .status-bar-fill.instability, .status-bar-fill.meltdown, #panic-overlay.active { animation: none; } .guard-cover, .status-bar-fill, .dance-row, .log-glitch, .cmd-btn.cmd-fun { will-change: auto; } #auth-overlay .auth-card { animation: none; } }
  @media (forced-colors: active) { :focus-visible { outline: 2px solid CanvasText; outline-offset: 2px; } a { forced-color-adjust: auto; } button, [role="button"] { forced-color-adjust: auto; } }
}
@layer utilities {
  @keyframes guard-blink { 0% { box-shadow: 0 2px 6px rgba(0, 0, 0, 0.6); } 20% { box-shadow: 0 0 30px 8px rgba(255, 0, 0, 1); } 50% { box-shadow: 0 0 22px 6px rgba(255, 40, 40, 0.9); } 80% { box-shadow: 0 0 16px 4px rgba(255, 80, 80, 0.8); } 100% { box-shadow: 0 2px 6px rgba(0, 0, 0, 0.6); } }
  @keyframes panicPulse { 0% { box-shadow: 0 0 10px var(--panic-text), 0 0 40px var(--panic-text); } 100% { box-shadow: 0 0 30px var(--panic-text), 0 0 60px var(--panic-text); } }
  @keyframes rainbow { 0% { background-position: 0% 50%; } 100% { background-position: 100% 50%; } }
  @keyframes bounce { from { transform: translate3d(0, 0, 0); } to { transform: translate3d(0, -20px, 0); } }
  @keyframes auth-pop { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  @keyframes instability-flicker { 0% { inline-size: 20%; opacity: 1; } 25% { inline-size: 65%; opacity: 0.7; } 50% { inline-size: 90%; opacity: 1; } 75% { inline-size: 40%; opacity: 0.6; } 100% { inline-size: 75%; opacity: 1; } }
  @keyframes meltdown-flicker { 0% { inline-size: 100%; opacity: 1; } 20% { inline-size: 10%; opacity: 0.5; } 40% { inline-size: 95%; opacity: 1; } 60% { inline-size: 30%; opacity: 0.4; } 80% { inline-size: 100%; opacity: 1; } 100% { inline-size: 5%; opacity: 0.2; } }
  @keyframes flicker { 0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; } 20%, 24%, 55% { opacity: 0.4; } }
  @keyframes rainbow-border { 0% { filter: hue-rotate(0deg); } 100% { filter: hue-rotate(360deg); } }
}
`;

const jsContent = `
document.addEventListener("DOMContentLoaded", () => {
  const CONFIG = {
    limits: { maxSessionLines: 100, maxRandomLogs: 30, hardCap: 500, },
    timing: { initialBootGreen: 1500, bootLogDelay: 400, randomLogMin: 2000, randomLogMax: 5000, panicDuration: 5000, panicSpamInterval: 400, nukeCountdownInterval: 1000, nukeDuration: 5, bsodRebootDelay: 4500, bsodAnimationDuration: 2600, bsodAnimationStep: 40, danceDuration: 5000, guardBlinkDuration: 700, },
    network: { latencyMin: 5, latencyMax: 85, lossSpikeProbability: 0.15, lossNormalMax: 3, lossSpikeMin: 5, lossSpikeMax: 20, unstableThreshold: 10, },
    thresholds: { loadWarn: 50, loadFail: 75, },
    probabilities: { summonSuccess: 0.8, weirdLogs: 0.05, },
    asciiArt: { minLines: 40, maxLines: 80, minLinesAfter: 50, maxLinesAfter: 100, },
    statusUpdate: { slowInterval: 10000, fastInterval: 5000, },
    security: { nukePassword: "whydoesthiswork", },
    computed: { bsodSteps: 0, bsodPerStep: 0, },
  };
  CONFIG.computed.bsodSteps = Math.ceil(CONFIG.timing.bsodAnimationDuration / CONFIG.timing.bsodAnimationStep);
  CONFIG.computed.bsodPerStep = Math.ceil(100 / CONFIG.computed.bsodSteps);
  const LOG_MODES = Object.freeze({ NORMAL: "normal", PANIC: "panic", NUKE: "nuke", BSOD: "bsod", });
  const BAR_STATES = Object.freeze({ OK: "ok", WARN: "warn", FAIL: "fail", MELTDOWN: "meltdown", INSTABILITY: "instability", });
  const OVERLAY_CONFIG = [
    { key: "panic", id: "panic-overlay", innerClass: "panic-inner", contentId: "panic-content", children: [{ className: "panic-text", text: "!! SYSTEM INSTABILITY DETECTED !!" }, { className: "panic-text", text: "CONTAINMENT FAILURE POSSIBLE" }, { className: "panic-text small", text: "attempting graceful denial..." }], },
    { key: "bsod", id: "bsod-overlay", innerClass: "bsod-inner", contentId: "bsod-content", },
    { key: "dance", id: "dance-overlay", innerClass: "dance-inner", contentId: "dance-content", },
  ];
  const STATUS_CARD_CONFIG = [
    { key: "cpu", label: "CPU", valueId: "cpu-val", initialValue: "--%", barId: "cpu-bar", footId: "cpu-foot", footText: "process priority: vibes", },
    { key: "mem", label: "MEM", valueId: "mem-val", initialValue: "-- MB", barId: "mem-bar", footId: "mem-foot", footText: "leaks classified as features", },
    { key: "temp", label: "TEMP", valueId: "temp-val", initialValue: "--°C", barId: "temp-bar", footId: "temp-foot", footText: "thermal status: questionable", cardId: "temp-card", },
    { key: "net", label: "NET", valueId: "net-val", initialValue: "--", footId: "net-foot", footText: "uplink: -- | latency: -- ms | packet_loss: --% | status: questionable", },
  ];
  const COMMAND_CONFIG = [
    { type: "button", label: "help", cmd: "help", title: "Show available commands", controls: "mainLog", },
    { type: "button", label: "/summon", cmd: "/summon", title: "Summon AI assistant", controls: "mainLog", },
    { type: "button", label: "/dance", cmd: "/dance", title: "Trigger dance animation", controls: "dance-overlay", extraClasses: "cmd-fun", },
    { type: "button", label: "/panic", cmd: "/panic", title: "Trigger system panic alert", controls: "panic-overlay", extraClasses: "cmd-warn", },
    { type: "guard" },
    { type: "button", label: "clear", cmd: "clear", title: "Clear log output", controls: "output", },
  ];
  const util = Object.freeze({ pickRandom: (arr) => arr[(Math.random() * arr.length) | 0], randBetween: (a, b) => ((Math.random() * (b - a + 1)) | 0) + a, });
  function updateElement(element, content) { if (element) element.textContent = content; }
  function clearAndCloseOverlay(overlayEl, contentEl = null) { closeOverlay(overlayEl); if (contentEl) setChildren(contentEl); }
  let logMode = LOG_MODES.NORMAL;
  const isInSpecialMode = () => logMode !== LOG_MODES.NORMAL;
  const setLogMode = (mode) => { logMode = mode; };
  const asciiBox = ["╔═══════════════════════════════════════╗", "║       whydoesthiswork.localhost       ║", "║        it runs. somehow. maybe.       ║", "╚═══════════════════════════════════════╝", "", "",].join("\\n");
  const bootLogs = ["[sys] ── boot sequence started", "[boot] mounting unstable container..............  [==>        ]  23%", "[ok] local model jammed into RAM. questionable. [====>      ]  47%", "[warn] token buffer overflow ignored.           [=======>   ]  65%", "[info] patching logic with tape.                  [========>  ]  78%", "[fail] reasoning module missing. using vibes.   [=========> ]  89%", "[ok] model now hallucinating confidently.       [==========>] 100%", "[sys] serving at whydoesthiswork.localhost", "",];
  const randomLogs = ["[debug] shuffling attention weights...", "[info] running out of tokens, trying anyway.", "[ok] sanity check skipped (as usual).", "[sys] memory leaks embraced as personality.", "[log] parsing markdown with violence.", "[debug] retraining based on vibes...", "[info] chat loop complete. starting over.", "[ok] output sounds confident. must be right.", "[trace] hallucination.c: line 42", "[sys] YOLO mode engaged.", "[note] tokens are people too.", "[debug] cache hit rate: suspicious.", "[info] tokens flowing smoothly.", "[ok] all systems nominal (probably).", "[sys] background tasks humming along.", "[log] context window expanded.", "[debug] attention heads aligned.", "[info] processing batch quietly.", "[ok] latency within acceptable range.", "[sys] memory management: stable.", "[log] inference cycle complete.", "[debug] temperature set to default.", "[info] context preserved.", "[ok] checkpoint saved.", "[sys] idle cycles utilized.", "[log] batch processed.", "[warn] latency spike blamed on the user.", "[fail] tried logic. got sarcasm.",];
  const weirdLogs = ["[???] unexpected clarity detected.", "[glitch] ¯\\\\_(ツ)_/¯ protocol initiated.", "[sys] echo chamber feedback loop engaged.", "[note] reality index drifting off baseline.", "[err] sanity check failed: 'NaN'", "[ghost] who coded this?", "[glitch] ~s̷y̴s̷t̸e̷m̷~",];
  const asciiVisitors = [
    \`              
        (\\\\-^-/)
        |=   =|
        | ___ |
       /:_____:\\\\
       \\\\/_# #_\\\\//
       /|\\\\\\\\_=_/|\\\\\\\\
       \\\\\\\\_\\\\\\\\___/_/
        /_/ \\\\\\\\_\\\\\\\\
      [robot-01]\`,
    \`       .-.
      (o o)
      | O \\\\
       \\\\   \\\\_
      .-\\\\___)=-.
     /         \\\\
    /  ~ AI ~   \\\\
    \\\\  spirit  /
     '._   _.'
        \`-'\`
      [cryptid]\`,
    \`      /\\\\
     /  \\\\    _  _
    / /\\\\ \\\\  ( \\\\/ )
   / ____ \\\\  \\\\  /
  /_/    \\\\_\\\\  \\\\/
   ( ascii mothman )
\`,
  ];
  const shell = document.querySelector(".console-shell");
  const output = document.getElementById("output");
  const cmdline = document.getElementById("cmdline");
  const cmdBar = document.querySelector(".cmd-bar");
  const themeToggleBtn = document.getElementById("themeToggle");
  const logPanel = document.querySelector(".log-panel");
  const overlayMount = document.getElementById("overlay-root");
  const { overlays: overlayEls, contents: overlayContents } = renderStaticOverlays(overlayMount);
  buildCommandButtons(document.getElementById("cmd-buttons"));
  const overlays = { panic: overlayEls.panic || document.getElementById("panic-overlay"), bsod: overlayEls.bsod || document.getElementById("bsod-overlay"), dance: overlayEls.dance || document.getElementById("dance-overlay"), auth: document.getElementById("auth-overlay"), };
  const panicContent = overlayContents.panic || document.getElementById("panic-content");
  const bsodContent = overlayContents.bsod || document.getElementById("bsod-content");
  const authContent = document.getElementById("auth-content");
  function createDiv(className, text) { const div = document.createElement("div"); div.className = className; if (text !== undefined) div.textContent = text; return div; }
  function setChildren(container, ...nodes) { if (!container) return; if (typeof container.replaceChildren === "function") { container.replaceChildren(...nodes); return; } while (container.firstChild) { container.removeChild(container.firstChild); } nodes.forEach((node) => container.appendChild(node)); }
  function renderPanicAlert(container) { if (!container) return; setChildren(container, createDiv("panic-text", "!! SYSTEM INSTABILITY DETECTED !!"), createDiv("panic-text", "CONTAINMENT FAILURE POSSIBLE"), createDiv("panic-text small", "attempting graceful denial...")); }
  function renderBSODContent(container) { if (!container) return null; const face = createDiv("bsod-face", ":("); const msg = createDiv("bsod-msg"); msg.append("Your system ran into a problem and needs to restart.", document.createElement("br"), "We're just collecting some error info, and then we'll restart for you."); const progressMsg = createDiv("bsod-msg"); const pct = document.createElement("span"); pct.id = "bsod-pct"; pct.textContent = "0%"; progressMsg.append(pct, " complete"); const code = createDiv("bsod-code", "STOP_CODE: VIBE_EXECUTION_FAILURE"); setChildren(container, face, msg, progressMsg, code); return pct; }
  function renderDanceRows(container, rows = 6) { if (!container) return; const children = []; for (let i = 0; i < rows; i++) { const row = createDiv(\`dance-row delay-\${i}\`, "(>'-')>   <('-'<)   ^('-')^"); children.push(row); } setChildren(container, ...children); }
  function renderStaticOverlays(mount) { const overlayMap = {}; const contentMap = {}; if (!mount) return { overlays: overlayMap, contents: contentMap }; const nodes = OVERLAY_CONFIG.map((cfg) => { const wrapper = document.createElement("div"); wrapper.id = cfg.id; wrapper.setAttribute("role", "dialog"); wrapper.setAttribute("aria-modal", "true"); wrapper.hidden = true; const inner = createDiv(cfg.innerClass || ""); if (cfg.contentId) inner.id = cfg.contentId; if (cfg.children?.length) { const children = cfg.children.map((child) => createDiv(child.className, child.text)); setChildren(inner, ...children); } wrapper.appendChild(inner); overlayMap[cfg.key] = wrapper; contentMap[cfg.key] = inner; return wrapper; }); mount.replaceWith(...nodes); return { overlays: overlayMap, contents: contentMap }; }
  function buildStatusCards(container) { if (!container) { return STATUS_CARD_CONFIG.reduce((acc, cfg) => { const entry = { val: document.getElementById(cfg.valueId), foot: document.getElementById(cfg.footId), }; if (cfg.barId) entry.bar = document.getElementById(cfg.barId); acc[cfg.key] = entry; return acc; }, {}); } const refs = {}; const cards = STATUS_CARD_CONFIG.map((cfg) => { const card = document.createElement("div"); card.className = "status-card"; if (cfg.cardId) card.id = cfg.cardId; const head = createDiv("status-head"); const label = document.createElement("span"); label.className = "status-label"; label.textContent = cfg.label; const value = document.createElement("span"); value.className = "status-val"; value.textContent = cfg.initialValue; value.id = cfg.valueId; value.setAttribute("role", "status"); head.append(label, value); const cardRefs = { val: value }; if (cfg.barId) { const barWrap = createDiv("status-bar-wrap"); const bar = createDiv("status-bar-fill ok"); bar.id = cfg.barId; barWrap.appendChild(bar); card.append(head, barWrap); cardRefs.bar = bar; } else { card.appendChild(head); } const foot = createDiv("status-foot", cfg.footText); foot.id = cfg.footId; card.appendChild(foot); cardRefs.foot = foot; refs[cfg.key] = cardRefs; return card; }); setChildren(container, ...cards); return refs; }
  function buildCommandButtons(container) { if (!container) return; const controls = COMMAND_CONFIG.map((cfg) => { if (cfg.type === "button") { return createCommandButton(cfg); } if (cfg.type === "guard") { return createGuardAssembly(); } return null; }).filter(Boolean); setChildren(container, ...controls); }
  function createCommandButton(cfg) { const btn = document.createElement("button"); btn.className = ["cmd-btn", cfg.extraClasses].filter(Boolean).join(" "); btn.dataset.cmd = cfg.cmd; btn.type = "button"; btn.title = cfg.title; if (cfg.controls) btn.setAttribute("aria-controls", cfg.controls); btn.textContent = cfg.label; return btn; }
  function createGuardAssembly() { const wrapper = document.createElement("div"); wrapper.className = "nuke-guard"; const nukeBtn = document.createElement("button"); nukeBtn.className = "cmd-btn cmd-danger nuke-btn"; nukeBtn.dataset.cmd = "/nuke"; nukeBtn.type = "button"; nukeBtn.id = "nuke-btn"; nukeBtn.title = "Nuclear option - requires authentication"; nukeBtn.setAttribute("aria-controls", "bsod-overlay auth-overlay"); nukeBtn.disabled = true; nukeBtn.textContent = "/nuke"; const hinge = createDiv("guard-hinge"); const guardSwitch = document.createElement("button"); guardSwitch.className = "guard-cover"; guardSwitch.id = "guard-switch"; guardSwitch.type = "button"; guardSwitch.setAttribute("aria-pressed", "false"); guardSwitch.setAttribute("aria-label", "Safety guard - click to open"); guardSwitch.title = "Guard closed – click to open"; guardSwitch.setAttribute("aria-controls", "nuke-btn"); const guardLabel = document.createElement("span"); guardLabel.className = "guard-label-main"; guardLabel.textContent = "DANGER"; guardSwitch.appendChild(guardLabel); wrapper.append(nukeBtn, hinge, guardSwitch); return wrapper; }
  const statusCards = buildStatusCards(document.getElementById("status-grid"));
  let lastFocusEl = null;
  function openOverlay(overlayEl, focusEl) { lastFocusEl = document.activeElement instanceof HTMLElement ? document.activeElement : null; overlayEl?.removeAttribute("hidden"); overlayEl?.classList.add("active"); overlayEl?.setAttribute("aria-hidden", "false"); const target = focusEl || overlayEl; if (!target?.hasAttribute("tabindex")) target?.setAttribute("tabindex", "-1"); target?.focus({ preventScroll: true }); }
  function closeOverlay(overlayEl) { overlayEl?.classList.remove("active"); overlayEl?.setAttribute("aria-hidden", "true"); overlayEl?.setAttribute("hidden", ""); if (lastFocusEl && document.contains(lastFocusEl)) { lastFocusEl.focus({ preventScroll: true }); } else { cmdline?.focus({ preventScroll: true }); } }
  const overlayManager = { open(overlay, focusElement, setupCallback) { setupCallback?.(); openOverlay(overlay, focusElement); }, close(overlay, cleanupCallback) { closeOverlay(overlay); cleanupCallback?.(); }, temporary(overlay, duration, setupCallback, cleanupCallback) { this.open(overlay, null, setupCallback); setTimeout(() => { this.close(overlay, cleanupCallback); }, duration); }, };
  class TimerManager { constructor() { this.intervals = new Set(); this.timeouts = new Set(); } addInterval(id) { this.intervals.add(id); return id; } addTimeout(id) { this.timeouts.add(id); return id; } clear(id) { if (this.intervals.has(id)) { clearInterval(id); this.intervals.delete(id); } if (this.timeouts.has(id)) { clearTimeout(id); this.timeouts.delete(id); } } clearAll() { this.intervals.forEach(clearInterval); this.timeouts.forEach(clearTimeout); this.intervals.clear(); this.timeouts.clear(); } }
  const timers = new TimerManager();
  function every(ms, fn) { const h = setInterval(() => { if (!document.hidden) fn(); }, ms); return timers.addInterval(h); }
  function schedule(fn, delay) { const h = setTimeout(() => { if (!document.hidden) fn(); }, delay); return timers.addTimeout(h); }
  function updateFastStatus() { const mode = pickNetMode(); const latency = util.randBetween(CONFIG.network.latencyMin, CONFIG.network.latencyMax); const loss = Math.random() < CONFIG.network.lossSpikeProbability ? util.randBetween(CONFIG.network.lossSpikeMin, CONFIG.network.lossSpikeMax) : util.randBetween(0, CONFIG.network.lossNormalMax); Object.assign(lastStats, { netMode: mode, latencyMs: latency, lossPct: loss, }); const status = loss > CONFIG.network.unstableThreshold ? "unstable" : "questionable"; updateElement(statusCards.net.val, mode); updateElement(statusCards.net.foot, \`uplink: \${mode} | latency: \${latency} ms | packet_loss: \${loss}% | status: \${status}\`); }
  document.addEventListener("visibilitychange", () => { if (document.hidden) { timers.clearAll(); __loopsRunning = false; } else { startStatusLoops(); } });
  function setTheme(mode) { if (shell) shell.dataset.theme = mode; updateElement(themeToggleBtn, \`mode: \${mode}\`); themeToggleBtn?.setAttribute("aria-pressed", String(mode === "dark")); }
  function applyThemeFromStorage() { const saved = localStorage.getItem("themeMode"); if (saved) setTheme(saved); }
  function toggleTheme() { const next = shell?.dataset.theme === "dark" ? "light" : "dark"; setTheme(next); localStorage.setItem("themeMode", next); clickBlip(); }
  themeToggleBtn?.addEventListener("click", toggleTheme);
  applyThemeFromStorage();
  let audioCtx;
  let lastErrorBeepAt = 0;
  function initAudioCtx() { if (!audioCtx) { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } if (audioCtx.state === "suspended") { audioCtx.resume().catch(() => {}); } return audioCtx; }
  function ensureAudioReady() { const ctx = initAudioCtx(); if (ctx.state === "suspended") { return ctx.resume().then(() => ctx).catch(() => ctx); } return Promise.resolve(ctx); }
  function safeAudio(fn) { return (...args) => { try { return fn(...args); } catch (e) { console.warn("Audio error:", e); } }; }
  const clickBlip = safeAudio(() => { if (performance.now() - lastErrorBeepAt < 200) return; const ctx = initAudioCtx(); const t = ctx.currentTime; const o = ctx.createOscillator(); const g = ctx.createGain(); o.type = "square"; o.frequency.value = 600; o.connect(g); g.connect(ctx.destination); g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.15, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.08); o.start(t); o.stop(t + 0.09); });
  const playErrorBeep = safeAudio(() => { lastErrorBeepAt = performance.now(); const ctx = initAudioCtx(); const o = ctx.createOscillator(); const g = ctx.createGain(); o.type = "sawtooth"; o.frequency.value = 220; o.connect(g); g.connect(ctx.destination); const t = ctx.currentTime; g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.15, t + 0.02); o.start(t); o.frequency.exponentialRampToValueAtTime(110, t + 0.12); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.14); o.stop(t + 0.16); });
  const playPanicAlarm = safeAudio(() => { const ctx = initAudioCtx(); const startT = ctx.currentTime; function toneBurst(freq, startOffset) { const o = ctx.createOscillator(); const g = ctx.createGain(); o.type = "square"; o.frequency.value = freq; o.connect(g); g.connect(ctx.destination); g.gain.setValueAtTime(0.0001, startT + startOffset); g.gain.linearRampToValueAtTime(0.2, startT + startOffset + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, startT + startOffset + 0.35); o.start(startT + startOffset); o.stop(startT + startOffset + 0.4); } for (let i = 0; i < 12; i++) { const off = i * 0.4; const f = i % 2 === 0 ? 440 : 220; toneBurst(f, off); } });
  function playNukeAlarm() { ensureAudioReady().then((ctx) => { const base = ctx.currentTime; const total = Math.max(0, CONFIG.timing.nukeDuration - 0.05); function beepBurst(startOffset) { const o = ctx.createOscillator(); const g = ctx.createGain(); o.type = "square"; o.frequency.value = 880; o.connect(g); g.connect(ctx.destination); g.gain.setValueAtTime(0.0001, base + startOffset); g.gain.linearRampToValueAtTime(0.25, base + startOffset + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, base + startOffset + 0.12); o.start(base + startOffset); o.stop(base + startOffset + 0.15); } for (let off = 0; off < total; off += 0.25) { beepBurst(off); } }).catch((e) => { console.warn("Audio init error for nuke alarm:", e); }); }
  function playTickBeep() { ensureAudioReady().then((ctx) => { const t = ctx.currentTime; const o = ctx.createOscillator(); const g = ctx.createGain(); o.type = "square"; o.frequency.value = 880; o.connect(g); g.connect(ctx.destination); g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.2, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.11); o.start(t); o.stop(t + 0.12); }).catch(() => {}); }
  const playCrashTone = safeAudio(() => { const ctx = initAudioCtx(); const now = ctx.currentTime; function burst(freq, dur, gainVal) { const o = ctx.createOscillator(); const g = ctx.createGain(); o.type = "square"; o.frequency.value = freq; o.connect(g); g.connect(ctx.destination); g.gain.setValueAtTime(0.0001, now); g.gain.linearRampToValueAtTime(gainVal, now + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, now + dur); o.start(now); o.stop(now + dur + 0.02); } burst(440, 0.4, 0.3); burst(622, 0.4, 0.2); burst(880, 0.4, 0.2); burst(110, 0.6, 0.15); });
  let danceNodes = new Set();
  const playDanceTune = safeAudio(() => { const ctx = initAudioCtx(); const tempo = 150; const beat = 60 / tempo; const lead = [440, 523, 659, 523]; for (let bar = 0; bar < 5; bar++) { const t0 = ctx.currentTime + bar * beat * 4; lead.forEach((f, i) => { const o = ctx.createOscillator(), g = ctx.createGain(); o.type = "square"; o.frequency.value = f; o.connect(g); g.connect(ctx.destination); g.gain.setValueAtTime(0.14, t0 + i * beat); g.gain.linearRampToValueAtTime(0.0001, t0 + i * beat + beat * 0.9); o.start(t0 + i * beat); o.stop(t0 + i * beat + beat); danceNodes.add(o); danceNodes.add(g); }); for (let i = 0; i < 4; i++) { const o = ctx.createOscillator(), g = ctx.createGain(); o.type = "square"; o.frequency.value = 110; o.connect(g); g.connect(ctx.destination); g.gain.setValueAtTime(0.09, t0 + i * beat); g.gain.linearRampToValueAtTime(0.0001, t0 + i * beat + beat); o.start(t0 + i * beat); o.stop(t0 + i * beat + beat); danceNodes.add(o); danceNodes.add(g); } const k = ctx.createOscillator(), kg = ctx.createGain(); k.type = "triangle"; k.frequency.setValueAtTime(120, t0); k.connect(kg); kg.connect(ctx.destination); kg.gain.setValueAtTime(0.25, t0); k.frequency.exponentialRampToValueAtTime(50, t0 + 0.08); kg.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.12); k.start(t0); k.stop(t0 + 0.13); danceNodes.add(k); danceNodes.add(kg); const s = ctx.createOscillator(), sg = ctx.createGain(); s.type = "square"; s.frequency.setValueAtTime(300, t0 + beat * 2); s.connect(sg); sg.connect(ctx.destination); sg.gain.setValueAtTime(0.12, t0 + beat * 2); sg.gain.exponentialRampToValueAtTime(0.0001, t0 + beat * 2 + 0.08); s.start(t0 + beat * 2); s.stop(t0 + beat * 2 + 0.09); danceNodes.add(s); danceNodes.add(sg); } });
  function stopDanceTune() { danceNodes.forEach((n) => { try { if (n.stop) n.stop(); n.disconnect(); } catch (e) {} }); danceNodes.clear(); }
  let lastStats = { cpu: 0, mem: 0, temp: 0, netMode: "idle", latencyMs: 0, lossPct: 0, };
  let initialBoot = true;
  setTimeout(() => { initialBoot = false; }, CONFIG.timing.initialBootGreen);
  function pickNetMode() { const modes = ["idle", "rx", "tx", "link?", "??"]; return util.pickRandom(modes); }
  function classifyLoad(pct) { if (pct < CONFIG.thresholds.loadWarn) return BAR_STATES.OK; if (pct < CONFIG.thresholds.loadFail) return BAR_STATES.WARN; return BAR_STATES.FAIL; }
  function isBarLocked(barEl) { return ( barEl?.classList.contains(BAR_STATES.INSTABILITY) || barEl?.classList.contains(BAR_STATES.MELTDOWN) ); }
  function setBarState(barEl, state) { if (isBarLocked(barEl)) return; if ( initialBoot && (barEl === statusCards.cpu.bar || barEl === statusCards.mem.bar || barEl === statusCards.temp.bar) ) { barEl?.classList.remove( BAR_STATES.OK, BAR_STATES.WARN, BAR_STATES.FAIL, BAR_STATES.MELTDOWN, BAR_STATES.INSTABILITY ); barEl?.classList.add(BAR_STATES.OK); return; } barEl?.classList.remove(BAR_STATES.OK, BAR_STATES.WARN, BAR_STATES.FAIL); barEl?.classList.add(state); }
  function applyInstabilityBars() { [statusCards.cpu.bar, statusCards.mem.bar, statusCards.temp.bar].forEach( (bar) => { bar?.classList.remove( BAR_STATES.OK, BAR_STATES.WARN, BAR_STATES.FAIL, BAR_STATES.MELTDOWN ); bar?.classList.add(BAR_STATES.INSTABILITY); } ); updateElement(statusCards.cpu.foot, "process priority: degraded"); updateElement(statusCards.mem.foot, "memory integrity: questionable"); updateElement(statusCards.temp.foot, "thermal status: unstable"); updateElement(statusCards.net.val, "???"); updateElement( statusCards.net.foot, "uplink: unstable | latency: spiking | packet_loss: escalating | status: WARNING" ); }
  function clearInstabilityBars() { [statusCards.cpu.bar, statusCards.mem.bar, statusCards.temp.bar].forEach( (bar) => bar?.classList.remove(BAR_STATES.INSTABILITY) ); }
  function applyMeltdownBars() { [statusCards.cpu.bar, statusCards.mem.bar, statusCards.temp.bar].forEach( (bar) => { bar?.classList.remove( BAR_STATES.OK, BAR_STATES.WARN, BAR_STATES.FAIL, BAR_STATES.INSTABILITY ); bar?.classList.add(BAR_STATES.MELTDOWN); } ); updateElement(statusCards.cpu.foot, "cpu status: cascading failure"); updateElement(statusCards.mem.foot, "ram status: bitrot detected"); updateElement(statusCards.temp.foot, "thermal status: runaway"); updateElement(statusCards.net.val, "DOWN"); updateElement( statusCards.net.foot, "uplink: DISCONNECTED | latency: ∞ ms | packet_loss: 100% | status: HARD FAIL" ); }
  function clearMeltdownBars() { [statusCards.cpu.bar, statusCards.mem.bar, statusCards.temp.bar].forEach( (bar) => bar?.classList.remove(BAR_STATES.MELTDOWN) ); }
  function updateSlowStatus() { let cpu = initialBoot ? 5 : Math.floor(Math.random() * 101); let memUsed = initialBoot ? 100 : Math.floor(Math.random() * 1001); let temp = initialBoot ? 35 : Math.floor(Math.random() * 101); cpu = Math.min(Math.max(cpu, 0), 100); memUsed = Math.min(Math.max(memUsed, 0), 1000); temp = Math.min(Math.max(temp, 0), 100); const cpuWidth = cpu; const memWidth = (memUsed / 1000) * 100; const tempWidth = temp; lastStats.cpu = cpu; lastStats.mem = memUsed; lastStats.temp = temp; const anyLocked = isBarLocked(statusCards.cpu.bar) || isBarLocked(statusCards.mem.bar) || isBarLocked(statusCards.temp.bar); if (!anyLocked) { updateElement(statusCards.cpu.val, \`\${cpu}%\`); updateElement(statusCards.mem.val, \`\${memUsed} MB\`); updateElement(statusCards.temp.val, \`\${temp} °C\`); } const bars = [ { el: statusCards.cpu.bar, widthPct: cpuWidth }, { el: statusCards.mem.bar, widthPct: memWidth }, { el: statusCards.temp.bar, widthPct: tempWidth }, ]; bars.forEach(({ el, widthPct }) => { if (!isBarLocked(el)) { if (el) el.style.width = \`\${Math.min(widthPct, 100)}%\`; } if (!isBarLocked(el)) { if ( initialBoot && (el === statusCards.cpu.bar || el === statusCards.mem.bar || el === statusCards.temp.bar) ) { el?.classList.remove( BAR_STATES.OK, BAR_STATES.WARN, BAR_STATES.FAIL, BAR_STATES.MELTDOWN, BAR_STATES.INSTABILITY ); el?.classList.add(BAR_STATES.OK); } else { const state = classifyLoad(widthPct); el?.classList.remove(BAR_STATES.OK, BAR_STATES.WARN, BAR_STATES.FAIL); el?.classList.add(state); } } }); if (!isBarLocked(statusCards.cpu.bar)) { const cpuFooter = cpuWidth >= CONFIG.thresholds.loadFail ? "process priority: degraded" : cpuWidth >= CONFIG.thresholds.loadWarn ? "process priority: questionable" : "process priority: looks good (i think)"; updateElement(statusCards.cpu.foot, cpuFooter); } if (!isBarLocked(statusCards.mem.bar)) { const memFooter = memWidth >= CONFIG.thresholds.loadFail ? "memory status: leaking" : memWidth >= CONFIG.thresholds.loadWarn ? "memory status: questionable" : "memory status: should be sufficient"; updateElement(statusCards.mem.foot, memFooter); } if (!isBarLocked(statusCards.temp.bar)) { const tempFooter = temp >= CONFIG.thresholds.loadFail ? "thermal status: screaming" : temp >= CONFIG.thresholds.loadWarn ? "thermal status: warm-ish" : "thermal status: questionable"; updateElement(statusCards.temp.foot, tempFooter); } }
  let __loopsRunning = false;
  function startStatusLoops() { if (__loopsRunning) return; __loopsRunning = true; updateSlowStatus(); updateFastStatus(); every(CONFIG.statusUpdate.slowInterval, updateSlowStatus); every(CONFIG.statusUpdate.fastInterval, updateFastStatus); }
  startStatusLoops();
  function scrollToBottomIfStuck(scroller, wasAtBottom) { if (!scroller) return; if (wasAtBottom) { requestAnimationFrame(() => { scroller.scrollTop = scroller.scrollHeight; }); } }
  output.textContent = \`\${asciiBox}\\n\`;
  let dynamicLogElements = [];
  let lastLog = "";
  let bootIndex = 0;
  let lineCounter = 0;
  let nextAsciiAt = util.randBetween(CONFIG.asciiArt.minLines, CONFIG.asciiArt.maxLines);
  let sessionLineCount = 0;
  const GLITCH_RE = /^\\[(glitch|\\?\\?\\?|err|ghost)\\]/;
  const logClasses = { "[ok]": "log-ok", "[warn]": "log-warn", "[fail]": "log-fail", };
  function rotateLogBuffer() { output.textContent = "[sys] log buffer rotated.\\n"; dynamicLogElements = []; lineCounter = 0; nextAsciiAt = util.randBetween(CONFIG.asciiArt.minLines, CONFIG.asciiArt.maxLines); sessionLineCount = 1; }
  function appendStyledLog(text, track) { if (sessionLineCount >= CONFIG.limits.maxSessionLines) { rotateLogBuffer(); } const scroller = logPanel; const wasAtBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 10; const frag = document.createDocumentFragment(); if (track && !isInSpecialMode() && ++lineCounter >= nextAsciiAt) { const pre = document.createElement("pre"); pre.className = "ascii-block"; pre.textContent = \`\${util.pickRandom(asciiVisitors)}\\n\`; pre.setAttribute("aria-hidden", "true"); frag.appendChild(pre); dynamicLogElements.push(pre); lineCounter = 0; nextAsciiAt = util.randBetween(CONFIG.asciiArt.minLinesAfter, CONFIG.asciiArt.maxLinesAfter); } const span = document.createElement("span"); span.textContent = \`\${text}\\n\`; const prefix = text.substring(0, text.indexOf("]") + 1); if (logClasses[prefix]) { span.classList.add(logClasses[prefix]); } else if (GLITCH_RE.test(text)) { span.classList.add("log-glitch"); } frag.appendChild(span); if (track) dynamicLogElements.push(span); output.appendChild(frag); sessionLineCount++; if (dynamicLogElements.length > CONFIG.limits.maxRandomLogs) { const toRemove = dynamicLogElements.splice( 0, dynamicLogElements.length - CONFIG.limits.maxRandomLogs ); toRemove.forEach((n) => n?.remove()); } while (output.childNodes.length > CONFIG.limits.hardCap) { output.firstChild?.remove(); } scrollToBottomIfStuck(scroller, wasAtBottom); }
  function printBootLogs() { if (isInSpecialMode()) { schedule(printBootLogs, CONFIG.timing.bootLogDelay); return; } if (bootIndex < bootLogs.length) { appendStyledLog(bootLogs[bootIndex++], false); schedule(printBootLogs, CONFIG.timing.bootLogDelay); } else { schedule(generateRandomLogs, 1000); } }
  function generateRandomLogs() { const delay = Math.floor( Math.random() * (CONFIG.timing.randomLogMax - CONFIG.timing.randomLogMin) ) + CONFIG.timing.randomLogMin; if (isInSpecialMode()) { schedule(generateRandomLogs, delay); return; } const pool = Math.random() < CONFIG.probabilities.weirdLogs ? weirdLogs : randomLogs; let line; do { line = util.pickRandom(pool); } while (line === lastLog); lastLog = line; appendStyledLog(line, true); if ("requestIdleCallback" in window) { requestIdleCallback(() => schedule(generateRandomLogs, delay), { timeout: delay, }); } else { schedule(generateRandomLogs, delay); } }
  schedule(printBootLogs, 800);
  function triggerPanic() { if (!panicContent || !overlays.panic) return; setLogMode(LOG_MODES.PANIC); applyInstabilityBars(); updateElement(statusCards.cpu.val, "???"); updateElement(statusCards.mem.val, "???"); updateElement(statusCards.temp.val, "???"); updateElement(statusCards.cpu.foot, "process priority: unstable"); updateElement( statusCards.mem.foot, "memory status: fragmentation detected" ); updateElement(statusCards.temp.foot, "thermal status: escalating"); renderPanicAlert(panicContent); openOverlay(overlays.panic, panicContent); appendStyledLog("[warn] abnormal energy spike in inference chamber", false); appendStyledLog( "[fail] containment breach flagged. ignoring for now.", false ); appendStyledLog("[err] escalating to panic handler...", false); playPanicAlarm(); const spamInt = timers.addInterval( setInterval(() => { appendStyledLog("[panic] subsystem meltdown risk: acceptable", false); }, CONFIG.timing.panicSpamInterval) ); timers.addTimeout( setTimeout(() => { timers.clear(spamInt); clearInstabilityBars(); updateSlowStatus(); updateFastStatus(); closeOverlay(overlays.panic); appendStyledLog("[ok] crisis averted. nothing was learned.", false); setLogMode(LOG_MODES.NORMAL); }, CONFIG.timing.panicDuration) ); }
  let nukeInProgress = false;
  let nukeMetronome = null;
  function playMetronomeBeep() { ensureAudioReady().then((ctx) => { const t = ctx.currentTime; const o = ctx.createOscillator(); const g = ctx.createGain(); o.type = "square"; o.frequency.value = 880; o.connect(g); g.connect(ctx.destination); g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.18, t + 0.008); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09); o.start(t); o.stop(t + 0.1); }).catch(() => {}); }
  function startNukeMetronome(rateMs = 250) { if (nukeMetronome) timers.clear(nukeMetronome); nukeMetronome = every(rateMs, () => playMetronomeBeep()); }
  function stopNukeMetronome() { if (nukeMetronome) { timers.clear(nukeMetronome); nukeMetronome = null; } }
  function openAuthModal() { return new Promise((resolve) => { if (!overlays.auth || !authContent) return resolve(null); openOverlay(overlays.auth, authContent); const inputEl = document.getElementById("auth-input"); const okBtn = document.getElementById("auth-ok"); const cancelBtn = document.getElementById("auth-cancel"); const errEl = document.getElementById("auth-error"); if (errEl) errEl.style.display = "none"; if (inputEl) { inputEl.value = ""; setTimeout(() => inputEl.focus({ preventScroll: true }), 0); } const submit = () => { const val = (inputEl?.value || "").trim(); if (!val) { if (errEl) errEl.style.display = "block"; return; } if (val === CONFIG.security.nukePassword) { cleanup(); resolve(true); } else { cleanup(); resolve(false); } }; const cancel = () => { cleanup(); resolve(null); }; function onKey(e) { if (e.key === "Enter") { e.preventDefault(); submit(); } if (e.key === "Escape") { e.preventDefault(); cancel(); } } function hideErr() { if (errEl) errEl.style.display = "none"; } function cleanup() { document.removeEventListener("keydown", onKey, true); inputEl?.removeEventListener("input", hideErr); okBtn?.removeEventListener("click", submit); cancelBtn?.removeEventListener("click", cancel); closeOverlay(overlays.auth); } inputEl?.addEventListener("input", hideErr); okBtn?.addEventListener("click", submit); cancelBtn?.addEventListener("click", cancel); document.addEventListener("keydown", onKey, true); }); }
  function requestNukeAuth() { return openAuthModal(); }
  function disarmNuke(reason = "authentication failed") { handleCommandError(\`\${reason}. nuclear sequence disarmed.\`, true); stopNukeMetronome(); guardManager.close(); nukeInProgress = false; setLogMode(LOG_MODES.NORMAL); clearMeltdownBars(); updateSlowStatus(); updateFastStatus(); }
  function triggerNuke() { if (nukeInProgress) return; if (!panicContent || !overlays.panic) { handleCommandError("panic overlay unavailable."); return; } nukeInProgress = true; setLogMode(LOG_MODES.NUKE); applyMeltdownBars(); updateElement(statusCards.cpu.val, "!!!"); updateElement(statusCards.mem.val, "!!!"); updateElement(statusCards.temp.val, "!!!"); let t = CONFIG.timing.nukeDuration; setChildren(panicContent); const big = document.createElement("div"); big.className = "panic-countdown-big"; const cnt = document.createElement("span"); cnt.id = "panic-count"; cnt.textContent = \`T-\${t}\`; big.appendChild(cnt); const cap = document.createElement("div"); cap.className = "panic-caption"; cap.textContent = "NUCLEAR RELEASE ARMED"; const small = document.createElement("div"); small.className = "panic-text small"; small.textContent = "please remain calm"; panicContent.appendChild(big); panicContent.appendChild(cap); panicContent.appendChild(small); openOverlay(overlays.panic, panicContent); appendStyledLog("[warn] nuclear option armed. stand by.", false); startNukeMetronome(250); const countdownEl = cnt; const tickInterval = timers.addInterval( setInterval(() => { t--; if (t > 0) { if (countdownEl) countdownEl.textContent = \`T-\${t}\`; appendStyledLog(\`[warn] T-\${t}\`, false); } else { stopNukeMetronome(); timers.clear(tickInterval); closeOverlay(overlays.panic); launchBSOD(); } }, CONFIG.timing.nukeCountdownInterval) ); }
  function launchBSOD() { if (!bsodContent || !overlays.bsod) { handleCommandError("bsod overlay unavailable."); return; } appendStyledLog("[fail] /nuke executed. system halt requested.", false); overlays.bsod?.classList.add("active"); overlays.bsod?.setAttribute("aria-hidden", "false"); overlays.bsod?.removeAttribute("hidden"); playCrashTone(); const pctEl = renderBSODContent(bsodContent); if (!bsodContent.hasAttribute("tabindex")) bsodContent.setAttribute("tabindex", "-1"); bsodContent.focus({ preventScroll: true }); const startTime = performance.now(); function animateBSOD(currentTime) { const elapsed = currentTime - startTime; const progress = Math.min( 100, (elapsed / CONFIG.timing.bsodAnimationDuration) * 100 ); updateElement(pctEl, \`\${Math.floor(progress)}%\`); if (progress < 100) { requestAnimationFrame(animateBSOD); } } requestAnimationFrame(animateBSOD); timers.addTimeout( setTimeout(() => { clearAndCloseOverlay(overlays.bsod, bsodContent); clearMeltdownBars(); output.textContent = ""; dynamicLogElements = []; sessionLineCount = 0; lineCounter = 0; nextAsciiAt = util.randBetween( CONFIG.asciiArt.minLinesAfter, CONFIG.asciiArt.maxLinesAfter ); nukeInProgress = false; guardManager.close(); updateSlowStatus(); updateFastStatus(); setLogMode(LOG_MODES.NORMAL); appendStyledLog("[ok] reboot complete. nothing was learned.", true); cmdline?.focus({ preventScroll: true }); }, CONFIG.timing.bsodRebootDelay) ); }
  function doDance() { if (!overlays.dance) return; overlayManager.temporary( overlays.dance, CONFIG.timing.danceDuration, () => { renderDanceRows(overlays.dance); overlays.dance.style.display = "flex"; playDanceTune(); }, () => { overlays.dance.style.display = "none"; stopDanceTune(); } ); }
  function handleCommandError(message, shouldBeep = true) { if (shouldBeep) playErrorBeep(); appendStyledLog(\`[err] \${message}\`, true); }
  function handleHelpCommand() { clickBlip(); appendStyledLog( "[help] commands: help, /summon, /dance, /panic, /open, /close, /nuke, clear", true ); }
  function handleSummonCommand() { if (Math.random() < CONFIG.probabilities.summonSuccess) { const art = util.pickRandom(asciiVisitors); appendStyledLog(art, true); clickBlip(); } else { handleCommandError("summoning failed: entity refused to materialise."); } }
  function handleGuardCommand(action) { if (!guardManager.element) { handleCommandError("guard not found."); return; } const isOpen = guardManager.isOpen(); const wantsOpen = action === "open"; if (isOpen === wantsOpen) { appendStyledLog(\`[info] guard already \${action}.\`, true); playErrorBeep(); return; } guardManager.toggle(); appendStyledLog(\`[ok] safety guard \${action}ed.\`, true); }
  async function handleNukeCommand() { if (guardManager.button?.disabled) { handleCommandError("/nuke blocked: safety guard is closed."); if (guardManager.element) { guardManager.element.classList.add("blink"); setTimeout( () => guardManager.element?.classList.remove("blink"), CONFIG.timing.guardBlinkDuration ); } return; } const auth = await requestNukeAuth(); if (auth === null) { appendStyledLog("[info] launch cancelled. guard closing.", true); clickBlip(); guardManager.close(); return; } if (auth !== true) { disarmNuke("wrong launch code"); return; } appendStyledLog("[ok] code accepted. proceeding to launch window.", true); triggerNuke(); }
  function handleClearCommand() { clickBlip(); output.textContent = ""; dynamicLogElements = []; sessionLineCount = 0; lineCounter = 0; nextAsciiAt = util.randBetween( CONFIG.asciiArt.minLinesAfter, CONFIG.asciiArt.maxLinesAfter ); appendStyledLog("[sys] display buffer wiped. evidence deleted.", true); }
  const commandHandlers = new Map([ ["help", handleHelpCommand], ["/help", handleHelpCommand], ["/summon", handleSummonCommand], ["/dance", doDance], ["/panic", triggerPanic], ["/open", () => handleGuardCommand("open")], ["/close", () => handleGuardCommand("close")], ["/nuke", handleNukeCommand], ["clear", handleClearCommand], ["/clear", handleClearCommand], ]);
  function runCommand(cmd) { const c = (cmd || "").trim().toLowerCase(); if (!c) return; const handler = commandHandlers.get(c); if (handler) { handler(); } else { handleCommandError(\`unknown command: \${c}\`); } }
  cmdBar?.addEventListener("click", (e) => { const btn = e.target.closest("button[data-cmd]"); if (!btn) return; const command = btn.dataset.cmd; runCommand(command); });
  cmdline?.addEventListener("keydown", (e) => { if (e.key === "Enter") { runCommand(cmdline.value); cmdline.value = ""; } });
  window.addEventListener("pointerdown", initAudioCtx, { once: true });
  window.addEventListener("keydown", initAudioCtx, { once: true });
  const guardManager = { element: document.getElementById("guard-switch"), button: document.getElementById("nuke-btn"), setState(shouldOpen) { if (!this.element || !this.button) return; const changed = this.isOpen() !== shouldOpen; if (changed) { this.element.classList.toggle("open", shouldOpen); this.element.setAttribute("aria-pressed", String(shouldOpen)); this.button.disabled = !shouldOpen; this.element.title = shouldOpen ? "Guard open — click to close" : "Guard closed — click to open"; clickBlip(); } }, toggle() { this.setState(!this.isOpen()); }, open() { this.setState(true); }, isOpen() { return this.element?.classList.contains("open") ?? false; }, close() { this.setState(false); }, };
  if (guardManager.element) { guardManager.element.addEventListener("click", () => guardManager.toggle()); guardManager.element.addEventListener("keydown", (ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); guardManager.toggle(); } }); }
});
`;

export const launchConsoleSrc = htmlContent
  .replace("REPLACE_WITH_CSS", cssContent)
  .replace("REPLACE_WITH_JS", jsContent);
