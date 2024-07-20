import { Controller, Get, Param, Query } from '@nestjs/common';
import { WritingService } from './writing.service';
import { IsPublic } from '@common/decorator/is-public.decorator';
import { SearchWritingsDto } from './dto/search-writings.dto';

@Controller('writing')
export class WritingController {
  constructor(private readonly writingService: WritingService) {}

  @Get()
  @IsPublic()
  getAllAuthors() {
    return this.writingService.getAllWritings();
  }

  @Get('search')
  @IsPublic()
  searchWriting(@Query() dto: SearchWritingsDto) {
    return this.writingService.searchWritings(dto);
  }

  @Get(':writingId')
  @IsPublic()
  getWritingById(@Param('writingId') writingId: number) {
    return this.writingService.getWritingById(writingId);
  }
}
