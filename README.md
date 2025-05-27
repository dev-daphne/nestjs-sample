# NestJS Sample

NestJS 프레임워크를 활용한 다양한 기능과 패턴을 학습하기 위한 예제 프로젝트 모음입니다.

## 📋 프로젝트 개요

이 저장소는 NestJS의 핵심 기능들을 단계별로 학습할 수 있도록 구성된 예제 프로젝트들을 포함하고 있습니다. 각 프로젝트는 독립적으로 실행 가능하며, 실무에서 자주 사용되는 패턴과 기술들을 다룹니다.

## 🗂️ 프로젝트 구조

### [01-nestjs-typeorm-sample](./01-nestjs-typeorm-sample)

- **주제**: TypeORM 연동
- **내용**: NestJS에서 TypeORM을 사용한 데이터베이스 연동 기본 예제
- **기술 스택**: NestJS, TypeORM, MySQL

### [02-nestjs-config-setting](./02-nestjs-config-setting)

- **주제**: 환경 설정 관리
- **내용**: NestJS ConfigModule을 활용한 환경별 설정 관리
- **기술 스택**: NestJS, ConfigModule

### [03-http-service](./03-http-service)

- **주제**: HTTP 클라이언트 서비스
- **내용**: 외부 API 호출을 위한 HTTP 서비스 구현
- **기술 스택**: NestJS, HttpModule, Axios

### [04-jwt](./04-jwt)

- **주제**: JWT 인증
- **내용**: JWT를 활용한 사용자 인증 및 권한 관리
- **기술 스택**: NestJS, JWT, Passport

### [05-redis-cache](./05-redis-cache)

- **주제**: Redis 캐싱
- **내용**: Redis를 활용한 캐싱 구현
- **기술 스택**: NestJS, Redis, Prisma

### [06-redis-queue](./06-redis-queue)

- **주제**: Redis 큐 시스템
- **내용**: BullMQ를 활용한 비동기 작업 처리 시스템
- **기술 스택**: NestJS, Redis, BullMQ, Prisma
- **특징**: Producer/Consumer 패턴, Docker Compose 지원

### [07-concurrency](./07-concurrency)

- **주제**: 동시성 제어
- **내용**: 대용량 트래픽 환경에서의 동시성 제어 및 성능 테스트
- **기술 스택**: NestJS, Prisma, PostgreSQL, k6
- **특징**: 모노레포 구조, 부하 테스트, 트랜잭션 관리

## 🚀 시작하기

### 사전 요구사항

- Node.js (v18 이상)
- pnpm 또는 npm
- Docker & Docker Compose (일부 프로젝트)
- PostgreSQL (로컬 또는 Docker)
- Redis (일부 프로젝트)

### 설치 및 실행

각 프로젝트는 독립적으로 실행됩니다. 원하는 프로젝트 디렉토리로 이동하여 해당 README를 참고하세요.

```bash
# 예시: TypeORM 예제 실행
cd 01-nestjs-typeorm-sample
npm install
npm run start
```

## 🛠️ 주요 학습 내용

### 기본 개념

- NestJS 모듈 시스템
- 의존성 주입 (Dependency Injection)
- 데코레이터 활용
- 미들웨어 및 가드

### 데이터베이스

- TypeORM과 Prisma ORM
- 데이터베이스 마이그레이션
- Repository 패턴
- 트랜잭션 관리

### 성능 및 확장성

- Redis 캐싱 전략
- 큐 시스템을 통한 비동기 처리
- 동시성 제어
- 부하 테스트 (k6)

### 보안

- JWT 기반 인증
- 권한 관리
- 환경 변수 관리

### 아키텍처

- 모노레포 구조
- 마이크로서비스 패턴
- Producer/Consumer 패턴

## 📚 참고 자료

- [NestJS 공식 문서](https://docs.nestjs.com/)
- [TypeORM 문서](https://typeorm.io/)
- [Prisma 문서](https://www.prisma.io/docs/)
- [BullMQ 문서](https://docs.bullmq.io/)

## 🤝 기여하기

이 프로젝트는 NestJS 학습 목적으로 만들어졌습니다. 개선사항이나 오류 발견 시 언제든 피드백 부탁드립니다!

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.
