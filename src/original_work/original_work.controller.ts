import { Controller, Get, Param, Query } from '@nestjs/common';
import { OriginalWorkService } from './original_work.service';
import { IsPublic } from '@common/decorator/is-public.decorator';
import { SearchOriginalWorksDto } from './dto/search-original-work.dto';

@Controller('originalWork')
export class OriginalWorkController {
  constructor(private readonly originalWorkService: OriginalWorkService) {}

  @Get()
  @IsPublic()
  getAllAuthors() {
    return this.originalWorkService.getAllOriginalWorks();
  }

  @Get('search')
  @IsPublic()
  searchOriginalWork(@Query() dto: SearchOriginalWorksDto) {
    return this.originalWorkService.searchOriginalWorks(dto);
  }

  @Get(':originalWorkId')
  @IsPublic()
  getOriginalWorkById(@Param('originalWorkId') originalWorkId: number) {
    return this.originalWorkService.getOriginalWorkById(originalWorkId);
  }
}
