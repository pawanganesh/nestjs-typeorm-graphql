import { ErrorType } from 'src/common/enums';
import { GraphQLError } from 'graphql';

export class UnverifiedUserException extends GraphQLError {
  constructor(extraArguments?: Record<string, any>) {
    super('Unverified user.', {
      extensions: {
        code: ErrorType.UNVERIFIED_USER,
        ...extraArguments,
      },
    });
  }
}
