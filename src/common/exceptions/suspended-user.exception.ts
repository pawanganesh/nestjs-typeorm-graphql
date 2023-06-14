import { ErrorType } from 'src/common/enums';
import { GraphQLError } from 'graphql';

export class SuspendedUserException extends GraphQLError {
  constructor() {
    super('Suspended user.', {
      extensions: {
        code: ErrorType.SUSPENDED_USER,
      },
    });
  }
}
