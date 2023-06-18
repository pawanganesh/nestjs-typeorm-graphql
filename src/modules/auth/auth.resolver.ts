import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserCredentialsDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginResponse, User as IUser } from '../graphql';
import { VerifyAccountDto } from './dto/verify-account.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation('createUser')
  createUser(@Args('payload') paylaod: CreateUserDto): Promise<IUser> {
    return this.authService.createUser(paylaod);
  }

  @Mutation('verifyAccount')
  verifyAccount(@Args('payload') payload: VerifyAccountDto): Promise<boolean> {
    return this.authService.verifyAccount(payload);
  }

  @Mutation('login')
  login(@Args('payload') payload: UserCredentialsDto): Promise<LoginResponse> {
    return this.authService.login(payload);
  }
}
