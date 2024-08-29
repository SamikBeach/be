import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogModel } from './entities/log.entity';
import { CommonService } from '@common/common.service';

@Module({
  imports: [TypeOrmModule.forFeature([LogModel])],
  controllers: [LogController],
  providers: [LogService, CommonService],
  exports: [LogService],
})
export class LogModule {}
