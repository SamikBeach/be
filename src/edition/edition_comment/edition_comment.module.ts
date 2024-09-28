import { Module } from '@nestjs/common';
import { EditionCommentService } from './edition_comment.service';
import { EditionCommentController } from './edition_comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EditionCommentModel } from './entities/edition_comment.entity';
import { LogModule } from '@log/log.module';
import { CommonModule } from '@common/common.module';
import { EditionModule } from '@edition/edition.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EditionCommentModel]),
    LogModule,
    CommonModule,
    EditionModule,
  ],
  exports: [EditionCommentService],
  controllers: [EditionCommentController],
  providers: [EditionCommentService],
})
export class EditionCommentModule {}
