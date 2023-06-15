import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../@guards/gql.guard';
import { GetUser } from '../../decorators/get-user.decorator';
import { User as IUser } from '../graphql';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation('createUser')
  createUser(@Args('payload') paylaod: CreateUserDto): Promise<IUser> {
    return this.userService.createUser(paylaod);
  }

  @Query('getMyProfile')
  @UseGuards(GqlAuthGuard)
  getMyProfile(@GetUser() user: User) {
    return user;
  }
}
