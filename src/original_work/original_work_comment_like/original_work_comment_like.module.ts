import { Module } from '@nestjs/common';
import { OriginalWorkCommentLikeService } from './original_work_comment_like.service';
import { OriginalWorkCommentLikeController } from './original_work_comment_like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OriginalWorkCommentLikeModel } from './entities/original_work_comment_like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OriginalWorkCommentLikeModel])],
  controllers: [OriginalWorkCommentLikeController],
  providers: [OriginalWorkCommentLikeService],
})
export class OriginalWorkCommentLikeModule {}
