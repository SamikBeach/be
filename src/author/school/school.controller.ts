import { Controller, Get } from '@nestjs/common';
import { SchoolService } from './school.service';
import { IsPublic } from 'src/common/decorator/is-public.decorator';

@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Get()
  @IsPublic()
  getAllSchools() {
    return this.schoolService.getAllSchools();
  }
}
