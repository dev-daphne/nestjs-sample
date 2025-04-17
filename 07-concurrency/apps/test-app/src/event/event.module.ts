import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventRepository } from './event.repository';
import { EventService } from './event.service';
import { PrismaModule } from '../../../../lib/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [EventService, EventRepository],
  exports: [EventService],
  controllers: [EventController],
})
export class EventModule {}
