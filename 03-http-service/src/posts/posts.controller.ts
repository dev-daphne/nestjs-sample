import { Controller, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /**
   * Observable로 return이 가능하다.
   * @returns {Observable<string>}
   */
  @Get()
  findAll(): Observable<string[]> {
    return this.postsService.getPosts();
  }

  /**
   * postId를 받아서 해당되는 게시물을 찾아 반환한다.
   * @param {number} postId 게시물 번호
   * @returns {string} 게시물 내용
   */
  @Get(':postId')
  findPost(@Param() { postId }: { postId: number }): string {
    return `${postId}번 게시물 입니다.`;
  }
}
