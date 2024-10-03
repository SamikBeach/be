import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './entities/user.entity';
import { AuthService } from '@auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { MailModule } from '@mail/mail.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel]), MailModule],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtService, ConfigService],
})
export class UserModule {}
