const STORAGE_KEY = "gomdori-math:profile";
const AUTH_STORAGE_KEY = "gomdori-math:auth";
const TARGET_QUESTIONS = 10;
const API_BASE = "";
const GOOGLE_CLIENT_ID = "160808232856-3c351j191uocqiailplgha2pnf2qtdam.apps.googleusercontent.com";
const GOOGLE_GSI_SRC = "https://accounts.google.com/gsi/client";

const OPERATIONS = {
  add: { key: "add", label: "더하기", symbol: "+" },
  subtract: { key: "subtract", label: "빼기", symbol: "-" },
  multiply: { key: "multiply", label: "곱하기", symbol: "×" },
  divide: { key: "divide", label: "나누기", symbol: "÷" },
  mix: { key: "mix", label: "랜덤 4연산", symbol: "🎲" }
};

const LEVELS = {
  easy: { key: "easy", label: "쉬움", addMax: 10, mulMax: 5 },
  medium: { key: "medium", label: "보통", addMax: 30, mulMax: 9 },
  hard: { key: "hard", label: "도전", addMax: 99, mulMax: 12 }
};

const THEMES = {
  red: { key: "red", label: "빨강" },
  orange: { key: "orange", label: "주황" },
  yellow: { key: "yellow", label: "노랑" },
  green: { key: "green", label: "초록" },
  blue: { key: "blue", label: "파랑" },
  purple: { key: "purple", label: "보라" },
  pink: { key: "pink", label: "핑크" }
};

const THEME_KEYS = Object.keys(THEMES);
const NICKNAME_PATTERN = /^[A-Za-z0-9가-힣_]{2,12}$/;

const POSITIVE_FEEDBACK = [
  "곰돌이 선생님이 박수 치고 있어!",
  "완벽해! 계산 감각이 정말 좋아.",
  "아주 좋아! 다음 문제도 가보자.",
  "맞았어! 오늘 집중력이 최고야."
];

const ENCOURAGE_FEEDBACK = [
  "괜찮아, 다시 보면 금방 맞힐 수 있어.",
  "좋아, 힌트 한 번 보고 다시 도전해보자.",
  "실수는 배움이야. 다음 문제에서 만회하자."
];

const TAB_STORAGE_KEY = "gomdori-math:tab";
const CURRENT_ORIGIN = window.location.origin;
const ENGLISH_PHASES = {
  WORD: "word",
  SPEAKING: "speaking"
};
const ENGLISH_SPEAK_ACTIONS = {
  START: "start",
  RECORD: "record",
  NEXT: "next"
};
const ENGLISH_TOTAL_QUESTIONS = TARGET_QUESTIONS * 2;
const ENGLISH_LESSONS = [
  { korean: "사과", english: "apple", sentence: "I eat an apple." },
  { korean: "바나나", english: "banana", sentence: "This banana is sweet." },
  { korean: "포도", english: "grape", sentence: "I like purple grapes." },
  { korean: "딸기", english: "strawberry", sentence: "The strawberry is red." },
  { korean: "복숭아", english: "peach", sentence: "I have a peach." },
  { korean: "오렌지", english: "orange", sentence: "The orange smells good." },
  { korean: "학교", english: "school", sentence: "We go to school." },
  { korean: "교실", english: "classroom", sentence: "Our classroom is clean." },
  { korean: "선생님", english: "teacher", sentence: "My teacher is kind." },
  { korean: "학생", english: "student", sentence: "He is a good student." },
  { korean: "친구", english: "friend", sentence: "She is my best friend." },
  { korean: "가족", english: "family", sentence: "I love my family." },
  { korean: "엄마", english: "mother", sentence: "My mother cooks well." },
  { korean: "아빠", english: "father", sentence: "My father reads a book." },
  { korean: "언니/누나", english: "sister", sentence: "My sister can sing." },
  { korean: "형/오빠/남동생", english: "brother", sentence: "My brother plays soccer." },
  { korean: "책", english: "book", sentence: "This book is fun." },
  { korean: "공책", english: "notebook", sentence: "I write in my notebook." },
  { korean: "연필", english: "pencil", sentence: "I need a new pencil." },
  { korean: "지우개", english: "eraser", sentence: "Use the eraser, please." },
  { korean: "가방", english: "bag", sentence: "My bag is heavy." },
  { korean: "책상", english: "desk", sentence: "The desk is by the window." },
  { korean: "의자", english: "chair", sentence: "Sit on the chair." },
  { korean: "컴퓨터", english: "computer", sentence: "The computer is on." },
  { korean: "전화기", english: "phone", sentence: "My phone is in my bag." },
  { korean: "물", english: "water", sentence: "Please give me water." },
  { korean: "우유", english: "milk", sentence: "I drink milk every day." },
  { korean: "주스", english: "juice", sentence: "Apple juice is my favorite." },
  { korean: "빵", english: "bread", sentence: "I eat bread for breakfast." },
  { korean: "쌀", english: "rice", sentence: "We eat rice at home." },
  { korean: "수프", english: "soup", sentence: "The soup is hot." },
  { korean: "아침", english: "morning", sentence: "Good morning, everyone." },
  { korean: "오후", english: "afternoon", sentence: "Good afternoon, class." },
  { korean: "저녁", english: "evening", sentence: "Good evening, teacher." },
  { korean: "밤", english: "night", sentence: "Good night, mom." },
  { korean: "행복한", english: "happy", sentence: "I am happy today." },
  { korean: "슬픈", english: "sad", sentence: "He looks sad now." },
  { korean: "신나는", english: "excited", sentence: "I am excited for the trip." },
  { korean: "피곤한", english: "tired", sentence: "She is tired after school." },
  { korean: "작은", english: "small", sentence: "It is a small cat." },
  { korean: "큰", english: "big", sentence: "That is a big tree." },
  { korean: "빠른", english: "fast", sentence: "The rabbit is fast." },
  { korean: "느린", english: "slow", sentence: "The turtle is slow." },
  { korean: "빨간", english: "red", sentence: "My hat is red." },
  { korean: "노란", english: "yellow", sentence: "The sun is yellow." },
  { korean: "초록", english: "green", sentence: "The leaves are green." },
  { korean: "파란", english: "blue", sentence: "The sky is blue." },
  { korean: "보라", english: "purple", sentence: "I have a purple pen." },
  { korean: "검은", english: "black", sentence: "The cat is black." },
  { korean: "하얀", english: "white", sentence: "The cloud is white." },
  { korean: "고양이", english: "cat", sentence: "The cat is cute." },
  { korean: "강아지", english: "dog", sentence: "The dog is running." },
  { korean: "새", english: "bird", sentence: "A bird is flying." },
  { korean: "물고기", english: "fish", sentence: "The fish can swim." },
  { korean: "토끼", english: "rabbit", sentence: "The rabbit jumps high." },
  { korean: "곰", english: "bear", sentence: "The bear likes honey." },
  { korean: "사자", english: "lion", sentence: "The lion is strong." },
  { korean: "호랑이", english: "tiger", sentence: "The tiger is in the zoo." },
  { korean: "공원", english: "park", sentence: "We play in the park." },
  { korean: "도서관", english: "library", sentence: "I read at the library." },
  { korean: "병원", english: "hospital", sentence: "She works at a hospital." },
  { korean: "시장", english: "market", sentence: "We buy fruit at the market." },
  { korean: "정류장", english: "station", sentence: "I wait at the station." },
  { korean: "버스", english: "bus", sentence: "The bus is yellow." },
  { korean: "기차", english: "train", sentence: "The train is very long." },
  { korean: "비행기", english: "airplane", sentence: "The airplane is in the sky." },
  { korean: "걷다", english: "walk", sentence: "I walk to school." },
  { korean: "달리다", english: "run", sentence: "They run in the field." },
  { korean: "읽다", english: "read", sentence: "I read a story." },
  { korean: "쓰다", english: "write", sentence: "Please write your name." },
  { korean: "듣다", english: "listen", sentence: "Listen to your teacher." },
  { korean: "말하다", english: "speak", sentence: "Speak slowly, please." },
  { korean: "노래하다", english: "sing", sentence: "We sing a song." },
  { korean: "춤추다", english: "dance", sentence: "She can dance well." },
  { korean: "놀다", english: "play", sentence: "The kids play outside." },
  { korean: "공부하다", english: "study", sentence: "I study English every day." },
  { korean: "청소하다", english: "clean", sentence: "Let's clean the room." },
  { korean: "열다", english: "open", sentence: "Open the window, please." },
  { korean: "닫다", english: "close", sentence: "Close the door, please." },
  { korean: "도와주다", english: "help", sentence: "Can you help me?" },
  { korean: "미소 짓다", english: "smile", sentence: "Please smile for the photo." }
];

const SUBJECT_COPY = {
  math: {
    title: "곰돌이 수학",
    subtitle: "곰돌이 선생님과 더하기, 빼기, 곱하기, 나누기를 재미있게 연습해요.",
    bearMessage: "안녕! 난 곰돌이 선생님이야. 오늘도 즐겁게 수학 문제 풀어볼까?"
  },
  english: {
    title: "곰돌이 영어",
    subtitle: "곰돌이 선생님과 단어, 말하기 미션으로 영어를 재미있게 연습해요.",
    bearMessage: "안녕! 난 곰돌이 선생님이야. 오늘도 즐겁게 영어 문제 풀어볼까?"
  }
};

