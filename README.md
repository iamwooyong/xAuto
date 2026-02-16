# 곰돌이 수학 (gomMath)

아이들이 4연산을 재미있게 연습할 수 있는 웹 학습 앱입니다.  
곰돌이 선생님 캐릭터와 스티커 보상으로 학습 몰입을 높이도록 설계했습니다.

## 주요 기능

- 4연산 학습: 더하기, 빼기, 곱하기, 나누기, 랜덤 모드
- 난이도 3단계: 쉬움 / 보통 / 도전
- 10문제 라운드 진행 + 즉시 정답/오답 피드백
- 라운드 종료 후 틀린 문제 다시 풀기(복습 모드)
- 힌트 제공
- Google 로그인 시 곰돌이 색(테마) 계정 동기화
- Google 로그인 사용자 닉네임 등록/수정
- 맞힌 문제 수 기준 수학/영어/한국사/과학/세계사 랭킹 보드
- 맞힌 문제 수 기준 수학/영어/한국사/과학/세계사/야구/축구 랭킹 보드
- 브라우저용 개발 채팅 페이지: `/codex-web.html`
- 오늘 학습 통계:
  - 오늘 맞힌 문제 수
  - 현재 연속 정답
  - 최고 연속 기록
  - 오늘 정답률
- 정답 수 기반 스티커 보상 UI
- 로컬 저장(localStorage)으로 오늘 기록과 마지막 학습 설정 유지

## 기술 스택

- Frontend: HTML, CSS, Vanilla JavaScript
- Backend: Node.js, Express
- Database: PostgreSQL (`pg`)

## 실행 방법

```bash
npm install
npm run db:up
npm start
```

기본 실행 주소:

- [http://localhost:3000](http://localhost:3000)

기본 DB는 PostgreSQL이며, 기본 연결 문자열은 아래와 같습니다.

- `postgresql://postgres:postgres@localhost:5432/gommath`

## 환경 변수

`.env.example`를 참고해서 환경 변수를 설정할 수 있습니다.

- `DATABASE_URL`: PostgreSQL 연결 문자열
- `SESSION_SECRET`: 로그인 세션 서명 키
- `GOOGLE_CLIENT_ID` 또는 `GOOGLE_CLIENT_IDS`: Google OAuth 클라이언트 ID
- `OPENAI_API_KEY`: 웹 코덱스 채팅용 OpenAI API 키
- `OPENAI_MODEL`: 웹 코덱스 채팅 모델 (기본값 `gpt-4.1-mini`)

## 프로젝트 구조

```text
.
├── docker-compose.yml # PostgreSQL 로컬 실행
├── .env.example      # 환경 변수 예시
├── index.html      # 메인 화면 구조
├── styles.css      # 곰돌이 테마 UI 스타일
├── app.js          # 문제 생성/채점/진행도/통계 로직
├── server.js       # 정적 파일 서빙 + API
└── data/           # 기존 데이터 폴더(필요 시 확장)
```

## API

- `GET /api/health`
- `POST /api/auth/google`
- `GET /api/auth/me`
- `PATCH /api/math/profile/theme`
- `PATCH /api/math/profile/nickname`
- `GET /api/math/rankings`
- `GET /api/math/sessions`
- `POST /api/math/sessions`
- `GET /api/english/rankings`
- `GET /api/english/sessions`
- `POST /api/english/sessions`
- `GET /api/history/rankings`
- `GET /api/history/sessions`
- `POST /api/history/sessions`
- `GET /api/science/rankings`
- `GET /api/science/sessions`
- `POST /api/science/sessions`
- `GET /api/world-history/rankings`
- `GET /api/world-history/sessions`
- `POST /api/world-history/sessions`
- `GET /api/baseball/rankings`
- `GET /api/baseball/sessions`
- `POST /api/baseball/sessions`
- `GET /api/soccer/rankings`
- `GET /api/soccer/sessions`
- `POST /api/soccer/sessions`
- `POST /api/codex/chat`
- `GET /api/readings?userId=...&limit=...`
- `POST /api/readings`

## 로드맵

- 받아올림/받아내림 문제 유형 추가
- 나머지 나눗셈 모드 추가
- 학부모용 진도 리포트 화면 추가
- 학년/연령별 커리큘럼 모드 추가
