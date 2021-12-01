import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs(
  'mysql',
  (): TypeOrmModuleOptions => ({
    name: 'mysql',
    type: 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [],
    synchronize: false,
    logging: process.env.APP_ENV === 'local',
    // timezone: '+09:00',
  }),
);
