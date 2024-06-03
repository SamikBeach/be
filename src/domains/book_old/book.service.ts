import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { BookInfo } from './BookInfo';
import { BookEntity } from './entity/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
    private dataSource: DataSource
  ) {}

  async getAllBooks(): Promise<BookInfo[]> {
    const books = await this.bookRepository.find();

    if (!books) {
      throw new NotFoundException('도서가 존재하지 않습니다');
    }

    return books.map(book => ({
      id: book.id,
      title: book.title,
      author: book.author,
      publisher: book.publisher,
      yearOfPublication: book.year_of_publication,
      salesQuantity: Number(book.sales_quantity),
    }));
  }

  async getBookByAuthor(author: string): Promise<BookInfo[]> {
    const books = await this.bookRepository.find({
      where: { author: decodeURI(author) },
    });

    if (!books) {
      throw new NotFoundException('해당 저자의 도서가 존재하지 않습니다');
    }

    return books.map(book => ({
      id: book.id,
      title: book.title,
      author: book.author,
      publisher: book.publisher,
      yearOfPublication: book.year_of_publication,
      salesQuantity: Number(book.sales_quantity),
    }));
  }
}