const els = {
  subjectTabs: Array.from(document.querySelectorAll("[data-subject]")),
  mathViews: Array.from(document.querySelectorAll(".math-view")),
  englishViews: Array.from(document.querySelectorAll(".english-view")),
  heroTitle: document.querySelector("#heroTitle"),
  heroSubtitle: document.querySelector("#heroSubtitle"),

  operationButtons: Array.from(document.querySelectorAll("[data-operation]")),
  levelButtons: Array.from(document.querySelectorAll("[data-level]")),
  themeButtons: Array.from(document.querySelectorAll("[data-theme]")),

  startBtn: document.querySelector("#startBtn"),
  submitBtn: document.querySelector("#submitBtn"),
  hintBtn: document.querySelector("#hintBtn"),
  nextBtn: document.querySelector("#nextBtn"),
  retryWrongBtn: document.querySelector("#retryWrongBtn"),
  answerInput: document.querySelector("#answerInput"),

  questionCount: document.querySelector("#questionCount"),
  modePill: document.querySelector("#modePill"),
  equation: document.querySelector("#equation"),
  feedback: document.querySelector("#feedback"),
  feedbackText: document.querySelector("#feedbackText"),
  feedbackBear: document.querySelector("#feedbackBear"),

  bearAvatar: document.querySelector("#bearAvatar"),
  bearMessage: document.querySelector("#bearMessage"),
  themePicker: document.querySelector("#themePicker"),

  dailyCorrect: document.querySelector("#dailyCorrect"),
  sessionStreak: document.querySelector("#sessionStreak"),
  bestStreak: document.querySelector("#bestStreak"),
  accuracy: document.querySelector("#accuracy"),
  progressFill: document.querySelector("#progressFill"),
  progressText: document.querySelector("#progressText"),
  progressBar: document.querySelector(".progress-bar"),
  stickerShelf: document.querySelector("#stickerShelf"),
  stickerGuide: document.querySelector("#stickerGuide"),

  authStatus: document.querySelector("#authStatus"),
  authUser: document.querySelector("#authUser"),
  authAvatar: document.querySelector("#authAvatar"),
  authName: document.querySelector("#authName"),
  authEmail: document.querySelector("#authEmail"),
  logoutBtn: document.querySelector("#logoutBtn"),
  googleSignInWrap: document.querySelector("#googleSignInWrap"),
  nicknameSection: document.querySelector("#nicknameSection"),
  nicknameInput: document.querySelector("#nicknameInput"),
  saveNicknameBtn: document.querySelector("#saveNicknameBtn"),
  nicknameNote: document.querySelector("#nicknameNote"),

  refreshRankingBtn: document.querySelector("#refreshRankingBtn"),
  refreshEnglishRankingBtn: document.querySelector("#refreshEnglishRankingBtn"),
  rankingList: document.querySelector("#rankingList"),
  englishRankingList: document.querySelector("#englishRankingList"),

  englishStartBtn: document.querySelector("#englishStartBtn"),
  englishQuestionCount: document.querySelector("#englishQuestionCount"),
  englishPrompt: document.querySelector("#englishPrompt"),
  englishModePill: document.querySelector("#englishModePill"),
  englishOptions: document.querySelector("#englishOptions"),
  englishNextBtn: document.querySelector("#englishNextBtn"),
  englishSpeakActionBtn: document.querySelector("#englishSpeakActionBtn"),
  englishSpeakReplayBtn: document.querySelector("#englishSpeakReplayBtn"),
  englishSpeakOffBtn: document.querySelector("#englishSpeakOffBtn"),
  englishFeedback: document.querySelector("#englishFeedback"),
  englishFeedbackBear: document.querySelector("#englishFeedbackBear"),
  englishFeedbackText: document.querySelector("#englishFeedbackText"),
  englishSpeakTarget: document.querySelector("#englishSpeakTarget"),
  englishTranscript: document.querySelector("#englishTranscript"),
  englishSpeakFeedback: document.querySelector("#englishSpeakFeedback"),
  englishCorrect: document.querySelector("#englishCorrect"),
  englishStreak: document.querySelector("#englishStreak"),
  englishBestStreak: document.querySelector("#englishBestStreak"),
  englishAccuracy: document.querySelector("#englishAccuracy"),
  englishVoiceSupport: document.querySelector("#englishVoiceSupport")
};

const state = {
  operation: "add",
  level: "easy",
  sessionActive: false,
  sessionStartedAt: 0,
  questionNumber: 0,
  answered: false,
  currentQuestion: null,
  sessionCorrect: 0,
  sessionWrong: 0,
  sessionStreak: 0,
  sessionBestStreak: 0,
  wrongQuestions: [],
  reviewMode: false,
  reviewQueue: [],
  themePickerOpen: false,
  rankingCorrect: null,
  englishRankingCorrect: null,
  subject: "math"
};

const authState = {
  token: "",
  user: null,
  googleReady: false
};

const englishState = {
  sessionActive: false,
  sessionStartedAt: 0,
  phase: ENGLISH_PHASES.WORD,
  questionNumber: 0,
  correct: 0,
  wrong: 0,
  wordCorrect: 0,
  wordWrong: 0,
  speakingCorrect: 0,
  speakingWrong: 0,
  streak: 0,
  bestStreak: 0,
  answered: false,
  current: null,
  speakingAction: ENGLISH_SPEAK_ACTIONS.START,
  usedWordLessonIndexes: new Set(),
  usedSpeakingLessonIndexes: new Set(),
  recognition: null,
  recognizing: false
};

let googleScriptLoadPromise = null;

let profile = loadProfile();

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getDateKey() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function getApiUrl(path) {
  return `${API_BASE}${path}`;
}

function createDefaultProfile() {
  return {
    dateKey: getDateKey(),
    dailySolved: 0,
    dailyCorrect: 0,
    lifetimeSolved: 0,
    lifetimeCorrect: 0,
    bestStreak: 0,
    lastOperation: "add",
    lastLevel: "easy",
    theme: "pink"
  };
}

function loadProfile() {
  const defaults = createDefaultProfile();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return defaults;

    const merged = {
      ...defaults,
      ...parsed
    };

    if (merged.dateKey !== defaults.dateKey) {
      merged.dateKey = defaults.dateKey;
      merged.dailySolved = 0;
      merged.dailyCorrect = 0;
    }

    if (!THEME_KEYS.includes(merged.theme)) {
      merged.theme = defaults.theme;
    }

    return merged;
  } catch {
    return defaults;
  }
}

function saveProfile() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

function loadAuthState() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return { token: "", user: null };

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return { token: "", user: null };
    }

    return {
      token: String(parsed.token || ""),
      user: parsed.user && typeof parsed.user === "object" ? parsed.user : null
    };
  } catch {
    return { token: "", user: null };
  }
}

function saveAuthState() {
  localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({
      token: authState.token,
      user: authState.user
    })
  );
}

function clearAuthState() {
  authState.token = "";
  authState.user = null;
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

function loadTabPreference() {
  try {
    const saved = String(localStorage.getItem(TAB_STORAGE_KEY) || "").trim();
    return saved === "english" ? "english" : "math";
  } catch {
    return "math";
  }
}

function saveTabPreference(tabKey) {
  try {
    localStorage.setItem(TAB_STORAGE_KEY, tabKey);
  } catch {
    // Ignore storage failures.
  }
}

function applySubjectCopy(subjectKey) {
  const copy = SUBJECT_COPY[subjectKey] || SUBJECT_COPY.math;
  if (els.heroTitle) {
    els.heroTitle.textContent = copy.title;
  }
  if (els.heroSubtitle) {
    els.heroSubtitle.textContent = copy.subtitle;
  }
  if (els.bearMessage) {
    els.bearMessage.textContent = copy.bearMessage;
  }
}

function setSubjectTab(tabKey, options = {}) {
  const { persist = true } = options;
  const safeTab = tabKey === "english" ? "english" : "math";
  state.subject = safeTab;

  setActive(els.subjectTabs, "subject", safeTab);
  els.mathViews.forEach((element) => {
    element.classList.toggle("hidden", safeTab !== "math");
  });
  els.englishViews.forEach((element) => {
    element.classList.toggle("hidden", safeTab !== "english");
  });
  applySubjectCopy(safeTab);
  document.title = "곰돌이 선생님";

  if (safeTab !== "english") {
    stopEnglishRecognition();
  }

  if (safeTab === "english" && !englishState.sessionActive && !englishState.current) {
    renderEnglishIdle();
  }

  if (persist) {
    saveTabPreference(safeTab);
  }
}

function setActive(buttons, attrName, value) {
  buttons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset[attrName] === value);
  });
}

function setThemePicker(open) {
  state.themePickerOpen = open;
  els.themePicker.classList.toggle("hidden", !open);
  els.bearAvatar.setAttribute("aria-expanded", String(open));
}

function applyTheme(themeKey, options = {}) {
  const { persist = true } = options;
  const safeTheme = THEME_KEYS.includes(themeKey) ? themeKey : "pink";

  document.body.dataset.theme = safeTheme;
  setActive(els.themeButtons, "theme", safeTheme);

  if (profile.theme !== safeTheme) {
    profile.theme = safeTheme;
    if (persist) saveProfile();
  }
}

async function saveThemeToDb(themeKey) {
  if (!authState.user || !authState.token) {
    return { ok: false, reason: "not-logged-in" };
  }

  try {
    const response = await fetch(getApiUrl("/api/math/profile/theme"), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState.token}`
      },
      body: JSON.stringify({ theme: themeKey })
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => ({ error: "failed to save theme" }));
      throw new Error(payload.error || "failed to save theme");
    }

    const payload = await response.json();
    if (payload?.user && typeof payload.user === "object") {
      authState.user = payload.user;
      saveAuthState();
    }

    return { ok: true };
  } catch (error) {
    console.error("saveThemeToDb failed", error);
    return { ok: false, reason: "request-failed" };
  }
}

async function saveNicknameToDb(nickname) {
  if (!authState.user || !authState.token) {
    return { ok: false, reason: "not-logged-in" };
  }

  try {
    const response = await fetch(getApiUrl("/api/math/profile/nickname"), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState.token}`
      },
      body: JSON.stringify({ nickname })
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => ({ error: "failed to save nickname" }));
      return {
        ok: false,
        reason: "request-failed",
        status: response.status,
        message: payload.error || "failed to save nickname"
      };
    }

    const payload = await response.json();
    if (payload?.user && typeof payload.user === "object") {
      authState.user = payload.user;
      saveAuthState();
    }

    return { ok: true };
  } catch (error) {
    console.error("saveNicknameToDb failed", error);
    return { ok: false, reason: "request-failed", message: "failed to save nickname" };
  }
}

