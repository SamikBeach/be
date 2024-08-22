import { Controller, Get } from '@nestjs/common';
import { MainInterestService } from './main_interest.service';
import { IsPublic } from '@common/decorator/is-public.decorator';

@Controller('main-interest')
export class MainInterestController {
  constructor(private readonly mainInterestService: MainInterestService) {}

  @Get()
  @IsPublic()
  getAllMainInterests() {
    return this.mainInterestService.getAllMainInterests();
  }
}
