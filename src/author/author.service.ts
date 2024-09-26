import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorModel } from './entities/author.entity';
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
export class AuthorService {
  constructor(
    @InjectRepository(AuthorModel)
    private readonly authorRepository: Repository<AuthorModel>,
    private readonly logService: LogService,
    private readonly configService: ConfigService
  ) {}

  async incrementLikeCount({ authorId }: { authorId: number }) {
    await this.authorRepository.increment({ id: authorId }, 'like_count', 1);
  }

  async decrementLikeCount({ authorId }: { authorId: number }) {
    await this.authorRepository.decrement({ id: authorId }, 'like_count', 1);
  }

  async incrementCommentCount({ authorId }: { authorId: number }) {
    await this.authorRepository.increment({ id: authorId }, 'comment_count', 1);
  }

  async decrementCommentCount({ authorId }: { authorId: number }) {
    await this.authorRepository.decrement({ id: authorId }, 'comment_count', 1);
  }

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

  async searchAuthorEditions(authorId) {
    const author = await this.authorRepository.findOne({
      where: { id: authorId },
    });

    const googleApiKey = this.configService.get<string>(
      ENV_GOOGLE_BOOK_API_KEY
    );

    const googleBooks = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=inauthor:${author.name}&key=${googleApiKey}&maxResults=10&orderBy=newest`
    );

    return googleBooks;
  }

  async searchAuthors(dto: PaginateQuery): Promise<Paginated<AuthorModel>> {
    const authors = await paginate(dto, this.authorRepository, {
      sortableColumns: [
        'id',
        'era',
        'name',
        'born_date',
        'like_count',
        'comment_count',
      ],
      defaultSortBy: [['id', 'ASC']],
      searchableColumns: ['name', 'name_in_kor'],
      filterableColumns: {
        era_id: [FilterOperator.EQ],
      },
      relativePath: true,
      relations: ['era', 'original_works'],
    });

    return authors;

    // const googleApiKey = this.configService.get<string>(
    //   ENV_GOOGLE_BOOK_API_KEY
    // );

    // const editionCountArray = await Promise.all(
    //   authors.data.map(async author => {
    //     const googleBooks = await axios.get(
    //       `https://www.googleapis.com/books/v1/volumes?q=inauthor:${author.name}&key=${googleApiKey}&maxResults=10&orderBy=newest`
    //     );

    //     return googleBooks.data.totalItems;
    //   })
    // );

    // const authorData = authors.data.map(author => ({
    //   ...author,
    //   edition_count: editionCountArray[author.id] ?? 0,
    // }));

    // return { ...authors, data: authorData };
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
