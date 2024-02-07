import { BadRequestException, Injectable } from '@nestjs/common';
import { EventService } from 'src/event/event.service';
import { ReservationRepository } from 'src/reservation/reservation.repository';

@Injectable()
export class ReservationService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly eventService: EventService,
  ) {}

  /** 티켓 예매 */
  async reserveTicket(eventId: number, userId: number) {
    // 이미 예약했는지 확인
    const existingReservation =
      await this.reservationRepository.findExistingReservation(userId, eventId);
    if (existingReservation)
      throw new BadRequestException('이미 예약되어 있습니다.');

    // 예약이 가능한지 확인
    const isAvailableForReserve = await this.isAvailableForReserve(eventId);
    if (!isAvailableForReserve)
      throw new BadRequestException('정원이 꽉찼습니다.');

    // 티켓 예약 처리
    await this.reservationRepository.createReservation(userId, eventId);
  }

  /** 예약 가능 여부 */
  async isAvailableForReserve(eventId: number): Promise<boolean> {
    // 정원 확인
    const { maxTickets } = await this.eventService.getEventInfo(eventId);

    // 예약 인원 수 확인
    const currentReservations =
      await this.reservationRepository.findReservationCount(eventId);

    return maxTickets > currentReservations;
  }
}