function setBear(mood, message) {
  els.bearAvatar.dataset.mood = mood;
  els.bearMessage.textContent = message;
  els.feedback.dataset.mood = mood;
  els.feedbackBear.dataset.mood = mood;
  if (els.englishFeedback) {
    els.englishFeedback.dataset.mood = mood;
  }
  if (els.englishFeedbackBear) {
    els.englishFeedbackBear.dataset.mood = mood;
  }
}

function setFeedback(message) {
  els.feedbackText.textContent = `곰돌이 선생님: ${message}`;
}

function setAuthStatus(message) {
  els.authStatus.textContent = message;
}

function renderGoogleFallbackButton() {
  els.googleSignInWrap.classList.remove("hidden");
  els.googleSignInWrap.innerHTML = `
    <button class="btn btn-ghost" id="retryGoogleLoginBtn" type="button">
      Google 계정으로 로그인
    </button>
    <p class="google-help">
      버튼이 안 보이면 광고/추적 차단 확장 기능을 잠시 끄고 다시 시도해 주세요.
    </p>
  `;
}

function hasVisibleGoogleButtonDom() {
  if (!els.googleSignInWrap) return false;

  const candidates = Array.from(
    els.googleSignInWrap.querySelectorAll("iframe, [role='button'], .nsm7Bb-HzV7m-LgbsSe, div[aria-labelledby]")
  );

  return candidates.some((element) => {
    if (!(element instanceof HTMLElement)) return false;

    const style = window.getComputedStyle(element);
    if (style.display === "none") return false;
    if (style.visibility === "hidden") return false;
    if (Number(style.opacity || "1") === 0) return false;

    const rect = element.getBoundingClientRect();
    return rect.width >= 120 && rect.height >= 28;
  });
}

function verifyGoogleButtonVisible(retry = 0) {
  if (authState.user) return;

  if (hasVisibleGoogleButtonDom()) return;

  if (retry < 6) {
    setTimeout(() => verifyGoogleButtonVisible(retry + 1), 450);
    return;
  }

  renderGoogleFallbackButton();
  setAuthStatus("Google 로그인 버튼이 보이지 않아요. 아래 버튼으로 다시 시도해 주세요.");
}

function ensureGoogleScriptLoaded(forceReload = false) {
  if (window.google?.accounts?.id && !forceReload) {
    return Promise.resolve(true);
  }

  if (forceReload) {
    googleScriptLoadPromise = null;
    const scripts = Array.from(document.querySelectorAll("script[src*='accounts.google.com/gsi/client']"));
    scripts.forEach((script) => script.remove());
  }

  if (googleScriptLoadPromise) {
    return googleScriptLoadPromise;
  }

  googleScriptLoadPromise = new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = GOOGLE_GSI_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      resolve(Boolean(window.google?.accounts?.id));
    };
    script.onerror = () => {
      resolve(false);
    };
    document.head.appendChild(script);
  });

  return googleScriptLoadPromise;
}

function setNicknameNote(message, isError = false) {
  els.nicknameNote.textContent = message;
  els.nicknameNote.classList.toggle("is-error", isError);
}

function renderRanking(listElement, items = []) {
  if (!listElement) return;

  listElement.innerHTML = "";

  if (!Array.isArray(items) || items.length === 0) {
    const empty = document.createElement("li");
    empty.className = "ranking-empty";
    empty.textContent = "아직 랭킹 데이터가 없어요. 첫 라운드의 주인공이 되어봐요!";
    listElement.appendChild(empty);
    return;
  }

  items.forEach((item, index) => {
    const rankNumber = index + 1;
    const li = document.createElement("li");
    li.className = "ranking-item";

    if (authState.user && item.userId === authState.user.id) {
      li.classList.add("is-me");
    }

    const rank = document.createElement("span");
    rank.className = "ranking-rank";
    rank.textContent = rankNumber <= 3 ? ["🥇", "🥈", "🥉"][rankNumber - 1] : String(rankNumber);

    const name = document.createElement("span");
    name.className = "ranking-name";
    name.textContent = String(item.displayName || "곰친구");

    const score = document.createElement("span");
    score.className = "ranking-score";
    score.textContent = `${Number(item.totalCorrect || 0)}점`;

    li.appendChild(rank);
    li.appendChild(name);
    li.appendChild(score);

    listElement.appendChild(li);
  });
}

async function fetchMathRankings(limit = 10) {
  try {
    const response = await fetch(getApiUrl(`/api/math/rankings?limit=${encodeURIComponent(limit)}`));
    if (!response.ok) {
      throw new Error("failed to fetch math rankings");
    }

    const payload = await response.json();
    return Array.isArray(payload.items) ? payload.items : [];
  } catch (error) {
    console.error("fetchMathRankings failed", error);
    return [];
  }
}

async function fetchEnglishRankings(limit = 10) {
  try {
    const response = await fetch(getApiUrl(`/api/english/rankings?limit=${encodeURIComponent(limit)}`));
    if (!response.ok) {
      throw new Error("failed to fetch english rankings");
    }

    const payload = await response.json();
    return Array.isArray(payload.items) ? payload.items : [];
  } catch (error) {
    console.error("fetchEnglishRankings failed", error);
    return [];
  }
}

async function refreshMathRankings() {
  const items = await fetchMathRankings(10);
  if (authState.user) {
    const me = items.find((item) => item.userId === authState.user.id);
    state.rankingCorrect = me ? Number(me.totalCorrect || 0) : 0;
  } else {
    state.rankingCorrect = null;
  }
  renderRanking(els.rankingList, items);
  renderStickers();
}

async function refreshEnglishRankings() {
  const items = await fetchEnglishRankings(10);
  if (authState.user) {
    const me = items.find((item) => item.userId === authState.user.id);
    state.englishRankingCorrect = me ? Number(me.totalCorrect || 0) : 0;
  } else {
    state.englishRankingCorrect = null;
  }
  renderRanking(els.englishRankingList, items);
}

async function refreshRankings() {
  await Promise.all([refreshMathRankings(), refreshEnglishRankings()]);
}

function renderGoogleSignInButton() {
  if (!authState.googleReady) {
    renderGoogleFallbackButton();
    return;
  }

  els.googleSignInWrap.innerHTML = "";

  if (authState.user) {
    els.googleSignInWrap.classList.add("hidden");
    return;
  }

  els.googleSignInWrap.classList.remove("hidden");

  try {
    window.google.accounts.id.renderButton(els.googleSignInWrap, {
      type: "standard",
      theme: "outline",
      size: "large",
      text: "signin_with",
      shape: "pill",
      locale: "ko",
      width: 250
    });
  } catch (error) {
    console.error("renderGoogleSignInButton failed", error);
    renderGoogleFallbackButton();
    setAuthStatus("Google 로그인 버튼 로딩에 실패했어요. 다시 불러오기를 눌러주세요.");
    return;
  }

  // renderButton can fail silently in some browser/origin combinations.
  setTimeout(() => verifyGoogleButtonVisible(0), 900);
}

function renderAuthUser() {
  if (!authState.user) {
    els.authUser.classList.add("hidden");
    els.nicknameSection.classList.add("hidden");
    els.nicknameInput.value = "";
    setNicknameNote("닉네임은 랭킹에 표시돼요.");
    els.googleSignInWrap.classList.remove("hidden");
    setAuthStatus("로그인하면 학습 기록을 안전하게 저장할 수 있어요.");
    renderGoogleSignInButton();
    return;
  }

  const { name, email, picture, nickname } = authState.user;

  els.authAvatar.src = picture || "";
  els.authAvatar.alt = `${name || "사용자"} 프로필`;
  els.authName.textContent = name || "사용자";
  els.authEmail.textContent = email || "";

  if (!picture) {
    els.authAvatar.classList.add("hidden");
  } else {
    els.authAvatar.classList.remove("hidden");
  }

  els.authUser.classList.remove("hidden");
  els.nicknameSection.classList.remove("hidden");
  els.nicknameInput.value = nickname || "";
  if (nickname) {
    setNicknameNote(`현재 닉네임: ${nickname}`);
  } else {
    setNicknameNote("닉네임을 등록하면 랭킹에 내 이름으로 표시돼요.");
  }
  els.googleSignInWrap.classList.add("hidden");
  setAuthStatus(`${name || "사용자"}님, 라운드 결과가 자동으로 저장돼요.`);
}

function getRandomLine(lines) {
  return lines[randomInt(0, lines.length - 1)];
}

function pickOperation() {
  if (state.operation !== "mix") return state.operation;

  const basicKeys = ["add", "subtract", "multiply", "divide"];
  return basicKeys[randomInt(0, basicKeys.length - 1)];
}

function buildQuestion(operationKey, levelKey) {
  const level = LEVELS[levelKey];

  if (operationKey === "add") {
    const left = randomInt(0, level.addMax);
    const right = randomInt(0, level.addMax);
    return {
      operationKey,
      left,
      right,
      symbol: "+",
      answer: left + right,
      hint: `${left}에서 ${right}만큼 더 앞으로 가면 돼.`
    };
  }

  if (operationKey === "subtract") {
    let left = randomInt(0, level.addMax);
    let right = randomInt(0, level.addMax);

    if (right > left) {
      [left, right] = [right, left];
    }

    return {
      operationKey,
      left,
      right,
      symbol: "-",
      answer: left - right,
      hint: `${left}개에서 ${right}개를 빼면 몇 개 남을까?`
    };
  }

  if (operationKey === "multiply") {
    const left = randomInt(1, level.mulMax);
    const right = randomInt(1, level.mulMax);
    return {
      operationKey,
      left,
      right,
      symbol: "×",
      answer: left * right,
      hint: `${left}를 ${right}번 더한 값이야.`
    };
  }

  const divisor = randomInt(1, level.mulMax);
  const quotient = randomInt(1, level.mulMax);
  const dividend = divisor * quotient;

  return {
    operationKey: "divide",
    left: dividend,
    right: divisor,
    symbol: "÷",
    answer: quotient,
    hint: `${dividend}을 ${divisor}개씩 나누면 몇 묶음일까?`
  };
}

