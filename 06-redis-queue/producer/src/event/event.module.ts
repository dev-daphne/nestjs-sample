import { Module } from '@nestjs/common';
import { EventController } from 'src/event/event.controller';
import { EventRepository } from 'src/event/event.repository';
import { EventService } from 'src/event/event.service';
import { PrismaModule } from 'src/lib/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [EventService, EventRepository],
  exports: [EventService],
  controllers: [EventController],
})
export class EventModule {}
