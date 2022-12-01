import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserInput } from 'modules/user/dto/create-user.input';
import { User } from 'modules/user/models/user.schema';
import { UserService } from 'modules/user/user.service';
import { AuthService } from './auth.service';
import { JwtRefreshGuard, LocalAuthGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _authService: AuthService,
    private readonly _userService: UserService,
  ) {}

  @Post('sign-in')
  @UseGuards(LocalAuthGuard)
  public async signIn(@Req() req: Request) {
    const user = req.user;
    const { accessToken, refreshToken } = await this._authService.getTokens(
      user['_id'],
    );
    return { accessToken, refreshToken };
  }

  @Get('refresh-token')
  @UseGuards(JwtRefreshGuard)
  public async refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return await this._authService.refreshTokens(userId, refreshToken);
  }

  @Post('sign-up')
  public async signUp(@Body() user: CreateUserInput) {
    const newUser = await this._userService.create(user);
    const tokens = this._authService.getTokens(newUser.id);
    return tokens;
  }
}
