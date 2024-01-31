import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import {
  CreatePostRequest,
  CreatePostResponse,
} from 'src/post/dto/create-post.dto';
import { GetPostResponse } from 'src/post/dto/get-post.dto';
import { PostService } from 'src/post/post.service';

@Controller('post')
@ApiTags('게시글')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({
    summary: '게시글 조회',
    description: '게시글을 조회합니다.',
  })
  @ApiParam({
    name: 'id',
    description: '게시글 ID',
    example: '1',
  })
  @Get(':id')
  async getPost(@Param('id', ParseIntPipe) id: number) {
    return plainToInstance(GetPostResponse, await this.postService.getPost(id));
  }

  @ApiOperation({
    summary: '게시글 생성',
    description: '게시글을 생성합니다.',
  })
  @Post()
  async createPost(@Body() data: CreatePostRequest) {
    return plainToInstance(
      CreatePostResponse,
      await this.postService.createPost({
        title: data.title,
        content: data.content,
      }),
    );
  }
}
