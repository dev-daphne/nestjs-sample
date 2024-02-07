import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { ReservationService } from './reservation.service';

@Processor('reservation-queue')
export class ReservationConsumer {
  constructor(private readonly reservationService: ReservationService) {}

  @Process('reserveEvent')
  async processReservation(job: Job<any>) {
    const { userId, eventId } = job.data;

    try {
      await this.reservationService.reserveTicket(eventId, userId);
    } catch (error) {
      console.error('Error processing reservation:', error.message);
      // 필요시 추가적인 에러 처리 로직 구현
    }
  }
}
