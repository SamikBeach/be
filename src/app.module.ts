import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { EmailService } from './email/email.service';

@Module({
  controllers: [],
  providers: [EmailService],
  imports: [UserModule],
})
export class AppModule {}
