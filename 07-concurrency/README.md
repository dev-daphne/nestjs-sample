# 07 NestJS Concurrency

NestJS에서 동시성 제어를 테스트 해보는 예제입니다.

## 로컬에서 테스트하기

### 설정

`07-concurrency/environments` 폴더에 `.env.local` 파일을 통해 설정합니다.

### 실행방법

```bash
pnpm install
pnpm prisma:generate
pnpm prisma:push:local
```

### 실행

```bash
pnpm start:local
```
