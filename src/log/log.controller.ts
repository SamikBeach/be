import { Controller, Get } from '@nestjs/common';
import { LogService } from './log.service';
import { IsPublic } from '@common/decorator/is-public.decorator';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get('search')
  @IsPublic()
  searchLogs(@Paginate() dto: PaginateQuery) {
    return this.logService.searchLogs(dto);
  }
}