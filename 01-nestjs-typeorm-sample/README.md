# 01 NestJS TypeORM Sample

NestJS에서 TypeORM을 사용한 데이터베이스 연동 기본 예제입니다.

## 📋 프로젝트 개요

이 프로젝트는 NestJS와 TypeORM을 연동하여 기본적인 CRUD 작업을 수행하는 방법을 학습할 수 있습니다.

### 주요 학습 내용
- TypeORM 설정 및 연동
- Entity 정의 및 관계 설정
- Repository 패턴 구현
- 데이터베이스 마이그레이션
- 환경별 데이터베이스 설정

## 🛠️ 기술 스택

- **Framework**: NestJS
- **ORM**: TypeORM
- **Database**: PostgreSQL/MySQL
- **Language**: TypeScript

## 📁 프로젝트 구조
src/
├── app.module.ts # 메인 애플리케이션 모듈
├── main.ts # 애플리케이션 진입점
├── entities/ # TypeORM 엔티티
├── modules/ # 기능별 모듈
└── config/ # 데이터베이스 설정

## 🚀 설치 및 실행

### 사전 요구사항
- Node.js (v16 이상)
- npm 또는 yarn
- PostgreSQL 또는 MySQL

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 설정
프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 설정하세요:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name
```

### 3. 데이터베이스 설정
```bash
# 데이터베이스 생성 (PostgreSQL 예시)
createdb your_database_name
```

### 4. 애플리케이션 실행
```bash
# 개발 모드
npm run start:dev

# 프로덕션 모드
npm run start:prod
```

## 📚 API 엔드포인트

애플리케이션이 실행되면 `http://localhost:3000`에서 다음 엔드포인트를 사용할 수 있습니다:

- `GET /users` - 모든 사용자 조회
- `POST /users` - 새 사용자 생성
- `GET /users/:id` - 특정 사용자 조회
- `PUT /users/:id` - 사용자 정보 수정
- `DELETE /users/:id` - 사용자 삭제