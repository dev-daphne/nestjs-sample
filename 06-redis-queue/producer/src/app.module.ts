import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventModule } from 'src/event/event.module';
import { ReservationModule } from 'src/reservation/reservation.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `environments/.env.${process.env.NODE_ENV}`,
    }),
    UserModule,
    EventModule,
    ReservationModule,
  ],
})
export class AppModule {}
