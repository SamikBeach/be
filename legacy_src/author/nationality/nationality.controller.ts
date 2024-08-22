import { Controller, Get } from '@nestjs/common';
import { NationalityService } from './nationality.service';
import { IsPublic } from '@common/decorator/is-public.decorator';

@Controller('nationality')
export class NationalityController {
  constructor(private readonly nationalityService: NationalityService) {}

  @Get()
  @IsPublic()
  getAllEras() {
    return this.nationalityService.getAllNationalities();
  }
}
