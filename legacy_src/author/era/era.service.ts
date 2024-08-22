import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EraModel } from './entities/era.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EraService {
  constructor(
    @InjectRepository(EraModel)
    private readonly eraRepository: Repository<EraModel>
  ) {}

  async getAllEras() {
    return await this.eraRepository.find();
  }
}
