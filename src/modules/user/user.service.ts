import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repositories/user.repository';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { AuthProvider } from './enums/auth-provider.enum';
import { UserStatus } from './enums/user-status.enum';
import { UserExistsException } from '../../common/exceptions';
import { HashHelper, generateOTP, sendMail } from '../../helpers';
import { User as IUser } from '../graphql';
import { DataSource } from 'typeorm';
import { UserOTP } from './entities/user-otp.entity';
import { UserOTPType } from './enums/user-otp.enum';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository, private readonly dataSource: DataSource) {}

  async createUser(payload: CreateUserDto): Promise<IUser> {
    const { password, ...rest } = payload;

    const user_row: User = await this.userRepository.findOne({ where: { email: rest.email } });
    if (user_row) throw new UserExistsException();

    const hasedPassword: string = await HashHelper.hash(password);

    const user = await this.userRepository.save({
      ...rest,
      auth_provider: AuthProvider.LOCAL,
      status: UserStatus.UNVERIFIED,
      password: hasedPassword,
    });

    const user_otp = await this.dataSource
      .getRepository(UserOTP)
      .save({ code: generateOTP(6), otp_type: UserOTPType.EMAIL_VERIFICATION, user_id: user.id });

    const text = `
    Welcome to APP_NAME,

    Please verify your email by entering the following code:
    ${user_otp.code}

    Note: This code will expire in 15 minutes.

    Thanks,
    APP_NAME Team
    `;

    sendMail({ to: user.email, subject: 'Account Verification', text });

    const { password: _, ...user_data } = user;
    return user_data;
  }
}
