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
const ENGLISH_LEVELS = {
  beginner: { key: "beginner", label: "초급" },
  intermediate: { key: "intermediate", label: "중급" },
  advanced: { key: "advanced", label: "고급" }
};
const ENGLISH_LEVEL_KEYS = Object.keys(ENGLISH_LEVELS);
const HISTORY_LEVELS = {
  grade4: { key: "grade4", label: "한국사 4급" },
  grade3: { key: "grade3", label: "한국사 3급" },
  grade2: { key: "grade2", label: "한국사 2급" },
  grade1: { key: "grade1", label: "한국사 1급" }
};
const HISTORY_LEVEL_KEYS = Object.keys(HISTORY_LEVELS);
const ENGLISH_SPEAK_ACTIONS = {
  START: "start",
  RECORD: "record",
  NEXT: "next"
};
const ENGLISH_WORD_QUESTIONS = TARGET_QUESTIONS;
const ENGLISH_SPEAKING_QUESTIONS = 5;
const ENGLISH_TOTAL_QUESTIONS = ENGLISH_WORD_QUESTIONS + ENGLISH_SPEAKING_QUESTIONS;
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
const ENGLISH_EXTRA_LESSONS = [
  { korean: "일", english: "one", sentence: "I have one cookie." },
  { korean: "이", english: "two", sentence: "Two birds are flying." },
  { korean: "삼", english: "three", sentence: "I see three stars." },
  { korean: "사", english: "four", sentence: "Four students are here." },
  { korean: "오", english: "five", sentence: "We need five pencils." },
  { korean: "육", english: "six", sentence: "Six apples are on the table." },
  { korean: "칠", english: "seven", sentence: "There are seven days in a week." },
  { korean: "팔", english: "eight", sentence: "I wake up at eight." },
  { korean: "구", english: "nine", sentence: "Nine kids are in the class." },
  { korean: "십", english: "ten", sentence: "I can count to ten." },
  { korean: "열하나", english: "eleven", sentence: "Eleven players are on the field." },
  { korean: "열둘", english: "twelve", sentence: "There are twelve months in a year." },
  { korean: "열셋", english: "thirteen", sentence: "She is thirteen years old." },
  { korean: "열넷", english: "fourteen", sentence: "Fourteen books are on the shelf." },
  { korean: "열다섯", english: "fifteen", sentence: "Fifteen minutes are left." },
  { korean: "열여섯", english: "sixteen", sentence: "He bought sixteen balloons." },
  { korean: "열일곱", english: "seventeen", sentence: "Seventeen students joined the club." },
  { korean: "열여덟", english: "eighteen", sentence: "Eighteen cookies are in the box." },
  { korean: "열아홉", english: "nineteen", sentence: "Nineteen birds sat on the tree." },
  { korean: "스무", english: "twenty", sentence: "I got twenty points." },
  { korean: "월요일", english: "monday", sentence: "We have math on Monday." },
  { korean: "화요일", english: "tuesday", sentence: "Tuesday is a busy day." },
  { korean: "수요일", english: "wednesday", sentence: "I go to piano class on Wednesday." },
  { korean: "목요일", english: "thursday", sentence: "Thursday comes before Friday." },
  { korean: "금요일", english: "friday", sentence: "Friday is my favorite day." },
  { korean: "토요일", english: "saturday", sentence: "We visit grandma on Saturday." },
  { korean: "일요일", english: "sunday", sentence: "Sunday is a rest day." },
  { korean: "1월", english: "january", sentence: "January is the first month." },
  { korean: "2월", english: "february", sentence: "February is short." },
  { korean: "3월", english: "march", sentence: "Flowers bloom in March." },
  { korean: "4월", english: "april", sentence: "April has spring rain." },
  { korean: "5월", english: "may", sentence: "May is warm and bright." },
  { korean: "6월", english: "june", sentence: "School starts swimming in June." },
  { korean: "7월", english: "july", sentence: "July is hot." },
  { korean: "8월", english: "august", sentence: "We travel in August." },
  { korean: "9월", english: "september", sentence: "The new term begins in September." },
  { korean: "10월", english: "october", sentence: "Leaves change color in October." },
  { korean: "11월", english: "november", sentence: "November is cool." },
  { korean: "12월", english: "december", sentence: "December has winter holidays." },
  { korean: "머리", english: "head", sentence: "My head hurts." },
  { korean: "눈", english: "eye", sentence: "I close one eye." },
  { korean: "코", english: "nose", sentence: "My nose is cold." },
  { korean: "입", english: "mouth", sentence: "Open your mouth, please." },
  { korean: "귀", english: "ear", sentence: "I can hear with my ear." },
  { korean: "얼굴", english: "face", sentence: "Wash your face." },
  { korean: "머리카락", english: "hair", sentence: "Her hair is long." },
  { korean: "손", english: "hand", sentence: "Raise your hand." },
  { korean: "손가락", english: "finger", sentence: "Point with your finger." },
  { korean: "팔", english: "arm", sentence: "My arm is strong." },
  { korean: "다리", english: "leg", sentence: "He hurt his leg." },
  { korean: "발", english: "foot", sentence: "My foot is wet." },
  { korean: "심장", english: "heart", sentence: "My heart beats fast." },
  { korean: "집", english: "house", sentence: "My house is near the park." },
  { korean: "방", english: "room", sentence: "This room is bright." },
  { korean: "침대", english: "bed", sentence: "I sleep on my bed." },
  { korean: "베개", english: "pillow", sentence: "The pillow is soft." },
  { korean: "담요", english: "blanket", sentence: "I use a warm blanket." },
  { korean: "창문", english: "window", sentence: "Please open the window." },
  { korean: "문", english: "door", sentence: "Close the door quietly." },
  { korean: "부엌", english: "kitchen", sentence: "Mom is in the kitchen." },
  { korean: "욕실", english: "bathroom", sentence: "The bathroom is clean." },
  { korean: "거울", english: "mirror", sentence: "I look in the mirror." },
  { korean: "수건", english: "towel", sentence: "Use a dry towel." },
  { korean: "비누", english: "soap", sentence: "Wash your hands with soap." },
  { korean: "열쇠", english: "key", sentence: "I found the key." },
  { korean: "시계", english: "clock", sentence: "The clock is on the wall." },
  { korean: "램프", english: "lamp", sentence: "Turn on the lamp." },
  { korean: "셔츠", english: "shirt", sentence: "He wears a white shirt." },
  { korean: "바지", english: "pants", sentence: "My pants are blue." },
  { korean: "치마", english: "skirt", sentence: "She has a red skirt." },
  { korean: "원피스", english: "dress", sentence: "The dress is pretty." },
  { korean: "신발", english: "shoes", sentence: "My shoes are new." },
  { korean: "양말", english: "socks", sentence: "These socks are warm." },
  { korean: "코트", english: "coat", sentence: "Wear your coat outside." },
  { korean: "재킷", english: "jacket", sentence: "This jacket is light." },
  { korean: "장갑", english: "gloves", sentence: "I need gloves in winter." },
  { korean: "목도리", english: "scarf", sentence: "The scarf is very soft." },
  { korean: "모자", english: "cap", sentence: "His cap is black." },
  { korean: "교복", english: "uniform", sentence: "Our school uniform is neat." },
  { korean: "맑은", english: "sunny", sentence: "It is sunny today." },
  { korean: "비 오는", english: "rainy", sentence: "It is rainy this morning." },
  { korean: "흐린", english: "cloudy", sentence: "The sky is cloudy." },
  { korean: "눈 오는", english: "snowy", sentence: "It is snowy outside." },
  { korean: "바람 부는", english: "windy", sentence: "It is windy on the hill." },
  { korean: "더운", english: "hot", sentence: "Summer is very hot." },
  { korean: "추운", english: "cold", sentence: "Winter is cold." },
  { korean: "따뜻한", english: "warm", sentence: "The soup is warm." },
  { korean: "선선한", english: "cool", sentence: "The evening air is cool." },
  { korean: "산", english: "mountain", sentence: "We climbed a mountain." },
  { korean: "강", english: "river", sentence: "A river flows by the town." },
  { korean: "바다", english: "sea", sentence: "The sea is deep." },
  { korean: "해변", english: "beach", sentence: "We played at the beach." },
  { korean: "숲", english: "forest", sentence: "The forest is quiet." },
  { korean: "꽃", english: "flower", sentence: "This flower smells good." },
  { korean: "나무", english: "tree", sentence: "A bird sits on the tree." },
  { korean: "잔디", english: "grass", sentence: "The grass is green." },
  { korean: "하늘", english: "sky", sentence: "The sky looks clear." },
  { korean: "별", english: "star", sentence: "I see a bright star." },
  { korean: "달", english: "moon", sentence: "The moon is full tonight." },
  { korean: "달걀", english: "egg", sentence: "I ate one boiled egg." },
  { korean: "고기", english: "meat", sentence: "We had meat for dinner." },
  { korean: "국수", english: "noodle", sentence: "This noodle is delicious." },
  { korean: "파스타", english: "pasta", sentence: "I like creamy pasta." },
  { korean: "샐러드", english: "salad", sentence: "She made a fresh salad." },
  { korean: "치즈", english: "cheese", sentence: "Cheese is on the pizza." },
  { korean: "버터", english: "butter", sentence: "Spread butter on the bread." },
  { korean: "설탕", english: "sugar", sentence: "Do not add too much sugar." },
  { korean: "소금", english: "salt", sentence: "Add a little salt." },
  { korean: "후추", english: "pepper", sentence: "I like black pepper." },
  { korean: "아침식사", english: "breakfast", sentence: "Breakfast is important." },
  { korean: "점심식사", english: "lunch", sentence: "We eat lunch at noon." },
  { korean: "저녁식사", english: "dinner", sentence: "Dinner is ready." },
  { korean: "요리하다", english: "cook", sentence: "I can cook noodles." },
  { korean: "마시다", english: "drink", sentence: "Drink enough water." },
  { korean: "생각하다", english: "think", sentence: "Think before you answer." },
  { korean: "알다", english: "know", sentence: "I know the answer." },
  { korean: "고르다", english: "choose", sentence: "Choose one card." },
  { korean: "시작하다", english: "start", sentence: "Let's start now." },
  { korean: "끝내다", english: "finish", sentence: "Finish your homework." },
  { korean: "사다", english: "buy", sentence: "We buy fruit at the store." },
  { korean: "팔다", english: "sell", sentence: "They sell fresh bread." },
  { korean: "가져오다", english: "bring", sentence: "Bring your notebook tomorrow." },
  { korean: "보내다", english: "send", sentence: "Please send me a message." },
  { korean: "기다리다", english: "wait", sentence: "Wait for the green light." },
  { korean: "도착하다", english: "arrive", sentence: "The bus will arrive soon." },
  { korean: "떠나다", english: "leave", sentence: "We leave at seven." },
  { korean: "짓다", english: "build", sentence: "They build a new bridge." },
  { korean: "고치다", english: "fix", sentence: "Can you fix this toy?" },
  { korean: "칠하다", english: "paint", sentence: "Let's paint the wall." },
  { korean: "여행하다", english: "travel", sentence: "I want to travel abroad." },
  { korean: "방문하다", english: "visit", sentence: "We visit our teacher on Friday." },
  { korean: "나누다", english: "share", sentence: "Please share your crayons." }
];
const ENGLISH_MEGA_WORDS = [
  ["봄", "spring"],
  ["여름", "summer"],
  ["가을", "autumn"],
  ["겨울", "winter"],
  ["계절", "season"],
  ["날씨", "weather"],
  ["온도", "temperature"],
  ["얼음", "ice"],
  ["눈송이", "snowflake"],
  ["비", "rain"],
  ["번개", "lightning"],
  ["천둥", "thunder"],
  ["안개", "fog"],
  ["무지개", "rainbow"],
  ["태양", "sun"],
  ["지구", "earth"],
  ["행성", "planet"],
  ["우주", "space"],
  ["로켓", "rocket"],
  ["위성", "satellite"],
  ["나라", "country"],
  ["도시", "city"],
  ["마을", "village"],
  ["거리", "street"],
  ["다리", "bridge"],
  ["터널", "tunnel"],
  ["섬", "island"],
  ["사막", "desert"],
  ["계곡", "valley"],
  ["폭포", "waterfall"],
  ["호수", "lake"],
  ["연못", "pond"],
  ["바위", "rock"],
  ["모래", "sand"],
  ["흙", "soil"],
  ["씨앗", "seed"],
  ["뿌리", "root"],
  ["줄기", "stem"],
  ["잎", "leaf"],
  ["가지", "branch"],
  ["과일", "fruit"],
  ["채소", "vegetable"],
  ["감자", "potato"],
  ["토마토", "tomato"],
  ["양파", "onion"],
  ["당근", "carrot"],
  ["오이", "cucumber"],
  ["양배추", "cabbage"],
  ["브로콜리", "broccoli"],
  ["버섯", "mushroom"],
  ["닭", "chicken"],
  ["돼지", "pig"],
  ["소", "cow"],
  ["양", "sheep"],
  ["염소", "goat"],
  ["말", "horse"],
  ["오리", "duck"],
  ["거북", "turtle"],
  ["원숭이", "monkey"],
  ["코끼리", "elephant"],
  ["기린", "giraffe"],
  ["판다", "panda"],
  ["늑대", "wolf"],
  ["여우", "fox"],
  ["사슴", "deer"],
  ["얼룩말", "zebra"],
  ["낙타", "camel"],
  ["돌고래", "dolphin"],
  ["고래", "whale"],
  ["상어", "shark"],
  ["문어", "octopus"],
  ["게", "crab"],
  ["새우", "shrimp"],
  ["냉장고", "refrigerator"],
  ["가스레인지", "stove"],
  ["오븐", "oven"],
  ["숟가락", "spoon"],
  ["포크", "fork"],
  ["칼", "knife"],
  ["접시", "plate"],
  ["그릇", "bowl"],
  ["컵", "cup"],
  ["병", "bottle"],
  ["우산", "umbrella"],
  ["여행가방", "suitcase"],
  ["지갑", "wallet"],
  ["표", "ticket"],
  ["카메라", "camera"],
  ["배터리", "battery"],
  ["충전기", "charger"],
  ["리모컨", "remote"],
  ["화면", "screen"],
  ["키보드", "keyboard"],
  ["마우스", "mouse"],
  ["스피커", "speaker"],
  ["헤드폰", "headphone"],
  ["프린터", "printer"],
  ["태블릿", "tablet"],
  ["로봇", "robot"],
  ["드론", "drone"],
  ["인터넷", "internet"],
  ["웹사이트", "website"],
  ["비밀번호", "password"],
  ["메시지", "message"],
  ["이메일", "email"],
  ["영상", "video"],
  ["사진", "photo"],
  ["파일", "file"],
  ["폴더", "folder"],
  ["앱", "application"],
  ["프로그램", "program"],
  ["코드", "code"],
  ["데이터", "data"],
  ["서버", "server"],
  ["네트워크", "network"],
  ["신호", "signal"],
  ["과학", "science"],
  ["지리", "geography"],
  ["미술", "artwork"],
  ["숙제", "homework"],
  ["프로젝트", "project"],
  ["시험", "exam"],
  ["질문", "question"],
  ["정답", "answer"],
  ["주제", "topic"],
  ["수업", "lesson"],
  ["단원", "chapter"],
  ["시간표", "schedule"],
  ["사전", "dictionary"],
  ["문장", "sentence"],
  ["문단", "paragraph"],
  ["대화", "conversation"],
  ["발음", "pronunciation"],
  ["문법", "grammar"],
  ["어휘", "vocabulary"],
  ["번역", "translation"],
  ["의미", "meaning"],
  ["빌리다", "borrow"],
  ["돌려주다", "return"],
  ["설명하다", "explain"],
  ["연습하다", "practice"],
  ["향상시키다", "improve"],
  ["기억하다", "remember"],
  ["잊다", "forget"],
  ["비교하다", "compare"],
  ["결정하다", "decide"],
  ["준비하다", "prepare"],
  ["계획하다", "plan"],
  ["정리하다", "organize"],
  ["포함하다", "include"],
  ["변경하다", "change"],
  ["옮기다", "move"],
  ["나르다", "carry"],
  ["들어올리다", "lift"],
  ["밀다", "push"],
  ["당기다", "pull"],
  ["던지다", "throw"],
  ["잡다", "catch"],
  ["이기다", "win"],
  ["지다", "lose"],
  ["자라다", "grow"],
  ["줄이다", "reduce"],
  ["늘리다", "increase"],
  ["저축하다", "save"],
  ["소비하다", "spend"],
  ["확인하다", "check"],
  ["해결하다", "solve"],
  ["만들어내다", "create"],
  ["발견하다", "discover"],
  ["보호하다", "protect"],
  ["존중하다", "respect"],
  ["약속하다", "promise"],
  ["지지하다", "support"],
  ["초대하다", "invite"],
  ["수락하다", "accept"],
  ["거절하다", "reject"],
  ["밝은", "bright"],
  ["어두운", "dark"],
  ["조용한", "quiet"],
  ["시끄러운", "noisy"],
  ["안전한", "safe"],
  ["위험한", "dangerous"],
  ["유명한", "famous"],
  ["특별한", "special"],
  ["간단한", "simple"],
  ["어려운", "difficult"],
  ["이른", "early"],
  ["늦은", "late"],
  ["올바른", "correct"],
  ["틀린", "wrong"],
  ["가능한", "possible"],
  ["중요한", "important"],
  ["유용한", "useful"],
  ["친근한", "friendly"],
  ["오늘", "today"],
  ["내일", "tomorrow"],
  ["어제", "yesterday"],
  ["주", "week"],
  ["개월", "month"],
  ["해", "year"],
  ["시간", "hour"],
  ["분", "minute"],
  ["초", "second"],
  ["순간", "moment"],
  ["미래", "future"],
  ["과거", "past"],
  ["현재", "present"]
];
function buildWordPracticeSentence(english, index = 0) {
  const safe = String(english || "").trim();
  const templates = [
    `I use "${safe}" a lot these days.`,
    `Could you explain what "${safe}" means?`,
    `Let's practice "${safe}" in a real conversation.`,
    `I heard "${safe}" in a daily situation.`,
    `I want to remember "${safe}" for real life.`
  ];
  return templates[Math.abs(index) % templates.length];
}
const ENGLISH_ADVANCED_WORD_LESSONS = [
  { korean: "예약을 확정하다", english: "confirm a reservation", sentence: "I'd like to confirm a reservation under Kim." },
  { korean: "예약을 변경하다", english: "change my reservation", sentence: "Can I change my reservation to tomorrow?" },
  { korean: "예약을 취소하다", english: "cancel my reservation", sentence: "I need to cancel my reservation due to an emergency." },
  { korean: "환불을 요청하다", english: "request a refund", sentence: "I'd like to request a refund for this order." },
  { korean: "교환을 요청하다", english: "ask for an exchange", sentence: "Could I ask for an exchange in a different size?" },
  { korean: "영수증을 재발급받다", english: "get a duplicate receipt", sentence: "Could I get a duplicate receipt, please?" },
  { korean: "탑승권", english: "boarding pass", sentence: "Please show your boarding pass at the gate." },
  { korean: "휴대 수하물", english: "carry-on luggage", sentence: "Is this bag okay as carry-on luggage?" },
  { korean: "수하물 찾는 곳", english: "baggage claim", sentence: "Where is the baggage claim area?" },
  { korean: "환승 게이트", english: "connecting gate", sentence: "How long will it take to reach the connecting gate?" },
  { korean: "체크인하다", english: "check in", sentence: "I'd like to check in for my flight." },
  { korean: "체크아웃하다", english: "check out", sentence: "I'd like to check out early tomorrow morning." },
  { korean: "마감 시간을 맞추다", english: "meet the deadline", sentence: "We have to meet the deadline by Friday." },
  { korean: "일정을 다시 조정하다", english: "reschedule the meeting", sentence: "Could we reschedule the meeting to next week?" },
  { korean: "우선순위를 정하다", english: "set priorities", sentence: "Let's set priorities before we start." },
  { korean: "진행 상황 보고서", english: "progress report", sentence: "I'll send the progress report this evening." },
  { korean: "장기 계획", english: "long-term strategy", sentence: "We need a long-term strategy for this project." },
  { korean: "단기 목표", english: "short-term objective", sentence: "Our short-term objective is to stabilize the service." },
  { korean: "협업 도구", english: "collaboration tool", sentence: "Which collaboration tool does your team use?" },
  { korean: "의사 결정", english: "decision-making process", sentence: "Please explain your decision-making process." },
  { korean: "문제 해결책", english: "practical solution", sentence: "We need a practical solution, not just an idea." },
  { korean: "예외 상황", english: "edge case", sentence: "Did we test this edge case in production-like data?" },
  { korean: "대체 방안", english: "backup plan", sentence: "Let's prepare a backup plan just in case." },
  { korean: "임시 해결책", english: "temporary workaround", sentence: "This is a temporary workaround until we patch it." },
  { korean: "근본 원인", english: "root cause", sentence: "We should identify the root cause first." },
  { korean: "호환성", english: "cross-platform compatibility", sentence: "Cross-platform compatibility is a key requirement." },
  { korean: "배포하다", english: "deploy to production", sentence: "We plan to deploy to production tonight." },
  { korean: "롤백하다", english: "roll back the release", sentence: "If errors spike, we'll roll back the release." },
  { korean: "서비스 중단", english: "service outage", sentence: "We experienced a brief service outage this morning." },
  { korean: "접속 지연", english: "network latency", sentence: "Network latency is affecting the response time." },
  { korean: "권한 설정", english: "access permission", sentence: "You need access permission to view this document." },
  { korean: "이중 인증", english: "two-factor authentication", sentence: "Please enable two-factor authentication for security." },
  { korean: "개인정보 처리방침", english: "privacy policy", sentence: "Our privacy policy was updated yesterday." },
  { korean: "약관", english: "terms and conditions", sentence: "Please read the terms and conditions carefully." },
  { korean: "취소 수수료", english: "cancellation fee", sentence: "There is a cancellation fee after midnight." },
  { korean: "환율", english: "exchange rate", sentence: "The exchange rate changed significantly today." },
  { korean: "세전 가격", english: "price before tax", sentence: "What's the price before tax?" },
  { korean: "배송 조회 번호", english: "tracking number", sentence: "Could you send me the tracking number?" },
  { korean: "배송 지연", english: "shipping delay", sentence: "We're sorry for the unexpected shipping delay." },
  { korean: "재고 부족", english: "out of stock", sentence: "That item is currently out of stock." },
  { korean: "재입고 알림", english: "restock notification", sentence: "Please sign up for a restock notification." },
  { korean: "공식 공지", english: "official announcement", sentence: "Please check the official announcement for details." },
  { korean: "문의 사항", english: "customer inquiry", sentence: "We responded to every customer inquiry." },
  { korean: "양해 부탁드립니다", english: "thank you for your understanding", sentence: "Thank you for your understanding while we fix the issue." },
  { korean: "불편을 드려 죄송합니다", english: "we apologize for the inconvenience", sentence: "We apologize for the inconvenience caused by the delay." },
  { korean: "확인 후 연락드리겠습니다", english: "I'll get back to you after checking", sentence: "I'll get back to you after checking with the team." },
  { korean: "잠시만 기다려 주세요", english: "please bear with us for a moment", sentence: "Please bear with us for a moment while we investigate." },
  { korean: "좀 더 구체적으로 설명해 주실래요?", english: "could you clarify that a bit more", sentence: "Could you clarify that a bit more?" },
  { korean: "요점을 정리해 주세요", english: "summarize the key points", sentence: "Could you summarize the key points for me?" },
  { korean: "핵심만 말씀드리면", english: "to put it briefly", sentence: "To put it briefly, we need more time." },
  { korean: "다시 확인해 보겠습니다", english: "let me double-check", sentence: "Let me double-check and update you soon." },
  { korean: "가능한 한 빨리", english: "as soon as possible", sentence: "I'll send the file as soon as possible." },
  { korean: "일정이 겹치다", english: "have a scheduling conflict", sentence: "I have a scheduling conflict at that time." }
];
const ENGLISH_MEGA_LESSONS = ENGLISH_MEGA_WORDS.map(([korean, english], index) => ({
  korean,
  english,
  sentence: buildWordPracticeSentence(english, index)
}));
const mergedEnglishLessons = [
  ...ENGLISH_LESSONS,
  ...ENGLISH_EXTRA_LESSONS,
  ...ENGLISH_MEGA_LESSONS,
  ...ENGLISH_ADVANCED_WORD_LESSONS
];
const seenEnglishWords = new Set();
ENGLISH_LESSONS.length = 0;
mergedEnglishLessons.forEach((lesson, index) => {
  if (!lesson || typeof lesson !== "object") return;
  const english = String(lesson.english || "")
    .trim()
    .toLowerCase();
  const korean = String(lesson.korean || "").trim();
  if (!english || !korean || seenEnglishWords.has(english)) return;
  seenEnglishWords.add(english);
  ENGLISH_LESSONS.push({
    korean,
    english,
    sentence: String(lesson.sentence || buildWordPracticeSentence(english, index)).trim()
  });
});
const ENGLISH_ADVANCED_WORD_SET = new Set(
  ENGLISH_ADVANCED_WORD_LESSONS.map((lesson) => String(lesson.english || "").trim().toLowerCase()).filter(Boolean)
);
const ENGLISH_SPEAKING_MISSIONS = [
  { level: "beginner", korean: "처음 만난 사람에게 인사", sentence: "Hi, nice to meet you." },
  { level: "beginner", korean: "오늘 기분 묻기", sentence: "How are you today?" },
  { level: "beginner", korean: "도움 요청", sentence: "Can you help me, please?" },
  { level: "beginner", korean: "길 묻기", sentence: "Where is the subway station?" },
  { level: "beginner", korean: "가게에서 가격 묻기", sentence: "How much is this?" },
  { level: "beginner", korean: "메뉴 주문", sentence: "I'd like a sandwich, please." },
  { level: "beginner", korean: "물 요청", sentence: "Could I have some water?" },
  { level: "beginner", korean: "시간 묻기", sentence: "What time is it now?" },
  { level: "beginner", korean: "화장실 위치 묻기", sentence: "Excuse me, where is the restroom?" },
  { level: "beginner", korean: "감사 인사", sentence: "Thank you for your help." },
  { level: "beginner", korean: "사과 표현", sentence: "I'm sorry I'm late." },
  { level: "beginner", korean: "반복 요청", sentence: "Could you say that again?" },
  { level: "beginner", korean: "천천히 말해달라고 요청", sentence: "Please speak a little slower." },
  { level: "beginner", korean: "의견 말하기", sentence: "I think this is a good idea." },
  { level: "beginner", korean: "작별 인사", sentence: "See you tomorrow." },

  { level: "intermediate", korean: "카페 추천 받기", sentence: "Could you recommend a good cafe nearby?" },
  { level: "intermediate", korean: "회의 일정 조정", sentence: "Can we move the meeting to Friday afternoon?" },
  { level: "intermediate", korean: "지각 양해 구하기", sentence: "I might be ten minutes late because of traffic." },
  { level: "intermediate", korean: "음식 알레르기 설명", sentence: "I have a peanut allergy, so I can't eat this." },
  { level: "intermediate", korean: "호텔 체크인 요청", sentence: "I have a reservation under the name Minji Kim." },
  { level: "intermediate", korean: "와이파이 비밀번호 문의", sentence: "Could you tell me the Wi-Fi password, please?" },
  { level: "intermediate", korean: "교환/환불 문의", sentence: "Can I exchange this item if it does not fit?" },
  { level: "intermediate", korean: "택시 기사에게 목적지 설명", sentence: "Could you take me to the city hall, please?" },
  { level: "intermediate", korean: "전화 연결 요청", sentence: "May I speak to the customer support team?" },
  { level: "intermediate", korean: "프로젝트 진행 공유", sentence: "The project is on track, but we need more testing." },
  { level: "intermediate", korean: "이유 설명", sentence: "I couldn't join because I was finishing another task." },
  { level: "intermediate", korean: "제안하기", sentence: "Why don't we split the work and finish faster?" },
  { level: "intermediate", korean: "확인 요청", sentence: "Could you check this file before we send it?" },
  { level: "intermediate", korean: "약속 변경 요청", sentence: "Would it be okay to reschedule our appointment?" },
  { level: "intermediate", korean: "길 상세 안내 요청", sentence: "Is there an easier way to get there by bus?" },

  { level: "advanced", korean: "회의 시작 전 정중한 요청", sentence: "Before we begin, could everyone briefly share their priorities for this week?" },
  { level: "advanced", korean: "문제 원인 분석 요청", sentence: "Let's identify the root cause first before deciding on a temporary workaround." },
  { level: "advanced", korean: "일정 지연 설명", sentence: "The release was delayed because we found a critical issue in final testing." },
  { level: "advanced", korean: "협업 방식 제안", sentence: "If we align on the scope today, we can avoid unnecessary revisions later." },
  { level: "advanced", korean: "합리적 반대 의견", sentence: "I understand your point, but we should also consider the long-term impact." },
  { level: "advanced", korean: "대안 제시", sentence: "As an alternative, we could roll out the feature to a smaller user group first." },
  { level: "advanced", korean: "고객 응대 문장", sentence: "We apologize for the inconvenience and appreciate your patience while we resolve this." },
  { level: "advanced", korean: "요점 정리", sentence: "To summarize, we need approval on budget, timeline, and staffing by tomorrow." },
  { level: "advanced", korean: "위험 요소 경고", sentence: "There is a high risk of service disruption unless we complete the migration tonight." },
  { level: "advanced", korean: "의사 결정 촉구", sentence: "Could we make a final decision now so the team can proceed without confusion?" },
  { level: "advanced", korean: "상대 의견 수용 후 제안", sentence: "That makes sense, and I'd suggest adding a backup plan as well." },
  { level: "advanced", korean: "업무 우선순위 조정", sentence: "Given the deadline, we should prioritize stability over adding new features." },
  { level: "advanced", korean: "문서 수정 요청", sentence: "Please revise the document to reflect the updated terms and conditions." },
  { level: "advanced", korean: "협상 문장", sentence: "If you can lower the cancellation fee, we are ready to sign the contract today." },
  { level: "advanced", korean: "명확화 요청", sentence: "Could you clarify what success would look like for this project?" },
  { level: "advanced", korean: "조건부 동의", sentence: "I'm okay with that plan as long as we monitor the results closely." },
  { level: "advanced", korean: "후속 조치 안내", sentence: "I'll follow up with a detailed report once we validate the data." },
  { level: "advanced", korean: "회의 종료 멘트", sentence: "Thanks everyone, let's reconvene next Tuesday with updated action items." }
];
const ENGLISH_EXTRA_SPEAKING_MISSIONS = [
  { level: "beginner", korean: "간단한 자기소개", sentence: "Hi, I'm Jisoo, and I'm from Seoul." },
  { level: "beginner", korean: "취미 말하기", sentence: "I like listening to music after school." },
  { level: "beginner", korean: "날씨 이야기", sentence: "It's sunny today, so let's go outside." },
  { level: "beginner", korean: "약속 잡기", sentence: "Are you free this Saturday afternoon?" },
  { level: "beginner", korean: "필요한 것 요청", sentence: "Could you pass me that notebook?" },
  { level: "beginner", korean: "교통수단 말하기", sentence: "I usually take the bus to school." },
  { level: "beginner", korean: "선호 표현", sentence: "I prefer tea, but coffee is okay too." },
  { level: "beginner", korean: "동의 표현", sentence: "Yes, that sounds great to me." },
  { level: "beginner", korean: "계획 공유", sentence: "I'm going to study English tonight." },
  { level: "beginner", korean: "간단한 부탁", sentence: "Please wait here for a minute." },

  { level: "intermediate", korean: "회의 시작 멘트", sentence: "Thanks for joining, let's get started with today's agenda." },
  { level: "intermediate", korean: "문제 상황 전달", sentence: "We're seeing an issue that affects users during checkout." },
  { level: "intermediate", korean: "업무 분담 제안", sentence: "How about I handle the report while you prepare the slides?" },
  { level: "intermediate", korean: "상황 확인 요청", sentence: "Could you update me on the current progress?" },
  { level: "intermediate", korean: "우선순위 확인", sentence: "Which task should we prioritize first?" },
  { level: "intermediate", korean: "서비스 문의 전화", sentence: "I'm calling to ask about my delayed package." },
  { level: "intermediate", korean: "약속 시간 조율", sentence: "Would 3 p.m. work better for you?" },
  { level: "intermediate", korean: "요청 거절하기", sentence: "I'm sorry, but I can't make it at that time." },
  { level: "intermediate", korean: "요청 수락하기", sentence: "Sure, I can take care of that by noon." },
  { level: "intermediate", korean: "의견 제시", sentence: "In my opinion, this approach is more efficient." },

  { level: "advanced", korean: "위험 관리 언급", sentence: "From a risk management perspective, we should validate the assumptions first." },
  { level: "advanced", korean: "대안 비교", sentence: "Option A is faster, but Option B is more sustainable in the long run." },
  { level: "advanced", korean: "의견 조율", sentence: "Let's align on the objective before debating implementation details." },
  { level: "advanced", korean: "성과 회고", sentence: "Although we met the target, there is still room to improve reliability." },
  { level: "advanced", korean: "갈등 완화 표현", sentence: "I see where you're coming from, and I think both concerns are valid." },
  { level: "advanced", korean: "현실적 일정 제안", sentence: "Given the scope, a phased rollout would be more realistic." },
  { level: "advanced", korean: "협상 문장", sentence: "If we extend the timeline by one week, we can deliver higher quality." },
  { level: "advanced", korean: "종합 정리", sentence: "To wrap up, we've agreed on the scope, owner, and deadline." },
  { level: "advanced", korean: "문제 해결 방향 제시", sentence: "Let's focus on actions we can execute immediately while monitoring the impact." },
  { level: "advanced", korean: "명확한 요청", sentence: "Could you provide concrete examples so we can make a data-driven decision?" }
];
ENGLISH_SPEAKING_MISSIONS.push(...ENGLISH_EXTRA_SPEAKING_MISSIONS);
const ENGLISH_ALL_LESSON_INDEXES = Array.from({ length: ENGLISH_LESSONS.length }, (_, index) => index);
const ENGLISH_LEVEL_POOLS = Object.fromEntries(ENGLISH_LEVEL_KEYS.map((levelKey) => [levelKey, buildEnglishLevelPool(levelKey)]));
const HISTORY_QUESTION_BANK = {
  grade4: [
    {
      question: "고조선을 건국한 인물은 누구일까요?",
      options: ["단군왕검", "주몽", "박혁거세", "온조"],
      answer: "단군왕검",
      explanation: "고조선은 단군왕검이 세운 나라로 전해져요."
    },
    {
      question: "고려를 세운 왕은 누구일까요?",
      options: ["왕건", "궁예", "견훤", "광종"],
      answer: "왕건",
      explanation: "왕건은 918년에 고려를 건국했어요."
    },
    {
      question: "조선을 건국한 인물은 누구일까요?",
      options: ["이성계", "이방원", "정도전", "최영"],
      answer: "이성계",
      explanation: "이성계는 1392년에 조선을 세웠어요."
    },
    {
      question: "훈민정음을 창제한 왕은 누구일까요?",
      options: ["세종", "태종", "성종", "세조"],
      answer: "세종",
      explanation: "세종은 백성을 위해 훈민정음을 만들었어요."
    },
    {
      question: "임진왜란 때 거북선을 활약시킨 장군은 누구일까요?",
      options: ["이순신", "권율", "곽재우", "원균"],
      answer: "이순신",
      explanation: "이순신 장군은 거북선으로 해전에서 큰 승리를 거두었어요."
    },
    {
      question: "신라가 삼국 통일 과정에서 손잡은 나라는 어디일까요?",
      options: ["당", "수", "원", "왜"],
      answer: "당",
      explanation: "신라는 당과 연합해 백제와 고구려를 무너뜨렸어요."
    },
    {
      question: "광개토대왕은 어느 나라의 왕일까요?",
      options: ["고구려", "백제", "신라", "발해"],
      answer: "고구려",
      explanation: "광개토대왕은 고구려의 영토를 크게 넓혔어요."
    },
    {
      question: "팔만대장경이 만들어진 시대는 어디일까요?",
      options: ["고려", "조선", "신라", "백제"],
      answer: "고려",
      explanation: "팔만대장경은 고려가 몽골 침입기에 만든 불교 경전판이에요."
    },
    {
      question: "3.1 운동이 일어난 해는 언제일까요?",
      options: ["1919년", "1905년", "1945년", "1894년"],
      answer: "1919년",
      explanation: "1919년 3월 1일, 전국에서 독립 만세 운동이 전개되었어요."
    },
    {
      question: "대한민국 정부 수립은 어느 해일까요?",
      options: ["1948년", "1945년", "1919년", "1950년"],
      answer: "1948년",
      explanation: "대한민국 정부는 1948년에 수립되었어요."
    },
    {
      question: "발해를 세운 인물은 누구일까요?",
      options: ["대조영", "장보고", "김춘추", "궁예"],
      answer: "대조영",
      explanation: "대조영은 고구려 유민과 말갈 세력을 이끌고 발해를 세웠어요."
    },
    {
      question: "경복궁을 처음 지은 조선의 왕은 누구일까요?",
      options: ["태조", "세종", "영조", "고종"],
      answer: "태조",
      explanation: "경복궁은 조선 건국 직후 태조 때 처음 지어졌어요."
    }
  ],
  grade3: [
    {
      question: "고려에서 과거제를 실시한 왕은 누구일까요?",
      options: ["광종", "태조", "성종", "공민왕"],
      answer: "광종",
      explanation: "광종은 과거제를 실시해 왕권을 강화했어요."
    },
    {
      question: "여진 정벌을 위해 별무반을 조직한 인물은 누구일까요?",
      options: ["윤관", "강감찬", "서희", "김부식"],
      answer: "윤관",
      explanation: "윤관은 별무반을 이끌고 동북 9성을 쌓았어요."
    },
    {
      question: "직지심체요절이 인쇄된 시기의 국가는 어디일까요?",
      options: ["고려", "조선", "신라", "대한제국"],
      answer: "고려",
      explanation: "직지는 고려 후기 금속활자로 인쇄된 책이에요."
    },
    {
      question: "탕평책을 적극적으로 추진한 조선의 왕은 누구일까요?",
      options: ["영조", "선조", "중종", "고종"],
      answer: "영조",
      explanation: "영조는 붕당 간 갈등을 줄이기 위해 탕평책을 폈어요."
    },
    {
      question: "대동법을 처음 시행한 조선의 왕은 누구일까요?",
      options: ["광해군", "태조", "세종", "순조"],
      answer: "광해군",
      explanation: "대동법은 광해군 때 경기도에서 처음 시행되었어요."
    },
    {
      question: "흥선대원군의 통상 수교 거부 정책을 보여주는 상징물은 무엇일까요?",
      options: ["척화비", "독립문", "황룡사 9층 목탑", "대동여지도"],
      answer: "척화비",
      explanation: "척화비에는 외세를 배척한다는 내용이 새겨졌어요."
    },
    {
      question: "1884년에 일어난 갑신정변을 주도한 세력은 누구일까요?",
      options: ["급진 개화파", "온건 개화파", "위정척사파", "동학 농민군"],
      answer: "급진 개화파",
      explanation: "갑신정변은 급진 개화파가 일본의 도움을 받아 추진했어요."
    },
    {
      question: "동학 농민 운동이 본격적으로 전개된 해는 언제일까요?",
      options: ["1894년", "1882년", "1905년", "1919년"],
      answer: "1894년",
      explanation: "1894년 전봉준이 이끈 동학 농민군이 봉기했어요."
    },
    {
      question: "대한제국을 선포한 인물은 누구일까요?",
      options: ["고종", "순종", "흥선대원군", "김홍집"],
      answer: "고종",
      explanation: "고종은 1897년에 대한제국을 선포했어요."
    },
    {
      question: "독립협회 활동을 주도한 인물은 누구일까요?",
      options: ["서재필", "안창호", "신채호", "윤봉길"],
      answer: "서재필",
      explanation: "서재필은 독립신문을 발행하고 독립협회를 이끌었어요."
    },
    {
      question: "을사늑약이 강제로 체결된 해는 언제일까요?",
      options: ["1905년", "1910년", "1895년", "1945년"],
      answer: "1905년",
      explanation: "을사늑약으로 대한제국의 외교권이 빼앗겼어요."
    },
    {
      question: "대한민국 임시정부가 수립된 도시는 어디일까요?",
      options: ["상하이", "도쿄", "서울", "평양"],
      answer: "상하이",
      explanation: "대한민국 임시정부는 1919년 중국 상하이에서 수립되었어요."
    }
  ],
  grade2: [
    {
      question: "고려 공민왕 때 권문세족의 토지 문제를 바로잡기 위해 설치한 기구는 무엇일까요?",
      options: ["전민변정도감", "의정부", "집현전", "홍문관"],
      answer: "전민변정도감",
      explanation: "전민변정도감은 불법 점유 토지와 노비 문제를 바로잡았어요."
    },
    {
      question: "조선 성종 때 완성된 기본 법전은 무엇일까요?",
      options: ["경국대전", "대전회통", "속대전", "대명률"],
      answer: "경국대전",
      explanation: "경국대전은 조선의 통치 체계를 정리한 기본 법전이에요."
    },
    {
      question: "조선 후기 균역법을 시행한 왕은 누구일까요?",
      options: ["영조", "숙종", "정조", "헌종"],
      answer: "영조",
      explanation: "균역법은 군포 부담을 줄이기 위해 영조 때 시행되었어요."
    },
    {
      question: "정조가 정치 개혁을 위해 설치한 왕립 도서관은 무엇일까요?",
      options: ["규장각", "승정원", "비변사", "성균관"],
      answer: "규장각",
      explanation: "정조는 규장각을 설치해 개혁 정치 기반을 만들었어요."
    },
    {
      question: "흥선대원군이 경복궁 중건 재원 마련을 위해 발행한 화폐는 무엇일까요?",
      options: ["당백전", "상평통보", "건원중보", "별전"],
      answer: "당백전",
      explanation: "당백전 발행은 물가 상승 등 부작용을 낳았어요."
    },
    {
      question: "강화도조약(조일수호조규)을 체결한 상대 국가는 어디일까요?",
      options: ["일본", "청", "미국", "러시아"],
      answer: "일본",
      explanation: "1876년 강화도조약은 일본과 맺은 불평등 조약이에요."
    },
    {
      question: "갑오개혁 때 폐지된 제도로 옳은 것은 무엇일까요?",
      options: ["과거제", "훈구 제도", "노비 세습", "향약"],
      answer: "과거제",
      explanation: "갑오개혁으로 과거제가 폐지되고 근대적 제도 개편이 추진되었어요."
    },
    {
      question: "1910년 대한제국의 국권을 빼앗은 조약은 무엇일까요?",
      options: ["한일병합조약", "을사늑약", "강화도조약", "정미7조약"],
      answer: "한일병합조약",
      explanation: "한일병합조약으로 대한제국은 일제의 식민지가 되었어요."
    },
    {
      question: "1927년에 결성된 대표적 민족 협동 전선 단체는 무엇일까요?",
      options: ["신간회", "독립협회", "보안회", "조선물산장려회"],
      answer: "신간회",
      explanation: "신간회는 민족주의와 사회주의 계열이 함께한 단체예요."
    },
    {
      question: "1940년 중국 충칭에서 창설된 무장 독립군은 무엇일까요?",
      options: ["한국광복군", "의열단", "대한독립군", "광복회"],
      answer: "한국광복군",
      explanation: "한국광복군은 임시정부 산하 정규군으로 활동했어요."
    },
    {
      question: "6.10 만세 운동이 일어난 해는 언제일까요?",
      options: ["1926년", "1919년", "1929년", "1937년"],
      answer: "1926년",
      explanation: "순종 인산일을 계기로 6.10 만세 운동이 전개되었어요."
    },
    {
      question: "대한민국 헌법이 공포된 해는 언제일까요?",
      options: ["1948년", "1945년", "1950년", "1960년"],
      answer: "1948년",
      explanation: "제헌 헌법은 1948년에 공포되었어요."
    }
  ],
  grade1: [
    {
      question: "신라 법흥왕 때 불교가 공인된 해는 언제일까요?",
      options: ["527년", "372년", "612년", "676년"],
      answer: "527년",
      explanation: "이차돈의 순교를 계기로 불교가 공인되었어요."
    },
    {
      question: "귀주대첩에서 거란군을 크게 물리친 고려의 장군은 누구일까요?",
      options: ["강감찬", "윤관", "서희", "김부식"],
      answer: "강감찬",
      explanation: "강감찬은 1019년 귀주대첩에서 승리를 거두었어요."
    },
    {
      question: "조광조가 현량과 실시 등 개혁 정치를 추진한 왕은 누구일까요?",
      options: ["중종", "연산군", "선조", "인조"],
      answer: "중종",
      explanation: "중종 때 조광조가 사림 중심 개혁을 추진했어요."
    },
    {
      question: "숙종 시기에 빈번하게 나타난 정치 형태는 무엇일까요?",
      options: ["환국", "호패법", "실학", "북벌"],
      answer: "환국",
      explanation: "숙종 때는 정권이 급격히 교체되는 환국 정치가 반복되었어요."
    },
    {
      question: "정미7조약 체결 이후 대한제국에서 일어난 일로 옳은 것은 무엇일까요?",
      options: ["군대 해산", "독립협회 창립", "대동법 시행", "갑오개혁 단행"],
      answer: "군대 해산",
      explanation: "정미7조약 이후 대한제국 군대가 강제로 해산되었어요."
    },
    {
      question: "1911년에 일제가 민족 운동가를 탄압한 사건은 무엇일까요?",
      options: ["105인 사건", "치안유지법", "보안법 사건", "광주학생항일운동"],
      answer: "105인 사건",
      explanation: "105인 사건은 데라우치 총독 암살 모의 혐의 조작 사건이에요."
    },
    {
      question: "1929년에 시작되어 전국으로 확산된 학생 항일 운동은 무엇일까요?",
      options: ["광주학생항일운동", "6.10 만세 운동", "물산장려운동", "형평운동"],
      answer: "광주학생항일운동",
      explanation: "광주학생항일운동은 1929년 시작된 대규모 학생 독립운동이에요."
    },
    {
      question: "윤봉길 의사가 의거를 일으킨 장소는 어디일까요?",
      options: ["상하이 훙커우 공원", "도쿄 황궁", "서울 탑골공원", "난징 총독부"],
      answer: "상하이 훙커우 공원",
      explanation: "윤봉길 의사는 1932년 상하이 훙커우 공원에서 의거를 거행했어요."
    },
    {
      question: "1950년에 발발한 전쟁은 무엇일까요?",
      options: ["6.25 전쟁", "중일전쟁", "태평양전쟁", "러일전쟁"],
      answer: "6.25 전쟁",
      explanation: "1950년 6월 25일 한국전쟁이 시작되었어요."
    },
    {
      question: "남북이 자주, 평화 통일, 민족 대단결 원칙을 발표한 선언은 무엇일까요?",
      options: ["7.4 남북 공동 성명", "6.15 공동 선언", "남북 기본 합의서", "판문점 선언"],
      answer: "7.4 남북 공동 성명",
      explanation: "7.4 남북 공동 성명은 1972년에 발표되었어요."
    },
    {
      question: "1987년 대통령 직선제 개헌을 이끈 시민 운동은 무엇일까요?",
      options: ["6월 민주 항쟁", "4.19 혁명", "5.18 민주화 운동", "부마 민주 항쟁"],
      answer: "6월 민주 항쟁",
      explanation: "6월 민주 항쟁의 결과로 대통령 직선제가 도입되었어요."
    },
    {
      question: "일제 강점기 우리말과 한글을 지키기 위한 연구를 주도한 단체는 무엇일까요?",
      options: ["조선어학회", "신간회", "독립협회", "흥사단"],
      answer: "조선어학회",
      explanation: "조선어학회는 한글 맞춤법 통일안 제정 등 우리말 보존에 힘썼어요."
    }
  ]
};
const EXTRA_HISTORY_QUESTION_BANK = {
  grade4: [
    {
      question: "백제를 건국한 인물은 누구일까요?",
      options: ["온조", "주몽", "박혁거세", "대조영"],
      answer: "온조",
      explanation: "백제는 온조가 세운 나라로 알려져요."
    },
    {
      question: "신라를 건국한 인물은 누구일까요?",
      options: ["박혁거세", "김춘추", "김유신", "진흥왕"],
      answer: "박혁거세",
      explanation: "신라는 박혁거세가 건국했다고 전해져요."
    },
    {
      question: "독도를 우리 땅이라 알린 조선 후기 인물은 누구일까요?",
      options: ["안용복", "정약용", "허준", "홍대용"],
      answer: "안용복",
      explanation: "안용복은 울릉도와 독도 문제를 일본에 알렸어요."
    },
    {
      question: "광복(해방)을 맞이한 해는 언제일까요?",
      options: ["1945년", "1948년", "1919년", "1950년"],
      answer: "1945년",
      explanation: "1945년 8월 15일, 우리나라는 광복을 맞았어요."
    },
    {
      question: "한글날은 무엇을 기념하는 날일까요?",
      options: ["훈민정음 반포", "3.1 운동", "대한민국 정부 수립", "광복"],
      answer: "훈민정음 반포",
      explanation: "한글날은 훈민정음 반포를 기념하는 날이에요."
    },
    {
      question: "6.25 전쟁이 시작된 해는 언제일까요?",
      options: ["1950년", "1945년", "1960년", "1972년"],
      answer: "1950년",
      explanation: "한국전쟁은 1950년 6월 25일에 시작되었어요."
    },
    {
      question: "대한민국이 서울 올림픽을 개최한 해는 언제일까요?",
      options: ["1988년", "1972년", "2002년", "1996년"],
      answer: "1988년",
      explanation: "서울 올림픽은 1988년에 열렸어요."
    },
    {
      question: "고조선의 법으로 전해지는 것은 무엇일까요?",
      options: ["8조법", "경국대전", "속대전", "대전회통"],
      answer: "8조법",
      explanation: "고조선에는 8조법이라는 법이 있었다고 전해져요."
    },
    {
      question: "백제의 문화유산으로 유명한 무령왕릉이 있는 곳은 어디일까요?",
      options: ["공주", "경주", "부여", "개성"],
      answer: "공주",
      explanation: "무령왕릉은 충청남도 공주에 있어요."
    },
    {
      question: "고려 시대 대표적인 도자기는 무엇일까요?",
      options: ["청자", "백자", "분청사기", "토기"],
      answer: "청자",
      explanation: "고려청자는 아름다운 색과 무늬로 유명해요."
    }
  ],
  grade3: [
    {
      question: "고려 초 거란과 외교 담판으로 강동 6주를 확보한 인물은 누구일까요?",
      options: ["서희", "강감찬", "윤관", "김부식"],
      answer: "서희",
      explanation: "서희는 외교 담판으로 강동 6주를 확보했어요."
    },
    {
      question: "백제 문화를 일본에 전한 인물로 잘 알려진 사람은 누구일까요?",
      options: ["왕인", "최치원", "도선", "원효"],
      answer: "왕인",
      explanation: "왕인은 일본에 천자문과 논어를 전했다고 알려져요."
    },
    {
      question: "조선 선조 때 사림이 갈라져 형성된 두 붕당은 무엇일까요?",
      options: ["동인과 서인", "남인과 북인", "노론과 소론", "훈구와 사림"],
      answer: "동인과 서인",
      explanation: "선조 때 동인과 서인으로 나뉘며 붕당 정치가 시작되었어요."
    },
    {
      question: "정조가 개혁 정치를 위해 축조한 성곽은 무엇일까요?",
      options: ["수원 화성", "남한산성", "북한산성", "진주성"],
      answer: "수원 화성",
      explanation: "정조는 수원 화성을 건설해 개혁 기반을 다졌어요."
    },
    {
      question: "갑오개혁에서 폐지된 사회 제도로 옳은 것은 무엇일까요?",
      options: ["신분제", "호패법", "향약", "서원"],
      answer: "신분제",
      explanation: "갑오개혁으로 신분제가 공식적으로 폐지되었어요."
    },
    {
      question: "1920년 봉오동 전투를 승리로 이끈 독립군 지휘관은 누구일까요?",
      options: ["홍범도", "김좌진", "지청천", "이회영"],
      answer: "홍범도",
      explanation: "홍범도 장군은 봉오동 전투를 승리로 이끌었어요."
    },
    {
      question: "1920년 청산리 대첩의 독립군 지휘관은 누구일까요?",
      options: ["김좌진", "안중근", "윤봉길", "안창호"],
      answer: "김좌진",
      explanation: "김좌진 장군은 청산리 대첩에서 큰 승리를 거두었어요."
    },
    {
      question: "1931년 만주사변 이후 일본이 세운 괴뢰 국가는 무엇일까요?",
      options: ["만주국", "대한제국", "중화민국", "청"],
      answer: "만주국",
      explanation: "일본은 만주사변 이후 만주국을 세웠어요."
    },
    {
      question: "광복 직후 미군과 소련군의 분할 점령 기준선은 무엇이었을까요?",
      options: ["38도선", "휴전선", "DMZ", "압록강"],
      answer: "38도선",
      explanation: "광복 직후 한반도는 38도선을 기준으로 분할 점령되었어요."
    },
    {
      question: "독립협회가 자주독립의 상징으로 세운 건축물은 무엇일까요?",
      options: ["독립문", "숭례문", "흥인지문", "광화문"],
      answer: "독립문",
      explanation: "독립협회는 독립문을 세워 자주독립 의지를 나타냈어요."
    }
  ],
  grade2: [
    {
      question: "고구려 소수림왕의 업적으로 옳은 것은 무엇일까요?",
      options: ["태학 설립", "훈민정음 창제", "과거제 실시", "집현전 설치"],
      answer: "태학 설립",
      explanation: "소수림왕은 율령 반포, 불교 수용, 태학 설립을 추진했어요."
    },
    {
      question: "발해를 '해동성국'이라 부를 정도로 전성기를 이끈 왕은 누구일까요?",
      options: ["선왕", "문왕", "무왕", "대조영"],
      answer: "선왕",
      explanation: "선왕 때 발해는 영토를 넓히며 전성기를 맞았어요."
    },
    {
      question: "고려 무신정권기 최우가 정권 강화를 위해 설치한 기구는 무엇일까요?",
      options: ["교정도감", "중추원", "의정부", "삼사"],
      answer: "교정도감",
      explanation: "최우는 교정도감을 통해 실권을 장악했어요."
    },
    {
      question: "조선 전기 4군 6진 개척에 큰 역할을 한 인물은 누구일까요?",
      options: ["김종서", "강감찬", "최무선", "정도전"],
      answer: "김종서",
      explanation: "세종 때 김종서 등이 북방 개척을 추진했어요."
    },
    {
      question: "조선 후기 상공업 진흥 정책인 신해통공의 핵심 내용은 무엇일까요?",
      options: ["금난전권 폐지", "과거제 부활", "대동법 폐지", "군포 인상"],
      answer: "금난전권 폐지",
      explanation: "정조는 신해통공으로 금난전권을 폐지해 상업 활동을 넓혔어요."
    },
    {
      question: "흥선대원군이 추진한 정책으로 옳은 것은 무엇일까요?",
      options: ["서원 철폐", "의정부 서사제", "과거제 폐지", "대동법 폐지"],
      answer: "서원 철폐",
      explanation: "흥선대원군은 서원 대부분을 철폐해 재정과 왕권을 강화했어요."
    },
    {
      question: "파리강화회의에 독립 청원서를 제출하기 위해 파견된 인물은 누구일까요?",
      options: ["김규식", "이승만", "안창호", "서재필"],
      answer: "김규식",
      explanation: "김규식은 파리강화회의에 한국 독립을 청원했어요."
    },
    {
      question: "일제가 우리말 연구 단체를 탄압한 사건은 무엇일까요?",
      options: ["조선어학회 사건", "105인 사건", "치안유지법 사건", "신간회 사건"],
      answer: "조선어학회 사건",
      explanation: "1942년 조선어학회 사건으로 많은 학자가 탄압받았어요."
    },
    {
      question: "의열단을 조직한 인물은 누구일까요?",
      options: ["김원봉", "김구", "윤봉길", "안중근"],
      answer: "김원봉",
      explanation: "김원봉은 1919년 의열단을 조직해 무장 투쟁을 전개했어요."
    },
    {
      question: "브나로드 운동을 주도한 언론사는 어디일까요?",
      options: ["동아일보", "조선일보", "독립신문", "대한매일신보"],
      answer: "동아일보",
      explanation: "동아일보는 문맹 퇴치와 계몽을 위한 브나로드 운동을 전개했어요."
    }
  ],
  grade1: [
    {
      question: "수나라 대군을 물리친 살수대첩의 고구려 장군은 누구일까요?",
      options: ["을지문덕", "연개소문", "양만춘", "주몽"],
      answer: "을지문덕",
      explanation: "을지문덕은 살수대첩에서 수나라 군대를 크게 격파했어요."
    },
    {
      question: "통일 신라 신문왕의 업적으로 옳은 것은 무엇일까요?",
      options: ["관료전 지급", "훈민정음 반포", "과거제 실시", "전민변정도감 설치"],
      answer: "관료전 지급",
      explanation: "신문왕은 관료전을 지급하고 귀족 세력을 약화했어요."
    },
    {
      question: "고려 공민왕의 반원 개혁 내용으로 옳은 것은 무엇일까요?",
      options: ["기철 등 친원 세력 제거", "사림 등용", "규장각 설치", "균역법 시행"],
      answer: "기철 등 친원 세력 제거",
      explanation: "공민왕은 친원 세력을 제거하며 반원 자주 정책을 펼쳤어요."
    },
    {
      question: "병인양요가 일어난 해는 언제일까요?",
      options: ["1866년", "1871년", "1882년", "1894년"],
      answer: "1866년",
      explanation: "병인양요는 1866년 프랑스의 침략으로 일어났어요."
    },
    {
      question: "신미양요의 침략 국가는 어디였을까요?",
      options: ["미국", "프랑스", "일본", "러시아"],
      answer: "미국",
      explanation: "신미양요는 1871년 미국이 조선을 침략한 사건이에요."
    },
    {
      question: "을미의병이 일어나는 계기가 된 사건은 무엇일까요?",
      options: ["명성황후 시해", "단발령 철회", "한일병합", "갑신정변"],
      answer: "명성황후 시해",
      explanation: "을미사변(명성황후 시해)이 을미의병의 주요 계기가 되었어요."
    },
    {
      question: "3.1 운동 당시 민족 대표는 몇 명이었을까요?",
      options: ["33인", "13인", "50인", "99인"],
      answer: "33인",
      explanation: "3.1 운동에서는 민족 대표 33인이 독립 선언서를 발표했어요."
    },
    {
      question: "의열단의 투쟁 방침을 담은 '조선혁명선언'을 작성한 인물은 누구일까요?",
      options: ["신채호", "최남선", "이광수", "이승훈"],
      answer: "신채호",
      explanation: "신채호는 의열단의 이념을 담은 조선혁명선언을 작성했어요."
    },
    {
      question: "4.19 혁명의 직접적인 도화선이 된 사건은 무엇일까요?",
      options: ["3.15 부정선거", "5.16 군사정변", "6월 민주 항쟁", "유신 헌법 공포"],
      answer: "3.15 부정선거",
      explanation: "3.15 부정선거에 대한 분노가 4.19 혁명으로 이어졌어요."
    },
    {
      question: "5.18 민주화 운동이 일어난 도시는 어디일까요?",
      options: ["광주", "부산", "대구", "대전"],
      answer: "광주",
      explanation: "5.18 민주화 운동은 광주에서 일어났어요."
    }
  ]
};
const HISTORY_TIMELINE_FACTS = {
  grade4: [
    ["기원전 2333년", "고조선이 건국된 사건"],
    ["기원전 57년", "신라가 건국된 사건"],
    ["기원전 37년", "고구려가 건국된 사건"],
    ["기원전 18년", "백제가 건국된 사건"],
    ["660년", "백제가 멸망한 사건"],
    ["668년", "고구려가 멸망한 사건"],
    ["676년", "신라의 삼국 통일이 완성된 사건"],
    ["698년", "발해가 건국된 사건"],
    ["918년", "고려가 건국된 사건"],
    ["936년", "고려가 후삼국을 통일한 사건"],
    ["1392년", "조선이 건국된 사건"],
    ["1446년", "훈민정음이 반포된 사건"],
    ["1592년", "임진왜란이 시작된 사건"],
    ["1894년", "동학 농민 운동이 본격화된 사건"],
    ["1919년", "3.1 운동이 일어난 사건"],
    ["1945년", "광복을 맞이한 사건"],
    ["1948년", "대한민국 정부가 수립된 사건"],
    ["1950년", "6.25 전쟁이 발발한 사건"],
    ["1987년", "6월 민주 항쟁이 전개된 사건"],
    ["1988년", "서울 올림픽이 열린 사건"]
  ],
  grade3: [
    ["527년", "신라에서 불교가 공인된 사건"],
    ["612년", "살수대첩이 일어난 사건"],
    ["1019년", "귀주대첩이 일어난 사건"],
    ["1170년", "무신정변이 일어난 사건"],
    ["1231년", "몽골의 고려 1차 침입이 시작된 사건"],
    ["1270년", "삼별초 항쟁이 시작된 사건"],
    ["1388년", "위화도 회군이 일어난 사건"],
    ["1443년", "훈민정음이 창제된 사건"],
    ["1636년", "병자호란이 일어난 사건"],
    ["1750년", "균역법이 시행된 사건"],
    ["1776년", "정조가 즉위하고 규장각을 설치한 사건"],
    ["1866년", "병인양요가 일어난 사건"],
    ["1871년", "신미양요가 일어난 사건"],
    ["1876년", "강화도조약이 체결된 사건"],
    ["1882년", "임오군란이 일어난 사건"],
    ["1884년", "갑신정변이 일어난 사건"],
    ["1895년", "을미사변이 일어난 사건"],
    ["1897년", "대한제국이 선포된 사건"],
    ["1905년", "을사늑약이 체결된 사건"],
    ["1910년", "한일병합조약이 체결된 사건"],
    ["1920년", "봉오동 전투와 청산리 대첩이 일어난 해"],
    ["1929년", "광주학생항일운동이 시작된 사건"],
    ["1940년", "한국광복군이 창설된 사건"],
    ["1953년", "한국전쟁 정전협정이 체결된 사건"]
  ],
  grade2: [
    ["372년", "고구려가 불교를 수용한 사건"],
    ["384년", "백제가 불교를 수용한 사건"],
    ["958년", "고려에서 과거제가 실시된 사건"],
    ["1135년", "묘청의 서경 천도 운동이 일어난 사건"],
    ["1274년", "고려-몽골 연합군의 1차 일본 원정이 이루어진 사건"],
    ["1356년", "공민왕이 반원 자주 개혁을 본격화한 사건"],
    ["1455년", "세조가 즉위한 사건"],
    ["1485년", "경국대전이 완성된 사건"],
    ["1791년", "신해통공이 시행된 사건"],
    ["1801년", "신유박해가 일어난 사건"],
    ["1811년", "홍경래의 난이 일어난 사건"],
    ["1862년", "임술농민봉기가 일어난 사건"],
    ["1907년", "정미7조약 체결과 군대 해산이 일어난 사건"],
    ["1926년", "6.10 만세 운동이 일어난 사건"],
    ["1931년", "만주사변이 일어난 사건"],
    ["1932년", "윤봉길 의사가 훙커우 공원 의거를 일으킨 사건"],
    ["1946년", "미소공동위원회가 개최된 사건"],
    ["1960년", "4.19 혁명이 일어난 사건"],
    ["1961년", "5.16 군사정변이 일어난 사건"],
    ["1972년", "7.4 남북 공동 성명이 발표된 사건"],
    ["1991년", "남북 기본 합의서가 채택된 사건"],
    ["2000년", "6.15 남북 공동 선언이 발표된 사건"]
  ],
  grade1: [
    ["1911년", "105인 사건이 발생한 사건"],
    ["1927년", "신간회가 창립된 사건"],
    ["1937년", "중일전쟁 발발 이후 민족말살정책이 강화된 사건"],
    ["1942년", "조선어학회 사건이 발생한 사건"],
    ["1948년", "제헌 헌법 공포와 대한민국 정부 수립이 이루어진 사건"],
    ["1954년", "사사오입 개헌이 이루어진 사건"],
    ["1965년", "한일 기본 조약이 체결된 사건"],
    ["1972년", "유신 헌법이 선포된 사건"],
    ["1979년", "10.26 사건이 발생한 사건"],
    ["1980년", "5.18 민주화 운동이 전개된 사건"],
    ["1987년", "6월 민주 항쟁과 9차 개헌이 이루어진 사건"],
    ["1993년", "문민정부가 출범한 사건"],
    ["1997년", "외환 위기가 발생한 사건"],
    ["2002년", "한일 월드컵이 개최된 사건"],
    ["2007년", "10.4 남북 정상 선언이 발표된 사건"],
    ["2018년", "판문점 선언이 발표된 사건"]
  ]
};

