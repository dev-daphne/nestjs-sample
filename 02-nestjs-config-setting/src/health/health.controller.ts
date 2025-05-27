import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { InjectDataSource } from '@nestjs/typeorm';
import { AppConfigService } from 'src/config/app/config.service';
import { DataSource } from 'typeorm';

@Controller('health')
export class HealthController {
  constructor(
    private readonly configService: AppConfigService,
    private readonly health: HealthCheckService,
    private readonly database: TypeOrmHealthIndicator,
    private readonly http: HttpHealthIndicator,

    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    try {
      const dbConnectResult = await this.health.check([
        () =>
          this.database.pingCheck('mysql', {
            connection: this.dataSource,
          }),
      ]);

      const pingCheckResult = await this.health.check([
        () => this.http.pingCheck('test', 'http://naver.com'),
      ]);
      return {
        status: 'Success',
        app_name: this.configService.name,
        app_version: 'app_version',
        app_env: this.configService.env,
        current_date: new Date().toLocaleString(),
        database_connect_result: dbConnectResult,
        ping_check_result: pingCheckResult,
      };
    } catch (error) {
      return {
        status: 'Fail',
        message: 'error: ' + error,
        app_name: this.configService.name,
        app_version: 'app_version',
        app_env: this.configService.env,
        current_date: new Date().toLocaleString(),
      };
    }
  }
}
