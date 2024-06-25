import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EraModel } from './entities/era.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EraService {
  constructor(
    @InjectRepository(EraModel)
    private readonly authorRepository: Repository<EraModel>
  ) {}

  async getAllEras() {
    return await this.authorRepository.find();
  }
}
