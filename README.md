# xAuto

X(트위터) 수동 참여 보조 프로젝트입니다.

핵심 목적:
- 팔로잉/피드 글을 보고 댓글 초안을 빠르게 생성
- 자동 전송 없이 사람이 최종 확인 후 직접 전송
- Tampermonkey 패널에서 `다음 글 열기`, `현재 글 분석+입력`, `다음+자동분석` 제공

## 실행

```bash
npm install
npm run start:nodb
```

기본 주소:
- 수동 보드: [http://localhost:3000/xbot](http://localhost:3000/xbot)
- 유저스크립트: [http://localhost:3000/x-human-assist.user.js](http://localhost:3000/x-human-assist.user.js)
- API 대시보드(개발자 키 워크플로우): [http://localhost:3000/xbot-api](http://localhost:3000/xbot-api)

루트(`/`)는 자동으로 `/xbot`으로 이동합니다.

## 환경 변수

`.env.example` 참고.

주요 값:
- `SKIP_DB=true` : DB 없이 수동 보조 UI만 실행
- `OPENAI_API_KEY` : OpenAI 사용 시
- `OPENAI_MODEL` : 기본 `gpt-4o-mini`
- `OLLAMA_BASE_URL` : 기본 `http://127.0.0.1:11434`
- `OLLAMA_MODEL` : 예) `qwen2.5:7b-instruct`

LLM 사용 방식:
- `OPENAI_API_KEY`가 있으면 OpenAI 우선
- 없으면 Ollama 사용

## 스크립트

- `npm run start` : 서버 실행(DB 사용)
- `npm run start:nodb` : 서버 실행(DB 생략)
- `npm run xbot:scan` : 후보 스캔
- `npm run xbot:list` : 후보 목록
- `npm run xbot:approve -- --id=...` : 승인
- `npm run xbot:reject -- --id=...` : 거절

## 파일 구성(주요)

- `server.js` : API + 정적 파일 서버
- `x-human-assist.user.js` : X 페이지 Tampermonkey 보조 패널
- `xbot-manual.html/js/css` : 수동 댓글 초안 보드
- `xbot.html/js/css` : API 연동 대시보드
- `scripts/x-engagement-assistant.mjs` : scan/list/approve/reject CLI

## 주의

- 전송 버튼은 자동 클릭하지 않습니다. 최종 전송은 직접 눌러야 합니다.
- 플랫폼 정책 위반 소지가 있는 과도한 자동화는 피하고, 사람이 검토하는 방식으로 사용하세요.