function buildHistoryYearOptions(targetYear, yearPool, baseIndex) {
  const options = [targetYear];
  let step = 1;
  while (options.length < 4 && step < yearPool.length + 1) {
    const forward = yearPool[(baseIndex + step) % yearPool.length];
    if (forward && !options.includes(forward)) {
      options.push(forward);
    }
    const backwardIndex = (baseIndex - step + yearPool.length) % yearPool.length;
    const backward = yearPool[backwardIndex];
    if (options.length < 4 && backward && !options.includes(backward)) {
      options.push(backward);
    }
    step += 1;
  }
  return options.slice(0, 4);
}

function buildHistoryEventOptions(targetEvent, eventPool, baseIndex, excludedEvent = "") {
  const options = [targetEvent];
  let step = 1;
  while (options.length < 4 && step < eventPool.length + 1) {
    const forward = eventPool[(baseIndex + step) % eventPool.length];
    if (forward && forward !== excludedEvent && !options.includes(forward)) {
      options.push(forward);
    }
    const backwardIndex = (baseIndex - step + eventPool.length) % eventPool.length;
    const backward = eventPool[backwardIndex];
    if (options.length < 4 && backward && backward !== excludedEvent && !options.includes(backward)) {
      options.push(backward);
    }
    step += 1;
  }
  return options.slice(0, 4);
}

