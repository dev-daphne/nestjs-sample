import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const configService = app.get<ConfigService>(ConfigService);
  const logger = new Logger();

  const servicePort = configService.getOrThrow<number>('SERVICE_PORT');
  const environment = configService.getOrThrow<string>('ENVIRONMENT');

  if (environment !== 'prod') {
    const config = new DocumentBuilder()
      .setTitle('NestJS Sample API')
      .setDescription('NestJS Sample 서비스')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, {
      customSiteTitle: 'NestJS Sample API',
    });
  }

  await app.listen(servicePort);

  if (environment !== 'prod') {
    logger.log(`NODE_ENV:${environment} http://localhost:${servicePort}`);
  }
}
bootstrap();
