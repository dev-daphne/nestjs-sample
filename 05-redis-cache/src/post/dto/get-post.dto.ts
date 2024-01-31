import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GetPostResponse {
  @Expose()
  @ApiProperty({
    description: '게시글 ID',
    example: 1,
  })
  id: number;

  @Expose()
  @ApiProperty({
    description: '게시글 제목',
    example: '게시글 제목입니다.',
  })
  title: string;

  @Expose()
  @ApiProperty({
    description: '게시글 내용',
    example: '게시글 내용입니다.',
  })
  content?: string;
}
