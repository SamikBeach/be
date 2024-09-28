import { Module } from '@nestjs/common';
import { EditionLikeService } from './edition_like.service';
import { EditionLikeController } from './edition_like.controller';
import { EditionLikeModel } from './entities/edition_like.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogModule } from '@log/log.module';
import { EditionModule } from '@edition/edition.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EditionLikeModel]),
    LogModule,
    EditionModule,
  ],
  exports: [EditionLikeService],
  controllers: [EditionLikeController],
  providers: [EditionLikeService],
})
export class EditionLikeModule {}
