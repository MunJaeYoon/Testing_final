# Pawfiler Backend Architecture

## 아키텍처 개요

MSA (Microservices Architecture) + EDA (Event-Driven Architecture) 기반 백엔드

### 기술 스택
- **API Protocol**: gRPC
- **Message Broker**: Apache Kafka / AWS EventBridge
- **Database**: PostgreSQL (로컬 테스트)
- **AI Service**: Python (FastAPI + gRPC)
- **Backend Services**: Go / Node.js (TypeScript)
- **Container**: Docker + Docker Compose

## 서비스 구성

```
┌─────────────────┐
│   Frontend      │
│   (React)       │
└────────┬────────┘
         │ gRPC-Web
         ▼
┌─────────────────┐
│  API Gateway    │
│  (Envoy Proxy)  │
└────────┬────────┘
         │
    ┌────┴────┬────────┬────────┬────────┬────────┐
    ▼         ▼        ▼        ▼        ▼        ▼
┌────────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
│  Auth  │ │ Quiz │ │ Comm │ │Video │ │ Pay  │ │ BFF  │
│Service │ │Service│ │Service│ │ AI  │ │Service│ │Service│
└───┬────┘ └──┬───┘ └──┬───┘ └──┬───┘ └──┬───┘ └──┬───┘
    │         │        │        │        │        │
    └─────────┴────────┴────────┴────────┴────────┘
                       │
                  ┌────▼────┐
                  │  Kafka  │
                  │ Events  │
                  └─────────┘
```

### 1. Auth Service (Go)
- 사용자 인증/인가
- JWT 토큰 발급
- 사용자 프로필 관리

### 2. Quiz Service (Go)
- 퀴즈 문제 관리
- 답변 검증
- XP/코인 보상 계산
- 스트릭 관리

### 3. Community Service (Go)
- 게시글 CRUD
- 좋아요/댓글
- 피드 조회

### 4. Video Analysis Service (Python)
- 비디오 업로드 처리
- AI 딥페이크 분석
- SageMaker 연동
- 분석 결과 반환

### 5. Payment Service (Go)
- 구독 결제 처리
- 결제 이력 관리

### 6. Dashboard BFF (Go)
- 프론트엔드 전용 집계 API
- 여러 서비스 데이터 통합

## 이벤트 기반 통신

### 주요 이벤트
- `user.registered` - 회원가입 완료
- `quiz.answered` - 퀴즈 답변 제출
- `video.uploaded` - 비디오 업로드
- `analysis.completed` - 분석 완료
- `payment.completed` - 결제 완료
- `xp.earned` - 경험치 획득

## 데이터베이스 설계

각 서비스는 독립적인 데이터베이스 스키마 사용 (Database per Service)

### Auth DB
- users
- sessions

### Quiz DB
- questions
- user_answers
- user_stats

### Community DB
- posts
- comments
- likes

### Video Analysis DB
- analysis_tasks
- analysis_results

### Payment DB
- subscriptions
- transactions

## 로컬 개발 환경

```bash
# 전체 서비스 실행
docker-compose up

# 개별 서비스 실행
docker-compose up auth-service
docker-compose up video-analysis-service
```

## API 설계 원칙

1. **높은 응집도**: 각 서비스는 단일 책임
2. **낮은 결합도**: 이벤트 기반 비동기 통신
3. **독립 배포**: 서비스별 독립적 배포 가능
4. **장애 격리**: 한 서비스 장애가 전체에 영향 없음
