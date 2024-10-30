import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { DefaultLogger } from './logger/default.logger';

@Module({
  controllers: [CommonController],
  providers: [CommonService, DefaultLogger],
  exports: [CommonService],
})
export class CommonModule {}
