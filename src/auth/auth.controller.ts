import {
  Controller,
  Post,
  Body,
  Headers,
  UseGuards,
  Req,
  Res,
  Patch,
  UnauthorizedException,
  Delete,
} from '@nestjs/common';
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
import { UserService } from '@user/user.service';
import * as bcrypt from 'bcrypt';
import { ApiBasicAuth, ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiBearerAuth()
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly configService: ConfigService
  ) {}

  @Post('/check-email-duplication')
  @IsPublic()
  async checkEmailDuplication(@Body('email') email: string) {
    return await this.authService.checkEmailDuplication(email);
  }

  @Post('/register-user-info')
  @IsPublic()
  async registerUserInfo(
    @Body('email') email: string,
    @Body('name') name: string,
    @Body('nickname') nickname: string,
    @Headers('authorization') tokenWithPrefix: string
  ) {
    const token = this.authService.extractTokenFromHeader({
      tokenWithPrefix,
      isBearer: false,
    });

    const { password } = this.authService.decodeBasicToken(token);

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

  @Post('/verify-code-and-login')
  @IsPublic()
  async verifyCodeAndLogin(
    @Body('email') email: string,
    @Body('verification_code') verification_code: number
  ) {
    return await this.authService.verifyCodeAndLogin({
      email,
      verificationCode: verification_code,
    });
  }

  @Patch('update-user-info')
  @IsPublic()
  async updateUserInfo(
    @Body('email') email: string,
    @Body('nickname') nickname: string,
    @Headers('authorization') tokenWithPrefix: string
  ) {
    const splitToken = tokenWithPrefix.split(' ');
    const isBasicToken = splitToken[0] === 'Basic';

    let password = undefined;

    if (isBasicToken) {
      const token = this.authService.extractTokenFromHeader({
        tokenWithPrefix,
        isBearer: false,
      });

      password = this.authService.decodeBasicToken(token).password;
    }

    return await this.authService.updateUserInfo({
      email,
      password,
      nickname,
    });
  }

  @Post('send-password-reset-email')
  @IsPublic()
  async sendPasswordResetEmail(@Body('email') email: string) {
    return await this.authService.sendPasswordResetEmail(email);
  }

  @Post('change-password')
  @IsPublic()
  async changePassword(
    @Body('password') password: string,
    @Body('new_password') new_password: string,
    @Req() req: Request
  ) {
    const tokenWithPrefix = req.headers['authorization'];

    const token = this.authService.extractTokenFromHeader({
      tokenWithPrefix,
      isBearer: true,
    });

    const { email } = await this.authService.verifyToken(token);

    const user = await this.userService.getUserByEmail(email);

    const decodedPassword = Buffer.from(password, 'base64').toString('utf8');

    if (user.password == null) {
      throw new UnauthorizedException(
        '소셜 로그인 사용자는 비밀번호를 변경할 수 없어요.'
      );
    }

    const isValidPassword = await bcrypt.compare(
      decodedPassword,
      user.password
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('비밀번호가 틀렸어요.');
    }

    const newPassword = Buffer.from(new_password, 'base64').toString('utf8');

    return await this.authService.changePassword({
      email: user.email,
      new_password: newPassword,
    });
  }

  @Delete('delete-account')
  @IsPublic()
  async deleteAccount(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const tokenWithPrefix = req.headers['authorization'];

    const token = this.authService.extractTokenFromHeader({
      tokenWithPrefix,
      isBearer: true,
    });

    const { email } = await this.authService.verifyToken(token);

    res.cookie('refreshToken', undefined, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    res.cookie('accessToken', undefined, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return await this.authService.deleteAccount({ email });
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

  @Post('/login/email')
  @ApiBasicAuth()
  @IsPublic()
  async login(
    @Headers('authorization') tokenWithPrefix: string,
    @Res({ passthrough: true }) res: Response
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    user: {
      id: number;
      email: string;
      name?: string;
      nickname?: string;
    };
  }> {
    const token = this.authService.extractTokenFromHeader({
      tokenWithPrefix,
      isBearer: false,
    });

    const { email, password } = this.authService.decodeBasicToken(token);

    const { accessToken, refreshToken, user } =
      await this.authService.loginWithEmail({
        email,
        password,
      });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  @Post('/login/google')
  @IsPublic()
  async loginWithGoogle(
    @Body('code') code: string,
    @Res({ passthrough: true }) res: Response
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    user: {
      id: number;
      email: string;
      name?: string;
      nickname?: string;
    };
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

    const { accessToken, refreshToken, user } =
      await this.authService.loginWithGoogle({
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
      user,
    };
  }

  @Post('/sign-up/google')
  @IsPublic()
  async signUpWithGoogle(
    @Body('code') code: string,
    @Res({ passthrough: true }) res: Response
  ) {
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

    await this.authService.checkEmailDuplication(email);

    const { accessToken, refreshToken, user } =
      await this.authService.loginWithGoogle({
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
      user,
    };
  }
}
