import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { GetReservationRequest } from 'src/reservation/dto/get-reservation.request.dto';
import { ReservationService } from 'src/reservation/reservation.service';
import { GetReservationResponse, PostReservationRequest } from './dto';

@Controller('reservation')
@ApiTags('예약')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  @ApiOperation({
    summary: '예약 조회',
    description: '예약을 조회합니다.',
  })
  async getReservationInfo(@Query() query: GetReservationRequest) {
    return plainToInstance(
      GetReservationResponse,
      await this.reservationService.getReservationInfo(
        query.eventId,
        query.userId,
      ),
    );
  }

  @Post()
  @ApiOperation({
    summary: '예약 요청',
    description: '예약을 요청합니다.',
  })
  async requestReservation(@Body() body: PostReservationRequest) {
    return this.reservationService.reserveEvent(body.eventId, body.userId);
  }
}
