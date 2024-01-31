import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisCacheService } from 'src/lib/redis-cache/redis-cache.service';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const host = configService.getOrThrow<string>('REDIS_CACHE_HOST');
        const port = configService.getOrThrow<number>('REDIS_CACHE_PORT');
        const url = `redis://${host}:${port}`;
        return {
          type: 'single',
          url,
          password: configService.getOrThrow<string>('REDIS_CACHE_PASSWORD'),
        };
      },
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
