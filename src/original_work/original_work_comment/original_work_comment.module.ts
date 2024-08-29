import { Module } from '@nestjs/common';
import { OriginalWorkCommentService } from './original_work_comment.service';
import { OriginalWorkCommentController } from './original_work_comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OriginalWorkCommentModel } from './entities/original_work_comment.entity';
import { LogModule } from '@log/log.module';

@Module({
  imports: [TypeOrmModule.forFeature([OriginalWorkCommentModel]), LogModule],
  exports: [OriginalWorkCommentService],
  controllers: [OriginalWorkCommentController],
  providers: [OriginalWorkCommentService],
})
export class OriginalWorkCommentModule {}
