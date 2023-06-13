import 'reflect-metadata';
import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ValidationPipe } from '@nestjs/common';
import { NODE_ENV, PORT } from './config/constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  if (NODE_ENV === 'production') app.use(helmet());

  await app.listen(PORT);
}
bootstrap();
