import { Controller, Get, Param } from '@nestjs/common';
import { OriginalWorkService } from './original_work.service';
import { IsPublic } from '@auth/decorator/is-public.decorator';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('original-work')
@ApiBearerAuth()
@ApiTags('original-work')
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
