import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { STRATEGY_TYPE } from '../strategy';

@Injectable()
export class JwtRefreshGuard extends AuthGuard(STRATEGY_TYPE.JWT_REFRESH) {}
