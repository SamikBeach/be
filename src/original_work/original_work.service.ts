import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OriginalWorkModel } from './entities/original_work.entity';
import { LogService } from '@log/log.service';
import {
  FilterOperator,
  PaginateQuery,
  Paginated,
  paginate,
} from 'nestjs-paginate';

@Injectable()
export class OriginalWorkService {
  constructor(
    @InjectRepository(OriginalWorkModel)
    private readonly originalWorkRepository: Repository<OriginalWorkModel>,
    private readonly logService: LogService
  ) {}

  async incrementLikeCount({ originalWorkId }: { originalWorkId: number }) {
    await this.originalWorkRepository.increment(
      { id: originalWorkId },
      'like_count',
      1
    );
  }

  async decrementLikeCount({ originalWorkId }: { originalWorkId: number }) {
    await this.originalWorkRepository.decrement(
      { id: originalWorkId },
      'like_count',
      1
    );
  }

  async incrementCommentCount({ originalWorkId }: { originalWorkId: number }) {
    await this.originalWorkRepository.increment(
      { id: originalWorkId },
      'comment_count',
      1
    );
  }

  async decrementCommentCount({ originalWorkId }: { originalWorkId: number }) {
    await this.originalWorkRepository.decrement(
      { id: originalWorkId },
      'comment_count',
      1
    );
  }

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

  async searchOriginalWorks(
    dto: PaginateQuery
  ): Promise<Paginated<OriginalWorkModel>> {
    return await paginate(dto, this.originalWorkRepository, {
      sortableColumns: [
        'id',
        'title',
        'title_in_eng',
        'publication_date',
        'like_count',
        'comment_count',
      ],
      defaultSortBy: [['id', 'ASC']],
      searchableColumns: ['title', 'title_in_eng'],
      filterableColumns: {
        author_id: [FilterOperator.EQ],
      },
      relativePath: true,
      relations: ['author'],
    });
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
