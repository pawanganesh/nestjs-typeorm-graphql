import { HttpException } from '@nestjs/common';
import { ErrorType } from '../enums';

export class UserExistsException extends HttpException {
  constructor() {
    const message = 'User already exists.';
    const code = ErrorType.USER_ALREADY_EXISTS;
    super(message, 400);
    Object.defineProperty(this, 'extensions', {
      value: { code },
      enumerable: true,
    });
  }
}
