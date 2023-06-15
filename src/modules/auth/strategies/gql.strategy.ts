import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DataSource } from 'typeorm';
import { JWT_SECRET } from '../../../config/constant';
import { UserStatus } from '../../user/enums/user-status.enum';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class GqlStrategy extends PassportStrategy(Strategy, 'gql') {
  constructor(private readonly dataSource: DataSource) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: { sub: string; iat: number; exp: number }) {
    const user = await this.dataSource.manager.getRepository(User).findOne({
      where: { id: payload.sub, status: UserStatus.ACTIVE },
      select: {
        id: true,
        full_name: true,
        email: true,
        password: true,
        phone_number: true,
        avatar: true,
        auth_provider: true,
        status: true,
        role: true,
        last_login: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
