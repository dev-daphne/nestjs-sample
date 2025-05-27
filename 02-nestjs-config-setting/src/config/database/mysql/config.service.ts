import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { EntitySchema } from 'typeorm';

@Injectable()
export class MysqlConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const a = this.configService.get<TypeOrmModuleOptions>('mysql');
    return {
      name: this.configService.get<string>('mysql.name'),
      type: this.configService.get<'mysql'>('mysql.type'),
      host: this.configService.get<string>('mysql.host'),
      port: this.configService.get<number>('mysql.port'),
      username: this.configService.get<string>('mysql.username'),
      password: this.configService.get<string>('mysql.password'),
      database: this.configService.get<string>('mysql.database'),
      entities: this.configService.get<EntitySchema[]>('mysql.entities'),
      synchronize: this.configService.get<boolean>('mysql.synchronize'),
      logging: this.configService.get<boolean>('mysql.logging'),
    };
  }
}
