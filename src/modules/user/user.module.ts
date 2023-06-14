import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UserRepository } from './repositories/user.repository';

@Module({
  providers: [UserService, UserRepository, UserResolver],
})
export class UserModule {}
