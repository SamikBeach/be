import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolModel } from './entities/school.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolModel])],
  controllers: [SchoolController],
  providers: [SchoolService],
})
export class SchoolModule {}
