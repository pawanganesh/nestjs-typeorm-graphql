import { HttpException } from '@nestjs/common';
import { ErrorType } from '../../enums';
import { HttpErrorType } from '../http-error-type';

export class UserExistsException extends HttpException {
  constructor() {
    const message = 'User already exists.';
    const code = ErrorType.USER_ALREADY_EXISTS;

    super(message, HttpErrorType.BAD_REQUEST);

    Object.defineProperty(this, 'extensions', {
      value: { code },
      enumerable: true,
    });
  }
}