function updateModePill() {
  const operationLabel = OPERATIONS[state.operation].label;
  const levelLabel = LEVELS[state.level].label;
  els.modePill.textContent = `${operationLabel} · ${levelLabel}`;
}

function getStickerTotalCorrect() {
  if (authState.user && Number.isFinite(state.rankingCorrect)) {
    return Math.max(0, Math.trunc(state.rankingCorrect));
  }

  return Math.max(Number(profile.lifetimeCorrect || 0), Number(profile.dailyCorrect || 0), 0);
}

function renderStickers() {
  const toneKeys = ["red", "orange", "yellow", "green", "blue", "purple", "pink"];
  const totalCorrect = getStickerTotalCorrect();
  const useRankingTotal = Boolean(authState.user && Number.isFinite(state.rankingCorrect));
  const stickerCount = Math.min(Math.floor(totalCorrect / 10), 42);
  const solvedMod = totalCorrect % 10;
  const remainToNext = solvedMod === 0 ? 10 : 10 - solvedMod;

  if (stickerCount === 0) {
    els.stickerShelf.innerHTML = '<p class="empty-note">아직 받은 스티커가 없어요.</p>';
    if (els.stickerGuide) {
      if (useRankingTotal) {
        els.stickerGuide.textContent = `랭킹 누적 정답 10개마다 곰돌이 스티커를 한 장 드려요. 다음 스티커까지 ${remainToNext}문제 남았어요.`;
      } else {
        els.stickerGuide.textContent = `누적 정답 10개마다 곰돌이 스티커를 한 장 드려요. 다음 스티커까지 ${remainToNext}문제 남았어요.`;
      }
    }
    return;
  }

  const stickers = Array.from({ length: stickerCount }, (_, index) => {
    const tone = toneKeys[index % toneKeys.length];
    const scoreMark = (index + 1) * 10;
    return `<span class="sticker sticker-${tone}" data-label="${scoreMark}" aria-hidden="true">🧸</span>`;
  });

  els.stickerShelf.innerHTML = stickers.join("");
  if (els.stickerGuide) {
    if (useRankingTotal) {
      els.stickerGuide.textContent = `랭킹 누적 정답 ${totalCorrect}문제! 10개마다 한 장, 지금 곰돌이 스티커 ${stickerCount}장 모았어요.`;
    } else {
      els.stickerGuide.textContent = `누적 정답 ${totalCorrect}문제! 10개마다 한 장, 지금 곰돌이 스티커 ${stickerCount}장 모았어요.`;
    }
  }
}

function updateStats() {
  const dailyAccuracy = profile.dailySolved
    ? Math.round((profile.dailyCorrect / profile.dailySolved) * 100)
    : 0;

  els.dailyCorrect.textContent = String(profile.dailyCorrect);
  els.sessionStreak.textContent = String(state.sessionStreak);
  els.bestStreak.textContent = String(profile.bestStreak);
  els.accuracy.textContent = `${dailyAccuracy}%`;

  renderStickers();
}

function updateProgress() {
  const solvedInRound = state.sessionCorrect + state.sessionWrong;
  const progressCount = state.sessionActive
    ? solvedInRound
    : Math.min(profile.dailySolved, TARGET_QUESTIONS);
  const progressRate = Math.min(Math.round((progressCount / TARGET_QUESTIONS) * 100), 100);

  els.progressFill.style.width = `${progressRate}%`;
  els.progressText.textContent = `${progressCount} / ${TARGET_QUESTIONS} 진행`;
  els.progressBar.setAttribute("aria-valuenow", String(progressCount));
}

function shuffleList(items) {
  const copied = [...items];
  for (let index = copied.length - 1; index > 0; index -= 1) {
    const swapIndex = randomInt(0, index);
    [copied[index], copied[swapIndex]] = [copied[swapIndex], copied[index]];
  }
  return copied;
}