function buildHistoryTimelineQuestions(entries) {
  if (!Array.isArray(entries) || entries.length === 0) return [];
  const yearPool = entries.map((entry) => String(entry[0] || "").trim()).filter(Boolean);
  return entries.map(([year, event], index) => {
    const safeYear = String(year || "").trim();
    const safeEvent = String(event || "").trim();
    return {
      question: `${safeEvent}은(는) 몇 년에 일어났을까요?`,
      options: buildHistoryYearOptions(safeYear, yearPool, index),
      answer: safeYear,
      explanation: `${safeEvent}은(는) ${safeYear}에 일어났어요.`
    };
  });
}

function buildHistoryTimelineYearToEventQuestions(entries) {
  if (!Array.isArray(entries) || entries.length === 0) return [];
  const eventPool = entries.map((entry) => String(entry[1] || "").trim()).filter(Boolean);
  return entries.map(([year, event], index) => {
    const safeYear = String(year || "").trim();
    const safeEvent = String(event || "").trim();
    return {
      question: `${safeYear}년에 일어난 사건은 무엇일까요?`,
      options: buildHistoryEventOptions(safeEvent, eventPool, index),
      answer: safeEvent,
      explanation: `${safeYear}년에는 ${safeEvent}이(가) 일어났어요.`
    };
  });
}

