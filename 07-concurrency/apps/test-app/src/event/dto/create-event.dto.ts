import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEventRequest {
  @ApiProperty({ description: '이벤트 이름', example: '서울 불꽃축제' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: '이벤트 날짜',
    example: '2021-01-01T00:00:00.000Z',
  })
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({ description: '이벤트 장소', example: '여의도' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ description: '티켓 발행 수', example: 3 })
  @IsNumber()
  @IsNotEmpty()
  maxTickets: number;
}

@Exclude()
export class CreateEventResponse {
  @Expose()
  @ApiProperty({ description: '이벤트 ID' })
  id: number;
}
