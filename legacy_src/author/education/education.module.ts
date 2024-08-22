import { Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationModel } from './entities/education.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EducationModel])],
  controllers: [EducationController],
  providers: [EducationService],
})
export class EducationModule {}
