const els = {
  scanButton: document.getElementById("scanButton"),
  refreshButton: document.getElementById("refreshButton"),
  clearLogButton: document.getElementById("clearLogButton"),
  autoRefreshToggle: document.getElementById("autoRefreshToggle"),
  statusFilter: document.getElementById("statusFilter"),
  cooldownInput: document.getElementById("cooldownInput"),
  limitSelect: document.getElementById("limitSelect"),
  summaryText: document.getElementById("summaryText"),
  lastUpdated: document.getElementById("lastUpdated"),
  candidateList: document.getElementById("candidateList"),
  logOutput: document.getElementById("logOutput"),
  template: document.getElementById("candidateTemplate"),
  badgeScanReady: document.getElementById("badgeScanReady"),
  badgeApproveReady: document.getElementById("badgeApproveReady"),
  badgeDryRun: document.getElementById("badgeDryRun")
};

const uiState = {
  loading: false,
  timerId: null,
  autoRefreshMs: 15_000,
  cooldownTouched: false
};

initialize().catch((error) => {
  appendLog(`[init error] ${normalizeError(error)}`);
});

async function initialize() {
  bindEvents();
  await refreshState();
  configureAutoRefresh();
}

function bindEvents() {
  els.scanButton.addEventListener("click", async () => {
    await runScan();
  });

  els.refreshButton.addEventListener("click", async () => {
    await refreshState();
  });

  els.clearLogButton.addEventListener("click", () => {
    els.logOutput.textContent = "";
  });

  els.statusFilter.addEventListener("change", async () => {
    await refreshState();
  });

  els.limitSelect.addEventListener("change", async () => {
    await refreshState();
  });

  els.cooldownInput.addEventListener("input", () => {
    uiState.cooldownTouched = true;
  });

  els.autoRefreshToggle.addEventListener("change", () => {
    configureAutoRefresh();
  });
}

function configureAutoRefresh() {
  if (uiState.timerId) {
    clearInterval(uiState.timerId);
    uiState.timerId = null;
  }

  if (!els.autoRefreshToggle.checked) {
    return;
  }

  uiState.timerId = setInterval(() => {
    if (!uiState.loading) {
      refreshState({ silent: true }).catch((error) => {
        appendLog(`[auto-refresh error] ${normalizeError(error)}`);
      });
    }
  }, uiState.autoRefreshMs);
}

async function runScan() {
  setBusy(true);
  try {
    appendLog("scan 시작...");
    const result = await requestJson("/api/xbot/scan", {
      method: "POST"
    });

    appendCommandLog("scan", result.command);
    await refreshState({ silent: true });
  } catch (error) {
    appendLog(`[scan error] ${normalizeError(error)}`);
  } finally {
    setBusy(false);
  }
}

async function refreshState(options = {}) {
  const { silent = false } = options;
  const status = els.statusFilter.value;
  const limit = Number(els.limitSelect.value || 100);

  if (!silent) {
    setBusy(true);
  }

  try {
    const query = new URLSearchParams({
      status,
      limit: String(limit)
    });

    const data = await requestJson(`/api/xbot/state?${query.toString()}`);
    syncCooldownInput(data.config);
    renderBadges(data.config);
    renderSummary({
      summary: data.summary,
      followingCount: data.followingCount,
      statusFilter: status,
      config: data.config,
      lastActionAt: data.lastActionAt,
      lastActionType: data.lastActionType,
      lastCooldownSeconds: data.lastCooldownSeconds
    });
    renderLastUpdated(data.updatedAt);
    renderCandidates(data.candidates || []);
  } catch (error) {
    appendLog(`[state error] ${normalizeError(error)}`);
  } finally {
    if (!silent) {
      setBusy(false);
    }
  }
}

function renderBadges(config = {}) {
  updateBadge(els.badgeScanReady, config.readyForScan, "scan 준비 완료", "scan 설정 필요");
  updateBadge(els.badgeApproveReady, config.readyForApprove, "approve 준비 완료", "approve 설정 필요");

  const isDryRun = Boolean(config.dryRun);
  els.badgeDryRun.textContent = isDryRun ? "dry-run: ON (실행 안 됨)" : "dry-run: OFF (실제 실행)";
  els.badgeDryRun.className = `badge ${isDryRun ? "warn" : "ok"}`;
}

