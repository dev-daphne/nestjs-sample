import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostRequest {
  @ApiProperty({
    description: '게시글 제목',
    example: '게시글 제목입니다.',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: '게시글 내용',
    example: '게시글 내용입니다.',
  })
  @IsString()
  @IsOptional()
  content?: string;
}

@Exclude()
export class CreatePostResponse {
  @Expose()
  @ApiProperty({
    description: '게시글 ID',
    example: 1,
  })
  id: number;
}
