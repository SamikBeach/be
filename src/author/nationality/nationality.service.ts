import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NationalityModel } from './entities/nationality.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NationalityService {
  constructor(
    @InjectRepository(NationalityModel)
    private readonly nationalityRepository: Repository<NationalityModel>
  ) {}

  async getAllNationalities() {
    return await this.nationalityRepository.find();
  }
}
