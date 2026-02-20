// ==UserScript==
// @name         TM Inject Check (x.com)
// @namespace    local.tm.check
// @version      0.0.1
// @description  Minimal injection check on x.com
// @match        https://x.com/*
// @match        https://twitter.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(() => {
  "use strict";
  window.__TM_CHECK__ = "ok";

  const show = () => {
    if (document.getElementById("tm-check-badge")) return;
    if (!document.body) return;
    const badge = document.createElement("div");
    badge.id = "tm-check-badge";
    badge.textContent = "TM CHECK OK";
    badge.style.cssText = [
      "position:fixed",
      "top:12px",
      "right:12px",
      "z-index:2147483647",
      "padding:8px 10px",
      "border-radius:8px",
      "background:#19a974",
      "color:#fff",
      "font:700 12px/1 sans-serif",
      "box-shadow:0 6px 20px rgba(0,0,0,.3)"
    ].join(";");
    document.body.appendChild(badge);
  };

  show();
  document.addEventListener("DOMContentLoaded", show, { once: true });
  window.addEventListener("load", show, { once: true });
})();
