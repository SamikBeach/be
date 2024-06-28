import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EducationModel } from './entities/education.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(EducationModel)
    private readonly educationRepository: Repository<EducationModel>
  ) {}

  async getAllEducations() {
    return await this.educationRepository.find();
  }
}
