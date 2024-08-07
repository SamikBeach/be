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
import { NationalityModel } from './author/nationality/entities/nationality.entity';
import { WritingModule } from './writing/writing.module';
import { WritingModel } from './writing/entities/writing.entity';
import { EducationModel } from './author/education/entities/education.entity';
import { AuthorEducationModel } from './author/entities/education/author_education.entity';
import { EraModel } from './author/era/entities/era.entity';
import { AuthorEraModel } from './author/entities/era/author_era.entity';
import { RegionModel } from './author/region/entities/region.entity';
import { AuthorRegionModel } from './author/entities/region/author_region.entity';
import { SchoolModel } from './author/school/entities/school.entity';
import { AuthorSchoolModel } from './author/entities/school/author_school.entity';
import { MainInterestModel } from './author/main_interest/entities/main_interest.entity';
import { AuthorMainInterestModel } from './author/entities/main_interest/author_main_interest.entity';
import { AuthorInfluencedModel } from './author/entities/influenced/author_influenced.entity';
import { AuthorInfluencedByModel } from './author/entities/influenced_by/author_influenced_by.entity';
import { BookModule } from './book/book.module';
import { BookModel } from './book/entities/book.entity';
import { AuthorBookModel } from './author/entities/book/author_book.entity';
import { WritingBookModel } from './writing/entities/writing_book/writing_book.entity';
import { EraModule } from './author/era/era.module';
import { RegionModule } from './author/region/region.module';
import { NationalityModule } from './author/nationality/nationality.module';
import { MainInterestModule } from './author/main_interest/main_interest.module';
import { SchoolModule } from './author/school/school.module';
import { EducationModule } from './author/education/education.module';

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
    EraModule,
    RegionModule,
    NationalityModule,
    MainInterestModule,
    SchoolModule,
    EducationModule,
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
