import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './user/entities/user.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
// import { AccessTokenGuard } from './auth_legacy/guard/bearer-token.guard';
import { LogMiddleware } from './common/middleware/log.middleware';
import { AuthorModule } from './author/author.module';
import { AuthorModel } from './author/entities/author.entity';
import { OriginalWorkModule } from './original_work/original_work.module';
import { OriginalWorkModel } from './original_work/entities/original_work.entity';
import { EraModel } from './author/era/entities/era.entity';
import { EraModule } from './author/era/era.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [UserModel, AuthorModel, OriginalWorkModel, EraModel],
      synchronize: false,
    }),
    AuthModule,
    UserModule,
    CommonModule,
    AuthorModule,
    OriginalWorkModule,
    EraModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: AccessTokenGuard,
    // },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
