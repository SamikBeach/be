import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { EditionService } from './edition.service';
import { IsPublic } from '@auth/decorator/is-public.decorator';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller('edition')
@ApiBearerAuth()
@ApiTags('edition')
export class EditionController {
  constructor(private readonly editionService: EditionService) {}

  @Get()
  @IsPublic()
  getAllEditions() {
    return this.editionService.getAllEditions();
  }

  @Get('search')
  @IsPublic()
  searchEditions(@Paginate() dto: PaginateQuery) {
    return this.editionService.searchEditions(dto);
  }

  @Get('trending')
  @IsPublic()
  @UseInterceptors(CacheInterceptor)
  @CacheKey('edition/trending')
  @CacheTTL(100000)
  getTrendingAuthors() {
    return this.editionService.getTrendingEditions();
  }

  @Get(':editionId')
  @IsPublic()
  getEditionById(@Param('editionId') editionId: number) {
    return this.editionService.getEditionById(editionId);
  }
}
