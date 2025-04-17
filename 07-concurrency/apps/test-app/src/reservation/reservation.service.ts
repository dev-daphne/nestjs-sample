import {
  // BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReservationRepository } from './reservation.repository';
// import { PrismaService } from '@lib/prisma';

@Injectable()
export class ReservationService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    // private readonly prisma: PrismaService,
  ) {}

  /** 예약 조회 */
  async getReservationInfo(reservationId: number) {
    const reservation =
      await this.reservationRepository.getReservationInfo(reservationId);
    if (!reservation) throw new NotFoundException('존재하지 않는 예약입니다.');

    return reservation;
  }

  /** 예약 요청 */
  reserveEvent(eventId: number, userId: number) {
    //   return this.prisma.$transaction(async () => {
    //     const event = await this.eventRepository.findById(eventId);
    //     if (!event) throw new NotFoundException();
    //     const count = await this.reservationRepository.countByEventId(eventId);
    //     if (count >= event.maxTickets) throw new Error('매진');
    //     return this.reservationRepository.createReservation(eventId, userId);
    //   });
    console.log(eventId, userId);
    return true;
  }
}
