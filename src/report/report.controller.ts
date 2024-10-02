import { Body, Controller, Post } from '@nestjs/common';
import { ReportService } from './report.service';
import { IsPublic } from '@common/decorator/is-public.decorator';
import { PostReportDto } from './dto/post-report.dto';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @IsPublic()
  postReport(@Body() dto: PostReportDto) {
    return this.reportService.postReport(dto);
  }
}
