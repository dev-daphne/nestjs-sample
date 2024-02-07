import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GetEventResponse {
  @Expose()
  @ApiProperty({ description: '이벤트 ID' })
  id: number;

  @Expose()
  @ApiProperty({ description: '이벤트 이름' })
  name: string;

  @Expose()
  @ApiProperty({ description: '이벤트 날짜' })
  date: Date;

  @Expose()
  @ApiProperty({ description: '이벤트 장소' })
  location: string;

  @Expose()
  @ApiProperty({ description: '티켓 발행 수' })
  maxTickets: number;

  @Expose()
  @ApiProperty({ description: '생성일' })
  createdAt: Date;

  @Expose()
  @ApiProperty({ description: '수정일' })
  updatedAt: Date;

  @Expose()
  @ApiProperty({ description: '삭제일' })
  deletedAt: Date;
}
