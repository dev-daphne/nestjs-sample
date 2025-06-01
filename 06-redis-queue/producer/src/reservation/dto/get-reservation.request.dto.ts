import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class GetReservationRequest {
  @ApiProperty({
    description: '이벤트 ID',
    example: 1,
  })
  @IsNumber()
  eventId: number;

  @ApiProperty({
    description: '회원 ID',
    example: 1,
  })
  @IsNumber()
  userId: number;
}
