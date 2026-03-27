// ==UserScript==
// @name         FeuerON Modern Theme – FF Ashausen
// @namespace    https://github.com/timotios86/feueron
// @version      3.0.0
// @description  Modernes Dark-UI für feueron.de
// @author       FF Ashausen
// @match        https://feueron.de/*
// @grant        GM_addStyle
// @updateURL    https://raw.githubusercontent.com/timotios86/feueron/main/feueron-theme.user.js
// @downloadURL  https://raw.githubusercontent.com/timotios86/feueron/main/feueron-theme.user.js
// @run-at       document-start
// ==/UserScript==

(function () {
  'use strict';

  const RED   = '#e63329';
  const FONT  = "'Inter', system-ui, sans-serif";

  // ── Google Fonts sofort laden ──────────────────────────────────
  const gf = document.createElement('link');
  gf.rel  = 'stylesheet';
  gf.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
  document.head.appendChild(gf);

  // ── Basis-CSS (greift auf echte Klassen) ──────────────────────
  GM_addStyle(`
    *, *::before, *::after { box-sizing: border-box !important; }

    html, body {
      background: #0f1117 !important;
      color: #e4e8f0 !important;
      font-family: ${FONT} !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    ::-webkit-scrollbar { width: 5px; height: 5px; }
    ::-webkit-scrollbar-track { background: #161b27; }
    ::-webkit-scrollbar-thumb { background: #2e3450; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: ${RED}; }

    /* ── WRAPPER & MAIN ── */
    .wrapper {
      background: #0f1117 !important;
      min-height: 100vh !important;
    }
    .main {
      background: #0f1117 !important;
      padding: 20px !important;
    }

    /* ── NAVIGATION: appmenu-main ── */
    .appmenu-main {
      background: #161b27 !important;
      border-bottom: 2px solid ${RED} !important;
      box-shadow: 0 2px 20px rgba(0,0,0,0.5) !important;
      position: sticky !important;
      top: 0 !important;
      z-index: 9999 !important;
      padding: 0 16px !important;
    }

    ul.appmenu {
      display: flex !important;
      list-style: none !important;
      margin: 0 !important;
      padding: 0 !important;
      gap: 2px !important;
      align-items: center !important;
      height: 58px !important;
    }

    /* Feuerwehr-Logo vor der Nav */
    ul.appmenu::before {
      content: '' !important;
      display: inline-flex !important;
      width: 28px !important;
      height: 28px !important;
      margin-right: 12px !important;
      flex-shrink: 0 !important;
      background: ${RED} !important;
      border-radius: 6px !important;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 2C8.5 2 5.5 4.5 5 8c-.3 1.8.3 3.5 1.5 4.8L12 22l5.5-9.2C18.7 11.5 19.3 9.8 19 8c-.5-3.5-3.5-6-7-6zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4z'/%3E%3C/svg%3E") !important;
      background-size: 18px !important;
      background-repeat: no-repeat !important;
      background-position: center !important;
    }

    /* Nav-Items */
    li.appmenu-item-top {
      list-style: none !important;
      margin: 0 !important;
    }

    li.appmenu-item-top > a {
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 4px !important;
      height: 58px !important;
      padding: 6px 14px !important;
      min-width: 72px !important;
      color: #8b94b0 !important;
      text-decoration: none !important;
      font-size: 11px !important;
      font-weight: 500 !important;
      letter-spacing: .03em !important;
      border-bottom: 2px solid transparent !important;
      margin-bottom: -2px !important;
      transition: color .15s, background .15s, border-color .15s !important;
      font-family: ${FONT} !important;
    }

    li.appmenu-item-top > a:hover {
      color: #e4e8f0 !important;
      background: #252b3d !important;
      text-decoration: none !important;
    }

    li.appmenu-item-top > a span {
      font-size: 11px !important;
      font-weight: 500 !important;
      font-family: ${FONT} !important;
    }

    /* Aktiver Nav-Eintrag */
    li.appmenu-item-selected > a,
    li.appmenu-item-top.appmenu-item-selected > a {
      color: ${RED} !important;
      border-bottom: 2px solid ${RED} !important;
      background: rgba(230,51,41,0.1) !important;
    }

    /* Icons vor den Nav-Links (via ::before auf dem <a>) */
    li.appmenu-item-top > a::before {
      content: '' !important;
      display: block !important;
      width: 20px !important;
      height: 20px !important;
      background-size: contain !important;
      background-repeat: no-repeat !important;
      background-position: center !important;
      opacity: 0.6 !important;
      transition: opacity .15s !important;
    }
    li.appmenu-item-top > a:hover::before,
    li.appmenu-item-selected > a::before {
      opacity: 1 !important;
    }

    /* Icon: Übersicht / profile */
    #topitem-profile > a::before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%238b94b0'%3E%3Cpath d='M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z'/%3E%3C/svg%3E") !important;
    }
    #topitem-profile.appmenu-item-selected > a::before,
    #topitem-profile > a:hover::before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23e63329'%3E%3Cpath d='M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z'/%3E%3C/svg%3E") !important;
    }

    /* Icon: Personen */
    #topitem-personalverwaltung > a::before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%238b94b0'%3E%3Cpath d='M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z'/%3E%3C/svg%3E") !important;
    }
    #topitem-personalverwaltung.appmenu-item-selected > a::before,
    #topitem-personalverwaltung > a:hover::before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23e63329'%3E%3Cpath d='M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z'/%3E%3C/svg%3E") !important;
    }

    /* Icon: Lehrgänge */
    #topitem-lehrgangsverwaltung > a::before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%238b94b0'%3E%3Cpath d='M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z'/%3E%3C/svg%3E") !important;
    }
    #topitem-lehrgangsverwaltung.appmenu-item-selected > a::before,
    #topitem-lehrgangsverwaltung > a:hover::before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23e63329'%3E%3Cpath d='M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z'/%3E%3C/svg%3E") !important;
    }

    /* Icon: Technik */
    #topitem-ws > a::before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%238b94b0'%3E%3Cpath d='M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z'/%3E%3C/svg%3E") !important;
    }
    #topitem-ws.appmenu-item-selected > a::before,
    #topitem-ws > a:hover::before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23e63329'%3E%3Cpath d='M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z'/%3E%3C/svg%3E") !important;
    }

    /* Icon: Berichte */
    #topitem-ea-standard-search > a::before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%238b94b0'%3E%3Cpath d='M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z'/%3E%3C/svg%3E") !important;
    }
    #topitem-ea-standard-search.appmenu-item-selected > a::before,
    #topitem-ea-standard-search > a:hover::before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23e63329'%3E%3Cpath d='M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z'/%3E%3C/svg%3E") !important;
    }

    /* Icon: Einstellungen */
    #topitem-settings > a::before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%238b94b0'%3E%3Cpath d='M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z'/%3E%3C/svg%3E") !important;
    }
    #topitem-settings.appmenu-item-selected > a::before,
    #topitem-settings > a:hover::before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23e63329'%3E%3Cpath d='M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z'/%3E%3C/svg%3E") !important;
    }

    /* Responsive: ab 900px nur Icons */
    @media (max-width: 900px) {
      li.appmenu-item-top > a span { display: none !important; }
      li.appmenu-item-top > a { min-width: 46px !important; padding: 6px 8px !important; }
    }

    /* ── jqWidget Overrides ── */
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
    [class*="jqx-listitem"]:hover { background: #252b3d !important; }
    [class*="jqx-button"]:not([class*="header"]) {
      background: ${RED} !important;
      color: #fff !important;
      border: none !important;
      border-radius: 7px !important;
      font-weight: 600 !important;
    }
    [class*="jqx-popup"], [class*="jqx-window"], [class*="jqx-panel"] {
      background: #1e2333 !important;
      border-color: #2e3450 !important;
      box-shadow: 0 8px 32px rgba(0,0,0,0.5) !important;
    }

    /* ── Inputs & Buttons ── */
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
    button[type="submit"], input[type="submit"] {
      background: ${RED} !important;
      color: #fff !important;
      border: none !important;
      border-radius: 7px !important;
      font-weight: 600 !important;
      cursor: pointer !important;
    }

    /* ── Links & Text ── */
    a { color: #6ea8fe !important; text-decoration: none !important; }
    a:hover { color: ${RED} !important; }
    h1, h2, h3, h4, h5, h6 {
      color: #e4e8f0 !important;
      font-family: ${FONT} !important;
      font-weight: 600 !important;
    }

    /* ── Tabellen ── */
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

    /* ── White/black Style-Overrides ── */
    [style*="background-color: rgb(255, 255, 255)"],
    [style*="background-color: white"],
    [style*="background: white"],
    [style*="background:#fff"],
    [style*="background: #fff"] {
      background-color: #1e2333 !important;
    }
    [style*="color: rgb(0, 0, 0)"],
    [style*="color: black"],
    [style*="color:#000"],
    [style*="color: #000"] {
      color: #e4e8f0 !important;
    }
  `);

})();
