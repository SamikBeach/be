import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        transport: {
          host: process.env.MAIL_HOST, // 이메일을 보낼 SMTP 서버의 주소
          port: Number(process.env.MAIL_PORT),
          auth: {
            user: process.env.MAIL_USER, // SMTP 서버 인증을 위한 이메일
            pass: process.env.MAIL_PASSWORD, // SMTP 서버 인증을 위한 비밀번호
          },
          secure: true,
        },
        defaults: {
          from: `"bong" <${process.env.MAIL_USER}>`,
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
