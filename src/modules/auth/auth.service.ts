import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { omit, pick } from 'common/utils';
import { AppConfigType } from 'configurations/envs/env.type';
import { UserService } from 'modules/user/user.service';
import { JwtPayload } from './types/jwt-payload.type';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _configService: ConfigService<AppConfigType>,
    private readonly _userService: UserService,
  ) {}

  public async validateUser(username: string, password: string) {
    const user = await this._userService.findOne({ username });
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const result = omit(user, ['password']);
      return result;
    }
    return null;
  }

  public async getTokens(userId: string): Promise<JwtPayload> {
    const user = await this._userService.findOneById(userId);
    const signUser = pick(user, ['username', 'roles']);

    const [accessToken, refreshToken] = await Promise.all([
      this._jwtService.signAsync({ sub: userId, ...signUser }),
      this._jwtService.signAsync(
        { sub: userId, ...signUser },
        {
          secret: this._configService.get('JWT_REFRESH_SECRET'),
          expiresIn: this._configService.get('JWT_REFRESH_EXP'),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  public async refreshTokens(
    userId: string,
    refreshToken: string,
  ): Promise<JwtPayload> {
    const user = {};
    // await this.usersService.findById(userId);
    const isRefreshTokenValid = this._jwtService.verify(refreshToken);
    if (!user || !isRefreshTokenValid) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.getTokens(user['id']);
    return tokens;
  }
}
