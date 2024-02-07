# Hydrogen  Node.js 18.x Bilder
FROM node:hydrogen-alpine AS builder

# 앱 디렉터리 생성
WORKDIR /build

# 앱 의존성 설치 use pnpm
COPY ./ ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# 앱 빌드
RUN pnpm run build


# Hydrogen  Node.js 18.x App
FROM node:hydrogen-alpine AS app

# NODE_ENV 환경변수 설정
ARG NODE_ENV
RUN echo $NODE_ENV
ENV NODE_ENV=$NODE_ENV

# 앱 디렉터리 생성
WORKDIR /app

# 앱 의존성 설치 use pnpm
COPY ["package.json", "pnpm-lock.yaml", "./"]
RUN npm install -g pnpm
RUN pnpm i --frozen-lockfile -P

# 앱 소스 추가
COPY --from=builder /build/dist ./dist
COPY --from=builder /build/environments ./environments
COPY --from=builder /build/prisma ./prisma

RUN pnpm run prisma:generate

ENTRYPOINT [ "node", "dist/main" ]