import { BullModule, BullRootModuleOptions } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): BullRootModuleOptions => {
        return {
          redis: {
            host: configService.getOrThrow<string>('REDIS_QUEUE_HOST'),
            port: configService.getOrThrow<number>('REDIS_QUEUE_PORT'),
            password: configService.getOrThrow<string>('REDIS_QUEUE_PASSWORD'),
          },
        };
      },
    }),
  ],
})
export class RedisQueueModule {}
