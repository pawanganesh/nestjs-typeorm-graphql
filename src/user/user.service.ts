import { HashHelper } from 'src/helpers/hash.helper';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repositories/user.repository';
import { DBErrorCode } from '../common/enums/db-error-code.enum';
import { UserExistsException } from '../common/exceptions/user-exists.exception';
import { TimeoutError } from 'rxjs';
import { BadRequestException, InternalServerErrorException, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthProvider, UserStatus } from './entities/user.entity';

export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async createUser(payload: CreateUserDto): Promise<string> {
    try {
      const { password, ...rest } = payload;
      const hasedPassword: string = await HashHelper.hash(password);

      await this.userRepository.save({
        ...rest,
        auth_provider: AuthProvider.LOCAL,
        status: UserStatus.UNVERIFIED,
        password: hasedPassword,
      });
      return 'User created.';
    } catch (error) {
      if (error.code === DBErrorCode.PG_UNIQUE_CONSTRAINT_VIOLATION) throw new UserExistsException();
      if (error.code === DBErrorCode.PG_UNIQUE_CONSTRAINT_VIOLATION)
        throw new BadRequestException('User already exists.');
      else if (error instanceof TimeoutError) throw new RequestTimeoutException();
      else throw new InternalServerErrorException();
    }
  }
}
