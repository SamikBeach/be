import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OriginalWorkModel } from './entities/original_work.entity';
import { CommonService } from '@common/common.service';
import { SearchOriginalWorksDto } from './dto/search-original-work.dto';

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
        // where: {
        //   // TODO: title_in_eng도 함께(OR 조건) 검색 가능하도록 수정
        //   ...(dto.keyword ? { title: ILike(`%${dto.keyword}%`) } : {}),
        //   ...(dto.authorIds ? { author: { id: In(dto.authorIds) } } : {}),
        // },
        // relations: { author: true, books: true },
        // order: dto.sort?.reduce((acc, cur) => {
        //   if (cur.type === 'author') {
        //     acc['author'] = {
        //       name: cur.direction,
        //     };
        //   } else {
        //     acc[cur.type] = cur.direction;
        //   }
        //   return acc;
        // }, {}),
      },
      'originalWork/search'
    );
  }
}
