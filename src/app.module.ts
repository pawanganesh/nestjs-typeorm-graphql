import { Module } from '@nestjs/common';
import { TypeOrmConfig } from './config/orm-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { GraphqlModule } from './modules/graphql.module';

@Module({
  imports: [TypeOrmModule.forRootAsync({ useFactory: () => TypeOrmConfig }), GraphqlModule, UserModule],
})
export class AppModule {}
