import {
  Controller,
  Post,
  Param,
  Delete,
  Query,
  Body,
  Get,
} from '@nestjs/common';
import { AuthorLikeService } from './author_like.service';
import { IsPublic } from '@common/decorator/is-public.decorator';

@Controller('author-like')
export class AuthorLikeController {
  constructor(private readonly authorLikeService: AuthorLikeService) {}

  @Post(':authorId')
  @IsPublic()
  create(@Param('authorId') authorId: number, @Body('userId') userId: number) {
    return this.authorLikeService.addLike({ authorId, userId });
  }

  @Delete(':authorId')
  @IsPublic()
  remove(@Param('authorId') authorId: number, @Query('userId') userId: number) {
    return this.authorLikeService.removeLike({
      authorId,
      userId,
    });
  }

  @Get(':authorId')
  @IsPublic()
  find(@Param('authorId') authorId: number, @Query('userId') userId: number) {
    return this.authorLikeService.findLike({
      authorId,
      userId,
    });
  }

  @Get(':authorId/count')
  @IsPublic()
  findAllLikes(@Param('authorId') authorId: number) {
    return this.authorLikeService.findAllLikes(authorId);
  }
}
