# 06 NestJS Redis Queue

NestJS에서 Redis와 BullMQ를 활용한 큐 시스템을 구현하는 예제입니다.

## 📋 프로젝트 개요

이 프로젝트는 이벤트 예약 시스템을 통해 Redis 기반의 메시지 큐를 활용한 비동기 작업 처리 방법을 학습할 수 있습니다.

### 주요 학습 내용

- Redis와 BullMQ를 활용한 큐 시스템 구현
- Producer-Consumer 패턴 구현
- 마이크로서비스 간 비동기 통신
- Docker Compose를 활용한 분산 시스템 구성
- 큐 작업 처리 및 모니터링

## 🛠️ 기술 스택

- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Queue**: Redis + BullMQ
- **Language**: TypeScript
- **Container**: Docker

## 📁 프로젝트 구조

```
06-redis-queue/
├── docker-compose.yml         # Docker Compose 설정
├── producer/                  # Producer 서비스 (API 서버)
│   ├── src/
│   │   ├── app.module.ts
│   │   ├── main.ts
│   │   ├── reservation/       # 예약 관련 모듈
│   │   │   ├── dto/
│   │   │   ├── reservation.controller.ts
│   │   │   ├── reservation.service.ts
│   │   │   ├── reservation.repository.ts
│   │   │   └── reservation.module.ts
│   │   ├── user/              # 사용자 관리
│   │   ├── event/             # 이벤트 관리
│   │   └── lib/               # 공통 라이브러리
│   ├── prisma/
│   │   └── schema.prisma      # 데이터베이스 스키마
│   ├── environments/          # 환경변수 설정
│   ├── Dockerfile             # 프로덕션용 Dockerfile
│   ├── Dockerfile.dev         # 개발용 Dockerfile
│   └── package.json
└── consumer/                  # Consumer 서비스 (큐 처리)
    ├── src/
    │   ├── app.module.ts
    │   ├── main.ts
    │   └── reservation/       # 예약 처리 모듈
    │       ├── reservation.consumer.ts  # 큐 컨슈머
    │       ├── reservation.service.ts   # 예약 처리 로직
    │       └── reservation.module.ts
    ├── prisma/
    │   └── schema.prisma
    ├── environments/
    ├── Dockerfile             # 프로덕션용 Dockerfile
    ├── Dockerfile.dev         # 개발용 Dockerfile
    └── package.json
```

## 🚀 설치 및 실행

### 사전 요구사항

- Node.js (v22 이상)
- pnpm
- Docker & Docker Compose

### Docker Compose 개발 환경 실행

#### 1. 환경 설정

`producer/environments/.env.dev` 파일 생성:

```env
SERVICE_PORT=4000
ENVIRONMENT=dev
DATABASE_URL=postgresql://postgres:daphne@db:5432/postgres
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=
```

`consumer/environments/.env.dev` 파일 생성:

```env
ENVIRONMENT=dev
DATABASE_URL=postgresql://postgres:daphne@db:5432/postgres
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=
```

#### 2. Docker Compose 실행

```bash
# 개발 환경으로 모든 서비스 실행 (Producer + Consumer 3개 + Redis + PostgreSQL)
# 실시간 코드 변경 반영 지원
docker compose up -d
```

#### 3. 데이터베이스 스키마 초기화

```bash
cd producer
pnpm install
pnpm prisma:generate
pnpm prisma:push:local
```

### 로컬 실행 방법

#### 1. Producer 서비스 설정

```bash
cd producer
pnpm install
```

`producer/environments/.env.local` 파일을 생성하고 설정:

```env
# 서비스 구성
SERVICE_PORT=4000
ENVIRONMENT=local

# 데이터베이스 구성
DATABASE_URL=postgresql://username:password@localhost:5432/redis_queue_db

# Redis 구성
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
```

```bash
# Prisma 설정
pnpm prisma:generate
pnpm prisma:push:local

# Producer 실행
pnpm start:local
```

