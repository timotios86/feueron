// ==UserScript==
// @name         FeuerON Modern Theme – FF Ashausen
// @namespace    https://github.com/timotios86/feueron
// @version      2.0.0
// @description  Modernes Dark-UI für feueron.de
// @author       FF Ashausen
// @match        https://feueron.de/*
// @grant        GM_addStyle
// @updateURL    https://raw.githubusercontent.com/timotios86/feueron/main/feueron-theme.user.js
// @downloadURL  https://raw.githubusercontent.com/timotios86/feueron/main/feueron-theme.user.js
// @run-at       document-end
// ==/UserScript==

(function () {
  'use strict';

  const RED = '#e63329';
  const FONT = "'Inter', system-ui, sans-serif";

  // ─── 1. Sofort: Google Fonts laden ──────────────────────────
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
  document.head.appendChild(link);

  // ─── 2. Basis-CSS injizieren ─────────────────────────────────
  GM_addStyle(`
    *, *::before, *::after { box-sizing: border-box !important; }

    html, body {
      background: #0f1117 !important;
      color: #e4e8f0 !important;
      font-family: ${FONT} !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 5px; height: 5px; }
    ::-webkit-scrollbar-track { background: #161b27; }
    ::-webkit-scrollbar-thumb { background: #2e3450; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: ${RED}; }

    /* Alle weißen Hintergründe dunkel */
    * {
      color: inherit !important;
    }

    /* jqWidget Übersteuerungen – sehr weit gefasst */
    [class*="jqx-"] {
      background-color: #1e2333 !important;
      border-color: #2e3450 !important;
      color: #e4e8f0 !important;
      font-family: ${FONT} !important;
    }
    [class*="jqx-tabs-header"] {
      background: #161b27 !important;
      border-bottom: 1px solid #2e3450 !important;
    }
    [class*="jqx-tabs-title-selected"] {
      color: ${RED} !important;
      border-bottom: 2px solid ${RED} !important;
      background: transparent !important;
    }
    [class*="jqx-tabs-title"]:not([class*="selected"]) {
      color: #8b94b0 !important;
      background: transparent !important;
      border: none !important;
    }
    [class*="jqx-tabs-content"] {
      background: #161b27 !important;
      border-color: #2e3450 !important;
      padding: 16px !important;
    }
    [class*="jqx-grid-cell"] {
      background: #1e2333 !important;
      color: #e4e8f0 !important;
      border-color: #2e3450 !important;
    }
    [class*="jqx-grid-column-header"] {
      background: #252b3d !important;
      color: #8b94b0 !important;
      font-weight: 600 !important;
      text-transform: uppercase !important;
      font-size: 11px !important;
      letter-spacing: .05em !important;
    }
    [class*="jqx-grid-cell-hover"],
    [class*="jqx-grid-cell-selected"] {
      background: rgba(230,51,41,0.15) !important;
    }
    [class*="jqx-listitem"] {
      background: #1e2333 !important;
      color: #e4e8f0 !important;
      border-color: #2e3450 !important;
    }
    [class*="jqx-listitem"]:hover {
      background: #252b3d !important;
    }
    [class*="jqx-button"]:not([class*="header"]) {
      background: ${RED} !important;
      color: #fff !important;
      border: none !important;
      border-radius: 7px !important;
      font-weight: 600 !important;
    }
    [class*="jqx-popup"],
    [class*="jqx-window"],
    [class*="jqx-panel"] {
      background: #1e2333 !important;
      border-color: #2e3450 !important;
      box-shadow: 0 8px 32px rgba(0,0,0,0.5) !important;
    }

    /* Inputs */
    input, textarea, select {
      background: #252b3d !important;
      color: #e4e8f0 !important;
      border: 1px solid #2e3450 !important;
      border-radius: 7px !important;
      font-family: ${FONT} !important;
    }
    input:focus, textarea:focus {
      border-color: ${RED} !important;
      outline: none !important;
      box-shadow: 0 0 0 3px rgba(230,51,41,0.2) !important;
    }
    input::placeholder { color: #525a72 !important; }

    /* Buttons */
    button[type="submit"], input[type="submit"] {
      background: ${RED} !important;
      color: #fff !important;
      border: none !important;
      border-radius: 7px !important;
      font-family: ${FONT} !important;
      font-weight: 600 !important;
      padding: 8px 18px !important;
      cursor: pointer !important;
    }

    /* Links */
    a { color: #6ea8fe !important; text-decoration: none !important; }
    a:hover { color: ${RED} !important; }

    /* Headings */
    h1, h2, h3, h4, h5, h6 {
      color: #e4e8f0 !important;
      font-family: ${FONT} !important;
      font-weight: 600 !important;
    }

    /* Tabellen */
    table { border-collapse: collapse !important; }
    th {
      background: #252b3d !important;
      color: #8b94b0 !important;
      font-size: 11px !important;
      font-weight: 600 !important;
      text-transform: uppercase !important;
      letter-spacing: .05em !important;
      padding: 10px 12px !important;
      border-bottom: 1px solid #2e3450 !important;
    }
    td {
      background: #1e2333 !important;
      color: #e4e8f0 !important;
      padding: 9px 12px !important;
      border-bottom: 1px solid #252b3d !important;
    }
    tr:hover td { background: #252b3d !important; }

    /* ─── NEUE NAVIGATION (wird per JS eingefügt) ─── */
    #ff-nav {
      position: sticky !important;
      top: 0 !important;
      z-index: 9999 !important;
      background: #161b27 !important;
      border-bottom: 2px solid ${RED} !important;
      box-shadow: 0 2px 20px rgba(0,0,0,0.5) !important;
      font-family: ${FONT} !important;
    }
    #ff-nav-inner {
      display: flex !important;
      align-items: center !important;
      height: 58px !important;
      padding: 0 20px !important;
      gap: 4px !important;
      max-width: 1600px !important;
      margin: 0 auto !important;
    }
    #ff-logo {
      display: flex !important;
      align-items: center !important;
      gap: 8px !important;
      font-size: 16px !important;
      font-weight: 700 !important;
      color: #e4e8f0 !important;
      margin-right: 16px !important;
      flex-shrink: 0 !important;
      text-decoration: none !important;
    }
    #ff-logo svg { flex-shrink: 0 !important; }

    #ff-nav-links {
      display: flex !important;
      list-style: none !important;
      margin: 0 !important;
      padding: 0 !important;
      gap: 0 !important;
      flex: 1 !important;
    }
    #ff-nav-links li { list-style: none !important; margin: 0 !important; }
    #ff-nav-links a {
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 3px !important;
      padding: 6px 12px !important;
      height: 58px !important;
      min-width: 70px !important;
      color: #8b94b0 !important;
      text-decoration: none !important;
      font-size: 11px !important;
      font-weight: 500 !important;
      letter-spacing: .03em !important;
      border-bottom: 2px solid transparent !important;
      margin-bottom: -2px !important;
      transition: color .15s, background .15s, border-color .15s !important;
    }
    #ff-nav-links a svg { opacity: .55; transition: opacity .15s !important; }
    #ff-nav-links a:hover {
      color: #e4e8f0 !important;
      background: #252b3d !important;
    }
    #ff-nav-links a:hover svg { opacity: 1 !important; }
    #ff-nav-links a.ff-active {
      color: ${RED} !important;
      border-bottom-color: ${RED} !important;
      background: rgba(230,51,41,0.1) !important;
    }
    #ff-nav-links a.ff-active svg { opacity: 1 !important; fill: ${RED} !important; }

    #ff-nav-right {
      display: flex !important;
      align-items: center !important;
      gap: 6px !important;
      margin-left: auto !important;
    }

    /* Mail */
    #ff-mail {
      position: relative !important;
      cursor: pointer !important;
      padding: 8px !important;
      border-radius: 8px !important;
      color: #8b94b0 !important;
      transition: background .15s, color .15s !important;
      display: flex !important;
      align-items: center !important;
    }
    #ff-mail:hover { background: #252b3d !important; color: #e4e8f0 !important; }
    #ff-mail-badge {
      position: absolute !important;
      top: 2px !important; right: 2px !important;
      background: ${RED} !important;
      color: #fff !important;
      border-radius: 50% !important;
      min-width: 16px !important; height: 16px !important;
      font-size: 10px !important; font-weight: 700 !important;
      display: none !important;
      align-items: center !important;
      justify-content: center !important;
      padding: 0 3px !important;
    }

    /* User-Button */
    #ff-user-btn {
      display: flex !important;
      align-items: center !important;
      gap: 6px !important;
      padding: 6px 12px !important;
      border-radius: 8px !important;
      border: 1px solid #2e3450 !important;
      background: transparent !important;
      color: #8b94b0 !important;
      font-size: 13px !important;
      font-weight: 500 !important;
      cursor: pointer !important;
      font-family: ${FONT} !important;
      transition: background .15s, color .15s !important;
    }
    #ff-user-btn:hover { background: #252b3d !important; color: #e4e8f0 !important; }

    #ff-user-dropdown {
      display: none !important;
      position: absolute !important;
      top: calc(100% + 8px) !important; right: 0 !important;
      background: #1e2333 !important;
      border: 1px solid #2e3450 !important;
      border-radius: 10px !important;
      box-shadow: 0 8px 32px rgba(0,0,0,0.5) !important;
      min-width: 190px !important;
      padding: 6px !important;
      z-index: 10001 !important;
    }
    #ff-user-dropdown.ff-open { display: block !important; }
    #ff-user-dropdown a {
      display: block !important;
      padding: 8px 12px !important;
      border-radius: 7px !important;
      color: #e4e8f0 !important;
      text-decoration: none !important;
      font-size: 13px !important;
      transition: background .15s !important;
    }
    #ff-user-dropdown a:hover { background: #252b3d !important; color: #e4e8f0 !important; }
    #ff-user-dropdown .ff-logout { color: ${RED} !important; }
    #ff-user-dropdown hr { border: none !important; border-top: 1px solid #2e3450 !important; margin: 4px 0 !important; }
    #ff-user-wrap { position: relative !important; }

    /* Hamburger */
    #ff-hamburger {
      display: none !important;
      flex-direction: column !important;
      gap: 4px !important;
      background: none !important;
      border: 1px solid #2e3450 !important;
      border-radius: 8px !important;
      padding: 8px !important;
      cursor: pointer !important;
      margin-left: 8px !important;
    }
    #ff-hamburger span {
      display: block !important;
      width: 20px !important; height: 2px !important;
      background: #8b94b0 !important;
      border-radius: 2px !important;
    }

    /* Mobile Drawer */
    #ff-mobile-menu {
      display: none !important;
      flex-direction: column !important;
      padding: 10px 16px 16px !important;
      background: #161b27 !important;
      border-top: 1px solid #2e3450 !important;
      gap: 3px !important;
    }
    #ff-mobile-menu.ff-open { display: flex !important; }
    #ff-mobile-menu a {
      display: flex !important;
      align-items: center !important;
      gap: 10px !important;
      padding: 10px 14px !important;
      border-radius: 8px !important;
      color: #8b94b0 !important;
      font-size: 14px !important;
      font-weight: 500 !important;
      text-decoration: none !important;
      transition: background .15s, color .15s !important;
    }
    #ff-mobile-menu a:hover,
    #ff-mobile-menu a.ff-active { background: #252b3d !important; color: #e4e8f0 !important; }
    #ff-mobile-menu a.ff-active { color: ${RED} !important; }
    #ff-mobile-menu hr { border: none !important; border-top: 1px solid #2e3450 !important; margin: 4px 0 !important; }

    /* Responsive */
    @media (max-width: 900px) {
      #ff-nav-links a span { display: none !important; }
      #ff-nav-links a { min-width: 46px !important; padding: 6px 8px !important; }
    }
    @media (max-width: 640px) {
      #ff-nav-links { display: none !important; }
      #ff-hamburger { display: flex !important; }
      #ff-user-btn span.ff-uname { display: none !important; }
    }
  `);

  // ─── 3. Navigation bauen ──────────────────────────────────────
  function buildNav() {
    // Originale Nav finden: erstes <ul> im Body
    const origNav = document.querySelector('body > ul');
    if (!origNav || document.getElementById('ff-nav')) return;

    const url = window.location.href;

    const items = [
      { label: 'Übersicht',    href: '/feueron/modul-switch.do?modul=profile',            key: 'profile',            icon: '<svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>' },
      { label: 'Personen',     href: '/feueron/modul-switch.do?modul=personalverwaltung', key: 'personalverwaltung', icon: '<svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>' },
      { label: 'Lehrgänge',    href: '/feueron/modul-switch.do?modul=lehrgangsverwaltung',key: 'lehrgangsverwaltung',icon: '<svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/></svg>' },
      { label: 'Technik',      href: '/feueron/modul-switch.do?modul=ws',                 key: 'ws',                 icon: '<svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg>' },
      { label: 'Berichte',     href: '/feueron/modul-switch.do?modul=ea-standard-search', key: 'ea-standard-search', icon: '<svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>' },
      { label: 'Einstellungen',href: '/feueron/modul-switch.do?modul=settings',           key: 'settings',           icon: '<svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>' },
    ];

    // Username aus dem Seiten-Dropdown lesen
    const switchEl = document.querySelector('.switchUser');
    const username = switchEl ? (switchEl.textContent || switchEl.value || 'Benutzer').trim().split('\n')[0].trim() : 'Benutzer';

    const navEl = document.createElement('nav');
    navEl.id = 'ff-nav';
    navEl.innerHTML = `
      <div id="ff-nav-inner">
        <a id="ff-logo" href="/feueron/modul-switch.do?modul=profile">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="${RED}">
            <path d="M12 2C8.5 2 5.5 4.5 5 8c-.3 1.8.3 3.5 1.5 4.8L12 22l5.5-9.2C18.7 11.5 19.3 9.8 19 8c-.5-3.5-3.5-6-7-6zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
          </svg>
          FeuerON
        </a>

        <ul id="ff-nav-links">
          ${items.map(item => `
            <li><a href="${item.href}" class="${url.includes(item.key) ? 'ff-active' : ''}">
              ${item.icon}
              <span>${item.label}</span>
            </a></li>
          `).join('')}
        </ul>

        <div id="ff-nav-right">
          <div id="ff-mail" title="Nachrichten">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <span id="ff-mail-badge"></span>
          </div>

          <div id="ff-user-wrap">
            <button id="ff-user-btn">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
              </svg>
              <span class="ff-uname">${username}</span>
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M7 10l5 5 5-5z"/></svg>
            </button>
            <div id="ff-user-dropdown">
              <a href="/feueron/modul-switch.do?modul=settings">⚙️ Benutzereinstellungen</a>
              <a href="https://manual.draeger-iss.de/shelves/dragerwarezms" target="_blank">📖 Hilfe</a>
              <hr>
              <a href="/feueron/login.do" class="ff-logout">⏻ Abmelden</a>
            </div>
          </div>

          <button id="ff-hamburger" aria-label="Menü öffnen">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      <div id="ff-mobile-menu">
        ${items.map(item => `
          <a href="${item.href}" class="${url.includes(item.key) ? 'ff-active' : ''}">
            ${item.icon} <span>${item.label}</span>
          </a>
        `).join('')}
        <hr>
        <a href="/feueron/login.do" class="ff-logout" style="color:${RED}">⏻ Abmelden</a>
      </div>
    `;

    // Originale Nav ersetzen
    origNav.replaceWith(navEl);

    // Events
    document.getElementById('ff-mail').addEventListener('click', () => {
      window.location = '/feueron/modul-switch.do?modul=nachrichten';
    });
    document.getElementById('ff-user-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      document.getElementById('ff-user-dropdown').classList.toggle('ff-open');
    });
    document.addEventListener('click', () => {
      document.getElementById('ff-user-dropdown')?.classList.remove('ff-open');
    });
    document.getElementById('ff-hamburger').addEventListener('click', () => {
      document.getElementById('ff-mobile-menu').classList.toggle('ff-open');
    });

    // Mail-Badge befüllen
    fetch('/feueron/rest/1.0/user/nachrichten/_getUnreadNachrichtenCount')
      .then(r => r.json())
      .then(count => {
        if (count > 0) {
          const badge = document.getElementById('ff-mail-badge');
          badge.textContent = count;
          badge.style.display = 'flex';
        }
      }).catch(() => {});

    // Original-Elemente verstecken (alter Header-Bereich)
    document.querySelectorAll('body > div').forEach(div => {
      const text = div.textContent || '';
      if (text.includes('Ashausen') || text.includes('2026.5')) {
        div.style.cssText = 'background:#161b27!important;color:#8b94b0!important;font-family:Inter,sans-serif!important;font-size:12px!important;padding:4px 20px!important;border-bottom:1px solid #2e3450!important;';
      }
    });
  }

  // ─── 4. Warten bis DOM fertig ist ────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildNav);
  } else {
    buildNav();
  }

  // ─── 5. SPA-Navigation mitbekommen (Hash-Änderungen) ─────────
  window.addEventListener('hashchange', () => {
    setTimeout(() => {
      // Aktiven Nav-Link aktualisieren
      const url = window.location.href;
      document.querySelectorAll('#ff-nav-links a, #ff-mobile-menu a').forEach(a => {
        const key = a.href.split('modul=')[1];
        if (key && url.includes(key)) {
          a.classList.add('ff-active');
        } else {
          a.classList.remove('ff-active');
        }
      });
    }, 100);
  });

})();
