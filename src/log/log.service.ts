import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogModel } from './entities/log.entity';
import { FindOptionsOrder, Repository } from 'typeorm';
import { CommonService } from '@common/common.service';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(LogModel)
    private readonly logRepository: Repository<LogModel>,
    private readonly commonService: CommonService
  ) {}

  async getLogs({
    take,
    order,
  }: {
    take: number;
    order: FindOptionsOrder<LogModel>;
  }) {
    return await this.logRepository.find({
      relations: {
        user: true,
        target_author: true,
        target_original_work: {
          author: true,
        },
      },
      take,
      order,
    });
  }

  async searchLogs(dto: PaginateQuery): Promise<Paginated<LogModel>> {
    return await paginate(dto, this.logRepository, {
      sortableColumns: ['id'],
      defaultSortBy: [['id', 'DESC']],
      relativePath: true,
      relations: {
        user: true,
        author_comment: true,
        original_work_comment: true,
        target_author: {
          liked_users: true,
          comments: true,
        },
        target_original_work: {
          author: true,
          liked_users: true,
          comments: true,
        },
      },
    });
  }

  async createLog({
    user_id,
    author_comment_id,
    original_work_comment_id,
    target_author_id,
    target_original_work_id,
  }: {
    user_id: number;
    author_comment_id?: number;
    original_work_comment_id?: number;
    target_author_id?: number;
    target_original_work_id?: number;
  }) {
    const created = this.logRepository.create({
      user: {
        id: user_id,
      },
      author_comment: {
        id: author_comment_id,
      },
      original_work_comment: {
        id: original_work_comment_id,
      },
      target_author: {
        id: target_author_id,
      },
      target_original_work: {
        id: target_original_work_id,
      },
    });

    return await this.logRepository.save(created);
  }
}
