import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { AuthorModel } from './entities/author.entity';
import { LogService } from '@log/log.service';
import {
  FilterOperator,
  PaginateQuery,
  Paginated,
  paginate,
} from 'nestjs-paginate';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(AuthorModel)
    private readonly authorRepository: Repository<AuthorModel>,
    private readonly dataSource: DataSource,
    private readonly logService: LogService
  ) {}

  async getAllAuthors() {
    return await this.authorRepository.find({
      relations: {
        era: true,
      },
    });
  }

  async getAuthorById(authorId: number) {
    return await this.authorRepository.findOne({
      where: { id: authorId },
      relations: {
        era: true,
      },
    });
  }

  async searchAuthors(dto: PaginateQuery): Promise<Paginated<AuthorModel>> {
    return await paginate(dto, this.authorRepository, {
      sortableColumns: ['id', 'era'],
      defaultSortBy: [['id', 'ASC']],
      searchableColumns: ['era'],
      filterableColumns: {
        era_id: [FilterOperator.EQ],
      },
      relativePath: true,
      relations: ['era', 'liked_users', 'comments', 'original_works'],
    });
  }

  async getTrendingAuthors() {
    const logs = await this.logService.getLogs({
      take: 100,
      order: {
        created_at: 'DESC',
      },
    });

    const trendingAuthors = logs.reduce((acc, log) => {
      if (log.target_author?.id == null) {
        return acc;
      }

      if (!acc[log.target_author.id]) {
        acc[log.target_author.id] = 0;
      }

      acc[log.target_author?.id]++;

      return acc;
    }, {});

    const targetAuthors = logs
      .map(log => log.target_author)
      .reduce((acc, author) => {
        if (author?.id == null) {
          return acc;
        }

        if (acc.some(a => a.id === author.id)) {
          return acc;
        }

        acc.push(author);

        return acc;
      }, []);

    const result = targetAuthors.sort((a, b) => {
      return trendingAuthors[b.id] - trendingAuthors[a.id];
    });

    return result;
  }
}
