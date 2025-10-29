# Staix Onboarding

Staix 온보딩 채팅 애플리케이션입니다.

## 기능

- 💬 실시간 채팅 인터페이스
- ⚡ 스트리밍 응답 지원 (NDJSON)
- 📝 마크다운 렌더링 (리스트, 링크, 이미지 등)
- 🔄 웹훅 API 연동
- 📱 반응형 디자인 (최소화/최대화 모드)
- 🎨 Staix 브랜드 디자인 시스템
- 🖱️ 오버레이 스크롤바

## 기술 스택

- React 18
- TypeScript
- Vite
- Tailwind CSS
- ShadCN UI
- React Markdown

## 로컬 개발

### 환경 변수 설정

1. `.env.example` 파일을 `.env`로 복사합니다:
```bash
cp .env.example .env
```

2. `.env` 파일에서 필요한 환경 변수를 설정합니다:
```env
VITE_WEBHOOK_URL=https://n8n-test.poc.letsur.ai/webhook/your-webhook-id
```

### 개발 서버 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 배포

Vercel을 통한 자동 배포가 설정되어 있습니다.

## 라이선스

MIT
