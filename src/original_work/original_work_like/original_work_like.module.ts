import { Module } from '@nestjs/common';
import { OriginalWorkLikeService } from './original_work_like.service';
import { OriginalWorkLikeController } from './original_work_like.controller';
import { OriginalWorkLikeModel } from './entities/original_work_like.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OriginalWorkLikeModel])],
  exports: [OriginalWorkLikeService],
  controllers: [OriginalWorkLikeController],
  providers: [OriginalWorkLikeService],
})
export class OriginalWorkLikeModule {}
