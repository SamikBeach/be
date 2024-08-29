import { Controller, Get, Query } from '@nestjs/common';
import { LogService } from './log.service';
import { SearchLogsDto } from './dto/search-logs.dto';
import { IsPublic } from '@common/decorator/is-public.decorator';

@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get('search')
  @IsPublic()
  searchLogs(@Query() dto: SearchLogsDto) {
    return this.logService.searchLogs(dto);
  }
}
