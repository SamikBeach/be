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
import { IsPublic } from '@auth/decorator/is-public.decorator';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('original-work-comment')
@ApiBearerAuth()
@ApiTags('original-work-comment')
export class OriginalWorkCommentController {
  constructor(
    private readonly originalWorkCommentService: OriginalWorkCommentService
  ) {}

  @Get(':originalWorkId/search')
  @IsPublic()
  searchComments(
    @Param('originalWorkId') originalWorkId: number,
    @Paginate() dto: PaginateQuery
  ) {
    return this.originalWorkCommentService.searchComments({
      originalWorkId,
      dto,
    });
  }

  @Get(':originalWorkId')
  @IsPublic()
  getAllComments(@Param('originalWorkId') originalWorkId: number) {
    return this.originalWorkCommentService.getAllComments(originalWorkId);
  }

  @Post(':originalWorkId')
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
