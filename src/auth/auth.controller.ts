import {
  Controller,
  Post,
  Body,
  Headers,
  UseGuards,
  Res,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { IsPublic } from 'src/common/decorator/is-public.decorator';
import { RefreshTokenGuard } from './guard/bearer-token.guard';
import { BasicTokenGuard } from './guard/basic-token.guard';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

  @Post('login/email')
  @IsPublic()
  @UseGuards(BasicTokenGuard)
  async loginWithEmail(
    @Headers('authorization') tokenWithPrefix: string,
    @Res({ passthrough: true }) res: Response
  ) {
    const token = this.authService.extractTokenFromHeader({
      tokenWithPrefix,
      isBearer: false,
    });

    const { email, password } = this.authService.decodeBasicToken(token);

    const { refreshToken, accessToken } = await this.authService.loginWithEmail(
      {
        email,
        password,
      }
    );

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

  @Post('register/email')
  @IsPublic()
  async registerWithEmail(
    @Body() body: RegisterUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { accessToken, refreshToken } =
      await this.authService.registerWithEmail(body);

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
