import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportModel } from './entities/report.entity';
import { Repository } from 'typeorm';
import { PostReportDto } from './dto/post-report.dto';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(ReportModel)
    private readonly reportRepository: Repository<ReportModel>
  ) {}

  async postReport(dto: PostReportDto) {
    const created = this.reportRepository.create(dto);

    return await this.reportRepository.save(created);
  }
}