function getSpeechRecognitionCtor() {
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

function canUseSpeechSynthesis() {
  return "speechSynthesis" in window && typeof window.SpeechSynthesisUtterance === "function";
}

function normalizeEnglishText(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getWordMatchRate(spokenText, targetText) {
  const spokenWords = normalizeEnglishText(spokenText).split(" ").filter(Boolean);
  const targetWords = normalizeEnglishText(targetText).split(" ").filter(Boolean);
  if (targetWords.length === 0) return 0;

  const spokenSet = new Set(spokenWords);
  const matched = targetWords.filter((word) => spokenSet.has(word)).length;
  return matched / targetWords.length;
}

function isSpokenSentenceCorrect(spokenText, targetText) {
  const spoken = normalizeEnglishText(spokenText);
  const target = normalizeEnglishText(targetText);
  if (!spoken || !target) return false;
  if (spoken === target) return true;
  if (spoken.includes(target) || target.includes(spoken)) return true;
  return getWordMatchRate(spoken, target) >= 0.7;
}

function setEnglishFeedback(message) {
  els.englishFeedbackText.textContent = `곰돌이 선생님: ${message}`;
}

function setEnglishSpeakingFeedback(message, isError = false) {
  els.englishSpeakFeedback.textContent = message;
  els.englishSpeakFeedback.classList.toggle("is-error", isError);
}

function getSpeakingNextLabel() {
  return englishState.questionNumber >= TARGET_QUESTIONS ? "결과 보기" : "다음 문제";
}

function isEnglishSpeakingPhase() {
  return englishState.phase === ENGLISH_PHASES.SPEAKING;
}

function pickEnglishLessonIndex(usedIndexes) {
  const allIndexes = Array.from({ length: ENGLISH_LESSONS.length }, (_, index) => index);
  let availableIndexes = allIndexes.filter((index) => !usedIndexes.has(index));
  if (availableIndexes.length === 0) {
    usedIndexes.clear();
    availableIndexes = allIndexes;
  }

  const lessonIndex = availableIndexes[randomInt(0, availableIndexes.length - 1)];
  usedIndexes.add(lessonIndex);
  return lessonIndex;
}

function buildEnglishWordQuestion() {
  const lessonIndex = pickEnglishLessonIndex(englishState.usedWordLessonIndexes);
  const lesson = ENGLISH_LESSONS[lessonIndex];
  const options = new Set([lesson.english]);
  while (options.size < 4) {
    const candidate = ENGLISH_LESSONS[randomInt(0, ENGLISH_LESSONS.length - 1)];
    options.add(candidate.english);
  }

  return {
    kind: ENGLISH_PHASES.WORD,
    korean: lesson.korean,
    answer: lesson.english,
    sentence: lesson.sentence,
    options: shuffleList(Array.from(options))
  };
}

function buildEnglishSpeakingQuestion() {
  const lessonIndex = pickEnglishLessonIndex(englishState.usedSpeakingLessonIndexes);
  const lesson = ENGLISH_LESSONS[lessonIndex];
  return {
    kind: ENGLISH_PHASES.SPEAKING,
    korean: lesson.korean,
    answer: lesson.english,
    sentence: lesson.sentence,
    options: []
  };
}

function speakEnglishSentence() {
  if (!englishState.current) return false;
  if (!canUseSpeechSynthesis()) {
    setEnglishSpeakingFeedback("이 브라우저는 문장 읽기를 지원하지 않을 수 있어요. Chrome 사용을 추천해요.", true);
    return false;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(englishState.current.sentence);
  utterance.lang = "en-US";
  utterance.rate = 0.92;
  utterance.pitch = 1.02;
  window.speechSynthesis.speak(utterance);
  return true;
}

function updateEnglishSpeakingControls() {
  const isSpeakingPhase = isEnglishSpeakingPhase();
  const hasActiveQuestion = englishState.sessionActive && Boolean(englishState.current);
  const canGoWordNext = englishState.sessionActive && !isSpeakingPhase && englishState.answered;
  const showWordNext = englishState.sessionActive && !isSpeakingPhase;
  const showSpeakingControls = englishState.sessionActive && isSpeakingPhase;
  const showMicOff = showSpeakingControls || (!englishState.sessionActive && englishState.speakingCorrect + englishState.speakingWrong > 0);

  els.englishNextBtn.classList.toggle("hidden", !showWordNext);
  els.englishSpeakActionBtn.classList.toggle("hidden", !showSpeakingControls);
  els.englishSpeakReplayBtn.classList.toggle("hidden", !showSpeakingControls);
  els.englishSpeakOffBtn.classList.toggle("hidden", !showMicOff);

  els.englishNextBtn.disabled = !canGoWordNext;
  els.englishSpeakOffBtn.disabled = !showMicOff;

  if (!showSpeakingControls || !hasActiveQuestion) {
    els.englishSpeakActionBtn.textContent = "문제 시작";
    els.englishSpeakActionBtn.disabled = true;
    els.englishSpeakReplayBtn.disabled = true;
    return;
  }

  if (englishState.recognizing) {
    els.englishSpeakActionBtn.textContent = "듣는 중...";
    els.englishSpeakActionBtn.disabled = true;
    els.englishSpeakReplayBtn.disabled = true;
    return;
  }

  if (englishState.speakingAction === ENGLISH_SPEAK_ACTIONS.START) {
    els.englishSpeakActionBtn.textContent = "문제 시작";
    els.englishSpeakActionBtn.disabled = false;
    els.englishSpeakReplayBtn.disabled = true;
    return;
  }

  if (englishState.speakingAction === ENGLISH_SPEAK_ACTIONS.RECORD) {
    els.englishSpeakActionBtn.textContent = "말하기 시작";
    els.englishSpeakActionBtn.disabled = false;
    els.englishSpeakReplayBtn.disabled = false;
    return;
  }

  els.englishSpeakActionBtn.textContent = getSpeakingNextLabel();
  els.englishSpeakActionBtn.disabled = false;
  els.englishSpeakReplayBtn.disabled = false;
}

function updateEnglishStats() {
  const solved = englishState.correct + englishState.wrong;
  const accuracy = solved > 0 ? Math.round((englishState.correct / solved) * 100) : 0;
  els.englishCorrect.textContent = String(englishState.correct);
  els.englishStreak.textContent = String(englishState.streak);
  els.englishBestStreak.textContent = String(englishState.bestStreak);
  els.englishAccuracy.textContent = `${accuracy}%`;
}

function renderEnglishIdle() {
  stopEnglishRecognition();
  englishState.phase = ENGLISH_PHASES.WORD;
  englishState.current = null;
  englishState.answered = false;
  englishState.speakingAction = ENGLISH_SPEAK_ACTIONS.START;
  els.englishQuestionCount.textContent = "준비 완료";
  els.englishModePill.textContent = "단어 10문제 · 말하기 10문제";
  els.englishPrompt.textContent = "영어 시작 버튼을 누르면 단어 10문제가 먼저 나와요.";
  els.englishOptions.innerHTML = "";
  els.englishNextBtn.textContent = "다음 문제";
  els.englishSpeakTarget.textContent = "단어 10문제를 끝내면 말하기 미션 10문제가 시작돼요.";
  els.englishTranscript.textContent = "내 말하기 결과: 아직 없음";
  setEnglishSpeakingFeedback("단어를 끝낸 뒤 말하기 미션에서 문제 시작 버튼을 눌러 연습해요.");
  setEnglishFeedback("영어 탭 준비 완료! 시작 버튼을 눌러보자.");
  updateEnglishSpeakingControls();
  updateEnglishStats();
}

function renderEnglishQuestion() {
  if (!englishState.current) return;

  if (isEnglishSpeakingPhase()) {
    els.englishQuestionCount.textContent = `말하기 ${englishState.questionNumber} / ${TARGET_QUESTIONS} 문제`;
    els.englishModePill.textContent = "문장 말하기 미션";
    els.englishPrompt.textContent = "아래 문장을 듣고 따라 말해보세요.";
    els.englishOptions.innerHTML = "";
    els.englishSpeakTarget.textContent = englishState.current.sentence;
    els.englishTranscript.textContent = "내 말하기 결과: 아직 없음";
    setEnglishSpeakingFeedback("문제 시작을 누르면 문장을 들려줘요. 그다음 말하기 시작을 눌러 따라 말해요.");
    setEnglishFeedback("말하기 미션 시작! 문장을 듣고 따라 말해보자.");
  } else {
    els.englishQuestionCount.textContent = `${englishState.questionNumber} / ${TARGET_QUESTIONS} 단어`;
    els.englishModePill.textContent = "기초 단어 4지선다";
    els.englishPrompt.textContent = `"${englishState.current.korean}" 는 영어로?`;
    els.englishOptions.innerHTML = englishState.current.options
      .map((option) => {
        return `<button class="english-option" type="button" data-option="${option}">${option}</button>`;
      })
      .join("");
    els.englishNextBtn.textContent = "다음 문제";
    els.englishSpeakTarget.textContent = "단어 10문제를 끝내면 말하기 미션 10문제가 시작돼요.";
    els.englishTranscript.textContent = "내 말하기 결과: 아직 없음";
    setEnglishSpeakingFeedback("지금은 단어 미션이에요. 단어 10문제를 끝내면 말하기로 넘어가요.");
    setEnglishFeedback("정답 단어를 골라보자!");
  }

  stopEnglishRecognition();
  englishState.speakingAction = ENGLISH_SPEAK_ACTIONS.START;
  englishState.answered = false;
  updateEnglishSpeakingControls();
}

function startEnglishSession() {
  stopEnglishRecognition();
  englishState.sessionActive = true;
  englishState.sessionStartedAt = Date.now();
  englishState.phase = ENGLISH_PHASES.WORD;
  englishState.questionNumber = 1;
  englishState.correct = 0;
  englishState.wrong = 0;
  englishState.wordCorrect = 0;
  englishState.wordWrong = 0;
  englishState.speakingCorrect = 0;
  englishState.speakingWrong = 0;
  englishState.streak = 0;
  englishState.bestStreak = 0;
  englishState.answered = false;
  englishState.speakingAction = ENGLISH_SPEAK_ACTIONS.START;
  englishState.usedWordLessonIndexes.clear();
  englishState.usedSpeakingLessonIndexes.clear();
  englishState.current = buildEnglishWordQuestion();
  updateEnglishStats();
  renderEnglishQuestion();
  setBear("thinking", "영어 시간 시작! 먼저 단어 10문제를 같이 풀어보자.");
}

function startEnglishSpeakingMission() {
  stopEnglishRecognition();
  englishState.phase = ENGLISH_PHASES.SPEAKING;
  englishState.questionNumber = 1;
  englishState.answered = false;
  englishState.speakingAction = ENGLISH_SPEAK_ACTIONS.START;
  englishState.usedSpeakingLessonIndexes.clear();
  englishState.current = buildEnglishSpeakingQuestion();
  renderEnglishQuestion();
  setBear("thinking", "좋아! 이제 말하기 미션 10문제를 시작해보자.");
  setEnglishFeedback("말하기 미션 시작! 문장 듣기 후 따라 말해보자.");
}

function completeEnglishSession() {
  stopEnglishRecognition();
  englishState.sessionActive = false;
  englishState.speakingAction = ENGLISH_SPEAK_ACTIONS.START;
  englishState.phase = ENGLISH_PHASES.WORD;
  englishState.current = null;
  englishState.answered = false;
  const solved = englishState.correct + englishState.wrong;
  const accuracy = solved > 0 ? Math.round((englishState.correct / solved) * 100) : 0;
  let mood = "happy";
  if (accuracy >= 90) mood = "celebrate";
  if (accuracy < 60) mood = "thinking";

  els.englishQuestionCount.textContent = "영어 라운드 완료";
  els.englishModePill.textContent = "영어 라운드 완료";
  els.englishPrompt.textContent = `단어 ${englishState.wordCorrect}/${TARGET_QUESTIONS}, 말하기 ${englishState.speakingCorrect}/${TARGET_QUESTIONS} 정답!`;
  els.englishOptions.innerHTML = "";
  els.englishNextBtn.textContent = "다음 문제";
  els.englishSpeakTarget.textContent = "라운드가 완료됐어요. 영어 20문제 도전 성공!";
  els.englishTranscript.textContent = "내 말하기 결과: 라운드 완료";
  setEnglishSpeakingFeedback("영어 공부가 끝났으면 마이크를 끌게요. 아래 버튼을 눌러 마이크를 꺼요.");
  setEnglishFeedback(`완료! 총 ${englishState.correct}/${ENGLISH_TOTAL_QUESTIONS}문제 정답, 정답률 ${accuracy}%야.`);
  updateEnglishSpeakingControls();
  setBear(mood, "영어 라운드 완료! 계속하면 발음이 더 좋아져.");

  const summary = buildEnglishRoundSummary();
  void syncEnglishRoundResult(summary);
}

function handleEnglishOptionSelect(option) {
  if (isEnglishSpeakingPhase()) return;
  if (!englishState.sessionActive || englishState.answered || !englishState.current) return;

  englishState.answered = true;
  const isCorrect = option === englishState.current.answer;

  if (isCorrect) {
    englishState.correct += 1;
    englishState.wordCorrect += 1;
    englishState.streak += 1;
    englishState.bestStreak = Math.max(englishState.bestStreak, englishState.streak);
    setEnglishFeedback(`정답! "${englishState.current.answer}" 맞아요.`);
    setBear("love", "영어 정답! 곰돌이 선생님이 하트 눈으로 칭찬 중이야.");
  } else {
    englishState.wrong += 1;
    englishState.wordWrong += 1;
    englishState.streak = 0;
    setEnglishFeedback(`아쉬워! 정답은 "${englishState.current.answer}"야.`);
    setBear("cry", "괜찮아, 다음 영어 문제에서 바로 만회하자.");
  }

  Array.from(els.englishOptions.querySelectorAll(".english-option")).forEach((button) => {
    if (!(button instanceof HTMLElement)) return;
    const value = button.dataset.option || "";
    button.setAttribute("disabled", "true");
    if (value === englishState.current.answer) {
      button.classList.add("is-correct");
      return;
    }
    if (value === option && !isCorrect) {
      button.classList.add("is-wrong");
    }
  });

  updateEnglishStats();
  if (isCorrect) {
    handleEnglishNext();
    return;
  }

  if (englishState.questionNumber >= TARGET_QUESTIONS) {
    els.englishNextBtn.textContent = "말하기 미션 시작";
  } else {
    els.englishNextBtn.textContent = "다음 문제";
  }
  updateEnglishSpeakingControls();
  els.englishNextBtn.focus();
}

function handleEnglishNext() {
  if (!englishState.answered) return;
  if (isEnglishSpeakingPhase()) {
    if (englishState.questionNumber >= TARGET_QUESTIONS) {
      completeEnglishSession();
      return;
    }

    englishState.questionNumber += 1;
    englishState.current = buildEnglishSpeakingQuestion();
    renderEnglishQuestion();
    return;
  }

  if (englishState.questionNumber >= TARGET_QUESTIONS) {
    startEnglishSpeakingMission();
    return;
  }

  englishState.questionNumber += 1;
  englishState.current = buildEnglishWordQuestion();
  renderEnglishQuestion();
}

function handleEnglishSpeakAction() {
  if (!isEnglishSpeakingPhase()) {
    setEnglishSpeakingFeedback("단어 미션이 끝나면 말하기 미션이 시작돼요.", true);
    return;
  }
  if (!englishState.sessionActive || !englishState.current) return;

  if (englishState.speakingAction === ENGLISH_SPEAK_ACTIONS.START) {
    const played = speakEnglishSentence();
    englishState.speakingAction = ENGLISH_SPEAK_ACTIONS.RECORD;
    setEnglishSpeakingFeedback(
      played
        ? "문장을 들려줬어요. 이제 말하기 시작 버튼을 눌러 따라 말해봐요."
        : "문장 듣기에 실패했어요. 그래도 말하기 시작으로 진행할 수 있어요.",
      !played
    );
    updateEnglishSpeakingControls();
    return;
  }

  if (englishState.speakingAction === ENGLISH_SPEAK_ACTIONS.RECORD) {
    handleEnglishMic();
    return;
  }

  if (englishState.speakingAction === ENGLISH_SPEAK_ACTIONS.NEXT) {
    handleEnglishNext();
  }
}

function handleEnglishSpeakReplay() {
  if (!isEnglishSpeakingPhase()) {
    setEnglishSpeakingFeedback("말하기 미션에서 다시 듣기를 사용할 수 있어요.", true);
    return;
  }
  if (!englishState.sessionActive || !englishState.current) return;
  if (englishState.speakingAction === ENGLISH_SPEAK_ACTIONS.START) {
    setEnglishSpeakingFeedback("먼저 문제 시작 버튼을 눌러 문장을 들어봐요.", true);
    return;
  }
  speakEnglishSentence();
}

function handleEnglishSpeakOff() {
  stopEnglishRecognition();
  if (canUseSpeechSynthesis()) {
    window.speechSynthesis.cancel();
  }
  englishState.speakingAction = ENGLISH_SPEAK_ACTIONS.START;
  setEnglishSpeakingFeedback("영어 공부가 끝났으면 마이크를 끌게요. 필요하면 다음 라운드에서 다시 시작해요.");
  updateEnglishSpeakingControls();
}

function stopEnglishRecognition() {
  if (englishState.recognition) {
    try {
      englishState.recognition.onresult = null;
      englishState.recognition.onerror = null;
      englishState.recognition.onend = null;
      englishState.recognition.abort();
    } catch {
      // Ignore abort failures.
    }
  }
  englishState.recognition = null;
  englishState.recognizing = false;
}

function handleEnglishMic() {
  if (!englishState.current) return;
  if (!isEnglishSpeakingPhase()) {
    setEnglishSpeakingFeedback("단어 미션이 끝나면 말하기 미션에서 따라 말하기를 할 수 있어요.", true);
    return;
  }
  if (englishState.answered) {
    setEnglishSpeakingFeedback("채점이 끝났어요. 다음 문제 버튼으로 넘어가요.", true);
    return;
  }
  if (englishState.speakingAction !== ENGLISH_SPEAK_ACTIONS.RECORD) {
    setEnglishSpeakingFeedback("먼저 문제 시작을 눌러 문장을 듣고 시작해요.", true);
    return;
  }

  const RecognitionCtor = getSpeechRecognitionCtor();
  if (!RecognitionCtor) {
    setEnglishSpeakingFeedback("이 브라우저는 음성 인식을 지원하지 않아요. Chrome 사용을 추천해요.", true);
    return;
  }

  if (englishState.recognizing) {
    return;
  }

  const recognition = new RecognitionCtor();
  let shouldAutoAdvance = false;
  englishState.recognition = recognition;
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  englishState.recognizing = true;
  updateEnglishSpeakingControls();

  recognition.onresult = (event) => {
    const transcript = String(event.results?.[0]?.[0]?.transcript || "").trim();
    els.englishTranscript.textContent = transcript
      ? `내 말하기 결과: ${transcript}`
      : "내 말하기 결과: 인식된 문장이 없어요.";

    const target = englishState.current?.sentence || "";
    if (isSpokenSentenceCorrect(transcript, target)) {
      englishState.correct += 1;
      englishState.speakingCorrect += 1;
      englishState.streak += 1;
      englishState.bestStreak = Math.max(englishState.bestStreak, englishState.streak);
      englishState.answered = true;
      shouldAutoAdvance = true;
      setEnglishSpeakingFeedback("정답! 발음이 또렷해요. 바로 다음 문제로 넘어갈게요.", false);
      setEnglishFeedback("말하기 정답! 정말 잘했어.");
      setBear("love", "말하기 정답! 곰돌이 선생님이 하트 눈으로 칭찬 중이야.");
    } else {
      englishState.wrong += 1;
      englishState.speakingWrong += 1;
      englishState.streak = 0;
      englishState.answered = true;
      setEnglishSpeakingFeedback(`아쉬워! 목표 문장: "${target}"`, true);
      setEnglishFeedback("괜찮아! 다음 말하기 문제에서 만회해보자.");
      setBear("cry", "괜찮아, 다음 말하기 문제에서 바로 다시 도전하자.");
    }

    updateEnglishStats();
    if (!shouldAutoAdvance) {
      englishState.speakingAction = ENGLISH_SPEAK_ACTIONS.NEXT;
      updateEnglishSpeakingControls();
      els.englishSpeakActionBtn.focus();
    }
  };

  recognition.onerror = () => {
    setEnglishSpeakingFeedback("마이크 인식 중 문제가 생겼어요. 다시 말하기 시작을 눌러요.", true);
    englishState.speakingAction = ENGLISH_SPEAK_ACTIONS.RECORD;
  };

  recognition.onend = () => {
    englishState.recognizing = false;
    englishState.recognition = null;
    if (shouldAutoAdvance) {
      handleEnglishNext();
      return;
    }
    if (!englishState.answered && isEnglishSpeakingPhase()) {
      englishState.speakingAction = ENGLISH_SPEAK_ACTIONS.RECORD;
    }
    updateEnglishSpeakingControls();
  };

  try {
    recognition.start();
  } catch (error) {
    console.error("english recognition start failed", error);
    setEnglishSpeakingFeedback("마이크 시작에 실패했어요. 브라우저 권한을 확인해 주세요.", true);
    stopEnglishRecognition();
    englishState.speakingAction = ENGLISH_SPEAK_ACTIONS.RECORD;
    updateEnglishSpeakingControls();
  }
}

function setupEnglishVoiceSupport() {
  const supportMessage = getSpeechRecognitionCtor()
    ? "이 기기에서는 웹 음성 인식이 가능해요. 듀오링고처럼 말하기 연습을 할 수 있어요."
    : "이 브라우저는 음성 인식을 지원하지 않을 수 있어요. Chrome 최신 버전을 추천해요.";
  els.englishVoiceSupport.textContent = supportMessage;
}

function renderQuestion() {
  const question = state.currentQuestion;
  if (!question) return;

  if (state.reviewMode) {
    const remaining = state.reviewQueue.length + 1;
    els.questionCount.textContent = `틀린문제 복습 · 남은 ${remaining}문제`;
  } else {
    els.questionCount.textContent = `${state.questionNumber} / ${TARGET_QUESTIONS} 문제`;
  }
  els.equation.textContent = `${question.left} ${question.symbol} ${question.right} = ?`;

  els.answerInput.value = "";
  els.answerInput.disabled = false;
  els.answerInput.focus();

  els.submitBtn.textContent = "정답 확인";
  els.submitBtn.disabled = false;
  els.hintBtn.disabled = false;
  els.nextBtn.classList.add("hidden");
  els.retryWrongBtn.classList.add("hidden");

  state.answered = false;
}

function nextQuestion() {
  const operationKey = pickOperation();
  state.currentQuestion = buildQuestion(operationKey, state.level);
  renderQuestion();
}

function nextReviewQuestion() {
  const next = state.reviewQueue.shift();
  if (!next) {
    completeWrongReview();
    return;
  }

  state.currentQuestion = { ...next };
  renderQuestion();
}

function startWrongReview() {
  if (state.wrongQuestions.length === 0) return;

  state.reviewMode = true;
  state.reviewQueue = state.wrongQuestions.map((question) => ({ ...question }));
  state.sessionActive = true;

  els.retryWrongBtn.classList.add("hidden");
  els.startBtn.textContent = "다시 시작";
  els.modePill.textContent = "틀린문제 복습";
  setFeedback("좋아! 틀린 문제를 다시 풀어보자.");
  setBear("thinking", "이번엔 꼭 맞혀보자!");

  nextReviewQuestion();
}

function completeWrongReview() {
  state.reviewMode = false;
  state.sessionActive = false;
  state.reviewQueue = [];

  updateModePill();
  els.questionCount.textContent = "복습 완료";
  els.equation.textContent = "🎉 틀린 문제를 모두 다시 풀었어!";
  els.answerInput.value = "";
  els.answerInput.disabled = true;
  els.submitBtn.textContent = "정답 확인";
  els.submitBtn.disabled = true;
  els.hintBtn.disabled = true;
  els.nextBtn.classList.add("hidden");
  els.retryWrongBtn.classList.add("hidden");
  els.startBtn.textContent = "새 라운드 시작";

  setFeedback("복습 완료! 이제 같은 실수를 줄일 수 있어.");
  setBear("celebrate", "정말 잘했어! 복습까지 완벽해.");
}

function startSession() {
  state.sessionActive = true;
  state.sessionStartedAt = Date.now();
  state.questionNumber = 1;
  state.sessionCorrect = 0;
  state.sessionWrong = 0;
  state.sessionStreak = 0;
  state.sessionBestStreak = 0;
  state.wrongQuestions = [];
  state.reviewMode = false;
  state.reviewQueue = [];

  els.startBtn.textContent = "다시 시작";
  els.retryWrongBtn.classList.add("hidden");
  updateModePill();
  setFeedback("첫 문제야! 침착하게 계산해보자.");
  setBear("thinking", "좋아, 머리를 반짝여보자!");
  nextQuestion();
  updateStats();
  updateProgress();
}

async function saveSessionToDb(summary) {
  if (!authState.user || !authState.token) {
    return { ok: false, reason: "not-logged-in" };
  }

  try {
    const response = await fetch(getApiUrl("/api/math/sessions"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState.token}`
      },
      body: JSON.stringify(summary)
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => ({ error: "failed to save" }));
      throw new Error(payload.error || "failed to save");
    }

    return { ok: true };
  } catch (error) {
    console.error("saveSessionToDb failed", error);
    return { ok: false, reason: "request-failed" };
  }
}

async function syncRoundResult(summary) {
  if (!authState.user) {
    return;
  }

  const result = await saveSessionToDb(summary);

  if (result.ok) {
    setAuthStatus(`${authState.user.name || "사용자"}님, 이번 라운드 기록이 저장됐어요.`);
    void refreshMathRankings();
    return;
  }

  if (result.reason === "not-logged-in") {
    setAuthStatus("로그인하면 라운드 결과를 저장할 수 있어요.");
    return;
  }

  setAuthStatus("저장에 실패했어요. 로그인 상태와 DB 설정을 확인해 주세요.");
}

async function saveEnglishSessionToDb(summary) {
  if (!authState.user || !authState.token) {
    return { ok: false, reason: "not-logged-in" };
  }

  try {
    const response = await fetch(getApiUrl("/api/english/sessions"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState.token}`
      },
      body: JSON.stringify(summary)
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => ({ error: "failed to save" }));
      throw new Error(payload.error || "failed to save");
    }

    return { ok: true };
  } catch (error) {
    console.error("saveEnglishSessionToDb failed", error);
    return { ok: false, reason: "request-failed" };
  }
}

async function syncEnglishRoundResult(summary) {
  if (!authState.user) {
    return;
  }

  const result = await saveEnglishSessionToDb(summary);

  if (result.ok) {
    setAuthStatus(`${authState.user.name || "사용자"}님, 영어 라운드 기록이 저장됐어요.`);
    void refreshEnglishRankings();
    return;
  }

  if (result.reason === "not-logged-in") {
    setAuthStatus("로그인하면 영어 라운드 결과를 저장할 수 있어요.");
    return;
  }

  setAuthStatus("영어 라운드 저장에 실패했어요. 로그인 상태와 DB 설정을 확인해 주세요.");
}

function buildRoundSummary() {
  const total = state.sessionCorrect + state.sessionWrong;
  const accuracy = total ? Math.round((state.sessionCorrect / total) * 100) : 0;
  const durationMs = Math.max(Date.now() - state.sessionStartedAt, 0);

  return {
    date: getDateKey(),
    operation: state.operation,
    level: state.level,
    totalQuestions: total,
    correctAnswers: state.sessionCorrect,
    wrongAnswers: state.sessionWrong,
    accuracy,
    bestStreak: state.sessionBestStreak,
    durationMs,
    externalKey: `round:${getDateKey()}:${state.operation}:${state.level}:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`
  };
}

function buildEnglishRoundSummary() {
  const total = englishState.correct + englishState.wrong;
  const accuracy = total ? Math.round((englishState.correct / total) * 100) : 0;
  const durationMs = Math.max(Date.now() - englishState.sessionStartedAt, 0);

  return {
    date: getDateKey(),
    totalQuestions: total,
    correctAnswers: englishState.correct,
    wrongAnswers: englishState.wrong,
    accuracy,
    bestStreak: englishState.bestStreak,
    durationMs,
    externalKey: `english:${getDateKey()}:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`
  };
}

function completeSession() {
  state.sessionActive = false;

  const total = state.sessionCorrect + state.sessionWrong;
  const score = total ? Math.round((state.sessionCorrect / total) * 100) : 0;

  let line = "차근차근 풀어서 실력이 커지고 있어.";
  let mood = "happy";

  if (score === 100) {
    line = "완벽해! 곰돌이 선생님이 깜짝 놀랐어!";
    mood = "celebrate";
  } else if (score >= 80) {
    line = "대단해! 오늘 수학 감각이 아주 좋아.";
    mood = "celebrate";
  } else if (score < 50) {
    line = "괜찮아! 다음 라운드에서 더 좋아질 거야.";
    mood = "thinking";
  }

  const wrongCount = state.wrongQuestions.length;
  const baseMessage = `${line} ${total}문제 중 ${state.sessionCorrect}문제 정답 (${score}%).`;
  if (wrongCount > 0) {
    setFeedback(`${baseMessage} 틀린 문제 ${wrongCount}개를 다시 풀어볼 수 있어!`);
  } else {
    setFeedback(baseMessage);
  }
  setBear(mood, "라운드 완료! 다시 시작해서 기록을 깨보자.");

  els.questionCount.textContent = "라운드 완료";
  els.equation.textContent = "🧸 오늘도 한 걸음 성장했어!";

  els.answerInput.value = "";
  els.answerInput.disabled = true;
  els.submitBtn.textContent = "정답 확인";
  els.submitBtn.disabled = true;
  els.hintBtn.disabled = true;
  els.nextBtn.classList.add("hidden");
  if (wrongCount > 0) {
    els.retryWrongBtn.classList.remove("hidden");
  } else {
    els.retryWrongBtn.classList.add("hidden");
  }
  els.startBtn.textContent = "새 라운드 시작";

  updateProgress();

  const summary = buildRoundSummary();
  void syncRoundResult(summary);
}

function handleSubmit() {
  if (!state.sessionActive || state.answered || !state.currentQuestion) return;

  const rawValue = els.answerInput.value.trim();
  if (!rawValue) {
    setFeedback("정답 칸에 숫자를 입력해줘.");
    setBear("thinking", "입력하면 바로 확인해줄게.");
    return;
  }

  const userAnswer = Number(rawValue);
  if (!Number.isFinite(userAnswer)) {
    setFeedback("숫자만 입력해줘.");
    return;
  }
  const isCorrect = userAnswer === state.currentQuestion.answer;

  state.answered = true;
  els.hintBtn.disabled = true;
  els.answerInput.disabled = true;
  els.nextBtn.classList.add("hidden");

  if (state.reviewMode) {
    if (isCorrect) {
      setFeedback(`정답! ${getRandomLine(POSITIVE_FEEDBACK)}`);
      setBear("love", "정답이야! 곰돌이 선생님 눈이 하트가 됐어.");
      handleNext();
      return;
    } else {
      state.reviewQueue.push({ ...state.currentQuestion });
      setFeedback(`오답! 정답은 ${state.currentQuestion.answer}이야. ${getRandomLine(ENCOURAGE_FEEDBACK)}`);
      setBear("cry", "괜찮아, 같은 문제를 한 번 더 풀어보자.");
    }

    if (state.reviewQueue.length === 0) {
      els.submitBtn.textContent = "복습 완료";
    } else {
      els.submitBtn.textContent = "다음 복습";
    }
    els.submitBtn.disabled = false;
    els.submitBtn.focus();
    return;
  }

  profile.dailySolved += 1;
  profile.lifetimeSolved += 1;

  if (isCorrect) {
    state.sessionCorrect += 1;
    state.sessionStreak += 1;
    state.sessionBestStreak = Math.max(state.sessionBestStreak, state.sessionStreak);

    profile.dailyCorrect += 1;
    profile.lifetimeCorrect += 1;
    profile.bestStreak = Math.max(profile.bestStreak, state.sessionStreak);

    setFeedback(`정답! ${getRandomLine(POSITIVE_FEEDBACK)}`);
    setBear("love", "정답이야! 곰돌이 선생님 눈이 하트가 됐어.");
  } else {
    state.sessionWrong += 1;
    state.sessionStreak = 0;
    state.wrongQuestions.push({ ...state.currentQuestion });

    setFeedback(`오답! 정답은 ${state.currentQuestion.answer}이야. ${getRandomLine(ENCOURAGE_FEEDBACK)}`);
    setBear("cry", "괜찮아, 곰돌이 선생님이 토닥토닥. 다음 문제에서 만회하자.");
  }

  saveProfile();
  updateStats();
  updateProgress();
  if (isCorrect) {
    handleNext();
    return;
  }

  if (state.questionNumber >= TARGET_QUESTIONS) {
    els.submitBtn.textContent = "결과 보기";
  } else {
    els.submitBtn.textContent = "다음 문제";
  }
  els.submitBtn.disabled = false;
  els.submitBtn.focus();
}

function handleHint() {
  if (!state.sessionActive || state.answered || !state.currentQuestion) return;

  if (state.reviewMode) {
    setFeedback(`복습 힌트: ${state.currentQuestion.hint}`);
    setBear("thinking", "복습 문제도 천천히 다시 생각해보자.");
    return;
  }

  setFeedback(`힌트: ${state.currentQuestion.hint}`);
  setBear("thinking", "힌트를 보고 천천히 계산해보자.");
}

function handleNext() {
  if (!state.answered) return;

  if (state.reviewMode) {
    if (state.reviewQueue.length === 0) {
      completeWrongReview();
      return;
    }

    setBear("idle", "좋아! 다음 복습 문제로 가자.");
    setFeedback("틀린 문제를 하나씩 다시 풀어보자.");
    nextReviewQuestion();
    return;
  }

  if (state.questionNumber >= TARGET_QUESTIONS) {
    completeSession();
    return;
  }

  state.questionNumber += 1;
  setBear("idle", "좋아! 다음 문제로 가자.");
  setFeedback("집중해서 다음 문제도 풀어보자.");
  nextQuestion();
}

function handleOperationSelect(nextOperation) {
  if (!OPERATIONS[nextOperation]) return;

  state.operation = nextOperation;
  profile.lastOperation = nextOperation;
  saveProfile();

  setActive(els.operationButtons, "operation", nextOperation);
  updateModePill();

  if (state.sessionActive && !state.answered) {
    setFeedback("연산을 바꿨어. 현재 문제 다음부터 적용돼.");
  }
}

function handleLevelSelect(nextLevel) {
  if (!LEVELS[nextLevel]) return;

  state.level = nextLevel;
  profile.lastLevel = nextLevel;
  saveProfile();

  setActive(els.levelButtons, "level", nextLevel);
  updateModePill();

  if (state.sessionActive && !state.answered) {
    setFeedback("난이도를 바꿨어. 현재 문제 다음부터 적용돼.");
  }
}

async function handleThemeSelect(nextTheme) {
  if (!THEMES[nextTheme]) return;

  applyTheme(nextTheme);
  setThemePicker(false);

  const themeLabel = THEMES[nextTheme].label;
  setBear("happy", `${themeLabel} 컨셉으로 바꿨어!`);

  if (!authState.user) return;

  const result = await saveThemeToDb(nextTheme);
  if (result.ok) {
    setAuthStatus(`${authState.user.name || "사용자"}님 테마를 ${themeLabel}로 저장했어요.`);
    return;
  }

  setAuthStatus("테마 저장에 실패했어요. 잠시 후 다시 시도해 주세요.");
}

async function handleSaveNickname() {
  if (!authState.user) {
    setNicknameNote("Google 로그인 후 닉네임을 등록할 수 있어요.", true);
    return;
  }

  const nickname = els.nicknameInput.value.trim();
  if (!NICKNAME_PATTERN.test(nickname)) {
    setNicknameNote("닉네임은 2~12자, 한글/영문/숫자/_ 만 사용할 수 있어요.", true);
    return;
  }

  els.saveNicknameBtn.disabled = true;
  const beforeLabel = els.saveNicknameBtn.textContent;
  els.saveNicknameBtn.textContent = "저장중...";

  const result = await saveNicknameToDb(nickname);

  els.saveNicknameBtn.disabled = false;
  els.saveNicknameBtn.textContent = beforeLabel || "등록/수정";

  if (result.ok) {
    renderAuthUser();
    setAuthStatus(`${authState.user?.name || "사용자"}님 닉네임을 저장했어요.`);
    setFeedback(`${nickname} 닉네임으로 랭킹에 도전해보자!`);
    setBear("happy", "닉네임 저장 완료! 정말 멋진 이름이야.");
    void refreshRankings();
    return;
  }

  if (result.status === 409) {
    setNicknameNote("이미 사용 중인 닉네임이에요. 다른 이름으로 시도해 주세요.", true);
    return;
  }

  setNicknameNote("닉네임 저장에 실패했어요. 잠시 후 다시 시도해 주세요.", true);
}

async function handleGoogleCredential(response) {
  const idToken = String(response?.credential || "").trim();
  if (!idToken) return;

  setAuthStatus("Google 로그인 확인 중...");

  try {
    const authResponse = await fetch(getApiUrl("/api/auth/google"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken })
    });

    if (!authResponse.ok) {
      const payload = await authResponse.json().catch(() => ({ error: "로그인 실패" }));
      throw new Error(payload.error || "로그인 실패");
    }

    const payload = await authResponse.json();

    authState.token = String(payload.token || "");
    authState.user = payload.user || null;

    if (!authState.token || !authState.user) {
      throw new Error("로그인 응답이 올바르지 않습니다.");
    }

    saveAuthState();
    renderAuthUser();
    if (authState.user?.theme && THEME_KEYS.includes(authState.user.theme)) {
      applyTheme(authState.user.theme);
    }
    void refreshRankings();

    setFeedback("로그인 완료! 이제 라운드 결과가 DB에 저장돼요.");
    setBear("happy", `${authState.user.name || "친구"} 반가워!`);
  } catch (error) {
    console.error("google login failed", error);
    clearAuthState();
    renderAuthUser();

    setAuthStatus("로그인에 실패했어요. 잠시 후 다시 시도해 주세요.");
    setFeedback("로그인 중 문제가 생겼어. 한 번 더 시도해보자.");
  }
}

