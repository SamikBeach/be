import { Module } from '@nestjs/common';
import { OriginalWorkLikeService } from './original_work_like.service';
import { OriginalWorkLikeController } from './original_work_like.controller';
import { OriginalWorkLikeModel } from './entities/original_work_like.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogModule } from '@log/log.module';

@Module({
  imports: [TypeOrmModule.forFeature([OriginalWorkLikeModel]), LogModule],
  exports: [OriginalWorkLikeService],
  controllers: [OriginalWorkLikeController],
  providers: [OriginalWorkLikeService],
})
export class OriginalWorkLikeModule {}
