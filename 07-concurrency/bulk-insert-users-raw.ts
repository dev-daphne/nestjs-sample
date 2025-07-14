import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// 환경 변수 로드
dotenv.config({ path: resolve(__dirname, 'environments/.env.local') });

const prisma = new PrismaClient();

const TOTAL_USERS = 10_000;

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function insertBatchRaw(
  startIndex: number,
  count: number,
  retries: number = 3,
) {
  console.log(`Inserting batch ${startIndex} ~ ${startIndex + count - 1}...`);
  const startTime = Date.now();

  // VALUES 절 생성
  const values: string[] = [];
  for (let i = 0; i < count; i++) {
    const userIndex = startIndex + i;
    values.push(
      `('User${userIndex}', 'user${userIndex}@example.com', NOW(), NOW())`,
    );
  }

  // Raw SQL 실행
  const query = `
    INSERT INTO "User" (name, email, "createdAt", "updatedAt")
    VALUES ${values.join(', ')}
    ON CONFLICT (email) DO NOTHING
  `;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await prisma.$executeRawUnsafe(query);
      const endTime = Date.now();
      console.log(`Batch complete! Time: ${(endTime - startTime) / 1000}s`);
      return; // 성공시 종료
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(
        `Error in batch ${startIndex} (attempt ${attempt}/${retries}):`,
        errorMessage,
      );

      if (attempt < retries) {
        console.log(`Retrying in ${attempt} seconds...`);
        await sleep(attempt * 1000); // 재시도 전 대기
      } else {
        throw error; // 모든 재시도 실패시 에러 throw
      }
    }
  }
}

async function main() {
  console.log(
    `Starting bulk insert of ${TOTAL_USERS.toLocaleString()} users using raw SQL...`,
  );
  const totalStartTime = Date.now();

  try {
    // 기존 사용자 수 확인
    const existingCount = await prisma.user.count();
    console.log(`Existing users: ${existingCount.toLocaleString()}`);

    // 트랜잭션 최적화를 위한 설정
    await prisma.$executeRaw`SET synchronous_commit = OFF`;
    await prisma.$executeRaw`SET maintenance_work_mem = '256MB'`;

    // 배치 처리
    await insertBatchRaw(1, TOTAL_USERS);

    // 설정 복원
    await prisma.$executeRaw`SET synchronous_commit = ON`;

    // 최종 확인
    const finalCount = await prisma.user.count();
    console.log(`\nFinal user count: ${finalCount.toLocaleString()}`);

    const totalEndTime = Date.now();
    console.log(`Total time: ${(totalEndTime - totalStartTime) / 1000}s`);
    console.log(
      `Average speed: ${Math.round(TOTAL_USERS / ((totalEndTime - totalStartTime) / 1000)).toLocaleString()} users/second`,
    );
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// 실행
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
