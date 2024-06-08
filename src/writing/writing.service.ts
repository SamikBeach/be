import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WritingModel } from './entities/writing.entity';

@Injectable()
export class WritingService {
  constructor(
    @InjectRepository(WritingModel)
    private readonly writingRepository: Repository<WritingModel>
  ) {}

  async getAllWritings() {
    return await this.writingRepository.find({ relations: ['author'] });
  }

  async getWritingById(writingId: number) {
    return await this.writingRepository.findOne({
      where: {
        id: writingId,
      },
      relations: { author: true },
    });
  }

  async searchWriting(authorId: number) {
    return await this.writingRepository.find({
      where: {
        author_id: authorId,
      },
      relations: { author: true },
    });
  }
}
