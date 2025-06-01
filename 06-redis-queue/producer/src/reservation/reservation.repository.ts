import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma/prisma.service';

@Injectable()
export class ReservationRepository {
  constructor(private prisma: PrismaService) {}

  /** 예약 조회 */
  async getReservationInfo(eventId: number, userId: number) {
    return this.prisma.reservation.findFirst({
      where: { eventId, userId },
    });
  }
}
