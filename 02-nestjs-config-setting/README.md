# 02 NestJS Config Setting

NestJS에서 다양한 환경 설정을 관리하는 방법을 보여주는 샘플 프로젝트입니다.

## 📋 프로젝트 개요

이 프로젝트는 NestJS 애플리케이션에서 환경별 설정을 구성하고 관리하는 방법을 학습할 수 있습니다.

### 주요 학습 내용

- @nestjs/config를 사용한 환경 변수 관리
- 모듈화된 설정 구성
- Joi를 활용한 환경 변수 유효성 검증
- 서로 다른 환경(local, dev, prod)에 따른 설정 분리

## 🛠️ 기술 스택

- **Framework**: NestJS
- **ORM**: TypeORM
- **Database**: MySQL
- **Language**:TypeScript

## 📁 프로젝트 구조

```
src/
├── config/                # 설정 관련 모듈
│   ├── app/               # 애플리케이션 기본 설정
│   │   ├── config.module.ts
│   │   ├── config.service.ts
│   │   └── configuration.ts
│   └── database/          # 데이터베이스 설정
│       └── mysql/         # MySQL 관련 설정
│           ├── config.module.ts
│           ├── config.service.ts
│           └── configuration.ts
├── health/                # 헬스 체크 관련 컨트롤러
├── app.controller.ts      # 기본 컨트롤러
├── app.module.ts          # 루트 모듈
└── main.ts                # 애플리케이션 진입점
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

프로젝트 루트에 `local.env` 파일을 생성하고 다음 내용을 설정하세요:

```env
APP_ENV=local
APP_NAME=api
APP_PORT=4000

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root
DB_NAME=daphne
```

### 3. 애플리케이션 실행

```bash
pnpm start:local
```

## 📚 API 엔드포인트

애플리케이션이 실행되면 `http://localhost:4000/api`에서 Swagger docs를 확인할 수 있습니다.

swagger ui에서 `GET http://localhost:4000/health` 요청을 하면 다음과 같이 서버의 설정 정보와 연결 상태를 확인할 수 있습니다.

```
{
  "status": "Success",
  "app_name": "api",
  "app_version": "app_version",
  "app_env": "local",
  "current_date": "2025. 5. 27. 오후 10:48:56",
  "database_connect_result": {
    "status": "ok",
    "info": {
      "mysql": {
        "status": "up"
      }
    },
    "error": {

    },
    "details": {
      "mysql": {
        "status": "up"
      }
    }
  },
  "ping_check_result": {
    "status": "ok",
    "info": {
      "test": {
        "status": "up"
      }
    },
    "error": {

    },
    "details": {
      "test": {
        "status": "up"
      }
    }
  }
}
```
