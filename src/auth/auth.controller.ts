import { Controller, Post, Body } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { IsPublic } from '@common/decorator/is-public.decorator';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import {
  ENV_GOOGLE_CLIENT_ID,
  ENV_GOOGLE_CLIENT_SECRET,
} from '@common/const/env-keys.const';
import { UserModel } from '@user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {}

  @Post('/login/google')
  @IsPublic()
  async loginWithGoogle(
    @Body('token') token: string
  ): Promise<UserModel & { image: string }> {
    console.log({ token });
    const client = new OAuth2Client(
      this.configService.get<string>(ENV_GOOGLE_CLIENT_ID),
      this.configService.get<string>(ENV_GOOGLE_CLIENT_SECRET)
    );

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const data = await this.authService.login({
      email: payload.email,
      name: payload.name,
    });

    return { ...data, image: payload.picture };
  }
}
