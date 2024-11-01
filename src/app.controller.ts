import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsPublic } from '@auth/decorator/is-public.decorator';

@Controller({ version: VERSION_NEUTRAL })
@ApiBearerAuth()
@ApiTags('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @IsPublic()
  getHello(): string {
    console.log('root');
    return this.appService.getHello();
  }
}
