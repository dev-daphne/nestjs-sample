import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppConfigModule } from './config/app/config.module';
import { MysqlConfigModule } from './config/database/mysql/config.module';
import { MysqlConfigService } from './config/database/mysql/config.service';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [MysqlConfigModule],
      useClass: MysqlConfigService,
      inject: [MysqlConfigService],
    }),
    TerminusModule,
    HttpModule,
  ],
  controllers: [HealthController, AppController],
  providers: [],
})
export class AppModule {}
