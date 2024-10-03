import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService
  ) {}

  sendVerificationCode(to: string): void {
    this.mailerService
      .sendMail({
        to,
        from: this.configService.get<string>('MAIL_USER'),
        subject: '삼익비치 인증코드',
        text: `Your verification code is ${Math.floor(
          100000 + Math.random() * 900000
        )}`,
        html: `인증코드는 <b>${Math.floor(
          100000 + Math.random() * 900000
        )}</b>입니다.`,
      })
      .then(result => {
        console.log(result);
        return true;
      })
      .catch(error => {
        console.log(error);
        throw new InternalServerErrorException('이메일 전송에 실패했습니다.');
      });
  }
}
