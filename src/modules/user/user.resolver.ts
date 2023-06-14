import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { LoggedInUser } from 'src/decorators/loggedin-user.decorator';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/@guards/gql.guard';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation('createUser')
  createUser(@Args('payload') paylaod: CreateUserDto): Promise<string> {
    return this.userService.createUser(paylaod);
  }

  @Query('getMyProfile')
  @UseGuards(GqlAuthGuard)
  getMyProfile(@LoggedInUser() user: User) {
    return user;
  }
}
