import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '@user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { MailService } from '@mail/mail.service';

@Module({
  imports: [JwtModule.register({}), UserModule],
  exports: [AuthService, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, MailService],
})
export class AuthModule {}
