const tarotCards = [
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

const drawBtn = document.querySelector("#drawBtn");
const tarotCardEl = document.querySelector("#tarotCard");
const cardTitleEl = document.querySelector("#cardTitle");
const cardQuoteEl = document.querySelector("#cardQuote");
const cardDescEl = document.querySelector("#cardDesc");
const fortuneTitleEl = document.querySelector("#fortuneTitle");
const fortuneMetaEl = document.querySelector("#fortuneMeta");
const cardArtEl = document.querySelector("#cardArt");
const tagBox = document.querySelector("#tagBox");
const kakaoLoginBtn = document.querySelector("#kakaoLoginBtn");
const pickAreaEl = document.querySelector("#pickArea");
const pickGridEl = document.querySelector("#pickGrid");

const KAKAO_JS_KEY = "";
const KAKAO_REDIRECT_URI = window.location.origin + window.location.pathname;
const SPREAD_COUNT = Math.min(5, tarotCards.length);

let currentIndex = 0;

function formatCardNumber(number) {
  return String(number).padStart(2, "0");
}

function renderTags(card, isReversed) {
  const directionLabel = isReversed ? "#역방향" : "#정방향";
  const meaning = isReversed ? card.reversed : card.upright;
  tagBox.innerHTML = [directionLabel, `#${meaning.split(",")[0].trim()}`, `#${card.name}`]
    .map((tag) => `<span class="tag">${tag}</span>`)
    .join("");
}

function renderCard(index, isReversed = false) {
  const card = tarotCards[index];
  const directionText = isReversed ? "역방향" : "정방향";

  cardTitleEl.textContent = `${formatCardNumber(card.number)}. ${card.title}`;
  cardQuoteEl.textContent = `“${card.name} · ${directionText}”`;
  cardArtEl.textContent = card.emoji;
  cardArtEl.style.background = card.art;
  cardArtEl.style.transform = isReversed ? "rotate(180deg)" : "none";
  renderTags(card, isReversed);
}

function getDateKey() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
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
  const storageKey = "tarotMate:todayTarot";
  const saved = JSON.parse(localStorage.getItem(storageKey) || "null");

  if (saved?.date === todayKey && Array.isArray(saved.spread) && saved.spread.length === SPREAD_COUNT) {
    return saved;
  }

  const spread = shuffle(tarotCards.map((_, i) => i)).slice(0, SPREAD_COUNT);
  const orientationMap = {};
  spread.forEach((cardIndex) => {
    orientationMap[cardIndex] = Math.random() < 0.5 ? "upright" : "reversed";
  });

  const newData = { date: todayKey, spread, orientationMap, selected: null };
  localStorage.setItem(storageKey, JSON.stringify(newData));
  return newData;
}

function saveTodayData(data) {
  localStorage.setItem("tarotMate:todayTarot", JSON.stringify(data));
}

function buildFortuneText(card, isReversed) {
  const baseMeaning = isReversed ? card.reversed : card.upright;
  const extra = isReversed
    ? "무리하게 밀어붙이기보다 정리와 균형을 먼저 잡는 것이 오늘의 포인트입니다."
    : "핵심 기회가 열리는 흐름이니 작은 실행을 빠르게 시작해보세요.";
  return `${card.title} 카드의 ${isReversed ? "역방향" : "정방향"} 의미는 '${baseMeaning}'입니다. ${extra}`;
}

function revealFortune(cardIndex, todayKey, direction) {
  const todayCard = tarotCards[cardIndex];
  const isReversed = direction === "reversed";
  currentIndex = cardIndex;

  tarotCardEl.classList.remove("animating");
  void tarotCardEl.offsetWidth;
  tarotCardEl.classList.add("animating");

  renderCard(currentIndex, isReversed);
  fortuneTitleEl.textContent = `오늘의 타로 결과: ${todayCard.title}`;
  cardDescEl.textContent = buildFortuneText(todayCard, isReversed);
  fortuneMetaEl.textContent = `${todayKey} 기준, 오늘 선택한 카드입니다.`;
  drawBtn.textContent = "✦ 오늘의 운세 다시 보기";
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
      const direction = nextData.orientationMap?.[cardIndex] || "upright";
      revealFortune(cardIndex, nextData.date, direction);
    });

    pickGridEl.appendChild(button);
  });
}

function openTodayDraw() {
  const data = getTodayData();
  pickAreaEl.classList.remove("hidden");
  renderPickGrid(data);

  if (Number.isInteger(data.selected)) {
    const direction = data.orientationMap?.[data.selected] || "upright";
    revealFortune(data.selected, data.date, direction);
    return;
  }

  fortuneTitleEl.textContent = "오늘의 운세";
  cardDescEl.textContent = "펼쳐진 카드 중 한 장을 선택하면 오늘의 운세를 알려드려요.";
  fortuneMetaEl.textContent = `${data.date} 기준, 하루 한 번 결과가 고정됩니다.`;
}

drawBtn.addEventListener("click", openTodayDraw);
renderCard(currentIndex, false);

function initKakaoLogin() {
  if (!kakaoLoginBtn) return;

  kakaoLoginBtn.addEventListener("click", () => {
    if (!window.Kakao) {
      alert("카카오 SDK 로드에 실패했어요. 잠시 후 다시 시도해 주세요.");
      return;
    }

    if (!KAKAO_JS_KEY) {
      alert("app.js에 KAKAO_JS_KEY를 먼저 설정해 주세요.");
      return;
    }

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_JS_KEY);
    }

    window.Kakao.Auth.authorize({
      redirectUri: KAKAO_REDIRECT_URI
    });
  });
}

initKakaoLogin();
