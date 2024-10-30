import { Body, Controller, Post } from '@nestjs/common';
import { ReportService } from './report.service';
import { IsPublic } from '@common/decorator/is-public.decorator';
import { PostReportDto } from './dto/post-report.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('report')
@ApiBearerAuth()
@ApiTags('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @IsPublic()
  postReport(@Body() dto: PostReportDto) {
    return this.reportService.postReport(dto);
  }
}
