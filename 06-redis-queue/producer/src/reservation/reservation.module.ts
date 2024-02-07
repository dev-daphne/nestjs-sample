import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/lib/prisma/prisma.module';
import { RedisQueueModule } from 'src/lib/redis-queue/redis-queue.module';
import { ReservationController } from 'src/reservation/reservation.controller';
import { ReservationRepository } from 'src/reservation/reservation.repository';
import { ReservationService } from 'src/reservation/reservation.service';

@Module({
  imports: [
    RedisQueueModule,
    PrismaModule,
    BullModule.registerQueue({ name: 'reservation-queue' }),
  ],
  providers: [ReservationService, ReservationRepository],
  controllers: [ReservationController],
})
export class ReservationModule {}
