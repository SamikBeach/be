import {
  Controller,
  Post,
  Body,
  Param,
  Patch,
  Get,
  Delete,
} from '@nestjs/common';
import { OriginalWorkCommentService } from './original_work_comment.service';
import { IsPublic } from '@common/decorator/is-public.decorator';

@Controller('original-work-comment')
export class OriginalWorkCommentController {
  constructor(
    private readonly originalWorkCommentService: OriginalWorkCommentService
  ) {}

  @Get(':originalWorkId')
  @IsPublic()
  getAllComments(@Param('originalWorkId') originalWorkId: number) {
    return this.originalWorkCommentService.getAllComments(originalWorkId);
  }

  @Post(':originalWorkId')
  @IsPublic()
  addComment(
    @Param('originalWorkId') originalWorkId: number,
    @Body('userId') userId: number,
    @Body('comment') comment: string,
    @Body('targetCommentId') targetCommentId: number,
    @Body('targetUserId') targetUserId: number
  ) {
    return this.originalWorkCommentService.addComment({
      originalWorkId,
      userId,
      comment,
      targetCommentId,
      targetUserId,
    });
  }

  @Patch(':commentId')
  @IsPublic()
  updateComment(
    @Param('commentId') commentId: number,
    @Body('comment') comment: string
  ) {
    return this.originalWorkCommentService.updateComment({
      commentId,
      comment,
    });
  }

  @Delete(':commentId')
  @IsPublic()
  deleteComment(@Param('commentId') commentId: number) {
    return this.originalWorkCommentService.deleteComment({
      commentId,
    });
  }

  @Get('commentId/:commentId')
  @IsPublic()
  getSubCommentsByCommentById(@Param('commentId') commentId: number) {
    return this.originalWorkCommentService.getSubCommentsByCommentById(
      commentId
    );
  }
}