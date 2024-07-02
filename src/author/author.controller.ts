import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { AuthorService } from './author.service';
import { IsPublic } from '@common/decorator/is-public.decorator';
import { PaginateAuthorDto } from './dto/paginate-author.dto';
import { SearchAuthorDto } from './dto/search-author.dto';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  @IsPublic()
  getAllAuthors() {
    return this.authorService.getAllAuthors();
  }

  @Get('search')
  @IsPublic()
  searchAuthor(@Query() query: SearchAuthorDto) {
    return this.authorService.searchAuthors(query);
  }

  @Get(':authorId')
  @IsPublic()
  getAuthorById(@Param('authorId') authorId: number) {
    return this.authorService.getAuthorById(authorId);
  }
}