function syncCooldownInput(config = {}) {
  const configuredCooldown = parseNonNegativeInt(config.approveCooldownSeconds, 45);
  if (!uiState.cooldownTouched || !String(els.cooldownInput.value || "").trim()) {
    els.cooldownInput.value = String(configuredCooldown);
  }
}

function updateBadge(element, isReady, readyLabel, notReadyLabel) {
  element.textContent = isReady ? readyLabel : notReadyLabel;
  element.className = `badge ${isReady ? "ok" : "danger"}`;
}

function renderSummary({
  summary = {},
  followingCount = 0,
  statusFilter = "all",
  config = {},
  lastActionAt = null,
  lastActionType = null,
  lastCooldownSeconds = null
}) {
  const configuredCooldown = parseNonNegativeInt(config.approveCooldownSeconds, 45);
  const effectiveCooldown = parseNonNegativeInt(lastCooldownSeconds, configuredCooldown);
  const remainingCooldown = computeRemainingCooldownSeconds(lastActionAt, effectiveCooldown);
  const cooldownText = remainingCooldown > 0
    ? `${effectiveCooldown}s (남은 ${remainingCooldown}s)`
    : `${configuredCooldown}s`;
  const actionText = lastActionAt ? `${lastActionType || "action"} @ ${formatDate(lastActionAt)}` : "-";

  els.summaryText.textContent = [
    `following ${followingCount}명`,
    `전체 ${summary.total ?? 0}`,
    `pending ${summary.pending ?? 0}`,
    `sent ${summary.sent ?? 0}`,
    `rejected ${summary.rejected ?? 0}`,
    `failed ${summary.failed ?? 0}`,
    `dry-run 승인 ${summary.approvedDryRun ?? 0}`,
    `쿨다운 ${cooldownText}`,
    `최근 실행 ${actionText}`,
    `필터: ${statusFilter}`
  ].join(" | ");
}

function renderLastUpdated(updatedAt) {
  if (!updatedAt) {
    els.lastUpdated.textContent = "업데이트 기록 없음";
    return;
  }
  els.lastUpdated.textContent = `마지막 업데이트: ${formatDate(updatedAt)}`;
}

function renderCandidates(candidates) {
  els.candidateList.innerHTML = "";

  if (!Array.isArray(candidates) || candidates.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "표시할 후보가 없습니다. scan을 실행해 후보를 생성하세요.";
    els.candidateList.append(empty);
    return;
  }

  const fragment = document.createDocumentFragment();
  for (const candidate of candidates) {
    fragment.append(buildCandidateCard(candidate));
  }
  els.candidateList.append(fragment);
}

function buildCandidateCard(candidate) {
  const node = els.template.content.firstElementChild.cloneNode(true);
  const id = String(candidate.id || "(no-id)");
  const status = String(candidate.status || "pending");

  const idEl = node.querySelector(".candidate-id");
  const metaEl = node.querySelector(".candidate-meta");
  const statusEl = node.querySelector(".status-pill");
  const postLinkEl = node.querySelector(".post-link");
  const postTextEl = node.querySelector(".post-text");
  const mediaSummaryEl = node.querySelector(".media-summary");
  const metricsEl = node.querySelector(".post-metrics");
  const replyInputEl = node.querySelector(".reply-input");
  const likeToggleEl = node.querySelector(".like-toggle");
  const approveBtnEl = node.querySelector(".btn-approve");
  const rejectBtnEl = node.querySelector(".btn-reject");

  const authorName = candidate.authorUsername
    ? `@${candidate.authorUsername}`
    : String(candidate.authorId || "unknown");

  idEl.textContent = id;
  metaEl.textContent = `${authorName} | ${formatDate(candidate.createdAtPost || candidate.createdAt)}`;
  statusEl.textContent = status;
  statusEl.classList.add(status);

  postLinkEl.href = String(candidate.postUrl || "https://x.com");
  postTextEl.textContent = String(candidate.postText || "");

  mediaSummaryEl.textContent = String(candidate.mediaSummary || "미디어 없음");
  const metrics = candidate.metrics || {};
  metricsEl.textContent = `좋아요 ${metrics.like_count ?? 0} / 리포스트 ${metrics.retweet_count ?? 0}`;

  replyInputEl.value = String(candidate.replyText || candidate.draftedReply || "");
  likeToggleEl.checked = candidate.suggestedLike !== false;

  const actionable = status === "pending";
  approveBtnEl.disabled = !actionable;
  rejectBtnEl.disabled = !actionable;
  replyInputEl.disabled = !actionable;
  likeToggleEl.disabled = !actionable;

  approveBtnEl.addEventListener("click", async () => {
    await approveCandidate({
      id,
      reply: replyInputEl.value,
      like: likeToggleEl.checked,
      button: approveBtnEl
    });
  });

  rejectBtnEl.addEventListener("click", async () => {
    const reason = window.prompt("거절 사유 (선택)", "") ?? "";
    await rejectCandidate({
      id,
      reason,
      button: rejectBtnEl
    });
  });

  return node;
}

