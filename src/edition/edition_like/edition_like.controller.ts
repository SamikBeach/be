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
import { IsPublic } from '@auth/decorator/is-public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('edition-like')
@ApiBearerAuth()
@ApiTags('edition-like')
export class EditionLikeController {
  constructor(private readonly editionLikeService: EditionLikeService) {}

  @Post(':editionId')
  create(
    @Param('editionId') editionId: number,
    @Body('userId') userId: number
  ) {
    return this.editionLikeService.addLike({ editionId, userId });
  }

  @Delete(':editionId')
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
