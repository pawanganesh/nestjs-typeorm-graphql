import { Query, Resolver } from '@nestjs/graphql';

@Resolver('User')
export class UserResolver {
  @Query('users')
  getAllUsers() {
    return [{ id: 1, full_name: 'Pawanlal Ganesh' }];
  }
}
