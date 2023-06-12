import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation('createUser')
  createUser(@Args('payload') paylaod: CreateUserDto): Promise<string> {
    return this.userService.createUser(paylaod);
  }
}
