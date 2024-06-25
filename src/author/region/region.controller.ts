import { Controller, Get } from '@nestjs/common';
import { RegionService } from './region.service';
import { IsPublic } from 'src/common/decorator/is-public.decorator';

@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Get()
  @IsPublic()
  getAllEras() {
    return this.regionService.getAllRegions();
  }
}
