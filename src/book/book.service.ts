import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookModel } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookModel)
    private readonly bookRepository: Repository<BookModel>
  ) {}

  async getAllBooks() {
    return await this.bookRepository.find();
  }

  async getBookById(bookId: number) {
    return await this.bookRepository.findOne({
      where: {
        id: bookId,
      },
    });
  }
}
