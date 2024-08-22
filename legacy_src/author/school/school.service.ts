import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SchoolModel } from './entities/school.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(SchoolModel)
    private readonly schoolRepository: Repository<SchoolModel>
  ) {}

  async getAllSchools() {
    return await this.schoolRepository.find();
  }
}
