import { Module } from '@nestjs/common';
import { AuthorCommentService } from './author_comment.service';
import { AuthorCommentController } from './author_comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorCommentModel } from './entities/author_comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorCommentModel])],
  exports: [AuthorCommentService],
  controllers: [AuthorCommentController],
  providers: [AuthorCommentService],
})
export class AuthorCommentModule {}
