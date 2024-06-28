import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MainInterestModel } from './entities/main_interest.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MainInterestService {
  constructor(
    @InjectRepository(MainInterestModel)
    private readonly mainInterestRepository: Repository<MainInterestModel>
  ) {}

  async getAllMainInterests() {
    return await this.mainInterestRepository.find();
  }
}
