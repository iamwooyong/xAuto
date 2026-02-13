const majorCards = [
  { number: 0, name: "The Fool", title: "바보", upright: "모험, 무지", reversed: "경솔, 어리석음", emoji: "🌱", art: "radial-gradient(circle at 85% 12%, #fff8bb7a 0 10%, transparent 11%), linear-gradient(180deg, #a7cedf 0 58%, #88a868 59% 100%)" },
  { number: 1, name: "The Magician", title: "마술사", upright: "창조, 수완", reversed: "겁많음, 기만", emoji: "🪄", art: "radial-gradient(circle at 22% 16%, #fff7d18a 0 12%, transparent 13%), linear-gradient(180deg, #deb9ff 0 55%, #a285d7 56% 100%)" },
  { number: 2, name: "The High Priestess", title: "고위 여사제", upright: "지식, 총명", reversed: "잔혹, 무례함", emoji: "🌙", art: "radial-gradient(circle at 80% 14%, #fff2c27a 0 10%, transparent 11%), linear-gradient(180deg, #6e7cbb 0 58%, #4f5e9d 59% 100%)" },
  { number: 3, name: "The Empress", title: "여제", upright: "풍양, 모성", reversed: "과잉, 허영", emoji: "👑", art: "radial-gradient(circle at 76% 14%, #fff3bd7d 0 10%, transparent 11%), linear-gradient(180deg, #f2c8d9 0 58%, #d194aa 59% 100%)" },
  { number: 4, name: "The Emperor", title: "황제", upright: "책임, 부성", reversed: "오만, 존대", emoji: "🦁", art: "radial-gradient(circle at 20% 14%, #fff5cb75 0 10%, transparent 11%), linear-gradient(180deg, #f4c1a1 0 58%, #c28060 59% 100%)" },
  { number: 5, name: "The Hierophant", title: "교황", upright: "가르침, 관대함", reversed: "협량, 나태", emoji: "📜", art: "radial-gradient(circle at 82% 12%, #fff8c97a 0 10%, transparent 11%), linear-gradient(180deg, #d3d8e9 0 58%, #a4aec5 59% 100%)" },
  { number: 6, name: "The Lovers", title: "연인", upright: "연애, 쾌락", reversed: "질투, 배신, 실연", emoji: "💞", art: "radial-gradient(circle at 82% 14%, #ffecc57a 0 10%, transparent 11%), linear-gradient(180deg, #ffd0cc 0 58%, #ec9b93 59% 100%)" },
  { number: 7, name: "The Chariot", title: "전차", upright: "전진, 승리", reversed: "폭주, 좌절, 패배", emoji: "🏇", art: "radial-gradient(circle at 18% 12%, #fff6cc7d 0 10%, transparent 11%), linear-gradient(180deg, #b0d7ff 0 58%, #739fcf 59% 100%)" },
  { number: 8, name: "Strength", title: "힘", upright: "힘, 용기", reversed: "본성, 자만", emoji: "🦅", art: "radial-gradient(circle at 80% 12%, #fff2be7a 0 10%, transparent 11%), linear-gradient(180deg, #ffd79d 0 58%, #e1a45c 59% 100%)" },
  { number: 9, name: "The Hermit", title: "은자", upright: "탐색, 사려깊음", reversed: "음습, 폐쇄적, 탐욕", emoji: "🕯️", art: "radial-gradient(circle at 22% 12%, #fff6d57a 0 10%, transparent 11%), linear-gradient(180deg, #b2bcc8 0 58%, #7d8a97 59% 100%)" },
  { number: 10, name: "Wheel of Fortune", title: "운명의 바퀴", upright: "기회, 일시적인 행운", reversed: "오산, 불운", emoji: "🎡", art: "radial-gradient(circle at 78% 12%, #fff6c77a 0 10%, transparent 11%), linear-gradient(180deg, #ffd98f 0 58%, #d89540 59% 100%)" },
  { number: 11, name: "Justice", title: "정의", upright: "균형, 정당함", reversed: "불균형, 편견, 부정", emoji: "⚖️", art: "radial-gradient(circle at 20% 14%, #fff6ce7a 0 10%, transparent 11%), linear-gradient(180deg, #e3d5cf 0 58%, #beaaa1 59% 100%)" },
  { number: 12, name: "The Hanged Man", title: "매달린 사람", upright: "자기희생, 인내", reversed: "무의미한 희생, 맹목", emoji: "🪢", art: "radial-gradient(circle at 84% 15%, #fff2be7a 0 10%, transparent 11%), linear-gradient(180deg, #b8d9b2 0 58%, #7fa17c 59% 100%)" },
  { number: 13, name: "Death", title: "죽음", upright: "격변, 이별", reversed: "변화의 유보, 고착", emoji: "🕯", art: "radial-gradient(circle at 76% 16%, #fff0c47a 0 10%, transparent 11%), linear-gradient(180deg, #7f8792 0 58%, #4d545e 59% 100%)" },
  { number: 14, name: "Temperance", title: "절제", upright: "조화, 견실", reversed: "낭비, 불안정", emoji: "🫗", art: "radial-gradient(circle at 18% 14%, #fff6c87a 0 10%, transparent 11%), linear-gradient(180deg, #a5dace 0 58%, #6ba79a 59% 100%)" },
  { number: 15, name: "The Devil", title: "악마", upright: "사심, 속박, 타락", reversed: "악순환으로부터의 각성", emoji: "⛓️", art: "radial-gradient(circle at 82% 12%, #ffefc07a 0 10%, transparent 11%), linear-gradient(180deg, #90849f 0 58%, #60566f 59% 100%)" },
  { number: 16, name: "The Tower", title: "탑", upright: "파괴, 파멸", reversed: "필요로 하는 파괴", emoji: "🗼", art: "radial-gradient(circle at 78% 14%, #ffefc67a 0 10%, transparent 11%), linear-gradient(180deg, #a9acba 0 58%, #73778a 59% 100%)" },
  { number: 17, name: "The Star", title: "별", upright: "희망, 동경", reversed: "환멸, 비애", emoji: "⭐", art: "radial-gradient(circle at 75% 24%, #fff7dc7a 0 11%, transparent 12%), linear-gradient(180deg, #7fc3dd 0 62%, #5da174 63% 100%)" },
  { number: 18, name: "The Moon", title: "달", upright: "불안, 애매함, 혼돈", reversed: "불안 해소, 명료함, 혼돈의 끝", emoji: "🌕", art: "radial-gradient(circle at 80% 14%, #fff2c37a 0 10%, transparent 11%), linear-gradient(180deg, #8897d1 0 58%, #5f6ea8 59% 100%)" },
  { number: 19, name: "The Sun", title: "태양", upright: "밝은 미래, 만족", reversed: "연기, 실패", emoji: "☀️", art: "radial-gradient(circle at 52% 18%, #fff7b1 0 18%, transparent 19%), linear-gradient(180deg, #ffd18e 0 60%, #eb9b59 61% 100%)" },
  { number: 20, name: "Judgement", title: "심판", upright: "부활, 개선", reversed: "재기불능, 후회", emoji: "📯", art: "radial-gradient(circle at 74% 12%, #fff3c77a 0 10%, transparent 11%), linear-gradient(180deg, #c2d7ef 0 58%, #8ea8c8 59% 100%)" },
  { number: 21, name: "The World", title: "세계", upright: "완성, 완전", reversed: "미완성, 어중간함", emoji: "🌍", art: "radial-gradient(circle at 82% 12%, #fff2c07a 0 10%, transparent 11%), linear-gradient(180deg, #a9d7ba 0 58%, #6ca380 59% 100%)" }
];

