# 06 NestJS Redis Queue

NestJS에서 Redis로 Queue를 사용하는 예제입니다.

## 로컬에서 테스트하기

### 설정

**producer** 설정
`06-redis-queue/producer/environments` 폴더에 `.env.local` 파일을 통해 설정합니다.

**consumer** 설정
`06-redis-queue/consumer/environments` 폴더에 `.env.local` 파일을 통해 설정합니다.

### 실행방법

**producer** 실행

`06-redis-queue/producer` 위치에서 아래 명령어 실행

```bash
pnpm install
pnpm prisma:generate
pnpm prisma:push:local
```

**consumer** 실행

`06-redis-queue/consumer` 위치에서 아래 명령어 실행

```bash
pnpm install
pnpm prisma:generate
pnpm prisma:push:local
```

## Docker Compose로 띄워보기

`Docker Compose`로 한 번에 띄울려면 아래와 같은 세팅이 필요합니다.

### 설정

**producer** 설정
`06-redis-queue/producer/environments` 폴더에 `.env.dev` 파일을 통해 설정합니다.

**consumer** 설정
`06-redis-queue/consumer/environments` 폴더에 `.env.dev` 파일을 통해 설정합니다.

```bash
docker compose up -d
```

docker compose로 띄운 `postgres`에 스키마가 구성되어 있지 않기 때문에 스키마 구성을 아래 과정 진행

`06-redis-queue/producer` 위치에서 아래 명령어 실행

```bash
pnpm install
pnpm prisma:generate
pnpm prisma:push:local
```
