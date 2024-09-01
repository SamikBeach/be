import { Controller, Get, Query } from '@nestjs/common';
import { LogService } from './log.service';
import { IsPublic } from '@common/decorator/is-public.decorator';
import { PaginateQuery } from 'nestjs-paginate';

@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get('search')
  @IsPublic()
  searchLogs(@Query() dto: PaginateQuery) {
    return this.logService.searchLogs(dto);
  }
}
