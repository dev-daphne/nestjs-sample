import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReservationRepository } from './reservation.repository';
import { PrismaService } from '@lib/prisma';
import { EventService } from '../event/event.service';

@Injectable()
export class ReservationService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly eventService: EventService,
    private readonly prisma: PrismaService,
  ) {}

  /** 예약 조회 */
  async getReservationInfo(reservationId: number) {
    const reservation =
      await this.reservationRepository.getReservationInfo(reservationId);
    if (!reservation) throw new NotFoundException('존재하지 않는 예약입니다.');

    return reservation;
  }

  /** 예약 요청 */
  async reserveEvent(eventId: number, userId: number) {
    await this.prisma.$transaction(async () => {
      const event = await this.eventService.getEventInfo(eventId);

      const count = await this.reservationRepository.countByEventId(eventId);
      if (count >= event.maxTickets)
        throw new BadRequestException('매진되었습니다.');

      return this.reservationRepository.reserveEvent(eventId, userId);
    });
  }
}
