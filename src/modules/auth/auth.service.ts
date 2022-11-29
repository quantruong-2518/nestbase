import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { omit } from 'common/utils';
import { AppConfigType } from 'configurations/envs/env.type';
import { JwtPayload } from './types/jwt-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _configService: ConfigService<AppConfigType>,
  ) {}

  public async validateUser(username: string, password: string): Promise<any> {
    const user = { id: 1, username, password };
    if (user && user.password === password) {
      const result = omit(user, ['password']);
      return result;
    }
    return null;
  }

  public async getTokens(userId: string): Promise<JwtPayload> {
    //TODO: get user from userService, use utilityService.pick to pick field for payload
    const user = { username: 'abc' };

    const [accessToken, refreshToken] = await Promise.all([
      this._jwtService.signAsync({
        sub: userId,
        ...user,
      }),
      this._jwtService.signAsync(
        {
          sub: userId,
          ...user,
        },
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
