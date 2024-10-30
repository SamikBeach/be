import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OriginalWorkCommentLikeService } from './original_work_comment_like.service';
import { IsPublic } from '@auth/decorator/is-public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('original-work-comment-like')
@ApiBearerAuth()
@ApiTags('original-work-comment-like')
export class OriginalWorkCommentLikeController {
  constructor(
    private readonly originalWorkCommentLikeService: OriginalWorkCommentLikeService
  ) {}

  @Post(':originalWorkCommentId')
  addLike(
    @Param('originalWorkCommentId') originalWorkCommentId: number,
    @Body('userId') userId: number
  ) {
    return this.originalWorkCommentLikeService.addLike({
      originalWorkCommentId,
      userId,
    });
  }

  @Delete(':originalWorkCommentId')
  removeLike(
    @Param('originalWorkCommentId') originalWorkCommentId: number,
    @Query('userId') userId: number
  ) {
    return this.originalWorkCommentLikeService.removeLike({
      originalWorkCommentId,
      userId,
    });
  }

  @Get(':originalWorkCommentId')
  @IsPublic()
  findLike(
    @Param('originalWorkCommentId') originalWorkCommentId: number,
    @Query('userId') userId: number
  ) {
    return this.originalWorkCommentLikeService.findLike({
      originalWorkCommentId,
      userId,
    });
  }

  @Get(':originalWorkCommentId/count')
  @IsPublic()
  findAllLikes(@Param('originalWorkCommentId') originalWorkCommentId: number) {
    return this.originalWorkCommentLikeService.findAllLikes(
      originalWorkCommentId
    );
  }
}
