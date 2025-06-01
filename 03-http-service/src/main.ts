import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger();

  const config = new DocumentBuilder()
    .setTitle('NestJS Sample API')
    .setDescription('NestJS Sample 서비스')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'NestJS Sample API',
  });

  const appPort = configService.getOrThrow<number>('APP_PORT');

  await app.listen(appPort);

  logger.log(`http://localhost:${appPort}`);
  logger.log(`swagger docs: http://localhost:${appPort}/api`);
}
bootstrap();
