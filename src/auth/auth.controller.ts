import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Headers,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token/access')
  // @IsPublic()
  // @UseGuards(RefreshTokenGuard)
  postTokenAccess(@Headers('authorization') tokenWithPrefix: string) {
    const token = this.authService.extractTokenFromHeader({
      tokenWithPrefix,
      isBearer: true,
    });

    const newToken = this.authService.rotateToken({
      token,
      isRefreshToken: false,
    });

    return {
      accessToken: newToken,
    };
  }

  @Post('token/refresh')
  // @IsPublic()
  // @UseGuards(RefreshTokenGuard)
  postTokenRefresh(@Headers('authorization') tokenWithPrefix: string) {
    const token = this.authService.extractTokenFromHeader({
      tokenWithPrefix,
      isBearer: true,
    });

    const newToken = this.authService.rotateToken({
      token,
      isRefreshToken: true,
    });

    return {
      refreshToken: newToken,
    };
  }

  @Post('login/email')
  // @IsPublic()
  // @UseGuards(BasicTokenGuard)
  loginWithEmail(@Headers('authorization') tokenWithPrefix: string) {
    const token = this.authService.extractTokenFromHeader({
      tokenWithPrefix,
      isBearer: false,
    });

    const { email, password } = this.authService.decodeBasicToken(token);

    return this.authService.loginWithEmail({ email, password });
  }

  @Post('register/email')
  // @IsPublic()
  registerWithEmail(@Body() body: RegisterUserDto) {
    return this.authService.registerWithEmail(body);
  }
}
