import { IsEmail, IsStrongPassword } from 'class-validator';

export class UserCredentialsDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
