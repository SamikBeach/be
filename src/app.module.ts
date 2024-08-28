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
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { LogMiddleware } from './common/middleware/log.middleware';
import { AuthorModule } from './author/author.module';
import { AuthorModel } from './author/entities/author.entity';
import { OriginalWorkModule } from './original_work/original_work.module';
import { OriginalWorkModel } from './original_work/entities/original_work.entity';
import { EraModel } from './author/era/entities/era.entity';
import { EraModule } from './author/era/era.module';
import { AccessTokenGuard } from '@auth/guard/bearer-token.guard';
import { AuthorLikeModule } from './author/author_like/author_like.module';
import { AuthorLikeModel } from '@author/author_like/entities/author_like.entity';
import { OriginalWorkLikeModule } from './original_work/original_work_like/original_work_like.module';
import { OriginalWorkLikeModel } from '@original_work/original_work_like/entities/original_work_like.entity';
import { AuthorCommentModule } from './author/author_comment/author_comment.module';
import { AuthorCommentModel } from '@author/author_comment/entities/author_comment.entity';
import { AuthorCommentLikeModule } from './author/author_comment_like/author_comment_like.module';
import { AuthorCommentLikeModel } from '@author/author_comment_like/entities/author_comment_like.entity';
import { OriginalWorkCommentModel } from '@original_work/original_work_comment/entities/original_work_comment.entity';
import { OriginalWorkCommentModule } from '@original_work/original_work_comment/original_work_comment.module';
import { OriginalWorkCommentLikeModule } from '@original_work/original_work_comment_like/original_work_comment_like.module';
import { OriginalWorkCommentLikeModel } from '@original_work/original_work_comment_like/entities/original_work_comment_like.entity';

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
      entities: [
        UserModel,
        AuthorModel,
        OriginalWorkModel,
        EraModel,
        AuthorLikeModel,
        AuthorCommentModel,
        AuthorCommentLikeModel,
        OriginalWorkLikeModel,
        OriginalWorkCommentModel,
        OriginalWorkCommentLikeModel,
      ],
      synchronize: false,
    }),
    AuthModule,
    UserModule,
    CommonModule,
    AuthorModule,
    OriginalWorkModule,
    EraModule,
    AuthorLikeModule,
    AuthorCommentModule,
    AuthorCommentLikeModule,
    OriginalWorkLikeModule,
    OriginalWorkCommentModule,
    OriginalWorkCommentLikeModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
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
