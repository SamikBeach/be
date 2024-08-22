import { Module } from '@nestjs/common';
import { NationalityService } from './nationality.service';
import { NationalityController } from './nationality.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NationalityModel } from './entities/nationality.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NationalityModel])],
  controllers: [NationalityController],
  providers: [NationalityService],
})
export class NationalityModule {}
