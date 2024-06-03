import {
  Controller,
  UseGuards,
  Inject,
  LoggerService,
  Logger,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { BookInfo } from './BookInfo';
import { BookService } from './book.service';
import { GetBooksDto } from './dto/get-books.dto';

@Controller('book')
@UseGuards(AuthGuard)
export class BookController {
  constructor(
    private bookService: BookService,
    // @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    // @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    @Inject(Logger) private readonly logger: LoggerService
  ) {}

  @Get()
  async getBooks(@Query() dto: GetBooksDto): Promise<BookInfo[]> {
    const { author } = dto;

    if (dto === undefined || Object.values(dto).length === 0) {
      return this.bookService.getAllBooks();
    }

    return this.bookService.getBookByAuthor(author);
  }
}
