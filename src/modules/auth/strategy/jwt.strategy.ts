import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { STRATEGY_TYPE } from './strategy.const';
import { ConfigService } from '@nestjs/config';
import { AppConfigType } from 'configurations/envs/env.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, STRATEGY_TYPE.JWT) {
  constructor(private readonly _configService: ConfigService<AppConfigType>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: _configService.get('JWT_SECRET'),
    });
  }

  public async validate(payload: any) {
    return payload;
  }
}
