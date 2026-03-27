// ==UserScript==
// @name         FeuerON Modern Theme – FF Ashausen
// @namespace    https://github.com/ff-ashausen/feueron-theme
// @version      1.0.0
// @description  Modernes UI für feueron.de
// @author       FF Ashausen
// @match        https://feueron.de/*
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @updateURL    https://raw.githubusercontent.com/ff-ashausen/feueron-theme/main/feueron-theme.user.js
// @downloadURL  https://raw.githubusercontent.com/ff-ashausen/feueron-theme/main/feueron-theme.user.js
// @run-at       document-start
// ==/UserScript==

(function () {
  'use strict';

  // ─── Konfiguration ───────────────────────────────────────────
  const CONFIG = {
    primaryColor: '#e63329',   // Feuerwehr-Rot
    darkBg: '#0f1117',
    font: 'Inter, system-ui, sans-serif',
    tailwindCDN: 'https://cdn.tailwindcss.com',
  };

  // ─── Tailwind laden (document-start = so früh wie möglich) ───
  const tailwindScript = document.createElement('script');
  tailwindScript.src = CONFIG.tailwindCDN;
  document.head.appendChild(tailwindScript);

  // ─── Google Fonts ────────────────────────────────────────────
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
  document.head.appendChild(fontLink);

  // ─── Warten bis DOM bereit ist ───────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    rewriteNavigation();
    applyBaseStyles();
    observePageChanges(); // SPA-Navigation mitbekommen
  });

  // ─── Navigation komplett neu schreiben ───────────────────────
  function rewriteNavigation() {
    const originalNav = document.querySelector('body > ul:first-child');
    if (!originalNav) return;

    const navItems = [
      { label: 'Übersicht',   href: '/feueron/modul-switch.do?modul=profile',             icon: navIcons.dashboard },
      { label: 'Personen',    href: '/feueron/modul-switch.do?modul=personalverwaltung',   icon: navIcons.people },
      { label: 'Lehrgänge',   href: '/feueron/modul-switch.do?modul=lehrgangsverwaltung',  icon: navIcons.school },
      { label: 'Technik',     href: '/feueron/modul-switch.do?modul=ws',                   icon: navIcons.tools },
      { label: 'Berichte',    href: '/feueron/modul-switch.do?modul=ea-standard-search',   icon: navIcons.reports },
      { label: 'Einstellungen', href: '/feueron/modul-switch.do?modul=settings',           icon: navIcons.settings },
    ];

    const currentUrl = window.location.href;

    // Neues Nav-HTML bauen
    const nav = document.createElement('nav');
    nav.id = 'ff-nav';
    nav.innerHTML = `
      <div class="ff-nav-inner">
        <!-- Logo -->
        <div class="ff-logo">
          <svg viewBox="0 0 24 24" fill="${CONFIG.primaryColor}" width="28" height="28">
            <path d="M12 2C8.5 2 5.5 4.5 5 8c-.3 1.8.3 3.5 1.5 4.8L12 22l5.5-9.2C18.7 11.5 19.3 9.8 19 8c-.5-3.5-3.5-6-7-6zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
          </svg>
          <span>FeuerON</span>
        </div>

        <!-- Desktop Nav Links -->
        <ul class="ff-nav-links">
          ${navItems.map(item => `
            <li>
              <a href="${item.href}" class="${currentUrl.includes(item.href.split('modul=')[1]) ? 'active' : ''}">
                ${item.icon}
                <span>${item.label}</span>
              </a>
            </li>
          `).join('')}
        </ul>

        <!-- Rechte Seite: User + Nachrichten -->
        <div class="ff-nav-right">
          <div class="ff-mail" id="ff-mailBtn" onclick="window.location='/feueron/modul-switch.do?modul=nachrichten'">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <span class="ff-badge" id="ff-mailCount"></span>
          </div>
          <div class="ff-user" id="ff-userMenu">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
            </svg>
            <span class="ff-username">${getUserName()}</span>
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M7 10l5 5 5-5z"/></svg>
            <!-- Dropdown -->
            <div class="ff-user-dropdown" id="ff-userDropdown">
              <a href="/feueron/modul-switch.do?modul=settings">⚙ Benutzereinstellungen</a>
              <a href="https://manual.draeger-iss.de/shelves/dragerwarezms" target="_blank">📖 Hilfe</a>
              <hr>
              <a href="/feueron/login.do" class="logout">⏻ Abmelden</a>
            </div>
          </div>
        </div>

        <!-- Hamburger (Mobile) -->
        <button class="ff-hamburger" id="ff-hamburger" aria-label="Menü">
          <span></span><span></span><span></span>
        </button>
      </div>

      <!-- Mobile Drawer -->
      <div class="ff-mobile-menu" id="ff-mobileMenu">
        ${navItems.map(item => `
          <a href="${item.href}" class="${currentUrl.includes(item.href.split('modul=')[1]) ? 'active' : ''}">
            ${item.icon}
            <span>${item.label}</span>
          </a>
        `).join('')}
        <hr>
        <a href="/feueron/login.do" class="logout">⏻ Abmelden</a>
      </div>
    `;

    // Original-Nav ersetzen
    originalNav.replaceWith(nav);

    // Hamburger Toggle
    document.getElementById('ff-hamburger').addEventListener('click', () => {
      document.getElementById('ff-mobileMenu').classList.toggle('open');
    });

    // User-Dropdown Toggle
    document.getElementById('ff-userMenu').addEventListener('click', (e) => {
      e.stopPropagation();
      document.getElementById('ff-userDropdown').classList.toggle('open');
    });
    document.addEventListener('click', () => {
      document.getElementById('ff-userDropdown')?.classList.remove('open');
    });

    // Mail-Badge befüllen (originale API weiter nutzen)
    fetch('/feueron/rest/1.0/user/nachrichten/_getUnreadNachrichtenCount')
      .then(r => r.json())
      .then(count => {
        const badge = document.getElementById('ff-mailCount');
        if (badge && count > 0) {
          badge.textContent = count;
          badge.style.display = 'flex';
        }
      }).catch(() => {});
  }

  // ─── Username aus original DOM lesen ─────────────────────────
  function getUserName() {
    const el = document.querySelector('.switchUser') || document.querySelector('[class*="switchUser"]');
    return el?.value || el?.textContent?.trim().split('\n')[0] || 'Benutzer';
  }

  // ─── SPA-Seitenwechsel beobachten ────────────────────────────
  function observePageChanges() {
    let lastUrl = location.href;
    new MutationObserver(() => {
      if (location.href !== lastUrl) {
        lastUrl = location.href;
        setTimeout(() => {
          rewriteNavigation();
          styleSubNav();
        }, 300);
      }
    }).observe(document.body, { childList: true, subtree: true });
  }

  // ─── Unterseiten-Navigation stylen ───────────────────────────
  function styleSubNav() {
    // Seitentitel hochziehen
    const heading = document.querySelector('h1, h2, [class*="heading"]');
    if (heading) {
      heading.style.cssText = `
        font-family: ${CONFIG.font};
        font-size: 22px;
        font-weight: 700;
        color: #e4e8f0;
        margin: 20px 0 16px 0;
        padding: 0;
      `;
    }
  }

  // ─── Basis-Styles (CSS wird einmal injiziert) ────────────────
  function applyBaseStyles() {
    GM_addStyle(`
      /* Basis */
      *, *::before, *::after { box-sizing: border-box !important; }
      html, body {
        background: #0f1117 !important;
        color: #e4e8f0 !important;
        font-family: Inter, system-ui, sans-serif !important;
        margin: 0 !important; padding: 0 !important;
      }

      /* ─── Neue Navigation ─── */
      #ff-nav {
        position: sticky; top: 0; z-index: 9999;
        background: #161b27;
        border-bottom: 2px solid ${CONFIG.primaryColor};
        box-shadow: 0 2px 20px rgba(0,0,0,0.5);
        font-family: Inter, system-ui, sans-serif;
      }
      .ff-nav-inner {
        display: flex; align-items: center; gap: 8px;
        padding: 0 20px; height: 60px; max-width: 1400px; margin: 0 auto;
      }
      .ff-logo {
        display: flex; align-items: center; gap: 10px;
        font-weight: 700; font-size: 18px; color: #e4e8f0;
        margin-right: 12px; flex-shrink: 0; text-decoration: none;
      }
      .ff-logo svg { flex-shrink: 0; }

      .ff-nav-links {
        display: flex; list-style: none; margin: 0; padding: 0;
        gap: 2px; flex: 1; align-items: center;
      }
      .ff-nav-links li { list-style: none; }
      .ff-nav-links a {
        display: flex; flex-direction: column; align-items: center;
        gap: 3px; padding: 6px 12px; min-width: 68px; height: 60px;
        justify-content: center;
        color: #8b94b0; text-decoration: none;
        font-size: 11px; font-weight: 500; letter-spacing: 0.03em;
        border-bottom: 2px solid transparent; margin-bottom: -2px;
        transition: color .15s, background .15s, border-color .15s;
        border-radius: 0;
      }
      .ff-nav-links a svg { opacity: 0.6; transition: opacity .15s; }
      .ff-nav-links a:hover {
        color: #e4e8f0; background: #252b3d;
      }
      .ff-nav-links a:hover svg { opacity: 1; }
      .ff-nav-links a.active {
        color: ${CONFIG.primaryColor};
        border-bottom-color: ${CONFIG.primaryColor};
        background: rgba(230,51,41,0.1);
      }
      .ff-nav-links a.active svg { opacity: 1; fill: ${CONFIG.primaryColor}; }

      .ff-nav-right {
        display: flex; align-items: center; gap: 8px; margin-left: auto;
      }

      /* Mail-Icon */
      .ff-mail {
        position: relative; cursor: pointer; padding: 8px;
        border-radius: 8px; color: #8b94b0;
        transition: background .15s, color .15s;
      }
      .ff-mail:hover { background: #252b3d; color: #e4e8f0; }
      .ff-badge {
        position: absolute; top: 2px; right: 2px;
        background: ${CONFIG.primaryColor}; color: #fff;
        border-radius: 50%; min-width: 16px; height: 16px;
        font-size: 10px; font-weight: 700;
        display: none; align-items: center; justify-content: center;
        padding: 0 3px;
      }

      /* User-Menü */
      .ff-user {
        position: relative; display: flex; align-items: center; gap: 6px;
        padding: 6px 12px; border-radius: 8px; cursor: pointer;
        color: #8b94b0; font-size: 13px; font-weight: 500;
        border: 1px solid #2e3450;
        transition: background .15s, color .15s;
      }
      .ff-user:hover { background: #252b3d; color: #e4e8f0; }
      .ff-username { max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

      .ff-user-dropdown {
        display: none; position: absolute; top: calc(100% + 8px); right: 0;
        background: #1e2333; border: 1px solid #2e3450;
        border-radius: 10px; box-shadow: 0 8px 32px rgba(0,0,0,0.5);
        min-width: 200px; padding: 6px; z-index: 10000;
        font-size: 13px;
      }
      .ff-user-dropdown.open { display: block; }
      .ff-user-dropdown a {
        display: block; padding: 8px 12px; border-radius: 7px;
        color: #e4e8f0; text-decoration: none;
        transition: background .15s;
      }
      .ff-user-dropdown a:hover { background: #252b3d; }
      .ff-user-dropdown a.logout { color: ${CONFIG.primaryColor}; }
      .ff-user-dropdown hr {
        border: none; border-top: 1px solid #2e3450; margin: 4px 0;
      }

      /* Hamburger */
      .ff-hamburger {
        display: none; flex-direction: column; gap: 4px;
        background: none; border: 1px solid #2e3450; border-radius: 8px;
        padding: 8px; cursor: pointer; margin-left: 8px;
      }
      .ff-hamburger span {
        display: block; width: 20px; height: 2px;
        background: #8b94b0; border-radius: 2px; transition: .2s;
      }

      /* Mobile Drawer */
      .ff-mobile-menu {
        display: none; flex-direction: column; gap: 4px;
        padding: 12px 16px; background: #161b27;
        border-top: 1px solid #2e3450;
      }
      .ff-mobile-menu.open { display: flex !important; }
      .ff-mobile-menu a {
        display: flex; align-items: center; gap: 10px;
        padding: 10px 14px; border-radius: 8px;
        color: #8b94b0; text-decoration: none;
        font-size: 14px; font-weight: 500;
        transition: background .15s, color .15s;
      }
      .ff-mobile-menu a:hover, .ff-mobile-menu a.active {
        background: #252b3d; color: #e4e8f0;
      }
      .ff-mobile-menu a.active { color: ${CONFIG.primaryColor}; }
      .ff-mobile-menu hr { border: none; border-top: 1px solid #2e3450; margin: 4px 0; }
      .ff-mobile-menu a.logout { color: ${CONFIG.primaryColor}; }

      /* ─── Responsive Breakpoints ─── */
      @media (max-width: 900px) {
        .ff-nav-links a span { display: none; }
        .ff-nav-links a { min-width: 44px; padding: 6px 8px; }
      }
      @media (max-width: 680px) {
        .ff-nav-links { display: none; }
        .ff-hamburger { display: flex; }
        .ff-username { display: none; }
      }

      /* ─── Rest der Seite ─── */
      a { color: #6ea8fe; text-decoration: none; }
      a:hover { color: ${CONFIG.primaryColor}; }
      hr { border: none; border-top: 1px solid #2e3450; margin: 12px 0; }

      /* jqWidget Tabs */
      div[class*="jqx-tabs-header"] {
        background: #161b27 !important; border-color: #2e3450 !important;
      }
      div[class*="jqx-tabs-title"] {
        color: #8b94b0 !important; background: transparent !important;
        font-family: Inter, sans-serif !important; font-size: 13px !important;
        border-color: transparent !important;
      }
      div[class*="jqx-tabs-title-selected"] {
        color: ${CONFIG.primaryColor} !important;
        border-bottom: 2px solid ${CONFIG.primaryColor} !important;
      }
      div[class*="jqx-tabs-content"] {
        background: #161b27 !important; border-color: #2e3450 !important;
        color: #e4e8f0 !important;
      }
      div[class*="jqx-panel"],
      div[class*="jqx-widget-content"] {
        background: #1e2333 !important; border-color: #2e3450 !important;
        color: #e4e8f0 !important;
      }
      div[class*="jqx-grid-cell"] {
        background: #1e2333 !important; color: #e4e8f0 !important;
        border-color: #2e3450 !important; font-family: Inter, sans-serif !important;
      }
      div[class*="jqx-grid-column-header"] {
        background: #252b3d !important; color: #8b94b0 !important;
        font-weight: 600 !important; letter-spacing: .05em !important;
        text-transform: uppercase !important; font-size: 11px !important;
      }
      div[class*="jqx-grid-cell-selected"],
      div[class*="jqx-grid-cell-hover"] {
        background: rgba(230,51,41,0.12) !important;
      }
      div[class*="jqx-listitem"] {
        background: #1e2333 !important; color: #e4e8f0 !important;
        border-color: #2e3450 !important;
      }
      div[class*="jqx-listitem"]:hover {
        background: #252b3d !important; color: ${CONFIG.primaryColor} !important;
      }
      input[type="text"], input[type="search"], textarea, select {
        background: #252b3d !important; color: #e4e8f0 !important;
        border: 1px solid #2e3450 !important; border-radius: 7px !important;
        font-family: Inter, sans-serif !important;
      }
      button[type="submit"], .jqx-button, div[class*="jqx-button"] {
        background: ${CONFIG.primaryColor} !important; color: #fff !important;
        border: none !important; border-radius: 7px !important;
        font-family: Inter, sans-serif !important; font-weight: 600 !important;
      }
      [style*="background-color: rgb(255, 255, 255)"],
      [style*="background: white"], [style*="background:#fff"],
      [style*="background-color: white"] {
        background-color: #1e2333 !important;
      }
      [style*="color: black"], [style*="color:#000"],
      [style*="color: rgb(0, 0, 0)"] { color: #e4e8f0 !important; }
    `);
  }

  // ─── SVG Icons ────────────────────────────────────────────────
  const navIcons = {
    dashboard: `<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>`,
    people:    `<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>`,
    school:    `<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/></svg>`,
    tools:     `<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg>`,
    reports:   `<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>`,
    settings:  `<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>`,
  };

})();
