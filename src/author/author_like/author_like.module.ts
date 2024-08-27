import { Module } from '@nestjs/common';
import { AuthorLikeService } from './author_like.service';
import { AuthorLikeController } from './author_like.controller';
import { AuthorLikeModel } from './entities/author_like.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorLikeModel])],
  exports: [AuthorLikeService],
  controllers: [AuthorLikeController],
  providers: [AuthorLikeService],
})
export class AuthorLikeModule {}
