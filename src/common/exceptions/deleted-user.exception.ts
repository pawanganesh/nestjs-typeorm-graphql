import { ErrorType } from 'src/common/enums';
import { GraphQLError } from 'graphql';

export class DeletedUserException extends GraphQLError {
  constructor() {
    super('Deleted user.', {
      extensions: {
        code: ErrorType.DELETED_USER,
      },
    });
  }
}
