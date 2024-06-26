import { Controller, Get, Param } from '@nestjs/common';
import { BookService } from './book.service';
import { IsPublic } from 'src/common/decorator/is-public.decorator';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getAllBooks() {
    return this.bookService.getAllBooks();
  }

  @Get(':bookId')
  @IsPublic()
  getAuthorById(@Param('bookId') bookId: number) {
    return this.bookService.getBookById(bookId);
  }
}
