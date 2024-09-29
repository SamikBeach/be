import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OriginalWorkEditionModel } from './entities/original_work_edition.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OriginalWorkEditionModel])],
})
export class OriginalWorkEditionModule {}
