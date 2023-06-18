import { Resolver, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../@guards/gql.guard';
import { GetUser } from '../../decorators/get-user.decorator';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('getMyProfile')
  @UseGuards(GqlAuthGuard)
  getMyProfile(@GetUser() user: User) {
    return user;
  }
}
