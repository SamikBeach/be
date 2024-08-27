import { Controller, Post, Body, Param, Patch } from '@nestjs/common';
import { AuthorCommentService } from './author_comment.service';
import { IsPublic } from '@common/decorator/is-public.decorator';

@Controller('author-comment')
export class AuthorCommentController {
  constructor(private readonly authorCommentService: AuthorCommentService) {}

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

  @Patch(':authorId/commentId/:commentId')
  @IsPublic()
  updateComment(
    @Param('authorId') authorId: number,
    @Param('commentId') commentId: number,
    @Body('comment') comment: string
  ) {
    return this.authorCommentService.updateComment({
      authorId,
      commentId,
      comment,
    });
  }
}
