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
        order: {
          title: dto.sort === 'alphabetical' ? 'ASC' : undefined,
          // TODO: 기원 전/후 구분
          publication_date: dto.sort === 'publication_date' ? 'ASC' : undefined,
        },
      },
      'original_work/search'
    );
  }
}
