import { ENV_JWT_SECRET_KEY } from '@common/const/env-keys.const';
import { MailService } from '@mail/mail.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService
  ) {}

  async login({ email }: { email: string; name: string }): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const user = await this.userService.getUserByEmail(email);

    let userEmail = '';

    if (!user) {
      const createdUser = await this.userService.createUser({
        email,
      });

      userEmail = createdUser.email;
    } else {
      userEmail = user.email;
    }

    return {
      accessToken: this.signToken({
        email: userEmail,
        isRefreshToken: false,
      }),
      refreshToken: this.signToken({
        email: userEmail,
        isRefreshToken: true,
      }),
    };
  }

  extractTokenFromHeader({
    tokenWithPrefix,
    isBearer,
  }: {
    tokenWithPrefix: string;
    isBearer: boolean;
  }) {
    const splitToken = tokenWithPrefix.split(' ');

    const prefix = isBearer ? 'Bearer' : 'Basic';

    if (splitToken.length !== 2 || splitToken[0] !== prefix) {
      throw new UnauthorizedException('잘못된 토큰입니다!');
    }

    const token = splitToken[1];

    return token;
  }

  verifyToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.get<string>(ENV_JWT_SECRET_KEY),
      });
    } catch {
      throw new UnauthorizedException('토큰이 만료됐거나 잘못된 토큰입니다.');
    }
  }

  rotateToken({
    token,
    isRefreshToken,
  }: {
    token: string;
    isRefreshToken: boolean;
  }) {
    const user = this.jwtService.verify(token, {
      secret: this.configService.get<string>(ENV_JWT_SECRET_KEY),
      complete: true,
    });

    if (user.payload.type !== 'refresh') {
      throw new UnauthorizedException(
        '토큰 재발급은 Refresh 토큰으로만 가능합니다!'
      );
    }

    return this.signToken({
      email: user.payload.email,
      isRefreshToken,
    });
  }

  signToken({
    email,
    isRefreshToken,
  }: {
    email: string;
    isRefreshToken: boolean;
  }) {
    const payload = {
      email,
      type: isRefreshToken ? 'refresh' : 'access',
    };

    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>(ENV_JWT_SECRET_KEY),
      expiresIn: isRefreshToken
        ? 60 * 60 * 24 * 30 // 30일
        : 60 * 60, // 1시간,
    });
  }

  async checkEmailDuplication(email: string) {
    const user = await this.userService.getUserByEmail(email);

    if (user?.verified) {
      throw new UnauthorizedException({
        message: '이미 가입된 이메일입니다.',
      });
    }

    return true;
  }

  async sendEmailVerificationCode(email: string) {
    await this.checkEmailDuplication(email);

    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    const user = this.userService.getUserByEmail(email);

    if (user) {
      this.userService.updateVerificationCode({
        email,
        verification_code: verificationCode,
      });
    } else {
      this.userService.createUser({
        email,
        verification_code: verificationCode,
      });
    }

    return this.mailService.sendVerificationCode(email, verificationCode);
  }

  async registerUserInfo({
    email,
    name,
    nickname,
    password,
  }: {
    email: string;
    name?: string;
    nickname?: string;
    password: string;
  }) {
    this.userService.registerUserInfo({ email, name, nickname, password });

    return true;
  }

  async verifyCode({
    email,
    verificationCode,
  }: {
    email: string;
    verificationCode: number;
  }) {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('가입되지 않은 이메일입니다.');
    }

    if (user.verification_code !== verificationCode) {
      throw new UnauthorizedException('인증코드가 일치하지 않습니다.');
    }

    this.userService.updateVerified(email, true);

    return true;
  }
}
