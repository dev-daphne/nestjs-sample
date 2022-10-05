import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `environments/.${process.env.NODE_ENV}.env`,
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
