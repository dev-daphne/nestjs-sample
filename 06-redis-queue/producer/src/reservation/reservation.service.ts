import { InjectQueue } from '@nestjs/bullmq';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Queue } from 'bullmq';
import { ReservationRepository } from 'src/reservation/reservation.repository';

@Injectable()
export class ReservationService {
  constructor(
    @InjectQueue('reservation-queue') private reservationQueue: Queue,
    private readonly reservationRepository: ReservationRepository,
  ) {}

  /** 예약 조회 */
  async getReservationInfo(reservationId: number) {
    const reservation = await this.reservationRepository.getReservationInfo(
      reservationId,
    );
    if (!reservation) throw new NotFoundException('존재하지 않는 예약입니다.');

    return reservation;
  }

  /** 예약 요청 */
  async reserveEvent(eventId: number, userId: number) {
    try {
      // 예약 요청을 큐에 적재
      const job = await this.reservationQueue.add(
        'reserveEvent',
        {
          userId,
          eventId,
        },
        {
          removeOnComplete: true, // 성공 시 큐에서 제거
          removeOnFail: true, // 실패시 큐에서 제거
        },
      );

      return job;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
