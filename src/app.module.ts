import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TypeOrmConfig } from './orm-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: () => TypeOrmConfig }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: { path: join(process.cwd(), 'src/graphql.ts'), outputAs: 'class' },
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
