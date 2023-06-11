import { ConflictException } from '@nestjs/common';
import { ErrorType } from '../enums';

export class UserExistsException extends ConflictException {
  constructor() {
    super({ errorType: ErrorType.USER_ALREADY_EXISTS, message: 'User already exists.' });
  }
}
