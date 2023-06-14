import { ErrorType } from 'src/common/enums';
import { GraphQLError } from 'graphql';

export class BannedUserException extends GraphQLError {
  constructor() {
    super('Banned user.', {
      extensions: {
        code: ErrorType.BANNED_USER,
      },
    });
  }
}
