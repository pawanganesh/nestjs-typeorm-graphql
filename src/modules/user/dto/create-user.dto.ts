import { IsEmail, IsEnum, IsString, IsStrongPassword } from 'class-validator';
import { UserRole } from '../enums/user-role.enum';

export class CreateUserDto {
  @IsString()
  full_name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsEnum(UserRole)
  role: UserRole = UserRole.CUSTOMER;
}