function createMinorCards() {
  const suitMeta = [
    { key: "W", nameKo: "완드", nameEn: "Wands", emoji: "🔥", art: "radial-gradient(circle at 78% 12%, #fff1c17a 0 10%, transparent 11%), linear-gradient(180deg, #f0b28e 0 58%, #b56b4b 59% 100%)", uprightTone: "열정, 추진력", reversedTone: "성급함, 소진" },
    { key: "C", nameKo: "컵", nameEn: "Cups", emoji: "💧", art: "radial-gradient(circle at 80% 12%, #fff4cf7a 0 10%, transparent 11%), linear-gradient(180deg, #8fc5eb 0 58%, #5b87bd 59% 100%)", uprightTone: "감정, 공감", reversedTone: "감정기복, 혼란" },
    { key: "S", nameKo: "소드", nameEn: "Swords", emoji: "🗡️", art: "radial-gradient(circle at 78% 12%, #fff5d27a 0 10%, transparent 11%), linear-gradient(180deg, #bfc9d9 0 58%, #7b879b 59% 100%)", uprightTone: "판단, 결단", reversedTone: "갈등, 피로" },
    { key: "P", nameKo: "펜타클", nameEn: "Pentacles", emoji: "🪙", art: "radial-gradient(circle at 78% 12%, #fff4c07a 0 10%, transparent 11%), linear-gradient(180deg, #9dcf9b 0 58%, #5f9562 59% 100%)", uprightTone: "현실, 성장", reversedTone: "지연, 불안정" }
  ];

  const ranks = [
    { key: "A", nameKo: "에이스", nameEn: "Ace", up: "새 출발", rev: "출발 지연" },
    { key: "2", nameKo: "투", nameEn: "Two", up: "균형", rev: "불균형" },
    { key: "3", nameKo: "쓰리", nameEn: "Three", up: "확장", rev: "정체" },
    { key: "4", nameKo: "포", nameEn: "Four", up: "안정", rev: "고착" },
    { key: "5", nameKo: "파이브", nameEn: "Five", up: "변화", rev: "충돌" },
    { key: "6", nameKo: "식스", nameEn: "Six", up: "회복", rev: "미해결" },
    { key: "7", nameKo: "세븐", nameEn: "Seven", up: "도전", rev: "의심" },
    { key: "8", nameKo: "에이트", nameEn: "Eight", up: "집중", rev: "압박" },
    { key: "9", nameKo: "나인", nameEn: "Nine", up: "성숙", rev: "불안" },
    { key: "10", nameKo: "텐", nameEn: "Ten", up: "완성", rev: "과부하" },
    { key: "P", nameKo: "페이지", nameEn: "Page", up: "배움", rev: "미숙" },
    { key: "N", nameKo: "나이트", nameEn: "Knight", up: "전진", rev: "충동" },
    { key: "Q", nameKo: "퀸", nameEn: "Queen", up: "통찰", rev: "감정 과잉" },
    { key: "K", nameKo: "킹", nameEn: "King", up: "주도", rev: "고집" }
  ];

  return suitMeta.flatMap((suit) =>
    ranks.map((rank) => ({
      number: `${suit.key}-${rank.key}`,
      name: `${rank.nameEn} of ${suit.nameEn}`,
      title: `${suit.nameKo} ${rank.nameKo}`,
      upright: `${suit.uprightTone}, ${rank.up}`,
      reversed: `${suit.reversedTone}, ${rank.rev}`,
      emoji: suit.emoji,
      art: suit.art
    }))
  );
}