function buildHistoryTimelineNextQuestions(entries) {
  if (!Array.isArray(entries) || entries.length < 2) return [];
  const eventPool = entries.map((entry) => String(entry[1] || "").trim()).filter(Boolean);
  const questions = [];

  for (let index = 0; index < entries.length - 1; index += 1) {
    const currentEvent = String(entries[index][1] || "").trim();
    const nextYear = String(entries[index + 1][0] || "").trim();
    const nextEvent = String(entries[index + 1][1] || "").trim();
    if (!currentEvent || !nextEvent) continue;

    questions.push({
      question: `"${currentEvent}" 다음에 일어난 사건은 무엇일까요?`,
      options: buildHistoryEventOptions(nextEvent, eventPool, index + 1, currentEvent),
      answer: nextEvent,
      explanation: `"${currentEvent}" 다음에는 ${nextYear}년에 ${nextEvent}이(가) 일어났어요.`
    });
  }

  return questions;
}

function buildHistoryTimelineBeforeYearQuestions(entries) {
  if (!Array.isArray(entries) || entries.length < 5) return [];
  const questions = [];

  for (let index = 1; index <= entries.length - 4; index += 1) {
    const targetYear = String(entries[index][0] || "").trim();
    const answerEvent = String(entries[index - 1][1] || "").trim();
    const distractorA = String(entries[index + 1][1] || "").trim();
    const distractorB = String(entries[index + 2][1] || "").trim();
    const distractorC = String(entries[index + 3][1] || "").trim();
    const answerYear = String(entries[index - 1][0] || "").trim();
    if (!targetYear || !answerEvent || !distractorA || !distractorB || !distractorC) continue;

    questions.push({
      question: `${targetYear}보다 먼저 일어난 사건은 무엇일까요?`,
      options: [answerEvent, distractorA, distractorB, distractorC],
      answer: answerEvent,
      explanation: `${answerEvent}은(는) ${answerYear}년에 일어나 ${targetYear}보다 먼저예요.`
    });
  }

  return questions;
}

