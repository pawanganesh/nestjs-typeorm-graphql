import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/repositories/user.repository';
import { UserCredentialsDto } from './dto/login.dto';
import { HashHelper } from 'src/helpers/hash.helper';
import { UserStatus } from '../user/enums/user-status.enum';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from '../../config/constant';
import { LoginResponse } from '../graphql';
import {
  BannedUserException,
  DeletedUserException,
  InvalidCredentialsException,
  SuspendedUserException,
} from '../../common/exceptions';
import { UnverifiedUserException } from 'src/common/exceptions/unverified-user.exception';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository, private readonly jwtService: JwtService) {}

  async login(payload: UserCredentialsDto): Promise<LoginResponse> {
    const user_row = await this.userRepository.findOne({
      where: { email: payload.email },
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
}
