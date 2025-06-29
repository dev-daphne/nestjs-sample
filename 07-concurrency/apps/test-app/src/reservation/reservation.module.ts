import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../../lib/prisma/prisma.module';
import { ReservationController } from './reservation.controller';
import { ReservationRepository } from './reservation.repository';
import { ReservationService } from './reservation.service';
import { EventModule } from '../event/event.module';

@Module({
  imports: [PrismaModule, EventModule],
  providers: [ReservationService, ReservationRepository],
  controllers: [ReservationController],
})
export class ReservationModule {}
