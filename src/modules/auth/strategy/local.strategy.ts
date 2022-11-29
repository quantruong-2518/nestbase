import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { STRATEGY_TYPE } from './strategy.const';

/**
 * passport-local is used for authenticating with username and password
 * local strategy reads request body and check username/password
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
  STRATEGY_TYPE.LOCAL,
) {
  constructor(private _authService: AuthService) {
    super({
      //overwrite username field, default 'username'
      usernameField: 'username',
    });
  }

  //must have function named "validate"
  /**
   * @param username
   * @param password
   * @returns user
   * - return value will be bound automatically to express/Request object
   * - if user is null, an exception will be thrown
   */
  public async validate(username: string, password: string): Promise<any> {
    const user = await this._authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
