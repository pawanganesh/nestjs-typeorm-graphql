import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserRepository } from '../user/repositories/user.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({ imports: [JwtModule.register({})], providers: [AuthService, AuthResolver, UserRepository] })
export class AuthModule {}