const tarotCards = [...majorCards, ...createMinorCards()];

const STORAGE_TODAY = "tarotMate:todayTarot";
const STORAGE_HISTORY = "tarotMate:readingHistory";
const DAILY_SPREAD_COUNT = Math.min(25, tarotCards.length);

const brandHomeBtn = document.querySelector("#brandHomeBtn");
const navItems = Array.from(document.querySelectorAll(".nav-item"));
const views = {
  home: document.querySelector("#homeView"),
  history: document.querySelector("#historyView"),
  zodiac: document.querySelector("#zodiacView"),
  guide: document.querySelector("#guideView")
};

const drawBtn = document.querySelector("#drawBtn");
const tarotCardEl = document.querySelector("#tarotCard");
const cardTitleEl = document.querySelector("#cardTitle");
const cardQuoteEl = document.querySelector("#cardQuote");
const cardDescEl = document.querySelector("#cardDesc");
const fortuneTitleEl = document.querySelector("#fortuneTitle");
const fortuneMetaEl = document.querySelector("#fortuneMeta");
const cardArtEl = document.querySelector("#cardArt");
const tagBox = document.querySelector("#tagBox");
const pickAreaEl = document.querySelector("#pickArea");
const pickGridEl = document.querySelector("#pickGrid");
const historyListEl = document.querySelector("#historyList");
const cardCatalogListEl = document.querySelector("#cardCatalogList");

