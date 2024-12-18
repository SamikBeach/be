import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AuthorCommentLikeService } from './author_comment_like.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsPublic } from '@auth/decorator/is-public.decorator';

@Controller('author-comment-like')
@ApiBearerAuth()
@ApiTags('author-comment-like')
export class AuthorCommentLikeController {
  constructor(
    private readonly authorCommentLikeService: AuthorCommentLikeService
  ) {}

  @Post(':authorCommentId')
  addLike(
    @Param('authorCommentId') authorCommentId: number,
    @Body('userId') userId: number
  ) {
    return this.authorCommentLikeService.addLike({ authorCommentId, userId });
  }

  @Delete(':authorCommentId')
  removeLike(
    @Param('authorCommentId') authorCommentId: number,
    @Query('userId') userId: number
  ) {
    return this.authorCommentLikeService.removeLike({
      authorCommentId,
      userId,
    });
  }

  @Get(':authorCommentId')
  @IsPublic()
  findLike(
    @Param('authorCommentId') authorCommentId: number,
    @Query('userId') userId: number
  ) {
    return this.authorCommentLikeService.findLike({
      authorCommentId,
      userId,
    });
  }

  @Get(':authorCommentId/count')
  @IsPublic()
  findAllLikes(@Param('authorCommentId') authorCommentId: number) {
    return this.authorCommentLikeService.findAllLikes(authorCommentId);
  }
}
