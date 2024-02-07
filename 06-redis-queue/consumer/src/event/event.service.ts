import { Injectable, NotFoundException } from '@nestjs/common';
import { EventRepository } from 'src/event/event.repository';

@Injectable()
export class EventService {
  constructor(private readonly eventRepository: EventRepository) {}

  /** 이벤트 조회 */
  async getEventInfo(eventId: number) {
    const event = await this.eventRepository.getEventInfoById(eventId);
    if (!event) throw new NotFoundException('존재하지 않는 이벤트입니다.');

    return event;
  }
}
