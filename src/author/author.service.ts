import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
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
    return await this.authorRepository.find();
  }

  async getAuthorById(authorId: number) {
    return await this.authorRepository.findOne({
      where: {
        id: authorId,
      },
      relations: ['nationality'],
    });
  }
}
