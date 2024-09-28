import { Module } from '@nestjs/common';
import { EditionCommentLikeService } from './edition_comment_like.service';
import { EditionCommentLikeController } from './edition_comment_like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EditionCommentLikeModel } from './entities/edition_comment_like.entity';
import { EditionCommentModule } from '@edition/edition_comment/edition_comment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EditionCommentLikeModel]),
    EditionCommentModule,
  ],
  controllers: [EditionCommentLikeController],
  providers: [EditionCommentLikeService],
})
export class EditionCommentLikeModule {}