const zodiacForm = document.querySelector("#zodiacForm");
const birthDateInput = document.querySelector("#birthDate");
const birthTimeInput = document.querySelector("#birthTime");
const unknownBirthTimeInput = document.querySelector("#unknownBirthTime");
const zodiacResultEl = document.querySelector("#zodiacResult");
const zodiacCardInnerEl = document.querySelector("#zodiacCardInner");
const zodiacTitleEl = document.querySelector("#zodiacTitle");
const zodiacSignTextEl = document.querySelector("#zodiacSignText");
const zodiacFortuneTextEl = document.querySelector("#zodiacFortuneText");

const googleLoginBtn = document.querySelector("#googleLoginBtn");
const GOOGLE_CLIENT_ID = "610364396438-cduadkikkc8gkcbgrn4700q45load9kr.apps.googleusercontent.com";
const STORAGE_GOOGLE_USER = "tarotMate:googleUser";

let currentIndex = 0;
let isSelectionMode = false;

function getDateKey() {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
}

function formatCardNumber(number) {
  return String(number).padStart(2, "0");
}

function formatDirection(direction) {
  return direction === "reversed" ? "역방향" : "정방향";
}

function renderTags(card, direction) {
  const meaning = direction === "reversed" ? card.reversed : card.upright;
  tagBox.innerHTML = [`#${formatDirection(direction)}`, `#${meaning.split(",")[0].trim()}`, `#${card.name}`]
    .map((tag) => `<span class="tag">${tag}</span>`)
    .join("");
}

function renderCard(index, direction = "upright") {
  const card = tarotCards[index];
  tarotCardEl.classList.remove("is-back");
  cardTitleEl.textContent = `${formatCardNumber(card.number)}. ${card.title}`;
  cardQuoteEl.textContent = `“${card.name} · ${formatDirection(direction)}”`;
  cardArtEl.textContent = card.emoji;
  cardArtEl.style.background = card.art;
  cardArtEl.style.transform = direction === "reversed" ? "rotate(180deg)" : "none";
  renderTags(card, direction);
}

function shuffle(list) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getTodayData() {
  const todayKey = getDateKey();
  const saved = JSON.parse(localStorage.getItem(STORAGE_TODAY) || "null");

  if (saved?.date === todayKey && Array.isArray(saved.spread) && saved.spread.length === DAILY_SPREAD_COUNT) {
    return saved;
  }

  const spread = shuffle(tarotCards.map((_, i) => i)).slice(0, DAILY_SPREAD_COUNT);
  const orientationMap = {};
  spread.forEach((cardIndex) => {
    orientationMap[cardIndex] = Math.random() < 0.5 ? "upright" : "reversed";
  });

  const data = { date: todayKey, spread, orientationMap, selected: null };
  localStorage.setItem(STORAGE_TODAY, JSON.stringify(data));
  return data;
}

function saveTodayData(data) {
  localStorage.setItem(STORAGE_TODAY, JSON.stringify(data));
}

function getHistory() {
  return JSON.parse(localStorage.getItem(STORAGE_HISTORY) || "[]");
}

function saveHistory(history) {
  localStorage.setItem(STORAGE_HISTORY, JSON.stringify(history));
}

