import { Module } from '@nestjs/common';
import { AuthorCommentLikeService } from './author_comment_like.service';
import { AuthorCommentLikeController } from './author_comment_like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorCommentLikeModel } from './entities/author_comment_like.entity';
import { AuthorCommentModule } from '@author/author_comment/author_comment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthorCommentLikeModel]),
    AuthorCommentModule,
  ],
  controllers: [AuthorCommentLikeController],
  providers: [AuthorCommentLikeService],
})
export class AuthorCommentLikeModule {}