function initGoogleSignIn(retry = 0) {
  if (authState.googleReady && window.google?.accounts?.id) {
    renderGoogleSignInButton();
    return;
  }

  if (window.google?.accounts?.id) {
    authState.googleReady = true;

    try {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleCredential,
        auto_select: false,
        ux_mode: "popup"
      });
    } catch (error) {
      console.error("initGoogleSignIn initialize failed", error);
      renderGoogleFallbackButton();
      setAuthStatus("Google 로그인 초기화에 실패했어요. 다시 불러오기를 눌러주세요.");
      return;
    }

    renderGoogleSignInButton();
    return;
  }

  if (retry === 0) {
    void ensureGoogleScriptLoaded(false);
  }

  if (retry < 120) {
    setTimeout(() => initGoogleSignIn(retry + 1), 250);
    return;
  }

  renderGoogleFallbackButton();
  setAuthStatus("Google 로그인 버튼을 불러오지 못했어요. 새로고침 후 다시 시도해 주세요.");
}

async function restoreAuthSession() {
  const saved = loadAuthState();

  authState.token = saved.token;
  authState.user = saved.user;

  if (!authState.token) {
    renderAuthUser();
    void refreshRankings();
    return;
  }

  try {
    const response = await fetch(getApiUrl("/api/auth/me"), {
      headers: {
        Authorization: `Bearer ${authState.token}`
      }
    });

    if (!response.ok) {
      throw new Error("invalid session");
    }

    const payload = await response.json();
    authState.user = payload.user || null;

    if (!authState.user) {
      throw new Error("missing user");
    }

    saveAuthState();
    if (authState.user?.theme && THEME_KEYS.includes(authState.user.theme)) {
      applyTheme(authState.user.theme);
    }
  } catch (error) {
    console.error("restoreAuthSession failed", error);
    clearAuthState();
  }

  renderAuthUser();
  void refreshRankings();
}

