import { Module } from '@nestjs/common';
import { OriginalWorkService } from './original_work.service';
import { OriginalWorkController } from './original_work.controller';
import { OriginalWorkModel } from './entities/original_work.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonService } from '@common/common.service';

@Module({
  imports: [TypeOrmModule.forFeature([OriginalWorkModel])],
  controllers: [OriginalWorkController],
  providers: [OriginalWorkService, CommonService],
  exports: [OriginalWorkService],
})
export class OriginalWorkModule {}