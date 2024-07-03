import { Module } from '@nestjs/common';
import { WritingService } from './writing.service';
import { WritingController } from './writing.controller';
import { WritingModel } from './entities/writing.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonService } from '@common/common.service';

@Module({
  imports: [TypeOrmModule.forFeature([WritingModel])],
  controllers: [WritingController],
  providers: [WritingService, CommonService],
  exports: [WritingService],
})
export class WritingModule {}
