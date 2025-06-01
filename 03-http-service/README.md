# 03 NestJS HTTP Service

NestJS에서 HttpService(@nestjs/axios)를 사용한 외부 HTTP 요청 처리 예제입니다.

## 📋 프로젝트 개요

이 프로젝트는 NestJS의 HttpService를 활용하여 외부 API 호출과 RxJS Observable을 이용한 비동기 처리 방법을 학습할 수 있습니다.

### 주요 학습 내용

- @nestjs/axios를 이용한 HTTP 클라이언트 구현
- RxJS Observable을 활용한 비동기 처리
- forkJoin을 이용한 병렬 요청 처리
- HttpModule 설정 (timeout, maxRedirects)

## 🛠️ 기술 스택

- **Framework**: NestJS
- **HTTP Client**: @nestjs/axios (Axios 기반)
- **Reactive**: RxJS
- **Language**: TypeScript

## 📁 프로젝트 구조

```
src/
├── app.module.ts # 메인 애플리케이션 모듈
├── main.ts # 애플리케이션 진입점
└── posts/ # Posts 모듈
├── posts.controller.ts # Posts API 컨트롤러
├── posts.service.ts # HTTP 요청 서비스
└── posts.module.ts # Posts 모듈 설정
```

## 🚀 설치 및 실행

### 사전 요구사항

- Node.js (v22 이상)
- pnpm

### 1. 의존성 설치

```bash
pnpm install
```

### 2. 애플리케이션 실행

```bash
# 개발 모드 실행
pnpm start:dev
```

## 📚 API 엔드포인트

애플리케이션이 실행되면 `http://localhost:4000/api`에서 Swagger docs를 확인할 수 있습니다.
