import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import {
  CreateEventRequest,
  CreateEventResponse,
} from 'src/event/dto/create-event.dto';
import { GetEventResponse } from 'src/event/dto/get-event.dto';
import { EventService } from 'src/event/event.service';

@Controller('event')
@ApiTags('이벤트')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @ApiOperation({
    summary: '이벤트 생성',
    description: '이벤트를 생성합니다.',
  })
  async createEvent(@Body() params: CreateEventRequest) {
    return plainToInstance(
      CreateEventResponse,
      await this.eventService.createEvent(params),
    );
  }

  @Get(':eventId')
  @ApiOperation({
    summary: '이벤트 조회',
    description: '이벤트를 조회합니다.',
  })
  async getEventInfo(@Param('eventId', ParseIntPipe) eventId: number) {
    return plainToInstance(
      GetEventResponse,
      await this.eventService.getEventInfo(eventId),
    );
  }
}
