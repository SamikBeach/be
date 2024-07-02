import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModel } from './entities/book.entity';
import { ConfigService } from '@nestjs/config';
import { CommonService } from '@common/common.service';

@Module({
  imports: [TypeOrmModule.forFeature([BookModel])],
  controllers: [BookController],
  providers: [BookService, ConfigService, CommonService],
  exports: [BookService],
})
export class BookModule {}
