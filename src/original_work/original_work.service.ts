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
import { ConfigService } from '@nestjs/config';
import { ENV_GOOGLE_BOOK_API_KEY } from '@common/const/env-keys.const';
import axios from 'axios';

@Injectable()
export class OriginalWorkService {
  constructor(
    @InjectRepository(OriginalWorkModel)
    private readonly originalWorkRepository: Repository<OriginalWorkModel>,
    private readonly logService: LogService,
    private readonly configService: ConfigService
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
    const originalWork = await this.originalWorkRepository.findOne({
      where: {
        id: originalWorkId,
      },
      relations: { author: true },
    });

    const googleApiKey = this.configService.get<string>(
      ENV_GOOGLE_BOOK_API_KEY
    );

    const googleBooks = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${originalWork.title}+inauthor:${originalWork.author.name}&key=${googleApiKey}&maxResults=10&orderBy=newest`
    );

    originalWork.editions = googleBooks.data;

    return originalWork;
  }

  async searchOriginalWorks(
    dto: PaginateQuery
  ): Promise<Paginated<OriginalWorkModel>> {
    const originalWorks = await paginate(dto, this.originalWorkRepository, {
      sortableColumns: [
        'id',
        'title',
        'title_in_eng',
        'title_in_kor',
        'publication_date',
        'like_count',
        'comment_count',
      ],
      defaultSortBy: [['id', 'ASC']],
      searchableColumns: [
        'title',
        'title_in_eng',
        'title_in_kor',
        'author.name',
        'author.name_in_kor',
      ],
      filterableColumns: {
        author_id: [FilterOperator.EQ],
      },
      ...(dto.filter?.edition_id && {
        where: {
          editions: {
            id: Number(dto.filter.edition_id),
          },
        },
      }),
      relativePath: true,
      relations: ['author', 'editions'],
    });

    return originalWorks;
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
