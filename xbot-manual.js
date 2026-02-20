const STORAGE_KEY = "xbot_manual_items_v1";
const SETTINGS_KEY = "xbot_manual_settings_v1";
const MAX_RECENT_REPLIES = 180;

const els = {
  postUrlInput: document.getElementById("postUrlInput"),
  postTextInput: document.getElementById("postTextInput"),
  imageNotesInput: document.getElementById("imageNotesInput"),
  toneSelect: document.getElementById("toneSelect"),
  cooldownInput: document.getElementById("cooldownInput"),
  draftReplyInput: document.getElementById("draftReplyInput"),
  generateButton: document.getElementById("generateButton"),
  addButton: document.getElementById("addButton"),
  clearButton: document.getElementById("clearButton"),
  clearDoneButton: document.getElementById("clearDoneButton"),
  itemList: document.getElementById("itemList"),
  itemTemplate: document.getElementById("itemTemplate"),
  itemCount: document.getElementById("itemCount"),
  cooldownStatus: document.getElementById("cooldownStatus")
};

const state = {
  items: [],
  settings: {
    cooldownSeconds: 60,
    lastActionAt: null,
    recentReplies: []
  }
};

initialize();

function initialize() {
  loadState();
  render();
  bindEvents();
  startCooldownTicker();
}

function bindEvents() {
  els.generateButton.addEventListener("click", () => {
    const draft = createReplyDraft({
      text: els.postTextInput.value,
      imageNotes: els.imageNotesInput.value,
      tone: els.toneSelect.value
    });
    els.draftReplyInput.value = draft;
  });

  els.addButton.addEventListener("click", () => {
    const text = normalize(els.postTextInput.value);
    if (!text) {
      window.alert("글 내용을 먼저 입력해 주세요.");
      return;
    }

    const draft = normalize(els.draftReplyInput.value) || createReplyDraft({
      text,
      imageNotes: els.imageNotesInput.value,
      tone: els.toneSelect.value
    });

    const item = {
      id: buildItemId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "pending",
      url: normalize(els.postUrlInput.value),
      text,
      imageNotes: normalize(els.imageNotesInput.value),
      reply: draft,
      tone: els.toneSelect.value
    };

    state.items.unshift(item);
    persistState();
    render();
    clearForm(false);
  });

  els.clearButton.addEventListener("click", () => {
    clearForm(true);
  });

  els.clearDoneButton.addEventListener("click", () => {
    state.items = state.items.filter((item) => item.status !== "done");
    persistState();
    render();
  });

  els.cooldownInput.addEventListener("change", () => {
    state.settings.cooldownSeconds = getCooldownSecondsInput();
    persistState();
    renderCooldownStatus();
  });
}

function clearForm(resetDraft) {
  els.postUrlInput.value = "";
  els.postTextInput.value = "";
  els.imageNotesInput.value = "";
  if (resetDraft) {
    els.draftReplyInput.value = "";
  }
}

function render() {
  els.itemList.innerHTML = "";
  els.itemCount.textContent = `${state.items.length}개`;

  if (!state.items.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "후보가 없습니다. 글 내용을 넣고 후보에 추가해 주세요.";
    els.itemList.append(empty);
  } else {
    const fragment = document.createDocumentFragment();
    for (const item of state.items) {
      fragment.append(buildItemNode(item));
    }
    els.itemList.append(fragment);
  }

  els.cooldownInput.value = String(state.settings.cooldownSeconds);
  renderCooldownStatus();
}

