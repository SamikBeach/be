import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EditionLikeService } from './edition_like.service';
import { IsPublic } from '@common/decorator/is-public.decorator';

@Controller('edition-like')
export class EditionLikeController {
  constructor(private readonly editionLikeService: EditionLikeService) {}

  @Post(':editionId')
  @IsPublic()
  create(
    @Param('editionId') editionId: number,
    @Body('userId') userId: number
  ) {
    return this.editionLikeService.addLike({ editionId, userId });
  }

  @Delete(':editionId')
  @IsPublic()
  remove(
    @Param('editionId') editionId: number,
    @Query('userId') userId: number
  ) {
    return this.editionLikeService.removeLike({
      editionId,
      userId,
    });
  }

  @Get(':editionId')
  @IsPublic()
  find(@Param('editionId') editionId: number, @Query('userId') userId: number) {
    return this.editionLikeService.findLike({
      editionId,
      userId,
    });
  }

  @Get(':editionId/count')
  @IsPublic()
  findAllLikes(@Param('editionId') editionId: number) {
    return this.editionLikeService.getLikeCountByEditionId(editionId);
  }
}
