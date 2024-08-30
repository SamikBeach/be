import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { AuthorModel } from './entities/author.entity';
import { SearchAuthorsDto } from './dto/search-authors.dto';
import { CommonService } from '@common/common.service';
import { LogService } from '@log/log.service';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(AuthorModel)
    private readonly authorRepository: Repository<AuthorModel>,
    private readonly commonService: CommonService,
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

  async searchAuthors(dto: SearchAuthorsDto) {
    return this.commonService.paginate(
      dto,
      this.authorRepository,
      {
        where: {
          ...(dto.keyword ? { name: ILike(`%${dto.keyword}%`) } : {}),
          ...(dto.eraId ? { era: { id: dto.eraId } } : {}),
        },
        relations: {
          era: true,
          liked_users: true,
          comments: true,
          original_works: true,
        },
        select: {
          liked_users: {
            id: true,
            name: true,
          },
          comments: {
            id: true,
          },
          original_works: {
            id: true,
          },
        },
        order: {
          name: dto.sort === 'alphabetical' ? 'ASC' : undefined,
          // TODO: 기원 전/후 구분
          born_date: dto.sort === 'birth_date' ? 'ASC' : undefined,
          died_date: dto.sort === 'death_date' ? 'ASC' : undefined,
        },
      },
      'author/search'
    );
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