function buildHistoryTimelineAfterYearQuestions(entries) {
  if (!Array.isArray(entries) || entries.length < 5) return [];
  const questions = [];

  for (let index = 3; index < entries.length - 1; index += 1) {
    const targetYear = String(entries[index][0] || "").trim();
    const answerEvent = String(entries[index + 1][1] || "").trim();
    const distractorA = String(entries[index - 1][1] || "").trim();
    const distractorB = String(entries[index - 2][1] || "").trim();
    const distractorC = String(entries[index - 3][1] || "").trim();
    const answerYear = String(entries[index + 1][0] || "").trim();
    if (!targetYear || !answerEvent || !distractorA || !distractorB || !distractorC) continue;

    questions.push({
      question: `${targetYear}보다 나중에 일어난 사건은 무엇일까요?`,
      options: [answerEvent, distractorA, distractorB, distractorC],
      answer: answerEvent,
      explanation: `${answerEvent}은(는) ${answerYear}년에 일어나 ${targetYear}보다 나중이에요.`
    });
  }

  return questions;
}

function dedupeHistoryQuestions(questions) {
  if (!Array.isArray(questions)) return [];
  const seen = new Set();
  const unique = [];

  questions.forEach((question) => {
    if (!question || typeof question !== "object") return;
    const prompt = String(question.question || "").trim();
    if (!prompt || seen.has(prompt)) return;
    seen.add(prompt);
    unique.push({
      question: prompt,
      options: Array.isArray(question.options) ? question.options.slice(0, 4).map((option) => String(option || "").trim()) : [],
      answer: String(question.answer || "").trim(),
      explanation: String(question.explanation || "").trim()
    });
  });

  return unique;
}

HISTORY_LEVEL_KEYS.forEach((levelKey) => {
  const baseQuestions = HISTORY_QUESTION_BANK[levelKey];
  const extraQuestions = EXTRA_HISTORY_QUESTION_BANK[levelKey];
  const timelineEntries = HISTORY_TIMELINE_FACTS[levelKey];
  const timelineYearQuestions = buildHistoryTimelineQuestions(timelineEntries);
  const timelineEventQuestions = buildHistoryTimelineYearToEventQuestions(timelineEntries);
  const timelineNextQuestions = buildHistoryTimelineNextQuestions(timelineEntries);
  const timelineBeforeQuestions = buildHistoryTimelineBeforeYearQuestions(timelineEntries);
  const timelineAfterQuestions = buildHistoryTimelineAfterYearQuestions(timelineEntries);
  const mergedQuestions = [
    ...(Array.isArray(baseQuestions) ? baseQuestions : []),
    ...(Array.isArray(extraQuestions) ? extraQuestions : []),
    ...timelineYearQuestions,
    ...timelineEventQuestions,
    ...timelineNextQuestions,
    ...timelineBeforeQuestions,
    ...timelineAfterQuestions
  ];
  HISTORY_QUESTION_BANK[levelKey] = dedupeHistoryQuestions(mergedQuestions);
});

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
  },
  history: {
    title: "곰돌이 한국사",
    subtitle: "곰돌이 선생님과 한국사능력검정시험 문제를 단계별로 연습해요.",
    bearMessage: "안녕! 난 곰돌이 선생님이야. 오늘은 한국사 실력을 키워볼까?"
  }
};

const els = {
  subjectTabs: Array.from(document.querySelectorAll("[data-subject]")),
  mathViews: Array.from(document.querySelectorAll(".math-view")),
  englishViews: Array.from(document.querySelectorAll(".english-view")),
  historyViews: Array.from(document.querySelectorAll(".history-view")),
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
  refreshHistoryRankingBtn: document.querySelector("#refreshHistoryRankingBtn"),
  rankingList: document.querySelector("#rankingList"),
  englishRankingList: document.querySelector("#englishRankingList"),
  historyRankingList: document.querySelector("#historyRankingList"),

  englishStartBtn: document.querySelector("#englishStartBtn"),
  englishGuide: document.querySelector(".english-guide"),
  englishLevelButtons: Array.from(document.querySelectorAll("[data-english-level]")),
  englishQuestionCount: document.querySelector("#englishQuestionCount"),
  englishPrompt: document.querySelector("#englishPrompt"),
  englishModePill: document.querySelector("#englishModePill"),
  englishOptions: document.querySelector("#englishOptions"),
  englishNextBtn: document.querySelector("#englishNextBtn"),
  englishSpeakActionBtn: document.querySelector("#englishSpeakActionBtn"),
  englishSpeakReplayBtn: document.querySelector("#englishSpeakReplayBtn"),
  englishSpeakMyReplayBtn: document.querySelector("#englishSpeakMyReplayBtn"),
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
  englishVoiceSupport: document.querySelector("#englishVoiceSupport"),

  historyStartBtn: document.querySelector("#historyStartBtn"),
  historyLevelButtons: Array.from(document.querySelectorAll("[data-history-level]")),
  historyQuestionCount: document.querySelector("#historyQuestionCount"),
  historyModePill: document.querySelector("#historyModePill"),
  historyPrompt: document.querySelector("#historyPrompt"),
  historyOptions: document.querySelector("#historyOptions"),
  historyNextBtn: document.querySelector("#historyNextBtn"),
  historyFeedback: document.querySelector("#historyFeedback"),
  historyFeedbackBear: document.querySelector("#historyFeedbackBear"),
  historyFeedbackText: document.querySelector("#historyFeedbackText"),
  historyCorrect: document.querySelector("#historyCorrect"),
  historyStreak: document.querySelector("#historyStreak"),
  historyBestStreak: document.querySelector("#historyBestStreak"),
  historyAccuracy: document.querySelector("#historyAccuracy"),
  historyWrongNoteGuide: document.querySelector("#historyWrongNoteGuide"),
  historyWrongNoteList: document.querySelector("#historyWrongNoteList"),
  historyRetryWrongBtn: document.querySelector("#historyRetryWrongBtn")
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
  usedQuestionSignatures: new Set(),
  themePickerOpen: false,
  rankingCorrect: null,
  englishRankingCorrect: null,
  historyRankingCorrect: null,
  subject: "math"
};

const authState = {
  token: "",
  user: null,
  googleReady: false
};

