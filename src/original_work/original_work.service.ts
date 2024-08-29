import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { OriginalWorkModel } from './entities/original_work.entity';
import { CommonService } from '@common/common.service';
import { SearchOriginalWorksDto } from './dto/search-original-works.dto';
import { LogService } from '@log/log.service';

@Injectable()
export class OriginalWorkService {
  constructor(
    @InjectRepository(OriginalWorkModel)
    private readonly originalWorkRepository: Repository<OriginalWorkModel>,
    private readonly commonService: CommonService,
    private readonly logService: LogService
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

  async getTrendingOriginalWorks() {
    const logs = await this.logService.getLogs({
      take: 100,
      order: {
        created_at: 'DESC',
      },
    });

    const trendingOriginalWorks = logs.reduce((acc, log) => {
      if (log.target_original_work?.id == null) {
        return acc;
      }

      if (!acc[log.target_original_work.id]) {
        acc[log.target_original_work.id] = 0;
      }

      acc[log.target_original_work?.id]++;

      return acc;
    }, {});

    const targetOriginalWorks = logs
      .map(log => log.target_original_work)
      .reduce((acc, original_work) => {
        if (original_work?.id == null) {
          return acc;
        }

        if (acc.some(a => a.id === original_work.id)) {
          return acc;
        }

        acc.push(original_work);

        return acc;
      }, []);

    const result = targetOriginalWorks.sort((a, b) => {
      return trendingOriginalWorks[b.id] - trendingOriginalWorks[a.id];
    });

    return result;
  }
}
