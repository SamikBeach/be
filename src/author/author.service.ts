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
        main_interests: true,
        influenceds: true,
        influenced_bys: true,
        books: true,
      },
    });
  }

  async searchAuthors({
    nationalityId,
    eraId,
    regionId,
    mainInterestId,
    schoolId,
    educationId,
  }: {
    nationalityId: number;
    eraId: number;
    regionId: number;
    mainInterestId: number;
    schoolId: number;
    educationId: number;
  }) {
    return await this.authorRepository.find({
      where: {
        ...(nationalityId ? { nationality: { id: nationalityId } } : {}),
        ...(eraId ? { era: { id: eraId } } : {}),
        ...(regionId ? { region: { id: regionId } } : {}),
        ...(mainInterestId ? { main_interest: { id: mainInterestId } } : {}),
        ...(schoolId ? { school: { id: schoolId } } : {}),
        ...(educationId ? { education: { id: educationId } } : {}),
      },
      relations: {
        nationality: true,
        // writings: true,
        // educations: true,
        eras: true,
        regions: true,
        // schools: true,
        // main_interests: true,
        influenceds: true,
        influenced_bys: true,
        // books: true,
      },
    });
  }
}
