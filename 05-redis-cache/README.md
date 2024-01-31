# 05 NestJS Redis Cache

NestJS에서 Redis로 캐시를 사용하는 예제입니다.

# 초기 설정

`/environments` 폴더에 `.env.local` 파일을 통해 설정합니다.

```
# 서비스 구성
ENVIRONMENT=local
SERVICE_NAME=NEST_SAMPLE
SERVICE_PORT=3000

# DB 구성
DATABASE_URL=mysql://root:root@localhost:3306/daphne

# Redis 구성
REDIS_CACHE_HOST=localhost
REDIS_CACHE_PORT=6379
REDIS_CACHE_PASSWORD=
```

# 실행방법

```
pnpm install
pnpm prisma:generate
pnpm prisma:push:local
pnpm start:local
```
