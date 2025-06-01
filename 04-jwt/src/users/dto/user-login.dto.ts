import { ApiProperty } from '@nestjs/swagger';

export class UserLoginBodyRequest {
  @ApiProperty({
    description: '사용자 ID',
    example: 'test-user',
  })
  id: string;

  @ApiProperty({
    description: '사용자 비밀번호',
    example: 'test-password',
  })
  password: string;
}
