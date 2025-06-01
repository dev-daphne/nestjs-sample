import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { ReservationStatusType } from 'src/reservation/reservation.enum';

@Exclude()
export class GetReservationResponse {
  @Expose()
  @ApiProperty({ description: '예약 ID' })
  id: number;

  @Expose()
  @ApiProperty({ description: '티켓 ID' })
  ticketId: number;

  @Expose()
  @ApiProperty({ description: '회원 ID' })
  userId: number;

  @Expose()
  @ApiProperty({ description: '예약 상태' })
  status: ReservationStatusType;

  @Expose()
  @ApiProperty({ description: '예약된 날짜' })
  reservedAt: number;
}
