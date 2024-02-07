import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import type { Prisma } from '@prisma/client';

@Injectable()
export class EventRepository {
  constructor(private prisma: PrismaService) {}

  /** 이벤트 생성 */
  async createEvent({
    name,
    maxTickets,
    date,
    location,
  }: Prisma.EventCreateInput) {
    return this.prisma.event.create({
      data: {
        name,
        maxTickets,
        date,
        location,
      },
    });
  }

  /** 이벤트 이름 기반 이벤트 조회 */
  async getEventInfoByName(name: string) {
    return this.prisma.event.findFirst({ where: { name } });
  }

  /** 이벤트 ID 기반 이벤트 조회 */
  async getEventInfoById(eventId: number) {
    return this.prisma.event.findFirst({ where: { id: eventId } });
  }
}
