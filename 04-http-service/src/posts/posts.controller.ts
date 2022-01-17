import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { lastValueFrom, Observable } from 'rxjs';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll(): Observable<string> {
    try {
      return this.postsService.getPosts();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Get('test')
  async test(@Query() { num }) {
    console.log(num);
    const result = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(`test${num}`);
      }, 1000 * num);
    }).then((res) => res);
    console.log(await result, '먼저 결과 출력');
    return result;
  }
}
