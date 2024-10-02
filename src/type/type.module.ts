import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeModel } from './entities/type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeModel])],
})
export class TypeModule {}
