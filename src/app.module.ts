import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as winston from 'winston';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';

import emailConfig from './config/emailConfig';
import { UserModule } from './user/user.module';
import { EmailService } from './email/email.service';
import { validationSchema } from './config/validationSchema';
import authConfig from './config/authConfig';
import { ExceptionModule } from './exception/exception.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.env.${process.env.NODE_ENV}`],
      load: [emailConfig, authConfig],
      isGlobal: true,
      validationSchema,
      validationOptions: {
        abortEarly: true,
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: 'test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
      migrations: [__dirname + '/**/migrations/*.js'],
      migrationsTableName: 'migrations',
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike('MyApp', {
              prettyPrint: true,
            })
          ),
        }),
      ],
    }),
    ExceptionModule,
  ],
  controllers: [],
  providers: [EmailService],
})
export class AppModule {}
