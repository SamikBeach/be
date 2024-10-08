import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EditionModel } from './entities/edition.entity';
import { LogService } from '@log/log.service';
import {
  FilterOperator,
  PaginateQuery,
  Paginated,
  paginate,
} from 'nestjs-paginate';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EditionService {
  constructor(
    @InjectRepository(EditionModel)
    private readonly editionRepository: Repository<EditionModel>,
    private readonly logService: LogService,
    private readonly configService: ConfigService
  ) {}

  async incrementLikeCount({ editionId }: { editionId: number }) {
    await this.editionRepository.increment({ id: editionId }, 'like_count', 1);
  }

  async decrementLikeCount({ editionId }: { editionId: number }) {
    await this.editionRepository.decrement({ id: editionId }, 'like_count', 1);
  }

  async incrementCommentCount({ editionId }: { editionId: number }) {
    await this.editionRepository.increment(
      { id: editionId },
      'comment_count',
      1
    );
  }

  async decrementCommentCount({ editionId }: { editionId: number }) {
    await this.editionRepository.decrement(
      { id: editionId },
      'comment_count',
      1
    );
  }

  async getAllEditions() {
    return await this.editionRepository.find({
      relations: {
        author: true,
      },
    });
  }

  async getEditionById(editionId: number) {
    const edition = await this.editionRepository.findOne({
      where: {
        id: editionId,
      },
      relations: {
        author: true,
        original_works: {
          author: true,
        },
      },
    });

    // const googleApiKey = this.configService.get<string>(
    //   ENV_GOOGLE_BOOK_API_KEY
    // );

    // const googleBooks = await axios.get(
    //   `https://www.googleapis.com/books/v1/volumes?q=intitle:${edition.title}+inauthor:${edition.author.name}&key=${googleApiKey}&maxResults=10&orderBy=newest`
    // );

    // edition.editions = googleBooks.data;

    return edition;
  }

  async searchEditions(dto: PaginateQuery): Promise<Paginated<EditionModel>> {
    const editions = await paginate(dto, this.editionRepository, {
      sortableColumns: [
        'id',
        'title',
        'publication_date',
        'like_count',
        'comment_count',
      ],
      defaultSortBy: [['id', 'ASC']],
      searchableColumns: ['title', 'author.name', 'author.name_in_kor'],
      filterableColumns: {
        author_id: [FilterOperator.EQ],
      },
      ...(dto.filter?.original_work_id && {
        where: {
          original_works: {
            id: Number(dto.filter.original_work_id),
          },
        },
      }),
      ...(dto.filter?.edition_id && {
        where: {
          original_works: {
            editions: {
              id: Number(dto.filter.edition_id),
            },
          },
        },
      }),
      relativePath: true,
      relations: {
        author: true,
        original_works: {
          author: true,
        },
      },
    });

    return editions;
  }

  async getTrendingEditions() {
    const logs = await this.logService.getLogs({
      take: 100,
      order: {
        created_at: 'DESC',
      },
    });

    const trendingEditions = logs.reduce((acc, log) => {
      if (log.target_edition?.id == null) {
        return acc;
      }

      if (!acc[log.target_edition.id]) {
        acc[log.target_edition.id] = 0;
      }

      acc[log.target_edition?.id]++;

      return acc;
    }, {});

    const targetEditions = logs
      .map(log => log.target_edition)
      .reduce((acc, edition) => {
        if (edition?.id == null) {
          return acc;
        }

        if (acc.some(a => a.id === edition.id)) {
          return acc;
        }

        acc.push(edition);

        return acc;
      }, []);

    const result = targetEditions.sort((a, b) => {
      return trendingEditions[b.id] - trendingEditions[a.id];
    });

    return result;
  }
}
