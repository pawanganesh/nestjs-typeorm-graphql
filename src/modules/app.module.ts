import { Module } from '@nestjs/common';
import { TypeOrmConfig } from '../config/orm-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { GraphqlModule } from './graphql.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRootAsync({ useFactory: () => TypeOrmConfig }), GraphqlModule, UserModule, AuthModule],
})
export class AppModule {}
