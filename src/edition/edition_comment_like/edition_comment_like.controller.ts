import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EditionCommentLikeService } from './edition_comment_like.service';
import { IsPublic } from '@common/decorator/is-public.decorator';

@Controller('edition-comment-like')
export class EditionCommentLikeController {
  constructor(
    private readonly editionCommentLikeService: EditionCommentLikeService
  ) {}

  @Post(':editionCommentId')
  @IsPublic()
  addLike(
    @Param('editionCommentId') editionCommentId: number,
    @Body('userId') userId: number
  ) {
    return this.editionCommentLikeService.addLike({
      editionCommentId,
      userId,
    });
  }

  @Delete(':editionCommentId')
  @IsPublic()
  removeLike(
    @Param('editionCommentId') editionCommentId: number,
    @Query('userId') userId: number
  ) {
    return this.editionCommentLikeService.removeLike({
      editionCommentId,
      userId,
    });
  }

  @Get(':editionCommentId')
  @IsPublic()
  findLike(
    @Param('editionCommentId') editionCommentId: number,
    @Query('userId') userId: number
  ) {
    return this.editionCommentLikeService.findLike({
      editionCommentId,
      userId,
    });
  }

  @Get(':editionCommentId/count')
  @IsPublic()
  findAllLikes(@Param('editionCommentId') editionCommentId: number) {
    return this.editionCommentLikeService.findAllLikes(editionCommentId);
  }
}
