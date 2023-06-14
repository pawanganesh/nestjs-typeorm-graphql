import { ErrorType } from '../enums';
import { GraphQLError } from 'graphql';

export class UserExistsException extends GraphQLError {
  constructor() {
    super('User already exists.', {
      extensions: {
        code: ErrorType.USER_ALREADY_EXISTS,
      },
    });
  }
}