const englishState = {
  level: "beginner",
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
  usedLessonIndexes: new Set(),
  usedSpeakingMissionIndexes: new Set(),
  lastSpokenTranscript: "",
  lastSpokenAudioUrl: "",
  mediaStream: null,
  mediaRecorder: null,
  mediaChunks: [],
  playbackAudio: null,
  recordingToken: 0,
  recognition: null,
  recognizing: false
};
const historyState = {
  level: "grade4",
  sessionActive: false,
  sessionStartedAt: 0,
  questionNumber: 0,
  correct: 0,
  wrong: 0,
  streak: 0,
  bestStreak: 0,
  answered: false,
  current: null,
  usedQuestionIndexes: new Set(),
  wrongNotes: [],
  reviewMode: false,
  reviewQueue: [],
  reviewTotal: 0
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
    lastEnglishLevel: "beginner",
    lastHistoryLevel: "grade4",
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
    if (!ENGLISH_LEVELS[merged.lastEnglishLevel]) {
      merged.lastEnglishLevel = defaults.lastEnglishLevel;
    }
    if (!HISTORY_LEVELS[merged.lastHistoryLevel]) {
      merged.lastHistoryLevel = defaults.lastHistoryLevel;
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
    if (saved === "english") return "english";
    if (saved === "history") return "history";
    return "math";
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
  const safeTab = tabKey === "english" || tabKey === "history" ? tabKey : "math";
  state.subject = safeTab;

  setActive(els.subjectTabs, "subject", safeTab);
  els.mathViews.forEach((element) => {
    element.classList.toggle("hidden", safeTab !== "math");
  });
  els.englishViews.forEach((element) => {
    element.classList.toggle("hidden", safeTab !== "english");
  });
  els.historyViews.forEach((element) => {
    element.classList.toggle("hidden", safeTab !== "history");
  });
  applySubjectCopy(safeTab);
  document.title = "곰돌이 선생님";

  if (safeTab !== "english") {
    stopEnglishRecognition();
  }

  if (safeTab === "english" && !englishState.sessionActive && !englishState.current) {
    renderEnglishIdle();
  }
  if (safeTab === "history" && !historyState.sessionActive && !historyState.current) {
    renderHistoryIdle();
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
  if (els.historyFeedback) {
    els.historyFeedback.dataset.mood = mood;
  }
  if (els.historyFeedbackBear) {
    els.historyFeedbackBear.dataset.mood = mood;
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

async function fetchHistoryRankings(limit = 10) {
  try {
    const response = await fetch(getApiUrl(`/api/history/rankings?limit=${encodeURIComponent(limit)}`));
    if (!response.ok) {
      throw new Error("failed to fetch history rankings");
    }

    const payload = await response.json();
    return Array.isArray(payload.items) ? payload.items : [];
  } catch (error) {
    console.error("fetchHistoryRankings failed", error);
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

async function refreshHistoryRankings() {
  const items = await fetchHistoryRankings(10);
  if (authState.user) {
    const me = items.find((item) => item.userId === authState.user.id);
    state.historyRankingCorrect = me ? Number(me.totalCorrect || 0) : 0;
  } else {
    state.historyRankingCorrect = null;
  }
  renderRanking(els.historyRankingList, items);
}

async function refreshRankings() {
  await Promise.all([refreshMathRankings(), refreshEnglishRankings(), refreshHistoryRankings()]);
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

function makeMathQuestionSignature(question) {
  if (!question) return "";
  const operationKey = String(question.operationKey || "");
  let left = Number(question.left || 0);
  let right = Number(question.right || 0);

  if (operationKey === "add" || operationKey === "multiply") {
    if (left > right) {
      [left, right] = [right, left];
    }
  }

  return `${operationKey}:${left}:${right}`;
}

function buildUniqueMathQuestion(operationKey, levelKey) {
  const MAX_ATTEMPTS = 240;
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
    const question = buildQuestion(operationKey, levelKey);
    const signature = makeMathQuestionSignature(question);
    if (!signature || !state.usedQuestionSignatures.has(signature)) {
      if (signature) {
        state.usedQuestionSignatures.add(signature);
      }
      return question;
    }
  }

  state.usedQuestionSignatures.clear();
  const fallbackQuestion = buildQuestion(operationKey, levelKey);
  const fallbackSignature = makeMathQuestionSignature(fallbackQuestion);
  if (fallbackSignature) {
    state.usedQuestionSignatures.add(fallbackSignature);
  }
  return fallbackQuestion;
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

function speakText(text, lang = "en-US", options = {}) {
  if (!canUseSpeechSynthesis()) {
    return false;
  }
  const voiceText = String(text || "").trim();
  if (!voiceText) return false;

  const { rate = 0.92, pitch = 1.02 } = options;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(voiceText);
  utterance.lang = lang;
  utterance.rate = rate;
  utterance.pitch = pitch;
  window.speechSynthesis.speak(utterance);
  return true;
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

function setHistoryFeedback(message) {
  if (!els.historyFeedbackText) return;
  els.historyFeedbackText.textContent = `곰돌이 선생님: ${message}`;
}

function getEnglishLevel(levelKey) {
  return ENGLISH_LEVELS[levelKey] || ENGLISH_LEVELS.beginner;
}

function getHistoryLevel(levelKey) {
  return HISTORY_LEVELS[levelKey] || HISTORY_LEVELS.grade4;
}

function getHistoryQuestions(levelKey) {
  const safeLevel = getHistoryLevel(levelKey).key;
  const questions = HISTORY_QUESTION_BANK[safeLevel];
  return Array.isArray(questions) && questions.length > 0 ? questions : HISTORY_QUESTION_BANK.grade4;
}

function updateHistoryLevelUi() {
  const level = getHistoryLevel(historyState.level);
  setActive(els.historyLevelButtons, "historyLevel", level.key);
  if (els.historyStartBtn) {
    els.historyStartBtn.textContent = `${level.label} 10문제 시작`;
  }
}

function pickHistoryQuestionIndex() {
  const pool = getHistoryQuestions(historyState.level);
  const allIndexes = Array.from({ length: pool.length }, (_, index) => index);
  let availableIndexes = allIndexes.filter((index) => !historyState.usedQuestionIndexes.has(index));
  if (availableIndexes.length === 0) {
    historyState.usedQuestionIndexes.clear();
    availableIndexes = allIndexes;
  }

  const questionIndex = availableIndexes[randomInt(0, availableIndexes.length - 1)];
  historyState.usedQuestionIndexes.add(questionIndex);
  return questionIndex;
}

function buildHistoryQuestion() {
  const pool = getHistoryQuestions(historyState.level);
  const questionIndex = pickHistoryQuestionIndex();
  const question = pool[questionIndex];
  return {
    question: question.question,
    options: shuffleList([...question.options]),
    answer: question.answer,
    explanation: question.explanation
  };
}

function buildEnglishLevelPool(levelKey) {
  const level = getEnglishLevel(levelKey);
  if (ENGLISH_ALL_LESSON_INDEXES.length < 4) {
    return ENGLISH_ALL_LESSON_INDEXES;
  }

  if (level.key === "advanced") {
    const advancedPool = ENGLISH_ALL_LESSON_INDEXES.filter((index) => {
      const lesson = ENGLISH_LESSONS[index];
      if (!lesson) return false;
      const answer = String(lesson.english || "").trim().toLowerCase();
      const sentenceWordCount = normalizeEnglishText(lesson.sentence).split(" ").filter(Boolean).length;
      return ENGLISH_ADVANCED_WORD_SET.has(answer) || sentenceWordCount >= 8;
    });
    return advancedPool.length >= 4 ? advancedPool : ENGLISH_ALL_LESSON_INDEXES;
  }

  if (level.key === "intermediate") {
    const intermediatePool = ENGLISH_ALL_LESSON_INDEXES.filter((index) => {
      const lesson = ENGLISH_LESSONS[index];
      if (!lesson) return false;
      const answer = String(lesson.english || "").trim().toLowerCase();
      const tokenCount = answer.split(/\s+/).filter(Boolean).length;
      const sentenceWordCount = normalizeEnglishText(lesson.sentence).split(" ").filter(Boolean).length;
      return !ENGLISH_ADVANCED_WORD_SET.has(answer) && (tokenCount >= 2 || answer.length >= 7 || sentenceWordCount >= 6);
    });
    return intermediatePool.length >= 4 ? intermediatePool : ENGLISH_ALL_LESSON_INDEXES;
  }

  const beginnerPool = ENGLISH_ALL_LESSON_INDEXES.filter((index) => {
    const lesson = ENGLISH_LESSONS[index];
    if (!lesson) return false;
    const answer = String(lesson.english || "").trim().toLowerCase();
    const tokenCount = answer.split(/\s+/).filter(Boolean).length;
    return !ENGLISH_ADVANCED_WORD_SET.has(answer) && tokenCount === 1 && answer.length <= 8;
  });
  return beginnerPool.length >= 4 ? beginnerPool : ENGLISH_ALL_LESSON_INDEXES;
}

function getEnglishLevelPool(levelKey) {
  return ENGLISH_LEVEL_POOLS[levelKey] || ENGLISH_LEVEL_POOLS.beginner || ENGLISH_ALL_LESSON_INDEXES;
}

function getEnglishSpeakingPool(levelKey) {
  const safeLevel = getEnglishLevel(levelKey).key;
  const pool = [];
  ENGLISH_SPEAKING_MISSIONS.forEach((mission, index) => {
    if (mission.level === safeLevel) {
      pool.push(index);
    }
  });
  return pool.length > 0 ? pool : ENGLISH_SPEAKING_MISSIONS.map((_, index) => index);
}

function pickEnglishSpeakingMissionIndex(levelKey) {
  const pool = getEnglishSpeakingPool(levelKey);
  let availableIndexes = pool.filter((index) => !englishState.usedSpeakingMissionIndexes.has(index));
  if (availableIndexes.length === 0) {
    englishState.usedSpeakingMissionIndexes.clear();
    availableIndexes = pool;
  }

  const missionIndex = availableIndexes[randomInt(0, availableIndexes.length - 1)];
  englishState.usedSpeakingMissionIndexes.add(missionIndex);
  return missionIndex;
}

function updateEnglishLevelUi() {
  const level = getEnglishLevel(englishState.level);
  setActive(els.englishLevelButtons, "englishLevel", level.key);

  if (els.englishGuide) {
    els.englishGuide.textContent = `듀오링고처럼 듣고 말하며 영어를 익혀요. 현재 난이도: ${level.label}`;
  }
  if (els.englishStartBtn) {
    els.englishStartBtn.textContent = `${level.label} 영어 시작 (단어 ${ENGLISH_WORD_QUESTIONS} + 말하기 ${ENGLISH_SPEAKING_QUESTIONS})`;
  }
}

function getSpeakingNextLabel() {
  return englishState.questionNumber >= ENGLISH_SPEAKING_QUESTIONS ? "결과 보기" : "다음 문제";
}

function isEnglishSpeakingPhase() {
  return englishState.phase === ENGLISH_PHASES.SPEAKING;
}

function pickEnglishLessonIndex(levelKey) {
  const usedIndexes = englishState.usedLessonIndexes;
  const levelPool = getEnglishLevelPool(levelKey);
  let availableIndexes = levelPool.filter((index) => !usedIndexes.has(index));
  if (availableIndexes.length === 0) {
    usedIndexes.clear();
    availableIndexes = levelPool;
  }

  const lessonIndex = availableIndexes[randomInt(0, availableIndexes.length - 1)];
  usedIndexes.add(lessonIndex);
  return lessonIndex;
}

function buildEnglishWordQuestion() {
  const levelPool = getEnglishLevelPool(englishState.level);
  const lessonIndex = pickEnglishLessonIndex(englishState.level);
  const lesson = ENGLISH_LESSONS[lessonIndex];
  const options = new Set([lesson.english]);

  const levelCandidates = shuffleList(
    levelPool
      .filter((index) => index !== lessonIndex)
      .map((index) => ENGLISH_LESSONS[index].english)
      .filter((word, index, list) => list.indexOf(word) === index)
  );
  levelCandidates.forEach((word) => {
    if (options.size < 4) options.add(word);
  });

  if (options.size < 4) {
    const fallbackCandidates = shuffleList(
      ENGLISH_ALL_LESSON_INDEXES.map((index) => ENGLISH_LESSONS[index].english).filter(
        (word, index, list) => list.indexOf(word) === index
      )
    );
    fallbackCandidates.forEach((word) => {
      if (options.size < 4) options.add(word);
    });
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
  const missionIndex = pickEnglishSpeakingMissionIndex(englishState.level);
  const mission = ENGLISH_SPEAKING_MISSIONS[missionIndex];
  return {
    kind: ENGLISH_PHASES.SPEAKING,
    korean: mission.korean,
    answer: mission.sentence,
    sentence: mission.sentence,
    options: []
  };
}

function speakEnglishSentence() {
  if (!englishState.current) return false;
  const played = speakText(englishState.current.sentence, "en-US", { rate: 0.92, pitch: 1.02 });
  if (!played) {
    setEnglishSpeakingFeedback("이 브라우저는 문장 읽기를 지원하지 않을 수 있어요. Chrome 사용을 추천해요.", true);
    return false;
  }
  return true;
}

function canRecordEnglishVoice() {
  return typeof window.MediaRecorder === "function" && Boolean(navigator.mediaDevices?.getUserMedia);
}

function stopEnglishPlayback() {
  const currentPlayback = englishState.playbackAudio;
  if (!currentPlayback) return;
  try {
    currentPlayback.pause();
    currentPlayback.currentTime = 0;
  } catch {
    // Ignore playback stop failures.
  }
  englishState.playbackAudio = null;
}

function revokeEnglishRecordedAudio() {
  stopEnglishPlayback();
  const audioUrl = String(englishState.lastSpokenAudioUrl || "").trim();
  if (!audioUrl) return;
  URL.revokeObjectURL(audioUrl);
  englishState.lastSpokenAudioUrl = "";
}

function clearEnglishSpokenReplay() {
  englishState.recordingToken += 1;
  stopEnglishVoiceCapture();
  englishState.lastSpokenTranscript = "";
  revokeEnglishRecordedAudio();
}

function stopEnglishVoiceCapture() {
  const recorder = englishState.mediaRecorder;
  if (recorder) {
    if (recorder.state !== "inactive") {
      try {
        recorder.stop();
      } catch {
        // Ignore recorder stop failures.
      }
      return;
    }
    englishState.mediaRecorder = null;
  }

  if (englishState.mediaStream) {
    englishState.mediaStream.getTracks().forEach((track) => {
      track.stop();
    });
    englishState.mediaStream = null;
  }
  englishState.mediaChunks = [];
}

async function startEnglishVoiceCapture(recordingToken) {
  if (!canRecordEnglishVoice()) {
    setEnglishSpeakingFeedback("이 브라우저는 내 목소리 녹음을 지원하지 않아요. Chrome 최신 버전을 추천해요.", true);
    return false;
  }

  stopEnglishVoiceCapture();
  revokeEnglishRecordedAudio();

  let captureStream = null;
  try {
    captureStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch {
    setEnglishSpeakingFeedback("내 말 다시듣기를 위해 마이크 권한이 필요해요. 브라우저에서 마이크를 허용해 주세요.", true);
    return false;
  }

  englishState.mediaStream = captureStream;

  let recorder = null;
  try {
    recorder = new MediaRecorder(captureStream);
  } catch {
    captureStream.getTracks().forEach((track) => {
      track.stop();
    });
    englishState.mediaStream = null;
    setEnglishSpeakingFeedback("내 목소리 녹음을 시작하지 못했어요. 브라우저를 확인해 주세요.", true);
    return false;
  }

  englishState.mediaRecorder = recorder;
  const captureChunks = [];
  englishState.mediaChunks = captureChunks;

  recorder.ondataavailable = (event) => {
    if (!event.data || event.data.size <= 0) return;
    captureChunks.push(event.data);
  };

  recorder.onstop = () => {
    captureStream.getTracks().forEach((track) => {
      track.stop();
    });
    if (englishState.mediaStream === captureStream) {
      englishState.mediaStream = null;
    }
    if (englishState.mediaRecorder === recorder) {
      englishState.mediaRecorder = null;
    }
    englishState.mediaChunks = [];

    if (recordingToken === englishState.recordingToken && captureChunks.length > 0) {
      revokeEnglishRecordedAudio();
      const voiceBlob = new Blob(captureChunks, { type: recorder.mimeType || "audio/webm" });
      englishState.lastSpokenAudioUrl = URL.createObjectURL(voiceBlob);
    }
    updateEnglishSpeakingControls();
  };

  recorder.onerror = () => {
    setEnglishSpeakingFeedback("내 목소리 녹음 중 문제가 생겼어요. 다시 시도해 주세요.", true);
  };

  try {
    recorder.start();
    return true;
  } catch {
    captureStream.getTracks().forEach((track) => {
      track.stop();
    });
    englishState.mediaStream = null;
    englishState.mediaRecorder = null;
    englishState.mediaChunks = [];
    setEnglishSpeakingFeedback("내 목소리 녹음을 시작하지 못했어요. 다시 시도해 주세요.", true);
    return false;
  }
}

function updateEnglishSpeakingControls() {
  const isSpeakingPhase = isEnglishSpeakingPhase();
  const hasActiveQuestion = englishState.sessionActive && Boolean(englishState.current);
  const canGoWordNext = englishState.sessionActive && !isSpeakingPhase && englishState.answered;
  const showWordNext = englishState.sessionActive && !isSpeakingPhase;
  const showSpeakingControls = englishState.sessionActive && isSpeakingPhase;
  const showMicOff = showSpeakingControls || (!englishState.sessionActive && englishState.speakingCorrect + englishState.speakingWrong > 0);
  const hasRecordedAudio = Boolean(String(englishState.lastSpokenAudioUrl || "").trim());

  els.englishNextBtn.classList.toggle("hidden", !showWordNext);
  els.englishSpeakActionBtn.classList.toggle("hidden", !showSpeakingControls);
  els.englishSpeakReplayBtn.classList.toggle("hidden", !showSpeakingControls);
  els.englishSpeakMyReplayBtn.classList.toggle("hidden", !showSpeakingControls);
  els.englishSpeakOffBtn.classList.toggle("hidden", !showMicOff);

  els.englishNextBtn.disabled = !canGoWordNext;
  els.englishSpeakOffBtn.disabled = !showMicOff;

  if (!showSpeakingControls || !hasActiveQuestion) {
    els.englishSpeakActionBtn.textContent = "문제 시작";
    els.englishSpeakActionBtn.disabled = true;
    els.englishSpeakReplayBtn.disabled = true;
    els.englishSpeakMyReplayBtn.disabled = true;
    return;
  }

  if (englishState.recognizing) {
    els.englishSpeakActionBtn.textContent = "듣는 중...";
    els.englishSpeakActionBtn.disabled = true;
    els.englishSpeakReplayBtn.disabled = true;
    els.englishSpeakMyReplayBtn.disabled = !hasRecordedAudio;
    return;
  }

  if (englishState.speakingAction === ENGLISH_SPEAK_ACTIONS.START) {
    els.englishSpeakActionBtn.textContent = "문제 시작";
    els.englishSpeakActionBtn.disabled = false;
    els.englishSpeakReplayBtn.disabled = true;
    els.englishSpeakMyReplayBtn.disabled = !hasRecordedAudio;
    return;
  }

  if (englishState.speakingAction === ENGLISH_SPEAK_ACTIONS.RECORD) {
    els.englishSpeakActionBtn.textContent = "말하기 시작";
    els.englishSpeakActionBtn.disabled = false;
    els.englishSpeakReplayBtn.disabled = false;
    els.englishSpeakMyReplayBtn.disabled = !hasRecordedAudio;
    return;
  }

  els.englishSpeakActionBtn.textContent = getSpeakingNextLabel();
  els.englishSpeakActionBtn.disabled = false;
  els.englishSpeakReplayBtn.disabled = false;
  els.englishSpeakMyReplayBtn.disabled = !hasRecordedAudio;
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
  const levelLabel = getEnglishLevel(englishState.level).label;
  englishState.phase = ENGLISH_PHASES.WORD;
  englishState.current = null;
  englishState.answered = false;
  englishState.speakingAction = ENGLISH_SPEAK_ACTIONS.START;
  clearEnglishSpokenReplay();
  els.englishQuestionCount.textContent = "준비 완료";
  els.englishModePill.textContent = `${levelLabel} 단어 ${ENGLISH_WORD_QUESTIONS}문제 · 말하기 ${ENGLISH_SPEAKING_QUESTIONS}문제`;
  els.englishPrompt.textContent = `${levelLabel} 영어 시작 버튼을 누르면 단어 ${ENGLISH_WORD_QUESTIONS}문제가 먼저 나와요.`;
  els.englishOptions.innerHTML = "";
  els.englishNextBtn.textContent = "다음 문제";
  els.englishSpeakTarget.textContent = `단어 ${ENGLISH_WORD_QUESTIONS}문제를 끝내면 말하기 미션 ${ENGLISH_SPEAKING_QUESTIONS}문제가 시작돼요.`;
  els.englishTranscript.textContent = "내 말하기 결과: 아직 없음";
  setEnglishSpeakingFeedback("단어를 끝낸 뒤 말하기 미션에서 문제 시작 버튼을 눌러 연습해요.");
  setEnglishFeedback(`${levelLabel} 영어 준비 완료! 시작 버튼을 눌러보자.`);
  updateEnglishLevelUi();
  updateEnglishSpeakingControls();
  updateEnglishStats();
}

function renderEnglishQuestion() {
  if (!englishState.current) return;
  const levelLabel = getEnglishLevel(englishState.level).label;

  if (isEnglishSpeakingPhase()) {
    els.englishQuestionCount.textContent = `말하기 ${englishState.questionNumber} / ${ENGLISH_SPEAKING_QUESTIONS} 문제`;
    els.englishModePill.textContent = `${levelLabel} 말하기 미션`;
    const situation = String(englishState.current.korean || "").trim();
    els.englishPrompt.textContent = situation
      ? `[${situation}] 아래 문장을 듣고 따라 말해보세요.`
      : "아래 문장을 듣고 따라 말해보세요.";
    els.englishOptions.innerHTML = "";
    els.englishSpeakTarget.textContent = englishState.current.sentence;
    els.englishTranscript.textContent = "내 말하기 결과: 아직 없음";
    clearEnglishSpokenReplay();
    setEnglishSpeakingFeedback("문제 시작을 누르면 문장을 들려줘요. 그다음 말하기 시작을 눌러 따라 말해요.");
    setEnglishFeedback("말하기 미션 시작! 문장을 듣고 따라 말해보자.");
  } else {
    els.englishQuestionCount.textContent = `${englishState.questionNumber} / ${ENGLISH_WORD_QUESTIONS} 단어`;
    els.englishModePill.textContent = `${levelLabel} 단어 4지선다`;
    els.englishPrompt.innerHTML = `
      <span class="english-word-question">
        <span class="english-word-question-text">${englishState.current.korean}</span>
        <button class="english-audio-btn" type="button" data-english-audio="prompt" aria-label="문제 단어 듣기">🔊</button>
      </span>
    `;
    els.englishOptions.innerHTML = englishState.current.options
      .map((option) => {
        return `
          <div class="english-option-row">
            <button class="english-option" type="button" data-option="${option}">${option}</button>
            <button class="english-option-speak" type="button" data-option-speak="${option}" aria-label="${option} 발음 듣기">🔊</button>
          </div>
        `;
      })
      .join("");
    els.englishNextBtn.textContent = "다음 문제";
    els.englishSpeakTarget.textContent = `단어 ${ENGLISH_WORD_QUESTIONS}문제를 끝내면 말하기 미션 ${ENGLISH_SPEAKING_QUESTIONS}문제가 시작돼요.`;
    els.englishTranscript.textContent = "내 말하기 결과: 아직 없음";
    clearEnglishSpokenReplay();
    setEnglishSpeakingFeedback(`지금은 단어 미션이에요. 단어 ${ENGLISH_WORD_QUESTIONS}문제를 끝내면 말하기로 넘어가요.`);
    setEnglishFeedback("정답 단어를 골라보자!");
  }

  stopEnglishRecognition();
  englishState.speakingAction = ENGLISH_SPEAK_ACTIONS.START;
  englishState.answered = false;
  updateEnglishSpeakingControls();
}

function startEnglishSession() {
  stopEnglishRecognition();
  const levelLabel = getEnglishLevel(englishState.level).label;
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
  englishState.usedLessonIndexes.clear();
  englishState.usedSpeakingMissionIndexes.clear();
  clearEnglishSpokenReplay();
  englishState.current = buildEnglishWordQuestion();
  updateEnglishStats();
  renderEnglishQuestion();
  setBear("thinking", `${levelLabel} 영어 시간 시작! 먼저 단어 ${ENGLISH_WORD_QUESTIONS}문제를 같이 풀어보자.`);
}

function startEnglishSpeakingMission() {
  stopEnglishRecognition();
  englishState.phase = ENGLISH_PHASES.SPEAKING;
  englishState.questionNumber = 1;
  englishState.answered = false;
  englishState.speakingAction = ENGLISH_SPEAK_ACTIONS.START;
  englishState.usedSpeakingMissionIndexes.clear();
  clearEnglishSpokenReplay();
  englishState.current = buildEnglishSpeakingQuestion();
  renderEnglishQuestion();
  setBear("thinking", `좋아! 이제 말하기 미션 ${ENGLISH_SPEAKING_QUESTIONS}문제를 시작해보자.`);
  setEnglishFeedback(`${getEnglishLevel(englishState.level).label} 말하기 미션 시작! 문장 듣기 후 따라 말해보자.`);
}

function completeEnglishSession() {
  stopEnglishRecognition();
  englishState.sessionActive = false;
  englishState.speakingAction = ENGLISH_SPEAK_ACTIONS.START;
  englishState.phase = ENGLISH_PHASES.WORD;
  englishState.current = null;
  englishState.answered = false;
  clearEnglishSpokenReplay();
  const solved = englishState.correct + englishState.wrong;
  const accuracy = solved > 0 ? Math.round((englishState.correct / solved) * 100) : 0;
  let mood = "happy";
  if (accuracy >= 90) mood = "celebrate";
  if (accuracy < 60) mood = "thinking";

  els.englishQuestionCount.textContent = "영어 라운드 완료";
  els.englishModePill.textContent = "영어 라운드 완료";
  els.englishPrompt.textContent = `단어 ${englishState.wordCorrect}/${ENGLISH_WORD_QUESTIONS}, 말하기 ${englishState.speakingCorrect}/${ENGLISH_SPEAKING_QUESTIONS} 정답!`;
  els.englishOptions.innerHTML = "";
  els.englishNextBtn.textContent = "다음 문제";
  els.englishSpeakTarget.textContent = `라운드가 완료됐어요. 영어 ${ENGLISH_TOTAL_QUESTIONS}문제 도전 성공!`;
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

  if (englishState.questionNumber >= ENGLISH_WORD_QUESTIONS) {
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
    if (englishState.questionNumber >= ENGLISH_SPEAKING_QUESTIONS) {
      completeEnglishSession();
      return;
    }

    englishState.questionNumber += 1;
    englishState.current = buildEnglishSpeakingQuestion();
    renderEnglishQuestion();
    return;
  }

  if (englishState.questionNumber >= ENGLISH_WORD_QUESTIONS) {
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
    void handleEnglishMic();
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

function handleEnglishSpeakMyReplay() {
  if (!isEnglishSpeakingPhase()) {
    setEnglishSpeakingFeedback("말하기 미션에서만 내 말 다시듣기를 사용할 수 있어요.", true);
    return;
  }
  const audioUrl = String(englishState.lastSpokenAudioUrl || "").trim();
  if (!audioUrl) {
    if (!canRecordEnglishVoice()) {
      setEnglishSpeakingFeedback("이 브라우저에서는 내 목소리 다시듣기를 지원하지 않아요.", true);
      return;
    }
    setEnglishSpeakingFeedback("아직 내가 말한 목소리가 없어요. 먼저 말하기 시작을 눌러주세요.", true);
    return;
  }
  stopEnglishPlayback();
  const voicePlayback = new Audio(audioUrl);
  englishState.playbackAudio = voicePlayback;
  voicePlayback.onended = () => {
    if (englishState.playbackAudio === voicePlayback) {
      englishState.playbackAudio = null;
    }
  };
  voicePlayback.onerror = () => {
    if (englishState.playbackAudio === voicePlayback) {
      englishState.playbackAudio = null;
    }
    setEnglishSpeakingFeedback("내 목소리 재생에 실패했어요. 다시 시도해 주세요.", true);
  };
  const playPromise = voicePlayback.play();
  if (playPromise && typeof playPromise.then === "function") {
    playPromise
      .then(() => {
        setEnglishSpeakingFeedback("방금 내가 말한 목소리를 다시 재생할게요.");
      })
      .catch(() => {
        if (englishState.playbackAudio === voicePlayback) {
          englishState.playbackAudio = null;
        }
        setEnglishSpeakingFeedback("내 목소리 재생 권한이 필요해요. 다시 눌러주세요.", true);
      });
    return;
  }
  setEnglishSpeakingFeedback("방금 내가 말한 목소리를 다시 재생할게요.");
}

function handleEnglishPromptSpeak() {
  if (!englishState.sessionActive || !englishState.current || isEnglishSpeakingPhase()) return;
  const played = speakText(englishState.current.answer, "en-US", { rate: 0.9, pitch: 1.02 });
  if (!played) {
    setEnglishFeedback("브라우저에서 음성 재생을 지원하지 않아요. Chrome 사용을 추천해요.");
  }
}

function handleEnglishOptionSpeak(option) {
  if (!englishState.sessionActive || isEnglishSpeakingPhase()) return;
  const word = String(option || "").trim();
  if (!word) return;
  const played = speakText(word, "en-US", { rate: 0.9, pitch: 1.02 });
  if (!played) {
    setEnglishFeedback("브라우저에서 음성 재생을 지원하지 않아요. Chrome 사용을 추천해요.");
  }
}

function handleEnglishSpeakOff() {
  stopEnglishRecognition();
  stopEnglishPlayback();
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
  stopEnglishVoiceCapture();
  englishState.recognition = null;
  englishState.recognizing = false;
}

async function handleEnglishMic() {
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

  englishState.recognizing = true;
  updateEnglishSpeakingControls();

  const recordingToken = englishState.recordingToken + 1;
  englishState.recordingToken = recordingToken;
  const voiceCaptureReady = await startEnglishVoiceCapture(recordingToken);
  if (!voiceCaptureReady) {
    englishState.recognizing = false;
    englishState.speakingAction = ENGLISH_SPEAK_ACTIONS.RECORD;
    updateEnglishSpeakingControls();
    return;
  }

  let recognition = null;
  try {
    recognition = new RecognitionCtor();
  } catch {
    stopEnglishVoiceCapture();
    englishState.recognizing = false;
    setEnglishSpeakingFeedback("음성 인식을 시작하지 못했어요. 다시 시도해 주세요.", true);
    updateEnglishSpeakingControls();
    return;
  }

  let shouldAutoAdvance = false;
  englishState.recognition = recognition;
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    const transcript = String(event.results?.[0]?.[0]?.transcript || "").trim();
    englishState.lastSpokenTranscript = transcript;
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
    stopEnglishVoiceCapture();
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
  const hasRecognition = Boolean(getSpeechRecognitionCtor());
  const hasVoiceReplay = canRecordEnglishVoice();
  let supportMessage = "이 브라우저는 음성 인식을 지원하지 않을 수 있어요. Chrome 최신 버전을 추천해요.";
  if (hasRecognition && hasVoiceReplay) {
    supportMessage = "이 기기에서는 말하기 인식과 내 목소리 다시듣기를 모두 사용할 수 있어요.";
  } else if (hasRecognition) {
    supportMessage = "말하기 인식은 가능하지만 내 목소리 다시듣기(녹음 재생)는 브라우저 제한이 있을 수 있어요.";
  }
  els.englishVoiceSupport.textContent = supportMessage;
}

function updateHistoryStats() {
  const solved = historyState.correct + historyState.wrong;
  const accuracy = solved > 0 ? Math.round((historyState.correct / solved) * 100) : 0;
  els.historyCorrect.textContent = String(historyState.correct);
  els.historyStreak.textContent = String(historyState.streak);
  els.historyBestStreak.textContent = String(historyState.bestStreak);
  els.historyAccuracy.textContent = `${accuracy}%`;
}

function renderHistoryWrongNotes() {
  if (!els.historyWrongNoteList) return;

  const notes = historyState.wrongNotes;
  const unresolvedCount = notes.filter((note) => !note.solved).length;
  const canRetry = unresolvedCount > 0 && !historyState.sessionActive && !historyState.reviewMode;

  els.historyWrongNoteList.innerHTML = "";
  if (els.historyRetryWrongBtn) {
    els.historyRetryWrongBtn.classList.toggle("hidden", !canRetry);
    els.historyRetryWrongBtn.disabled = !canRetry;
  }

  if (els.historyWrongNoteGuide) {
    if (notes.length === 0) {
      els.historyWrongNoteGuide.textContent = "틀린 문제가 생기면 여기에 자동으로 기록돼요.";
    } else if (unresolvedCount === 0) {
      els.historyWrongNoteGuide.textContent = "멋져요! 오답노트를 전부 다시 맞혔어요.";
    } else {
      els.historyWrongNoteGuide.textContent = `오답 ${unresolvedCount}개가 남아 있어요. 복습 버튼으로 다시 풀어봐요.`;
    }
  }

  if (notes.length === 0) {
    const empty = document.createElement("li");
    empty.className = "ranking-empty";
    empty.textContent = "아직 기록된 오답이 없어요.";
    els.historyWrongNoteList.appendChild(empty);
    return;
  }

  notes.forEach((note, index) => {
    const li = document.createElement("li");
    li.className = "history-wrong-note-item";
    if (note.solved) {
      li.classList.add("is-solved");
    }

    const top = document.createElement("div");
    top.className = "history-wrong-note-top";

    const order = document.createElement("span");
    order.className = "history-wrong-note-order";
    order.textContent = `${index + 1}번`;

    const badge = document.createElement("span");
    badge.className = "history-wrong-note-badge";
    badge.textContent = note.solved ? "복습 완료" : "복습 대기";

    top.appendChild(order);
    top.appendChild(badge);

    const question = document.createElement("p");
    question.className = "history-wrong-note-question";
    question.textContent = note.question;

    const answer = document.createElement("p");
    answer.className = "history-wrong-note-answer";
    answer.textContent = `내 답: ${note.selected} · 정답: ${note.answer}`;

    li.appendChild(top);
    li.appendChild(question);
    li.appendChild(answer);
    els.historyWrongNoteList.appendChild(li);
  });
}

function renderHistoryIdle() {
  const level = getHistoryLevel(historyState.level);
  historyState.current = null;
  historyState.answered = false;
  historyState.sessionActive = false;
  historyState.reviewMode = false;
  historyState.reviewQueue = [];
  historyState.reviewTotal = 0;
  els.historyQuestionCount.textContent = "준비 완료";
  els.historyModePill.textContent = `${level.label} 객관식`;
  els.historyPrompt.textContent = `${level.label} 시작 버튼을 누르면 한국사 10문제가 나와요.`;
  els.historyOptions.innerHTML = "";
  els.historyNextBtn.textContent = "다음 문제";
  els.historyNextBtn.disabled = true;
  setHistoryFeedback(`${level.label} 준비 완료! 시작 버튼을 눌러보자.`);
  updateHistoryLevelUi();
  updateHistoryStats();
  renderHistoryWrongNotes();
}

function renderHistoryQuestion() {
  if (!historyState.current) return;

  const level = getHistoryLevel(historyState.level);
  if (historyState.reviewMode) {
    const remaining = historyState.reviewQueue.length + 1;
    els.historyQuestionCount.textContent = `오답노트 복습 · 남은 ${remaining}문제`;
    els.historyModePill.textContent = "오답노트 복습";
  } else {
    els.historyQuestionCount.textContent = `${historyState.questionNumber} / ${TARGET_QUESTIONS} 문제`;
    els.historyModePill.textContent = `${level.label} 객관식`;
  }
  els.historyPrompt.textContent = historyState.current.question;
  els.historyOptions.innerHTML = historyState.current.options
    .map((option) => {
      return `<button class="english-option" type="button" data-history-option="${option}">${option}</button>`;
    })
    .join("");
  els.historyNextBtn.textContent = historyState.reviewMode ? "다음 복습" : "다음 문제";
  els.historyNextBtn.disabled = true;
  historyState.answered = false;
}

function startHistorySession() {
  const level = getHistoryLevel(historyState.level);
  historyState.sessionActive = true;
  historyState.sessionStartedAt = Date.now();
  historyState.questionNumber = 1;
  historyState.correct = 0;
  historyState.wrong = 0;
  historyState.streak = 0;
  historyState.bestStreak = 0;
  historyState.answered = false;
  historyState.current = null;
  historyState.reviewMode = false;
  historyState.reviewQueue = [];
  historyState.reviewTotal = 0;
  historyState.wrongNotes = [];
  historyState.current = buildHistoryQuestion();
  updateHistoryStats();
  renderHistoryWrongNotes();
  renderHistoryQuestion();
  setHistoryFeedback(`${level.label} 시작! 문제를 차근차근 풀어보자.`);
  setBear("thinking", `${level.label} 한국사 라운드 시작!`);
}

function completeHistorySession() {
  historyState.sessionActive = false;
  historyState.answered = false;
  historyState.current = null;

  const total = historyState.correct + historyState.wrong;
  const accuracy = total > 0 ? Math.round((historyState.correct / total) * 100) : 0;
  let mood = "happy";
  if (accuracy >= 90) mood = "celebrate";
  if (accuracy < 60) mood = "thinking";

  els.historyQuestionCount.textContent = "한국사 라운드 완료";
  els.historyModePill.textContent = "한국사 라운드 완료";
  els.historyPrompt.textContent = `총 ${historyState.correct}/${total}문제 정답 (${accuracy}%)`;
  els.historyOptions.innerHTML = "";
  els.historyNextBtn.textContent = "다음 문제";
  els.historyNextBtn.disabled = true;
  const unresolvedWrongCount = historyState.wrongNotes.filter((note) => !note.solved).length;
  if (unresolvedWrongCount > 0) {
    setHistoryFeedback(
      `완료! ${getHistoryLevel(historyState.level).label} 라운드를 끝냈어요. 오답노트 ${unresolvedWrongCount}개를 다시 풀어볼까?`
    );
  } else {
    setHistoryFeedback(`완료! ${getHistoryLevel(historyState.level).label} 라운드를 끝냈어요. 다시 도전해볼까?`);
  }
  updateHistoryStats();
  renderHistoryWrongNotes();
  setBear(mood, "한국사 라운드 완료! 꾸준히 하면 더 강해져.");

  const summary = buildHistoryRoundSummary();
  void syncHistoryRoundResult(summary);
}

function nextHistoryReviewQuestion() {
  const next = historyState.reviewQueue.shift();
  if (!next) {
    completeHistoryWrongReview();
    return;
  }

  historyState.current = {
    ...next,
    options: shuffleList([...(next.options || [])])
  };
  renderHistoryQuestion();
}

function startHistoryWrongReview() {
  const unresolved = historyState.wrongNotes.filter((note) => !note.solved);
  if (unresolved.length === 0) return;

  historyState.reviewMode = true;
  historyState.sessionActive = true;
  historyState.answered = false;
  historyState.reviewTotal = unresolved.length;
  historyState.reviewQueue = unresolved.map((note) => ({
    question: note.question,
    options: [...note.options],
    answer: note.answer,
    explanation: note.explanation,
    noteKey: note.key
  }));
  historyState.current = null;
  historyState.questionNumber = 1;

  renderHistoryWrongNotes();
  setHistoryFeedback("좋아! 오답노트 복습 시작. 틀린 문제를 다시 맞혀보자.");
  setBear("thinking", "오답노트 복습 시작! 이번엔 꼭 맞힐 수 있어.");
  nextHistoryReviewQuestion();
}

function completeHistoryWrongReview() {
  const unresolved = historyState.wrongNotes.filter((note) => !note.solved).length;
  historyState.reviewMode = false;
  historyState.sessionActive = false;
  historyState.answered = false;
  historyState.current = null;
  historyState.reviewQueue = [];
  historyState.reviewTotal = 0;
  historyState.questionNumber = 0;

  els.historyQuestionCount.textContent = "오답노트 복습 완료";
  els.historyModePill.textContent = `${getHistoryLevel(historyState.level).label} 객관식`;
  els.historyPrompt.textContent = "오답노트를 모두 점검했어요. 다시 라운드를 시작해볼까요?";
  els.historyOptions.innerHTML = "";
  els.historyNextBtn.textContent = "다음 문제";
  els.historyNextBtn.disabled = true;

  if (unresolved > 0) {
    setHistoryFeedback(`복습 완료! 아직 ${unresolved}개 남았어요. 다시 복습하면 더 좋아져요.`);
    setBear("happy", "괜찮아! 한 번 더 복습하면 완벽해질 수 있어.");
  } else {
    setHistoryFeedback("복습 완료! 오답노트를 전부 해결했어요.");
    setBear("celebrate", "오답노트 완주! 정말 대단해.");
  }
  renderHistoryWrongNotes();
}

function handleHistoryOptionSelect(option) {
  if (!historyState.sessionActive || historyState.answered || !historyState.current) return;

  historyState.answered = true;
  const isCorrect = option === historyState.current.answer;

  if (historyState.reviewMode) {
    if (isCorrect) {
      const targetKey = String(historyState.current.noteKey || "");
      const matched = historyState.wrongNotes.find((note) => note.key === targetKey);
      if (matched) {
        matched.solved = true;
      }
      setHistoryFeedback(`정답! ${historyState.current.explanation}`);
      setBear("love", "좋아! 오답노트 문제를 다시 맞혔어.");
      renderHistoryWrongNotes();
    } else {
      historyState.reviewQueue.push({
        question: historyState.current.question,
        options: [...historyState.current.options],
        answer: historyState.current.answer,
        explanation: historyState.current.explanation,
        noteKey: historyState.current.noteKey
      });
      setHistoryFeedback(`오답! 정답은 "${historyState.current.answer}" · ${historyState.current.explanation}`);
      setBear("cry", "괜찮아! 같은 문제를 한 번 더 복습해보자.");
      renderHistoryWrongNotes();
    }
  } else if (isCorrect) {
    historyState.correct += 1;
    historyState.streak += 1;
    historyState.bestStreak = Math.max(historyState.bestStreak, historyState.streak);
    setHistoryFeedback(`정답! ${historyState.current.explanation}`);
    setBear("love", "한국사 정답! 곰돌이 선생님이 칭찬 중이야.");
  } else {
    const noteKey = `history-wrong-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    historyState.wrong += 1;
    historyState.streak = 0;
    historyState.wrongNotes.push({
      key: noteKey,
      question: historyState.current.question,
      options: [...historyState.current.options],
      answer: historyState.current.answer,
      explanation: historyState.current.explanation,
      selected: option,
      solved: false
    });
    setHistoryFeedback(`오답! 정답은 "${historyState.current.answer}" · ${historyState.current.explanation}`);
    setBear("cry", "괜찮아! 다음 문제에서 만회하자.");
    renderHistoryWrongNotes();
  }

  Array.from(els.historyOptions.querySelectorAll(".english-option")).forEach((button) => {
    if (!(button instanceof HTMLElement)) return;
    const value = button.dataset.historyOption || "";
    button.setAttribute("disabled", "true");
    if (value === historyState.current.answer) {
      button.classList.add("is-correct");
      return;
    }
    if (value === option && !isCorrect) {
      button.classList.add("is-wrong");
    }
  });

  if (!historyState.reviewMode) {
    updateHistoryStats();
  }
  if (isCorrect) {
    handleHistoryNext();
    return;
  }

  if (historyState.reviewMode) {
    els.historyNextBtn.textContent = historyState.reviewQueue.length === 0 ? "복습 완료" : "다음 복습";
  } else {
    els.historyNextBtn.textContent = historyState.questionNumber >= TARGET_QUESTIONS ? "결과 보기" : "다음 문제";
  }
  els.historyNextBtn.disabled = false;
  els.historyNextBtn.focus();
}

function handleHistoryNext() {
  if (!historyState.answered) return;

  if (historyState.reviewMode) {
    if (historyState.reviewQueue.length === 0) {
      completeHistoryWrongReview();
      return;
    }

    historyState.questionNumber += 1;
    nextHistoryReviewQuestion();
    setBear("idle", "좋아! 오답노트 다음 문제로 가자.");
    setHistoryFeedback("복습을 하나씩 끝내보자.");
    return;
  }

  if (historyState.questionNumber >= TARGET_QUESTIONS) {
    completeHistorySession();
    return;
  }

  historyState.questionNumber += 1;
  historyState.current = buildHistoryQuestion();
  renderHistoryQuestion();
  setBear("idle", "좋아! 한국사 다음 문제로 가자.");
  setHistoryFeedback("다음 문제도 집중해서 풀어보자.");
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
  state.currentQuestion = buildUniqueMathQuestion(operationKey, state.level);
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
  state.usedQuestionSignatures.clear();

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

async function saveHistorySessionToDb(summary) {
  if (!authState.user || !authState.token) {
    return { ok: false, reason: "not-logged-in" };
  }

  try {
    const response = await fetch(getApiUrl("/api/history/sessions"), {
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
    console.error("saveHistorySessionToDb failed", error);
    return { ok: false, reason: "request-failed" };
  }
}

async function syncHistoryRoundResult(summary) {
  if (!authState.user) {
    return;
  }

  const result = await saveHistorySessionToDb(summary);

  if (result.ok) {
    setAuthStatus(`${authState.user.name || "사용자"}님, 한국사 라운드 기록이 저장됐어요.`);
    void refreshHistoryRankings();
    return;
  }

  if (result.reason === "not-logged-in") {
    setAuthStatus("로그인하면 한국사 라운드 결과를 저장할 수 있어요.");
    return;
  }

  setAuthStatus("한국사 라운드 저장에 실패했어요. 로그인 상태와 DB 설정을 확인해 주세요.");
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

function buildHistoryRoundSummary() {
  const total = historyState.correct + historyState.wrong;
  const accuracy = total ? Math.round((historyState.correct / total) * 100) : 0;
  const durationMs = Math.max(Date.now() - historyState.sessionStartedAt, 0);

  return {
    date: getDateKey(),
    level: historyState.level,
    totalQuestions: total,
    correctAnswers: historyState.correct,
    wrongAnswers: historyState.wrong,
    accuracy,
    bestStreak: historyState.bestStreak,
    durationMs,
    externalKey: `history:${getDateKey()}:${historyState.level}:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`
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

function handleHistoryLevelSelect(nextLevel) {
  if (!HISTORY_LEVELS[nextLevel]) return;

  historyState.level = nextLevel;
  profile.lastHistoryLevel = nextLevel;
  saveProfile();
  updateHistoryLevelUi();
  historyState.usedQuestionIndexes.clear();

  const label = getHistoryLevel(nextLevel).label;
  if (historyState.sessionActive) {
    setHistoryFeedback(`${label} 난이도로 바꿨어. 다음 문제부터 적용돼요.`);
    setBear("happy", `${label} 난이도로 변경 완료!`);
    return;
  }

  if (state.subject === "history") {
    renderHistoryIdle();
    setBear("happy", `${label} 난이도 준비 완료!`);
  }
}

function handleEnglishLevelSelect(nextLevel) {
  if (!ENGLISH_LEVELS[nextLevel]) return;

  englishState.level = nextLevel;
  profile.lastEnglishLevel = nextLevel;
  saveProfile();
  updateEnglishLevelUi();
  englishState.usedLessonIndexes.clear();
  englishState.usedSpeakingMissionIndexes.clear();

  const label = getEnglishLevel(nextLevel).label;
  if (englishState.sessionActive) {
    setEnglishFeedback(`${label} 난이도로 바꿨어. 다음 문제부터 적용돼요.`);
    setBear("happy", `${label} 난이도로 변경 완료!`);
    return;
  }

  renderEnglishIdle();
  setBear("happy", `${label} 난이도 준비 완료!`);
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
  state.historyRankingCorrect = null;
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

  els.englishLevelButtons.forEach((button) => {
    button.addEventListener("click", () => {
      handleEnglishLevelSelect(button.dataset.englishLevel);
    });
  });

  els.historyLevelButtons.forEach((button) => {
    button.addEventListener("click", () => {
      handleHistoryLevelSelect(button.dataset.historyLevel);
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

  els.refreshHistoryRankingBtn.addEventListener("click", () => {
    void refreshHistoryRankings();
  });

  els.historyRetryWrongBtn.addEventListener("click", () => {
    startHistoryWrongReview();
  });

  els.englishStartBtn.addEventListener("click", () => {
    startEnglishSession();
  });

  els.historyStartBtn.addEventListener("click", () => {
    startHistorySession();
  });

  els.englishOptions.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.classList.contains("english-option-speak")) {
      handleEnglishOptionSpeak(String(target.dataset.optionSpeak || ""));
      return;
    }
    if (target.classList.contains("english-option")) {
      handleEnglishOptionSelect(String(target.dataset.option || ""));
    }
  });

  els.englishPrompt.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (!target.classList.contains("english-audio-btn")) return;
    handleEnglishPromptSpeak();
  });

  els.englishNextBtn.addEventListener("click", () => {
    handleEnglishNext();
  });

  els.historyOptions.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (!target.classList.contains("english-option")) return;
    handleHistoryOptionSelect(String(target.dataset.historyOption || ""));
  });

  els.historyNextBtn.addEventListener("click", () => {
    handleHistoryNext();
  });

  els.englishSpeakActionBtn.addEventListener("click", () => {
    handleEnglishSpeakAction();
  });

  els.englishSpeakReplayBtn.addEventListener("click", () => {
    handleEnglishSpeakReplay();
  });

  els.englishSpeakMyReplayBtn.addEventListener("click", () => {
    handleEnglishSpeakMyReplay();
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
    if (state.subject !== "english" && state.subject !== "history") return;

    const target = event.target;
    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) return;
    if (state.subject === "english") {
      if (!englishState.sessionActive) return;
      if (englishState.answered) {
        event.preventDefault();
        handleEnglishNext();
      }
      return;
    }

    if (state.subject === "history") {
      if (!historyState.sessionActive) return;
      if (historyState.answered) {
        event.preventDefault();
        handleHistoryNext();
      }
    }
  });

  els.logoutBtn.addEventListener("click", () => {
    handleLogout();
  });
}

function init() {
  state.operation = OPERATIONS[profile.lastOperation] ? profile.lastOperation : "add";
  state.level = LEVELS[profile.lastLevel] ? profile.lastLevel : "easy";
  englishState.level = ENGLISH_LEVELS[profile.lastEnglishLevel] ? profile.lastEnglishLevel : "beginner";
  historyState.level = HISTORY_LEVELS[profile.lastHistoryLevel] ? profile.lastHistoryLevel : "grade4";
  state.subject = loadTabPreference();

  setActive(els.operationButtons, "operation", state.operation);
  setActive(els.levelButtons, "level", state.level);
  setActive(els.englishLevelButtons, "englishLevel", englishState.level);
  setActive(els.historyLevelButtons, "historyLevel", historyState.level);

  applyTheme(profile.theme, { persist: false });
  setThemePicker(false);
  els.retryWrongBtn.classList.add("hidden");

  updateModePill();
  updateStats();
  updateProgress();
  setupEnglishVoiceSupport();
  renderEnglishIdle();
  renderHistoryIdle();
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
