import axios from 'axios';

const BASE_URL = 'http://localhost:3001/user';
const TOTAL_USERS = 10_000;
const BATCH_SIZE = 100; // 배치 크기를 줄여서 빠른 피드백
const DELAY_MS = 10; // 대기 시간

function generateUser(i: number) {
  return {
    email: `user${i}@example.com`,
    name: `User${i}`,
  };
}

async function createBatch(startIndex: number, count: number) {
  console.log(`Batch ${startIndex} ~ ${startIndex + count - 1} 시작...`);

  for (let i = 0; i < count; i++) {
    const user = generateUser(startIndex + i);
    try {
      await axios.post(BASE_URL, user);
    } catch {
      // 에러 무시하고 계속 진행
    }
  }

  console.log(`Batch ${startIndex} ~ ${startIndex + count - 1} 완료`);
}

void (async () => {
  console.log(`총 ${TOTAL_USERS.toLocaleString()}명 사용자 생성 시작...`);

  for (let i = 0; i < TOTAL_USERS; i += BATCH_SIZE) {
    const count = Math.min(BATCH_SIZE, TOTAL_USERS - i);
    await createBatch(i + 1, count); // 1부터 시작하도록 +1
    await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
  }

  console.log('모든 사용자 생성 완료!');
})();
