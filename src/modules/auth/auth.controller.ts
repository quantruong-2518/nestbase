import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { JwtRefreshGuard, LocalAuthGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('sign-in')
  @UseGuards(LocalAuthGuard)
  public async signIn(@Req() req: Request) {
    const user = req.user;
    const { accessToken, refreshToken } = await this._authService.getTokens(
      user['id'],
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
}
