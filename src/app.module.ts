import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import emailConfig from './config/emailConfig';
import { UserModule } from './user/user.module';
import { EmailService } from './email/email.service';
import { validationSchema } from './config/validationSchema';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.env.${process.env.NODE_ENV}`],
      load: [emailConfig],
      isGlobal: true,
      validationSchema,
      validationOptions: {
        abortEarly: true,
      },
    }),
  ],
  controllers: [],
  providers: [EmailService],
})
export class AppModule {}
