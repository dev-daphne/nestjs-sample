# 07 NestJS Concurrency

NestJS에서 동시성 제어를 테스트 해보는 예제입니다.

## 📋 프로젝트 개요

이 프로젝트는 이벤트 예약 시스템을 통해 동시성 제어 기법을 학습할 수 있는 프로젝트입니다. 대량의 동시 요청이 발생하는 상황에서 데이터의 일관성을 보장하는 방법을 실습할 수 있습니다.

### 주요 학습 내용

- 데이터베이스 트랜잭션을 활용한 동시성 제어
- k6를 활용한 동시성 테스트
- Race Condition 발생 상황과 해결 방법
- PostgreSQL의 ACID 특성 활용

## 🛠️ 기술 스택

- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Language**: TypeScript
- **Load Testing**: k6
- **Container**: Docker

## 📁 프로젝트 구조

```
07-concurrency/
├── docker-compose.yml # Docker Compose 설정
├── apps/
│ └── test-app/ # 메인 애플리케이션
│ ├── src/
│ │ ├── app.module.ts
│ │ ├── main.ts
│ │ ├── user/ # 사용자 관리
│ │ │ ├── dto/
│ │ │ ├── user.controller.ts
│ │ │ ├── user.service.ts
│ │ │ ├── user.repository.ts
│ │ │ └── user.module.ts
│ │ ├── event/ # 이벤트 관리
│ │ │ ├── dto/
│ │ │ ├── event.controller.ts
│ │ │ ├── event.service.ts
│ │ │ ├── event.repository.ts
│ │ │ └── event.module.ts
│ │ └── reservation/ # 예약 관리
│ │ ├── dto/
│ │ ├── reservation.controller.ts
│ │ ├── reservation.service.ts
│ │ ├── reservation.repository.ts
│ │ ├── reservation.enum.ts
│ │ └── reservation.module.ts
│ └── tsconfig.app.json
├── prisma/
│ └── schema.prisma # 데이터베이스 스키마
├── k6-test/
│ └── k6-test.ts # k6 부하 테스트 스크립트
├── user-sign-up.ts # 대량 사용자 생성 스크립트
├── environments/ # 환경변수 설정 (별도 생성 필요)
└── package.json
```

## 🚀 설치 및 실행

### 사전 요구사항

- Node.js (v22 이상)
- pnpm
- Docker & Docker Compose
- k6 (부하 테스트용)

### 로컬 실행 방법

#### 1. 환경 설정

`environments/.env.local` 파일 생성:

```env
# 서비스 구성
SERVICE_PORT=3001
ENVIRONMENT=local

# 데이터베이스 구성
DATABASE_URL=postgresql://postgres:daphne@localhost:5432/postgres
```

#### 2. 데이터베이스 설정

```bash
# Docker로 PostgreSQL 실행
docker compose up -d

# 의존성 설치
pnpm install

# Prisma 설정
pnpm prisma:generate
pnpm prisma:push:local
```

#### 3. 애플리케이션 실행

```bash
pnpm start:local
```

서버가 실행되면:

- 서버: `http://localhost:3001`
- Swagger 문서: `http://localhost:3001/api`

## 🧪 동시성 테스트

### 1. 대량 사용자 생성

동시성 테스트 전에 더미 사용자 1만명을 생성해둔다.

```bash
# user-sign-up.ts 스크립트로 1만 명의 사용자 생성
npx ts-node user-sign-up.ts
```

### 2. k6 부하 테스트

```bash
# k6 설치 (macOS)
brew install k6

# 부하 테스트 실행
k6 run k6-test/k6-test.ts
```

**테스트 시나리오**

- 1초 동안 10,000개의 동시 예약 요청

## 🔄 동시성 제어 메커니즘

### Race Condition 방지

1. **트랜잭션 격리**: Prisma 트랜잭션으로 원자성 보장
2. **재고 확인**: 예약 전 잔여 티켓 수 확인
3. **데이터 일관성**: ACID 특성을 활용한 데이터 무결성 보장
