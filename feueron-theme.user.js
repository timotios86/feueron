// ==UserScript==
// @name         FeuerON Modern Theme – FF Ashausen
// @namespace    https://github.com/timotios86/feueron
// @version      4.0.0
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

  const RED  = '#e63329';
  const FONT = "'Inter', system-ui, sans-serif";

  // Google Fonts
  const gf = document.createElement('link');
  gf.rel  = 'stylesheet';
  gf.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
  document.head.appendChild(gf);

  // CSS-Injection über style-Tag (zuverlässiger als GM_addStyle)
  const style = document.createElement('style');
  style.textContent = `
    *, *::before, *::after { box-sizing: border-box !important; }

    html, body, .wrapper {
      background: #0f1117 !important;
      color: #e4e8f0 !important;
      font-family: ${FONT} !important;
    }

    ::-webkit-scrollbar { width: 5px; height: 5px; }
    ::-webkit-scrollbar-track { background: #161b27; }
    ::-webkit-scrollbar-thumb { background: #2e3450; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: ${RED}; }

    /* ── HEADER GESAMT ── */
    .header-content {
      background: #161b27 !important;
      border-bottom: 2px solid ${RED} !important;
      box-shadow: 0 2px 20px rgba(0,0,0,0.5) !important;
      display: flex !important;
      align-items: center !important;
      padding: 0 16px !important;
      height: 52px !important;
      position: sticky !important;
      top: 0 !important;
      z-index: 9999 !important;
    }

    .header-content-left {
      display: flex !important;
      align-items: center !important;
      gap: 4px !important;
      flex: 1 !important;
    }

    /* Dräger-Logo dezenter */
    .header-content img,
    .header-content-left img,
    .header-content [class*="logo"] img {
      filter: brightness(0.85) !important;
      height: 28px !important;
      width: auto !important;
      margin-right: 12px !important;
    }

    /* ── NAVIGATION ── */
    .appmenu-main {
      background: transparent !important;
      border: none !important;
      padding: 0 !important;
      margin: 0 !important;
      display: flex !important;
      align-items: center !important;
      height: 52px !important;
    }

    ul.appmenu {
      display: flex !important;
      list-style: none !important;
      margin: 0 !important;
      padding: 0 !important;
      gap: 0 !important;
      align-items: center !important;
      height: 52px !important;
    }

    li.appmenu-item-top {
      list-style: none !important;
      margin: 0 !important;
      height: 52px !important;
      display: flex !important;
      align-items: center !important;
    }

    li.appmenu-item-top > a {
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 3px !important;
      height: 52px !important;
      padding: 4px 13px !important;
      min-width: 64px !important;
      color: #8b94b0 !important;
      text-decoration: none !important;
      font-size: 11px !important;
      font-weight: 500 !important;
      letter-spacing: .03em !important;
      border-bottom: 2px solid transparent !important;
      margin-bottom: -2px !important;
      transition: color .15s, background .15s, border-color .15s !important;
      font-family: ${FONT} !important;
      position: relative !important;
    }

    li.appmenu-item-top > a:hover {
      color: #e4e8f0 !important;
      background: #252b3d !important;
      text-decoration: none !important;
    }

    li.appmenu-item-top > a > span {
      font-size: 11px !important;
      font-weight: 500 !important;
      font-family: ${FONT} !important;
      color: inherit !important;
    }

    /* Aktiver Eintrag */
    li.appmenu-item-selected > a {
      color: ${RED} !important;
      border-bottom: 2px solid ${RED} !important;
      background: rgba(230,51,41,0.1) !important;
    }
    li.appmenu-item-selected > a > span {
      color: ${RED} !important;
    }

    /* ── ICONS via CSS ::before ── */
    li.appmenu-item-top > a::before {
      content: '' !important;
      display: block !important;
      width: 20px !important;
      height: 20px !important;
      background-size: contain !important;
      background-repeat: no-repeat !important;
      background-position: center !important;
      flex-shrink: 0 !important;
    }

    /* Übersicht */
    #topitem-profile > a::before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%238b94b0' d='M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z'/%3E%3C/svg%3E") !important;
    }
    #topitem-profile:hover > a::before,
    #topitem-profile.appmenu-item-selected > a::before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23e63329' d='M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z'/%3E%3C/svg%3E") !important;
    }

    /* Personen */
    #topitem-personalverwaltung > a::before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%238b94b0' d='M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z'/%3E%3C/svg%3E") !important;
    }
    #topitem-personalverwaltung:hover > a::before,
    #topitem-personalverwaltung.appmenu-item-selected > a::before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23e63329' d='M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z'/%3E%3C/svg%3E") !important;
    }

    /* Lehrgänge */
    #topitem-lehrgangsverwaltung > a::before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%238b94b0' d='M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z'/%3E%3C/svg%3E") !important;
    }
    #topitem-lehrgangsverwaltung:hover > a::before,
    #topitem-lehrgangsverwaltung.appmenu-item-selected > a::before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23e63329' d='M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z'/%3E%3C/svg%3E") !important;
    }

    /* Technik */
    #topitem-ws > a::before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%238b94b0' d='M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z'/%3E%3C/svg%3E") !important;
    }
    #topitem-ws:hover > a::before,
    #topitem-ws.appmenu-item-selected > a::before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23e63329' d='M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z'/%3E%3C/svg%3E") !important;
    }

    /* Berichte */
    #topitem-ea-standard-search > a::before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%238b94b0' d='M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z'/%3E%3C/svg%3E") !important;
    }
    #topitem-ea-standard-search:hover > a::before,
    #topitem-ea-standard-search.appmenu-item-selected > a::before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23e63329' d='M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z'/%3E%3C/svg%3E") !important;
    }

    /* Einstellungen */
    #topitem-settings > a::before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%238b94b0' d='M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z'/%3E%3C/svg%3E") !important;
    }
    #topitem-settings:hover > a::before,
    #topitem-settings.appmenu-item-selected > a::before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23e63329' d='M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z'/%3E%3C/svg%3E") !important;
    }

    /* ── HEADER RECHTE SEITE (User, Mail, Org-Name) ── */
    .header-content-right,
    [class*="header-content-right"] {
      display: flex !important;
      align-items: center !important;
      gap: 8px !important;
      color: #8b94b0 !important;
      font-family: ${FONT} !important;
      font-size: 13px !important;
    }

    /* Org-Name */
    [class*="organisation"], [class*="orgname"],
    .header-content .orgName, .header-content span {
      color: #8b94b0 !important;
      font-family: ${FONT} !important;
      font-size: 13px !important;
    }

    /* ── MAIN CONTENT ── */
    .main, #content, .content,
    [class*="module-content"], [class*="moduleContent"] {
      background: #0f1117 !important;
      color: #e4e8f0 !important;
      padding: 20px !important;
    }

    /* ── jqWidget TABS ── */
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
      border-color: transparent !important;
    }
    [class*="jqx-tabs-content"] {
      background: #161b27 !important;
      border-color: #2e3450 !important;
      color: #e4e8f0 !important;
    }

    /* ── jqWidget GRID ── */
    [class*="jqx-grid-cell"] {
      background: #1e2333 !important;
      color: #e4e8f0 !important;
      border-color: #2e3450 !important;
      font-family: ${FONT} !important;
    }
    [class*="jqx-grid-column-header"] {
      background: #252b3d !important;
      color: #8b94b0 !important;
      font-weight: 600 !important;
      text-transform: uppercase !important;
      font-size: 11px !important;
      letter-spacing: .05em !important;
      font-family: ${FONT} !important;
    }
    [class*="jqx-grid-cell-hover"],
    [class*="jqx-grid-cell-selected"] {
      background: rgba(230,51,41,0.15) !important;
    }

    /* ── jqWidget ALLGEMEIN ── */
    [class*="jqx-"] {
      font-family: ${FONT} !important;
      border-color: #2e3450 !important;
    }
    [class*="jqx-listitem"] {
      background: #1e2333 !important;
      color: #e4e8f0 !important;
      border-color: #2e3450 !important;
    }
    [class*="jqx-listitem"]:hover { background: #252b3d !important; }
    [class*="jqx-popup"], [class*="jqx-window"], [class*="jqx-panel"],
    [class*="jqx-widget-content"] {
      background: #1e2333 !important;
      border-color: #2e3450 !important;
      color: #e4e8f0 !important;
      box-shadow: 0 8px 32px rgba(0,0,0,0.5) !important;
    }
    [class*="jqx-button"]:not([class*="header"]):not([class*="tab"]) {
      background: ${RED} !important;
      color: #fff !important;
      border: none !important;
      border-radius: 7px !important;
      font-weight: 600 !important;
    }
    [class*="jqx-dropdownlist"],
    [class*="jqx-combobox"] {
      background: #1e2333 !important;
      border-color: #2e3450 !important;
      color: #e4e8f0 !important;
    }

    /* ── INPUTS ── */
    input:not([type="hidden"]), textarea, select {
      background: #252b3d !important;
      color: #e4e8f0 !important;
      border: 1px solid #2e3450 !important;
      border-radius: 7px !important;
      font-family: ${FONT} !important;
      padding: 6px 10px !important;
    }
    input:focus, textarea:focus {
      border-color: ${RED} !important;
      outline: none !important;
      box-shadow: 0 0 0 3px rgba(230,51,41,0.2) !important;
    }
    input::placeholder { color: #525a72 !important; }

    /* ── BUTTONS ── */
    button[type="submit"], input[type="submit"] {
      background: ${RED} !important;
      color: #fff !important;
      border: none !important;
      border-radius: 7px !important;
      font-weight: 600 !important;
      cursor: pointer !important;
      font-family: ${FONT} !important;
    }

    /* ── LINKS & TEXT ── */
    a { color: #6ea8fe !important; text-decoration: none !important; }
    a:hover { color: ${RED} !important; }
    h1, h2, h3, h4 {
      color: #e4e8f0 !important;
      font-family: ${FONT} !important;
      font-weight: 600 !important;
    }
    label {
      color: #8b94b0 !important;
      font-family: ${FONT} !important;
      font-size: 12px !important;
      font-weight: 500 !important;
    }

    /* ── TABELLEN ── */
    th {
      background: #252b3d !important;
      color: #8b94b0 !important;
      font-size: 11px !important;
      font-weight: 600 !important;
      text-transform: uppercase !important;
      letter-spacing: .05em !important;
      padding: 10px 12px !important;
      border-bottom: 1px solid #2e3450 !important;
      font-family: ${FONT} !important;
    }
    td {
      background: #1e2333 !important;
      color: #e4e8f0 !important;
      padding: 9px 12px !important;
      border-bottom: 1px solid #252b3d !important;
      font-family: ${FONT} !important;
    }
    tr:hover td { background: #252b3d !important; }

    /* ── INLINE STYLE OVERRIDES ── */
    [style*="background-color: rgb(255, 255, 255)"],
    [style*="background-color: white"],
    [style*="background: white"],
    [style*="background:#fff"],
    [style*="background: #fff"] { background-color: #1e2333 !important; }
    [style*="color: rgb(0, 0, 0)"],
    [style*="color: black"],
    [style*="color:#000"] { color: #e4e8f0 !important; }

    /* ── RESPONSIVE ── */
    @media (max-width: 900px) {
      li.appmenu-item-top > a > span { display: none !important; }
      li.appmenu-item-top > a { min-width: 44px !important; padding: 4px 8px !important; }
      .header-content { padding: 0 10px !important; }
    }
    @media (max-width: 600px) {
      li.appmenu-item-top > a { min-width: 38px !important; padding: 4px 6px !important; }
    }
  `;
  document.head.appendChild(style);

})();
