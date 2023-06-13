import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DATABASE, NODE_ENV } from './constant';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: DATABASE.DATABASE_HOST,
  port: DATABASE.DATABASE_PORT,
  username: DATABASE.DATABASE_USER,
  password: DATABASE.DATABASE_PASSWORD,
  database: DATABASE.DATABASE_NAME,
  synchronize: NODE_ENV === 'development',
  logging: NODE_ENV === 'development',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'src/migrations',
  },
} as TypeOrmModuleOptions;
