import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { GetReservationResponse } from './dto/get-reservation.dto';
import { ReservationService } from './reservation.service';

@Controller('reservation')
@ApiTags('예약')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get(':reservationId')
  @ApiOperation({
    summary: '예약 조회',
    description: '예약을 조회합니다.',
  })
  async getReservationInfo(
    @Param('reservationId', ParseIntPipe) ticketId: number,
  ) {
    return plainToInstance(
      GetReservationResponse,
      await this.reservationService.getReservationInfo(ticketId),
    );
  }

  @Post(':eventId/:userId')
  @ApiOperation({
    summary: '예약 요청',
    description: '예약을 요청합니다.',
  })
  async requestReservation(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('eventId', ParseIntPipe) eventId: number,
  ) {
    return this.reservationService.reserveEvent(eventId, userId);
  }
}
