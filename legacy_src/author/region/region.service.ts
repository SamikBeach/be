import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegionModel } from './entities/region.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RegionService {
  constructor(
    @InjectRepository(RegionModel)
    private readonly regionRepository: Repository<RegionModel>
  ) {}

  async getAllRegions() {
    return await this.regionRepository.find();
  }
}