async function approveCandidate({ id, reply, like, button }) {
  button.disabled = true;
  try {
    const cooldownSeconds = getCooldownInputSeconds();
    appendLog(`approve 시작: ${id}`);
    const result = await requestJson("/api/xbot/approve", {
      method: "POST",
      body: JSON.stringify({
        id,
        reply: String(reply || ""),
        like: Boolean(like),
        cooldownSeconds
      })
    });

    appendCommandLog(`approve ${id}`, result.command);
    await refreshState({ silent: true });
  } catch (error) {
    appendLog(`[approve error:${id}] ${normalizeError(error)}`);
  } finally {
    button.disabled = false;
  }
}

async function rejectCandidate({ id, reason, button }) {
  button.disabled = true;
  try {
    appendLog(`reject 시작: ${id}`);
    const result = await requestJson("/api/xbot/reject", {
      method: "POST",
      body: JSON.stringify({
        id,
        reason: String(reason || "")
      })
    });

    appendCommandLog(`reject ${id}`, result.command);
    await refreshState({ silent: true });
  } catch (error) {
    appendLog(`[reject error:${id}] ${normalizeError(error)}`);
  } finally {
    button.disabled = false;
  }
}

function appendCommandLog(title, command = {}) {
  appendLog(`[${title}] exit=${command.exitCode ?? "?"}`);
  if (command.stdout) appendLog(command.stdout);
  if (command.stderr) appendLog(command.stderr);
}

function appendLog(message) {
  const now = new Date().toLocaleTimeString();
  const line = `[${now}] ${message}`;
  if (!els.logOutput.textContent || els.logOutput.textContent === "대기 중...") {
    els.logOutput.textContent = line;
  } else {
    els.logOutput.textContent += `\n${line}`;
  }
  els.logOutput.scrollTop = els.logOutput.scrollHeight;
}

function setBusy(isBusy) {
  uiState.loading = isBusy;
  els.scanButton.disabled = isBusy;
  els.refreshButton.disabled = isBusy;
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const reason = data.error || `${response.status} ${response.statusText}`;
    const details = data.details ? ` | ${JSON.stringify(data.details)}` : "";
    throw new Error(`${reason}${details}`);
  }

  return data;
}

function formatDate(value) {
  if (!value) return "-";
  const ts = Date.parse(String(value));
  if (!Number.isFinite(ts)) return String(value);
  return new Date(ts).toLocaleString();
}

function normalizeError(error) {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

function parseNonNegativeInt(value, fallback) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) return fallback;
  return Math.floor(parsed);
}

function getCooldownInputSeconds() {
  const configured = parseNonNegativeInt(els.cooldownInput.value, 45);
  els.cooldownInput.value = String(configured);
  return configured;
}

function computeRemainingCooldownSeconds(lastActionAt, cooldownSeconds) {
  if (!lastActionAt || cooldownSeconds <= 0) return 0;
  const lastTs = Date.parse(String(lastActionAt));
  if (!Number.isFinite(lastTs)) return 0;
  const remain = cooldownSeconds - Math.floor((Date.now() - lastTs) / 1000);
  return Math.max(0, remain);
}
