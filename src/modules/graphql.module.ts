import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { NODE_ENV } from 'src/config/constant';
// import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: { path: join(process.cwd(), 'src/modules/graphql.ts'), outputAs: 'class' },

      playground: NODE_ENV === 'development',

      // playground: false,
      // plugins: [ApolloServerPluginLandingPageLocalDefault()],

      formatError: (error: GraphQLError) => {
        const { message, extensions } = error;
        const { stacktrace, originalError, ...stacktraceFreeExtensions } = extensions;
        const graphQLFormattedError: GraphQLFormattedError = { message, extensions: { ...stacktraceFreeExtensions } };
        return graphQLFormattedError;
      },
    }),
  ],
})
export class GraphqlModule {}
