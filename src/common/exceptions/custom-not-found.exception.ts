import { GraphQLError } from 'graphql';
import { ErrorType } from '../enums';

export class CustomNotFoundException extends GraphQLError {
  constructor(message: string, extraArguments?: Record<string, any>) {
    super(message, {
      extensions: {
        code: ErrorType.NOT_FOUND,
        ...extraArguments,
      },
    });
  }
}
