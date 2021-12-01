import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { MysqlConfigService } from './config.service';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        DB_HOST: Joi.string().valid(),
        DB_PORT: Joi.number().valid(),
        DB_USERNAME: Joi.string().valid(),
        DB_PASSWORD: Joi.string().valid(),
        DB_NAME: Joi.string().valid(),
      }),
    }),
  ],
  providers: [ConfigService, MysqlConfigService],
  exports: [ConfigService, MysqlConfigService],
})
export class MysqlConfigModule {}