function upsertDailyHistory(entry) {
  const history = getHistory();
  const others = history.filter((item) => !(item.type === "daily" && item.date === entry.date));
  const next = [entry, ...others].sort((a, b) => (a.date < b.date ? 1 : -1));
  saveHistory(next);
  renderHistory();
}

function addZodiacHistory(entry) {
  const history = getHistory();
  const next = [entry, ...history].slice(0, 60);
  saveHistory(next);
  renderHistory();
}

function buildFortuneText(card, direction) {
  const meaning = direction === "reversed" ? card.reversed : card.upright;
  const extra = direction === "reversed"
    ? "오늘은 속도를 줄이고 우선순위를 다시 정리하면 흐름이 좋아집니다."
    : "핵심 기회가 열리는 흐름이니 작은 실행을 바로 시작해보세요.";
  return `${card.title} 카드의 ${formatDirection(direction)} 의미는 '${meaning}'입니다. ${extra}`;
}

function revealFortune(cardIndex, dateKey, direction) {
  const card = tarotCards[cardIndex];
  currentIndex = cardIndex;

  tarotCardEl.classList.remove("animating");
  void tarotCardEl.offsetWidth;
  tarotCardEl.classList.add("animating");

  renderCard(cardIndex, direction);
  fortuneTitleEl.textContent = `오늘의 타로 결과: ${card.title}`;
  cardDescEl.textContent = buildFortuneText(card, direction);
  fortuneMetaEl.textContent = `${dateKey} 기준, 오늘 선택한 카드입니다.`;
  drawBtn.textContent = "✦ 오늘의 운세 다시 보기";
  isSelectionMode = false;
  views.home.classList.remove("selection-mode");
  pickAreaEl.classList.add("hidden");

  upsertDailyHistory({
    type: "daily",
    date: dateKey,
    title: `${card.title} (${formatDirection(direction)})`,
    summary: direction === "reversed" ? card.reversed : card.upright
  });
}

function renderPickGrid(data) {
  pickGridEl.innerHTML = "";

  data.spread.forEach((cardIndex, idx) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "pick-card";
    button.textContent = String(idx + 1);

    if (data.selected === cardIndex) {
      button.classList.add("selected");
    }

    button.addEventListener("click", () => {
      const nextData = { ...data, selected: cardIndex };
      saveTodayData(nextData);
      renderPickGrid(nextData);
      revealFortune(cardIndex, nextData.date, nextData.orientationMap?.[cardIndex] || "upright");
    });

    pickGridEl.appendChild(button);
  });
}

function openTodayDraw() {
  const data = getTodayData();
  isSelectionMode = true;
  views.home.classList.add("selection-mode");
  pickAreaEl.classList.remove("hidden");
  renderPickGrid(data);
  fortuneTitleEl.textContent = "오늘의 운세";
  cardDescEl.textContent = `카드 ${DAILY_SPREAD_COUNT}장 중 한 장을 선택하면 오늘의 운세를 알려드려요.`;
  fortuneMetaEl.textContent = `${data.date} 기준, 하루 한 번 결과가 고정됩니다.`;
}

function resetHomeIntro() {
  isSelectionMode = false;
  views.home.classList.remove("selection-mode");
  pickAreaEl.classList.add("hidden");
  tarotCardEl.classList.add("is-back");
  cardArtEl.textContent = "";
  cardArtEl.style.transform = "none";
  cardArtEl.style.background =
    "linear-gradient(140deg, #e2d5f4 0 10%, #f7f3ff 45%, #ddd1f3 100%)";
  fortuneTitleEl.textContent = "안녕하세요 타로메이트 입니다.";
  cardDescEl.textContent = "오늘의 타로 골라볼까요?";
  fortuneMetaEl.textContent = "";
  drawBtn.textContent = "✦ 오늘의 운세 보기";
}

