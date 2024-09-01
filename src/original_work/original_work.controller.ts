import { Controller, Get, Param } from '@nestjs/common';
import { OriginalWorkService } from './original_work.service';
import { IsPublic } from '@common/decorator/is-public.decorator';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@Controller('original-work')
export class OriginalWorkController {
  constructor(private readonly originalWorkService: OriginalWorkService) {}

  @Get()
  @IsPublic()
  getAllOriginalWorks() {
    return this.originalWorkService.getAllOriginalWorks();
  }

  @Get('search')
  @IsPublic()
  searchOriginalWorks(@Paginate() dto: PaginateQuery) {
    return this.originalWorkService.searchOriginalWorks(dto);
  }

  @Get('trending')
  @IsPublic()
  getTrendingAuthors() {
    return this.originalWorkService.getTrendingOriginalWorks();
  }

  @Get(':originalWorkId')
  @IsPublic()
  getOriginalWorkById(@Param('originalWorkId') originalWorkId: number) {
    return this.originalWorkService.getOriginalWorkById(originalWorkId);
  }
}
