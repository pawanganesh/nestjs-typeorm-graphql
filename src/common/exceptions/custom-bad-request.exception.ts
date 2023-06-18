import { GraphQLError } from 'graphql';
import { ApolloServerErrorCode } from '@apollo/server/errors';

export class CustomBadRequestException extends GraphQLError {
  constructor(message: string, extraArguments?: Record<string, any>) {
    super(message, {
      extensions: {
        code: ApolloServerErrorCode.BAD_REQUEST,
        ...extraArguments,
      },
    });
  }
}
