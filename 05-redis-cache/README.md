# 05 NestJS Redis Cache

NestJS에서 Redis를 활용한 캐싱 시스템을 구현하는 기본 예제입니다.

## 📋 프로젝트 개요

이 프로젝트는 NestJS에서 Redis를 캐시 레이어로 활용하여 데이터베이스 조회 성능을 최적화하는 방법을 학습할 수 있습니다.

### 주요 학습 내용

- Redis를 활용한 캐싱 구현
- 캐시 히트/미스 처리 로직
- TTL(Time To Live) 설정
- Prisma와 Redis 연동
- 성능 최적화 전략

## 🛠️ 기술 스택

- **Framework**: NestJS
- **Database**: MySQL
- **ORM**: Prisma
- **Cache**: Redis
- **Language**: TypeScript
- **API Documentation**: Swagger

## 📁 프로젝트 구조

```
src/
├── app.module.ts              # 메인 애플리케이션 모듈
├── main.ts                    # 애플리케이션 진입점
├── lib/                       # 공통 라이브러리
│   ├── prisma/               # Prisma 서비스
│   ├── logging/              # 로깅 인터셉터
│   └── redis-cache/          # Redis 캐시 모듈
│       ├── redis-cache.module.ts    # Redis 캐시 모듈
│       └── redis-cache.service.ts   # Redis 캐시 서비스
└── post/                     # 게시글 관련 기능
    ├── dto/
    │   ├── create-post.dto.ts     # 게시글 생성 DTO
    │   └── get-post.dto.ts        # 게시글 조회 DTO
    ├── post.controller.ts     # 게시글 컨트롤러
    ├── post.module.ts         # 게시글 모듈
    ├── post.service.ts        # 게시글 서비스
    └── post.interface.ts      # 게시글 인터페이스

prisma/
└── schema.prisma             # Prisma 데이터베이스 스키마
```

## 🚀 설치 및 실행

### 사전 요구사항

- Node.js (v22 이상)
- pnpm
- MySQL
- Redis

### 1. 의존성 설치

```bash
pnpm install
```

### 2. 환경 설정

`environments/.env.local` 파일을 생성하고 다음 내용을 설정하세요:

```env
# 서비스 구성
ENVIRONMENT=local
SERVICE_NAME=NEST_SAMPLE
SERVICE_PORT=4000

# DB 구성
DATABASE_URL=mysql://root:root@localhost:3306/nestjs_redis_cache

# Redis 구성
REDIS_CACHE_HOST=localhost
REDIS_CACHE_PORT=6379
REDIS_CACHE_PASSWORD=
```

### 3. 데이터베이스 설정

```bash
# Prisma 클라이언트 생성
pnpm prisma:generate

# 데이터베이스 스키마 동기화
pnpm prisma:push:local
```

### 4. Redis 서버 실행

로컬에서 Redis 서버를 실행해야 합니다:

```bash
# Docker를 사용하는 경우
docker run -d -p 6379:6379 redis:7-alpine

# 또는 로컬 Redis 설치 후
redis-server
```

### 5. 애플리케이션 실행

```bash
# 로컬 환경으로 실행
pnpm start:local
```

애플리케이션이 실행되면:

- 서버: `http://localhost:4000`
- Swagger 문서: `http://localhost:4000/api`

## 📚 API 엔드포인트

### 게시글 관리

#### GET /post/:id

게시글 조회 (캐시 우선 조회)

**캐시 전략:**

1. Redis에서 `post_{id}` 키로 캐시 조회
2. 캐시 히트: 캐시된 데이터 반환
3. 캐시 미스: DB 조회 → Redis 캐싱 (TTL: 60초) → 데이터 반환

**Parameters:**

- `id` (number): 게시글 ID

**Response:**

```json
{
  "id": 1,
  "title": "게시글 제목",
  "content": "게시글 내용"
}
```

#### POST /post

게시글 생성

**Request Body:**

```json
{
  "title": "새 게시글 제목",
  "content": "새 게시글 내용"
}
```

**Response:**

```json
{
  "id": 1,
  "title": "새 게시글 제목",
  "content": "새 게시글 내용"
}
```

## 🔄 캐싱 메커니즘

### 캐시 키 전략

- **패턴**: `post_{id}`
- **예시**: `post_1`, `post_2`, `post_100`

### TTL(Time To Live) 설정

- **기본 TTL**: 300초 (5분)
- **게시글 캐시 TTL**: 60초 (1분)

### 캐시 플로우

1. **조회 요청**: 클라이언트가 게시글 조회 요청
2. **캐시 확인**: Redis에서 해당 키 존재 여부 확인
3. **캐시 히트**: 캐시된 데이터가 있으면 즉시 반환
4. **캐시 미스**: 캐시된 데이터가 없으면:
   - MySQL에서 데이터 조회
   - 조회된 데이터를 Redis에 캐싱
   - 클라이언트에 데이터 반환

## 📖 주요 컴포넌트

### RedisCacheService

Redis 캐시 작업을 담당하는 서비스로 다음 메서드를 제공합니다:

- `get(key: string)`: 캐시 조회
- `set({ key, value, ttl })`: 캐시 저장
- `del(key: string)`: 캐시 삭제

### PostService

게시글 비즈니스 로직을 처리하며 캐시 우선 조회 전략을 구현합니다.

## 🔧 데이터베이스 스키마

```sql
-- Post 테이블
CREATE TABLE Post (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  content TEXT
);
```

## 📊 성능 최적화 효과

### 캐시 사용 전후 비교

- **캐시 미스**: DB 조회 시간 (일반적으로 10-50ms)
- **캐시 히트**: Redis 조회 시간 (일반적으로 1-5ms)
- **성능 향상**: 약 10~50배 빠른 응답 시간

### 모니터링 포인트

- 캐시 히트율 (Cache Hit Ratio)
- 평균 응답 시간
- Redis 메모리 사용량
- TTL 효율성

## 🧪 테스트 시나리오

### 캐시 동작 확인

1. 게시글 생성 후 조회 (캐시 미스)
2. 동일한 게시글 재조회 (캐시 히트)
3. TTL 만료 후 재조회 (캐시 미스)

## 📝 참고사항

- Redis 서버가 실행되지 않으면 애플리케이션이 시작되지 않습니다
- 캐시 데이터는 Redis 서버 재시작 시 삭제됩니다
- 프로덕션 환경에서는 Redis 클러스터 구성을 고려해야 합니다
- 캐시 무효화 전략을 데이터 특성에 맞게 설정해야 합니다
