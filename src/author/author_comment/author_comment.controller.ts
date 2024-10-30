import {
  Controller,
  Post,
  Body,
  Param,
  Patch,
  Get,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthorCommentService } from './author_comment.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsPublic } from '@auth/decorator/is-public.decorator';

@Controller('author-comment')
@ApiBearerAuth()
@ApiTags('author-comment')
export class AuthorCommentController {
  constructor(private readonly authorCommentService: AuthorCommentService) {}

  @Get(':authorId/search')
  @IsPublic()
  searchComments(
    @Param('authorId') authorId: number,
    @Paginate() dto: PaginateQuery
  ) {
    return this.authorCommentService.searchComments({
      authorId,
      dto,
    });
  }

  @Get(':authorId')
  @IsPublic()
  getAllComments(@Param('authorId') authorId: number) {
    return this.authorCommentService.getAllComments(authorId);
  }

  @Post(':authorId')
  addComment(
    @Param('authorId') authorId: number,
    @Body('userId') userId: number,
    @Body('comment') comment: string,
    @Body('targetCommentId') targetCommentId: number,
    @Body('targetUserId') targetUserId: number
  ) {
    return this.authorCommentService.addComment({
      authorId,
      userId,
      comment,
      targetCommentId,
      targetUserId,
    });
  }

  @Patch(':commentId')
  updateComment(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body('comment') comment: string
  ) {
    return this.authorCommentService.updateComment({
      commentId,
      comment,
    });
  }

  @Delete(':commentId')
  deleteComment(@Param('commentId') commentId: number) {
    return this.authorCommentService.deleteComment({
      commentId,
    });
  }

  @Get('commentId/:commentId')
  @IsPublic()
  getSubCommentsByCommentById(@Param('commentId') commentId: number) {
    return this.authorCommentService.getSubCommentsByCommentById(commentId);
  }
}
