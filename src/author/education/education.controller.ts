import { Controller, Get } from '@nestjs/common';
import { EducationService } from './education.service';
import { IsPublic } from '@common/decorator/is-public.decorator';

@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Get()
  @IsPublic()
  getAllEducations() {
    return this.educationService.getAllEducations();
  }
}
