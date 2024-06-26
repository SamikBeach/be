import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorModel } from './entities/author.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(AuthorModel)
    private readonly authorRepository: Repository<AuthorModel>
  ) {}

  async getAllAuthors() {
    return await this.authorRepository.find({
      relations: {
        // nationality: true,
        writing: true,
        // education: true,
        // era: true,
        // region: true,
        // school: true,
        // main_interest: true,
        influenced: true,
        influenced_by: true,
        book: true,
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
        writing: true,
        // education: true,
        // era: true,
        // region: true,
        // school: true,
        main_interest: true,
        influenced: true,
        influenced_by: true,
        book: true,
      },
    });
  }

  async searchAuthors({
    nationalityId,
    eraId,
    regionId,
  }: {
    nationalityId: number;
    eraId: number;
    regionId: number;
  }) {
    return await this.authorRepository.find({
      where: {
        ...(nationalityId ? { nationality: { id: nationalityId } } : {}),
        ...(eraId ? { era: { id: eraId } } : {}),
        ...(regionId ? { region: { id: regionId } } : {}),
      },
      relations: {
        nationality: true,
        // writing: true,
        // education: true,
        era: true,
        region: true,
        // school: true,
        // main_interest: true,
        influenced: true,
        influenced_by: true,
        // book: true,
      },
    });
  }
}
