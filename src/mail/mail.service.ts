import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService
  ) {}

  sendVerificationCode(to: string, verificationCode: number): void {
    this.mailerService
      .sendMail({
        to,
        from: this.configService.get<string>('MAIL_USER'),
        subject: '삼익비치 인증코드',
        html: `인증코드는 <b>${verificationCode}</b>입니다.`,
      })
      .then(() => {
        return true;
      })
      .catch(error => {
        console.log(error);
        throw new InternalServerErrorException('이메일 전송에 실패했습니다.');
      });
  }
}
