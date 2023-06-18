import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/repositories/user.repository';
import { UserCredentialsDto } from './dto/login.dto';
import { UserStatus } from '../user/enums/user-status.enum';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from '../../config/constant';
import { LoginResponse } from '../graphql';
import {
  BannedUserException,
  DeletedUserException,
  InvalidCredentialsException,
  SuspendedUserException,
  UserExistsException,
} from '../../common/exceptions';
import { UnverifiedUserException } from 'src/common/exceptions/unverified-user.exception';
import { HashHelper, generateOTP, sendMail } from '../../helpers';
import { CreateUserDto } from './dto/create-user.dto';
import { User as IUser } from '../graphql';
import { DataSource } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { AuthProvider } from '../user/enums/auth-provider.enum';
import { UserOTP } from '../user/entities/user-otp.entity';
import { UserOTPType } from '../user/enums/user-otp.enum';
import { VerifyAccountDto } from './dto/verify-account.dto';
import { CustomNotFoundException } from '../../common/exceptions/custom-not-found.exception';
import { CustomBadRequestException } from '../../common/exceptions/custom-bad-request.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly dataSource: DataSource,
  ) {}

  async createUser(payload: CreateUserDto): Promise<IUser> {
    const { password, email, ...rest } = payload;

    const user_row: User = await this.userRepository.findOne({ where: { email: email.toLowerCase() } });
    if (user_row) throw new UserExistsException();

    const hasedPassword: string = await HashHelper.hash(password);

    const user = await this.userRepository.save({
      ...rest,
      email: email.toLowerCase(),
      auth_provider: AuthProvider.LOCAL,
      status: UserStatus.UNVERIFIED,
      password: hasedPassword,
    });

    const user_otp = await this.dataSource
      .getRepository(UserOTP)
      .save({ code: generateOTP(6), otp_type: UserOTPType.EMAIL_VERIFICATION, user_id: user.id });

    const text: string = `
    Welcome to APP_NAME,

    Please verify your account by entering the following code:
    ${user_otp.code}

    Note: This code will expire in 15 minutes.

    Thanks,
    APP_NAME Team
    `;

    sendMail({ to: user.email, subject: 'Account Verification', text });

    const { password: _, ...user_data } = user;
    return user_data;
  }

  async login(payload: UserCredentialsDto): Promise<LoginResponse> {
    const user_row = await this.userRepository.findOne({
      where: { email: payload.email.toLowerCase() },
      select: { id: true, password: true, status: true },
    });

    if (!user_row) throw new InvalidCredentialsException({ success: false, verified: null });

    const isPasswordValid: boolean = await HashHelper.compare(user_row.password, payload.password);

    if (!isPasswordValid) throw new InvalidCredentialsException({ success: false, verified: null });

    if (user_row.status !== UserStatus.ACTIVE) {
      if (user_row.status === UserStatus.UNVERIFIED)
        throw new UnverifiedUserException({ success: false, verified: false });
      if (user_row.status === UserStatus.BANNED) throw new BannedUserException();
      if (user_row.status === UserStatus.SUSPENDED) throw new SuspendedUserException();
      if (user_row.status === UserStatus.DELETED) throw new DeletedUserException();
    }

    await this.userRepository.update({ id: user_row.id }, { last_login: new Date() });

    const token = this.jwtService.sign({ sub: user_row.id }, { expiresIn: '30d', secret: JWT_SECRET });

    return {
      success: true,
      verified: user_row.status === UserStatus.ACTIVE,
      message: 'Login success.',
      token,
    };
  }

  async verifyAccount(payload: VerifyAccountDto): Promise<boolean> {
    const user_row = await this.userRepository.findOne({ where: { email: payload.email.toLowerCase() } });
    if (!user_row) throw new CustomNotFoundException('User not found.');

    if (user_row.status === UserStatus.ACTIVE) throw new CustomBadRequestException('User already verified.');

    // TODO: Check if OTP is expired

    // TODO: Check if OTP is already used

    return true;
  }
}
