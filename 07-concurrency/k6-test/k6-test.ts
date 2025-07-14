import http from 'k6/http';
import { check } from 'k6';
import { Counter } from 'k6/metrics';

const successfulBookings = new Counter('successful_bookings');
const failedBookings = new Counter('failed_bookings');

export const options = {
  scenarios: {
    stress_test: {
      executor: 'shared-iterations',
      vus: 10000,
      iterations: 10000,
      maxDuration: '30s',
    },
  },
  thresholds: {
    successful_bookings: ['count==100'], // 정확히 100개만 성공해야 함
    http_req_duration: ['p(95)<2000'], // 95%의 요청이 2초 내 완료
  },
};

const EVENT_ID = 1; // 이벤트 ID

export default function () {
  const userId = __VU;

  const url = `http://localhost:3001/reservation/${EVENT_ID}/${userId}`;

  const response = http.post(url);

  // 응답 확인
  check(response, {
    'is status 200 or 201': (r) => {
      const success = r.status === 200 || r.status === 201;
      if (success) {
        successfulBookings.add(1);
      } else {
        failedBookings.add(1);
      }
      return success;
    },
  });
}

export function handleSummary(data: any) {
  const successful = Number(data.metrics.successful_bookings.values.count) || 0;
  const failed = Number(data.metrics.failed_bookings.values.count) || 0;
  const total = successful + failed;

  console.log(`\n========== 테스트 결과 ==========`);
  console.log(`총 요청 수: ${total}`);
  console.log(`성공한 예약: ${successful}`);
  console.log(`실패한 예약: ${failed}`);
  console.log(`성공률: ${((successful / total) * 100).toFixed(2)}%`);
  console.log(`================================\n`);

  return {
    stdout: JSON.stringify(data, null, 2),
  };
}
