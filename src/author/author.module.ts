import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorModel } from './entities/author.entity';
import { CommonService } from '@common/common.service';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorModel])],
  controllers: [AuthorController],
  providers: [AuthorService, CommonService],
  exports: [AuthorService],
})
export class AuthorModule {}
