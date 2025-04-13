import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/lib/prisma/prisma.module';
import { RedisQueueModule } from 'src/lib/redis-queue/redis-queue.module';
import { ReservationConsumer } from 'src/reservation/reservation.consumer';
import { ReservationService } from 'src/reservation/reservation.service';

@Module({
  imports: [
    RedisQueueModule,
    BullModule.registerQueue({
      name: 'reservation-queue',
    }),
    PrismaModule,
  ],
  providers: [ReservationService, ReservationConsumer],
})
export class ReservationModule {}
