# Pawfiler4 개발자 온보딩 가이드

## 프로젝트 개요

Pawfiler4는 딥페이크 탐지 교육 플랫폼으로, 마이크로서비스 아키텍처 기반의 풀스택 애플리케이션입니다.

### 기술 스택
- **Frontend**: React + TypeScript + Vite + TailwindCSS
- **Backend**: Go (gRPC 서비스) + Python (비디오 분석)
- **Infrastructure**: Docker, Envoy Proxy, Kafka, PostgreSQL
- **Cloud**: AWS (SageMaker, S3)

---

## 1. 개발 환경 설정

### 필수 도구
```bash
# Node.js 18+
node --version

# Docker & Docker Compose
docker --version
docker-compose --version

# Go 1.21+ (백엔드 개발 시)
go version

# Python 3.11+ (비디오 분석 서비스 개발 시)
python --version
```

### 프로젝트 클론 및 설치
```bash
git clone <repository-url>
cd pawfiler4

# 프론트엔드 의존성 설치
npm install

# 백엔드 서비스 시작
cd backend
docker-compose up -d
```

---

## 2. 아키텍처 이해

### 마이크로서비스 구조

```
┌─────────────┐
│   Frontend  │ (React, Port 5173)
│   (Vite)    │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│    Envoy    │ (API Gateway, Port 8080)
│   Proxy     │
└──────┬──────┘
       │
       ├─→ /auth/        → Auth Service (50051)
       ├─→ /quiz/        → Quiz Service (50052)
       ├─→ /community/   → Community Service (50053)
       ├─→ /video/       → Video Analysis (50054)
       ├─→ /payment/     → Payment Service (50055)
       └─→ /dashboard/   → Dashboard BFF (50056)
```

### 서비스별 역할

| 서비스 | 포트 | 기술 | 역할 |
|--------|------|------|------|
| **Auth Service** | 50051 | Go + gRPC | 로그인, 회원가입, JWT 발급 |
| **Quiz Service** | 50052 | Go + gRPC | 퀴즈 문제 제공, 정답 검증, XP/코인 관리 |
| **Community Service** | 50053 | Go + gRPC | 게시글, 댓글, 좋아요 |
| **Video Analysis** | 50054 | Python + gRPC | 딥페이크 분석 (MCP + SageMaker) |
| **Payment Service** | 50055 | Go + gRPC | 구독 결제 처리 |
| **Dashboard BFF** | 50056 | Go + gRPC | 여러 서비스 데이터 집계 |

---

## 3. 로컬 개발 워크플로우

### 프론트엔드 개발
```bash
# 개발 서버 시작 (HMR 지원)
npm run dev

# 브라우저에서 http://localhost:5173 접속
```

### 백엔드 개발

#### 전체 서비스 시작
```bash
cd backend
docker-compose up -d

# 로그 확인
docker-compose logs -f [service-name]

# 특정 서비스만 재시작
docker-compose restart quiz-service
```

#### 개별 서비스 개발 (예: Quiz Service)
```bash
cd backend/services/quiz

# 의존성 설치
go mod download

# 로컬 실행 (DB/Kafka는 Docker 사용)
export DATABASE_URL="postgres://pawfiler:dev_password@localhost:5432/pawfiler?sslmode=disable"
export KAFKA_BROKERS="localhost:9092"
go run main.go
```

### Envoy 설정 수정 시
```bash
# envoy.yaml 수정 후
docker-compose restart envoy

# Envoy 관리 콘솔 확인
open http://localhost:9901
```

---

## 4. API 호출 방법

### REST API (Envoy를 통한 gRPC-Web)

```bash
# 로그인
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# 퀴즈 목록 조회 (인증 필요)
curl http://localhost:8080/quiz/questions \
  -H "Authorization: Bearer <JWT_TOKEN>"

# 비디오 분석 요청
curl -X POST http://localhost:8080/video/analyze \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -F "video=@sample.mp4"
```

---

## 5. 데이터베이스

### 접속 정보
```bash
# PostgreSQL 접속
docker exec -it pawfiler-postgres psql -U pawfiler -d pawfiler

# 주요 테이블
\dt

# 예시 쿼리
SELECT * FROM users LIMIT 5;
SELECT * FROM quiz_questions WHERE difficulty = 'easy';
```

