import { Controller, Post, Body, UseGuards, Req, Res } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { IsPublic } from '@common/decorator/is-public.decorator';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import {
  ENV_GOOGLE_CLIENT_ID,
  ENV_GOOGLE_CLIENT_SECRET,
} from '@common/const/env-keys.const';
import { RefreshTokenGuard } from './guard/bearer-token.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {}

  @Post('/check-email-duplication')
  @IsPublic()
  async checkEmailDuplication(@Body('email') email: string) {
    return await this.authService.checkEmailDuplication(email);
  }

  @Post('/send-email-verification-code')
  @IsPublic()
  async sendEmailVerificationCode(@Body('email') email: string) {
    return await this.authService.sendEmailVerificationCode(email);
  }

  @Post('/register-user-info')
  @IsPublic()
  async registerUserInfo(
    @Body('email') email: string,
    @Body('name') name: string,
    @Body('nickname') nickname: string,
    @Body('password') password: string
  ) {
    return await this.authService.registerUserInfo({
      email,
      name,
      nickname,
      password,
    });
  }

  @Post('/verify-code')
  @IsPublic()
  async verifyCode(
    @Body('email') email: string,
    @Body('verification_code') verification_code: number
  ) {
    return await this.authService.verifyCode({
      email,
      verificationCode: verification_code,
    });
  }

  @Post('token/access')
  @IsPublic()
  @UseGuards(RefreshTokenGuard)
  postTokenAccess(@Req() req: Request) {
    const refreshToken = req.cookies['refreshToken'];

    const newToken = this.authService.rotateToken({
      token: refreshToken,
      isRefreshToken: false,
    });

    return {
      accessToken: newToken,
    };
  }

  @Post('token/refresh')
  @IsPublic()
  @UseGuards(RefreshTokenGuard)
  postTokenRefresh(@Req() req: Request) {
    const refreshToken = req.cookies['refreshToken'];

    const newToken = this.authService.rotateToken({
      token: refreshToken,
      isRefreshToken: true,
    });

    return {
      refreshToken: newToken,
    };
  }

  @Post('/logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.cookie('refreshToken', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
  }

  @Post('/login/google')
  @IsPublic()
  async loginWithGoogle(
    @Body('code') code: string,
    @Res({ passthrough: true }) res: Response
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const client = new OAuth2Client(
      this.configService.get<string>(ENV_GOOGLE_CLIENT_ID),
      this.configService.get<string>(ENV_GOOGLE_CLIENT_SECRET),
      'postmessage'
    );

    const { tokens } = await client.getToken(code);

    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name } = ticket.getPayload();

    const { accessToken, refreshToken } = await this.authService.login({
      email,
      name,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