function handleLogout() {
  clearAuthState();
  state.rankingCorrect = null;
  state.englishRankingCorrect = null;
  renderAuthUser();

  if (window.google?.accounts?.id) {
    window.google.accounts.id.disableAutoSelect();
  }

  setBear("idle", "로그아웃했어. 원하면 다시 로그인해줘!");
  setFeedback("로그아웃 완료! 로그인하면 다시 DB 저장이 가능해.");
  void refreshRankings();
}

function bindEvents() {
  els.subjectTabs.forEach((button) => {
    button.addEventListener("click", () => {
      setSubjectTab(button.dataset.subject || "math");
    });
  });

  els.operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      handleOperationSelect(button.dataset.operation);
    });
  });

  els.levelButtons.forEach((button) => {
    button.addEventListener("click", () => {
      handleLevelSelect(button.dataset.level);
    });
  });

  els.bearAvatar.addEventListener("click", (event) => {
    event.stopPropagation();
    setThemePicker(!state.themePickerOpen);
  });

  els.themePicker.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  els.themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      void handleThemeSelect(button.dataset.theme);
    });
  });

  document.addEventListener("click", () => {
    if (state.themePickerOpen) {
      setThemePicker(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && state.themePickerOpen) {
      setThemePicker(false);
    }
  });

  els.startBtn.addEventListener("click", () => {
    startSession();
  });

  els.submitBtn.addEventListener("click", () => {
    if (state.answered) {
      handleNext();
      return;
    }

    handleSubmit();
  });

  els.hintBtn.addEventListener("click", () => {
    handleHint();
  });

  els.nextBtn.addEventListener("click", () => {
    handleNext();
  });

  els.retryWrongBtn.addEventListener("click", () => {
    startWrongReview();
  });

  els.saveNicknameBtn.addEventListener("click", () => {
    void handleSaveNickname();
  });

  els.nicknameInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    void handleSaveNickname();
  });

  els.refreshRankingBtn.addEventListener("click", () => {
    void refreshMathRankings();
  });

  els.refreshEnglishRankingBtn.addEventListener("click", () => {
    void refreshEnglishRankings();
  });

  els.englishStartBtn.addEventListener("click", () => {
    startEnglishSession();
  });

  els.englishOptions.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (!target.classList.contains("english-option")) return;
    handleEnglishOptionSelect(String(target.dataset.option || ""));
  });

  els.englishNextBtn.addEventListener("click", () => {
    handleEnglishNext();
  });

  els.englishSpeakActionBtn.addEventListener("click", () => {
    handleEnglishSpeakAction();
  });

  els.englishSpeakReplayBtn.addEventListener("click", () => {
    handleEnglishSpeakReplay();
  });

  els.englishSpeakOffBtn.addEventListener("click", () => {
    handleEnglishSpeakOff();
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.id !== "retryGoogleLoginBtn") return;

    target.textContent = "불러오는 중...";
    target.setAttribute("disabled", "true");
    void ensureGoogleScriptLoaded(true).then((loaded) => {
      if (!loaded) {
        renderGoogleFallbackButton();
        setAuthStatus("Google 스크립트를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.");
        return;
      }
      authState.googleReady = false;
      initGoogleSignIn();
      if (window.google?.accounts?.id) {
        try {
          window.google.accounts.id.prompt();
        } catch (error) {
          console.error("google prompt failed", error);
        }
      }

      setTimeout(() => {
        if (authState.user || hasVisibleGoogleButtonDom()) return;
        setAuthStatus(`계속 안 보이면 Google Cloud Console 승인 도메인에 ${CURRENT_ORIGIN} 이 등록됐는지 확인해 주세요.`);
      }, 1800);
    });
  });

  els.answerInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;

    event.preventDefault();

    if (state.answered) {
      handleNext();
      return;
    }

    handleSubmit();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    if (state.subject !== "english") return;

    const target = event.target;
    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) return;
    if (!englishState.sessionActive) return;

    if (englishState.answered) {
      event.preventDefault();
      handleEnglishNext();
    }
  });

  els.logoutBtn.addEventListener("click", () => {
    handleLogout();
  });
}

function init() {
  state.operation = OPERATIONS[profile.lastOperation] ? profile.lastOperation : "add";
  state.level = LEVELS[profile.lastLevel] ? profile.lastLevel : "easy";
  state.subject = loadTabPreference();

  setActive(els.operationButtons, "operation", state.operation);
  setActive(els.levelButtons, "level", state.level);

  applyTheme(profile.theme, { persist: false });
  setThemePicker(false);
  els.retryWrongBtn.classList.add("hidden");

  updateModePill();
  updateStats();
  updateProgress();
  setupEnglishVoiceSupport();
  renderEnglishIdle();
  setBear("idle", "안녕! 난 곰돌이 선생님이야. 오늘도 즐겁게 문제 풀어볼까?");
  setFeedback("천천히, 정확하게! 준비되면 시작해요.");

  bindEvents();
  setSubjectTab(state.subject, { persist: false });
  renderAuthUser();

  void restoreAuthSession();
  initGoogleSignIn();
  window.addEventListener("load", () => {
    if (!authState.googleReady) {
      initGoogleSignIn();
    }
  });
}

init();
