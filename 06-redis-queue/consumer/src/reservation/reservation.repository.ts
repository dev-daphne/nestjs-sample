import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { ReservationStatusType } from 'src/reservation/reservation.enum';

@Injectable()
export class ReservationRepository {
  constructor(private prisma: PrismaService) {}

  /** 회원 ID와 이벤트 ID로 이미 예약했는지 조회 */
  async findExistingReservation(userId: number, eventId: number) {
    return this.prisma.reservation.findFirst({
      where: {
        userId,
        eventId,
      },
    });
  }

  /** 예약 인원 수 확인 */
  async findReservationCount(eventId: number) {
    return this.prisma.reservation.count({ where: { eventId } });
  }

  /** 예약 생성 */
  async createReservation(userId: number, eventId: number) {
    return this.prisma.reservation.create({
      data: {
        userId,
        eventId,
        reservedAt: new Date(),
        status: ReservationStatusType.RESERVED,
      },
    });
  }
}
