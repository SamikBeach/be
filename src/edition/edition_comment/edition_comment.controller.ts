import {
  Controller,
  Post,
  Body,
  Param,
  Patch,
  Get,
  Delete,
} from '@nestjs/common';
import { EditionCommentService } from './edition_comment.service';
import { IsPublic } from '@common/decorator/is-public.decorator';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@Controller('edition-comment')
export class EditionCommentController {
  constructor(private readonly editionCommentService: EditionCommentService) {}

  @Get(':editionId/search')
  @IsPublic()
  searchComments(
    @Param('editionId') editionId: number,
    @Paginate() dto: PaginateQuery
  ) {
    return this.editionCommentService.searchComments({
      editionId,
      dto,
    });
  }

  @Get(':editionId')
  @IsPublic()
  getAllComments(@Param('editionId') editionId: number) {
    return this.editionCommentService.getAllComments(editionId);
  }

  @Post(':editionId')
  @IsPublic()
  addComment(
    @Param('editionId') editionId: number,
    @Body('userId') userId: number,
    @Body('comment') comment: string,
    @Body('targetCommentId') targetCommentId: number,
    @Body('targetUserId') targetUserId: number
  ) {
    return this.editionCommentService.addComment({
      editionId,
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
    return this.editionCommentService.updateComment({
      commentId,
      comment,
    });
  }

  @Delete(':commentId')
  @IsPublic()
  deleteComment(@Param('commentId') commentId: number) {
    return this.editionCommentService.deleteComment({
      commentId,
    });
  }

  @Get('commentId/:commentId')
  @IsPublic()
  getSubCommentsByCommentById(@Param('commentId') commentId: number) {
    return this.editionCommentService.getSubCommentsByCommentById(commentId);
  }
}
