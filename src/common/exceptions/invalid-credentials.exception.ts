import { ErrorType } from 'src/common/enums';
import { GraphQLError } from 'graphql';

export class InvalidCredentialsException extends GraphQLError {
  constructor(extraArguments?: Record<string, any>) {
    super('Invalid credentials.', {
      extensions: {
        code: ErrorType.INVALID_CREDENTIALS,
        ...extraArguments,
      },
    });
  }
}
