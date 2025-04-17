import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEventParams } from './event.interface';
import { EventRepository } from './event.repository';

@Injectable()
export class EventService {
  constructor(private readonly eventRepository: EventRepository) {}

  /** 이벤트 생성 */
  async createEvent(params: CreateEventParams) {
    const event = await this.eventRepository.getEventInfoByName(params.name);
    if (event) throw new BadRequestException('이미 생성된 이벤트입니다.');

    const { id } = await this.eventRepository.createEvent(params);

    return { id };
  }

  /** 이벤트 조회 */
  async getEventInfo(eventId: number) {
    const event = await this.eventRepository.getEventInfoById(eventId);
    if (!event) throw new NotFoundException('존재하지 않는 이벤트입니다.');

    return event;
  }
}
