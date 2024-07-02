import { Controller, Get, Param, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { IsPublic } from '@common/decorator/is-public.decorator';
import { SearchBookDto } from './dto/search-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getAllBooks() {
    return this.bookService.getAllBooks();
  }

  @Get('search')
  @IsPublic()
  searchBooks(@Query() dto: SearchBookDto) {
    return this.bookService.searchBooks(dto);
  }

  @Get(':bookId')
  @IsPublic()
  getBookById(@Param('bookId') bookId: number) {
    return this.bookService.getBookById(bookId);
  }
}
