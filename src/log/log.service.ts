import { Injectable } from '@nestjs/common';
import { SearchLogsDto } from './dto/search-logs.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LogModel } from './entities/log.entity';
import { Repository } from 'typeorm';
import { CommonService } from '@common/common.service';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(LogModel)
    private readonly logRepository: Repository<LogModel>,
    private readonly commonService: CommonService
  ) {}

  async searchLogs(dto: SearchLogsDto) {
    // return await this.logRepository.find({
    //   relations: {
    //     user: true,
    //     comment: true,
    //     target_author: true,
    //     target_original_work: true,
    //   },
    // });
    return await this.commonService.paginate(
      dto,
      this.logRepository,
      {
        relations: {
          user: true,
          comment: true,
          target_author: true,
          target_original_work: true,
        },
      },
      'log/search'
    );
  }

  async createLog({
    user_id,
    comment_id,
    target_author_id,
    target_original_work_id,
  }: {
    user_id: number;
    comment_id?: number;
    target_author_id?: number;
    target_original_work_id?: number;
  }) {
    const created = this.logRepository.create({
      user: {
        id: user_id,
      },
      comment: {
        id: comment_id,
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
