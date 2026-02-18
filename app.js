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
  starter: { key: "starter", label: "스타터(유치원)" },
  beginner: { key: "beginner", label: "초급(초등학생)" },
  intermediate: { key: "intermediate", label: "중급(중학교)" },
  advanced: { key: "advanced", label: "고급(고등학교)" }
};
const ENGLISH_LEVEL_KEYS = Object.keys(ENGLISH_LEVELS);
const SCIENCE_LEVELS = {
  starter: { key: "starter", label: "스타터(유치원)" },
  beginner: { key: "beginner", label: "초급(초등학생)" },
  intermediate: { key: "intermediate", label: "중급(중학교)" },
  advanced: { key: "advanced", label: "고급(고등학교)" }
};
const SCIENCE_LEVEL_KEYS = Object.keys(SCIENCE_LEVELS);
const HISTORY_LEVELS = {
  grade4: { key: "grade4", label: "한국사 4급" },
  grade3: { key: "grade3", label: "한국사 3급" },
  grade2: { key: "grade2", label: "한국사 2급" },
  grade1: { key: "grade1", label: "한국사 1급" }
};
const HISTORY_LEVEL_KEYS = Object.keys(HISTORY_LEVELS);
const WORLD_HISTORY_LEVELS = {
  grade6: { key: "grade6", label: "세계사 6급" },
  grade5: { key: "grade5", label: "세계사 5급" },
  grade4: { key: "grade4", label: "세계사 4급" },
  grade3: { key: "grade3", label: "세계사 3급" },
  grade2: { key: "grade2", label: "세계사 2급" },
  grade1: { key: "grade1", label: "세계사 1급" }
};
const BASEBALL_LEVELS = {
  beginner: { key: "beginner", label: "초급" },
  intermediate: { key: "intermediate", label: "중급" },
  advanced: { key: "advanced", label: "고급" }
};
const BASEBALL_LEVEL_KEYS = Object.keys(BASEBALL_LEVELS);
const SOCCER_LEVELS = {
  beginner: { key: "beginner", label: "초급" },
  intermediate: { key: "intermediate", label: "중급" },
  advanced: { key: "advanced", label: "고급" }
};
const SOCCER_LEVEL_KEYS = Object.keys(SOCCER_LEVELS);
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
const ENGLISH_STARTER_WORDS = [
  ["공", "ball"],
  ["별", "star"],
  ["꽃", "flower"],
  ["해", "sun"],
  ["달", "moon"],
  ["비", "rain"],
  ["눈", "snow"],
  ["바람", "wind"],
  ["하트", "heart"],
  ["모래", "sand"],
  ["돌", "stone"],
  ["나뭇잎", "leaf"],
  ["씨앗", "seed"],
  ["벌", "bee"],
  ["개미", "ant"],
  ["개구리", "frog"],
  ["오리", "duck"],
  ["염소", "goat"],
  ["양", "sheep"],
  ["말", "horse"],
  ["지갑", "wallet"],
  ["지도", "map"],
  ["열쇠", "key"],
  ["초", "candle"],
  ["상자", "box"],
  ["리본", "ribbon"],
  ["인형", "doll"],
  ["연", "kite"],
  ["종", "bell"],
  ["북", "drum"],
  ["소풍", "picnic"],
  ["게임", "game"],
  ["미소", "smile"],
  ["포옹", "hug"],
  ["줄", "line"],
  ["원", "circle"],
  ["삼각형", "triangle"],
  ["네모", "square"],
  ["세모", "shape"],
  ["사진", "photo"],
  ["카드", "card"],
  ["선물", "gift"],
  ["초콜릿", "chocolate"],
  ["쿠키", "cookie"],
  ["케이크", "cake"],
  ["사탕", "candy"],
  ["수박", "melon"],
  ["배", "pear"],
  ["체리", "cherry"],
  ["키위", "kiwi"],
  ["망고", "mango"],
  ["버터", "butter"],
  ["치즈", "cheese"],
  ["소스", "sauce"],
  ["소금", "salt"],
  ["후추", "pepper"],
  ["숟가락", "spoon"],
  ["포크", "fork"],
  ["칼", "knife"],
  ["접시", "plate"],
  ["그릇", "bowl"],
  ["컵", "cup"],
  ["병", "bottle"],
  ["실", "yarn"],
  ["테이프", "tape"],
  ["풀", "glue"],
  ["초크", "chalk"],
  ["큐브", "cube"],
  ["구슬", "bead"],
  ["놀이", "playtime"],
  ["쉬는시간", "recess"],
  ["가위", "scissors"],
  ["문구점", "stationery"],
  ["칠판", "blackboard"],
  ["화이트보드", "whiteboard"],
  ["버튼", "button"],
  ["지퍼", "zipper"],
  ["주머니", "pocket"],
  ["계단", "stairs"],
  ["복도", "hallway"],
  ["교문", "gate"],
  ["운동장", "playground"],
  ["창고", "storage"]
];
const ENGLISH_STARTER_WORD_LESSONS = ENGLISH_STARTER_WORDS.map(([korean, english], index) => ({
  korean,
  english,
  sentence: buildWordPracticeSentence(english, index)
}));
const ENGLISH_ULTRA_WORDS = [
  ["약국", "pharmacy"],
  ["처방전", "prescription"],
  ["체온", "temperature"],
  ["혈압", "blood pressure"],
  ["응급실", "emergency room"],
  ["진료 예약", "medical appointment"],
  ["알림", "notification"],
  ["설정", "settings"],
  ["계정", "account"],
  ["보안", "security"],
  ["인증", "verification"],
  ["로그", "log"],
  ["대시보드", "dashboard"],
  ["업데이트", "update"],
  ["업그레이드", "upgrade"],
  ["성능", "performance"],
  ["오류", "error"],
  ["버그", "bug"],
  ["해결책", "solution"],
  ["알고리즘", "algorithm"],
  ["인공지능", "artificial intelligence"],
  ["머신러닝", "machine learning"],
  ["모델", "model"],
  ["학습 데이터", "training data"],
  ["실험", "experiment"],
  ["측정", "measurement"],
  ["결과", "result"],
  ["지표", "metric"],
  ["통계", "statistics"],
  ["그래프", "graph"],
  ["표", "table"],
  ["비율", "ratio"],
  ["증가", "increase"],
  ["감소", "decrease"],
  ["예산", "budget"],
  ["지출", "expense"],
  ["수익", "revenue"],
  ["손익", "profit and loss"],
  ["청구서", "invoice"],
  ["세금", "tax"],
  ["보험", "insurance"],
  ["계약", "contract"],
  ["조항", "clause"],
  ["면책", "disclaimer"],
  ["합의", "agreement"],
  ["기한", "deadline"],
  ["우선순위", "priority"],
  ["일정", "timeline"],
  ["의제", "agenda"],
  ["회의록", "minutes"],
  ["발표", "presentation"],
  ["리허설", "rehearsal"],
  ["피드백", "feedback"],
  ["검토", "review"],
  ["수정", "revision"],
  ["제출", "submission"],
  ["승인", "approval"],
  ["거절", "rejection"],
  ["협상", "negotiation"],
  ["리더십", "leadership"],
  ["책임", "responsibility"],
  ["협력", "cooperation"],
  ["신뢰", "trust"],
  ["존중", "respect"],
  ["동기", "motivation"],
  ["습관", "habit"],
  ["집중력", "focus"],
  ["계획표", "planner"],
  ["목표", "goal"],
  ["성취", "achievement"],
  ["도전", "challenge"],
  ["실패", "failure"],
  ["회복", "recovery"],
  ["건강", "wellness"],
  ["수면", "sleep"],
  ["운동", "exercise"],
  ["스트레칭", "stretching"],
  ["영양", "nutrition"],
  ["균형", "balance"],
  ["환경", "environment"],
  ["재활용", "recycling"],
  ["에너지", "energy"],
  ["태양광", "solar power"],
  ["바이오", "biotech"],
  ["기후", "climate"],
  ["탄소", "carbon"],
  ["배출", "emission"],
  ["절약", "saving"],
  ["보존", "conservation"],
  ["문화", "culture"],
  ["전통", "tradition"],
  ["예절", "manners"],
  ["예술", "arts"],
  ["문학", "literature"],
  ["철학", "philosophy"],
  ["역사", "history"],
  ["지리", "geography"],
  ["경제", "economics"],
  ["사회", "society"],
  ["정치", "politics"],
  ["법률", "law"],
  ["인권", "human rights"],
  ["평등", "equality"],
  ["공정성", "fairness"],
  ["다양성", "diversity"],
  ["포용성", "inclusion"],
  ["커뮤니티", "community"],
  ["자원봉사", "volunteering"],
  ["기부", "donation"],
  ["캠페인", "campaign"],
  ["이벤트", "event"],
  ["행사", "festival"],
  ["여행 일정", "itinerary"],
  ["탑승 시간", "boarding time"],
  ["출국 심사", "passport control"],
  ["환승", "transfer"],
  ["현지 교통", "local transit"],
  ["가이드북", "guidebook"],
  ["예약 확인", "booking confirmation"],
  ["체크리스트", "checklist"],
  ["필수품", "essentials"],
  ["세면도구", "toiletries"],
  ["충전 케이블", "charging cable"],
  ["어댑터", "adapter"],
  ["비상약", "first-aid kit"],
  ["우산", "umbrella"],
  ["방수", "waterproof"],
  ["날씨 예보", "weather forecast"],
  ["교통 체증", "traffic jam"],
  ["우회로", "detour"],
  ["안전벨트", "seat belt"],
  ["신호등", "traffic light"],
  ["횡단보도", "crosswalk"],
  ["제한 속도", "speed limit"],
  ["운전면허", "driver's license"],
  ["정류장 안내", "stop announcement"],
  ["출구", "exit"],
  ["입구", "entrance"],
  ["엘리베이터", "elevator"],
  ["에스컬레이터", "escalator"],
  ["층수", "floor number"],
  ["안내 데스크", "information desk"],
  ["분실물", "lost and found"],
  ["접수", "reception"],
  ["호출", "call"],
  ["응답", "response"],
  ["요청사항", "request"],
  ["우선 처리", "priority handling"],
  ["비상 연락처", "emergency contact"],
  ["개인 정보", "personal data"],
  ["접근 권한", "access control"],
  ["암호화", "encryption"],
  ["백업", "backup"],
  ["복구", "recovery plan"],
  ["서버 점검", "maintenance window"],
  ["배포 일정", "release schedule"],
  ["품질 보증", "quality assurance"],
  ["자동화", "automation"],
  ["테스트 케이스", "test case"],
  ["통합 테스트", "integration test"],
  ["사용자 경험", "user experience"],
  ["화면 설계", "interface design"],
  ["프로토타입", "prototype"],
  ["요구사항", "requirements"],
  ["범위", "scope"],
  ["우선 과제", "key task"],
  ["이슈 추적", "issue tracking"],
  ["상태 보고", "status update"],
  ["진척도", "progress"],
  ["완료율", "completion rate"],
  ["업무 인수인계", "handover"],
  ["사후 분석", "postmortem"],
  ["교훈", "lesson learned"],
  ["개선점", "improvement point"],
  ["실행 계획", "action plan"],
  ["다음 단계", "next step"],
  ["장기 목표", "long-term goal"],
  ["단기 목표", "short-term goal"],
  ["핵심 역량", "core competency"],
  ["문제 정의", "problem statement"],
  ["가설", "hypothesis"],
  ["검증", "validation"],
  ["증거", "evidence"],
  ["근거", "rationale"],
  ["해석", "interpretation"],
  ["비교 분석", "comparative analysis"],
  ["위험도", "risk level"],
  ["완화 방안", "mitigation plan"],
  ["대응 전략", "response strategy"],
  ["성과 지표", "key metric"],
  ["평가 기준", "evaluation criteria"]
];
const ENGLISH_ULTRA_LESSONS = ENGLISH_ULTRA_WORDS.map(([korean, english], index) => ({
  korean,
  english,
  sentence: buildWordPracticeSentence(english, index + ENGLISH_STARTER_WORDS.length)
}));
const ENGLISH_PHRASE_ADJECTIVES = [
  ["지역", "local"],
  ["국제", "global"],
  ["디지털", "digital"],
  ["모바일", "mobile"],
  ["원격", "remote"],
  ["공공", "public"],
  ["개인", "personal"],
  ["공동", "shared"],
  ["핵심", "core"],
  ["기본", "basic"],
  ["고급", "advanced"],
  ["실전", "practical"]
];
const ENGLISH_PHRASE_TOPICS = [
  ["서비스", "service"],
  ["프로젝트", "project"],
  ["플랫폼", "platform"],
  ["네트워크", "network"],
  ["콘텐츠", "content"],
  ["정책", "policy"],
  ["계획", "plan"],
  ["시스템", "system"],
  ["지원", "support"],
  ["교육", "education"],
  ["연구", "research"],
  ["분석", "analysis"],
  ["전략", "strategy"],
  ["리포트", "report"],
  ["워크숍", "workshop"]
];
const ENGLISH_GENERATED_PHRASE_LESSONS = [];
ENGLISH_PHRASE_ADJECTIVES.forEach(([adjKr, adjEn], adjIndex) => {
  ENGLISH_PHRASE_TOPICS.forEach(([topicKr, topicEn], topicIndex) => {
    const english = `${adjEn} ${topicEn}`;
    const korean = `${adjKr} ${topicKr}`;
    const sentence = `We're preparing the ${english} for this week's class.`;
    ENGLISH_GENERATED_PHRASE_LESSONS.push({
      korean,
      english,
      sentence: topicIndex % 2 === 0 ? sentence : buildWordPracticeSentence(english, adjIndex + topicIndex)
    });
  });
});
const ENGLISH_HIGHSCHOOL_WORD_LESSONS = [
  { korean: "비판적 사고", english: "critical thinking", sentence: "Critical thinking helps us evaluate information objectively." },
  { korean: "논리적 추론", english: "logical reasoning", sentence: "Logical reasoning is essential for solving complex problems." },
  { korean: "통계적 유의성", english: "statistical significance", sentence: "The report shows statistical significance at the 95% level." },
  { korean: "실험 설계", english: "experimental design", sentence: "We improved the experimental design before collecting data." },
  { korean: "변수 통제", english: "control variables", sentence: "Please control variables to avoid biased outcomes." },
  { korean: "근거 기반 결론", english: "evidence-based conclusion", sentence: "Your argument needs an evidence-based conclusion." },
  { korean: "가설 검증", english: "hypothesis testing", sentence: "Hypothesis testing supports objective decision-making." },
  { korean: "자료 해석", english: "data interpretation", sentence: "Data interpretation can change depending on context." },
  { korean: "상관관계와 인과관계", english: "correlation versus causation", sentence: "Correlation versus causation is a key concept in research." },
  { korean: "문헌 검토", english: "literature review", sentence: "A literature review helps identify gaps in prior studies." },
  { korean: "연구 방법론", english: "research methodology", sentence: "Research methodology determines how reliable the results are." },
  { korean: "개념 정의", english: "conceptual definition", sentence: "We need a clear conceptual definition before analysis." },
  { korean: "운영적 정의", english: "operational definition", sentence: "Use an operational definition that can be measured." },
  { korean: "편향 제거", english: "bias reduction", sentence: "Bias reduction improves the quality of our findings." },
  { korean: "표본 대표성", english: "sample representativeness", sentence: "Sample representativeness affects external validity." },
  { korean: "정성 분석", english: "qualitative analysis", sentence: "Qualitative analysis reveals patterns in interview data." },
  { korean: "정량 분석", english: "quantitative analysis", sentence: "Quantitative analysis is useful for large datasets." },
  { korean: "변동성", english: "variability", sentence: "Variability in scores increased after the intervention." },
  { korean: "신뢰도", english: "reliability", sentence: "The test has high reliability across different groups." },
  { korean: "타당도", english: "validity", sentence: "Validity matters more than speed in this assessment." },
  { korean: "경제적 불평등", english: "economic inequality", sentence: "Economic inequality remains a major social issue." },
  { korean: "사회적 이동성", english: "social mobility", sentence: "Education can improve social mobility over time." },
  { korean: "정책 효과", english: "policy impact", sentence: "We evaluated the policy impact after one year." },
  { korean: "지속 가능성", english: "sustainability", sentence: "Sustainability should be part of every development plan." },
  { korean: "탄소 중립", english: "carbon neutrality", sentence: "Many countries are targeting carbon neutrality by 2050." },
  { korean: "재생 에너지 전환", english: "energy transition", sentence: "Energy transition requires long-term investment." },
  { korean: "공급망 관리", english: "supply chain management", sentence: "Supply chain management became harder during the crisis." },
  { korean: "시장 변동성", english: "market volatility", sentence: "Market volatility increased after the announcement." },
  { korean: "인플레이션 압력", english: "inflation pressure", sentence: "Inflation pressure is affecting household spending." },
  { korean: "재정 정책", english: "fiscal policy", sentence: "Fiscal policy can stimulate growth during a slowdown." },
  { korean: "통화 정책", english: "monetary policy", sentence: "Monetary policy decisions influence borrowing costs." },
  { korean: "기회 비용", english: "opportunity cost", sentence: "Consider the opportunity cost before choosing an option." },
  { korean: "한계 효용", english: "marginal utility", sentence: "Marginal utility decreases as consumption rises." },
  { korean: "수요 탄력성", english: "demand elasticity", sentence: "Demand elasticity varies across product categories." },
  { korean: "비교 우위", english: "comparative advantage", sentence: "Comparative advantage supports international trade." },
  { korean: "글의 논지", english: "main argument", sentence: "Identify the main argument in the first paragraph." },
  { korean: "반론 제시", english: "counterargument", sentence: "A strong counterargument improves your essay." },
  { korean: "주장 뒷받침", english: "supporting evidence", sentence: "Use supporting evidence from reliable sources." },
  { korean: "결론 도출", english: "logical conclusion", sentence: "Your paragraph needs a clear logical conclusion." },
  { korean: "문단 전개", english: "paragraph development", sentence: "Paragraph development should follow a consistent structure." },
  { korean: "문체와 어조", english: "tone and style", sentence: "Tone and style can change the reader's perception." },
  { korean: "핵심 문장", english: "topic sentence", sentence: "Start each paragraph with a strong topic sentence." },
  { korean: "문법 정확성", english: "grammatical accuracy", sentence: "Grammatical accuracy is crucial in academic writing." },
  { korean: "어휘 다양성", english: "lexical variety", sentence: "Lexical variety can make your writing more persuasive." },
  { korean: "발표 구성", english: "presentation structure", sentence: "Presentation structure should guide the audience clearly." },
  { korean: "청중 분석", english: "audience analysis", sentence: "Audience analysis helps tailor your message effectively." },
  { korean: "핵심 메시지", english: "key message", sentence: "Repeat the key message at the end of your talk." },
  { korean: "질의응답 대비", english: "question handling", sentence: "Question handling is part of strong presentation skills." },
  { korean: "시간 관리", english: "time management", sentence: "Time management is essential during exams." },
  { korean: "학습 전략", english: "study strategy", sentence: "A study strategy helps reduce test anxiety." },
  { korean: "메타인지", english: "metacognition", sentence: "Metacognition helps students monitor their own learning." },
  { korean: "장기 기억", english: "long-term memory", sentence: "Spaced repetition improves long-term memory." },
  { korean: "문제 해결 능력", english: "problem-solving skills", sentence: "Problem-solving skills grow through deliberate practice." },
  { korean: "추상적 사고", english: "abstract reasoning", sentence: "Abstract reasoning is required in advanced mathematics." },
  { korean: "다학제 접근", english: "interdisciplinary approach", sentence: "An interdisciplinary approach can reveal new insights." },
  { korean: "윤리적 판단", english: "ethical judgment", sentence: "Ethical judgment matters in scientific innovation." },
  { korean: "사회적 책임", english: "social responsibility", sentence: "Social responsibility should guide technological progress." },
  { korean: "글로벌 관점", english: "global perspective", sentence: "A global perspective broadens policy discussions." }
];
const ENGLISH_CORE_WORD_SET = new Set(
  ENGLISH_LESSONS.map((lesson) => String(lesson.english || "").trim().toLowerCase()).filter(Boolean)
);
const ENGLISH_EXTRA_WORD_SET = new Set(
  ENGLISH_EXTRA_LESSONS.map((lesson) => String(lesson.english || "").trim().toLowerCase()).filter(Boolean)
);
const ENGLISH_MEGA_WORD_SET = new Set(
  ENGLISH_MEGA_WORDS.map(([, english]) => String(english || "").trim().toLowerCase()).filter(Boolean)
);
const ENGLISH_ULTRA_WORD_SET = new Set(
  ENGLISH_ULTRA_WORDS.map(([, english]) => String(english || "").trim().toLowerCase()).filter(Boolean)
);
const ENGLISH_GENERATED_PHRASE_SET = new Set(
  ENGLISH_GENERATED_PHRASE_LESSONS.map((lesson) => String(lesson.english || "").trim().toLowerCase()).filter(Boolean)
);
const ENGLISH_HIGHSCHOOL_WORD_SET = new Set(
  ENGLISH_HIGHSCHOOL_WORD_LESSONS.map((lesson) => String(lesson.english || "").trim().toLowerCase()).filter(Boolean)
);
const ENGLISH_MEGA_LESSONS = ENGLISH_MEGA_WORDS.map(([korean, english], index) => ({
  korean,
  english,
  sentence: buildWordPracticeSentence(english, index)
}));
const mergedEnglishLessons = [
  ...ENGLISH_STARTER_WORD_LESSONS,
  ...ENGLISH_LESSONS,
  ...ENGLISH_EXTRA_LESSONS,
  ...ENGLISH_MEGA_LESSONS,
  ...ENGLISH_ULTRA_LESSONS,
  ...ENGLISH_GENERATED_PHRASE_LESSONS,
  ...ENGLISH_ADVANCED_WORD_LESSONS,
  ...ENGLISH_HIGHSCHOOL_WORD_LESSONS
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
  [...ENGLISH_ADVANCED_WORD_LESSONS, ...ENGLISH_HIGHSCHOOL_WORD_LESSONS]
    .map((lesson) => String(lesson.english || "").trim().toLowerCase())
    .filter(Boolean)
);
const ENGLISH_STARTER_WORD_SET = new Set(
  ENGLISH_STARTER_WORD_LESSONS.map((lesson) => String(lesson.english || "").trim().toLowerCase()).filter(Boolean)
);
const ENGLISH_SPEAKING_MISSIONS = [
  { level: "starter", korean: "안녕 인사하기", sentence: "Hello!" },
  { level: "starter", korean: "이름 말하기", sentence: "My name is Mina." },
  { level: "starter", korean: "나이 말하기", sentence: "I am seven years old." },
  { level: "starter", korean: "색깔 말하기", sentence: "It is red." },
  { level: "starter", korean: "숫자 세기", sentence: "One, two, three, four." },
  { level: "starter", korean: "좋아하는 과일 말하기", sentence: "I like apples." },
  { level: "starter", korean: "학교 가는 말하기", sentence: "I go to school." },
  { level: "starter", korean: "기분 말하기", sentence: "I am happy." },
  { level: "starter", korean: "감사 인사", sentence: "Thank you!" },
  { level: "starter", korean: "작별 인사", sentence: "Goodbye!" },
  { level: "starter", korean: "물 요청하기", sentence: "Can I have water?" },
  { level: "starter", korean: "화장실 물어보기", sentence: "Where is the restroom?" },
  { level: "starter", korean: "연필 빌리기", sentence: "Can I use your pencil?" },
  { level: "starter", korean: "날씨 말하기", sentence: "It is sunny today." },
  { level: "starter", korean: "가족 소개", sentence: "This is my mom." },
  { level: "starter", korean: "동물 말하기", sentence: "I see a cute dog." },
  { level: "starter", korean: "간단한 부탁", sentence: "Please help me." },
  { level: "starter", korean: "수업 시작 준비", sentence: "I am ready to learn." },
  { level: "starter", korean: "간식 고르기", sentence: "I want a cookie." },
  { level: "starter", korean: "친구와 놀기", sentence: "Let's play together." },

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
  { level: "starter", korean: "아침 인사", sentence: "Good morning, teacher." },
  { level: "starter", korean: "자리 안내 받기", sentence: "Where should I sit?" },
  { level: "starter", korean: "화장실 다녀오기", sentence: "May I go to the restroom?" },
  { level: "starter", korean: "연필이 없다고 말하기", sentence: "I need a pencil." },
  { level: "starter", korean: "친구 이름 묻기", sentence: "What is your name?" },
  { level: "starter", korean: "점심 메뉴 말하기", sentence: "I want rice and soup." },
  { level: "starter", korean: "숫자 말하기", sentence: "I can count to ten." },
  { level: "starter", korean: "색깔 고르기", sentence: "My favorite color is blue." },
  { level: "starter", korean: "노래 좋아한다고 말하기", sentence: "I like this song." },
  { level: "starter", korean: "수업 마무리 인사", sentence: "See you tomorrow, teacher." },

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

const SCIENCE_SOURCE_CATALOG = {
  nasaEarthK4: {
    title: "NASA | What Is Earth? (Grades K-4)",
    url: "https://www.nasa.gov/learning-resources/for-kids-and-students/what-is-earth-grades-k-4/"
  },
  britannicaDay: {
    title: "Britannica | day",
    url: "https://www.britannica.com/science/day"
  },
  britannicaSenseOrgan: {
    title: "Britannica | sense organ",
    url: "https://www.britannica.com/science/sense-organ"
  },
  britannicaWaterCycle: {
    title: "Britannica | water cycle",
    url: "https://www.britannica.com/science/water-cycle"
  },
  britannicaMatter: {
    title: "Britannica | matter",
    url: "https://www.britannica.com/science/matter"
  },
  britannicaPhotosynthesis: {
    title: "Britannica | photosynthesis",
    url: "https://www.britannica.com/science/photosynthesis"
  },
  britannicaMagnet: {
    title: "Britannica | magnet",
    url: "https://www.britannica.com/science/magnet"
  },
  britannicaSolarSystem: {
    title: "Britannica | solar system",
    url: "https://www.britannica.com/science/solar-system"
  },
  britannicaElectricity: {
    title: "Britannica | electricity",
    url: "https://www.britannica.com/science/electricity"
  },
  britannicaEcosystem: {
    title: "Britannica | ecosystem",
    url: "https://www.britannica.com/science/ecosystem"
  },
  britannicaPlateTectonics: {
    title: "Britannica | plate tectonics",
    url: "https://www.britannica.com/science/plate-tectonics"
  },
  britannicaCellBiology: {
    title: "Britannica | cell biology",
    url: "https://www.britannica.com/science/cell-biology"
  },
  britannicaAtom: {
    title: "Britannica | atom",
    url: "https://www.britannica.com/science/atom"
  },
  britannicaPH: {
    title: "Britannica | pH",
    url: "https://www.britannica.com/science/pH"
  },
  britannicaAcidBase: {
    title: "Britannica | acid-base reaction",
    url: "https://www.britannica.com/science/acid-base-reaction"
  },
  britannicaRefraction: {
    title: "Britannica | refraction",
    url: "https://www.britannica.com/science/refraction"
  },
  britannicaWavePhysics: {
    title: "Britannica | wave (physics)",
    url: "https://www.britannica.com/science/wave-physics"
  },
  britannicaNewtonsLaws: {
    title: "Britannica | Newton's laws of motion",
    url: "https://www.britannica.com/science/Newtons-laws-of-motion"
  },
  britannicaGlycolysis: {
    title: "Britannica | glycolysis",
    url: "https://www.britannica.com/science/glycolysis"
  },
  britannicaReplication: {
    title: "Britannica | replication",
    url: "https://www.britannica.com/science/replication"
  },
  britannicaIdealGasLaw: {
    title: "Britannica | ideal gas law",
    url: "https://www.britannica.com/science/ideal-gas-law"
  },
  britannicaCellularRespiration: {
    title: "Britannica | cellular respiration",
    url: "https://www.britannica.com/science/cellular-respiration"
  },
  openstaxBiology2e: {
    title: "OpenStax | Biology 2e",
    url: "https://openstax.org/details/books/biology-2e"
  },
  openstaxChemistry2e: {
    title: "OpenStax | Chemistry 2e",
    url: "https://openstax.org/details/books/chemistry-2e"
  },
  openstaxPhysics1: {
    title: "OpenStax | University Physics Volume 1",
    url: "https://openstax.org/details/books/university-physics-volume-1"
  },
  openstaxAnatomy2e: {
    title: "OpenStax | Anatomy and Physiology 2e",
    url: "https://openstax.org/details/books/anatomy-and-physiology-2e"
  }
};

const SCIENCE_SOURCE_PAIRS_BY_CATEGORY = {
  starterSky: ["nasaEarthK4", "britannicaDay"],
  starterBody: ["britannicaSenseOrgan", "openstaxAnatomy2e"],
  starterMatter: ["britannicaMatter", "openstaxChemistry2e"],
  starterLife: ["britannicaPhotosynthesis", "openstaxBiology2e"],

  beginnerEarthSpace: ["nasaEarthK4", "britannicaSolarSystem"],
  beginnerMatter: ["britannicaMatter", "openstaxChemistry2e"],
  beginnerLife: ["britannicaPhotosynthesis", "openstaxBiology2e"],
  beginnerElectric: ["britannicaElectricity", "openstaxPhysics1"],
  beginnerGeology: ["britannicaPlateTectonics", "britannicaWaterCycle"],
  beginnerWeather: ["britannicaWaterCycle", "nasaEarthK4"],

  intermediateCell: ["britannicaCellBiology", "openstaxBiology2e"],
  intermediateChem: ["britannicaAtom", "openstaxChemistry2e"],
  intermediatePhysics: ["britannicaNewtonsLaws", "openstaxPhysics1"],
  intermediateEarthEco: ["britannicaEcosystem", "britannicaPlateTectonics"],
  intermediateOptics: ["britannicaRefraction", "britannicaWavePhysics"],

  advancedBio: ["openstaxBiology2e", "britannicaGlycolysis"],
  advancedChem: ["openstaxChemistry2e", "britannicaIdealGasLaw"],
  advancedPhysics: ["openstaxPhysics1", "britannicaRefraction"],
  advancedNeuro: ["openstaxAnatomy2e", "britannicaCellularRespiration"],

  fallback: ["openstaxBiology2e", "openstaxPhysics1"]
};

const SCIENCE_FACT_ITEMS = {
  starter: [
    { id: "daytime", category: "starterSky", prompt: "해가 떠 있는 시간", answer: "낮" },
    { id: "night-stars", category: "starterSky", prompt: "별을 가장 잘 볼 수 있는 시간", answer: "밤" },
    { id: "ear-hearing", category: "starterBody", prompt: "소리를 들을 때 주로 사용하는 기관", answer: "귀" },
    { id: "nose-smell", category: "starterBody", prompt: "냄새를 맡을 때 주로 사용하는 기관", answer: "코" },
    { id: "eye-seeing", category: "starterBody", prompt: "빛과 색을 볼 때 주로 사용하는 기관", answer: "눈" },
    { id: "tongue-taste", category: "starterBody", prompt: "맛을 느낄 때 중요한 기관", answer: "혀" },
    { id: "air-breath", category: "starterBody", prompt: "숨을 쉴 때 몸 안으로 들어오는 것", answer: "공기" },
    { id: "ice-solid", category: "starterMatter", prompt: "얼음의 물질 상태", answer: "고체" },
    { id: "water-liquid", category: "starterMatter", prompt: "컵에 담긴 물의 물질 상태", answer: "액체" },
    { id: "steam-gas", category: "starterMatter", prompt: "수증기의 물질 상태", answer: "기체" },
    { id: "plant-needs-water", category: "starterLife", prompt: "식물이 자라기 위해 꼭 필요한 것", answer: "물" },
    { id: "rain-cloud", category: "starterSky", prompt: "비가 내릴 때 주로 나타나는 구름", answer: "비구름" },
    { id: "shadow", category: "starterSky", prompt: "햇빛을 받는 물체 뒤에 생기는 어두운 부분", answer: "그림자" },
    { id: "magnet-iron", category: "starterMatter", prompt: "자석에 잘 붙는 물체", answer: "철못" },
    { id: "drink-water", category: "starterBody", prompt: "물을 마셨을 때 줄어드는 느낌", answer: "갈증" },
    { id: "moon-around-earth", category: "starterSky", prompt: "지구 주위를 도는 대표적인 천체", answer: "달" },
    { id: "earth-around-sun", category: "starterSky", prompt: "지구가 공전하는 중심의 별", answer: "태양" },
    { id: "fish-fin", category: "starterLife", prompt: "물고기가 물속에서 움직일 때 주로 쓰는 기관", answer: "지느러미" },
    { id: "bird-wing", category: "starterLife", prompt: "새가 하늘을 날 때 주로 쓰는 기관", answer: "날개" },
    { id: "frog-larva", category: "starterLife", prompt: "개구리가 어릴 때의 모습", answer: "올챙이" },
    { id: "seed-sprout", category: "starterLife", prompt: "씨앗이 자라 처음 나오는 모습", answer: "새싹" },
    { id: "food-making-light", category: "starterLife", prompt: "식물이 햇빛으로 양분을 만드는 과정", answer: "광합성" },
    { id: "summer-hot", category: "starterSky", prompt: "1년 중 가장 더운 계절", answer: "여름" },
    { id: "winter-cold", category: "starterSky", prompt: "1년 중 가장 추운 계절", answer: "겨울" },
    { id: "fall-leaves", category: "starterSky", prompt: "나뭇잎 색이 바뀌고 떨어지는 계절", answer: "가을" },
    { id: "spring-flowers", category: "starterSky", prompt: "꽃이 많이 피기 시작하는 계절", answer: "봄" },
    { id: "rainbow-after-rain", category: "starterSky", prompt: "무지개를 보기 쉬운 날씨", answer: "비가 그친 뒤" },
    { id: "thunderstorm", category: "starterSky", prompt: "번개와 천둥이 함께 나타나는 날씨", answer: "뇌우" },
    { id: "snow-crystal", category: "starterMatter", prompt: "눈송이를 이루는 기본 형태", answer: "얼음 결정" },
    { id: "warm-clothes", category: "starterBody", prompt: "추운 날 몸을 따뜻하게 지키는 방법", answer: "옷을 두껍게 입기" },
    { id: "sky-blue", category: "starterSky", prompt: "맑은 낮 하늘의 대표 색", answer: "파란색" },
    { id: "wood-float", category: "starterMatter", prompt: "물 위에 뜨기 쉬운 재료", answer: "나무" },
    { id: "stone-sink", category: "starterMatter", prompt: "물에서 잘 가라앉는 물체", answer: "돌" },
    { id: "living-needs-water", category: "starterLife", prompt: "동식물이 살아가는 데 공통으로 중요한 것", answer: "깨끗한 물" },
    { id: "day-night-cause", category: "starterSky", prompt: "낮과 밤이 반복되는 가장 큰 이유", answer: "지구의 자전" }
  ],
  beginner: [
    { id: "boiling-water", category: "beginnerMatter", prompt: "물이 100°C에서 끓을 때 바뀌는 상태", answer: "수증기" },
    { id: "freezing-water", category: "beginnerMatter", prompt: "물이 0°C 부근에서 되는 상태", answer: "얼음" },
    { id: "melting-ice", category: "beginnerMatter", prompt: "얼음이 녹아 되는 상태", answer: "액체 물" },
    { id: "evaporation", category: "beginnerMatter", prompt: "액체가 기체로 바뀌는 상태 변화", answer: "증발" },
    { id: "condensation", category: "beginnerMatter", prompt: "기체가 액체로 바뀌는 상태 변화", answer: "응결" },
    { id: "freezing", category: "beginnerMatter", prompt: "액체가 고체로 바뀌는 상태 변화", answer: "응고" },
    { id: "sublimation", category: "beginnerMatter", prompt: "고체가 액체를 거치지 않고 기체가 되는 변화", answer: "승화" },
    { id: "earth-rotation", category: "beginnerEarthSpace", prompt: "지구의 자전 주기", answer: "약 24시간" },
    { id: "earth-revolution", category: "beginnerEarthSpace", prompt: "지구의 공전 주기", answer: "약 1년" },
    { id: "season-cause", category: "beginnerEarthSpace", prompt: "계절 변화의 주된 원인", answer: "지구 자전축의 기울기" },
    { id: "moon-phase-cause", category: "beginnerEarthSpace", prompt: "달 모양이 달라 보이는 주된 이유", answer: "태양-지구-달의 상대적 위치 변화" },
    { id: "earth-satellite", category: "beginnerEarthSpace", prompt: "지구의 자연 위성", answer: "달" },
    { id: "largest-planet", category: "beginnerEarthSpace", prompt: "태양계에서 가장 큰 행성", answer: "목성" },
    { id: "ring-planet", category: "beginnerEarthSpace", prompt: "고리가 뚜렷하게 보이는 행성", answer: "토성" },
    { id: "solar-center", category: "beginnerEarthSpace", prompt: "태양계 중심의 별", answer: "태양" },
    { id: "photosynthesis-input", category: "beginnerLife", prompt: "광합성에 꼭 필요한 에너지", answer: "햇빛" },
    { id: "photosynthesis-output", category: "beginnerLife", prompt: "광합성 결과로 나오는 대표 기체", answer: "산소" },
    { id: "root-role", category: "beginnerLife", prompt: "식물 뿌리의 핵심 역할", answer: "물과 무기양분 흡수" },
    { id: "stomata-role", category: "beginnerLife", prompt: "잎의 기공이 하는 중요한 일", answer: "기체 교환" },
    { id: "closed-circuit", category: "beginnerElectric", prompt: "전구가 켜지기 위한 회로 상태", answer: "닫힌 회로" },
    { id: "series-circuit", category: "beginnerElectric", prompt: "직렬 회로에서 한 부분이 끊어졌을 때 결과", answer: "전체가 꺼짐" },
    { id: "parallel-circuit", category: "beginnerElectric", prompt: "병렬 회로의 대표 장점", answer: "일부가 고장나도 나머지는 작동" },
    { id: "same-pole", category: "beginnerElectric", prompt: "자석의 같은 극끼리 가까워질 때 나타나는 힘", answer: "척력" },
    { id: "different-pole", category: "beginnerElectric", prompt: "자석의 다른 극끼리 가까워질 때 나타나는 힘", answer: "인력" },
    { id: "fossil-info", category: "beginnerGeology", prompt: "화석이 알려주는 정보", answer: "과거 생물과 환경" },
    { id: "strata-rule", category: "beginnerGeology", prompt: "지층의 상대 연령을 판단하는 기본 원리", answer: "아래층이 더 오래됨" },
    { id: "igneous-rock", category: "beginnerGeology", prompt: "용암이 식어 만들어지는 암석", answer: "화성암" },
    { id: "sedimentary-rock", category: "beginnerGeology", prompt: "퇴적물이 굳어 만들어지는 암석", answer: "퇴적암" },
    { id: "metamorphic-rock", category: "beginnerGeology", prompt: "열과 압력으로 변해 만들어지는 암석", answer: "변성암" },
    { id: "producer", category: "beginnerLife", prompt: "생태계에서 생산자에 해당하는 생물", answer: "식물" },
    { id: "decomposer", category: "beginnerLife", prompt: "생태계에서 분해자 역할을 하는 생물", answer: "균류와 세균" },
    { id: "first-consumer", category: "beginnerLife", prompt: "먹이사슬에서 1차 소비자에 해당하는 생물", answer: "초식동물" },
    { id: "ozone-role", category: "beginnerWeather", prompt: "오존층의 중요한 기능", answer: "자외선 차단" },
    { id: "typhoon-energy", category: "beginnerWeather", prompt: "태풍이 강해질 때 필요한 주된 에너지원", answer: "따뜻한 바닷물" },
    { id: "water-cycle-start", category: "beginnerWeather", prompt: "물의 순환을 시작하게 하는 주요 열원", answer: "태양열" }
  ],
  intermediate: [
    { id: "dna-location", category: "intermediateCell", prompt: "세포에서 유전 정보가 주로 저장된 구조", answer: "핵" },
    { id: "mitochondria", category: "intermediateCell", prompt: "세포 호흡으로 에너지를 만드는 세포 소기관", answer: "미토콘드리아" },
    { id: "ribosome", category: "intermediateCell", prompt: "단백질 합성이 일어나는 소기관", answer: "리보솜" },
    { id: "chloroplast", category: "intermediateCell", prompt: "광합성이 일어나는 소기관", answer: "엽록체" },
    { id: "cell-membrane", category: "intermediateCell", prompt: "세포 안팎의 물질 이동을 조절하는 구조", answer: "세포막" },
    { id: "chromosome", category: "intermediateCell", prompt: "DNA가 응축되어 나타난 구조", answer: "염색체" },
    { id: "atomic-number", category: "intermediateChem", prompt: "원자 번호가 의미하는 값", answer: "양성자 수" },
    { id: "isotope", category: "intermediateChem", prompt: "동위 원소 사이에서 다른 입자 수", answer: "중성자 수" },
    { id: "ampere", category: "intermediatePhysics", prompt: "전류의 SI 단위", answer: "암페어(A)" },
    { id: "volt", category: "intermediatePhysics", prompt: "전압의 SI 단위", answer: "볼트(V)" },
    { id: "ohm", category: "intermediatePhysics", prompt: "전기 저항의 SI 단위", answer: "옴(Ω)" },
    { id: "watt", category: "intermediatePhysics", prompt: "전력의 SI 단위", answer: "와트(W)" },
    { id: "ohms-law", category: "intermediatePhysics", prompt: "전압·전류·저항의 관계식", answer: "V = IR" },
    { id: "newton2", category: "intermediatePhysics", prompt: "힘·질량·가속도의 관계식", answer: "F = ma" },
    { id: "speed", category: "intermediatePhysics", prompt: "속력을 계산하는 기본식", answer: "거리/시간" },
    { id: "acceleration", category: "intermediatePhysics", prompt: "가속도를 계산하는 기본식", answer: "속도 변화량/시간" },
    { id: "neutral-ph", category: "intermediateChem", prompt: "중성 용액의 대표 pH 값", answer: "7" },
    { id: "acid-ph", category: "intermediateChem", prompt: "산성 용액의 pH 범위", answer: "7보다 작다" },
    { id: "base-ph", category: "intermediateChem", prompt: "염기성 용액의 pH 범위", answer: "7보다 크다" },
    { id: "mass-conservation", category: "intermediateChem", prompt: "질량 보존 법칙의 핵심 내용", answer: "반응 전후 총질량이 같다" },
    { id: "ionic-bond", category: "intermediateChem", prompt: "금속과 비금속 사이에서 전자 이동으로 생기는 결합", answer: "이온 결합" },
    { id: "covalent-bond", category: "intermediateChem", prompt: "비금속 원자들 사이의 전자 공유 결합", answer: "공유 결합" },
    { id: "plate-motion", category: "intermediateEarthEco", prompt: "판 경계에서 지진이 자주 일어나는 주된 이유", answer: "판의 상대 운동" },
    { id: "reflection-law", category: "intermediateOptics", prompt: "빛의 반사 법칙에서 항상 같은 두 각", answer: "입사각과 반사각" },
    { id: "refraction-cause", category: "intermediateOptics", prompt: "빛이 굴절하는 직접 원인", answer: "매질에 따른 속도 변화" },
    { id: "convex-lens", category: "intermediateOptics", prompt: "볼록렌즈의 대표적인 작용", answer: "빛을 모음" },
    { id: "concave-lens", category: "intermediateOptics", prompt: "오목렌즈의 대표적인 작용", answer: "빛을 퍼뜨림" },
    { id: "sound-pitch", category: "intermediatePhysics", prompt: "소리의 높낮이에 가장 큰 영향을 주는 요소", answer: "진동수" },
    { id: "sound-loudness", category: "intermediatePhysics", prompt: "소리의 크기에 가장 큰 영향을 주는 요소", answer: "진폭" },
    { id: "eco-producer", category: "intermediateEarthEco", prompt: "생태계에서 광합성으로 유기물을 만드는 생물", answer: "식물과 조류" },
    { id: "primary-consumer", category: "intermediateEarthEco", prompt: "먹이사슬에서 1차 소비자의 예", answer: "토끼" },
    { id: "secondary-consumer", category: "intermediateEarthEco", prompt: "먹이사슬에서 2차 소비자의 예", answer: "뱀" },
    { id: "respiration-products", category: "intermediateCell", prompt: "세포 호흡의 대표적인 생성물", answer: "이산화탄소와 물" },
    { id: "hemoglobin", category: "intermediateCell", prompt: "혈액에서 산소 운반을 담당하는 단백질", answer: "헤모글로빈" },
    { id: "neuron", category: "intermediateCell", prompt: "신경계의 기능적 기본 단위", answer: "뉴런" }
  ],
  advanced: [
    { id: "glycolysis-location", category: "advancedBio", prompt: "해당 과정(glycolysis)이 진행되는 위치", answer: "세포질" },
    { id: "krebs-location", category: "advancedBio", prompt: "시트르산 회로(Krebs cycle)가 진행되는 위치", answer: "미토콘드리아 기질" },
    { id: "etc-location", category: "advancedBio", prompt: "전자전달계가 위치한 막", answer: "미토콘드리아 내막" },
    { id: "semi-conservative", category: "advancedBio", prompt: "DNA 복제 모델", answer: "반보존적 복제" },
    { id: "dna-polymerase", category: "advancedBio", prompt: "DNA 복제에서 새 가닥 합성을 담당하는 효소", answer: "DNA 중합효소" },
    { id: "rna-polymerase", category: "advancedBio", prompt: "전사 과정에서 RNA를 합성하는 효소", answer: "RNA 중합효소" },
    { id: "translation-location", category: "advancedBio", prompt: "번역(translation)이 일어나는 위치", answer: "리보솜" },
    { id: "atp-synthase", category: "advancedBio", prompt: "화학삼투 과정에서 ATP를 만드는 효소", answer: "ATP 합성효소" },
    { id: "enzyme-role", category: "advancedBio", prompt: "효소가 반응 속도를 높이는 핵심 원리", answer: "활성화 에너지 감소" },
    { id: "competitive-inhibition", category: "advancedBio", prompt: "경쟁적 저해의 핵심 특징", answer: "기질과 활성 부위 경쟁" },
    { id: "allosteric-regulation", category: "advancedBio", prompt: "알로스테릭 조절의 핵심 메커니즘", answer: "입체구조 변화로 효소 활성 조절" },
    { id: "le-chatelier", category: "advancedChem", prompt: "르샤틀리에 원리의 핵심 내용", answer: "평형계는 변화를 줄이는 방향으로 이동" },
    { id: "ideal-gas", category: "advancedChem", prompt: "이상기체 상태 방정식", answer: "PV = nRT" },
    { id: "boyle-law", category: "advancedChem", prompt: "보일 법칙을 나타내는 식", answer: "P1V1 = P2V2" },
    { id: "charles-law", category: "advancedChem", prompt: "샤를 법칙을 나타내는 식", answer: "V1/T1 = V2/T2" },
    { id: "oxidation", category: "advancedChem", prompt: "산화의 전자 관점 정의", answer: "전자 잃음" },
    { id: "reduction", category: "advancedChem", prompt: "환원의 전자 관점 정의", answer: "전자 얻음" },
    { id: "catalyst-k", category: "advancedChem", prompt: "촉매가 평형상수(K)에 미치는 영향", answer: "평형상수는 변하지 않음" },
    { id: "buffer", category: "advancedChem", prompt: "완충 용액의 핵심 기능", answer: "pH 변화 완화" },
    { id: "ph-formula", category: "advancedChem", prompt: "pH를 정의하는 식", answer: "pH = -log[H+]" },
    { id: "faraday-law", category: "advancedPhysics", prompt: "패러데이 법칙에서 유도 기전력이 생기는 조건", answer: "자기선속 변화" },
    { id: "lenz-law", category: "advancedPhysics", prompt: "렌츠 법칙에서 유도 전류 방향", answer: "자기선속 변화를 방해하는 방향" },
    { id: "coulomb-law", category: "advancedPhysics", prompt: "쿨롱 법칙 식", answer: "F = kq1q2/r²" },
    { id: "power-formula", category: "advancedPhysics", prompt: "전력 계산 기본식", answer: "P = VI" },
    { id: "snell-law", category: "advancedPhysics", prompt: "스넬 법칙 식", answer: "n1sinθ1 = n2sinθ2" },
    { id: "constructive-interference", category: "advancedPhysics", prompt: "보강 간섭이 일어나는 위상 조건", answer: "위상 차 2πm" },
    { id: "destructive-interference", category: "advancedPhysics", prompt: "상쇄 간섭이 일어나는 위상 조건", answer: "위상 차 (2m+1)π" },
    { id: "diffraction", category: "advancedPhysics", prompt: "회절이 뚜렷해지는 조건", answer: "틈 크기가 파장과 비슷할 때" },
    { id: "photoelectric", category: "advancedPhysics", prompt: "광전 효과에서 전자 방출의 핵심 조건", answer: "임계 진동수 이상" },
    { id: "de-broglie", category: "advancedPhysics", prompt: "드브로이 파장 관계식", answer: "λ = h/p" },
    { id: "depolarization", category: "advancedNeuro", prompt: "활동 전위 상승기에 주로 일어나는 이온 이동", answer: "Na+ 유입" },
    { id: "repolarization", category: "advancedNeuro", prompt: "활동 전위 하강기에 주로 일어나는 이온 이동", answer: "K+ 유출" },
    { id: "all-or-none", category: "advancedNeuro", prompt: "활동 전위의 전부-아니면-무 원리", answer: "자극이 역치를 넘으면 일정 크기로 발생" },
    { id: "homeostasis", category: "advancedNeuro", prompt: "항상성 유지에서 가장 대표적인 조절 방식", answer: "음성 되먹임" },
    { id: "final-acceptor", category: "advancedBio", prompt: "세포 호흡 전자전달계의 최종 전자수용체", answer: "산소" }
  ]
};

const SCIENCE_QUESTION_VARIANTS = [
  (prompt) => `${prompt}은(는) 무엇일까요?`,
  (prompt) => `다음 설명을 읽고 알맞은 답을 고르세요. ${prompt}`,
  (prompt) => `곰돌이 과학 퀴즈: ${prompt}에 해당하는 것은 무엇일까요?`
];

const SCIENCE_MIN_QUESTIONS_PER_LEVEL = 100;
const SCIENCE_MAX_ANSWER_SIMILARITY = 0.82;

function normalizeScienceText(text) {
  return String(text || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[(){}\[\]·.,!?~'"`:+\-=/\\]/g, "");
}

function buildScienceBigrams(text) {
  if (text.length <= 1) return [text];
  const bigrams = [];
  for (let index = 0; index < text.length - 1; index += 1) {
    bigrams.push(text.slice(index, index + 2));
  }
  return bigrams;
}

function calcScienceStringSimilarity(a, b) {
  const normalizedA = normalizeScienceText(a);
  const normalizedB = normalizeScienceText(b);
  if (!normalizedA || !normalizedB) return 0;
  if (normalizedA === normalizedB) return 1;

  const aBigrams = buildScienceBigrams(normalizedA);
  const bBigrams = buildScienceBigrams(normalizedB);
  const counts = new Map();
  aBigrams.forEach((token) => {
    counts.set(token, (counts.get(token) || 0) + 1);
  });

  let intersection = 0;
  bBigrams.forEach((token) => {
    const current = counts.get(token) || 0;
    if (current > 0) {
      intersection += 1;
      counts.set(token, current - 1);
    }
  });

  return (2 * intersection) / (aBigrams.length + bBigrams.length);
}

function normalizeSciencePrompt(prompt) {
  return String(prompt || "")
    .trim()
    .replace(/[.!?]$/, "");
}

function uniqueScienceList(items) {
  const seen = new Set();
  const unique = [];
  items.forEach((item) => {
    const key = normalizeScienceText(item);
    if (!key || seen.has(key)) return;
    seen.add(key);
    unique.push(String(item));
  });
  return unique;
}

function pickScienceDistractors(items, currentIndex) {
  const current = items[currentIndex];
  const answer = String(current.answer || "");
  const sameCategory = [];
  const crossCategory = [];

  items.forEach((item, index) => {
    if (index === currentIndex) return;
    const candidate = String(item.answer || "").trim();
    if (!candidate || normalizeScienceText(candidate) === normalizeScienceText(answer)) return;
    if (calcScienceStringSimilarity(answer, candidate) > SCIENCE_MAX_ANSWER_SIMILARITY) return;
    if (item.category === current.category) {
      sameCategory.push(candidate);
    } else {
      crossCategory.push(candidate);
    }
  });

  const merged = [...sameCategory, ...crossCategory];
  if (merged.length === 0) return [];

  const uniqueMerged = uniqueScienceList(merged);
  const startIndex = (currentIndex * 7) % uniqueMerged.length;
  const selected = [];

  for (let offset = 0; offset < uniqueMerged.length && selected.length < 3; offset += 1) {
    const candidate = uniqueMerged[(startIndex + offset) % uniqueMerged.length];
    if (!candidate) continue;
    if (calcScienceStringSimilarity(answer, candidate) > SCIENCE_MAX_ANSWER_SIMILARITY) continue;
    selected.push(candidate);
  }

  return selected.slice(0, 3);
}

function buildScienceQuestionBankFromFacts(factLibrary) {
  const bank = {};

  SCIENCE_LEVEL_KEYS.forEach((levelKey) => {
    const items = Array.isArray(factLibrary[levelKey]) ? factLibrary[levelKey] : [];

    const levelQuestions = items.flatMap((item, index) => {
      const prompt = normalizeSciencePrompt(item.prompt);
      const answer = String(item.answer || "").trim();
      if (!prompt || !answer) return [];

      const distractors = pickScienceDistractors(items, index);
      const options = uniqueScienceList([answer, ...distractors]).slice(0, 4);
      if (options.length < 4) return [];

      const categorySources = SCIENCE_SOURCE_PAIRS_BY_CATEGORY[item.category] || SCIENCE_SOURCE_PAIRS_BY_CATEGORY.fallback;
      const sourceIds = uniqueScienceList(categorySources).filter((sourceId) => SCIENCE_SOURCE_CATALOG[sourceId]).slice(0, 2);
      if (sourceIds.length < 2) return [];

      const explanation = `${prompt}의 정답은 "${answer}"이에요.`;
      const conceptId = `${levelKey}:${item.id || index}`;

      return SCIENCE_QUESTION_VARIANTS.map((buildQuestion, variantIndex) => ({
        question: buildQuestion(prompt),
        options,
        answer,
        explanation,
        conceptId,
        sourceIds,
        verification: "2-source-cross-check"
      }));
    });

    const deduped = [];
    const seenQuestions = new Set();
    levelQuestions.forEach((question) => {
      const key = normalizeScienceText(question.question);
      if (!key || seenQuestions.has(key)) return;
      seenQuestions.add(key);
      deduped.push(question);
    });

    bank[levelKey] = deduped;
  });

  return bank;
}

function validateScienceQuestionBank(bank) {
  const errors = [];
  const summary = {};

  SCIENCE_LEVEL_KEYS.forEach((levelKey) => {
    const list = Array.isArray(bank[levelKey]) ? bank[levelKey] : [];
    summary[levelKey] = list.length;

    if (list.length < SCIENCE_MIN_QUESTIONS_PER_LEVEL) {
      errors.push(`[${levelKey}] question count ${list.length} < ${SCIENCE_MIN_QUESTIONS_PER_LEVEL}`);
    }

    list.forEach((question, index) => {
      const answer = String(question.answer || "").trim();
      const options = Array.isArray(question.options) ? question.options.map((option) => String(option || "").trim()) : [];
      const uniqueOptions = uniqueScienceList(options);
      const sourceIds = Array.isArray(question.sourceIds) ? question.sourceIds : [];

      if (!answer) {
        errors.push(`[${levelKey}#${index}] empty answer`);
      }

      if (uniqueOptions.length !== 4) {
        errors.push(`[${levelKey}#${index}] options length must be 4 unique values`);
      }

      const hasAnswer = uniqueOptions.some((option) => normalizeScienceText(option) === normalizeScienceText(answer));
      if (!hasAnswer) {
        errors.push(`[${levelKey}#${index}] answer missing from options`);
      }

      if (sourceIds.length < 2) {
        errors.push(`[${levelKey}#${index}] sourceIds must have at least 2 references`);
      } else {
        sourceIds.forEach((sourceId) => {
          if (!SCIENCE_SOURCE_CATALOG[sourceId]) {
            errors.push(`[${levelKey}#${index}] unknown source id: ${sourceId}`);
          }
        });
      }

      uniqueOptions
        .filter((option) => normalizeScienceText(option) !== normalizeScienceText(answer))
        .forEach((distractor) => {
          const similarity = calcScienceStringSimilarity(answer, distractor);
          if (similarity > SCIENCE_MAX_ANSWER_SIMILARITY) {
            errors.push(
              `[${levelKey}#${index}] distractor too similar to answer (similarity=${similarity.toFixed(2)}): "${answer}" vs "${distractor}"`
            );
          }
        });
    });
  });

  return {
    ok: errors.length === 0,
    errors,
    summary
  };
}

const SCIENCE_QUESTION_BANK = buildScienceQuestionBankFromFacts(SCIENCE_FACT_ITEMS);
const SCIENCE_QUESTION_BANK_VALIDATION = validateScienceQuestionBank(SCIENCE_QUESTION_BANK);

if (!SCIENCE_QUESTION_BANK_VALIDATION.ok) {
  console.error("[science-bank] validation failed", SCIENCE_QUESTION_BANK_VALIDATION);
} else {
  console.info("[science-bank] validation passed", SCIENCE_QUESTION_BANK_VALIDATION.summary);
}

const BASEBALL_QUESTION_BANK = {
  beginner: [
    {
      question: "야구 경기에서 수비하는 한 팀의 선수는 몇 명일까요?",
      options: ["9명", "7명", "10명", "11명"],
      answer: "9명",
      explanation: "야구는 수비 시 9명이 그라운드에 나와요."
    },
    {
      question: "볼넷을 얻으려면 볼이 몇 개 필요할까요?",
      options: ["4개", "3개", "5개", "2개"],
      answer: "4개",
      explanation: "볼 카운트 4개가 되면 타자는 1루로 진루해요."
    },
    {
      question: "스트라이크가 몇 개가 되면 타자는 삼진 아웃일까요?",
      options: ["3개", "2개", "4개", "5개"],
      answer: "3개",
      explanation: "스트라이크 3개는 삼진이에요."
    },
    {
      question: "한 이닝 공격을 끝내려면 아웃이 몇 개 나와야 할까요?",
      options: ["3개", "2개", "4개", "5개"],
      answer: "3개",
      explanation: "아웃 3개가 되면 공수 교대해요."
    },
    {
      question: "주자가 점수를 얻으려면 어디를 밟아야 할까요?",
      options: ["홈플레이트", "1루 베이스", "투수판", "더그아웃"],
      answer: "홈플레이트",
      explanation: "모든 베이스를 돌아 홈플레이트를 밟으면 득점이에요."
    },
    {
      question: "타자가 친 공이 펜스를 넘어가며 득점하는 타격은 무엇일까요?",
      options: ["홈런", "번트", "희생플라이", "내야안타"],
      answer: "홈런",
      explanation: "홈런은 강한 타격으로 바로 득점 기회를 만들어요."
    },
    {
      question: "투수가 공을 던지는 약간 높은 흙 언덕을 무엇이라고 할까요?",
      options: ["마운드", "불펜", "더그아웃", "외야석"],
      answer: "마운드",
      explanation: "투수는 마운드에서 포수에게 공을 던져요."
    },
    {
      question: "타자가 배트를 휘둘렀지만 공을 맞히지 못하면 보통 무엇일까요?",
      options: ["스트라이크", "볼", "세이프", "파울"],
      answer: "스트라이크",
      explanation: "헛스윙은 스트라이크로 기록돼요."
    },
    {
      question: "프로야구 정규 경기의 기본 이닝 수는 몇 이닝일까요?",
      options: ["9이닝", "7이닝", "10이닝", "12이닝"],
      answer: "9이닝",
      explanation: "기본은 9이닝이며 동점이면 연장전에 들어가요."
    },
    {
      question: "타구가 1루-3루 파울라인 안쪽으로 떨어지면 무엇일까요?",
      options: ["페어볼", "파울볼", "데드볼", "보크"],
      answer: "페어볼",
      explanation: "파울라인 안쪽으로 떨어지면 페어볼이에요."
    },
    {
      question: "주자가 투수의 투구 때 다음 베이스를 노려 뛰는 플레이는 무엇일까요?",
      options: ["도루", "희생번트", "폭투", "견제"],
      answer: "도루",
      explanation: "도루는 주자가 타격 도움 없이 베이스를 훔치는 플레이예요."
    },
    {
      question: "타자가 친 뜬공을 수비수가 땅에 닿기 전에 잡으면 무엇일까요?",
      options: ["플라이 아웃", "볼넷", "안타", "보크"],
      answer: "플라이 아웃",
      explanation: "뜬공 캐치는 아웃 처리돼요."
    },
    {
      question: "공격 팀 선수들이 대기하는 공간은 어디일까요?",
      options: ["더그아웃", "마운드", "백스톱", "외야 펜스"],
      answer: "더그아웃",
      explanation: "더그아웃은 선수들이 쉬고 준비하는 공간이에요."
    },
    {
      question: "포수는 보통 어디에 위치할까요?",
      options: ["타자 뒤 홈플레이트 뒤쪽", "1루 베이스 옆", "마운드 위", "중견수 위치"],
      answer: "타자 뒤 홈플레이트 뒤쪽",
      explanation: "포수는 투수 공을 받고 경기 운영을 도와요."
    },
    {
      question: "만루 홈런이 나오면 몇 점이 들어갈까요?",
      options: ["4점", "1점", "2점", "3점"],
      answer: "4점",
      explanation: "주자 3명과 타자 1명까지 모두 득점해 4점이에요."
    },
    {
      question: "홈팀은 보통 각 이닝에서 선공일까요, 후공일까요?",
      options: ["후공", "선공", "번갈아 랜덤", "항상 연장만 공격"],
      answer: "후공",
      explanation: "홈팀은 각 이닝 말 공격을 해요."
    }
  ],
  intermediate: [
    {
      question: "주자가 강제로 다음 베이스로 가야 하는 상황에서 태그 없이 베이스를 먼저 밟아 잡는 아웃은 무엇일까요?",
      options: ["포스아웃", "태그아웃", "삼진아웃", "낫아웃"],
      answer: "포스아웃",
      explanation: "강제 진루 상황에서는 베이스를 먼저 밟으면 포스아웃이에요."
    },
    {
      question: "한 플레이에서 아웃 2개를 잡아내는 수비를 무엇이라고 할까요?",
      options: ["병살", "도루", "폭투", "세이브"],
      answer: "병살",
      explanation: "병살은 더블플레이라고도 불러요."
    },
    {
      question: "타자가 뜬공으로 아웃되더라도 3루 주자가 홈에 들어와 득점하는 플레이는 무엇일까요?",
      options: ["희생플라이", "희생번트", "스크린번트", "안타"],
      answer: "희생플라이",
      explanation: "외야 깊은 뜬공으로 득점 기회를 만드는 작전이에요."
    },
    {
      question: "지명타자(DH)의 주된 역할은 무엇일까요?",
      options: ["투수 대신 타격", "투수 대신 수비", "심판 대신 판정", "포수 대신 송구"],
      answer: "투수 대신 타격",
      explanation: "지명타자는 투수 대신 타석에 들어가는 제도예요."
    },
    {
      question: "주자가 있을 때 투수의 반칙 동작으로 주자를 진루시키는 규정은 무엇일까요?",
      options: ["보크", "발리", "파울팁", "인터피어런스"],
      answer: "보크",
      explanation: "보크가 선언되면 주자가 한 베이스씩 진루해요."
    },
    {
      question: "타율을 계산하는 올바른 식은 무엇일까요?",
      options: ["안타 / 타수", "득점 / 타점", "볼넷 / 타수", "삼진 / 타수"],
      answer: "안타 / 타수",
      explanation: "타율은 타자가 안타를 만드는 비율이에요."
    },
    {
      question: "OPS는 어떤 두 기록을 더한 값일까요?",
      options: ["출루율 + 장타율", "타율 + 홈런", "득점 + 타점", "볼넷 + 도루"],
      answer: "출루율 + 장타율",
      explanation: "OPS는 출루 능력과 장타력을 함께 보여줘요."
    },
    {
      question: "인필드 플라이 규정이 적용되는 대표 상황은 무엇일까요?",
      options: ["무사/1사에서 주자 1,2루 또는 만루", "2사에서 주자 없음", "주자 3루만 있을 때", "항상 모든 뜬공"],
      answer: "무사/1사에서 주자 1,2루 또는 만루",
      explanation: "수비가 고의 낙구로 병살을 노리는 것을 막기 위한 규정이에요."
    },
    {
      question: "희생번트의 주된 목적은 무엇일까요?",
      options: ["주자 진루", "홈런 만들기", "볼넷 유도", "시간 지연"],
      answer: "주자 진루",
      explanation: "타자 아웃을 감수하고 주자를 다음 베이스로 보내는 작전이에요."
    },
    {
      question: "견제구를 던지는 가장 큰 이유는 무엇일까요?",
      options: ["도루 억제", "심판 교체", "타순 변경", "공 교체 요청"],
      answer: "도루 억제",
      explanation: "견제로 주자의 리드를 줄이고 도루를 어렵게 만들어요."
    },
    {
      question: "세이브를 기록하는 투수는 보통 어떤 상황에서 등판할까요?",
      options: ["리드 상황을 지키며 경기 종료", "동점 상황만 전문", "항상 선발투수", "연장전 시작 투수"],
      answer: "리드 상황을 지키며 경기 종료",
      explanation: "마무리 투수가 팀의 리드를 지켜 경기를 끝내면 세이브가 돼요."
    },
    {
      question: "홀드는 주로 어떤 투수에게 기록될까요?",
      options: ["리드를 지키고 마무리에게 넘긴 계투", "경기 시작 선발투수", "패전투수", "완투승 투수"],
      answer: "리드를 지키고 마무리에게 넘긴 계투",
      explanation: "홀드는 승리와 세이브 사이 연결 역할을 평가해요."
    },
    {
      question: "폭투(Wild Pitch)와 포일(Passed Ball)의 차이로 맞는 것은 무엇일까요?",
      options: ["폭투는 투수 책임, 포일은 포수 책임", "둘 다 타자 책임", "둘 다 수비 실책과 무관", "폭투는 항상 보크"],
      answer: "폭투는 투수 책임, 포일은 포수 책임",
      explanation: "잡기 어려운 공의 책임 주체가 달라요."
    },
    {
      question: "만약 1루 주자가 도루를 시도할 때 타자가 헛스윙 삼진이면, 포수가 2루 송구로 잡는 플레이를 무엇이라 부를까요?",
      options: ["도루저지", "희생타", "밀어내기", "낫아웃"],
      answer: "도루저지",
      explanation: "포수가 빠른 송구로 주자를 아웃시키는 수비예요."
    },
    {
      question: "야수 선택(Fielder's Choice)은 어떤 상황을 말할까요?",
      options: ["안타보다 다른 주자를 잡으려 수비 선택", "무조건 실책", "무조건 장타", "자동 볼넷"],
      answer: "안타보다 다른 주자를 잡으려 수비 선택",
      explanation: "타자주자를 포기하고 선행주자 아웃을 노리는 판단이에요."
    },
    {
      question: "곰돌이 타자가 1루에서 2루, 2루에서 3루까지 모두 도루 성공했다면 무엇을 달성한 걸까요?",
      options: ["멀티 도루", "사이클링 히트", "노히트노런", "홀드"],
      answer: "멀티 도루",
      explanation: "한 경기에서 여러 번 도루를 성공하면 멀티 도루라 불러요."
    }
  ],
  advanced: [
    {
      question: "평균자책점(ERA)을 계산하는 기본 식은 무엇일까요?",
      options: ["자책점 × 9 / 투구이닝", "자책점 / 경기수", "실점 / 투구수", "삼진 / 이닝"],
      answer: "자책점 × 9 / 투구이닝",
      explanation: "ERA는 9이닝 기준으로 투수의 자책점 허용 능력을 보여줘요."
    },
    {
      question: "WHIP의 올바른 계산식은 무엇일까요?",
      options: ["(볼넷 + 피안타) / 투구이닝", "(삼진 + 볼넷) / 투구이닝", "피홈런 / 투구이닝", "실점 / 경기수"],
      answer: "(볼넷 + 피안타) / 투구이닝",
      explanation: "WHIP는 이닝당 얼마나 주자를 내보냈는지 보여줘요."
    },
    {
      question: "K/9(9이닝당 삼진) 계산식으로 맞는 것은 무엇일까요?",
      options: ["삼진 × 9 / 투구이닝", "삼진 / 경기수", "삼진 / 타수", "삼진 × 이닝"],
      answer: "삼진 × 9 / 투구이닝",
      explanation: "K/9은 탈삼진 능력을 이닝 기준으로 표준화한 지표예요."
    },
    {
      question: "BB/9(9이닝당 볼넷) 계산식으로 맞는 것은 무엇일까요?",
      options: ["볼넷 × 9 / 투구이닝", "볼넷 / 경기수", "볼넷 / 타자수", "볼넷 × 타수"],
      answer: "볼넷 × 9 / 투구이닝",
      explanation: "BB/9은 제구 안정성을 확인할 때 자주 사용해요."
    },
    {
      question: "FIP 지표가 상대적으로 더 직접 반영하려는 요소는 무엇일까요?",
      options: ["삼진, 볼넷, 사구, 피홈런", "타율, 득점권 타율, OPS", "실책, 더블플레이, 도루", "관중 수, 경기장 크기"],
      answer: "삼진, 볼넷, 사구, 피홈런",
      explanation: "FIP는 수비 영향보다 투수가 직접 통제한 결과에 초점을 둬요."
    },
    {
      question: "wRC+가 100이라는 뜻으로 가장 알맞은 것은 무엇일까요?",
      options: ["리그 평균 수준의 득점 생산력", "최상위 1위 타자", "출루율 1.000", "장타율 1.000"],
      answer: "리그 평균 수준의 득점 생산력",
      explanation: "wRC+는 리그 평균을 100으로 두는 조정 지표예요."
    },
    {
      question: "WAR 지표의 설명으로 가장 알맞은 것은 무엇일까요?",
      options: ["대체 선수 대비 팀 승리에 기여한 값", "순수 홈런 개수", "수비 실책 개수", "타격폼 점수"],
      answer: "대체 선수 대비 팀 승리에 기여한 값",
      explanation: "WAR는 선수의 종합 가치를 비교할 때 많이 활용돼요."
    },
    {
      question: "사이클링 히트를 달성하려면 한 경기에서 무엇이 모두 필요할까요?",
      options: ["단타, 2루타, 3루타, 홈런", "홈런 4개", "안타 2개와 볼넷 2개", "도루 3개"],
      answer: "단타, 2루타, 3루타, 홈런",
      explanation: "한 경기에서 네 종류의 안타를 모두 기록해야 해요."
    },
    {
      question: "노히트노런의 정의로 맞는 것은 무엇일까요?",
      options: ["안타를 하나도 허용하지 않고 경기 종료", "출루도 실점도 전혀 없는 경기", "삼진 10개 이상 경기", "완투만 하면 성립"],
      answer: "안타를 하나도 허용하지 않고 경기 종료",
      explanation: "볼넷이나 실책 출루는 있을 수 있지만 안타는 없어야 해요."
    },
    {
      question: "퍼펙트게임의 정의로 맞는 것은 무엇일까요?",
      options: ["상대 타자를 한 명도 출루시키지 않음", "안타만 허용하지 않음", "실점만 없으면 됨", "삼진 15개 이상"],
      answer: "상대 타자를 한 명도 출루시키지 않음",
      explanation: "볼넷, 실책, 몸에 맞는 공도 없어야 해서 매우 희귀해요."
    },
    {
      question: "타격 삼관왕의 세 부문으로 올바른 조합은 무엇일까요?",
      options: ["타율, 홈런, 타점", "타율, 도루, 출루율", "안타, 득점, 볼넷", "출루율, 장타율, OPS"],
      answer: "타율, 홈런, 타점",
      explanation: "타격 주요 3개 부문을 동시에 1위하면 삼관왕이에요."
    },
    {
      question: "OPS+ 지표에서 120은 어떤 의미일까요?",
      options: ["리그 평균보다 약 20% 좋은 공격력", "리그 평균과 동일", "리그 평균보다 20% 낮음", "수비력 120점"],
      answer: "리그 평균보다 약 20% 좋은 공격력",
      explanation: "OPS+도 100을 평균으로 사용하는 조정 지표예요."
    },
    {
      question: "BABIP는 주로 무엇을 관찰할 때 쓰일까요?",
      options: ["인플레이 타구의 안타 비율", "삼진률", "볼넷률", "도루 성공률"],
      answer: "인플레이 타구의 안타 비율",
      explanation: "운과 타구 질, 수비 영향 등을 함께 보는 데 도움돼요."
    },
    {
      question: "플래툰(Platoon) 전략의 핵심은 무엇일까요?",
      options: ["투타 좌우 상성을 활용한 기용", "수비 위치 무작위 변경", "항상 번트 작전", "타순 고정 금지"],
      answer: "투타 좌우 상성을 활용한 기용",
      explanation: "좌투수 상대 우타자 같은 상성 전략을 말해요."
    },
    {
      question: "구장 효과(Park Factor)가 높다는 의미로 가장 알맞은 것은 무엇일까요?",
      options: ["해당 구장에서 득점이 비교적 잘 나온다", "항상 수비가 유리하다", "심판 판정이 엄격하다", "비가 자주 온다"],
      answer: "해당 구장에서 득점이 비교적 잘 나온다",
      explanation: "구장 크기와 환경이 득점 환경에 영향을 줄 수 있어요."
    },
    {
      question: "곰돌이 투수가 7이닝 2자책점을 기록했다면 퀄리티스타트(QS) 기준에 해당할까요?",
      options: ["해당한다", "해당하지 않는다", "삼진 수에 따라 다르다", "승리투수일 때만 해당"],
      answer: "해당한다",
      explanation: "QS 기준은 6이닝 이상, 3자책점 이하예요."
    }
  ]
};

const SOCCER_FACT_ITEMS = {
  beginner: [
    { id: "team-size", category: "rules", prompt: "축구 경기에서 한 팀이 그라운드에 동시에 출전하는 선수 수", answer: "11명" },
    { id: "half-duration", category: "rules", prompt: "정규 시간 기준 전반 또는 후반 한 하프의 시간", answer: "45분" },
    { id: "halftime", category: "rules", prompt: "하프타임의 일반적인 길이", answer: "약 15분" },
    { id: "goal-condition", category: "rules", prompt: "골로 인정되기 위한 핵심 조건", answer: "공 전체가 골라인을 넘어야 함" },
    { id: "throw-in", category: "restart", prompt: "터치라인 밖으로 공이 나갔을 때의 기본 재개 방식", answer: "스로인" },
    { id: "corner-kick", category: "restart", prompt: "수비수가 마지막으로 터치한 공이 골라인을 벗어났을 때 공격팀 재개 방식", answer: "코너킥" },
    { id: "goal-kick", category: "restart", prompt: "공격수가 마지막으로 터치한 공이 골라인을 벗어났을 때 수비팀 재개 방식", answer: "골킥" },
    { id: "yellow-card", category: "discipline", prompt: "경고를 의미하는 카드", answer: "옐로카드" },
    { id: "red-card", category: "discipline", prompt: "즉시 퇴장을 의미하는 카드", answer: "레드카드" },
    { id: "two-yellow", category: "discipline", prompt: "한 경기에서 옐로카드 2장을 받으면 내려지는 조치", answer: "퇴장" },
    { id: "penalty-foul", category: "discipline", prompt: "수비 반칙이 자기 페널티 지역 안에서 발생했을 때 주어지는 것", answer: "페널티킥" },
    { id: "gk-hand-zone", category: "rules", prompt: "골키퍼가 손으로 공을 다룰 수 있는 기본 구역", answer: "자기 페널티지역" },
    { id: "offside-timing", category: "rules", prompt: "오프사이드 위치를 판단하는 기준 시점", answer: "패스가 출발하는 순간" },
    { id: "corner-spot", category: "restart", prompt: "코너킥을 차는 위치", answer: "코너 아크" },
    { id: "throw-technique", category: "restart", prompt: "스로인의 올바른 기본 동작", answer: "양손으로 머리 위에서 던진다" },
    { id: "wall-distance", category: "restart", prompt: "프리킥 시 수비벽이 지켜야 하는 최소 거리", answer: "9.15m" },
    { id: "minimum-players", category: "rules", prompt: "경기를 계속하기 위한 한 팀의 최소 선수 수", answer: "7명" },
    { id: "added-time", category: "rules", prompt: "추가시간이 주어지는 주된 이유", answer: "중단된 시간을 보충하기 위해" },
    { id: "captain-band", category: "terms", prompt: "주장을 식별하기 위한 대표 표시", answer: "주장 완장" },
    { id: "back-pass-rule", category: "rules", prompt: "골키퍼 백패스 규정의 핵심", answer: "발로 준 패스를 손으로 처리할 수 없다" },
    { id: "indirect-fk", category: "restart", prompt: "간접 프리킥의 핵심 득점 규정", answer: "직접 득점할 수 없다" },
    { id: "direct-fk", category: "restart", prompt: "직접 프리킥의 핵심 득점 규정", answer: "직접 득점할 수 있다" },
    { id: "penalty-distance", category: "restart", prompt: "페널티킥 지점과 골라인 사이 거리", answer: "11m" },
    { id: "goal-width", category: "equipment", prompt: "축구 골대의 가로 폭", answer: "7.32m" },
    { id: "goal-height", category: "equipment", prompt: "축구 골대의 세로 높이", answer: "2.44m" },
    { id: "ball-size", category: "equipment", prompt: "성인 공식 경기에서 사용하는 기본 공 규격", answer: "5호" },
    { id: "ball-circumference", category: "equipment", prompt: "공식 축구공의 둘레 범위", answer: "68~70cm" },
    { id: "striker-role", category: "position", prompt: "스트라이커의 핵심 임무", answer: "득점 마무리" },
    { id: "fullback-role", category: "position", prompt: "풀백의 핵심 임무", answer: "측면 수비와 오버래핑" },
    { id: "centerback-role", category: "position", prompt: "센터백의 핵심 임무", answer: "중앙 수비와 후방 빌드업 시작" },
    { id: "winger-role", category: "position", prompt: "윙어의 대표 역할", answer: "측면 돌파와 크로스" },
    { id: "dm-role", category: "position", prompt: "수비형 미드필더의 대표 역할", answer: "수비 보호와 전환 연결" },
    { id: "ref-role", category: "officiating", prompt: "주심의 기본 역할", answer: "규칙 적용과 판정" },
    { id: "ar-role", category: "officiating", prompt: "부심의 기본 역할", answer: "오프사이드와 아웃 판정 보조" },
    { id: "var-target", category: "officiating", prompt: "VAR이 우선적으로 다루는 핵심 판정 범주", answer: "득점·페널티킥·직접퇴장·오인식별" }
  ],
  intermediate: [
    { id: "formation-order", category: "tactics", prompt: "4-3-3 포메이션 숫자의 기본 의미 순서", answer: "수비수-미드필더-공격수" },
    { id: "double-pivot", category: "tactics", prompt: "더블 볼란치(Double pivot)의 핵심 구조", answer: "수비형 미드필더 2명이 축을 이룸" },
    { id: "false-nine", category: "tactics", prompt: "가짜 9번(False nine)의 대표 움직임", answer: "최전방이 내려와 연계한다" },
    { id: "inverted-winger", category: "tactics", prompt: "인버티드 윙어의 전형적인 움직임", answer: "안쪽으로 접고 들어와 슈팅/연계" },
    { id: "overlap", category: "tactics", prompt: "오버래핑(Overlap)의 핵심", answer: "뒤 선수의 바깥 추월 침투" },
    { id: "underlap", category: "tactics", prompt: "언더래핑(Underlap)의 핵심", answer: "뒤 선수가 안쪽 공간으로 침투" },
    { id: "half-space", category: "tactics", prompt: "하프스페이스의 위치", answer: "측면과 중앙 사이 세로 통로" },
    { id: "pressing-trigger", category: "pressing", prompt: "압박 트리거로 자주 쓰이는 상황", answer: "상대의 불안한 첫 터치" },
    { id: "counter-press", category: "pressing", prompt: "게겐프레싱의 핵심 타이밍", answer: "볼을 잃은 직후 즉시 압박" },
    { id: "low-block", category: "defense", prompt: "로우 블록의 특징", answer: "수비 라인을 낮추고 박스 근처를 촘촘히 지킴" },
    { id: "mid-block", category: "defense", prompt: "미드 블록의 특징", answer: "중원에서 라인 간격을 유지하며 압박" },
    { id: "high-line", category: "defense", prompt: "하이 라인의 특징", answer: "수비 라인을 높여 전진 압박" },
    { id: "rest-defense", category: "transition", prompt: "레스트 디펜스의 목적", answer: "공격 중 역습 위험을 줄이기 위한 후방 안정" },
    { id: "attack-transition", category: "transition", prompt: "공격 전환의 핵심", answer: "탈취 직후 빠르게 전진해 찬스 창출" },
    { id: "defense-transition", category: "transition", prompt: "수비 전환의 핵심", answer: "볼을 잃자마자 공간과 라인 정리" },
    { id: "switch-play", category: "tactics", prompt: "약한 쪽 전환(Switch play)의 주된 효과", answer: "반대편 넓은 공간 활용" },
    { id: "third-man-run", category: "tactics", prompt: "서드맨 런(Third-man run)의 핵심", answer: "직접 받지 않는 3번째 선수가 침투" },
    { id: "one-two", category: "tactics", prompt: "원투 패스의 핵심", answer: "짧은 패스 후 즉시 재침투" },
    { id: "overload-isolate", category: "tactics", prompt: "오버로드 투 아이솔레이트 전술의 개념", answer: "한쪽으로 모은 뒤 반대 1대1 공간 창출" },
    { id: "zonal-marking", category: "defense", prompt: "지역 방어(Zonal marking)의 기준", answer: "공간을 기준으로 수비" },
    { id: "man-marking", category: "defense", prompt: "대인 방어(Man marking)의 기준", answer: "선수를 기준으로 수비" },
    { id: "mixed-marking", category: "defense", prompt: "혼합 마킹의 핵심", answer: "지역 방어와 대인 방어를 함께 사용" },
    { id: "offside-trap", category: "defense", prompt: "오프사이드 트랩의 핵심 동작", answer: "수비 라인을 동시에 올려 타이밍을 끊음" },
    { id: "offside-risk", category: "defense", prompt: "오프사이드 트랩 실패 시 대표 위험", answer: "뒷공간 침투 허용" },
    { id: "cut-back", category: "attack", prompt: "컷백 패스의 대표 타깃 구역", answer: "페널티 지역 중앙/후방 침투 지점" },
    { id: "diagonal-pass", category: "attack", prompt: "대각 패스의 전술적 장점", answer: "수비 라인을 비껴 전진 경로 확보" },
    { id: "wingback-role", category: "position", prompt: "윙백의 핵심 역할", answer: "측면에서 공격과 수비를 모두 수행" },
    { id: "pivot-role", category: "position", prompt: "피벗(Pivot)의 핵심 역할", answer: "빌드업 중심 축으로 방향 전환" },
    { id: "progressive-pass", category: "metrics", prompt: "프로그레시브 패스의 정의", answer: "상대 골문 방향으로 의미 있게 전진시키는 패스" },
    { id: "key-pass", category: "metrics", prompt: "키 패스의 정의", answer: "슈팅으로 직접 이어진 패스" },
    { id: "press-resistance", category: "metrics", prompt: "프레스 저항(Press resistance)의 의미", answer: "압박 상황에서 공을 지키고 전개하는 능력" },
    { id: "compactness", category: "defense", prompt: "컴팩트니스(Compactness)의 핵심", answer: "라인 간 간격을 좁혀 공간을 줄임" },
    { id: "second-ball", category: "terms", prompt: "세컨드 볼(Second ball)의 의미", answer: "경합 뒤 떨어지는 루즈볼" },
    { id: "direct-play", category: "attack", prompt: "다이렉트 플레이의 특징", answer: "짧은 횡패스보다 빠른 전진을 우선" },
    { id: "possession-play", category: "attack", prompt: "포제션 플레이의 특징", answer: "볼 소유를 유지하며 기회를 설계" }
  ],
  advanced: [
    { id: "xg", category: "analytics", prompt: "xG(Expected Goals)의 핵심 의미", answer: "슈팅 한 번이 골이 될 기대 확률" },
    { id: "npxg", category: "analytics", prompt: "npxG의 의미", answer: "페널티킥을 제외한 기대득점" },
    { id: "xa", category: "analytics", prompt: "xA(Expected Assists)의 의미", answer: "패스가 골로 이어질 기대 도움값" },
    { id: "ppda", category: "analytics", prompt: "PPDA가 낮다는 해석으로 맞는 것", answer: "상대 패스를 적게 허용할 만큼 강하게 압박" },
    { id: "field-tilt", category: "analytics", prompt: "Field Tilt 지표가 주로 보여주는 것", answer: "공격 진영 점유 비중" },
    { id: "xt", category: "analytics", prompt: "xT(Expected Threat)의 목적", answer: "볼 이동이 득점 위협을 얼마나 높였는지 측정" },
    { id: "progressive-carry", category: "analytics", prompt: "프로그레시브 캐리의 정의", answer: "드리블로 공을 유의미하게 전진 운반" },
    { id: "final-third-entry", category: "analytics", prompt: "Final-third entry가 의미하는 것", answer: "공을 공격 3분의 1 지역으로 진입시킨 횟수" },
    { id: "box-entry", category: "analytics", prompt: "박스 엔트리(Box entry)의 의미", answer: "공을 페널티 지역 안으로 투입한 상황" },
    { id: "game-state", category: "analytics", prompt: "데이터 해석에서 게임 스테이트를 반드시 보는 이유", answer: "리드/열세에 따라 전술과 지표가 달라지기 때문" },
    { id: "shot-quality", category: "analytics", prompt: "슈팅 질을 좌우하는 대표 요소", answer: "거리·각도·압박 정도" },
    { id: "set-piece-xg", category: "analytics", prompt: "세트피스 xG를 관리하는 이유", answer: "정지 상황이 고품질 찬스를 자주 만들기 때문" },
    { id: "counter-efficiency", category: "analytics", prompt: "역습 효율이 높다는 뜻", answer: "적은 터치로 빠르게 슈팅까지 연결" },
    { id: "positional-play", category: "tactical-principle", prompt: "포지셔널 플레이의 핵심 원칙", answer: "공간 점유와 패스 라인 최적화" },
    { id: "five-lanes", category: "tactical-principle", prompt: "5레인 점유 원칙의 목적", answer: "공격 폭과 깊이를 균형 있게 확보" },
    { id: "numerical-superiority", category: "tactical-principle", prompt: "수적 우위의 의미", answer: "특정 구역에서 상대보다 많은 인원 확보" },
    { id: "positional-superiority", category: "tactical-principle", prompt: "위치적 우위의 의미", answer: "라인 사이 유리한 위치를 선점" },
    { id: "qualitative-superiority", category: "tactical-principle", prompt: "질적 우위의 의미", answer: "개인 능력 우위 매치업을 활용" },
    { id: "cover-shadow", category: "pressing", prompt: "커버 섀도우(Cover shadow)의 핵심", answer: "몸 방향으로 패스 길목을 가리며 압박" },
    { id: "pressing-trap", category: "pressing", prompt: "프레싱 트랩의 목적", answer: "상대를 유도한 지점에서 집단 압박" },
    { id: "rest-defense-shape", category: "transition", prompt: "레스트 디펜스에서 자주 쓰는 후방 균형 구조", answer: "2-3 또는 3-2 형태" },
    { id: "line-breaking-pass", category: "attack", prompt: "라인 브레이킹 패스의 정의", answer: "수비 라인을 관통해 전진 연결하는 패스" },
    { id: "third-line-pass", category: "attack", prompt: "써드 라인 패스의 목적", answer: "중원/수비 라인을 넘어 전방에 직접 연결" },
    { id: "vertical-compactness", category: "defense", prompt: "세로 컴팩트니스의 효과", answer: "라인 간 거리를 줄여 중앙 공간 차단" },
    { id: "horizontal-compactness", category: "defense", prompt: "가로 컴팩트니스의 효과", answer: "좌우 간격을 줄여 하프스페이스 차단" },
    { id: "tempo-control", category: "tactical-principle", prompt: "템포 컨트롤의 의미", answer: "공격 속도를 상황에 맞게 조절" },
    { id: "circulation", category: "tactical-principle", prompt: "볼 순환(Circulation)의 주된 목적", answer: "수비 블록을 이동시켜 빈 공간 생성" },
    { id: "xpts", category: "analytics", prompt: "xPts(Expected Points)의 의미", answer: "경기 내용 기반의 기대 승점" },
    { id: "conversion-rate", category: "analytics", prompt: "슈팅 전환율(Conversion rate)의 의미", answer: "슈팅 대비 득점 비율" },
    { id: "post-shot-xg", category: "analytics", prompt: "Post-shot xG가 반영하는 핵심 요소", answer: "슈팅 이후 공의 실제 궤적/코스 품질" },
    { id: "load-management", category: "performance", prompt: "로드 매니지먼트의 핵심 목표", answer: "과부하를 줄여 부상 위험 관리" },
    { id: "periodization", category: "performance", prompt: "주기화 훈련(Periodization)의 핵심", answer: "경기 일정에 맞춘 훈련 강도 설계" },
    { id: "tapering", category: "performance", prompt: "테이퍼링(Tapering)의 목적", answer: "중요 경기 전 피로를 줄여 컨디션 최고화" },
    { id: "sleep", category: "performance", prompt: "수면이 경기력에 중요한 이유", answer: "인지 판단과 반응 속도 회복" },
    { id: "hydration", category: "performance", prompt: "탈수가 경기력에 미치는 대표 영향", answer: "집중력과 고강도 수행 능력 저하" },
    { id: "video-analysis", category: "performance", prompt: "영상 분석의 핵심 가치", answer: "전술 패턴과 약점을 객관적으로 확인" }
  ]
};

const SOCCER_QUESTION_VARIANTS = [
  (prompt) => `${prompt}으로 가장 알맞은 것은 무엇일까요?`,
  (prompt) => `다음 문장을 보고 정답을 고르세요. ${prompt}`,
  (prompt) => `곰돌이 축구 퀴즈: ${prompt}에 해당하는 답은 무엇일까요?`
];

const SOCCER_MIN_QUESTIONS_PER_LEVEL = 100;
const SOCCER_MAX_ANSWER_SIMILARITY = 0.84;

function normalizeSoccerText(text) {
  return String(text || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[(){}\[\]·.,!?~'"`:+\-=/\\]/g, "");
}

function buildSoccerBigrams(text) {
  if (text.length <= 1) return [text];
  const bigrams = [];
  for (let index = 0; index < text.length - 1; index += 1) {
    bigrams.push(text.slice(index, index + 2));
  }
  return bigrams;
}

function calcSoccerStringSimilarity(a, b) {
  const normalizedA = normalizeSoccerText(a);
  const normalizedB = normalizeSoccerText(b);
  if (!normalizedA || !normalizedB) return 0;
  if (normalizedA === normalizedB) return 1;

  const aBigrams = buildSoccerBigrams(normalizedA);
  const bBigrams = buildSoccerBigrams(normalizedB);
  const counts = new Map();
  aBigrams.forEach((token) => {
    counts.set(token, (counts.get(token) || 0) + 1);
  });

  let intersection = 0;
  bBigrams.forEach((token) => {
    const current = counts.get(token) || 0;
    if (current > 0) {
      intersection += 1;
      counts.set(token, current - 1);
    }
  });

  return (2 * intersection) / (aBigrams.length + bBigrams.length);
}

function uniqueSoccerList(items) {
  const seen = new Set();
  const unique = [];

  items.forEach((item) => {
    const normalized = normalizeSoccerText(item);
    if (!normalized || seen.has(normalized)) return;
    seen.add(normalized);
    unique.push(String(item));
  });

  return unique;
}

function normalizeSoccerPrompt(prompt) {
  return String(prompt || "")
    .trim()
    .replace(/[.!?]$/, "");
}

function pickSoccerDistractors(items, currentIndex) {
  const current = items[currentIndex];
  const answer = String(current.answer || "").trim();
  const sameCategory = [];
  const crossCategory = [];

  items.forEach((item, index) => {
    if (index === currentIndex) return;
    const candidate = String(item.answer || "").trim();
    if (!candidate) return;
    if (normalizeSoccerText(candidate) === normalizeSoccerText(answer)) return;
    if (calcSoccerStringSimilarity(answer, candidate) > SOCCER_MAX_ANSWER_SIMILARITY) return;

    if (item.category === current.category) {
      sameCategory.push(candidate);
    } else {
      crossCategory.push(candidate);
    }
  });

  const merged = uniqueSoccerList([...sameCategory, ...crossCategory]);
  if (merged.length === 0) return [];

  const startIndex = (currentIndex * 5) % merged.length;
  const selected = [];

  for (let offset = 0; offset < merged.length && selected.length < 3; offset += 1) {
    const candidate = merged[(startIndex + offset) % merged.length];
    if (!candidate) continue;
    if (calcSoccerStringSimilarity(answer, candidate) > SOCCER_MAX_ANSWER_SIMILARITY) continue;
    selected.push(candidate);
  }

  return selected.slice(0, 3);
}

function buildSoccerQuestionBankFromFacts(factLibrary) {
  const bank = {};

  SOCCER_LEVEL_KEYS.forEach((levelKey) => {
    const items = Array.isArray(factLibrary[levelKey]) ? factLibrary[levelKey] : [];
    const questions = items.flatMap((item, index) => {
      const prompt = normalizeSoccerPrompt(item.prompt);
      const answer = String(item.answer || "").trim();
      if (!prompt || !answer) return [];

      const distractors = pickSoccerDistractors(items, index);
      const options = uniqueSoccerList([answer, ...distractors]).slice(0, 4);
      if (options.length < 4) return [];

      const conceptId = `${levelKey}:${item.id || index}`;
      const explanation = `${prompt}의 정답은 "${answer}"이에요.`;

      return SOCCER_QUESTION_VARIANTS.map((buildQuestion) => ({
        question: buildQuestion(prompt),
        options,
        answer,
        explanation,
        conceptId,
        verification: "option-answer-similarity-check"
      }));
    });

    const deduped = [];
    const seenQuestions = new Set();

    questions.forEach((question) => {
      const key = normalizeSoccerText(question.question);
      if (!key || seenQuestions.has(key)) return;
      seenQuestions.add(key);
      deduped.push(question);
    });

    bank[levelKey] = deduped;
  });

  return bank;
}

function validateSoccerQuestionBank(bank) {
  const errors = [];
  const summary = {};

  SOCCER_LEVEL_KEYS.forEach((levelKey) => {
    const list = Array.isArray(bank[levelKey]) ? bank[levelKey] : [];
    summary[levelKey] = list.length;

    if (list.length < SOCCER_MIN_QUESTIONS_PER_LEVEL) {
      errors.push(`[${levelKey}] question count ${list.length} < ${SOCCER_MIN_QUESTIONS_PER_LEVEL}`);
    }

    list.forEach((question, index) => {
      const answer = String(question.answer || "").trim();
      const options = Array.isArray(question.options) ? question.options.map((option) => String(option || "").trim()) : [];
      const uniqueOptions = uniqueSoccerList(options);

      if (!answer) {
        errors.push(`[${levelKey}#${index}] empty answer`);
      }

      if (uniqueOptions.length !== 4) {
        errors.push(`[${levelKey}#${index}] options length must be 4 unique values`);
      }

      const hasAnswer = uniqueOptions.some((option) => normalizeSoccerText(option) === normalizeSoccerText(answer));
      if (!hasAnswer) {
        errors.push(`[${levelKey}#${index}] answer missing from options`);
      }

      uniqueOptions
        .filter((option) => normalizeSoccerText(option) !== normalizeSoccerText(answer))
        .forEach((distractor) => {
          const similarity = calcSoccerStringSimilarity(answer, distractor);
          if (similarity > SOCCER_MAX_ANSWER_SIMILARITY) {
            errors.push(
              `[${levelKey}#${index}] distractor too similar to answer (similarity=${similarity.toFixed(2)}): "${answer}" vs "${distractor}"`
            );
          }
        });
    });
  });

  return {
    ok: errors.length === 0,
    errors,
    summary
  };
}

const SOCCER_QUESTION_BANK = buildSoccerQuestionBankFromFacts(SOCCER_FACT_ITEMS);
const SOCCER_QUESTION_BANK_VALIDATION = validateSoccerQuestionBank(SOCCER_QUESTION_BANK);

if (!SOCCER_QUESTION_BANK_VALIDATION.ok) {
  console.error("[soccer-bank] validation failed", SOCCER_QUESTION_BANK_VALIDATION);
} else {
  console.info("[soccer-bank] validation passed", SOCCER_QUESTION_BANK_VALIDATION.summary);
}

const WORLD_HISTORY_QUESTION_BANK = {
  grade6: [
    {
      question: "곰돌이 탐험대가 이집트에서 본 거대한 왕의 무덤은 무엇일까요?",
      options: ["피라미드", "콜로세움", "만리장성", "앙코르와트"],
      answer: "피라미드",
      explanation: "고대 이집트의 대표 유적은 피라미드예요."
    },
    {
      question: "시민이 정치에 참여하는 민주 정치가 발달한 고대 그리스 도시국가는 어디일까요?",
      options: ["아테네", "스파르타", "테베", "코린토스"],
      answer: "아테네",
      explanation: "아테네는 시민 참여 정치로 유명해요."
    },
    {
      question: "로마 제국 시기에 검투 경기장이 있던 대표 건축물은 무엇일까요?",
      options: ["콜로세움", "파르테논", "피라미드", "자금성"],
      answer: "콜로세움",
      explanation: "콜로세움은 고대 로마를 상징하는 원형 경기장이에요."
    },
    {
      question: "동서 문명을 이어 준 고대 교역로는 무엇일까요?",
      options: ["실크로드", "향신료 철도", "대서양 항로", "북극 항로"],
      answer: "실크로드",
      explanation: "실크로드를 통해 물자와 문화가 함께 이동했어요."
    },
    {
      question: "중국을 처음으로 통일한 인물은 누구일까요?",
      options: ["진시황", "한무제", "당태종", "송태조"],
      answer: "진시황",
      explanation: "진시황은 전국 시대를 끝내고 중국을 통일했어요."
    },
    {
      question: "불교를 시작한 인물은 누구일까요?",
      options: ["석가모니", "공자", "소크라테스", "알렉산드로스"],
      answer: "석가모니",
      explanation: "석가모니는 불교의 창시자로 알려져 있어요."
    },
    {
      question: "이슬람교를 창시한 인물은 누구일까요?",
      options: ["무함마드", "예수", "루터", "칼뱅"],
      answer: "무함마드",
      explanation: "무함마드는 이슬람교의 예언자예요."
    },
    {
      question: "고대 인더스 문명의 특징으로 알맞은 것은 무엇일까요?",
      options: ["계획 도시와 배수 시설", "피라미드 건설", "기사도 문화", "증기기관 발명"],
      answer: "계획 도시와 배수 시설",
      explanation: "인더스 문명은 도시 계획과 배수 시설이 발달했어요."
    },
    {
      question: "고대 올림픽이 시작된 지역은 어디일까요?",
      options: ["그리스", "이집트", "페르시아", "인도"],
      answer: "그리스",
      explanation: "올림픽은 고대 그리스 문화에서 시작됐어요."
    },
    {
      question: "로마가 넓은 영토를 통치하는 데 도움이 된 요소로 가장 알맞은 것은 무엇일까요?",
      options: ["도로망과 법", "증기기관", "인터넷", "화약무기"],
      answer: "도로망과 법",
      explanation: "로마는 도로망과 법 제도로 제국 통치를 강화했어요."
    },
    {
      question: "마야 문명과 관련 있는 것으로 가장 알맞은 것은 무엇일까요?",
      options: ["정교한 달력", "기사도", "의회 민주주의", "산업도시"],
      answer: "정교한 달력",
      explanation: "마야 문명은 천문 관측과 달력 체계로 유명해요."
    },
    {
      question: "몽골 제국을 세운 인물은 누구일까요?",
      options: ["칭기즈 칸", "쿠빌라이 칸", "티무르", "다리우스"],
      answer: "칭기즈 칸",
      explanation: "칭기즈 칸은 몽골 부족을 통합해 제국을 세웠어요."
    },
    {
      question: "신대륙 개척의 상징이 된 대서양 항해를 이끈 인물은 누구일까요?",
      options: ["콜럼버스", "바스코 다 가마", "마젤란", "쿡"],
      answer: "콜럼버스",
      explanation: "콜럼버스의 항해는 대항해 시대 확장을 상징해요."
    },
    {
      question: "르네상스가 가장 먼저 크게 발전한 지역은 어디일까요?",
      options: ["이탈리아", "영국", "러시아", "네덜란드"],
      answer: "이탈리아",
      explanation: "피렌체를 중심으로 르네상스가 확산됐어요."
    },
    {
      question: "고대 이집트에서 파라오의 역할로 가장 알맞은 것은 무엇일까요?",
      options: ["정치와 종교의 최고 권력자", "상인 조합 대표", "군대의 일반 병사", "학교 교사"],
      answer: "정치와 종교의 최고 권력자",
      explanation: "파라오는 왕이자 신성한 통치자로 여겨졌어요."
    },
    {
      question: "실크로드를 통해 널리 전파된 것으로 가장 알맞은 것은 무엇일까요?",
      options: ["비단과 종교", "증기기관과 전기", "석유와 자동차", "라디오와 TV"],
      answer: "비단과 종교",
      explanation: "실크로드는 상품뿐 아니라 사상과 종교도 전파했어요."
    },
    {
      question: "만리장성을 쌓은 주요 목적은 무엇일까요?",
      options: ["북방 유목민의 침입 방어", "해상 무역 확대", "종교 행사", "곡물 저장"],
      answer: "북방 유목민의 침입 방어",
      explanation: "장성은 북방 세력의 침입을 막기 위한 방어 시설이었어요."
    },
    {
      question: "곰돌이 선생님이 말한 '신대륙과 구대륙의 작물·가축 교환'을 무엇이라고 부를까요?",
      options: ["콜럼버스 교환", "산업혁명", "십자군 원정", "대분열"],
      answer: "콜럼버스 교환",
      explanation: "대항해 시대 이후 대륙 간 생태·식문화 교류를 뜻해요."
    }
  ],
  grade5: [
    {
      question: "중세 봉건 사회에서 기본 관계로 알맞은 것은 무엇일까요?",
      options: ["영주와 봉신", "황제와 의회", "노동자와 사장", "시민과 시장"],
      answer: "영주와 봉신",
      explanation: "봉건제는 토지와 충성을 매개로 한 관계가 핵심이에요."
    },
    {
      question: "십자군 전쟁의 직접적 목표로 가장 알맞은 것은 무엇일까요?",
      options: ["예루살렘 탈환", "아메리카 탐험", "독일 통일", "프랑스 혁명"],
      answer: "예루살렘 탈환",
      explanation: "성지 예루살렘을 둘러싼 갈등이 중심이었어요."
    },
    {
      question: "마그나카르타의 역사적 의미로 가장 알맞은 것은 무엇일까요?",
      options: ["왕권 제한과 법의 지배 강화", "교황권 강화", "노예제 폐지", "공산주의 확산"],
      answer: "왕권 제한과 법의 지배 강화",
      explanation: "마그나카르타는 왕도 법 아래에 있다는 원칙을 강화했어요."
    },
    {
      question: "흑사병 이후 유럽 사회의 변화로 가장 알맞은 것은 무엇일까요?",
      options: ["노동력 부족으로 농노제 약화", "귀족 인구 급증", "도시 완전 소멸", "무역 전면 중단"],
      answer: "노동력 부족으로 농노제 약화",
      explanation: "인구 감소로 노동 가치가 상승하며 사회 구조가 변했어요."
    },
    {
      question: "르네상스의 핵심 정신으로 가장 알맞은 것은 무엇일까요?",
      options: ["인문주의", "신권정치", "군국주의", "중상주의"],
      answer: "인문주의",
      explanation: "르네상스는 인간의 가치와 가능성을 중시했어요."
    },
    {
      question: "금속활자 인쇄술 확산에 기여한 인물은 누구일까요?",
      options: ["구텐베르크", "코페르니쿠스", "갈릴레이", "뉴턴"],
      answer: "구텐베르크",
      explanation: "인쇄술 발달은 지식 보급을 빠르게 만들었어요."
    },
    {
      question: "종교개혁의 출발점으로 자주 다뤄지는 사건은 무엇일까요?",
      options: ["루터의 95개조 반박문", "베르사유 조약", "빈 회의", "보스턴 차 사건"],
      answer: "루터의 95개조 반박문",
      explanation: "루터의 문제 제기는 서유럽 교회 질서에 큰 변화를 일으켰어요."
    },
    {
      question: "영국 국교회(성공회) 성립과 관련 깊은 인물은 누구일까요?",
      options: ["헨리 8세", "엘리자베스 1세", "제임스 1세", "찰스 2세"],
      answer: "헨리 8세",
      explanation: "헨리 8세 시기에 로마 교회와 결별하며 성공회가 성립됐어요."
    },
    {
      question: "바스코 다 가마의 항해 성과로 가장 알맞은 것은 무엇일까요?",
      options: ["유럽-인도 직항 해로 개척", "아메리카 발견", "세계 일주 완성", "북극항로 개척"],
      answer: "유럽-인도 직항 해로 개척",
      explanation: "희망봉을 돌아 인도로 가는 항로를 열었어요."
    },
    {
      question: "명나라의 해상 원정을 이끈 인물은 누구일까요?",
      options: ["정화", "이이", "콜럼버스", "마젤란"],
      answer: "정화",
      explanation: "정화는 대규모 함대를 이끌고 원정을 진행했어요."
    },
    {
      question: "비잔티움 제국의 막을 내리게 한 사건은 무엇일까요?",
      options: ["오스만의 콘스탄티노플 점령", "프랑스혁명 발발", "미국 독립선언", "제1차 세계대전"],
      answer: "오스만의 콘스탄티노플 점령",
      explanation: "오스만 제국의 콘스탄티노플 점령으로 비잔티움 제국이 멸망했어요."
    },
    {
      question: "스페인 무적함대 패배의 결과로 가장 알맞은 것은 무엇일까요?",
      options: ["영국 해상 세력 부상", "러시아 팽창", "중국 통일", "교황권 강화"],
      answer: "영국 해상 세력 부상",
      explanation: "해상 패권 경쟁에서 영국의 위상이 높아졌어요."
    },
    {
      question: "지동설을 제시한 인물은 누구일까요?",
      options: ["코페르니쿠스", "케플러", "데카르트", "베이컨"],
      answer: "코페르니쿠스",
      explanation: "코페르니쿠스는 태양 중심의 우주관을 제시했어요."
    },
    {
      question: "웨스트팔리아 조약 이후 강화된 원칙은 무엇일까요?",
      options: ["국가 주권 존중", "왕권신수설", "십자군 재개", "노예무역 확대"],
      answer: "국가 주권 존중",
      explanation: "근대 국제질서의 기본 원칙이 형성됐어요."
    },
    {
      question: "에도 막부 시기 일본의 대외 정책으로 가장 알맞은 것은 무엇일까요?",
      options: ["쇄국 정책", "식민지 확장", "유럽 연합 가입", "자유무역 전면화"],
      answer: "쇄국 정책",
      explanation: "막부는 대외 교류를 제한하는 쇄국 정책을 펼쳤어요."
    },
    {
      question: "무굴 제국 문화와 관련 깊은 건축물은 무엇일까요?",
      options: ["타지마할", "베르사유 궁전", "콜로세움", "파르테논"],
      answer: "타지마할",
      explanation: "타지마할은 무굴 제국의 대표 건축물이에요."
    },
    {
      question: "콜럼버스 교환으로 유럽 식생활에 큰 변화를 준 작물은 무엇일까요?",
      options: ["감자", "벼", "밀", "보리"],
      answer: "감자",
      explanation: "감자와 옥수수 같은 신대륙 작물이 유럽에 큰 영향을 줬어요."
    },
    {
      question: "중상주의 정책의 특징으로 가장 알맞은 것은 무엇일까요?",
      options: ["수출 장려와 금·은 축적", "노예제 폐지", "삼권분립", "보편 복지 확대"],
      answer: "수출 장려와 금·은 축적",
      explanation: "국가가 무역을 통제해 부를 축적하려는 정책이에요."
    }
  ],
  grade4: [
    {
      question: "\"대표 없는 과세는 안 된다\"라는 구호와 관련된 사건은 무엇일까요?",
      options: ["미국 독립혁명", "프랑스혁명", "러시아혁명", "중국혁명"],
      answer: "미국 독립혁명",
      explanation: "영국의 과세 정책에 대한 식민지 반발이 독립혁명으로 이어졌어요."
    },
    {
      question: "프랑스혁명 시기 발표된 인권 문서는 무엇일까요?",
      options: ["인간과 시민의 권리 선언", "마그나카르타", "대서양 헌장", "베르사유 조약"],
      answer: "인간과 시민의 권리 선언",
      explanation: "자유와 평등 원칙을 선언한 문서예요."
    },
    {
      question: "나폴레옹 법전의 역사적 의미로 가장 알맞은 것은 무엇일까요?",
      options: ["근대적 법 체계 확산", "노예제 강화", "봉건제 부활", "교황권 절대화"],
      answer: "근대적 법 체계 확산",
      explanation: "법 앞의 평등 등 근대 법 원칙 확산에 기여했어요."
    },
    {
      question: "나폴레옹 전쟁 이후 유럽 보수 질서를 재편한 회의는 무엇일까요?",
      options: ["빈 회의", "얄타 회담", "포츠담 회담", "반둥 회의"],
      answer: "빈 회의",
      explanation: "열강은 혁명 확산을 억제하려 했어요."
    },
    {
      question: "라틴아메리카 독립운동의 대표 지도자는 누구일까요?",
      options: ["시몬 볼리바르", "가리발디", "메테르니히", "비스마르크"],
      answer: "시몬 볼리바르",
      explanation: "볼리바르는 남미 독립운동을 이끈 핵심 인물이에요."
    },
    {
      question: "산업혁명의 동력으로 중요했던 기술은 무엇일까요?",
      options: ["증기기관", "활판인쇄", "나침반", "화약"],
      answer: "증기기관",
      explanation: "증기기관은 공장·교통 발전을 이끌었어요."
    },
    {
      question: "산업혁명 이후 도시에서 나타난 현상으로 가장 알맞은 것은 무엇일까요?",
      options: ["도시화 가속", "농촌 인구 급증", "길드 강화", "신분제 고착"],
      answer: "도시화 가속",
      explanation: "공장 노동을 위해 인구가 도시로 이동했어요."
    },
    {
      question: "산업혁명 시기 노동 환경 개선을 요구하며 발전한 움직임은 무엇일까요?",
      options: ["노동조합 운동", "십자군 운동", "종교재판", "왕정복고"],
      answer: "노동조합 운동",
      explanation: "장시간 노동과 저임금 문제를 해결하려는 운동이 확산됐어요."
    },
    {
      question: "일본의 근대화를 이끈 개혁은 무엇일까요?",
      options: ["메이지 유신", "무술변법", "백년전쟁", "몽골 침입"],
      answer: "메이지 유신",
      explanation: "메이지 유신으로 일본은 근대 국가 체제로 전환했어요."
    },
    {
      question: "제1차 아편전쟁 후 체결된 조약은 무엇일까요?",
      options: ["난징 조약", "포츠머스 조약", "시모노세키 조약", "강화도 조약"],
      answer: "난징 조약",
      explanation: "난징 조약은 중국 근대사 불평등 조약의 시작으로 평가돼요."
    },
    {
      question: "유럽 열강의 아프리카 분할 규칙을 논의한 회의는 무엇일까요?",
      options: ["베를린 회의", "빈 회의", "제네바 회의", "자카르타 회의"],
      answer: "베를린 회의",
      explanation: "열강은 아프리카 분할을 제도화했어요."
    },
    {
      question: "독일 통일을 주도한 인물은 누구일까요?",
      options: ["비스마르크", "나폴레옹 3세", "카보우르", "메테르니히"],
      answer: "비스마르크",
      explanation: "비스마르크는 철혈정책으로 독일 통일을 추진했어요."
    },
    {
      question: "이탈리아 통일과 관련 깊은 인물로 가장 알맞은 것은 누구일까요?",
      options: ["가리발디", "처칠", "루터", "케네디"],
      answer: "가리발디",
      explanation: "가리발디는 이탈리아 통일 과정에서 중요한 역할을 했어요."
    },
    {
      question: "인도 반식민 저항의 상징이 된 대규모 봉기를 무엇이라고 부를까요?",
      options: ["세포이 항쟁", "태평천국 운동", "의화단 운동", "러다이트 운동"],
      answer: "세포이 항쟁",
      explanation: "세포이 항쟁은 인도의 반식민 저항을 상징해요."
    },
    {
      question: "의화단 운동의 성격으로 가장 알맞은 것은 무엇일까요?",
      options: ["반외세 민중 운동", "산업화 촉진 운동", "자유무역 운동", "노예해방 운동"],
      answer: "반외세 민중 운동",
      explanation: "의화단 운동은 외국 세력에 대한 반발이 강했어요."
    },
    {
      question: "미국 남북전쟁의 핵심 쟁점은 무엇일까요?",
      options: ["노예제와 연방 유지", "십자군 원정", "교황권 문제", "아프리카 분할"],
      answer: "노예제와 연방 유지",
      explanation: "노예제 존폐와 연방의 통합 문제가 핵심이었어요."
    },
    {
      question: "유럽 전역 혁명 물결의 공통 성격으로 가장 알맞은 것은 무엇일까요?",
      options: ["자유주의·민족주의 확산", "왕권 절대화 강화", "노예제 확대", "십자군 재개"],
      answer: "자유주의·민족주의 확산",
      explanation: "유럽 혁명 물결은 정치적 자유와 민족국가 요구를 드러냈어요."
    },
    {
      question: "수에즈 운하 개통의 효과로 가장 알맞은 것은 무엇일까요?",
      options: ["유럽-아시아 해상 거리 단축", "대서양 항로 폐쇄", "육상 무역 중단", "북극항로 독점"],
      answer: "유럽-아시아 해상 거리 단축",
      explanation: "수에즈 운하로 세계 해상 교통이 크게 바뀌었어요."
    }
  ],
  grade3: [
    {
      question: "제1차 세계대전의 도화선이 된 사건은 무엇일까요?",
      options: ["사라예보 사건", "보스턴 차 사건", "진주만 공습", "쿠바 미사일 위기"],
      answer: "사라예보 사건",
      explanation: "오스트리아 황태자 피살 사건이 전쟁의 직접 계기가 되었어요."
    },
    {
      question: "제1차 세계대전 서부전선의 대표 전투 양상은 무엇일까요?",
      options: ["참호전", "기마전", "우주전", "해적전"],
      answer: "참호전",
      explanation: "서부전선은 참호를 사이에 둔 소모전이 길게 이어졌어요."
    },
    {
      question: "베르사유 조약이 독일 사회에 남긴 영향으로 가장 알맞은 것은 무엇일까요?",
      options: ["강한 불만과 보복 심리", "경제 대호황", "군축 거부권 확보", "식민지 확대"],
      answer: "강한 불만과 보복 심리",
      explanation: "과도한 배상과 영토 상실은 불만을 키웠어요."
    },
    {
      question: "국제연맹이 전쟁 억제에 한계를 보인 이유로 가장 많이 언급되는 것은 무엇일까요?",
      options: ["강제력 부족", "회원국 과다", "핵무기 보유", "인터넷 부재"],
      answer: "강제력 부족",
      explanation: "실질적 제재 수단이 약해 침략을 막기 어려웠어요."
    },
    {
      question: "세계 경제를 연쇄 위기로 몰아넣은 대공황의 출발점은 무엇일까요?",
      options: ["뉴욕 증권시장 붕괴", "석유 파동", "금본위제 폐지", "달 착륙 실패"],
      answer: "뉴욕 증권시장 붕괴",
      explanation: "주가 폭락이 세계 경제 위기로 확산됐어요."
    },
    {
      question: "이탈리아 파시즘을 이끈 인물은 누구일까요?",
      options: ["무솔리니", "히틀러", "프랑코", "스탈린"],
      answer: "무솔리니",
      explanation: "무솔리니는 파시즘 체제의 대표 지도자예요."
    },
    {
      question: "나치즘의 핵심 특징으로 가장 알맞은 것은 무엇일까요?",
      options: ["극단적 민족주의와 인종주의", "보편적 평화주의", "무정부주의", "절대적 자유무역"],
      answer: "극단적 민족주의와 인종주의",
      explanation: "나치는 배타적 민족주의와 인종주의를 강하게 내세웠어요."
    },
    {
      question: "영국·프랑스가 독일에 취한 유화정책의 대표 사례는 무엇일까요?",
      options: ["뮌헨 협정", "대서양 헌장", "얄타 회담", "브레튼우즈 회의"],
      answer: "뮌헨 협정",
      explanation: "뮌헨 협정은 유화정책의 상징적 사례예요."
    },
    {
      question: "제2차 세계대전 초 독일군의 전술로 가장 알맞은 것은 무엇일까요?",
      options: ["전격전", "참호 고착전", "봉건전", "해적전"],
      answer: "전격전",
      explanation: "기갑·항공을 결합한 빠른 돌파 전술이 특징이었어요."
    },
    {
      question: "일본의 진주만 공습 이후 나타난 변화는 무엇일까요?",
      options: ["미국의 본격 참전", "영국의 즉시 항복", "독일의 중립 선언", "UN 창설"],
      answer: "미국의 본격 참전",
      explanation: "진주만 공습은 미국의 전면 참전을 불러왔어요."
    },
    {
      question: "홀로코스트의 주요 피해 집단은 누구일까요?",
      options: ["유대인", "바이킹", "사무라이", "기사 계급"],
      answer: "유대인",
      explanation: "나치 정권은 유대인을 조직적으로 학살했어요."
    },
    {
      question: "노르망디 상륙작전(D-Day)의 전략적 의미는 무엇일까요?",
      options: ["서부전선 재개", "태평양 전쟁 종결", "소련 해체", "나토 창설"],
      answer: "서부전선 재개",
      explanation: "연합군은 프랑스 상륙으로 서유럽 해방을 본격화했어요."
    },
    {
      question: "원자폭탄이 투하된 일본 도시 조합으로 옳은 것은 무엇일까요?",
      options: ["히로시마·나가사키", "도쿄·오사카", "교토·고베", "삿포로·센다이"],
      answer: "히로시마·나가사키",
      explanation: "1945년 두 도시에 원자폭탄이 투하되었어요."
    },
    {
      question: "뉘른베르크 재판의 역사적 의의는 무엇일까요?",
      options: ["전쟁범죄 책임 추궁", "유럽통합 출범", "식민지 해방 선언", "UN 해체"],
      answer: "전쟁범죄 책임 추궁",
      explanation: "국가 지도자의 전쟁범죄 책임을 국제적으로 물은 재판이었어요."
    },
    {
      question: "국제연합(UN) 창설의 주요 목적은 무엇일까요?",
      options: ["집단안보와 평화 유지", "식민지 확대", "왕정 복고", "단일 화폐 도입"],
      answer: "집단안보와 평화 유지",
      explanation: "전쟁 재발 방지와 국제 협력이 핵심 목적이에요."
    },
    {
      question: "냉전 초기 두 초강대국 조합으로 옳은 것은 무엇일까요?",
      options: ["미국·소련", "영국·프랑스", "독일·일본", "중국·인도"],
      answer: "미국·소련",
      explanation: "자본주의와 사회주의 진영 대립이 세계 질서를 좌우했어요."
    },
    {
      question: "중화인민공화국 수립을 이끈 인물은 누구일까요?",
      options: ["마오쩌둥", "장제스", "저우언라이", "덩샤오핑"],
      answer: "마오쩌둥",
      explanation: "마오쩌둥은 중화인민공화국 수립의 중심 인물이었어요."
    },
    {
      question: "한국전쟁의 특징으로 가장 알맞은 것은 무엇일까요?",
      options: ["냉전이 지역전으로 나타난 사례", "십자군 전쟁", "탈식민화 완결", "유럽통합 전쟁"],
      answer: "냉전이 지역전으로 나타난 사례",
      explanation: "강대국 대립이 한반도 전쟁에 깊게 연결됐어요."
    }
  ],
  grade2: [
    {
      question: "NATO의 성격으로 가장 알맞은 것은 무엇일까요?",
      options: ["서방 집단안보 동맹", "개발도상국 경제협의체", "석유 수출국 모임", "환경 NGO"],
      answer: "서방 집단안보 동맹",
      explanation: "NATO는 냉전기 서방 군사 동맹으로 출범했어요."
    },
    {
      question: "바르샤바 조약기구의 성격으로 가장 알맞은 것은 무엇일까요?",
      options: ["동유럽 사회주의 군사 동맹", "자유무역 지대", "종교 연합", "식민지 연합"],
      answer: "동유럽 사회주의 군사 동맹",
      explanation: "소련 중심의 군사 동맹 체제였어요."
    },
    {
      question: "미국의 봉쇄(containment) 정책 목표로 가장 알맞은 것은 무엇일까요?",
      options: ["공산주의 확산 억제", "식민지 확대", "왕정 부활", "관세 폐지"],
      answer: "공산주의 확산 억제",
      explanation: "냉전기 미국 외교의 핵심 전략 중 하나였어요."
    },
    {
      question: "쿠바 미사일 위기의 의미로 가장 알맞은 것은 무엇일까요?",
      options: ["핵전쟁 직전까지 간 초강대국 대치", "UN 창설", "독일 통일", "유럽연합 출범"],
      answer: "핵전쟁 직전까지 간 초강대국 대치",
      explanation: "미국과 소련이 핵 충돌 직전까지 갔던 위기였어요."
    },
    {
      question: "우주 경쟁에서 인류 최초 유인 우주비행에 성공한 인물은 누구일까요?",
      options: ["가가린", "암스트롱", "올드린", "테레시코바"],
      answer: "가가린",
      explanation: "소련의 가가린이 최초 유인 우주비행을 달성했어요."
    },
    {
      question: "인도 독립운동의 방식으로 가장 잘 알려진 것은 무엇일까요?",
      options: ["비폭력 저항", "해상 봉쇄", "왕정 복고", "군사 쿠데타"],
      answer: "비폭력 저항",
      explanation: "간디의 비폭력·불복종 운동이 상징적이에요."
    },
    {
      question: "베트남 전쟁 결과로 가장 알맞은 것은 무엇일까요?",
      options: ["베트남 통일", "일본 통일", "독일 분단", "UN 해체"],
      answer: "베트남 통일",
      explanation: "전쟁 후 베트남은 단일 체제로 통일됐어요."
    },
    {
      question: "데탕트 시기 대표 협정으로 가장 알맞은 것은 무엇일까요?",
      options: ["SALT", "베르사유 조약", "난징 조약", "마그나카르타"],
      answer: "SALT",
      explanation: "전략무기 제한 협정은 긴장 완화 흐름을 보여줘요."
    },
    {
      question: "석유 금수로 세계 경제를 흔든 오일쇼크의 핵심 기구는 무엇일까요?",
      options: ["OPEC", "OECD", "NATO", "WTO"],
      answer: "OPEC",
      explanation: "OPEC의 감산·금수 조치가 세계 경제에 큰 충격을 줬어요."
    },
    {
      question: "이란 혁명 이후 나타난 변화로 가장 알맞은 것은 무엇일까요?",
      options: ["친서방 왕정 붕괴와 이슬람 공화국 수립", "EU 가입", "독일 통일", "소련 해체"],
      answer: "친서방 왕정 붕괴와 이슬람 공화국 수립",
      explanation: "1979년 혁명으로 이란의 정치 체제가 크게 바뀌었어요."
    },
    {
      question: "베를린 장벽 붕괴의 상징적 의미는 무엇일까요?",
      options: ["냉전 질서의 약화", "산업혁명 시작", "식민지 확대", "UN 창설"],
      answer: "냉전 질서의 약화",
      explanation: "동서 분단 체제가 흔들리기 시작했음을 보여줘요."
    },
    {
      question: "소련 해체가 발생한 해로 옳은 것은 무엇일까요?",
      options: ["1991년", "1981년", "2001년", "1971년"],
      answer: "1991년",
      explanation: "1991년 소련 해체로 냉전 구도는 사실상 종료됐어요."
    },
    {
      question: "마스트리히트 조약 이후 강화된 흐름으로 가장 알맞은 것은 무엇일까요?",
      options: ["유럽연합 통합 심화", "제국주의 확대", "왕정 절대화", "분권 해체"],
      answer: "유럽연합 통합 심화",
      explanation: "EU 체제는 경제·정치 통합을 단계적으로 확대했어요."
    },
    {
      question: "WTO의 주요 역할로 가장 알맞은 것은 무엇일까요?",
      options: ["국제 무역 규범 조정", "군사 동맹 운영", "원유 생산량 결정", "환경 재판"],
      answer: "국제 무역 규범 조정",
      explanation: "무역 분쟁 조정과 규범 운영이 핵심 기능이에요."
    },
    {
      question: "아파르트헤이트 종식의 상징적 인물은 누구일까요?",
      options: ["넬슨 만델라", "드골", "처칠", "루스벨트"],
      answer: "넬슨 만델라",
      explanation: "만델라는 인종차별 철폐와 화해를 상징하는 지도자예요."
    },
    {
      question: "ASEAN의 설립 목적과 가장 가까운 것은 무엇일까요?",
      options: ["동남아 지역 협력 강화", "핵무기 개발", "식민지 경쟁", "종교 통합"],
      answer: "동남아 지역 협력 강화",
      explanation: "안보·경제·사회 분야의 지역 협력을 목표로 해요."
    },
    {
      question: "세계화 가속의 주요 배경으로 가장 알맞은 것은 무엇일까요?",
      options: ["정보통신 기술 발전", "장원제 확대", "기사도 부활", "왕권신수설"],
      answer: "정보통신 기술 발전",
      explanation: "통신·물류 발전은 세계 연결성을 크게 높였어요."
    },
    {
      question: "파리협정이 채택된 해는 언제일까요?",
      options: ["2015년", "2005년", "1995년", "2021년"],
      answer: "2015년",
      explanation: "2015년 파리협정은 기후변화 대응의 핵심 합의예요."
    }
  ],
  grade1: [
    {
      question: "웨스트팔리아 체제의 핵심 원칙으로 가장 알맞은 것은 무엇일까요?",
      options: ["주권 국가의 상호 인정", "교황의 초국가 통치", "세계 단일정부", "왕권신수설"],
      answer: "주권 국가의 상호 인정",
      explanation: "근대 국제정치에서 국가 주권 원칙이 강화됐어요."
    },
    {
      question: "브레튼우즈 체제의 결과로 창설된 기구 조합은 무엇일까요?",
      options: ["IMF와 세계은행", "UNESCO와 WHO", "NATO와 WTO", "EU와 OPEC"],
      answer: "IMF와 세계은행",
      explanation: "전후 금융·개발 질서를 위한 핵심 기구가 출범했어요."
    },
    {
      question: "UN 안전보장이사회 상임이사국의 권한으로 가장 중요한 것은 무엇일까요?",
      options: ["거부권", "관세 부과권", "전 세계 과세권", "헌법 제정권"],
      answer: "거부권",
      explanation: "상임이사국의 거부권은 국제정치 힘의 구조를 반영해요."
    },
    {
      question: "IMF의 주요 기능으로 가장 알맞은 것은 무엇일까요?",
      options: ["국제 금융 안정 지원", "군사 작전 지휘", "유전 개발", "인권 재판 단독 수행"],
      answer: "국제 금융 안정 지원",
      explanation: "외환 위기 대응과 거시경제 안정 지원이 핵심이에요."
    },
    {
      question: "세계은행의 주요 기능으로 가장 알맞은 것은 무엇일까요?",
      options: ["개발 프로젝트 자금 지원", "핵군축 협상", "원유 가격 통제", "종교 분쟁 중재"],
      answer: "개발 프로젝트 자금 지원",
      explanation: "인프라·빈곤 완화 등 장기 개발을 지원해요."
    },
    {
      question: "비동맹운동의 기본 지향으로 가장 알맞은 것은 무엇일까요?",
      options: ["양 진영 군사 블록 비가입", "단일 진영 편입", "식민지 유지", "핵무장 확대"],
      answer: "양 진영 군사 블록 비가입",
      explanation: "냉전기 신생국들이 자율 외교를 추구한 흐름이에요."
    },
    {
      question: "유럽 통합의 올바른 순서로 가장 알맞은 것은 무엇일까요?",
      options: ["ECSC → EEC → EU", "EU → EEC → ECSC", "EEC → ECSC → EU", "ECSC → EU → EEC"],
      answer: "ECSC → EEC → EU",
      explanation: "경제 공동체에서 정치·경제 통합체로 발전했어요."
    },
    {
      question: "냉전 이후 '다극화'를 설명하는 표현으로 가장 알맞은 것은 무엇일까요?",
      options: ["영향력 중심이 여러 지역으로 분산", "단일 제국의 절대 지배", "군사 블록 2개 고정", "국가 소멸"],
      answer: "영향력 중심이 여러 지역으로 분산",
      explanation: "국제질서가 단순 양극 구조에서 복합 구조로 이동했어요."
    },
    {
      question: "국제형사재판소(ICC)의 역할로 가장 알맞은 것은 무엇일까요?",
      options: ["집단학살 등 중대 국제범죄 재판", "무역 관세 결정", "환율 고정", "군사동맹 체결"],
      answer: "집단학살 등 중대 국제범죄 재판",
      explanation: "개인 단위 국제범죄 책임을 묻는 제도예요."
    },
    {
      question: "SDGs(지속가능발전목표)의 특징으로 가장 알맞은 것은 무엇일까요?",
      options: ["경제·사회·환경을 통합한 목표", "군사 경쟁 촉진", "식민지 경영 원칙", "유럽 한정 정책"],
      answer: "경제·사회·환경을 통합한 목표",
      explanation: "지속가능성은 세 영역의 균형을 요구해요."
    },
    {
      question: "G20의 의미로 가장 알맞은 것은 무엇일까요?",
      options: ["주요국 경제 협의체", "군사 동맹", "기후 재판소", "석유 수출국 기구"],
      answer: "주요국 경제 협의체",
      explanation: "세계 경제 현안을 조율하는 다자 협의체예요."
    },
    {
      question: "국제 공급망 충격이 각국 경제에 큰 영향을 주는 이유로 가장 알맞은 것은 무엇일까요?",
      options: ["생산과 물류가 세계적으로 연결돼 있기 때문", "각국이 완전 자급자족하기 때문", "국제 무역이 사라졌기 때문", "기술 교류가 없기 때문"],
      answer: "생산과 물류가 세계적으로 연결돼 있기 때문",
      explanation: "글로벌 분업 체계는 효율적이지만 충격 전파도 빨라요."
    },
    {
      question: "국제정치에서 '글로벌 사우스'라는 표현의 의미로 가장 알맞은 것은 무엇일까요?",
      options: ["역사적 식민 경험과 개발 과제를 공유하는 국가군", "남반구 전체 국가", "선진국만의 모임", "군사 동맹 이름"],
      answer: "역사적 식민 경험과 개발 과제를 공유하는 국가군",
      explanation: "지리보다 역사·경제적 맥락을 강조하는 용어예요."
    },
    {
      question: "국제 인도주의 개입 논쟁의 핵심 쟁점으로 가장 알맞은 것은 무엇일까요?",
      options: ["인권 보호와 주권 존중의 균형", "관세율 인상", "해상 운송료", "환율 제도 선택"],
      answer: "인권 보호와 주권 존중의 균형",
      explanation: "개입의 정당성과 부작용을 함께 따져야 해요."
    },
    {
      question: "사이버 안보가 국제정치 의제로 커진 이유로 가장 알맞은 것은 무엇일까요?",
      options: ["국가 기반시설이 디지털 네트워크에 의존", "농업 비중 증가", "해적 활동 감소", "우주개발 중단"],
      answer: "국가 기반시설이 디지털 네트워크에 의존",
      explanation: "전력·금융·통신 등 핵심 시스템이 사이버 위협에 노출돼요."
    },
    {
      question: "수에즈 운하가 지정학적으로 중요한 이유는 무엇일까요?",
      options: ["유럽-아시아 해상 물류의 핵심 통로", "북극 항로 대체", "대륙철도 종점", "우주 발사장 위치"],
      answer: "유럽-아시아 해상 물류의 핵심 통로",
      explanation: "수에즈 운하는 에너지와 물류 이동의 전략 요충지예요."
    },
    {
      question: "세계화의 부작용으로 자주 지적되는 문제는 무엇일까요?",
      options: ["국가·계층 간 불평등 심화", "지식 접근성 증가", "국제협력 확대", "문화 교류 활성화"],
      answer: "국가·계층 간 불평등 심화",
      explanation: "성장의 이익이 고르게 분배되지 않는 문제가 남아 있어요."
    },
    {
      question: "유엔 SDGs가 채택된 해는 언제일까요?",
      options: ["2015년", "2000년", "1995년", "2020년"],
      answer: "2015년",
      explanation: "2015년 유엔 총회에서 2030 의제가 채택됐어요."
    }
  ]
};

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
  },
  science: {
    title: "곰돌이 과학",
    subtitle: "곰돌이 선생님과 생활 속 과학 개념을 단계별로 연습해요.",
    bearMessage: "안녕! 난 곰돌이 선생님이야. 오늘은 과학 탐험을 시작해볼까?"
  },
  worldHistory: {
    title: "곰돌이 세계사",
    subtitle: "곰돌이 선생님과 세계사능력검정시험 1~6급 문제를 연습해요.",
    bearMessage: "안녕! 난 곰돌이 선생님이야. 오늘은 세계사 여행을 떠나볼까?"
  },
  baseball: {
    title: "곰돌이 야구",
    subtitle: "야구 상식 퀴즈예요. 신민찬 어린이의 요청으로 만들었습니다.",
    bearMessage: "안녕! 난 곰돌이 선생님이야. 야구 상식 퀴즈도 신나게 풀어볼까?"
  },
  soccer: {
    title: "곰돌이 축구",
    subtitle: "곰돌이 선생님과 축구 상식 퀴즈를 난이도별로 풀어봐요. 문제풀을 크게 늘리고 자동 검증을 적용했어요.",
    bearMessage: "안녕! 난 곰돌이 선생님이야. 이번엔 축구 상식 퀴즈로 워밍업해볼까?"
  }
};

const els = {
  subjectTabs: Array.from(document.querySelectorAll("[data-subject]")),
  mathViews: Array.from(document.querySelectorAll(".math-view")),
  englishViews: Array.from(document.querySelectorAll(".english-view")),
  historyViews: Array.from(document.querySelectorAll(".history-view")),
  scienceViews: Array.from(document.querySelectorAll(".science-view")),
  worldHistoryViews: Array.from(document.querySelectorAll(".world-history-view")),
  baseballViews: Array.from(document.querySelectorAll(".baseball-view")),
  soccerViews: Array.from(document.querySelectorAll(".soccer-view")),
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
  refreshScienceRankingBtn: document.querySelector("#refreshScienceRankingBtn"),
  refreshWorldHistoryRankingBtn: document.querySelector("#refreshWorldHistoryRankingBtn"),
  refreshBaseballRankingBtn: document.querySelector("#refreshBaseballRankingBtn"),
  refreshSoccerRankingBtn: document.querySelector("#refreshSoccerRankingBtn"),
  rankingList: document.querySelector("#rankingList"),
  englishRankingList: document.querySelector("#englishRankingList"),
  historyRankingList: document.querySelector("#historyRankingList"),
  scienceRankingList: document.querySelector("#scienceRankingList"),
  worldHistoryRankingList: document.querySelector("#worldHistoryRankingList"),
  baseballRankingList: document.querySelector("#baseballRankingList"),
  soccerRankingList: document.querySelector("#soccerRankingList"),

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
  historyRetryWrongBtn: document.querySelector("#historyRetryWrongBtn"),

  scienceStartBtn: document.querySelector("#scienceStartBtn"),
  scienceLevelButtons: Array.from(document.querySelectorAll("[data-science-level]")),
  scienceQuestionCount: document.querySelector("#scienceQuestionCount"),
  scienceModePill: document.querySelector("#scienceModePill"),
  sciencePrompt: document.querySelector("#sciencePrompt"),
  scienceOptions: document.querySelector("#scienceOptions"),
  scienceNextBtn: document.querySelector("#scienceNextBtn"),
  scienceFeedback: document.querySelector("#scienceFeedback"),
  scienceFeedbackBear: document.querySelector("#scienceFeedbackBear"),
  scienceFeedbackText: document.querySelector("#scienceFeedbackText"),
  scienceCorrect: document.querySelector("#scienceCorrect"),
  scienceStreak: document.querySelector("#scienceStreak"),
  scienceBestStreak: document.querySelector("#scienceBestStreak"),
  scienceAccuracy: document.querySelector("#scienceAccuracy"),

  worldHistoryStartBtn: document.querySelector("#worldHistoryStartBtn"),
  worldHistoryLevelButtons: Array.from(document.querySelectorAll("[data-world-history-level]")),
  worldHistoryQuestionCount: document.querySelector("#worldHistoryQuestionCount"),
  worldHistoryModePill: document.querySelector("#worldHistoryModePill"),
  worldHistoryPrompt: document.querySelector("#worldHistoryPrompt"),
  worldHistoryOptions: document.querySelector("#worldHistoryOptions"),
  worldHistoryNextBtn: document.querySelector("#worldHistoryNextBtn"),
  worldHistoryFeedback: document.querySelector("#worldHistoryFeedback"),
  worldHistoryFeedbackBear: document.querySelector("#worldHistoryFeedbackBear"),
  worldHistoryFeedbackText: document.querySelector("#worldHistoryFeedbackText"),
  worldHistoryCorrect: document.querySelector("#worldHistoryCorrect"),
  worldHistoryStreak: document.querySelector("#worldHistoryStreak"),
  worldHistoryBestStreak: document.querySelector("#worldHistoryBestStreak"),
  worldHistoryAccuracy: document.querySelector("#worldHistoryAccuracy"),
  worldHistoryWrongNoteGuide: document.querySelector("#worldHistoryWrongNoteGuide"),
  worldHistoryWrongNoteList: document.querySelector("#worldHistoryWrongNoteList"),
  worldHistoryRetryWrongBtn: document.querySelector("#worldHistoryRetryWrongBtn"),

  baseballStartBtn: document.querySelector("#baseballStartBtn"),
  baseballLevelButtons: Array.from(document.querySelectorAll("[data-baseball-level]")),
  baseballQuestionCount: document.querySelector("#baseballQuestionCount"),
  baseballModePill: document.querySelector("#baseballModePill"),
  baseballPrompt: document.querySelector("#baseballPrompt"),
  baseballOptions: document.querySelector("#baseballOptions"),
  baseballNextBtn: document.querySelector("#baseballNextBtn"),
  baseballFeedback: document.querySelector("#baseballFeedback"),
  baseballFeedbackBear: document.querySelector("#baseballFeedbackBear"),
  baseballFeedbackText: document.querySelector("#baseballFeedbackText"),
  baseballCorrect: document.querySelector("#baseballCorrect"),
  baseballStreak: document.querySelector("#baseballStreak"),
  baseballBestStreak: document.querySelector("#baseballBestStreak"),
  baseballAccuracy: document.querySelector("#baseballAccuracy"),

  soccerStartBtn: document.querySelector("#soccerStartBtn"),
  soccerLevelButtons: Array.from(document.querySelectorAll("[data-soccer-level]")),
  soccerQuestionCount: document.querySelector("#soccerQuestionCount"),
  soccerModePill: document.querySelector("#soccerModePill"),
  soccerPrompt: document.querySelector("#soccerPrompt"),
  soccerOptions: document.querySelector("#soccerOptions"),
  soccerNextBtn: document.querySelector("#soccerNextBtn"),
  soccerFeedback: document.querySelector("#soccerFeedback"),
  soccerFeedbackBear: document.querySelector("#soccerFeedbackBear"),
  soccerFeedbackText: document.querySelector("#soccerFeedbackText"),
  soccerCorrect: document.querySelector("#soccerCorrect"),
  soccerStreak: document.querySelector("#soccerStreak"),
  soccerBestStreak: document.querySelector("#soccerBestStreak"),
  soccerAccuracy: document.querySelector("#soccerAccuracy")
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
  scienceRankingCorrect: null,
  worldHistoryRankingCorrect: null,
  baseballRankingCorrect: null,
  soccerRankingCorrect: null,
  subject: "math"
};

const authState = {
  token: "",
  user: null,
  googleReady: false
};

const englishState = {
  level: "starter",
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

const scienceState = {
  level: "starter",
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
  usedConceptIds: new Set()
};

const worldHistoryState = {
  level: "grade6",
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

const baseballState = {
  level: "beginner",
  sessionActive: false,
  sessionStartedAt: 0,
  questionNumber: 0,
  correct: 0,
  wrong: 0,
  streak: 0,
  bestStreak: 0,
  answered: false,
  current: null,
  usedQuestionIndexes: new Set()
};

const soccerState = {
  level: "beginner",
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
  usedConceptIds: new Set()
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
    lastEnglishLevel: "starter",
    lastHistoryLevel: "grade4",
    lastScienceLevel: "starter",
    lastWorldHistoryLevel: "grade6",
    lastBaseballLevel: "beginner",
    lastSoccerLevel: "beginner",
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
    if (!SCIENCE_LEVELS[merged.lastScienceLevel]) {
      merged.lastScienceLevel = defaults.lastScienceLevel;
    }
    if (!WORLD_HISTORY_LEVELS[merged.lastWorldHistoryLevel]) {
      merged.lastWorldHistoryLevel = defaults.lastWorldHistoryLevel;
    }
    if (!BASEBALL_LEVELS[merged.lastBaseballLevel]) {
      merged.lastBaseballLevel = defaults.lastBaseballLevel;
    }
    if (!SOCCER_LEVELS[merged.lastSoccerLevel]) {
      merged.lastSoccerLevel = defaults.lastSoccerLevel;
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
    if (saved === "science") return "science";
    if (saved === "worldHistory") return "worldHistory";
    if (saved === "baseball") return "baseball";
    if (saved === "soccer") return "soccer";
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
  const validTabs = new Set(["math", "english", "history", "science", "worldHistory", "baseball", "soccer"]);
  const safeTab = validTabs.has(tabKey) ? tabKey : "math";
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
  els.scienceViews.forEach((element) => {
    element.classList.toggle("hidden", safeTab !== "science");
  });
  els.worldHistoryViews.forEach((element) => {
    element.classList.toggle("hidden", safeTab !== "worldHistory");
  });
  els.baseballViews.forEach((element) => {
    element.classList.toggle("hidden", safeTab !== "baseball");
  });
  els.soccerViews.forEach((element) => {
    element.classList.toggle("hidden", safeTab !== "soccer");
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
  if (safeTab === "science" && !scienceState.sessionActive && !scienceState.current) {
    renderScienceIdle();
  }
  if (safeTab === "worldHistory" && !worldHistoryState.sessionActive && !worldHistoryState.current) {
    renderWorldHistoryIdle();
  }
  if (safeTab === "baseball" && !baseballState.sessionActive && !baseballState.current) {
    renderBaseballIdle();
  }
  if (safeTab === "soccer" && !soccerState.sessionActive && !soccerState.current) {
    renderSoccerIdle();
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
  if (els.scienceFeedback) {
    els.scienceFeedback.dataset.mood = mood;
  }
  if (els.scienceFeedbackBear) {
    els.scienceFeedbackBear.dataset.mood = mood;
  }
  if (els.worldHistoryFeedback) {
    els.worldHistoryFeedback.dataset.mood = mood;
  }
  if (els.worldHistoryFeedbackBear) {
    els.worldHistoryFeedbackBear.dataset.mood = mood;
  }
  if (els.baseballFeedback) {
    els.baseballFeedback.dataset.mood = mood;
  }
  if (els.baseballFeedbackBear) {
    els.baseballFeedbackBear.dataset.mood = mood;
  }
  if (els.soccerFeedback) {
    els.soccerFeedback.dataset.mood = mood;
  }
  if (els.soccerFeedbackBear) {
    els.soccerFeedbackBear.dataset.mood = mood;
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

async function fetchScienceRankings(limit = 10) {
  try {
    const response = await fetch(getApiUrl(`/api/science/rankings?limit=${encodeURIComponent(limit)}`));
    if (!response.ok) {
      throw new Error("failed to fetch science rankings");
    }

    const payload = await response.json();
    return Array.isArray(payload.items) ? payload.items : [];
  } catch (error) {
    console.error("fetchScienceRankings failed", error);
    return [];
  }
}

async function fetchWorldHistoryRankings(limit = 10) {
  try {
    const response = await fetch(getApiUrl(`/api/world-history/rankings?limit=${encodeURIComponent(limit)}`));
    if (!response.ok) {
      throw new Error("failed to fetch world history rankings");
    }

    const payload = await response.json();
    return Array.isArray(payload.items) ? payload.items : [];
  } catch (error) {
    console.error("fetchWorldHistoryRankings failed", error);
    return [];
  }
}

async function fetchBaseballRankings(limit = 10) {
  try {
    const response = await fetch(getApiUrl(`/api/baseball/rankings?limit=${encodeURIComponent(limit)}`));
    if (!response.ok) {
      throw new Error("failed to fetch baseball rankings");
    }

    const payload = await response.json();
    return Array.isArray(payload.items) ? payload.items : [];
  } catch (error) {
    console.error("fetchBaseballRankings failed", error);
    return [];
  }
}

async function fetchSoccerRankings(limit = 10) {
  try {
    const response = await fetch(getApiUrl(`/api/soccer/rankings?limit=${encodeURIComponent(limit)}`));
    if (!response.ok) {
      throw new Error("failed to fetch soccer rankings");
    }

    const payload = await response.json();
    return Array.isArray(payload.items) ? payload.items : [];
  } catch (error) {
    console.error("fetchSoccerRankings failed", error);
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

async function refreshScienceRankings() {
  const items = await fetchScienceRankings(10);
  if (authState.user) {
    const me = items.find((item) => item.userId === authState.user.id);
    state.scienceRankingCorrect = me ? Number(me.totalCorrect || 0) : 0;
  } else {
    state.scienceRankingCorrect = null;
  }
  renderRanking(els.scienceRankingList, items);
}

async function refreshWorldHistoryRankings() {
  const items = await fetchWorldHistoryRankings(10);
  if (authState.user) {
    const me = items.find((item) => item.userId === authState.user.id);
    state.worldHistoryRankingCorrect = me ? Number(me.totalCorrect || 0) : 0;
  } else {
    state.worldHistoryRankingCorrect = null;
  }
  renderRanking(els.worldHistoryRankingList, items);
}

async function refreshBaseballRankings() {
  const items = await fetchBaseballRankings(10);
  if (authState.user) {
    const me = items.find((item) => item.userId === authState.user.id);
    state.baseballRankingCorrect = me ? Number(me.totalCorrect || 0) : 0;
  } else {
    state.baseballRankingCorrect = null;
  }
  renderRanking(els.baseballRankingList, items);
}

async function refreshSoccerRankings() {
  const items = await fetchSoccerRankings(10);
  if (authState.user) {
    const me = items.find((item) => item.userId === authState.user.id);
    state.soccerRankingCorrect = me ? Number(me.totalCorrect || 0) : 0;
  } else {
    state.soccerRankingCorrect = null;
  }
  renderRanking(els.soccerRankingList, items);
}

async function refreshRankings() {
  await Promise.all([
    refreshMathRankings(),
    refreshEnglishRankings(),
    refreshHistoryRankings(),
    refreshScienceRankings(),
    refreshWorldHistoryRankings(),
    refreshBaseballRankings(),
    refreshSoccerRankings()
  ]);
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

function setScienceFeedback(message) {
  if (!els.scienceFeedbackText) return;
  els.scienceFeedbackText.textContent = `곰돌이 선생님: ${message}`;
}

function setWorldHistoryFeedback(message) {
  if (!els.worldHistoryFeedbackText) return;
  els.worldHistoryFeedbackText.textContent = `곰돌이 선생님: ${message}`;
}

function setBaseballFeedback(message) {
  if (!els.baseballFeedbackText) return;
  els.baseballFeedbackText.textContent = `곰돌이 선생님: ${message}`;
}

function setSoccerFeedback(message) {
  if (!els.soccerFeedbackText) return;
  els.soccerFeedbackText.textContent = `곰돌이 선생님: ${message}`;
}

function getEnglishLevel(levelKey) {
  return ENGLISH_LEVELS[levelKey] || ENGLISH_LEVELS.starter;
}

function getHistoryLevel(levelKey) {
  return HISTORY_LEVELS[levelKey] || HISTORY_LEVELS.grade4;
}

function getHistoryQuestions(levelKey) {
  const safeLevel = getHistoryLevel(levelKey).key;
  const questions = HISTORY_QUESTION_BANK[safeLevel];
  return Array.isArray(questions) && questions.length > 0 ? questions : HISTORY_QUESTION_BANK.grade4;
}

function getScienceLevel(levelKey) {
  return SCIENCE_LEVELS[levelKey] || SCIENCE_LEVELS.starter;
}

function getScienceQuestions(levelKey) {
  const safeLevel = getScienceLevel(levelKey).key;
  const questions = SCIENCE_QUESTION_BANK[safeLevel];
  return Array.isArray(questions) && questions.length > 0 ? questions : SCIENCE_QUESTION_BANK.starter;
}

function getWorldHistoryLevel(levelKey) {
  return WORLD_HISTORY_LEVELS[levelKey] || WORLD_HISTORY_LEVELS.grade6;
}

function getWorldHistoryQuestions(levelKey) {
  const safeLevel = getWorldHistoryLevel(levelKey).key;
  const questions = WORLD_HISTORY_QUESTION_BANK[safeLevel];
  return Array.isArray(questions) && questions.length > 0 ? questions : WORLD_HISTORY_QUESTION_BANK.grade6;
}

function getBaseballLevel(levelKey) {
  return BASEBALL_LEVELS[levelKey] || BASEBALL_LEVELS.beginner;
}

function getBaseballQuestions(levelKey) {
  const safeLevel = getBaseballLevel(levelKey).key;
  const questions = BASEBALL_QUESTION_BANK[safeLevel];
  return Array.isArray(questions) && questions.length > 0 ? questions : BASEBALL_QUESTION_BANK.beginner;
}

function getSoccerLevel(levelKey) {
  return SOCCER_LEVELS[levelKey] || SOCCER_LEVELS.beginner;
}

function getSoccerQuestions(levelKey) {
  const safeLevel = getSoccerLevel(levelKey).key;
  const questions = SOCCER_QUESTION_BANK[safeLevel];
  return Array.isArray(questions) && questions.length > 0 ? questions : SOCCER_QUESTION_BANK.beginner;
}

function normalizeEnglishAnswer(answer) {
  return String(answer || "").trim().toLowerCase();
}

function getEnglishAnswerTokenCount(answer) {
  return normalizeEnglishAnswer(answer).split(/\s+/).filter(Boolean).length;
}

function classifyEnglishWordLevel(answer) {
  const normalized = normalizeEnglishAnswer(answer);
  if (!normalized) return "beginner";

  const tokenCount = getEnglishAnswerTokenCount(normalized);
  const compactLength = normalized.replace(/[^a-z0-9]/g, "").length;
  const hasComplexSymbol = /[-']/u.test(normalized);

  if (
    ENGLISH_ADVANCED_WORD_SET.has(normalized) ||
    ENGLISH_HIGHSCHOOL_WORD_SET.has(normalized) ||
    tokenCount >= 3 ||
    compactLength >= 15 ||
    hasComplexSymbol
  ) {
    return "advanced";
  }

  if (ENGLISH_STARTER_WORD_SET.has(normalized)) {
    return tokenCount <= 1 && compactLength <= 8 ? "starter" : "beginner";
  }

  if (ENGLISH_CORE_WORD_SET.has(normalized)) {
    return "beginner";
  }

  if (ENGLISH_EXTRA_WORD_SET.has(normalized)) {
    return tokenCount <= 1 && compactLength <= 9 ? "beginner" : "intermediate";
  }

  if (ENGLISH_GENERATED_PHRASE_SET.has(normalized)) {
    return compactLength >= 12 || tokenCount >= 2 ? "intermediate" : "beginner";
  }

  if (ENGLISH_ULTRA_WORD_SET.has(normalized)) {
    if (tokenCount === 1 && compactLength <= 8) return "intermediate";
    if (tokenCount === 1 && compactLength <= 10) return "advanced";
    return "advanced";
  }

  if (ENGLISH_MEGA_WORD_SET.has(normalized)) {
    if (tokenCount <= 1 && compactLength <= 6) return "beginner";
    if (tokenCount <= 2 && compactLength <= 13) return "intermediate";
    return "advanced";
  }

  if (tokenCount <= 1 && compactLength <= 5) return "starter";
  if (tokenCount <= 2 && compactLength <= 10) return "beginner";
  if (tokenCount <= 2 && compactLength <= 14) return "intermediate";
  return "advanced";
}

function updateHistoryLevelUi() {
  const level = getHistoryLevel(historyState.level);
  setActive(els.historyLevelButtons, "historyLevel", level.key);
  if (els.historyStartBtn) {
    els.historyStartBtn.textContent = `${level.label} 10문제 시작`;
  }
}

function updateScienceLevelUi() {
  const level = getScienceLevel(scienceState.level);
  setActive(els.scienceLevelButtons, "scienceLevel", level.key);
  if (els.scienceStartBtn) {
    els.scienceStartBtn.textContent = `${level.label} 과학 10문제 시작`;
  }
}

function updateWorldHistoryLevelUi() {
  const level = getWorldHistoryLevel(worldHistoryState.level);
  setActive(els.worldHistoryLevelButtons, "worldHistoryLevel", level.key);
  if (els.worldHistoryStartBtn) {
    els.worldHistoryStartBtn.textContent = `${level.label} 10문제 시작`;
  }
}

function updateBaseballLevelUi() {
  const level = getBaseballLevel(baseballState.level);
  setActive(els.baseballLevelButtons, "baseballLevel", level.key);
  if (els.baseballStartBtn) {
    els.baseballStartBtn.textContent = `${level.label} 야구 10문제 시작`;
  }
}

function updateSoccerLevelUi() {
  const level = getSoccerLevel(soccerState.level);
  setActive(els.soccerLevelButtons, "soccerLevel", level.key);
  if (els.soccerStartBtn) {
    els.soccerStartBtn.textContent = `${level.label} 축구 10문제 시작`;
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

function pickScienceQuestionIndex() {
  const pool = getScienceQuestions(scienceState.level);
  if (!Array.isArray(pool) || pool.length === 0) return 0;
  const allIndexes = Array.from({ length: pool.length }, (_, index) => index);
  let availableIndexes = allIndexes.filter((index) => {
    if (scienceState.usedQuestionIndexes.has(index)) return false;
    const conceptId = String(pool[index]?.conceptId || index);
    return !scienceState.usedConceptIds.has(conceptId);
  });
  if (availableIndexes.length === 0) {
    scienceState.usedQuestionIndexes.clear();
    scienceState.usedConceptIds.clear();
    availableIndexes = allIndexes;
  }

  const questionIndex = availableIndexes[randomInt(0, availableIndexes.length - 1)];
  scienceState.usedQuestionIndexes.add(questionIndex);
  scienceState.usedConceptIds.add(String(pool[questionIndex]?.conceptId || questionIndex));
  return questionIndex;
}

function buildScienceQuestion() {
  const pool = getScienceQuestions(scienceState.level);
  const questionIndex = pickScienceQuestionIndex();
  const question = pool[questionIndex];
  const sourceIds = Array.isArray(question.sourceIds) ? question.sourceIds : [];
  const sources = sourceIds
    .map((sourceId) => SCIENCE_SOURCE_CATALOG[sourceId]?.url)
    .filter((url) => typeof url === "string" && url.length > 0);
  return {
    question: question.question,
    options: shuffleList([...question.options]),
    answer: question.answer,
    explanation: question.explanation,
    conceptId: question.conceptId,
    sourceIds,
    sources
  };
}

function pickWorldHistoryQuestionIndex() {
  const pool = getWorldHistoryQuestions(worldHistoryState.level);
  const allIndexes = Array.from({ length: pool.length }, (_, index) => index);
  let availableIndexes = allIndexes.filter((index) => !worldHistoryState.usedQuestionIndexes.has(index));
  if (availableIndexes.length === 0) {
    worldHistoryState.usedQuestionIndexes.clear();
    availableIndexes = allIndexes;
  }

  const questionIndex = availableIndexes[randomInt(0, availableIndexes.length - 1)];
  worldHistoryState.usedQuestionIndexes.add(questionIndex);
  return questionIndex;
}

function buildWorldHistoryQuestion() {
  const pool = getWorldHistoryQuestions(worldHistoryState.level);
  const questionIndex = pickWorldHistoryQuestionIndex();
  const question = pool[questionIndex];
  return {
    question: question.question,
    options: shuffleList([...question.options]),
    answer: question.answer,
    explanation: question.explanation
  };
}

function pickBaseballQuestionIndex() {
  const pool = getBaseballQuestions(baseballState.level);
  const allIndexes = Array.from({ length: pool.length }, (_, index) => index);
  let availableIndexes = allIndexes.filter((index) => !baseballState.usedQuestionIndexes.has(index));
  if (availableIndexes.length === 0) {
    baseballState.usedQuestionIndexes.clear();
    availableIndexes = allIndexes;
  }

  const questionIndex = availableIndexes[randomInt(0, availableIndexes.length - 1)];
  baseballState.usedQuestionIndexes.add(questionIndex);
  return questionIndex;
}

function buildBaseballQuestion() {
  const pool = getBaseballQuestions(baseballState.level);
  const questionIndex = pickBaseballQuestionIndex();
  const question = pool[questionIndex];
  return {
    question: question.question,
    options: shuffleList([...question.options]),
    answer: question.answer,
    explanation: question.explanation
  };
}

function pickSoccerQuestionIndex() {
  const pool = getSoccerQuestions(soccerState.level);
  if (!Array.isArray(pool) || pool.length === 0) return 0;
  const allIndexes = Array.from({ length: pool.length }, (_, index) => index);
  let availableIndexes = allIndexes.filter((index) => {
    if (soccerState.usedQuestionIndexes.has(index)) return false;
    const conceptId = String(pool[index]?.conceptId || index);
    return !soccerState.usedConceptIds.has(conceptId);
  });
  if (availableIndexes.length === 0) {
    soccerState.usedQuestionIndexes.clear();
    soccerState.usedConceptIds.clear();
    availableIndexes = allIndexes;
  }

  const questionIndex = availableIndexes[randomInt(0, availableIndexes.length - 1)];
  soccerState.usedQuestionIndexes.add(questionIndex);
  soccerState.usedConceptIds.add(String(pool[questionIndex]?.conceptId || questionIndex));
  return questionIndex;
}

function buildSoccerQuestion() {
  const pool = getSoccerQuestions(soccerState.level);
  const questionIndex = pickSoccerQuestionIndex();
  const question = pool[questionIndex];
  return {
    question: question.question,
    options: shuffleList([...question.options]),
    answer: question.answer,
    explanation: question.explanation,
    conceptId: question.conceptId,
    verification: question.verification
  };
}

function buildEnglishLevelPool(levelKey) {
  const level = getEnglishLevel(levelKey);
  if (ENGLISH_ALL_LESSON_INDEXES.length < 4) {
    return ENGLISH_ALL_LESSON_INDEXES;
  }

  const primaryPool = ENGLISH_ALL_LESSON_INDEXES.filter((index) => {
    const lesson = ENGLISH_LESSONS[index];
    if (!lesson) return false;
    return classifyEnglishWordLevel(lesson.english) === level.key;
  });
  if (primaryPool.length >= 4) {
    return primaryPool;
  }

  const fallbackOrder = {
    starter: ["beginner", "intermediate", "advanced"],
    beginner: ["starter", "intermediate", "advanced"],
    intermediate: ["beginner", "advanced", "starter"],
    advanced: ["intermediate", "beginner", "starter"]
  };

  const mergedPool = [...primaryPool];
  const seen = new Set(primaryPool);
  (fallbackOrder[level.key] || []).forEach((fallbackLevel) => {
    ENGLISH_ALL_LESSON_INDEXES.forEach((index) => {
      if (seen.has(index)) return;
      const lesson = ENGLISH_LESSONS[index];
      if (!lesson) return;
      if (classifyEnglishWordLevel(lesson.english) !== fallbackLevel) return;
      mergedPool.push(index);
      seen.add(index);
    });
  });

  return mergedPool.length > 0 ? mergedPool : ENGLISH_ALL_LESSON_INDEXES;
}

function getEnglishLevelPool(levelKey) {
  return ENGLISH_LEVEL_POOLS[levelKey] || ENGLISH_LEVEL_POOLS.starter || ENGLISH_ALL_LESSON_INDEXES;
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

function updateScienceStats() {
  const solved = scienceState.correct + scienceState.wrong;
  const accuracy = solved > 0 ? Math.round((scienceState.correct / solved) * 100) : 0;
  els.scienceCorrect.textContent = String(scienceState.correct);
  els.scienceStreak.textContent = String(scienceState.streak);
  els.scienceBestStreak.textContent = String(scienceState.bestStreak);
  els.scienceAccuracy.textContent = `${accuracy}%`;
}

function updateWorldHistoryStats() {
  const solved = worldHistoryState.correct + worldHistoryState.wrong;
  const accuracy = solved > 0 ? Math.round((worldHistoryState.correct / solved) * 100) : 0;
  els.worldHistoryCorrect.textContent = String(worldHistoryState.correct);
  els.worldHistoryStreak.textContent = String(worldHistoryState.streak);
  els.worldHistoryBestStreak.textContent = String(worldHistoryState.bestStreak);
  els.worldHistoryAccuracy.textContent = `${accuracy}%`;
}

function updateBaseballStats() {
  const solved = baseballState.correct + baseballState.wrong;
  const accuracy = solved > 0 ? Math.round((baseballState.correct / solved) * 100) : 0;
  els.baseballCorrect.textContent = String(baseballState.correct);
  els.baseballStreak.textContent = String(baseballState.streak);
  els.baseballBestStreak.textContent = String(baseballState.bestStreak);
  els.baseballAccuracy.textContent = `${accuracy}%`;
}

function updateSoccerStats() {
  const solved = soccerState.correct + soccerState.wrong;
  const accuracy = solved > 0 ? Math.round((soccerState.correct / solved) * 100) : 0;
  els.soccerCorrect.textContent = String(soccerState.correct);
  els.soccerStreak.textContent = String(soccerState.streak);
  els.soccerBestStreak.textContent = String(soccerState.bestStreak);
  els.soccerAccuracy.textContent = `${accuracy}%`;
}

function renderScienceIdle() {
  const level = getScienceLevel(scienceState.level);
  scienceState.current = null;
  scienceState.answered = false;
  scienceState.sessionActive = false;
  els.scienceQuestionCount.textContent = "준비 완료";
  els.scienceModePill.textContent = `${level.label} 객관식`;
  els.sciencePrompt.textContent = `${level.label} 시작 버튼을 누르면 과학 10문제가 나와요.`;
  els.scienceOptions.innerHTML = "";
  els.scienceNextBtn.textContent = "다음 문제";
  els.scienceNextBtn.disabled = true;
  setScienceFeedback(`${level.label} 준비 완료! 시작 버튼을 눌러보자.`);
  updateScienceLevelUi();
  updateScienceStats();
}

function renderScienceQuestion() {
  if (!scienceState.current) return;

  const level = getScienceLevel(scienceState.level);
  els.scienceQuestionCount.textContent = `${scienceState.questionNumber} / ${TARGET_QUESTIONS} 문제`;
  els.scienceModePill.textContent = `${level.label} 객관식`;
  els.sciencePrompt.textContent = scienceState.current.question;
  els.scienceOptions.innerHTML = scienceState.current.options
    .map((option) => {
      return `<button class="english-option" type="button" data-science-option="${option}">${option}</button>`;
    })
    .join("");
  els.scienceNextBtn.textContent = scienceState.questionNumber >= TARGET_QUESTIONS ? "결과 보기" : "다음 문제";
  els.scienceNextBtn.disabled = true;
  scienceState.answered = false;
}

function startScienceSession() {
  const level = getScienceLevel(scienceState.level);
  scienceState.sessionActive = true;
  scienceState.sessionStartedAt = Date.now();
  scienceState.questionNumber = 1;
  scienceState.correct = 0;
  scienceState.wrong = 0;
  scienceState.streak = 0;
  scienceState.bestStreak = 0;
  scienceState.answered = false;
  scienceState.current = null;
  scienceState.usedQuestionIndexes.clear();
  scienceState.usedConceptIds.clear();
  scienceState.current = buildScienceQuestion();
  updateScienceStats();
  renderScienceQuestion();
  setScienceFeedback(`${level.label} 과학 시작! 차근차근 풀어보자.`);
  setBear("thinking", `${level.label} 과학 라운드 시작!`);
}

function completeScienceSession() {
  scienceState.sessionActive = false;
  scienceState.answered = false;
  scienceState.current = null;

  const total = scienceState.correct + scienceState.wrong;
  const accuracy = total > 0 ? Math.round((scienceState.correct / total) * 100) : 0;
  let mood = "happy";
  if (accuracy >= 90) mood = "celebrate";
  if (accuracy < 60) mood = "thinking";

  els.scienceQuestionCount.textContent = "과학 라운드 완료";
  els.scienceModePill.textContent = "과학 라운드 완료";
  els.sciencePrompt.textContent = `총 ${scienceState.correct}/${total}문제 정답 (${accuracy}%)`;
  els.scienceOptions.innerHTML = "";
  els.scienceNextBtn.textContent = "다음 문제";
  els.scienceNextBtn.disabled = true;
  setScienceFeedback(`완료! ${getScienceLevel(scienceState.level).label} 라운드를 끝냈어요. 다시 도전해볼까?`);
  updateScienceStats();
  setBear(mood, "과학 라운드 완료! 관찰력이 점점 좋아지고 있어.");

  const summary = buildScienceRoundSummary();
  void syncScienceRoundResult(summary);
}

function handleScienceOptionSelect(option) {
  if (!scienceState.sessionActive || scienceState.answered || !scienceState.current) return;

  scienceState.answered = true;
  const isCorrect = option === scienceState.current.answer;

  if (isCorrect) {
    scienceState.correct += 1;
    scienceState.streak += 1;
    scienceState.bestStreak = Math.max(scienceState.bestStreak, scienceState.streak);
    setScienceFeedback(`정답! ${scienceState.current.explanation}`);
    setBear("love", "과학 정답! 곰돌이 선생님이 칭찬 중이야.");
  } else {
    scienceState.wrong += 1;
    scienceState.streak = 0;
    setScienceFeedback(`오답! 정답은 "${scienceState.current.answer}" · ${scienceState.current.explanation}`);
    setBear("cry", "괜찮아! 다음 문제에서 만회하자.");
  }

  Array.from(els.scienceOptions.querySelectorAll(".english-option")).forEach((button) => {
    if (!(button instanceof HTMLElement)) return;
    const value = button.dataset.scienceOption || "";
    button.setAttribute("disabled", "true");
    if (value === scienceState.current.answer) {
      button.classList.add("is-correct");
      return;
    }
    if (value === option && !isCorrect) {
      button.classList.add("is-wrong");
    }
  });

  updateScienceStats();
  if (isCorrect) {
    handleScienceNext();
    return;
  }

  els.scienceNextBtn.textContent = scienceState.questionNumber >= TARGET_QUESTIONS ? "결과 보기" : "다음 문제";
  els.scienceNextBtn.disabled = false;
  els.scienceNextBtn.focus();
}

function handleScienceNext() {
  if (!scienceState.answered) return;

  if (scienceState.questionNumber >= TARGET_QUESTIONS) {
    completeScienceSession();
    return;
  }

  scienceState.questionNumber += 1;
  scienceState.current = buildScienceQuestion();
  renderScienceQuestion();
  setBear("idle", "좋아! 과학 다음 문제로 가자.");
  setScienceFeedback("다음 문제도 집중해서 풀어보자.");
}

function renderBaseballIdle() {
  const level = getBaseballLevel(baseballState.level);
  baseballState.current = null;
  baseballState.answered = false;
  baseballState.sessionActive = false;
  els.baseballQuestionCount.textContent = "준비 완료";
  els.baseballModePill.textContent = `${level.label} 객관식`;
  els.baseballPrompt.textContent = `${level.label} 시작 버튼을 누르면 야구 상식 10문제가 나와요.`;
  els.baseballOptions.innerHTML = "";
  els.baseballNextBtn.textContent = "다음 문제";
  els.baseballNextBtn.disabled = true;
  setBaseballFeedback(`${level.label} 야구 퀴즈 준비 완료! 시작 버튼을 눌러보자.`);
  updateBaseballLevelUi();
  updateBaseballStats();
}

function renderBaseballQuestion() {
  if (!baseballState.current) return;

  const level = getBaseballLevel(baseballState.level);
  els.baseballQuestionCount.textContent = `${baseballState.questionNumber} / ${TARGET_QUESTIONS} 문제`;
  els.baseballModePill.textContent = `${level.label} 객관식`;
  els.baseballPrompt.textContent = baseballState.current.question;
  els.baseballOptions.innerHTML = baseballState.current.options
    .map((option) => {
      return `<button class="english-option" type="button" data-baseball-option="${option}">${option}</button>`;
    })
    .join("");
  els.baseballNextBtn.textContent = baseballState.questionNumber >= TARGET_QUESTIONS ? "결과 보기" : "다음 문제";
  els.baseballNextBtn.disabled = true;
  baseballState.answered = false;
}

function startBaseballSession() {
  const level = getBaseballLevel(baseballState.level);
  baseballState.sessionActive = true;
  baseballState.sessionStartedAt = Date.now();
  baseballState.questionNumber = 1;
  baseballState.correct = 0;
  baseballState.wrong = 0;
  baseballState.streak = 0;
  baseballState.bestStreak = 0;
  baseballState.answered = false;
  baseballState.current = null;
  baseballState.usedQuestionIndexes.clear();
  baseballState.current = buildBaseballQuestion();
  updateBaseballStats();
  renderBaseballQuestion();
  setBaseballFeedback(`${level.label} 야구 상식 퀴즈 시작! 차근차근 풀어보자.`);
  setBear("thinking", `${level.label} 곰돌이 야구 라운드 시작!`);
}

function completeBaseballSession() {
  baseballState.sessionActive = false;
  baseballState.answered = false;
  baseballState.current = null;

  const total = baseballState.correct + baseballState.wrong;
  const accuracy = total > 0 ? Math.round((baseballState.correct / total) * 100) : 0;
  let mood = "happy";
  if (accuracy >= 90) mood = "celebrate";
  if (accuracy < 60) mood = "thinking";

  els.baseballQuestionCount.textContent = "야구 라운드 완료";
  els.baseballModePill.textContent = "야구 라운드 완료";
  els.baseballPrompt.textContent = `총 ${baseballState.correct}/${total}문제 정답 (${accuracy}%)`;
  els.baseballOptions.innerHTML = "";
  els.baseballNextBtn.textContent = "다음 문제";
  els.baseballNextBtn.disabled = true;
  setBaseballFeedback(`완료! ${getBaseballLevel(baseballState.level).label} 라운드를 끝냈어요. 다시 도전해볼까?`);
  updateBaseballStats();
  setBear(mood, "야구 라운드 완료! 이제 야구 상식이 더 탄탄해졌어.");

  const summary = buildBaseballRoundSummary();
  void syncBaseballRoundResult(summary);
}

function handleBaseballOptionSelect(option) {
  if (!baseballState.sessionActive || baseballState.answered || !baseballState.current) return;

  baseballState.answered = true;
  const isCorrect = option === baseballState.current.answer;

  if (isCorrect) {
    baseballState.correct += 1;
    baseballState.streak += 1;
    baseballState.bestStreak = Math.max(baseballState.bestStreak, baseballState.streak);
    setBaseballFeedback(`정답! ${baseballState.current.explanation}`);
    setBear("love", "야구 정답! 곰돌이 선생님이 크게 박수 치고 있어.");
  } else {
    baseballState.wrong += 1;
    baseballState.streak = 0;
    setBaseballFeedback(`오답! 정답은 "${baseballState.current.answer}" · ${baseballState.current.explanation}`);
    setBear("cry", "괜찮아! 다음 야구 문제에서 만회하자.");
  }

  Array.from(els.baseballOptions.querySelectorAll(".english-option")).forEach((button) => {
    if (!(button instanceof HTMLElement)) return;
    const value = button.dataset.baseballOption || "";
    button.setAttribute("disabled", "true");
    if (value === baseballState.current.answer) {
      button.classList.add("is-correct");
      return;
    }
    if (value === option && !isCorrect) {
      button.classList.add("is-wrong");
    }
  });

  updateBaseballStats();
  if (isCorrect) {
    handleBaseballNext();
    return;
  }

  els.baseballNextBtn.textContent = baseballState.questionNumber >= TARGET_QUESTIONS ? "결과 보기" : "다음 문제";
  els.baseballNextBtn.disabled = false;
  els.baseballNextBtn.focus();
}

function handleBaseballNext() {
  if (!baseballState.answered) return;

  if (baseballState.questionNumber >= TARGET_QUESTIONS) {
    completeBaseballSession();
    return;
  }

  baseballState.questionNumber += 1;
  baseballState.current = buildBaseballQuestion();
  renderBaseballQuestion();
  setBear("idle", "좋아! 야구 다음 문제로 가자.");
  setBaseballFeedback("다음 문제도 집중해서 풀어보자.");
}

function renderSoccerIdle() {
  const level = getSoccerLevel(soccerState.level);
  soccerState.current = null;
  soccerState.answered = false;
  soccerState.sessionActive = false;
  els.soccerQuestionCount.textContent = "준비 완료";
  els.soccerModePill.textContent = `${level.label} 객관식`;
  els.soccerPrompt.textContent = `${level.label} 시작 버튼을 누르면 축구 상식 10문제가 나와요.`;
  els.soccerOptions.innerHTML = "";
  els.soccerNextBtn.textContent = "다음 문제";
  els.soccerNextBtn.disabled = true;
  setSoccerFeedback(`${level.label} 축구 퀴즈 준비 완료! 시작 버튼을 눌러보자.`);
  updateSoccerLevelUi();
  updateSoccerStats();
}

function renderSoccerQuestion() {
  if (!soccerState.current) return;

  const level = getSoccerLevel(soccerState.level);
  els.soccerQuestionCount.textContent = `${soccerState.questionNumber} / ${TARGET_QUESTIONS} 문제`;
  els.soccerModePill.textContent = `${level.label} 객관식`;
  els.soccerPrompt.textContent = soccerState.current.question;
  els.soccerOptions.innerHTML = soccerState.current.options
    .map((option) => {
      return `<button class="english-option" type="button" data-soccer-option="${option}">${option}</button>`;
    })
    .join("");
  els.soccerNextBtn.textContent = soccerState.questionNumber >= TARGET_QUESTIONS ? "결과 보기" : "다음 문제";
  els.soccerNextBtn.disabled = true;
  soccerState.answered = false;
}

function startSoccerSession() {
  const level = getSoccerLevel(soccerState.level);
  soccerState.sessionActive = true;
  soccerState.sessionStartedAt = Date.now();
  soccerState.questionNumber = 1;
  soccerState.correct = 0;
  soccerState.wrong = 0;
  soccerState.streak = 0;
  soccerState.bestStreak = 0;
  soccerState.answered = false;
  soccerState.current = null;
  soccerState.usedQuestionIndexes.clear();
  soccerState.usedConceptIds.clear();
  soccerState.current = buildSoccerQuestion();
  updateSoccerStats();
  renderSoccerQuestion();
  setSoccerFeedback(`${level.label} 축구 상식 퀴즈 시작! 차근차근 풀어보자.`);
  setBear("thinking", `${level.label} 곰돌이 축구 라운드 시작!`);
}

function completeSoccerSession() {
  soccerState.sessionActive = false;
  soccerState.answered = false;
  soccerState.current = null;

  const total = soccerState.correct + soccerState.wrong;
  const accuracy = total > 0 ? Math.round((soccerState.correct / total) * 100) : 0;
  let mood = "happy";
  if (accuracy >= 90) mood = "celebrate";
  if (accuracy < 60) mood = "thinking";

  els.soccerQuestionCount.textContent = "축구 라운드 완료";
  els.soccerModePill.textContent = "축구 라운드 완료";
  els.soccerPrompt.textContent = `총 ${soccerState.correct}/${total}문제 정답 (${accuracy}%)`;
  els.soccerOptions.innerHTML = "";
  els.soccerNextBtn.textContent = "다음 문제";
  els.soccerNextBtn.disabled = true;
  setSoccerFeedback(`완료! ${getSoccerLevel(soccerState.level).label} 라운드를 끝냈어요. 다시 도전해볼까?`);
  updateSoccerStats();
  setBear(mood, "축구 라운드 완료! 이제 전술 용어가 더 익숙해졌어.");

  const summary = buildSoccerRoundSummary();
  void syncSoccerRoundResult(summary);
}

function handleSoccerOptionSelect(option) {
  if (!soccerState.sessionActive || soccerState.answered || !soccerState.current) return;

  soccerState.answered = true;
  const isCorrect = option === soccerState.current.answer;

  if (isCorrect) {
    soccerState.correct += 1;
    soccerState.streak += 1;
    soccerState.bestStreak = Math.max(soccerState.bestStreak, soccerState.streak);
    setSoccerFeedback(`정답! ${soccerState.current.explanation}`);
    setBear("love", "축구 정답! 곰돌이 선생님이 엄지척 하고 있어.");
  } else {
    soccerState.wrong += 1;
    soccerState.streak = 0;
    setSoccerFeedback(`오답! 정답은 "${soccerState.current.answer}" · ${soccerState.current.explanation}`);
    setBear("cry", "괜찮아! 다음 축구 문제에서 만회하자.");
  }

  Array.from(els.soccerOptions.querySelectorAll(".english-option")).forEach((button) => {
    if (!(button instanceof HTMLElement)) return;
    const value = button.dataset.soccerOption || "";
    button.setAttribute("disabled", "true");
    if (value === soccerState.current.answer) {
      button.classList.add("is-correct");
      return;
    }
    if (value === option && !isCorrect) {
      button.classList.add("is-wrong");
    }
  });

  updateSoccerStats();
  if (isCorrect) {
    handleSoccerNext();
    return;
  }

  els.soccerNextBtn.textContent = soccerState.questionNumber >= TARGET_QUESTIONS ? "결과 보기" : "다음 문제";
  els.soccerNextBtn.disabled = false;
  els.soccerNextBtn.focus();
}

function handleSoccerNext() {
  if (!soccerState.answered) return;

  if (soccerState.questionNumber >= TARGET_QUESTIONS) {
    completeSoccerSession();
    return;
  }

  soccerState.questionNumber += 1;
  soccerState.current = buildSoccerQuestion();
  renderSoccerQuestion();
  setBear("idle", "좋아! 축구 다음 문제로 가자.");
  setSoccerFeedback("다음 문제도 집중해서 풀어보자.");
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

function renderWorldHistoryWrongNotes() {
  if (!els.worldHistoryWrongNoteList) return;

  const notes = worldHistoryState.wrongNotes;
  const unresolvedCount = notes.filter((note) => !note.solved).length;
  const canRetry = unresolvedCount > 0 && !worldHistoryState.sessionActive && !worldHistoryState.reviewMode;

  els.worldHistoryWrongNoteList.innerHTML = "";
  if (els.worldHistoryRetryWrongBtn) {
    els.worldHistoryRetryWrongBtn.classList.toggle("hidden", !canRetry);
    els.worldHistoryRetryWrongBtn.disabled = !canRetry;
  }

  if (els.worldHistoryWrongNoteGuide) {
    if (notes.length === 0) {
      els.worldHistoryWrongNoteGuide.textContent = "틀린 문제가 생기면 여기에 자동으로 기록돼요.";
    } else if (unresolvedCount === 0) {
      els.worldHistoryWrongNoteGuide.textContent = "멋져요! 세계사 오답노트를 전부 해결했어요.";
    } else {
      els.worldHistoryWrongNoteGuide.textContent = `오답 ${unresolvedCount}개가 남아 있어요. 복습 버튼으로 다시 풀어봐요.`;
    }
  }

  if (notes.length === 0) {
    const empty = document.createElement("li");
    empty.className = "ranking-empty";
    empty.textContent = "아직 기록된 오답이 없어요.";
    els.worldHistoryWrongNoteList.appendChild(empty);
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
    els.worldHistoryWrongNoteList.appendChild(li);
  });
}

function renderWorldHistoryIdle() {
  const level = getWorldHistoryLevel(worldHistoryState.level);
  worldHistoryState.current = null;
  worldHistoryState.answered = false;
  worldHistoryState.sessionActive = false;
  worldHistoryState.reviewMode = false;
  worldHistoryState.reviewQueue = [];
  worldHistoryState.reviewTotal = 0;
  els.worldHistoryQuestionCount.textContent = "준비 완료";
  els.worldHistoryModePill.textContent = `${level.label} 객관식`;
  els.worldHistoryPrompt.textContent = `${level.label} 시작 버튼을 누르면 세계사 10문제가 나와요.`;
  els.worldHistoryOptions.innerHTML = "";
  els.worldHistoryNextBtn.textContent = "다음 문제";
  els.worldHistoryNextBtn.disabled = true;
  setWorldHistoryFeedback(`${level.label} 준비 완료! 시작 버튼을 눌러보자.`);
  updateWorldHistoryLevelUi();
  updateWorldHistoryStats();
  renderWorldHistoryWrongNotes();
}

function renderWorldHistoryQuestion() {
  if (!worldHistoryState.current) return;

  const level = getWorldHistoryLevel(worldHistoryState.level);
  if (worldHistoryState.reviewMode) {
    const remaining = worldHistoryState.reviewQueue.length + 1;
    els.worldHistoryQuestionCount.textContent = `오답노트 복습 · 남은 ${remaining}문제`;
    els.worldHistoryModePill.textContent = "오답노트 복습";
  } else {
    els.worldHistoryQuestionCount.textContent = `${worldHistoryState.questionNumber} / ${TARGET_QUESTIONS} 문제`;
    els.worldHistoryModePill.textContent = `${level.label} 객관식`;
  }
  els.worldHistoryPrompt.textContent = worldHistoryState.current.question;
  els.worldHistoryOptions.innerHTML = worldHistoryState.current.options
    .map((option) => {
      return `<button class="english-option" type="button" data-world-history-option="${option}">${option}</button>`;
    })
    .join("");
  els.worldHistoryNextBtn.textContent = worldHistoryState.reviewMode ? "다음 복습" : "다음 문제";
  els.worldHistoryNextBtn.disabled = true;
  worldHistoryState.answered = false;
}

function startWorldHistorySession() {
  const level = getWorldHistoryLevel(worldHistoryState.level);
  worldHistoryState.sessionActive = true;
  worldHistoryState.sessionStartedAt = Date.now();
  worldHistoryState.questionNumber = 1;
  worldHistoryState.correct = 0;
  worldHistoryState.wrong = 0;
  worldHistoryState.streak = 0;
  worldHistoryState.bestStreak = 0;
  worldHistoryState.answered = false;
  worldHistoryState.current = null;
  worldHistoryState.reviewMode = false;
  worldHistoryState.reviewQueue = [];
  worldHistoryState.reviewTotal = 0;
  worldHistoryState.wrongNotes = [];
  worldHistoryState.usedQuestionIndexes.clear();
  worldHistoryState.current = buildWorldHistoryQuestion();
  updateWorldHistoryStats();
  renderWorldHistoryWrongNotes();
  renderWorldHistoryQuestion();
  setWorldHistoryFeedback(`${level.label} 시작! 세계사 문제를 차근차근 풀어보자.`);
  setBear("thinking", `${level.label} 세계사 라운드 시작!`);
}

function completeWorldHistorySession() {
  worldHistoryState.sessionActive = false;
  worldHistoryState.answered = false;
  worldHistoryState.current = null;

  const total = worldHistoryState.correct + worldHistoryState.wrong;
  const accuracy = total > 0 ? Math.round((worldHistoryState.correct / total) * 100) : 0;
  let mood = "happy";
  if (accuracy >= 90) mood = "celebrate";
  if (accuracy < 60) mood = "thinking";

  els.worldHistoryQuestionCount.textContent = "세계사 라운드 완료";
  els.worldHistoryModePill.textContent = "세계사 라운드 완료";
  els.worldHistoryPrompt.textContent = `총 ${worldHistoryState.correct}/${total}문제 정답 (${accuracy}%)`;
  els.worldHistoryOptions.innerHTML = "";
  els.worldHistoryNextBtn.textContent = "다음 문제";
  els.worldHistoryNextBtn.disabled = true;
  const unresolvedWrongCount = worldHistoryState.wrongNotes.filter((note) => !note.solved).length;
  if (unresolvedWrongCount > 0) {
    setWorldHistoryFeedback(
      `완료! ${getWorldHistoryLevel(worldHistoryState.level).label} 라운드를 끝냈어요. 오답노트 ${unresolvedWrongCount}개를 다시 풀어볼까?`
    );
  } else {
    setWorldHistoryFeedback(`완료! ${getWorldHistoryLevel(worldHistoryState.level).label} 라운드를 끝냈어요. 다시 도전해볼까?`);
  }
  updateWorldHistoryStats();
  renderWorldHistoryWrongNotes();
  setBear(mood, "세계사 라운드 완료! 시대 흐름이 더 잘 보이기 시작했어.");

  const summary = buildWorldHistoryRoundSummary();
  void syncWorldHistoryRoundResult(summary);
}

function nextWorldHistoryReviewQuestion() {
  const next = worldHistoryState.reviewQueue.shift();
  if (!next) {
    completeWorldHistoryWrongReview();
    return;
  }

  worldHistoryState.current = {
    ...next,
    options: shuffleList([...(next.options || [])])
  };
  renderWorldHistoryQuestion();
}

function startWorldHistoryWrongReview() {
  const unresolved = worldHistoryState.wrongNotes.filter((note) => !note.solved);
  if (unresolved.length === 0) return;

  worldHistoryState.reviewMode = true;
  worldHistoryState.sessionActive = true;
  worldHistoryState.answered = false;
  worldHistoryState.reviewTotal = unresolved.length;
  worldHistoryState.reviewQueue = unresolved.map((note) => ({
    question: note.question,
    options: [...note.options],
    answer: note.answer,
    explanation: note.explanation,
    noteKey: note.key
  }));
  worldHistoryState.current = null;
  worldHistoryState.questionNumber = 1;

  renderWorldHistoryWrongNotes();
  setWorldHistoryFeedback("좋아! 세계사 오답노트 복습 시작. 틀린 문제를 다시 맞혀보자.");
  setBear("thinking", "오답노트 복습 시작! 이번엔 꼭 맞힐 수 있어.");
  nextWorldHistoryReviewQuestion();
}

function completeWorldHistoryWrongReview() {
  const unresolved = worldHistoryState.wrongNotes.filter((note) => !note.solved).length;
  worldHistoryState.reviewMode = false;
  worldHistoryState.sessionActive = false;
  worldHistoryState.answered = false;
  worldHistoryState.current = null;
  worldHistoryState.reviewQueue = [];
  worldHistoryState.reviewTotal = 0;
  worldHistoryState.questionNumber = 0;

  els.worldHistoryQuestionCount.textContent = "오답노트 복습 완료";
  els.worldHistoryModePill.textContent = `${getWorldHistoryLevel(worldHistoryState.level).label} 객관식`;
  els.worldHistoryPrompt.textContent = "오답노트를 모두 점검했어요. 다시 라운드를 시작해볼까요?";
  els.worldHistoryOptions.innerHTML = "";
  els.worldHistoryNextBtn.textContent = "다음 문제";
  els.worldHistoryNextBtn.disabled = true;

  if (unresolved > 0) {
    setWorldHistoryFeedback(`복습 완료! 아직 ${unresolved}개 남았어요. 다시 복습하면 더 좋아져요.`);
    setBear("happy", "괜찮아! 한 번 더 복습하면 완벽해질 수 있어.");
  } else {
    setWorldHistoryFeedback("복습 완료! 오답노트를 전부 해결했어요.");
    setBear("celebrate", "오답노트 완주! 정말 대단해.");
  }
  renderWorldHistoryWrongNotes();
}

function handleWorldHistoryOptionSelect(option) {
  if (!worldHistoryState.sessionActive || worldHistoryState.answered || !worldHistoryState.current) return;

  worldHistoryState.answered = true;
  const isCorrect = option === worldHistoryState.current.answer;

  if (worldHistoryState.reviewMode) {
    if (isCorrect) {
      const targetKey = String(worldHistoryState.current.noteKey || "");
      const matched = worldHistoryState.wrongNotes.find((note) => note.key === targetKey);
      if (matched) {
        matched.solved = true;
      }
      setWorldHistoryFeedback(`정답! ${worldHistoryState.current.explanation}`);
      setBear("love", "좋아! 오답노트 문제를 다시 맞혔어.");
      renderWorldHistoryWrongNotes();
    } else {
      worldHistoryState.reviewQueue.push({
        question: worldHistoryState.current.question,
        options: [...worldHistoryState.current.options],
        answer: worldHistoryState.current.answer,
        explanation: worldHistoryState.current.explanation,
        noteKey: worldHistoryState.current.noteKey
      });
      setWorldHistoryFeedback(`오답! 정답은 "${worldHistoryState.current.answer}" · ${worldHistoryState.current.explanation}`);
      setBear("cry", "괜찮아! 같은 문제를 한 번 더 복습해보자.");
      renderWorldHistoryWrongNotes();
    }
  } else if (isCorrect) {
    worldHistoryState.correct += 1;
    worldHistoryState.streak += 1;
    worldHistoryState.bestStreak = Math.max(worldHistoryState.bestStreak, worldHistoryState.streak);
    setWorldHistoryFeedback(`정답! ${worldHistoryState.current.explanation}`);
    setBear("love", "세계사 정답! 곰돌이 선생님이 칭찬 중이야.");
  } else {
    const noteKey = `world-history-wrong-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    worldHistoryState.wrong += 1;
    worldHistoryState.streak = 0;
    worldHistoryState.wrongNotes.push({
      key: noteKey,
      question: worldHistoryState.current.question,
      options: [...worldHistoryState.current.options],
      answer: worldHistoryState.current.answer,
      explanation: worldHistoryState.current.explanation,
      selected: option,
      solved: false
    });
    setWorldHistoryFeedback(`오답! 정답은 "${worldHistoryState.current.answer}" · ${worldHistoryState.current.explanation}`);
    setBear("cry", "괜찮아! 다음 문제에서 만회하자.");
    renderWorldHistoryWrongNotes();
  }

  Array.from(els.worldHistoryOptions.querySelectorAll(".english-option")).forEach((button) => {
    if (!(button instanceof HTMLElement)) return;
    const value = button.dataset.worldHistoryOption || "";
    button.setAttribute("disabled", "true");
    if (value === worldHistoryState.current.answer) {
      button.classList.add("is-correct");
      return;
    }
    if (value === option && !isCorrect) {
      button.classList.add("is-wrong");
    }
  });

  if (!worldHistoryState.reviewMode) {
    updateWorldHistoryStats();
  }
  if (isCorrect) {
    handleWorldHistoryNext();
    return;
  }

  if (worldHistoryState.reviewMode) {
    els.worldHistoryNextBtn.textContent = worldHistoryState.reviewQueue.length === 0 ? "복습 완료" : "다음 복습";
  } else {
    els.worldHistoryNextBtn.textContent = worldHistoryState.questionNumber >= TARGET_QUESTIONS ? "결과 보기" : "다음 문제";
  }
  els.worldHistoryNextBtn.disabled = false;
  els.worldHistoryNextBtn.focus();
}

function handleWorldHistoryNext() {
  if (!worldHistoryState.answered) return;

  if (worldHistoryState.reviewMode) {
    if (worldHistoryState.reviewQueue.length === 0) {
      completeWorldHistoryWrongReview();
      return;
    }

    worldHistoryState.questionNumber += 1;
    nextWorldHistoryReviewQuestion();
    setBear("idle", "좋아! 오답노트 다음 문제로 가자.");
    setWorldHistoryFeedback("복습을 하나씩 끝내보자.");
    return;
  }

  if (worldHistoryState.questionNumber >= TARGET_QUESTIONS) {
    completeWorldHistorySession();
    return;
  }

  worldHistoryState.questionNumber += 1;
  worldHistoryState.current = buildWorldHistoryQuestion();
  renderWorldHistoryQuestion();
  setBear("idle", "좋아! 세계사 다음 문제로 가자.");
  setWorldHistoryFeedback("다음 문제도 집중해서 풀어보자.");
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

async function saveScienceSessionToDb(summary) {
  if (!authState.user || !authState.token) {
    return { ok: false, reason: "not-logged-in" };
  }

  try {
    const response = await fetch(getApiUrl("/api/science/sessions"), {
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
    console.error("saveScienceSessionToDb failed", error);
    return { ok: false, reason: "request-failed" };
  }
}

async function syncScienceRoundResult(summary) {
  if (!authState.user) {
    return;
  }

  const result = await saveScienceSessionToDb(summary);

  if (result.ok) {
    setAuthStatus(`${authState.user.name || "사용자"}님, 과학 라운드 기록이 저장됐어요.`);
    void refreshScienceRankings();
    return;
  }

  if (result.reason === "not-logged-in") {
    setAuthStatus("로그인하면 과학 라운드 결과를 저장할 수 있어요.");
    return;
  }

  setAuthStatus("과학 라운드 저장에 실패했어요. 로그인 상태와 DB 설정을 확인해 주세요.");
}

async function saveWorldHistorySessionToDb(summary) {
  if (!authState.user || !authState.token) {
    return { ok: false, reason: "not-logged-in" };
  }

  try {
    const response = await fetch(getApiUrl("/api/world-history/sessions"), {
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
    console.error("saveWorldHistorySessionToDb failed", error);
    return { ok: false, reason: "request-failed" };
  }
}

async function syncWorldHistoryRoundResult(summary) {
  if (!authState.user) {
    return;
  }

  const result = await saveWorldHistorySessionToDb(summary);

  if (result.ok) {
    setAuthStatus(`${authState.user.name || "사용자"}님, 세계사 라운드 기록이 저장됐어요.`);
    void refreshWorldHistoryRankings();
    return;
  }

  if (result.reason === "not-logged-in") {
    setAuthStatus("로그인하면 세계사 라운드 결과를 저장할 수 있어요.");
    return;
  }

  setAuthStatus("세계사 라운드 저장에 실패했어요. 로그인 상태와 DB 설정을 확인해 주세요.");
}

async function saveBaseballSessionToDb(summary) {
  if (!authState.user || !authState.token) {
    return { ok: false, reason: "not-logged-in" };
  }

  try {
    const response = await fetch(getApiUrl("/api/baseball/sessions"), {
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
    console.error("saveBaseballSessionToDb failed", error);
    return { ok: false, reason: "request-failed" };
  }
}

async function syncBaseballRoundResult(summary) {
  if (!authState.user) {
    return;
  }

  const result = await saveBaseballSessionToDb(summary);

  if (result.ok) {
    setAuthStatus(`${authState.user.name || "사용자"}님, 야구 라운드 기록이 저장됐어요.`);
    void refreshBaseballRankings();
    return;
  }

  if (result.reason === "not-logged-in") {
    setAuthStatus("로그인하면 야구 라운드 결과를 저장할 수 있어요.");
    return;
  }

  setAuthStatus("야구 라운드 저장에 실패했어요. 로그인 상태와 DB 설정을 확인해 주세요.");
}

async function saveSoccerSessionToDb(summary) {
  if (!authState.user || !authState.token) {
    return { ok: false, reason: "not-logged-in" };
  }

  try {
    const response = await fetch(getApiUrl("/api/soccer/sessions"), {
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
    console.error("saveSoccerSessionToDb failed", error);
    return { ok: false, reason: "request-failed" };
  }
}

async function syncSoccerRoundResult(summary) {
  if (!authState.user) {
    return;
  }

  const result = await saveSoccerSessionToDb(summary);

  if (result.ok) {
    setAuthStatus(`${authState.user.name || "사용자"}님, 축구 라운드 기록이 저장됐어요.`);
    void refreshSoccerRankings();
    return;
  }

  if (result.reason === "not-logged-in") {
    setAuthStatus("로그인하면 축구 라운드 결과를 저장할 수 있어요.");
    return;
  }

  setAuthStatus("축구 라운드 저장에 실패했어요. 로그인 상태와 DB 설정을 확인해 주세요.");
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

function buildScienceRoundSummary() {
  const total = scienceState.correct + scienceState.wrong;
  const accuracy = total ? Math.round((scienceState.correct / total) * 100) : 0;
  const durationMs = Math.max(Date.now() - scienceState.sessionStartedAt, 0);

  return {
    date: getDateKey(),
    level: scienceState.level,
    totalQuestions: total,
    correctAnswers: scienceState.correct,
    wrongAnswers: scienceState.wrong,
    accuracy,
    bestStreak: scienceState.bestStreak,
    durationMs,
    externalKey: `science:${getDateKey()}:${scienceState.level}:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`
  };
}

function buildWorldHistoryRoundSummary() {
  const total = worldHistoryState.correct + worldHistoryState.wrong;
  const accuracy = total ? Math.round((worldHistoryState.correct / total) * 100) : 0;
  const durationMs = Math.max(Date.now() - worldHistoryState.sessionStartedAt, 0);

  return {
    date: getDateKey(),
    level: worldHistoryState.level,
    totalQuestions: total,
    correctAnswers: worldHistoryState.correct,
    wrongAnswers: worldHistoryState.wrong,
    accuracy,
    bestStreak: worldHistoryState.bestStreak,
    durationMs,
    externalKey: `world-history:${getDateKey()}:${worldHistoryState.level}:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`
  };
}

function buildBaseballRoundSummary() {
  const total = baseballState.correct + baseballState.wrong;
  const accuracy = total ? Math.round((baseballState.correct / total) * 100) : 0;
  const durationMs = Math.max(Date.now() - baseballState.sessionStartedAt, 0);

  return {
    date: getDateKey(),
    level: baseballState.level,
    totalQuestions: total,
    correctAnswers: baseballState.correct,
    wrongAnswers: baseballState.wrong,
    accuracy,
    bestStreak: baseballState.bestStreak,
    durationMs,
    externalKey: `baseball:${getDateKey()}:${baseballState.level}:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`
  };
}

function buildSoccerRoundSummary() {
  const total = soccerState.correct + soccerState.wrong;
  const accuracy = total ? Math.round((soccerState.correct / total) * 100) : 0;
  const durationMs = Math.max(Date.now() - soccerState.sessionStartedAt, 0);

  return {
    date: getDateKey(),
    level: soccerState.level,
    totalQuestions: total,
    correctAnswers: soccerState.correct,
    wrongAnswers: soccerState.wrong,
    accuracy,
    bestStreak: soccerState.bestStreak,
    durationMs,
    externalKey: `soccer:${getDateKey()}:${soccerState.level}:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`
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

function handleScienceLevelSelect(nextLevel) {
  if (!SCIENCE_LEVELS[nextLevel]) return;

  scienceState.level = nextLevel;
  profile.lastScienceLevel = nextLevel;
  saveProfile();
  updateScienceLevelUi();
  scienceState.usedQuestionIndexes.clear();
  scienceState.usedConceptIds.clear();

  const label = getScienceLevel(nextLevel).label;
  if (scienceState.sessionActive) {
    setScienceFeedback(`${label} 난이도로 바꿨어. 다음 문제부터 적용돼요.`);
    setBear("happy", `${label} 난이도로 변경 완료!`);
    return;
  }

  if (state.subject === "science") {
    renderScienceIdle();
    setBear("happy", `${label} 난이도 준비 완료!`);
  }
}

function handleWorldHistoryLevelSelect(nextLevel) {
  if (!WORLD_HISTORY_LEVELS[nextLevel]) return;

  worldHistoryState.level = nextLevel;
  profile.lastWorldHistoryLevel = nextLevel;
  saveProfile();
  updateWorldHistoryLevelUi();
  worldHistoryState.usedQuestionIndexes.clear();

  const label = getWorldHistoryLevel(nextLevel).label;
  if (worldHistoryState.sessionActive) {
    setWorldHistoryFeedback(`${label} 난이도로 바꿨어. 다음 문제부터 적용돼요.`);
    setBear("happy", `${label} 난이도로 변경 완료!`);
    return;
  }

  if (state.subject === "worldHistory") {
    renderWorldHistoryIdle();
    setBear("happy", `${label} 난이도 준비 완료!`);
  }
}

function handleBaseballLevelSelect(nextLevel) {
  if (!BASEBALL_LEVELS[nextLevel]) return;

  baseballState.level = nextLevel;
  profile.lastBaseballLevel = nextLevel;
  saveProfile();
  updateBaseballLevelUi();
  baseballState.usedQuestionIndexes.clear();

  const label = getBaseballLevel(nextLevel).label;
  if (baseballState.sessionActive) {
    setBaseballFeedback(`${label} 난이도로 바꿨어. 다음 문제부터 적용돼요.`);
    setBear("happy", `${label} 난이도로 변경 완료!`);
    return;
  }

  if (state.subject === "baseball") {
    renderBaseballIdle();
    setBear("happy", `${label} 난이도 준비 완료!`);
  }
}

function handleSoccerLevelSelect(nextLevel) {
  if (!SOCCER_LEVELS[nextLevel]) return;

  soccerState.level = nextLevel;
  profile.lastSoccerLevel = nextLevel;
  saveProfile();
  updateSoccerLevelUi();
  soccerState.usedQuestionIndexes.clear();
  soccerState.usedConceptIds.clear();

  const label = getSoccerLevel(nextLevel).label;
  if (soccerState.sessionActive) {
    setSoccerFeedback(`${label} 난이도로 바꿨어. 다음 문제부터 적용돼요.`);
    setBear("happy", `${label} 난이도로 변경 완료!`);
    return;
  }

  if (state.subject === "soccer") {
    renderSoccerIdle();
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
  state.scienceRankingCorrect = null;
  state.worldHistoryRankingCorrect = null;
  state.baseballRankingCorrect = null;
  state.soccerRankingCorrect = null;
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

  els.scienceLevelButtons.forEach((button) => {
    button.addEventListener("click", () => {
      handleScienceLevelSelect(button.dataset.scienceLevel);
    });
  });

  els.worldHistoryLevelButtons.forEach((button) => {
    button.addEventListener("click", () => {
      handleWorldHistoryLevelSelect(button.dataset.worldHistoryLevel);
    });
  });

  els.baseballLevelButtons.forEach((button) => {
    button.addEventListener("click", () => {
      handleBaseballLevelSelect(button.dataset.baseballLevel);
    });
  });

  els.soccerLevelButtons.forEach((button) => {
    button.addEventListener("click", () => {
      handleSoccerLevelSelect(button.dataset.soccerLevel);
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

  els.refreshScienceRankingBtn.addEventListener("click", () => {
    void refreshScienceRankings();
  });

  els.refreshWorldHistoryRankingBtn.addEventListener("click", () => {
    void refreshWorldHistoryRankings();
  });

  els.refreshBaseballRankingBtn.addEventListener("click", () => {
    void refreshBaseballRankings();
  });

  els.refreshSoccerRankingBtn.addEventListener("click", () => {
    void refreshSoccerRankings();
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

  els.scienceStartBtn.addEventListener("click", () => {
    startScienceSession();
  });

  els.worldHistoryStartBtn.addEventListener("click", () => {
    startWorldHistorySession();
  });

  els.baseballStartBtn.addEventListener("click", () => {
    startBaseballSession();
  });

  els.soccerStartBtn.addEventListener("click", () => {
    startSoccerSession();
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

  els.scienceOptions.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (!target.classList.contains("english-option")) return;
    handleScienceOptionSelect(String(target.dataset.scienceOption || ""));
  });

  els.scienceNextBtn.addEventListener("click", () => {
    handleScienceNext();
  });

  els.worldHistoryRetryWrongBtn.addEventListener("click", () => {
    startWorldHistoryWrongReview();
  });

  els.worldHistoryOptions.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (!target.classList.contains("english-option")) return;
    handleWorldHistoryOptionSelect(String(target.dataset.worldHistoryOption || ""));
  });

  els.worldHistoryNextBtn.addEventListener("click", () => {
    handleWorldHistoryNext();
  });

  els.baseballOptions.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (!target.classList.contains("english-option")) return;
    handleBaseballOptionSelect(String(target.dataset.baseballOption || ""));
  });

  els.baseballNextBtn.addEventListener("click", () => {
    handleBaseballNext();
  });

  els.soccerOptions.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (!target.classList.contains("english-option")) return;
    handleSoccerOptionSelect(String(target.dataset.soccerOption || ""));
  });

  els.soccerNextBtn.addEventListener("click", () => {
    handleSoccerNext();
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
    if (
      state.subject !== "english" &&
      state.subject !== "history" &&
      state.subject !== "science" &&
      state.subject !== "worldHistory" &&
      state.subject !== "baseball" &&
      state.subject !== "soccer"
    ) {
      return;
    }

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
      return;
    }

    if (state.subject === "science") {
      if (!scienceState.sessionActive) return;
      if (scienceState.answered) {
        event.preventDefault();
        handleScienceNext();
      }
      return;
    }

    if (state.subject === "worldHistory") {
      if (!worldHistoryState.sessionActive) return;
      if (worldHistoryState.answered) {
        event.preventDefault();
        handleWorldHistoryNext();
      }
      return;
    }

    if (state.subject === "baseball") {
      if (!baseballState.sessionActive) return;
      if (baseballState.answered) {
        event.preventDefault();
        handleBaseballNext();
      }
      return;
    }

    if (state.subject === "soccer") {
      if (!soccerState.sessionActive) return;
      if (soccerState.answered) {
        event.preventDefault();
        handleSoccerNext();
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
  englishState.level = ENGLISH_LEVELS[profile.lastEnglishLevel] ? profile.lastEnglishLevel : "starter";
  historyState.level = HISTORY_LEVELS[profile.lastHistoryLevel] ? profile.lastHistoryLevel : "grade4";
  scienceState.level = SCIENCE_LEVELS[profile.lastScienceLevel] ? profile.lastScienceLevel : "starter";
  worldHistoryState.level = WORLD_HISTORY_LEVELS[profile.lastWorldHistoryLevel] ? profile.lastWorldHistoryLevel : "grade6";
  baseballState.level = BASEBALL_LEVELS[profile.lastBaseballLevel] ? profile.lastBaseballLevel : "beginner";
  soccerState.level = SOCCER_LEVELS[profile.lastSoccerLevel] ? profile.lastSoccerLevel : "beginner";
  state.subject = loadTabPreference();

  setActive(els.operationButtons, "operation", state.operation);
  setActive(els.levelButtons, "level", state.level);
  setActive(els.englishLevelButtons, "englishLevel", englishState.level);
  setActive(els.historyLevelButtons, "historyLevel", historyState.level);
  setActive(els.scienceLevelButtons, "scienceLevel", scienceState.level);
  setActive(els.worldHistoryLevelButtons, "worldHistoryLevel", worldHistoryState.level);
  setActive(els.baseballLevelButtons, "baseballLevel", baseballState.level);
  setActive(els.soccerLevelButtons, "soccerLevel", soccerState.level);

  applyTheme(profile.theme, { persist: false });
  setThemePicker(false);
  els.retryWrongBtn.classList.add("hidden");

  updateModePill();
  updateStats();
  updateProgress();
  setupEnglishVoiceSupport();
  renderEnglishIdle();
  renderHistoryIdle();
  renderScienceIdle();
  renderWorldHistoryIdle();
  renderBaseballIdle();
  renderSoccerIdle();
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