#### 2. Consumer 서비스 설정

```bash
cd consumer
pnpm install
```

`consumer/environments/.env.local` 파일을 생성하고 설정:

```env
# 서비스 구성
ENVIRONMENT=local

# 데이터베이스 구성 (Producer와 동일)
DATABASE_URL=postgresql://username:password@localhost:5432/redis_queue_db

# Redis 구성 (Producer와 동일)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
```

```bash
# Prisma 설정
pnpm prisma:generate
pnpm prisma:push:local

# Consumer 실행
pnpm start:local
```

## 📚 API 엔드포인트

Producer 서비스가 실행되면:

- 서버: `http://localhost:8080` (Docker)
- Swagger 문서: `http://localhost:8080/api` (Docker)

### 예약 관리 API

#### POST /reservation/:eventId/:userId

- 이벤트 예약 요청 (큐에 작업 추가)

**Parameters:**

- `eventId` (number): 이벤트 ID
- `userId` (number): 사용자 ID

**Response:**

```json
{
	"name": "reserveEvent",
	"data": {
		"userId": 15001,
		"eventId": 1
	},
	"opts": {
		"attempts": 0,
		"removeOnComplete": true,
		"removeOnFail": true
	},
	"id": "147588",
	"progress": 0,
	"returnvalue": null,
	"stacktrace": null,
	"priority": 0,
	"attemptsStarted": 0,
	"attemptsMade": 0,
	"timestamp": 1748766044279,
	"queueQualifiedName": "bull:reservation-queue"
}
```

#### GET /reservation

- 예약 정보 조회

**Parameters:**

- `eventId` (number): 이벤트 ID
- `userId` (number): 회원 ID

**Response:**

```json
{
	"id": 1111,
	"userId": 15001,
	"status": "RESERVED",
	"reservedAt": "2025-06-01T08:38:22.273Z"
}
```

## 🔄 큐 처리 플로우

### 예약 요청 플로우

1. 클라이언트 요청: `POST /reservation` 엔드포인트 호출
2. Producer 처리: 요청을 받아 Redis 큐에 작업 추가
3. 큐 적재: BullMQ를 통해 `reservation-queue`에 작업 저장
4. Consumer 처리: 3개의 Consumer 인스턴스가 큐에서 작업을 가져와 처리
5. 예약 처리: Consumer가 데이터베이스에 예약 정보 저장
6. 작업 완료: 성공/실패 시 큐에서 작업 제거

### 큐 작업 옵션

- `removeOnComplete: true`: 성공 시 큐에서 자동 제거
- `removeOnFail: true`: 실패 시 큐에서 자동 제거

## 📊 서비스 구성

### Producer 서비스 (Port 8080)

- **역할**: REST API 제공, 큐에 작업 추가
- **기능**: 예약 요청 받기, 예약 정보 조회
- **인스턴스**: 1개

### Consumer 서비스 (백그라운드)

- **역할**: 큐에서 작업을 가져와 실제 예약 처리
- **기능**: 예약 데이터 저장, 비즈니스 로직 처리
- **인스턴스**: 3개 (부하 분산)

### Redis

- **역할**: 메시지 큐 저장소
- **포트**: 6379

### PostgreSQL

- **역할**: 데이터 영구 저장
- **포트**: 5432

## 🔧 주요 컴포넌트

### Producer 측 컴포넌트

#### ReservationService (Producer)

- 큐에 예약 작업 추가
- 예약 정보 조회

#### ReservationController

- REST API 엔드포인트 제공

### Consumer 측 컴포넌트

#### ReservationConsumer

- `@Processor('reservation-queue')` 데코레이터로 큐 리스너 등록
- 큐에서 작업을 받아 처리

#### ReservationService (Consumer)

- 실제 예약 로직 구현
- 데이터베이스에 예약 정보 저장
