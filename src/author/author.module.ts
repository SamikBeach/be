import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorModel } from './entities/author.entity';
import { LogModule } from '@log/log.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorModel]), LogModule],
  controllers: [AuthorController],
  providers: [AuthorService, ConfigService],
  exports: [AuthorService],
})
export class AuthorModule {}
