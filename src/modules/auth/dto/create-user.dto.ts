import { IsEmail, IsEnum, IsIn, IsString, IsStrongPassword } from 'class-validator';
import { UserRole } from '../../user/enums/user-role.enum';

export class CreateUserDto {
  @IsString()
  full_name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsEnum(UserRole)
  @IsIn([UserRole.CUSTOMER, UserRole.VENDOR, UserRole.RIDER])
  role: UserRole = UserRole.CUSTOMER;
}