function buildItemNode(item) {
  const node = els.itemTemplate.content.firstElementChild.cloneNode(true);

  const idEl = node.querySelector(".item-id");
  const metaEl = node.querySelector(".item-meta");
  const stateEl = node.querySelector(".state-pill");
  const linkEl = node.querySelector(".item-link");
  const textEl = node.querySelector(".item-text");
  const imageEl = node.querySelector(".item-image");
  const replyEl = node.querySelector(".item-reply");

  const likeBtn = node.querySelector(".btn-like");
  const replyBtn = node.querySelector(".btn-reply");
  const doneBtn = node.querySelector(".btn-done");
  const deleteBtn = node.querySelector(".btn-delete");

  idEl.textContent = item.id;
  metaEl.textContent = `${formatDate(item.createdAt)} | 톤: ${item.tone || "warm"}`;
  stateEl.textContent = item.status;
  stateEl.classList.add(item.status === "done" ? "done" : "pending");

  if (item.url) {
    linkEl.href = item.url;
    linkEl.textContent = "원문 열기";
  } else {
    linkEl.href = "https://x.com";
    linkEl.textContent = "링크 없음";
  }

  textEl.textContent = item.text;
  imageEl.textContent = item.imageNotes ? `이미지 메모: ${item.imageNotes}` : "이미지 메모 없음";
  replyEl.value = item.reply || "";

  const canAct = item.status !== "done";
  likeBtn.disabled = !canAct;
  replyBtn.disabled = !canAct;

  replyEl.addEventListener("change", () => {
    updateItem(item.id, {
      reply: normalize(replyEl.value),
      updatedAt: new Date().toISOString()
    });
  });

  likeBtn.addEventListener("click", () => {
    const tweetId = extractTweetId(item.url);
    if (!tweetId) {
      window.alert("좋아요를 열려면 트윗 링크(status/숫자)가 필요합니다.");
      return;
    }

    if (!checkAndConsumeCooldown()) {
      return;
    }

    window.open(`https://x.com/intent/like?tweet_id=${encodeURIComponent(tweetId)}`, "_blank", "noopener");
  });

  replyBtn.addEventListener("click", () => {
    const text = normalize(replyEl.value);
    if (!text) {
      window.alert("댓글 내용을 먼저 입력해 주세요.");
      return;
    }

    if (!checkAndConsumeCooldown()) {
      return;
    }

    const tweetId = extractTweetId(item.url);
    const intentUrl = tweetId
      ? `https://x.com/intent/tweet?in_reply_to=${encodeURIComponent(tweetId)}&text=${encodeURIComponent(text)}`
      : `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;

    window.open(intentUrl, "_blank", "noopener");
  });

  doneBtn.addEventListener("click", () => {
    updateItem(item.id, {
      status: item.status === "done" ? "pending" : "done",
      updatedAt: new Date().toISOString()
    });
    render();
  });

  doneBtn.textContent = item.status === "done" ? "다시 열기" : "완료";

  deleteBtn.addEventListener("click", () => {
    const ok = window.confirm("이 후보를 삭제할까요?");
    if (!ok) return;
    state.items = state.items.filter((candidate) => candidate.id !== item.id);
    persistState();
    render();
  });

  return node;
}

function updateItem(id, patch) {
  const idx = state.items.findIndex((item) => item.id === id);
  if (idx === -1) return;
  state.items[idx] = {
    ...state.items[idx],
    ...patch
  };
  persistState();
}

function checkAndConsumeCooldown() {
  const cooldown = getCooldownSecondsInput();
  const remaining = getRemainingCooldownSeconds(cooldown);
  if (remaining > 0) {
    window.alert(`쿨다운 중입니다. ${remaining}초 후 다시 시도하세요.`);
    return false;
  }

  state.settings.lastActionAt = new Date().toISOString();
  state.settings.cooldownSeconds = cooldown;
  persistState();
  renderCooldownStatus();
  return true;
}

function renderCooldownStatus() {
  const cooldown = state.settings.cooldownSeconds;
  const remaining = getRemainingCooldownSeconds(cooldown);
  if (cooldown <= 0) {
    els.cooldownStatus.textContent = "쿨다운 OFF";
    return;
  }

  if (remaining > 0) {
    els.cooldownStatus.textContent = `쿨다운 ${cooldown}s (남은 ${remaining}s)`;
  } else {
    els.cooldownStatus.textContent = `쿨다운 ${cooldown}s 준비됨`;
  }
}

function startCooldownTicker() {
  setInterval(() => {
    renderCooldownStatus();
  }, 1000);
}

function getRemainingCooldownSeconds(cooldown) {
  if (cooldown <= 0) return 0;
  const lastTs = Date.parse(String(state.settings.lastActionAt || ""));
  if (!Number.isFinite(lastTs)) return 0;
  const elapsed = Math.floor((Date.now() - lastTs) / 1000);
  return Math.max(0, cooldown - elapsed);
}

function getCooldownSecondsInput() {
  const raw = Number(els.cooldownInput.value);
  const safe = Number.isFinite(raw) && raw >= 0 ? Math.floor(raw) : state.settings.cooldownSeconds;
  els.cooldownInput.value = String(safe);
  return safe;
}

function createReplyDraft({ text, imageNotes, tone }) {
  const normalizedText = normalize(stripUrls(text));
  const normalizedImage = normalize(imageNotes);
  const context = analyzeDraftContext(normalizedText, normalizedImage);
  const seed = `${normalizedText}|${normalizedImage}|${tone}|${Date.now()}|${Math.random()}`;
  const raw = buildKoreanDraft(context, tone, seed);
  return finalizeReplyOutput(raw, context, seed);
}

function analyzeDraftContext(text, imageNotes) {
  const combined = normalize(`${text} ${imageNotes}`);
  const lower = combined.toLowerCase();

  const hasCongrats = hasAny(lower, [
    "축하", "성공", "완료", "오픈", "런칭", "합격", "우승",
    "congrats", "congrat", "success", "release", "launched", "shipped", "won", "passed"
  ]);
  const hasHard = hasAny(lower, [
    "힘들", "지치", "고민", "어렵", "실패", "스트레스", "걱정",
    "hard", "tired", "rough", "struggle", "burnout", "stressed"
  ]);
  const hasQuestion = /\?/.test(text) || hasAny(lower, [
    "어떻게", "추천", "의견", "질문", "help", "advice", "how", "what", "which"
  ]);
  const hasGaza = hasAny(lower, ["가즈아", "gazua"]);
  const hasMedia = Boolean(imageNotes);
  const lang = /[가-힣]/.test(combined) ? "ko" : "en";
  const foodHint = extractFoodHint(text, imageNotes);
  const topic = inferTopic(lower, foodHint);

  return {
    text,
    imageNotes,
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
  if (hasAny(lower, [
    "single inferno", "singleinferno", "singles inferno", "singlesinferno", "singlesinferno5",
    "single inferno s5", "single inferno season 5", "솔로지옥", "솔로 지옥", "솔로지옥5",
    "kdramahotgists"
  ])) return "single_inferno";
  if (hasAny(lower, [
    "stock", "stocks", "share", "shares", "equity", "holding", "holdings", "blackrock", "nasdaq",
    "주식", "종목", "지분", "보유", "매수", "매도", "시총", "기업", "블랙록", "투자"
  ])) return "finance";
  if (foodHint || hasFoodSignal(lower)) return "food";
  if (hasAny(lower, [
    "travel", "trip", "vacation", "dubai", "beach", "resort", "hotel", "island", "flight",
    "여행", "휴가", "바다", "도시", "풍경", "야경"
  ])) return "travel";
  if (hasAny(lower, [
    "nature", "forest", "mountain", "flower", "sunset", "sunrise", "ocean", "tree",
    "자연", "숲", "산", "꽃", "노을", "일출", "바람", "공원"
  ])) return "nature";
  if (hasAny(lower, [
    "build", "project", "release", "launch", "startup", "product", "code", "app", "dev",
    "프로젝트", "개발", "배포", "출시", "앱", "서비스", "기능"
  ])) return "work";
  if (hasAny(lower, [
    "dog", "cat", "pet", "puppy", "kitten", "반려", "강아지", "고양이"
  ])) return "pet";
  if (hasAny(lower, [
    "music", "song", "concert", "guitar", "piano", "노래", "음악", "공연", "연주"
  ])) return "music";
  if (hasAny(lower, [
    "golf", "fairway", "birdie", "bogey", "eagle", "hole in one", "tee shot", "teeshot",
    "putting", "driver", "golf swing",
    "골프", "라운딩", "티샷", "버디", "이글", "홀인원", "퍼팅", "드라이버", "굿샷"
  ])) return "golf";
  return "general";
}

function buildKoreanDraft(context, tone, seed) {
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

  const line1 = pickVariant(getKoreanOpenings(context, tone), seed, "ko-line1");
  const line2Pool = [
    ...getKoreanDetails(context, tone),
    ...getKoreanClosings(context, tone)
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
  return hasAny(context.lower, [
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
  const emphasize = hasAny(low, [
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
  const recent = Array.isArray(state.settings.recentReplies) ? state.settings.recentReplies : [];
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
  if (!Array.isArray(state.settings.recentReplies)) {
    state.settings.recentReplies = [];
  }
  state.settings.recentReplies.push(normalized);
  if (state.settings.recentReplies.length > MAX_RECENT_REPLIES) {
    state.settings.recentReplies = state.settings.recentReplies.slice(state.settings.recentReplies.length - MAX_RECENT_REPLIES);
  }
  persistState();
}

function buildKoreanCityPhotoShort(context, seed) {
  if (hasAny(context.lower, ["greece", "그리스"])) {
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
  if (hasAny(context.lower, ["blackrock", "블랙록"])) {
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

function getKoreanOpenings(context, tone) {
  if (tone === "cheer") {
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

  if (tone === "calm") {
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

function getKoreanDetails(context, tone) {
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

function getKoreanClosings(context, tone) {
  if (context.hasQuestion) return [
    "나중에 결론 나오면 궁금하네요..",
    "어떻게 흘러갈지 궁금하네요..",
    "흐름이 궁금하네요.."
  ];
  if (tone === "cheer") return [
    "다음 소식도 은근 기대되네요..",
    "이 흐름 계속 가면 좋겠네요..",
    "뭔가 좋은 쪽 느낌입니다.."
  ];
  if (tone === "calm") return [
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

function buildEnglishDraft(context, tone, seed) {
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

  const tail = pickVariant([...new Set(tails)], seed, "casual-tail-value");
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

  if (hasAny(source, [
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

function truncate(text, maxLength) {
  const value = String(text || "");
  if (value.length <= maxLength) return value;
  return `${value.slice(0, Math.max(0, maxLength - 1)).trim()}…`;
}

function hasAny(text, words) {
  return words.some((word) => text.includes(word));
}

function stripUrls(text) {
  return String(text).replace(/https?:\/\/\S+/g, " ");
}

function extractTweetId(url) {
  const raw = normalize(url);
  if (!raw) return null;
  const match = raw.match(/\/status\/(\d+)/i);
  return match ? match[1] : null;
}

function normalize(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function buildItemId() {
  return `m_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}

function formatDate(value) {
  const ts = Date.parse(String(value || ""));
  if (!Number.isFinite(ts)) return "-";
  return new Date(ts).toLocaleString();
}

function loadState() {
  try {
    const itemsRaw = localStorage.getItem(STORAGE_KEY);
    const parsedItems = itemsRaw ? JSON.parse(itemsRaw) : [];
    if (Array.isArray(parsedItems)) {
      state.items = parsedItems;
    }
  } catch {
    state.items = [];
  }

  try {
    const settingsRaw = localStorage.getItem(SETTINGS_KEY);
    const parsedSettings = settingsRaw ? JSON.parse(settingsRaw) : null;
    if (parsedSettings && typeof parsedSettings === "object") {
      state.settings.cooldownSeconds = Number.isFinite(Number(parsedSettings.cooldownSeconds))
        ? Math.max(0, Math.floor(Number(parsedSettings.cooldownSeconds)))
        : state.settings.cooldownSeconds;
      state.settings.lastActionAt = parsedSettings.lastActionAt || null;
      state.settings.recentReplies = Array.isArray(parsedSettings.recentReplies)
        ? parsedSettings.recentReplies.map((item) => String(item)).slice(-MAX_RECENT_REPLIES)
        : state.settings.recentReplies;
    }
  } catch {
    // noop
  }
}

function persistState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings));
}
