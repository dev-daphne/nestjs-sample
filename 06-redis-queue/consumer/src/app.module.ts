import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ReservationModule } from 'src/reservation/reservation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `environments/.env.${process.env.NODE_ENV}`,
    }),
    ReservationModule,
  ],
})
export class AppModule {}
