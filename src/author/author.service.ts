import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { AuthorModel } from './entities/author.entity';
import { SearchAuthorsDto } from './dto/search-authors.dto';
import { CommonService } from '@common/common.service';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(AuthorModel)
    private readonly authorRepository: Repository<AuthorModel>,
    private readonly commonService: CommonService
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
}
