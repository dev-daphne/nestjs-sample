import http from 'k6/http';
import { check } from 'k6';
import { Counter } from 'k6/metrics';

const successfulBookings = new Counter('successful_bookings');
const failedBookings = new Counter('failed_bookings');

export const options = {
  scenarios: {
    stress_test: {
      executor: 'ramping-arrival-rate',
      preAllocatedVUs: 10000,
      timeUnit: '1s',
      stages: [
        { duration: '1s', target: 0 }, // 준비
        { duration: '1s', target: 10000 }, // 순간적으로 10000개 요청
        { duration: '1s', target: 0 }, // 마무리
      ],
    },
  },
  thresholds: {
    successful_bookings: ['count>0'], // 성공적인 예약 수 추적
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
