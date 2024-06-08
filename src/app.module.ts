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
import { AccessTokenGuard } from './auth/guard/bearer-token.guard';
import { LogMiddleware } from './common/middleware/log.middleware';
import { AuthorModule } from './author/author.module';
import { AuthorModel } from './author/entities/author.entity';
import { NationalityModel } from './author/entities/nationality/nationality.entity';
import { WritingModule } from './writing/writing.module';
import { WritingModel } from './writing/entities/writing.entity';
import { EducationModel } from './author/entities/education/education.entity';
import { AuthorEducationModel } from './author/entities/education/author_education.entity';
import { EraModel } from './author/entities/era/era.entity';
import { AuthorEraModel } from './author/entities/era/author_era.entity';
import { RegionModel } from './author/entities/region/region.entity';
import { AuthorRegionModel } from './author/entities/region/author_region.entity';
import { SchoolModel } from './author/entities/school/school.entity';
import { AuthorSchoolModel } from './author/entities/school/author_school.entity';
import { MainInterestModel } from './author/entities/main_interests/main_interest.entity';
import { AuthorMainInterestModel } from './author/entities/main_interests/author_main_interest.entity';
import { AuthorInfluencedModel } from './author/entities/influenced/author_influenced.entity';
import { AuthorInfluencedByModel } from './author/entities/influenced_by/author_influenced_by.entity';
import { BookModule } from './book/book.module';
import { BookModel } from './book/entities/book.entity';
import { AuthorBookModel } from './author/entities/author_book/author_book.entity';
import { WritingBookModel } from './writing/entities/writing_book/writing_book.entity';

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
        NationalityModel,
        WritingModel,
        EducationModel,
        AuthorEducationModel,
        EraModel,
        AuthorEraModel,
        RegionModel,
        AuthorRegionModel,
        SchoolModel,
        AuthorSchoolModel,
        MainInterestModel,
        AuthorMainInterestModel,
        AuthorInfluencedModel,
        AuthorInfluencedByModel,
        BookModel,
        AuthorBookModel,
        WritingBookModel,
      ],
      synchronize: false,
    }),
    AuthModule,
    UserModule,
    CommonModule,
    AuthorModule,
    WritingModule,
    BookModule,
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
