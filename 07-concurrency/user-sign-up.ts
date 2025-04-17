import axios from 'axios';

const BASE_URL = 'http://localhost:8080/user';
const TOTAL_USERS = 1_000_000;
const BATCH_SIZE = 500; // 배치 크기 증가
const CONCURRENT_BATCHES = 10; // 동시 처리할 배치 수
const DELAY_MS = 10; // 대기 시간 감소

function generateUser(i: number) {
  return {
    email: `user${i}@example.com`,
    name: `User${i}`,
  };
}

async function createBatch(startIndex: number, count: number) {
  const requests: Promise<any>[] = [];
  for (let i = 0; i < count; i++) {
    const user = generateUser(startIndex + i);
    requests.push(
      axios
        .post(BASE_URL, user)
        .catch((err: { response?: { status: number }; message: string }) => {
          console.error(
            `Failed [${user.email}]:`,
            err.response?.status || err.message,
          );
        }),
    );
  }

  await Promise.all(requests);
  console.log(`✅ Batch ${startIndex} ~ ${startIndex + count - 1} 완료`);
}

async function processBatches(startIndex: number, batchCount: number) {
  const promises = [];
  for (let i = 0; i < batchCount; i++) {
    const currentIndex = startIndex + i * BATCH_SIZE;
    if (currentIndex >= TOTAL_USERS) break;
    const count = Math.min(BATCH_SIZE, TOTAL_USERS - currentIndex);
    promises.push(createBatch(currentIndex, count));
  }
  await Promise.all(promises);
}

void (async () => {
  console.log(`총 ${TOTAL_USERS.toLocaleString()}명 사용자 생성 시작...`);

  for (let i = 0; i < TOTAL_USERS; i += BATCH_SIZE * CONCURRENT_BATCHES) {
    await processBatches(i, CONCURRENT_BATCHES);
    await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
  }

  console.log('🎉 모든 사용자 생성 완료!');
})();
