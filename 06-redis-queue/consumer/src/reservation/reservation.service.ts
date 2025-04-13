import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma-client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { ReservationStatusType } from 'src/reservation/reservation.enum';

@Injectable()
export class ReservationService {
  constructor(private readonly prismaService: PrismaService) {}

  /** 티켓 예매 */
  async reserveTicket(eventId: number, userId: number) {
    await this.prismaService.$transaction(async (prisma) => {
      // 이미 예약했는지 확인
      const existingReservation = await prisma.reservation.findFirst({
        where: {
          userId,
          eventId,
        },
      });

      if (existingReservation)
        throw new BadRequestException('이미 예약되어 있습니다.');

      // 예약이 가능한지 확인
      const isAvailableForReserve = await this.isAvailableForReserve(
        eventId,
        prisma,
      );
      if (!isAvailableForReserve)
        throw new BadRequestException('정원이 꽉찼습니다.');

      // 티켓 예약 처리
      await prisma.reservation.create({
        data: {
          userId,
          eventId,
          reservedAt: new Date(),
          status: ReservationStatusType.RESERVED,
        },
      });
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
    const { maxTickets } = await prisma.event.findFirst({
      where: { id: eventId },
    });

    // 예약 인원 수 확인
    const currentReservations = await prisma.reservation.count({
      where: { eventId },
    });

    return maxTickets > currentReservations;
  }
}
