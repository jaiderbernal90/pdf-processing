import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { PORT } from './config/configurations';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(json({ limit: '60mb' }));
  app.setGlobalPrefix('api');
  
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI
  })


  const configService = app.get(ConfigService);
  // setupSwagger(app);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const port = configService.get<number>(PORT);
  await app.listen(port);
}
bootstrap();
