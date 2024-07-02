import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { AuthorModel } from './entities/author.entity';
import { SearchAuthorDto } from './dto/search-author.dto';
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
        // nationality: true,
        writings: true,
        // educations: true,
        // eras: true,
        // regions: true,
        // schools: true,
        // main_interests: true,
        influenceds: true,
        influenced_bys: true,
        books: true,
      },
    });
  }

  async getAuthorById(authorId: number) {
    return await this.authorRepository.findOne({
      where: {
        id: authorId,
      },
      relations: {
        nationality: true,
        writings: true,
        // educations: true,
        // eras: true,
        // regions: true,
        // schools: true,
        // main_interests: true,
        // influenceds: true,
        // influenced_bys: true,
        books: true,
      },
    });
  }

  async searchAuthors(dto: SearchAuthorDto) {
    return this.commonService.paginate(
      dto,
      this.authorRepository,
      {
        where: {
          ...(dto.nationalityId
            ? { nationality: { id: dto.nationalityId } }
            : {}),
          ...(dto.eraId ? { eras: { id: dto.eraId } } : {}),
          ...(dto.regionId ? { regions: { id: dto.regionId } } : {}),
          ...(dto.mainInterestId
            ? { main_interests: { id: dto.mainInterestId } }
            : {}),
          ...(dto.schoolId ? { schools: { id: dto.schoolId } } : {}),
          ...(dto.educationId ? { educations: { id: dto.educationId } } : {}),
          // id: MoreThan(600),
        },
        relations: {
          // nationality: true,
          // writings: true,
          // educations: true,
          // eras: true,
          // regions: true,
          // schools: true,
          // main_interests: true,
          // influenceds: true,
          // influenced_bys: true,
          // books: true,
        },
      },
      'author/search'
    );
  }
}
