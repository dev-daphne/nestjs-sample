import { PrismaService } from '@lib/prisma';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Prisma, PrismaClient, ReservationStatusType } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

@Injectable()
export class ReservationRepository {
  constructor(private prisma: PrismaService) {}

  /** 예약 조회 */
  async getReservationInfo(reservationId: number) {
    return this.prisma.reservation.findFirst({ where: { id: reservationId } });
  }

  async reserveEvent(eventId: number, userId: number) {
    await this.prisma.reservation.create({
      data: {
        eventId,
        userId,
        reservedAt: new Date(),
        status: ReservationStatusType.RESERVED,
      },
    });
  }

  /** 예약 가능 여부 */
  async isAvailableForReserve(
    eventId: number,
    prisma: Omit<
      PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
      '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
    >,
  ): Promise<boolean> {
    // 정원 확인
    const event = await prisma.event.findFirst({
      where: { id: eventId },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    // 예약 인원 수 확인
    const currentReservations = await prisma.reservation.count({
      where: { eventId },
    });

    return event.maxTickets > currentReservations;
  }
}
