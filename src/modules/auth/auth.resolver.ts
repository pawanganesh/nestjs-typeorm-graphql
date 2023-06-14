import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserCredentialsDto } from './dto/login.dto';
import { LoginResponse } from '../graphql';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation('login')
  login(@Args('payload') payload: UserCredentialsDto): Promise<LoginResponse> {
    return this.authService.login(payload);
  }
}
