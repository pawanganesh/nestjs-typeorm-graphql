import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class VerifyAccountDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(6)
  code: string;
}
