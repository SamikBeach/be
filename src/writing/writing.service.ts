import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WritingModel } from './entities/writing.entity';
import { CommonService } from '@common/common.service';
import { SearchWritingsDto } from './dto/search-writings.dto';

@Injectable()
export class WritingService {
  constructor(
    @InjectRepository(WritingModel)
    private readonly writingRepository: Repository<WritingModel>,
    private readonly commonService: CommonService
  ) {}

  async getAllWritings() {
    return await this.writingRepository.find({
      relations: {
        author: true,
        books: true,
      },
    });
  }

  async getWritingById(writingId: number) {
    return await this.writingRepository.findOne({
      where: {
        id: writingId,
      },
      relations: { author: true, books: true },
    });
  }

  async searchWritings(dto: SearchWritingsDto) {
    return this.commonService.paginate(
      dto,
      this.writingRepository,
      {
        relations: { author: true, books: true },
      },
      'writing/search'
    );
  }
}
