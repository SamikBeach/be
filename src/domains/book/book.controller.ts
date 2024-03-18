import {
  Controller,
  UseGuards,
  Inject,
  LoggerService,
  Logger,
  Get,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { BookInfo } from './BookInfo';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(
    private bookService: BookService,
    // @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    // @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    @Inject(Logger) private readonly logger: LoggerService
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  async getBookInfo(): Promise<BookInfo[]> {
    return this.bookService.getAllBooks();
  }
}
