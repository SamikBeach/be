import { Module } from '@nestjs/common';
import { EditionService } from './edition.service';
import { EditionController } from './edition.controller';
import { EditionModel } from './entities/edition.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonService } from '@common/common.service';
import { LogModule } from '@log/log.module';

@Module({
  imports: [TypeOrmModule.forFeature([EditionModel]), LogModule],
  controllers: [EditionController],
  providers: [EditionService, CommonService],
  exports: [EditionService],
})
export class EditionModule {}
