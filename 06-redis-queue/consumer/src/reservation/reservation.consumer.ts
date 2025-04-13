import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { ReservationService } from './reservation.service';

@Processor('reservation-queue')
export class ReservationConsumer extends WorkerHost {
  constructor(private readonly reservationService: ReservationService) {
    super();
  }

  private readonly logger = new Logger(ReservationConsumer.name);

  async process(job: Job<any>) {
    const { userId, eventId } = job.data;

    try {
      this.logger.log(
        `${job.id} 작업을 수신했습니다. userId : ${userId}, eventId : ${eventId}`,
      ); // 작업 수신을 잘했는지 확인하기 위한 로그

      await this.reservationService.reserveTicket(eventId, userId);
    } catch (error) {
      this.logger.error(`Error processing reservation: ${error.message}`);
      // 필요시 추가적인 에러 처리 로직 구현
    }
  }
}
