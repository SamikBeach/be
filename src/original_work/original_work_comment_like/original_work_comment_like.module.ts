import { Module } from '@nestjs/common';
import { OriginalWorkCommentLikeService } from './original_work_comment_like.service';
import { OriginalWorkCommentLikeController } from './original_work_comment_like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OriginalWorkCommentLikeModel } from './entities/original_work_comment_like.entity';
import { OriginalWorkCommentModule } from '@original_work/original_work_comment/original_work_comment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OriginalWorkCommentLikeModel]),
    OriginalWorkCommentModule,
  ],
  controllers: [OriginalWorkCommentLikeController],
  providers: [OriginalWorkCommentLikeService],
})
export class OriginalWorkCommentLikeModule {}
