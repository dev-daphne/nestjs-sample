import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { EventModule } from 'src/event/event.module';
import { PrismaModule } from 'src/lib/prisma/prisma.module';
import { RedisQueueModule } from 'src/lib/redis-queue/redis-queue.module';
import { ReservationConsumer } from 'src/reservation/reservation.consumer';
import { ReservationRepository } from 'src/reservation/reservation.repository';
import { ReservationService } from 'src/reservation/reservation.service';

@Module({
  imports: [
    RedisQueueModule,
    BullModule.registerQueue({
      name: 'reservation-queue',
    }),
    PrismaModule,
    EventModule,
  ],
  providers: [ReservationService, ReservationRepository, ReservationConsumer],
})
export class ReservationModule {}
