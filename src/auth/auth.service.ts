import { ENV_JWT_SECRET_KEY } from '@common/const/env-keys.const';
import { MailService } from '@mail/mail.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from '@user/entities/user.entity';
import { UserService } from '@user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService
  ) {}

  async loginWithGoogle({
    email,
    name,
  }: {
    email: string;
    name: string;
  }): Promise<{
    accessToken: string;
    refreshToken: string;
    user: {
      id: number;
      email: string;
      name?: string;
      nickname?: string;
    };
  }> {
    const user = await this.userService.getUserByEmail(email);

    let userEmail = '';

    if (!user) {
      const createdUser = await this.userService.createUser({
        email,
        name,
        nickname: name,
      });

      await this.userService.updateVerified(email, true);

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
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        nickname: user.nickname,
      },
    };
  }

  async authenticateWithEmailAndPassword(
    user: Pick<UserModel, 'email' | 'password'>
  ) {
    /**
     * 1. 사용자가 존재하는지 확인 (email)
     * 2. 비밀번호가 맞는지 확인
     * 3. 모두 통과되면 찾은 상용자 정보 반환
     */
    const existingUser = await this.userService.getUserByEmail(user.email);

    if (!existingUser) {
      throw new UnauthorizedException('존재하지 않는 사용자에요.');
    }

    if (existingUser.password == null) {
      throw new UnauthorizedException(
        '이미 가입된 이메일이에요. 소셜 계정으로 로그인해 주세요.'
      );
    }

    /**
     * 파라미터
     *
     * 1) 입력된 비밀번호
     * 2) 기존 해시 (hash) -> 사용자 정보에 저장돼있는 hash
     */

    const isValidPassword = await bcrypt.compare(
      user.password,
      existingUser.password
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('비밀번호가 틀렸어요.');
    }

    return existingUser;
  }

  async loginWithEmail(user: Pick<UserModel, 'email' | 'password'>): Promise<{
    accessToken: string;
    refreshToken: string;
    user: {
      id: number;
      email: string;
      name?: string;
      nickname?: string;
    };
  }> {
    const existingUser = await this.authenticateWithEmailAndPassword(user);

    return {
      accessToken: this.signToken({
        email: existingUser.email,
        isRefreshToken: false,
      }),
      refreshToken: this.signToken({
        email: existingUser.email,
        isRefreshToken: true,
      }),
      user: {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        nickname: existingUser.nickname,
      },
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

  decodeBasicToken(base64String: string) {
    const decoded = Buffer.from(base64String, 'base64').toString('utf8');

    const split = decoded.split(':');

    if (split.length !== 2) {
      throw new UnauthorizedException('잘못된 유형의 토큰입니다.');
    }

    const email = split[0];
    const password = split[1];

    return {
      email,
      password,
    };
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
        message: '이미 가입된 이메일이에요.',
      });
    }

    return true;
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

  async updateUserInfo({
    email,
    name,
    nickname,
    password,
  }: {
    email: string;
    name?: string;
    nickname?: string;
    password?: string;
  }) {
    this.userService.updateUserInfo({ email, name, nickname, password });

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
    console.log({ email, verificationCode, user });

    if (!user) {
      throw new UnauthorizedException('가입되지 않은 이메일이에요.');
    }

    if (user.verification_code !== verificationCode) {
      throw new UnauthorizedException('인증번호가 일치하지 않아요.');
    }

    await this.userService.updateVerified(email, true);

    return user;
  }

  async verifyCodeAndLogin({
    email,
    verificationCode,
  }: {
    email: string;
    verificationCode: number;
  }) {
    const user = await this.verifyCode({ email, verificationCode });

    return {
      accessToken: this.signToken({
        email: user.email,
        isRefreshToken: false,
      }),
      refreshToken: this.signToken({
        email: user.email,
        isRefreshToken: true,
      }),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        nickname: user.nickname,
      },
    };
  }

  async sendPasswordResetEmail(email: string) {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('가입되지 않은 이메일이에요.');
    }

    if (user.password == null) {
      throw new UnauthorizedException(
        '소셜 계정으로 가입된 이메일이에요. 소셜 로그인을 이용해 주세요.'
      );
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    await this.userService.updateUserInfo({
      email,
      verification_code: verificationCode,
    });

    this.mailService.sendVerificationCode(email, verificationCode);
  }
}