function renderHistory() {
  const history = getHistory();
  if (history.length === 0) {
    historyListEl.innerHTML = '<li class="history-item"><p class="history-text">아직 저장된 리딩 기록이 없어요.</p></li>';
    return;
  }

  const pages = [];
  for (let i = 0; i < history.length; i += 5) {
    pages.push(history.slice(i, i + 5));
  }

  const pageHtml = pages
    .map((page) => {
      const items = page
        .map((item) => {
          const label = item.type === "zodiac" ? "별자리" : "오늘의 운세";
          return `<li class="history-item"><p class="history-date">${item.date} · ${label}</p><p class="history-text"><strong>${item.title}</strong><br>${item.summary}</p></li>`;
        })
        .join("");
      return `<section class="history-page"><ul class="history-list">${items}</ul></section>`;
    })
    .join("");

  historyListEl.innerHTML = `<div class="history-viewport"><div class="history-track">${pageHtml}</div></div>`;
}

function renderCardCatalog() {
  cardCatalogListEl.innerHTML = tarotCards
    .map((card) => {
      const idLabel = typeof card.number === "number" ? formatCardNumber(card.number) : String(card.number);
      return `<li class="catalog-item">
        <div class="catalog-head">
          <span class="catalog-emoji">${card.emoji}</span>
          <div>
            <p class="catalog-id">${idLabel}</p>
            <p class="catalog-title">${card.title}</p>
            <p class="catalog-sub">${card.name}</p>
          </div>
        </div>
        <p class="catalog-desc"><strong>정방향:</strong> ${card.upright}</p>
        <p class="catalog-desc"><strong>역방향:</strong> ${card.reversed}</p>
      </li>`;
    })
    .join("");
}

function getZodiacSign(month, day) {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "양자리";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "황소자리";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) return "쌍둥이자리";
  if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) return "게자리";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "사자자리";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 23)) return "처녀자리";
  if ((month === 9 && day >= 24) || (month === 10 && day <= 22)) return "천칭자리";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 22)) return "전갈자리";
  if ((month === 11 && day >= 23) || (month === 12 && day <= 24)) return "사수자리";
  if ((month === 12 && day >= 25) || (month === 1 && day <= 19)) return "염소자리";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "물병자리";
  return "물고기자리";
}

function hashString(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function makeZodiacReading(birthDate, birthTime) {
  const [year, month, day] = birthDate.split("-").map(Number);
  const sign = getZodiacSign(month, day);
  const seed = `${birthDate}:${birthTime}:${sign}`;
  const hash = hashString(seed);
  const cardIndex = hash % tarotCards.length;
  const direction = hash % 2 === 0 ? "upright" : "reversed";
  const card = tarotCards[cardIndex];
  const meaning = direction === "reversed" ? card.reversed : card.upright;

  return {
    date: getDateKey(),
    sign,
    card,
    direction,
    summary: `${sign} 기준 별자리 타로는 ${card.title} (${formatDirection(direction)}) · ${meaning}`,
    detail: `태어난 시간 ${birthTime}의 리듬을 반영하면 '${meaning}' 키워드가 강합니다. 중요한 선택은 감정보다 리듬과 균형을 먼저 확인해보세요.`
  };
}

function onToggleUnknownBirthTime() {
  const unknown = unknownBirthTimeInput.checked;
  birthTimeInput.required = !unknown;
  birthTimeInput.disabled = unknown;
  if (unknown) {
    birthTimeInput.value = "";
  }
}

function onSubmitZodiac(event) {
  event.preventDefault();
  const birthDate = birthDateInput.value;
  const isUnknownTime = unknownBirthTimeInput.checked;
  const birthTime = isUnknownTime ? "12:00" : birthTimeInput.value;

  if (!birthDate || (!isUnknownTime && !birthTime)) {
    alert("생년월일과 태어난 시간을 입력하거나 '태어난 시간 모름'을 체크해 주세요.");
    return;
  }

  const reading = makeZodiacReading(birthDate, birthTime);
  zodiacResultEl.classList.remove("hidden");
  zodiacCardInnerEl.textContent = `${formatCardNumber(reading.card.number)}\n${reading.card.title}`;
  zodiacTitleEl.textContent = `별자리 타로 결과: ${reading.card.title}`;
  zodiacSignTextEl.textContent =
    `${reading.sign} · ${reading.card.name} (${formatDirection(reading.direction)}) · 출생시간 ${isUnknownTime ? "모름" : birthTime}`;
  zodiacFortuneTextEl.textContent = reading.detail;

  addZodiacHistory({
    type: "zodiac",
    date: reading.date,
    title: `${reading.sign} - ${reading.card.title} (${formatDirection(reading.direction)})`,
    summary: reading.summary
  });
}

function switchTab(tab) {
  Object.entries(views).forEach(([key, view]) => {
    view.classList.toggle("hidden", key !== tab);
  });

  navItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.tab === tab);
  });

  if (tab === "history") {
    renderHistory();
  }

  if (tab === "guide") {
    renderCardCatalog();
  }

  if (tab === "home") {
    resetHomeIntro();
  }
}

