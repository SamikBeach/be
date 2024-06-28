import { Module } from '@nestjs/common';
import { MainInterestService } from './main_interest.service';
import { MainInterestController } from './main_interest.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainInterestModel } from './entities/main_interest.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MainInterestModel])],
  controllers: [MainInterestController],
  providers: [MainInterestService],
})
export class MainInterestModule {}
