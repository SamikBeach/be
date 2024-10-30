import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OriginalWorkLikeService } from './original_work_like.service';
import { IsPublic } from '@auth/decorator/is-public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('original-work-like')
@ApiBearerAuth()
@ApiTags('original-work-like')
export class OriginalWorkLikeController {
  constructor(
    private readonly originalWorkLikeService: OriginalWorkLikeService
  ) {}

  @Post(':originalWorkId')
  @IsPublic()
  create(
    @Param('originalWorkId') originalWorkId: number,
    @Body('userId') userId: number
  ) {
    return this.originalWorkLikeService.addLike({ originalWorkId, userId });
  }

  @Delete(':originalWorkId')
  @IsPublic()
  remove(
    @Param('originalWorkId') originalWorkId: number,
    @Query('userId') userId: number
  ) {
    return this.originalWorkLikeService.removeLike({
      originalWorkId,
      userId,
    });
  }

  @Get(':originalWorkId')
  @IsPublic()
  find(
    @Param('originalWorkId') originalWorkId: number,
    @Query('userId') userId: number
  ) {
    return this.originalWorkLikeService.findLike({
      originalWorkId,
      userId,
    });
  }

  @Get(':originalWorkId/count')
  @IsPublic()
  findAllLikes(@Param('originalWorkId') originalWorkId: number) {
    return this.originalWorkLikeService.getLikeCountByOriginalWorkId(
      originalWorkId
    );
  }
}
