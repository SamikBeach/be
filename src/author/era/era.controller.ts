import { Controller, Get } from '@nestjs/common';
import { EraService } from './era.service';
import { IsPublic } from '@common/decorator/is-public.decorator';

@Controller('era')
export class EraController {
  constructor(private readonly eraService: EraService) {}

  @Get()
  @IsPublic()
  getAllEras() {
    return this.eraService.getAllEras();
  }
}
