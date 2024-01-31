import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/lib/prisma/prisma.module';
import { RedisCacheModule } from 'src/lib/redis-cache/redis-cache.module';
import { PostController } from 'src/post/post.controller';
import { PostService } from 'src/post/post.service';

@Module({
  imports: [RedisCacheModule, PrismaModule],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