function initNavigation() {
  navItems.forEach((item) => {
    item.addEventListener("click", () => switchTab(item.dataset.tab));
  });

  brandHomeBtn.addEventListener("click", () => switchTab("home"));
}

function setGoogleButton(user) {
  if (!googleLoginBtn) return;
  googleLoginBtn.textContent = user ? `${user.name} 로그아웃` : "Google 로그인";
}

function saveGoogleUser(user) {
  localStorage.setItem(STORAGE_GOOGLE_USER, JSON.stringify(user));
}

function clearGoogleUser() {
  localStorage.removeItem(STORAGE_GOOGLE_USER);
}

function loadGoogleUser() {
  return JSON.parse(localStorage.getItem(STORAGE_GOOGLE_USER) || "null");
}

function fetchGoogleUserInfo(accessToken) {
  return fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
    .then((res) => {
      if (!res.ok) throw new Error("userinfo failed");
      return res.json();
    })
    .then((profile) => {
      const user = {
        id: profile.sub,
        name: profile.name || "사용자",
        email: profile.email || ""
      };
      saveGoogleUser(user);
      setGoogleButton(user);
      return user;
    });
}

function logoutGoogleUser() {
  const user = loadGoogleUser();
  if (user?.email && window.google?.accounts?.oauth2?.revoke) {
    window.google.accounts.oauth2.revoke(user.email, () => {});
  }
  clearGoogleUser();
  setGoogleButton(null);
}

function initGoogleLogin() {
  if (!googleLoginBtn) return;
  setGoogleButton(loadGoogleUser());

  googleLoginBtn.addEventListener("click", () => {
    if (!window.google || !window.google.accounts || !window.google.accounts.oauth2) {
      alert("Google SDK 로드에 실패했어요. 잠시 후 다시 시도해 주세요.");
      return;
    }

    if (!GOOGLE_CLIENT_ID) {
      alert("app.js에 GOOGLE_CLIENT_ID를 먼저 설정해 주세요.");
      return;
    }

    if (loadGoogleUser()) {
      logoutGoogleUser();
      return;
    }

    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: "openid profile email",
      callback: (tokenResponse) => {
        if (!tokenResponse?.access_token) {
          alert("Google 로그인 토큰을 받지 못했어요.");
          return;
        }
        fetchGoogleUserInfo(tokenResponse.access_token).catch((error) => {
          console.error(error);
          alert("Google 사용자 정보를 가져오지 못했어요.");
        });
      }
    });

    tokenClient.requestAccessToken({ prompt: "consent" });
  });
}

function init() {
  drawBtn.addEventListener("click", openTodayDraw);
  zodiacForm.addEventListener("submit", onSubmitZodiac);
  unknownBirthTimeInput.addEventListener("change", onToggleUnknownBirthTime);
  initNavigation();
  initGoogleLogin();
  onToggleUnknownBirthTime();
  resetHomeIntro();
  renderHistory();
  renderCardCatalog();
  switchTab("home");
}

init();
