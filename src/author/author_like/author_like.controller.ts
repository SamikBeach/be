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
import { IsPublic } from '@auth/decorator/is-public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('author-like')
@ApiBearerAuth()
@ApiTags('author-like')
export class AuthorLikeController {
  constructor(private readonly authorLikeService: AuthorLikeService) {}

  @Post(':authorId')
  addLike(@Param('authorId') authorId: number, @Body('userId') userId: number) {
    return this.authorLikeService.addLike({ authorId, userId });
  }

  @Delete(':authorId')
  removeLike(
    @Param('authorId') authorId: number,
    @Query('userId') userId: number
  ) {
    return this.authorLikeService.removeLike({
      authorId,
      userId,
    });
  }

  @Get(':authorId')
  @IsPublic()
  findLike(
    @Param('authorId') authorId: number,
    @Query('userId') userId: number
  ) {
    return this.authorLikeService.findLike({
      authorId,
      userId,
    });
  }

  @Get(':authorId/count')
  @IsPublic()
  findAllLikes(@Param('authorId') authorId: number) {
    return this.authorLikeService.getLikeCountByAuthorId(authorId);
  }
}