### 마이그레이션
```bash
# 초기 스키마는 scripts/init-db.sql에 정의
# 수정 후 DB 재생성
docker-compose down -v
docker-compose up -d postgres
```

---

## 6. 이벤트 스트리밍 (Kafka)

### 주요 토픽
- `user.registered` - 회원가입 이벤트
- `quiz.completed` - 퀴즈 완료 이벤트
- `video.analyzed` - 비디오 분석 완료
- `payment.succeeded` - 결제 성공

### Kafka 확인
```bash
# 토픽 목록
docker exec pawfiler-kafka kafka-topics --list --bootstrap-server localhost:9092

# 메시지 소비 (테스트)
docker exec pawfiler-kafka kafka-console-consumer \
  --bootstrap-server localhost:9092 \
  --topic quiz.completed \
  --from-beginning
```

---

## 7. 프론트엔드 구조

### 주요 디렉토리
```
src/
├── components/       # 재사용 가능한 UI 컴포넌트
│   ├── ui/          # shadcn/ui 기본 컴포넌트
│   └── ...          # 커스텀 컴포넌트
├── lib/
│   ├── types.ts     # TypeScript 타입 정의
│   ├── mockApi.ts   # Mock API (개발용)
│   └── utils.ts     # 유틸리티 함수
├── pages/           # 페이지 컴포넌트
└── App.tsx          # 라우팅 설정
```

### 상태 관리
- 현재는 React Context + useState 사용
- 필요 시 Zustand 또는 TanStack Query 도입 고려

---

## 8. 테스트

### 프론트엔드 테스트
```bash
# Vitest 실행
npm run test

# 커버리지 확인
npm run test:coverage
```

### 백엔드 테스트
```bash
cd backend/services/quiz
go test ./... -v
```

---

## 9. 배포

### 프론트엔드 빌드
```bash
npm run build
# dist/ 폴더가 생성됨 → S3 또는 CloudFront에 배포
```

### 백엔드 배포
```bash
# Docker 이미지 빌드
docker-compose build

# AWS ECS/EKS에 배포 (CI/CD 파이프라인 구성 필요)
```

---

## 10. 트러블슈팅

### Envoy 연결 실패
```bash
# Envoy 로그 확인
docker-compose logs envoy

# 서비스 헬스체크
curl http://localhost:9901/clusters
```

### gRPC 서비스 응답 없음
```bash
# 서비스 컨테이너 상태 확인
docker-compose ps

# 네트워크 연결 테스트
docker exec pawfiler-envoy ping auth-service
```

### DB 연결 오류
```bash
# PostgreSQL 헬스체크
docker exec pawfiler-postgres pg_isready -U pawfiler

# 연결 문자열 확인
echo $DATABASE_URL
```

---

## 11. 유용한 명령어 모음

```bash
# 전체 재시작 (클린 빌드)
docker-compose down -v && docker-compose up --build -d

# 특정 서비스 로그 실시간 확인
docker-compose logs -f quiz-service

# 컨테이너 내부 접속
docker exec -it pawfiler-quiz sh

# 프론트엔드 린트 & 포맷
npm run lint
npm run format
```

---

## 12. 참고 자료

- [Envoy Proxy 문서](https://www.envoyproxy.io/docs)
- [gRPC Go 튜토리얼](https://grpc.io/docs/languages/go/)
- [React + TypeScript 가이드](https://react.dev/learn/typescript)
- [Docker Compose 레퍼런스](https://docs.docker.com/compose/)

---

## 13. 팀 컨벤션

### Git 브랜치 전략
- `main` - 프로덕션 배포
- `develop` - 개발 통합
- `feature/*` - 기능 개발
- `fix/*` - 버그 수정

### 커밋 메시지
```
feat: 퀴즈 난이도 필터 추가
fix: 로그인 토큰 만료 처리 오류 수정
docs: API 문서 업데이트
refactor: 비디오 분석 로직 개선
```

### 코드 리뷰
- PR은 최소 1명 이상의 승인 필요
- 테스트 통과 필수
- 린트 오류 없어야 함

---

## 문의사항
- Slack: #pawfiler-dev
- 이슈 트래커: GitHub Issues
