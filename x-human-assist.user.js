// ==UserScript==
// @name         X Human-Loop Reply Assistant
// @namespace    local.x.human.loop
// @version      0.3.2
// @description  Open next post, analyze text/images, fill reply draft (manual send only)
// @match        https://x.com/*
// @match        https://twitter.com/*
// @run-at       document-start
// @inject-into  content
// @grant        GM_xmlhttpRequest
// @connect      localhost
// @connect      127.0.0.1
// ==/UserScript==

(() => {
  "use strict";

  const PANEL_ID = "xha-panel";
  const STYLE_ID = "xha-style";
  const STORAGE_KEY = "xha_state_v1";
  const AUTO_ANALYZE_KEY = "xha_auto_analyze_once";
  const HOME_TOP_FALLBACK_KEY = "xha_home_top_fallback_once";
  const MAX_REVIEWED_IDS = 5000;
  const MAX_RECENT_REPLIES = 180;
  const SCRIPT_VERSION = "0.3.2";
  const DRAFT_API_URL = "http://localhost:3000/api/xha/draft";
  const RULE_FALLBACK_ENABLED = false;
  const RESERVED_HANDLES = new Set([
    "home", "explore", "notifications", "messages", "search", "settings",
    "compose", "i", "intent", "login", "logout", "signup", "tos", "privacy",
    "help", "about", "jobs", "ads", "download", "hashtag"
  ]);

  const defaultState = {
    cooldownSeconds: 60,
    lastAutoPreparedAt: null,
    mode: "warm",
    reviewedIds: [],
    recentReplies: []
  };

  let state = loadState();
  let logEl = null;
  let mounted = false;
  let cooldownTimer = null;
  let cachedMyHandle = "";

  init();

  function init() {
    window.__XHA_RUNNING__ = true;

    const start = () => {
      if (mounted) return;
      if (!document.body || !document.documentElement) return;

      try {
        bootstrap();
        mounted = true;
      } catch (error) {
        console.error("[XHA] bootstrap failed", error);
      }
    };

    start();
    document.addEventListener("DOMContentLoaded", start, { once: true });
    window.addEventListener("load", start, { once: true });

    // X is SPA; route updates can drop out-of-tree nodes, so keep panel alive.
    setInterval(() => {
      if (!document.getElementById(PANEL_ID) && document.body) {
        mounted = false;
        start();
      }
    }, 1200);
  }

  function bootstrap() {
    injectStyle();
    mountPanel();
    bindShortcuts();
    updateCooldownChip();
    if (!cooldownTimer) {
      cooldownTimer = setInterval(updateCooldownChip, 1000);
    }

    if (sessionStorage.getItem(AUTO_ANALYZE_KEY) === "1" && isStatusPage()) {
      sessionStorage.removeItem(AUTO_ANALYZE_KEY);
      setTimeout(() => {
        prepareReplyForCurrent({ source: "auto" }).catch((error) => writeLog(`오류: ${error.message}`));
      }, 1400);
    }

    if (sessionStorage.getItem(HOME_TOP_FALLBACK_KEY) === "1" && isHomePage()) {
      sessionStorage.removeItem(HOME_TOP_FALLBACK_KEY);
      setTimeout(() => {
        openHomeTopPostAndPrepare();
      }, 900);
    }

    writeLog(`준비 완료(v${SCRIPT_VERSION}). Alt+N: 다음 글, Alt+R: 분석+입력(수동, 쿨다운 없음)`);
  }

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      #${PANEL_ID} {
        position: fixed;
        right: 14px;
        bottom: 14px;
        z-index: 2147483646;
        width: 320px;
        border: 1px solid #3a3f4f;
        border-radius: 14px;
        background: linear-gradient(180deg, #0f1320, #121826);
        color: #e8efff;
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35);
        font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
      }

      #${PANEL_ID} * {
        box-sizing: border-box;
      }

      #${PANEL_ID} .xha-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 12px;
        border-bottom: 1px solid #2b3347;
      }

      #${PANEL_ID} .xha-title {
        margin: 0;
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.03em;
      }

      #${PANEL_ID} .xha-title-row {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      #${PANEL_ID} .xha-version {
        font-size: 10px;
        border: 1px solid #2f3548;
        border-radius: 999px;
        padding: 2px 6px;
        color: #b7c4e6;
        background: #111a2d;
      }

      #${PANEL_ID} .xha-chip {
        font-size: 11px;
        border: 1px solid #385680;
        border-radius: 999px;
        padding: 3px 8px;
        background: #15253f;
        color: #a9c7ff;
      }

      #${PANEL_ID} .xha-body {
        padding: 10px;
        display: grid;
        gap: 8px;
      }

      #${PANEL_ID} .xha-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 6px;
      }

      #${PANEL_ID} button,
      #${PANEL_ID} input,
      #${PANEL_ID} select {
        border-radius: 9px;
        border: 1px solid #3a4258;
        font: inherit;
      }

      #${PANEL_ID} button {
        padding: 8px 9px;
        font-size: 12px;
        font-weight: 600;
        background: #192235;
        color: #ecf2ff;
        cursor: pointer;
      }

      #${PANEL_ID} button:hover {
        background: #22304b;
      }

      #${PANEL_ID} button.xha-primary {
        border-color: #2d7adf;
        background: #2158a1;
      }

      #${PANEL_ID} button.xha-primary:hover {
        background: #2a69bc;
      }

      #${PANEL_ID} .xha-input-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
      }

      #${PANEL_ID} label {
        display: grid;
        gap: 4px;
        font-size: 11px;
        color: #b5c0d9;
      }

      #${PANEL_ID} input,
      #${PANEL_ID} select {
        padding: 6px 8px;
        background: #0f1627;
        color: #e8efff;
      }

      #${PANEL_ID} .xha-log {
        margin: 0;
        padding: 8px;
        min-height: 84px;
        max-height: 130px;
        overflow: auto;
        border: 1px solid #2f3549;
        border-radius: 8px;
        background: #0a0f1b;
        color: #dbe5ff;
        font: 11px/1.4 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        white-space: pre-wrap;
      }

      #${PANEL_ID} .xha-note {
        margin: 0;
        font-size: 11px;
        color: #9fb0d3;
      }

      .xha-send-pulse {
        animation: xhaPulse 1s ease-in-out 2;
      }

      @keyframes xhaPulse {
        0% { box-shadow: 0 0 0 0 rgba(65, 147, 255, 0.1); }
        50% { box-shadow: 0 0 0 6px rgba(65, 147, 255, 0.55); }
        100% { box-shadow: 0 0 0 0 rgba(65, 147, 255, 0.1); }
      }
    `;

    document.documentElement.append(style);
  }

  function mountPanel() {
    if (document.getElementById(PANEL_ID)) return;

    const panel = document.createElement("aside");
    panel.id = PANEL_ID;
    panel.innerHTML = `
      <div class="xha-head">
        <div class="xha-title-row">
          <h2 class="xha-title">X 수동 보조</h2>
          <span class="xha-version">v${SCRIPT_VERSION}</span>
        </div>
        <span class="xha-chip" id="xhaCooldownChip">AUTO cooldown -</span>
      </div>
      <div class="xha-body">
        <div class="xha-row">
          <button id="xhaNextBtn" type="button">다음 글 열기</button>
          <button id="xhaAnalyzeBtn" class="xha-primary" type="button">현재 글 분석+입력</button>
        </div>
        <div class="xha-row">
          <button id="xhaNextAnalyzeBtn" type="button">다음+자동분석</button>
          <button id="xhaForgetBtn" type="button">기록 초기화</button>
        </div>
        <div class="xha-input-row">
          <label>
            자동 쿨다운(초)
            <input id="xhaCooldownInput" type="number" min="0" step="1" />
          </label>
          <label>
            댓글 톤
            <select id="xhaToneSelect">
              <option value="warm">따뜻한 공감</option>
              <option value="cheer">축하/응원</option>
              <option value="calm">차분한 반응</option>
            </select>
          </label>
        </div>
        <p class="xha-note">전송 버튼은 직접 눌러야 합니다. (자동 전송 안 함)</p>
        <pre id="xhaLog" class="xha-log">로딩...</pre>
      </div>
    `;

    document.body.append(panel);

    const cooldownInput = panel.querySelector("#xhaCooldownInput");
    const toneSelect = panel.querySelector("#xhaToneSelect");
    logEl = panel.querySelector("#xhaLog");

    cooldownInput.value = String(state.cooldownSeconds);
    toneSelect.value = state.mode;

    panel.querySelector("#xhaNextBtn").addEventListener("click", () => {
      openNextTimelinePost();
    });

    panel.querySelector("#xhaAnalyzeBtn").addEventListener("click", () => {
      prepareReplyForCurrent({ source: "manual" }).catch((error) => writeLog(`오류: ${error.message}`));
    });

    panel.querySelector("#xhaNextAnalyzeBtn").addEventListener("click", () => {
      sessionStorage.setItem(AUTO_ANALYZE_KEY, "1");
      openNextTimelinePost();
    });

    panel.querySelector("#xhaForgetBtn").addEventListener("click", () => {
      const ok = window.confirm("처리 기록(reviewedIds)을 초기화할까요?");
      if (!ok) return;
      state.reviewedIds = [];
      persistState();
      writeLog("처리 기록 초기화 완료");
    });

    cooldownInput.addEventListener("change", () => {
      state.cooldownSeconds = clampNonNegativeInt(cooldownInput.value, 60);
      cooldownInput.value = String(state.cooldownSeconds);
      persistState();
      updateCooldownChip();
      writeLog(`자동 쿨다운 ${state.cooldownSeconds}s`);
    });

    toneSelect.addEventListener("change", () => {
      state.mode = String(toneSelect.value || "warm");
      persistState();
      writeLog(`톤: ${state.mode}`);
    });
  }

  function bindShortcuts() {
    document.addEventListener("keydown", (event) => {
      if (!event.altKey) return;
      const target = event.target;
      const isTyping = target instanceof HTMLElement && (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.getAttribute("contenteditable") === "true"
      );
      if (isTyping) return;

      const key = String(event.key || "").toLowerCase();
      if (key === "n") {
        event.preventDefault();
        openNextTimelinePost();
      }
      if (key === "r") {
        event.preventDefault();
        prepareReplyForCurrent({ source: "manual" }).catch((error) => writeLog(`오류: ${error.message}`));
      }
    });
  }

  function updateCooldownChip() {
    const chip = document.getElementById("xhaCooldownChip");
    if (!chip) return;

    const remain = getRemainingCooldownSeconds();
    if (state.cooldownSeconds <= 0) {
      chip.textContent = "AUTO cooldown OFF";
      return;
    }

    if (remain > 0) {
      chip.textContent = `AUTO ${state.cooldownSeconds}s (${remain}s 남음)`;
      return;
    }

    chip.textContent = `AUTO ${state.cooldownSeconds}s (ready)`;
  }

  function getRemainingCooldownSeconds() {
    if (state.cooldownSeconds <= 0 || !state.lastAutoPreparedAt) return 0;

    const lastTs = Date.parse(String(state.lastAutoPreparedAt));
    if (!Number.isFinite(lastTs)) return 0;

    const elapsed = Math.floor((Date.now() - lastTs) / 1000);
    return Math.max(0, state.cooldownSeconds - elapsed);
  }

  function openNextTimelinePost(attempt = 0) {
    const candidate = findNextPostCandidate();
    if (candidate) {
      rememberTweetId(candidate.id);
      writeLog(`다음 글 열기: ${candidate.id}`);
      window.location.assign(candidate.url);
      return;
    }

    if (attempt === 0) {
      writeLog("새 글 탐색 중... 아래로 스크롤합니다.");
    }

    if (attempt >= 2) {
      writeLog("다음 글을 못 찾았습니다. 홈으로 이동해 맨윗글로 진행합니다.");
      if (isHomePage()) {
        openHomeTopPostAndPrepare();
      } else {
        sessionStorage.setItem(HOME_TOP_FALLBACK_KEY, "1");
        window.location.assign("https://x.com/home");
      }
      return;
    }

    window.scrollBy({ top: Math.round(window.innerHeight * 0.85), behavior: "smooth" });
    setTimeout(() => {
      openNextTimelinePost(attempt + 1);
    }, 700);
  }

  function findNextPostCandidate() {
    const currentId = extractTweetId(location.href);
    const posts = Array.from(document.querySelectorAll("article[data-testid='tweet']"));
    const seen = new Set();
    const myHandle = getMyHandle();

    for (const post of posts) {
      const id = extractTweetIdFromArticle(post);
      if (!id) continue;
      if (id === currentId) continue;
      if (seen.has(id)) continue;
      if (state.reviewedIds.includes(id)) continue;
      if (myHandle && isOwnPostArticle(post, myHandle)) continue;

      const url = findStatusUrlInArticle(post, id);
      if (!url) continue;

      seen.add(id);
      return { id, url };
    }

    return null;
  }

  function openHomeTopPostAndPrepare() {
    const top = findHomeTopPostCandidate();
    if (!top) {
      writeLog("홈 맨윗글을 찾지 못했습니다. 홈에서 한번 스크롤 후 다시 눌러주세요.");
      return;
    }

    sessionStorage.setItem(AUTO_ANALYZE_KEY, "1");
    rememberTweetId(top.id);
    writeLog(`홈 맨윗글 이동: ${top.id}`);
    window.location.assign(top.url);
  }

  function findHomeTopPostCandidate() {
    const currentId = extractTweetId(location.href);
    const posts = Array.from(document.querySelectorAll("article[data-testid='tweet']"));
    const seen = new Set();
    const myHandle = getMyHandle();

    for (const post of posts) {
      const id = extractTweetIdFromArticle(post);
      if (!id) continue;
      if (id === currentId) continue;
      if (seen.has(id)) continue;
      if (myHandle && isOwnPostArticle(post, myHandle)) continue;

      const text = getTweetText(post);
      if (!text) continue;

      const url = findStatusUrlInArticle(post, id);
      if (!url) continue;

      seen.add(id);
      return { id, url };
    }

    return null;
  }

  function findStatusUrlInArticle(article, id) {
    const timeEl = article.querySelector("time");
    if (timeEl) {
      const timeLink = timeEl.closest("a[href*='/status/']");
      if (timeLink) {
        const href = normalizeStatusHref(timeLink.getAttribute("href") || timeLink.href);
        if (href.includes(`/status/${id}`)) return href;
      }
    }

    const links = Array.from(article.querySelectorAll("a[href*='/status/']"));
    for (const link of links) {
      const href = normalizeStatusHref(link.getAttribute("href") || link.href);
      if (!href) continue;
      if (!href.includes(`/status/${id}`)) continue;
      if (href.includes("/photo/") || href.includes("/video/") || href.includes("/analytics")) continue;
      return href;
    }

    return "";
  }

  function normalizeStatusHref(href) {
    if (!href) return "";
    try {
      return new URL(href, location.origin).href;
    } catch {
      return "";
    }
  }

  async function prepareReplyForCurrent(options = {}) {
    const source = options.source === "auto" ? "auto" : "manual";

    if (source === "auto") {
      const remain = getRemainingCooldownSeconds();
      if (remain > 0) {
        throw new Error(`자동 쿨다운 중: ${remain}초 후 다시 시도`);
      }
    }

    const article = await findCurrentTweetArticle();
    if (!article) {
      throw new Error("현재 글(article)을 찾지 못함");
    }

    const myHandle = getMyHandle();
    if (source === "auto" && myHandle && isOwnPostArticle(article, myHandle)) {
      writeLog(`내 글(@${myHandle})은 자동 분석에서 제외합니다. 다음 글로 이동합니다.`);
      sessionStorage.setItem(AUTO_ANALYZE_KEY, "1");
      setTimeout(() => openNextTimelinePost(), 120);
      return;
    }

    const tweetId = extractTweetIdFromArticle(article) || extractTweetId(location.href);
    if (tweetId) {
      rememberTweetId(tweetId);
    }

    const tweetText = getTweetText(article);
    if (!tweetText) {
      throw new Error("글 본문을 읽지 못함");
    }

    const imageNotes = extractImageNotes(article);
    const authorSignature = extractAuthorSignature(article);
    const draft = await buildReplyDraft({ text: tweetText, imageNotes, mode: state.mode, tweetId, authorSignature });

    const editor = await ensureReplyEditor(article);
    if (!editor) {
      throw new Error("답글 입력창을 찾지 못함 (로그인 상태 확인)");
    }

    setEditorText(editor, draft);
    highlightSendButton();

    if (source === "auto") {
      state.lastAutoPreparedAt = new Date().toISOString();
      persistState();
    }
    updateCooldownChip();

    const mediaInfo = imageNotes ? ` | media: ${truncate(imageNotes, 50)}` : "";
    const sourceInfo = source === "auto" ? " [AUTO]" : "";
    writeLog(`초안 입력 완료${tweetId ? ` (${tweetId})` : ""}${sourceInfo}${mediaInfo}`);
    writeLog("전송 버튼은 직접 눌러주세요.");
  }

  async function findCurrentTweetArticle() {
    const currentId = extractTweetId(location.href);
    const articles = Array.from(document.querySelectorAll("article[data-testid='tweet']"));

    if (!articles.length) {
      return null;
    }

    if (currentId) {
      const matched = articles.find((article) => {
        const id = extractTweetIdFromArticle(article);
        return id === currentId;
      });
      if (matched) return matched;
    }

    return articles[0];
  }

  function getTweetText(article) {
    const textEl = article.querySelector("[data-testid='tweetText']");
    if (!textEl) return "";
    return normalize(textEl.innerText || textEl.textContent || "");
  }

  function extractAuthorSignature(article) {
    const userName = article.querySelector("[data-testid='User-Name']");
    if (!userName) return "";
    return normalize(userName.innerText || userName.textContent || "");
  }

  function extractAuthorHandleFromArticle(article) {
    if (!article) return "";
    const links = Array.from(article.querySelectorAll("a[href*='/status/']"));
    for (const link of links) {
      const href = normalizeStatusHref(link.getAttribute("href") || link.href);
      if (!href) continue;
      const handle = extractHandleFromStatusUrl(href);
      if (handle) return handle;
    }
    return "";
  }

  function isOwnPostArticle(article, myHandle = "") {
    const mine = normalizeHandle(myHandle || getMyHandle());
    if (!mine) return false;
    const authorHandle = normalizeHandle(extractAuthorHandleFromArticle(article));
    if (!authorHandle) return false;
    return authorHandle === mine;
  }

  function getMyHandle() {
    const detected = detectMyHandle();
    if (detected) {
      cachedMyHandle = detected;
      return detected;
    }
    return cachedMyHandle;
  }

  function detectMyHandle() {
    const profileLink = document.querySelector("a[data-testid='AppTabBar_Profile_Link'][href]");
    if (profileLink) {
      const handle = extractHandleFromProfileUrl(profileLink.getAttribute("href") || profileLink.href);
      if (handle) return handle;
    }

    const accountSwitcher = document.querySelector("[data-testid='SideNav_AccountSwitcher_Button']");
    if (accountSwitcher) {
      const text = normalize(accountSwitcher.textContent || "");
      const match = text.match(/@([A-Za-z0-9_]{1,15})/);
      if (match) return normalizeHandle(match[1]);
    }

    const navLinks = Array.from(document.querySelectorAll("a[href^='/']"));
    for (const link of navLinks) {
      const handle = extractHandleFromProfileUrl(link.getAttribute("href") || link.href);
      if (!handle) continue;
      const testId = String(link.getAttribute("data-testid") || "");
      const text = normalize(link.textContent || "").toLowerCase();
      if (testId === "AppTabBar_Profile_Link" || text.includes("profile") || text.includes("프로필")) {
        return handle;
      }
    }

    return "";
  }

  function extractHandleFromProfileUrl(url) {
    if (!url) return "";
    try {
      const parsed = new URL(url, location.origin);
      const parts = parsed.pathname.split("/").filter(Boolean);
      if (parts.length !== 1) return "";
      const handle = normalizeHandle(parts[0]);
      if (!isValidHandle(handle)) return "";
      if (RESERVED_HANDLES.has(handle)) return "";
      return handle;
    } catch {
      return "";
    }
  }

  function extractHandleFromStatusUrl(url) {
    const target = String(url || "");
    if (!target) return "";
    const match = target.match(/(?:https?:\/\/(?:x|twitter)\.com)?\/([A-Za-z0-9_]{1,15})\/status\/\d+/i);
    if (!match) return "";
    const handle = normalizeHandle(match[1]);
    if (!isValidHandle(handle)) return "";
    if (RESERVED_HANDLES.has(handle)) return "";
    return handle;
  }

  function extractImageNotes(article) {
    const images = Array.from(article.querySelectorAll("a[href*='/photo/'] img[alt], a[href*='/video/'] img[alt]"));
    const alts = images
      .map((img) => normalize(img.getAttribute("alt") || ""))
      .filter((alt) => {
        if (!alt) return false;
        const lower = alt.toLowerCase();
        return lower !== "image" && lower !== "이미지" && lower !== "photo";
      });

    if (alts.length > 0) {
      return unique(alts).join(" / ");
    }

    return images.length > 0 ? "이미지 또는 영상 포함" : "";
  }

  async function ensureReplyEditor(article) {
    let editor = findReplyEditor();
    if (editor) return editor;

    const replyButton = article.querySelector("button[data-testid='reply']");
    if (replyButton) {
      replyButton.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
    }

    for (let i = 0; i < 24; i += 1) {
      await sleep(140);
      editor = findReplyEditor();
      if (editor) return editor;
    }

    return null;
  }

  function findReplyEditor() {
    const candidates = Array.from(document.querySelectorAll("div[role='textbox'][contenteditable='true']"));
    return candidates.find((el) => isVisible(el));
  }

  function highlightSendButton() {
    const button = findSendButton();
    if (!button) return;

    button.classList.add("xha-send-pulse");
    setTimeout(() => {
      button.classList.remove("xha-send-pulse");
    }, 2200);
  }

  function findSendButton() {
    const selectors = [
      "button[data-testid='tweetButtonInline']",
      "button[data-testid='tweetButton']"
    ];

    for (const selector of selectors) {
      const buttons = Array.from(document.querySelectorAll(selector));
      const visible = buttons.find((btn) => isVisible(btn));
      if (visible) return visible;
    }

    return null;
  }

  function setEditorText(editor, text) {
    editor.focus();

    try {
      document.execCommand("selectAll", false);
      document.execCommand("insertText", false, text);
    } catch {
      // fallback below
    }

    const normalizedEditor = normalize(editor.innerText || editor.textContent || "");
    if (normalizedEditor === normalize(text)) {
      editor.dispatchEvent(new Event("input", { bubbles: true }));
      return;
    }

    const selection = window.getSelection();
    if (selection) {
      const range = document.createRange();
      range.selectNodeContents(editor);
      range.deleteContents();
      const node = document.createTextNode(text);
      range.insertNode(node);
      range.selectNodeContents(editor);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    } else {
      editor.textContent = text;
    }

    editor.dispatchEvent(new Event("input", { bubbles: true }));
  }

  async function buildReplyDraft({ text, imageNotes, mode, tweetId = "", authorSignature = "" }) {
    const normalizedText = normalize(stripUrls(text));
    const normalizedImage = normalize(imageNotes);
    const normalizedAuthor = normalize(authorSignature);

    try {
      const aiDraft = await requestAiDraft({
        text: normalizedText,
        imageNotes: normalizedImage,
        mode,
        tweetId,
        authorSignature: normalizedAuthor
      });
      if (aiDraft) return aiDraft;
    } catch (error) {
      if (!RULE_FALLBACK_ENABLED) {
        throw error;
      }
      writeLog(`[AI 생성 실패] ${error.message} (로컬 규칙으로 대체)`);
    }

    return buildRuleBasedReplyDraft({
      text: normalizedText,
      imageNotes: normalizedImage,
      mode,
      tweetId,
      authorSignature: normalizedAuthor
    });
  }

  function buildRuleBasedReplyDraft({ text, imageNotes, mode, tweetId = "", authorSignature = "" }) {
    const context = analyzeDraftContext(text, imageNotes, authorSignature);
    const seed = `${tweetId}|${text}|${imageNotes}|${authorSignature}|${mode}|${Date.now()}|${Math.random()}`;
    const raw = buildKoreanDraft(context, mode, seed);
    return finalizeReplyOutput(raw, context, seed);
  }

  async function requestAiDraft({ text, imageNotes, mode, tweetId = "", authorSignature = "" }) {
    const payload = {
      text,
      imageNotes,
      tone: mode,
      tweetId,
      authorSignature
    };

    try {
      const { status, ok, body } = await postJsonLocal(DRAFT_API_URL, payload, 18000);
      if (!ok) {
        const message = normalize(body?.error || `HTTP ${status}`);
        throw new Error(message || "AI 서버에서 초안을 만들지 못했습니다.");
      }

      const draft = sanitizeAiDraft(body?.draft);
      if (!draft) {
        throw new Error("AI 응답이 비어있습니다.");
      }
      return draft;
    } catch (error) {
      if (error && (error.name === "AbortError" || /timeout/i.test(String(error.message || "")))) {
        throw new Error("AI 응답 시간이 초과되었습니다. 잠시 후 다시 시도해 주세요.");
      }
      if (error instanceof TypeError) {
        throw new Error("AI 서버 연결 실패: localhost:3000 실행 상태를 확인해 주세요.");
      }
      throw error;
    }
  }

  function postJsonLocal(url, data, timeoutMs) {
    if (typeof GM_xmlhttpRequest === "function") {
      return postJsonViaGm(url, data, timeoutMs);
    }
    return postJsonViaFetch(url, data, timeoutMs);
  }

  function postJsonViaFetch(url, data, timeoutMs) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    return fetch(url, {
      method: "POST",
      mode: "cors",
      credentials: "omit",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
      signal: controller.signal
    })
      .then(async (response) => {
        let body = null;
        try {
          body = await response.json();
        } catch {
          body = null;
        }
        return { status: response.status, ok: response.ok, body };
      })
      .finally(() => clearTimeout(timeout));
  }

  function postJsonViaGm(url, data, timeoutMs) {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: "POST",
        url,
        timeout: timeoutMs,
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(data),
        onload: (resp) => {
          let body = null;
          try {
            body = JSON.parse(String(resp.responseText || "{}"));
          } catch {
            body = null;
          }
          resolve({
            status: Number(resp.status) || 0,
            ok: Number(resp.status) >= 200 && Number(resp.status) < 300,
            body
          });
        },
        ontimeout: () => reject(new Error("timeout")),
        onerror: () => reject(new TypeError("network_error"))
      });
    });
  }

  function sanitizeAiDraft(value) {
    const lines = String(value || "")
      .replace(/```/g, "")
      .split(/\r?\n/)
      .map((line) => normalize(String(line || "").replace(/^[-*]\s*/, "").replace(/^(댓글|reply)\s*[:：]\s*/i, "")))
      .filter(Boolean)
      .slice(0, 2);

    const joined = lines.join("\n");
    return limitLength(joined, 120);
  }

  function analyzeDraftContext(text, imageNotes, authorSignature = "") {
    const normalizedAuthor = normalize(authorSignature);
    const combined = normalize(`${text} ${imageNotes} ${normalizedAuthor}`);
    const lower = combined.toLowerCase();

    const hasCongrats = containsAny(lower, [
      "축하", "성공", "완료", "오픈", "런칭", "합격", "우승",
      "congrats", "congrat", "success", "release", "launched", "shipped", "won", "passed"
    ]);
    const hasHard = containsAny(lower, [
      "힘들", "지치", "고민", "어렵", "실패", "스트레스", "걱정",
      "hard", "tired", "rough", "struggle", "burnout", "stressed"
    ]);
    const hasQuestion = /\?/.test(text) || containsAny(lower, [
      "어떻게", "추천", "의견", "질문", "help", "advice", "how", "what", "which"
    ]);
    const hasGaza = containsAny(lower, ["가즈아", "gazua"]);
    const hasMedia = Boolean(imageNotes);
    const lang = /[가-힣]/.test(combined) ? "ko" : "en";
    const foodHint = extractFoodHint(text, imageNotes);
    const topic = inferTopic(lower, foodHint);

    return {
      text,
      imageNotes,
      authorSignature: normalizedAuthor,
      lower,
      lang,
      hasCongrats,
      hasHard,
      hasQuestion,
      hasGaza,
      hasMedia,
      topic,
      foodHint,
      keyword: extractKeyword(text, imageNotes),
      visualCue: compactImageCue(imageNotes)
    };
  }

  function inferTopic(lower, foodHint = "") {
    if (containsAny(lower, [
      "single inferno", "singleinferno", "singles inferno", "singlesinferno", "singlesinferno5",
      "single inferno s5", "single inferno season 5", "솔로지옥", "솔로 지옥", "솔로지옥5",
      "kdramahotgists"
    ])) return "single_inferno";
    if (containsAny(lower, [
      "stock", "stocks", "share", "shares", "equity", "holding", "holdings", "blackrock", "nasdaq",
      "주식", "종목", "지분", "보유", "매수", "매도", "시총", "기업", "블랙록", "투자"
    ])) return "finance";
    if (foodHint || hasFoodSignal(lower)) return "food";
    if (containsAny(lower, [
      "travel", "trip", "vacation", "dubai", "beach", "resort", "hotel", "island", "flight",
      "여행", "휴가", "바다", "도시", "풍경", "야경"
    ])) return "travel";
    if (containsAny(lower, [
      "nature", "forest", "mountain", "flower", "sunset", "sunrise", "ocean", "tree",
      "자연", "숲", "산", "꽃", "노을", "일출", "바람", "공원"
    ])) return "nature";
    if (containsAny(lower, [
      "build", "project", "release", "launch", "startup", "product", "code", "app", "dev",
      "프로젝트", "개발", "배포", "출시", "앱", "서비스", "기능"
    ])) return "work";
    if (containsAny(lower, [
      "dog", "cat", "pet", "puppy", "kitten", "반려", "강아지", "고양이"
    ])) return "pet";
    if (containsAny(lower, [
      "music", "song", "concert", "guitar", "piano", "노래", "음악", "공연", "연주"
    ])) return "music";
    if (containsAny(lower, [
      "golf", "fairway", "birdie", "bogey", "eagle", "hole in one", "tee shot", "teeshot",
      "putting", "driver", "golf swing",
      "골프", "라운딩", "티샷", "버디", "이글", "홀인원", "퍼팅", "드라이버", "굿샷"
    ])) return "golf";
    return "general";
  }

  function buildKoreanDraft(context, mode, seed) {
    if (context.hasGaza) {
      return buildKoreanGazaShort(seed);
    }

    if (isLowConfidenceContext(context)) {
      return "와우....";
    }

    if (context.topic === "pet" && context.hasMedia && isDogPost(context)) {
      return buildKoreanDogPhotoShort(seed);
    }

    if (context.topic === "food") {
      return buildKoreanFoodShort(context, seed);
    }

    if (context.hasMedia && context.topic === "general") {
      return buildKoreanMediaGeneralShort(context, seed);
    }

    if ((context.topic === "travel" || context.topic === "nature") && context.hasMedia) {
      return buildKoreanCityPhotoShort(context, seed);
    }

    if (context.topic === "golf") {
      return "굿샷";
    }

    if (context.topic === "single_inferno") {
      return buildKoreanSingleInfernoShort(context, seed);
    }

    if (context.topic === "finance") {
      return buildKoreanFinanceShort(context, seed);
    }

    const line1 = pickVariant(getKoreanOpenings(context, mode), seed, "ko-line1");
    const line2Pool = [
      ...getKoreanDetails(context, mode),
      ...getKoreanClosings(context, mode)
    ];

    if (context.hasMedia && context.visualCue) {
      line2Pool.push(
        `${context.visualCue} 분위기 좋네요.`,
        `${context.visualCue} 느낌 좋아요.`
      );
    } else if (context.hasMedia) {
      line2Pool.push(
        "사진 느낌 좋네요.",
        "분위기 좋네요."
      );
    }

    const useTwoLines = context.hasMedia || context.hasQuestion || shouldUse(seed, "ko-two-lines", 72);
    const parts = [line1];
    if (useTwoLines && line2Pool.length > 0) {
      parts.push(pickVariant(line2Pool, seed, "ko-line2"));
    }
    const draft = finalizeDraft(parts, 120);
    return appendCasualTail(draft, context, seed);
  }

  function isDogPost(context) {
    return containsAny(context.lower, [
      "dog", "dogs", "puppy", "puppies", "강아지", "댕댕", "멍멍", "댕댕이"
    ]);
  }

  function buildKoreanDogPhotoShort(seed) {
    return pickVariant([
      "댕댕이 너무 사랑스러워요\n댕댕이 너무 귀여워요",
      "댕댕이 진짜 귀여워요..\n완전 사랑스러워요 ㅎㅎ",
      "아 댕댕이 너무 귀엽다..\n사랑스러워요 ㅎㅎ",
      "댕댕이 표정 너무 귀여워요\n진짜 사랑스럽네요 ㅎㅎ"
    ], seed, "ko-dog-photo");
  }

  function buildKoreanFoodShort(context, seed) {
    const hint = normalizeFoodHint(context.foodHint);
    if (hint) {
      return pickVariant([
        `와.. ${hint} 맛있겠다...`,
        `와.. ${hint} 진짜 맛나보여요...`,
        `${hint} 보니까 배고파요...`,
        `${hint} 완전 땡기네요... ㅎㅎ`
      ], seed, `ko-food-short-${hint}`);
    }

    return pickVariant([
      "와..맛나겠다...배고파요",
      "와.. 진짜 맛나겠다... 배고파요",
      "와..맛나겠다...배고파요 ㅎㅎ",
      "와... 맛나겠다... 배고파요"
    ], seed, "ko-food-short");
  }

  function buildKoreanMediaGeneralShort(context, seed) {
    if (hasFoodVisualHint(context)) {
      return buildKoreanFoodShort(context, seed);
    }
    return "와우....";
  }

  function buildKoreanGazaShort(seed) {
    return pickVariant([
      "가즈아~~~!!",
      "가즈아~~!!",
      "가즈아아~~~!!"
    ], seed, "ko-gaza-short");
  }

  function isLowConfidenceContext(context) {
    if (!context || typeof context !== "object") return false;
    if (context.hasGaza) return false;

    const strongTopics = new Set([
      "finance", "food", "travel", "pet", "music", "nature", "work", "single_inferno", "golf"
    ]);
    if (strongTopics.has(String(context.topic || ""))) return false;

    const signals = Number(Boolean(context.hasCongrats)) +
      Number(Boolean(context.hasHard)) +
      Number(Boolean(context.hasQuestion)) +
      Number(Boolean(context.hasMedia)) +
      Number(Boolean(context.keyword));

    return String(context.topic || "") === "general" && signals <= 2;
  }

  function finalizeReplyOutput(text, context, seed) {
    if (context.topic === "golf") return "굿샷";
    if (context.hasGaza) {
      const fixed = String(text || "").trim();
      rememberRecentReply(fixed);
      return fixed;
    }
    if (String(text || "").trim() === "와우....") {
      rememberRecentReply("와우....");
      return "와우....";
    }
    if (context.topic === "finance" || context.topic === "food") {
      const fixed = String(text || "").trim();
      rememberRecentReply(fixed);
      return fixed;
    }

    const baseLines = String(text || "")
      .split("\n")
      .map((line) => normalize(line))
      .filter(Boolean)
      .slice(0, 2);

    let candidate = stylizeReplyLines(baseLines, context, seed);
    candidate = avoidRecentDuplicate(candidate, context, seed);
    rememberRecentReply(candidate);
    return candidate;
  }

  function stylizeReplyLines(lines, context, seed) {
    const output = [];
    for (let i = 0; i < lines.length; i += 1) {
      const lineSeed = `${seed}|line-${i}`;
      let line = applyPhraseVariants(lines[i], lineSeed);
      line = applyVariableDots(line, context, lineSeed);
      line = maybeAppendTinyLaugh(line, context, lineSeed);
      output.push(line);
    }
    return limitLength(output.join("\n"), 120);
  }

  function applyPhraseVariants(line, seed) {
    let value = String(line || "");

    const rules = [
      { pattern: /임팩트 있네요/g, options: ["임팩트 있네요", "임팩트 꽤 있네요", "임팩트 좀 있네요", "임팩트 세네요"] },
      { pattern: /느낌 쎄네요/g, options: ["느낌 쎄네요", "느낌 좀 세네요", "느낌이 강하네요", "느낌 꽤 세네요"] },
      { pattern: /예뻐요/g, options: ["예뻐요", "진짜 예뻐요", "엄청 예뻐요", "너무 예뻐요"] },
      { pattern: /아름다워요/g, options: ["아름다워요", "너무 아름다워요", "되게 아름다워요"] },
      { pattern: /귀여워요/g, options: ["귀여워요", "너무 귀여워요", "진짜 귀여워요"] },
      { pattern: /사랑스러워요/g, options: ["사랑스러워요", "너무 사랑스러워요", "진짜 사랑스러워요"] }
    ];

    for (let i = 0; i < rules.length; i += 1) {
      const rule = rules[i];
      if (!rule.pattern.test(value)) continue;
      if (!shouldUse(seed, `phrase-${i}`, 72)) continue;
      const replacement = pickVariant(rule.options, seed, `phrase-value-${i}`);
      value = value.replace(rule.pattern, replacement);
    }
    return value;
  }

  function applyVariableDots(line, context, seed) {
    let value = String(line || "").trim();
    if (!value) return value;
    if (value === "굿샷") return value;

    const noEnding = value.replace(/[.!~]+$/g, "");
    const low = noEnding.toLowerCase();
    const emphasize = containsAny(low, [
      "대박", "설레", "두근", "사랑", "귀엽", "예뻐", "아름다", "임팩트"
    ]);

    if (shouldUse(seed, "ending-exclaim", emphasize ? 35 : 12)) {
      const exclamation = pickVariant(["!", "!!", "!!!"], seed, "ending-exclaim-value");
      return `${noEnding}${exclamation}`;
    }

    if (shouldUse(seed, "ending-dots", 85)) {
      const dotCount = 2 + (hashText(`${seed}|dot-count`) % 5); // 2~6
      return `${noEnding}${".".repeat(dotCount)}`;
    }

    return noEnding;
  }

  function maybeAppendTinyLaugh(line, context, seed) {
    let value = String(line || "").trim();
    if (!value) return value;
    if (/[ㅎㅋ]{1,}/.test(value)) return value;
    if (!shouldUse(seed, "tiny-laugh-use", 28)) return value;

    const tiny = pickVariant(["ㅎ", "ㅎㅎ", "ㅎㅎㅎ"], seed, "tiny-laugh-value");
    if (context.topic === "finance" && tiny.startsWith("ㅎ")) {
      return value;
    }
    return `${value} ${tiny}`;
  }

  function avoidRecentDuplicate(text, context, seed) {
    const recent = Array.isArray(state.recentReplies) ? state.recentReplies : [];
    if (!recent.includes(text)) return text;

    const baseLines = String(text || "")
      .split("\n")
      .map((line) => normalize(line))
      .filter(Boolean)
      .slice(0, 2);

    for (let i = 1; i <= 6; i += 1) {
      const retrySeed = `${seed}|retry-${i}`;
      const candidate = stylizeReplyLines(baseLines, context, retrySeed);
      if (!recent.includes(candidate)) {
        return candidate;
      }
    }

    return text;
  }

  function rememberRecentReply(text) {
    const normalized = String(text || "").trim();
    if (!normalized) return;
    if (!Array.isArray(state.recentReplies)) {
      state.recentReplies = [];
    }
    state.recentReplies.push(normalized);
    if (state.recentReplies.length > MAX_RECENT_REPLIES) {
      state.recentReplies = state.recentReplies.slice(state.recentReplies.length - MAX_RECENT_REPLIES);
    }
    persistState();
  }

  function buildKoreanCityPhotoShort(context, seed) {
    if (containsAny(context.lower, ["greece", "그리스"])) {
      return pickVariant([
        "와.. 그리스 예쁘네요",
        "와.. 그리스 분위기 예쁘네요",
        "와.. 사진 진짜 예쁘네요"
      ], seed, "ko-city-greece");
    }

    return pickVariant([
      "와.. 예쁘네요",
      "와.. 사진 예쁘네요",
      "와.. 분위기 예쁘네요",
      "와.. 진짜 예쁘네요"
    ], seed, "ko-city-generic");
  }

  function buildKoreanSingleInfernoShort(context, seed) {
    const lines = [
      "와.. 두근두근 해요..",
      "와... 사랑스럽다..!",
      "두근두근 해요..",
      "아.. 설레네요..",
      "와.. 이건 좀 심장 떨리네요.."
    ];

    if (context.hasCongrats) {
      lines.unshift(
        "와.. 두근두근 해요..",
        "와... 사랑스럽다..!"
      );
    }

    return pickVariant(lines, seed, "ko-single-inferno-short");
  }

  function buildKoreanFinanceShort(context, seed) {
    if (containsAny(context.lower, ["blackrock", "블랙록"])) {
      return pickVariant([
        "블랙록 가즈아~~!!",
        "가즈아~~!!",
        "블랙록 가즈아아~~!!"
      ], seed, "ko-finance-blackrock");
    }

    return pickVariant([
      "가즈아~~!!",
      "가즈아아~~!!",
      "오늘도 가즈아~~!!",
      "가즈아~~!! ㅎㅎ"
    ], seed, "ko-finance-short");
  }

  function getKoreanOpenings(context, mode) {
    if (mode === "cheer") {
      if (context.hasCongrats) return [
        "와.. 이건 좀 기분 좋아지네요..",
        "오.. 좋은 소식 느낌인데요..",
        "이런 흐름이면 기분 좋아지죠.."
      ];
      if (context.hasHard) return [
        "오.. 쉽지 않았을 텐데요..",
        "이건 진짜 마음이 쓰이네요..",
        "괜히 더 보게 되는 글이네요.."
      ];
      return [
        "오.. 이거 느낌 좋네요..",
        "와.. 묘하게 끌리네요..",
        "읽는데 기분이 좀 올라가네요.."
      ];
    }

    if (mode === "calm") {
      if (context.hasQuestion) return [
        "오.. 질문 포인트가 묘하네요..",
        "이건 저도 바로 답 못 하겠네요..",
        "생각이 좀 길어지는 질문이네요.."
      ];
      return [
        "오.. 정리가 꽤 잘 된 느낌이네요..",
        "핵심이 슬쩍 보이긴 하네요..",
        "짧은데도 여운이 남네요.."
      ];
    }

    if (context.topic === "finance") return [
      "와.. 이거 느낌 쎄네요..",
      "오.. 시장 얘기인데도 묘하네요..",
      "이런 종목 글은 괜히 긴장되네요.."
    ];
    if (context.hasCongrats) return [
      "오.. 이건 반가운 소식이네요..",
      "와.. 기분 좋아지는 글이네요..",
      "좋은 흐름 같아서 보기 좋네요.."
    ];
    if (context.hasHard) return [
      "오.. 이런 얘기 더 와닿네요..",
      "읽다 보니 공감이 좀 되네요..",
      "괜히 마음이 쓰이네요.."
    ];
    return [
      "와우....",
      "오.. 잘 봤어요..",
      "와.. 괜찮네요.."
    ];
  }

  function getKoreanDetails(context, mode) {
    if (context.topic === "finance") return [
      "숫자 보니까 체감이 확 오네요..",
      "한 줄로 보는데도 압이 있네요..",
      "이런 건 괜히 심장 빨라지네요.."
    ];
    if (context.topic === "food") return [
      "사진 보니까 갑자기 배고파지네요..",
      "이건 밤에 보면 위험하네요..",
      "맛이 상상돼서 더 힘드네요.."
    ];
    if (context.hasCongrats) return [
      "뭔가 잘 풀린 기운이 느껴지네요..",
      "결과보다 분위기가 더 좋네요..",
      "이 흐름이면 다음도 기대되네요.."
    ];
    if (context.hasHard) return [
      "이럴 때가 제일 버겁죠..",
      "저도 비슷한 구간 있었던 것 같네요..",
      "말투가 담담해서 더 세게 와요.."
    ];
    if (context.hasQuestion) return [
      "이건 답이 하나는 아닌 느낌이네요..",
      "포인트가 은근 어렵네요..",
      "저도 바로 결론은 못 내리겠네요.."
    ];
    if (context.topic === "travel") return [
      "현장 공기까지 오는 느낌이네요..",
      "잠깐 멍 때리게 되는 장면이네요..",
      "분위기가 묘하게 오래 남아요.."
    ];
    if (context.topic === "nature") return [
      "색감이 편해서 계속 보게 되네요..",
      "자연 느낌이 은근 세게 오네요..",
      "잠깐 멈춰 보게 되는 톤이네요.."
    ];
    if (context.topic === "work") return [
      "과정이 슬쩍 보이는 게 좋네요..",
      "디테일이 은근 탄탄해 보이네요..",
      "결과보다 흐름이 더 눈에 들어와요.."
    ];
    return [
      "짧은데도 느낌이 남네요..",
      "확 설명은 못 하겠는데 좋네요..",
      "이상하게 계속 생각나는 글이네요.."
    ];
  }

  function getKoreanClosings(context, mode) {
    if (context.hasQuestion) return [
      "나중에 결론 나오면 궁금하겠네요..",
      "어떻게 흘러갈지 궁금하네요..",
      "흐름이 궁금하네요.."
    ];
    if (mode === "cheer") return [
      "다음 소식도 은근 기대되네요..",
      "이 흐름 계속 가면 좋겠네요..",
      "뭔가 좋은 쪽 느낌입니다.."
    ];
    if (mode === "calm") return [
      "공유 감사합니다..",
      "잘 보고 갑니다..",
      "이건 좀 더 봐야겠네요.."
    ];
    return [
      "잘 보고 갑니다..",
      "묘하게 여운이 남네요..",
      "이런 글 좋네요.."
    ];
  }

  function buildEnglishDraft(context, mode, seed) {
    const firstLine = pickVariant(
      context.hasCongrats
        ? ["Wow, huge update!", "This is big, congrats!", "Love this kind of win."]
        : context.hasHard
          ? ["Thanks for sharing this honestly.", "Super relatable post.", "I felt this one."]
          : context.hasQuestion
            ? ["Great question.", "This is a good point.", "Interesting take."]
            : ["Nice post!", "Really enjoyed this.", "This was fun to read."],
      seed,
      "en-line1"
    );

    const secondPool = context.topic === "finance"
      ? ["The numbers are super clear at a glance.", "Great way to summarize the holdings.", "This breakdown is actually very helpful."]
      : context.topic === "travel"
        ? ["The vibe comes through right away.", "Feels like a mini trip through the screen.", "The scene looks amazing."]
        : context.topic === "work"
          ? ["You can feel the effort behind this.", "The process detail is really good.", "The context makes it easy to follow."]
          : ["The tone and visuals match really well.", "The detail makes this more engaging.", "This one sticks in my head."];

    if (context.keyword && shouldUse(seed, "en-keyword-line2", 60)) {
      secondPool.unshift(
        `${context.keyword} really stands out here.`,
        `The ${context.keyword} bit is the highlight for me.`
      );
    }

    const useTwoLines = context.hasMedia || context.hasQuestion || shouldUse(seed, "en-two-lines", 68);
    const parts = [firstLine];
    if (useTwoLines) {
      parts.push(pickVariant(secondPool, seed, "en-line2"));
    }
    const draft = finalizeDraft(parts, 120);
    return appendCasualTail(draft, context, seed);
  }

  function appendCasualTail(text, context, seed) {
    const base = String(text || "").trim();
    if (!base) return base;

    const tails = [];
    if (context.topic === "finance" || context.hasHard) {
      tails.push("ㄷㄷㄷ");
    }
    if (context.hasCongrats || context.topic === "food" || context.topic === "pet" || context.topic === "music") {
      tails.push("ㅋㅋㅋ");
    }

    if (!tails.length) return base;
    if (!shouldUse(seed, "casual-tail-use", 58)) return base;

    const tail = pickVariant(unique(tails), seed, "casual-tail-value");
    if (!tail) return base;
    if (base.endsWith(tail)) return base;
    return `${base} ${tail}`;
  }

  function formatKeywordForShout(keyword) {
    const raw = normalize(String(keyword || "")).replace(/[!?.]/g, "");
    if (!raw) return "";
    return raw.replace(/(으로|에서|까지|처럼|보다|하고|랑|이라|라고|이랑|에게|께서|에서의|이|가|은|는|을|를|와|과|도|의|에|로)$/u, "");
  }

  function normalizeFoodHint(value) {
    const base = normalize(String(value || "")).replace(/^#+/g, "");
    if (!base) return "";
    return truncate(base, 14);
  }

  function hasFoodSignal(lower) {
    const source = String(lower || "");
    if (!source) return false;

    if (findFoodKeyword(source)) return true;

    if (/(점심|저녁|아침|식사|메뉴|요리|레시피|뭐\s*먹|먹을까|먹자|맛있겠|배고프)/u.test(source)) {
      return true;
    }

    if (/[🍔🍕🍟🌭🍗🍖🍜🍝🍣🍱🍛🍲🍤🍙🍚🍢🍡🍦🍨🍰🧁🍮🥐🥯🥞🧇🍞🥪🌮🌯🥙🥗🥟🍩🍪☕🧋]/u.test(source)) {
      return true;
    }

    return false;
  }

  function extractFoodHint(text, imageNotes) {
    const source = normalize(`${text} ${imageNotes}`);
    if (!source) return "";
    const direct = findFoodKeyword(source);
    if (direct) return truncate(direct.replace(/^#/, ""), 12);

    const keyword = extractKeyword(text, imageNotes);
    if (keyword) {
      const fromKeyword = findFoodKeyword(keyword);
      if (fromKeyword) return truncate(fromKeyword.replace(/^#/, ""), 12);
    }

    return "";
  }

  function findFoodKeyword(source) {
    const raw = normalize(String(source || ""));
    if (!raw) return "";
    const lower = raw.toLowerCase();

    const hints = [
      { label: "라면", words: ["라면", "ramen", "ramyun", "신라면", "너구리", "불닭"] },
      { label: "피자", words: ["피자", "pizza"] },
      { label: "햄버거", words: ["햄버거", "버거", "burger"] },
      { label: "치킨", words: ["치킨", "후라이드", "양념치킨", "fried chicken"] },
      { label: "초밥", words: ["초밥", "스시", "sushi"] },
      { label: "파스타", words: ["파스타", "pasta", "알리오올리오", "까르보나라", "카르보나라"] },
      { label: "스테이크", words: ["스테이크", "steak"] },
      { label: "떡볶이", words: ["떡볶이", "tteokbokki"] },
      { label: "김밥", words: ["김밥", "kimbap"] },
      { label: "국밥", words: ["국밥", "순대국", "돼지국밥"] },
      { label: "삼겹살", words: ["삼겹살", "목살", "갈비", "barbecue", "bbq"] },
      { label: "마라탕", words: ["마라탕", "마라샹궈", "malatang"] },
      { label: "샐러드", words: ["샐러드", "salad"] },
      { label: "케이크", words: ["케이크", "cake"] },
      { label: "빵", words: ["빵", "베이커리", "bread", "croissant"] },
      { label: "커피", words: ["커피", "라떼", "아메리카노", "coffee", "latte"] },
      { label: "디저트", words: ["디저트", "dessert", "마카롱", "쿠키", "빙수", "아이스크림"] }
    ];

    for (const hint of hints) {
      if (hint.words.some((word) => lower.includes(word.toLowerCase()))) {
        return hint.label;
      }
    }

    const hangulDish = raw.match(/([가-힣]{2,14}(?:라면|냉면|짜장면|짬뽕|쌀국수|칼국수|국수|우동|파스타|피자|버거|햄버거|치킨|삼겹살|갈비|족발|보쌈|수육|돈까스|순대국|국밥|김밥|초밥|스시|덮밥|볶음밥|비빔밥|찌개|탕|국|찜|구이|전|튀김|떡볶이|마라탕|샐러드|케이크|빙수|아이스크림|쿠키|빵|도넛|커피|라떼|아메리카노|밀크티|디저트))/u);
    if (hangulDish) {
      return hangulDish[1];
    }

    const englishDish = lower.match(/\b(ramen|noodle|noodles|pasta|pizza|burger|sandwich|steak|sushi|curry|rice|bbq|barbecue|fried chicken|chicken|wings|fries|dessert|cake|cookie|bread|croissant|donut|coffee|latte|americano|tea|smoothie)\b/i);
    if (englishDish) {
      return englishDish[1];
    }

    const tokens = tokenizeWords(raw);
    for (const token of tokens) {
      const clean = normalize(token.replace(/^[@#]+/g, ""));
      if (!clean || clean.length < 2) continue;
      if (/(면|밥|국|탕|찌개|찜|구이|전|튀김|덮밥|볶음밥|김밥|초밥|스시|파스타|피자|버거|치킨|샐러드|케이크|빵|쿠키|빙수|커피|라떼|아메리카노|디저트)$/u.test(clean)) {
        return clean;
      }
    }

    return "";
  }

  function hasFoodVisualHint(context) {
    if (!context || typeof context !== "object") return false;
    const source = normalize(`${context.text || ""} ${context.imageNotes || ""}`.toLowerCase());
    if (!source) return false;

    if (findFoodKeyword(source)) return true;
    if (hasFoodSignal(source)) return true;

    if (containsAny(source, [
      "plate", "bowl", "cup", "meal", "table", "kitchen", "spoon", "fork", "chopstick",
      "접시", "그릇", "컵", "수저", "숟가락", "포크", "젓가락", "식탁", "한상", "차림"
    ])) {
      return true;
    }

    return false;
  }

  function extractKeyword(text, imageNotes) {
    const source = `${text} ${imageNotes}`;
    const tokens = tokenizeWords(source);
    const stopwords = new Set([
      "the", "and", "for", "with", "this", "that", "from", "your", "have", "has", "been", "were", "about",
      "image", "photo", "video", "today", "just", "really", "very",
      "그리고", "그냥", "정말", "진짜", "너무", "조금", "이거", "저거", "여기", "저기", "대한", "관련", "공유",
      "이미지", "사진", "영상", "포함", "이상", "내용", "부분"
    ]);

    for (const token of tokens) {
      const raw = token.replace(/^[@#]+/g, "");
      const lower = raw.toLowerCase();
      if (!raw || raw.length < 2) continue;
      if (stopwords.has(lower)) continue;
      if (/^\d+$/.test(raw)) continue;
      if (lower.startsWith("http")) continue;
      return truncate(raw, 20);
    }

    return "";
  }

  function compactImageCue(imageNotes) {
    if (!imageNotes) return "";
    const compact = normalize(
      String(imageNotes)
        .replace(/\s*\/\s*/g, ", ")
        .replace(/\b(image|photo|video|이미지|사진|영상)\b/gi, "")
        .replace(/,+/g, ",")
    );
    if (!compact) return "";

    const lower = compact.toLowerCase();
    if (lower === "또는 포함" || lower === "or included") return "";
    if (lower.includes("이미지 또는 영상 포함")) return "";
    if (lower.includes("image or video")) return "";

    const chunks = compact.split(/[|,.;]/).map((part) => normalize(part)).filter(Boolean);
    const first = chunks[0] || compact;
    return truncate(first, 28);
  }

  function tokenizeWords(text) {
    const matches = String(text || "").match(/[A-Za-z가-힣0-9_#@-]+/g);
    return Array.isArray(matches) ? matches : [];
  }

  function pickVariant(options, seed, salt) {
    if (!Array.isArray(options) || options.length === 0) return "";
    const index = hashText(`${seed}|${salt}`) % options.length;
    return options[index];
  }

  function shouldUse(seed, salt, percentage) {
    return (hashText(`${seed}|${salt}`) % 100) < percentage;
  }

  function hashText(value) {
    let hash = 2166136261;
    const input = String(value || "");
    for (let i = 0; i < input.length; i += 1) {
      hash ^= input.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function finalizeDraft(parts, maxLength) {
    const uniqueLines = [];
    const seen = new Set();
    for (const part of parts) {
      const line = normalize(part);
      if (!line) continue;
      const key = line.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      uniqueLines.push(line);
    }

    const joined = uniqueLines.slice(0, 2).join("\n");
    return limitLength(joined, maxLength);
  }

  function limitLength(text, maxLength) {
    const clean = String(text || "").trim();
    if (clean.length <= maxLength) return clean;
    return `${clean.slice(0, Math.max(0, maxLength - 1)).trim()}…`;
  }

  function rememberTweetId(id) {
    if (!id) return;

    if (!state.reviewedIds.includes(id)) {
      state.reviewedIds.push(id);
      if (state.reviewedIds.length > MAX_REVIEWED_IDS) {
        state.reviewedIds = state.reviewedIds.slice(state.reviewedIds.length - MAX_REVIEWED_IDS);
      }
      persistState();
    }
  }

  function extractTweetIdFromArticle(article) {
    const links = Array.from(article.querySelectorAll("a[href*='/status/']"));
    for (const link of links) {
      const id = extractTweetId(link.getAttribute("href") || "");
      if (id) return id;
    }
    return "";
  }

  function extractTweetId(url) {
    const match = String(url || "").match(/\/status\/(\d+)/i);
    return match ? match[1] : "";
  }

  function isStatusPage() {
    return /\/status\/\d+/i.test(location.href);
  }

  function isHomePage() {
    return /^https?:\/\/(?:x|twitter)\.com\/home(?:[/?#]|$)/i.test(location.href) ||
      /^https?:\/\/(?:x|twitter)\.com\/?([?#].*)?$/i.test(location.href);
  }

  function containsAny(text, words) {
    return words.some((word) => text.includes(word));
  }

  function stripUrls(value) {
    return String(value || "").replace(/https?:\/\/\S+/g, " ");
  }

  function normalize(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function normalizeHandle(value) {
    return String(value || "").replace(/^@+/, "").trim().toLowerCase();
  }

  function isValidHandle(value) {
    return /^[a-z0-9_]{1,15}$/i.test(String(value || ""));
  }

  function unique(values) {
    return [...new Set(values)];
  }

  function truncate(value, maxLength) {
    if (value.length <= maxLength) return value;
    return `${value.slice(0, Math.max(0, maxLength - 3))}...`;
  }

  function clampNonNegativeInt(value, fallback) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed < 0) return fallback;
    return Math.floor(parsed);
  }

  function isVisible(element) {
    if (!(element instanceof HTMLElement)) return false;
    const style = window.getComputedStyle(element);
    if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") {
      return false;
    }

    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...defaultState };
      const parsed = JSON.parse(raw);
      return {
        cooldownSeconds: clampNonNegativeInt(parsed.cooldownSeconds, defaultState.cooldownSeconds),
        lastAutoPreparedAt: parsed.lastAutoPreparedAt
          ? String(parsed.lastAutoPreparedAt)
          : (parsed.lastPreparedAt ? String(parsed.lastPreparedAt) : null),
        mode: ["warm", "cheer", "calm"].includes(parsed.mode) ? parsed.mode : defaultState.mode,
        reviewedIds: Array.isArray(parsed.reviewedIds)
          ? parsed.reviewedIds.map((id) => String(id)).slice(-MAX_REVIEWED_IDS)
          : [],
        recentReplies: Array.isArray(parsed.recentReplies)
          ? parsed.recentReplies.map((item) => String(item)).slice(-MAX_RECENT_REPLIES)
          : []
      };
    } catch {
      return { ...defaultState };
    }
  }

  function persistState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function writeLog(message) {
    if (!logEl) return;

    const stamp = new Date().toLocaleTimeString();
    const line = `[${stamp}] ${message}`;
    if (!logEl.textContent || logEl.textContent === "로딩...") {
      logEl.textContent = line;
    } else {
      logEl.textContent += `\n${line}`;
    }
    logEl.scrollTop = logEl.scrollHeight;
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
})();
