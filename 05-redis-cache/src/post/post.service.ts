import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { CreatePostParams } from 'src/post/post.interface';
import { RedisCacheService } from 'src/lib/redis-cache/redis-cache.service';

@Injectable()
export class PostService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cache: RedisCacheService,
  ) {}

  /** 게시글 조회 */
  async getPost(id: number) {
    const cacheKey = `post_${id}`;

    // 캐시된 게시글 조회
    const cachedPost = await this.cache.get(cacheKey);

    // 캐시가 되지 않았을 경우
    if (!cachedPost) {
      // DB에 게시글 조회
      const post = await this.prismaService.post.findUnique({
        where: { id },
      });

      // 게시글이 존재하지 않을 경우
      if (!post) {
        throw new NotFoundException('게시글이 존재하지 않습니다.');
      }

      // 게시글 캐싱
      await this.cache.set({ key: cacheKey, value: post, ttl: 60 });

      // 게시글 리턴
      return post;
    }

    // 캐시된 게시글 리턴
    return cachedPost;
  }

  /** 게시글 생성 */
  async createPost({ title, content }: CreatePostParams) {
    const post = await this.prismaService.post.create({
      data: { title, ...(content && { content }) },
    });

    return post;
  }
}
