import {
  Controller,
  Post,
  Body,
  Param,
  Patch,
  Get,
  Delete,
} from '@nestjs/common';
import { AuthorCommentService } from './author_comment.service';
import { IsPublic } from '@common/decorator/is-public.decorator';

@Controller('author-comment')
export class AuthorCommentController {
  constructor(private readonly authorCommentService: AuthorCommentService) {}

  @Get(':authorId')
  @IsPublic()
  getAllComments(@Param('authorId') authorId: number) {
    return this.authorCommentService.getAllComments(authorId);
  }

  @Post(':authorId')
  @IsPublic()
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
  @IsPublic()
  updateComment(
    @Param('commentId') commentId: number,
    @Body('comment') comment: string
  ) {
    return this.authorCommentService.updateComment({
      commentId,
      comment,
    });
  }

  @Delete(':commentId')
  @IsPublic()
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
