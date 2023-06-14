import 'reflect-metadata';
import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ValidationPipe } from '@nestjs/common';
import { NODE_ENV, PORT } from './config/constant';
import { GraphQLExceptionsFilter } from './common/filters/graphql-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (NODE_ENV === 'production') app.use(helmet());

  app.useGlobalFilters(new GraphQLExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.listen(PORT);
}
bootstrap();
