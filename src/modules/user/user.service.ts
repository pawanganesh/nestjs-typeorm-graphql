import { HashHelper } from 'src/helpers/hash.helper';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repositories/user.repository';
import { User } from './entities/user.entity';
import { UserExistsException } from 'src/common/http/exceptions/user-exists.exception';
import { Injectable } from '@nestjs/common';
import { AuthProvider } from './enums/auth-provider.enum';
import { UserStatus } from './enums/user-status.enum';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(payload: CreateUserDto): Promise<string> {
    const { password, ...rest } = payload;

    const user_row: User = await this.userRepository.findOne({ where: { email: rest.email } });
    if (user_row) throw new UserExistsException();

    const hasedPassword: string = await HashHelper.hash(password);

    await this.userRepository.save({
      ...rest,
      auth_provider: AuthProvider.LOCAL,
      status: UserStatus.UNVERIFIED,
      password: hasedPassword,
    });
    return 'User created.';
  }
}
