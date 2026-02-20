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
- 과학 문제은행:
  - 난이도별 100문항 이상 자동 생성(스타터/초급/중급/고급)
  - 정답-오답 유사도 검사로 혼동 선택지 자동 필터링
  - 문항별 2개 이상 출처 메타데이터(교차 검증용) 포함
- 축구 문제은행:
  - 난이도별 100문항 이상 자동 생성(초급/중급/고급)
  - 정답 포함/보기 중복/유사도 기반 오답 품질 자동 검증
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

### X 참여 어시스턴트 (수동 승인)

`scripts/x-engagement-assistant.mjs`는 팔로잉 계정 글(텍스트 + 첨부 미디어 alt 정보)을 스캔해
좋아요/공감 댓글 후보를 만들고, 사람이 승인한 건만 실제 실행합니다.

기본 흐름:
1. `.env`에 X 관련 값 설정 (`.env.example`의 `X auto-reply bot`, `X engagement assistant` 섹션 참고)
2. 후보 생성: `npm run xbot:scan`
3. 후보 확인: `npm run xbot:list`
4. 1건 승인 실행: `npm run xbot:approve -- --id=cand_트윗ID`
5. 1건 거절: `npm run xbot:reject -- --id=cand_트윗ID --reason=\"skip\"`

UI 대시보드:
- 개발자 키 없이 수동 보드: [http://localhost:3000/xbot](http://localhost:3000/xbot)
  - 글 링크/본문/이미지 메모 입력 → 공감 댓글 초안 생성
  - 좋아요/댓글은 X 인텐트 페이지를 열어 직접 실행
  - 승인 쿨다운(초)로 연속 실행 간격 조절
  - Docker 없이 실행하려면 `npm run start:nodb` 사용
  - X 웹 자동 보조 스크립트(수동 전송): [http://localhost:3000/x-human-assist.user.js](http://localhost:3000/x-human-assist.user.js)
    - Tampermonkey에 추가 후 X 페이지에서 `다음 글 열기`, `현재 글 분석+입력`, `다음+자동분석` 사용
    - `현재 글 분석+입력`은 `/api/xha/draft`로 글/이미지 정보를 보내 LLM이 실시간으로 댓글 문구를 생성
    - LLM 공급자는 `OPENAI_API_KEY`(권장) 또는 로컬 Ollama(`OLLAMA_BASE_URL`, `OLLAMA_MODEL`) 중 하나 필요
    - 서버 시작 시 프로젝트 루트의 `.env`를 자동으로 읽음
    - 응답은 한국어 전용으로 후처리되며, 어색한 문장은 자동 교정 후 출력
    - 전송 버튼은 직접 클릭해야 함
- API 연동 대시보드(개발자 키 필요): [http://localhost:3000/xbot-api](http://localhost:3000/xbot-api)
- 버튼으로 `scan`, 후보 확인, 승인/거절 수행
- `15초 자동 새로고침`으로 진행 상황 모니터링
- `승인 쿨다운(초)`로 승인 간 최소 대기 시간 조절

옵션:
- 승인 시 댓글 수정: `npm run xbot:approve -- --id=cand_... --reply=\"직접 작성한 댓글\"`
- 승인 시 좋아요 생략: `npm run xbot:approve -- --id=cand_... --like=false`
- 승인 쿨다운 변경: `npm run xbot:approve -- --id=cand_... --cooldown-seconds=60`
- 첫 테스트는 `X_DRY_RUN=true` 권장

상태 파일:
- `data/x-engagement-assistant.json`에 팔로잉 캐시/후보/처리 상태 저장

참고:
- 기존 `xbot:reply`는 단순 자동 답글 스크립트이며, 운영에서는 수동 승인형(`xbot:scan/list/approve`) 사용을 권장합니다.

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
- `GET /api/readings?userId=...&limit=...`
- `POST /api/readings`

## 로드맵

- 받아올림/받아내림 문제 유형 추가
- 나머지 나눗셈 모드 추가
- 학부모용 진도 리포트 화면 추가
- 학년/연령별 커리큘럼 모드 추가
