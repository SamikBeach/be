import { Controller, Get, Param, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { IsPublic } from '@common/decorator/is-public.decorator';
import { SearchBooksDto } from './dto/search-books.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @IsPublic()
  getAllBooks() {
    return this.bookService.getAllBooks();
  }

  @Get('search')
  @IsPublic()
  searchBooks(@Query() dto: SearchBooksDto) {
    return this.bookService.searchBooks(dto);
  }

  @Get(':bookId')
  @IsPublic()
  getBookById(@Param('bookId') bookId: number) {
    return this.bookService.getBookById(bookId);
  }
}
