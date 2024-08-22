import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { OriginalWorkModel } from './entities/original_work.entity';
import { CommonService } from '@common/common.service';
import { SearchOriginalWorksDto } from './dto/search-original-works.dto';

@Injectable()
export class OriginalWorkService {
  constructor(
    @InjectRepository(OriginalWorkModel)
    private readonly originalWorkRepository: Repository<OriginalWorkModel>,
    private readonly commonService: CommonService
  ) {}

  async getAllOriginalWorks() {
    return await this.originalWorkRepository.find({
      relations: {
        author: true,
      },
    });
  }

  async getOriginalWorkById(originalWorkId: number) {
    return await this.originalWorkRepository.findOne({
      where: {
        id: originalWorkId,
      },
      relations: { author: true },
    });
  }

  async searchOriginalWorks(dto: SearchOriginalWorksDto) {
    return this.commonService.paginate(
      dto,
      this.originalWorkRepository,
      {
        where: {
          ...(dto.keyword ? { title: ILike(`%${dto.keyword}%`) } : {}),
          ...(dto.authorId ? { author: { id: dto.authorId } } : {}),
        },
        relations: {
          author: true,
        },
      },
      'original_work/search'
    );
  }
}
