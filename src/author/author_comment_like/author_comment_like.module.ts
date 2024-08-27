import { Module } from '@nestjs/common';
import { AuthorCommentLikeService } from './author_comment_like.service';
import { AuthorCommentLikeController } from './author_comment_like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorCommentLikeModel } from './entities/author_comment_like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorCommentLikeModel])],
  controllers: [AuthorCommentLikeController],
  providers: [AuthorCommentLikeService],
})
export class AuthorCommentLikeModule {}
