import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import type { Prisma } from '@prisma/client';

@Injectable()
export class EventRepository {
  constructor(private prisma: PrismaService) {}

  /** 이벤트 ID 기반 이벤트 조회 */
  async getEventInfoById(eventId: number) {
    return this.prisma.event.findFirst({ where: { id: eventId } });
  }
}
