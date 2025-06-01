# 04 NestJS JWT

NestJS에서 JWT 인증을 구현하는 기본 예제입니다.

## 📋 프로젝트 개요

이 프로젝트는 NestJS에서 JWT(JSON Web Token)를 활용한 인증 시스템을 구현하는 방법을 학습할 수 있습니다.

### 주요 학습 내용

- JWT 토큰 생성 및 검증
- Passport JWT 전략 구현
- 커스텀 가드(Guard) 및 데코레이터 생성
- JWT 기반 인증이 필요한 API 보호

## 🛠️ 기술 스택

- **Framework**: NestJS
- **Authentication**: JWT, Passport
- **Language**: TypeScript
- **API Documentation**: Swagger

## 📁 프로젝트 구조

```
src/
├── app.module.ts              # 메인 애플리케이션 모듈
├── main.ts                    # 애플리케이션 진입점
└── users/                     # 사용자 관련 기능
    ├── dto/
    │   └── user-login.dto.ts  # 로그인 DTO
    ├── auth/
    │   └── users-auth.service.ts  # JWT 토큰 생성 서비스
    ├── users.controller.ts    # 사용자 컨트롤러
    ├── users.module.ts        # 사용자 모듈
    └── users.service.ts       # 사용자 서비스

library/                       # 공통 라이브러리
└── guards/
    └── auth/
        ├── jwt/
        │   ├── jwt-token.guard.ts        # JWT 가드
        │   ├── jwt-token.module.ts       # JWT 모듈
        │   ├── jwt-token.service.ts      # JWT 서비스
        │   ├── jwt-user-id.decorators.ts # 사용자 ID 데코레이터
        │   └── type/
        │       └── token.type.ts         # 토큰 타입 정의
        └── strategy/             # Passport 전략들
```

## 🚀 설치 및 실행

### 사전 요구사항

- Node.js (v22 이상)
- pnpm

### 1. 의존성 설치

```bash
pnpm install
```

### 2. 환경 설정

환경변수 설정을 위해 `/environments/.env.local` 파일이 이미 준비되어 있습니다:

```env
APP_PORT=4000
JWT_SECRET_KEY='test-key'
JWT_EXPIRES_IN=3600s
```

### 3. 애플리케이션 실행

```bash
# 로컬 환경 변수와 함께 실행
pnpm start:local
```

## 📚 API 엔드포인트

- 서버: `http://localhost:4000`
- Swagger 문서: `http://localhost:4000/api`

### 인증

#### POST /users/login

사용자 로그인 및 JWT 토큰 발급
현재 프로젝트에는 JWT 테스트만을 위해 요청 시 `userId: 1`의 accessToken이 발급됨

**Response:**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

발급한 accessToken으로 Swagger 문서에서 넣어서 확인할 수 있다.

#### GET /users/me

인증된 사용자 정보 조회 (JWT 토큰 필요)

**Headers:**

```
Authorization: Bearer {your_jwt_token}
```

**Response:**

```json
{
  "userId": 1
}
```

## 🔐 JWT 인증 플로우

1. 로그인: 사용자가 ID/Password로 로그인
2. 토큰 발급: 서버에서 JWT 토큰 생성 및 반환
3. 토큰 사용: 클라이언트가 Authorization 헤더에 Bearer 토큰 포함
4. 토큰 검증: JWT 가드에서 토큰 유효성 검증
5. 사용자 정보 추출: 토큰에서 사용자 정보 추출 및 데코레이터로 주입

## 🛡️ 보안 기능

- JWT 토큰 기반 인증: Stateless 인증 방식
- 토큰 만료 시간: 1시간 (3600초)
- 커스텀 가드: `@UseGuards(JwtAccessToken)` 데코레이터로 보호
- 사용자 정보 추출: `@JwtUserId()` 데코레이터로 토큰 정보 접근

## 📖 주요 컴포넌트

### JwtTokenService

JWT 토큰 생성 및 검증을 담당하는 서비스

### JwtAccessToken Guard

JWT 토큰 기반 인증을 처리하는 가드

### @JwtUserId() Decorator

JWT 토큰에서 사용자 정보를 추출하여 컨트롤러에 주입하는 커스텀 데코레이터

## 📝 참고사항

- 현재 구현은 학습 목적으로 간소화되어 있습니다
- 실제 프로덕션 환경에서는 다음을 고려해야 합니다:
  - 실제 데이터베이스와의 사용자 인증
  - 토큰 갱신(Refresh Token) 메커니즘
  - 보다 강력한 JWT Secret Key
  - 토큰 블랙리스트 관리
  - Rate Limiting
