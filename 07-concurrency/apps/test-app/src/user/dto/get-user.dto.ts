import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GetUserResponse {
  @Expose()
  @ApiProperty({ description: '회원 ID' })
  userId: number;

  @Expose()
  @ApiProperty({ description: '이메일' })
  email: string;

  @Expose()
  @ApiProperty({ description: '이름' })
  name: string;
}
