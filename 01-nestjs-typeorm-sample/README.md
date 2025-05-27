# 01 NestJS TypeORM Sample

NestJS에서 TypeORM을 사용한 데이터베이스 연동 기본 예제입니다.

## 📋 프로젝트 개요

이 프로젝트는 NestJS와 TypeORM을 연동하여 기본적인 CRUD 작업을 수행하는 방법을 학습할 수 있습니다.

### 주요 학습 내용

- TypeORM 설정 및 연동
- Entity 정의 및 관계 설정

## 🛠️ 기술 스택

- **Framework**: NestJS
- **ORM**: TypeORM
- **Database**: MySQL
- **Language**: TypeScript

## 📁 프로젝트 구조

```
src/
├── app.module.ts # 메인 애플리케이션 모듈
├── main.ts # 애플리케이션 진입점
├── users/ # User
└── posts/ # Post
```

## 🚀 설치 및 실행

### 사전 요구사항

- Node.js (v22 이상)
- pnpm
- MySQL

### 1. 의존성 설치

```bash
pnpm install
```

### 2. 환경 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 설정하세요:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name

SERVICE_PORT=4000
```

### 3. 데이터베이스 설정

서버 실행 시 환경변수의 NODE_ENV 값이 `prod`가 아닌 경우 TypeORM에서 자동으로 마이그레이션하여 테이블 생성

### 4. 애플리케이션 실행

```bash
pnpm start:dev
```

## 📚 API 엔드포인트

애플리케이션이 실행되면 `http://localhost:4000/api`에서 Swagger docs를 확인할 수 있습니다.
