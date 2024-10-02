import { PickType } from '@nestjs/mapped-types';
import { ReportModel } from '../entities/report.entity';

export class PostReportDto extends PickType(ReportModel, [
  'user_id',
  'type_id',
  'origin_type_id',
  'description',
]) {}
