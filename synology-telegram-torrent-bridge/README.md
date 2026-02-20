# iPhone -> Telegram -> Synology NAS 토렌트 브리지

아이폰에서 토렌트 앱 없이, 텔레그램 대화창에 아래 둘 중 하나를 보내면 시놀로지 Download Station으로 등록됩니다.

- 마그넷 링크 텍스트
- `.torrent` 파일 첨부

## 준비물

- Synology NAS (Download Station 설치/활성화)
- Telegram 계정
- Telegram 봇 토큰 (BotFather로 생성)
- NAS 다운로드 전용 계정 (권장)

## 1) 텔레그램 봇 생성

1. 텔레그램에서 `@BotFather` 검색
2. `/newbot` 실행 후 봇 생성
3. 발급된 토큰을 복사

## 2) 설정 파일 작성

```bash
cd synology-telegram-torrent-bridge
cp .env.example .env
```

`.env` 값 수정:

- `TELEGRAM_BOT_TOKEN`: BotFather 토큰
- `SYNOLOGY_BASE_URL`: 예) `https://nas.example.com:5001`
- `SYNOLOGY_USERNAME` / `SYNOLOGY_PASSWORD`: Download Station 권한 계정
- `SYNOLOGY_ALLOW_SELF_SIGNED`: NAS 인증서가 사설 인증서면 `true`

`TELEGRAM_ALLOWED_CHAT_IDS`는 봇 실행 후 텔레그램에서 `/id` 명령으로 채팅 ID를 확인해 넣으면 됩니다.

## 3) 실행

```bash
docker compose up -d --build
```

로그 확인:

```bash
docker compose logs -f
```

## 4) 사용 방법 (아이폰)

1. 텔레그램에서 만든 봇과 대화 시작
2. 마그넷 링크를 텍스트로 보내거나 `.torrent` 파일 첨부
3. 봇이 등록 성공/실패를 답장
4. NAS Download Station에서 작업 확인

## 보안 권장

- NAS 관리자 계정 대신 전용 계정 사용
- `TELEGRAM_ALLOWED_CHAT_IDS` 설정으로 허용 채팅만 제한
- 외부 접속 시 HTTPS 사용

## 문제 해결

- `Synology 로그인 실패`:
  - URL/계정/비밀번호 확인
  - Download Station 권한 확인
- `허용되지 않은 채팅`:
  - `/id`로 채팅 ID 확인 후 `.env`에 추가
- `토렌트 파일 등록 실패`:
  - 파일 확장자 `.torrent` 확인
  - Download Station 상태 확인

## 주의

토렌트는 합법적 배포 자료에 대해서만 사용하세요.
