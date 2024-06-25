import { Module } from '@nestjs/common';
import { EraService } from './era.service';
import { EraController } from './era.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EraModel } from './entities/era.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EraModel])],
  controllers: [EraController],
  providers: [EraService],
})
export class EraModule {}
