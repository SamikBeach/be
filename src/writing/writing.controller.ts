import { Controller, Get, Param, Query } from '@nestjs/common';
import { WritingService } from './writing.service';

@Controller('writing')
export class WritingController {
  constructor(private readonly writingService: WritingService) {}

  @Get()
  getAllAuthors() {
    return this.writingService.getAllWritings();
  }

  @Get('search')
  searchWriting(@Query('authorId') authorId: number) {
    return this.writingService.searchWriting(authorId);
  }

  @Get(':writingId')
  getAuthorById(@Param('writingId') writingId: number) {
    return this.writingService.getWritingById(writingId);
  }
}
