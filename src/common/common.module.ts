import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { DefaultLogger } from './logger/default.logger';
import { TasksService } from './tasks.service';
import { AuthorModel } from '@author/entities/author.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OriginalWorkModel } from '@original_work/entities/original_work.entity';
import { EditionModel } from '@edition/entities/edition.entity';
import { AuthorCommentModel } from '@author/author_comment/entities/author_comment.entity';
import { OriginalWorkCommentModel } from '@original_work/original_work_comment/entities/original_work_comment.entity';
import { EditionCommentModel } from '@edition/edition_comment/entities/edition_comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AuthorModel,
      OriginalWorkModel,
      EditionModel,
      AuthorCommentModel,
      OriginalWorkCommentModel,
      EditionCommentModel,
    ]),
  ],
  controllers: [CommonController],
  providers: [CommonService, DefaultLogger, TasksService],
  exports: [CommonService],
})
export class CommonModule {}
